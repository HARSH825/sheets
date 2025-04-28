"use client"

import { useState, FormEvent } from "react"
import Image from "next/image"
import axios from "axios"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Import step components
import GarageInfoStep from "./form-steps/garage-info-step"
import AboutGarageStep from "./form-steps/about-garage-step"
import AvailableBrandsStep from "./form-steps/available-brands-step"
import StaffDetailsStep from "./form-steps/staff-details-step"
import PickAndDropStep from "./form-steps/pick-and-drop-step"
import PaymentAndServicesStep from "./form-steps/payment-and-services-step"

// API base URL
const API_BASE_URL = "http://localhost:5000/api"

export default function GarageRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [fluids, setFluids] = useState([{ id: 1 }])
  const [staffMembers, setStaffMembers] = useState([{ id: 1 }])
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Form data state
  const [formData, setFormData] = useState({
    // Garage Info
    garageName: "",
    ownerName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    whatsappNumber: "",
    pincode: "",
    operatingHours: "",
    weeklyOff: "",
    workshopType: "",
    gstNumber: "",
    panNumber: "",
    dateOnboarded: "",
    referredBy: "",
    mechHelpContact: "",
    workshopAddress: "",
    
    // About Garage
    yearEstablished: "",
    foundedBy: "",
    inspiration: "",
    growthJourney: "",
    challengesFaced: "",
    milestones: "",
    visionValues: "",
    
    // Pick & Drop
    isPickDropAvailable: false,
    pickDropType: "",
    pickDropCharges: "",
    serviceArea: "",
    
    // Payment Info
    upiId: "",
    bankAccountNumber: "",
    ifscCode: "",
    billingFrequency: "",
    preferredPaymentMode: "",
    
    // Services (will be collected from PaymentAndServicesStep)
    services: [] as any[]
  })

  // Handle input changes from any step
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value
    })
  }

  // Handle select changes
  const handleSelectChange = (id: string, value: string) => {
    setFormData({
      ...formData,
      [id]: value
    })
  }

  // Handle radio changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value === "yes"
    })
  }

  const steps = [
    { 
      title: "Garage Info", 
      component: <GarageInfoStep 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleSelectChange={handleSelectChange} 
      /> 
    },
    { 
      title: "About Garage", 
      component: <AboutGarageStep 
        formData={formData} 
        handleInputChange={handleInputChange} 
      /> 
    },
    { 
      title: "Available Brands", 
      component: <AvailableBrandsStep 
        fluids={fluids} 
        setFluids={setFluids}
      /> 
    },
    {
      title: "Staff Details",
      component: <StaffDetailsStep 
        staffMembers={staffMembers} 
        setStaffMembers={setStaffMembers} 
      />,
    },
    { 
      title: "Pick & Drop", 
      component: <PickAndDropStep 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleRadioChange={handleRadioChange}
      /> 
    },
    { 
      title: "Payment & Services", 
      component: <PaymentAndServicesStep 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      /> 
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Prepare fluids data for submission
  const prepareFluidData = () => {
    return fluids.map(fluid => ({
      fluidType: (document.getElementById(`fluidType-${fluid.id}`) as HTMLSelectElement)?.value || "",
      brandName: (document.getElementById(`brandName-${fluid.id}`) as HTMLInputElement)?.value || "",
      grade: (document.getElementById(`grade-${fluid.id}`) as HTMLInputElement)?.value || "",
      ratePerLiter: parseFloat((document.getElementById(`rate-${fluid.id}`) as HTMLInputElement)?.value || "0"),
      usedFor: (document.getElementById(`usedFor-${fluid.id}`) as HTMLInputElement)?.value || ""
    }))
  }

  // Prepare staff members data for submission
  const prepareStaffData = () => {
    return staffMembers.map(staff => ({
      name: (document.getElementById(`staffName-${staff.id}`) as HTMLInputElement)?.value || "",
      phoneNumber: (document.getElementById(`staffPhone-${staff.id}`) as HTMLInputElement)?.value || "",
      specialist: (document.getElementById(`specialist-${staff.id}`) as HTMLSelectElement)?.value || "",
      photoLink: (document.getElementById(`photoLink-${staff.id}`) as HTMLInputElement)?.value || "",
      notes: (document.getElementById(`notes-${staff.id}`) as HTMLTextAreaElement)?.value || ""
    }))
  }

  // Prepare services data for submission
  const prepareServicesData = () => {
    // This function would collect all checked services with their prices
    // This is a simplification; you'd need to adapt this to match how your PaymentAndServicesStep component
    // is tracking selected services and prices
    const services = []
    const serviceIds = [
      "general-checkup", "engine-oil-change", "oil-filter-replacement", "air-filter-replacement", 
      "ac-filter-replacement", "fuel-filter-replacement", "all-top-ups", "top-wash",
      "washing-interior-vacuum", "throttle-body-cleaning", "spark-plug-cleaning", 
      "spark-plug-replacement", "timing-belt-adjustment", "fuel-injector-cleaning",
      "wiper-replacement", "wiper-motor-replacement", "water-pump-belt-replacement",
      "brake-pad", "brake-shoes", "brake-disc", "caliper-pin", "disc-turning",
      "hand-brake", "brake-drums", "wheel-cylinder", "headlight-adjustment",
      "caliper-greasing", "front-brake-cleaning", "rear-brake-cleaning",
      "condenser-cleaning", "ac-filter-cleaning", "cooling-coil-cleaning",
      "cooling-coil-replacement", "condenser-replacement", "compressor-replacement",
      "heating-coil-replacement", "v-belt-replacement", "ac-blower-replacement",
      "compressor-belt-replacement"
    ]
    
    for (const id of serviceIds) {
      const checkbox = document.getElementById(id) as HTMLInputElement
      if (checkbox?.checked) {
        services.push({
          serviceId: id,
          serviceName: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          isOffered: true,
          hatchbackPrice: parseFloat((document.getElementById(`${id}-hatchback`) as HTMLInputElement)?.value || "0"),
          sedanPrice: parseFloat((document.getElementById(`${id}-sedan`) as HTMLInputElement)?.value || "0"),
          suvPrice: parseFloat((document.getElementById(`${id}-suv`) as HTMLInputElement)?.value || "0"),
          duration: parseInt((document.getElementById(`${id}-duration`) as HTMLInputElement)?.value || "0")
        })
      }
    }
    
    return services
  }

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault()
    
    setIsSubmitting(true)
    setErrorMessage("")
    
    try {
      // Prepare the complete submission data
      const submissionData = {
        ...formData,
        fluids: prepareFluidData(),
        staffMembers: prepareStaffData(),
        services: prepareServicesData()
      }
      
      const response = await axios.post(`${API_BASE_URL}/garages`, submissionData)
      
      if (response.data.success) {
        setShowSuccessPopup(true)
        setTimeout(() => {
          setIsCompleted(true)
          setShowSuccessPopup(false)
        }, 3000)
      } else {
        setErrorMessage("Submission failed. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting the form:", error)
      setErrorMessage("An error occurred while submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto relative py-8 px-4">
      {/* Error message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative animate-fade-in-up">
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4">
                <Image src="/images/logo.png" alt="MechHelp Logo" width={64} height={64} className="object-contain" />
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h3>
              <p className="text-gray-600">
                Your garage partner registration has been submitted. We'll review your information shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Completed State with Register Another Option */}
      {isCompleted && (
        <div className="max-w-3xl mx-auto text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6">
            <Image src="/images/logo.png" alt="MechHelp Logo" width={96} height={96} className="object-contain" />
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Registration Successful!</h2>
            <p className="text-green-600 mb-6">Your garage partner registration has been submitted successfully.</p>
            <p className="mt-6 text-sm text-gray-600">
              Our team will review your application and get back to you shortly.
            </p>
          </div>
          <Button onClick={() => window.location.reload()} className="px-6 brand-gradient text-white brand-shadow">
            Register Another Garage
          </Button>
        </div>
      )}

      {/* Form Content - Only show if not completed */}
      {!isCompleted && (
        <form onSubmit={handleSubmit}>egis
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 mr-4">
              <Image src="/images/logo.png" alt="MechHelp Logo" width={80} height={80} className="object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Garage Partner Registration</h1>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={cn("h-2 w-16 rounded-full", index <= currentStep ? "brand-gradient" : "bg-gray-200")} />
              </div>
            ))}
          </div>

          {/* Step Title */}
          <h2 className="text-center text-primary font-semibold mb-8">{steps[currentStep].title}</h2>

          {/* Step Content */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            {steps[currentStep].component}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center border-primary text-primary"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button 
                type="button" 
                onClick={handleNext} 
                className="flex items-center brand-gradient text-white brand-shadow"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="brand-gradient text-white brand-shadow flex items-center"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
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
import AvailableBrandsStep, { Fluid } from "./form-steps/available-brands-step"
import StaffDetailsStep, { StaffMember } from "./form-steps/staff-details-step"
import PickAndDropStep from "./form-steps/pick-and-drop-step"
import PaymentAndServicesStep from "./form-steps/payment-and-services-step"

// API base URL
const API_BASE_URL = "http://localhost:5000/api"

export default function GarageRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [fluids, setFluids] = useState<Fluid[]>([{ id: 1 }])
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([{ id: 1 }])
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
    services: [] as Array<{
      serviceId: string;
      serviceName: string;
      isOffered: boolean;
      hatchbackPrice: number;
      sedanPrice: number;
      suvPrice: number;
      duration: number;
    }>
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

  // Handle fluid changes
  const handleFluidChange = (id: number, field: string, value: string | number) => {
    const updatedFluids = fluids.map(fluid => {
      if (fluid.id === id) {
        return { ...fluid, [field]: value }
      }
      return fluid
    })
    setFluids(updatedFluids)
  }

  // Handle staff member changes
  const handleStaffChange = (id: number, field: string, value: string) => {
    const updatedStaff = staffMembers.map(staff => {
      if (staff.id === id) {
        return { ...staff, [field]: value }
      }
      return staff
    })
    setStaffMembers(updatedStaff)
  }

  // Handle service changes
  const handleServiceChange = (updatedServices: any[]) => {
    setFormData({
      ...formData,
      services: updatedServices
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
        handleFluidChange={handleFluidChange}
      /> 
    },
    {
      title: "Staff Details",
      component: <StaffDetailsStep 
        staffMembers={staffMembers} 
        setStaffMembers={setStaffMembers} 
        handleStaffChange={handleStaffChange}
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
        handleServiceChange={handleServiceChange}
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() // Prevent default form submission behavior
    
    // No longer checking if we're on the last step - the Submit button is only visible on the last step anyway
    setIsSubmitting(true)
    setErrorMessage("")
    
    try {
      // Prepare the complete submission data
      const submissionData = {
        ...formData,
        fluids: fluids.map(fluid => ({
          fluidType: fluid.fluidType || "",
          brandName: fluid.brandName || "",
          grade: fluid.grade || "",
          ratePerLiter: fluid.ratePerLiter || 0,
          usedFor: fluid.usedFor || ""
        })),
        staffMembers: staffMembers.map(staff => ({
          name: staff.name || "",
          phoneNumber: staff.phoneNumber || "",
          specialist: staff.specialist || "",
          photoLink: staff.photoLink || "",
          notes: staff.notes || ""
        }))
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

  // This function will be used for navigation button clicks - not form submission
  const navigateSteps = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(currentStep - 1)
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
        <div className="form-container">
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
              onClick={() => navigateSteps('prev')}
              disabled={currentStep === 0}
              className="flex items-center border-primary text-primary"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button 
                type="button" 
                onClick={() => navigateSteps('next')} 
                className="flex items-center brand-gradient text-white brand-shadow"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className="inline-block">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="brand-gradient text-white brand-shadow flex items-center"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentAndServicesStepProps {
  formData: {
    upiId: string;
    bankAccountNumber: string;
    ifscCode: string;
    billingFrequency: string;
    preferredPaymentMode: string;
    services: Array<{
      serviceId: string;
      serviceName: string;
      isOffered: boolean;
      hatchbackPrice: number;
      sedanPrice: number;
      suvPrice: number;
      duration: number;
    }>;
    [key: string]: any;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (id: string, value: string) => void;
  handleServiceChange: (serviceData: any) => void;
}

export default function PaymentAndServicesStep({ 
  formData, 
  handleInputChange, 
  handleSelectChange,
  handleServiceChange
}: PaymentAndServicesStepProps) {
  const [checkedServices, setCheckedServices] = useState<{ [key: string]: boolean }>({})

  const handleServiceCheck = (id: string) => {
    const newCheckedState = !checkedServices[id]
    setCheckedServices((prev) => ({
      ...prev,
      [id]: newCheckedState,
    }))

    // If unchecking, remove service from services array
    if (!newCheckedState) {
      const updatedServices = formData.services.filter(service => service.serviceId !== id)
      handleServiceChange(updatedServices)
    } else {
      // If checking, add default service object
      const serviceName = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      const newService = {
        serviceId: id,
        serviceName,
        isOffered: true,
        hatchbackPrice: 0,
        sedanPrice: 0,
        suvPrice: 0,
        duration: 0
      }
      handleServiceChange([...formData.services, newService])
    }
  }

  const updateServicePrice = (serviceId: string, field: string, value: number) => {
    const updatedServices = formData.services.map(service => {
      if (service.serviceId === serviceId) {
        return { ...service, [field]: value }
      }
      return service
    })
    handleServiceChange(updatedServices)
  }

  // Initialize checked states from existing services
  useState(() => {
    const initialCheckedState: { [key: string]: boolean } = {}
    formData.services.forEach(service => {
      initialCheckedState[service.serviceId] = true
    })
    setCheckedServices(initialCheckedState)
  })

  // Helper function to create service items with price fields
  const ServiceItem = ({ id, label }: { id: string; label: string }) => {
    const service = formData.services.find(s => s.serviceId === id) || {
      hatchbackPrice: 0,
      sedanPrice: 0,
      suvPrice: 0,
      duration: 0
    }

    return (
      <div className="border rounded-lg p-4 mb-4 transition-all duration-200 hover:shadow-md hover:border-primary">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={id}
            checked={checkedServices[id] || false}
            onCheckedChange={() => handleServiceCheck(id)}
            className="h-5 w-5"
          />
          <Label htmlFor={id} className="font-medium">
            {label}
          </Label>
        </div>

        {checkedServices[id] && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pl-6 pt-3 border-t border-gray-100">
            <div className="space-y-2">
              <Label htmlFor={`${id}-hatchback`} className="text-sm text-gray-600">
                Hatchback Price
              </Label>
              <Input
                id={`${id}-hatchback`}
                value={service.hatchbackPrice || ''}
                onChange={(e) => updateServicePrice(id, 'hatchbackPrice', parseFloat(e.target.value) || 0)}
                type="number"
                placeholder="Hatchback Price"
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-sedan`} className="text-sm text-gray-600">
                Sedan Price
              </Label>
              <Input 
                id={`${id}-sedan`} 
                value={service.sedanPrice || ''}
                onChange={(e) => updateServicePrice(id, 'sedanPrice', parseFloat(e.target.value) || 0)}
                type="number"
                placeholder="Sedan Price" 
                className="focus:ring-2 focus:ring-primary/20" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-suv`} className="text-sm text-gray-600">
                SUV Price
              </Label>
              <Input 
                id={`${id}-suv`} 
                value={service.suvPrice || ''}
                onChange={(e) => updateServicePrice(id, 'suvPrice', parseFloat(e.target.value) || 0)}
                type="number"
                placeholder="SUV Price" 
                className="focus:ring-2 focus:ring-primary/20" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-duration`} className="text-sm text-gray-600">
                Duration (minutes)
              </Label>
              <Input 
                id={`${id}-duration`} 
                value={service.duration || ''}
                onChange={(e) => updateServicePrice(id, 'duration', parseInt(e.target.value) || 0)}
                type="number"
                placeholder="Duration" 
                className="focus:ring-2 focus:ring-primary/20" 
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="upiId">UPI ID</Label>
          <Input 
            id="upiId" 
            value={formData.upiId}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
          <Input 
            id="bankAccountNumber" 
            value={formData.bankAccountNumber}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input 
            id="ifscCode" 
            value={formData.ifscCode}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="billingFrequency">Billing Frequency</Label>
          <Select 
            value={formData.billingFrequency}
            onValueChange={(value) => handleSelectChange("billingFrequency", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredPaymentMode">Preferred Mode of Payment</Label>
        <Select 
          value={formData.preferredPaymentMode}
          onValueChange={(value) => handleSelectChange("preferredPaymentMode", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upi">UPI</SelectItem>
            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
            <SelectItem value="cheque">Cheque</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold py-2 border-b-2 border-primary/30 mb-6">Services Offered</h3>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">Periodic Services</h4>
          <div className="space-y-2">
            <ServiceItem id="general-checkup" label="General Checkup" />
            <ServiceItem id="engine-oil-change" label="Engine Oil Change" />
            <ServiceItem id="oil-filter-replacement" label="Oil Filter Replacement" />
            <ServiceItem id="air-filter-replacement" label="Air Filter Replacement" />
            <ServiceItem id="ac-filter-replacement" label="AC Filter Replacement" />
            <ServiceItem id="fuel-filter-replacement" label="Fuel Filter Replacement" />
            <ServiceItem id="all-top-ups" label="All-Top Ups" />
            <ServiceItem id="top-wash" label="Top Wash" />
            <ServiceItem id="washing-interior-vacuum" label="Washing + Interior Vacuum" />
            <ServiceItem id="throttle-body-cleaning" label="Throttle Body Cleaning" />
            <ServiceItem id="spark-plug-cleaning" label="Spark Plug Cleaning" />
            <ServiceItem id="spark-plug-replacement" label="Spark Plug Replacement" />
            <ServiceItem id="timing-belt-adjustment" label="Timing Belt Adjustment" />
            <ServiceItem id="fuel-injector-cleaning" label="Fuel Injector Cleaning" />
            <ServiceItem id="wiper-replacement" label="Wiper Replacement" />
            <ServiceItem id="wiper-motor-replacement" label="Wiper Motor Replacement" />
            <ServiceItem id="water-pump-belt-replacement" label="Water Pump Belt Replacement" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">Brake Maintenance</h4>
          <div className="space-y-2">
            <ServiceItem id="brake-pad" label="Front Brake Pad (Opening and Fitting)" />
            <ServiceItem id="brake-shoes" label="Rear Brake Shoes (Opening and Fitting)" />
            <ServiceItem id="brake-disc" label="Front Brake Disc (Opening and Fitting)" />
            <ServiceItem id="caliper-pin" label="Caliper Pin Replacement" />
            <ServiceItem id="disc-turning" label="Disc Turning" />
            <ServiceItem id="hand-brake" label="Hand Brake Wire Replacement" />
            <ServiceItem id="brake-drums" label="Brake Drums Turning" />
            <ServiceItem id="wheel-cylinder" label="Wheel Cylinder Turning" />
            <ServiceItem id="headlight-adjustment" label="Headlight Adjustment" />
            <ServiceItem id="caliper-greasing" label="Caliper Pin Greasing" />
            <ServiceItem id="front-brake-cleaning" label="Front Brake Pads Cleaning" />
            <ServiceItem id="rear-brake-cleaning" label="Rear Brake Pad/Shoes Cleaning" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4 text-primary">AC Services</h4>
          <div className="space-y-2">
            <ServiceItem id="condenser-cleaning" label="Condenser Cleaning" />
            <ServiceItem id="ac-filter-cleaning" label="AC Filter Cleaning" />
            <ServiceItem id="cooling-coil-cleaning" label="Cooling Coil Cleaning" />
            <ServiceItem id="cooling-coil-replacement" label="Cooling Coil Replacement" />
            <ServiceItem id="condenser-replacement" label="Condenser Replacement" />
            <ServiceItem id="compressor-replacement" label="Compressor Replacement" />
            <ServiceItem id="heating-coil-replacement" label="Heating Coil Replacement" />
            <ServiceItem id="v-belt-replacement" label="V-Belt Replacement" />
            <ServiceItem id="ac-blower-replacement" label="AC Blower Motor Replacement" />
            <ServiceItem id="compressor-belt-replacement" label="Compressor Belt Replacement" />
          </div>
        </div>
      </div>
    </div>
  )
}
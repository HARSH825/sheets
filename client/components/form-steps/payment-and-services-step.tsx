"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PaymentAndServicesStep() {
  const [checkedServices, setCheckedServices] = useState({})

  const handleServiceCheck = (id: string) => {
    setCheckedServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Helper function to create service items with price fields
  const ServiceItem = ({ id, label }: { id: string; label: string }) => (
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
              placeholder="Hatchback Price"
              className="focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-sedan`} className="text-sm text-gray-600">
              Sedan Price
            </Label>
            <Input id={`${id}-sedan`} placeholder="Sedan Price" className="focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-suv`} className="text-sm text-gray-600">
              SUV Price
            </Label>
            <Input id={`${id}-suv`} placeholder="SUV Price" className="focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-duration`} className="text-sm text-gray-600">
              Duration (minutes)
            </Label>
            <Input id={`${id}-duration`} placeholder="Duration" className="focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="upiId">UPI ID</Label>
          <Input id="upiId" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
          <Input id="bankAccountNumber" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input id="ifscCode" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="billingFrequency">Billing Frequency</Label>
          <Select>
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
        <Select>
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

        {/* Additional service categories */}
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

        {/* More service categories would be listed here */}
        {/* For brevity, I've included just a few categories */}
      </div>
    </div>
  )
}

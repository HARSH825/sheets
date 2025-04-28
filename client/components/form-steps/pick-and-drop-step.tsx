"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface PickAndDropStepProps {
  formData: {
    isPickDropAvailable: boolean;
    pickDropType: string;
    pickDropCharges: string;
    serviceArea: string;
    [key: string]: any;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (id: string, value: string) => void;
  handleRadioChange: (name: string, value: string) => void;
}

export default function PickAndDropStep({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleRadioChange 
}: PickAndDropStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Is Pick & Drop Available?</Label>
        <RadioGroup 
          value={formData.isPickDropAvailable ? "yes" : "no"} 
          onValueChange={(value) => handleRadioChange("isPickDropAvailable", value)} 
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pickup-yes" />
            <Label htmlFor="pickup-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pickup-no" />
            <Label htmlFor="pickup-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.isPickDropAvailable && (
        <>
          <div className="space-y-2">
            <Label htmlFor="pickDropType">Free or Paid</Label>
            <Select 
              value={formData.pickDropType}
              onValueChange={(value) => handleSelectChange("pickDropType", value)}
            >
              <SelectTrigger id="pickDropType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickDropCharges">Charges</Label>
            <Select 
              value={formData.pickDropCharges}
              onValueChange={(value) => handleSelectChange("pickDropCharges", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select charging type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="fixed">Fixed Rate</SelectItem>
                <SelectItem value="distance">Distance Based</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceArea">Service Area</Label>
            <Textarea 
              id="serviceArea" 
              value={formData.serviceArea}
              onChange={handleInputChange}
              placeholder="Enter the areas you provide service to" 
              className="min-h-[100px]" 
            />
          </div>
        </>
      )}
    </div>
  )
}
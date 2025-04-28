"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface GarageInfoStepProps {
  formData: {
    garageName: string;
    ownerName: string;
    phoneNumber1: string;
    phoneNumber2: string;
    whatsappNumber: string;
    pincode: string;
    operatingHours: string;
    weeklyOff: string;
    workshopType: string;
    gstNumber: string;
    panNumber: string;
    dateOnboarded: string;
    referredBy: string;
    mechHelpContact: string;
    workshopAddress: string;
    [key: string]: any;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (id: string, value: string) => void;
}

export default function GarageInfoStep({ 
  formData, 
  handleInputChange, 
  handleSelectChange 
}: GarageInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="garageName">Garage Name</Label>
          <Input 
            id="garageName" 
            value={formData.garageName} 
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input 
            id="ownerName" 
            value={formData.ownerName} 
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber1">Phone Number 1</Label>
          <Input 
            id="phoneNumber1" 
            value={formData.phoneNumber1} 
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber2">Phone Number 2</Label>
          <Input 
            id="phoneNumber2" 
            value={formData.phoneNumber2} 
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
          <Select onValueChange={(value) => handleSelectChange("whatsappNumber", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select WhatsApp number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="phone1">Phone Number 1</SelectItem>
              <SelectItem value="phone2">Phone Number 2</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode</Label>
          <Input 
            id="pincode" 
            value={formData.pincode}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="operatingHours">Operating Hours</Label>
          <Input 
            id="operatingHours" 
            value={formData.operatingHours}
            onChange={handleInputChange}
            placeholder="e.g. 9 AM - 8 PM" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weeklyOff">Weekly Off</Label>
          <Input 
            id="weeklyOff" 
            value={formData.weeklyOff}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="workshopType">Type of Workshop</Label>
          <Select onValueChange={(value) => handleSelectChange("workshopType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select workshop type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="two-wheeler">Two-Wheeler</SelectItem>
              <SelectItem value="four-wheeler">Four-Wheeler</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gstNumber">GST Number</Label>
          <Input 
            id="gstNumber" 
            value={formData.gstNumber}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="panNumber">PAN Number</Label>
          <Input 
            id="panNumber" 
            value={formData.panNumber}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOnboarded">Date Onboarded</Label>
          <div className="relative">
            <Input 
              id="dateOnboarded" 
              value={formData.dateOnboarded}
              onChange={handleInputChange}
              placeholder="dd-mm-yyyy" 
              type="date" 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="referredBy">Referred By (if any)</Label>
          <Input 
            id="referredBy" 
            value={formData.referredBy}
            onChange={handleInputChange}
            placeholder="Service Manager / Referral Code" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mechHelpContact">MechHelp Point of Contact</Label>
          <Input 
            id="mechHelpContact" 
            value={formData.mechHelpContact}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workshopAddress">Workshop Address</Label>
        <Textarea 
          id="workshopAddress" 
          value={formData.workshopAddress}
          onChange={handleInputChange}
          placeholder="" 
          className="min-h-[100px]" 
        />
      </div>
    </div>
  )
}
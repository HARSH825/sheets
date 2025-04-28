"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function GarageInfoStep() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="garageName">Garage Name</Label>
          <Input id="garageName" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber1">Phone Number 1</Label>
          <Input id="phoneNumber1" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber2">Phone Number 2</Label>
          <Input id="phoneNumber2" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
          <Select>
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
          <Input id="pincode" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="operatingHours">Operating Hours</Label>
          <Input id="operatingHours" placeholder="e.g. 9 AM - 8 PM" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weeklyOff">Weekly Off</Label>
          <Input id="weeklyOff" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="workshopType">Type of Workshop</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select workshop type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="authorized">Two-Wheeler</SelectItem>
              <SelectItem value="independent">Four-Wheeler</SelectItem>
              <SelectItem value="specialized">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gstNumber">GST Number</Label>
          <Input id="gstNumber" placeholder="" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="panNumber">PAN Number</Label>
          <Input id="panNumber" placeholder="" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOnboarded">Date Onboarded</Label>
          <div className="relative">
            <Input id="dateOnboarded" placeholder="dd-mm-yyyy" type="date" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="referredBy">Referred By (if any)</Label>
          <Input id="referredBy" placeholder="Service Manager / Referral Code" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mechHelpContact">MechHelp Point of Contact</Label>
          <Input id="mechHelpContact" placeholder="" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workshopAddress">Workshop Address</Label>
        <Textarea id="workshopAddress" placeholder="" className="min-h-[100px]" />
      </div>
    </div>
  )
}

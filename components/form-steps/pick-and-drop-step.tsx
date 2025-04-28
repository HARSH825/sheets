"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function PickAndDropStep() {
  const [isPickDropAvailable, setIsPickDropAvailable] = useState("no")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Is Pick & Drop Available?</Label>
        <RadioGroup value={isPickDropAvailable} onValueChange={setIsPickDropAvailable} className="flex gap-4">
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

      {isPickDropAvailable === "yes" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="freeOrPaid">Free or Paid</Label>
            <Input id="freeOrPaid" placeholder="" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="charges">Charges</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="" />
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
            <Textarea id="serviceArea" placeholder="" className="min-h-[100px]" />
          </div>
        </>
      )}
    </div>
  )
}

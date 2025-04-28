"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

export interface Fluid {
  id: number;
  fluidType?: string;
  brandName?: string;
  grade?: string;
  ratePerLiter?: number;
  usedFor?: string;
}

export interface AvailableBrandsStepProps {
  fluids: Fluid[];
  setFluids: React.Dispatch<React.SetStateAction<Fluid[]>>;
  handleFluidChange: (id: number, field: string, value: string | number) => void;
}

export default function AvailableBrandsStep({ fluids, setFluids, handleFluidChange }: AvailableBrandsStepProps) {
  const addFluid = () => {
    const newId = fluids.length > 0 ? Math.max(...fluids.map((f) => f.id)) + 1 : 1
    setFluids([...fluids, { id: newId }])
  }

  const removeFluid = (id: number) => {
    setFluids(fluids.filter((fluid) => fluid.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-primary">Available Fluids</h3>
        <Button
          type="button"
          onClick={addFluid}
          variant="outline"
          className="flex items-center border-primary text-primary"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Fluid
        </Button>
      </div>

      {fluids.map((fluid, index) => (
        <div key={fluid.id} className="border rounded-lg p-6 relative hover:border-primary transition-colors">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => removeFluid(fluid.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <h4 className="font-semibold text-lg py-2 border-b border-gray-200 mb-4">Fluid {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`fluidType-${fluid.id}`}>Fluid Type</Label>
              <Select 
                value={fluid.fluidType}
                onValueChange={(value) => handleFluidChange(fluid.id, "fluidType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Fluid Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engine-oil">Engine Oil</SelectItem>
                  <SelectItem value="brake-fluid">Brake Fluid</SelectItem>
                  <SelectItem value="coolant">Coolant</SelectItem>
                  <SelectItem value="transmission-fluid">Transmission Fluid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`brandName-${fluid.id}`}>Brand Name</Label>
              <Input 
                id={`brandName-${fluid.id}`} 
                value={fluid.brandName || ''}
                onChange={(e) => handleFluidChange(fluid.id, "brandName", e.target.value)}
                placeholder="e.g. Castrol, Shell" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`grade-${fluid.id}`}>Grade (if applicable)</Label>
              <Input 
                id={`grade-${fluid.id}`} 
                value={fluid.grade || ''}
                onChange={(e) => handleFluidChange(fluid.id, "grade", e.target.value)}
                placeholder="e.g. 5W-30, 10W-40" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`rate-${fluid.id}`}>Rate/L</Label>
              <Input 
                id={`rate-${fluid.id}`} 
                type="number"
                value={fluid.ratePerLiter || ''}
                onChange={(e) => handleFluidChange(fluid.id, "ratePerLiter", parseFloat(e.target.value) || 0)}
                placeholder="Price per liter" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`usedFor-${fluid.id}`}>Used For (Vehicle Types)</Label>
            <Input 
              id={`usedFor-${fluid.id}`} 
              value={fluid.usedFor || ''}
              onChange={(e) => handleFluidChange(fluid.id, "usedFor", e.target.value)}
              placeholder="e.g. All Petrol Cars, Diesel SUVs" 
            />
          </div>
        </div>
      ))}

      {fluids.length === 0 && (
        <Button
          type="button"
          onClick={addFluid}
          className="w-full flex items-center justify-center brand-gradient text-white brand-shadow"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Fluid
        </Button>
      )}
    </div>
  )
}
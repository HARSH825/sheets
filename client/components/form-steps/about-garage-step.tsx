"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AboutGarageStepProps {
  formData: {
    yearEstablished: string;
    foundedBy: string;
    inspiration: string;
    growthJourney: string;
    challengesFaced: string;
    milestones: string;
    visionValues: string;
    [key: string]: any;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function AboutGarageStep({ formData, handleInputChange }: AboutGarageStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="yearEstablished">Year Established</Label>
          <Input 
            id="yearEstablished" 
            value={formData.yearEstablished}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foundedBy">Founded By</Label>
          <Input 
            id="foundedBy" 
            value={formData.foundedBy}
            onChange={handleInputChange}
            placeholder="" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inspiration">Inspiration / Reason</Label>
        <Textarea 
          id="inspiration" 
          value={formData.inspiration}
          onChange={handleInputChange}
          placeholder="What inspired you to start this garage?" 
          className="min-h-[100px]" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="growthJourney">Growth Journey</Label>
        <Textarea
          id="growthJourney"
          value={formData.growthJourney}
          onChange={handleInputChange}
          placeholder="Tell us about your garage's growth journey"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="challengesFaced">Challenges Faced</Label>
        <Textarea
          id="challengesFaced"
          value={formData.challengesFaced}
          onChange={handleInputChange}
          placeholder="What challenges did you face and how did you overcome them?"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="milestones">Milestones</Label>
        <Textarea
          id="milestones"
          value={formData.milestones}
          onChange={handleInputChange}
          placeholder="Share your major achievements and milestones"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="visionValues">Vision & Values</Label>
        <Textarea
          id="visionValues"
          value={formData.visionValues}
          onChange={handleInputChange}
          placeholder="What are your garage's vision and core values?"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )
}
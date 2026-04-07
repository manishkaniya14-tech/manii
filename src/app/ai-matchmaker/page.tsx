"use client"

import { useState } from "react"
import { aiDoctorMatchmaker, type AiDoctorMatchmakerOutput } from "@/ai/flows/ai-doctor-matchmaker-flow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Stethoscope, ArrowRight, UserCheck } from "lucide-react"
import { DOCTORS } from "@/lib/mock-data"
import Link from "next/link"
import Image from "next/image"

export default function AiMatchmakerPage() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AiDoctorMatchmakerOutput | null>(null)

  const handleConsult = async () => {
    if (!input.trim()) return
    setIsLoading(true)
    try {
      const output = await aiDoctorMatchmaker({ symptomsOrDetails: input })
      setResult(output)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Find actual doctors matching suggested specialties
  const recommendedDoctors = result 
    ? DOCTORS.filter(doc => result.suggestedSpecialties.some(s => 
        doc.department.toLowerCase().includes(s.toLowerCase()) || 
        doc.specialization.toLowerCase().includes(s.toLowerCase()) ||
        (s === "General Practitioner" && doc.department === "General Medicine")
      ))
    : []

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex flex-col gap-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20">
            <Sparkles className="h-4 w-4" />
            AI Powered Health Assistant
          </div>
          <h1 className="text-4xl font-bold tracking-tight">AI Doctor Matchmaker</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Describe your symptoms or health concerns in natural language, and our AI will recommend the most suitable specialists for your needs.
          </p>
        </div>

        <Card className="shadow-xl border-accent/20">
          <CardHeader>
            <CardTitle>Describe your concern</CardTitle>
            <CardDescription>Include symptoms, duration, or any specific appointment preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea 
              placeholder="Example: I've had a persistent headache and sensitivity to light for two days. I'd prefer a morning appointment."
              className="min-h-[120px] text-lg resize-none border-accent/30 focus-visible:ring-accent"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button 
              size="lg" 
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-14 text-lg rounded-xl shadow-lg shadow-accent/20"
              disabled={isLoading || !input.trim()}
              onClick={handleConsult}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Analyzing your symptoms...
                </>
              ) : (
                <>
                  Get Specialist Recommendations <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <Card className="bg-accent/5 border-accent/20 shadow-none">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-accent">AI Consultation Summary</h3>
                      <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.suggestedSpecialties.map((s, i) => (
                        <Badge key={i} className="bg-accent text-white px-3 py-1">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-primary" />
                Recommended Specialists
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {recommendedDoctors.length > 0 ? (
                  recommendedDoctors.map((doc) => (
                    <Card key={doc.id} className="group hover:border-primary transition-colors overflow-hidden">
                      <div className="flex p-4 gap-4">
                        <div className="h-20 w-20 relative rounded-xl overflow-hidden shrink-0">
                          <Image 
                            src={doc.image} 
                            alt={doc.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-bold group-hover:text-primary transition-colors">{doc.name}</h4>
                          <p className="text-xs text-muted-foreground">{doc.department}</p>
                          <p className="text-xs font-medium text-accent">{doc.specialization}</p>
                          <Button size="sm" variant="link" asChild className="p-0 h-auto text-primary">
                            <Link href={`/book?doctor=${doc.id}`}>Book Visit <ArrowRight className="ml-1 h-3 w-3" /></Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                    <p>No matching specialists currently available in our immediate network. Please consult a <Link href="/search?dept=General Medicine" className="text-primary font-bold hover:underline">General Practitioner</Link> for further guidance.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

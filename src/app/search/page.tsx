"use client"

import { useState, useMemo } from "react"
import { DOCTORS, DEPARTMENTS } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Search, Stethoscope, User, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDept, setSelectedDept] = useState("all")

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDept = selectedDept === "all" || doc.department === selectedDept

      return matchesSearch && matchesDept
    })
  }, [searchTerm, selectedDept])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Find Your Specialist</h1>
          <p className="text-muted-foreground">Search through our world-class medical professionals and book your visit today.</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 bg-card p-6 rounded-2xl border shadow-sm sticky top-20 z-10">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or specialization..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedDept("all"); }}>
            Clear Filters
          </Button>
        </div>

        {/* Results */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <Card key={doc.id} className="overflow-hidden hover:shadow-lg transition-shadow border-t-0">
                <div className="aspect-[4/3] relative">
                  <Image 
                    src={doc.image} 
                    alt={doc.name} 
                    fill 
                    className="object-cover"
                    data-ai-hint="doctor professional portrait"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-primary hover:bg-white backdrop-blur-sm">
                    {doc.department}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{doc.name}</h3>
                    <p className="text-sm text-accent font-medium">{doc.specialization}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{doc.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      <span>{doc.experience} experience</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href={`/book?doctor=${doc.id}`}>Book Appointment</Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <Search className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-semibold">Doctor not found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              <Button onClick={() => { setSearchTerm(""); setSelectedDept("all"); }}>Show All Doctors</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

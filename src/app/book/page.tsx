"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { DOCTORS, TIME_SLOTS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { addDays, format, isBefore, startOfToday } from "date-fns"
import { Calendar as CalendarIcon, Clock, CheckCircle2, User, Loader2 } from "lucide-react"

function BookingForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  
  const [selectedDoctorId, setSelectedDoctorId] = useState(searchParams.get("doctor") || "")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])

  // Simulate loading already booked slots when date changes
  useEffect(() => {
    if (date && selectedDoctorId) {
      // In a real app, fetch from DB
      setBookedSlots(["10:00 AM", "02:30 PM"]) 
    }
  }, [date, selectedDoctorId])

  const handleBooking = async () => {
    if (!selectedDoctorId) {
      toast({ variant: "destructive", title: "Error", description: "Please select a doctor" })
      return
    }
    if (!date) {
      toast({ variant: "destructive", title: "Error", description: "Please select a valid future date" })
      return
    }
    if (!timeSlot) {
      toast({ variant: "destructive", title: "Error", description: "Please select an available time slot" })
      return
    }

    if (isBefore(date, startOfToday())) {
      toast({ variant: "destructive", title: "Error", description: "Please select a valid future date" })
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const appointments = JSON.parse(localStorage.getItem('healthsync_appointments') || '[]')
    const doctor = DOCTORS.find(d => d.id === selectedDoctorId)
    
    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId: selectedDoctorId,
      doctorName: doctor?.name,
      department: doctor?.department,
      date: date.toISOString(),
      time: timeSlot,
      status: 'active'
    }

    appointments.push(newAppointment)
    localStorage.setItem('healthsync_appointments', JSON.stringify(appointments))

    toast({
      title: "Appointment booked successfully",
      description: `Your visit with ${doctor?.name} is confirmed for ${format(date, 'PPP')} at ${timeSlot}.`,
    })

    setIsSubmitting(false)
    router.push("/my-appointments")
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Selection Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              1. Choose a Specialist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
              <SelectTrigger className="h-14">
                <SelectValue placeholder="Select a specialist" />
              </SelectTrigger>
              <SelectContent>
                {DOCTORS.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    <div className="flex flex-col">
                      <span className="font-semibold">{doc.name}</span>
                      <span className="text-xs text-muted-foreground">{doc.department} - {doc.specialization}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              2. Select Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label>Pick a date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto md:mx-0"
                disabled={(date) => isBefore(date, startOfToday())}
              />
            </div>
            <div className="space-y-4">
              <Label>Select Time Slot</Label>
              {date ? (
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot)
                    return (
                      <Button
                        key={slot}
                        variant={timeSlot === slot ? "default" : "outline"}
                        className={isBooked ? "opacity-50 cursor-not-allowed line-through" : ""}
                        disabled={isBooked}
                        onClick={() => !isBooked && setTimeSlot(slot)}
                      >
                        {slot}
                      </Button>
                    )
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 border rounded-lg border-dashed text-muted-foreground">
                  <Clock className="h-8 w-8 mb-2 opacity-20" />
                  <p className="text-sm">Please select a date first to view available time slots.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Column */}
      <div className="space-y-6">
        <Card className="sticky top-24 shadow-lg border-primary/20">
          <CardHeader className="bg-primary/5">
            <CardTitle>Appointment Summary</CardTitle>
            <CardDescription>Review your selection before booking</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Doctor</span>
                <span className="font-medium">{selectedDoctorId ? DOCTORS.find(d => d.id === selectedDoctorId)?.name : 'Not selected'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Department</span>
                <span className="font-medium">{selectedDoctorId ? DOCTORS.find(d => d.id === selectedDoctorId)?.department : 'Not selected'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{date ? format(date, 'PPP') : 'Not selected'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{timeSlot || 'Not selected'}</span>
              </div>
            </div>

            <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
              <div className="flex gap-3 text-accent text-sm items-start">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <p>Free cancellation up to 24 hours before the appointment.</p>
              </div>
            </div>

            <Button 
              className="w-full h-12 text-lg shadow-lg shadow-primary/20" 
              size="lg"
              disabled={isSubmitting || !selectedDoctorId || !date || !timeSlot}
              onClick={handleBooking}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Booking...
                </>
              ) : (
                "Confirm Appointment"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Book an Appointment</h1>
          <p className="text-muted-foreground">Complete the steps below to schedule your visit.</p>
        </div>
        
        <Suspense fallback={<div>Loading booking options...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  )
}

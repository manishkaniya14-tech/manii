"use client"

import { useState, useEffect } from "react"
import { format, isPast } from "date-fns"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, MapPin, User, AlertCircle, CalendarX } from "lucide-react"

interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  department: string
  date: string
  time: string
  status: 'active' | 'cancelled'
}

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem('healthsync_appointments')
    if (saved) {
      setAppointments(JSON.parse(saved))
    }
  }, [])

  const handleCancel = (id: string) => {
    const updated = appointments.map(app => {
      if (app.id === id) {
        if (app.status === 'cancelled') {
           toast({ variant: "destructive", title: "Error", description: "Appointment already cancelled" })
           return app
        }
        return { ...app, status: 'cancelled' as const }
      }
      return app
    })
    
    setAppointments(updated)
    localStorage.setItem('healthsync_appointments', JSON.stringify(updated))
    
    toast({
      title: "Appointment cancelled successfully",
      description: "Your slot has been released and the specialist has been notified.",
    })
  }

  const activeAppointments = appointments.filter(a => a.status === 'active')
  const pastAppointments = appointments.filter(a => a.status === 'cancelled' || isPast(new Date(a.date)))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <p className="text-muted-foreground">Manage your scheduled visits and medical history.</p>
        </div>

        <div className="space-y-8">
          {/* Active Appointments */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Visits
            </h2>
            {activeAppointments.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeAppointments.map((app) => (
                  <Card key={app.id} className="relative overflow-hidden border-l-4 border-l-primary shadow-md">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="secondary" className="mb-2">{app.department}</Badge>
                          <CardTitle className="text-lg">{app.doctorName}</CardTitle>
                        </div>
                        <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(app.date), 'EEEE, MMM do, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{app.time}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/5">
                            Cancel Appointment
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will cancel your appointment with {app.doctorName} on {format(new Date(app.date), 'PPP')}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleCancel(app.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Yes, Cancel it
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarX className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No upcoming appointments</h3>
                <p className="text-muted-foreground mb-6">You haven't booked any appointments yet.</p>
                <Button asChild>
                  <a href="/search">Find a Doctor</a>
                </Button>
              </div>
            )}
          </section>

          {/* Past/Cancelled */}
          {pastAppointments.length > 0 && (
            <section className="space-y-4 pt-10 border-t">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-5 w-5" />
                Past & Cancelled
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
                {pastAppointments.map((app) => (
                  <Card key={app.id} className="bg-muted/5">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base text-muted-foreground">{app.doctorName}</CardTitle>
                        <Badge variant={app.status === 'cancelled' ? 'destructive' : 'outline'}>
                          {app.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      <p>{format(new Date(app.date), 'PPP')} @ {app.time}</p>
                      <p className="mt-1">{app.department}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Stethoscope, 
  Calendar, 
  Search, 
  UserPlus, 
  Sparkles,
  ArrowRight
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-700">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight">
                Your Health, <br />
                <span className="text-accent">Our Priority.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Book appointments with the best doctors effortlessly. Experience healthcare that's smart, simple, and synchronized.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild className="rounded-full px-8 shadow-lg shadow-primary/20">
                  <Link href="/book">Book Now <Calendar className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                  <Link href="/search">Find a Doctor</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center animate-subtle-float">
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-primary to-accent rounded-3xl rotate-3 flex items-center justify-center p-8 shadow-2xl">
                 <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl -rotate-6"></div>
                 <Stethoscope className="w-48 h-48 text-white relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Quick Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-xl transition-all hover:-translate-y-1 group">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <UserPlus className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <CardTitle className="text-xl">Registration</CardTitle>
              <p className="text-sm text-muted-foreground">Join our community to manage your medical records and bookings.</p>
              <Button variant="link" asChild className="p-0 h-auto self-start text-primary">
                <Link href="/register" className="flex items-center gap-1">Get Started <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-1 group border-accent/20">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <Sparkles className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <CardTitle className="text-xl">AI Matchmaker</CardTitle>
              <p className="text-sm text-muted-foreground">Not sure who to see? Describe your symptoms and let AI help you find a doctor.</p>
              <Button variant="link" asChild className="p-0 h-auto self-start text-accent">
                <Link href="/ai-matchmaker" className="flex items-center gap-1">Consult AI <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-1 group">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Search className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <CardTitle className="text-xl">Search Doctor</CardTitle>
              <p className="text-sm text-muted-foreground">Find specialists by department, name, or availability across our network.</p>
              <Button variant="link" asChild className="p-0 h-auto self-start text-primary">
                <Link href="/search" className="flex items-center gap-1">Start Search <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-1 group">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Calendar className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <CardTitle className="text-xl">Appointments</CardTitle>
              <p className="text-sm text-muted-foreground">Manage your existing bookings, check status, or reschedule with ease.</p>
              <Button variant="link" asChild className="p-0 h-auto self-start text-primary">
                <Link href="/my-appointments" className="flex items-center gap-1">Manage <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-16 border-y">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-bold text-primary">10k+</span>
            <span className="text-sm text-muted-foreground">Happy Patients</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-bold text-primary">150+</span>
            <span className="text-sm text-muted-foreground">Expert Doctors</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-bold text-primary">25+</span>
            <span className="text-sm text-muted-foreground">Departments</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-bold text-primary">24/7</span>
            <span className="text-sm text-muted-foreground">Customer Support</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export type Department = "Cardiology" | "Dermatology" | "Pediatrics" | "General Medicine" | "Neurology" | "Orthopedics";

export interface Doctor {
  id: string;
  name: string;
  department: Department;
  specialization: string;
  availability: string;
  image: string;
  experience: string;
}

export const DEPARTMENTS: Department[] = [
  "General Medicine",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Neurology",
  "Orthopedics"
];

export const DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    department: "General Medicine",
    specialization: "Family Health",
    availability: "Mon-Fri, 9AM - 5PM",
    image: "https://picsum.photos/seed/doc1/400/400",
    experience: "12 years"
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    availability: "Tue-Thu, 10AM - 4PM",
    image: "https://picsum.photos/seed/doc2/400/400",
    experience: "15 years"
  },
  {
    id: "3",
    name: "Dr. Elena Rodriguez",
    department: "Dermatology",
    specialization: "Cosmetic Dermatology",
    availability: "Mon, Wed, Fri, 8AM - 2PM",
    image: "https://picsum.photos/seed/doc3/400/400",
    experience: "8 years"
  },
  {
    id: "4",
    name: "Dr. David Chen",
    department: "Pediatrics",
    specialization: "Child Development",
    availability: "Mon-Fri, 9AM - 4PM",
    image: "https://picsum.photos/seed/doc4/400/400",
    experience: "10 years"
  },
  {
    id: "5",
    name: "Dr. Amara Okafor",
    department: "Neurology",
    specialization: "Sleep Medicine",
    availability: "Tue, Thu, 1PM - 7PM",
    image: "https://picsum.photos/seed/doc5/400/400",
    experience: "20 years"
  },
  {
    id: "6",
    name: "Dr. Michael Foster",
    department: "Orthopedics",
    specialization: "Sports Medicine",
    availability: "Wed-Sat, 10AM - 6PM",
    image: "https://picsum.photos/seed/doc6/400/400",
    experience: "14 years"
  }
];

export const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
];

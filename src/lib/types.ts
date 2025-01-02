import { Appointment, Service, Style } from '@prisma/client';

// Represents a user defined in session
export interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

// Represents a user with basic contact information
export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adminNote: string | null;
}

// Represents a user with their associated appointments
export interface ClientWithAppointments extends Client {
  appointments: Appointment[];
}

// Represents a step in the booking form
export interface Step {
  stepNumber: number;
  label: string;
}

// Represents booking data, including appointment, service, and pricing information
export interface BookingData {
  appointment: Appointment | null;
  style: Style | null;
  service: Service | null;
  servicePrice: number | null;
}

// Represents a service with its associated service options
export interface StyleWithServices extends Style {
  services: Service[];
}

// Represents an appointment with associated service, service option, and client information
export type AppointmentWithData = Appointment & {
  style: Style | null;
  service: Service | null;
  client: Client | null;
  isRegisteredClient: boolean;
};

// Represents an object returned from formatting time to time ago labels
export interface TimeAgo {
  interval: string;
  label: string;
}

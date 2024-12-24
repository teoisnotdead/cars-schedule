interface CreateAppointmentBody {
  user: {
    name: string
    email: string
    address: string
    phone: string
  }
  date: string
  time: string
}

interface UpdateAppointmentBody {
  accessCode: string
  date: string
  time: string
}

interface CancelAppointmentBody {
  accessCode: string
}

export type {
  CreateAppointmentBody,
  UpdateAppointmentBody,
  CancelAppointmentBody,
}

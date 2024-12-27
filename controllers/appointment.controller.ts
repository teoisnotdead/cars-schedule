import { Appointment } from '../models/appointment.model.ts'
import appointments from '../models/appointment.model.ts'
import {
  CreateAppointmentBody,
  UpdateAppointmentBody,
  CancelAppointmentBody,
} from '../interfaces/appointments.interface.ts'
import { sendEmail } from '../utils/email.ts'
import { Context } from '../deps.ts'

// Obtener todas las citas
export const getAppointments = async (ctx: Context) => {
  const allAppointments = await appointments.find({}).toArray()
  ctx.response.status = 200
  ctx.response.body = { success: true, data: allAppointments }
}

// Crear una nueva cita
export const createAppointment = async (ctx: Context) => {
  const { value } = await ctx.request.body({ type: 'json' })
  const body: CreateAppointmentBody = await value

  const { user, date, time } = body

  const existingAppointment = await appointments.findOne({ date, time })
  if (existingAppointment) {
    ctx.response.status = 409
    ctx.response.body = { success: false, message: 'La hora ya está reservada' }
    return
  }

  const accessCode = crypto.randomUUID()

  const newAppointment: Appointment = {
    user,
    date,
    time,
    status: 'pending',
    accessCode,
  }

  const insertedId = await appointments.insertOne(newAppointment)

  // Crea cita
  await sendEmail(
    user.email,
    'Cita Creada',
    user.name,
    date,
    time,
    'Tu cita ha sido creada exitosamente.',
    accessCode
  )

  ctx.response.status = 201
  ctx.response.body = {
    success: true,
    data: { ...newAppointment, _id: insertedId },
  }
}

// Obtener una cita por su código de acceso
export const getAppointmentByCode = async (ctx: Context) => {
  const accessCode = ctx.request.url.searchParams.get('accessCode')

  if (!accessCode) {
    ctx.response.status = 400
    ctx.response.body = {
      success: false,
      message: 'El código de acceso es requerido',
    }
    return
  }

  const appointment = await appointments.findOne({ accessCode })
  if (!appointment) {
    ctx.response.status = 404
    ctx.response.body = { success: false, message: 'Cita no encontrada' }
    return
  }

  ctx.response.status = 200
  ctx.response.body = { success: true, data: appointment }
}

// Obtener horas disponibles
export const getAvailableHours = async (ctx: Context) => {
  const date = ctx.request.url.searchParams.get('date')

  if (!date) {
    ctx.response.status = 400
    ctx.response.body = { success: false, message: 'La fecha es requerida' }
    return
  }

  const allAppointments = await appointments.find({ date }).toArray()
  const bookedHours = allAppointments.map((appointment) => appointment.time)

  const allHours = Array.from({ length: 9 }, (_, i) => `${10 + i}:00`)
  const availableHours = allHours.filter((hour) => !bookedHours.includes(hour))

  ctx.response.status = 200
  ctx.response.body = { success: true, data: availableHours }
}

// Actualizar una cita por código de acceso
export const updateAppointment = async (ctx: Context) => {
  const { value } = await ctx.request.body({ type: 'json' })
  const body: UpdateAppointmentBody = await value

  const { accessCode, date, time } = body

  const appointment = await appointments.findOne({ accessCode })
  if (!appointment) {
    ctx.response.status = 404
    ctx.response.body = { success: false, message: 'Cita no encontrada' }
    return
  }

  const conflictingAppointment = await appointments.findOne({ date, time })
  if (
    conflictingAppointment &&
    conflictingAppointment.accessCode !== accessCode
  ) {
    ctx.response.status = 409
    ctx.response.body = { success: false, message: 'La hora ya está reservada' }
    return
  }

  await appointments.updateOne({ accessCode }, { $set: { date, time } })

  // Enviar correo de confirmación
  await sendEmail(
    appointment.user.email,
    'Cita Actualizada',
    appointment.user.name,
    date,
    time,
    'Tu cita ha sido actualizada exitosamente.',
    accessCode
  )

  const updatedAppointment = {
    ...appointment,
    date,
    time,
  }

  ctx.response.status = 200
  ctx.response.body = {
    success: true,
    message: 'Cita actualizada correctamente',
    data: updatedAppointment,
  }
}

// Cancelar una cita por código de acceso
export const cancelAppointment = async (ctx: Context) => {
  const { value } = await ctx.request.body({ type: 'json' })
  const body: CancelAppointmentBody = await value

  const { accessCode } = body

  if (!accessCode) {
    ctx.response.status = 400
    ctx.response.body = {
      success: false,
      message: 'El código de acceso es requerido',
    }
    return
  }

  const appointment = await appointments.findOne({ accessCode })
  if (!appointment) {
    ctx.response.status = 404
    ctx.response.body = { success: false, message: 'Cita no encontrada' }
    return
  }

  await appointments.deleteOne({ accessCode })

  // Enviar email de cancelación
  await sendEmail(
    appointment.user.email,
    'Cita Cancelada',
    appointment.user.name,
    appointment.date,
    appointment.time,
    'Lamentamos informarte que tu cita ha sido cancelada.',
    accessCode,
    true
  )

  ctx.response.status = 200
  ctx.response.body = { success: true, message: 'Cita cancelada correctamente' }
}

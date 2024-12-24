import { Router } from '../deps.ts'
import {
  getAppointments,
  createAppointment,
  getAppointmentByCode,
  getAvailableHours,
  updateAppointment,
  cancelAppointment,
} from '../controllers/appointment.controller.ts'

const router = new Router()

router.get('/appointments', getAppointments) // Obtener todas las citas
router.get('/appointments/available-hours', getAvailableHours) // Obtener horas disponibles
router.get('/appointments/code', getAppointmentByCode) // Obtener cita por código
router.post('/appointments', createAppointment) // Crear nueva cita
router.put('/appointments', updateAppointment) // Actualizar una cita
router.post('/appointments/cancel', cancelAppointment) // Cancelar una cita

export default router

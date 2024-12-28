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

router.get('/appointments', getAppointments)
router.get('/appointments/available-hours', getAvailableHours)
router.get('/appointments/code', getAppointmentByCode)
router.post('/appointments', createAppointment)
router.put('/appointments', updateAppointment)
router.post('/appointments/cancel', cancelAppointment)

export default router

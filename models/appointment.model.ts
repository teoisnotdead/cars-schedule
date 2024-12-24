import { db } from "../config/mongo.ts"
import { ObjectId } from "../deps.ts"

const appointments = db.collection("appointments")

export interface Appointment {
  _id?: ObjectId
  user: {
    name: string
    email: string
    address: string
    phone: string
  }
  date: string
  time: string
  status: string
  accessCode: string
}

export default appointments

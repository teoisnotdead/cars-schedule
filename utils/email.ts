import { generateEmailTemplate } from './emailTemplate.ts'
import { config } from '../deps.ts'

const { SENDGRID_API_KEY, SMTP_USER } = {
  SENDGRID_API_KEY:
    Deno.env.get('SENDGRID_API_KEY') || config().SENDGRID_API_KEY,
  SMTP_USER: Deno.env.get('SMTP_USER') || config().SMTP_USER,
}

export async function sendEmail(
  to: string,
  subject: string,
  name: string,
  date: string,
  time: string,
  message: string,
  accessCode: string,
  isCancelled: boolean = false
) {
  console.log(`Enviando correo a ${to}: ${subject}`)
  console.log(`Nombre: ${name}`)
  console.log(`Fecha: ${date}`)
  console.log(`Hora: ${time}`)
  console.log(`Mensaje: ${message}`)
  console.log(`Código de acceso: ${accessCode}`)
  console.log(`Cancelado: ${isCancelled}`)
  try {
    const htmlContent = generateEmailTemplate(
      name,
      date,
      time,
      message,
      accessCode,
      isCancelled
    )

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }], subject }],
        from: { email: SMTP_USER },
        content: [{ type: 'text/html', value: htmlContent }],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Error enviando correo:', error)
      throw new Error('No se pudo enviar el correo.')
    }

    console.log(`Correo enviado a ${to}: ${subject}`)
  } catch (error) {
    console.error('Error enviando correo:', error.message)
    throw new Error('No se pudo enviar el correo.')
  }
}

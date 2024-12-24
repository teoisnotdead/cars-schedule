export function generateEmailTemplate(
  name: string,
  date: string,
  time: string,
  message: string,
  accessCode: string,
  isCancelled: boolean = false
): string {
  const dateStyle = isCancelled ? "text-decoration: line-through; color: red;" : "";
  const timeStyle = isCancelled ? "text-decoration: line-through; color: red;" : "";

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
          font-size: 24px;
          color: #007bff;
        }
        .title {
          margin: 0px;
          font-size: 18px;
          font-weight: bold;
          color: #333;
          text-align: center;
        }
        .code-container {
          margin-bottom: 20px;
          text-align: center;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        .details {
          margin-top: 20px;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="header">Hola, ${name}</h1>
        <p>Gracias por usar nuestro servicio. ${message}</p>
        <p class="title">Código de acceso:</p>
        <div class="code-container"><strong>${accessCode}</strong></div>
        <div class="details">
          <p><strong>Fecha:</strong> <span style="${dateStyle}">${date}</span></p>
          <p><strong>Hora:</strong> <span style="${timeStyle}">${time}</span></p>
          <p>Con este código podrás actualizar o cancelar tu cita.</p>
        </div>
        <div class="footer">
          <p>Si tienes alguna duda, por favor contáctanos.</p>
        </div>
      </div>
    </body>
  </html>
  `;
}

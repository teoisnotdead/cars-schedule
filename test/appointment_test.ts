import { assertEquals } from "https://deno.land/std@0.202.0/testing/asserts.ts";
import { createAppointment } from "../controllers/appointment.controller.ts";
import { mockCtx } from "./utils/mockCtx.ts";

Deno.test("Debería crear una cita correctamente", async () => {
  const ctx = mockCtx({
    request: {
      body: () => ({
        value: Promise.resolve({
          user: { id: "123", name: "Juan Pérez", email: "juan@example.com", phone: "123456789" },
          date: "2024-12-20",
          time: "15:00",
        }),
      }),
    },
  });

  await createAppointment(ctx);

  // Validar el estado de la respuesta
  assertEquals(ctx.response.status, 201);

  // Validar el cuerpo de la respuesta
  const responseBody = ctx.response.body as any; // TypeScript necesita saber que `body` no es nulo
  assertEquals(responseBody.success, true);
  assertEquals(responseBody.data.user.name, "Juan Pérez");
});

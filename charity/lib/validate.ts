import { z, ZodType } from "zod";

export async function validateRequest<T extends ZodType<any, any, any>>(
  request: Request,
  schema: T
): Promise<
  { success: true; data: z.infer<T> } | { success: false; response: Response }
> {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return {
        success: false,
        response: new Response(
          JSON.stringify({ success: false, errors: parsed.error }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        ),
      };
    }

    return { success: true, data: parsed.data };
  } catch {
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          success: false,
          message: "Invalid JSON in request body",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      ),
    };
  }
}

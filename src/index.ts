export interface Env {
  DB: D1Database;
  GREETING: string;
  API_KEY: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {

    const url = new URL(request.url);

    // GET /api/notes
    if (url.pathname === "/api/notes") {

      const { results } = await env.DB
        .prepare("SELECT * FROM notes")
        .all();

      return Response.json(
        {
          greeting: env.GREETING,
          notes: results
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    // GET /api/config
    if (url.pathname === "/api/config") {
      return Response.json(
        {
          greeting: env.GREETING,
          hasKey: !!env.API_KEY,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    // Default route
    return Response.json(
      {
        ok: true,
        message: env.GREETING
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  },
};
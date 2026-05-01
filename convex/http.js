import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/assessWebhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // This is where a python service might send back an assessment result 
    // if it was done asynchronously instead of returning directly.
    return new Response("OK", { status: 200 });
  }),
});

export default http;

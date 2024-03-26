// This is your Supabase Function entry point.
export default async function handler(req: Request): Promise<Response> {
  // Only allow POST requests to this function
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Assuming you're sending JSON with details of the booking in the request
  const { details } = await req.json();

  const oneSignalAppId = "d7b7bb14-262f-40fd-9f07-e98221459df8";
  const oneSignalRESTApiKey = "YTlmOTJkZmUtNWRlNy00ZDQyLWJjZTEtOWYwZmU2OGEzODky";

  const message = {
    app_id: oneSignalAppId,
    contents: { "en": `New booking created: ${details}` },
    included_segments: ["Subscribed Users"], // Adjust targeting as needed
  };

  // Use fetch to call OneSignal's API
  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${oneSignalRESTApiKey}`,
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    // Handle errors, e.g., logging or returning an error response
    return new Response("Failed to send notification", { status: 500 });
  }

  // Success
  return new Response("Notification sent successfully", { status: 200 });
}

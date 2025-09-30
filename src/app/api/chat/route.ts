export async function POST(req: Request) {
  try {
    return new Response("Hello, world!", { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

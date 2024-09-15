import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function GET(req: Request) {
  try {
    const { data } = await supabase.from("hotels").select(`
      title
    `);
    return Response.json(data ?? []);
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
}

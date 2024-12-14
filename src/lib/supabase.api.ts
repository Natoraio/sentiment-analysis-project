"use server";

import { createClient } from "@supabase/supabase-js";

export type Sentiment = "negatiive" | "neutral" | "positive";

export const createFeedback = async (
  text: string,
  predict: Sentiment,
  vote: Sentiment
) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );

  await supabase.from("Feedback").insert({ text, predict, vote });
};

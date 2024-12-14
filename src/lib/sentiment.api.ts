"use server";

export const analyse = async (text: string) => {
  const res = await fetch(process.env.SENTIMENT_API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const result = await res.json();

  return result;
};

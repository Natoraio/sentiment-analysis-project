"use server";

import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

export const POST = async (req: NextRequest) => {
  const { text } = await req.json();

  const mapLabels = new Map();
  mapLabels.set("LABEL_0", "negative");
  mapLabels.set("LABEL_1", "neutral");
  mapLabels.set("LABEL_2", "positive");

  const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
  const res = await hf.textClassification({
    model: process.env.MODEL_NAME,
    inputs: text,
  });

  return NextResponse.json({
    label: mapLabels.get(res[0].label),
    score: res[0].score,
  });
};

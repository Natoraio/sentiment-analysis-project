"use server";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { text } = await req.json();

  const { spawn } = require("child_process");
  const python = spawn("python3", ["src/model/main.py", text]);

  let res = "";
  for await (const output of python.stdout) {
    res += output.toString();
  }

  return NextResponse.json(JSON.parse(res));
};

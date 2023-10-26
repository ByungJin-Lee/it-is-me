"use client";

import { Drawing } from "pkg/drawing";
import { useEffect, useRef } from "react";

export default function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef<Drawing | null>(null);

  useEffect(() => {
    if (canvasRef.current && !drawingRef.current) {
      drawingRef.current = new Drawing(canvasRef.current);
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} width={640} height={480} />;
}

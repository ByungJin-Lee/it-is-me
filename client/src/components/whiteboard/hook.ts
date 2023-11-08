import { Drawing } from "pkg/drawing";
import { useEffect, useRef } from "react";

export default function useDrawing() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef<Drawing | null>(null);

  useEffect(() => {
    if (canvasRef.current && !drawingRef.current) {
      drawingRef.current = new Drawing(canvasRef.current);
    }
  }, [canvasRef]);

  return {
    canvasRef,
    drawing: drawingRef.current,
  };
}

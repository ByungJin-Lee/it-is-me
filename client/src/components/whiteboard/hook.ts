import { Drawing } from "pkg/drawing";
import { useEffect, useRef } from "react";

export default function useDrawing(
  fps = 30 // 30fps
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef<Drawing | null>(null);

  useEffect(() => {
    if (canvasRef.current && !drawingRef.current) {
      drawingRef.current = new Drawing(canvasRef.current);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (!drawingRef.current) return;

    let startTime = 0;
    const DIFF = 1000 / fps;

    const draw = (timestamp: number) => {
      if (timestamp - startTime > DIFF) {
        drawingRef.current?.draw();
        startTime = timestamp;
      }
      requestAnimationFrame(draw);
    };

    const id = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [drawingRef, fps]);

  return {
    canvasRef,
    drawing: drawingRef.current,
  };
}

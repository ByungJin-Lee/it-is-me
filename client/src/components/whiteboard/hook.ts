import { Drawing } from "pkg/drawing";
import { DrawingSocket, IClientSocket } from "pkg/drawing-network-toolkit";
import { useEffect, useRef } from "react";

interface Services {
  drawing: Drawing;
  socket: IClientSocket;
}

export default function useDrawing(
  fps = 30 // 30fps
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const services = useRef<Services | null>(null);

  useEffect(() => {
    if (canvasRef.current && !services.current) {
      services.current = {
        drawing: new Drawing(canvasRef.current),
        socket: new DrawingSocket("ws://localhost:8080/api/ws/drawing/connect"),
      };
      initialize(services.current);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (!services.current) return;

    let startTime = 0;
    const DIFF = 1000 / fps;

    const draw = (timestamp: number) => {
      if (timestamp - startTime > DIFF) {
        services.current?.drawing.draw();
        startTime = timestamp;
      }
      requestAnimationFrame(draw);
    };

    const id = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [services, fps]);

  return {
    canvasRef,
    services: services.current,
  };
}

function initialize({ drawing, socket }: Services) {
  drawing.getContext().setOnItemAdded((e) => {
    socket.sendDraw(e);
  });
}

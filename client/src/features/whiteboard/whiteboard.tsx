"use client";

import { IClientSocket } from "pkg/drawing-network-toolkit";
import { useRef } from "react";
import useDrawing from "./hook";

export default function Whiteboard() {
  const { canvasRef, services } = useDrawing();
  const socketRef = useRef<IClientSocket | null>(null);

  const handleClick = () => {
    if (!socketRef.current) return;
  };

  return (
    <>
      <canvas ref={canvasRef} width={640} height={480} />
      <button onClick={handleClick}>click</button>
      <ul>
        {services?.drawing
          .getTool()
          .getTools()
          .map((e) => (
            <li
              key={e}
              onClick={() => services.drawing.getTool().setCurrentTool(e)}
            >
              {e}
            </li>
          ))}
      </ul>
    </>
  );
}

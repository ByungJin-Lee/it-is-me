"use client";

import { IClientSocket } from "pkg/drawing-network-toolkit";
import { useRef } from "react";
import useDrawing from "./hook";

export default function Whiteboard() {
  const { canvasRef } = useDrawing();
  const socketRef = useRef<IClientSocket | null>(null);

  const handleClick = () => {
    if (!socketRef.current) return;

    socketRef.current.send({
      type: "hello",
      data: "value",
    });
  };

  return (
    <>
      <canvas ref={canvasRef} width={640} height={480} />
      <button onClick={handleClick}>click</button>
    </>
  );
}

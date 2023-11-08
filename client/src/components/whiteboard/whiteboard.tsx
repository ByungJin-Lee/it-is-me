"use client";

import { DrawingSocket, IClientSocket } from "pkg/drawing-network-toolkit";
import { useEffect, useRef } from "react";
import useDrawing from "./hook";

export default function Whiteboard() {
  const { canvasRef, drawing } = useDrawing();
  const socketRef = useRef<IClientSocket | null>(null);

  const handleClick = () => {
    if (!socketRef.current) return;

    socketRef.current.send({
      type: "hello",
      data: "value",
    });
  };

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new DrawingSocket(
        "ws://localhost:8080/api/ws/drawing/connect"
      );

      socketRef.current.on("command", (command) => {
        console.log(command);
      });
      socketRef.current.on("connect", () => {
        console.log("connected");
      });
      socketRef.current.on("disconnect", () => {
        console.log("disconnected");
      });
    }
  }, [socketRef]);

  return (
    <>
      <canvas ref={canvasRef} width={640} height={480} />
      <button onClick={handleClick}>click</button>
    </>
  );
}

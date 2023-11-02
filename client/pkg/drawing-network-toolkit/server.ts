import { Server as ServerIO } from "socket.io";
import ClientSocket from "./client";
import SocketPool from "./pool";
import { IServerSocket, ISocketPool } from "./types";

export default class ServerSocket extends ServerIO implements IServerSocket {
  private pool: ISocketPool;

  constructor(...args: ConstructorParameters<typeof ServerIO>) {
    super(...args);
    this.pool = new SocketPool();
    this.initialize();
  }

  private initialize(): void {
    const pl = this.pool;

    this.on("connection", (s) => pl.add(ClientSocket.from(s)));
    this.on("disconnect", (s) => pl.remove(ClientSocket.getId(s)));
  }
  getConnectionPool(): ISocketPool {
    throw new Error("Method not implemented.");
  }
}

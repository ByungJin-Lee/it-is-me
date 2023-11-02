import { Socket } from "socket.io";
import { ClientSocketEventMap, IClientSocket } from "./types";

export default class ClientSocket implements IClientSocket {
  private socket: Socket;

  private constructor(socket: Socket) {
    this.socket = socket;
  }

  getId(): string {
    return ClientSocket.getId(this.socket);
  }
  getConnectedAt(): number {
    throw new Error("Method not implemented.");
  }
  getLastActiveAt(): number {
    throw new Error("Method not implemented.");
  }
  close(): void {
    throw new Error("Method not implemented.");
  }
  _on<T extends keyof ClientSocketEventMap>(
    type: T,
    callback: ClientSocketEventMap[T]
  ) {}

  static from(socket: Socket): ClientSocket {
    return new ClientSocket(socket);
  }

  static getId(socket: Socket): string {
    return socket.id;
  }
}

import DrawingNetworkError, { DrawingNetworkErrorCode } from "./error";
import { ISocket, ISocketPool } from "./types";

export default class SocketPool
  extends Map<string, ISocket>
  implements ISocketPool
{
  private maxSize: number;

  constructor(maxSize = 100) {
    super();
    this.maxSize = maxSize;
  }

  add(socket: ISocket): void {
    if (this.size >= this.maxSize) {
      throw new DrawingNetworkError(DrawingNetworkErrorCode.SocketPoolIsFull);
    }
    this.set(socket.getId(), socket);
  }

  remove(id: string): void;
  remove(socket: ISocket): void;
  remove(socketOrId: ISocket | string): void {
    typeof socketOrId === "string"
      ? this.delete(socketOrId)
      : this.delete(socketOrId.getId());
  }

  get(id: string): ISocket | undefined {
    return this.get(id);
  }
  getAll(): ISocket[] {
    return Array.from(this.values());
  }
}

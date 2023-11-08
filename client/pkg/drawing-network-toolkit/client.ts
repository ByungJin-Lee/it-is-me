import Translator from "./translator";
import { ClientSocketEventMap, IClientSocket, ICommand } from "./types";

export default class ClientSocket implements IClientSocket {
  private socket: WebSocket;
  private eventMap: Partial<ClientSocketEventMap>;

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.eventMap = {};
    this.init();
  }

  private init() {
    const s = this.socket;
    s.onopen = (e) => this.eventMap.connect?.();
    s.onclose = (e) => this.eventMap.disconnect?.();
    s.onmessage = ({ data }) =>
      this.eventMap.command?.(Translator.decode(data));
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

  on<T extends keyof ClientSocketEventMap>(
    type: T,
    callback: ClientSocketEventMap[T]
  ) {
    this.eventMap[type] = callback;
  }

  send(command: ICommand): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(Translator.encode(command));
    }
    // ! Throw an error if the socket is not open
  }
}

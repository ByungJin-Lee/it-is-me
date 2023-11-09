import Translator from "./translator";
import {
  ClientSocketEventMap,
  CommandType,
  IClientSocket,
  ICommand,
} from "./types";

export default class ClientSocket implements IClientSocket {
  private socket: WebSocket;
  private eventMap: Partial<ClientSocketEventMap>;
  private translator?: Translator;

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.eventMap = {};
    this.init();
  }

  private init() {
    const s = this.socket;
    s.onopen = (_) => this.eventMap.connect?.();
    s.onclose = (_) => this.eventMap.disconnect?.();
    s.onmessage = ({ data }) => {
      const command = Translator.decode(data);

      if (command.type === CommandType.ID) {
        this.translator = new Translator(command.data);
        // replace the onmessage handler
        s.onmessage = ({ data }) => {
          const command = this.translator?.decode(data);
          command && this.eventMap.command?.(command);
        };
      }
    };
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
    if (this.translator && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(this.translator.encode(command));
    }
    // ! Throw an error if the socket is not open
  }

  sendDraw(data: any): void {
    this.send({
      type: CommandType.Draw,
      data,
    });
  }
}

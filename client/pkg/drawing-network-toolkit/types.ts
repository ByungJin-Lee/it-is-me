export interface ICommand {
  type: string;
  data: any;
  from?: string;
}

export enum CommandType {
  ID = "id",
  Draw = "draw",
}

// for example, a timestamp in milliseconds(UTC)
export type Timestamp = number;

export interface ClientSocketEventMap {
  connect: () => void;
  disconnect: () => void;
  command: (command: ICommand) => void;
}

export interface IClientSocket {
  getConnectedAt(): Timestamp;
  getLastActiveAt(): Timestamp;
  close(): void;
  on<T extends keyof ClientSocketEventMap>(
    type: T,
    callback: ClientSocketEventMap[T]
  ): void;

  send(command: ICommand): void;
  sendDraw(data: any): void;
}

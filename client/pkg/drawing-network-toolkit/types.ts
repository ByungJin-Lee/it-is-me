export type ICommand = {};

// for example, a timestamp in milliseconds(UTC)
export type Timestamp = number;

export interface ISocket {
  getId(): string;
  getConnectedAt(): Timestamp;
  getLastActiveAt(): Timestamp;
  close(): void;
}

export interface ClientSocketEventMap {
  connect: () => void;
  disconnect: () => void;
  command: (command: ICommand) => void;
}

export interface IClientSocket extends ISocket {
  _on<T extends keyof ClientSocketEventMap>(
    type: T,
    callback: ClientSocketEventMap[T]
  ): void;
}

export interface IServerSocket {
  // broadcast(message: string): void;
  // sendTo(target: string, message: string): void;
  getConnectionPool(): ISocketPool;
}

export interface ISocketPool {
  add(socket: ISocket): void;
  remove(socketOrId: ISocket | string): void;
  get(id: string): ISocket | undefined;
  getAll(): ISocket[];
}

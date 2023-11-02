export enum DrawingNetworkErrorCode {
  SocketPoolIsFull = "SocketPoolIsFull",
}

export default class DrawingNetworkError extends Error {
  constructor(code: DrawingNetworkErrorCode) {
    super(DrawingNetworkErrorCode[code]);
    this.name = "DrawingNetworkError";
  }
}

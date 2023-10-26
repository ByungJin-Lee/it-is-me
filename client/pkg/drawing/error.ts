import DrawingContext from "./context";

export enum DrawingErrorCode {
  CanvasContextNotFound,
  ItemAlreadyExists,
  ToolStrategyNotFound,
}

const ErrorMessages: Record<DrawingErrorCode, string> = {
  [DrawingErrorCode.CanvasContextNotFound]: "Could not get canvas context",
  [DrawingErrorCode.ItemAlreadyExists]: "Item already exists",
  [DrawingErrorCode.ToolStrategyNotFound]: "No strategy found for current tool",
};

export default class DrawingError extends Error {
  constructor(ctx: DrawingContext, errorCode: DrawingErrorCode) {
    super(ErrorMessages[errorCode] + JSON.stringify(ctx, null, 2));
    this.name = "DrawingError(" + DrawingErrorCode[errorCode] + ")";
  }
}

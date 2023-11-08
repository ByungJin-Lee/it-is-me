import { DrawingStrategy } from "../abstract";
import { Text } from "../shapes";
import { Position } from "../types";

type Option = {};

export default class TextStrategy extends DrawingStrategy<Text, Option> {
  constructor() {
    super({});
  }

  public onMouseDown(p: Position): Text | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseUp(p: Position): Text | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseMove(p: Position): Text | undefined {
    throw new Error("Method not implemented.");
  }

  public onDraw(ctx: CanvasRenderingContext2D, item: Text): void {
    throw new Error("Method not implemented.");
  }
}

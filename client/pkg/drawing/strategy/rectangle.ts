import { DrawingStrategy } from "../abstract";
import { Rectangle } from "../shapes";
import { Position } from "../types";

type Option = {};

export default class RectangleStrategy extends DrawingStrategy<
  Rectangle,
  Option
> {
  constructor() {
    super({});
  }

  public onMouseDown(p: Position): Rectangle | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseUp(p: Position): Rectangle | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseMove(p: Position): Rectangle | undefined {
    throw new Error("Method not implemented.");
  }

  public onDraw(ctx: CanvasRenderingContext2D, item: Rectangle): void {
    throw new Error("Method not implemented.");
  }
}

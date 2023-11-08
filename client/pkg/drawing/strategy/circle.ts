import { DrawingStrategy } from "../abstract";
import { Circle } from "../shapes";
import { Position } from "../types";

type Option = {};

export default class CircleStrategy extends DrawingStrategy<Circle, Option> {
  constructor() {
    super({});
  }

  public onMouseDown(p: Position): Circle | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseUp(p: Position): Circle | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseMove(p: Position): Circle | undefined {
    throw new Error("Method not implemented.");
  }

  public onDraw(ctx: CanvasRenderingContext2D, item: Circle): void {
    throw new Error("Method not implemented.");
  }
}

import { DrawingStrategy } from "../abstract";
import { Rectangle } from "../shapes";
import { Position } from "../types";

export default class RectangleStrategy extends DrawingStrategy<Rectangle> {
  public onMouseDown(p: Position): Rectangle | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseUp(p: Position): Rectangle | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseMove(p: Position): Rectangle | undefined {
    throw new Error("Method not implemented.");
  }
}

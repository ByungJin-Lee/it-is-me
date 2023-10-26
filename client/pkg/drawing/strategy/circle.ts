import { DrawingStrategy } from "../abstract";
import { Circle } from "../shapes";
import { Position } from "../types";

export default class CircleStrategy extends DrawingStrategy<Circle> {
  public onMouseDown(p: Position): Circle | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseUp(p: Position): Circle | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseMove(p: Position): Circle | undefined {
    throw new Error("Method not implemented.");
  }
}

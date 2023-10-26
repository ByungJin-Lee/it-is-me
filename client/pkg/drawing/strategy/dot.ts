import { DrawingStrategy } from "../abstract";
import { Dot } from "../shapes";
import { Position } from "../types";

export default class DotStrategy extends DrawingStrategy<Dot> {
  public onMouseDown(p: Position): Dot | undefined {
    return {
      id: crypto.randomUUID(),
      kind: "dot",
      x: p.x,
      y: p.y,
    };
  }
  public onMouseUp(p: Position): undefined {}
  public onMouseMove(p: Position): Dot | undefined {
    return {
      id: crypto.randomUUID(),
      kind: "dot",
      x: p.x,
      y: p.y,
    };
  }
}

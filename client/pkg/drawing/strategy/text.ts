import { DrawingStrategy } from "../abstract";
import { Text } from "../shapes";
import { Position } from "../types";

export default class TextStrategy extends DrawingStrategy<Text> {
  public onMouseDown(p: Position): Text | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseUp(p: Position): Text | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseMove(p: Position): Text | undefined {
    throw new Error("Method not implemented.");
  }
}

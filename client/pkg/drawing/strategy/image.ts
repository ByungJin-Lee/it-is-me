import { DrawingStrategy } from "../abstract";
import { Image } from "../shapes";
import { Position } from "../types";

export default class ImageStrategy extends DrawingStrategy<Image> {
  public onMouseDown(p: Position): Image | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseUp(p: Position): Image | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseMove(p: Position): Image | undefined {
    throw new Error("Method not implemented.");
  }
}

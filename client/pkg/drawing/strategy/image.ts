import { DrawingStrategy } from "../abstract";
import { Image } from "../shapes";
import { Position } from "../types";

type Option = {};

export default class ImageStrategy extends DrawingStrategy<Image, Option> {
  constructor() {
    super({});
  }
  public onMouseDown(p: Position): Image | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseUp(p: Position): Image | undefined {
    throw new Error("Method not implemented.");
  }
  public onMouseMove(p: Position): Image | undefined {
    throw new Error("Method not implemented.");
  }

  public onDraw(ctx: CanvasRenderingContext2D, item: Image): void {
    throw new Error("Method not implemented.");
  }
}

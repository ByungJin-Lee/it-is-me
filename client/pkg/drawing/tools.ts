import { DrawingContext } from ".";
import { DrawingTool } from "./abstract";
import { Shapes } from "./shapes";
import {
  CircleStrategy,
  ImageStrategy,
  LineStrategy,
  RectangleStrategy,
  TextStrategy,
} from "./strategy";

export default class CanvasDrawingTool extends DrawingTool<Shapes> {
  constructor(ctx: DrawingContext<Shapes>) {
    super("line", ctx, {
      circle: new CircleStrategy(),
      rectangle: new RectangleStrategy(),
      line: new LineStrategy(),
      text: new TextStrategy(),
      image: new ImageStrategy(),
    });
  }
}

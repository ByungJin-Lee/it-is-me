import { DrawingContext } from ".";
import { DrawingTool } from "./abstract";
import { Shapes } from "./shapes";
import CircleStrategy from "./strategy/circle";
import DotStrategy from "./strategy/dot";
import ImageStrategy from "./strategy/image";
import RectangleStrategy from "./strategy/rectangle";
import TextStrategy from "./strategy/text";

export default class CanvasDrawingTool extends DrawingTool<Shapes> {
  constructor(ctx: DrawingContext<Shapes>) {
    super("dot", ctx, {
      circle: new CircleStrategy(),
      rectangle: new RectangleStrategy(),
      dot: new DotStrategy(),
      text: new TextStrategy(),
      image: new ImageStrategy(),
    });
  }
}

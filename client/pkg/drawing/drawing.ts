import { Drawable, DrawingTool } from "./abstract";
import DrawingContext from "./context";
import { Shapes } from "./shapes";
import { default as CanvasDrawingTool } from "./tools";
import { DrawingCaptureEvents, Position } from "./types";

export default class CanvasDrawing extends Drawable<Shapes> {
  private ctx: DrawingContext<Shapes>;
  private tool: DrawingTool<Shapes>;

  constructor(el: HTMLCanvasElement) {
    super();
    this.ctx = new DrawingContext(1, el);
    this.tool = new CanvasDrawingTool(this.ctx);
    this.registerHandler();
  }

  public registerHandler() {
    const canvas = this.ctx.getCanvas();
    const tool = this.tool;

    HandlerEventMap.forEach(([type, captureEvent]) => {
      canvas.addEventListener(type, (e) => {
        // prevent default
        e.preventDefault();
        e.stopPropagation();

        tool.capture(
          this.destructMouseEventToPosition(e),
          captureEvent as DrawingCaptureEvents
        );
      });
    });
  }

  public getTool() {
    return this.tool;
  }

  public setTool(tool: DrawingTool<Shapes>) {
    this.tool = tool;
  }

  public getContext() {
    return this.ctx;
  }

  public setContext(ctx: DrawingContext<Shapes>) {
    this.ctx = ctx;
  }

  protected clear(ctx: DrawingContext<Shapes>): void {
    const { width, height } = ctx.getCanvas();

    ctx.getCanvasContext().clearRect(0, 0, width, height);
  }

  protected drawBackground(ctx: DrawingContext<Shapes>): void {
    // throw new Error("Method not implemented.");
  }
  protected drawForeground(ctx: DrawingContext<Shapes>): void {
    // throw new Error("Method not implemented.");
    const [items, canvasContext] = [
      ctx.getFreshItems(), // to optimize make stale (current not working)
      ctx.getCanvasContext(),
    ];
    const tool = this.getTool();

    items.forEach((item) => tool.draw(canvasContext, item));
  }

  private destructMouseEventToPosition(e: MouseEvent): Position {
    return { x: e.clientX, y: e.clientY };
  }
}

const HandlerEventMap = Object.freeze([
  ["mousedown", DrawingCaptureEvents.MouseDown],
  ["mousemove", DrawingCaptureEvents.MouseMove],
  ["mouseup", DrawingCaptureEvents.MouseUp],
] as const);

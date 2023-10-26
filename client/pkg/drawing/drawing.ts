import { Drawable, DrawingTool } from "./abstract";
import DrawingContext from "./context";
import { Shapes } from "./shapes";
import { default as CanvasDrawingTool } from "./tools";
import { DrawingCaptureEvents, Position } from "./types";

export default class CanvasDrawing extends Drawable {
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
      canvas.addEventListener(type, (e) =>
        tool.capture(
          this.destructMouseEventToPosition(e),
          captureEvent as DrawingCaptureEvents
        )
      );
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

  protected drawBackground(): void {
    throw new Error("Method not implemented.");
  }
  protected drawForeground(): void {
    throw new Error("Method not implemented.");
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

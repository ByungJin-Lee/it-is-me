import { DrawingStrategy } from "../abstract";
import { Line } from "../shapes";
import { Position } from "../types";

interface Option {
  width: number;
  color: string;
}

export default class LineStrategy extends DrawingStrategy<Line, Option> {
  private clicked: boolean;
  private prev?: Position;

  constructor() {
    super({
      width: 5,
      color: "#000000",
    });
    this.clicked = false;
  }

  public onMouseDown(p: Position): undefined {
    this.clicked = true;
    // setup current
    this.prev = p;
  }
  public onMouseUp(_: Position): undefined {
    this.clicked = false;
    this.prev = undefined;
  }
  public onMouseMove(p: Position): Line | undefined {
    if (!this.clicked || !this.prev) return;

    const line: Line = {
      kind: "line",
      x: this.prev.x,
      y: this.prev.y,
      width: this.option.width,
      color: this.option.color,
      data: {
        x: p.x,
        y: p.y,
      },
    };

    this.prev = p;

    return line;
  }

  public onDraw(
    ctx: CanvasRenderingContext2D,
    { x, y, width, color, data }: Line
  ): void {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(x, y);
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
  }
}

import { DrawingStrategy } from "../abstract";
import { Circle } from "../shapes";
import { Position } from "../types";

type Option = {
  color: string;
};

export default class CircleStrategy extends DrawingStrategy<Circle, Option> {
  private ongoing?: Circle;

  constructor() {
    super({
      color: "black",
    });
  }

  public onMouseDown({ x, y }: Position): Circle {
    this.ongoing = {
      kind: "circle",
      color: this.option.color,
      ongoing: true,
      width: 3,
      x: x,
      y: y,
      data: {
        pX: x,
        pY: y,
      },
    };

    return this.ongoing;
  }
  public onMouseUp(_: Position): undefined {
    if (!this.ongoing) return;

    const [p1, p2] = CircleStrategy.transformPosition(this.ongoing);

    [
      this.ongoing.x,
      this.ongoing.y,
      this.ongoing.data.pX,
      this.ongoing.data.pY,
    ] = [p1.x, p1.y, p2.x, p2.y];
    this.ongoing.ongoing = false;
    this.ongoing = undefined;
  }
  public onMouseMove({ x, y }: Position): undefined {
    if (!this.ongoing) return;

    [this.ongoing.data.pX, this.ongoing.data.pY] = [x, y];
  }

  public onDraw(ctx: CanvasRenderingContext2D, item: Circle): void {
    const c = CircleStrategy.calculateEllipse(item);

    ctx.beginPath();
    ctx.fillStyle = item.color;
    ctx.lineWidth = item.width;
    ctx.ellipse(c.sx, c.sy, c.radiusX, c.radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
  }

  static transformPosition(circle: Circle): [Position, Position] {
    const { x, y, data } = circle;

    const [x1, x2] = x < data.pX ? [x, data.pX] : [data.pX, x];
    const [y1, y2] = y < data.pY ? [y, data.pY] : [data.pY, y];

    return [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ];
  }

  static calculateEllipse(c: Circle) {
    let [x1, x2, y1, y2] = [c.x, c.data.pX, c.y, c.data.pY];

    if (c.ongoing) {
      [x1, y1, x2, y2] = CircleStrategy.transformPosition(c).reduce(
        (acc, p) => {
          acc.push(p.x, p.y);
          return acc;
        },
        [] as number[]
      );
    }

    const [radiusX, radiusY] = [(x2 - x1) / 2, (y2 - y1) / 2];

    return {
      sx: x1 + radiusX,
      sy: y1 + radiusY,
      radiusX,
      radiusY,
    };
  }
}

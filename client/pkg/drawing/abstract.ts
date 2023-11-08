import { DrawingError } from ".";
import DrawingContext from "./context";
import { DrawingErrorCode } from "./error";
import { DrawingCaptureEvents, DrawingItem, Position } from "./types";

/**
 * @description Abstract class for drawing
 */
export abstract class Drawable<T extends DrawingItem> {
  protected abstract drawBackground(ctx: DrawingContext<T>): void;
  protected abstract drawForeground(ctx: DrawingContext<T>): void;
  protected abstract getContext(): DrawingContext<T>;

  public draw() {
    const ctx = this.getContext();
    // draw background
    this.drawBackground(ctx);
    // draw foreground
    this.drawForeground(ctx);
  }
}

type StrategyMap<T extends DrawingItem> = {
  [K in T["kind"]]: DrawingStrategy<DrawingItem<K>>;
};

/**
 * @description Abstract class for drawing tool
 * Mange the current tool and the strategy map
 */
export abstract class DrawingTool<T extends DrawingItem> {
  currentTool: T["kind"];
  ctx: DrawingContext<T>;
  strategyMap: StrategyMap<T>;

  constructor(
    initialTool: T["kind"],
    ctx: DrawingContext<T>,
    strategyMap: StrategyMap<T>
  ) {
    this.ctx = ctx;
    this.currentTool = initialTool;
    this.strategyMap = strategyMap;
  }

  public capture(p: Position, type: DrawingCaptureEvents): void {
    const strategy = this.strategyMap[this.currentTool];
    if (!strategy) {
      throw new DrawingError(this.ctx, DrawingErrorCode.ToolStrategyNotFound);
    }

    let shape: any;

    switch (type) {
      case DrawingCaptureEvents.MouseDown:
        shape = strategy.onMouseDown(p);
        break;
      case DrawingCaptureEvents.MouseUp:
        shape = strategy.onMouseUp(p);
        break;
      case DrawingCaptureEvents.MouseMove:
        shape = strategy.onMouseMove(p);
        break;
    }

    if (shape) {
      this.ctx.addItem(shape);
    }
  }

  public draw(ctx: CanvasRenderingContext2D, item: T) {
    const strategy = this.strategyMap[item.kind as T["kind"]];
    if (!strategy) {
      throw new DrawingError(this.ctx, DrawingErrorCode.ToolStrategyNotFound);
    }
    strategy.onDraw(ctx, item);
  }

  public getCurrentTool() {
    return this.currentTool;
  }

  public setCurrentTool(tool: T["kind"]) {
    this.currentTool = tool;
  }

  public getTools(): T["kind"][] {
    return Object.getOwnPropertyNames(this.strategyMap) as T["kind"][];
  }
}

/**
 * @description Drawing strategy
 */
export abstract class DrawingStrategy<T, Option = unknown> {
  protected option: Option;

  constructor(option: Option) {
    this.option = option;
  }

  public getOption(): Option {
    return this.option;
  }
  public setOption(option: Partial<Option>): void {
    this.option = {
      ...this.option,
      ...option,
    };
  }
  public abstract onMouseDown(p: Position): T | undefined;
  public abstract onMouseUp(p: Position): T | undefined;
  public abstract onMouseMove(p: Position): T | undefined;
  public abstract onDraw(ctx: CanvasRenderingContext2D, item: T): void;
}

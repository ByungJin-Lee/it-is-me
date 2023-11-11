import DrawingError, { DrawingErrorCode } from "./error";
import { DrawingItem, DrawingItems, Position, Rectangle } from "./types";

export default class DrawingContext<T extends DrawingItem = DrawingItem> {
  private zoom: number;
  private position: Position;
  private readonly viewport: Rectangle;
  private readonly canvas: HTMLCanvasElement;
  private freshItems: DrawingItems<T>;
  private staleItems: DrawingItems<T>;
  private onItemAdded?: (item: T) => void;

  constructor(zoom: number, canvas: HTMLCanvasElement) {
    this.zoom = zoom;
    this.position = { x: 0, y: 0 };
    this.canvas = canvas;
    this.freshItems = new Array();
    this.staleItems = new Array();
    this.viewport = DrawingContext.calculateViewportFromCanvas(canvas);
  }

  public getCanvasContext(): CanvasRenderingContext2D {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new DrawingError(this, DrawingErrorCode.CanvasContextNotFound);
    }
    return ctx;
  }

  //#region Getters and setters

  public getCanvas() {
    return this.canvas;
  }

  // TODO: 최적화를 위해 나중에 상세 구현하여 사용
  public getFreshItems(stale = false) {
    const items = this.freshItems;

    if (stale) {
      this.freshItems = items.filter((it) => it.ongoing);
      this.staleItems = this.staleItems.concat(items);
    }

    return items;
  }

  public setFreshItems(items: DrawingItems<T>): void {
    this.freshItems = items;
  }

  public getStaleItems() {
    return this.staleItems;
  }

  public addItem(item: T) {
    this.freshItems.push(item);
    this.onItemAdded?.(item);
  }

  public setOnItemAdded(callback: (item: T) => void) {
    this.onItemAdded = callback;
  }

  public getZoom() {
    return this.zoom;
  }

  public setZoom(zoom: number) {
    this.zoom = zoom;
  }

  public getViewport() {
    return this.viewport;
  }

  public getPosition() {
    return this.position;
  }
  public setPosition(position: Position): void;
  public setPosition(x: number, y: number): void;
  public setPosition(posOrX: Position | number, y?: number): void {
    if (typeof posOrX === "object") {
      this.position = posOrX;
    } else {
      this.position = { x: posOrX, y: y! };
    }
  }

  //#endregion

  //#region Static methods
  public static calculateViewportFromCanvas(
    canvas: HTMLCanvasElement
  ): Rectangle {
    return {
      width: canvas.width,
      height: canvas.height,
    };
  }
  //#endregion
}

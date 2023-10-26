import DrawingError, { DrawingErrorCode } from "./error";
import { DrawingItem, DrawingItemMap, Position, Rectangle } from "./types";

export default class DrawingContext<T extends DrawingItem = DrawingItem> {
  private zoom: number;
  private position: Position;
  private readonly viewport: Rectangle;
  private readonly canvas: HTMLCanvasElement;
  private items: DrawingItemMap<T>;

  constructor(zoom: number, canvas: HTMLCanvasElement) {
    this.zoom = zoom;
    this.position = { x: 0, y: 0 };
    this.canvas = canvas;
    this.items = new Map();
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

  public getItems() {
    return this.items;
  }

  public setItems(items: DrawingItemMap<T>): void {
    this.items = items;
  }

  public addItem(item: T) {
    if (this.items.has(item.id))
      throw new DrawingError(this, DrawingErrorCode.ItemAlreadyExists);
    this.items.set(item.id, item);
  }

  public removeItem(item: T) {
    this.items.delete(item.id);
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

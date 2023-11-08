import { DrawingItem } from "./types";

export type Rectangle = DrawingItem<
  "rectangle",
  {
    pX: number;
    pY: number;
  }
>;

export type Circle = DrawingItem<
  "circle",
  {
    pX: number;
    pY: number;
  }
>;

export type Line = DrawingItem<
  "line",
  {
    x: number;
    y: number;
  }
>;

export type Text = DrawingItem<
  "text",
  {
    text: string;
  }
>;

export type Image = DrawingItem<
  "image",
  {
    src: string;
  }
>;

export type Shapes = Rectangle | Circle | Line | Text | Image;

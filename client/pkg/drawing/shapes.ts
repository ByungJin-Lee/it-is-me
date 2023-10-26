import { DrawingItem } from "./types";

export type Rectangle = DrawingItem<
  "rectangle",
  {
    pX: number;
    pY: number;
    width: number;
  }
>;

export type Circle = DrawingItem<
  "circle",
  {
    pX: number;
    pY: number;
    width: number;
  }
>;

export type Dot = DrawingItem<"dot">;

export type Text = DrawingItem<
  "text",
  {
    fontSize: number;
    text: string;
  }
>;

export type Image = DrawingItem<
  "image",
  {
    src: string;
  }
>;

export type Shapes = Rectangle | Circle | Dot | Text | Image;

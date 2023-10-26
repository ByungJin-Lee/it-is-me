export interface Rectangle {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

interface _DrawingItem<K = string> extends Position {
  id: string;
  kind: K;
}

type _DrawingItemWithData<K = string, T = unknown> = _DrawingItem<K> & {
  data: T;
};

export type DrawingItem<K = string, T = void> = T extends void
  ? _DrawingItem<K>
  : _DrawingItemWithData<K, T>;

export enum DrawingCaptureEvents {
  MouseDown,
  MouseUp,
  MouseMove,
}

export type DrawingItemMap<T extends DrawingItem> = Map<DrawingItem["id"], T>;

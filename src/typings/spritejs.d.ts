declare module 'spritejs' {
  interface SceneOptions {
    resolution?: [number, number] | 'flex';
    viewport?: [number, number] | [string, string];
  }

  interface Border {
    width: number;
    style: 'solid' | 'dashed';
    color: string;
  }

  interface Timing {
    delay?: number;
    endDelay?: number;
    fill?: 'none' | 'forwards' | 'backwards' | 'both' | 'none';
    iterations?: number;
    direction?: 'default' | 'reverse' | 'alternate' | 'alternate-reverse';
    duration?: number;
    easing?:
      | 'linear'
      | 'ease'
      | 'ease-in'
      | 'ease-out'
      | 'ease-in-out'
      | 'step-start'
      | 'step-end'
      | string;
  }

  interface SpriteAttr {
    anchor?: [number, number];
    bgcolor?: string;
    border?: string | Border;
    borderRadius?: number;
    dashOffset?: number;
    fliter?: object;
    gradients?: object;
    height?: number;
    id?: string;
    name?: string;
    offsetDistance?: number;
    offsetPath?: string;
    offsetRotate?: string;
    opacity?: number;
    padding?: number | [number, number, number, number];
    pos?: [number, number];
    rotate?: number;
    scale?: number;
    shadow?: object;
    size?: [number, number];
    skew?: [number, number];
    textures?: string;
    transform?: string;
    transformOrigin?: [number, number];
    translate?: [number, number];
    width?: number;
    x?: number;
    y?: number;
    zIndex?: number;
  }

  interface LabelAttr {
    text?: string;
  }

  type VierPort = [number, number];
  type EventHandler = (
    type:
      | 'mousemove'
      | 'mousedown'
      | 'mouseup'
      | 'mouseenter'
      | 'mouseleave'
      | 'touchstart'
      | 'touchend'
      | 'touchmove'
      | 'click'
      | string,
    handler: (event: any) => void,
  ) => void;

  class Scene {
    constructor(container: string | HTMLElement, options: SceneOptions);
    resolution: [number, number] | 'flex';
    viewport: [number, number] | [string, string];
    layer(): Layer;
  }

  class Sprite extends BaseSprite {}

  class Group extends BaseSprite {}

  class Label extends BaseSprite<SpriteAttr & LabelAttr> {}

  class BaseSprite<T = SpriteAttr> {
    constructor(attr?: string | T);
    attr(attr: T): void;
    attr(): Required<T>;
    attr<P extends keyof T>(name: P): Required<T>[P];
    attr<P extends keyof T>(name: P, value: Required<T>[P]): void;
    append(...sprites: BaseSprite[]): void;
    animate(frames: T[], timing: Timing): Animation;
    clear(): void;
    on: EventHandler;
    nodeType: 'layer' | 'sprite' | 'label';
    clientSize: [number, number];
    contentSize: [number, number];
    xy: [number, number];
  }

  class Layer {
    id: string;
    zIndex: number;
    viewport: VierPort;
    timeline: any;
    resolution: [number, number];
    children: Sprite[];
    toLocalPos(x: number, y: number): [number, number];
    toGlobalPos(x: number, y: number): [number, number];
    append(...sprites: BaseSprite[]): void;
    clear(): void;
    on: EventHandler;
  }
}

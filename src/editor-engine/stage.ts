import { BaseSprite, Layer, Sprite } from 'spritejs';
import { scene } from '../pages/editor/components/Stage';

export class EditorStage {
  readonly selector = new Sprite({
    dashOffset: 10,
    id: 'selector',
    zIndex: 30,
    border: {
      width: 1,
      color: 'red',
      style: 'dashed',
    },
  });

  private currentSprite?: BaseSprite;

  private onSelectHandler?: (sprite?: BaseSprite) => void;
  private isMoving: boolean = false;
  private movingPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(private readonly layer: Layer) {
    this.selector.animate([{ dashOffset: 0 }, { dashOffset: 1000 }], {
      duration: 100000,
      direction: 'alternate',
      iterations: Infinity,
    });

    this.layer.on('click', event => {
      let target = this.findTarget(event);
      if (target) {
        this.currentSprite = target;
        this.strokeSelected();
        this.onSelectHandler && this.onSelectHandler(target);
      } else {
        this.hideSelector();
        this.onSelectHandler && this.onSelectHandler();
      }
    });

    this.layer.on('mousedown', event => {
      const target = this.findTarget(event);
      if (target) {
        if (this.currentSprite === target) {
          this.isMoving = true;
          this.movingPosition = { x: event.x, y: event.y };
        }
      }
    });

    this.layer.on('mousemove', event => {
      if (this.isMoving && this.currentSprite) {
        const newPosition = { x: event.x, y: event.y };
        const movedX = this.movingPosition.x - newPosition.x;
        const movedY = this.movingPosition.y - newPosition.y;
        this.currentSprite.attr({
          pos: [this.currentSprite.xy[0] - movedX, this.currentSprite.xy[1] - movedY],
        });
        this.strokeSelected();
        this.movingPosition = newPosition;
      }
    });

    this.layer.on('mouseup', event => {
      this.isMoving = false;
    });

    this.layer.on('keydown', event => {
      console.log(event);
    });
  }

  private findTarget(event: any) {
    let target: BaseSprite | void = event.target as BaseSprite;
    if (target === this.selector) {
      target = (event.targetSprites as BaseSprite[]).find(sprite => sprite !== this.selector);
    }
    if (target && target.nodeType !== 'layer') {
      return target;
    } else {
      return null;
    }
  }

  private hideSelector() {
    this.selector.attr({ size: [0, 0], pos: [-1000, -1000] });
    this.currentSprite = undefined;
  }

  public strokeSelected() {
    const target = this.currentSprite;
    if (target) {
      if (target === this.selector) return;
      const { clientSize, xy } = target;
      this.selector.attr({
        width: clientSize[0] - 1,
        height: clientSize[1] - 1,
        pos: xy,
      });
    }
  }

  public createProject(config: { width: number; height: number }) {
    const { width, height } = config;
    scene.resolution = [width, height];
    scene.viewport = [width, height];

    this.hideSelector();
    this.layer.clear();

    this.layer.append(this.selector);
    this.onSelectHandler && this.onSelectHandler();
  }

  public setSelectHandler(handler: (sprite?: BaseSprite) => void) {
    this.onSelectHandler = handler;
  }

  public append(sprite: BaseSprite) {
    this.layer.append(sprite);
  }

  public onKeydown = (event: KeyboardEvent) => {
    if (this.currentSprite) {
      let { x, y } = this.currentSprite.attr();
      switch (event.code) {
        case 'ArrowRight':
          this.currentSprite.attr({ x: event.altKey ? x + 10 : x + 1 });
          break;
        case 'ArrowLeft':
          this.currentSprite.attr({ x: event.altKey ? x - 10 : x - 1 });
          break;
        case 'ArrowUp':
          this.currentSprite.attr({ y: event.altKey ? y - 10 : y - 1 });
          break;
        case 'ArrowDown':
          this.currentSprite.attr({ y: event.altKey ? y + 10 : y + 1 });
          break;
      }
      this.onSelectHandler && this.onSelectHandler(this.currentSprite);
      this.strokeSelected();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  public onKeyup = (event: KeyboardEvent) => {
    // console.log('keyup');
  };
}

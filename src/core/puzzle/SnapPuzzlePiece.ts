import Phaser from "phaser";

export type SnapPuzzlePieceConfig = {
  id: string;
  correctZoneId: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  enabled?: boolean;
};

export class SnapPuzzlePiece extends Phaser.GameObjects.Container {
  public readonly id: string;
  public readonly correctZoneId: string;
  public snapped = false;

  private homeX: number;
  private homeY: number;

  constructor(scene: Phaser.Scene, config: SnapPuzzlePieceConfig) {
    super(scene, config.position.x, config.position.y);

    this.id = config.id;
    this.correctZoneId = config.correctZoneId;
    this.homeX = config.position.x;
    this.homeY = config.position.y;

    scene.add.existing(this);
    this.registerDrag(config.size, config.enabled ?? true);
  }

  setHomePosition(x: number, y: number) {
    this.homeX = x;
    this.homeY = y;
  }

  getHomePosition() {
    return {
      x: this.homeX,
      y: this.homeY,
    };
  }

  setDragEnabled(enabled: boolean) {
    if (this.input) {
      this.input.enabled = enabled;
    }

    return this;
  }

  snapTo(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.snapped = true;
    this.setDragEnabled(false);
  }

  returnHome() {
    this.x = this.homeX;
    this.y = this.homeY;
    this.snapped = false;
    this.setDragEnabled(true);
  }

  private registerDrag(size: SnapPuzzlePieceConfig["size"], enabled: boolean) {
    this.setSize(size.width, size.height);
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height,
      ),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      draggable: true,
    });

    this.setDragEnabled(enabled);
    this.scene.input.setDraggable(this);
  }
}

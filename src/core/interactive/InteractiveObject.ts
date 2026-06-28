import Phaser from "phaser";

export type InteractiveObjectConfig = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  enabled?: boolean;
  visible?: boolean;
};

export class InteractiveObject extends Phaser.GameObjects.Container {
  public readonly id: string;
  public enabled: boolean;

  protected highlight?: Phaser.GameObjects.Shape;
  private interactionConfig?: Phaser.Types.Input.InputConfiguration;

  constructor(scene: Phaser.Scene, config: InteractiveObjectConfig) {
    super(scene, config.position.x, config.position.y);

    this.id = config.id;
    this.enabled = config.enabled ?? true;
    this.visible = config.visible ?? true;

    scene.add.existing(this);
  }

  idle() {}

  onTap() {}

  onPointerDown() {}

  onPointerUp() {}

  playAnimation(_name: string) {}

  playSound(_name: string) {}

  setInteractive(enabled: boolean): this {
    this.enabled = enabled;

    if (enabled) {
      if (this.interactionConfig) {
        super.setInteractive(this.interactionConfig);
      } else {
        super.setInteractive();
      }
    } else {
      this.disableInteractive();
    }

    return this;
  }

  showHighlight() {
    this.highlight?.setVisible(true);
  }

  hideHighlight() {
    this.highlight?.setVisible(false);
  }

  protected registerInteraction(hitArea: Phaser.Types.Input.InputConfiguration) {
    this.interactionConfig = hitArea;
    super.setInteractive(this.interactionConfig);

    this.on(Phaser.Input.Events.POINTER_DOWN, () => {
      if (!this.enabled) {
        return;
      }

      this.onPointerDown();
      this.showHighlight();
    });

    this.on(Phaser.Input.Events.POINTER_UP, () => {
      if (!this.enabled) {
        return;
      }

      this.onPointerUp();
      this.hideHighlight();
      this.onTap();
    });

    this.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.hideHighlight();
    });
  }
}

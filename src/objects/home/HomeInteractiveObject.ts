import Phaser from "phaser";
import { InteractiveObject } from "../../core/interactive/InteractiveObject";

export type HomeInteractiveObjectConfig = {
  id: string;
  x: number;
  y: number;
  label: string;
};

export class HomeInteractiveObject extends InteractiveObject {
  protected readonly label: string;

  constructor(scene: Phaser.Scene, config: HomeInteractiveObjectConfig) {
    super(scene, {
      id: config.id,
      position: {
        x: config.x,
        y: config.y,
      },
    });

    this.label = config.label;
  }

  override onTap() {
    console.log(this.id);
  }

  protected addLabel(y: number) {
    this.add(
      this.scene.add
        .text(0, y, this.label, {
          color: "#f4f7fb",
          fontFamily: "Arial, sans-serif",
          fontSize: "18px",
        })
        .setOrigin(0.5),
    );
  }
}

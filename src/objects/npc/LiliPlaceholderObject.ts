import Phaser from "phaser";
import { MotionController } from "../../core/motion/MotionController";
import { HomeInteractiveObject } from "../home/HomeInteractiveObject";

export class LiliPlaceholderObject extends HomeInteractiveObject {
  constructor(scene: Phaser.Scene, x: number, y: number, label: string) {
    super(scene, {
      id: "LILI",
      x,
      y,
      label,
    });

    this.draw();
    this.startIdleMotion();
  }

  private draw() {
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0xf2c6a0, 1);
    graphics.fillCircle(0, -32, 30);

    graphics.fillStyle(0x9d4edd, 1);
    graphics.fillRoundedRect(-28, 0, 56, 70, 20);

    graphics.fillStyle(0x2b2d42, 1);
    graphics.fillCircle(-10, -36, 3);
    graphics.fillCircle(10, -36, 3);

    this.highlight = this.scene.add
      .ellipse(0, 8, 96, 140)
      .setStrokeStyle(3, 0xf4d35e, 1)
      .setVisible(false);

    this.add([this.highlight, graphics]);
    this.addLabel(94);
    this.registerInteraction({
      hitArea: new Phaser.Geom.Rectangle(-52, -72, 104, 176),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    });
  }

  private startIdleMotion() {
    MotionController.idleBreath(this);
  }
}

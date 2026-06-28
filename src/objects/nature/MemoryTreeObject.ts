import Phaser from "phaser";
import { MotionController } from "../../core/motion/MotionController";
import { HomeInteractiveObject } from "../home/HomeInteractiveObject";

export class MemoryTreeObject extends HomeInteractiveObject {
  constructor(scene: Phaser.Scene, x: number, y: number, label: string) {
    super(scene, {
      id: "TREE",
      x,
      y,
      label,
    });

    this.draw();
    this.startIdleMotion();
  }

  private draw() {
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0x7a4f2b, 1);
    graphics.fillRect(-16, -46, 32, 92);

    graphics.fillStyle(0x4f9b5f, 1);
    graphics.fillCircle(0, -92, 58);
    graphics.fillCircle(-44, -66, 38);
    graphics.fillCircle(44, -66, 38);

    this.highlight = this.scene.add
      .ellipse(0, -50, 150, 210)
      .setStrokeStyle(3, 0xf4d35e, 1)
      .setVisible(false);

    this.add([this.highlight, graphics]);
    this.addLabel(64);
    this.registerInteraction({
      hitArea: new Phaser.Geom.Rectangle(-84, -160, 168, 240),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    });
  }

  override onTap() {
    super.onTap();
    MotionController.softBounce(this, {
      onComplete: () => this.startIdleMotion(),
    });
  }

  private startIdleMotion() {
    MotionController.idleBreath(this, {
      yOffset: -1.5,
      scaleOffset: 0.004,
      duration: 2200,
    });
  }
}

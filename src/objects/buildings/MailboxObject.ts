import Phaser from "phaser";
import { MotionController } from "../../core/motion/MotionController";
import { HomeInteractiveObject } from "../home/HomeInteractiveObject";

export class MailboxObject extends HomeInteractiveObject {
  constructor(scene: Phaser.Scene, x: number, y: number, label: string) {
    super(scene, {
      id: "MAILBOX",
      x,
      y,
      label,
    });

    this.draw();
    this.startIdleMotion();
  }

  private draw() {
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0x8b6f47, 1);
    graphics.fillRect(-7, -8, 14, 78);

    graphics.fillStyle(0xd94f42, 1);
    graphics.fillRoundedRect(-48, -58, 96, 52, 12);

    graphics.fillStyle(0xf4d35e, 1);
    graphics.fillRect(34, -72, 10, 30);
    graphics.fillRect(44, -72, 28, 14);

    this.highlight = this.scene.add
      .rectangle(0, -12, 136, 140)
      .setStrokeStyle(3, 0xf4d35e, 1)
      .setVisible(false);

    this.add([this.highlight, graphics]);
    this.addLabel(88);
    this.registerInteraction({
      hitArea: new Phaser.Geom.Rectangle(-68, -82, 136, 168),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    });
  }

  override onTap() {
    super.onTap();
    MotionController.gentleShake(this, {
      onComplete: () => this.startIdleMotion(),
    });
  }

  private startIdleMotion() {
    MotionController.idleBreath(this, {
      yOffset: -1,
      scaleOffset: 0.006,
      duration: 1800,
    });
  }
}

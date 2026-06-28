import Phaser from "phaser";

export class GarageObject extends Phaser.GameObjects.Container {
  private readonly label: string;

  constructor(scene: Phaser.Scene, x: number, y: number, label: string) {
    super(scene, x, y);

    this.label = label;
    scene.add.existing(this);
    this.draw();
  }

  private draw() {
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0x8ca3b5, 1);
    graphics.fillRect(-76, -76, 152, 112);

    graphics.fillStyle(0x415a77, 1);
    graphics.fillTriangle(-92, -76, 0, -136, 92, -76);

    graphics.fillStyle(0x203040, 1);
    graphics.fillRect(-46, -26, 92, 62);

    this.add([
      graphics,
      this.scene.add
        .text(0, 64, this.label, {
          color: "#f4f7fb",
          fontFamily: "Arial, sans-serif",
          fontSize: "18px",
        })
        .setOrigin(0.5),
    ]);
  }
}

import Phaser from "phaser";

export class StartAdventureButtonObject extends Phaser.GameObjects.Container {
  private readonly label: string;

  constructor(scene: Phaser.Scene, x: number, y: number, label: string) {
    super(scene, x, y);

    this.label = label;
    scene.add.existing(this);
    this.draw();
  }

  private draw() {
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0xf4f7fb, 1);
    graphics.fillRoundedRect(-120, -26, 240, 52, 8);

    this.add([
      graphics,
      this.scene.add
        .text(0, 0, this.label, {
          color: "#101820",
          fontFamily: "Arial, sans-serif",
          fontSize: "18px",
          fontStyle: "bold",
        })
        .setOrigin(0.5),
    ]);
  }
}

import Phaser from "phaser";
import { t } from "../localization/i18n";
import { LiliPlaceholderObject } from "./home/LiliPlaceholderObject";
import { MailboxObject } from "./home/MailboxObject";
import { MemoryTreeObject } from "./home/MemoryTreeObject";

export class HomeScene extends Phaser.Scene {
  constructor() {
    super("HomeScene");
  }

  create() {
    this.drawHome();
    this.scale.on(Phaser.Scale.Events.RESIZE, this.drawHome, this);
  }

  shutdown() {
    this.scale.off(Phaser.Scale.Events.RESIZE, this.drawHome, this);
  }

  private drawHome() {
    this.children.removeAll();

    const width = this.scale.width;
    const height = this.scale.height;
    const graphics = this.add.graphics();

    graphics.fillStyle(0x122133, 1);
    graphics.fillRect(0, 0, width, height);

    graphics.fillStyle(0x243b2f, 1);
    graphics.fillRect(0, height * 0.68, width, height * 0.32);

    this.add
      .text(width / 2, height * 0.09, t("app.title"), {
        color: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
        fontSize: "32px",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    new MemoryTreeObject(this, width * 0.24, height * 0.54, t("home.memoryTree"));
    new MailboxObject(this, width * 0.5, height * 0.58, t("home.mailbox"));
    new LiliPlaceholderObject(this, width * 0.5, height * 0.36, t("home.lili"));
    this.drawGarage(width * 0.76, height * 0.56);
    this.drawStartButton(width / 2, height * 0.84);
  }

  private drawGarage(x: number, y: number) {
    const graphics = this.add.graphics();

    graphics.fillStyle(0x8ca3b5, 1);
    graphics.fillRect(x - 76, y - 76, 152, 112);

    graphics.fillStyle(0x415a77, 1);
    graphics.fillTriangle(x - 92, y - 76, x, y - 136, x + 92, y - 76);

    graphics.fillStyle(0x203040, 1);
    graphics.fillRect(x - 46, y - 26, 92, 62);

    this.add
      .text(x, y + 64, t("home.garage"), {
        color: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
      })
      .setOrigin(0.5);
  }

  private drawStartButton(x: number, y: number) {
    const graphics = this.add.graphics();

    graphics.fillStyle(0xf4f7fb, 1);
    graphics.fillRoundedRect(x - 120, y - 26, 240, 52, 8);

    this.add
      .text(x, y, t("home.startAdventure"), {
        color: "#101820",
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
  }
}

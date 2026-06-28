import Phaser from "phaser";
import { t } from "../localization/i18n";
import { GarageObject } from "../objects/buildings/GarageObject";
import { MailboxObject } from "../objects/buildings/MailboxObject";
import { StartAdventureButtonObject } from "../objects/home/StartAdventureButtonObject";
import { MemoryTreeObject } from "../objects/nature/MemoryTreeObject";
import { LiliPlaceholderObject } from "../objects/npc/LiliPlaceholderObject";

export class HomeScene extends Phaser.Scene {
  constructor() {
    super("HomeScene");
  }

  create() {
    this.drawHome();
    this.scale.on(Phaser.Scale.Events.RESIZE, this.drawHome, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
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
    new GarageObject(this, width * 0.76, height * 0.56, t("home.garage"));
    new StartAdventureButtonObject(this, width / 2, height * 0.84, t("home.startAdventure"));
  }
}

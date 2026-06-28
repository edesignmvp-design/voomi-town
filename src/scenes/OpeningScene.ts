import Phaser from "phaser";
import { MotionController } from "../core/motion/MotionController";

export class OpeningScene extends Phaser.Scene {
  private lili?: Phaser.GameObjects.Container;
  private liliArm?: Phaser.GameObjects.Rectangle;
  private memoryTree?: Phaser.GameObjects.Container;
  private mailboxLetter?: Phaser.GameObjects.Rectangle;
  private garageDoor?: Phaser.GameObjects.Rectangle;
  private scheduledCalls: Phaser.Time.TimerEvent[] = [];

  constructor() {
    super("OpeningScene");
  }

  create() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
    this.drawOpeningHome();
    this.playOpening();
  }

  shutdown() {
    this.scheduledCalls.forEach((call) => call.remove(false));
    this.scheduledCalls = [];

    [this.lili, this.memoryTree].forEach((target) => {
      if (target) {
        MotionController.stop(target);
      }
    });
  }

  private drawOpeningHome() {
    const width = this.scale.width;
    const height = this.scale.height;
    const graphics = this.add.graphics();

    graphics.fillStyle(0x122133, 1);
    graphics.fillRect(0, 0, width, height);

    graphics.fillStyle(0x243b2f, 1);
    graphics.fillRect(0, height * 0.68, width, height * 0.32);

    this.memoryTree = this.createMemoryTree(width * 0.24, height * 0.54);
    this.createMailbox(width * 0.5, height * 0.58);
    this.lili = this.createLili(width * 0.5, height * 0.38);
    this.createGarage(width * 0.76, height * 0.56);
  }

  private createMemoryTree(x: number, y: number) {
    const tree = this.add.container(x, y);
    const graphics = this.add.graphics();

    graphics.fillStyle(0x7a4f2b, 1);
    graphics.fillRect(-16, -46, 32, 92);

    graphics.fillStyle(0x4f9b5f, 1);
    graphics.fillCircle(0, -92, 58);
    graphics.fillCircle(-44, -66, 38);
    graphics.fillCircle(44, -66, 38);

    tree.add(graphics);
    return tree;
  }

  private createMailbox(x: number, y: number) {
    const mailbox = this.add.container(x, y);
    const graphics = this.add.graphics();

    graphics.fillStyle(0x8b6f47, 1);
    graphics.fillRect(-7, -8, 14, 78);

    graphics.fillStyle(0xd94f42, 1);
    graphics.fillRoundedRect(-48, -58, 96, 52, 12);

    this.mailboxLetter = this.add.rectangle(0, -50, 44, 24, 0xf4f7fb).setVisible(false);
    mailbox.add([this.mailboxLetter, graphics]);
    return mailbox;
  }

  private createLili(x: number, y: number) {
    const lili = this.add.container(x, y);
    const graphics = this.add.graphics();

    graphics.fillStyle(0xf2c6a0, 1);
    graphics.fillCircle(0, -32, 30);

    graphics.fillStyle(0x9d4edd, 1);
    graphics.fillRoundedRect(-28, 0, 56, 70, 20);

    graphics.fillStyle(0x2b2d42, 1);
    graphics.fillCircle(-10, -34, 3);
    graphics.fillCircle(10, -34, 3);

    this.liliArm = this.add.rectangle(34, 14, 12, 44, 0xf2c6a0).setOrigin(0.5, 0);
    lili.add([graphics, this.liliArm]);
    lili.setScale(0.92);

    return lili;
  }

  private createGarage(x: number, y: number) {
    const garage = this.add.container(x, y);
    const graphics = this.add.graphics();

    graphics.fillStyle(0x8ca3b5, 1);
    graphics.fillRect(-76, -76, 152, 112);

    graphics.fillStyle(0x415a77, 1);
    graphics.fillTriangle(-92, -76, 0, -136, 92, -76);

    this.garageDoor = this.add.rectangle(0, 36, 92, 62, 0x203040).setOrigin(0.5, 1);
    garage.add([graphics, this.garageDoor]);
    return garage;
  }

  private playOpening() {
    this.cameras.main.setZoom(1.04);

    if (this.garageDoor) {
      this.tweens.add({
        targets: this.garageDoor,
        scaleY: 0.12,
        duration: 900,
        ease: "Sine.easeInOut",
      });
    }

    this.schedule(450, () => {
      if (this.lili) {
        MotionController.idleBreath(this.lili, {
          yOffset: -2,
          scaleOffset: 0.01,
          duration: 900,
        });
      }
    });

    this.schedule(900, () => this.waveLili());
    this.schedule(1100, () => this.swayMemoryTree());
    this.schedule(1350, () => this.showMailboxLetter());

    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1,
      duration: 1800,
      ease: "Sine.easeInOut",
    });

    this.schedule(2800, () => {
      this.scene.start("HomeScene");
    });
  }

  private waveLili() {
    if (!this.liliArm) {
      return;
    }

    this.tweens.add({
      targets: this.liliArm,
      angle: -22,
      duration: 180,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: 3,
    });
  }

  private swayMemoryTree() {
    if (!this.memoryTree) {
      return;
    }

    this.tweens.add({
      targets: this.memoryTree,
      angle: 1.5,
      duration: 600,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: 1,
    });
  }

  private showMailboxLetter() {
    if (!this.mailboxLetter) {
      return;
    }

    this.mailboxLetter.setVisible(true);
    this.tweens.add({
      targets: this.mailboxLetter,
      y: -78,
      duration: 420,
      ease: "Sine.easeOut",
    });
  }

  private schedule(delay: number, callback: () => void) {
    this.scheduledCalls.push(this.time.delayedCall(delay, callback));
  }
}

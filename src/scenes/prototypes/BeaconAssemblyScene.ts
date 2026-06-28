import Phaser from "phaser";
import { MotionController } from "../../core/motion/MotionController";
import { SnapPuzzleController } from "../../core/puzzle/SnapPuzzleController";
import { SnapZone } from "../../core/puzzle/SnapZone";
import { BeaconPuzzlePiece } from "../../objects/puzzles/BeaconPuzzlePiece";

export class BeaconAssemblyScene extends Phaser.Scene {
  private controller?: SnapPuzzleController;
  private pieces: BeaconPuzzlePiece[] = [];

  constructor() {
    super("BeaconAssemblyScene");
  }

  create() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
    this.drawBackground();
    this.drawBeaconGuide();
    this.createPuzzle();
  }

  shutdown() {
    this.controller?.stop();
    this.pieces.forEach((piece) => MotionController.stop(piece));
  }

  private drawBackground() {
    const width = this.scale.width;
    const height = this.scale.height;
    const graphics = this.add.graphics();

    graphics.fillStyle(0x102033, 1);
    graphics.fillRect(0, 0, width, height);

    graphics.fillStyle(0x20384a, 1);
    graphics.fillRoundedRect(width * 0.13, height * 0.14, width * 0.74, height * 0.72, 12);
  }

  private drawBeaconGuide() {
    const guide = this.add.graphics();

    guide.lineStyle(2, 0xd4e3ee, 0.35);
    guide.strokeRoundedRect(432, 354, 96, 36, 8);
    guide.strokeRoundedRect(466, 230, 28, 120, 10);
    guide.strokeCircle(480, 184, 29);
  }

  private createPuzzle() {
    const zones = [
      new SnapZone({
        id: "BEACON_BASE_ZONE",
        position: {
          x: 480,
          y: 372,
        },
        radius: 48,
      }),
      new SnapZone({
        id: "BEACON_POLE_ZONE",
        position: {
          x: 480,
          y: 290,
        },
        radius: 54,
      }),
      new SnapZone({
        id: "BEACON_LIGHT_ZONE",
        position: {
          x: 480,
          y: 184,
        },
        radius: 46,
      }),
    ];

    this.pieces = [
      new BeaconPuzzlePiece(this, {
        id: "BEACON_BASE",
        correctZoneId: "BEACON_BASE_ZONE",
        kind: "base",
        position: {
          x: 220,
          y: 380,
        },
      }),
      new BeaconPuzzlePiece(this, {
        id: "BEACON_POLE",
        correctZoneId: "BEACON_POLE_ZONE",
        kind: "pole",
        position: {
          x: 220,
          y: 260,
        },
      }),
      new BeaconPuzzlePiece(this, {
        id: "BEACON_LIGHT",
        correctZoneId: "BEACON_LIGHT_ZONE",
        kind: "light",
        position: {
          x: 220,
          y: 150,
        },
      }),
    ];

    this.controller = new SnapPuzzleController({
      scene: this,
      pieces: this.pieces,
      zones,
      onComplete: () => this.celebrateBeacon(),
    });
  }

  private celebrateBeacon() {
    this.pieces.forEach((piece) => MotionController.celebrate(piece));
  }
}

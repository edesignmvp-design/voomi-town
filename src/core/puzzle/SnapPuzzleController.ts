import Phaser from "phaser";
import { MotionController } from "../motion/MotionController";
import { SnapPuzzlePiece } from "./SnapPuzzlePiece";
import { SnapZone } from "./SnapZone";

export type SnapPuzzleControllerConfig = {
  scene: Phaser.Scene;
  pieces: SnapPuzzlePiece[];
  zones: SnapZone[];
  onComplete?: () => void;
};

export class SnapPuzzleController {
  private readonly scene: Phaser.Scene;
  private readonly pieces: SnapPuzzlePiece[];
  private readonly zones: SnapZone[];
  private readonly onComplete?: () => void;
  private complete = false;

  constructor(config: SnapPuzzleControllerConfig) {
    this.scene = config.scene;
    this.pieces = config.pieces;
    this.zones = config.zones;
    this.onComplete = config.onComplete;

    this.pieces.forEach((piece) => this.registerPiece(piece));
  }

  isComplete() {
    return this.complete;
  }

  stop() {
    this.pieces.forEach((piece) => {
      this.scene.tweens.killTweensOf(piece);
      MotionController.stop(piece);
    });
  }

  private registerPiece(piece: SnapPuzzlePiece) {
    piece.on(Phaser.Input.Events.DRAG_START, () => {
      if (piece.snapped) {
        return;
      }

      this.scene.tweens.killTweensOf(piece);
      MotionController.stop(piece);
    });

    piece.on(Phaser.Input.Events.DRAG, (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
      if (piece.snapped) {
        return;
      }

      piece.x = dragX;
      piece.y = dragY;
    });

    piece.on(Phaser.Input.Events.DRAG_END, () => {
      if (piece.snapped) {
        return;
      }

      this.release(piece);
    });
  }

  private release(piece: SnapPuzzlePiece) {
    const zone = this.findZone(piece);

    if (zone && zone.id === piece.correctZoneId) {
      this.snap(piece, zone);
      return;
    }

    this.returnPiece(piece);
  }

  private findZone(piece: SnapPuzzlePiece) {
    return this.zones.find((zone) => zone.contains(piece.x, piece.y));
  }

  private snap(piece: SnapPuzzlePiece, zone: SnapZone) {
    this.scene.tweens.add({
      targets: piece,
      x: zone.x,
      y: zone.y,
      duration: 180,
      ease: "Sine.easeOut",
      onComplete: () => {
        piece.snapTo(zone.x, zone.y);
        MotionController.softBounce(piece);
        this.checkComplete();
      },
    });
  }

  private returnPiece(piece: SnapPuzzlePiece) {
    const home = piece.getHomePosition();

    this.scene.tweens.add({
      targets: piece,
      x: home.x,
      y: home.y,
      duration: 220,
      ease: "Sine.easeInOut",
      onComplete: () => {
        piece.returnHome();
        MotionController.softBounce(piece);
      },
    });
  }

  private checkComplete() {
    if (this.complete || !this.pieces.every((piece) => piece.snapped)) {
      return;
    }

    this.complete = true;
    this.onComplete?.();
  }
}

import Phaser from "phaser";
import { SnapPuzzlePiece } from "../../core/puzzle/SnapPuzzlePiece";

export type BeaconPuzzlePieceKind = "base" | "pole" | "light";

export type BeaconPuzzlePieceConfig = {
  id: string;
  correctZoneId: string;
  kind: BeaconPuzzlePieceKind;
  position: {
    x: number;
    y: number;
  };
};

const pieceSizes: Record<BeaconPuzzlePieceKind, { width: number; height: number }> = {
  base: {
    width: 96,
    height: 36,
  },
  pole: {
    width: 28,
    height: 120,
  },
  light: {
    width: 58,
    height: 58,
  },
};

export class BeaconPuzzlePiece extends SnapPuzzlePiece {
  private readonly kind: BeaconPuzzlePieceKind;

  constructor(scene: Phaser.Scene, config: BeaconPuzzlePieceConfig) {
    super(scene, {
      id: config.id,
      correctZoneId: config.correctZoneId,
      position: config.position,
      size: pieceSizes[config.kind],
    });

    this.kind = config.kind;
    this.draw();
  }

  private draw() {
    if (this.kind === "base") {
      this.drawBase();
      return;
    }

    if (this.kind === "pole") {
      this.drawPole();
      return;
    }

    this.drawLight();
  }

  private drawBase() {
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0x46627a, 1);
    graphics.fillRoundedRect(-48, -18, 96, 36, 8);

    graphics.fillStyle(0x9fb3c3, 1);
    graphics.fillRoundedRect(-34, -10, 68, 12, 6);

    this.add(graphics);
  }

  private drawPole() {
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0x67839a, 1);
    graphics.fillRoundedRect(-14, -60, 28, 120, 10);

    graphics.fillStyle(0xd4e3ee, 1);
    graphics.fillRoundedRect(-5, -52, 10, 104, 5);

    this.add(graphics);
  }

  private drawLight() {
    const graphics = this.scene.add.graphics();

    graphics.fillStyle(0xf4d35e, 1);
    graphics.fillCircle(0, 0, 29);

    graphics.fillStyle(0xfff3b0, 1);
    graphics.fillCircle(0, 0, 16);

    this.add(graphics);
  }
}

import Phaser from "phaser";

export type MotionTarget = Phaser.GameObjects.GameObject & {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  scene: Phaser.Scene;
};

type MotionSnapshot = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  angle: number;
};

type IdleBreathOptions = {
  yOffset?: number;
  scaleOffset?: number;
  duration?: number;
};

type MotionOptions = {
  onComplete?: () => void;
};

export class MotionController {
  private static readonly snapshots = new WeakMap<MotionTarget, MotionSnapshot>();

  static idleBreath(target: MotionTarget, options: IdleBreathOptions = {}) {
    const base = this.prepare(target);
    const yOffset = options.yOffset ?? -2;
    const scaleOffset = options.scaleOffset ?? 0.015;

    return target.scene.tweens.add({
      targets: target,
      y: base.y + yOffset,
      scaleX: base.scaleX * (1 + scaleOffset),
      scaleY: base.scaleY * (1 + scaleOffset),
      duration: options.duration ?? 1400,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });
  }

  static gentleShake(target: MotionTarget, options: MotionOptions = {}) {
    const base = this.prepare(target);

    return target.scene.tweens.add({
      targets: target,
      x: base.x + 4,
      angle: base.angle + 1.5,
      duration: 55,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        this.restore(target);
        options.onComplete?.();
      },
    });
  }

  static softBounce(target: MotionTarget, options: MotionOptions = {}) {
    const base = this.prepare(target);

    return target.scene.tweens.add({
      targets: target,
      y: base.y - 8,
      scaleX: base.scaleX * 1.02,
      scaleY: base.scaleY * 0.985,
      duration: 140,
      ease: "Sine.easeOut",
      yoyo: true,
      repeat: 0,
      onComplete: () => {
        this.restore(target);
        options.onComplete?.();
      },
    });
  }

  static celebrate(target: MotionTarget, options: MotionOptions = {}) {
    const base = this.prepare(target);

    return target.scene.tweens.add({
      targets: target,
      y: base.y - 6,
      scaleX: base.scaleX * 1.04,
      scaleY: base.scaleY * 1.04,
      duration: 180,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.restore(target);
        options.onComplete?.();
      },
    });
  }

  static stop(target: MotionTarget) {
    target.scene.tweens.killTweensOf(target);
    this.restore(target);
  }

  private static prepare(target: MotionTarget) {
    this.remember(target);
    this.stop(target);
    return this.snapshots.get(target)!;
  }

  private static remember(target: MotionTarget) {
    if (this.snapshots.has(target)) {
      return;
    }

    this.snapshots.set(target, {
      x: target.x,
      y: target.y,
      scaleX: target.scaleX,
      scaleY: target.scaleY,
      angle: target.angle,
    });
  }

  private static restore(target: MotionTarget) {
    const base = this.snapshots.get(target);

    if (!base) {
      return;
    }

    target.x = base.x;
    target.y = base.y;
    target.scaleX = base.scaleX;
    target.scaleY = base.scaleY;
    target.angle = base.angle;
  }
}

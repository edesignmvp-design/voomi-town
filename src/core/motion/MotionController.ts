import Phaser from "phaser";

type MotionTarget = Phaser.GameObjects.GameObject & {
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

export class MotionController {
  private static readonly snapshots = new WeakMap<MotionTarget, MotionSnapshot>();

  static idleBreath(target: MotionTarget) {
    const base = this.prepare(target);

    return target.scene.tweens.add({
      targets: target,
      y: base.y - 2,
      scaleX: base.scaleX * 1.015,
      scaleY: base.scaleY * 1.015,
      duration: 1400,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });
  }

  static gentleShake(target: MotionTarget) {
    const base = this.prepare(target);

    return target.scene.tweens.add({
      targets: target,
      x: base.x + 4,
      angle: base.angle + 1.5,
      duration: 55,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: 3,
      onComplete: () => this.restore(target),
    });
  }

  static softBounce(target: MotionTarget) {
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
      onComplete: () => this.restore(target),
    });
  }

  static celebrate(target: MotionTarget) {
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
      onComplete: () => this.restore(target),
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

# Sprint Cards

Voomi Town tracks development work with Sprint Cards. A Sprint Card is a clear, numbered unit of product or engineering progress.

Do not use generic task naming in project documentation. Use Sprint Card names and IDs so the project reads like a small Trello or Jira board.

Review notes are not Sprint Cards. Keep review-driven engineering improvements in `docs/REVIEW_NOTES.md` unless they become independent deliverables.

## Epics

Epics group related Sprint Cards into a larger product or engineering direction.

```txt
EPIC-001
Project Foundation

Sprint Cards:
- SPR-001 Project Bootstrap
- SPR-002 Localization
- SPR-003 Shared Development Standards
- SPR-004 Sprint Card Workflow
- SPR-005 Home Scene Foundation
- SPR-006 Motion Framework
- SPR-007 Living Home Polish
- SPR-008 Snap Puzzle Foundation
- SPR-009 Beacon Assembly Prototype
- SPR-010 Opening Scene Prototype
```

## Global Development Rules

These rules apply to every Sprint Card unless a card explicitly says otherwise:

- Do not redesign existing architecture without approval.
- Keep implementation simple and aligned with the current codebase.
- Do not add gameplay unless the Sprint Card requires it.
- Do not add missions, puzzles, reward logic, vehicle movement, animation systems, or sound systems unless the Sprint Card requires them.
- Keep `src/core` for engine code only.
- Keep Voomi world content outside `src/core`.
- Continue using localization helpers for visible text.
- Run `npm run build` before pushing.

## Card Format

Each card should use:

```txt
SPR-000
Card Title
STATUS
```

Optional details may be added below the status when useful:

```txt
SPR-003
Home Scene Object Migration
TODO

Goal:
Move Voomi world objects out of scene-local folders and into `src/objects`.

Done When:
- Home objects live under `src/objects`.
- `src/core` contains no Voomi-specific content.
- `npm run build` passes.
```

## Status Values

Use these statuses:

```txt
TODO
IN_PROGRESS
REVIEW
DONE
BLOCKED
```

## Naming Rules

- Use IDs in ascending order: `SPR-001`, `SPR-002`, `SPR-003`.
- Use short product-readable titles.
- Keep one card focused on one coherent change.
- Prefer nouns for broad cards, such as `Localization`.
- Prefer action titles for implementation cards, such as `Move Home Objects`.

## Current Cards

SPR-001
Project Bootstrap
DONE

SPR-002
Localization
DONE

SPR-003
Shared Development Standards
DONE

SPR-004
Sprint Card Workflow
DONE

SPR-005
Home Scene Foundation
DONE

Goal:
Stabilize the Home Scene as the foundation of Voomi Town.

Requirements:
- Keep HomeScene as the entry scene.
- Keep Memory Tree, Mailbox, Garage, and Lili placeholders.
- Continue using InteractiveObject.
- Continue using `t(key)` for all visible text.
- Continue supporting responsive layout.
- Continue using simple Phaser Graphics.
- Do not introduce external assets.

Acceptance:
- Project builds successfully.
- HomeScene remains responsive.
- Interactive objects continue working.
- Existing behavior remains unchanged.

Completed:
- HomeScene remains the entry scene.
- HomeScene handles background drawing, responsive layout, object creation, and resize redraw.
- MailboxObject, MemoryTreeObject, GarageObject, and LiliPlaceholderObject live under `src/objects`.
- MailboxObject, MemoryTreeObject, and LiliPlaceholderObject continue using InteractiveObject.
- GarageObject remains a simple placeholder.
- Existing Start Adventure button drawing is kept as a simple Home object.

SPR-006
Motion Framework
DONE

Goal:
Create a lightweight reusable motion framework for Voomi Town.

Requirements:
- Create `src/core/motion/MotionController.ts`.
- Provide reusable Phaser Tween helpers: `idleBreath`, `gentleShake`, `softBounce`, `celebrate`, and `stop`.
- Keep motion subtle and child-friendly.
- Integrate with the existing InteractiveObject system without redesigning it.
- Apply idleBreath to LiliPlaceholderObject.
- Apply gentleShake when MailboxObject is tapped.
- Apply softBounce when MemoryTreeObject is tapped.
- Keep existing click behavior unchanged.
- Keep MotionController responsible only for motion.

Acceptance:
- Project builds successfully.
- HomeScene continues to work.
- MotionController is reusable.
- Lili has a subtle idle motion.
- Mailbox gently shakes when tapped.
- Memory Tree softly bounces when tapped.
- Existing click behavior remains unchanged.

Completed:
- Added reusable MotionController in `src/core/motion`.
- Kept all tween logic centralized in MotionController.
- Lili uses idleBreath.
- Mailbox still prints `MAILBOX`, then uses gentleShake.
- Memory Tree still prints `TREE`, then uses softBounce.

SPR-007
Living Home Polish
DONE

Goal:
Polish the existing Home Scene so it feels gently alive without adding gameplay.

Requirements:
- Keep HomeScene as the entry scene.
- Do not redesign the scene layout.
- Use the existing MotionController.
- Keep Lili on subtle idleBreath.
- Add very gentle idle motion to Mailbox and Memory Tree.
- Ensure resize redraw does not leave old tweens running.
- Keep existing tap behavior unchanged.
- Do not add gameplay, missions, puzzles, adventure logic, vehicle movement, sound, particles, new UI, or external assets.

Acceptance:
- Project builds successfully.
- HomeScene still works.
- Home feels slightly more alive.
- Existing interactions remain unchanged.
- Resize does not leave duplicated or orphaned tweens.
- Motion remains subtle and child-friendly.

Completed:
- HomeScene stops existing motion before resize redraw clears objects.
- HomeScene destroys old display objects during redraw.
- Lili keeps subtle idleBreath.
- Mailbox has a very gentle idle motion and still shakes after printing `MAILBOX`.
- Memory Tree has a very gentle idle motion and still bounces after printing `TREE`.

SPR-008
Snap Puzzle Foundation
DONE

Goal:
Create a simple reusable snap puzzle foundation for Voomi Town.

Requirements:
- Create reusable puzzle infrastructure under `src/core/puzzle`.
- Provide `SnapPuzzlePiece`, `SnapZone`, and `SnapPuzzleController`.
- Support dragging pieces, releasing pieces, snapping correct placement, returning wrong placement, and detecting completion.
- Use Phaser.
- Use existing MotionController where appropriate.
- Do not connect puzzle infrastructure to adventure flow yet.
- Do not modify HomeScene unless necessary.
- Do not add gameplay progression, missions, rewards, scoring, timers, failure states, punishment feedback, or adventure logic.
- Keep the first version very small and reusable.

Acceptance:
- Project builds successfully.
- Puzzle piece can be dragged.
- Correct placement snaps gently.
- Wrong placement returns gently.
- Completion can be detected.
- Puzzle code is reusable.
- No gameplay progression is added.

Completed:
- Added `SnapPuzzlePiece` as a draggable reusable Phaser container.
- Added `SnapZone` for simple radius-based snap detection.
- Added `SnapPuzzleController` for drag release handling, snap/return behavior, and completion detection.
- Used MotionController for gentle snap and return feedback.
- Left HomeScene and adventure flow unchanged.

SPR-009
Beacon Assembly Prototype
DONE

Goal:
Create the first simple Beacon Assembly prototype using the existing Snap Puzzle system.

Requirements:
- Create a simple Beacon Assembly prototype.
- Use SnapPuzzlePiece, SnapZone, SnapPuzzleController, and MotionController.
- Use simple Phaser geometric shapes only.
- Keep the beacon to a few parts: base, pole, and light.
- Make pieces draggable.
- Snap correct placement gently.
- Return wrong placement gently.
- Trigger a small celebrate motion on completion.
- Keep the prototype isolated from adventure flow.
- Do not add missions, rewards, scoring, timers, fail states, UI menus, sound, particles, or story logic.

Acceptance:
- Project builds successfully.
- Beacon Assembly prototype can run.
- Pieces can be dragged and snapped.
- Completion is detected.
- Small completion celebration plays.
- Puzzle foundation is reused, not duplicated.

Completed:
- Added isolated BeaconAssemblyScene prototype.
- Registered BeaconAssemblyScene without starting it from BootScene.
- Added geometric BeaconPuzzlePiece for base, pole, and light.
- Reused SnapPuzzlePiece, SnapZone, SnapPuzzleController, and MotionController.
- Left HomeScene and adventure flow unchanged.

SPR-010
Opening Scene Prototype
DONE

Goal:
Create a simple Opening Scene that naturally introduces Home without using a Start or other button.

Requirements:
- Create an OpeningScene.
- App launch flow should be Boot / language detection, OpeningScene, then HomeScene.
- Do not show any Start button.
- Do not show language selection.
- Use simple Phaser geometry only.
- Play a short, gentle opening sequence: garage door opens, Lili wakes up, Lili waves, Memory Tree sways, Mailbox shows one letter, camera settles on Home, then HomeScene starts automatically.
- Use existing systems where appropriate.
- Do not add gameplay, missions, rewards, puzzles, sound, particles, new UI, or skip button.

Acceptance:
- Project builds successfully.
- App starts without a Start button.
- OpeningScene plays automatically.
- OpeningScene transitions automatically to HomeScene.
- HomeScene still works.
- No language selection page appears.
- No hardcoded visible text is added.

Completed:
- Added OpeningScene with a short geometry-only opening sequence.
- BootScene now starts OpeningScene.
- OpeningScene automatically transitions to HomeScene.
- Removed the visible Start Adventure button from HomeScene.
- Kept HomeScene layout and existing objects otherwise unchanged.

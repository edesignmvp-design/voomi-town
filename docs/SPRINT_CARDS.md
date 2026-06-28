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

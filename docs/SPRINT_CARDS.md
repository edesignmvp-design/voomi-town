# Sprint Cards

Voomi Town tracks development work with Sprint Cards. A Sprint Card is a clear, numbered unit of product or engineering progress.

Do not use generic task naming in project documentation. Use Sprint Card names and IDs so the project reads like a small Trello or Jira board.

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

Implementation Notes:
- InteractiveObject hit area reuse was completed as a review improvement under the project foundation work.
- HomeScene resize listener cleanup was completed as a review improvement under the project foundation work.

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
TODO

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
- Do not add gameplay.
- Do not add missions.
- Do not add puzzles.
- Do not add animation systems.
- Do not redesign the current architecture.

Acceptance:
- Project builds successfully.
- HomeScene remains responsive.
- Interactive objects continue working.
- Existing behavior remains unchanged.

Important:
- Do not redesign existing code.
- Keep the implementation simple.
- Follow the existing project architecture.

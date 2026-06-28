# Contributing to Voomi Town

This repository is developed with a clear separation between engine code and world content. Human contributors and AI assistants should follow the same rules so the project history stays readable.

## Development Flow

1. Start from the latest `main`.
2. Keep each change focused on one feature, fix, or refactor.
3. Run the relevant validation before committing.
4. Use a Conventional Commit message.
5. Push only code that can be explained from the commit title and diff.

## Project Boundaries

`src/core` is engine code only. It must not contain Voomi-specific characters, places, buildings, story content, or gameplay objects.

Use `src/objects` for the Voomi world:

```txt
src/objects/
  vehicles/
  npc/
  buildings/
  nature/
```

Use `src/scenes` to compose the world on screen. Scenes may import objects and systems, but should avoid becoming a dumping ground for reusable engine logic.

Use `src/systems` for cross-object gameplay systems such as quests, dialogue, inventory, weather, time, or puzzles.

## Commit Messages

Use Conventional Commits:

```txt
feat(scope): describe the feature
fix(scope): describe the bug fix
refactor(scope): describe the restructure
docs(scope): describe documentation changes
chore(scope): describe tooling or maintenance
```

Good examples:

```txt
feat(core): add InteractiveObject system
feat(i18n): add localization framework
feat(home): create opening scene
feat(puzzle): add snap puzzle system
refactor(objects): move home objects into world folders
```

Avoid vague messages such as:

```txt
Initial commit
update
fix bug
changes
```

## Validation

Before pushing code, run:

```sh
npm run build
```

If a change adds tests in the future, run the relevant test command as well.

## AI Assistant Rules

Codex, Claude, Cursor, and other coding agents should:

- Respect the `core` versus `objects` boundary.
- Prefer small, reviewable commits.
- Use the commit format in this document.
- Avoid unrelated refactors while implementing a requested change.
- Keep generated code aligned with the existing TypeScript, Phaser, React, and Vite patterns.
- Mention any validation command that was run before handing work back.

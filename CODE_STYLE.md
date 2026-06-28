# Code Style

Voomi Town uses TypeScript, React, Vite, and Phaser. This document defines the shared style for human contributors and AI coding assistants.

## Architecture

Keep engine code and world content separate.

`src/core` contains reusable engine capabilities:

```txt
interactive/
animation/
audio/
save/
localization/
```

Core code should be generic. It should not know about Lili, mailboxes, trees, garages, Voomi Town locations, story text, or specific world objects.

`src/objects` contains actual world content:

```txt
vehicles/
npc/
buildings/
nature/
```

`src/scenes` composes objects, systems, and UI into playable scenes.

`src/systems` contains gameplay systems that coordinate multiple objects or scenes.

## TypeScript

- Use explicit exported types for public configuration objects.
- Prefer readable names over abbreviations.
- Keep classes focused on one responsibility.
- Avoid `any` unless there is a clear boundary with an external library.
- Keep Phaser-specific types close to Phaser-facing code.
- Do not hide important game behavior inside anonymous callbacks when a named method would be clearer.

## Imports

- Use relative imports within nearby project files.
- Keep imports grouped by source naturally: external libraries first, then local modules.
- Do not create barrel files until they remove real duplication.

## Phaser Objects

- World objects should live under `src/objects`.
- Shared object behavior should live under `src/core` only when it is not Voomi-specific.
- Interactive objects should expose clear lifecycle and input methods such as `idle`, `onTap`, `onPointerDown`, and `onPointerUp`.
- Scene classes should place and coordinate objects, not own every object detail.

## Localization

- User-facing strings should go through localization helpers.
- Do not hardcode visible text in scenes or objects when it may appear in the game UI.
- Keep localization keys stable and descriptive.

## Formatting

- Follow the formatting already present in the repository.
- Use double quotes in TypeScript and JSON.
- Use semicolons.
- Keep files ASCII unless a file already requires another character set.
- Add comments only when they explain non-obvious intent or constraints.

## Git Hygiene

- Keep commits focused.
- Use Conventional Commits.
- Do not commit generated build output such as `dist`.
- Do not commit local logs, credentials, or environment files.

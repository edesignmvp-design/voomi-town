# Review Notes

Review notes are engineering improvements found during implementation or code review. They are not Sprint Cards unless they become independent deliverables.

## Completed Review Improvements

```txt
CODEX_REVIEW_004
InteractiveObject hit area reuse
DONE

Notes:
- `registerInteraction()` stores the original hit area configuration.
- `setInteractive(true)` reuses the stored hit area.
- Public InteractiveObject API stayed unchanged.
```

```txt
CODEX_REVIEW_004_HOME_SCENE
HomeScene resize listener cleanup
DONE

Notes:
- HomeScene registers scene shutdown cleanup.
- Resize listener is removed through `shutdown()`.
- Existing HomeScene behavior stayed unchanged.
```

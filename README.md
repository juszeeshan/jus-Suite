# Jus Suite v2

Shell + real module mounting. Each tool lives in its own folder and runs in its own frame, so its theme, scripts and saved data stay untouched.

- `dictator/` = Jus Dictator (already connected)
- Jus Reader and Jus Exam Study = placeholders until their code is added (put each in its own folder, then add `src:'reader/'` or `src:'study/'` to the module list in `app.js`)
- Menu: Dictator shows a top-left button that opens the suite drawer. Modules without it get a small floating button.
- All tools share the origin juszeeshan.github.io, so every module must prefix its saved keys. The suite uses `jusSuite.`; Dictator uses `dict:` and the `jusdict` database.

# CLAUDE.md — AI Assistant Guide for mmover

## Project Overview

**mmover** is a Node.js/TypeScript utility that prevents system idle or screensaver activation by detecting mouse inactivity and automatically nudging the cursor at a configurable interval.

- **Author:** Robert Burckhardt
- **License:** MIT
- **Version:** 0.0.1
- **Package Manager:** Yarn (use `yarn`, not `npm`)

---

## Repository Structure

```
mmover/
├── main.ts                   # Application entry point — bootstraps DI and starts worker
├── src/
│   ├── Inversify.config.ts   # IoC container setup; binds interfaces to implementations
│   ├── Types.ts              # Symbol-based DI keys (TYPES object)
│   ├── Worker.ts             # Worker interface (run(): void)
│   ├── MousePosition.ts      # MousePosition interface ({ x, y })
│   └── MousePositionWorker.ts# Core logic: detects inactivity and moves mouse
├── .env                      # Runtime configuration (TIMEOUT, MOVE_MARGIN)
├── tsconfig.json             # TypeScript compiler config
├── package.json              # Scripts and dependencies
└── yarn.lock                 # Yarn lockfile (commit this, do not delete)
```

---

## Development Workflow

### Install Dependencies

```bash
yarn install
```

### Build

Compiles TypeScript to `dist/` (output directory):

```bash
yarn build
# Equivalent: rm -rf dist && tsc
```

The `dist/` directory is gitignored and must never be committed.

### Run

After building, start the application:

```bash
node main.js
```

Or run the compiled entry point directly:

```bash
node dist/main.js
```

> **Note:** There is no `yarn start` shortcut that builds first. Always build before running.

---

## Configuration

Runtime behaviour is controlled via `.env` (loaded by `dotenv` in `src/Inversify.config.ts`):

| Variable      | Default | Description                                             |
|---------------|---------|---------------------------------------------------------|
| `TIMEOUT`     | `3000`  | Milliseconds between mouse-position checks              |
| `MOVE_MARGIN` | `3`     | Pixels to move the cursor when inactivity is detected   |

The `.env` file is **not** gitignored — it is committed with safe defaults. Never store secrets in it.

---

## Architecture

### Dependency Injection (Inversify)

The project uses [Inversify](https://inversify.io/) for IoC. All wiring lives in `src/Inversify.config.ts`.

- **`TYPES`** (`src/Types.ts`) — Symbol constants used as DI keys. Add a new symbol here for every new injectable dependency.
- **Container bindings** (`src/Inversify.config.ts`) — Maps TYPES symbols to concrete values or classes.
- **`@injectable()`** — Must be applied to every class registered in the container.
- **`@inject(TYPES.X)`** — Used in constructors to declare constructor-injected dependencies.

### Adding a New Dependency

1. Add a new `Symbol` to `TYPES` in `src/Types.ts`.
2. Bind it in `src/Inversify.config.ts`.
3. Inject it via the constructor using `@inject(TYPES.NewThing)`.

### Core Logic (`MousePositionWorker`)

- Uses `setInterval` at the configured `TIMEOUT` interval.
- Compares current mouse position (via `robotjs.getMousePos()`) to the last known position.
- If the position has not changed, it moves the mouse by `MOVE_MARGIN` pixels, alternating direction between up-right and down-left on successive triggers.
- The previous position and direction state are tracked as private instance fields.

---

## TypeScript Conventions

- **Strict mode** is enabled (`"strict": true` in `tsconfig.json`). Do not disable it.
- **Experimental decorators** and **emitDecoratorMetadata** are required by Inversify — both are enabled in `tsconfig.json`.
- **Target:** ESNext; **Module:** CommonJS.
- `reflect-metadata` must be imported once at the application entry point (currently in `main.ts`) before any Inversify decorators are evaluated.

### Naming Conventions

| Construct         | Convention   | Example                   |
|-------------------|--------------|---------------------------|
| Classes           | PascalCase   | `MousePositionWorker`     |
| Interfaces        | PascalCase   | `Worker`, `MousePosition` |
| Methods/props     | camelCase    | `run()`, `moveMargin`     |
| Private members   | camelCase (no special prefix enforced) | `previousPosition` |
| DI key constants  | UPPER_SNAKE  | `TYPES.Worker`            |
| Files             | PascalCase   | `MousePositionWorker.ts`  |

---

## Dependencies

| Package             | Purpose                                           |
|---------------------|---------------------------------------------------|
| `robotjs`           | Cross-platform mouse/keyboard control             |
| `inversify`         | Inversion-of-control / dependency injection       |
| `reflect-metadata`  | Decorator metadata (required by Inversify)        |
| `dotenv`            | Load `.env` into `process.env`                    |
| `typescript`        | TypeScript compiler (dev)                         |
| `@types/node`       | Node.js type definitions (dev)                    |

> `robotjs` has native bindings. If you change Node.js versions, run `yarn install` again to rebuild it.

---

## Testing

There is currently **no test framework** configured. The `tsconfig.json` excludes `./test/**/*`, indicating a `test/` directory is planned.

When adding tests:
- Place test files in `test/` at the project root.
- Use a framework compatible with TypeScript (e.g., Jest with `ts-jest`, or Vitest).
- Add a `test` script to `package.json`.

---

## Linting & Formatting

No linter or formatter is configured yet. When adding one:
- Prefer ESLint with `@typescript-eslint/eslint-plugin`.
- Add Prettier for consistent formatting.
- Wire both into a `lint` script in `package.json`.

---

## Git Conventions

- Commit messages use imperative mood and sentence case (e.g., `Add inversion of control by inversify`).
- `dist/` and `node_modules/` are gitignored — never commit them.
- `yarn.lock` must always be committed alongside `package.json` changes.

---

## What NOT to Do

- Do not switch to `npm` — the project uses Yarn; mixing package managers corrupts the lockfile.
- Do not disable `strict` mode in `tsconfig.json`.
- Do not import `reflect-metadata` more than once, or after Inversify decorators have loaded.
- Do not commit the `dist/` directory.
- Do not hardcode timeout or margin values — use the DI container and `.env`.

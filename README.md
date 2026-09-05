# NxMicrofrontends

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

An **Angular microfrontend showcase monorepo** built with [Nx](https://nx.dev) and [Native Federation](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/native-federation/README.md). It demonstrates how to compose multiple independently deployed Angular applications using Module Federation, with each remote MFE showcasing the same set of UI components implemented with a different component library.

## Architecture

The workspace follows a **shell + remotes** microfrontend pattern:

```
nx-microfrontends/
├── apps/
│   ├── shell/           # Host application (port 4200) — orchestrates the remotes
│   ├── mfe-material/    # Remote MFE (port 4201) — Angular Material components
│   ├── mfe-primeng/     # Remote MFE (port 4202) — PrimeNG components
│   └── mfe-native/      # Remote MFE (port 4203) — Native Angular / vanilla components
└── libs/
    └── shared/          # Shared models, styles, UI utilities, and performance helpers
```

### Applications

| App | Port | Description |
|-----|------|-------------|
| `shell` | 4200 | Host application that dynamically loads remotes via Native Federation |
| `mfe-material` | 4201 | Component showcase built with **Angular Material** |
| `mfe-primeng` | 4202 | Component showcase built with **PrimeNG** |
| `mfe-native` | 4203 | Component showcase built with **native Angular** (no third-party UI library) |

### Showcased Components

Each remote MFE implements a parity set of UI components, including:

- Badge, Card, Checkbox, Datepicker, Dialog/Modal
- Divider, Dropdown/Select, Input/Text-Input
- Menu, Pagination, Progress Bar & Spinner
- Radio Button, Range Slider, Stepper, Tabs
- Table, Toggle Switch, Toolbar, Tooltip, Accordion

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo tooling | [Nx](https://nx.dev) 23 |
| Framework | [Angular](https://angular.dev) 22 |
| Microfrontend federation | [@angular-architects/native-federation](https://github.com/angular-architects/module-federation-plugin) |
| UI library A | [Angular Material](https://material.angular.io) |
| UI library B | [PrimeNG](https://primeng.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 + SCSS |
| Unit tests | [Vitest](https://vitest.dev) (via `@analogjs/vitest-angular`) |
| E2E tests | [Playwright](https://playwright.dev) |
| Package manager | [Bun](https://bun.sh) |

---

## Prerequisites

- **Node.js** ≥ 20
- **Bun** ≥ 1.0 — used as the package manager ([install](https://bun.sh/docs/installation))
- **Nx CLI** (optional but recommended): `npm install -g nx`

---

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/<your-org>/nx-microfrontends.git
cd nx-microfrontends
bun install
```

---

## Running the Applications

### Run everything at once (recommended)

Start all apps in parallel so the shell can load the remotes:

```sh
npx nx run-many --target=serve --all --parallel
```

Then open **http://localhost:4200** in your browser.

### Run apps individually

```sh
# Shell (host)
npx nx serve shell

# Angular Material MFE
npx nx serve mfe-material

# PrimeNG MFE
npx nx serve mfe-primeng

# Native Angular MFE
npx nx serve mfe-native
```

> **Note:** Each remote must be running for the shell to successfully load it via federation.

---

## Building for Production

```sh
# Build a single app
npx nx build shell

# Build all apps
npx nx run-many --target=build --all
```

Build artifacts are output to `dist/apps/<app-name>/`.

---

## Testing

### Unit tests

```sh
# Run tests for all projects
npx nx run-many --target=test --all

# Run tests for a specific project
npx nx test mfe-material
```

### E2E tests

```sh
npx nx e2e shell-e2e
```

---

## Linting

```sh
# Lint all projects
npx nx run-many --target=lint --all

# Lint a specific project
npx nx lint mfe-material
```

---

## Other Useful Commands

```sh
# Visualize the project graph
npx nx graph

# Show all available targets for a project
npx nx show project shell

# Generate a new Angular app
npx nx g @nx/angular:app my-new-app

# Generate a new shared library
npx nx g @nx/angular:lib libs/shared/my-lib

# Generate the PrimeNG theme
bun run build:theme
```

---

## Useful Links

- [Nx Angular Monorepo Tutorial](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial)
- [Native Federation Docs](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/native-federation/README.md)
- [Angular Material](https://material.angular.io)
- [PrimeNG](https://primeng.org)
- [Nx on CI](https://nx.dev/ci/intro/ci-with-nx)
- [Nx Discord Community](https://go.nx.dev/community)

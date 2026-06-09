# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern ThreeJS is a functional 3D graphics boilerplate using Three.js with Vite. It serves as a starting point for 3D web projects, featuring shader support, debug UI, and modern TypeScript configuration.

## Commands

```bash
pnpm dev          # Development server (localhost:3000)
pnpm build        # TypeScript check + Vite build
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix linting issues
pnpm preview      # Preview production build
```

## Architecture

### Core Systems (src/core/)

- **renderer.ts**: Creates WebGLRenderer, Scene, and canvas element. Exports `renderer`, `scene`, and `canvas`.
- **camera.ts**: PerspectiveCamera setup with window resize handling. Exports `camera`.
- **gui.ts**: Tweakpane debug panel with FPS graph monitor. Exports `pane` and `fpsGraph`.
- **orbit-control.ts**: OrbitControls for camera interaction with damping. Exports `controls`.

### Main Application (src/main.ts)

Entry point that:

- Sets up lighting (ambient + directional with shadows)
- Creates geometries and materials
- Implements shader-based animated sphere using custom GLSL
- Runs the animation loop updating shader uniforms (`uTime`, `uFrequency`)

### Shaders (src/shaders/)

GLSL files loaded via `vite-plugin-glsl`. Import as strings:

```typescript
import vertexShader from '/@/shaders/vertex.glsl'
```

## Key Patterns

- **Functional architecture**: No classes. Core modules export initialized objects directly.
- **Path alias**: `/@/` maps to `./src/` for cleaner imports
- **Real-time animation**: Uses Three.js Clock for delta time in the render loop
- **Debug UI binding**: Tweakpane bound directly to object properties (camera position, light settings)
- **Shader uniforms**: Updated each frame via `material.uniforms.uTime.value`

## TypeScript Configuration

- `moduleResolution: "bundler"` (Vite-optimized)
- Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
- Types included: `vite/client`, `three`, `tweakpane`, `three/tsl`, `three/webgpu`

## Code Style

- Uses `@alvarosabu/eslint-config` (no semicolons)
- ES modules throughout
- Canvas element requires `id="webgl"` in index.html

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

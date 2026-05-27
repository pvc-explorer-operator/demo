# PVC Explorer — Live Demo

Interactive demo of the [PVC Explorer](https://github.com/pvc-explorer-operator/pvc-explorer) UI, served as a fully static site with no backend required.

**[Open the demo →](https://pvc-explorer-operator.github.io/demo/)**

## How it works

All API calls are intercepted by a Service Worker that serves mock data. The WebSocket feed is simulated via a composable alias. No Kubernetes cluster or server is involved.

Mock data includes 18 explorers across multiple phases (Running, ScaledToZero, Waking, Pending, Failed) and 4 scopes.

## Source

The demo is built from the `ui/` directory in the main repository using `npm run build:demo`. This repo is updated automatically on every push to `main`.


# PVC Explorer Mockup Demo

This project is a **standalone mockup demo** of the PVC Explorer UI.

**No real Kubernetes cluster is connected.** All data, files, and actions are simulated using static mock data. The UI is fully interactive, but all operations are read-only and reset on page reload.

## Features

- Browse a simulated file system and PVC explorer interface
- All actions (connect, disconnect, wake, etc.) are disabled or show info messages
- Mock data is provided via the `demo-mock/` and `dev-mock/` folders
- Built with Vue 3, PrimeVue, Pinia, and Vite

## Running the Demo

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the demo in your browser.

## About

This demo is for UI/UX preview and testing only. For the full live experience, see the [main PVC Explorer repository](https://github.com/pvc-explorer-operator/pvc-explorer).

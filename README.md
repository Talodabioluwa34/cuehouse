# CueHouse

Control center for live scripture on the house screen.

Pastor speaks → CueHouse detects → Present → congregation sees it.  
When listen fails → **Manual** find → same Present → same house.

## Status

- Name locked: **CueHouse**
- Dual input locked: Listen + Manual (`decisions/0003` in Talo clients)
- Desktop spike: `apps/desktop` (Electron)

## Run desktop (test)

```bash
cd apps/desktop
npm install
npm run dev
```

From repo root:

```bash
npm run desktop
```

**What you can test now**
1. **Open Display** — second window (house)
2. **Start listening** / **Start in Manual** — mode switch in header
3. **Present** — pushes sample Romans 8:28 to Display
4. **BLACK** — clears house
5. **Simulate mic fail** — banner + Switch to Manual

STT / real Bible data not wired yet.

## Structure

```text
cuehouse/
├── apps/desktop/   # Electron booth + house display
├── docs/
├── PRD.md
└── README.md
```

## Related

Design notes: Talo workspace `clients/cuehouse/`.

# SanadGraph

SanadGraph is an interactive web-based visualizer for studying hadith sanad (chain of narration) continuity. It maps narrator relationships as a graph, highlights weak or broken links, and gives a quick scholarly inspection view for each narrator in the chain.

This project is built for the SahihFinder ecosystem and is intended as a learning and analysis tool for understanding how authenticity-related continuity checks are represented visually.

## Project Summary

The app loads preset hadith chains, renders them as a directed graph, and shows:

- narrator names and death years (AH)
- grade labels such as Prophet, Sahabi, Thiqah, Saduq, Da'if, and Matruk
- parent/teacher relationships between narrators
- continuity checks (Muttasil vs. Munqati')
- a custom chain builder for manually adding narrators

It is designed as a static TypeScript front-end: the main logic compiles into a distribution folder, while the UI is assembled in HTML and CSS.

## Features

### 1. Interactive Sanad Visualization

The graph renders narrators as connected nodes with edges representing transmission lineage. The root node is the Prophet Muhammad ﷺ for the included examples.

Each node is color-coded by narrator grade:

- Prophet: gold
- Sahabi: green
- Thiqah: green
- Saduq: blue
- Da'if / broken: red

### 2. Preset Hadith Chains

Included examples demonstrate different sanad scenarios:

- Actions are judged by intentions (Sahih chain)
- Golden chain example
- Broken or weak chain example for comparison

These presets are defined in `src/data.ts` and can be extended with more narration chains.

### 3. Narrator Inspector Panel

When a node is clicked, the inspector panel displays:

- rank
- grade label
- narrator name
- death year (AH)
- short biography / scholarly description
- continuity assessment based on the transmission gap

The app uses simple heuristics to detect probable breaks in continuity, such as:

- large age gaps between narrator and teacher
- negative chronology
- explicit `brokenLink` flags

### 4. Custom Chain Builder

Users can add narrators manually through the builder panel and choose:

- narrator name
- death year in AH
- grade
- parent/teacher relationship

The graph updates immediately so users can compare a manually created chain against the preset examples.

### 5. Graph Controls

The UI includes:

- Reset View
- Add Custom Narrator
- Auto-fit graph layout
- Click-to-inspect interactivity

## Tech Stack

- TypeScript
- ES modules
- Cytoscape.js for graph rendering
- HTML5
- CSS3

## Repository Layout

```text
SanadGraph/
├── CNAME
├── README.md
├── favicon1.png
├── index.html
├── style.css
├── tsconfig.json
├── src/
│   ├── data.ts
│   ├── graph.ts
│   ├── main.ts
│   └── types.ts
└── dist/  (generated after compilation)
```

### Key Files

#### `index.html`
The main page and app shell. It includes the toolbar, graph container, narrator inspector, and the module entry point to the built JavaScript.

#### `src/main.ts`
Controls the UI behavior, preset selection, inspector rendering, and custom node creation.

#### `src/graph.ts`
Builds and manages the Cytoscape graph and the node/edge structure.

#### `src/data.ts`
Stores the preset hadith chains and their narration metadata.

#### `src/types.ts`
Contains TS types for narrator nodes, hadith chains, and grade metadata.

#### `style.css`
Implements the project’s themed styling, including the dark scholar-focused interface.

#### `tsconfig.json`
TypeScript configuration for compiling the project to `dist/`.

## Getting Started

### Prerequisites

You need:

- a modern browser
- TypeScript installed locally or globally
- a simple local web server (optional but recommended)

### Install TypeScript

If TypeScript is not already installed:

```bash
npm install -g typescript
```

If you prefer a local project install, you can also use:

```bash
npx tsc --version
```

### Compile the TypeScript

From the repository root:

```bash
npx tsc --project tsconfig.json
```

This compiles the files in `src/` to the `dist/` directory based on the configuration in `tsconfig.json`.

### Run the app locally

Because this is a static front-end, you can either:

1. open `index.html` directly in a browser, or
2. serve the project locally:

```bash
python3 -m http.server 8000
```

Then navigate to:

```text
http://localhost:8000
```

## Important Notes

### Dependency Handling

The `index.html` file references `cytoscape.min.js` in the root of the project. If that file is not present in your local environment, the graph will fail to render until the Cytoscape library is added to the project.

### Project Type

This repository is not a Node application with a `package.json` and standard npm scripts. It is a lightweight static front-end project that relies on TypeScript compilation and browser execution.

### Academic / Educational Context

This project models hadith sanad analysis in an educational and visual way. It is intended to help explain continuity, narrator grading, and chain structure. It should not be treated as a formal scholarly ruling engine or an authoritative source of hadith certification.

## How the App Works

1. A preset chain is selected from the dropdown.
2. The `src/data.ts` file provides narrator nodes and metadata.
3. `src/graph.ts` converts the dataset into Cytoscape elements.
4. Clicking a node triggers the inspector in `src/main.ts`.
5. The continuity logic checks age gaps and broken links to classify a chain as structurally strong or weak.
6. The custom builder lets users add their own narrators to test new chain scenarios.

## Example Workflow

```bash
npx tsc --project tsconfig.json
python3 -m http.server 8000
```

Then:

- open the site in the browser
- choose a preset hadith
- click a narrator node
- inspect the continuity and grade assessment
- use the custom builder to create a new chain pattern

## Contribution Notes

This project is intentionally simple and flexible. Potential enhancements include:

- adding more hadith chains
- improving continuity detection logic
- including source references and citations
- supporting export/sharing of generated chains
- adding more structured narrator metadata

## License

No license file is currently included in the repository root, so licensing terms are not declared in this project as-is.

## Contact / Project Context

This project is associated with SahihFinder and Shahadah Studios Elite.

For project updates or publication context, refer to the repository and site links associated with the project.

## Summary

SanadGraph is a focused educational visualization tool for understanding sanad structure, narrator continuity, and historical chain analysis in hadith studies. It combines a static front-end, TypeScript logic, and a graph-based UI to present a visual model of authenticity-related transmission chains.

If you are developing or extending the project, start with `src/main.ts`, `src/graph.ts`, and `src/data.ts` to understand how the application model is built and rendered.

---

Built for scholarship, study, and graph-based analysis of hadith transmission chains.


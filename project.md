# Project Plan: HTML Snippet Previewer

**Project Goal:** Build a static web app using Vite, React, TypeScript, Tailwind CSS, and Lucide Icons to allow users to paste HTML snippets and see a live preview. The app will feature a responsive split-pane layout, an adaptive light/dark theme (minimalist style with a configurable blue accent), and reside in the `/Users/benjip/dev/ML/webtools/html-preview-vite` directory.

**Technology Stack:**

*   Build Tool: Vite
*   Framework: React
*   Language: TypeScript
*   Styling: Tailwind CSS
*   Icons: Lucide Icons (via `lucide-react`)
*   State Management: React Hooks (`useState`, `useEffect`)

---

## Phase 1: Setup and Structure

1.  **Initialize Project:**
    *   Use Vite CLI in the workspace directory: `npm create vite@latest . --template react-ts` (or `yarn`).
    *   Install dependencies: `npm install` (or `yarn`).

2.  **Add Dependencies:**
    *   Tailwind & PostCSS: `npm install -D tailwindcss postcss autoprefixer`
    *   Lucide Icons for React: `npm install lucide-react`

3.  **Configure Tailwind:**
    *   Generate config files: `npx tailwindcss init -p`
    *   Edit `tailwind.config.js` to reference CSS variables for the accent color and include TSX files in content:
        ```javascript
        /** @type {import('tailwindcss').Config} */
        export default {
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}", // Ensure TSX is included
          ],
          darkMode: 'class', // Enable class-based dark mode
          theme: {
            extend: {
              colors: {
                // Reference the CSS variable for the 'accent' color name
                accent: 'var(--color-accent)',
                // Optionally define shades if needed, referencing other variables
                // accent: {
                //   light: 'var(--color-accent-light)',
                //   DEFAULT: 'var(--color-accent)',
                //   dark: 'var(--color-accent-dark)',
                // }
              }
            },
          },
          plugins: [],
        }
        ```
    *   Ensure `postcss.config.js` includes `tailwindcss` and `autoprefixer`.

4.  **Integrate Tailwind CSS & Define Accent Color:**
    *   Replace the content of `src/index.css` (or the default CSS file) with:
        ```css
        /* Define configurable CSS variables */
        :root {
          --color-accent: #3b82f6; /* Default blue-500 - CHANGE THIS VALUE TO RECONFIGURE */
          /* Add more shades if needed, e.g., --color-accent-dark: #2563eb; */
        }

        /* Apply Tailwind directives */
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        /* Optional: Base body styles */
        body {
          @apply bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200;
        }
        ```
    *   Import this CSS file in `src/main.tsx`: `import './index.css'`

5.  **Project Structure (Conceptual):**
    ```
    /
    ├── public/
    ├── src/
    │   ├── components/       # Reusable UI components
    │   │   ├── Editor.tsx
    │   │   ├── Preview.tsx
    │   │   └── ThemeToggle.tsx
    │   ├── App.tsx           # Main application component
    │   ├── main.tsx          # Entry point, renders App
    │   └── index.css         # Tailwind directives & CSS Variables
    ├── index.html            # Root HTML (minimal)
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
    ```

6.  **Modify `index.html`:**
    *   Ensure it contains `<div id="root"></div>`.
    *   Remove default Vite content.

---

## Phase 2: Component Implementation (React & Tailwind)

1.  **`App.tsx`:**
    *   **State:** Use `useState` for `htmlContent: string` and `theme: 'light' | 'dark'`.
    *   **Theme Effect:** Use `useEffect` for initial theme detection (localStorage/system preference) and applying/removing the `dark` class on `document.documentElement` when `theme` changes. Store preference in `localStorage`.
    *   **Layout:** Use Tailwind classes (`flex`, `flex-col`, `md:flex-row`, `h-screen`, `gap-4`, `p-4`, etc.) for the responsive split-pane layout. Apply base background/text colors here or rely on `index.css`.
    *   **Render Components:** Render `<ThemeToggle>`, `<Editor>`, `<Preview>`, passing state and setters as props.

2.  **`Editor.tsx`:**
    *   Props: `htmlContent: string`, `setHtmlContent: (value: string) => void`.
    *   Renders a `<textarea>` styled with Tailwind (e.g., `flex-1`, `p-2`, `border`, `rounded`, `bg-gray-50 dark:bg-gray-800`).
    *   Binds `value` to `htmlContent` and `onChange` to `(e) => setHtmlContent(e.target.value)`.

3.  **`Preview.tsx`:**
    *   Props: `htmlContent: string`.
    *   Renders an `<iframe srcDoc={htmlContent}` styled with Tailwind (e.g., `flex-1`, `border`, `rounded`, `bg-white`).
    *   *(Debouncing can be added later in `App.tsx` if needed)*.

4.  **`ThemeToggle.tsx`:**
    *   Props: `theme: 'light' | 'dark'`, `setTheme: (theme: 'light' | 'dark') => void`.
    *   Imports `Sun`, `Moon` from `lucide-react`.
    *   Renders a `<button>` styled with Tailwind (e.g., `p-2`, `rounded`, `hover:bg-gray-200 dark:hover:bg-gray-700`).
    *   Displays `<Sun />` or `<Moon />` based on `theme`.
    *   `onClick` calls `setTheme(theme === 'light' ? 'dark' : 'light')`.

---

## Phase 3: Logic (State Management & Effects)

*   Primary logic resides in `App.tsx` using `useState` for managing editor content and theme state.
*   `useEffect` handles side effects like theme application, initial detection, and localStorage persistence.
*   Data flows unidirectionally via props from `App.tsx` down to child components.
*   Events bubble up via callback functions passed as props.

---

## Visual Interaction Flow (React Components)

```mermaid
graph LR
    subgraph UI Components (React + Tailwind)
        A(App.tsx State: htmlContent, theme);
        B(Editor Component);
        C(Preview Component);
        D(ThemeToggle Component w/ Lucide Icon);
    end

    subgraph React Flow
        A -- Props (htmlContent, setHtmlContent) --> B;
        A -- Props (htmlContent) --> C;
        A -- Props (theme, setTheme) --> D;

        B -- onChange Event --> A(Updates htmlContent);
        D -- onClick Event --> A(Updates theme);

        A -- useEffect (theme change) --> E(document.documentElement classList);
        A -- useEffect (theme change) --> F(LocalStorage);
        A -- useEffect (mount) --> G(System Theme Preference / LocalStorage);
    end

    C -- Renders --> H(Iframe srcDoc);

    style E fill:#f9f,stroke:#333,stroke-width:2px
    style F fill:#ccf,stroke:#333,stroke-width:2px
    style G fill:#ccf,stroke:#333,stroke-width:2px
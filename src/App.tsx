import { useState, useEffect } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import ThemeToggle from "./components/ThemeToggle";

type Theme = "light" | "dark";

function App() {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [theme, setTheme] = useState<Theme>("light"); // Default theme

  // Effect for initializing and updating theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Determine initial theme
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);

    // Apply theme class and store preference
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []); // Run only on mount to detect initial theme

  // Effect to update theme when state changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]); // Run whenever theme state changes

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h1 className="text-lg font-semibold">HTML Snippet Previewer</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0 md:min-h-full">
          {" "}
          {/* Ensure flex container takes height */}
          <Editor htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
        </div>
        <div className="flex-1 flex flex-col min-h-0 md:min-h-full">
          {" "}
          {/* Ensure flex container takes height */}
          <Preview htmlContent={htmlContent} />
        </div>
      </main>
    </div>
  );
}

export default App;

import { useEffect, useMemo, useRef, useState } from "react";
import ToolGrid from "./components/ToolGrid";
import AddToolModal from "./components/AddToolModal";
import { getTools, saveTools } from "./utils/storage";
import { resetIfNeeded } from "./utils/resetEngine";
import "./global.css";

function createStarterTool() {
  return {
    id: crypto.randomUUID(),
    name: "ChatGPT",
    type: "AI",
    description: "OpenAI's conversational AI assistant.",
    url: "https://chatgpt.com",
    icon: "🤖",
    usage: {
      used: 0,
      max: 40,
      resetTime: "00:00",
      lastReset: null,
    },
    metadata: {
      isAI: true,
      tags: ["assistant"],
    },
    ui: { position: 0, color: "" },
  };
}

export default function App() {
  const [tools, setTools] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const importInput = useRef(null);

  useEffect(() => {
    const stored = getTools();
    if (!stored || stored.length === 0) {
      setTools([createStarterTool()]);
      return;
    }
    setTools(stored);
  }, []);

  useEffect(() => {
    saveTools(tools);
  }, [tools]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTools((prev) => prev.map((tool) => ({ ...resetIfNeeded({ ...tool }) })));
    }, 60000);

    return () => window.clearInterval(interval);
  }, []);

  function addTool(tool) {
    setTools((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: tool.type || "website",
        description: tool.description || "",
        usage: tool.usage || { used: 0, max: 0, resetTime: "", lastReset: null },
        metadata: tool.metadata || { isAI: false, tags: [] },
        ui: { position: prev.length, color: "" },
        ...tool,
      },
    ]);
    setShowModal(false);
  }

  function exportTools() {
    const blob = new Blob([JSON.stringify(tools, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "website-bible.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        setTools(
          data.map((tool, index) => ({
            ...tool,
            ui: { ...(tool.ui || {}), position: index, color: tool.ui?.color || "" },
          })),
        );
      } catch {
        alert("Invalid file");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  const filteredTools = useMemo(() => {
    return [...tools]
      .sort((a, b) => (a.ui?.position ?? 0) - (b.ui?.position ?? 0))
      .filter((tool) => {
        const matchesSearch = tool.name
          .toLowerCase()
          .includes(search.trim().toLowerCase());
        const matchesFilter = filter ? tool.type === filter : true;
        return matchesSearch && matchesFilter;
      });
  }, [filter, search, tools]);

  return (
    <div className="app-root">
      <header className="header">
        <div>
          <h1>WEBSITE BIBLE</h1>
          <p>Your AI tool desktop</p>
        </div>

        <div className="header-buttons">
          <button type="button" onClick={exportTools}>
            Export
          </button>
          <button type="button" onClick={() => importInput.current?.click()}>
            Import
          </button>
          <button type="button" onClick={() => setShowModal(true)}>
            Add Tool
          </button>
        </div>
      </header>

      <input
        ref={importInput}
        type="file"
        accept=".json"
        onChange={handleImport}
        hidden
      />

      <div className="toolbar">
        <input
          placeholder="Search tools..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="">All</option>
          <option value="AI">AI</option>
          <option value="code">Code</option>
          <option value="SaaS">SaaS</option>
          <option value="website">Website</option>
        </select>
      </div>

      <ToolGrid tools={filteredTools} onAddClick={() => setShowModal(true)} />

      {showModal ? (
        <AddToolModal onClose={() => setShowModal(false)} onAdd={addTool} />
      ) : null}
    </div>
  );
}

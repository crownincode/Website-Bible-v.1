import ToolCard from "./ToolCard";

export default function ToolGrid({ tools, onAddClick }) {
  return (
    <main className="tool-grid">
      {tools.length === 0 && (
        <p className="empty-state">No tools yet. Click “Add Tool” to get started.</p>
      )}

      <div className="tool-grid-inner">
        {tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}

        <button className="tool-card add-tool-card" onClick={onAddClick}>
          + Add Tool
        </button>
      </div>
    </main>
  );
}
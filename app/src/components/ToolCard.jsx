export default function ToolCard({ tool }) {
  return (
    <button
      className="tool-card"
      onClick={() => {
        if (tool.url) {
          window.open(tool.url, "_blank", "noopener,noreferrer");
        }
      }}
    >
      <div className="tool-icon">
        {tool.icon || "🔗"}
      </div>
      <div className="tool-name">
        {tool.name || "Untitled Tool"}
      </div>
    </button>
  );
}
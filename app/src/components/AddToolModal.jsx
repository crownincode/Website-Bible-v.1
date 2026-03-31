import { useState } from "react";

export default function AddToolModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("🧠");

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      url: url.trim(),
      icon: icon.trim() || "🔗",
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal-header">
          <h2>Add Tool</h2>
          <button className="icon-button" type="button" onClick={onClose}>
            ✕
          </button>
        </header>

        <form className="modal-body" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Perplexity"
              required
            />
          </label>

          <label>
            URL
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://www.perplexity.ai"
            />
          </label>

          <label>
            Icon (emoji)
            <input
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
              placeholder="🧠"
            />
          </label>

          <footer className="modal-footer">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </footer>
        </form>
      </div>
    </div>
  );
}

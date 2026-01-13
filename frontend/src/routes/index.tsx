import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div
      id="main-editor"
      contentEditable
      suppressContentEditableWarning
      className="container"
      spellCheck={false}
    >
      <Link to="/settings">boooobs</Link>
    </div>
  );
}

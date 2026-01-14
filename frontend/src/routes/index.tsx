import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      {/* <Link to="/settings">settings</Link> */}
      <div
        id="main-editor"
        contentEditable
        suppressContentEditableWarning
        className="container"
        spellCheck={false}
      ></div>
    </div>
  );
}

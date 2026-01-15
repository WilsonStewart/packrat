import { useEffect, useState } from "react";
import { OpenTextFile } from "../../wailsjs/go/main/App";
import { EventsOff, EventsOn, LogPrint } from "../../wailsjs/runtime/runtime";

export const Editor = () => {
  const [content, setContent] = useState("");
  // const [fileName, setFileName] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  useEffect(() => {
    // Listen for the "file:open" event from the menu
    EventsOn("file:open", async () => {
      await openFile();
    });

    // Cleanup listener on unmount
    return () => {
      EventsOff("file:open");
    };
  }, []);

  // Rat by Yoga Ahmad Faisal from <a href="https://thenounproject.com/browse/icons/term/rat/" target="_blank" title="Rat Icons">Noun Project</a> (CC BY 3.0)
  // Rat by Delwar Hossain from <a href="https://thenounproject.com/browse/icons/term/rat/" target="_blank" title="Rat Icons">Noun Project</a> (CC BY 3.0)
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
  };

  const openFile = async () => {
    LogPrint("booooooo");
    // setLoading(true);
    // setError("");

    try {
      // Call your Wails Go backend function
      const result = await OpenTextFile();
      LogPrint("js log print: " + result);

      if (result) {
        setContent(result);
        LogPrint("File loaded successfully");
      }
    } catch (err) {
      // setError(`Failed to open file: ${err.message}`);
      console.error("Error opening file:", err);
    } finally {
    }
  };

  // const handleContentChange = (e: any) => {
  //   setContent(e.target.textContent);
  // };

  return (
    <div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="container"
        spellCheck={false}
        onPaste={handlePaste}
        style={{ whiteSpace: "pre-wrap" }}
      >
        {/* <button
          onClick={openFile}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
        >
          open file
        </button> */}
        {content}
      </div>
    </div>
  );
};

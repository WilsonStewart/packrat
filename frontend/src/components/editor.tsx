import { useCallback, useEffect, useRef, useState } from "react";
import { OpenTextFile, SaveFile } from "../../wailsjs/go/main/App";
import { EventsOff, EventsOn, LogPrint } from "../../wailsjs/runtime/runtime";

export const Editor = () => {
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const mainRef = useRef<HTMLDivElement>(null)
  // const [htmlString, setHtmlString] = useState("");
  // const [filePath, setFilePath] = useState("");

  const getEditorHtml = useCallback(async () => {
    if (mainRef.current) {
      return mainRef.current.innerHTML;
    } else {
      return "";
    }
  }, []); // Empty deps - mainRef is a ref, doesn't need to be listed

  const handleFileSave = useCallback(async () => {
    setFileName(await SaveFile(fileName, await getEditorHtml()));
  }, [getEditorHtml, fileName]);

  useEffect(() => {
    EventsOn("file:open", async () => {
      await openFile();
    });

    EventsOn("file:save", handleFileSave);

    return () => {
      EventsOff("file:open");
      EventsOff("file:save");
    };
  }, [handleFileSave]);

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
    <div
    // style={{
    //   display: "flex",
    //   flexDirection: "column"
    // }}
    >
      <div
        contentEditable
        suppressContentEditableWarning
        className="container"
        spellCheck={false}
        onPaste={handlePaste}
        style={{
          whiteSpace: "pre-wrap",
          outline: "red solid 1px"
        }}
        ref={mainRef}
      >
        {content}
      </div>
    </div >
  );
};

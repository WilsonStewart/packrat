// export const handleInput = (e: Event) => {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return;
    
//     const range = selection.getRangeAt(0);
//     const node = range.startContainer;
    
//     if (node.nodeType === Node.TEXT_NODE) {
//       const text = node.textContent.substring(0, range.startOffset);
//       const lines = text.split('\n');
//       const currentLine = lines[lines.length - 1];
      
//       // Check if user typed '@' at start of line
//       if (currentLine.trim() === '@') {
//         const rect = range.getBoundingClientRect();
//         setMenuPosition({ x: rect.left, y: rect.bottom });
//         setShowDecoratorMenu(true);
//       }
//     }
    
//     scheduleSave();
//   };
import ReactAce from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useEffect, useRef } from 'react';
import { initYjs, getYText } from '@utils/yjsSetup';

export default function CodeEditor({ roomId = 'demo-room', language = 'python', onCodeChange}) {
  const editorRef = useRef(null);
  console.log("Code Editor is in room: " + roomId);
  console.log("Code Editor is in language: " + language);
  const { ydoc, ytext } = initYjs(roomId);

  useEffect(() => {
    let isSyncing = false; // Flag to check if syncing is ongoing

    // Initialize Ace Editor from Yjs
    const editor = editorRef.current.editor;
    editor.setValue(ytext.toString());

    // Update Ace editor when ytext changes
    ytext.observe(() => {
      if (isSyncing) return; // Skip if we are currently syncing
      isSyncing = true; // Set flag to true

      // Store cursor position and selection
      const cursorPosition = editor.getCursorPosition();
      const selection = editor.selection.toJSON();
      const currentCode = ytext.toString();
      editor.setValue(currentCode);

      // Restore cursor position and selection
      editor.moveCursorToPosition(cursorPosition);
      editor.selection.fromJSON(selection);

      onCodeChange(currentCode);  // This updates the code on editor change, but much slower
      isSyncing = false; // Reset flag
    });

    // Observe Ace Editor changes and update Yjs
    editor.getSession().on('change', () => {
      if (isSyncing) return; // Skip if we are currently syncing
      isSyncing = true; // Set flag to true
      const inputValue = editor.getValue();
      
      // Only update ytext if necessary
      if (ytext.toString() !== inputValue) {
        ytext.delete(0, ytext.length);
        ytext.insert(0, inputValue);
      }

      isSyncing = false; // Reset flag

      //onCodeChange(inputValue); // This updates the code on user change only. Much faster
    });

    // return () => {
    //   ydoc.destroy();
    // };
  }, [roomId]);

  return (
    <ReactAce
      //mode="python"
      mode={language}
      theme="monokai"
      ref={editorRef}
      // your other ace editor options here
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
    />
  );
}

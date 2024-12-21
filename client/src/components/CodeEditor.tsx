import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import { io } from "socket.io-client";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { CODE_SNIPPETS } from "../constants/codeSnippets";
import { Languages } from "../types/language.types";
import useDebounce from "../hooks/useDebounce";

const socket = io("http://localhost:8080");

const CodeEditor = () => {
  const editorRef = useRef<any>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState<Languages>("javascript");
  const [roomMessage, setRoomMessage] = useState<string>("");

  // ** Debounced value that triggers socket update **
  const debouncedCode = useDebounce(value, 1000); // Wait 1000ms (1 second) after user stops typing

  const navigate = useNavigate();

  useEffect(() => {
    if (!roomId) return;

    // ** Join the room **
    socket.emit("join-room", roomId);

    socket.on("room-not-found", () => {
      navigate("/room-not-found");
    });

    socket.on(
      "room-initial-data",
      ({ language, code }: { language: Languages; code: string }) => {
        setLanguage(language);
        setValue(code);
      }
    );

    // ** Listen for room status messages **
    socket.on(
      "room-status",
      ({ room, message }: { room: string; message: string }) => {
        setRoomMessage(message);
      }
    );

    // ** Listen for code updates from other users **
    socket.on("code-update", (code: string) => {
      setValue(code);
    });

    // ** Listen for language updates from other users **
    socket.on("language-update", (newLanguage: Languages) => {
      setLanguage(newLanguage);
      setValue(CODE_SNIPPETS[newLanguage] || "");
    });

    // ** Clean up listeners when component unmounts **
    return () => {
      socket.off("room-status");
      socket.off("code-update");
      socket.off("language-update");
    };
  }, [roomId]);

  useEffect(() => {
    if (debouncedCode && roomId) {
      socket.emit("code-change", { room: roomId, code: debouncedCode });
    }
  }, [debouncedCode, roomId]);

  const handleCodeChange = (code: string | undefined) => {
    setValue(code || "");
    socket.emit("code-change", { room: roomId, code });
  };

  const onSelect = (newLanguage: Languages) => {
    setLanguage(newLanguage);
    setValue(CODE_SNIPPETS[newLanguage] || "");

    // ** Emit the new language to all users in the room **
    socket.emit("language-change", {
      room: roomId,
      language: newLanguage,
      code: CODE_SNIPPETS[newLanguage],
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <LanguageSelector language={language} onSelect={onSelect} />
          {/* {roomMessage && <p className="text-green-500">{roomMessage}</p>} */}

          <Editor
            options={{
              minimap: { enabled: false },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={(editor) => {
              editorRef.current = editor;
              editor.focus();
            }}
            value={value}
            onChange={handleCodeChange}
          />
        </div>
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditor;

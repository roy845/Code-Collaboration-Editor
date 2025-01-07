import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { CODE_SNIPPETS } from "../constants/codeSnippets";
import { Languages } from "../types/language.types";
import useDebounce from "../hooks/useDebounce";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { io } from "socket.io-client";
import { FaArrowRight } from "react-icons/fa";
import useCustomNavigate from "../hooks/useCustomNavigate";
import { BASE_URL_SOCKET_SERVER } from "../api/api";

const socket = io(BASE_URL_SOCKET_SERVER);

const CodeEditor = () => {
  const editorRef = useRef<any>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState<Languages>("javascript");
  const [roomMessage, setRoomMessage] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<"success" | "failure" | null>(
    null
  );

  const customNavigate = useCustomNavigate();

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

  const handleCopyRoomId = () => {
    if (!roomId) return;

    navigator.clipboard
      .writeText(`${BASE_URL_SOCKET_SERVER}/editor/${roomId}`)
      .then(() => {
        setCopyStatus("success");
      })
      .catch(() => {
        setCopyStatus("failure");
      })
      .finally(() => {
        setTimeout(() => setCopyStatus(null), 2000);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        {roomId && (
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-400">Room ID: {roomId}</p>
            <button
              onClick={handleCopyRoomId}
              className="bg-indigo-500 text-white px-2 py-1 text-xs rounded hover:bg-indigo-600"
            >
              Copy
            </button>

            {copyStatus === "success" && (
              <AiOutlineCheck className="text-green-500" />
            )}
            {copyStatus === "failure" && (
              <AiOutlineClose className="text-red-500" />
            )}
          </div>
        )}
        <FaArrowRight
          className="text-gray-400 mr-2 cursor-pointer"
          onClick={() => customNavigate("/home")}
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <LanguageSelector language={language} onSelect={onSelect} />
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

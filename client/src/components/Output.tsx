import { useState, MutableRefObject } from "react";
import { executeCode } from "../api/serverApi";
import { Languages } from "../types/language.types";

interface OutputProps {
  editorRef: MutableRefObject<any>;
  language: Languages;
}

interface RunResult {
  output: string;
  stderr: string;
}

const Output = ({ editorRef, language }: OutputProps) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = (await executeCode(language, sourceCode)) as {
        run: RunResult;
      };
      setOutput(result.output.split("\n"));
      setIsError(Boolean(result.stderr));
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2  flex flex-col justify-center items-center">
      <p className="text-lg">Output</p>

      {/* Centered button with fixed width and height */}
      <button
        className={`relative flex justify-center items-center w-32 h-12 mb-4 text-white bg-green-500 rounded ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="absolute w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          <span className="absolute">Run Code</span>
        )}
      </button>

      <div
        className={`w-full max-w-4xl p-4 border ${
          isError ? "border-red-500 text-red-400" : "border-gray-700"
        } rounded`}
        style={{ height: "75vh" }}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;

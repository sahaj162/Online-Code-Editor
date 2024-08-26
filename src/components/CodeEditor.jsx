import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { CODE_SNIPPETS } from "../constants";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(""); // State
  const [language, setLanguage] = useState("java"); // Default LangSelector State

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    console.log("Focus Working")
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]); // From Constants.js Code Snippet
    console.log("New Lang Selected")
  };

  return (
    <Box>
      <HStack spacing={4}>    {/* HStack == Horizontal Stack In React*/}
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};
console.log("Editor Working")
export default CodeEditor;

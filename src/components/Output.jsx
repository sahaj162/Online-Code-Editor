import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { executeCode } from "../api";

// OutPut State
const Output = ({ editorRef, language }) => {
  const toast = useToast();
  // OutPut Sate 
  const [output, setOutput] = useState(null);
  // Loading State 
  const [isLoading, setIsLoading] = useState(false);
  // Error State
  const [isError, setIsError] = useState(false);

  // RunCode Function
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue(); // Get content Of The Code Editor
    if (!sourceCode) return; // Base Condition
    // API Call
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      console.log("There !");
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading} // Loading Spinner Is Done By The Chakra UI
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2} // Padding
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
console.log("OutPut Side Alive")
export default Output;

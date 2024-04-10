import React, { useRef } from "react";
import { Box, Text, Button, VisuallyHidden, VStack } from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";

type Props = {
  file?: File;
  onSetFile: (file?: File) => void;
};

const UploadFileBox: React.FC<Props> = ({ onSetFile, file }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      onSetFile(selectedFile);
    }
  }

  function handleSelectFile() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileRemove() {
    onSetFile(undefined);
  }

  return (
    <Box
      borderColor="gray.300"
      borderWidth={1}
      borderRadius={8}
      p={4}
      _hover={{ cursor: file ? "default" : "pointer" }}
      textAlign="center"
      onClick={handleSelectFile}
    >
      {!file && (
        <VStack spacing={4}>
          <FiUpload />
          <Text fontSize="sm">Click to Upload your file</Text>
          <VisuallyHidden>
            <input
              accept="application/pdf"
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
            />
          </VisuallyHidden>
        </VStack>
      )}
      {file && (
        <>
          <Text mt={2}>{file.name}</Text>
          <Button
            size="sm"
            variant="link"
            color="red.500"
            onClick={handleFileRemove}
          >
            Remove
          </Button>
        </>
      )}
    </Box>
  );
};

export default UploadFileBox;

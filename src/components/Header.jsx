import React from 'react';
import { Box, Text, Flex, Link, Button } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box p={6} bg="gray.50" minHeight="100vh">
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={8}>
        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
          AI Codex
        </Text>
        <Flex gap={6}>
          <Link href="#" fontSize="lg" color="blue.600" _hover={{ textDecoration: 'underline' }}>
            Home
          </Link>
          <Link href="#web-editor" fontSize="lg" color="blue.600" _hover={{ textDecoration: 'underline' }}>
            Web Editor
          </Link>
          <Link href="#compiler" fontSize="lg" color="blue.600" _hover={{ textDecoration: 'underline' }}>
            Compiler
          </Link>
          <Link href="#chatbot" fontSize="lg" color="blue.600" _hover={{ textDecoration: 'underline' }}>
            Chatbot
          </Link>
        </Flex>
      </Flex>

      {/* Welcome Section */}
      <Box textAlign="center" mb={10}>
        <Text fontSize="4xl" fontWeight="bold" color="gray.800">
          Welcome to AI Codex
        </Text>
        <Text fontSize="lg" color="gray.600" mt={4}>
          Your all-in-one platform for coding, compiling, and chatting with AI assistance.
        </Text>
      </Box>

      {/* Features Section */}
      <Flex wrap="wrap" justify="center" gap={6}>
        <Box
          width="250px"
          height="150px"
          bg="white"
          borderRadius="md"
          shadow="md"
          p={4}
          textAlign="center"
          _hover={{ transform: 'scale(1.05)', transition: 'transform 0.3s' }}
        >
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            Fast Compilation
          </Text>
          <Text mt={2} color="gray.600">
            Experience quick and efficient code compilation with our advanced tools.
          </Text>
        </Box>
        <Box
          width="250px"
          height="150px"
          bg="white"
          borderRadius="md"
          shadow="md"
          p={4}
          textAlign="center"
          _hover={{ transform: 'scale(1.05)', transition: 'transform 0.3s' }}
        >
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            Real-time Collaboration
          </Text>
          <Text mt={2} color="gray.600">
            Collaborate with your team in real-time and enhance productivity.
          </Text>
        </Box>
        <Box
          width="250px"
          height="150px"
          bg="white"
          borderRadius="md"
          shadow="md"
          p={4}
          textAlign="center"
          _hover={{ transform: 'scale(1.05)', transition: 'transform 0.3s' }}
        >
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            Multi-language Support
          </Text>
          <Text mt={2} color="gray.600">
            Write and run code in multiple programming languages with ease.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, Flex } from "@chakra-ui/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnMount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Flex direction={"column"} minWidth={"780px"}>
          <App />
        </Flex>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

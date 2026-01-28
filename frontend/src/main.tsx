// import React from "react";
// import ReactDOM from "react-dom/client";
// import { RouterProvider } from "@tanstack/react-router";
// import { router } from "./router";
// import "./index.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ContextProvider } from "./state-management/context.provider";
// import { authStore } from "./auth/authStore";

// async function bootstrap() {
//   await authStore.getState().actions.init(); // calls /auth/refresh + sets accessToken

//   ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//       <RouterProvider router={router} />
//     </React.StrictMode>
//   );
// }

// bootstrap();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 60000,
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ContextProvider>
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//     </ContextProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "./state-management/context.provider";
import { authStore } from "./auth/authStore";
import { router } from "./router";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

async function bootstrap() {
  await authStore.getState().actions.init();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ContextProvider>
    </React.StrictMode>
  );
}

bootstrap();

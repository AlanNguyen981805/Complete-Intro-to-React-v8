import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { createContext, lazy, useState, Suspense } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as jsxRuntime from "react/jsx-runtime";
const AdoptedPetContext = createContext();
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
const Details = lazy(() => import("./assets/Details.c6b08b32.js"));
const SearchParams = lazy(() => import("./assets/SearchParams.80554dfc.js"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true
    }
  }
});
const App = () => {
  const adoptedPet = useState(null);
  return /* @__PURE__ */ jsx("div", {
    className: "m-0 p-0",
    style: {
      background: "url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)"
    },
    children: /* @__PURE__ */ jsx(QueryClientProvider, {
      client: queryClient,
      children: /* @__PURE__ */ jsx(AdoptedPetContext.Provider, {
        value: adoptedPet,
        children: /* @__PURE__ */ jsxs(Suspense, {
          fallback: /* @__PURE__ */ jsx("div", {
            className: "loading-pane",
            children: /* @__PURE__ */ jsx("h2", {
              className: "loader",
              children: "@@@@"
            })
          }),
          children: [/* @__PURE__ */ jsx("header", {
            className: "w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500",
            children: /* @__PURE__ */ jsx(Link, {
              className: "text-6xl text-white hover:text-gray-200",
              to: "/",
              children: "Adopt Me!"
            })
          }), /* @__PURE__ */ jsxs(Routes, {
            children: [/* @__PURE__ */ jsx(Route, {
              path: "/details/:id",
              element: /* @__PURE__ */ jsx(Details, {})
            }), /* @__PURE__ */ jsx(Route, {
              path: "/",
              element: /* @__PURE__ */ jsx(SearchParams, {})
            })]
          })]
        })
      })
    })
  });
};
function render(url, opts) {
  const stream = renderToPipeableStream(/* @__PURE__ */ jsx(StaticRouter, {
    location: url,
    children: /* @__PURE__ */ jsx(App, {})
  }), opts);
  return stream;
}
export {
  AdoptedPetContext as A,
  jsx as a,
  render as default,
  jsxs as j
};

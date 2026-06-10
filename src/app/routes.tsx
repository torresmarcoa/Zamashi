import { createBrowserRouter } from "react-router";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LocationsPage from "./pages/LocationsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "menu", Component: MenuPage },
      { path: "locations", Component: LocationsPage },
      { path: "*", Component: HomePage },
    ],
  },
]);

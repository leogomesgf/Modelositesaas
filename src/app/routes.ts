import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { Publications } from "./components/Publications";
import { Reports } from "./components/Reports";
import { Notifications } from "./components/Notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "publicacoes", Component: Publications },
      { path: "relatorios", Component: Reports },
      { path: "notificacoes", Component: Notifications },
    ],
  },
]);

import React from "react";
import { GlobalState } from "../App";

export const GlobalContext = React.createContext<GlobalState>(
  Object.create({})
);

export const useGlobalContext = () => React.useContext(GlobalContext);

"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

type contextManagerType = [state, Dispatch<action>];
type state = {
  clipBoard: string;
  words: string[];
};
type action = {
  type: "set-words" | "set-clipboard";
  payload: string;
};

interface Props {
  children: ReactNode;
}

const ocrTextContext = createContext<contextManagerType>([
  { clipBoard: "", words: [] },
  () => {},
]);

export default function OcrTextProvider({ children }: Props) {
  const reducer = (state: state, action: action) => {
    switch (action.type) {
      case "set-words":
        const words = action.payload
          .replaceAll("\n", " ")
          .replace(/[.,:\/?\-';"()]/g, "")
          .split(" ")
          .filter((word) => word.length > 2)
          .sort();

        return { ...state, words };
      case "set-clipboard":
        const clipBoard = action.payload;
        return { ...state, clipBoard };
      default:
        return state;
    }
  };

  const initState = {
    clipBoard: "",
    words: [],
  };

  const manager = useReducer(reducer, initState);

  return (
    <ocrTextContext.Provider value={manager}>
      {children}
    </ocrTextContext.Provider>
  );
}

export const useOcrText = () => useContext(ocrTextContext);

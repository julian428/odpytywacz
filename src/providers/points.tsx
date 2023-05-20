"use client";

import { ReactNode, createContext, useContext, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  initKeys: string[];
}

type PointsType = {
  [key: string]: number | null;
};

type actionType = "CORRECT" | "INCORRECT" | "HELPED" | "GET" | "RESET" | "TIME";

type managePointsType = (action: actionType, key?: string) => number;

const pointsContext = createContext<managePointsType>((action, key) => -500);

export default function PointsProvider({ children, initKeys }: Props) {
  const pointsRef = useRef<PointsType>({});
  const timeRef = useRef<number>(new Date().getTime());

  //seed the pointsRef
  useEffect(() => {
    const newKeys = initKeys.reduce((obj: { [key: string]: null }, item) => {
      obj[item] = null;
      return obj;
    }, {});
    pointsRef.current = newKeys;
  }, [initKeys]);

  const managePoints = (action: actionType, key?: string) => {
    switch (action) {
      case "TIME":
        return timeRef.current;
      case "RESET":
        const resetCopyObj = pointsRef.current;
        for (let key in resetCopyObj) {
          resetCopyObj[key] = null;
        }
        pointsRef.current = resetCopyObj;
        return -200;
      case "CORRECT":
        if (!key) return -400;
        if (pointsRef.current[key] !== null) return -401;
        pointsRef.current[key] = 1;
        return -200;
      case "INCORRECT":
        if (!key) return -400;
        if (pointsRef.current[key] !== null) return -401;
        pointsRef.current[key] = 0;
        return -200;
      case "HELPED":
        if (!key) return -400;
        if (pointsRef.current[key] !== null) return -401;
        pointsRef.current[key] = 0.5;
        return -200;
      case "GET":
        if (key) return pointsRef.current[key] || 0;
        let points = 0;
        for (let key in pointsRef.current) {
          points += pointsRef.current[key] || 0;
        }
        return points;
    }
  };

  return (
    <pointsContext.Provider value={managePoints}>
      {children}
    </pointsContext.Provider>
  );
}

export const usePoints = () => useContext(pointsContext);

import { useContext } from "react";
import { Context } from "./Events";

export const EVENT_COLORS = ["red", "green", "blue"] as const;

export const useEvents = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useEvents must be used within Provider');
  }
  
  return value;
};
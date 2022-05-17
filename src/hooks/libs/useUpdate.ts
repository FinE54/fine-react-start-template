import { useState, useCallback } from "react";

export const useUpdate = () => {
  const [, setUpdate] = useState({});
  return useCallback(() => setUpdate({}), []);
};

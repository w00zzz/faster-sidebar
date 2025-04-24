
import { useState, useCallback } from "react";

export const useTreeViewLogic = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const handleClick = useCallback((title: string) => {
    setOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  }, []);

  return { open, handleClick };
};

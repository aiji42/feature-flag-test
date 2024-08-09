import { useEffect, useState } from "react";

export const useFeatureFlag = (code: string) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.__activate = (flag: string) => {
      if (flag === code) {
        setActive(true);
      }
    };
  }, []);

  return { active };
};

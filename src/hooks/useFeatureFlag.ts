import { useEffect, useState } from "react";

export const useFeatureFlag = (code: string) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.featureFlags.addCallback(code, () => setActive(true));
    return () => window.featureFlags.removeCallback(code);
  }, []);

  return { active };
};

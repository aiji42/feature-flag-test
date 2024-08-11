"use client";
import { FC, ReactNode, useEffect, useState } from "react";

const useFeatureFlag = (code: string) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.featureFlags.addCallback(code, () => setActive(true));
    return () => window.featureFlags.removeCallback(code);
  }, []);

  return { active };
};

export const FeatureFlag: FC<{
  children: ReactNode | ((active: boolean) => ReactNode);
  code: string;
}> = ({ code, children }) => {
  const { active } = useFeatureFlag(code);

  if (typeof children === "function") return children(active);

  return active ? <>{children}</> : null;
};

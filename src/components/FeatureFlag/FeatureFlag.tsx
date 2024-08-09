"use client";
import { FC, ReactNode } from "react";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";

export const FeatureFlag: FC<{
  children: ReactNode | ((active: boolean) => ReactNode);
  code: string;
}> = ({ code, children }) => {
  const { active } = useFeatureFlag(code);

  if (typeof children === "function") return children(active);

  return active ? <>{children}</> : null;
};

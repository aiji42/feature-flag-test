"use client";
import { FC, ReactNode } from "react";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";

export const FeatureFlag: FC<{ children: ReactNode; code: string }> = ({
  code,
  children,
}) => {
  const { active } = useFeatureFlag(code);

  return active ? <>{children}</> : null;
};

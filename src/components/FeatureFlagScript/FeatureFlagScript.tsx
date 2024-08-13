import NextScript from "next/script";

declare global {
  interface Window {
    featureFlags: {
      push: (...flags: string[]) => void;
      addCallback: (key: string, callback: () => void) => void;
      removeCallback: (key: string) => void;
      flags_: string[];
      callbacks_: Record<string, () => void>;
    };
  }
}

export const FeatureFlagScript = () => {
  return (
    <NextScript>{`
      window.featureFlags = window.featureFlags || {
        push: (...flags) => {
          window.featureFlags.flags_.push(...flags);
          for (const flag of flags) {
            window.featureFlags.callbacks_[flag]?.();
          }
        },
        addCallback: (key, callback) => {
          window.featureFlags.callbacks_[key] = callback;
          if (window.featureFlags.flags_.includes(key)) {
            callback();
          }
        },
        removeCallback: (key) => {
          delete window.featureFlags.callbacks_[key];
        },
        flags_: [],
        callbacks_: {},
      };
  `}</NextScript>
  );
};

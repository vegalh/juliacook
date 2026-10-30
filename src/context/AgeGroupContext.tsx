import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ageBucketFor, ageGroups, type AgeBucket, type AgeGroup } from "../data/ageGroups";

const STORAGE_KEY = "cookie-bytes:age-group";
const DEFAULT_AGE_GROUP: AgeGroup = "6-10";

function readStoredAgeGroup(): AgeGroup {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && (ageGroups as string[]).includes(raw)) return raw as AgeGroup;
  } catch {
    // localStorage unavailable — fall back to the default age group.
  }
  return DEFAULT_AGE_GROUP;
}

interface AgeGroupContextValue {
  ageGroup: AgeGroup;
  ageBucket: AgeBucket;
  setAgeGroup: (group: AgeGroup) => void;
}

const AgeGroupContext = createContext<AgeGroupContextValue | null>(null);

export function AgeGroupProvider({ children }: { children: ReactNode }) {
  const [ageGroup, setAgeGroupState] = useState<AgeGroup>(() => readStoredAgeGroup());

  const setAgeGroup = useCallback((group: AgeGroup) => {
    setAgeGroupState(group);
    try {
      localStorage.setItem(STORAGE_KEY, group);
    } catch {
      // Ignore storage failures; the selection still applies for this session.
    }
  }, []);

  const value = useMemo(
    () => ({ ageGroup, ageBucket: ageBucketFor(ageGroup), setAgeGroup }),
    [ageGroup, setAgeGroup]
  );

  return <AgeGroupContext.Provider value={value}>{children}</AgeGroupContext.Provider>;
}

export function useAgeGroup() {
  const ctx = useContext(AgeGroupContext);
  if (!ctx) throw new Error("useAgeGroup must be used within an AgeGroupProvider");
  return ctx;
}

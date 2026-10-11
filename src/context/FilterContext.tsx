import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Filters, ResourceType, Skill, Setting } from "../types";

const emptyFilters: Filters = { types: [], setting: null, skills: [] };

interface FilterContextValue {
  filters: Filters;
  toggleType: (type: ResourceType) => void;
  toggleSkill: (skill: Skill) => void;
  setSetting: (setting: Setting) => void;
  reset: () => void;
  activeCount: number;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const toggleType = (type: ResourceType) =>
    setFilters((f) => ({
      ...f,
      types: f.types.includes(type) ? f.types.filter((t) => t !== type) : [...f.types, type],
    }));

  const toggleSkill = (skill: Skill) =>
    setFilters((f) => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter((s) => s !== skill)
        : [...f.skills, skill],
    }));

  const setSetting = (setting: Setting) =>
    setFilters((f) => ({ ...f, setting: f.setting === setting ? null : setting }));

  const reset = () => setFilters(emptyFilters);

  const activeCount = useMemo(
    () => filters.types.length + filters.skills.length + (filters.setting ? 1 : 0),
    [filters]
  );

  return (
    <FilterContext.Provider
      value={{ filters, toggleType, toggleSkill, setSetting, reset, activeCount }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within a FilterProvider");
  return ctx;
}

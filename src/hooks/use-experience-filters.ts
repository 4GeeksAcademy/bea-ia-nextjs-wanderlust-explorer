import { useMemo } from "react";
import type { Experience } from "@/types/experience";

type UseExperienceFiltersParams = {
  experiences: Experience[];
  categories: readonly string[];
  search: string;
  category: string;
  destination: string;
};

function normalizeRegexInput(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();
}

export function useExperienceFilters({
  experiences,
  categories,
  search,
  category,
  destination,
}: UseExperienceFiltersParams) {
  const selectedCategory =
    categories.find(
      (option) => option.toLowerCase() === category.trim().toLowerCase(),
    ) ?? "";

  const filtered = useMemo(() => {
    const normalizedTerm = normalizeRegexInput(search);
    const normalizedDestination = normalizeRegexInput(destination);
    const titleRegex = normalizedTerm ? new RegExp(normalizedTerm, "i") : null;
    const destinationRegex = normalizedDestination
      ? new RegExp(normalizedDestination, "i")
      : null;
    const categoryNeedle = selectedCategory || category;

    return experiences.filter((experience) => {
      const matchSearch = titleRegex ? titleRegex.test(experience.title) : true;
      const matchCategory = categoryNeedle
        ? experience.category.toLowerCase() === categoryNeedle.toLowerCase()
        : true;
      const matchDestination = destinationRegex
        ? destinationRegex.test(experience.destination)
        : true;

      return matchSearch && matchCategory && matchDestination;
    });
  }, [category, destination, experiences, search, selectedCategory]);

  return {
    filtered,
    selectedCategory,
  };
}

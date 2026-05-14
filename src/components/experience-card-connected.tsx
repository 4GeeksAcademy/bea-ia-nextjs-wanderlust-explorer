"use client";

import { ExperienceCard } from "@/components/experience-card";
import { useFavorites } from "@/components/favorites-provider";
import type { Experience } from "@/types/experience";

type ExperienceCardConnectedProps = {
  experience: Experience;
};

export function ExperienceCardConnected({
  experience,
}: ExperienceCardConnectedProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <ExperienceCard
      experience={experience}
      isFavorite={isFavorite(experience.id)}
      onToggleFavorite={toggleFavorite}
    />
  );
}

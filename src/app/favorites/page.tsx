"use client";

import { ExperienceCard } from "@/components/experience-card";
import { useFavorites } from "@/components/favorites-provider";
import { experiences } from "@/data/experiences";

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const favorites = experiences.filter((experience) =>
    favoriteIds.includes(experience.id),
  );

  return (
    <section className="container sectionSpacing">
      <div className="sectionHeader">
        <h1>Favoritos</h1>
        <p>Experiencias marcadas por el usuario en esta sesion.</p>
      </div>

      {favorites.length === 0 ? (
        <p className="emptyState">
          No tienes favoritos todavia. Marca experiencias con el corazon para verlas aqui.
        </p>
      ) : (
        <div className="cardsGrid">
          {favorites.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isFavorite={isFavorite(experience.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

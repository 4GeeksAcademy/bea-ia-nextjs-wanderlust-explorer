"use client";

import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/types/experience";
import { useFavorites } from "@/components/favorites-provider";

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(experience.id);

  return (
    <article className="experienceCard">
      <div className="imageWrap">
        <Image
          src={experience.imageUrl}
          alt={experience.title}
          width={900}
          height={600}
          className="cardImage"
        />
        <button
          type="button"
          className={`favoriteButton${favorite ? " favorite" : ""}`}
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          onClick={() => toggleFavorite(experience.id)}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="cardContent">
        <div className="chipRow">
          <span className="chip">{experience.category}</span>
          <span className="chip muted">{experience.destination}</span>
        </div>
        <h3>{experience.title}</h3>
        <p>{experience.description}</p>
        <div className="cardMeta">
          <strong>${experience.price}</strong>
          <span>★ {experience.rating}</span>
        </div>
        <Link href={`/experiences/${experience.id}`} className="detailsLink">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

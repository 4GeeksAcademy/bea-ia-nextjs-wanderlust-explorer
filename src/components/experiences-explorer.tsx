"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ExperienceCard } from "@/components/experience-card";
import { FilterBar } from "@/components/filter-bar";
import { SearchBar } from "@/components/search-bar";
import { useFavorites } from "@/components/favorites-provider";
import { useExperienceFilters } from "@/hooks/use-experience-filters";
import type { Experience } from "@/types/experience";

type ExplorerProps = {
  experiences: Experience[];
  categories: readonly string[];
  destinations: string[];
};

export function ExperiencesExplorer({
  experiences,
  categories,
  destinations,
}: ExplorerProps) {
  const ITEMS_PER_PAGE = 12;
  const { isFavorite, toggleFavorite } = useFavorites();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const destination = searchParams.get("destination") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isInteger(page) && page > 0 ? page : 1;
  const { filtered, selectedCategory } = useExperienceFilters({
    experiences,
    categories,
    search,
    category,
    destination,
  });

  const setParam = (key: string, value: string, resetPage = false) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    if (resetPage) {
      next.delete("page");
    }

    router.replace(next.toString() ? `${pathname}?${next.toString()}` : pathname, {
      scroll: false,
    });
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const clampedPage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage === clampedPage) {
      return;
    }

    const next = new URLSearchParams(searchParams.toString());
    if (clampedPage <= 1) {
      next.delete("page");
    } else {
      next.set("page", String(clampedPage));
    }

    router.replace(next.toString() ? `${pathname}?${next.toString()}` : pathname, {
      scroll: false,
    });
  }, [clampedPage, currentPage, pathname, router, searchParams]);

  const paginated = useMemo(() => {
    const startIndex = (clampedPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [clampedPage, filtered]);

  const onPageChange = (nextPage: number) => {
    setParam("page", nextPage <= 1 ? "" : String(nextPage));
  };

  return (
    <section className="container sectionSpacing">
      <div className="sectionHeader">
        <h1>Explorador de experiencias</h1>
        <p>Busca por titulo y filtra por categoria o destino sin recargar la pagina.</p>
      </div>

      <div className="filtersPanel">
        <SearchBar
          value={search}
          onChange={(value) => setParam("search", value, true)}
        />
        <FilterBar
          categories={categories}
          destinations={destinations}
          selectedCategory={selectedCategory}
          destination={destination}
          onCategoryChange={(value) => setParam("category", value, true)}
          onDestinationChange={(value) => setParam("destination", value, true)}
        />
      </div>

      <p className="resultCount">{filtered.length} experiencias encontradas</p>

      {filtered.length === 0 ? (
        <p className="emptyState">No se encontraron resultados</p>
      ) : (
        <div className="cardsGrid">
          {paginated.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isFavorite={isFavorite(experience.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <nav className="pagination" aria-label="Paginacion de experiencias">
          <button
            type="button"
            className="pageButton"
            disabled={clampedPage <= 1}
            onClick={() => onPageChange(clampedPage - 1)}
          >
            Anterior
          </button>

          <span className="pageStatus">
            Pagina {clampedPage} de {totalPages}
          </span>

          <button
            type="button"
            className="pageButton"
            disabled={clampedPage >= totalPages}
            onClick={() => onPageChange(clampedPage + 1)}
          >
            Siguiente
          </button>
        </nav>
      ) : null}
    </section>
  );
}

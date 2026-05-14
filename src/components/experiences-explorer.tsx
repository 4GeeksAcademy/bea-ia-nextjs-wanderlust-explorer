"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ExperienceCard } from "@/components/experience-card";
import type { Experience } from "@/types/experience";

type ExplorerProps = {
  experiences: Experience[];
  categories: readonly string[];
  destinations: string[];
};

function normalizeRegexInput(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();
}

export function ExperiencesExplorer({
  experiences,
  categories,
  destinations,
}: ExplorerProps) {
  const ITEMS_PER_PAGE = 12;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const destination = searchParams.get("destination") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isInteger(page) && page > 0 ? page : 1;
  const selectedCategory =
    categories.find(
      (option) => option.toLowerCase() === category.trim().toLowerCase(),
    ) ?? "";

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
        <input
          type="text"
          placeholder="Buscar por titulo..."
          value={search}
          onChange={(event) => setParam("search", event.target.value, true)}
          className="searchInput"
        />

        <select
          value={selectedCategory}
          onChange={(event) => setParam("category", event.target.value, true)}
          className="selectInput"
        >
          <option value="">Todas las categorias</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={destination}
          onChange={(event) => setParam("destination", event.target.value, true)}
          className="searchInput"
          placeholder="Destino (ej: Croatia, Kyoto, Lisbon...)"
          list="destination-options"
        />
        <datalist id="destination-options">
          {destinations.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </div>

      <p className="resultCount">{filtered.length} experiencias encontradas</p>

      <div className="cardsGrid">
        {paginated.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

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

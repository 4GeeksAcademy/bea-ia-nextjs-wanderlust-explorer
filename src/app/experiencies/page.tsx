import { Suspense } from "react";
import { experiences, categoryOptions, destinationOptions } from "@/data/experiences";
import { ExperiencesExplorer } from "@/components/experiences-explorer";

export default function ExperienciesPage() {
  return (
    <Suspense fallback={<section className="container sectionSpacing">Cargando explorador...</section>}>
      <ExperiencesExplorer
        experiences={experiences}
        categories={categoryOptions}
        destinations={destinationOptions}
      />
    </Suspense>
  );
}

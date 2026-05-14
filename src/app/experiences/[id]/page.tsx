import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceCardConnected } from "@/components/experience-card-connected";
import { experiences } from "@/data/experiences";

type ExperienceDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function ExperienceDetailPage({ params }: ExperienceDetailProps) {
  const { id } = await params;
  const experienceId = Number(id);

  if (!Number.isInteger(experienceId)) {
    notFound();
  }

  const experience = experiences.find((item) => item.id === experienceId);

  if (!experience) {
    notFound();
  }

  return (
    <section className="container sectionSpacing">
      <Link href="/experiences" className="backLink">
        ← Volver al explorador
      </Link>

      <div className="detailHeader">
        <h1>{experience.title}</h1>
        <p>{experience.destination}</p>
      </div>

      <div className="detailGrid">
        <div className="detailImageWrap">
          <Image
            src={experience.imageUrl}
            alt={experience.title}
            width={1200}
            height={800}
            className="detailImage"
          />
        </div>

        <aside className="detailPanel">
          <p>
            <strong>Categoria:</strong> {experience.category}
          </p>
          <p>
            <strong>Precio:</strong> ${experience.price}
          </p>
          <p>
            <strong>Rating:</strong> ★ {experience.rating}
          </p>
          <p>{experience.description}</p>
        </aside>
      </div>

      <h2 className="relatedTitle">Vista de tarjeta</h2>
      <div className="singleCardWrap">
        <ExperienceCardConnected experience={experience} />
      </div>
    </section>
  );
}

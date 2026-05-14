import Link from "next/link";

export default function Home() {
  return (
    <section className="heroSection">
      <div className="container heroGrid">
        <div className="heroCopy">
          <p className="eyebrow">Wanderlust Explorer</p>
          <h1>Descubre experiencias memorables sin friccion.</h1>
          <p>
            Explora 100 propuestas de viaje con busqueda inteligente, filtros por
            categoria y destino, y enlaces compartibles con estado prefiltrado.
          </p>
          <Link href="/experiencies" className="heroCta">
            Ir al explorador
          </Link>
        </div>
        <div className="heroPanel">
          <h2>Busca. Filtra. Comparte.</h2>
          <p>
            Ejemplo de URL compartible:
            <br />
            /experiencies?search=vela&category=Adventure&destination=Split%2C%20Croatia
          </p>
        </div>
      </div>
    </section>
  );
}

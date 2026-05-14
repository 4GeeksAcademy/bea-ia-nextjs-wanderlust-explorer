"use client";

import { useFavorites } from "@/components/favorites-provider";

export default function ProfilePage() {
  const { favoritesCount } = useFavorites();

  return (
    <section className="container sectionSpacing">
      <div className="sectionHeader">
        <h1>Perfil</h1>
        <p>Usuario simulado para esta demo de explorador.</p>
      </div>

      <div className="profileCard">
        <h2>Ana Traveler</h2>
        <p>Email: ana.traveler@example.com</p>
        <p>Ciudad base: Barcelona, Spain</p>
        <p>Estilo: foodie + escapadas de naturaleza</p>
      </div>

      <div className="profileStats">
        <h3>Resumen</h3>
        <p>
          Favoritos guardados: <strong>{favoritesCount}</strong>
        </p>
      </div>
    </section>
  );
}

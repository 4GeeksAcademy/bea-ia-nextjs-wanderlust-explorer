# Wanderlust Explorer

Aplicacion multipagina en Next.js para explorar experiencias de viaje con una UI de descubrimiento basada en tarjetas, busqueda y filtros sincronizados con la URL.

## Design References

Antes de implementar componentes, estas son 3 interfaces reales usadas como referencia para la direccion visual y de interaccion:

1. Airbnb Experiences
	- URL: https://www.airbnb.com/experiences
	- Referencia aplicada: composicion limpia con tarjetas destacadas, jerarquia tipografica clara y experiencia de descubrimiento centrada en imagen + titulo.

2. GetYourGuide
	- URL: https://www.getyourguide.com/
	- Referencia aplicada: patron de busqueda prominente y filtros practicos para reducir resultados rapidamente sin interrumpir el flujo de exploracion.

3. Klook
	- URL: https://www.klook.com/
	- Referencia aplicada: enfoque mobile-first para listados, chips/selectores de filtro compactos y lectura rapida de metadatos (rating, precio, destino).

## Features

- Home en `/` con hero y CTA a `/experiences`.
- Explorador en `/experiences` con:
  - barra de busqueda por titulo (regex case-insensitive)
  - filtros por categoria y destino
  - sincronizacion total de estado en query params
- Detalle en `/experiences/[id]` consultando dataset local.
- Favoritos en `/favorites` usando estado global en cliente (sin persistencia).
- Perfil en `/profile` con datos simulados y resumen de favoritos.

## Run

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

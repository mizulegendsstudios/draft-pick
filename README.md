# Draft Championship

Aplicación web interactiva para simular drafts de campeones al estilo de juegos de estrategia (LoL, Dota 2). Incluye fases de bans y picks, temporizadores por equipo, búsqueda, filtros, intercambio de picks y un fondo animado con matiz dinámico por turno.

## ✨ Características principales

- **Equipos Azul y Rojo** con identidad visual y slots ordenados (Top → Jungla → Mid → ADC → Support).
- **Fases de draft realista**: 20 turnos predefinidos (6 bans iniciales, picks, bans finales, últimos picks).
- **Fondo animado de malla de degradados** que cambia sutilmente de color según el turno (azul/rojo) y se mantiene en movimiento permanente.
- **Efecto Glass en paneles**: todos los contenedores usan `backdrop-filter` con blur para un look moderno y dejar ver el fondo animado.
- **Temporizadores independientes** para cada equipo, con indicador visual activo.
- **Búsqueda y filtrado** por nombre y rol (Tank, Carry, Support, Mage, Assassin).
- **Historial de drafts** guardado automáticamente en `localStorage` (últimos 20). Se puede alternar entre ver picks y bans.
- **Modo intercambio** post‑draft para reordenar campeones dentro de un equipo.
- **Botones flotantes** con tooltips para reiniciar, guardar/ver historial.

## 📁 Estructura del proyecto

```
draft-championship/
├── index.html      # Estructura HTML principal (solo markup)
├── styles.css      # Estilos completos: tema fantasía, glass, animaciones
├── main.js         # Lógica de la app: datos, draft, timer, historial, fondo animado
├── nexo.js         # Puente: carga main.js y arranca la aplicación
├── LICENSE
└── README.md
```

- **`index.html`** – Solo contiene el markup de la interfaz. No incluye estilos ni scripts embebidos.
- **`styles.css`** – Todos los estilos: variables CSS, tema de fantasía, efecto vidrio (backdrop-filter), animaciones.
- **`main.js`** – Clase `GradientMeshBackground` (fondo animado con matiz), datos de campeones, lógica de draft, temporizadores, historial, swaps.
- **`nexo.js`** – Carga dinámicamente `main.js` e inicializa la aplicación cuando el DOM está listo. Ideal para agregar futuros scripts sin tocar el HTML.

## 🚀 Cómo usar

1. Clona o descarga el repositorio.
2. Abre `index.html` en un navegador moderno (Chrome, Edge, Firefox).
3. La aplicación empezará en la **fase de bans** (turno azul).
4. **Busca** campeones por nombre o **filtra** por rol.
5. Haz clic en un campeón para banearlo o seleccionarlo según la fase actual.
6. Los temporizadores se inician automáticamente; el fondo cambiará de tonalidad con cada turno.
7. Al finalizar los 20 turnos, entra en **modo intercambio** (swap): haz clic en dos slots del mismo equipo para intercambiarlos.
8. Usa los botones flotantes 💾 para guardar el draft en el historial, 🔄 para reiniciar, o 📜 para ver drafts anteriores.

## 🛠️ Tecnologías

- **HTML5**
- **CSS3** (variables, backdrop-filter, grid, flexbox, animaciones keyframes)
- **JavaScript (ES6+)** – sin dependencias externas
- **Canvas API** – para el fondo animado de malla de degradados
- **localStorage** – para persistencia del historial

## 📜 Licencia

Este proyecto está bajo la Licencia **GNU Affero General Public License v3.0**.  
Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-idea`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añade nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-idea`).
5. Abre un Pull Request.

## 📧 Soporte

¿Encontraste un bug o tienes una sugerencia? Abre un issue en el repositorio.

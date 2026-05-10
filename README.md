# Draft Championship

Una aplicación web interactiva para simular drafts de campeones en juegos de estrategia como Dota 2. Permite gestionar equipos azul y rojo con fases de bans y picks, temporizadores y un sistema de búsqueda y filtrado de campeones.

## Características

- **Equipos Azul y Rojo**: Gestiona dos equipos con logos y nombres personalizables
- **Fases de Draft**: Alterna entre fases de bans y picks con indicadores visuales
- **Temporizadores**: Contadores de tiempo independientes para cada equipo
- **Búsqueda y Filtrado**: Busca campeones por nombre y filtra por roles (Tank, Carry, Support, Mage, Assassin)
- **Interfaz Fantasía**: Diseño con tema de fantasía medieval con efectos visuales
- **Historial**: Guarda y visualiza el historial de drafts anteriores
- **Modo Intercambio**: Permite intercambiar picks entre equipos
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## Cómo Usar

1. Abre el archivo `index.html` en tu navegador web
2. La aplicación comenzará automáticamente en la fase de bans para el equipo azul
3. Usa la barra de búsqueda para encontrar campeones específicos
4. Filtra por roles usando los botones de filtro
5. Haz clic en un campeón para banearlo o pickearlo según la fase actual
6. Los temporizadores se activarán automáticamente durante los turnos
7. Usa los botones flotantes para reiniciar, ver historial o guardar drafts

## Tecnologías

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y animaciones con tema de fantasía
- **JavaScript**: Lógica de la aplicación y gestión de estado

## Estructura del Proyecto

```
draft-pick/
├── index.html          # Archivo principal con HTML, CSS y JS
├── LICENSE             # Licencia AGPL-3.0
└── README.md           # Este archivo
```

## Licencia

Este proyecto está bajo la Licencia GNU Affero General Public License v3.0. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Contribuir

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Soporte

Para soporte o preguntas, por favor abre un issue en el repositorio.
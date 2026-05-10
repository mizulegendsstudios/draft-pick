// nexo.js - Puente conector: carga main.js dinámicamente y arranca la app

(function() {
    function startApp() {
        // Inicializar el fondo animado de malla de gradientes
        window.meshBackground = new GradientMeshBackground();
        // Inicializar la aplicación de draft
        init();
    }

    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        script.onerror = function() {
            console.error('Error al cargar ' + src);
        };
        document.head.appendChild(script);
    }

    // Cargar main.js y, al terminar, arrancar la aplicación
    loadScript('main.js', function() {
        // Esperar a que el DOM esté completamente listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startApp);
        } else {
            startApp();
        }
    });
})();
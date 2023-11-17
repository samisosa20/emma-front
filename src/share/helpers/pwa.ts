let deferredPrompt: any;
export function installPWA() {
  // Verificar si el navegador admite service workers
  if ("serviceWorker" in navigator) {
    // Registrar el service worker
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("Service Worker registrado con éxito:", registration);
      })
      .catch(function (error) {
        console.error("Error al registrar el Service Worker:", error);
      });
  }
  window.addEventListener("beforeinstallprompt", function (event) {
    // Almacenar la referencia al evento de instalación diferida
    deferredPrompt = event;
  });
}

export function handleAddToHomeScreen() {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("La aplicación ya está instalada en la pantalla de inicio.");
  } else {
    if (deferredPrompt) {
      // Mostrar un mensaje o un botón para instalar la PWA
      var installButton = document.createElement("button");
      installButton.textContent = "Instalar la aplicación";
      installButton.addEventListener("click", function () {
        // Solicitar la instalación de la PWA
        deferredPrompt.prompt();
        // Esperar a que el usuario responda a la solicitud
        deferredPrompt.userChoice.then(function (choiceResult: any) {
          if (choiceResult.outcome === "accepted") {
            console.log("El usuario ha aceptado instalar la aplicación");
          } else {
            console.log("El usuario ha rechazado instalar la aplicación");
          }
          // Limpiar la referencia al evento de instalación diferida
          deferredPrompt = null;
        });
      });
      // Mostrar el botón de instalación en la interfaz de usuario
      document.body.appendChild(installButton);
    }
  }
}

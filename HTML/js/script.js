let lastLocations = null;
let lastIsMobile = null;
let markerElements = [];
let fundidorElement = null;

function cargarMarcadores() {
  const isMobile = window.innerWidth <= 460;
  const container = document.getElementById("hamburguesas-container");
  const mapaContainer = document.getElementById("mapa-container");

  // Si el modo (mobile/escritorio) cambió, o nunca se cargó, recrea todo
  if (lastIsMobile !== isMobile || !lastLocations) {
    container.innerHTML = "";
    markerElements = [];
    fundidorElement = null;
    if (isMobile) {
      lastLocations = [
        {
          name: "Sucursal San Martín",
          top: "45%",
          left: "8%",
          info: "Centro comercial con tiendas y restaurantes.",
          address: "Carretera Internacional Km 130, Colonia Centro",
          link_maps: "https://maps.app.goo.gl/Cfx8zjneRhvBEFMQ9",
          image: "./images/Fondo-div-info.png",
        },
        {
          name: "Sucursal Centro",
          top: "26%",
          left: "19%",
          info: "Zona residencial con amplias áreas verdes.",
          address: "Calle Álamos #450, Colonia Reforma",
          link_maps: "https://maps.app.goo.gl/RrPyL556LtL4jtvSA",
          image: "./images/Fondo-div-info.png",
        },
        {
          name: "Sucursal Plaza del Valle",
          top: "61%",
          left: "19%",
          info: "Zona residencial con amplias áreas verdes.",
          address: "Fiallo #450, Colonia Centro",
          link_maps: "https://maps.app.goo.gl/413MmaohaySkV1X56",
          image: "./images/Fondo-div-info.png",
        },
      ];
      addMarkers(lastLocations);
    } else {
      fetch("./images/locations/json/locations.json")
        .then((response) => {
          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          lastLocations = data;
          addMarkers(lastLocations);
        })
        .catch((error) =>
          console.error("Error cargando las ubicaciones:", error)
        );
    }
    lastIsMobile = isMobile;
    return;
  }

  // Si el modo no cambió, solo actualiza posiciones
  if (!lastLocations) return;
  const mapWidth = mapaContainer.offsetWidth;
  const mapHeight = mapaContainer.offsetHeight;
  markerElements.forEach((marker, i) => {
    const location = lastLocations[i];
    const top = (parseFloat(location.top) / 100) * mapHeight;
    const left = (parseFloat(location.left) / 100) * mapWidth;
    marker.style.top = `${top}px`;
    marker.style.left = `${left}px`;
  });
  if (fundidorElement) {
    fundidorElement.style.top = `${0.11 * mapHeight}px`;
    fundidorElement.style.right = `${0.01 * mapWidth}px`;
    fundidorElement.style.height = `${0.8 * mapHeight}px`;
  }
}

// Función para agregar los marcadores
function addMarkers(locations) {
  const isMobile = window.innerWidth <= 460;
  const container = document.getElementById("hamburguesas-container");
  const mapaContainer = document.getElementById("mapa-container");
  const mapWidth = mapaContainer.offsetWidth;
  const mapHeight = mapaContainer.offsetHeight;
  let fundidorAdded = false;

  locations.forEach((location, idx) => {
    // Crear un marcador (imagen)
    const marker = document.createElement("img");
    marker.classList.add("hamburguesa");
    marker.src = "./images/locations/images/Hamburguesa.png";
    marker.alt = "Ubicación";

    // Tamaño correcto para hamburguesa en móvil
    if (window.innerWidth <= 460) {
      marker.style.width = "40px";
      marker.style.height = "40px";
    } else {
      marker.style.width = "8%";
      marker.style.height = "auto";
    }

    // Convertir los valores top/left a píxeles basados en el tamaño actual del mapa
    const top = (parseFloat(location.top) / 100) * mapHeight;
    const left = (parseFloat(location.left) / 100) * mapWidth;

    marker.style.filter =
      "grayscale(1) sepia(1) saturate(0.5) contrast(0.6) brightness(0.8)";
    marker.style.position = "absolute";
    marker.style.top = `${top}px`;
    marker.style.left = `${left}px`;
    marker.style.pointerEvents = "auto";
    markerElements.push(marker);
    marker.dataset.info = "location.info";
    marker.style.transition = "transform 0.2s ease, filter 0.2s ease";

    // Crear el botón de cerrar
    const closeButton = document.createElement("button");
    closeButton.textContent = "Cerrar";
    closeButton.style.alignSelf = "center";
    closeButton.style.marginTop = "auto";
    closeButton.style.marginBottom = "10px";
    closeButton.style.padding = "8px 12px";
    closeButton.style.backgroundColor = "#cc0000";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "4px";
    closeButton.style.fontWeight = "bold";
    closeButton.style.cursor = "pointer";

    // Crear el div de detalles
    const detailsDiv = document.createElement("div");
    if (window.innerWidth <= 460) {
      detailsDiv.style.position = "fixed";
      detailsDiv.style.top = "50%";
      detailsDiv.style.left = "50%";
      detailsDiv.style.transform = "translate(-50%, -50%)";
      detailsDiv.style.width = "80vw";
      detailsDiv.style.height = "auto";
      detailsDiv.style.backgroundColor = "white";
      detailsDiv.style.zIndex = "999";
      detailsDiv.style.display = "flex";
      detailsDiv.style.flexDirection = "column";
      detailsDiv.style.justifyContent = "flex-start";
      detailsDiv.style.borderRadius = "8px";
      // hamburguesa pequeña en móvil
      marker.style.width = "12vw";
      marker.style.height = "auto";
    } else {
      detailsDiv.classList.add("project-details");
      detailsDiv.style.position = "absolute";
      detailsDiv.style.opacity = "0";
      detailsDiv.style.transition = "opacity 0.2s ease";
    }
    detailsDiv.style.display = "none";

    // Posicionamiento dinámico de la tarjeta cerca del marcador
    function positionDetails() {
      // Recalcular top/left en base al tamaño actual del mapa y marcador
      const mapWidth = mapaContainer.offsetWidth;
      const mapHeight = mapaContainer.offsetHeight;
      const scrollX = document.getElementById('scroll-wrapper').scrollLeft || 0;
      // Recalcular la posición del marcador
      const top = (parseFloat(location.top) / 100) * mapHeight;
      const left = (parseFloat(location.left) / 100) * mapWidth;
      let detailsLeft = left + 130 - scrollX;
      let detailsTop = top - 50;
      const detailsWidth = 350;
      if (detailsLeft + detailsWidth > mapWidth) {
        detailsLeft = mapWidth - detailsWidth - 10;
      }
      if (detailsLeft < 0) detailsLeft = 10;
      if (detailsTop < 0) detailsTop = 10;
      if (detailsTop + 220 > mapHeight) detailsTop = mapHeight - 220;
      detailsDiv.style.left = `${detailsLeft}px`;
      detailsDiv.style.top = `${detailsTop}px`;
    }

    // Reposicionar al mostrar y al hacer scroll/resize
    window.addEventListener('resize', positionDetails);
    document.getElementById('scroll-wrapper').addEventListener('scroll', positionDetails);

    // Evento para cerrar el modal en móvil
    closeButton.addEventListener("click", () => {
      detailsDiv.style.display = "none";
      marker.style.filter =
        "grayscale(1) sepia(1) saturate(0.5) contrast(0.6) brightness(0.8)";
      marker.style.transform = "scale(1)";
    });

    // Hacer que toda la tarjeta sea clickeable y abra el link de maps SOLO si está visible
    detailsDiv.style.cursor = "pointer";
    detailsDiv.addEventListener("click", function (e) {
      if (e.target.tagName.toLowerCase() === "button") return;
      if (detailsDiv.style.display === "flex" || detailsDiv.style.opacity === "1") {
        window.open(location.link_maps, "_blank");
      }
    });

    // Crear el contenedor de texto
    const textWrapper = document.createElement("div");
    const coverContainer = document.createElement("div");
    coverContainer.style.display = "flex";
    coverContainer.style.justifyContent = "center";
    textWrapper.style.textAlign = "left";

    if (location.image) {
      const customImage = document.createElement("img");
      if (location.image.startsWith("./")) {
        customImage.src = location.image.replace(
          "./images/",
          "./images/locations/images/"
        );
      } else {
        customImage.src = location.image;
      }
      customImage.alt = location.name;
      customImage.style.width = "90%";
      customImage.style.borderRadius = "8px";
      customImage.style.display = "block";
      if (isMobile) {
        customImage.style.marginTop = "5%";
      } else {
        customImage.style.marginTop = "10%";
      }
      coverContainer.appendChild(customImage);
    }

    const title = document.createElement("h3");
    title.textContent = location.name;
    title.style.padding = "0 15px";

    const info = document.createElement("p");
    info.textContent = location.info;
    info.style.padding = "0 15px";

    const address = document.createElement("p");
    address.innerHTML = `<strong>Ubicación:</strong> <a href = "${location.link_maps}" target="_blank">${location.address}</a>`;
    address.style.textDecoration = "none";
    address.style.padding = "0 15px";
    address.style.paddingBottom = "15px";

    textWrapper.appendChild(coverContainer);
    textWrapper.appendChild(title);
    textWrapper.appendChild(info);
    textWrapper.appendChild(address);

    textWrapper.style.width = "auto";
    textWrapper.style.top = "0px";
    textWrapper.style.margin = "5px";

    // Mostrar detalles cuando el mouse entra
    if (isMobile) {
      marker.addEventListener("click", () => {
        const isVisible = detailsDiv.style.display === "flex";
        if (isVisible) {
          marker.style.filter =
            "grayscale(1) sepia(1) saturate(0.5) contrast(0.6) brightness(0.8)";
          marker.style.transform = "scale(1)";
          detailsDiv.style.opacity = "0";
          setTimeout(() => {
            detailsDiv.style.display = "none";
          }, 200);
        } else {
          marker.style.filter = "none";
          marker.style.transform = "scale(1.2)";
          detailsDiv.style.display = "flex";
          positionDetails();
          setTimeout(() => {
            detailsDiv.style.opacity = "1";
          }, 10);
        }
      });
    } else {
      marker.addEventListener("mouseenter", function () {
        marker.style.filter = "none";
        marker.style.transform = "scale(1.2)";
        detailsDiv.style.display = "flex";
        positionDetails();
        setTimeout(() => {
          detailsDiv.style.opacity = "1";
        }, 10);
      });

      detailsDiv.addEventListener("mouseenter", () => {
        detailsDiv.style.position = "absolute";
      });

      function hideDetails() {
        detailsDiv.style.opacity = "0";
        detailsDiv.style.display = "none";
        marker.style.filter =
          "grayscale(1) sepia(1) saturate(0.5) contrast(0.6) brightness(0.8)";
      }

      marker.addEventListener("mouseleave", function () {
        setTimeout(() => {
          if (!detailsDiv.matches(":hover")) {
            marker.style.filter =
              "grayscale(1) sepia(1) saturate(0.5) contrast(0.6) brightness(0.8)";
            marker.style.transform = "scale(1)";
            detailsDiv.style.position = "absolute";
            hideDetails();
          }
        }, 100);
      });
      detailsDiv.addEventListener("mouseleave", hideDetails);
    }

    container.appendChild(marker);
    container.appendChild(detailsDiv);
    detailsDiv.appendChild(textWrapper);
    if (isMobile) {
      detailsDiv.appendChild(closeButton);
    }
    if (!isMobile && !fundidorElement) {
      const fundidorImg = document.createElement("img");
      fundidorImg.classList.add("fundidor-img");
      fundidorImg.src = "./images/locations/images/Fundidor_color.png";
      fundidorImg.alt = "Fundidor";
      fundidorImg.style.position = "absolute";
      fundidorImg.style.zIndex = "15";
      fundidorImg.style.width = "auto";
      fundidorImg.style.pointerEvents = "none";
      container.appendChild(fundidorImg);
      fundidorElement = fundidorImg;
      fundidorAdded = true;

      // Alinear el fundidor a la esquina inferior derecha de la imagen del mapa
      function positionFundidor() {
        const mapaFondo = document.getElementById('mapa-fondo');
        if (!mapaFondo) return;
        const fondoRect = mapaFondo.getBoundingClientRect();
        const containerRect = mapaContainer.getBoundingClientRect();
        // Calcula la posición relativa dentro del mapa
        const left = fondoRect.width - fundidorImg.offsetWidth;
        const top = fondoRect.height - fundidorImg.offsetHeight;
        fundidorImg.style.left = `${left}px`;
        fundidorImg.style.top = `${top}px`;
      }
      window.addEventListener('resize', positionFundidor);
      setTimeout(positionFundidor, 50);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let anchoAnterior = window.innerWidth;
  cargarMarcadores();

  window.addEventListener("resize", () => {
    cargarMarcadores();
    anchoAnterior = window.innerWidth;
  });
});

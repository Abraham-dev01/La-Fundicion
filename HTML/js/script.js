function cargarMarcadores() {
  const isMobile = window.innerWidth <= 460;
  const container = document.getElementById("hamburguesas-container");
  container.innerHTML = "";

  if (isMobile) {
    const mobileLocations = [
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
    addMarkers(mobileLocations);
  } else {
    fetch("./images/locations/json/locations.json")
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        addMarkers(data);
      })
      .catch((error) =>
        console.error("Error cargando las ubicaciones:", error)
      );
  }
}

// Función para agregar los marcadores
function addMarkers(locations) {
  const isMobile = window.innerWidth <= 460;
  const container = document.getElementById("hamburguesas-container");
  const map = document.querySelector("#mapa-fondo");

  // Obtener el tamaño del contenedor (que puede cambiar al redimensionar la ventana)
  const mapWidth = map.offsetWidth;
  const mapHeight = map.offsetHeight;
  let fundidorAdded = false;

  locations.forEach((location) => {
    // Crear un marcador (imagen)
    const marker = document.createElement("img");
    marker.classList.add("hamburguesa");
    marker.src = "./images/locations/images/Hamburguesa.png";
    marker.alt = "Ubicación";

    // Convertir los valores top/left a píxeles basados en el tamaño actual del contenedor
    const top = (parseFloat(location.top) / 100) * mapHeight; // Convertir porcentaje a píxeles
    const left = (parseFloat(location.left) / 100) * mapWidth; // Convertir porcentaje a píxeles

    marker.style.filter =
      "grayscale(1) sepia(1) saturate(0.5) contrast(0.6) brightness(0.8)";
    marker.style.position = "absolute";
    marker.style.top = `${top}px`;
    marker.style.left = `${left}px`;
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

    // Evento para cerrar el modal en móvil
    closeButton.addEventListener("click", () => {
      detailsDiv.style.display = "none";
      marker.style.filter =
        "grayscale(1) sepia(1) saturate(0.5) contrast(0.6) brightness(0.8)";
      marker.style.transform = "scale(1)";
    });

    // Crear el div de detalles
    const detailsDiv = document.createElement("div");
    if (window.innerWidth <= 460) {
      detailsDiv.style.position = "fixed";
      detailsDiv.style.top = "50%";
      detailsDiv.style.left = "50%";
      detailsDiv.style.transform = "translate(-50%, -50%)";
      detailsDiv.style.width = "80%";
      detailsDiv.style.height = "auto";
      detailsDiv.style.backgroundColor = "white";
      detailsDiv.style.zIndex = "999";
      detailsDiv.style.display = "flex";
      detailsDiv.style.flexDirection = "column";
      detailsDiv.style.justifyContent = "flex-start";
      detailsDiv.style.borderRadius = "8px";
    } else {
      detailsDiv.classList.add("project-details");
      detailsDiv.style.position = "absolute";
      detailsDiv.style.top = `calc(${top}px - 50px)`;
      detailsDiv.style.left = `calc(${left}px + 130px)`;
      detailsDiv.style.opacity = "0";
      detailsDiv.style.transition = "opacity 0.2s ease";
    }
    detailsDiv.style.display = "none";

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

    // Crear la imagen para cada sucursal
    textWrapper.style.width = "auto";
    textWrapper.style.top = "0px";
    textWrapper.style.margin = "5px";

    // Mostrar detalles cuando el mouse entra
    if (isMobile) {
      marker.addEventListener("click", () => {
        const isVisible = detailsDiv.style.display === "flex";
        // Oculta si ya está visible
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
          setTimeout(() => {
            detailsDiv.style.opacity = "1";
          }, 10);
        }
      });
    } else {
      // Hover en escritorio
      marker.addEventListener("mouseenter", function () {
        marker.style.filter = "none";
        marker.style.transform = "scale(1.2)";
        detailsDiv.style.display = "flex";
        setTimeout(() => {
          detailsDiv.style.opacity = "1";
        }, 10);
      });

      detailsDiv.addEventListener("mouseenter", () => {
        detailsDiv.style.position = "absolute";
      });

      function hideDetails() {
        detailsDiv.style.opacity = "0";
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
    }

    detailsDiv.addEventListener("mouseleave", hideDetails);

    container.appendChild(marker);
    container.appendChild(detailsDiv);
    detailsDiv.appendChild(textWrapper);
    if (isMobile) {
      detailsDiv.appendChild(closeButton);
    }
    if (!isMobile && !document.querySelector(".fundidor-img")) {
      const fundidorImg = document.createElement("img");
      fundidorImg.classList.add("fundidor-img");
      fundidorImg.src = "./images/locations/images/Fundidor_color.png";
      fundidorImg.alt = "Fundidor";
      fundidorImg.style.position = "absolute";
      fundidorImg.style.top = "11vw";
      fundidorImg.style.right = "0.01vw";
      fundidorImg.style.zIndex = "15";
      fundidorImg.style.width = "auto";
      fundidorImg.style.height = "80vh";
      container.appendChild(fundidorImg);
      fundidorAdded = true;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let anchoAnterior = window.innerWidth;
  cargarMarcadores();

  window.addEventListener("resize", () => {
    const anchoActual = window.innerWidth;
    if (
      (anchoAnterior > 460 && anchoActual <= 460) ||
      (anchoAnterior <= 460 && anchoActual > 460)
    ) {
      cargarMarcadores();
    }
    anchoAnterior = anchoActual;
  });
});

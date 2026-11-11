// Ordre chronologique éditorial : fondations, atelier, montage, couverture, finitions.
const ossaturePhotos = [
  { file: 23, caption: "La dalle — le chantier commence" },
  { file: 1, caption: "À l’atelier — préparation de la charpente" },
  { file: 22, caption: "Le façonnage des assemblages" },
  { file: 21, caption: "Les premiers murs prennent place" },
  { file: 2, caption: "Levage des panneaux sur la dalle" },
  { file: 3, caption: "L’ossature se dessine" },
  { file: 19, caption: "Mise en place d’une ferme traditionnelle" },
  { file: 20, caption: "Ajustement des pièces de bois" },
  { file: 4, caption: "La charpente apparente à l’intérieur" },
  { file: 17, caption: "Le dessin des fermes sous le toit" },
  { file: 7, caption: "L’espace intérieur se précise" },
  { file: 29, caption: "Lumière et charpente à l’intérieur" },
  { file: 10, caption: "La structure du débord de toit" },
  { file: 5, caption: "Pose de la couverture en tuiles" },
  { file: 8, caption: "Détail de la rive et des tuiles" },
  { file: 6, caption: "La toiture couvre la maison" },
  { file: 16, caption: "Finition du faîtage" },
  { file: 9, caption: "Préparation du porche couvert" },
  { file: 11, caption: "Le porche et sa charpente" },
  { file: 28, caption: "Le bardage habille les façades" },
  { file: 14, caption: "Le bardage en bois terminé" },
  { file: 24, caption: "La façade et le grand porche" },
  { file: 25, caption: "La maison achevée — vue de trois-quarts" },
  { file: 26, caption: "La maison achevée — côté jardin" },
  { file: 27, caption: "La maison achevée — façade arrière" },
  { file: 15, caption: "Le chantier terminé" }
];

const renovationPhotos = [
  { file: "toiture-avant-01.jpeg", caption: "Avant — état de la toiture" },
  { file: "toiture-avant-02.jpeg", caption: "Après — remaniement de la toiture" },
  { file: "renovation-04.jpeg", caption: "Vue d’ensemble de la bâtisse rénovée" },
  { file: "renovation-03.jpeg", caption: "Détail du porche et de la charpente" }
];

const terrassePhotos = [
  { file: "terrasse-01.jpeg", caption: "Vue d’ensemble de la terrasse en bois et de la pergola" },
  { file: "terrasse-02.jpeg", caption: "Détail des marches et du garde-corps en bois" },
  { file: "terrasse-03.jpeg", caption: "La terrasse achevée, vue depuis le jardin" }
];

let current = 0;
let photos = ossaturePhotos;
let lastTrigger = null;
const box = document.querySelector("#lightbox");
const large = document.querySelector("#large");
const counter = document.querySelector("#counter");
const caption = document.querySelector("#caption");
const closeButton = document.querySelector(".close");

function show(index) {
  current = (index + photos.length) % photos.length;
  const photo = photos[current];
  large.src = typeof photo.file === "number" ? `chantier-${String(photo.file).padStart(2, "0")}.jpg` : photo.file;
  large.alt = photo.caption;
  caption.textContent = photo.caption;
  counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
}

function openGallery(trigger, items) {
  lastTrigger = trigger;
  photos = items;
  show(0);
  box.classList.add("open");
  box.setAttribute("aria-hidden", "false");
  closeButton.focus();
}

document.querySelector("#open-gallery").addEventListener("click", event => openGallery(event.currentTarget, ossaturePhotos));
document.querySelector("#open-renovation").addEventListener("click", event => openGallery(event.currentTarget, renovationPhotos));
document.querySelector("#open-terrasse").addEventListener("click", event => openGallery(event.currentTarget, terrassePhotos));

function close() {
  box.classList.remove("open");
  box.setAttribute("aria-hidden", "true");
  if (lastTrigger) lastTrigger.focus();
}

closeButton.addEventListener("click", close);
document.querySelector(".prev").addEventListener("click", () => show(current - 1));
document.querySelector(".next").addEventListener("click", () => show(current + 1));
box.addEventListener("click", event => { if (event.target === box) close(); });
document.addEventListener("keydown", event => {
  if (!box.classList.contains("open")) return;
  if (event.key === "Escape") close();
  if (event.key === "ArrowLeft") show(current - 1);
  if (event.key === "ArrowRight") show(current + 1);
});
document.querySelector("#year").textContent = new Date().getFullYear();

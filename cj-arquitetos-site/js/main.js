const CATEGORIES = [
  { key: "residencial",  label: "Projetos Residenciais" },
  { key: "comercial",    label: "Projetos Comerciais" },
  { key: "corporativo",  label: "Projetos Corporativos" },
  { key: "clinica",      label: "Clínicas & Consultórios" },
];

let PROJECTS = [];
let currentGallery = null;
let currentIndex = 0;

async function loadProjects(){
  const el = document.getElementById("projects-root");
  if(!el) return; // this page has no portfolio section
  try{
    const res = await fetch("content/projects.json");
    const data = await res.json();
    PROJECTS = data.projects || [];
    renderProjects(el);
  }catch(err){
    console.error("Não foi possível carregar o portfólio:", err);
    el.innerHTML = '<p style="opacity:.6;">Não foi possível carregar os projetos agora.</p>';
  }
}

function renderProjects(root){
  const tabsHtml = CATEGORIES.map((c, i) =>
    `<button class="tab-btn${i===0?' active':''}" data-tab="${c.key}">${c.label}</button>`
  ).join("");

  const panelsHtml = CATEGORIES.map((c, i) => {
    const items = PROJECTS.filter(p => p.category === c.key);
    const tiles = items.map(renderTile).join("");
    return `<div class="project-panel${i===0?' active':''}" data-panel="${c.key}"><div class="project-grid">${tiles}</div></div>`;
  }).join("");

  root.innerHTML = `
    <div class="projects-tabs" role="tablist">${tabsHtml}</div>
    ${panelsHtml}
  `;

  root.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      root.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
      root.querySelectorAll(".project-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      root.querySelector(`.project-panel[data-panel="${tab.dataset.tab}"]`).classList.add("active");
    });
  });
}

function renderTile(p){
  const hasPhoto = p.cover && p.images && p.images.length > 0;
  const badge = hasPhoto && p.images.length > 1 ? `<span class="tile-badge">${p.images.length} fotos</span>` : "";
  const cls = hasPhoto ? "has-photo" : "placeholder";
  const img = hasPhoto ? `<img src="${p.cover}" alt="${p.title}">` : "";
  const status = hasPhoto ? (p.location || "") : "Imagem em breve";
  const click = hasPhoto ? ` onclick="openGallery('${p.id}')" role="button" tabindex="0" onkeydown="if(event.key==='Enter')openGallery('${p.id}')"` : "";
  return `<div class="project-tile ${cls}"${click}>
    ${img}${badge}
    <div class="tile-info"><h4>${p.title}</h4><span class="tile-status">${status}</span></div>
  </div>`;
}

function openGallery(id){
  const project = PROJECTS.find(p => p.id === id);
  if(!project || !project.images || !project.images.length) return;
  currentGallery = project;
  currentIndex = 0;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.getElementById('lightbox').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeGallery(){
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightbox').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function navGallery(dir){
  if(!currentGallery) return;
  const imgs = currentGallery.images;
  currentIndex = (currentIndex + dir + imgs.length) % imgs.length;
  updateLightbox();
}
function updateLightbox(){
  const imgs = currentGallery.images;
  document.getElementById('lightbox-img').src = imgs[currentIndex];
  document.getElementById('lightbox-caption').textContent =
    currentGallery.title + ' — foto ' + (currentIndex+1) + ' de ' + imgs.length;
}
document.addEventListener('click', (e) => {
  if(e.target.id === 'lightbox') closeGallery();
});
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if(!lb || !lb.classList.contains('open')) return;
  if(e.key === 'Escape') closeGallery();
  if(e.key === 'ArrowRight') navGallery(1);
  if(e.key === 'ArrowLeft') navGallery(-1);
});

document.addEventListener('DOMContentLoaded', loadProjects);


function initMobileNav(){
  const header = document.querySelector("header");
  const toggle = document.querySelector(".nav-toggle");
  if(!header || !toggle) return;
  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  header.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("click", () => {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener('DOMContentLoaded', initMobileNav);

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("catalog-container");

    if (container && typeof pestCatalog !== "undefined") {
        pestCatalog.forEach(cat => {
            const box = document.createElement("div");
            box.className = "catalog-category-box";

            const itemsHtml = cat.products.map(p => `
        <div class="product-item" onclick="openProductModal('${p.name.replace(/'/g, "\\'")}', '${p.desc.replace(/'/g, "\\'")}', '${cat.category}')">
          <span class="product-item-name">${p.name}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--green-primary)"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      `).join("");

            box.innerHTML = `
        <h3>${cat.icon} ${cat.category}</h3>
        <p class="catalog-category-desc">${cat.description}</p>
        <div class="product-list">
          ${itemsHtml}
        </div>
      `;
            container.appendChild(box);
        });
    }
});

const productModal = document.getElementById("product-modal");
const pTitle = document.getElementById("modal-title");
const pDesc = document.getElementById("modal-desc");
const pTag = document.getElementById("modal-category");
const pBtn = document.getElementById("modal-whatsapp");

function openProductModal(name, desc, category) {
    if (!productModal) return;
    pTitle.textContent = name;
    pDesc.textContent = desc;
    pTag.textContent = category;

    const waMsg = `¡Hola! Me interesa conocer la disponibilidad y más información sobre ${name}.`;
    pBtn.href = `https://wa.me/522216670302?text=${encodeURIComponent(waMsg)}`;

    productModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeProductModal() {
    if (!productModal) return;
    productModal.classList.remove("active");
    document.body.style.overflow = "";
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
});

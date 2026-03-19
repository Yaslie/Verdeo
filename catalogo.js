document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("catalog-container");
    const searchInput = document.getElementById("catalog-search");

    if (container && typeof pestCatalog !== "undefined") {

        function renderCatalog(filterText = "") {
            container.innerHTML = "";
            const lowerFilter = filterText.toLowerCase().trim();
            let hasAnyResults = false;

            pestCatalog.forEach(cat => {
                let filteredProducts = cat.products;

                if (lowerFilter) {
                    filteredProducts = cat.products.filter(p => {
                        const matchName = p.name.toLowerCase().includes(lowerFilter);
                        const matchTags = p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerFilter));
                        return matchName || matchTags;
                    });
                }

                if (filteredProducts.length === 0) return;
                hasAnyResults = true;

                const box = document.createElement("div");
                box.className = "catalog-category-box";
                if (lowerFilter) box.classList.add("expanded");

                const itemsHtml = filteredProducts.map(p => `
          <div class="product-item" onclick="openProductModal('${p.name.replace(/'/g, "\\'")}', '${p.desc.replace(/'/g, "\\'")}', '${cat.category}', '${JSON.stringify(p.tags || []).replace(/'/g, "&#39;").replace(/"/g, "&quot;")}')">
            <span class="product-item-name">${p.name}</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--green-primary)"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        `).join("");

                box.innerHTML = `
          <div class="catalog-category-header" onclick="this.parentElement.classList.toggle('expanded')" title="Desplegar para ver productos">
            <div class="catalog-category-header-text">
              <h3>${cat.icon} ${cat.category}</h3>
              <p class="catalog-category-desc">${cat.description}</p>
            </div>
            <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div class="product-list-wrapper">
            <div class="product-list-inner">
              <div class="product-list">
                ${itemsHtml}
              </div>
            </div>
          </div>
        `;
                container.appendChild(box);
            });

            if (!hasAnyResults) {
                container.innerHTML = `
          <div style="text-align: center; padding: 60px 20px; width: 100%;">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--border); margin-bottom:16px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <h3 style="color: var(--text-primary); margin-bottom: 8px;">No se encontraron resultados</h3>
            <p style="color: var(--text-secondary);">No hay productos ni plagas que coincidan con "<b>${filterText}</b>".</p>
          </div>
        `;
            }
        }

        // Initial render
        renderCatalog();

        // Event listener for search
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                renderCatalog(e.target.value);
            });
        }
    }
});

const productModal = document.getElementById("product-modal");
const pTitle = document.getElementById("modal-title");
const pDesc = document.getElementById("modal-desc");
const pTag = document.getElementById("modal-category");
const pTagsContainer = document.getElementById("modal-tags");
const pBtn = document.getElementById("modal-whatsapp");

function openProductModal(name, desc, category, tagsJson) {
    if (!productModal) return;
    pTitle.textContent = name;
    pDesc.textContent = desc;
    pTag.textContent = category;

    if (pTagsContainer) {
        pTagsContainer.innerHTML = '';
        const tags = JSON.parse(tagsJson || "[]");
        if (tags.length > 0) {
            tags.forEach(tag => {
                const span = document.createElement("span");
                span.className = "modal__pest-tag";
                span.textContent = tag;
                pTagsContainer.appendChild(span);
            });
            pTagsContainer.style.display = "flex";
        } else {
            pTagsContainer.style.display = "none";
        }
    }

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

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const searchInput = document.querySelector("#archive-search");
const filterPills = Array.from(document.querySelectorAll(".filter-pill"));
const archiveItems = Array.from(document.querySelectorAll("[data-archive] .archive-card-item"));
const emptyState = document.querySelector(".empty-state");

if (searchInput && archiveItems.length) {
  const activeFilters = {
    type: "all",
    region: "all",
  };

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    archiveItems.forEach((item) => {
      const type = item.dataset.type || "";
      const region = item.dataset.region || "";
      const searchable = item.dataset.search || "";
      const matchesType = activeFilters.type === "all" || type === activeFilters.type;
      const matchesRegion = activeFilters.region === "all" || region.includes(activeFilters.region);
      const matchesSearch = searchable.includes(query);
      const visible = matchesType && matchesRegion && matchesSearch;

      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  };

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const group = pill.dataset.filterGroup;
      const value = pill.dataset.filter || "all";

      if (!group) return;

      activeFilters[group] = value;
      filterPills.forEach((button) => {
        if (button.dataset.filterGroup === group) {
          button.classList.toggle("is-active", button === pill);
        }
      });
      applyFilters();
    });
  });

  searchInput.addEventListener("input", applyFilters);
  applyFilters();
}

const archiveToggle = document.querySelector(".archive-toggle");
const archiveList = document.getElementById("archive-list");

if (archiveToggle && archiveList) {
  archiveToggle.addEventListener("click", () => {
    const isOpen = archiveToggle.getAttribute("aria-expanded") === "true";
    archiveToggle.setAttribute("aria-expanded", String(!isOpen));
    archiveList.hidden = isOpen;
  });
}

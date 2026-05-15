const recordToggles = document.querySelectorAll(".record-toggle");

recordToggles.forEach((toggle) => {
  const listId = toggle.getAttribute("aria-controls");
  const list = listId ? document.getElementById(listId) : null;

  if (!list) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isOpen));
    list.hidden = isOpen;
  });
});

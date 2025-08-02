const burgerBtn = document.getElementById("burger-btn");
const closeBtn = document.getElementById("close-btn");
const menu = document.getElementById("menu");
const logo = document.querySelector("header > div.flex-shrink-0"); // le logo

function openMenu() {
  menu.classList.remove("hidden");
  menu.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "w-full",
    "h-screen",
    "bg-[#FFF4DF]",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "p-8",
    "z-50",
    "space-y-6"
  );

  // cacher logo et bouton burger
  logo.classList.add("hidden");
  burgerBtn.classList.add("hidden");
}

function closeMenu() {
  menu.classList.add("hidden");
  menu.classList.remove(
    "fixed",
    "top-0",
    "left-0",
    "w-full",
    "h-screen",
    "bg-[#FFF4DF]",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "p-8",
    "z-50",
    "space-y-6"
  );

  // ré-afficher logo et bouton burger
  logo.classList.remove("hidden");
  burgerBtn.classList.remove("hidden");
}

burgerBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

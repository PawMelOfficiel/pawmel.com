const path = window.location.pathname;
const switcher = document.getElementById("lang-switcher");

function createFlagLink(href, imgSrc, alt) {
    return `
    <a href="${href}" aria-label="${alt}"
       style="
         display: inline-block;
         width: 24px;
         height: 24px;
         border-radius: 50%;
         overflow: hidden;
         vertical-align: middle;
         transition: border-color 0.3s;
       ">
      <img src="${imgSrc}" alt="${alt}"
           style="
             width: 100%;
             height: 100%;
             object-fit: cover;
             display: block;
           " />
    </a>
  `;
}

function updateSwitcher(switcher) {
    if (!switcher) return;

    let altLangPath;

    if (path.startsWith("/en/home/")) {
        // Remplacer '/en/home/' par '/accueil/' pour garder la même page en EN
        altLangPath = path.replace("/en/home/", "/accueil/");
    } else if (path.startsWith("/en/")) {
        // Remplacer '/en/' par '/' pour garder la même page en FR
        altLangPath = path.replace("/en/", "/");
    } else if (path.startsWith("/accueil/")) {
        // Remplacer '/accueil/' par '/en/home/' pour garder la même page en EN
        altLangPath = path.replace("/accueil/", "/en/home/");
    } else if (path.startsWith("/services/")) {
        // Remplacer '/services/' par '/en/services/' pour garder la même page en EN
        altLangPath = path.replace("/services/", "/en/services/");
    } else if (path.startsWith("/plus/")) {
        // Remplacer '/plus/' par '/en/plus/' pour garder la même page en EN
        altLangPath = path.replace("/plus/", "/en/plus/");
    } else if (path.startsWith("/booking/")) {
        // Remplacer '/booking/' par '/en/booking/' pour garder la même page en EN
        altLangPath = path.replace("/booking/", "/en/booking/");
    } else if (path.startsWith("/social-media/")) {
        // Remplacer '/social-media/' par '/en/social-media/' pour garder la même page en EN
        altLangPath = path.replace("/social-media/", "/en/booking/");
    } else if (path === "/" || path === "/index.html") {
        // Page d'accueil par défaut
        altLangPath = "/en/";
    } else {
        // Si page non prévue, rediriger vers la home en anglais
        altLangPath = "/en/home/";
    }

    // Choix du drapeau en fonction de la langue actuelle
    const isEnglish = path.startsWith("/en/");
    const flagSrc = isEnglish ? "/assets/icons/flags/fr.svg" : "/assets/icons/flags/gb.svg";
    const altText = isEnglish ? "Passer au français" : "Switch to English";

    switcher.innerHTML = createFlagLink(altLangPath, flagSrc, altText);
}

// Récupérer les deux éléments (adapter les IDs selon ton HTML)
const switcherDesktop = document.getElementById("lang-switcher-desktop");
const switcherBurger = document.getElementById("lang-switcher-burger");

// Mettre à jour les deux switchers s'ils existent
updateSwitcher(switcherDesktop);
updateSwitcher(switcherBurger);
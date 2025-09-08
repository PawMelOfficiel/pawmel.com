// Détection de la langue actuelle depuis l'URL
const isEnglish = window.location.pathname.startsWith("/en/");

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("prices-container");

    try {
        const response = await fetch("/data/prices.json");
        const prices = await response.json();

        // fonction pour traduire / formater un label d'offre
        function formatLabel(offerKey) {
            const k = offerKey.toLowerCase();
            if (k.includes("thirty") || k.includes("30m") || k.match(/\b30\b/)) {
                if (k.startsWith("2") || k.startsWith("2-") || k.startsWith("double") || k.includes("2-")) {
                    return isEnglish ? "→ If 2 × 30 minutes per day" : "→ Si 2 × 30 minutes par jour";
                }
                return isEnglish ? "30-minute visit" : "Visite de 30 minutes";
            }
            if (k.includes("one-hour") || k.includes("1h")) {
                if (k.startsWith("2") || k.startsWith("2-") || k.startsWith("double") || k.includes("2-")) {
                    return isEnglish ? "→ If 2 × 1 hour per day" : "→ Si 2 × 1 heure par jour";
                }
                return isEnglish ? "1-hour visit" : "Visite d'une heure";
            }
            if (k.includes("walking") || k.includes("promenade")) {
                return isEnglish ? "Walking" : "Promenade";
            }
            if (k.includes("hourly-rate")) {
                return isEnglish ? "Hourly rate" : "Tarif horaire";
            }
            if (k.includes("extra") || k.includes("supplement") || k.includes("extra-cost")) {
                return isEnglish ? "Extra cost per pet" : "Majoration animal supplémentaire";
            }
            // fallback : rendre plus lisible la clé
            return offerKey.replace(/[-_]/g, " ");
        }

        function createCard(animalKey, services) {
            const card = document.createElement("div");
            card.className =
                "bg-white rounded-xl shadow p-6 border border-[#A87C56]/20 text-left flex flex-col"; // flex-col ajouté

            const title = document.createElement("h2");
            title.className =
                "text-3xl font-baloo text-[#176013] mb-4 text-center";
            title.textContent = isEnglish ? animalKey : services.animalFR;
            card.appendChild(title);

            for (const [category, offers] of Object.entries(services)) {
                if (category !== "at-home" && category !== "walking") continue;

                const catTitle = document.createElement("h3");
                catTitle.className =
                    "text-xl font-semibold text-[#A87C56] mt-4 mb-2";
                catTitle.textContent =
                    category === "at-home"
                        ? (isEnglish ? "At-home visit" : "Visite à domicile")
                        : (isEnglish ? "Walking" : "Promenade");
                card.appendChild(catTitle);

                const list = document.createElement("ul");
                list.className = "space-y-2";

                for (const [offerKey, price] of Object.entries(offers)) {
                    const li = document.createElement("li");
                    li.className = "flex justify-between text-lg";

                    const label = formatLabel(offerKey);
                    const prepend = offerKey === "extra-cost-per-pet" ? "+" : "";
                    const append = offerKey === "hourly-rate" ? "/h" : "";
                    const priceText = price
                        ? `${prepend}${price} €${append}`
                        : "";

                    li.innerHTML = `<span>${label}</span><span class="font-bold">${priceText}</span>`;
                    list.appendChild(li);
                }

                card.appendChild(list);
            }

            const space = document.createElement("div");
            space.className = "mt-8";
            card.appendChild(space);

            const bookingLink = document.createElement("a");
            bookingLink.className =
                "mt-auto block w-full px-4 py-3 bg-[#176013] text-lg text-[#FFF4DF] text-center rounded-full hover:bg-[#2b8a28] transition"; // mt-auto ajouté
            bookingLink.href = isEnglish ? "/en/booking" : "/reservation";
            bookingLink.textContent = isEnglish ? "Book" : "Réserver";

            card.appendChild(bookingLink);

            return card;
        }


        // génération des cartes
        Object.entries(prices).forEach(([animal, services]) => {
            const card = createCard(animal, services);
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Erreur lors du chargement des tarifs :", err);
        container.innerHTML = "<p class='text-lg'>Impossible de charger les tarifs pour le moment.</p>";
    }
});
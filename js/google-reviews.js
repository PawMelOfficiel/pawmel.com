const PLACE_ID = "ChIJU7xZBC-CqCQRZRm2EiH0mqc";
// Détection de la langue actuelle depuis l'URL
const isEnglish = window.location.pathname.startsWith("/en/");

async function fetchReviews(placeId) {
  const place = new google.maps.places.Place({ id: placeId });
  const result = await place.fetchFields({
    fields: ["reviews", "rating", "userRatingCount"],
  });
  return result.place.Dg.reviews?.sort((a, b) => b.publishTime - a.publishTime) // Tri décroissant
    .slice(0, 6); // Garde les 6 plus récents
}

async function displayReviews() {
  const avisContainer = document.getElementById("avis-container");
  const loading = document.getElementById("loading");
  const reviewsLinkContainer = document.getElementById(
    "google-reviews-link-container"
  );

  try {
    const reviews = await fetchReviews(PLACE_ID);

    loading.style.display = "none";

    if (reviews.length === 0) {
      avisContainer.className =
        "flex justify-center items-center text-center min-h-[100px]";
      avisContainer.innerHTML = `<p>Aucun avis trouvé.</p>`;
      return;
    }

    avisContainer.className =
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start";
    avisContainer.innerHTML = "";

    reviews.forEach((review, index) => {
      // Choix du bon champ : texte traduit (text) ou original (originalText)
      const fullText = (
        isEnglish
          ? review.text // traduit par Google
          : review.originalText // langue d’origine
      ) || "";
      const shortText = fullText.slice(0, 200);
      const isLong = fullText.length > 200;

      const clampClass = isLong ? "line-clamp-5" : ""; // Pas de clamp si pas long
      const seeMore = isEnglish ? "See more" : "Voir plus";

      const div = document.createElement("div");
      div.className =
        "bg-white rounded-xl shadow p-6 flex flex-col justify-between w-full min-h-[20rem] transition-all duration-300";

      div.innerHTML = `
        <div class="text-yellow-400 text-sm text-center mb-2">
          ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
        </div>

        <p id="review-text-${index}" class="text-left text-lg ${clampClass}">
          "${fullText}"
        </p>

        ${isLong
          ? `<button id="toggle-${index}" class="text-sm text-[#176013] mt-2 hover:underline text-left">${seeMore}</button>`
          : `<div class="mt-2 opacity-0 pointer-events-none text-sm"></div>`
        }
      `;

      avisContainer.appendChild(div);

      if (isLong) {
        const toggleBtn = div.querySelector(`#toggle-${index}`);
        const textEl = div.querySelector(`#review-text-${index}`);
        let expanded = false;
        const seeLess = isEnglish ? "See less" : "Voir moins";

        toggleBtn.addEventListener("click", () => {
          expanded = !expanded;
          textEl.classList.toggle("line-clamp-5");
          toggleBtn.textContent = expanded ? seeLess : seeMore;
        });
      }
    });

    const seeMoreReviews = isEnglish ? "See more reviews on Google" : "Voir plus d'avis sur Google";

    reviewsLinkContainer.innerHTML = `
      <a href="https://www.google.com/maps/place/?q=place_id:${PLACE_ID}" target="_blank" class="bg-[#176013] text-white px-6 py-3 rounded-full hover:bg-[#14530f] transition" rel="noopener noreferrer">
        ${seeMoreReviews}
      </a>
    `;
  } catch (error) {
    loading.style.display = "none";
    avisContainer.className =
      "flex justify-center items-center text-center min-h-[100px]";
    avisContainer.innerHTML = `<p>Erreur lors du chargement des avis : ${error.message}</p>`;
    reviewsLinkContainer.innerHTML = "";
    console.error(error);
  }
}

window.addEventListener("load", () => {
  const checkInterval = setInterval(() => {
    if (
      typeof google === "object" &&
      google.maps &&
      google.maps.places &&
      google.maps.places.Place &&
      google.maps.places.Place.searchByText
    ) {
      clearInterval(checkInterval);
      displayReviews();
    }
  }, 100);
});

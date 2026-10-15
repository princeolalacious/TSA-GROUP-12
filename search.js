// ===== GRAB THE ELEMENTS =====
export const form = document.querySelector(".search-form");
export const input = document.querySelector(".search-form input");
export const searchSection = document.querySelector(".search-section");
export const card = document.querySelector(".earth-card");
export const inputWrapper = document.querySelector(".search-input-wrapper");

// Create the red "No results" text on the right side of the input
const errorText = document.createElement("span");
errorText.className = "search-error";
errorText.textContent = "No results";
inputWrapper.appendChild(errorText);

const url = "https://anurella.github.io/json/planet.json";

const earthCardHTML = card.innerHTML;

export let planets = [];
export async function getPlanets() {
  try {
    const response = await fetch(url);
    planets = await response.json();
  } catch (error) {
    console.log("Could not load planets:", error);
  }
}

getPlanets();

//  SHOW A PLANET IN THE CARD
export function showPlanet(planet) {
  card.innerHTML = `
    <div class="earth-card-top">
      <div class="earth-image">
        <img src="${planet.image}" alt="${planet.name}" />
      </div>

      <div class="earth-info">
        <h2>${planet.name}</h2>
        <h3>${planet.type}</h3>
        <p>${planet.description}</p>

        <div class="earth-stats">
          <div class="stat-box">
            <span>Gravity</span>
            <strong>${planet.gravity}</strong>
          </div>
          <div class="stat-box">
            <span>Mass</span>
            <strong>${planet.mass}</strong>
          </div>
          <div class="stat-box">
            <span>Period</span>
            <strong>${planet.period}</strong>
          </div>
        </div>

        <div class="earth-details">
          <div class="details">
            <span class="icon">
              <i class="fa-solid fa-thermometer-half">&deg;</i>
            </span>
            <span>${planet.temperature}</span>
          </div>
          <div class="details">
            <span class="icon"><i class="fa-solid fa-moon"></i></span>
            <span>${planet.moons}</span>
          </div>
          <div class="details">
            <span class="icon"><i class="fa-solid fa-circle"></i></span>
            <span>${planet.diameter}</span>
          </div>
          <div class="details">
            <span class="icon"><i class="fa-solid fa-sun"></i></span>
            <span>${planet.distanceFromSun}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

//  THE ERROR CARD
export function showError() {
  searchSection.classList.add("error");
  card.innerHTML = `
    <div class="no-results">
      <h2>No results found!</h2>
      <p>
        We couldn't find any planet matching your search.
        Please double-check the name and try again.
      </p>
    </div>
  `;
}

export function showEarth() {
  searchSection.classList.remove("error");
  card.innerHTML = earthCardHTML;
}

input.addEventListener("input", function () {
  if (input.value.trim() === "") {
    showEarth();
  }
});

//  SEARCH BUTTON
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from refreshing

  const searchValue = input.value.trim().toLowerCase();

  searchSection.classList.remove("error");

  if (searchValue === "") {
    showEarth();
    return;
  }

  const found = planets.find(function (planet) {
    return planet.name.toLowerCase() === searchValue;
  });

  if (found) {
    showPlanet(found);
  } else {
    showError();
  }
});

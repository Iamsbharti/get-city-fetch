import "./styles.css";
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
//initialiaze cities array
const cities = [];

//fetch cities data
fetch(endpoint)
  .then(response => response.json())
  .then(data => cities.push(...data));

//find the match in cities as per i/p
function matchCities(inputValue, cities) {
  return cities.filter(place => {
    const regex = new RegExp(inputValue, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}
//display Suggestions
function displaySuggestions() {
  const ip_val = this.value;
  const matchedCities = matchCities(ip_val, cities);
  const regex = new RegExp(ip_val, "gi");
  const html = matchedCities
    .map(place => {
      const citiesName = place.city.replace(
        regex,
        `<span class="hl'>${ip_val}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${ip_val}</span>`
      );
      return `
            <li>
              <span class="name">${citiesName},${stateName}</span>
              <span class="population">${place.population}</span>
            </li>
          `;
    })
    .join("");

  suggestions.innerHTML = html;
}
//get the elements from DOM
const searchBox = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

//add eventlisteners
searchBox.addEventListener("change", displaySuggestions);
searchBox.addEventListener("keyup", displaySuggestions);

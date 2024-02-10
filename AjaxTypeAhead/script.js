const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cityArr = [];

fetch(endpoint)
  .then((resp) => resp.json())
  .then((data) => cityArr.push(...data));
//   .then((data) => console.log(data));

function searchCity(wordMatches, cityArr) {
  return cityArr.filter((place) => {
    const regex = new RegExp(wordMatches, "gi");
    return place.city.match(regex) || place.city.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatchingResult() {
  const matchArr = searchCity(this.value, cityArr);
  const html = matchArr
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      const stateName = place.city.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      return `
    <li>
    <span class='name'>${cityName}  ${stateName} </span>
    <span class='population'> ${numberWithCommas(place.population)} </span>
    </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatchingResult);
searchInput.addEventListener("keyup", displayMatchingResult);

let elCards = document.querySelector(".cards");
let elBody = document.querySelector("body");
let elInput = document.querySelector(".js-input");
let elSelect = document.querySelector(".js-select");
let elmore = document.querySelector(".more");
let elTemplate = document.querySelector(".template").content;
let elFrag = document.createDocumentFragment();

let newArr = [];

elInput.addEventListener("input", (evt) => {
  let inputVal = elInput.value;
  async function countries() {
    newArr = [];
    let resolve = await fetch(
      `https://restcountries.com/v3.1/name/${inputVal}`
    );
    let data = await resolve.json();
    data.forEach((el) => {
      if (el.name.common.includes(inputVal)) {
        newArr.push(el);
      }
    });
    renderCountries(data, elCards);
  }
  countries();
});

function renderCountries(arr, node) {
  node.innerHTML = "";
  arr.forEach((el) => {
    let elCard = elTemplate.cloneNode(true);
    let elImg = elCard.querySelector(".card-img-top");
    let elTitle = elCard.querySelector(".card-title");
    let elPopular = elCard.querySelector(".popular");
    let elCapital = elCard.querySelector(".capital");
    let elRegion = elCard.querySelector(".region");
    // let newBtn = elCard.querySelector('.more');
    // newBtn.value = el.name.common;
    elImg.src = el.flags.svg;
    elTitle.innerHTML = el.name.common;
    elPopular.textContent = "Population :" + " " + el.population;
    elCapital.textContent = "Capital :" + " " + el.capital;
    elRegion.textContent = "Region :" + " " + el.region;
    elFrag.appendChild(elCard);
  });
  node.appendChild(elFrag);
}
async function countries() {
  let resolve = await fetch("https://restcountries.com/v3.1/all");
  let data = await resolve.json();

  let newSet = new Set(data.map((el) => el.region));

  newSet.forEach((el) => {
    let newOption = document.createElement("option");
    newOption.textContent = el;

    elSelect.appendChild(newOption);
  });

  renderCountries(data, elCards);
}
countries();

elSelect.addEventListener("change", (element) => {
  async function selects() {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${elSelect.value}`
    );
    const data = await response.json();

    if (elSelect.value == "all") {
      fetch("https://restcountries.com/v3.1/all");
    }

    let filterArr = data.filter((slc) => {
      let all = element.target.value;
      return slc.region.includes(all);
    });
    renderCountries(filterArr, elCards);
  }
  selects();
});

let elBtns = document.querySelector(".btns");
let elH1 = document.querySelector(".where");

elBtns.addEventListener("click", (evt) => {
  evt.preventDefault();

  elH1.classList.toggle("white");
  elBody.classList.toggle("dark");
});

let theme = false;

elBtns.addEventListener("click", () => {
  theme = !theme;
  const newBg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", newBg);
  newTheme();
});

let newTheme = () => {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
    // document.elH1.classList.add("white");
  } else {
    document.body.classList.remove("dark");
    // document.elH1.classList.remove("white");
  }
};

newTheme();

elCards.addEventListener("click", (evt) => {
  console.log(evt.target.matches(".more"));
  if (evt.target.matches(".more")) {
    let countryName = evt.path[2].children[1].firstElementChild.textContent;
    console.dir(countryName);
    async function countries() {
      let resolve = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      let data = await resolve.json();
      console.log(data);
      if (data.length <= 10) {
        window.localStorage.setItem("data", JSON.stringify(data));
      } else {
        renderCountries(data, elCards);
      }

      renderCountries(data, elCards);
    }
    countries();
    setTimeout(() => {
      window.location.replace("./country.html");
    }, 1000);
  }
});

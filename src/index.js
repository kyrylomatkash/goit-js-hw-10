// Імпорт бібліотек і функцій
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";
import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
// Основні змінні
const breedSelector = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
// Приховання основного тексту помилки
error.classList.add("is-hidden");
// Отримання списку пород
function getBreedsList(breeds) {
  breedSelector.innerHTML = breeds
    .map((breed) => `<option value="${breed.id}">${breed.name}</option>`)
    .join("\n");
}

// Завантаження зі списку пород
function fetchAndRenderBreeds() {
    Notiflix.Notify.info("Завантаження...");
  fetchBreeds()
    .then((result) => {
      getBreedsList(result);
    })
    .then(() => new SlimSelect({ select: ".breed-select" }))
    .catch(() => {
        // Повідомлення про помилку
      Notiflix.Notify.failure("Щось пішло не так,спробуйте ще раз або перезавантажте сторінку...", {
        timeout: 5000,
        cssAnimationStyle:fade,
        closeButton: true
      });
    })
    .finally(() => {
      loader.classList.add("is-hidden");
    });
}

breedSelector.addEventListener("change", selectBreed);
// Вибір породи з випадаючого списку
function selectBreed(event) {
  const selectedBreedName = event.currentTarget.value;
  catInfo.classList.add("is-hidden");

  fetchCatByBreed(selectedBreedName)
    .then((data) => {
      renderCatInfo(data);
      catInfo.classList.remove("is-hidden");
    })
    .catch(() => {
        // Повідомлення про помилку
      Notiflix.Notify.failure("Щось пішло не так,спробуйте ще раз або перезавантажте сторінку...", {
        timeout: 5000,
        cssAnimationStyle:fade,closeButton:true
      });
    })
    .finally(() => {
      loader.classList.add("is-hidden");
    });
}
// Завантаження інформації про кішку та створення карти з усіма даними
function renderCatInfo(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const catMarkup = `<img src="${url}" alt="${name}" width=500>
  <div class ="background-color">
  <h2 class="name">${name}</h2>
  <p class="description">${description}</p>
  <p class="name cat-temperament"><span class="cat-temperament-info">Temperament:</span> ${temperament}</p>
  </div>`;
  catInfo.innerHTML = catMarkup;
}
// Відображення всієї інформації на сторінці
fetchAndRenderBreeds();
import images from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const lightBoxImage = document.querySelector("img.lightbox__image");
const lightBox = document.querySelector("div.js-lightbox");
const lightBoxOverlay = document.querySelector("div.lightbox__overlay");
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
let indexOfImage = -1;
console.log(images);

function createGallaryItem(image) {
  const itemContainer = document.createElement("li");
  itemContainer.classList.add("gallery__item");
  const itemLink = document.createElement("a");
  itemLink.classList.add("gallery__link");
  itemLink.href = `${image.original}`;
  const imageItem = document.createElement("img");
  imageItem.classList.add("gallery__image");
  imageItem.src = `${image.preview}`;
  imageItem.alt = `${image.description}`;
  imageItem.dataset.indexofimage = `${(indexOfImage += 1)}`;
  itemLink.append(imageItem);
  itemContainer.append(itemLink);
  return itemContainer;
}

const arrOfGalleryItems = images.map((image) => createGallaryItem(image));
galleryContainer.append(...arrOfGalleryItems);

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();
  const itemRef = event.target;
  if (itemRef.nodeName !== "IMG") {
    return;
  }
  const largImgIndex = itemRef.dataset.indexofimage;
  lightBox.classList.add("is-open");
  lightBoxImage.src = `${images[largImgIndex].original}`;
  lightBoxImage.alt = itemRef.alt;
  lightBoxImage.dataset.indexoflargeimage = largImgIndex;
  console.log(lightBoxImage.dataset.indexoflargeimage);
});

function closeModal(event) {
  lightBox.classList.remove("is-open");
  lightBoxImage.src = "";
  lightBoxImage.alt = "";
}
closeBtn.addEventListener("click", closeModal);
window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    closeModal(event);
  }
});
lightBox.addEventListener("click", closeModal);

function changeLargeImageIndex(event) {
  const currentImgIndex = Number(lightBoxImage.dataset.indexoflargeimage);

  if (event.code === "ArrowLeft") {
    const prevImgIindex = currentImgIndex - 1;

    if (prevImgIindex >= 0) {
      lightBoxImage.src = `${images[prevImgIindex].original}`;
      lightBoxImage.alt = `${images[prevImgIindex].description}`;
      lightBoxImage.dataset.indexoflargeimage = prevImgIindex;
    }
  }

  if (event.code === "ArrowRight") {
    const nextImgIndex = currentImgIndex + 1;

    if (nextImgIndex < images.length) {
      lightBoxImage.src = `${images[nextImgIndex].original}`;
      lightBoxImage.alt = `${images[nextImgIndex].description};`;
      lightBoxImage.dataset.indexoflargeimage = nextImgIndex;
    }
  }
}

window.addEventListener("keydown", changeLargeImageIndex);

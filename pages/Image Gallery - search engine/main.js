const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = lightBox.querySelector(".fa-xmark");
const downloadImgBtn = lightBox.querySelector(".fa-download");


// API key, paginations, searchTerm variables
const apiKey = "dvAzayAsjnlYNG2547xssUmrgqITbuXHmZUytHe7peEoG0XOTyY2cYUe";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgURL) => {

    //Converting received img to blob, creating its download link & downloading it
    fetch(imgURL).then(res => res.blob()).then(file => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!"));
}

const showLightBox = (name, img) => {

    //Showing lightbox and setting img source, name and button ttribute
    lightBox.querySelector("img").src = img;
    lightBox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightBox.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideLightBox = () => {

    //Hiding lightbox on close icon click
    lightBox.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateHTML = (images) => {

    // Making li of all fetched images and adding them to the existing image wrapppper
    imagesWrapper.innerHTML += images.map(img =>
        `<li class="card" onclick="showLightBox('${img.photographer}', '${img.src.large2x}')">
        <img src="${img.src.large2x}" alt="img">
        <div class="details">
            <div class="photographer">
                <i class="fa-solid fa-camera"></i>
                <span>${img.photographer}</span>
            </div>

            <button onclick="downloadImg('${img.src.large2x}');event.stopPropagation();">
                <i class="fa-solid fa-download">
                </i>
            </button>
        </div>
    </li>`)
}

const getImages = (apiURL) => {

    //Fetching images by API call with authorization header
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images!"));
}


const loadMoreImages = () => {
    currentPage++;//increment currentPage by 1

    //if searchTerm has some value then call API with search term else call default API
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiURL = searchTerm ? `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}` : apiURL;
    getImages(apiURL);
}

const loadSearchImages = (e) => {
    //if the search input is empty, set the search term to null and return from here
    if(e.target.value === "") return searchTerm = null;
    //if pressed key is Enter, update the current ppage, search term & call the getImages
    if(e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightBox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
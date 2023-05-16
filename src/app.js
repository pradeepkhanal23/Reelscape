// example api request
// https://api.themoviedb.org/3/movie/550?api_key=863e6b16482d1bfa21ee50f9fcd54b5e

//Storing pathnames as we need to know which page we are in by accessing the window's location pathname property
const global = {
  currentPage: window.location.pathname,
  api: {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "863e6b16482d1bfa21ee50f9fcd54b5e",
  },
  search: {
    type: "",
    userInput: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
};

//a function to change the styling of the link when its clicked to mimic its active state

function activeLink() {
  const links = document.querySelectorAll("nav ul a");
  links.forEach((link) => {
    if (link.pathname === global.currentPage) {
      link.firstElementChild.classList.add("active");
    }
  });
}

//Alert Function
function showAlert(message, type = "error") {
  const parentDiv = document.querySelector("#alert");
  const alertDiv = document.createElement("div");
  alertDiv.appendChild(document.createTextNode(message));

  if (type === "error") {
    alertDiv.classList.add("error");
    parentDiv.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }
  if (type === "success") {
    alertDiv.classList.add("success");
    parentDiv.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }
}

//loader operations

function showLoader() {
  document
    .getElementById("loader-container")
    .classList.replace("hidden", "flex");
}

function hideLoader() {
  document
    .getElementById("loader-container")
    .classList.replace("flex", "hidden");
}

async function getMovieDetails() {
  const movieId = window.location.search.split("=")[1];

  const {
    homepage,
    title,
    vote_average,
    backdrop_path,
    release_date,
    overview,
    genres,
    budget,
    revenue,
    runtime,
    status,
    poster_path,
    production_companies,
  } = await fetchAPIData(`movie/${movieId}`);

  const div = document.querySelector("#movie-details");

  displayBackdropImage("movie", backdrop_path);

  div.innerHTML = `
   <section class="container mx-auto p-3 ">
          <div
            class="flex flex-col items-center justify-center lg:flex-row lg:gap-10 gap-2"
          >
            <div class="w-full lg:w-[40%] border-2 border-white ">
            ${
              poster_path
                ? `
             <img
               src='https://image.tmdb.org/t/p/original${poster_path}'
                alt="image placeholder"
                class="object-cover w-full h-full"
              />
            
            `
                : `
                 <img
                src="../images/No-Image-Placeholder.svg.png"
                alt="image placeholder"
                class="object-cover w-full h-full"
              />`
            }
            </div>
            <div
              class="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-2"
            >
              <h1 class="font-bold tracking-wider text-center uppercase text-3xl">
                ${title}
              </h1>
              <div class="flex items-center mb-2">
                <img
                  src="../images/star.png"
                  alt="star"
                  height="20"
                  width="20"
                />
                <span class="ml-2">${vote_average.toFixed(1)} / 10</span>
              </div>
              <h2>Release Date: ${release_date}</h2>
              <p class="text-justify p-1">
               ${overview}
              </p>
              <h2 class="font-bold  tracking-wider">Genres</h2>
              ${genres.map((genre) => `<h3>${genre.name}</h3>`).join("")}
              <a href="${homepage}" target="_blank" rel="noopener noreferrer"  class="self-center border-solid border-2 border-yellow-400 py-2 px-5 mt-4  rounded-md hover:scale-[1.04] transition duration-150 hover:ease-in  ">Visit Movie HomePage</a>
            </div>
          </div>
        </section>
       
  `;

  const article = document.querySelector(".movie-info");
  article.innerHTML = `
   <h1 class="font-extrabold text-center uppercase">Movie Info</h1>
        <div class="my-1 mx-auto w-[98%]">
          <div>
            <span
              class="block pb-2 pl-2 mt-2 font-medium text-center text-yellow-400 border-b-2 border-slate-10 md:text-left"
              >Budget: <strong class="text-white">${
                budget === 0 ? "N/A" : "$" + addCommas(budget)
              }</strong>
            </span>

            <span
              class="block pb-2 pl-2 mt-2 font-medium text-center text-yellow-400 border-b-2 border-slate-10 md:text-left"
              >Revenue: <strong class="text-white">${
                revenue === 0 ? "N/A" : "$" + addCommas(revenue)
              }</strong>
            </span>

            <span
              class="block pb-2 pl-2 mt-2 font-medium text-center text-yellow-400 border-b-2 border-slate-10 md:text-left"
              >Runtime: <strong class="text-white">${runtime} minutes</strong>
            </span>
            <span
              class="block pb-2 pl-2 mt-2 font-medium text-center text-yellow-400 border-b-2 border-slate-10 md:text-left"
              >Status: <strong class="text-white">${status}</strong>
            </span>
          </div>
          <br />
          <div>
            <h1 class="pl-2 font-bold tracking-wider ">Production Companies</h1>
              ${production_companies
                .map((company) => `<h3 class="pl-2">${company.name}</h3>`)
                .join("")}
            
          </div>
        </div>
  `;
}

//Display show details
async function getShowDetails() {
  const tvId = window.location.search.split("=")[1];

  const show = await fetchAPIData(`tv/${tvId}`);
  const {
    name,
    poster_path,
    backdrop_path,
    first_air_date,
    number_of_episodes,
    genres,
    homepage,
    id,
    last_episode_to_air,
    status,
    vote_average,
    overview,
    production_companies,
  } = show;

  const div = document.querySelector("#show-details");

  displayBackdropImage("show", backdrop_path);

  div.innerHTML = `
   <section class="container mx-auto p-3 ">
          <div
            class="flex flex-col items-center justify-center lg:flex-row lg:gap-10 gap-2"
          >
            <div class="w-full lg:w-[40%] border-2 border-white ">
            ${
              poster_path
                ? `
             <img
               src='https://image.tmdb.org/t/p/original${poster_path}'
                alt="${name}"
                class="object-cover w-full h-full"
              />
            
            `
                : `
                 <img
                src="../images/No-Image-Placeholder.svg.png"
                alt="image placeholder"
                class="object-cover w-full h-full"
              />`
            }
            </div>
            <div
              class="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-2"
            >
              <h1 class="font-bold tracking-wider text-center uppercase text-3xl">
                ${name}
              </h1>
              <div class="flex items-center mb-2">
                <img
                  src="../images/star.png"
                  alt="star"
                  height="20"
                  width="20"
                />
                <span class="ml-2">${vote_average.toFixed(1)} / 10</span>
              </div>
              <h2>First Air Date:  ${first_air_date}</h2>
              <p class="text-justify p-1">
               ${overview}
              </p>
              <h2 class="font-bold  tracking-wider">Genres</h2>
              ${genres.map((genre) => `<h3>${genre.name}</h3>`).join("")}
              <a href='${homepage ? homepage : "#"}'
              target="_blank" rel="noopener noreferrer"
            onclick="${
              homepage ? "" : "alert('No homepage available.'); return false;"
            }"
              class="self-center border-solid border-2 border-yellow-400 py-2 px-5 mt-4  rounded-md hover:scale-[1.04] transition duration-150 hover:ease-in  ">Visit Show HomePage</a>
            </div>
          </div>
        </section>
       
  `;

  const article = document.querySelector("#show-info");
  article.innerHTML = `
   <h1 class="font-extrabold text-center uppercase">Show Info</h1>
        <div class="my-1 mx-auto w-[98%]">
          <div>
            <span
              class="flex flex-wrap gap-2 pb-2 pl-2 mt-2 font-medium text-center text-yellow-400 border-b-2 border-slate-10 md:text-left"
              >Number of Episodes: <strong class="text-white"> ${number_of_episodes}</strong>
            </span>

            <span
              class=" pb-2 pl-2 mt-2 font-medium gap-2 flex flex-wrap text-center text-yellow-400 border-b-2 border-slate-10 md:text-left"
              >Last Episode To Air: <strong class="text-white"> ${
                last_episode_to_air.name
              } , ${last_episode_to_air.air_date}
              </strong>
            </span>

            <span
              class="flex flex-wrap gap-2 pb-2 pl-2 mt-2 font-medium text-center text-yellow-400 border-b-2 border-slate-10 md:text-left"
              >Status: <strong class="text-white"> ${status}</strong>
            </span>
           
          </div>
          <br />
          <div>
            <h1 class="pl-2 font-bold tracking-wider ">Production Companies</h1>
              ${production_companies
                .map((company) => `<h3 class="pl-2">${company.name}</h3>`)
                .join("")}
            
          </div>
        </div>
  `;
}

async function getPopularMovies() {
  const popularMovies = await fetchAPIData("movie/popular").then(
    (res) => res.results
  );

  popularMovies.forEach((movie) => {
    const { id, title, poster_path, release_date } = movie;

    const ul = document.querySelector("#popular-movies-container");

    const anchor = document.createElement("a");
    anchor.setAttribute("href", `./movie-details.html?id=${id}`);
    anchor.innerHTML = `
    <li class="movie-card" >
        <div class='flex items-center justify-center h-auto w-[400px]'>
              ${
                poster_path
                  ? `
            <img
            src='https://image.tmdb.org/t/p/w500${poster_path}'
            alt="${title}"
            class="border-2 border-white"
             height="350"
            width="350"
            
           
                />
                    `
                  : `
            <img
            src='../images/No-Image-Placeholder.svg.png'
            alt="${title}"
            height="350"
            width="350"
          />
                    `
              }
                
        </div>
       <div class="flex flex-col items-center gap-3 pt-2">
            <p class="text-center">${title}</p>
            <p class="text-center">Release: ${release_date}</p>
        </div>
      </li>
    `;
    ul.appendChild(anchor);
  });
}

async function getPopularTVShows() {
  const popularTVShows = await fetchAPIData("tv/popular").then(
    (res) => res.results
  );

  popularTVShows.forEach((show) => {
    const { id, name, poster_path, first_air_date } = show;

    const ul = document.querySelector("#popular-shows-container");

    const anchor = document.createElement("a");
    anchor.setAttribute("href", `./tv-details.html?id=${id}`);
    anchor.innerHTML = `
    <li class="movie-card" >
        <div class='flex items-center justify-center h-auto w-[350px]'>
              ${
                poster_path
                  ? `
            <img
            src='https://image.tmdb.org/t/p/w500${poster_path}'
            alt="${name}"
            class="border-2 border-white"
            height="350"
            width="350"/>`
                  : `<img
            src='../images/No-Image-Placeholder.svg.png'
            alt="${name}"
            height="300"
            width="300"
          />
                    `
              }
                
        </div>
       <div class="flex flex-col items-center gap-3 pt-2">
            <p class="text-center">${name}</p>
            <p class="text-center">Release: ${first_air_date}</p>
        </div>
      </li>
    `;
    ul.appendChild(anchor);
  });
}

//Display Slider Movies

async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");

  results.forEach((result) => {
    const { id, poster_path, vote_average, title } = result;

    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
    <div class="flex flex-col items-center justify-center gap-3 border-2 border-white bg-slate-800">

       <a href="./movie-details.html?id=${id}">
                <img
                  src='https://image.tmdb.org/t/p/original${poster_path}'
                  alt=${title}
                  class='border-2 border-white object-cover h-full w-full'
                  height='350'
                  width='350'
                />
              </a>
              <div class="flex items-center mb-2 ">
                <img
                  src="../images/star.png"
                  alt="star"
                  height="20"
                  width="20"
                />
                <span class="ml-2"> ${vote_average.toFixed(1)} / 10</span>
              </div>
    
    </div>`;

    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

// Search functionality on user inputs

// Add an event listener to the form's submit event

async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get("type");
  global.search.userInput = urlParams.get("user-input");

  if (global.search.userInput !== "" && global.search.userInput !== null) {
    const { results, total_pages, page, total_results } =
      await fetchSearchDataAPI();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No results found");
      return;
    }
    displaySearchResults(results);
    document.querySelector("#user-input").value = "";
  } else {
    showAlert("Please enter a valid input");
  }
}

//Search results display
async function displaySearchResults(results) {
  //clearing previous results
  document.querySelector("#search-container").innerHTML = "";
  document.querySelector("#search-result-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";
  results.forEach((result) => {
    const ul = document.querySelector("#search-container");
    const anchor = document.createElement("a");
    anchor.setAttribute(
      "href",
      `./${global.search.type}-details.html?id=${result.id}`
    );
    anchor.innerHTML = `
     <li class="movie-card" >
      <div class='flex items-center justify-center h-auto w-[400px]'>
            ${
              result.poster_path
                ? `
          <img
          src='https://image.tmdb.org/t/p/original${result.poster_path}'
          alt="${global.search.type === "movie" ? result.title : result.name}"
          class="border-2 border-white object-cover"
           height="350"
          width="350"
              />
                  `
                : `
          <img
          src='../images/No-Image-Placeholder.svg.png'
           alt="${global.search.type === "movie" ? result.title : result.name}"
          height="350"
          width="350"
          class='object-cover'
        />
                  `
            }
      </div>
     <div class="flex flex-col items-center gap-3 pt-2">
         <div class="flex flex-col items-center gap-3 pt-2">
            <p class="text-center">${
              global.search.type === "movie" ? result.title : result.name
            }</p>

            ${
              result.release_date || result.first_air_date
                ? `
            <p class="text-center">Release: ${
              global.search.type === "movie"
                ? result.release_date
                : result.first_air_date
            }</p>
            
            `
                : "Release: N/A"
            }
            
        </div>
         
      </div>
    </li>
    `;
    document.querySelector("#search-result-heading").innerHTML = `
     <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.type} "${global.search.userInput}"</h2>
    `;

    ul.appendChild(anchor);
  });

  displayPagination();
}

//Create and display pagination

function displayPagination() {
  const div = document.createElement("div");
  div.innerHTML = `
          <div >
          <button
            class="border-solid border-2 border-yellow-300 px-5 py-2 ml-4 rounded-md text-lg hover:scale-[1.04] transition duration-150 hover:ease-in"
            id='prev'
            
          >
            Prev
          </button>
          <button
            class="border-solid border-2 border-yellow-300 px-5 py-2 ml-4 rounded-md text-lg hover:scale-[1.04] transition duration-150 hover:ease-in"
            id="next"
          >
            Next
          </button>
          </div>
        <p class="text-xl mt-5">Page ${global.search.page} of ${global.search.totalPages}</p> 
  `;

  document.querySelector("#pagination").appendChild(div);

  //disabling prev if on first page
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  //disabling next if on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  //Next page functionality
  document.querySelector("#next").addEventListener("click", async (e) => {
    e.preventDefault();
    global.search.page++;

    const { results } = await fetchSearchDataAPI();

    displaySearchResults(results);
  });

  //Prev page functionality
  document.querySelector("#prev").addEventListener("click", async (e) => {
    e.preventDefault();
    global.search.page--;
    const { results, total_pages } = await fetchSearchDataAPI();

    displaySearchResults(results);
  });
}

//Display slider movies section
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      375: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    },
  });
}

// Displaying backdrop on movie/show details page
function displayBackdropImage(type, imagePath) {
  const backdropDiv = document.createElement("div");

  let classesToAdd = [
    "overlay",
    "absolute",
    "top-0",
    "left-0",
    "bg-center",
    "bg-cover",
    "bg-no-repeat",
    "-z-10",
    "opacity-10",
    "h-full",
    "w-full",
  ];

  backdropDiv.classList.add(...classesToAdd);
  backdropDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${imagePath})`;

  if (type === "movie") {
    document.querySelector("#movie-details-main").appendChild(backdropDiv);
  } else {
    document.querySelector("#tv-details-main").appendChild(backdropDiv);
  }
}

async function fetchAPIData(endpoint) {
  const baseUrl = global.api.baseUrl;
  const apiKey = global.api.apiKey;

  showLoader();

  const response = await fetch(
    `${baseUrl}${endpoint}?api_key=${apiKey}&language=en-US`
  );

  const data = await response.json();

  hideLoader();

  return data;
}

async function fetchSearchDataAPI() {
  const baseUrl = global.api.baseUrl;
  const apiKey = global.api.apiKey;

  showLoader();

  const response = await fetch(
    `${baseUrl}search/${global.search.type}?api_key=${apiKey}&language=en-US&query=${global.search.userInput}&page=${global.search.page}`
  );

  const data = await response.json();

  hideLoader();

  return data;
}

function addCommas(number) {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function initialLoading() {
  switch (global.currentPage) {
    case "/dist/index.html":
      getPopularMovies();
      displaySlider();
      break;
    case "/dist/shows.html":
      getPopularTVShows();
      break;
    case "/dist/tv-details.html":
      getShowDetails();
      break;
    case "/dist/movie-details.html":
      getMovieDetails();
      break;
    case "/dist/search.html":
      search();

      break;
  }

  activeLink();
}

document.addEventListener("DOMContentLoaded", initialLoading);

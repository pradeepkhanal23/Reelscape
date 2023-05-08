// example api request
// https://api.themoviedb.org/3/movie/550?api_key=863e6b16482d1bfa21ee50f9fcd54b5e

//Storing pathnames as we need to know which page we are in by accessing the window's location pathname property
const globalRouter = {
  currentPage: window.location.pathname,
};

//a function to change the styling of the link when its clicked to mimic its active state

function activeLink() {
  const links = document.querySelectorAll("nav ul a");
  links.forEach((link) => {
    if (link.pathname === globalRouter.currentPage) {
      link.firstElementChild.classList.add("active");
    }
  });
}

async function getMovieDetails() {
  const movieId = window.location.search.split("=")[1];

  const {
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

  const movie = await fetchAPIData(`movie/${movieId}`);
  console.log(movie);

  const div = document.querySelector(".movie-details");
  div.innerHTML = `
   <section class="container mx-auto p-3">
          <div
            class="flex flex-col items-center justify-center lg:flex-row lg:gap-10 gap-2"
          >
            <div class="w-full lg:w-[40%] border-2 border-white ">
            ${
              poster_path
                ? `
             <img
               src='https://image.tmdb.org/t/p/w500${poster_path}'
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
              <h1 class="font-bold tracking-wider text-center uppercase">
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
              <h2 class="font-bold">Genres</h2>
              <h3>${genres[0].name}</h3>
              <h3>${genres[1].name}</h3>
              <h3>${genres[2].name}</h3>
             
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
              >Budget: <strong class="text-white">$${budget}</strong>
            </span>

            <span
              class="block pb-2 pl-2 mt-2 font-medium text-center text-yellow-400 border-b-2 border-slate-10 md:text-left"
              >Revenue: <strong class="text-white">$${revenue}</strong>
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
            <h3 class="pl-2 font-medium">Production Companies</h3>
            <span class="pl-2 text-md">${production_companies[0].name},</span>
            <span class="pl-2 text-md">${production_companies[1].name},</span>
            <span class="pl-2 text-md">${production_companies[2].name}</span>
           
          </div>
        </div>
  `;
}

async function getPopularMovies() {
  const popularMovies = await fetchAPIData("movie/popular").then(
    (res) => res.results
  );
  console.log(popularMovies);
  popularMovies.forEach((movie) => {
    const { id, title, poster_path, release_date } = movie;

    const ul = document.querySelector("#popular-movies-container");

    const anchor = document.createElement("a");
    anchor.setAttribute("href", `./movie-details.html?id=${id}`);
    anchor.innerHTML = `
    <li class="movie-card" >
        <div class='flex items-center justify-center h-auto w-[350px]'>
              ${
                poster_path
                  ? `
            <img
            src='https://image.tmdb.org/t/p/w500${poster_path}'
            alt="${title}"
            class="border-2 border-white"
            
           
                />
                    `
                  : `
            <img
            src='../images/No-Image-Placeholder.svg.png'
            alt="${title}"
            height="300"
            width="300"
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

async function fetchAPIData(endpoint) {
  // example api request
  // https://api.themoviedb.org/3/movie/550?api_key=863e6b16482d1bfa21ee50f9fcd54b5e
  const baseUrl = "https://api.themoviedb.org/3/";
  const apiKey = "863e6b16482d1bfa21ee50f9fcd54b5e";

  const response = await fetch(
    `${baseUrl}${endpoint}?api_key=${apiKey}&language=en-US`
  );

  const data = await response.json();

  return data;
}

function initialLoading() {
  switch (globalRouter.currentPage) {
    case "/dist/index.html":
      getPopularMovies();
      break;
    case "/dist/shows.html":
      break;
    case "/dist/tv-details.html":
      break;
    case "/dist/movie-details.html":
      getMovieDetails();
      break;
    case "/dist/search.html":
      break;
  }

  activeLink();
}

document.addEventListener("DOMContentLoaded", initialLoading);

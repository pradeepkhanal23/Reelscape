# Reelscape

Reelscape is a movie app project inspired by Brad Traversy's JS course. It leverages the TMDB API to fetch movie data and provides a search functionality, a visually stunning Netflix-like backdrop display, and a mobile-friendly design. The project is built using Vanilla JS and Tailwind CSS.

![Reelscape Screenshot](/images/reelscape.png)

## Features

- Search for movies using keywords
- Display movie details including title, overview, release date, and rating
- Show movie backdrop images in a visually pleasing manner
- Responsive design for optimal viewing on mobile devices

## Technologies Used

- HTML
- CSS (with Tailwind CSS)
- JavaScript (ES6)
- TMDB API (https://www.themoviedb.org/documentation/api)

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/pradeepkhanal23/Reelscape.git
   ```
2. Open the project folder in your preferred code editor.
3. Obtain an API key from the [TMDB website](https://www.themoviedb.org/documentation/api) by creating an account and generating an API key.
4. Create a `config.js` file in the project's root directory.
5. In the `config.js` file, add the following code:
   ```javascript
   const API_KEY = "YOUR_API_KEY";
   ```
   Replace `'YOUR_API_KEY'` with your actual TMDB API key.
6. Save the `config.js` file.
7. Launch the project by opening the `index.html` file in your web browser.

## Usage

1. Open the application in your web browser.
2. Use the search bar to enter keywords for the movie you want to find.
3. The application will display the movie results based on your search query.
4. Click on a movie to view its details, including title, overview, release date, and rating.
5. Enjoy the visually appealing backdrop display reminiscent of Netflix.
6. The application is fully responsive and optimized for mobile viewing.

## Credits

- Brad Traversy for the course that inspired this project (Course Name: [Modern JavaScript 2.0 Course], Website: [https://www.traversymedia.com/modern-javascript-2-0])
- TMDB API for providing the movie data (Website: [https://www.themoviedb.org/](https://www.themoviedb.org/))
- Tailwind CSS for the responsive and mobile-friendly styling (Website: [https://tailwindcss.com/](https://tailwindcss.com/))

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

Ideally the API key should be stored inside an env variable however in this case its a free public api to use so I have deployed the api key as a regular fetch without any encryption.

This project is for educational purposes only and does not endorse or promote any specific movies or movie-related content. The movie data displayed is sourced from the TMDB API and may be subject to copyright restrictions.

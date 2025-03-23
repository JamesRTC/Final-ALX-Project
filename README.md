###Just Watch
Just Watch is a React-based web application that allows users to explore movies and TV series using The Movie Database (TMDb) API. The app provides features like search, pagination, authentication, and state management for a seamless browsing experience.

##Features
Home Page – Displays trending and featured content.

Movies Page – Shows a list of movies.

Series Page – Displays popular TV series.

Popular Page – Highlights trending movies and shows.

Search Functionality – Users can search for movies and TV shows.

Pagination – Content is loaded in pages for better navigation.

Authentication – Users can register and log in.

State Management – Uses Zustand and Context API for global state.

Data Fetching – Uses React Query to efficiently fetch data from the TMDb API.

##Technologies Used
React – For building the UI.

React Router – For navigation and routing.

TMDb API – For fetching movie and TV show data.

React Query – For efficient API data fetching and caching.

Zustand & Context API – For global state management.

Tailwind CSS – For styling and layout.

##Folder Structure

just-watch/
│── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components (Home, Movies, Series, Popular)
│ ├── context/ # Context API for global state
│ ├── store/ # Zustand store
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Helper functions
│ ├── AppRouter.js # Application routing
│ ├── App.js # Main app component
│ ├── index.js # Entry point
│── public/ # Static files
│── .env # Environment variables
│── package.json # Dependencies and scripts
API Usage
The app fetches movie and series data from TMDb API. You need to create an account on The Movie Database and get an API key. The API key should be stored in your .env file as shown above.

##License
This project is open-source and available under the MIT License.

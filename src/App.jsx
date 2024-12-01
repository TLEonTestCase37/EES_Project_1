import React, { useState } from "react";
import axios from "axios";

// const API_KEY = ;

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: "7be507bdd81d780b68cbff43956d94fa",
            query: query,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="w-full h-full p-5 gap-3 font-sans flex flex-col items-center bg-slate-500">
      <div className="font-extrabold text-center text-4xl">Movie Search</div>
      <form onSubmit={searchMovies} className="flex gap-2">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2.5 w-72 rounded-md"
        />
        <button
          type="submit"
          className="px-2 py-3 bg-orange-300 rounded-md"
        >
          Search
        </button>
      </form>
      <div className="flex flex-col gap-2 items-center justify-center w-screen p-5">
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-4/5 rounded"
                />
                <h2 className="font-bold text-lg mt-4 text-center">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-600 text-center">
                  {movie.release_date?.split("-")[0]}
                </p>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {movie.overview?.length > 100
                    ? `${movie.overview}...`
                    : movie.overview}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-lg text-center">
            Please enter the name of movies you want to look for!!!
          </p>
        )}
      </div>
    </div>
  );
};

export default App;

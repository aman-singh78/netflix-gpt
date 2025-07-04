import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import client from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    const gptQuery =
      "Based on this search: " +
      searchText.current.value +
      ", respond with exactly 5 movie names, comma-separated. Do not include any extra words, no explanations, no numbering. Only return the list. Example output: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await client.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",

      messages: [{ role: "user", content: gptQuery }],
    });

    console.log(gptResults.choices[0]?.message?.content);
    const gptMovies = gptResults.choices[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie)); //[promise,promise,promise,promise,promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[5%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-10"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="py-2 px-4 m-4  bg-red-700 text-white rounded-lg col-span-2"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

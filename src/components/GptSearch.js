import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMoviesSuggestion from "./GptMoviesSuggestion";
import { BG_IMG } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img className="" src={BG_IMG} alt="logo" />
      </div>
      <GptSearchBar />
      <GptMoviesSuggestion />
    </div>
  );
};

export default GptSearch;

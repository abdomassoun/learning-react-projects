import { useEffect, useState } from "react";

const KEY = "7701c516";



export function useMovies(query,callback){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(
        function () {
            callback?.();
        const controller = new AbortController();
          async function fetchMovie() {
            try {
              setIsLoading(true);
              setError("");
              const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
              );
              if (!res.ok) throw new Error("Something went wrong");
    
              const data = await res.json();
              if (data.Response === "False") throw new Error("Movie not found");
    
              setMovies(data.Search);
              
              setError("");
    
            } catch (err) {
              console.error(err.message);
              if(err.message!=="AbortError")
              setError(err.message);
            } finally {
              setIsLoading(false);
            }
          }
          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
    
          fetchMovie();
    
          return function(){
            controller.abort();
          }
        },
        [query]
      );

      return {movies,isLoading,error}
}
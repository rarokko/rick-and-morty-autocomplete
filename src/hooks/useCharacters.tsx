import { useEffect, useState } from "react";

const API_URL = 'https://rickandmortyapi.com/api/character';

type Character = {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: {
    name: string,
    url: string
  },
  location: {
    name: string,
    url: string
  },
  image: string,
  episode: Array<string>,
  url: string,
  created: string
}

type ApiResponse = {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string
  };
  results: Array<Character>
}

type UseCharactersReturn = {
  clearSuggestions: () => void;
  results: Array<Character>;
  setSkip: (skip: boolean) => void;
}

const useCharacters = (text: string): UseCharactersReturn => {
  const [results, setResults] = useState<Array<Character>>([]);
  const [skip, setSkip] = useState<boolean>(false);

  const searchForCharacters = async (text: string): Promise<void> => {
    try {
      const response: ApiResponse = await (await fetch(`${API_URL}?name=${text}`)).json();
      setResults(response.results);
    } catch (e) {
      setResults([]);
    }
  }

  useEffect(() => {
    if (!text || skip) {
      setResults([]);
      return;
    }

    const debounce = setTimeout(() => searchForCharacters(text), 500);
    return () => clearTimeout(debounce);
  }, [text, skip]);

  return {
    clearSuggestions: () => setResults([]),
    results,
    setSkip,
  };
}

export default useCharacters;

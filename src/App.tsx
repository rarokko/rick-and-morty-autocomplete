import { ChangeEvent, ReactElement, useState } from 'react';
import './App.css';
import useCharacters from './hooks/useCharacters';

const App = (): ReactElement => {
  const [searchText, setSearchText] = useState<string>('');
  const { clearSuggestions, results, setSkip } = useCharacters(searchText);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
    clearSuggestions();
    setSkip(false);
  }

  const handleSuggestionClick = (name: string): void => {
    setSkip(true);
    setSearchText(name);
    clearSuggestions();
  }

  const highlightWord = (name: string): string => (
    name.replace(new RegExp(searchText, "gi"), (match) => `<span class="highlighted-word">${match}</span>`)
  )

  return (
    <div className="main">
      <h1>Search for Rick and Morty characters</h1>
      <div className="input-wrapper">
        <input 
          className="search-input"
          onChange={handleChange}
          placeholder="Start typing here"
          value={searchText}  
        />
        {Boolean(results.length) &&
          <div className="suggestions-list">
            {results.map(item => 
              <button
                dangerouslySetInnerHTML={{ __html: highlightWord(item.name) }}
                key={item.id} 
                onClick={() => handleSuggestionClick(item.name)}
              />
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default App;

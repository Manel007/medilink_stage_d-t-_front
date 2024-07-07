import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Paper, InputBase } from '@mui/material';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/search/${query}`);
        console.log('Response data:', response.data); // Log the response data
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
console.log("lololol",suggestions)
    const debounceFetch = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <Paper component="form" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <InputBase
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          style={{ padding: '8px', width: '100%' }}
        />
      </Paper>
      {suggestions.length > 0 && (
        <Paper style={{ position: 'absolute', width: '100%', maxHeight: '200px', overflowY: 'auto', zIndex: 1 }}>
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem component="div" key={index} style={{ cursor: 'pointer' }}>
                <ListItemText primary={suggestion.firstname || suggestion.Name || suggestion.nomLaboratoire || suggestion.nom} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;

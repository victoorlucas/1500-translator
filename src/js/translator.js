import forEach from 'lodash/forEach';
import json from '../library.json';
import { removeAccent } from './convert.js'; 
import { debounce } from './debounce.js'; 

export const translator = (e) => {
  const $translator = document.querySelector('[data-translator="input"]');
  const $result = document.querySelector('[data-translator="result"]'); 
  const library = json;
  let text; 

  const textTranslate = (e) => { 
    text = $translator.value.toLowerCase();  
    forEach(library, (value, key) => { 
      const regex = new RegExp(removeAccent(key), 'gm'); 
      text = text.replace(regex, value); 
    }); 
    $result.value = text || 'Tradução';  
  };

  $translator.addEventListener('keyup', (e) => debounce(textTranslate(), 600));
}; 

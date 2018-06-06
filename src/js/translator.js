import forEach from 'lodash/forEach';
import json from '../library.json';
import { removeAccent } from './convert.js'; 
import { debounce } from './debounce.js'; 

const generateRandomKey  = (data = []) => Math.floor(Math.random() * (data.length - 0) + 0);
const getRandomText  = (data = [], field) =>{
  const keys = Object.keys(json);
    field.value = keys[generateRandomKey(keys)];
    field.dispatchEvent(new Event('keyup'));
}

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
  
  window.addEventListener('load', () => getRandomText(json, $translator));

}; 


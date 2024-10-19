function searchPokemon(query) {
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(alert("Pokemon not found"));
      }
      return response.json();
    })
    .then(pokemon => {
      console.log(pokemon); // Log for debugging

      // Update text content for each element
      document.getElementById('pokemon-name').textContent = `${pokemon.name.toUpperCase()}`;
      document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;
      document.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
      document.getElementById('height').textContent = `Height: ${pokemon.height}`;
      document.getElementById('hp').textContent = `${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}`;
      document.getElementById('attack').textContent = `${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}`;
      document.getElementById('defense').textContent = `${pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}`;
      document.getElementById('special-attack').textContent = `${pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat}`;
      document.getElementById('special-defense').textContent = `${pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat}`;
      document.getElementById('speed').textContent = `${pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}`;

      // Clear and update types
      const typesElement = document.getElementById('types');
      typesElement.innerHTML = ''; // Clear previous types
      pokemon.types.forEach(typeInfo => {
        const typeSpan = document.createElement('span');
        typeSpan.textContent = typeInfo.type.name.toUpperCase(); 
        typesElement.appendChild(typeSpan);
      });

   
      let imageElement = document.getElementById('sprite');
      if (!imageElement) {
        imageElement = document.createElement('img');
        imageElement.id = 'sprite';
        document.querySelector('section').appendChild(imageElement); 
      }
      imageElement.src = pokemon.sprites.front_default;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      document.getElementById('results').textContent = 'Error: Pokémon not found';
    });
}



document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-input').value.trim().toLowerCase(); // Get user input
  if (query) {
    searchPokemon(query); 
  } else {
    document.getElementById('results').textContent = 'Please enter a search term';
  }
});

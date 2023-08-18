// Definir el estado inicial y las funciones de acción utilizando el patrón Flux
const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		characters: [], // Almacena la lista de personajes
		planets: [], // Almacena la lista de planetas
		urlBase: "https://www.swapi.tech/api", // URL base de la API
		favorito: [], // Almacena la lista de elementos favoritos
	  },
	  actions: {
		// Acción para obtener la lista de personajes
		getCharacters: () => {
		  let store = getStore();
  
		  // Realizar una solicitud GET para obtener la lista de personajes
		  fetch(`${store.urlBase}/people`)
			.then((response) => response.json())
			.then((data) => {
			  for (let person of data.results) {
				// Para cada personaje, obtener detalles adicionales y actualizar el estado
				fetch(`${store.urlBase}/people/${person.uid}`)
				  .then((response) => response.json())
				  .then((data) => {
					setStore({ characters: [...store.characters, data.result] });
				  });
			  }
			})
			.catch((error) => console.log(error));
		},
		// Acción para obtener la lista de planetas utilizando async/await
		getPlanets: async () => {
		  let store = getStore();
		  let response = await fetch(`${store.urlBase}/planets`);
		  let data = await response.json();
  
		  // Para cada planeta, obtener detalles adicionales y actualizar el estado
		  for (let planet of data.results) {
			let response = await fetch(`${store.urlBase}/planets/${planet.uid}`);
			let data = await response.json();
			setStore({ planets: [...store.planets, data.result] });
		  }
		},
  
		// Acción para guardar un elemento en la lista de favoritos
		guardarFavoritos(nombre) {
		  const store = getStore();
		  const favoritos = store.favorito;
		  const newfavoritos = [...favoritos, { name: nombre, id: favoritos.length }];
		  setStore({ favorito: newfavoritos });
  
		  const actions = getActions();
		  const item = { name: nombre, id: favoritos.length };
  
		  // Verificar si el elemento ya está en favoritos y manejar su adición o eliminación
		  if (favoritos.some(fav => fav.name === item.name)) {
			  const updatedFavoritos = favoritos.filter(fav => fav.name !== item.name);
			  setStore({ favorito: updatedFavoritos });
		  } else {
			  setStore({
				  favorito: [...favoritos, item]
			  });
		  }
		},
		
		// Acción para eliminar un elemento de la lista de favoritos
		eliminaFavorito(id){
		  const store = getStore();
		  const fav = store.favorito;
		  const favActualizado = fav.filter((item) => item.id !== id);
		  setStore({favorito: favActualizado})
		}
	  },
	};
  };
  
  export default getState;
  
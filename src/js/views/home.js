// Importar las dependencias y recursos necesarios desde React y otros módulos
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg"; // Importar una imagen (no parece utilizada)
import "../../styles/home.css"; // Importar un archivo de estilos CSS
import { Link } from "react-router-dom"; // Importar componente de enrutamiento

// Definir el componente funcional Home
export const Home = () => {
  // Obtener el estado global y las acciones del contexto usando useContext
  const { store, actions } = useContext(Context);

  // Renderizar el contenido del componente
  return (
    <>
      {/* Sección para mostrar personajes */}
      <div className="container mt-5">
        <h1 className="text-danger">Characters</h1>
        <div className="my-carousel">
          {/* Mapear a través de los personajes en el estado global */}
          {store.characters.map((item) => {
            return (
              <div className="my-card" key={item._id}>
                {/* Mostrar la imagen del personaje */}
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}
                  alt="..."
                />
                <div className="my-body-text">
                  {/* Mostrar información sobre el personaje */}
                  <h3>{item.properties.name}</h3>
                  <p>
                    <strong>Gender: {item.properties.gender}</strong>
                  </p>
                  <p>
                    <strong>Hair color: {item.properties.hair_color}</strong>
                  </p>
                  <p>
                    <strong>Eye-Color: {item.properties.eye_color}</strong>
                  </p>
                </div>
                <div className="my-footer">
                  {/* Enlace para aprender más sobre el personaje */}
                  <Link
                    to={`/characters/${item._id}`}
                    className="btn btn-outline-primary"
                  >
                    Learn more!
                  </Link>
                  {/* Botón para agregar a favoritos */}
                  <button className="btn btn-outline-danger">
                    <i
                      className="fa fa-heart text-danger"
                      onClick={() => {
                        actions.guardarFavoritos(item.properties.name);
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sección para mostrar planetas */}
      <div className="container mt-5">
        <h1 className="text-danger">Planets</h1>
        <div className="my-carousel">
          {/* Mapear a través de los planetas en el estado global */}
          {store.planets.map((item) => {
            return (
              <div className="my-card" key={item.uid}>
                {/* Mostrar la imagen del planeta */}
                {/* {item.uid === 1 ? <img src={"https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png"}  /> : */}
                 <img
                  src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`}
                  alt="..."
                />
                {/* } */}
                <div className="my-body-text">
                  {/* Mostrar información sobre el planeta */}
                  <h3>{item.properties.name}</h3>
                  <p>
                    <strong>Population: {item.properties.population}</strong>
                  </p>
                  <p>
                    <strong>Terrain: {item.properties.terrain}</strong>
                  </p>
                </div>
                <div className="my-footer">
                  {/* Enlace para aprender más sobre el planeta */}
                  <Link
                    to={`/planets/${item._id}`}
                    className="btn btn-outline-primary"
                  >
                    Learn more!
                  </Link>
                  {/* Botón para agregar a favoritos */}
                  <button className="btn btn-outline-danger">
                    <i
                      className="fa fa-heart text-danger"
                      onClick={() => {
                        actions.guardarFavoritos(item.properties.name);
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
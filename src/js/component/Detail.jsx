import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";

const Detail = () => {
  // Obtener el parámetro 'id' de la URL usando react-router
  const { id } = useParams();

  // Obtener el estado global y las acciones del contexto usando useContext
  const { store, actions } = useContext(Context);

  // Obtener los parámetros de la URL nuevamente (esto es redundante)
  const params = useParams();

  // Obtener la ubicación actual (ruta) usando useLocation
  const location = useLocation(); // Obtiene la ruta actual

  // Estado local para almacenar los detalles del personaje o planeta
  const [detail, setDetail] = useState({});

  // Función para buscar y establecer los detalles del personaje o planeta
  const search = () => {
    // Concatenar personajes y planetas, luego buscar el elemento por su '_id'
    let searchDetail = store.characters
      .concat(store.planets)
      .find((item) => item._id === params.id);

    // Actualizar el estado local con los detalles encontrados
    setDetail(searchDetail);
  };

  // Efecto secundario que se ejecuta cuando el estado 'characters' o 'planets' cambia
  useEffect(() => {
    search(); // Llamar a la función de búsqueda para actualizar los detalles
  }, [store.characters, store.planets]);

  // Determinar si estamos en la vista de detalle de un personaje
  const isCharacterDetail = location.pathname.includes("characters");

  return (
    <div className="d-flex justify-content-center">
      <div className="card border-danger mb-3">
        <div className="card-header text-danger">
          <h3>star wars</h3>
        </div>
        <div className="card-body text-danger">
          {/* Mostrar detalles específicos del personaje o planeta */}
          <h5 className="card-title">{detail?.properties?.name}</h5>
          <p className="card-text">{detail?.properties?.gender}</p>
          <p className="card-text">{detail?.properties?.eye_color}</p>
          <p className="card-text">{detail?.properties?.birth_year}</p>
          <p className="card-text">{detail?.properties?.height}</p>
          <p className="card-text">{detail?.properties?.climate}</p>
          <p className="card-text">{detail?.properties?.diameter}</p>
          <p className="card-text">{detail?.properties?.population}</p>
          <p className="card-text">{detail?.properties?.terrain}</p>
          {/* Mostrar la imagen correspondiente al tipo de detalle (personaje o planeta) */}
          {isCharacterDetail ? (
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${detail?.uid}.jpg`}
              alt="Character"
            />
          ) : (
            <img
              src={`https://starwars-visualguide.com/assets/img/planets/${detail?.uid}.jpg`}
              alt="Planet"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;


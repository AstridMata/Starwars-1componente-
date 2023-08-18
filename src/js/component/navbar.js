import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const{store, actions}= useContext(Context)
  return (
    <nav className="navbar navbar-light bg-dark mb-3">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand text-danger mb-0 h1">Star Wars</span>
        </Link>
        <div className="ml-auto">
          <div className="dropdown">
            <button
              className="btn btn-danger dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites {store.favorito.length}
            </button>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {store.favorito.map((item) => {
                return <li><a className="dropdown-item"> <span onClick={() => { actions.eliminaFavorito(item.id) }} className={"fa fa-trash"}></span>{item.name}</a></li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
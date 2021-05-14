import React, { useState, useEffect } from "react";
import axios from "axios";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";

function App() {
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarApi = async () => {
      const url_letra = `https://api.lyrics.ovh/v1/${busquedaLetra.artista}/${busquedaLetra.cancion}`;
      const url_info = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${busquedaLetra.artista}`;

      const [letra, info] = await Promise.all([
        axios.get(url_letra),
        axios.get(url_info),
      ]);
      guardarLetra(letra.data.lyrics);
      guardarInfo(info.data.artists[0]);
    };

    consultarApi();
  }, [busquedaLetra,info]);

  return (
    <div className="App">
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

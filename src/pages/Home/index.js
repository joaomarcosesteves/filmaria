
import { useEffect, useState } from 'react';
import './home.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import { FaBars } from 'react-icons/fa'

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  
  useEffect(()=>{

    async function loadFilmes(){
        const response = await api.get('r-api/?api=filmes')
         console.log(response.data);
        setFilmes(response.data);
    }

    loadFilmes();

  }, []);

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme)=>{
          return(
            <article key={filme.id}>
                <strong> {filme.nome} </strong>
                <img src={filme.foto} alt={filme.nome} />
                <button type="button" > 
                  <FaBars  size={17} color="#FFF" /> 
                  <Link to={`/filme/${filme.id}`}>Acessar</Link>
                </button>
            </article> 
          )
        })}
      </div>
    </div>
  );
 }
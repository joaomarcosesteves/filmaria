import { useEffect, useState } from 'react'
import './filmeStyle.css';
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import {toast} from 'react-toastify'
import { FaYoutube, FaBookmark } from 'react-icons/fa'


export default function Filme(){

    const { id } = useParams();
    const history = useHistory();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {

        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            //console.log(response.data.id);

            if(response.data.length === 0){
                //tentou acessar um id que não existe
                history.replace('/');
            }

            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();

        return () => {
            console.log('COMPONENTE DESMONTADO')
        }

    }, [history, id]);


    function salvaFilme(){
     //   console.log("salvou")
    
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];
    
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.warn('Você já possui este filme salvo!')
            return;
            //Para excução aqui
        }
    
        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme Salvo com sucesso!')
    }


    if(loading){
        return(
            <div className="load">
                <h1> Carregando... </h1>
            </div>
        )     
    }
    return(
        <div className="filme-info">
            <div className="top-content">
                <h1> {filme.nome} </h1>
                <img src={filme.foto} alt={filme.nome} ></img>
            </div>  

            <div className="footer-content"> 
                <h3> Sinopse </h3>
                <p> {filme.sinopse} </p>
            </div>

            <div classN ame="botoes">
        
                <button onClick={salvaFilme} >
                    <FaBookmark  size={15} color="#FFF" id="salvar" />
                    Salvar 
                </button>
                <button>
                    <FaYoutube size={20} color="#FFF" />
                    <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
                    Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}


import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './favoritos.css'
import {toast} from 'react-toastify'
import { FaBars } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'

export default function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function excluiFilme(id){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes))
        toast.success('Filme excluido com sucesso!');
    }

    return(
        <div id="meus-filmes">
            <h1> Meus Filmes Salvos </h1>

            {filmes.length === 0 &&
             <span className="not-filmes"> Você não possui nenhum filme salvo :( <br></br> 
             <Link to={"/"}> Veja nossos Filmes! </Link> </span>
             }

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <div className="card-content"> 
                                <div className="content-left">
                                    <img src={item.foto} alt={item.nome} />
                                    <span>{item.nome}</span>
                                </div>
                                <div className="content-right">
                                    <Link to={`/filme/${item.id}`}>  <FaBars  size={20} color="black"  /> </Link>
                                    <button onClick={() => excluiFilme(item.id)}>  <FaTrashAlt  size={20}  /> </button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};
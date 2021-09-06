
import './header.css';
import { Link } from 'react-router-dom';
import logo1 from './../../assets/logo1.png' 
import filmaria from './../../assets/filmaria.png'


import { FaBookmark } from 'react-icons/fa'

export default function Header(){
  return(
    <header>
      <Link className="logo" to="/" >
        <img className="logo" src={logo1} alt="Logo Projeto" />
      </Link>
      <Link to="/" ><img className="filmaria" src={filmaria} alt="Logo Projeto" /> </Link>
      <Link className="favoritos" to="/favoritos" > <FaBookmark  size={15} color="#FFF" id="salvar" /> Meus Salvos</Link>
    </header>
  )
}
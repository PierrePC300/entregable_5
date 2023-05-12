import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Header from "../components/pokedex_two/Header"
import PokemonCard from "../components/pokedex_two/PokemonCard"

const Pokedex = () => {
  //? Array de pokemones antes de filtrar
  const [pokemons, setPokemons] = useState([])
  //? String para filtrar los pokemones por nombre
  const [pokemonName, setPokemonName] = useState("")
  //? Arreglo de tipos de pokemones posibles
  const [types, setTypes] = useState([])
  //? String del typo de pokemon actual, cambia según el select
  const [currentType, setCurrentType] = useState("")
  //? Pagina actual
  const [currentPage, setCurrentPage] = useState(1);
 //? Estado global donde se almacena el nombre de usuario
  const nameTrainer = useSelector(store => store.nameTrainer)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)

  };

  const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))
  
  const paginationLogic =() =>{
    //Cantidad de pokemones por página
    const POKEMONS_PER_PAGE = 12
    //Pokemones que se muestran en lapágina actual

    const sliceStart= (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE

    const pokemonInPage =  pokemonsByName.slice(sliceStart, sliceEnd)

    //última página
    const lastPage =   Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

    //Bloque actual
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    //Paginas que se muestran en el bloque actual

    const pagesInBlock =[]
    const minPage = (actualBlock -1) * PAGES_PER_BLOCK + 1
    const maxPage = actualBlock * PAGES_PER_BLOCK
    for (let i = minPage; i <= maxPage; i++) {
      if(i <=lastPage){
        pagesInBlock.push(i)
      }
      
    }

    return {pokemonInPage, lastPage, pagesInBlock}

  }

  const {lastPage, pagesInBlock, pokemonInPage} = paginationLogic()

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage -1
    if( newCurrentPage >= 1){
      setCurrentPage(newCurrentPage)
    }
  }
  const handleClickNextPage = () => {
    const newCurrentPage = currentPage +1
    if(newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }



  useEffect(() => {  
    if(!currentType){
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"
   
      axios.get(URL)
        .then((res)=> setPokemons(res.data.results))
        .catch((err)=>console.log(err))
    }
   
  }, [currentType])
  

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type"  
  
    axios.get(URL)
    .then((res)=> {const newTypes = res.data.results.map(type => type.name) 
    setTypes(newTypes)})
    .catch((err)=>console.log(err))
    
  }, [])
  
  useEffect(() => {
    if(currentType){
    const URL = `https://pokeapi.co/api/v2/type/${currentType}/`
    
    axios.get(URL)
    .then((res)=>{
      const pokemonsByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
      setPokemons(pokemonsByType)})
    .catch((err)=>console.log(err))
    }
  }, [currentType])
  
  useEffect(() => {
    
    setCurrentPage(1)
  }, [pokemonName, currentType])
  

  return (
    <section className="min-h-screen">
     <Header/>

     <section className="py-10 px-4  repeat(auto-fill,_minmax(220px,_1fr))] max-w-[1000px] mx-auto">
      <h3 className="font-medium">Welcome {nameTrainer}, here you can find your favorite pokemon</h3>
     
      <form onSubmit={handleSubmit}>
        <div className="py-6">
          <input className="drop-shadow-md w-56" id="pokemonName" type="text"  placeholder="Search your pokemon"/>
          <button className="bg-red-500 p-2 text-white">Search</button>
        </div>
        <div className=" repeat(auto-fill,_minmax(220px,_1fr))] max-w-[1000px] mx-auto">
        <select className="bg-gray-300 drop-shadow-lg" onChange={(e) => setCurrentType(e.target.value)}>
          <option  value="">All Pokemons</option>
          {
            types.map(type=> <option className="capitalize" value={type} key={type}>{type}</option>)
          }
        </select>
        </div>
      </form> 
     </section>



     {/*seccion de lista de pokemons */}
     <div>
     <section className="px-2 grid gap-2 auto-rows-auto 
      grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] max-w-[1000px] mx-auto">
      {pokemonInPage.map((pokemon) => (
        <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
         
      ))}
     </section>
     </div>
 {/*Paginación */}

<ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">

{/*Primera página*/}
<li onClick={()=> setCurrentPage(1)} className="p-3 bg-sky-600 fon-bold text-white rounded-md 
 cursor-pointer ">{"<<"}</li>

{/*Página anterior */}
<li onClick={handleClickPreviusPage} className="p-3 bg-sky-600 fon-bold text-white rounded-md 
  cursor-pointer ">{"<"}</li>
  {/*Lista de páginas */}
{
  pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} 
  className={`p-3 bg-sky-600 fon-bold text-white rounded-md 
  cursor-pointer ${numberPage == currentPage && "bg-sky-300"}`}  key={numberPage}>{numberPage}</li>)
}
{/*Página posterior */}
<li onClick={handleClickNextPage} className="p-3 bg-sky-600 fon-bold text-white rounded-md 
  cursor-pointer">{">"}</li>
{/*Última Página */}
<li onClick={() => setCurrentPage(lastPage)} className="p-3 bg-sky-600 fon-bold text-white rounded-md 
  cursor-pointer hover:bg-sky-400">{">>"}</li>
</ul>
    </section>

  )
}

export default Pokedex
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const bordersByType = {
  grass: "border-green-500",
  fire: "border-red-500",
  water: "border-blue-700",
  bug: "border-yellow-900",
  normal: "border-purple-900",
  electric:"border-yellow-400",
  fighting:"border-teal-700",
  flying:"border-indigo-700",
  poison: "border-gray-700",
  ground:"border-cyan-700",
  rock:"border-rose-800",
  ice:"border-orange-900",
  steel:"border-violet-500",
  ghost:"border-green-500",
  psychic:"border-red-800",
  dark:"border-teal-200",
  dragon:"border-pink-400",
  fairy:"border-sky-200"


}


const backgroundByType ={
  grass: "from-green-500 to-green-300",
  fire: "from-red-500 to-yellow-400 ",
  water: "from-blue-700 to-sky-500 ",
  bug: "from-yellow-900 to-yellow-100 ",
  normal: "from-purple-900 to-blue-400 ",
  electric:"from-yellow-400 to-yellow-100",
  fighting:"from-teal-700 to-teal-300",
  flying:"from-indigo-700 to-indigo-300",
  poison:"from-gray-700 to-gray-400",
  ground:"from-cyan-600 to-cyan-300",
  rock:"from-rose-700 to-violet-300",
  ice:"from-orange-900 to-lime-300",
  steel:"from-violet-500 to-green-400",
  ghost:"from-green-500 to-violet-400",
  psychic:"from-red-900 to-purple-300",
  dark:"from-teal-200 to-red-600",
  dragon:"from-pink-400 to-purple-600",
  fairy:"from-sky-200 to-yellow-400"
}

const PokemonCard = ({pokemonUrl}) => {
  
  const [pokemon, setPokemon] = useState()
  
  const types = pokemon?.types.slice(0,2).map(type => type.type.name).join(" / ")

  useEffect(() => {
    
    axios.get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <NavLink  to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${bordersByType[pokemon?.types[0].type.name]}`}>
  
     {/*Seccion superior*/}
     <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
      <div className="absolute -bottom-12 w-[200px] left-1/2-translate-x-1/2">
        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
      </div>
     </section>

      {/*Seccion inferior */}
      <section>
        <h3 className="mt-10 font-bold uppercase text-red-600/100">{pokemon?.name}</h3>
        <h4 className="capitalize">{types}</h4>
        <span>Type</span>
        <hr/>

        <section className="grid grid-cols-3 gap-2 p-2 capitalize">
          {pokemon?.stats.map(stat =>(
              <div key={stat.stat.name}>
                <h5 className="text-gray-400 truncate">{stat.stat.name}</h5>
                <span className="font-semibold">{stat.base_stat}</span>
              </div>
            ))
          }
        </section>
      </section>
    </NavLink>
  )
}

export default PokemonCard
import { useDispatch } from "react-redux"
import { setNameTrainer } from "../../store/slices/nameTrainer.slice"

const Header = () => {
  const dispatch = useDispatch()

  const handleClickLogout =() => {

  dispatch(setNameTrainer(""))
  }
  return (
    
 <section className="relative">
    <div className='h-20 bg-red-600 grid items-end'>
      <div className="max-w-[200px] sm:max-w-[300px] ml-2) pl-4">
    
        <img src="/images/pokedex.png" alt="" />
      </div>
    </div>

    <div className='h-12 bg-black'></div>

    <div className="h-20 aspect-square rounded-full bg-white 
    border-[8px] border-black absolute -bottom-4 right-0 
    -translate-x-1/2 after:content-[''] after:h-12 
    after:aspect-square after:rounded-full after:bg-gray-700 
    after:absolute after:border-[7px] after:border-black 
    after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
      <p onClick={handleClickLogout} className="absolute left-1/2 -top-6 font-serif text-xl -translate-x-1/2 -translate-y-1/2 
      text-green-400 hover:text-blue-500 cursor-pointer uppercase font-semibold">Salir</p>
    </div>
  </section>
  )
}
 
export default Header 
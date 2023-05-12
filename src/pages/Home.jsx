import { useDispatch } from "react-redux"
import Footer from "../components/Footer"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const handleSubmit =(e)=>{
    e.preventDefault()
    dispatch(setNameTrainer(e.target.nameTrainer.value))
    navigate("/pokedex")
  }
  
  return (
    <section className="min-h-screen grid grid-rows-[1fr_auto]">
    
      {/*Parte superior */}
      <section className="text-center">
        <article className="">
          <div className="text-justify pt-4 pl-2">
            <img className=" p-2" src="/images/pokedex.png" alt="" />
          </div>
          <h2 className="font-serif font-semibold pt-6 text-red-500 text-4xl">Hello trainer!</h2>
          <p className="font-medium pb-6 text-lg">Give me your name to start!:</p>
          <form onSubmit={handleSubmit}>
            <input className="shadow-md" id="nameTrainer" type="text" placeholder="Your name..."/>
            <button className="bg-red-500 text-white hover:bg-gray-500 p-2">Start</button>
          </form>
        </article>
      </section>
      {/*footer */}
      <Footer/>
    </section>
  )
}

export default Home

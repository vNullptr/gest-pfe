import React, { useState } from 'react'
import api from '../api/axios'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/img/logo.png'

const Login = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [wrongCredit, setwrongCredit] = useState(false);
  const navigate = useNavigate()

  const login = async (email, password) =>{
    try {
      await api.get('/sanctum/csrf-cookie')
  
      const response = await api.post('/login', {
        "email":email,
        "password":password
      })

    if (response.status == 200){
      navigate("/")
    }
   } catch(err){
      if (err.response) {
        console.log("Server responded with error:", err.response.status)
        if (err.response.status === 401 || err.response.status === 422) {
          setwrongCredit(true)
        }
      } else if (err.request) {
        console.log("No response received")
      } else {
        console.log("Error setting up request:", err.message)
      }
   } finally{
      setEmail("")
      setPassword("")
   }

   return false

  }


  return (
    <div className='flex flex-row min-h-screen overflow-hidden bg-white'>
      <div className="flex flex-col items-center justify-center w-1/2 min-h-screen bg-linear-to-bl from-primary via-[#1976D2] to-secondary shadow-[0_4px_50px_25px_rgba(0,0,0,0.1)] relative overflow-hidden">
        <h1 className="text-white text-5xl  text-center font-[1000]">Bienvenue sur PFE Manager 👋​</h1>
        <a className="absolute text-white -bottom-50 -right-30 font-extrabold opacity-10 text-[30em]">PFE</a>
        <a className="absolute text-white -top-50 -left-30 font-extrabold opacity-10 text-[30em]">PFE</a>
      </div>
      <div className="flex flex-col items-center rounded-[5px] min-w-[400px] py-[30px] w-1/2 p-15 bg-white">
          <form className="space-y-3 flex flex-col justify-center items-center" onSubmit={(e)=>{ 
            e.preventDefault()
            e.stopPropagation()
            login(email, password) 
            }}>
            <img className="w-100" src={logo}></img>
            <h1 className="text-xl font-bold mb-10 w-90">Connectez vous a votre compte !</h1>
            <div className="relative">
              <input id="emailInput" className={`px-3 border border-gray-300 outline-0 rounded-md p-[3px] focus:border-primary w-90 h-11 ${ wrongCredit ? "border-red-500": ""}`} type="email" onChange={(e)=>{ setEmail(e.target.value); setwrongCredit(false); }} value={email}></input>
              <label htmlFor="emailInput" className={`absolute -top-2 left-3 text-gray-400 text-[10px] bg-white px-1 ${ wrongCredit ? "text-red-500": ""}`}>Email</label>
            </div>
            <div className="relative">
              <input id="passInput" className={`px-3 border border-gray-300 outline-0 rounded-md focus:border-primary w-90 h-11 ${ wrongCredit ? "border-red-500": ""}`} type="password" onChange={(e)=>{ setPassword(e.target.value); setwrongCredit(false); }} value={password}></input>
              <label htmlFor="emailInput" className={`absolute -top-2 left-3 text-gray-400 text-[10px] bg-white px-1 ${ wrongCredit ? "text-red-500": ""}`}>Mots de passe</label>
            </div>
            <button className="p-[7px] bg-primary rounded-md text-white font-bold text-[1.1em] text-md shadow-md hover:bg-[#037fc7] transition-all duration-200 w-90 h-12" type="submit">Se connecter</button>
            {wrongCredit && <p className='font-extralight text-[.8em] -mb-2 text-red-500'>Email ou mots de passe invalide.</p>}
            <span className="block w-all h-px bg-gray-300 my-6"></span>
          </form>
      </div>
    </div>
  )
}

export default Login
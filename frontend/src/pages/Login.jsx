import React, { useState } from 'react'
import api from '../api/axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(false);
  const navigate = useNavigate()

  const login = async (email, password) =>{
   await api.get('/sanctum/csrf-cookie')

    const response = await api.post('/login', {
      "email":email,
      "password":password
    })

    if (response.status == 200){
      navigate("/main")
    } else if ( response.status == 401){

    }
  }


  return (
    <div className='flex flex-row items-center min-h-screen overflow-hidden bg-white'>
      <div className="flex flex-col items-center justify-center w-1/2 min-h-screen bg-linear-to-bl from-primary via-[#1976D2] to-secondary shadow-[0_4px_50px_25px_rgba(0,0,0,0.1)] relative overflow-hidden">
        <h1 className="text-white text-5xl  text-center font-[1000]">Bienvenue sur PFE Manager 👋​</h1>
        <a className="absolute text-white -bottom-50 -right-30 font-extrabold opacity-10 text-[30em]">PFE</a>
        <a className="absolute text-white -top-50 -left-30 font-extrabold opacity-10 text-[30em]">PFE</a>
      </div>
      <div className="flex flex-col items-center rounded-[5px] min-w-[400px] py-[30px] w-1/2 space-y-3 p-15">
          <h1 className="text-xl font-bold mb-10 w-90">Connectez vous a votre compte !</h1>
          <div className="relative">
            <input className={`px-3 border border-gray-300 outline-0 rounded-md p-[3px] focus:border-primary w-90 h-11`} type="email" placeholder='Entrez ici' onChange={(e)=>{ setEmail(e.target.value) }}></input>
            <label className="absolute -top-2 left-3 text-gray-400 text-[10px] bg-white px-1">Email</label>
          </div>
          <div className="relative">
            <input className={`px-3 border border-gray-300 outline-0 rounded-md focus:border-primary w-90 h-11`} type="password" placeholder='Entrez ici' onChange={(e)=>{ setPassword(e.target.value) }}></input>
            <label className="absolute -top-2 left-3 text-gray-400 text-[10px] bg-white px-1">Mots de passe</label>
          </div>
          <button className="p-[7px] bg-primary rounded-md text-white font-bold text-[1.1em] text-md shadow-md hover:bg-[#037fc7] transition-all duration-200 w-90 h-12" onClick={()=>{login(email, password)}}>Se connecter</button>
          <span className="block w-70 h-px bg-gray-300 my-6"></span>
      </div>
    </div>
  )
}

export default Login
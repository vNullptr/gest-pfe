import React from 'react'
import logo from '../assets/img/logo.png'

const Navbar = ({View, ChangeView, ViewList}) => {

    const clickHandler = (i) => {
        ChangeView(i)
    }

    return (
    <div className="bg-white min-h-screen min-w-[250px] border-r border-accent z-10 flex flex-col">
        <div className="h-20 flex flex-row items-center justify-center border-b border-accent">
            <img src={logo} className="w-[100px] h-[100px]"></img>
        </div>
        <div className="h-fill px-5 pt-7">
            {ViewList.map((e, index) => {
            const Icon = e.icon
            return (
            <div key={index} 
            onClick={()=>{clickHandler(index)}}
            className={`flex flex-row items-center h-10 w-full text-[15px] font-semibold cursor-pointer rounded-md ${ View == index && "bg-[rgba(141,183,238,0.3)] [&>span]:text-black [&>div]:border-primary"} hover:[&>div]:border-primary hover:[&>span]:text-primary hover:bg-[rgba(141,183,238,0.2)] backdrop-blur-xs transition-all duration-100`}>
                <Icon className={`w-[15px] h-[15px] mr-1.5 text-gray-500 ml-3 ${ View == index && "text-primary"}`}/>
                <span className="text-[.825em] text-gray-500 font-semibold ">{e.name}</span>
            </div>)
            })}
        </div>

    </div>
  )
}

export default Navbar
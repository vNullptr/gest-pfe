import React from 'react'

const Window = ({children, Title}) => {

    const Placeholder = () => (
      <div className="p-6 text-center text-accent opacity-50">Page introuvable</div>
    )
        
    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-99">
            <div className="w-[650px] bg-white rounded-lg overflow-hidden flex flex-col">
                <div className="w-full min-h-10 flex flex-col p-2">
                    <h1 className="text-2xl font-bold m-2">{Title}</h1>
                    <div className="h-px bg-gray-300 mb-2"></div>
                </div>
                {children ?? Placeholder}
            </div>
        </div>
    )
}

export default Window
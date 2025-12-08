import React from 'react'

const Table = ({tableHead, rowData}) => {

  const listElements = []
  for (let i = 0; i < 10; i++) {
    listElements.push(<div className="w-full min-h-20 bg-white rounded-t-[10px]"></div>)
  }

  return (
    <>
      <div className="flex flex-col w-full max-h-[700px] px-2 overflow-y-scroll rounded-[10px] [&>div]:rounded-[10px] gap-3 [&>div]:shadow-[0_0_0_1px_rgba(0,0,0,0.06)] i [&>div]:border-secondary">
        <div className="w-full min-h-10 bg-white rounded-t-[10px] sticky top-0 z-30 mt-1">
          <div></div>
        </div>
        {listElements}
      </div>
    </>
  )
}

export default Table
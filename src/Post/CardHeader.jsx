import React from 'react'
import userPhoto from "/src/assets/placeholder.jpg"
export default function CardHeader({avatar,header,subHeader}) {
  return (
    <div>
        <div className="flex">
        <img onError={(e)=>e.target.src=userPhoto} className=" rounded-full w-10 h-10 mr-3" src={avatar} alt={header} />
        <div>    
            <h3 className="text-md font-semibold ">{header}</h3>
            <p className="text-xs text-gray-500">{subHeader}</p>
        </div>
        </div>
    </div>
  )
}

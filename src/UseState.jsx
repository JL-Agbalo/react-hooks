import React from 'react'
import { useState } from 'react'
function UseState() {
const [car, setCar] = useState({
  brand: "Ferrari",
  model: "Roma",
  year: "2020",
  color: "Red", 
})

const changeColor = () => {
  setCar((car) => {
    return {...car, color:"Blue"}
  })
}

  return (
    <div>
    <h1>My {car.brand}</h1>
    <h2>It us a {car.color} {car.model} from {car.year}</h2>
    <button onClick={changeColor}>Button</button>
    </div>
  )
}

export default UseState
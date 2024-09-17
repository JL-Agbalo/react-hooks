import React, { useState } from 'react'

function countInitial() {
  console.log("run function")
  return 0
}

function CountUseState() {
  
  // const [count, setCount] = useState(() => countInitial()) 
  // Function Version that will run in the first state


  // const [state, setState] = useState({count: 4, theme: 'blue'}) 
  // const count = state.count
  // const theme = state.theme

  const [count, setCount] = useState(4)
  const [theme, setTheme] = useState("Blue")

  
  function increment(){
    setCount(prevCount => prevCount +1 )
  }
  // To update all the data in object

  function decrement(){
    setCount(prevCount => prevCount - 1 )
  }
 
  return (
    <div>
      <button onClick={decrement}>-</button>
       <span>{count}</span>
       <span>{theme}</span>
       <button onClick={increment}>+</button>
    </div>
  )
}

export default CountUseState
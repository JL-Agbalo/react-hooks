import React, { useState } from 'react'

function CountUseState() {
    const [count, setCount] = useState(0)

    const increaseCount = () => {
        setCount(count +1)
    }
  return (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={increaseCount}>Increase</button>
    </div>
  )
}

export default CountUseState
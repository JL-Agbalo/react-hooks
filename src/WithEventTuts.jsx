import React, { useEffect, useState } from 'react'

function WithEventTuts() {
const [windowWidth, setWindowWidth] = useState(window.innerWidth)


const handleResize = () => {
    setWindowWidth(window.innerWidth)
}

useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () =>{
        window.removeEventListener('resize', handleResize)
        // To clean up
    }
}, [])
    return (
    <div>{windowWidth}</div>
  )
}

export default WithEventTuts
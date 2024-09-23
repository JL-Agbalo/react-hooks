import React, { useState, useMemo, useEffect } from 'react'
// Use Memo are using a cashing a value

function UsingMemmow() {
    const [number, setNumber] = useState(0)
    const [dark, setDark] = useState(false)
    const doubleNumber = useMemo(() =>{
      return slowFunction(number)
      // Not Gonna recall the slowFunction here because we already knwo what result it last time
    }, [number])
    const themeStyles= useMemo(() => {
      // If hindi nag update ung dark hindi mag rurun ung themeStyles
      return {
      backgroundColor: dark ? 'black' : 'white',
        color: dark ? 'white' : 'black'}
    }, [dark])

    useEffect(() =>{
      console.log("Theme Changes")
    }, [themeStyles])

  return (
    <>
        <input type="number"  value={number} onChange={e => setNumber(parseInt(e.target.value))}/>
        <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
        <div style={themeStyles}>{doubleNumber}</div>
    </>
  )
}

function slowFunction(num){
    console.log('Calling Slow Function')
    for (let i = 0; i <= 1000000000; i++){}
    return num * 2
}

export default UsingMemmow
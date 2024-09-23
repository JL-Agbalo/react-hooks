import React, { useState, useEffect, useRef } from 'react'

function UseRefTuts() {

    const [name, setName] = useState('')
    // const renderCount= useRef(1)
    const inputRef = useRef()

    // useEffect(() => {
    //     renderCount.current = renderCount.current + 1;
    // })

    // function focus(){
    //     inputRef.current.focus()
        // inputRef.current.value = 'Some Value'
    // }
    
    const prevName = useRef('')

    useEffect(()=> {
        prevName.current = name
    }, [name]) 

  return (
    <div>
        <input ref={inputRef} type="text" value={name} onChange={e => setName(e.target.value)} />
        <div>My name is {name} and i used to be {prevName.current}</div>
        {/* <div>I renderd {renderCount.current} times</div> */}
        {/* <button onClick={focus} >Focus</button> */}
    </div>
  )
}

export default UseRefTuts
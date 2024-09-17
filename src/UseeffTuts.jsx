import React, { useState, useEffect } from 'react'

function UseeffTuts() {

    const [resourceType, setResouceType] = useState('posts')
    const [items, setItems] = useState([])

    useEffect(() => {
        console.log("Resource Changes")

        return () =>{
            console.log("Return from resource")
        }
        // fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        // .then(response => response.json())
        // .then(json => setItems(json))
        // Run only on mount
    }, [resourceType])
  return (
  <>
  
  <div>
        <button onClick={() => setResouceType('posts')}>Posts</button>
        <button onClick={() => setResouceType('users')}>Users</button>
        <button onClick={() => setResouceType('comments')}>Comments</button>
    </div>
    <h1>{resourceType}</h1>
    {items.map(item => {
        return <pre>{JSON.stringify(item)}</pre>
    })}
  </>
  )
}

export default UseeffTuts
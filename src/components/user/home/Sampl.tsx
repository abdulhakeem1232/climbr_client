import React, { useState } from 'react'

function Sampl() {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(prevState => prevState + 1)
        setCount(prevState => prevState + 1)
        setCount(count + 1)
        setCount(count + 1)
    }
    return (
        <div>
            <button onClick={handleClick}>click here</button>
            {count}
        </div>
    )
}

export default Sampl


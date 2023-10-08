import React, { useEffect, useState } from 'react';

export function App() {
  const [count, setCount] = useState(0)
  const [greeting] = useState('Hello')

  useEffect(() => {
    console.log('count changed:', count)
  }, [count])

  const incrementCounter = () => {
    setCount(count + 1)
  };

  return (
    <div>
      <h1>{greeting}</h1>
      <button onClick={incrementCounter}>Click me!</button>
      <p>Counter: {count}</p>
    </div>
  )
}

import React, { useState } from 'react'

export function App() {
  const [count, setCount] = useState<number | string>(0)
  const [greeting] = useState<string>('Hello')

  const incrementCounter = (): void => {
    setCount(count + 1)
  }

  return (
    <div className="container">
      <h1>{greeting}</h1>
      <button onClick={incrementCounter}>Click me!</button>
      <p>
        Counter:
        {count}
      </p>
    </div>
  )
}

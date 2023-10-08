import React, { useState } from "react"

export function App() {
	const [count, setCount] = useState(0)
	const [greeting] = useState("Hello")

	const incrementCounter = () => {
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

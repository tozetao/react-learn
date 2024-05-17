import React, { useEffect, useRef, useState } from 'react'

export default function Test() {
  const [n, setN] = useState(5)

  const timerRef = useRef()

  const clearEffect = () => {
    clearTimeout(timerRef.current)
  }

  useEffect(() => {
    if (n === 0) {
      return
    }

    timerRef.current = setTimeout(() => {
      const newN = n - 1
      setN(newN)
    }, 1000);

    return clearEffect
  }, [n])

  return (
    <div>
      {n}
    </div>
  )
}

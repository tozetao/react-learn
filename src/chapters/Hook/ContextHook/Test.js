import React, { useContext } from 'react'

const ctx = React.createContext()

function Display() {
  const config = useContext(ctx)
  return (
    <div>
      <p>platform: { config.platform }</p>
      <p>version: { config.version }</p>
    </div>
  )
}

export default function Test() {
  const config = {
    version: 1.0,
    platform: 'platform name'
  }
  return (
    <div>
      <ctx.Provider value={config}>
        <Display />
      </ctx.Provider>
    </div>
  )
}

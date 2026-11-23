import { useState, type FormEvent } from 'react'

function App() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()          // stop the browser reloading the page
    const trimmed = name.trim()
    if (!trimmed) return

    setGreeting(`Hello, ${trimmed}!`)
    console.log('hello', { name: trimmed, at: new Date().toISOString() })
  }

  return (
      <main style={{ maxWidth: 400, margin: '4rem auto', fontFamily: 'system-ui' }}>
        <h1>AWS test app - V4</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Your name{' '}
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>{' '}
          <button type="submit">Say hello</button>
        </form>
        {greeting && <p>{greeting}</p>}
      </main>
  )
}

export default App
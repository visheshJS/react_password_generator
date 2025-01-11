import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="w-full sm:w-11/12 md:w-[600px] mx-auto shadow-md rounded-lg px-6 py-8 my-10  bg-gray-800 text-gray-900 max-w-full">
  <h1 className='text-yellow-200 text-4xl text-center mb-10 my-3'>Password generator...</h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input
      type="text"
      value={password}
      className="outline-none w-full py-4 text-xl px-3"
      placeholder="Password"
      readOnly
      ref={passwordRef}
    />
    <button
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 
      active:bg-blue-700 hover:bg-blue-400 text-lg '
    >Copy</button>
  </div>
  <div className='flex flex-col sm:flex-row sm:gap-x-2 text-sm gap-y-3 sm:gap-y-0'>
    <div className='flex  items-center gap-x-1 w-full sm:w-auto'>
    <label className='text-white text-lg'>Length:</label>
    <label className='text-white mx-2 text-lg'>{length}</label>
      <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer w-full'
        onChange={(e) => { setLength(e.target.value) }}
      />
       <span className="text-white text-lg">{length}</span>
    </div>
    <div className="flex items-center gap-x-1 w-full sm:w-auto">
      <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() => {
          setNumberAllowed((prev) => !prev);
        }}
      />
      <label className='text-white text-lg' htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1 w-full sm:w-auto">
      <input
        type="checkbox"
        defaultChecked={charAllowed}
        id="characterInput"
        onChange={() => {
          setCharAllowed((prev) => !prev)
        }}
      />
      <label className='text-white text-lg' htmlFor="characterInput">Characters</label>
    </div>
  </div>
</div>

    
  )
}

export default App
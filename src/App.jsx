import { useState,useCallback,useRef,useEffect } from 'react'
import React from 'react'

function App() {
  const [length, setLength] = useState(8)
  const[numAllowed, setNumAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState('')

  const passwordRef = useRef(null) //default reference value is null

  const passwordGeneretor= useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numAllowed) str+='0123456789'
    if(charAllowed) str+='!@#$%&_'
    
    for(let i=1;i<=length;i++){
      let index = Math.floor(Math.random()*str.length +1)
      pass+= str.charAt(index)
      
    }
    setPassword(pass)

  }
    ,[length, numAllowed, charAllowed, setPassword]) //setPassword also  given for optimization


    useEffect(() => {passwordGeneretor()}, [length, numAllowed, charAllowed, passwordGeneretor])
  
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select ()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)

  },[password])
  
  
    

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-emerald-600 rounded-lg px-4 py-6 my-8 text-orange-600 bg-amber-100'>
        <h1 className='text-center font-semibold text-3xl py-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden text-black mt-6  mb-6'>
          <input type="text"
                value={password}
                className='outline-none bg-white w-full px-3 py-4'
                placeholder='Password'
                readOnly
                ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard} className='px-2 bg-cyan-300 outline-none shrink-0 transform active:scale-70 transition duration-150 cursor-pointer'>Copy</button>
        </div>
        <div className='flex text-sm gap-4'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={50}
            value={length}
            className='cursor-grab' 
            onChange={(e)=>setLength(e.target.value)}
            />
            <label>Length: {length}</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={()=>setNumAllowed((prev)=>!prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={(e)=>setCharAllowed((prev)=>!prev)}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>

        </div>
        
      </div>
      
    </>
  )
}

export default App

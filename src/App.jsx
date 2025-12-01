import { useCallback, useEffect, useState ,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[length,setLength]=useState(5);
  const[numberAllow,setNumberAllow]=useState(false);
  const[charAllow,setCharAllow]=useState(false);
  const[password,setPassword]=useState("")

//copy wala
const passwordRef=useRef(null)


  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllow)str+="0123456789"
    if(charAllow)str+="~`!@!#$%^&*()_=+"

    for(let i=1;i<=length;i++){
      let char=(Math.random()*str.length+1);
      pass+=str.charAt(char)
    }
setPassword(pass)

  },[length,numberAllow,charAllow,setPassword])

  //this is the main part of the copy  this part use for select highlight passwordRef.current?.select()
const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  // passwordRef.current.setSelectionRange(0,5);   helps for  range select
  window.navigator.clipboard.writeText(password)
},[password])


useEffect(()=>{
  passwordGenerator()
},[length,numberAllow,charAllow,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 text-black bg-blue-200">
    <h1 className="mb-3">Password Generator Here</h1>
    <div className="relative">
      <input
        type="text"
        value={password}
        className="outline-none w-full py-2 px-3 pr-20 rounded-lg bg-yellow-100 text-black"
        placeholder="Password"
        readOnly
        ref={passwordRef}
      />

      <button onClick={copyPasswordToClipboard} className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white px-3 py-1 rounded" >
      Copy
      </button>
          </div>
     <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length:{length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
       <input type="checkbox" 
        defaultChecked={numberAllow}
        id='numberInput'
          value={length}
          onChange={()=>{
            setNumberAllow((prev)=>!prev);
          }}
        />
        <label htmlFor="numberinput">Numbers</label>
      </div>

<div className='flex items-center gap-x-1'>
       <input type="checkbox" 
        defaultChecked={numberAllow}
        id='numberInput'
          value={length}
          onChange={()=>{
            setNumberAllow((prev)=>!prev);
          }}
        />
        <label htmlFor="numberinput">Characters</label>
      </div>

     </div>

          </div>
    </>
  )
}

export default App

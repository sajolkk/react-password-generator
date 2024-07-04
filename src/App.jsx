import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [isNumberAllowed, setNumberAllowed] = useState(false);
  const [isSymbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback (()=>{
    let newPassword = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (isNumberAllowed) str += '0123456789';
    if (isSymbolAllowed) str += '!@#$%^&*()_+~<>?:"{}|-\'\\[].;,/';
    for (let i = 1; i <= passwordLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      newPassword += str.charAt(char);      
    }
    setPassword(newPassword);
  }, [passwordLength, isNumberAllowed, isSymbolAllowed, password]);


  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, isNumberAllowed, isSymbolAllowed])

  
  return (
    <>
      <div className='h-screen w-full bg-black'>
        <h1 className='text-white text-center text-3xl shadow-lg py-2'>Password Generator</h1>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 text-orange-500 bg-gray-700 py-5'>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input 
              type="text" 
              value={password}
              className='outline-none w-full py-3 px-3'
              placeholder='password'
              readOnly
              ref={passwordRef}
            />
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2 py-3'>
            <div className='flex items-center gap-x-1'>
              <input 
                type="range" 
                min={10}
                max={100}
                value={passwordLength}
                className='cursor-pointer'
                onChange={(e)=>{setPasswordLength(e.target.value)}}
              />
              <label>Length: {passwordLength}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
                type="checkbox" 
                defaultChecked={isNumberAllowed}
                id='numberInput'
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
                type="checkbox" 
                defaultChecked={isSymbolAllowed}
                id='characterInput'
                onChange={() => {
                  setSymbolAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='characterInput'>Symbols</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

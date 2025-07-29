import { useCallback, useEffect, useRef, useState } from "react";
import { toast, Toaster } from 'react-hot-toast';


export default function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [isAddNumber, setIsAddNumber] = useState(false);
  const [isAddCharacter, setIsAddCharacter] = useState(false);
  const [password , setPassword] = useState('')

  const passwordRef = useRef(null)


  const generatePassword = useCallback(()=>{
    let newPassword = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    if(isAddNumber) str += "0123456789";
    if(isAddCharacter) str += "!@#$%^&*-_+=[]{}~`"

    for(let i = 1; i < length; i++ ){
        let randomNum = Math.floor(Math.random() * str.length)
        newPassword += str.charAt(randomNum)
    }
    setPassword(newPassword)
    
} , [length , isAddNumber , isAddCharacter])

useEffect(()=>{
    generatePassword()
} , [length , isAddNumber, isAddCharacter])

const handleCopyButton = useCallback(()=>{
   if (passwordRef.current) {
    passwordRef.current.select();

    navigator.clipboard.writeText(passwordRef.current.value)
      .then(() => {
        toast.success("Password copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy password.");
      });
  }

} , [password])


  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
      <div className="card-box">
        <div className="flex">
          <h1 style={{ textDecoration: "underline", marginBottom: "1rem" }}>
            Password Generator
          </h1>
          <div style={{ width: "80%", display: "flex" }}>
            <input
              className="input-style"
              type="text"
              readOnly
              value={password}
              ref={passwordRef}
            />
            <button onClick={handleCopyButton} className="button-style">Copy</button>
          </div>
          <div className="input-flex" style={{gap:'30px' , marginTop:'2rem'}}>
            <div className="input-flex">
              <input
                type="range"
                min={6}
                max={25}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label>Length: {length}</label>
            </div>
            <div className="input-flex">
              <input 
              type="checkbox"
              id="addNumber"
              checked={isAddNumber}
              onChange={()=>setIsAddNumber((prev) => !prev)}
              />
              <label htmlFor="addNumber">Number</label>
            </div>
            <div className="input-flex">
              <input 
              type="checkbox"
              id="addCharacter"
              checked={isAddCharacter}
              onChange={()=>setIsAddCharacter((prev) => !prev)}
               />
              <label htmlFor="addCharacter">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

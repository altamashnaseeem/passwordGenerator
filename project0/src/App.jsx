import { useState ,useCallback, useEffect,useRef} from 'react'

// import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [allowNumbers,setAllowNumbers]=useState(false);
  const [allowCharacters,setAllowCharacters]=useState(false);
  const [password,setPassword]=useState("")
  const passwordRef=useRef(null)

  const copytoPasswordToClipboard=useCallback(()=>{
      passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)    
  },[password])

  

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   if(allowNumbers){
    str+="0123456789";
    
   }

   if(allowCharacters) str+="~!@#$%^&*_+-{}[]"
   for(let i=1;i<=length;i++){
    let charAtIndex=Math.floor(Math.random()*str.length+1)
     pass+=str.charAt(charAtIndex);

   }
   setPassword(pass);


  },[length,allowCharacters,allowNumbers])

  useEffect(()=>{
    passwordGenerator()
  },[length,allowCharacters,allowNumbers,passwordGenerator])
   



  return (

    <>

    <div className='w-full text-center max-w-md mx-auto shadow-md rounded-lg px-6 py-4 pb-4 my-8 text-orange-500 bg-gray-700'>
         <h1 className='text-white text-center'>Password generator</h1>
         <div className='flex shadow rounded-lg overflow-hidden mt-2 mb-4'>
            
           <input type="text" 
               value={password}
               className='outline-none w-full py-1 px-3'
              placeholder='password'
              ref={passwordRef}
              
              readOnly
           />
           <button onClick={copytoPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
          
          </div>  
          <div className='flex text-sm gap-x-2'>
               <div className='flex items-center gap-x-1'>
                <input type="range" min={5} max={100} value={length} 
                  className='cursor-pointer'
                  onChange={(e)=>{setLength(e.target.value)}}
                 
                 />
                 <label> Length:{length} </label>
               </div>
                <div className='flex items-center gap-x-1'></div>
                   
               
                  <input type="checkbox" 
                   defaultChecked={allowNumbers}
                    id="numberInput"
                    onChange={()=>{setAllowNumbers((prev)=> !prev)}}
                  
                  

        
                  />
                   <label htmlFor='numberInput'> Numbers</label>
                  
                 <div>
                 <input type="checkbox" 
                      value={allowCharacters}
                      id="inputCharacter"
                      onChange={()=>{setAllowCharacters((prev)=>!prev)}}

                  
                  />
                <label htmlFor="inputCharacter"> characters</label>


                 </div>
               

          </div>



 
    </div>
      
    
    
    
    
    </>
    

    
  )
}

export default App

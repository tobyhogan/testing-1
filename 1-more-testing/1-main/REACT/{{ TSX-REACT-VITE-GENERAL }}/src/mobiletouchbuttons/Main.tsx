

function Main() {


  var myArr = Array.from({length: 10}, (x, i) => i)

  return (
    <div>
      {myArr.map((i) => 
      
        <button key={i} className='bg-blue-700 text-white w-fit h-fit border-2 border-black p-2' onClick={() => console.log("button: ", i)}>This Button</button>

      )}
    </div>

  )
}

export default Main

/*
<>
  <h1 className='bg-blue-500 text-5xl mx-auto mt-5 px-10 py-4 w-fit'>React. Vite. Tailwind.</h1>
</>
*/
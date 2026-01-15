import { useId, useState } from 'react';

function myFunctionalComponentFunction(props) {
  const id = useId();
  const [input, setInput] = useState(props?.value ?? '');
  return (
    <div>
    <label htmlFor={id}>Please specify:</label>
    <input id={id} value={input} onInput={e => setInput(e.target.value)}/>
    </div>
  );

  
}
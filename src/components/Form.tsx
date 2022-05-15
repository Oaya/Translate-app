import React, { RefObject, useContext, useRef, useState } from 'react';

import { ApiContext } from '../Providers/ApiContext';


export default function Form() {

  const queryInputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //search function from context//
    const enteredInput = queryInputRef.current?.value;

  }



  //for the case speech to text doesn't work//


  return (
    <div>
      <div>
        <p>What languages do you want to translate to??</p>



      </div>

      <form onSubmit={handleSubmit}>
        <textarea ref={queryInputRef} />
        <button>Translate</button>
      </form>
    </div>

  )
}

import React, { RefObject, useContext, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';

import { ApiContext } from '../Providers/ApiContext';


export default function Form() {

  const queryInputRef = useRef<HTMLTextAreaElement | null>(null);


  const { error,
    interimResult,
    isRecording,
    startSpeechToText,
    stopSpeechToText } = useSpeechToText({
      continuous: true,
      useLegacyResults: false,
      speechRecognitionProperties: {
        lang: 'en-US',
        interimResults: true
      }
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //search function from context//
    const enteredInput = queryInputRef.current?.value;

  }




  //for the case speech to text doesn't work//
  if (error) {
    return <p>Web Speech API is not available in this browser</p>
  }

  return (
    <div>
      <div>
        <p>What languages do you want to translate to??</p>



      </div>

      <div>
        <p>
          Enter the sentence you want to translate or speak it in English
        </p>
        <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? "Stop recording" : "Start Recording"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea ref={queryInputRef} />
        <button>Translate</button>
      </form>
    </div>

  )
}

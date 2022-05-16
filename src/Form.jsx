import React, { useContext, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Creatable from 'react-select/creatable';

import { ApiContext } from '../Provider/ApiContext';
import { languagesList } from '../languageData';


const languagesListObj = languagesList.map(lang => ({ label: lang, value: lang }));

export default function Form() {

  const { getApiResponse } = useContext(ApiContext);
  const queryInputRef = useRef();
  const [typedLang, setTypedLang] = useState('')

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

  const handleSubmit = (e) => {
    e.preventDefault();
    //search function from context//
    const enteredInput = queryInputRef.current.value;
    getApiResponse(enteredInput, typedLang);
    queryInputRef.current.value = '';
    setTypedLang('')
  }

  const handleChange = (input) => {
    setTypedLang(input)
  }

  //for the case speech to text doesn't work//
  if (error) {
    return <p>Web Speech API is not available in this browser</p>
  }

  return (
    <div>
      <div>
        <p>What languages do you want to translate to??</p>

        <Creatable
          isMulti
          options={languagesListObj}
          onChange={handleChange}
          value={typedLang}
          placeholder="Select from list or type in here"
        />


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
        <textarea type='text' ref={queryInputRef} value={interimResult} />
        <button>Translate</button>
      </form>
    </div>

  )
}

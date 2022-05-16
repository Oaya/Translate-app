import React, { useContext, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Creatable from 'react-select/creatable'
import { ValueType } from 'react-select';

import { ApiContext, ProviderDataType } from '../Providers/ApiContext';
import { languagesList } from '../languageData';


interface LanguagesObj {
  label: string;
  value: string;
};

const languagesListObj: LanguagesObj[] = languagesList.map(lang => ({ label: lang, value: lang }));

export default function Form() {
  const { getApiResponse } = useContext(ApiContext) as ProviderDataType;
  const queryInputRef = useRef<HTMLTextAreaElement>(null);
  const [typedLang, setTypedLang] = useState<ValueType<LanguagesObj, true> | any>(null)

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | null>) => {
    e.preventDefault();
    //search function from context//
    const enteredInput = queryInputRef.current?.value;
    if (enteredInput) {
      getApiResponse(enteredInput, typedLang);
    }
    if (queryInputRef.current) {
      queryInputRef.current.value = '';
    }
    setTypedLang(null)
  }

  const handleChange = (input: ValueType<LanguagesObj, true>) => {
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
        <textarea ref={queryInputRef} value={interimResult} />
        <button>Translate</button>
      </form>
    </div>

  )
}

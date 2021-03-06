import React, { createContext, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { AxiosResponse } from 'axios';


interface ApiProviderProps {
  children: React.ReactNode;
};

export interface ProviderDataType {
  responses: ResponsesList[];
  getApiResponse: (query: string, languages: LanguagesObj[]) => void;
}

interface LanguagesObj {
  label: string;
  value: string;

}

interface ResponsesList {
  prompt: string;
  response: string | undefined;
}


export const ApiContext = createContext<ProviderDataType | null>(null);


//set congiguration for openAI//
const config = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});

const openai = new OpenAIApi(config);

export default function ApiProvider({ children }: ApiProviderProps) {
  const [responses, setResponses] = useState<ResponsesList[]>([]);

  const getApiResponse = (query: string, languages: LanguagesObj[]) => {
    const langString = languages?.map(({ value }) => value).join(' and ')
    console.log(langString)
    let prompt = `Translase this into ${langString}: \n${query}\n`;
    console.log(prompt);

    if (query && languages) {
      openai.createCompletion('text-davinci-002', {
        prompt: prompt,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
        .then((res: AxiosResponse<any>) => {
          console.log(res)
          const response: string | undefined = res.data.choices[0].text;
          const obj = { prompt: query, response: response }
          setResponses((prev: ResponsesList[]) => {
            return [...prev, obj]
          })
        })
        .catch(error => {
          throw Error("Something went wrong :", error)
        })
    } else {
      throw Error("AI couldn't find the responses.")
    }
  };



  const providerData = {
    responses,
    getApiResponse
  };

  return (
    <ApiContext.Provider value={providerData}>
      {children}
    </ApiContext.Provider>
  );
}

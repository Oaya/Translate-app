import React, { createContext, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

interface ApiProviderProps {
  children: React.ReactNode;
};

interface ProviderData {

}

export const ApiContext = createContext<ProviderData | null>(null);


//set congiguration for openAI//
const config = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});

const openai = new OpenAIApi(config);

export default function ApiProvider({ children }: ApiProviderProps) {
  const [responses, setResponses] = useState([]);

  const getApiResponse = (query, languages) => {
    const langString = languages?.map(({ value }) => value).join(' and ')
    console.log(langString)

    let prompt = `Translate this into ${langString}: \n${query}\n`;
    console.log(prompt);

    if (query && languages) {
      openai.createCompletion('text-davinci-002', {
        prompt: prompt,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }).then(res => {
        const response = res.data.choices[0].text;
        const obj = { prompt: query, response: response }
        setResponses((prev) => {
          return [...prev, obj]
        })
        console.log(responses)
      })
    } else {
      throw Error("Error, something went wrong")
    }
  };

  const providerData = {
    responses,
    get
  };



  return (
    <ApiContext.Provider value={providerData}>
      {children}
    </ApiContext.Provider>
  );
}

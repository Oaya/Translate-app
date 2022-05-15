import React, { createContext } from "react";
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


  const providerData = {};



  return (
    <ApiContext.Provider value={providerData}>
      {children}
    </ApiContext.Provider>
  );
}

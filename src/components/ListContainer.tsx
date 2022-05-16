import React, { useContext } from 'react';
import { ApiContext, ProviderDataType } from '../Providers/ApiContext';

export default function ListContainer() {

  const { responses } = useContext(ApiContext) as ProviderDataType;
  console.log(responses)

  return (
    <div>
      {responses.reverse().map((response, i) => (
        <ul key={i}>
          <li>{response.prompt}</li>
          <li>{response.response}</li>
        </ul>
      ))}
    </div>
  )
}
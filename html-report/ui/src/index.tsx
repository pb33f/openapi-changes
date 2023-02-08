import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OpenAPIChanges from './OpenAPIChanges';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const body = document.getElementsByTagName('body')[0];
if (!body.dataset.embedded) {
    body.classList.add('non-embedded-mode');
}

//import data from '../data.json'
let data: any
root.render(
   <React.StrictMode>
    <OpenAPIChanges report={data}/>
   </React.StrictMode>
);


import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import firebase from './firebase/config';
import { FirebaseContext } from './store/context';
import Context from './store/context';

createRoot(document.getElementById('root')).render(
<FirebaseContext.Provider value={{firebase}}>
<Context>
<App />
</Context>
</FirebaseContext.Provider>
);

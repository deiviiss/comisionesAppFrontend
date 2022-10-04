

import { createContext, useContext } from 'react';
//! importaciones de la request

// container auth context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}

// auth context
// propagate auth context
export const ProviderAuth = ({ children }) => {

  const users = [{
    "_id": "632cec978dd5106dbc12ed8f",
    "name": "David",
    "email": "admin@hotmail.com",
    "createAt": "2022-08-20T16:09:12.916Z",
    "updateAt": "2022-08-20T16:09:12.916Z",
  }]

  // component with context
  return <AuthContext.Provider value={{ users }}>
    {children}
  </AuthContext.Provider>
}
import { createContext, useState } from "react";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [number, setNumber] = useState(0);

  return (
    <AuthContext.Provider
      value={{
        number,
        setNumber
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;

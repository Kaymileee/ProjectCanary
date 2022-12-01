import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const { createContext, useContext, useState, useEffect } = require("react");
const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUserInfo(user);
    });
  }, []);
  const value = { userInfo, setUserInfo };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("Loi ");
  }
  return context;
}
export { useAuth, AuthProvider };

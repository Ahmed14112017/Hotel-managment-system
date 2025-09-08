import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Userdata, IAuthcontext } from "../interfaces";
import { jwtDecode } from "jwt-decode";
interface AuthchildenProvider {
  children: ReactNode;
}
export const Authcontext = createContext<IAuthcontext | null>(null);
export const Authcontextprovider = ({ children }: AuthchildenProvider) => {
  const [userdata, setuserdata] = useState<Userdata | null>();
  const savedata = () => {
    const tokenjwt = localStorage.getItem("token");
    if (tokenjwt) {
      const decodetoken: Userdata = jwtDecode(tokenjwt);
      setuserdata(decodetoken);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") || userdata !== null) {
      savedata();
    }
  }, []);

  return (
    <Authcontext.Provider value={{ userdata, savedata }}>
      {children}
    </Authcontext.Provider>
  );
};

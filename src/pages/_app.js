import { AuthProvider } from "@/context/AuthContext";
import { PetProvider } from "@/context/PetContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <PetProvider>
          <style jsx global>{`
            @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");
            *,
            html {
              font-family: "Open Sans", sans-serif;
            }
          `}</style>
          <Component {...pageProps} />
        </PetProvider>
      </AuthProvider>
    </>
  );
}

import "@/app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";


export default function RootLayout({ children }) {
  return (
        <div>
            <Navbar />
            {children}
        </div>
  );
}

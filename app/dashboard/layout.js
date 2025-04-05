import "@/app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/Components/Navbar";


export default function RootLayout({ children }) {
  return (
        <div>
            {children}
        </div>
  );
}

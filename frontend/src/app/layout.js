import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Intelligent Filght pricing",
  description:
    "Intelligent Flight Pricing is a system that dynamically predicts and adjusts airline ticket prices using data-driven techniques. Instead of keeping a fixed price for a flight, the system analyzes multiple factors such as demand, booking patterns, time remaining before departure, and historical price trends to estimate the most appropriate ticket price.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

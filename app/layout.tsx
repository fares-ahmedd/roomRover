import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/layout/NavBar";
import { ThemeProvider } from "@/components/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | RoomRover",
    default: "Home | RoomRover",
  },
  description:
    "Book your hotel now. or you can List your own properties and rooms for rent as well. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <NavBar />

          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header/Index";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import DataProvider from "@/components/DataContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | RoomRover",
    default: "Home | RoomRover",
  },
  description:
    "Book your hotel now. or you can List your own properties and rooms for rent as well. ",
  openGraph: {
    title: "RoomRover",
    description:
      "Reserve your stay today, or become a host and offer your space to travelers.",
    images: ["/preview.png"],
    url: "https://room-rover-bice.vercel.app/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${roboto.className} overflow-x-hidden`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <DataProvider> {children}</DataProvider>
            <Toaster position="top-right" reverseOrder={false} />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

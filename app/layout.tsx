import "@/app/globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "AI Fitness Coach",
  description: "Your personalized AI-powered workout and diet assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

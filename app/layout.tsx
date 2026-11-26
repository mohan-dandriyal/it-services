import type { Metadata } from "next";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechNova — IT Services & Digital Solutions",
  description:
    "Reliable IT services, cloud solutions, cybersecurity, and custom software development to help your business grow faster.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-brand-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}

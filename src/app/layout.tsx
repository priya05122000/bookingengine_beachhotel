import "./globals.css";
import { arizonaFlare, nobel } from "../lib/font";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${arizonaFlare.variable} ${nobel.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
import "./globals.css";
import { arizonaFlare } from "./lib/font";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
    >
      <body className={`${arizonaFlare.variable}`}>
        {children}
      </body>
    </html>
  );
}
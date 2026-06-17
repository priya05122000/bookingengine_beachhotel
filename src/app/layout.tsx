import "./globals.css";
import { arizonaFlare, arizonaLight, arizonaRegular, arizonaSansRegular, josefinSans, lato, mavenPro, notoSansJP, nunito, oxygen, roboto, nobel } from "../lib/font";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${arizonaFlare.variable} ${arizonaLight.variable} ${arizonaRegular.variable}  ${arizonaSansRegular.variable} ${josefinSans.variable} ${lato.variable} ${mavenPro.variable} ${notoSansJP.variable} ${nunito.variable} ${oxygen.variable} ${roboto.variable} ${nobel.variable}`}>

      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
import localFont from "next/font/local";
import { Josefin_Sans, Lato, Noto_Sans_JP, Maven_Pro, Nunito, Oxygen, Roboto } from "next/font/google";

export const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    variable: "--font-josefin-sans",
    display: "swap",
});

export const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-lato",
    display: "swap",
});

export const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-sans-jp",
    display: "swap",
});

export const mavenPro = Maven_Pro({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-maven-pro",
    display: "swap",
});

export const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-nunito",
    display: "swap",
});

export const oxygen = Oxygen({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-oxygen",
    display: "swap",
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto",
    display: "swap",
});

export const arizonaFlare = localFont({
    src: "../fonts/ABCArizonaFlareVariable-Trial.ttf",
    variable: "--font-arizona",
    display: "swap",
});


export const nobel = localFont({
    src: "../fonts/Nobel Book.otf",
    variable: "--font-nobel",
    display: "swap",
});

export const arizonaRegular = localFont({
    src: "../fonts/ABCArizona-FlareRegular.otf",
    variable: "--font-arizona-regular",
    display: "swap",
});

export const arizonaSansRegular = localFont({
    src: "../fonts/ABCArizona-SansRegular.otf",
    variable: "--font-arizona-sans-regular",
    display: "swap",
});

export const arizonaLight = localFont({
    src: "../fonts/ABCArizona-FlareLight.otf",
    variable: "--font-arizona-light",
    display: "swap",
});
import Link from "next/link";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import { ClipboardList, Mail, MapPin, Phone, Send } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const navLinks = [
  { label: "HOME", href: `${BASE_URL}/` },
  { label: "ABOUT US", href: `${BASE_URL}/about` },
  { label: "HOTEL FACILITIES", href: `${BASE_URL}/facilities` },
  { label: "GALLERY", href: `${BASE_URL}/gallery` },
  { label: "NEARBY DESTINATION", href: `${BASE_URL}/nearby` },
  { label: "ROOMS & SUITES", href: `${BASE_URL}/rooms` },
  { label: "CONTACT US", href: `${BASE_URL}/contact` },
];

const socialIcons: { href: string; label: string; path: string }[] = [
  {
    href: "https://www.instagram.com/thebeachhotel_/",
    label: "Instagram",
    path: "/icons/instagram.svg",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61590909593058",
    label: "Facebook",
    path: "/icons/facebook.svg",
  },
  {
    href: "https://www.youtube.com/@The_Beach_Hotel",
    label: "YouTube",
    path: "/icons/youtube.svg",
  },
  {
    href: "https://x.com/TheBeachHotel_",
    label: "X (Twitter)",
    path: "/icons/x.svg",
  },
];

export default function Footer() {
  return (
    <footer>
      <style>{`
        .tbh-footer .type-body-lg {
          font-size: clamp(16px, 1.5vw, 18px);
          font-family: var(--font-arizona-sans-regular);
        }
        .tbh-footer .type-label {
          font-size: 12px;
          font-family: var(--font-arizona-sans-regular);
        }
        .tbh-footer .type-label-md {
          font-size: clamp(15px, 1.2vw, 16px);
          font-family: var(--font-arizona-sans-regular);
        }
        .tbh-footer .type-body-sm {
          font-size: clamp(13px, 1.2vw, 14px);
          font-family: var(--font-arizona-sans-regular);
          letter-spacing: .6px;
        }
        .tbh-footer .type-overline {
          font-size: 11px;
          text-transform: uppercase;
          font-family: var(--font-arizona-sans-regular);
        }
      `}</style>
      <Section className="bg-primary w-full relative text-white overflow-hidden z-10 pt-10 lg:pt-20 px-6 sm:px-0 lg:min-h-screen">
        <div className="tbh-footer h-full flex flex-col justify-between font-arizona-light space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-6">
            {/* Left: description + CTA */}
            <div className="flex flex-col gap-5">
              <h3 className="type-body-lg uppercase sm:max-w-sm xl:max-w-lg">
                Let the charm of the coastline and luxurious comforts set the
                stage for an unforgettable stay amidst stunning views and
                refined comfort.
              </h3>

              <div>
                <div className="animated-border inline-block w-auto relative overflow-hidden">
                  <div className="inline-flex items-center gap-3 px-4 h-10 bg-primary">
                    <Link
                      href="/booking"
                      className="type-label cursor-pointer font-medium text-white"
                    >
                      Book My Stay
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: nav links */}
            <div>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="type-label tracking-widest uppercase hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: working hours */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="type-label-md tracking-widest uppercase text-white mb-3">
                  Working Hours :
                </p>
                <ul className="flex flex-col gap-1.5">
                  <li className="type-label tracking-widest uppercase">
                    Front Desk — 24 / 7
                  </li>
                  <li className="type-label tracking-widest uppercase">
                    Check-In — 10:00 AM to 5:00 PM
                  </li>
                  <li className="type-label tracking-widest uppercase">
                    Room Service — 24 / 7
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2.5fr] gap-10 lg:gap-6">
            <div className="flex flex-col justify-between gap-5">
              <div>
                <div className="mt-6 lg:mt-4 xl:mt-2">
                  <p className="type-label uppercase mb-3">Follow Us :</p>
                  <div className="flex items-center gap-3">
                    {socialIcons.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        aria-label={item.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-gray-700 p-1.5 hover:border-gray-500 transition-colors"
                      >
                        <Image
                          src={item.path}
                          alt={item.label}
                          width={28}
                          height={28}
                          className="w-4 h-4"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 mt-8">
                  <a
                    href="tel:+919384938420"
                    className="type-body-sm flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Phone size={15} />
                    +91 93849 38420
                  </a>

                  <a
                    href="mailto:support@thebeachhotel.in"
                    className="type-body-sm flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Mail size={15} />
                    support@thebeachhotel.in
                  </a>

                  <div className="type-body-sm flex gap-2 hover:text-accent transition-colors">
                    <MapPin size={15} className="mt-0.5" />
                    Beach Rd, Kanniyakumari, Tamil Nadu 629702, India
                  </div>

                  <a
                    href={`${BASE_URL}/contact-us#contact-form`}
                    className="type-body-sm flex items-center gap-2 uppercase underline underline-offset-4 hover:text-accent transition-colors w-fit"
                  >
                    <ClipboardList size={15} />
                    Enquiry
                  </a>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="sm:mb-4">
                <div className="flex items-center gap-2 type-overline font-arizona-regular text-white">
                  <Link
                    href={`${BASE_URL}/terms-and-conditions`}
                    className="transition-colors hover:underline underline-offset-4 decoration-white/50 hover:text-white"
                  >
                    Terms &amp; Condition
                  </Link>
                  <span>|</span>
                  <Link
                    href={`${BASE_URL}/privacy-policy`}
                    className="transition-colors hover:underline underline-offset-4 decoration-white/50 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/images/footer_logo.svg"
                alt="The Beach Hotel"
                width={700}
                height={200}
                className="h-full w-full opacity-40 pointer-events-none select-none"
              />
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}

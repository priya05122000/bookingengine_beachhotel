interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Side */}
        <div className="w-full flex flex-col lg:w-[50%] lg:h-screen lg:sticky lg:top-0">
          <div className="relative h-62 overflow-hidden sm:h-87 lg:flex-1">
            <img
              src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80"
              alt="The Beach Hotel"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-42 shrink-0 px-8 py-8">
            <p className="mb-3 text-xs uppercase tracking-[0.15em] text-dark-gray">
              Exclusive Offers
            </p>

            <h3 className="max-w-md text-lg leading-normal text-dark-gray">
              Hotel Facilities Are Designated Spaces And Services Designed To
              Enhance The Guest Experience
            </h3>
          </div>
        </div>

        {/* Form Area */}
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
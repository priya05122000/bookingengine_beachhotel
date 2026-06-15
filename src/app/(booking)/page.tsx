import Image from 'next/image'
import Section from '../components/common/Section'
import Link from 'next/link'

const BookingPage = () => {
    return (
        <Section>
            <div className='my-10 sm:my-20 relative'>
                <Image
                    src="/images/Rectangle.png"
                    alt='banner'
                    width={1600}
                    height={900}
                    className='w-full h-64 object-cover'
                />
                <Link
                    href="/booking"
                    className="text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white border flex items-center border-primary bg-primary rounded-xs  px-4 h-10 hover:bg-white  hover:text-primary transition"
                >
                    Book Stay
                </Link>
            </div>
        </Section>
    )
}

export default BookingPage

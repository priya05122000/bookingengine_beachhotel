import Image from 'next/image'
import Section from '@/src/components/common/Section'
import FilterSection from './_components/FilterSection'


const BookingPage = () => {
    return (
        <Section>
            <div className='mt-10 sm:my-20'>

                <FilterSection />

            </div>

        </Section>
    )
}

export default BookingPage

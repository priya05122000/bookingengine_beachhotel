// 'use client';

// import { useMemo, useState } from 'react';
// import  { Room } from './RoomsAndGuests';

// import SearchForm from './SearchForm';
// import BookingShell from '../../common/BookingShell';

// // ================= CONSTANTS =================
// const STEPS = [
//     'Search',
//     'Select Room',
//     'Guest & Credit Card Information',
//     'Confirmation',
// ];

// const DATE_FORMAT: Intl.DateTimeFormatOptions = {
//     weekday: 'short',
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
// };

// // ================= HELPERS =================
// function isSameDay(a: Date, b: Date) {
//     return (
//         a.getFullYear() === b.getFullYear() &&
//         a.getMonth() === b.getMonth() &&
//         a.getDate() === b.getDate()
//     );
// }

// function formatDate(date: Date | null) {
//     if (!date) return '—';
//     return date.toLocaleDateString('en-GB', DATE_FORMAT);
// }

// function calcDuration(checkIn: Date | null, checkOut: Date | null) {
//     if (!checkIn || !checkOut) return '—';

//     const nights = Math.round(
//         (checkOut.getTime() - checkIn.getTime()) / 86400000
//     );

//     return `${nights + 1}D, ${nights}N`;
// }

// // ================= COMPONENT =================
// export default function SearchSection() {
//     // --- derived values ---
//     const today = useMemo(() => {
//         const d = new Date();
//         d.setHours(0, 0, 0, 0);
//         return d;
//     }, []);

//     // --- state ---
//     const [calendarStart, setCalendarStart] = useState<Date>(() => {
//         const d = new Date();
//         d.setDate(1);
//         d.setHours(0, 0, 0, 0);
//         return d;
//     });

//     const [checkIn, setCheckIn] = useState<Date | null>(() => {
//         const date = new Date();
//         date.setHours(0, 0, 0, 0);
//         date.setDate(date.getDate() + 14); // 11 -> 25
//         return date;
//     });

//     const [checkOut, setCheckOut] = useState<Date | null>(() => {
//         const date = new Date();
//         date.setHours(0, 0, 0, 0);
//         date.setDate(date.getDate() + 15); // 11 -> 26
//         return date;
//     });
//     const [selectingCheckOut, setSelectingCheckOut] = useState(false);

//     const [activeStep, setActiveStep] = useState(0);

//     const [rooms, setRooms] = useState<Room[]>([{ adults: 1, children: 0 }]);

//     const [iataOpen, setIataOpen] = useState(false);
//     const [iataCode, setIataCode] = useState('');

//     // --- handlers ---
//     const handleDayClick = (date: Date) => {
//         if (
//             !selectingCheckOut ||
//             (checkIn && (isSameDay(date, checkIn) || date < checkIn))
//         ) {
//             setCheckIn(date);
//             setCheckOut(null);
//             setSelectingCheckOut(true);
//         } else {
//             setCheckOut(date);
//             setSelectingCheckOut(false);
//         }
//     };

//     const handlePrev = () => {
//         setCalendarStart(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
//     };

//     const handleNext = () => {
//         setCalendarStart(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
//     };

//     // --- render ---
//     return (
//         <BookingShell steps={STEPS} activeStep={activeStep}>
//             <SearchForm
//                 calendarStart={calendarStart}
//                 checkIn={checkIn}
//                 checkOut={checkOut}
//                 today={today}
//                 onPrev={handlePrev}
//                 onNext={handleNext}
//                 onDayClick={handleDayClick}
//                 rooms={rooms}
//                 setRooms={setRooms}
//                 iataOpen={iataOpen}
//                 setIataOpen={setIataOpen}
//                 iataCode={iataCode}
//                 setIataCode={setIataCode}
//                 onCheckAvailability={() => setActiveStep(1)}
//             />
//         </BookingShell>
//     );
// }
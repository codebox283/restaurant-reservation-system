"use client";
import { useState } from 'react';

const BookingForm = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [tableNumber, setTableNumber] = useState(1);
    const [arrivalTime, setArrivalTime] = useState('');
    const [leavingTime, setLeavingTime] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/bookings/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date,
                time,
                guests,
                name,
                contact,
                tableNumber,
                arrivalTime,
                leavingTime,
            }),
        });

        if (response.ok) {
            alert('Booking successful!');
            // Reset form fields after successful booking
            setDate('');
            setTime('');
            setGuests(1);
            setName('');
            setContact('');
            setTableNumber(1);
            setArrivalTime('');
            setLeavingTime('');
        } else {
            alert('Booking failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <h2>Book a Table</h2>
            <label>
                Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className='bg-transparent border'/>
            </label>
            <label>
                Time:
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className='bg-transparent border'/>
            </label>
            <label>
                Number of Guests:
                <input type="number" value={guests} onChange={(e) => setGuests(Number(e.target.value))} min="1" required className='bg-transparent border'/>
            </label>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className='bg-transparent border'/>
            </label>
            <label>
                Contact:
                <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} required className='bg-transparent border'/>
            </label>
            <label>
                Table Number:
                <input type="number" value={tableNumber} onChange={(e) => setTableNumber(Number(e.target.value))} min="1" required className='bg-transparent border'/>
            </label>
            <label>
                Arrival Time:
                <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required className='bg-transparent border'/>
            </label>
            <label>
                Leaving Time:
                <input type="time" value={leavingTime} onChange={(e) => setLeavingTime(e.target.value)} required className='bg-transparent border'/>
            </label>
            <button type="submit">Book Now</button>
        </form>
    );
};

export default BookingForm;

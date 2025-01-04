"use client";
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/dist/style.css"; // Import DayPicker styles
import { quicksand } from '../fonts';

const BookingForm = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date()); // Use Luxon for consistency
    const [time, setTime] = useState('8:00-9:00');
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [tableNumber, setTableNumber] = useState(null);
    const [arrivalTime, setArrivalTime] = useState('');
    const [leavingTime, setLeavingTime] = useState('');
    const [tables, setTables] = useState(Array.from({ length: 20 }, (_, index) => ({
        number: index + 1,
        occupied: false,
    })));
    const [loading, setLoading] = useState(false);

    const timeSlots = {
        breakfast: ['8:00-9:00', '9:00-10:00', '10:00-11:00'],
        lunch: ['12:00-1:00', '1:00-2:00', '2:00-3:00'],
        dinner: ['18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'],
    };

    const handleCheckAvailability = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formattedDate = selectedDate.toISOString().split('T')[0]; 
        const response = await fetch(`/api/bookings/`);

        if (response.ok) {
            const data = await response.json();
            const bookings = data;
            
            const selectedTimeSlot = `${time}`;

            const occupiedTables = bookings.filter(booking =>
                booking.date.toString().split('T')[0] === formattedDate && booking.time === selectedTimeSlot
            ).map(booking => booking.tableNumber);
            console.log(occupiedTables);
            
            const allTables = Array.from({ length: 20 }, (_, index) => ({
                number: index + 1,
                occupied: occupiedTables.includes(index + 1),
            }));

            setTables(allTables);
        } else {
            alert('Failed to check availability. Please try again.');
        }

        setLoading(false);
    };

    const handleSetTime = (slot) => {
        setTime(slot);
        const [arrival, leaving] = slot.split('-');
        setArrivalTime(arrival);
        setLeavingTime(leaving);
        
        // Log arrival and leaving times after setting them
        console.log(arrival, 'Arrival Time:', arrivalTime, 'Leaving Time:', leavingTime);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare booking data
        const bookingData = {
            date: selectedDate.toISOString(), // Convert to ISO string for API
            time,
            guests,
            name,
            contact,
            tableNumber,
            arrivalTime,
            leavingTime,
        };
        
        console.log(bookingData);

        // Send booking data to your API
        const response = await fetch('/api/bookings/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        });

        if (response.ok) {
            alert('Booking successful!');
            resetForm();
        } else {
            alert('Booking failed. Please try again.');
        }
    };

    const resetForm = () => {
        setSelectedDate(new Date()); 
        setTime('8:00-9:00');
        setGuests(1);
        setName('');
        setContact('');
        setTableNumber(null);
        setArrivalTime('');
        setLeavingTime('');
        
        // Reset tables to initial state
        setTables(Array.from({ length: 20 }, (_, index) => ({
            number: index + 1,
            occupied: false,
        })));
    };

    return (
        <form onSubmit={handleCheckAvailability} className={`${quicksand.className} flex p-10 space-x-4`}>
            <div className='flex flex-col items-start space-y-2'>
                <h2>Book a Table</h2>

                <DayPicker
                    mode="single" required
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    footer={selectedDate ? `Date Selected: ${selectedDate.toISOString().split('T')[0]}` : "Pick a day."}
                    disabled={{ before: new Date() }} // Disable past dates
                    onDayClick={handleCheckAvailability} // Check availability when a day is clicked
                />

                <h3>Select Time:</h3>
                <div className="flex flex-col">
                    {Object.entries(timeSlots).map(([mealType, slots]) => (
                        <div key={mealType}>
                            <h4>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
                            <div className="flex space-x-2">
                                {slots.map((slot) => (
                                    <button
                                        key={slot}
                                        type="button"
                                        className={`border p-2 ${time === slot ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                        onClick={() => {handleSetTime(slot); handleCheckAvailability;}}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button className='px-4 py-2 bg-black text-white' type="submit" disabled={loading}>
                    {loading ? 'Checking...' : 'Check Availability'}
                </button>
            </div>
            <div className='flex flex-col items-start space-y-2'>
                {tables.length > 0 && (
                    <>
                        <h3>Select a Table</h3>
                        <div className='w-[350px] grid grid-cols-5 gap-4 mb-10'>
                            {tables.map((table) => (
                                <div
                                    key={table.number}
                                    className={`border rounded-full p-4 text-center cursor-pointer 
                                        ${table.occupied ? 'bg-gray-300' : 'bg-green-300 hover:bg-green-400'} 
                                        ${table.number === tableNumber ? 'border-blue-500 bg-blue-200' : ''}`}
                                    onClick={() => !table.occupied && setTableNumber(table.number)}
                                >
                                    {table.number}
                                    {table.occupied}
                                </div>
                            ))}
                        </div>

                        {tableNumber && (
                            <>
                                <div className='flex space-x-4'>
                                    <label>
                                        Arrival Time: <br></br>
                                        {/* <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required className='bg-transparent border' /> */}
                                        <p>{time.split('-')[0]}</p>
                                    </label>
                                    <label>
                                        Leaving Time:<br></br>
                                        {/* <input type="time" value={leavingTime} onChange={(e) => setLeavingTime(e.target.value)} required className='bg-transparent border' /> */}
                                        <p>{time.split('-')[1]}</p>
                                    </label>
                                </div>
                                <label>
                                    Number of Guests:<br></br>
                                    <input
                                        type="number"
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                        min="1"
                                        required
                                        className='bg-transparent border mt-2'
                                    />
                                </label>

                                <label>
                                    Name:<br></br>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className='bg-transparent border mt-2' />
                                </label>
                                <label>
                                    Contact:<br></br>
                                    <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} required className='bg-transparent border mt-2' />
                                </label>

                                <button className='px-4 py-2 bg-black text-white' type="button" onClick={handleSubmit}>Book Now</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </form>
    );
};

export default BookingForm;

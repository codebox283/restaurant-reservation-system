"use client";
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/dist/style.css";
import { quicksand } from '../fonts';

interface Booking {
    _id: string;
    tableNumber: number;
    date: string;
    name: string;
    time: string;
    guests: number;
    contact: string; 
}

const AdminBookingPage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBookings = async (date: Date) => {
        setLoading(true);
        const formattedDate = date.toISOString().split('T')[0]; 
        const response = await fetch(`/api/bookings`); // Fetch bookings for the specific date

        if (response.ok) {
            const data: Booking[] = await response.json(); // Specify the type of data being fetched
            const filteredData = data.filter(booking =>
                booking.date.toString().split('T')[0] === formattedDate
            ).map(booking => ({
                _id: booking._id,
                tableNumber: booking.tableNumber,
                name: booking.name,
                time: booking.time,
                guests: booking.guests,
                contact: booking.contact,
            }));
            setBookings(filteredData || []);
            console.log(filteredData);
        } else {
            alert('Failed to fetch bookings. Please try again.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings(selectedDate);
    }, [selectedDate]);

    return (
        <div className={`${quicksand.className} flex flex-col p-10`}>
            <h2>Admin - Check Booked Slots</h2>
            
            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                footer={selectedDate ? `Selected: ${selectedDate.toLocaleDateString()}` : "Pick a day."}
                disabled={{ before: new Date() }} // Disable past dates
            />

            {loading ? (
                <p>Loading bookings...</p>
            ) : (
                <>
                    <h3>Booked Slots for {selectedDate.toLocaleDateString()}:</h3>
                    {bookings.length > 0 ? (
                        <ul>
                            {bookings.map((booking) => (
                                <li key={booking._id}> {/* Ensure each booking has a unique key */}
                                    Table {booking.tableNumber} - {booking.time} | Guests: {booking.guests} | Name: {booking.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No bookings for this date.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminBookingPage;

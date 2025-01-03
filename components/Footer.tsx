import { quicksand, tangerine } from '@/app/fonts'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import React from 'react'

export default function Footer() {
  return (
    <div className='h-[400px] py-5 px-20 flex justify-between'>
        <div className='h-full w-1/5 bg-cover bg-center'
            // style={{ backgroundImage: "url('https://www.vistagroup.ch/fileadmin/files/Bilder/Restaurants/Pontile/2023/Vista_21.jpg')" }}
        >
            <h1 className={`${tangerine.className} text-7xl text-black`}>Trattoria da Fiorella</h1>
        </div>
        <div className={`${quicksand.className} `}>
            <ul className='space-y-2'>
                <li className='hover:underline'>Home</li>
                <li className='hover:underline'>Menu</li>
                <li className='hover:underline'>Events</li>
                <li className='hover:underline'>Reservations</li>
            </ul>
        </div>
        <div className={`${quicksand.className} space-y-4`}>
            <p>Via Partenope, 38, 80121 Napoli NA, Italy</p>
            <p>+39-123-456789 <br/> info@trattoriadafiorella</p>
            <p className='flex space-x-2'>
                <FaFacebook className='cursor-pointer transition duration-300 ease-in-out transform  hover:-translate-y-2 h-4 w-4'/>
                <FaInstagram  className='cursor-pointer transition duration-300 ease-in-out transform  hover:-translate-y-2 h-4 w-4'/>
            </p>
        </div>
    </div>
  )
}

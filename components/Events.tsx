import { quicksand } from '@/app/fonts'
import React from 'react'

export default function Events() {
  return (
    <div className='h-fit text-black py-5 overflow-y-clip'>
        <h1 className='text-6xl md:text-9xl'>Events</h1>
        <div className={`${quicksand.className} md:ml-80 flex space-x-4`}>
            <div className=''>
                <img className='h-[400px] md:h-[500px] w-[300px] object-cover transition duration-300 ease-in-out transform hover:-translate-y-2' src='https://i.pinimg.com/736x/8d/97/c5/8d97c58cc4f579c51e56b47bff60a473.jpg' />
                <p>Jazz Concert</p>
                <p className='text-[#CAB07C]'>25/01/2025 20:30</p>
            </div>
            <div className=''>
                <img className='h-[400px] md:h-[300px] w-[200px] object-cover transition duration-300 ease-in-out transform hover:-translate-y-2' src='https://i.pinimg.com/736x/d0/55/4a/d0554a582409e410524aca34525438ab.jpg' />
                <p>Candle Lit Dinners</p>
                <p className='text-[#CAB07C]'>29/01/2025 20:30</p>
            </div>
            <div className=''>
                <img className='h-[400px] md:h-[600px] w-[370px] object-cover transition duration-300 ease-in-out transform hover:-translate-y-2' src='https://i.pinimg.com/736x/12/49/b5/1249b58daa78da1bc29a292e27b0ed52.jpg' />
                <p>La Dolce Vita Night</p>
                <p className='text-[#CAB07C]'>10/02/2025 20:30</p>
            </div>
            <div className=''>
                <img className='h-[400px] md:h-[500px] w-[230px] object-cover transition duration-300 ease-in-out transform hover:-translate-y-2' src='https://i.pinimg.com/736x/2a/77/c5/2a77c535a24c72520db5664d3dc397ff.jpg' />
                <p>Wine Tasting Night</p>
                <p className='text-[#CAB07C]'>12/02/2025 20:30</p>
            </div>
        </div>
    </div>
  )
}

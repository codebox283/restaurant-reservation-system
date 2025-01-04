"use client";
import Menu from '@/components/Menu';
import BookingForm from '../components/BookingForm';
import { poiret, tangerine, mrsSaintDelafield, quicksand } from './fonts';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
import Link from 'next/link';

const HomePage = () => (
  <div
    className='h-screen bg-cover bg-center'
    style={{ backgroundImage: "url('https://www.vistagroup.ch/fileadmin/_processed_/3/6/csm_Vista_23_c3920cc998.jpg')" }}
  >
    <div className='absolute inset-0 bg-black opacity-40'></div>

    {/* Navbar Section */}
    <div className='flex justify-between p-4 relative z-10'>
      <div className='flex flex-col justify-end text-3xl -space-y-7 text-white'>
        <div className=''>Estd.</div>
        <div className='ml-2 text-5xl'>1964</div>
      </div>
      <h1 className={`${tangerine.className} text-4xl text-white`}>Trattoria da Fiorella</h1>
      <Link href="/reserve" className={`${quicksand.className} text-lg text-white hover:underline cursor-pointer hidden md:block`}>
          RESERVE
      </Link>
    </div>

    {/* HERO */}
    <div className='relative inset-x-0 w-full md:w-2/3 h-[80%] text-white flex flex-col items-start justify-end z-10 px-5 md:px-20 mb-20'>
      <h1 className={`${tangerine.className} text-3xl md:text-6xl`}>
        Bringing La Dolce Vita to Your Table.
      </h1>
      <p className={`${quicksand.className} text-xs md:text-lg md:mt-5`}>
        Experience the joy of Italian living at Trattoria da Fiorella, where we bring La Dolce Vita—the sweet life—to every dish and every moment. Indulge in the rich traditions of Italy, from handmade pastas and wood-fired pizzas to our decadent desserts, all prepared with authentic recipes and the freshest ingredients. Whether you're gathering with loved ones or treating yourself to a night of culinary delight, let us transport you to the heart of Italy with every bite.
      </p>
      <Link href="/reserve" className={`${quicksand.className} bg-white hover:bg-black text-black hover:text-white px-2 py-1 text-lg mt-5`}>
        Book a Table
      </Link>
    </div>

    <div className="flex items-center justify-start h-[400px]">
      <div className={`${quicksand.className} w-full md:w-1/2 px-10 text-xl`}>
        At <span className={`${tangerine.className} text-3xl`}>Tattaria de Fiorella</span>, we are dedicated to delivering a dining experience that reflects the soul of Italy. Located in the vibrant <span className={`${tangerine.className} text-3xl`}>heart of Naples</span>, our restaurant is a haven for those who appreciate the rich heritage of authentic Italian cuisine.
      </div>
    </div>
    <Menu />
    <Events />
    <Footer />
  </div>
);

export default HomePage;

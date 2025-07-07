import React from 'react';
import speaker from '../assets/speaker.png'
import women from '../assets/women.jpg'
import perfume from '../assets/perfume.png'
import woofer from '../assets/woofer.png'

const Arrival = () => {
  return (
    <div className="px-6 py-10 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-[10px] h-[20px] bg-red-600 rounded-sm"></div>
        <h2 className="text-red-600 font-medium text-sm">Featured</h2>
      </div>
      <h1 className="text-2xl font-semibold mb-8">New Arrival</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative bg-black hover:opacity-95 trans h-[300px] md:h-[430px] rounded-lg overflow-hidden">
          <img
            src={speaker}
            alt="PS5"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-semibold">PlayStation 5</h2>
            <p className="text-sm">Black and White version of the PS5 coming out on sale.</p>
            <button className="mt-2 text-sm underline font-medium">Shop Now</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative  bg-black hover:opacity-95 trans h-[180px] md:h-[230px] rounded-lg overflow-hidden col-span-1 md:col-span-2">
            <img
              src={women}
              alt="Women"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-lg font-semibold">Women’s Collections</h2>
              <p className="text-sm">Featured woman collections that give you another vibe.</p>
              <button className="mt-2 text-sm underline font-medium">Shop Now</button>
            </div>
          </div>

          <div className="relative bg-black hover:opacity-95 trans h-[180px] rounded-lg overflow-hidden">
            <img
              src={woofer}
              alt="Speakers"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-lg font-semibold">Speakers</h2>
              <p className="text-sm">Amazon wireless speakers</p>
              <button className="mt-2 text-sm underline font-medium">Shop Now</button>
            </div>
          </div>

          <div className="relative  bg-black hover:opacity-95 trans h-[180px] rounded-lg overflow-hidden">
            <img
              src={perfume}
              alt="Perfume"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-lg font-semibold">Perfume</h2>
              <p className="text-sm">GUCCI INTENSE OUD EDP</p>
              <button className="mt-2 text-sm underline font-medium">Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arrival;

import React from 'react';

const FarmingLoader2 = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-green-50'>
      <div className='relative w-64 h-64 mb-6'>
        {/* Sun */}
        <div className='absolute top-4 right-8'>
          <div className='w-12 h-12 bg-yellow-400 rounded-full animate-pulse-slow relative z-10'>
            {/* Sun rays */}
            <div className='absolute inset-0 animate-spin-slow'>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className='absolute w-1 h-6 bg-yellow-300 rounded-full'
                  style={{
                    transformOrigin: 'bottom center',
                    left: '50%',
                    marginLeft: '-2px',
                    top: '-6px',
                    transform: `rotate(${i * 45}deg)`
                  }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Ground */}
        <div className='absolute bottom-0 w-full h-16 bg-gradient-to-t from-green-900 to-green-800 rounded-lg'></div>

        {/* Soil mounds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='absolute bottom-12 bg-yellow-800 rounded-full w-10 h-6'
            style={{ left: `${15 + i * 12}%` }}></div>
        ))}

        {/* Crops in different growth stages */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='absolute'
            style={{
              bottom: '18px',
              left: `${18 + i * 12}%`,
              animationDelay: `${i * 0.3}s`
            }}>
            <div
              className='w-1 bg-green-600 rounded-full animate-grow-plant'
              style={{ animationDelay: `${i * 0.4}s` }}></div>
            <div
              className='absolute top-0 left-0 w-3 h-2 bg-green-500 rounded-full transform -translate-x-1 -translate-y-1 scale-0 animate-appear-leaf'
              style={{ animationDelay: `${i * 0.4 + 0.3}s` }}></div>
            <div
              className='absolute top-0 right-0 w-3 h-2 bg-green-500 rounded-full transform translate-x-1 -translate-y-1 scale-0 animate-appear-leaf'
              style={{ animationDelay: `${i * 0.4 + 0.5}s` }}></div>
          </div>
        ))}

        {/* Farmer character */}
        <div className='absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-farmer-work'>
          {/* Farmer body */}
          <div className='relative w-12 h-16'>
            {/* Head */}
            <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-700 rounded-full'>
              {/* Face */}
              <div className='absolute top-2 left-1 w-1 h-1 bg-black rounded-full'></div>
              <div className='absolute top-2 right-1 w-1 h-1 bg-black rounded-full'></div>
              <div className='absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-black rounded-full'></div>
            </div>

            {/* Hat */}
            <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-8 h-3 bg-yellow-600 rounded-full'></div>

            {/* Body */}
            <div className='absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-700 rounded-md'></div>

            {/* Arms */}
            <div className='absolute top-6 left-0 w-2 h-6 bg-blue-700 rounded-full'></div>
            <div className='absolute top-6 right-0 w-2 h-6 bg-blue-700 rounded-full arm-right animate-arm-move'></div>

            {/* Legs */}
            <div className='absolute bottom-0 left-2 w-2 h-4 bg-yellow-800 rounded-full'></div>
            <div className='absolute bottom-0 right-2 w-2 h-4 bg-yellow-800 rounded-full'></div>
          </div>

          {/* Farming tool (hoe) */}
          <div className='absolute top-6 right-0 transform rotate-45 animate-tool-move'>
            <div className='w-1 h-8 bg-yellow-900 rounded-full'></div>
            <div className='absolute bottom-0 right-0 w-4 h-1 bg-gray-600 rounded-sm'></div>
          </div>
        </div>

        {/* Water drops from watering can - alternate animation */}
        <div className='absolute bottom-16 right-10 animate-watering-can opacity-0'>
          {/* Watering can */}
          <div className='relative'>
            <div className='w-8 h-5 bg-gray-400 rounded-md'></div>
            <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-1 h-4 bg-gray-400 rounded-full'></div>
            <div className='absolute top-0 right-0 w-4 h-1 bg-gray-400 rounded-full'></div>

            {/* Water drops */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='absolute bottom-0 left-1 w-0.5 h-2 bg-blue-400 rounded-full animate-water-drop'
                style={{
                  left: `${1 + i}px`,
                  animationDelay: `${i * 0.1}s`
                }}></div>
            ))}
          </div>
        </div>

        {/* Clouds */}
        <div className='absolute top-2 left-4 animate-cloud-move'>
          <div className='w-12 h-5 bg-white rounded-full opacity-70'></div>
          <div className='absolute top-1 left-2 w-5 h-5 bg-white rounded-full opacity-70'></div>
          <div className='absolute top-1 left-6 w-6 h-6 bg-white rounded-full opacity-70'></div>
        </div>

        <div className='absolute top-10 right-4 animate-cloud-move-alt'>
          <div className='w-10 h-4 bg-white rounded-full opacity-70'></div>
          <div className='absolute top-1 left-1 w-4 h-4 bg-white rounded-full opacity-70'></div>
          <div className='absolute top-1 left-5 w-5 h-5 bg-white rounded-full opacity-70'></div>
        </div>

        {/* Birds */}
        <div className='absolute top-8 left-1/4 animate-bird-fly'>
          <div className='relative'>
            <div className='absolute w-3 h-1 bg-black rounded-full'></div>
            <div
              className='absolute top-0 left-0 w-1 h-2 bg-black rounded-full animate-wing'
              style={{ transformOrigin: 'bottom right' }}></div>
            <div
              className='absolute top-0 right-0 w-1 h-2 bg-black rounded-full animate-wing'
              style={{ transformOrigin: 'bottom left' }}></div>
          </div>
        </div>

        <div className='absolute top-12 right-1/4 animate-bird-fly-alt'>
          <div className='relative'>
            <div className='absolute w-3 h-1 bg-black rounded-full'></div>
            <div
              className='absolute top-0 left-0 w-1 h-2 bg-black rounded-full animate-wing'
              style={{ transformOrigin: 'bottom right' }}></div>
            <div
              className='absolute top-0 right-0 w-1 h-2 bg-black rounded-full animate-wing'
              style={{ transformOrigin: 'bottom left' }}></div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className='text-center'>
        <div className='flex items-center justify-center'>
          <span className='text-green-800 text-xl font-semibold'>
            Sowing seeds of innovation
          </span>
          <div className='flex ml-2'>
            <div
              className='h-2 w-2 bg-green-600 rounded-full animate-bounce'
              style={{ animationDelay: '0ms' }}></div>
            <div
              className='h-2 w-2 bg-green-600 rounded-full animate-bounce mx-1'
              style={{ animationDelay: '300ms' }}></div>
            <div
              className='h-2 w-2 bg-green-600 rounded-full animate-bounce'
              style={{ animationDelay: '600ms' }}></div>
          </div>
        </div>
        <p className='text-green-700 mt-2 animate-fade-in'>
          KrishiMart is preparing your experience
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes grow-plant {
          0% {
            height: 0;
          }
          70% {
            height: 14px;
          }
          100% {
            height: 12px;
          }
        }

        @keyframes appear-leaf {
          0% {
            transform: scale(0) translate(-1px, -1px);
          }
          70% {
            transform: scale(1.2) translate(-1px, -1px);
          }
          100% {
            transform: scale(1) translate(-1px, -1px);
          }
        }

        @keyframes farmer-work {
          0% {
            transform: translateX(-50%) translateX(-20px);
          }
          25% {
            transform: translateX(-50%) translateX(0px);
          }
          50% {
            transform: translateX(-50%) translateX(20px);
          }
          75% {
            transform: translateX(-50%) translateX(0px);
          }
          100% {
            transform: translateX(-50%) translateX(-20px);
          }
        }

        @keyframes arm-move {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(-15deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes tool-move {
          0% {
            transform: rotate(45deg);
          }
          25% {
            transform: rotate(60deg);
          }
          50% {
            transform: rotate(45deg);
          }
          75% {
            transform: rotate(60deg);
          }
          100% {
            transform: rotate(45deg);
          }
        }

        @keyframes water-drop {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        @keyframes watering-can {
          0% {
            opacity: 0;
          }
          40% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes cloud-move {
          0% {
            transform: translateX(-10px);
          }
          50% {
            transform: translateX(10px);
          }
          100% {
            transform: translateX(-10px);
          }
        }

        @keyframes cloud-move-alt {
          0% {
            transform: translateX(10px);
          }
          50% {
            transform: translateX(-10px);
          }
          100% {
            transform: translateX(10px);
          }
        }

        @keyframes bird-fly {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -10px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes bird-fly-alt {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, -5px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes wing {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(30deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-grow-plant {
          animation: grow-plant 2s ease-out forwards;
        }

        .animate-appear-leaf {
          animation: appear-leaf 1.5s ease-out forwards;
        }

        .animate-farmer-work {
          animation: farmer-work 4s ease-in-out infinite;
        }

        .animate-arm-move {
          animation: arm-move 1s ease-in-out infinite;
          transform-origin: top center;
        }

        .animate-tool-move {
          animation: tool-move 1s ease-in-out infinite;
          transform-origin: top left;
        }

        .animate-watering-can {
          animation: watering-can 4s ease-in-out infinite;
        }

        .animate-water-drop {
          animation: water-drop 1s ease-in-out infinite;
        }

        .animate-cloud-move {
          animation: cloud-move 20s ease-in-out infinite;
        }

        .animate-cloud-move-alt {
          animation: cloud-move-alt 15s ease-in-out infinite;
        }

        .animate-bird-fly {
          animation: bird-fly 10s ease-in-out infinite;
        }

        .animate-bird-fly-alt {
          animation: bird-fly-alt 12s ease-in-out infinite;
        }

        .animate-wing {
          animation: wing 0.5s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FarmingLoader2;

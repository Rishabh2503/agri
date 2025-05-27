import React from 'react';

const FarmingLoader = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-green-50'>
      <div className='relative w-48 h-48 mb-6'>
        {/* Sun with rays animation */}
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='w-16 h-16 bg-yellow-400 rounded-full animate-pulse-slow relative z-10'>
            {/* Sun rays */}
            <div className='absolute inset-0 animate-spin-slow'>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className='absolute w-1 h-8 bg-yellow-300 rounded-full'
                  style={{
                    transformOrigin: 'bottom center',
                    left: '50%',
                    marginLeft: '-2px',
                    top: '-8px',
                    transform: `rotate(${i * 45}deg)`
                  }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Ground with growing plants */}
        <div className='absolute bottom-0 w-full h-12 bg-green-800 rounded-full'></div>

        {/* Tractor moving animation */}
        <div className='absolute bottom-12 animate-tractor-move'>
          <div className='relative w-16 h-10'>
            {/* Tractor body */}
            <div className='absolute bottom-0 w-12 h-6 bg-red-600 rounded-t-md'></div>
            <div className='absolute bottom-0 left-10 w-6 h-8 bg-red-700 rounded-t-md'></div>

            {/* Cabin */}
            <div className='absolute bottom-6 left-2 w-6 h-4 bg-blue-500 rounded-t-md'></div>

            {/* Wheels */}
            <div className='absolute bottom-0 left-1 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-300 animate-spin-wheel'></div>
            <div className='absolute bottom-0 left-11 w-3 h-3 bg-gray-800 rounded-full border-2 border-gray-300 animate-spin-wheel'></div>
          </div>
        </div>

        {/* Growing plants animation */}
        <div className='absolute bottom-12 w-full flex justify-around'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='relative'>
              <div
                className='w-1 bg-green-600 rounded-full animate-grow-plant'
                style={{
                  height: '0',
                  animationDelay: `${i * 0.2}s`
                }}></div>
              <div
                className='absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1 -translate-y-3 scale-0 animate-appear-leaf'
                style={{
                  animationDelay: `${i * 0.2 + 0.5}s`
                }}></div>
              <div
                className='absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full transform translate-x-1 -translate-y-2 scale-0 animate-appear-leaf'
                style={{
                  animationDelay: `${i * 0.2 + 0.8}s`
                }}></div>
            </div>
          ))}
        </div>

        {/* Rain drops animation */}
        <div className='absolute inset-0 overflow-hidden'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className='absolute w-0.5 h-3 bg-blue-400 rounded-full animate-rain'
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.6 + Math.random() * 0.4}s`
              }}></div>
          ))}
        </div>
      </div>

      {/* Text with typing animation */}
      <div className='text-green-800 font-semibold text-xl relative'>
        <span className='inline-block animate-text-appear'>Growing</span>
        <span
          className='inline-block animate-text-appear'
          style={{ animationDelay: '0.4s' }}>
          {' '}
          your
        </span>
        <span
          className='inline-block animate-text-appear'
          style={{ animationDelay: '0.8s' }}>
          {' '}
          experience...
        </span>
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

        @keyframes spin-wheel {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes tractor-move {
          0% {
            transform: translateX(-50px);
          }
          45% {
            transform: translateX(80px);
          }
          50% {
            transform: translateX(80px) scaleX(-1);
          }
          95% {
            transform: translateX(-50px) scaleX(-1);
          }
          100% {
            transform: translateX(-50px);
          }
        }

        @keyframes grow-plant {
          0% {
            height: 0;
          }
          70% {
            height: 15px;
          }
          100% {
            height: 12px;
          }
        }

        @keyframes appear-leaf {
          0% {
            transform: scale(0) translate(-1px, -3px);
          }
          70% {
            transform: scale(1.2) translate(-1px, -3px);
          }
          100% {
            transform: scale(1) translate(-1px, -3px);
          }
        }

        @keyframes rain {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }

        @keyframes text-appear {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-spin-wheel {
          animation: spin-wheel 1s linear infinite;
        }

        .animate-tractor-move {
          animation: tractor-move 6s ease-in-out infinite;
        }

        .animate-grow-plant {
          animation: grow-plant 2s ease-out forwards;
        }

        .animate-appear-leaf {
          animation: appear-leaf 1s ease-out forwards;
        }

        .animate-rain {
          animation: rain 1.5s linear infinite;
        }

        .animate-text-appear {
          animation: text-appear 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Updated Loading component with the farming-themed animation
const Loading = () => <FarmingLoader />;

export default Loading;

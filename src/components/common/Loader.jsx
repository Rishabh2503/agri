import { motion } from 'framer-motion';
import React from 'react';

const Loader = ({ size = 'md', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
    };

    const loaderVariants = {
        animate: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 1,
                ease: 'linear',
            },
        },
    };

    const loader = (
        <div className="flex items-center justify-center">
            <motion.div
                className={`${sizeClasses[size]} text-green-600`}
                animate="animate"
                variants={loaderVariants}
            >
                <svg
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </motion.div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                {loader}
            </div>
        );
    }

    return loader;
};

export default Loader;
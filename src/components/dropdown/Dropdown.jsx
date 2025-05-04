import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Dropdown = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
                <span className="text-sm">{title}</span>
                {isOpen ? (
                    <FaChevronUp className="text-gray-400" />
                ) : (
                    <FaChevronDown className="text-gray-400" />
                )}
            </button>
            
            {isOpen && (
                <div className="pl-4 mt-1 space-y-1">
                    <label className="flex items-center text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-2">Option 1</span>
                    </label>
                    <label className="flex items-center text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-2">Option 2</span>
                    </label>
                    <label className="flex items-center text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-2">Option 3</span>
                    </label>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
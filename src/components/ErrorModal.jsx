import React from 'react';

const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm">
            <p className="text-red-500 font-semibold">{message}</p>
            <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Close
            </button>
        </div>
        </div>
    );
};

export default ErrorModal;

import React, { useState } from 'react';

export default function Pagination({ totalPages = 5, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        if (onPageChange) onPageChange(page);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            handlePageClick(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageClick(currentPage + 1);
        }
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`h-10 w-10 flex items-center justify-center aspect-square ${currentPage === i
                            ? 'text-indigo-500 border border-indigo-200 rounded-full'
                            : ''
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
            <button
                type="button"
                aria-label="prev"
                className="rounded-full bg-slate-200/50"
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078" />
                </svg>
            </button>

            <div className="flex items-center gap-2 text-sm font-medium">
                {renderPages()}
            </div>

            <button
                type="button"
                aria-label="next"
                className="rounded-full bg-slate-200/50"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                <svg className="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078" />
                </svg>
            </button>
        </div>
    );
}

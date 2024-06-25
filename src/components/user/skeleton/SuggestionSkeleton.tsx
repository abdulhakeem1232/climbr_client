import React from 'react'

function SuggestionSkeleton() {
    return (
        <div className="flex items-center p-2 space-x-2 animate-pulse">
            <div className="rounded-full bg-gray-300 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-16"></div>
        </div>
    )
}

export default SuggestionSkeleton


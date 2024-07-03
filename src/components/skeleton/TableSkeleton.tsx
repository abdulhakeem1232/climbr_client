import React from 'react';

function TableSkeleton() {
    return (
        <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                    <td className='border px-4 py-2'>
                        <div className='animate-pulse h-4 bg-gray-300 rounded'></div>
                    </td>
                    <td className='border px-4 py-2'>
                        <div className='animate-pulse h-4 bg-gray-300 rounded'></div>
                    </td>
                    <td className='border px-4 py-2'>
                        <div className='animate-pulse h-4 bg-gray-300 rounded'></div>
                    </td>
                    <td className='border px-4 py-2'>
                        <div className='animate-pulse h-4 bg-gray-300 rounded'></div>
                    </td>
                    <td className='border px-4 py-2'>
                        <div className='animate-pulse h-4 bg-gray-300 rounded'></div>
                    </td>
                    <td className='border px-4 py-2'>
                        <div className='animate-pulse h-4 bg-gray-300 rounded'></div>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

export default TableSkeleton;

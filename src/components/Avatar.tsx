import React from 'react'

interface AvatarProps {
    readonly image: string;
    readonly status: 'Alive' | 'Dead' | 'unknown';
}

export default function Avatar({ image, status }: AvatarProps) {
    console.log(status);
    
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Alive':
                return 'bg-green-400 ring-2';
            case 'Dead':
                return 'bg-red-400 ring-2';
            case 'unknown':
                return 'bg-gray-300 ring-2';
            default:
                return '';
        }
    };

    return (
        <span className="relative inline-block">
            <img
                alt=""
                src={image}
                className="h-16 w-16 rounded-full"
            />
            <span className={`absolute right-0 top-0 block h-4 w-4 rounded-full ${getStatusClass(status)}`} />
        </span>
    )
}
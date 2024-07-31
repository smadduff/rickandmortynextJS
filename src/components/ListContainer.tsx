import React from 'react';
import Avatar from './Avatar';
import Link from 'next/link';

interface ListContainerProps {
  characters: {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    image: string;
    location: { name: string };
  }[];
}

const ListContainer: React.FC<ListContainerProps> = ({ characters }) => {
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {characters.map((character) => (
          <li key={character.id} className="py-4">
            <Link href={`/personaje/${character.id}`} className="block hover:bg-gray-100 transition duration-150 ease-in-out">
              <div className="flex min-w-0 gap-x-4">
                <Avatar image={character.image} status={character.status} />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{character.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{character.location.name}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListContainer;
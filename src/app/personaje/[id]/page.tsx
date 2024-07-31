import React from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharacterPageProps {
  params: {
    id: string;
  };
}

const fetchCharacter = async (id: string): Promise<Character> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }
  const character: Character = await response.json();
  return character;
};

const CharacterPage: React.FC<CharacterPageProps> = async ({ params }) => {
  const character = await fetchCharacter(params.id);

  return (
    <Container>
        
      <div className="bg-white py-16 sm:py-24">
      <Link href="/" passHref>
        <Button>
            <ArrowLeftCircleIcon aria-hidden="true" className="-mr-0.5 h-5 w-5"/>Anterior
          </Button>
          </Link>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <div className="flex justify-center lg:block">
              <img
                src={character.image}
                alt={character.name}
                className="h-64 w-64 object-cover rounded-full shadow-lg sm:h-80 sm:w-80 lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-10 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{character.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Character information</h2>
                <p className="text-lg font-medium text-gray-900">Status: {character.status}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Details</h3>
                <div className="mt-2 text-base text-gray-700">
                  <p>Species: {character.species}</p>
                  <p>Gender: {character.gender}</p>
                  <p>Origin: {character.origin.name}</p>
                  <p>Location: {character.location.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CharacterPage;

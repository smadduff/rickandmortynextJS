"use client";
import { useEffect, useState } from "react";
import ListContainer from "@/components/ListContainer";
import Container from "@/components/Container";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Button from "@/components/Button";

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

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface ApiResponse {
  info: Info;
  results: Character[];
}

// Definición de la función fetchCharacters con tipos
async function fetchCharacters(page: number = 1, name: string = ''): Promise<ApiResponse> {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
}

export default function Home() {
  const [results, setResults] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCharacters(page, name).then((data) => {
      setResults(data.results);
      setInfo(data.info || { count: 0, pages: 0, next: null, prev: null });
    }).catch(error => {
      setResults([]);
      setInfo({ count: 0, pages: 0, next: null, prev: null });
    });
  }, [page, name]);

  const handleNextPage = () => {
    if (info?.next) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (info?.prev) {
      setPage(page - 1);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchCharacters(1, name).then((data) => {
      setResults(data.results);
      setInfo(data.info || { count: 0, pages: 0, next: null, prev: null });
    }).catch(error => {
      setResults([]);
      setInfo({ count: 0, pages: 0, next: null, prev: null });
    });
  };

  return (
    <Container>
      <div>
        <form onSubmit={handleSearch} className="mb-4 mt-10">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Buscar por nombre"
            className="mr-2 p-1 border rounded"
          />
        </form>
        {results.length > 0 ? (
          <ListContainer characters={results} />
        ) : (
          <p className="text-center text-gray-500">No se han encontrado resultados con ese nombre.</p>
        )}
      </div>
      <div className="flex justify-between mt-4 mb-8">
        {page > 1 && (
          <Button onClick={handlePrevPage} disabled={!info?.prev}>
            <ArrowLeftCircleIcon aria-hidden="true" className="-mr-0.5 h-5 w-5"/>Anterior
          </Button>
        )}
        <Button onClick={handleNextPage} disabled={!info?.next}>
          Siguiente
          <ArrowRightCircleIcon aria-hidden="true" className="-mr-0.5 h-5 w-5"/>
        </Button>
      </div>
    </Container>
  );
}

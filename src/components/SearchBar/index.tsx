'use client';

import { useState, FormEvent } from 'react';
import styles from './styles.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar usuarios de GitHub..."
        className={styles.input}
      />
      <button
        type="submit"
        disabled={!query.trim()}
        className={styles.button}
      >
        Buscar
      </button>
    </form>
  );
}

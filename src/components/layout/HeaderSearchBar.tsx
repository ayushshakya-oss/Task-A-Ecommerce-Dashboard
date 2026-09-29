'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Command } from 'lucide-react';
import { HeaderCategoryDropdown } from './HeaderCategoryDropdown';

interface HeaderSearchBarProps {
  categories: string[];
  className?: string;
}

export function HeaderSearchBar({
  categories,
  className = '',
}: HeaderSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(urlSearch);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync search input if URL changes externally
  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category && category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    if (search.trim()) {
      params.set('search', search.trim());
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }

    if (urlCategory && urlCategory !== 'all') {
      params.set('category', urlCategory);
    } else {
      params.delete('category');
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex-1 max-w-2xl hidden md:flex items-center gap-space-sm ${className}`}
    >
      <div
        onClick={() => inputRef.current?.focus()}
        className="relative flex-1 flex items-center bg-surface-container-low rounded-lg px-space-md py-2 focus-within:ring-2 focus-within:ring-surface-tint/20 transition-all border border-transparent focus-within:border-primary/20 cursor-text"
      >
        <Search className="w-4 h-4 text-outline mr-2 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, brands, categories..."
          className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
        />
        <kbd
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.focus();
            inputRef.current?.select();
          }}
          className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] text-on-surface-variant bg-surface-container-highest shrink-0 cursor-pointer select-none hover:bg-surface-container-high transition-colors"
          title="Press Ctrl+K or ⌘K to search"
        >
          <Command className="w-3 h-3" />K
        </kbd>
      </div>

      {/* Custom Dynamic Category Selector derived directly from URL */}
      <HeaderCategoryDropdown
        categories={categories}
        selectedCategory={urlCategory}
        onCategorySelect={handleCategorySelect}
      />
    </form>
  );
}

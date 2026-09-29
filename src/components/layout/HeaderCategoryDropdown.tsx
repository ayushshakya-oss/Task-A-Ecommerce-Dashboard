'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Layers } from 'lucide-react';

interface HeaderCategoryDropdownProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  className?: string;
}

export function HeaderCategoryDropdown({
  categories,
  selectedCategory,
  onCategorySelect,
  className = '',
}: HeaderCategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const formatCategoryName = (cat: string) => {
    if (!cat || cat === 'all') return 'All Categories';
    return cat
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleSelect = (category: string) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className={`relative shrink-0 ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center justify-between gap-2 bg-surface-container-low hover:bg-surface-container text-xs text-on-surface-variant hover:text-on-surface font-medium py-2 px-3 rounded-lg border border-transparent hover:border-surface-container transition-all cursor-pointer min-w-[140px] max-w-[170px]"
      >
        <span className="truncate">
          {formatCategoryName(selectedCategory)}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-outline shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {/* Flyout Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 w-56 max-h-72 overflow-y-auto rounded-xl bg-surface-container-lowest shadow-xl border border-surface-container z-50 p-1.5 animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Header Label */}
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-outline border-b border-surface-container-low mb-1 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-primary" />
            <span>Select Category</span>
          </div>

          {/* Option: All Categories */}
          <button
            type="button"
            role="option"
            aria-selected={selectedCategory === 'all'}
            onClick={() => handleSelect('all')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
              selectedCategory === 'all'
                ? 'bg-primary-container/10 text-primary font-semibold'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === 'all' && (
              <Check className="w-3.5 h-3.5 text-primary shrink-0" />
            )}
          </button>

          {/* Dynamic Categories */}
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(cat)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-primary-container/10 text-primary font-semibold'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span className="truncate">{formatCategoryName(cat)}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

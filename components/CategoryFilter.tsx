import React from 'react';
import { Category } from '../types';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../lib/translations';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { t } = useSettings();
  const allCategories: (Category | 'All')[] = ['All', ...categories];

  const baseButtonClass = "px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-cyan-500";
  const activeButtonClass = "bg-cyan-600 text-white shadow-md";
  const inactiveButtonClass = "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
      <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mr-3 hidden sm:block">
        {t('filterByCategory')}:
      </h2>
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`${baseButtonClass} ${
            selectedCategory === category ? activeButtonClass : inactiveButtonClass
          }`}
          aria-pressed={selectedCategory === category}
        >
          {t(category.toLowerCase() as keyof typeof translations.en)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

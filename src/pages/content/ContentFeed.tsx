import React, { useEffect } from 'react';
import { fetchContent, toggleViewMode, setSelectedCategories } from '../../store/slices/contentSlice';
import ContentCard from './ContentCard';
import { categories } from '../../data/mockData';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const ContentFeed: React.FC = () => {
    const dispatch = useAppDispatch();
    const { 
      filteredItems, 
      viewMode, 
      loading, 
      error,
      selectedCategories 
    } = useAppSelector(state => state.content);
  
    useEffect(() => {
      dispatch(fetchContent());
    }, [dispatch]);

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    dispatch(setSelectedCategories(newCategories));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategories.includes(category)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Learning Feed</h2>
        <button
          onClick={() => dispatch(toggleViewMode())}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {viewMode === 'card' ? 'Switch to List' : 'Switch to Cards'}
        </button>
      </div>

      <div className={`${
        viewMode === 'card' 
          ? 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'flex flex-col gap-4'
      }`}>
        {filteredItems.map(item => (
          <ContentCard key={item.id} item={item} viewMode={viewMode} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Content doesn't match your selected filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentFeed;
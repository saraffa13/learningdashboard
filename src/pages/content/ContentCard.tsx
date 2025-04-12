import React from 'react';
import { ContentItem } from '../../data/mockData';

interface ContentCardProps {
  item: ContentItem;
  viewMode: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, viewMode }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden duration-300 ${
      viewMode === 'card' ? 'w-full md:w-[85%] lg:w-[85%] m-auto' : 'flex items-center p-4'
    }`}>
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`object-cover ${viewMode === 'card' ? 'w-full h-48' : 'w-24 h-24 mr-4'}`}
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm px-2 py-1 rounded font-medium ${
            item.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            item.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {item.level}
          </span>
          <span className="text-sm text-gray-500">{item.duration}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
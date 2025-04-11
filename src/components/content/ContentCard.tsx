import React from 'react';
import { ContentItem } from '../../data/mockData';

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300">
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm px-2 py-1 rounded ${
            item.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            item.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {item.level}
          </span>
          <span className="text-sm text-gray-500">{item.duration}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-4">{item.description}</p>
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

import React from 'react';
import { Clock, Eye } from 'lucide-react';

interface NewsCardProps {
  title: string;
  excerpt: string;
  image: string;
  timeAgo: string;
  views: number;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  image,
  timeAgo,
  views
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{timeAgo}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

// src/components/Breadcrumbs.tsx
import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  id: string | number;
  name: string;
}

interface BreadcrumbsProps {
  path: BreadcrumbItem[];
  // Optional: A function to handle clicking on a breadcrumb
  onBreadcrumbClick?: (item: BreadcrumbItem) => void;
}

export default function Breadcrumbs({
  path,
  onBreadcrumbClick,
}: BreadcrumbsProps) {
  if (!path || path.length === 0) {
    return null; // Don't render if no path
  }

  return (
    <nav className="flex items-center text-sm" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {path.map((item, index) => (
          <li key={item.id} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight
                size={14}
                className="flex-shrink-0 text-gray-400 mx-2"
              />
            )}
            {onBreadcrumbClick && index < path.length - 1 ? ( // Only clickable for non-last items if handler provided
              <button
                onClick={() => onBreadcrumbClick(item)}
                className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </button>
            ) : (
              <span className="inline-flex items-center text-gray-800 font-semibold">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

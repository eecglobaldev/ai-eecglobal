/**
 * ============================================================================
 * BREADCRUMBS NAVIGATION COMPONENT
 * ============================================================================
 * 
 * Visible breadcrumb navigation matching the BreadcrumbList schema.
 * Critical for:
 * - User navigation
 * - SEO (visible breadcrumbs = schema validation)
 * - Google search result enhancements
 * 
 * ============================================================================
 */

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  {
    name: 'EEC Main Website',
    url: 'https://eecglobal.com',
  },
  {
    name: 'AI Tools',
    url: 'https://ai.eecglobal.com',
  },
  {
    name: 'UK Course Search',
    url: 'https://courses.eecglobal.com/united-kingdom',
  },
  {
    name: 'UK Pre-CAS Interview Prep',
    url: 'https://ai.eecglobal.com/ukprecas',
    current: true,
  },
];

export const Breadcrumbs: React.FC = () => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="m-7"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {BREADCRUMB_ITEMS.map((item, index) => (
          <li 
            key={item.url}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-500 mx-1 flex-shrink-0" />
            )}
            
            {index === 0 && (
              <Home className="h-4 w-4 text-slate-400 dark:text-slate-500 mr-1 flex-shrink-0" />
            )}
            
            {item.current ? (
              <span 
                className="text-indigo-600 dark:text-indigo-400 font-medium"
                itemProp="name"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <a
                href={item.url}
                target={item.url.includes('ai.eecglobal.com/ukprecas') ? '_self' : '_blank'}
                rel={item.url.includes('ai.eecglobal.com/ukprecas') ? undefined : 'noopener noreferrer'}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.name}</span>
              </a>
            )}
            
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;


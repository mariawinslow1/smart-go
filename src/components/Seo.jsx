import { useEffect } from 'react';
import { siteConfig } from '../config';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export default function Seo({ title, description, path = '' }) {
  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (siteConfig.siteUrl) {
      const link = canonical || document.head.appendChild(document.createElement('link'));
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', `${siteConfig.siteUrl}${path}`);
    } else if (canonical) canonical.remove();
  }, [title, description, path]);
  return null;
}

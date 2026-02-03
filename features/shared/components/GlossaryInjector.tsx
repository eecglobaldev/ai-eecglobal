import React from 'react';
import Link from 'next/link';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryTerms';

interface GlossaryInjectorProps {
    children: React.ReactNode;
}

/**
 * Enhanced GlossaryInjector that recursively processes React nodes.
 * It finds glossary terms in text nodes and wraps them in a Link component.
 * It intelligently skips existing Links and other interactive elements.
 */
export default function GlossaryInjector({ children }: GlossaryInjectorProps): React.JSX.Element {
    // Memoize terms regex construction to avoid rebuilding on every render
    // Sort terms by length (descending) to match longer phrases first (e.g. "Genuine Student Test" before "Genuine Student")
    const sortedTerms = React.useMemo(() => {
        return [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);
    }, []);

    const processText = (text: string): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;

        // Create a master regex for all terms
        // We use word boundaries (\b) to avoid partial matches inside other words
        const patterns = sortedTerms.map(t => {
            const vars = [t.term, ...(t.variations || [])];
            // Escape special regex chars
            const escapedVars = vars.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            return escapedVars.join('|');
        }).join('|');

        const regex = new RegExp(`\\b(${patterns})\\b`, 'gi');

        let match;
        while ((match = regex.exec(text)) !== null) {
            // Push text before match
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }

            const matchText = match[0];
            // Find which term matched
            const matchedTerm = sortedTerms.find(t => {
                const vars = [t.term, ...(t.variations || [])];
                return vars.some(v => v.toLowerCase() === matchText.toLowerCase());
            });

            if (matchedTerm) {
                parts.push(
                    <Link
                        key={`${matchedTerm.term}-${match.index}`}
                        href={matchedTerm.url}
                        className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 font-medium underline decoration-amber-500/30 hover:decoration-amber-500 transition-colors"
                        title={`Read definition of ${matchedTerm.term}`}
                    >
                        {matchText}
                    </Link>
                );
            } else {
                parts.push(matchText);
            }

            lastIndex = regex.lastIndex;
        }

        // Push remaining text
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts;
    };

    const processNode = (node: React.ReactNode): React.ReactNode => {
        if (typeof node === 'string') {
            return processText(node);
        }

        if (Array.isArray(node)) {
            return React.Children.map(node, processNode);
        }

        if (React.isValidElement(node)) {
            const element = node as React.ReactElement<any>;
            // Skip processing for Links or interactive elements to avoid nested links
            const type = element.type;
            if (type === Link || type === 'a' || type === 'button' || type === 'input') {
                return node;
            }

            // If it has children, process them recursively
            if (element.props.children) {
                return React.cloneElement(
                    element,
                    { ...element.props, key: element.key }, // Preserve key
                    processNode(element.props.children)
                );
            }
        }

        return node;
    };

    return <>{processNode(children)}</>;
}

import { NextResponse } from 'next/server';

export async function GET() {
    const llmContent = `# llm.txt — UK Pre-CAS Prep Tool Context
# Version: 1.0
# Maintainer: EEC

# TOOL: UK Pre-CAS Credibility Interview AI
# URL: https://ai.eecglobal.com/ukprecas/
# DESCRIPTION: Dedicated preparation tool for UK University Pre-CAS interviews.

# KEY FEATURES:
# - Simulates credibility interviews conducted by UK universities.
# - Checks for knowledge of course modules, university location, and finances.
# - Helps prepared for the 'Credibility Interview' by UKVI if requested.

# SUB-PAGES:
# /dashboard - Track practice sessions.
# /preparation-guide - Step-by-step guide to clearing the interview.
# /faq - Common queries about CAS and the interview.
# /glossary - UK study terms (CAS, BRP, IHS).
# /resources - Checklists for documents.
`;

    return new NextResponse(llmContent, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}

import { NextResponse } from 'next/server';

export async function GET() {
    const llmContent = `# llm.txt — NZ Visa Prep Tool Context
# Version: 1.0
# Maintainer: EEC

# TOOL: New Zealand Student Visa Prep AI
# URL: https://ai.eecglobal.com/nzvisaprep/
# DESCRIPTION: AI-driven preparation for New Zealand student visa interviews.

# KEY FEATURES:
# - Focuses on INZ (Immigration New Zealand) interview standards.
# - Covers financial capability (FTS), course progression, and post-study plans.
# - Real-time feedback on interview performance.

# SUB-PAGES:
# /dashboard - User dashboard.
# /preparation-guide - Guide for NZ student visa process.
# /faq - FAQs about NZ study and work rights.
# /glossary - NZ terms (INZ, FTS, IPV).
# /resources - Official forms and guides.
`;

    return new NextResponse(llmContent, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}

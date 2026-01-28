import { NextResponse } from 'next/server';

export async function GET() {
    const llmContent = `# llm.txt — Australia GS Prep Tool Context
# Version: 1.0
# Maintainer: EEC

# TOOL: Australia Genuine Student (GS) Prep AI
# URL: https://ai.eecglobal.com/australiagsprep/
# DESCRIPTION: AI interview preparation for the Australian Student Visa (Subclass 500) Genuine Student requirement.

# KEY FEATURES:
# - Replaces the old GTE (Genuine Temporary Entrant) requirement prep.
# - Focuses on the 5 key GS questions mandated by Australian Home Affairs.
# - Evaluates answers for course relevance, ties to home country, and economic circumstances.

# SUB-PAGES:
# /dashboard - Practice history and insights.
# /preparation-guide - Guide to the new GS criteria.
# /faq - Frequently asked questions about GS and Australia study.
# /glossary - Terms related to Australian visas (CoE, OSHC, CRICOS).
# /resources - Templates and official links.
`;

    return new NextResponse(llmContent, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}

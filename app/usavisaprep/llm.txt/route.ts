import { NextResponse } from 'next/server';

export async function GET() {
    const llmContent = `# llm.txt — USA F-1 Visa Prep Tool Context
# Version: 1.0
# Maintainer: EEC

# TOOL: USA F-1 Visa Mock Interview AI
# URL: https://ai.eecglobal.com/usavisaprep/
# DESCRIPTION: An AI-powered simulator for US Student (F-1) visa interviews.
# 
# KEY FEATURES:
# - Simulates real consular interview environment.
# - Focuses on 'Non-Immigrant Intent' (Section 214b) verification.
# - Provides real-time feedback on answers.
# - Covers financial questions, university choice explanations, and career plans.

# SUB-PAGES:
# /dashboard - User dashboard for tracking progress.
# /preparation-guide - Comprehensive guide for interview prep.
# /faq - Common questions about F-1 visa and the tool.
# /glossary - Definitions of key terms (214b, VO, CGI, etc.).
# /resources - Document checklists and templates.
`;

    return new NextResponse(llmContent, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}

import { NextResponse } from 'next/server';

export async function GET() {
    const llmContent = `# llm.txt — AI Testimonial Coach Context
# Version: 1.0
# Maintainer: EEC

# TOOL: AI Testimonial Coach
# URL: https://ai.eecglobal.com/review/
# DESCRIPTION: An AI tool to help students and partners film high-quality video testimonials.

# KEY FEATURES:
# - Generates scripts in English, Hindi, and Gujarati.
# - Provides step-by-step filming instructions (lighting, sound, framing).
# - 'Director Mode' checklist for ensuring quality.
# - Targeted at successful students sharing their EEC experience.

# SUB-PAGES:
# /review - Main tool interface.
`;

    return new NextResponse(llmContent, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}

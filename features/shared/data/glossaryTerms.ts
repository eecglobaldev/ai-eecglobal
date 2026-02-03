export interface GlossaryTerm {
    term: string;
    url: string;
    variations?: string[];
    caseSensitive?: boolean;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
    {
        term: "CAS",
        url: "/glossary/cas",
        variations: ["Confirmation of Acceptance for Studies"]
    },
    {
        term: "CoE",
        url: "/glossary/coe",
        variations: ["Confirmation of Enrolment", "COE"]
    },
    {
        term: "Genuine Student",
        url: "/glossary/genuine-student-test",
        variations: ["GS test", "GS requirement", "Genuine Student test"]
    },
    {
        term: "Blocked Account",
        url: "/glossary/blocked-account",
        variations: ["Sperrkonto"]
    },
    {
        term: "DS-160",
        url: "/glossary/ds-160",
        variations: ["DS160"]
    },
    {
        term: "F-1 Visa",
        url: "/glossary/f1-visa",
        variations: ["F1 Visa", "F-1 student visa"]
    },
    {
        term: "I-20",
        url: "/glossary/i-20",
        variations: ["I20", "Form I-20"]
    },
    {
        term: "IHS",
        url: "/glossary/ihs",
        variations: ["Immigration Health Surcharge"]
    },
    {
        term: "LOA",
        url: "/glossary/loa",
        variations: ["Letter of Acceptance"]
    },
    {
        term: "SOP",
        url: "/glossary/sop",
        variations: ["Statement of Purpose"]
    }
];

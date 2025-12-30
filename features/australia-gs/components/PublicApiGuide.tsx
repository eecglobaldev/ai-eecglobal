import React from 'react';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
    <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <code>{code}</code>
    </pre>
);

export const PublicApiGuide: React.FC = () => {
    const apiEndpoint = "/data/eec_australia_dataset.json";
    const fullApiUrl = `${window.location.origin}${apiEndpoint}`;

    const sampleResponse = `{
  "approvedBanks": [
    { "name": "State Bank of India", "type": "Public Sector Bank" },
    ...
  ],
  "citiesData": [
    { "city": "Sydney", "state": "New South Wales", "category": 1, ... },
    ...
  ],
  "highDemandJobs": [
    { "field": "Healthcare", "role": "Registered Nurse", ... },
    ...
  ]
}`;

    const usageExample = `fetch('${fullApiUrl}')
  .then(response => response.json())
  .then(data => {
    console.log('Approved Banks:', data.approvedBanks);
    console.log('Cities Data:', data.citiesData);
    console.log('High Demand Jobs:', data.highDemandJobs);
  });`;

    return (
        <div className="py-8">
            <header className="text-center mb-10 max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-gray-600">Public Data API</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2">
                    Access our curated dataset on Australian banks, cities, and high-demand jobs for your projects, research, or applications.
                </p>
            </header>

            <div className="max-w-3xl mx-auto px-4 space-y-8">
                <div className="p-6 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">API Endpoint</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        This is a simple, read-only API that returns a single JSON object containing all datasets.
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg font-mono text-sm text-brand dark:text-brand-light border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <a href={fullApiUrl} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{fullApiUrl}</a>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Usage Example (JavaScript)</h3>
                    <CodeBlock code={usageExample} />
                </div>

                <div className="p-6 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Data Structure (Sample)</h3>
                    <CodeBlock code={sampleResponse} />
                </div>

                <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800/50">
                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Terms of Use & Attribution</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                        This data is provided for free under a Creative Commons license. You are free to use it for any non-commercial purpose. If you use this data in a public-facing project, we kindly request that you provide attribution by linking back to our{' '}
                        <a href="/australiagsprep" className="font-bold underline">GS Prep Tool</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PublicApiGuide;

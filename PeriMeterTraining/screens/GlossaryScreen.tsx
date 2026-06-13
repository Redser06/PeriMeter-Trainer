import React, { useState, useMemo } from 'react';

interface GlossaryEntry {
  term: string;
  definition: string;
  category: 'Technical' | 'Product' | 'Business' | 'Marketing';
  meaning: string;
  relevance: string;
}

const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    term: 'API',
    definition: 'Application Programming Interface',
    category: 'Technical',
    meaning: 'A set of rules and protocols that allows one software application to communicate with another. It defines the methods and data formats that applications can use to request and exchange information.',
    relevance: 'Crucial for our integration capabilities. When clients ask "Can PeriMeter connect to my CRM?", they are asking if we have a public API or native integration built via APIs.',
  },
  {
    term: 'ARR',
    definition: 'Annual Recurring Revenue',
    category: 'Business',
    meaning: 'The value of the contracted recurring revenue components of your term subscriptions normalized to a one-year period. It is a key metric used by SaaS companies to measure growth and predict future revenue.',
    relevance: 'Our primary North Star metric for company valuation and growth tracking. All feature launches are evaluated partly on their potential to drive net-new ARR or protect existing ARR from churn.',
  },
  {
    term: 'CAC',
    definition: 'Customer Acquisition Cost',
    category: 'Business',
    meaning: 'The total cost of sales and marketing efforts required to acquire a single new customer over a given period, including all advertising spend, salaries, and overhead.',
    relevance: 'We track this closely alongside LTV. To maintain healthy economics, our LTV:CAC ratio must stay above 3:1.',
  },
  {
    term: 'DAU',
    definition: 'Daily Active Users',
    category: 'Product',
    meaning: 'A metric that measures the total number of unique users who engage with a product or service on a given day. "Engagement" usually means logging in and performing at least one core action.',
    relevance: "We track DAU/MAU ratio to measure platform stickiness. High DAU indicates the tool has become a daily habit for the user's workflow, which strongly correlates with lower churn rates.",
  },
  {
    term: 'GTM',
    definition: 'Go-To-Market',
    category: 'Marketing',
    meaning: 'A tactical action plan that outlines how a company will launch a new product or feature, target the right audience, and achieve a competitive advantage.',
    relevance: 'Every major feature release requires a coordinated GTM sync 4 weeks prior to launch involving Product, PMM, and Sales.',
  },
  {
    term: 'LTV',
    definition: 'Lifetime Value',
    category: 'Business',
    meaning: 'An estimate of the average gross revenue that a single customer account will generate for your business over the entire lifespan of their contract or relationship.',
    relevance: 'Helps us justify research and engineering investments into retention-focused features that extend customer contracts.',
  },
  {
    term: 'MVP',
    definition: 'Minimum Viable Product',
    category: 'Product',
    meaning: "A version of a new product which allows a product team to collect the maximum amount of validated learning about customers with the least effort. It's the smallest thing you can build that delivers customer value.",
    relevance: 'Our default approach to new feature development. We aim to ship an MVP quickly to beta testers to validate assumptions before committing heavy engineering resources to polish and edge cases.',
  },
  {
    term: 'PII',
    definition: 'Personally Identifiable Information',
    category: 'Technical',
    meaning: 'Any representation of information that permits the identity of an individual to whom the information applies to be reasonably inferred by either direct or indirect means.',
    relevance: 'Subject to strict compliance laws (GDPR/HIPAA). We perform automated PII scans on all documents uploaded to PeriMeter to guarantee customer privacy.',
  },
  {
    term: 'PRD',
    definition: 'Product Requirements Document',
    category: 'Product',
    meaning: 'A document written by a product manager that clearly defines the purpose, features, value, and success criteria of a product or feature, serving as the blueprint for engineering development.',
    relevance: 'Our engineering teams require a finalized, walkthrough-approved PRD before tickets can be groomed and pointed for active sprints.',
  },
];

const GlossaryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Categories list
  const categories: { label: string; value: GlossaryEntry['category'] }[] = [
    { label: 'Technical (Engineering)', value: 'Technical' },
    { label: 'Product Management', value: 'Product' },
    { label: 'Business / Sales', value: 'Business' },
    { label: 'Marketing', value: 'Marketing' },
  ];

  // Alphabet list
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  // Toggle category filters
  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Filter glossary entries
  const filteredEntries = useMemo(() => {
    return GLOSSARY_ENTRIES.filter((entry) => {
      // Search term
      const matchesSearch =
        entry.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.meaning.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(entry.category);

      // Letter filter
      const matchesLetter =
        !selectedLetter || entry.term.toUpperCase().startsWith(selectedLetter);

      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [searchQuery, selectedCategories, selectedLetter]);

  return (
    <div className="space-y-xl animate-fadeIn">
      {/* Header & Search Section */}
      <section className="mb-xl">
        <h1 className="font-display-lg text-3xl font-extrabold text-on-surface mb-sm">Acronym Soup</h1>
        <p className="font-body-relaxed text-on-surface-variant mb-lg max-w-3xl">
          Navigate the dense jargon of PeriMeter. Search for specific terms or filter by category to understand our internal language and concepts.
        </p>
        <div className="relative w-full max-w-4xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-2xl">search</span>
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedLetter(null); // Clear letter index on text search
            }}
            className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all font-body-base text-on-surface placeholder-secondary shadow-sm"
            placeholder="Search acronyms, terms, or definitions..."
            type="text"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 space-y-lg">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
            <h3 className="font-headline-sm text-md font-bold mb-md text-on-surface">Categories</h3>
            <div className="space-y-sm">
              <label className="flex items-center gap-sm cursor-pointer group">
                <input
                  checked={selectedCategories.length === 0}
                  onChange={() => setSelectedCategories([])}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5 cursor-pointer"
                  type="checkbox"
                />
                <span className="font-body-base text-sm text-on-surface group-hover:text-primary transition-colors font-medium">All Categories</span>
              </label>
              {categories.map((cat) => (
                <label key={cat.value} className="flex items-center gap-sm cursor-pointer group">
                  <input
                    checked={selectedCategories.includes(cat.value)}
                    onChange={() => handleCategoryChange(cat.value)}
                    className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="font-body-base text-sm text-on-surface group-hover:text-primary transition-colors font-medium">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-md">
            <h3 className="font-label-sm text-xs font-bold text-secondary mb-sm uppercase tracking-wider">Alphabetical Index</h3>
            <div className="flex flex-wrap gap-xs">
              <button 
                onClick={() => setSelectedLetter(null)}
                className={`w-8 h-8 rounded text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                  selectedLetter === null 
                    ? 'bg-primary text-on-primary' 
                    : 'bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                All
              </button>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter === selectedLetter ? null : letter)}
                  className={`w-8 h-8 rounded text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                    selectedLetter === letter 
                      ? 'bg-primary text-on-primary' 
                      : 'bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Dictionary List */}
        <div className="lg:col-span-9 space-y-md">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <article 
                key={entry.term} 
                className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg hover:bg-surface-bright transition-colors group shadow-sm hover:shadow-md duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-sm mb-sm">
                  <div className="flex items-baseline gap-md flex-wrap">
                    <h2 className="font-headline-lg text-2xl font-black text-primary">{entry.term}</h2>
                    <span className="font-headline-sm text-md font-semibold text-on-surface">{entry.definition}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    entry.category === 'Technical' 
                      ? 'bg-blue-100 text-blue-800' 
                      : entry.category === 'Product'
                        ? 'bg-purple-100 text-purple-800'
                        : entry.category === 'Business'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {entry.category}
                  </span>
                </div>
                <p className="font-body-relaxed text-sm text-on-surface-variant mb-md leading-relaxed">
                  {entry.meaning}
                </p>
                <div className="bg-surface-container-low p-md rounded-lg border-l-4 border-primary">
                  <h4 className="font-label-sm text-xs font-bold text-on-surface mb-xs uppercase tracking-wider">Relevance to PeriMeter</h4>
                  <p className="font-body-base text-xs text-secondary leading-relaxed">
                    {entry.relevance}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
              <span className="material-symbols-outlined text-outline text-5xl mb-2">find_in_page</span>
              <p className="text-on-surface-variant font-medium">No acronyms found matching those filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlossaryScreen;

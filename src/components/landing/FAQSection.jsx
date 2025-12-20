import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "How do I start searching for jobs?",
        answer: "Simply create an account, complete your profile, and use our advanced search filters to find roles that match your skills and preferences. We'll also send you personalized recommendations."
    },
    {
        question: "Is HireNest free for job seekers?",
        answer: "Yes, searching for jobs and applying on HireNest is completely free for all seekers. We also offer premium features for those who want extra visibility."
    },
    {
        question: "How can I post a job as an employer?",
        answer: "Once you register as an Employer, you can navigate to the 'Post a Job' section in your dashboard. Fill in the job details, and your listing will be live instantly."
    },
    {
        question: "How does the matching algorithm work?",
        answer: "Our AI-powered algorithm analyzes your skills, experience, and preferences to match you with job descriptions that have the highest compatibility scores."
    },
    {
        question: "How do I contact support?",
        answer: "You can reach out to our dedicated support team 24/7 through the 'Help' section in your dashboard or by emailing support@hirenest.com."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-secondary dark:text-secondary-light font-bold text-lg mb-2 uppercase tracking-widest">Support</h2>
                    <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary dark:text-white mb-4">
                        Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Questions?</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        Everything you need to know about HireNest and how we help you find your next big opportunity.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`group border border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300 overflow-hidden ${openIndex === index
                                    ? 'bg-white dark:bg-gray-800 shadow-xl shadow-primary/5 ring-1 ring-secondary/20'
                                    : 'hover:border-secondary/30 bg-white/50 dark:bg-gray-900/50'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={`text-lg font-bold transition-colors duration-300 ${openIndex === index ? 'text-secondary dark:text-secondary-light' : 'text-primary dark:text-gray-200'
                                    }`}>
                                    {item.question}
                                </span>
                                <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-secondary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                    }`}>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 py-6 px-8 border-t border-gray-100 dark:border-gray-700' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;

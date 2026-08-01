import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 bg-neutral-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 font-light">Last updated: July 2026</p>
        </div>

        <div className="bg-white p-8 md:p-12 border border-gray-100 space-y-8 text-gray-700 font-light leading-relaxed text-sm">
          <p>
            At Aura & Gem, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>

          <h3 className="font-serif text-xl text-gray-900 mt-8 mb-4">1. The data we collect about you</h3>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data</strong> includes payment card details (processed securely by our payment providers).</li>
              <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
            </ul>
          </p>

          <h3 className="font-serif text-xl text-gray-900 mt-8 mb-4">2. How we use your personal data</h3>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (i.e., to process and deliver your order).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </p>
          
          <h3 className="font-serif text-xl text-gray-900 mt-8 mb-4">3. Data Security</h3>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>
        </div>

      </div>
    </div>
  );
}

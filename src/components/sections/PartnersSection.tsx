import React from 'react';

const partners = [
  {
    name: 'Westend Towers',
    address: '6th Floor, Muthangari Drive, Nairobi, Kenya',
    logo: '', // Add logo path if available
  },
  // Add more partners as needed
];

export default function PartnersSection() {
  return (
    <section className="py-16 bg-gray-50" id="partners">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white rounded-lg shadow p-6">
              {partner.logo && (
                <img src={partner.logo} alt={partner.name} className="h-16 mb-4" />
              )}
              <div className="text-lg font-semibold">{partner.name}</div>
              <div className="text-gray-600 text-sm">{partner.address}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

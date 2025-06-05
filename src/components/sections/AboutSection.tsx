import React from 'react';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">What is Uji?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Uji is a nutritious porridge made from millet, sorghum, or maize flour, providing essential energy and nutrients for growing children. Our mission is to empower young minds by ensuring they receive a healthy meal every school day, supporting their education and well-being.
        </p>
        <Link href="/about" className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Learn More
        </Link>
      </div>
    </section>
  );
}

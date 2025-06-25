"use client";

export default function AutomatedDonationForm() {
  const mchangaUrl = "https://www.mchanga.africa/fundraiser/116090";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <div className="max-w-lg mx-auto mb-12 p-8 bg-white rounded-xl shadow-2xl border border-primary-100 text-center">
      <div className="h-12 flex items-center justify-center mb-4">
        <img
          src="/mchanga-logo.png"
          alt="Mchanga Logo"
          className="h-full w-auto object-contain"
          onError={handleImageError}
        />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-primary">Donate via Mchanga</h2>
      <p className="mb-6 text-gray-700">
        Support our cause by making a secure donation through Mchanga.
      </p>
      <a
        href={mchangaUrl}
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block bg-gradient-to-r from-green-500 via-green-400 to-blue-500 text-white px-10 py-4 rounded-lg font-semibold shadow-md hover:from-green-600 hover:via-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-300"
      >
        Donate Securely on Mchanga
      </a>
      <p className="mt-4 text-sm text-gray-500">
        You will be redirected to the Mchanga platform.
      </p>
      <div className="mt-8 text-xs text-gray-500 text-center">
        <span className="font-semibold">Data Privacy:</span> Your information is encrypted and used only for processing your donation. We never share your details.
      </div>
    </div>
  );
}

// Utility functions for donation backend API

export async function getDonationByReference(reference: string) {
  if (!reference) return null;
  try {
    const res = await fetch(`/api/donations/${reference}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.success) {
      return data.data;
    }
    return null;
  } catch (e) {
    console.error('Error fetching donation by reference:', e);
    return null;
  }
}

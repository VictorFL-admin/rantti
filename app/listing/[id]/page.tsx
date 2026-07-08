import { notFound } from "next/navigation";
import { getBackendUrl, API_ENDPOINTS } from "@/lib/api-config";
import type { ListingDetails } from "@/lib/types/listings";
import ListingDetailClient from "@/components/ListingDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

async function fetchListing(id: string): Promise<ListingDetails | null> {
  try {
    const url = `${getBackendUrl()}${API_ENDPOINTS.LISTINGS.DETAILS(id)}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.listing ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const listing = await fetchListing(id);
  if (!listing) return { title: "Publicación no encontrada" };
  return {
    title: listing.title,
    description: listing.description?.slice(0, 160),
  };
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = await fetchListing(id);
  if (!listing) notFound();

  return <ListingDetailClient listing={listing} />;
}

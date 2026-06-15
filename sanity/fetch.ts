import { client } from "./client";

// Single entry point for fetching Sanity data in Server Components.
// Every fetch is tagged so the /api/revalidate webhook can invalidate
// content the moment an editor presses Publish in the Studio; the
// time-based revalidate is only a safety net.
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 3600,
      tags: ["sanity", ...tags],
    },
  });
}

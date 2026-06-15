import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";

export const revalidate = 3600;

type SiteSettings = {
  title?: Record<Locale, string | null> | null;
  description?: Record<Locale, string | null> | null;
} | null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const settings = await sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });
  return {
    // absolute: the homepage shows the bare site name, not "name | name"
    title: { absolute: settings?.title?.[lang] ?? "flylabs-website" },
    description: settings?.description?.[lang] ?? undefined,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const settings = await sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });
  const title = settings?.title?.[lang] ?? "flylabs-website";

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text-zinc-500">
        {lang === "it" ? "Sito in costruzione." : "Site under construction."}
      </p>
    </main>
  );
}

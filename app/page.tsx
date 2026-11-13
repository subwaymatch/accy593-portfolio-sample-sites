import type { Metadata } from "next";
import Link from "next/link";
import { sites } from "./_hub/sites";

export const metadata: Metadata = {
  title: "ACCY 593 Portfolio Sample Sites",
  description:
    "Ten sample portfolio websites in ten visual styles, each meeting the ACCY 593 portfolio project requirements.",
};

const requirements = [
  { label: "About page or section", detail: "Who they are, what they study, interests, and how to reach them." },
  { label: "Ten or more work items", detail: "At least three on analytics, design, or a business topic." },
  { label: "Desktop and mobile", detail: "Readable text, no sideways scrolling, working phone navigation." },
  { label: "Improved over rounds", detail: "Each site was reviewed and refined in several commits." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-700">
            ACCY 593 · Portfolio Website with a Coding Agent
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Ten sample portfolio sites, ten different styles
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
            Each sample belongs to a fictional graduate student and meets every requirement of the
            portfolio project. Use them for ideas about layout, tone and what to include, then make
            your own.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {requirements.map((r) => (
              <li key={r.label} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="flex items-center gap-2 font-semibold">
                  <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-emerald-600 text-xs text-white">
                    ✓
                  </span>
                  {r.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{r.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Browse the samples</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site, i) => (
            <li key={site.slug}>
              <Link
                href={`/${site.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-stone-200 bg-stone-100">
                  <img
                    src={`/hub/${site.slug}.webp`}
                    alt={`Screenshot of the ${site.style} sample site`}
                    width={1200}
                    height={750}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-stone-700 shadow-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-3 w-3 rounded-full" style={{ background: site.accent }} />
                    <h3 className="text-lg font-semibold">{site.style}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{site.blurb}</p>
                  <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                    <dt className="text-stone-500">Student</dt>
                    <dd>{site.person}</dd>
                    <dt className="text-stone-500">Focus</dt>
                    <dd>{site.focus}</dd>
                    <dt className="text-stone-500">Layout</dt>
                    <dd>{site.structure}</dd>
                  </dl>
                  <span className="mt-auto pt-5 text-sm font-semibold text-orange-700 group-hover:underline">
                    Open /{site.slug} →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm leading-relaxed text-stone-600 sm:px-8">
          People, projects and data in these samples are fictional. Images were generated with
          OpenAI GPT Image 2.6. Built with Vinext and deployed as a single Cloudflare Worker.
        </div>
      </footer>
    </div>
  );
}

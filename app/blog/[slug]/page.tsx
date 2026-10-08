import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import ServiceCards from "@/components/content/ServiceCards";
import JsonLd from "@/components/JsonLd";
import { POSTS, getPost, readingTime, wordCount, type Block } from "@/lib/blog";
import { blogPosting } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getService, type Service } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const meta = pageMetadata({ title: post.metaTitle, description: post.description, path: `/blog/${post.slug}`, type: "article" });
  return post.draft ? { ...meta, robots: { index: false, follow: true } } : meta;
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function BlockView({ block }: { block: Block }) {
  if (block.type === "p")
    return (
      <p>
        {block.text}
        {block.cite ? (
          <>
            {" "}
            Source:{" "}
            <a href={block.cite.href} rel="noopener" className="font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2 hover:decoration-[#007BFF]">
              {block.cite.label}
            </a>
            .
          </>
        ) : null}
      </p>
    );
  if (block.type === "ul")
    return (
      <ul className="list-disc space-y-2 pl-5">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            {block.head.map((cell, i) => (
              <th key={i} scope="col" className="px-4 py-3 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200/80">
          {block.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-4 py-3 font-medium text-slate-800">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-4 py-3 text-slate-600">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function Page({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug && (!p.draft || post.draft)).slice(0, 2);
  const services = post.relatedServices.map(getService).filter((s): s is Service => Boolean(s));

  // Drafts are noindex, so they carry no Article schema in production builds.
  const showSchema = !post.draft || process.env.NODE_ENV !== "production";

  return (
    <>
      {showSchema ? <JsonLd data={blogPosting(post, wordCount(post))} /> : null}
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />

      <article className="container-x py-10 sm:py-14">
        {post.draft ? (
          <p className="mb-6 w-fit rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            Draft for review: not indexed
          </p>
        ) : null}
        <header className="max-w-3xl">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-5xl">{post.title}</h1>
          <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-500">
            <span>By {post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.published}>{formatDate(post.published)}</time>
            {post.updated !== post.published ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span>{readingTime(post)} min read</span>
          </p>
          <p className="mt-6 rounded-2xl border border-[#00A3FF]/20 bg-[#F0F7FF] p-5 text-lg leading-relaxed text-slate-800">
            <strong className="font-semibold">Short answer: </strong>
            {post.summary}
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_240px]">
          <div className="max-w-3xl space-y-10">
            {post.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id} className="scroll-mt-24 font-display text-2xl font-semibold text-[#0F172A]">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-slate-700">
                  {section.blocks.map((block, i) => (
                    <BlockView key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <nav aria-label="Table of contents" className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold text-slate-900">In this article</p>
            <ol className="mt-3 space-y-2 border-l border-slate-200 text-sm">
              {post.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="-ml-px block border-l border-transparent pl-4 text-slate-600 hover:border-[#007BFF] hover:text-[#007BFF]">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </article>

      <section className="section bg-tint">
        <div className="container-x">
          <h2 className="h2">Related Ezomod services</h2>
          <div className="mt-8">
            <ServiceCards services={services} columns={3} />
          </div>
          {related.length > 0 ? (
            <>
              <h2 className="h2 mt-16">Related articles</h2>
              <ul className="mt-6 grid gap-5 md:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="card block h-full p-6">
                      <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      <ContactSection />
    </>
  );
}

import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Breadcrumbs from "@/components/content/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { listedPosts, readingTime } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ezomod Blog: AI Automation, Leads & AI Agents",
  description:
    "Plain-English guides from Ezomod on AI automation, lead generation, speed to lead, AI voice agents and multi-agent workflows for growing businesses.",
  path: "/blog",
});

export default function Page() {
  const posts = listedPosts();

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <PageHeader eyebrow="Blog" title="The Ezomod blog">
        <p>Plain-English guides on AI automation, lead generation and AI agents for growing businesses.</p>
      </PageHeader>

      <section className="section bg-tint">
        <div className="container-x">
          {posts.length === 0 ? (
            <div className="flex max-w-2xl flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_10px_30px_-12px_rgba(0,30,70,0.10)] sm:flex-row sm:items-center">
            <span className="icon-circle h-14 w-14 bg-gradient-to-br from-[#007BFF] to-[#22C55E] text-white">
              <PenLine className="h-6 w-6" aria-hidden />
            </span>
            <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">Articles coming soon</h2>
            <p className="lead mt-2">
              New articles are on the way. In the meantime, read the{" "}
              <Link href="/faq" className="font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2">
                Ezomod FAQ
              </Link>{" "}
              or explore{" "}
              <Link href="/services" className="font-medium text-[#0062CC] underline decoration-[#007BFF]/30 underline-offset-2">
                our services
              </Link>
              .
            </p>
            </div>
            </div>
          ) : (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="card flex h-full flex-col p-6">
                    {post.draft ? (
                      <span className="mb-3 w-fit rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">Draft</span>
                    ) : null}
                    <h2 className="text-xl font-semibold leading-snug text-slate-900">{post.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{post.description}</p>
                    <p className="mt-5 text-xs text-slate-500">
                      <time dateTime={post.published}>{post.published}</time> · {readingTime(post)} min read
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ContactSection />
    </>
  );
}

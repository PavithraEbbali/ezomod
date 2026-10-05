import type { JsonLdObject } from "@/lib/schema";

/**
 * Server-rendered JSON-LD. Fails the build if a placeholder slips into structured data.
 * `<` is escaped so the payload can never close the script tag early.
 */
export default function JsonLd({ data }: { data: JsonLdObject | null | (JsonLdObject | null)[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter((d): d is JsonLdObject => d !== null);
  return (
    <>
      {items.map((item, index) => {
        const json = JSON.stringify(item);
        if (json.includes("{{TODO")) {
          throw new Error(`JSON-LD contains a {{TODO}} placeholder: ${json.slice(0, 120)}`);
        }
        return (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
          />
        );
      })}
    </>
  );
}

/**
 * Sitewide FAQ. `a` is the short direct answer (about 40–60 words) and is what FAQPage
 * JSON-LD uses. `more` is optional extra detail shown below it.
 */
export type FaqEntry = { q: string; a: string; more?: string };
export type FaqGroup = { title: string; items: FaqEntry[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "About Ezomod",
    items: [
      {
        q: "What is Ezomod?",
        a: "Ezomod is an AI automation agency. We design, build and maintain AI systems for businesses, including AI lead generation, instant lead follow-up, AI voice agents, multi-agent AI workflows, CRM automation, AI chatbots and websites. Our systems work inside the tools you already use, such as your CRM.",
      },
      {
        q: "What does an AI automation agency do?",
        a: "An AI automation agency finds work in your business that software and AI can do reliably, then builds and maintains those systems for you. Instead of selling a one-size-fits-all tool, Ezomod builds around your process, connects your existing apps and keeps improving the system after launch.",
      },
      {
        q: "What services does Ezomod offer?",
        a: "Ezomod offers eight services: AI lead generation, AI lead follow-up and speed-to-lead, AI voice agents and call automation, multi-agent AI workflow development, business process and AI automation, CRM automation and integration, AI chatbots and customer support automation, and website design and development.",
      },
      {
        q: "Who is Ezomod for?",
        a: "Ezomod works with businesses that want more leads, faster follow-up or less manual work, from small teams to growing companies. Our lead follow-up service is specialised for real estate teams and brokerages, and our automation, AI agent and website services suit most industries.",
      },
      {
        q: "Is Ezomod a software product or an agency?",
        a: "Ezomod is an agency, not a software subscription. We build custom systems for each client, usually inside the CRM and tools they already pay for, and we maintain them after launch. There is no new dashboard for your team to learn.",
      },
      {
        q: "Where is Ezomod based?",
        a: "Ezomod is based in {{TODO: city, country}} and works with clients remotely. Consultations, setup and support all happen online, so we can work with businesses in different locations and time zones.",
      },
    ],
  },
  {
    title: "Working with us",
    items: [
      {
        q: "How do I get started with Ezomod?",
        a: "Book a free 30-minute consultation. We will look at how your leads or processes are handled today, where time or revenue is being lost, and what we would build. You then receive a written scope and timeline before any work begins.",
      },
      {
        q: "How long does setup take?",
        a: "It depends on the service and how many systems are involved. For AI lead follow-up, most teams are live within a few weeks. For other projects, we agree a timeline in the written scope after the consultation, and your team reviews each stage before launch.",
      },
      {
        q: "How much does Ezomod cost?",
        a: "We do not publish fixed prices because every system is scoped to the business. After the free consultation, you receive a written scope that covers what we will build, the timeline and the cost, so you can decide with all the details in front of you.",
      },
      {
        q: "Do I need technical skills to work with Ezomod?",
        a: "No. Ezomod does the technical work, including building, connecting and maintaining the system. Your team's role is to explain how you work, review scripts and rules, and approve each stage before launch.",
      },
      {
        q: "Do you provide support after launch?",
        a: "Yes. We monitor, adjust and improve the systems we build after launch. You don't need an in-house operator to keep things running, and we review results with you regularly.",
      },
      {
        q: "Can I start with one service and add more later?",
        a: "Yes. Many businesses start with the service that solves their most urgent problem, such as slow lead follow-up, and add others such as CRM automation or a chatbot later. Everything we build is designed to connect.",
      },
    ],
  },
  {
    title: "AI, leads and integrations",
    items: [
      {
        q: "Which CRMs does Ezomod work with?",
        a: "Ezomod builds directly inside Follow Up Boss, Lofty and Salesforce, and also works with HubSpot, Pipedrive, Zoho, GoHighLevel and most other CRMs that offer an API or webhooks. Notes, recordings, tags and appointments are written to the records your team already uses.",
      },
      {
        q: "How fast does the AI respond to new leads?",
        a: "Ezomod's AI lead follow-up system calls new leads in under 30 seconds, 24 hours a day, 7 days a week. If the lead doesn't answer, it follows up by text and email and keeps trying on a schedule until they respond or opt out.",
      },
      {
        q: "What is speed to lead?",
        a: "Speed to lead is the time between a new inquiry arriving and your first real contact with that person. Responding quickly means you reach people while they are still interested and before a competitor does, which is why Ezomod's follow-up system responds in seconds.",
      },
      {
        q: "Will my leads know they are talking to AI?",
        a: "The AI uses a natural, human-sounding voice, and we configure disclosures to match the law in your market and your own policy. Many businesses choose to tell callers they are speaking with an AI assistant, and the AI can hand over to a person at any time.",
      },
      {
        q: "What is a multi-agent AI workflow?",
        a: "A multi-agent AI workflow is a system where several AI agents each handle one part of a bigger task, such as researching, deciding, acting and checking, and pass work between them. It is usually more reliable than one AI doing everything, and people can approve key steps.",
      },
      {
        q: "Can the AI hand conversations over to my team?",
        a: "Yes. You decide the handoff rules. Calls can be transferred live, chats can be passed to an agent with the full history, and qualified leads can be booked straight onto the right person's calendar with a summary.",
      },
      {
        q: "Which industries does Ezomod work with?",
        a: "Ezomod's lead follow-up service is specialised for real estate teams and brokerages. Our automation, AI agent, chatbot and website services work for most industries, including professional services, home services, e-commerce, healthcare administration, agencies and SaaS.",
      },
    ],
  },
  {
    title: "Data, security and compliance",
    items: [
      {
        q: "Who owns the data?",
        a: "You do. Clients retain ownership of their own data, including lead and customer records. Ezomod's systems write to your CRM and accounts, so your data stays in the tools you control.",
      },
      {
        q: "How does Ezomod handle data security?",
        a: "We build inside your own accounts wherever possible and give each part of the system only the access it needs. Data handling and the AI providers involved are discussed and agreed with you before we build. {{TODO: add any specific security practices or certifications}}",
      },
      {
        q: "Are calls recorded?",
        a: "Calls can be recorded and transcribed where permitted by law, with the required disclosure at the start of the call. Recordings and transcripts are saved to your CRM so your team can review them.",
      },
      {
        q: "How do you handle SMS consent and opt-outs?",
        a: "Text messages are only sent to people who have agreed to receive them. Message frequency varies, message and data rates may apply, and anyone can reply STOP to opt out or HELP for help. Clients are responsible for obtaining consent to contact their leads.",
        more: "See our Privacy Policy and Terms of Service for full details.",
      },
    ],
  },
];

export const ALL_FAQS: FaqEntry[] = FAQ_GROUPS.flatMap((group) => group.items);

/** A short selection for the home page. */
export const HOME_FAQS: FaqEntry[] = [
  "What is Ezomod?",
  "What services does Ezomod offer?",
  "Who is Ezomod for?",
  "How long does setup take?",
  "Which CRMs does Ezomod work with?",
  "How do I get started with Ezomod?",
].map((q) => ALL_FAQS.find((f) => f.q === q)!);

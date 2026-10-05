export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type PostSection = { id: string; heading: string; blocks: Block[] };

export type Post = {
  slug: string;
  title: string;
  /** <title> tag, max 60 characters. */
  metaTitle: string;
  /** Meta description, max 155 characters. */
  description: string;
  /** Short answer shown at the top of the article. */
  summary: string;
  author: string;
  published: string;
  updated: string;
  /** Drafts are built with noindex, excluded from the sitemap and hidden from the blog index in production. */
  draft: boolean;
  primaryKeyword: string;
  relatedServices: string[];
  sections: PostSection[];
};

export const POSTS: Post[] = [
  {
    slug: "what-is-multi-agent-ai-automation",
    title: "What Is Multi-Agent AI Automation? A Simple Guide for Businesses",
    metaTitle: "What Is Multi-Agent AI Automation? A Simple Guide",
    description:
      "A plain-English guide to multi-agent AI automation: what it is, how AI agents work together, examples for businesses and how to get started.",
    summary:
      "Multi-agent AI automation is when several AI agents, each with one job, work together to complete a bigger task, such as handling a new lead from first contact to booked meeting. It is usually more reliable than asking one AI to do everything.",
    author: "{{TODO: author name}}",
    published: "2026-10-05",
    updated: "2026-10-05",
    draft: true,
    primaryKeyword: "multi-agent AI automation",
    relatedServices: ["multi-agent-ai-workflows", "ai-automation", "ai-chatbots"],
    sections: [
      {
        id: "definition",
        heading: "What is multi-agent AI automation?",
        blocks: [
          { type: "p", text: "Multi-agent AI automation is a way of building AI systems where several AI agents work together, each responsible for one part of a process. An AI agent is a piece of software that uses a large language model (LLM) to understand a goal, decide what to do next and use tools such as your CRM, email or a database to get it done." },
          { type: "p", text: "Think of it like a small team. Instead of hiring one person to do sales research, write emails, update the CRM and check quality, you would give each task to someone who is good at it. Multi-agent systems apply the same idea to AI." },
        ],
      },
      {
        id: "single-vs-multi",
        heading: "How is it different from a single AI chatbot?",
        blocks: [
          { type: "p", text: "A single chatbot is given one large set of instructions and asked to handle everything. That works for simple questions, but it struggles with long, multi-step processes. The more you ask one AI to juggle, the more likely it is to skip a step or make a mistake." },
          { type: "table", head: ["", "Single AI assistant", "Multi-agent system"], rows: [
            ["Structure", "One AI handles every step", "Several agents, each with one job"],
            ["Best for", "Simple questions and short tasks", "Multi-step business processes"],
            ["Reliability", "Drops as tasks get longer", "Each step can be tested and checked"],
            ["Human oversight", "Hard to insert approvals", "Approval steps between agents"],
            ["Improving it", "Change one big prompt", "Improve one agent at a time"],
          ] },
        ],
      },
      {
        id: "how-it-works",
        heading: "How do AI agents work together?",
        blocks: [
          { type: "p", text: "Most multi-agent systems have three parts:" },
          { type: "ul", items: [
            "Specialised agents. Each agent has a narrow role, its own instructions and access only to the tools it needs. For example, a research agent can search the web but cannot send emails.",
            "An orchestrator. This is the logic that decides which agent works next, passes information between them and handles errors.",
            "Guardrails and human checkpoints. Rules that check each agent's output, plus approval steps where a person reviews important actions before they happen.",
          ] },
          { type: "p", text: "Every step is logged, so you can see exactly which agent did what and why. That makes problems much easier to find and fix than in a single, opaque AI." },
        ],
      },
      {
        id: "examples",
        heading: "What are some examples for businesses?",
        blocks: [
          { type: "ul", items: [
            "Lead handling: one agent qualifies a new inquiry, another looks up the company, a third drafts a personalised reply and a fourth updates the CRM.",
            "Customer support: one agent classifies incoming tickets, another finds the answer in your help articles, and a reviewer agent checks the reply before it is sent or escalated.",
            "Document processing: one agent reads invoices or contracts, another checks the extracted fields against your rules, and a third files them and flags exceptions for a person.",
            "Reporting: agents gather data from several tools, summarise what changed and send a short weekly report to the right people.",
          ] },
        ],
      },
      {
        id: "benefits",
        heading: "What are the benefits and the risks?",
        blocks: [
          { type: "p", text: "The main benefits are reliability, transparency and flexibility. Because each agent has a small job, it is easier to test and improve. Because every step is logged, you can see what happened. And because agents are separate, you can upgrade one without rebuilding everything." },
          { type: "p", text: "The risks are the same as with any AI: agents can misunderstand information or act on bad data. That is why good systems limit what each agent is allowed to do, validate outputs and keep people in the loop for decisions that matter." },
        ],
      },
      {
        id: "getting-started",
        heading: "How do I get started with multi-agent automation?",
        blocks: [
          { type: "ul", items: [
            "Pick one process that is repetitive, multi-step and takes noticeable time every week.",
            "Write down every step, decision and system involved, including the exceptions.",
            "Decide which steps AI can handle and where a person must approve.",
            "Start small, test on real but low-risk work, and expand once it is reliable.",
          ] },
          { type: "p", text: "Ezomod designs and builds multi-agent AI workflows for businesses, connected to the tools they already use. If you have a process in mind, a short consultation is usually enough to tell whether it is a good fit." },
        ],
      },
    ],
  },
  {
    slug: "speed-to-lead",
    title: "Speed to Lead: Why Responding Within 5 Minutes Wins More Deals",
    metaTitle: "Speed to Lead: Why a 5-Minute Response Wins Deals",
    description:
      "What speed to lead means, why fast lead response matters, why most teams are slow, and how AI makes instant follow-up possible 24/7.",
    summary:
      "Speed to lead is how quickly you make real contact with a new inquiry. The faster you respond, ideally within minutes, the more likely you are to reach the person while they are still interested and before a competitor does.",
    author: "{{TODO: author name}}",
    published: "2026-10-05",
    updated: "2026-10-05",
    draft: true,
    primaryKeyword: "speed to lead",
    relatedServices: ["ai-lead-follow-up", "ai-voice-agents", "crm-automation"],
    sections: [
      {
        id: "definition",
        heading: "What is speed to lead?",
        blocks: [
          { type: "p", text: "Speed to lead is the time between a new lead arriving, for example a form fill, portal inquiry or ad response, and your first real contact with that person. It is usually measured in minutes. An automatic \"thanks, we'll be in touch\" email does not count. A real conversation does." },
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why does responding within 5 minutes matter?",
        blocks: [
          { type: "p", text: "When someone submits an inquiry, they are paying attention right now. They have your page open, they are thinking about their problem, and they are often contacting several businesses at once. A few minutes later they are back at work, in a meeting or talking to a competitor." },
          { type: "p", text: "Research on online sales leads, such as the Harvard Business Review article \"The Short Life of Online Sales Leads\", found that companies which respond quickly are far more likely to reach and qualify leads than those that wait. {{TODO: verify and add a link to the source you want to cite}}" },
          { type: "p", text: "The five-minute mark is a practical target: fast enough to catch people while they are still engaged, and achievable with the right system in place." },
        ],
      },
      {
        id: "why-teams-are-slow",
        heading: "Why are most teams slow to respond?",
        blocks: [
          { type: "ul", items: [
            "Leads arrive outside office hours, at night and on weekends.",
            "Salespeople and agents are busy in meetings, showings or other calls.",
            "Leads land in different inboxes and portals, and nobody owns them.",
            "Routing rules are unclear, so each person assumes someone else will call.",
            "Follow-up stops after one or two attempts.",
          ] },
          { type: "p", text: "None of this is a people problem. It is a system problem. Humans cannot be available every minute of every day." },
        ],
      },
      {
        id: "how-to-improve",
        heading: "How can you improve your speed to lead?",
        blocks: [
          { type: "ul", items: [
            "Measure it. Track the time from lead creation to first real contact in your CRM.",
            "Connect every lead source so new leads arrive in one place instantly.",
            "Set clear routing rules so every lead has an owner the moment it arrives.",
            "Call first, then text and email. A phone call is usually the fastest way to a real conversation.",
            "Keep following up. Plan several attempts over days and weeks, across channels.",
            "Automate the first response so it happens even when nobody is available.",
          ] },
        ],
      },
      {
        id: "ai",
        heading: "How does AI make instant follow-up possible?",
        blocks: [
          { type: "p", text: "AI lead follow-up systems contact every new lead automatically, within seconds, at any time of day. An AI voice agent can call the lead, have a natural conversation, ask your qualification questions and book an appointment. If there is no answer, it sends a text and email and tries again later." },
          { type: "table", head: ["", "Manual follow-up", "AI lead follow-up"], rows: [
            ["First response", "When someone is free", "Within seconds, 24/7"],
            ["Nights and weekends", "Usually missed", "Covered"],
            ["Follow-up attempts", "Often stops early", "Continues on a schedule"],
            ["CRM notes", "Typed in later, if at all", "Written automatically"],
            ["Agent time", "Spent chasing", "Spent on qualified leads"],
          ] },
          { type: "p", text: "Ezomod's AI lead follow-up system calls new leads in under 30 seconds, qualifies them on the phone and writes everything into your CRM, including Follow Up Boss, Lofty and Salesforce." },
        ],
      },
    ],
  },
  {
    slug: "ai-lead-generation-vs-traditional-lead-generation",
    title: "AI Lead Generation vs Traditional Lead Generation",
    metaTitle: "AI Lead Generation vs Traditional Lead Generation",
    description:
      "How AI lead generation compares with traditional lead generation on research, personalisation, speed and scale, and when each approach makes sense.",
    summary:
      "Traditional lead generation relies on people to build lists, research prospects and write outreach by hand. AI lead generation automates the research, scoring and first outreach, so the same team can reach more of the right prospects with more relevant messages.",
    author: "{{TODO: author name}}",
    published: "2026-10-05",
    updated: "2026-10-05",
    draft: true,
    primaryKeyword: "AI lead generation",
    relatedServices: ["ai-lead-generation", "ai-lead-follow-up", "crm-automation"],
    sections: [
      {
        id: "definitions",
        heading: "What is the difference between AI and traditional lead generation?",
        blocks: [
          { type: "p", text: "Traditional lead generation is the manual process of finding potential customers: buying or building lists, researching each company, writing cold emails or making cold calls, and tracking responses. It depends heavily on how much time your team has." },
          { type: "p", text: "AI lead generation uses AI to do the repetitive parts. The system finds prospects that match your criteria, gathers context about each one, scores how good a fit they are and writes personalised first messages. People step in once a prospect shows interest." },
        ],
      },
      {
        id: "comparison",
        heading: "How do they compare side by side?",
        blocks: [
          { type: "table", head: ["", "Traditional", "AI lead generation"], rows: [
            ["Finding prospects", "Manual list building or bought lists", "Continuous sourcing against your criteria"],
            ["Research", "Done by hand, one prospect at a time", "Automatic enrichment for every prospect"],
            ["Prioritising", "Gut feel or simple filters", "Fit score with a reason"],
            ["Personalisation", "Limited by time", "Every message refers to the prospect"],
            ["Follow-up", "Often inconsistent", "Runs on a set schedule"],
            ["Scale", "Grows with headcount", "Grows with the system"],
            ["Human role", "Does everything", "Talks to interested prospects"],
          ] },
        ],
      },
      {
        id: "advantages",
        heading: "What are the advantages of AI lead generation?",
        blocks: [
          { type: "ul", items: [
            "More time selling. Your team spends less time on research and more time in conversations.",
            "Better relevance. Messages are based on real information about each prospect, not a generic template.",
            "Consistency. The system prospects and follows up every day, not just when someone has a free afternoon.",
            "Visibility. Every prospect, score and message is recorded in your CRM.",
          ] },
        ],
      },
      {
        id: "still-matters",
        heading: "Where does traditional lead generation still matter?",
        blocks: [
          { type: "p", text: "AI does not replace relationships. Referrals, events, partnerships and personal networking remain valuable, and complex deals still need experienced people. The best approach usually combines both: AI handles research and first contact at scale, and people handle the conversations that build trust." },
        ],
      },
      {
        id: "choosing",
        heading: "How do I choose the right approach?",
        blocks: [
          { type: "ul", items: [
            "If your team spends hours researching and writing cold outreach, AI lead generation will likely save significant time.",
            "If you sell to a very small number of high-value accounts, a more manual, relationship-led approach may suit you, with AI supporting research.",
            "If leads already arrive but are not followed up quickly, start with AI lead follow-up before generating more.",
          ] },
          { type: "p", text: "Ezomod builds AI lead generation systems around your market and offer, and connects them to your CRM and follow-up. A short consultation will help you decide which approach fits your business." },
        ],
      },
    ],
  },
];

const SHOW_DRAFTS = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";

/** Posts listed on the blog index: published only, unless drafts are enabled (dev / preview). */
export function listedPosts(): Post[] {
  return POSTS.filter((post) => !post.draft || SHOW_DRAFTS).sort((a, b) => b.published.localeCompare(a.published));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function wordCount(post: Post): number {
  const text = [
    post.summary,
    ...post.sections.flatMap((s) => [
      s.heading,
      ...s.blocks.flatMap((b) => (b.type === "p" ? [b.text] : b.type === "ul" ? b.items : [...b.head, ...b.rows.flat()])),
    ]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function readingTime(post: Post): number {
  return Math.max(1, Math.round(wordCount(post) / 220));
}

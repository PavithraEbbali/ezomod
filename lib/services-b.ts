import type { Service } from "@/lib/services";

/** Services e–h. Plain English, answer-first. No invented numbers, clients or results. */
export const SERVICES_B: Service[] = [
  {
    slug: "ai-automation",
    name: "Business Process & AI Automation",
    navLabel: "AI Automation",
    icon: "workflow",
    primaryKeyword: "AI automation services",
    secondaryKeywords: [
      "business process automation",
      "workflow automation",
      "AI automation agency",
      "automate repetitive tasks",
      "no-code to custom automation",
    ],
    summary:
      "We find the repetitive work slowing your team down and automate it, from simple app-to-app workflows to AI that reads documents and makes decisions.",
    metaTitle: "AI Automation Services for Business Processes | Ezomod",
    metaDescription:
      "Ezomod is an AI automation agency that automates repetitive business processes: data entry, documents, reporting, approvals and handoffs between apps.",
    h1: "Business Process & AI Automation Services",
    definitionQuestion: "What is business process automation with AI?",
    definition:
      "Business process automation with AI means using software and AI to complete repetitive tasks, such as data entry, document handling, reporting and handoffs between apps, so they happen automatically and consistently instead of by hand.",
    intro: [
      "Every business has work that follows the same steps every time: copying details from an email into a spreadsheet, creating an invoice when a deal closes, chasing approvals, building the same weekly report. It is necessary, but it takes hours that people could spend on customers.",
      "Classic automation tools connect apps with fixed rules. AI adds the ability to understand unstructured information such as emails, PDFs, forms and messages, so far more of the process can be automated. Ezomod combines both: simple rule-based automation where it is enough, and AI where judgement or reading is required.",
      "We start by understanding how the work is done today, pick the processes where automation will save the most time, and build them around the tools you already use. After launch we monitor and maintain the automations, so they keep working when your apps change.",
    ],
    whoFor: [
      "Small and growing businesses where staff spend hours on admin",
      "Operations and finance teams handling repetitive data entry and reporting",
      "Companies juggling many apps that do not talk to each other",
      "Teams that started with no-code automations and outgrew them",
      "Owners who want processes to run the same way every time",
    ],
    problems: [
      {
        title: "Manual data entry",
        text: "Details are copied between emails, forms, spreadsheets and systems by hand. Automation moves the data for you and reduces typing errors.",
      },
      {
        title: "Paperwork and documents",
        text: "AI can read invoices, forms, contracts and emails, pull out the key fields and send them where they need to go.",
      },
      {
        title: "Slow approvals and handoffs",
        text: "Requests wait in inboxes. Automated workflows route them to the right person, send reminders and record the decision.",
      },
      {
        title: "Reports that take hours",
        text: "Data is gathered from several tools and summarised automatically, on a schedule, in the format your team needs.",
      },
    ],
    included: [
      {
        title: "Process audit",
        text: "We review how work flows through your team today and identify the tasks where automation will help most.",
      },
      {
        title: "Workflow automation",
        text: "Rule-based automations that connect your apps, trigger actions and keep data in sync.",
      },
      {
        title: "AI document and email processing",
        text: "AI that reads incoming documents and messages, extracts information and classifies or routes them.",
      },
      {
        title: "Approvals and notifications",
        text: "Automated routing, reminders and audit trails for requests that need sign-off.",
      },
      {
        title: "Automated reporting",
        text: "Scheduled reports and summaries pulled from your systems and delivered by email, Slack or a dashboard.",
      },
      {
        title: "Monitoring and maintenance",
        text: "Error alerts, fixes when connected apps change, and improvements as your processes evolve.",
      },
    ],
    steps: [
      {
        title: "Consultation",
        text: "We talk through your current processes and agree which ones to automate first, with a written scope and timeline.",
      },
      {
        title: "Map the process",
        text: "We document every step, rule and exception so nothing is missed when it is automated.",
      },
      {
        title: "Build",
        text: "We build the automations using the simplest reliable approach, from no-code tools to custom code and AI.",
      },
      {
        title: "Test with real examples",
        text: "We run the automation on real cases with your team watching, and fix edge cases before switching over.",
      },
      {
        title: "Launch and maintain",
        text: "The automation goes live with monitoring and alerts, and we keep it running as things change.",
      },
    ],
    tools: ["Zapier", "Make", "n8n", "Google Workspace and Microsoft 365", "Slack and Microsoft Teams", "Accounting, CRM and project management apps", "Large language models (LLMs) for reading documents and emails", "Custom scripts and APIs"],
    toolsNote:
      "We prefer to build on the apps you already pay for, and only add new tools when they clearly save time or money.",
    industries: ["Real estate", "Professional services", "E-commerce", "Agencies", "Healthcare administration", "Logistics and operations"],
    faqs: [
      {
        q: "What is an AI automation agency?",
        a: "An AI automation agency designs, builds and maintains automations for other businesses. Ezomod looks at how your team works, finds repetitive tasks that software and AI can handle, builds those automations into your existing tools and keeps them running.",
      },
      {
        q: "What business processes can be automated?",
        a: "Common examples are data entry between apps, lead and customer onboarding, invoice and document processing, approvals, reminders, reporting and internal notifications. Any task that follows similar steps each time is a good candidate.",
      },
      {
        q: "Do you use no-code tools or custom code?",
        a: "Both. Ezomod uses tools such as Zapier, Make and n8n when they are the simplest reliable option, and custom code or AI when a process needs more flexibility, volume or control.",
      },
      {
        q: "Will automation replace my staff?",
        a: "The goal is to remove repetitive work so your team can spend more time on customers and decisions. Most businesses use automation to handle more work with the same team, not to replace people.",
      },
      {
        q: "What happens if an automation breaks?",
        a: "We set up monitoring and error alerts. If a connected app changes or something fails, we are notified and fix it as part of ongoing maintenance.",
      },
      {
        q: "How do I know which process to automate first?",
        a: "Start with work that is frequent, repetitive and rule-based, and that takes noticeable time each week. We help you rank options during the consultation.",
      },
    ],
    related: ["multi-agent-ai-workflows", "crm-automation", "ai-chatbots"],
  },
  {
    slug: "crm-automation",
    name: "CRM Automation & Integration",
    navLabel: "CRM Automation",
    icon: "database",
    primaryKeyword: "CRM automation",
    secondaryKeywords: [
      "CRM integration services",
      "Follow Up Boss automation",
      "Lofty CRM automation",
      "Salesforce automation",
      "HubSpot automation",
    ],
    summary:
      "We connect your CRM to your lead sources, phones, calendars and other tools, and automate the updates, tasks and follow-ups your team does by hand.",
    metaTitle: "CRM Automation & Integration Services | Ezomod",
    metaDescription:
      "Ezomod automates and integrates CRMs including Follow Up Boss, Lofty, Salesforce and HubSpot: clean data, automatic tasks and connected lead sources.",
    h1: "CRM Automation & Integration Services",
    definitionQuestion: "What is CRM automation?",
    definition:
      "CRM automation means setting up your customer relationship management system so routine work, such as adding new leads, updating records, assigning tasks and sending follow-ups, happens automatically and stays connected to your other tools.",
    intro: [
      "A CRM is only useful if the information inside it is complete and up to date. In practice, leads arrive in different places, details are typed in late or not at all, tasks are forgotten and reports cannot be trusted. Your team ends up working around the CRM instead of with it.",
      "Ezomod automates and integrates CRMs so they run themselves as much as possible. We connect your lead sources so new contacts appear instantly, route leads to the right person, create tasks and reminders automatically, sync data with your other apps and clean up duplicates and missing fields.",
      "We work inside the CRM you already have, including Follow Up Boss, Lofty, Salesforce and HubSpot, rather than asking you to switch. If you are choosing or moving CRMs, we can help plan and run the migration too.",
    ],
    whoFor: [
      "Sales and real estate teams whose CRM data is incomplete or out of date",
      "Businesses with leads coming from many sources that are not connected",
      "Managers who cannot trust their pipeline reports",
      "Teams spending time on manual CRM updates instead of selling",
      "Companies moving to a new CRM and wanting to set it up properly",
    ],
    problems: [
      {
        title: "Leads arriving in too many places",
        text: "Website forms, ads, portals and inboxes all feed straight into the CRM, tagged with their source.",
      },
      {
        title: "Records that are never updated",
        text: "Calls, emails, meetings and deal changes are logged automatically, so the record reflects what actually happened.",
      },
      {
        title: "Forgotten follow-ups",
        text: "Tasks, reminders and follow-up sequences are created automatically based on the lead's stage and activity.",
      },
      {
        title: "Tools that don't talk to each other",
        text: "We connect the CRM with your phone system, calendar, email, accounting and marketing tools.",
      },
    ],
    included: [
      {
        title: "Lead source integration",
        text: "Connect ads, property portals, website forms and other sources so new leads land in the CRM instantly.",
      },
      {
        title: "Lead routing and assignment",
        text: "Rules that assign each lead to the right person or team, with round-robin, territory or skill-based options.",
      },
      {
        title: "Automated tasks and follow-up",
        text: "Smart lists, action plans, tasks, reminders and email or SMS sequences triggered by stage and behaviour.",
      },
      {
        title: "Two-way app integrations",
        text: "Sync data between your CRM and phone, calendar, email, marketing and accounting tools.",
      },
      {
        title: "Data cleanup",
        text: "Deduplication, field standardisation and enrichment so reports and automations work properly.",
      },
      {
        title: "CRM setup and migration",
        text: "Pipeline design, custom fields and moving data from an old system when needed.",
      },
    ],
    steps: [
      {
        title: "Consultation",
        text: "We look at your CRM, your lead sources and how your team uses them, and agree a written scope.",
      },
      {
        title: "Audit and design",
        text: "We document pipelines, fields and rules, and design the automations and integrations.",
      },
      {
        title: "Build and connect",
        text: "We configure the CRM, build integrations and set up automations in a safe test environment where possible.",
      },
      {
        title: "Test with your team",
        text: "Your team works through real scenarios, and we adjust rules before switching on.",
      },
      {
        title: "Launch and support",
        text: "We go live, train your team on what changed and keep maintaining the automations.",
      },
    ],
    tools: ["Follow Up Boss", "Lofty", "Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "GoHighLevel", "Zapier, Make and n8n", "Phone, SMS and calendar systems"],
    toolsNote:
      "We can work with most CRMs that offer an API. If yours is not listed, ask us during the consultation.",
    industries: ["Real estate teams and brokerages", "B2B sales teams", "Mortgage and insurance", "Agencies", "Home services", "Professional services"],
    faqs: [
      {
        q: "What is CRM automation?",
        a: "CRM automation is setting up your CRM so routine work happens on its own: new leads are added from every source, assigned to the right person, given follow-up tasks and kept up to date with calls, emails and meetings, without manual data entry.",
      },
      {
        q: "Which CRMs do you work with?",
        a: "Ezomod works with Follow Up Boss, Lofty, Salesforce and HubSpot, as well as Pipedrive, Zoho, GoHighLevel and most other CRMs that provide an API or webhooks.",
      },
      {
        q: "Can you connect my lead sources to my CRM?",
        a: "Yes. We connect ad platforms, property portals, website forms, landing pages and inboxes so new leads arrive in your CRM instantly, tagged with where they came from, and trigger the right follow-up.",
      },
      {
        q: "Do I need to switch CRMs?",
        a: "Usually not. We prefer to automate the CRM you already use. If your current system is genuinely limiting you, we can help you choose a new one and handle the migration.",
      },
      {
        q: "How is this different from AI lead follow-up?",
        a: "CRM automation makes your CRM itself run smoothly: data, routing, tasks and integrations. AI lead follow-up adds an AI that actually calls, texts and emails your leads. Many teams use both together.",
      },
      {
        q: "Can you clean up messy CRM data?",
        a: "Yes. We remove duplicates, standardise fields and fill gaps where reliable data is available, then put automations in place so the data stays clean.",
      },
    ],
    related: ["ai-lead-follow-up", "ai-automation", "ai-lead-generation"],
  },
  {
    slug: "ai-chatbots",
    name: "AI Chatbots & Customer Support Automation",
    navLabel: "AI Chatbots",
    icon: "message",
    primaryKeyword: "AI chatbot development",
    secondaryKeywords: [
      "customer support automation",
      "AI customer service agent",
      "website chatbot",
      "WhatsApp chatbot for business",
    ],
    summary:
      "AI chat assistants for your website, WhatsApp and other channels that answer questions from your own content, capture leads and hand complex cases to your team.",
    metaTitle: "AI Chatbot Development & Support Automation | Ezomod",
    metaDescription:
      "Ezomod builds AI chatbots for websites and WhatsApp that answer from your own content, capture leads, book appointments and hand off to your support team.",
    h1: "AI Chatbots & Customer Support Automation",
    definitionQuestion: "What is an AI chatbot for business?",
    definition:
      "An AI chatbot for business is a chat assistant on your website or messaging apps that understands customers' questions in plain language and answers them using your own information, and can also capture leads, book appointments or pass the conversation to a person.",
    intro: [
      "Customers expect quick answers at any hour. Old-style chatbots with fixed buttons frustrate people, and support teams end up answering the same questions again and again.",
      "Ezomod builds AI chatbots that are trained on your own content, such as your website, help articles, policies and product information, so they give accurate, specific answers instead of generic ones. They can collect contact details, qualify leads, book appointments, check order or account information through your systems, and hand complex conversations to your team with the full history attached.",
      "Each chatbot is set up with clear limits on what it can say and do, and we review conversations with you after launch to keep improving its answers.",
    ],
    whoFor: [
      "Businesses whose support team answers the same questions every day",
      "Websites that get visitors outside office hours",
      "Companies that sell or support customers on WhatsApp or other messaging apps",
      "Service businesses that want chat to turn into booked appointments",
      "Teams that tried a basic chatbot and found it unhelpful",
    ],
    problems: [
      {
        title: "Repetitive support questions",
        text: "The chatbot handles common questions instantly, so your team can focus on the conversations that need a person.",
      },
      {
        title: "Visitors leaving without contacting you",
        text: "A helpful chat assistant answers questions on the spot and captures contact details from interested visitors.",
      },
      {
        title: "Slow responses outside office hours",
        text: "Customers get answers 24/7, and anything that needs a human is queued with full context for the morning.",
      },
      {
        title: "Generic, unhelpful bots",
        text: "Answers come from your own content and rules, not from a script of fixed buttons.",
      },
    ],
    included: [
      {
        title: "Website chat assistant",
        text: "A chat widget that matches your brand and answers questions from your own content.",
      },
      {
        title: "WhatsApp and messaging channels",
        text: "The same assistant on WhatsApp and other channels where your customers already talk to you.",
      },
      {
        title: "Knowledge base setup",
        text: "We organise your website, documents and FAQs so the chatbot can find accurate answers.",
      },
      {
        title: "Lead capture and booking",
        text: "Collect contact details, qualify interest and book appointments straight into your calendar and CRM.",
      },
      {
        title: "Human handoff",
        text: "Clear rules for when to pass the conversation to your team, with the full chat history attached.",
      },
      {
        title: "Review and improvement",
        text: "Conversation reviews and updates to content and behaviour after launch.",
      },
    ],
    steps: [
      {
        title: "Consultation",
        text: "We look at the questions customers ask most, the channels you use and what the chatbot should and should not do.",
      },
      {
        title: "Prepare your content",
        text: "We gather and organise the information the chatbot will answer from, and write its rules and tone.",
      },
      {
        title: "Build and connect",
        text: "We build the chatbot and connect it to your website, messaging channels, calendar and CRM or help desk.",
      },
      {
        title: "Test with your team",
        text: "Your team tries to trip it up, and we fix gaps before customers see it.",
      },
      {
        title: "Launch and improve",
        text: "The chatbot goes live, and we review real conversations with you and keep improving it.",
      },
    ],
    tools: ["Large language models (LLMs)", "Website chat widgets", "WhatsApp Business", "Help desks such as Zendesk, Freshdesk and Intercom", "Your CRM and calendar", "Your website, documents and knowledge base"],
    toolsNote:
      "The chatbot can live in a widget we build or inside a help desk platform you already use.",
    industries: ["E-commerce", "Real estate", "Healthcare and clinics", "SaaS", "Education", "Hospitality and travel"],
    faqs: [
      {
        q: "How is an AI chatbot different from a normal chatbot?",
        a: "A normal chatbot follows fixed buttons and scripts. An AI chatbot understands questions written in everyday language and answers using your own content, so it can handle many more questions and sound natural, while following the limits you set.",
      },
      {
        q: "Will the chatbot make up answers?",
        a: "We design the chatbot to answer from your approved content and to say it does not know, or hand over to a person, when the answer is not there. We test this carefully before launch and review conversations afterwards.",
      },
      {
        q: "Can the chatbot work on WhatsApp?",
        a: "Yes. Ezomod can deploy the same AI assistant on your website and on WhatsApp Business, as well as other messaging channels, so customers get consistent answers wherever they reach you.",
      },
      {
        q: "Can it hand conversations to a real person?",
        a: "Yes. You decide when a conversation should be passed to your team, for example for complaints, complex questions or high-value leads. The full chat history goes with it.",
      },
      {
        q: "Can the chatbot capture leads and book appointments?",
        a: "Yes. It can ask qualifying questions, collect contact details, book a time on your calendar and create or update the contact in your CRM.",
      },
      {
        q: "How do we keep the chatbot's answers up to date?",
        a: "When your content changes, the chatbot's knowledge is updated. We set up a simple process for this and include updates as part of ongoing support.",
      },
    ],
    related: ["ai-voice-agents", "multi-agent-ai-workflows", "ai-automation"],
  },
  {
    slug: "website-development",
    name: "Website Design & Development",
    navLabel: "Website Development",
    icon: "globe",
    primaryKeyword: "website development agency",
    secondaryKeywords: [
      "website design and development",
      "Next.js development",
      "SEO-friendly websites",
      "conversion-focused website design",
    ],
    summary:
      "Fast, search-friendly business websites designed to turn visitors into enquiries, and ready to connect to your CRM, chatbots and automations.",
    metaTitle: "Website Design & Development Agency | Ezomod",
    metaDescription:
      "Ezomod designs and develops fast, SEO-friendly business websites that turn visitors into leads and connect to your CRM, chatbots and automations.",
    h1: "Website Design & Development",
    definitionQuestion: "What does a website development agency do?",
    definition:
      "A website development agency plans, designs, builds and launches websites for businesses, covering how the site looks, how fast and reliably it works, how easily it is found in search, and how well it turns visitors into customers.",
    intro: [
      "Your website is often the first place a potential customer checks before contacting you. If it is slow, hard to use on a phone, unclear about what you do or invisible in search, you lose those customers before you ever hear from them.",
      "Ezomod designs and develops modern websites with three goals: load fast, be easy to find in Google and AI search tools, and make it simple for visitors to get in touch. We write clear, plain-English content structure, build with modern frameworks such as Next.js, and set up the technical SEO foundations such as metadata, structured data and sitemaps from day one.",
      "Because Ezomod is an AI automation agency, your website can also connect directly to the rest of your systems. Form submissions can go straight into your CRM, trigger instant AI follow-up, or feed a chatbot that answers visitors' questions.",
    ],
    whoFor: [
      "Businesses with an outdated, slow or hard-to-update website",
      "Companies launching a new brand, product or service",
      "Teams whose website gets traffic but not enquiries",
      "Businesses that want their site connected to their CRM and automations",
      "Real estate teams and agencies that need a fast, professional web presence",
    ],
    problems: [
      {
        title: "Slow, outdated websites",
        text: "Modern frameworks, optimised images and lean code help pages load quickly, especially on mobile.",
      },
      {
        title: "Hard to find in search",
        text: "Technical SEO, clear page structure and structured data help search engines and AI tools understand your business.",
      },
      {
        title: "Visitors who don't get in touch",
        text: "Clear messaging, obvious calls to action and simple forms make it easy to take the next step.",
      },
      {
        title: "Websites disconnected from sales",
        text: "Forms and bookings flow straight into your CRM and can trigger instant follow-up.",
      },
    ],
    included: [
      {
        title: "Strategy and site structure",
        text: "We plan pages around what your customers search for and the actions you want them to take.",
      },
      {
        title: "Design",
        text: "A clean, modern design that reflects your brand and works well on every screen size.",
      },
      {
        title: "Development",
        text: "Fast, accessible websites built with modern frameworks such as Next.js, or a CMS when your team needs to edit often.",
      },
      {
        title: "Technical SEO foundations",
        text: "Page titles and descriptions, sitemaps, structured data, clean URLs and performance optimisation.",
      },
      {
        title: "Forms, booking and integrations",
        text: "Contact forms, scheduling and connections to your CRM, chatbots and automations.",
      },
      {
        title: "Launch and support",
        text: "Hosting setup, analytics, Search Console, and ongoing updates after launch.",
      },
    ],
    steps: [
      {
        title: "Consultation",
        text: "We discuss your goals, audience and what is not working today, and agree a written scope and timeline.",
      },
      {
        title: "Plan and design",
        text: "We map the pages and content structure, then design key pages for your review.",
      },
      {
        title: "Build",
        text: "We develop the site, connect forms and integrations, and optimise speed and SEO.",
      },
      {
        title: "Review and test",
        text: "You review the site on desktop and mobile, and we test performance, accessibility and forms.",
      },
      {
        title: "Launch and grow",
        text: "We launch, set up analytics and Search Console, and support you with updates and improvements.",
      },
    ],
    tools: ["Next.js and React", "Tailwind CSS", "Headless CMS options", "Cloudflare, Vercel and other modern hosting", "Google Analytics and Search Console", "Your CRM, booking tool and chatbot"],
    toolsNote:
      "We recommend the platform that fits how often you update content and who will edit it.",
    industries: ["Real estate", "Professional services", "Startups and SaaS", "Local and home services", "Agencies"],
    faqs: [
      {
        q: "What does a website development agency do?",
        a: "A website development agency plans, designs, builds and launches websites. Ezomod also handles technical SEO, performance, forms and integrations, so the site is fast, easy to find and connected to your CRM and automations.",
      },
      {
        q: "Will my website be SEO-friendly?",
        a: "Yes. Every site we build includes technical SEO foundations: unique page titles and descriptions, a sitemap, structured data, clean URLs, fast loading and a clear heading structure that search engines and AI tools can understand.",
      },
      {
        q: "Which platform do you build websites on?",
        a: "We often use Next.js for speed and flexibility, and can add a headless CMS so your team can edit content. If you need a different platform, we will recommend what fits how your team works.",
      },
      {
        q: "Can my website connect to my CRM and chatbot?",
        a: "Yes. Ezomod connects website forms and bookings to your CRM, and can add an AI chatbot or instant AI follow-up, so every enquiry is captured and answered quickly.",
      },
      {
        q: "Can I update the website myself?",
        a: "If you need to edit content regularly, we set up a content management system so you can update pages, blog posts and images without code.",
      },
      {
        q: "Do you redesign existing websites?",
        a: "Yes. We can redesign and rebuild an existing site, keeping your important pages and URLs, or setting up redirects, so you do not lose search rankings.",
      },
    ],
    related: ["ai-chatbots", "crm-automation", "ai-lead-generation"],
  },
];

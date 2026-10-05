import type { Service } from "@/lib/services";

/** Services a–d. Plain English, answer-first. No invented numbers, clients or results. */
export const SERVICES_A: Service[] = [
  {
    slug: "ai-lead-generation",
    name: "AI Lead Generation",
    navLabel: "AI Lead Generation",
    icon: "target",
    primaryKeyword: "AI lead generation",
    secondaryKeywords: [
      "AI lead generation services",
      "automated lead generation",
      "AI prospecting",
      "B2B lead generation AI",
      "lead qualification AI",
    ],
    summary:
      "AI systems that find the right prospects, research them, and start personalised conversations, so your pipeline fills without more manual prospecting.",
    metaTitle: "AI Lead Generation Services | Ezomod",
    metaDescription:
      "Ezomod builds AI lead generation systems that find, research and qualify prospects, then start personalised outreach and hand warm leads to your team.",
    h1: "AI Lead Generation Services",
    definitionQuestion: "What is AI lead generation?",
    definition:
      "AI lead generation is the use of AI to find potential customers, research them, judge how good a fit they are, and start the first conversation, with far less manual work from your team.",
    intro: [
      "Traditional lead generation means someone on your team builds lists, looks up each company, writes messages one by one and tracks replies in a spreadsheet. It is slow, it does not scale, and the quality depends on whoever is doing it that week.",
      "Ezomod builds AI lead generation systems that do the repetitive parts for you. The system pulls prospects from the sources you choose, enriches each record with useful context, scores how well it matches your ideal customer, and writes outreach that refers to something real about that prospect. Interested replies go straight into your CRM so a person can take over.",
      "We do not sell you a generic tool. We build the system around your market, your offer and the way your sales team already works, and we keep improving it after launch.",
    ],
    whoFor: [
      "B2B companies that depend on outbound prospecting to grow",
      "Agencies and service businesses that want a steadier flow of qualified sales calls",
      "Real estate teams and brokerages looking for new buyer, seller or investor leads",
      "Founders who are doing prospecting themselves and want that time back",
      "Sales teams whose reps spend more time researching than selling",
    ],
    problems: [
      {
        title: "Not enough qualified leads",
        text: "Your team is busy, but the pipeline is thin. The system keeps prospecting every day, so new opportunities keep arriving even when everyone is focused on closing.",
      },
      {
        title: "Too much time spent on research",
        text: "Looking up each company and contact by hand is slow. AI enrichment gathers the key facts for every prospect before anyone on your team looks at it.",
      },
      {
        title: "Generic outreach that gets ignored",
        text: "Template emails are easy to spot. Each message is written for the specific prospect, based on the information the system collected.",
      },
      {
        title: "Leads that never get followed up",
        text: "Prospects who show interest but do not book are easy to lose. The system follows up on a schedule you approve and logs every touch in your CRM.",
      },
    ],
    included: [
      {
        title: "Ideal customer profile and targeting",
        text: "We work with you to define who a good lead is (industry, size, location, role and buying signals) and turn that into rules the system can apply.",
      },
      {
        title: "Prospect sourcing and enrichment",
        text: "The system pulls prospects from the data sources you approve and adds context such as company details, recent activity and relevant contact information.",
      },
      {
        title: "AI lead scoring",
        text: "Each prospect gets a fit score with a short explanation, so your team can see why a lead was prioritised instead of trusting a black box.",
      },
      {
        title: "Personalised multi-channel outreach",
        text: "Email and, where appropriate, LinkedIn or SMS sequences that are written for each prospect and sent on a schedule you control.",
      },
      {
        title: "Reply handling and handoff",
        text: "Replies are sorted by intent. Interested prospects are routed to the right person, meetings can be booked, and everything is written to your CRM.",
      },
      {
        title: "Ongoing tuning",
        text: "We review what is working with you and adjust targeting, messaging and timing as results come in.",
      },
    ],
    steps: [
      {
        title: "Consultation",
        text: "We learn about your offer, your best customers and your current sales process, and agree on a written scope and timeline.",
      },
      {
        title: "Targeting and messaging",
        text: "We define your ideal customer profile, choose data sources and draft outreach with you, so the voice sounds like your business.",
      },
      {
        title: "Build and connect",
        text: "We build the sourcing, enrichment, scoring and outreach workflows and connect them to your email, calendar and CRM.",
      },
      {
        title: "Test and approve",
        text: "We run small test batches, review the results with you and only scale once you are happy with lead quality and tone.",
      },
      {
        title: "Launch and improve",
        text: "The system runs every day. We monitor it, report back regularly and keep improving targeting and messages.",
      },
    ],
    tools: ["Your CRM (HubSpot, Salesforce, Pipedrive and others)", "Email and calendar (Google Workspace, Microsoft 365)", "LinkedIn", "Prospect data and enrichment providers", "Large language models (LLMs)", "Zapier, Make or n8n for glue logic"],
    toolsNote:
      "The exact stack depends on what you already use. Where possible we build on your existing tools rather than adding new subscriptions.",
    industries: ["B2B services and SaaS", "Agencies and consultancies", "Real estate", "Professional services", "Home and local services"],
    faqs: [
      {
        q: "What is AI lead generation?",
        a: "AI lead generation uses AI to find potential customers, research them, score how well they fit your ideal customer and start personalised outreach. Your team spends its time talking to interested prospects instead of building lists and writing cold messages by hand.",
      },
      {
        q: "Is AI lead generation better than buying lead lists?",
        a: "Bought lists are usually generic and shared with many other companies. An AI lead generation system builds and refreshes its own list against your criteria, adds context for each prospect and personalises outreach, which usually leads to better conversations. You still control which data sources are used.",
      },
      {
        q: "Will the outreach sound like a robot?",
        a: "It should not. We write the messaging with you, set the tone and review samples before anything is sent. Each message refers to real details about the prospect, and you approve the templates and rules the AI follows.",
      },
      {
        q: "Does this work with my CRM?",
        a: "In most cases, yes. Ezomod connects AI lead generation to common CRMs such as HubSpot, Salesforce and Pipedrive, and to many others through their APIs or automation tools. New leads, replies and activity are written to your CRM automatically.",
      },
      {
        q: "How long does it take to set up?",
        a: "It depends on how many data sources, channels and integrations are involved. After the consultation we give you a written scope with a timeline, and we test with small batches before scaling up.",
      },
      {
        q: "Is it compliant with email and privacy rules?",
        a: "We build with compliance in mind, including opt-out handling and sending limits, but the rules depend on your country and market. You remain responsible for your outreach policy, and we recommend checking it with your legal advisor.",
      },
    ],
    related: ["ai-lead-follow-up", "crm-automation", "multi-agent-ai-workflows"],
  },
  {
    slug: "ai-lead-follow-up",
    name: "AI Lead Follow-Up & Speed-to-Lead",
    navLabel: "AI Lead Follow-Up",
    icon: "zap",
    primaryKeyword: "AI lead follow-up",
    secondaryKeywords: [
      "speed to lead",
      "automated lead follow-up",
      "real estate lead follow-up",
      "instant lead response",
      "lead nurturing automation",
    ],
    summary:
      "Every new lead gets a call, text and email within seconds, followed up until they respond, with qualified appointments booked straight onto your team's calendar.",
    metaTitle: "AI Lead Follow-Up & Speed-to-Lead System | Ezomod",
    metaDescription:
      "Ezomod's AI lead follow-up calls, texts and emails every new lead in under 30 seconds, qualifies them and books appointments in your CRM, 24/7.",
    h1: "AI Lead Follow-Up & Speed-to-Lead Automation",
    definitionQuestion: "What is AI lead follow-up?",
    definition:
      "AI lead follow-up is a system that contacts every new lead by phone, text and email within seconds of their inquiry, keeps following up until they respond, and books qualified appointments for your team.",
    intro: [
      "Most businesses lose leads in the gap between the inquiry and the first conversation. A lead fills in a form at night or on a weekend, nobody calls for hours, and by then they have spoken to someone else. \"Speed to lead\" is simply how fast you make that first contact.",
      "Ezomod builds AI lead follow-up systems that close that gap. When an inquiry arrives from your ads, property portals or website, the system places a call within about thirty seconds, sends a text and email if there is no answer, and keeps following up on a schedule. On the call it asks your qualification questions, answers common questions, and books the appointment on your team's calendar.",
      "Everything runs inside the CRM your team already uses, such as Follow Up Boss, Lofty or Salesforce. Notes, tags, recordings and appointments land on the contact record, so there is no new dashboard to learn. Real estate is where our lead follow-up work is most specialised.",
    ],
    whoFor: [
      "Real estate teams and brokerages handling online buyer and seller leads",
      "Businesses spending on ads or lead portals where response time decides who wins the deal",
      "Teams whose agents or reps cannot answer every inquiry instantly, day and night",
      "Companies with old leads in the CRM that were never properly followed up",
      "Any sales team that wants appointments, not just more names in a list",
    ],
    problems: [
      {
        title: "Slow first response",
        text: "Leads go cold while they wait. The system responds in under 30 seconds, 24/7/365, including evenings, weekends and holidays.",
      },
      {
        title: "Follow-up that stops too early",
        text: "Most leads need several touches. The system keeps going across calls, texts and emails until the lead responds or opts out.",
      },
      {
        title: "Forgotten callbacks",
        text: "When a lead says \"call me next month\", the system records the date and the reason, sends relevant updates in between, and calls back on the day it promised.",
      },
      {
        title: "Messy CRM data",
        text: "Call recordings, transcripts and qualification answers are written to the contact record automatically, so your team always has the full picture.",
      },
    ],
    included: [
      {
        title: "Instant first response",
        text: "Every new inquiry gets a phone call within about thirty seconds, day or night, with a text and email sent if they don't pick up.",
      },
      {
        title: "Qualification on the call",
        text: "A natural voice conversation that checks the details you care about, for real estate typically budget and pre-approval, timeline and motivation, and target neighbourhoods.",
      },
      {
        title: "Follow-up that remembers",
        text: "Long-term nurture with the context of every previous conversation, including scheduled callbacks and relevant listings or offers in between.",
      },
      {
        title: "Reaching the right person",
        text: "If a contact goes quiet across every channel, the system rotates call times and channels, and can reach a co-buyer or spouse already on file.",
      },
      {
        title: "CRM updates and calendar booking",
        text: "Audio, transcripts and structured answers are written to your CRM before the call ends, and appointments are booked straight onto your team's calendar.",
      },
      {
        title: "Warm handoff to your team",
        text: "When a lead is ready, the system can transfer the call or alert the right agent with a summary, so your people only spend time on real opportunities.",
      },
    ],
    steps: [
      {
        title: "Consultation",
        text: "We review your lead sources, CRM, pipeline stages, and how your team currently follows up. You get a clear written scope and timeline.",
      },
      {
        title: "Build and connect",
        text: "We connect your CRM, phone numbers, and lead sources, then write the call scripts, qualification questions, and handoff rules with you.",
      },
      {
        title: "Test with your team",
        text: "We run the system on test leads and a small share of live traffic. Your team listens to calls and signs off before anything goes wider.",
      },
      {
        title: "Launch and ongoing support",
        text: "We go live across all lead sources, review results with you each month, and keep tuning scripts and timing as your business changes.",
      },
    ],
    tools: ["Follow Up Boss", "Lofty", "Salesforce", "Other CRMs with an API", "Meta Ads and Google Local Services Ads", "Property portals and IDX website forms", "Phone, SMS, WhatsApp and email", "Google and Outlook calendars"],
    toolsNote:
      "If your CRM or lead source is not listed, ask us. Most systems can be connected through their API or a webhook.",
    industries: ["Real estate teams and brokerages", "Home services", "Any business that buys leads from ads or portals"],
    faqs: [
      {
        q: "What does speed to lead mean?",
        a: "Speed to lead is the time between a new inquiry arriving and your first real contact with that person. The faster you respond, the more likely you are to reach them while they are still interested and before a competitor does. Ezomod's system responds in under 30 seconds.",
      },
      {
        q: "Will leads know they are talking to AI?",
        a: "The system uses a natural, human-sounding voice, and we set it up to be transparent where the law or your policy requires it. Call recording and AI disclosures are configured for your market during setup.",
      },
      {
        q: "Which CRMs does AI lead follow-up work with?",
        a: "Ezomod builds directly inside Follow Up Boss, Lofty and Salesforce, and can connect to most other CRMs that offer an API or webhooks. Notes, tags, recordings and appointments are written to the contact record your team already uses.",
      },
      {
        q: "What happens when a lead wants to talk to a person?",
        a: "The system can transfer the call live to an available team member or alert the right agent with a summary and a booked time. You decide the handoff rules during setup.",
      },
      {
        q: "Can it follow up with old leads in my CRM?",
        a: "Yes. The same system can work through older leads that were never properly followed up, re-qualify them and book appointments with the ones who are still interested.",
      },
      {
        q: "How long does setup take?",
        a: "Most teams are live within a few weeks. We do the technical work; your team reviews and approves each stage, including listening to test calls before the system goes live.",
      },
      {
        q: "Do I need to change my CRM or learn new software?",
        a: "No. There is no new dashboard. The system runs inside the CRM your team already uses, and we maintain it after launch.",
      },
    ],
    related: ["ai-voice-agents", "crm-automation", "ai-lead-generation"],
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents & Call Automation",
    navLabel: "AI Voice Agents",
    icon: "phone",
    primaryKeyword: "AI voice agents",
    secondaryKeywords: [
      "AI phone agent",
      "AI calling agent for business",
      "automated outbound calls",
      "AI receptionist",
      "call automation",
    ],
    summary:
      "Natural-sounding AI phone agents that answer inbound calls, make outbound calls, qualify callers and book appointments, all logged in your CRM.",
    metaTitle: "AI Voice Agents & Call Automation | Ezomod",
    metaDescription:
      "Ezomod builds AI voice agents that answer and make phone calls, qualify callers, book appointments and log every call in your CRM, around the clock.",
    h1: "AI Voice Agents & Call Automation",
    definitionQuestion: "What is an AI voice agent?",
    definition:
      "An AI voice agent is software that holds natural phone conversations: it answers or makes calls, understands what the caller says, responds in a human-sounding voice, and takes actions such as booking an appointment or updating your CRM.",
    intro: [
      "Phone calls are still how many customers prefer to buy, book and ask questions. But staffing phones all day is expensive, missed calls turn into lost revenue, and outbound calling is repetitive work that burns people out.",
      "Ezomod designs and builds AI voice agents for both inbound and outbound calls. An inbound agent can act as a receptionist: it answers every call, handles common questions, qualifies the caller and books a time or transfers to a person. An outbound agent can call new leads, confirm appointments, follow up on quotes or re-engage old contacts.",
      "Each agent is built around your scripts, your rules and your systems. Calls are recorded and transcribed where permitted, and the outcome is written to your CRM so your team can see exactly what happened.",
    ],
    whoFor: [
      "Businesses that miss calls outside office hours or during busy periods",
      "Sales teams that need to call new leads quickly and consistently",
      "Agencies and service businesses that book appointments by phone",
      "Real estate teams qualifying buyer and seller inquiries",
      "Operations teams making repetitive reminder or confirmation calls",
    ],
    problems: [
      {
        title: "Missed calls and voicemail",
        text: "An AI receptionist answers every call, 24/7, so callers are helped straight away instead of being sent to voicemail.",
      },
      {
        title: "Slow outbound calling",
        text: "Outbound agents call new leads within seconds and work through call lists consistently, without fatigue.",
      },
      {
        title: "Inconsistent conversations",
        text: "Every call follows the same qualification questions and rules, so you get complete, comparable information on every lead.",
      },
      {
        title: "No record of what was said",
        text: "Recordings, transcripts and a short summary are saved to the contact record after every call.",
      },
    ],
    included: [
      {
        title: "Inbound AI receptionist",
        text: "Answers calls, handles FAQs, qualifies callers, books appointments and transfers to a person when needed.",
      },
      {
        title: "Outbound calling agent",
        text: "Calls new leads, follows up, confirms appointments and re-engages older contacts, with text and email as backup channels.",
      },
      {
        title: "Script and conversation design",
        text: "We write the call flow with you, including qualification questions, objection handling and when to hand over to a human.",
      },
      {
        title: "Phone number and system setup",
        text: "We connect your existing numbers or set up new ones, plus your calendar and CRM.",
      },
      {
        title: "Call logging and summaries",
        text: "Recordings, transcripts, outcomes and structured answers are written to your CRM automatically.",
      },
      {
        title: "Monitoring and improvement",
        text: "We review calls with you after launch and keep refining the agent's answers and behaviour.",
      },
    ],
    steps: [
      {
        title: "Consultation",
        text: "We map which calls you want to automate, what a good outcome looks like and where a human should take over.",
      },
      {
        title: "Conversation design",
        text: "We write scripts, questions and rules together, and choose the voice and tone that fits your brand.",
      },
      {
        title: "Build and connect",
        text: "We build the agent and connect phone numbers, calendars and your CRM.",
      },
      {
        title: "Test calls",
        text: "Your team calls the agent, listens to recordings and signs off before it handles real customers.",
      },
      {
        title: "Launch and tune",
        text: "The agent goes live, and we keep reviewing calls and improving it over time.",
      },
    ],
    tools: ["Telephony and SIP providers", "Voice AI and speech-to-text models", "Large language models (LLMs)", "Google and Outlook calendars", "Follow Up Boss, Lofty, Salesforce, HubSpot and other CRMs", "SMS and WhatsApp for follow-up"],
    toolsNote:
      "We choose voice and telephony providers based on your country, call volume, languages and quality needs.",
    industries: ["Real estate", "Home services", "Professional services", "Hospitality"],
    faqs: [
      {
        q: "What does an AI voice agent do?",
        a: "An AI voice agent answers or makes phone calls and holds a natural conversation. It can answer common questions, ask qualification questions, book appointments, transfer callers to a person and log everything in your CRM, at any time of day.",
      },
      {
        q: "Does it sound like a real person?",
        a: "Modern AI voices sound natural and respond quickly. You choose the voice and tone during setup and hear test calls before launch. Where the law or your policy requires it, the agent tells callers they are speaking with an AI assistant.",
      },
      {
        q: "Can the AI transfer a call to a human?",
        a: "Yes. You decide when a call should be handed over, for example when the caller asks for a person, when a lead is highly qualified, or when a question is outside the agent's scope. The agent can transfer live or book a callback.",
      },
      {
        q: "Can I keep my existing phone number?",
        a: "Usually, yes. Calls can be forwarded or routed from your existing number to the AI agent, or we can set up new numbers for specific campaigns.",
      },
      {
        q: "Is this an AI receptionist or an outbound dialler?",
        a: "Either or both. Ezomod builds inbound agents that answer calls like a receptionist, outbound agents that call leads and customers, or a combination that shares the same CRM data.",
      },
      {
        q: "Are calls recorded?",
        a: "Calls can be recorded and transcribed where permitted by law, with the required disclosure at the start of the call. Recordings and summaries are saved to your CRM.",
      },
    ],
    related: ["ai-lead-follow-up", "ai-chatbots", "crm-automation"],
  },
  {
    slug: "multi-agent-ai-workflows",
    name: "Multi-Agent AI Workflow Development",
    navLabel: "Multi-Agent AI Workflows",
    icon: "network",
    primaryKeyword: "multi-agent AI workflow development",
    secondaryKeywords: [
      "multi-agent systems",
      "AI agent development",
      "agentic workflows",
      "custom AI agents",
      "AI agent orchestration",
    ],
    summary:
      "Custom systems where several specialised AI agents work together, each handling one part of a bigger job, with checks and human approval where it matters.",
    metaTitle: "Multi-Agent AI Workflow Development | Ezomod",
    metaDescription:
      "Ezomod designs and builds multi-agent AI workflows: specialised AI agents that research, decide, act and check each other's work inside your systems.",
    h1: "Multi-Agent AI Workflow Development",
    definitionQuestion: "What is a multi-agent AI workflow?",
    definition:
      "A multi-agent AI workflow is a system where several AI agents, each with a specific role, work together on a larger task: one might gather information, another makes a decision, another takes action and another checks the result.",
    intro: [
      "A single AI chatbot can answer questions, but real business processes have many steps. A request has to be understood, data has to be looked up in different systems, a decision has to follow your rules, something has to be updated or sent, and someone may need to approve it. Asking one AI to do all of that at once leads to unreliable results.",
      "Multi-agent systems split the work up. Each agent has a narrow job, its own instructions and only the tools it needs. An orchestrator passes work between them, and checks and human approvals sit at the points where mistakes would be costly. The result is more reliable, easier to test and easier to improve one piece at a time.",
      "Ezomod designs and builds these custom AI agent systems for real business processes such as lead handling, research, document processing, reporting and customer operations, connected to the tools you already use.",
    ],
    whoFor: [
      "Businesses with multi-step processes that are too complex for simple automation",
      "Teams that have tried a single chatbot or AI tool and found it unreliable",
      "Operations, sales and support leaders who want AI to take actions, not just answer questions",
      "Companies that need human approval built into AI decisions",
      "Product teams that want AI agents inside their own software",
    ],
    problems: [
      {
        title: "One AI trying to do everything",
        text: "Giving a single model a huge prompt leads to inconsistent results. Splitting the job across focused agents makes each step more dependable.",
      },
      {
        title: "Work spread across many systems",
        text: "Agents can read from and write to your CRM, inbox, documents, databases and internal tools, so people stop copying data between them.",
      },
      {
        title: "No control over AI decisions",
        text: "We add rules, checks and human approval steps so the system never takes an important action without the right oversight.",
      },
      {
        title: "Hard to see what the AI did",
        text: "Every step is logged, so you can see which agent did what and why, and fix problems quickly.",
      },
    ],
    included: [
      {
        title: "Process mapping",
        text: "We break your process into clear steps, decisions and handoffs, and decide which parts suit AI agents and which should stay with people.",
      },
      {
        title: "Agent design",
        text: "Each agent gets a defined role, instructions, tools and limits, for example a research agent, a writing agent and a review agent.",
      },
      {
        title: "Orchestration",
        text: "The logic that routes work between agents, handles errors and retries, and decides when to escalate to a person.",
      },
      {
        title: "Tool and data connections",
        text: "Secure connections to your CRM, email, documents, databases and APIs so agents can look things up and take action.",
      },
      {
        title: "Guardrails and human-in-the-loop",
        text: "Validation checks, approval steps and clear limits on what each agent is allowed to do.",
      },
      {
        title: "Logging, testing and maintenance",
        text: "Step-by-step logs, test cases for important scenarios, and ongoing improvement after launch.",
      },
    ],
    steps: [
      {
        title: "Consultation",
        text: "We learn how the process works today, where time is lost and what a good outcome looks like.",
      },
      {
        title: "Design",
        text: "We map the agents, their roles, the tools they need and where people approve or review, and agree on a written scope.",
      },
      {
        title: "Build",
        text: "We build the agents and orchestration, connect your systems and create test cases from real examples.",
      },
      {
        title: "Test with your team",
        text: "We run the workflow on real but low-risk work, review every step with you and tighten the rules.",
      },
      {
        title: "Launch and improve",
        text: "The workflow goes live with monitoring, and we keep improving individual agents as your needs change.",
      },
    ],
    tools: ["Large language models (LLMs) from leading AI providers", "Agent frameworks and orchestration tools", "Your CRM, email and calendar", "Google Drive, SharePoint and document stores", "Databases and internal APIs", "n8n, Make or Zapier where it fits"],
    toolsNote:
      "We pick models and frameworks per task, balancing quality, speed and running cost, and avoid locking you into one vendor where possible.",
    industries: ["Real estate", "Professional services", "E-commerce", "SaaS and technology", "Agencies"],
    faqs: [
      {
        q: "What is a multi-agent AI system?",
        a: "A multi-agent AI system is a group of AI agents that each handle one part of a task and pass work between them. For example, one agent researches, one drafts, and one checks the result. Splitting the work this way is usually more reliable than one AI doing everything.",
      },
      {
        q: "How is this different from normal automation?",
        a: "Normal automation follows fixed if-this-then-that rules. Multi-agent workflows can read unstructured information such as emails and documents, make judgement calls within the rules you set, and decide what to do next, while still logging every step.",
      },
      {
        q: "Can people approve what the AI does?",
        a: "Yes. Ezomod builds human-in-the-loop steps wherever you need them, so important actions such as sending a quote or updating a record can wait for a person's approval.",
      },
      {
        q: "Which AI models do you use?",
        a: "We choose models for each task based on quality, speed and cost, and can use models from different providers in the same workflow. We avoid tying you to a single vendor where possible.",
      },
      {
        q: "Is my data safe with AI agents?",
        a: "Agents only get access to the systems and data they need for their role. We use your accounts and access controls, and we discuss data handling and the AI providers involved with you before building.",
      },
      {
        q: "What kinds of processes suit multi-agent workflows?",
        a: "Good candidates are repetitive, multi-step processes that involve reading information, applying rules and updating several systems, such as lead handling, research, document processing, reporting and customer operations.",
      },
    ],
    related: ["ai-automation", "ai-chatbots", "ai-lead-generation"],
  },
];

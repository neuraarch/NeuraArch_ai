export interface Course {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: "coming-soon" | "live" | "waitlist";
  modules: { title: string; description: string }[];
  learnings: string[];
  audience: string[];
  instructor: { name: string; role: string; bio: string };
}

export interface Event {
  slug: string;
  title: string;
  date: string;
  time: string;
  description: string;
  takeaways: string[];
  speaker: { name: string; role: string; bio: string };
}

export const courses: Course[] = [
  {
    slug: "rag-mastery",
    title: "RAG Systems Mastery",
    description: "Build production-grade retrieval-augmented generation systems from architecture to deployment.",
    tags: ["RAG", "Architecture", "Production"],
    status: "coming-soon",
    learnings: [
      "Build end-to-end RAG pipelines",
      "Design multi-stage retrieval systems",
      "Implement hybrid search strategies",
      "Evaluate and monitor RAG quality",
    ],
    audience: [
      "Software engineers building AI products",
      "ML engineers scaling retrieval systems",
      "Technical leads making architecture decisions",
    ],
    modules: [
      { title: "Module 1: RAG Foundations", description: "Core concepts, embedding models, and vector stores" },
      { title: "Module 2: Retrieval Optimization", description: "Chunking strategies, hybrid search, and reranking" },
      { title: "Module 3: Advanced Patterns", description: "Multi-hop retrieval, query decomposition, and caching" },
      { title: "Module 4: Production Deployment", description: "Monitoring, evaluation, and scaling in production" },
    ],
    instructor: {
      name: "NeuraArch Team",
      role: "AI Systems Architects",
      bio: "Building and teaching production AI systems for enterprise teams.",
    },
  },
  {
    slug: "agentic-systems",
    title: "Agentic AI Systems",
    description: "Design, build, and deploy autonomous AI agents with proper guardrails and evaluation.",
    tags: ["Agents", "Architecture", "Safety"],
    status: "coming-soon",
    learnings: [
      "Design agent workflows and loops",
      "Implement tool use and function calling",
      "Build guardrails and safety layers",
      "Evaluate agent performance systematically",
    ],
    audience: [
      "Developers exploring autonomous AI",
      "QA engineers transitioning to AI",
      "Product managers building AI features",
    ],
    modules: [
      { title: "Module 1: Agent Fundamentals", description: "ReAct pattern, tool use, and planning" },
      { title: "Module 2: Multi-Agent Systems", description: "Orchestration, delegation, and communication" },
      { title: "Module 3: Guardrails & Safety", description: "Budgets, circuit breakers, and human-in-the-loop" },
      { title: "Module 4: Evaluation & Deployment", description: "Testing agents, monitoring, and production patterns" },
    ],
    instructor: {
      name: "NeuraArch Team",
      role: "AI Systems Architects",
      bio: "Building and teaching production AI systems for enterprise teams.",
    },
  },
  {
    slug: "vector-search-deep-dive",
    title: "Vector Search & Embeddings Deep Dive",
    description: "Master vector databases, embedding models, and semantic search for AI applications.",
    tags: ["Vector DB", "Embeddings", "Search"],
    status: "coming-soon",
    learnings: [
      "Choose the right vector database",
      "Fine-tune embedding models",
      "Build hybrid search pipelines",
      "Optimize for latency and cost",
    ],
    audience: [
      "Backend engineers adding search",
      "Data engineers building pipelines",
      "Developers building AI-powered search",
    ],
    modules: [
      { title: "Module 1: Embedding Models", description: "How embeddings work, model selection, and fine-tuning" },
      { title: "Module 2: Vector Databases", description: "Pinecone, Weaviate, Qdrant — when to use each" },
      { title: "Module 3: Search Pipelines", description: "Hybrid search, filtering, and reranking" },
      { title: "Module 4: Production Patterns", description: "Caching, sharding, and cost optimization" },
    ],
    instructor: {
      name: "NeuraArch Team",
      role: "AI Systems Architects",
      bio: "Building and teaching production AI systems for enterprise teams.",
    },
  },
  {
    slug: "ai-evaluation-framework",
    title: "AI Evaluation Framework",
    description: "Build comprehensive evaluation systems for LLMs, RAG, and agent-based applications.",
    tags: ["Evaluation", "RAG", "Agents"],
    status: "coming-soon",
    learnings: [
      "Design evaluation frameworks",
      "Implement LLM-as-judge patterns",
      "Build automated test suites",
      "Monitor production AI quality",
    ],
    audience: [
      "QA engineers moving to AI testing",
      "ML engineers building eval pipelines",
      "Engineering managers tracking AI quality",
    ],
    modules: [
      { title: "Module 1: Evaluation Principles", description: "What to measure, how to measure, and why" },
      { title: "Module 2: Retrieval Evaluation", description: "Recall, precision, MRR, and NDCG" },
      { title: "Module 3: Generation Evaluation", description: "Faithfulness, relevance, and hallucination detection" },
      { title: "Module 4: Continuous Monitoring", description: "Drift detection, alerting, and regression testing" },
    ],
    instructor: {
      name: "NeuraArch Team",
      role: "AI Systems Architects",
      bio: "Building and teaching production AI systems for enterprise teams.",
    },
  },
];

export const events: Event[] = [
  {
    slug: "rag-production-patterns",
    title: "RAG in Production: Patterns That Actually Work",
    date: "May 15, 2026",
    time: "6:00 PM IST",
    description: "A deep dive into battle-tested RAG patterns used by teams shipping AI products at scale.",
    takeaways: [
      "3 retrieval patterns that reduce hallucinations by 60%",
      "How to evaluate RAG quality without human labelers",
      "Production monitoring setup in under 30 minutes",
    ],
    speaker: {
      name: "NeuraArch Team",
      role: "AI Systems Architects",
      bio: "Building and teaching production AI systems for enterprise teams.",
    },
  },
  {
    slug: "building-ai-agents",
    title: "Building AI Agents: From Concept to Production",
    date: "May 28, 2026",
    time: "6:00 PM IST",
    description: "Learn how to design, implement, and deploy AI agents with proper guardrails and evaluation.",
    takeaways: [
      "The ReAct pattern explained with live code",
      "How to add guardrails without killing agent autonomy",
      "Real-world agent deployment case study",
    ],
    speaker: {
      name: "NeuraArch Team",
      role: "AI Systems Architects",
      bio: "Building and teaching production AI systems for enterprise teams.",
    },
  },
  {
    slug: "vector-db-showdown",
    title: "Vector DB Showdown: Choosing the Right One",
    date: "June 10, 2026",
    time: "6:00 PM IST",
    description: "Live comparison of Pinecone, Weaviate, Qdrant, and Chroma with real benchmarks.",
    takeaways: [
      "Side-by-side performance benchmarks",
      "Cost analysis for different scale tiers",
      "Decision framework for your specific use case",
    ],
    speaker: {
      name: "NeuraArch Team",
      role: "AI Systems Architects",
      bio: "Building and teaching production AI systems for enterprise teams.",
    },
  },
];

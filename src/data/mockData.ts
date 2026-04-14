export interface Article {
  slug: string;
  title: string;
  hook: string;
  content: ContentBlock[];
  tags: string[];
  readTime: string;
  author: string;
  date: string;
  featured?: boolean;
  thumbnail?: string;
  youtubeId?: string;
}

export interface Post {
  slug: string;
  headline: string;
  preview: string;
  content: ContentBlock[];
  tags: string[];
  author: string;
  date: string;
  likes: number;
  youtubeId?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  replies?: Comment[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level: 2 | 3 }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "callout"; text: string; variant?: "info" | "warning" | "tip" }
  | { type: "youtube"; videoId: string }
  | { type: "image"; src: string; alt: string };

export const articles: Article[] = [
  {
    slug: "why-most-rag-systems-fail",
    title: "Why Most RAG Systems Fail",
    hook: "The hidden architecture flaws that make retrieval-augmented generation unreliable in production.",
    tags: ["RAG", "Architecture", "Production"],
    readTime: "8 min",
    author: "NeuraArch",
    date: "Apr 10, 2026",
    featured: true,
    youtubeId: "dQw4w9WgXcQ",
    content: [
      { type: "paragraph", text: "Retrieval-Augmented Generation (RAG) has become the go-to pattern for building AI applications that need to work with custom data. But most RAG systems fail in production. Here's why." },
      { type: "heading", text: "The Retrieval Problem", level: 2 },
      { type: "paragraph", text: "Most teams treat retrieval as a solved problem. They embed documents, store them in a vector database, and call it a day. But similarity search is not the same as relevance." },
      { type: "callout", text: "Similarity ≠ Relevance. A semantically similar chunk may be completely irrelevant to the user's actual intent.", variant: "warning" },
      { type: "heading", text: "Chunking Strategy Matters", level: 2 },
      { type: "paragraph", text: "How you split your documents fundamentally changes what your retriever can find. Fixed-size chunking destroys context. Semantic chunking requires careful tuning." },
      { type: "code", language: "python", code: "from langchain.text_splitter import RecursiveCharacterTextSplitter\n\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=512,\n    chunk_overlap=64,\n    separators=[\"\\n\\n\", \"\\n\", \". \", \" \"]\n)\nchunks = splitter.split_documents(docs)" },
      { type: "heading", text: "Evaluation is Non-Negotiable", level: 2 },
      { type: "list", items: [
        "Measure retrieval recall and precision separately",
        "Use human-labeled relevance judgments",
        "Track end-to-end answer quality with LLM-as-judge",
        "Monitor drift over time as your corpus changes"
      ]},
      { type: "youtube", videoId: "dQw4w9WgXcQ" },
      { type: "paragraph", text: "Building reliable RAG requires treating it as a systems engineering problem, not just a prompt engineering exercise." },
    ],
  },
  {
    slug: "similarity-is-not-relevance",
    title: "Similarity ≠ Relevance: The Core RAG Misconception",
    hook: "Why vector similarity scores are misleading and how to build retrieval that actually works.",
    tags: ["RAG", "Embeddings", "Vector DB"],
    readTime: "6 min",
    author: "NeuraArch",
    date: "Apr 5, 2026",
    content: [
      { type: "paragraph", text: "When engineers first encounter vector search, they make a critical assumption: high cosine similarity means the document is relevant. This is dangerously wrong." },
      { type: "heading", text: "The Similarity Trap", level: 2 },
      { type: "paragraph", text: "Embeddings capture semantic proximity, not task relevance. Two passages about 'machine learning' might be semantically similar but answer completely different questions." },
      { type: "callout", text: "Always pair vector search with a reranker. Cross-encoders can dramatically improve precision.", variant: "tip" },
      { type: "paragraph", text: "The fix isn't better embeddings alone — it's a multi-stage retrieval pipeline with filtering, reranking, and context-aware scoring." },
    ],
  },
  {
    slug: "stop-searching-for-words",
    title: "Stop Searching for Words — Start Searching for Meaning",
    hook: "How semantic search transforms information retrieval and why keyword search still has its place.",
    tags: ["Vector DB", "Embeddings", "Search"],
    readTime: "7 min",
    author: "NeuraArch",
    date: "Mar 28, 2026",
    content: [
      { type: "paragraph", text: "Keyword search has served us well for decades. But in the age of LLMs, searching for exact words is like using a map when you have GPS." },
      { type: "heading", text: "Hybrid Search: The Best of Both", level: 2 },
      { type: "paragraph", text: "The most effective search systems combine dense retrieval (vectors) with sparse retrieval (BM25). This hybrid approach captures both semantic meaning and lexical precision." },
      { type: "code", language: "python", code: "# Hybrid search with Weaviate\nresults = client.query.get(\"Document\", [\"content\"])\\\n    .with_hybrid(query=\"RAG evaluation metrics\", alpha=0.7)\\\n    .with_limit(10)\\\n    .do()" },
      { type: "paragraph", text: "The alpha parameter controls the balance between vector and keyword search. Tune it based on your use case." },
    ],
  },
  {
    slug: "building-agentic-rag",
    title: "Building Agentic RAG: When Retrieval Needs Intelligence",
    hook: "Why static RAG pipelines aren't enough and how agents make retrieval adaptive.",
    tags: ["Agents", "RAG", "Architecture"],
    readTime: "10 min",
    author: "NeuraArch",
    date: "Mar 20, 2026",
    content: [
      { type: "paragraph", text: "Traditional RAG follows a rigid pipeline: query → retrieve → generate. But real questions often require multiple retrieval steps, query reformulation, and dynamic tool use." },
      { type: "heading", text: "The Agent Loop", level: 2 },
      { type: "paragraph", text: "An agentic RAG system decides what to retrieve, when to retrieve it, and whether the retrieved context is sufficient before generating an answer." },
      { type: "list", items: [
        "Query analysis and decomposition",
        "Dynamic retriever selection",
        "Iterative refinement with self-reflection",
        "Tool use for structured data queries"
      ]},
      { type: "paragraph", text: "This pattern transforms RAG from a static pipeline into an intelligent research assistant." },
    ],
  },
  {
    slug: "vector-db-comparison-2026",
    title: "Vector Database Comparison 2026: What Actually Matters",
    hook: "Pinecone vs Weaviate vs Qdrant vs Chroma — benchmarks, trade-offs, and when to use each.",
    tags: ["Vector DB", "Evaluation", "Architecture"],
    readTime: "12 min",
    author: "NeuraArch",
    date: "Mar 15, 2026",
    content: [
      { type: "paragraph", text: "Choosing a vector database is one of the most consequential decisions in your AI stack. Here's what actually matters beyond the marketing pages." },
      { type: "heading", text: "Performance vs Feature Trade-offs", level: 2 },
      { type: "paragraph", text: "Raw query latency is rarely the bottleneck. What matters more is filtering capabilities, hybrid search support, and operational simplicity." },
      { type: "callout", text: "Don't choose a vector DB based on benchmarks alone. Consider: managed vs self-hosted, filtering performance, metadata support, and ecosystem integration.", variant: "info" },
    ],
  },
  {
    slug: "chunking-strategies-guide",
    title: "The Complete Guide to Chunking Strategies",
    hook: "Fixed-size, semantic, recursive, agentic — which chunking strategy is right for your data?",
    tags: ["Chunking", "RAG", "Architecture"],
    readTime: "9 min",
    author: "NeuraArch",
    date: "Mar 10, 2026",
    content: [
      { type: "paragraph", text: "Chunking is the unsung hero of RAG performance. Get it wrong and no amount of prompt engineering will save you." },
      { type: "heading", text: "Strategy Overview", level: 2 },
      { type: "list", items: [
        "Fixed-size: Simple but destroys context boundaries",
        "Recursive: Better boundary detection, configurable separators",
        "Semantic: Groups by meaning, requires embedding calls",
        "Document-aware: Respects headings, tables, code blocks",
        "Agentic: LLM decides chunk boundaries based on content"
      ]},
    ],
  },
];

export const posts: Post[] = [
  {
    slug: "rag-is-not-a-product",
    headline: "RAG is Not a Product — It's an Architecture Decision",
    preview: "Stop treating RAG as a feature you bolt on. It's a fundamental architecture choice that affects every layer of your AI system.",
    tags: ["RAG", "Architecture"],
    author: "NeuraArch",
    date: "Apr 12, 2026",
    likes: 142,
    content: [
      { type: "paragraph", text: "I see teams treat RAG like a library they can pip install. 'Just add RAG' they say, as if retrieval-augmented generation is a checkbox feature." },
      { type: "callout", text: "RAG is an architecture pattern, not a product. It touches your data pipeline, your serving infrastructure, your evaluation framework, and your user experience.", variant: "info" },
      { type: "paragraph", text: "When you commit to RAG, you're committing to: maintaining an embedding pipeline, operating a vector store, building evaluation harnesses, handling retrieval failures gracefully, and designing UX for attributed answers." },
      { type: "paragraph", text: "Treat it with the respect it deserves." },
    ],
  },
  {
    slug: "embeddings-are-lossy",
    headline: "Embeddings Are Lossy Compression — Act Accordingly",
    preview: "Every time you embed text, you lose information. Understanding what's lost is the key to building reliable retrieval.",
    tags: ["Embeddings", "RAG"],
    author: "NeuraArch",
    date: "Apr 8, 2026",
    likes: 98,
    content: [
      { type: "paragraph", text: "A 1536-dimensional vector cannot perfectly represent a 2000-word document. Something is always lost in translation." },
      { type: "paragraph", text: "What's typically preserved: topic, sentiment, broad meaning. What's typically lost: specific numbers, negation, temporal relationships, logical structure." },
      { type: "callout", text: "This is why hybrid search (vector + keyword) consistently outperforms pure vector search. Keywords capture what embeddings miss.", variant: "tip" },
    ],
  },
  {
    slug: "agents-need-guardrails",
    headline: "Your AI Agent Needs Guardrails, Not Just Goals",
    preview: "Giving an agent a goal without constraints is like giving a teenager car keys without driving lessons.",
    tags: ["Agents", "Safety"],
    author: "NeuraArch",
    date: "Apr 3, 2026",
    likes: 215,
    content: [
      { type: "paragraph", text: "The agent loop is powerful: observe → think → act → repeat. But without proper guardrails, agents can spiral into infinite loops, make expensive API calls, or take irreversible actions." },
      { type: "list", items: [
        "Set maximum iteration limits",
        "Implement cost budgets per task",
        "Require human approval for destructive actions",
        "Log every decision for auditability",
        "Add circuit breakers for error cascades"
      ]},
      { type: "paragraph", text: "Freedom without structure isn't intelligence — it's chaos." },
    ],
  },
  {
    slug: "evaluation-is-the-product",
    headline: "In AI Systems, Evaluation IS the Product",
    preview: "You can't improve what you can't measure. And in AI, measurement is harder than building.",
    tags: ["Evaluation", "Architecture"],
    author: "NeuraArch",
    date: "Mar 30, 2026",
    likes: 176,
    content: [
      { type: "paragraph", text: "Most AI teams spend 90% of their time on building and 10% on evaluation. The best teams invert this ratio." },
      { type: "paragraph", text: "Your evaluation framework should answer: Is the retrieval finding the right documents? Is the generation faithful to the retrieved context? Is the final answer actually useful to the user?" },
      { type: "callout", text: "Build your eval suite before you build your pipeline. It will guide every architecture decision you make.", variant: "tip" },
    ],
  },
  {
    slug: "vector-db-is-not-enough",
    headline: "A Vector Database Alone Won't Save Your AI App",
    preview: "Vector search is necessary but not sufficient. Here's the full retrieval stack you actually need.",
    tags: ["Vector DB", "Architecture"],
    author: "NeuraArch",
    date: "Mar 25, 2026",
    likes: 124,
    content: [
      { type: "paragraph", text: "I talk to teams every week who think choosing the right vector DB will solve their retrieval problems. It won't." },
      { type: "paragraph", text: "A production retrieval stack includes: query understanding, hybrid search, reranking, metadata filtering, result deduplication, and context window optimization. The vector DB is just one piece." },
    ],
  },
];

export const mockComments: Comment[] = [
  {
    id: "1",
    author: "Alex Chen",
    text: "This perfectly captures why our RAG pipeline kept failing. The chunking strategy was the root cause all along.",
    timestamp: "2 hours ago",
    replies: [
      {
        id: "1-1",
        author: "NeuraArch",
        text: "Exactly — chunking is often the first thing to debug when retrieval quality drops.",
        timestamp: "1 hour ago",
      },
    ],
  },
  {
    id: "2",
    author: "Sarah Kim",
    text: "Would love to see a follow-up comparing different reranking approaches. Cross-encoders vs LLM-based reranking.",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    author: "Dev Patel",
    text: "Great breakdown. We switched to semantic chunking last month and saw a 30% improvement in retrieval recall.",
    timestamp: "1 day ago",
  },
];

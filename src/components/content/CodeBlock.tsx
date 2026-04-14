interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => (
  <div className="rounded-xl border border-border bg-muted/50 overflow-hidden">
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/80">
      <span className="text-xs text-muted-foreground font-mono">{language}</span>
    </div>
    <pre className="p-4 overflow-x-auto">
      <code className="text-sm font-mono text-foreground leading-relaxed">{code}</code>
    </pre>
  </div>
);

export default CodeBlock;

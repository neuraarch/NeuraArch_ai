interface AuthorInfoProps {
  author: string;
  date: string;
  readTime?: string;
}

const AuthorInfo = ({ author, date, readTime }: AuthorInfoProps) => (
  <div className="flex items-center gap-3 text-sm text-muted-foreground">
    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
      {author.charAt(0)}
    </div>
    <span className="font-medium text-foreground">{author}</span>
    <span>·</span>
    <span>{date}</span>
    {readTime && (
      <>
        <span>·</span>
        <span>{readTime} read</span>
      </>
    )}
  </div>
);

export default AuthorInfo;

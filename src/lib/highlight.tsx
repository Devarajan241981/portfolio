const TOKEN_RE =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\b)|(\b(?:return|if|else|while|for|class|def|int|new|const|let|var|static|public|private|try|catch|throw|typeof|instanceof|super|this|using|namespace|void|null|true|false|not|in)\b)|(\b(?:Node|Stack|Map|List|ArrayList|HashMap|String|Integer|iostream|std)\b)|(\b[A-Za-z_]\w*(?=\())/g;

const COLORS = {
  string: "#ce9178",
  number: "#b5cea8",
  keyword: "#c586c0",
  type: "#4ec9b0",
  fn: "#dcdcaa",
};

export function highlightCode(text: string) {
  const parts: { text: string; color?: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(text))) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index) });
    }
    const color = match[1]
      ? COLORS.string
      : match[2]
        ? COLORS.number
        : match[3]
          ? COLORS.keyword
          : match[4]
            ? COLORS.type
            : COLORS.fn;
    parts.push({ text: match[0], color });
    lastIndex = TOKEN_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex) });
  }

  return parts.map((part, i) =>
    part.color ? (
      <span key={i} style={{ color: part.color }}>
        {part.text}
      </span>
    ) : (
      part.text
    ),
  );
}

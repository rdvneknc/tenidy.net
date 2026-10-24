/**
 * Lightweight blog markup: # / ## / ### headings, paragraphs,
 * **bold**, *italic*, [links](url). Plain text posts still render fine.
 */

function renderInline(text, keyPrefix = 'i') {
  const nodes = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let m
  let i = 0

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(text.slice(last, m.index))
    }
    const token = m[0]
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>,
      )
    } else if (token.startsWith('*')) {
      nodes.push(
        <em key={`${keyPrefix}-e-${i}`} className="italic">
          {token.slice(1, -1)}
        </em>,
      )
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        nodes.push(
          <a
            key={`${keyPrefix}-a-${i}`}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lime underline decoration-lime/40 underline-offset-2 transition hover:decoration-lime"
          >
            {link[1]}
          </a>,
        )
      }
    }
    last = m.index + token.length
    i += 1
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes.length ? nodes : text
}

function parseBlocks(content) {
  const lines = String(content || '').replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let para = []

  const flushPara = () => {
    if (!para.length) return
    blocks.push({ type: 'p', text: para.join('\n') })
    para = []
  }

  for (const line of lines) {
    if (/^###\s+/.test(line)) {
      flushPara()
      blocks.push({ type: 'h3', text: line.replace(/^###\s+/, '') })
    } else if (/^##\s+/.test(line)) {
      flushPara()
      blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '') })
    } else if (/^#\s+/.test(line)) {
      flushPara()
      blocks.push({ type: 'h2', text: line.replace(/^#\s+/, '') })
    } else if (line.trim() === '') {
      flushPara()
    } else {
      para.push(line)
    }
  }
  flushPara()
  return blocks
}

export function BlogContent({ content }) {
  const blocks = parseBlocks(content)

  if (!blocks.length) return null

  return (
    <div className="blog-content max-w-3xl space-y-5 text-base leading-relaxed text-white/75">
      {blocks.map((block, index) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={`b-${index}`}
              className="mt-10 scroll-mt-24 text-2xl font-bold tracking-tight text-white first:mt-0 md:text-3xl"
            >
              {renderInline(block.text, `h2-${index}`)}
            </h2>
          )
        }
        if (block.type === 'h3') {
          return (
            <h3
              key={`b-${index}`}
              className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-white first:mt-0 md:text-2xl"
            >
              {renderInline(block.text, `h3-${index}`)}
            </h3>
          )
        }
        return (
          <p key={`b-${index}`} className="whitespace-pre-wrap">
            {renderInline(block.text, `p-${index}`)}
          </p>
        )
      })}
    </div>
  )
}

import React from 'react';

type PageTemplateProps = { children: React.ReactNode };

export function PageTemplate({ children }: PageTemplateProps) {
  return (
    <div
      className="h-full relative flex flex-col"
      style={{
        background: '#f0eef8',
        borderRadius: '5px 0 0 0',
        boxShadow: '-3px 0 10px rgba(0,0,0,.5), 5px 0 14px rgba(0,0,0,.18)',
        overflow: 'hidden',
      }}
    >
      <div className="absolute top-0 right-0 bottom-0 pointer-events-none z-10"
        style={{ width: 28, background: 'linear-gradient(270deg,rgba(0,0,0,.13),transparent)' }} />
      {/* Content area — strict overflow hidden, no scroll */}
      <div style={{
        padding: '24px 26px 16px',
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── Layout primitives ───────────────────────────────── */

export function ChapterHeader({ num, title, sub }: { num: string; title: string; sub?: string }) {
  return (
    <div style={{ borderBottom: '2px solid #3a3f58', paddingBottom: 8, marginBottom: 10, flexShrink: 0 }}>
      <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 8, color: '#676e95', letterSpacing: '.35em', textTransform: 'uppercase', marginBottom: 3 }}>{num}</div>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(.85rem,1.4vw,1.15rem)', fontWeight: 900, color: '#1c1f2b', lineHeight: 1.2 }}>{title}</div>
      {sub && <div style={{ fontSize: 9, color: '#676e95', marginTop: 2, fontStyle: 'italic' }}>{sub}</div>}
    </div>
  );
}

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 8, fontWeight: 700, color: '#c792ea', margin: '8px 0 4px', paddingBottom: 2, borderBottom: '1px solid #3a3f58', textTransform: 'uppercase', letterSpacing: '.12em', flexShrink: 0 }}>
      {children}
    </div>
  );
}

export function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '2.5px 0', borderBottom: '1px solid #dbd6ee', gap: 6, flexShrink: 0 }}>
      <span style={{ fontFamily: 'JetBrains Mono,monospace', color: '#1e3a8a', fontSize: 8.5, flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#4b5563', textAlign: 'right', fontSize: 8.5 }}>{value}</span>
    </div>
  );
}

export function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 8.5, margin: '3px 0 6px', flexShrink: 0 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ background: '#1c1f2b', color: '#c792ea', padding: '3px 5px', fontFamily: 'JetBrains Mono,monospace', fontSize: 7.5, textTransform: 'uppercase', letterSpacing: '.1em', border: '1px solid #3a3f58' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 0 ? 'rgba(0,0,0,.03)' : 'transparent' }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{
                padding: '3px 5px',
                border: '1px solid #dbd6ee',
                color: ci === 0 ? '#1e3a8a' : '#374151',
                fontFamily: ci === 0 ? 'JetBrains Mono,monospace' : undefined,
                fontSize: ci === 0 ? 8 : 8.5,
                verticalAlign: 'top',
                lineHeight: 1.4,
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}



type Span = { text: string; cls?: string };

const COLORS: Record<string, string> = {
  kw:  '#c792ea',
  fn:  '#82aaff',
  str: '#c3e88d',
  cm:  '#676e95',
  cls: '#ffcb6b',
  dec: '#f78c6c',
  nm:  '#f78c6c',
  tag: '#f07178',
  at:  '#ffcb6b',
  vl:  '#c3e88d',
};

function spansToHtml(spans: Span[]): string {
  return spans.map(sp => {
    const escaped = sp.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    if (sp.cls && COLORS[sp.cls]) {
      return `<span style="color:${COLORS[sp.cls]};${sp.cls === 'cm' ? 'font-style:italic' : ''}">${escaped}</span>`;
    }
    return escaped;
  }).join('');
}

// Texto explicativo. párrafo de contexto sobre un tema
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 9, color: '#374151', lineHeight: 1.6, margin: '3px 0 7px', fontStyle: 'italic', borderLeft: '2px solid #c792ea', paddingLeft: 7 }}>
      {children}
    </p>
  );
}

// Advertencias o datos interesantes
export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 9, color: '#374151', lineHeight: 1.6, margin: '3px 0 7px', borderLeft: '2px solid #ffcb6b', paddingLeft: 7, background: 'rgba(255,203,107,.06)', borderRadius: '0 3px 3px 0', padding: '4px 4px 4px 7px' }}>
      {children}
    </p>
  );
}

export function Code({ spans }: { spans: Span[] }) {
  return (
    <pre
      style={{
        background: '#13151f',
        border: '1px solid #3a3f58',
        borderLeft: '3px solid #82aaff',
        borderRadius: 4,
        padding: '7px 9px',
        fontFamily: 'JetBrains Mono,monospace',
        fontSize: 8.5,
        lineHeight: 1.65,
        overflow: 'hidden',
        margin: '3px 0 7px',
        color: '#a6accd',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        flexShrink: 0,
      }}
      dangerouslySetInnerHTML={{ __html: spansToHtml(spans) }}
    />
  );
}

/* ── Builder helpers ─────────────────────────────────────
   p  — plain       kw — keyword (purple)   fn — function (blue)
   s  — string      cm — comment (italic)   cl — class (yellow)
   dc — decorator   nm — number (orange)    tg — html tag (red)
   at — attribute   vl — value (green)
──────────────────────────────────────────────────────── */
export const p  = (text: string): Span => ({ text });
export const kw = (text: string): Span => ({ text, cls: 'kw' });
export const fn = (text: string): Span => ({ text, cls: 'fn' });
export const s  = (text: string): Span => ({ text, cls: 'str' });
export const cm = (text: string): Span => ({ text, cls: 'cm' });
export const cl = (text: string): Span => ({ text, cls: 'cls' });
export const dc = (text: string): Span => ({ text, cls: 'dec' });
export const nm = (text: string): Span => ({ text, cls: 'nm' });
export const tg = (text: string): Span => ({ text, cls: 'tag' });
export const at = (text: string): Span => ({ text, cls: 'at' });
export const vl = (text: string): Span => ({ text, cls: 'vl' });
export const c  = (...spans: Span[]): Span[] => spans;

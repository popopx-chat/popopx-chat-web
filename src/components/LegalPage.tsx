import type { ReactElement } from "react";
import type { LegalBlock, LegalDoc, LocalText } from "@/content/legal";

/**
 * Renderer for the two legal documents. A Server Component: the policy text is
 * complete in the exported HTML like the rest of the portal, and nothing here
 * needs state or an effect.
 *
 * Every English/Chinese pair sits in a `dir="ltr"` column. The surrounding
 * chrome (navbar, footer) still switches to Arabic RTL, but a legal paragraph
 * must not: its two columns are one English text and one Chinese translation,
 * and running bidi over them would reorder punctuation and host names.
 */

function Pairs({ text, className }: { text: LocalText; className?: string }): ReactElement {
  return (
    <div className={className ?? "grid gap-3 lg:grid-cols-2 lg:gap-10"}>
      <p lang="en" dir="ltr">{text.english}</p>
      <p lang="zh-Hans" dir="ltr" className="text-mute">
        {text.chinese}
      </p>
    </div>
  );
}

function Block({ block }: { block: LegalBlock }): ReactElement {
  if (block.kind === "p") {
    return <Pairs text={block.text} />;
  }

  if (block.kind === "ul") {
    return (
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-10">
        <ul lang="en" dir="ltr" className="list-disc space-y-2 ps-5 marker:text-brand-soft">
          {block.english.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul lang="zh-Hans" dir="ltr" className="list-disc space-y-2 ps-5 text-mute marker:text-brand-soft">
          {block.chinese.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {block.items.map((item) => (
        <div key={item.term.english} className="glass-inset p-4">
          <p lang="en" dir="ltr" className="text-[13.5px] font-semibold text-white">
            {item.term.english}
            <span lang="zh-Hans" dir="ltr" className="ms-2 font-normal text-faint">
              {item.term.chinese}
            </span>
          </p>
          <Pairs text={item.detail} className="mt-2 grid gap-2 lg:grid-cols-2 lg:gap-8" />
        </div>
      ))}
    </div>
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }): ReactElement {
  return (
    <article dir="ltr" className="section-wrap pb-20 pt-24 sm:pt-28">
      <header>
        <p className="eyebrow">{doc.eyebrow}</p>
        <h1 className="mt-3 break-words text-3xl font-semibold tracking-tight text-white sm:text-[38px] sm:leading-[1.15]">
          {doc.title.english}
        </h1>
        <p lang="zh-Hans" className="mt-2 text-xl font-medium text-mute">
          {doc.title.chinese}
        </p>
        <div className="mt-5 text-[14.5px] leading-relaxed text-mute">
          <Pairs text={doc.lead} />
        </div>
        <dl className="glass mt-8 grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
          {doc.meta.map((row) => (
            <div key={row.label.english}>
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-faint">
                <span lang="en" dir="ltr">{row.label.english}</span>
                <span aria-hidden className="mx-1.5">/</span>
                <span lang="zh-Hans" dir="ltr">{row.label.chinese}</span>
              </dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-mute">
                {row.href ? (
                  <a
                    href={row.href}
                    {...(row.href.startsWith("https://")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="break-words rounded text-brand-soft underline decoration-hair-strong decoration-1 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft/70"
                  >
                    {row.value.english}
                  </a>
                ) : (
                  <span lang="en" dir="ltr">{row.value.english}</span>
                )}
                {row.value.chinese !== row.value.english ? (
                  <span lang="zh-Hans" dir="ltr" className="mt-1 block text-[12.5px] text-faint">
                    {row.value.chinese}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[12px] leading-relaxed text-faint">
          <span lang="en" dir="ltr">{doc.languageNote.english}</span>
          <span lang="zh-Hans" dir="ltr" className="ms-2">
            {doc.languageNote.chinese}
          </span>
        </p>
      </header>

      <nav aria-label="Contents / 目录" className="glass mt-10 p-5 sm:p-6">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-faint">
          <span>Contents</span>
          <span aria-hidden className="mx-1.5">/</span>
          <span lang="zh-Hans">目录</span>
        </p>
        <ol className="mt-3 grid gap-x-8 gap-y-1.5 text-[12.5px] sm:grid-cols-2">
          {doc.sections.map((section) => (
            <li key={section.id} className="flex gap-2">
              <span className="font-mono text-[11px] leading-relaxed text-brand-soft">{section.number}</span>
              <a
                href={`#${section.id}`}
                className="rounded leading-relaxed text-mute transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft/70"
              >
                {section.title.english}
                <span lang="zh-Hans" className="ms-1.5 text-faint">{section.title.chinese}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-6">
        {doc.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="glass p-6 sm:p-8"
          >
            <h2
              id={`${section.id}-title`}
              className="flex flex-wrap items-baseline gap-x-3 break-words text-xl font-semibold tracking-tight text-white sm:text-2xl"
            >
              <span className="font-mono text-[13px] text-brand-soft">§{section.number}</span>
              <span>{section.title.english}</span>
              <span lang="zh-Hans" className="text-[15px] font-medium text-mute">{section.title.chinese}</span>
            </h2>
            <div className="mt-5 space-y-5 [overflow-wrap:anywhere] text-[13.5px] leading-relaxed">
              {section.blocks.map((block, index) => (
                <Block key={`${section.id}-${index}`} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
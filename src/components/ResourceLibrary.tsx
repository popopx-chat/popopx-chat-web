"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { ROUTE_LABELS } from "@/components/Navbar";
import { H_LEGAL, H_PRIVACY, LEGAL_NOTES, PROMISES } from "@/components/Footer";
import { LtrText } from "@/components/Ltr";
import { SectionHeading } from "@/components/ui";
import {
  AGENT_PROTOCOL_URL,
  AGPL_COMPLIANCE_DOC_URL,
  ASSETS_LICENSE_URL,
  CHANGELOG_DOC_URL,
  FORK_DOC_URL,
  IOS_REPO_URL,
  LICENSE_URL,
  CRYPTO_REGISTRY_URL,
  MQ_REPO_URL,
  PRIVACY_DOC_URL,
  SMP_PROTOCOL_URL,
  TRADEMARK_URL,
} from "@/lib/site";

/**
 * ResourceLibrary — `/resources/`: the documents that already exist, linked to
 * the file rather than to a summary of it.
 *
 * There is no whitepaper: the word appears in none of the sibling repositories
 * (searched 2026-11-25), so this page lists the files that are actually published
 * and lets each one speak. Every href below was resolved against the GitHub
 * contents API on 2026-11-25 — `popopx-chat` root, `apps/ios/spec/`, and
 * `popopxmq/protocol/` — and the recipe is in `docs/FACTS.md` §15 and §20.
 *
 * Link text is a file name, so it is deliberately locale-free, like every other
 * protocol token on the portal; the prose around it is the 21-language copy that
 * the footer already carries (`H_PRIVACY`, `H_LEGAL`, `PROMISES`, `LEGAL_NOTES`),
 * imported rather than translated twice.
 */

const TITLE: Localized<string> = {
  en: "The documents, licences and protocol files that exist today",
  "pt-BR": "Os documentos, licenças e arquivos de protocolo que existem hoje",
  ko: "현재 존재하는 문서, 라이선스, 프로토콜 파일",
  ar: "المستندات والتراخيص وملفات البروتوكول الموجودة اليوم",
  ru: "Документы, лицензии и файлы протокола, которые есть уже сегодня",
  de: "Die Dokumente, Lizenzen und Protokolldateien, die es heute schon gibt",
  fr: "Les documents, licences et fichiers de protocole qui existent aujourd'hui",
  it: "I documenti, le licenze e i file di protocollo che esistono già oggi",
  nl: "De documenten, licenties en protocolbestanden die er vandaag zijn",
  cs: "Dokumenty, licence a soubory protokolu, které dnes existují",
  "zh-Hans": "今天确实存在的文档、许可与协议文件",
  "zh-Hant": "今天確實存在的文件、授權與協議檔案",
  es: "Los documentos, licencias y archivos de protocolo que existen hoy",
  pl: "Dokumenty, licencje i pliki protokołu, które istnieją już dziś",
  ja: "今日実際に存在するドキュメント、ライセンス、プロトコルファイル",
  th: "เอกสาร สัญญาอนุญาต และไฟล์โปรโตคอลที่มีอยู่จริงในวันนี้",
  fi: "Dokumentit, lisenssit ja protokolatiedostot, jotka ovat olemassa tänään",
  uk: "Документи, ліцензії та файли протоколу, які існують уже сьогодні",
  bg: "Документите, лицензите и протоколните файлове, които съществуват днес",
  tr: "Bugün gerçekten var olan belgeler, lisanslar ve protokol dosyaları",
  hu: "A ma létező dokumentumok, licencek és protokolfájlok",
};

const LEAD: Localized<string> = {
  en: "Each row opens a file in its own repository — nothing is summarised here and nothing is announced. The page links only paths that were checked to exist on 2026-11-25.",
  "pt-BR": "Cada linha abre um arquivo no próprio repositório — nada é resumido aqui e nada é anunciado. A página linka apenas caminhos cuja existência foi verificada em 2026-11-25.",
  ko: "각 행은 해당 저장소의 파일을 엽니다 — 여기서 요약하는 것도, 예고하는 것도 없습니다. 이 페이지는 2026-11-25에 존재를 확인한 경로만 연결합니다.",
  ar: "كل صف يفتح ملفًا في مستودعه — لا شيء مختصر هنا ولا شيء معلن. والصفحة ترتبط فقط بمسارات تحقّقنا من وجودها في 2026-11-25.",
  ru: "Каждая строка открывает файл в его собственном репозитории — здесь нет ни пересказа, ни анонсов. Ссылаемся только на пути, проверенные 2026-11-25.",
  de: "Jede Zeile öffnet eine Datei in ihrem eigenen Repository — hier wird nichts zusammengefasst und nichts angekündigt. Verlinkt sind nur Pfade, die am 2026-11-25 geprüft wurden.",
  fr: "Chaque ligne ouvre un fichier dans son dépôt — rien n'est résumé ni annoncé ici. Seuls les chemins vérifiés le 2026-11-25 sont liés.",
  it: "Ogni riga apre un file nel proprio repository — qui nulla è riassunto e nulla è annunciato. I collegamenti portano solo a percorsi verificati il 2026-11-25.",
  nl: "Elke rij opent een bestand in zijn eigen repository — hier wordt niets samengevat of aangekondigd. Alleen paden die op 2026-11-25 zijn gecontroleerd, zijn gelinkt.",
  cs: "Každý řádek otevírá soubor v jeho vlastním repozitáři — nic zde není shrnuto ani oznámeno. Odkazují se jen cesty ověřené 2026-11-25.",
  "zh-Hans": "每一行都在自己的仓库里打开一个文件——这里不做摘要，也不预告。只链接 2026-11-25 实测存在的路径。",
  "zh-Hant": "每一列都在自己的倉庫裡開啟一個檔案——這裡不做摘要，也不預告。只連結 2026-11-25 實測存在的路徑。",
  es: "Cada fila abre un archivo en su propio repositorio — aquí no se resume nada ni se anuncia nada. Solo se enlazan rutas comprobadas el 2026-11-25.",
  pl: "Każdy wiersz otwiera plik w jego własnym repozytorium — nic tu nie jest streszczane ani zapowiadane. Linkowane są tylko ścieżki sprawdzone 2026-11-25.",
  ja: "各行はそれぞれのリポジトリ内のファイルを開きます——要約も予告もありません。リンクするのは 2026-11-25 に実在を確認したパスだけです。",
  th: "แต่ละแถวเปิดไฟล์ในรีโปของไฟล์นั้น — ไม่มีการสรุปหรือการประกาศที่นี่ ลิงก์เฉพาะพาธที่ตรวจแล้วเมื่อ 2026-11-25",
  fi: "Jokainen rivi avaa tiedoston omassa tietovarastossaan — tässä ei tiivistetä eikä ilmoiteta mitään. Linkitetyt polut varmistettiin 2026-11-25.",
  uk: "Кожен рядок відкриває файл у власному репозиторії — тут нічого не переказують і не анонсують. Посилання лише на шляхи, перевірені 2026-11-25.",
  bg: "Всеки ред отваря файл в собственото му хранилище — тук нищо не се резюмира и не се обявява. Свързват се само пътища, проверени на 2026-11-25.",
  tr: "Her satır kendi dehosunda bir dosyayı açar — burada özet de duyuru da yok. Yalnızca 2026-11-25'te varlığı doğrulanan yollar bağlanıyor.",
  hu: "Minden sor a saját tárolójában nyit meg egy fájlt — itt nincs összefoglaló és nincs ígéret. Csak a 2026-11-25-ön ellenőrzött útvonalakra mutat link.",
};

type Doc = { readonly href: string; readonly name: string; readonly note?: string };
type Group = { readonly path: string; readonly docs: readonly Doc[] };

/** Locale-free: repository paths, each one measured on 2026-11-25. */
const GROUPS: readonly Group[] = [
  {
    path: "github.com/popopx-chat/popopx-chat",
    docs: [
      { href: `${IOS_REPO_URL}/blob/master/README.md`, name: "README.md" },
      { href: FORK_DOC_URL, name: "FORK.md" },
      { href: CHANGELOG_DOC_URL, name: "CHANGELOG.md" },
      { href: PRIVACY_DOC_URL, name: "PRIVACY-POPOPX.md" },
      { href: AGPL_COMPLIANCE_DOC_URL, name: "AGPL-COMPLIANCE.md" },
      { href: LICENSE_URL, name: "LICENSE" },
      { href: TRADEMARK_URL, name: "TRADEMARK-POPOPX.md" },
      { href: ASSETS_LICENSE_URL, name: "ASSETS_LICENSE.md" },
      { href: `${IOS_REPO_URL}/blob/master/NOTICE`, name: "NOTICE" },
    ],
  },
  {
    path: "github.com/popopx-chat/popopx-chat · apps/ios/spec/",
    docs: [
      { href: `${IOS_REPO_URL}/blob/master/apps/ios/spec/architecture.md`, name: "architecture.md" },
      { href: `${IOS_REPO_URL}/blob/master/apps/ios/spec/api.md`, name: "api.md" },
      { href: `${IOS_REPO_URL}/blob/master/apps/ios/spec/database.md`, name: "database.md" },
      { href: `${IOS_REPO_URL}/blob/master/apps/ios/spec/state.md`, name: "state.md" },
      { href: `${IOS_REPO_URL}/blob/master/apps/ios/spec/impact.md`, name: "impact.md" },
    ],
  },
  {
    path: "github.com/popopx-chat/popopxmq · protocol/",
    docs: [
      { href: SMP_PROTOCOL_URL, name: "popopx-messaging.md" },
      { href: CRYPTO_REGISTRY_URL, name: "crypto-registry.md" },
      { href: `${MQ_REPO_URL}/blob/master/protocol/security.md`, name: "security.md" },
      { href: `${MQ_REPO_URL}/blob/master/protocol/pqdr.md`, name: "pqdr.md" },
      { href: `${MQ_REPO_URL}/blob/master/protocol/xftp.md`, name: "xftp.md" },
      { href: `${MQ_REPO_URL}/blob/master/protocol/xrcp.md`, name: "xrcp.md" },
      { href: AGENT_PROTOCOL_URL, name: "agent-protocol.md" },
      { href: `${MQ_REPO_URL}/blob/master/protocol/push-notifications.md`, name: "push-notifications.md" },
      { href: `${MQ_REPO_URL}/blob/master/protocol/overview-tjr.md`, name: "overview-tjr.md" },
    ],
  },
];

const LINK_CLASS =
  "inline-block rounded font-mono text-[12.5px] text-brand-soft underline decoration-hair decoration-1 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-hair-strong";

const PANEL =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export function ResourceLibrary(): ReactElement {
  const legal = useCopy(H_LEGAL);
  const privacy = useCopy(H_PRIVACY);

  return (
    <section id="resources" className="relative py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading
          eyebrow={ROUTE_LABELS.resources}
          title={TITLE}
          subtitle={LEAD}
          titleAs="h1"
        />

        <div className="mt-9 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-3">
          {GROUPS.map((group) => (
            <article key={group.path} className={`glass p-5 sm:p-6 ${PANEL}`}>
              <p dir="ltr" className="break-all text-start font-mono text-[11px] text-faint">
                {group.path}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {group.docs.map((doc) => (
                  <li key={doc.name}>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className={`${LINK_CLASS} text-start`}
                    >
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Licence wording and the zero-tracking promises are the footer's own,
            in all 21 languages, shown here at full length. */}
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-2">
          <article className="glass p-5 sm:p-6">
            <h2 className="text-[15px] font-semibold text-white">{legal}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {LEGAL_NOTES.map((note, i) => (
                <Bullet key={i} text={note} />
              ))}
            </ul>
          </article>
          <article className="glass p-5 sm:p-6">
            <h2 className="text-[15px] font-semibold text-white">{privacy}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {PROMISES.map((promise, i) => (
                <Bullet key={i} text={promise} />
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

/** One 21-language sentence, allowed to wrap inside a narrow column. */
function Bullet({ text }: { text: Localized<string> }): ReactElement {
  const value = useCopy(text);
  return (
    <li className="text-[12.5px] leading-relaxed text-mute">
      <span className="min-w-0 break-words">
        <LtrText text={value} />
      </span>
    </li>
  );
}

"use client";

import { useEffect, useState, type ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { COPY_FEEDBACK, useCopied } from "./ui";
import { LanguageMenu } from "./LanguageMenu";
import { SITE_ORIGIN } from "@/lib/site";

/**
 * The invitation card served at `/i/v1/` — the page a browser shows when nobody
 * has POPOPX Chat installed to take the link.
 *
 * Why it exists: an invitation is published as `https://popopx.chat/i/v1/<code>`
 * (`PopopxOpaqueInviteCodec.linkPrefix`, iOS, and `LINK_PREFIX` in the Kotlin
 * codec), so this host is the address a stranger taps. With no app installed the
 * tap used to land on `404.html`. The document is a door, not a service:
 *
 *  - The code is read from `window.location.pathname` in an effect, and only
 *    ever goes into a clipboard write or a `popopx:` scheme navigation. There is
 *    no `fetch`, no `XMLHttpRequest`, no image request, no form: the sealed code
 *    never leaves the device, which is also the only reason the address can be
 *    trusted as a bearer token at all.
 *  - `[^/?#]{1,512}` is what makes the copy string same-origin. A pathname can
 *    not contain `/`, so `SITE_ORIGIN + "/i/v1/" + code` can never be coerced
 *    into another host, and the scheme URI can never be given a second path
 *    segment. The value is deliberately *not* `decodeURIComponent`-ed: a decoded
 *    `%2F` would put a slash back into it.
 *  - The button is an `<a href>` only while a code exists, so the prerendered
 *    HTML — and the first client render, which must match it — carries no
 *    half-built target.
 *  - `measured` separates "still resolving" from "this URL has no code": without
 *    it every page view would flash the empty-state text for one frame.
 *  - The launch URI is `popopx:/i/v1/<code>`, the prefix both codecs accept when
 *    opening a link. `popopxchat:` is registered in `Info.plist` but the iOS
 *    router answers it with "Update the app to open this link", so it is not
 *    used here (ledger §21).
 *
 * Server-side, Nginx maps every `/i/v1/<anything>` onto this document and
 * switches its own access log off for the whole prefix, so the code is absent
 * from the request log too.
 */

/** One path segment after `/i/v1/`, up to a length no real sealed code reaches. */
const CODE_IN_PATHNAME = /^\/i\/v1\/([^/?#]{1,512})\/?$/;

const EYEBROW: Localized<string> = {
  en: "Encrypted invitation",
  ru: "Зашифрованное приглашение",
  de: "Verschlüsselte Einladung",
  fr: "Invitation chiffrée",
  it: "Invito cifrato",
  nl: "Versleutelde uitnodiging",
  cs: "Šifrovaná pozvánka",
  "zh-Hans": "加密邀请",
  "zh-Hant": "加密邀請",
  es: "Invitación cifrada",
  pl: "Zaszyfrowane zaproszenie",
  ja: "暗号化された招待",
  th: "คำเชิญที่เข้ารหัส",
  fi: "Salattu kutsu",
  uk: "Зашифроване запрошення",
  bg: "Криптирано покана",
  tr: "Şifreli davet",
  hu: "Titkosított meghívó",
};

const HEADING: Localized<string> = {
  en: "You have been invited to POPOPX Chat",
  ru: "Вас пригласили в POPOPX Chat",
  de: "Sie wurden in POPOPX Chat eingeladen",
  fr: "Vous êtes invité dans POPOPX Chat",
  it: "Sei stato invitato in POPOPX Chat",
  nl: "U bent uitgenodigd voor POPOPX Chat",
  cs: "Byli jste zváni do POPOPX Chat",
  "zh-Hans": "你收到一个 POPOPX Chat 邀请",
  "zh-Hant": "你收到一個 POPOPX Chat 邀請",
  es: "Te han invitado a POPOPX Chat",
  pl: "Zaproszono Cię do POPOPX Chat",
  ja: "POPOPX Chat へのご招待",
  th: "คุณได้รับคำเชิญเข้า POPOPX Chat",
  fi: "Sinut on kutsuttu POPOPX Chat",
  uk: "Вас запрошено до POPOPX Chat",
  bg: "Поканени сте в POPOPX Chat",
  tr: "POPOPX Chat uygulamasına davet edildiniz",
  hu: "Meghívták Önt a POPOPX Chat alkalmazásba",
};

const LEAD: Localized<string> = {
  en: "The invitation is sealed inside this link. The page loads nothing from elsewhere, sends the code to nobody, and this address is not written to any server log.",
  ru: "Код приглашения запечатан внутри самой ссылки. Страница ничего не загружает со стороны, никуда его не отправляет, и сервер не ведёт журнал обращений.",
  de: "Der Einladungscode steckt in diesem Link selbst. Die Seite lädt nichts von anderswo, sendet den Code nirgendwohin, und der Server schreibt kein Protokoll der aufgerufenen Adresse.",
  fr: "Le code de l’invitation est scellé dans ce lien. La page ne charge rien d’ailleurs, n’envoie le code nulle part, et le serveur n’enregistre aucune trace de l’adresse ouverte.",
  it: "Il codice dell’invito è sigillato dentro questo link. La pagina non carica nulla da altrove, non invia il codice a nessuno e il server non conserva alcun log dell’indirizzo aperto.",
  nl: "De uitnodigingscode zit verzegeld in deze link. De pagina laadt niets van elders, stuurt de code nergens heen en de server schrijft geen log van het adres dat je opent.",
  cs: "Kód pozvánky je zapečetěný přímo v tomto odkazu. Stránka nic zvenčí nenačítá, kód nikam neposílá a server nevede záznam o otevřené adrese.",
  "zh-Hans": "邀请码就密封在这条链接里。本页不加载任何外部内容，不会把邀请码发给任何后端，服务器也不记录你打开的地址。",
  "zh-Hant": "邀請碼就密封在這條連結裡。本頁不載入任何外部內容，不會把邀請碼傳給任何後端，伺服器也不記錄您開啟的位址。",
  es: "El código de la invitación va sellado dentro de este enlace. La página no carga nada de otro origen, no envía el código a ningún sitio y el servidor no registra la dirección que abres.",
  pl: "Kod zaproszenia jest zapieczętowany w samym odnośniku. Strona niczego nie pobiera z zewnątrz, nie wysyła kodu i serwer nie zapisuje logu otwartego adresu.",
  ja: "招待のコードはこのリンク自体に封入されています。このページは他所から読み込まず、コードを送りもせず、サーバーはアクセスの記録を残しません。",
  th: "รหัสคำเชิญถูกผนึกอยู่ในลิงก์นี้เอง หน้านี้ไม่โหลดสิ่งจากที่อื่น ไม่ส่งรหัสไปที่ใด และเซิร์ฟเวอร์ไม่บันทึกที่อยู่ที่คุณเปิด",
  fi: "Kutsukoodi on sinetöity tähän linkkiin. Sivu ei lataa mitään muualta, ei lähetä koodi minnekään, eikä palvelin tallenna avaamaasi osoitetta.",
  uk: "Код запрошення запечатаний у самому посиланні. Сторінка нічого не завантажує ззовні, нікуди його не надсилає, а сервер не веде журналу звернень.",
  bg: "Кодът на поканата е запечатан в самата връзка. Страницата не зарежда нищо отвън, не изпраща кода никъде и сървърът не води дневник на обращенията.",
  tr: "Davet kodu bu bağlantının içinde mühürlü. Sayfa başka hiçbir yerden bir şey yüklemez, kodu hiçbir yere göndermez ve sunucu açtığınız adresin günlüğünü tutmaz.",
  hu: "A meghívó kódja magában a hivatkozásban van lepecsételve. Az oldal semmit nem tölt be máshonnan, nem küldi sehová a kódot, és a szerver nem naplózza a megnytott címet.",
};

const OPEN_LABEL: Localized<string> = {
  en: "Open in POPOPX Chat",
  ru: "Открыть в POPOPX Chat",
  de: "In POPOPX Chat öffnen",
  fr: "Ouvrir dans POPOPX Chat",
  it: "Apri in POPOPX Chat",
  nl: "Openen in POPOPX Chat",
  cs: "Otevřít v POPOPX Chat",
  "zh-Hans": "在 POPOPX Chat 中打开",
  "zh-Hant": "在 POPOPX Chat 中開啟",
  es: "Abrir en POPOPX Chat",
  pl: "Otwórz w POPOPX Chat",
  ja: "POPOPX Chat で開く",
  th: "เปิดใน POPOPX Chat",
  fi: "Avaa POPOPX Chat",
  uk: "Відкрити в POPOPX Chat",
  bg: "Отвори в POPOPX Chat",
  tr: "POPOPX Chat’ta aç",
  hu: "Megnyitás a POPOPX Chat",
};

const COPY_INVITE: Localized<string> = {
  en: "Copy the invitation link",
  ru: "Скопировать ссылку",
  de: "Einladungslink kopieren",
  fr: "Copier le lien d’invitation",
  it: "Copia il link d’invito",
  nl: "Uitnodigingslink kopiëren",
  cs: "Kopírovat odkaz",
  "zh-Hans": "复制邀请链接",
  "zh-Hant": "複製邀請連結",
  es: "Copiar el enlace",
  pl: "Kopiuj odnośnik",
  ja: "招待リンクをコピー",
  th: "คัดลอกลิงก์คำเชิญ",
  fi: "Kopioi kutsulinkki",
  uk: "Скопіювати посилання",
  bg: "Копирай връзката",
  tr: "Davet bağlantısını kopyala",
  hu: "Hivatkozás másolása",
};

const HINT_AFTER_TAP: Localized<string> = {
  en: "If nothing opened, copy the link and paste it into POPOPX Chat.",
  ru: "Если ничего не открылось, скопируйте ссылку и вставьте её в POPOPX Chat.",
  de: "Wenn sich nichts geöffnet hat, kopieren Sie den Link und fügen Sie ihn in POPOPX Chat ein.",
  fr: "Si rien ne s’ouvre, copiez le lien et collez-le dans POPOPX Chat.",
  it: "Se non si apre nulla, copia il link e incollalo in POPOPX Chat.",
  nl: "Opent er niets? Kopieer de link en plak die in POPOPX Chat.",
  cs: "Pokud se nic neotevřelo, zkopírujte odkaz a vložte ho do POPOPX Chat.",
  "zh-Hans": "没有反应？复制链接，再粘贴到 POPOPX Chat 里。",
  "zh-Hant": "沒有反應？複製連結，再貼上到 POPOPX Chat 裡。",
  es: "Si no se abre nada, copia el enlace y pégalo en POPOPX Chat.",
  pl: "Jeśli nic się nie otworzyło, skopiuj odnośnik i wklej go do POPOPX Chat.",
  ja: "開かない場合は、リンクをコピーして POPOPX Chat に貼り付けてください。",
  th: "ถ้าไม่มีอะไรเปิดขึ้น ให้คัดลอกลิงก์แล้วนำไปวางใน POPOPX Chat",
  fi: "Jos mikään ei aukea, kopioi linkki ja liitä se POPOPX Chatissä.",
  uk: "Якщо нічого не відкрилося, скопіюйте посилання й вставте його в POPOPX Chat.",
  bg: "Ако нищо не се отвори, копирайте връзката и я поставете в POPOPX Chat.",
  tr: "Hiçbir şey açılmadıysa bağlantıyı kopyalayıp POPOPX Chat içinde yapıştırın.",
  hu: "Ha semmi nem nyílt meg, másolja a hivatkozást és illessze be a POPOPX Chat alkalmazásba.",
};

const NO_CODE: Localized<string> = {
  en: "This address carries no invitation code. Open POPOPX Chat and paste the full invitation link there.",
  ru: "В этой ссылке нет кода приглашения. Скопируйте полную ссылку и откройте её в приложении.",
  de: "Dieser Link enthält keinen Einladungscode. Kopieren Sie den vollständigen Einladungslink und öffnen Sie ihn in der App.",
  fr: "Ce lien ne contient aucun code d’invitation. Copiez le lien complet et ouvrez-le dans l’application.",
  it: "Questo link non contiene alcun codice d’invito. Copia il link completo e aprilo nell’app.",
  nl: "Deze link bevat geen uitnodigingscode. Kopieer de volledige uitnodigingslink en open die in de app.",
  cs: "Tento odkaz neobsahuje kód pozvánky. Zkopírujte celý odkaz a otevřete ho v aplikaci.",
  "zh-Hans": "这条地址里没有邀请码。请复制完整的邀请链接，再粘贴到 POPOPX Chat 里。",
  "zh-Hant": "這條位址裡沒有邀請碼。請複製完整的邀請連結，再貼上到 POPOPX Chat 裡。",
  es: "Esta dirección no contiene ningún código de invitación. Copia el enlace completo y pégalo en POPOPX Chat.",
  pl: "Ten adres nie zawiera kodu zaproszenia. Skopiuj pełny odnośnik i wklej go do aplikacji.",
  ja: "このアドレスには招待コードが含まれていません。招待リンクをコピーしてアプリに貼り付けてください。",
  th: "ที่อยู่นี้ไม่มีรหัสคำเชิญ ให้คัดลอกลิงก์เชิญแบบเต็มแล้วนำไปวางในแอป",
  fi: "Tässä osoitteessa ei ole kutsukoodia. Kopioi koko kutsulinkki ja liitä se sovellukseen.",
  uk: "У цьому посиланні немає коду запрошення. Скопіюйте повне посилання й вставте його в застосунок.",
  bg: "В този адрес няма код на покана. Копирайте пълната покана и я поставете в приложението.",
  tr: "Bu adres bir davet kodu taşımıyor. Tam davet bağlantısını kopyalayıp uygulamada açın.",
  hu: "Ez a cím nem tartalmaz meghívókódot. Másolja a teljes meghívóhivatkozást, és illessze be az alkalmazásba.",
};

const DOWNLOAD_LABEL: Localized<string> = {
  en: "Not installed yet? Get POPOPX Chat",
  ru: "Приложение не установлено? Скачать",
  de: "Noch nicht installiert? App herunterladen",
  fr: "Pas encore installé ? Télécharger l’app",
  it: "Non è ancora installato? Scarica l’app",
  nl: "Nog niet geïnstalleerd? Download de app",
  cs: "Nemáte aplikaci? Stáhnout",
  "zh-Hans": "尚未安装？前往下载",
  "zh-Hant": "尚未安裝？前往下載",
  es: "¿Aún no lo tienes? Descarga la app",
  pl: "Nie masz aplikacji? Pobierz",
  ja: "未インストールの方はダウンロードへ",
  th: "ยังไม่ได้ติดตั้ง? ไปหน้าดาวน์โหลด",
  fi: "Eikö sovellusta ole asennettu? Lataa",
  uk: "Застосунок не встановлено? Завантажити",
  bg: "Нямате приложението? Изтеглете го",
  tr: "Henüz kurulu değil mi? Uygulamayı indir",
  hu: "Még nincs telepítve? Töltse le az appot",
};

const CHIP_NO_LOG: Localized<string> = {
  en: "No access log",
  ru: "Без журнала доступа",
  de: "Ohne Zugriffsprotokoll",
  fr: "Sans journal d’accès",
  it: "Senza log di accesso",
  nl: "Geen toegangslog",
  cs: "Bez protokolů o přístupu",
  "zh-Hans": "不记录访问日志",
  "zh-Hant": "不記錄存取日誌",
  es: "Sin registro de acceso",
  pl: "Bez logów dostępu",
  ja: "アクセス記録なし",
  th: "ไม่มีบันทึกการเข้าถึง",
  fi: "Ei lokitusta",
  uk: "Без журналу доступу",
  bg: "Без дневник за достъп",
  tr: "Erişim günlüğü yok",
  hu: "Nincs naplózás",
};

const CHIP_LOCAL: Localized<string> = {
  en: "Nothing loaded from elsewhere",
  ru: "Ничего не загружается извне",
  de: "Nichts von anderswo geladen",
  fr: "Rien chargé d’ailleurs",
  it: "Nulla caricato da altrove",
  nl: "Niets van elders geladen",
  cs: "Nic se nenačítá zvenčí",
  "zh-Hans": "不加载任何外部内容",
  "zh-Hant": "不載入任何外部內容",
  es: "Nada cargado desde fuera",
  pl: "Nic nie jest pobierane z zewnątrz",
  ja: "外部からの読み込みなし",
  th: "ไม่โหลดสิ่งจากภายนอก",
  fi: "Ei latauksia muualta",
  uk: "Нічого не завантажується ззовні",
  bg: "Нищо не се зарежда отвън",
  tr: "Başka yerden hiçbir şey yüklenmez",
  hu: "Máshonnan semmi nem töltődik be",
};

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft/70";

/** The scheme both codecs accept for an `/i/v1/` invite (ledger §21). */
function launchUri(code: string): string {
  return `popopx:/i/v1/${code}`;
}

export function InviteCard(): ReactElement {
  const [code, setCode] = useState("");
  const [measured, setMeasured] = useState(false);
  const [tapped, setTapped] = useState(false);
  const { copied, run } = useCopied();

  const eyebrow = useCopy(EYEBROW);
  const heading = useCopy(HEADING);
  const lead = useCopy(LEAD);
  const openLabel = useCopy(OPEN_LABEL);
  const copyLabel = useCopy(COPY_INVITE);
  const copiedLabel = useCopy(COPY_FEEDBACK);
  const hint = useCopy(HINT_AFTER_TAP);
  const noCode = useCopy(NO_CODE);
  const downloadLabel = useCopy(DOWNLOAD_LABEL);
  const chipNoLog = useCopy(CHIP_NO_LOG);
  const chipLocal = useCopy(CHIP_LOCAL);

  useEffect(() => {
    const match = CODE_IN_PATHNAME.exec(window.location.pathname);
    if (match) setCode(match[1]);
    setMeasured(true);
  }, []);

  const ready = code.length > 0;

  return (
    <div className="section-wrap flex min-h-screen flex-col justify-center py-10">
      <header className="mb-6 flex items-center justify-between gap-3">
        <a
          href="/"
          title="POPOPX"
          className={`flex shrink-0 items-center gap-2.5 rounded-xl px-1 py-1 text-white ${FOCUS}`}
        >
          <img
            src="/logo-popopx.png"
            alt="POPOPX"
            width="30"
            height="30"
            className="h-[30px] w-[30px] rounded-[8px] ring-1 ring-hair-strong"
          />
          <span className="text-[15px] font-semibold tracking-[0.14em]">POPOPX</span>
        </a>
        <LanguageMenu />
      </header>

      <main
        id="top"
        className="glass mx-auto w-full max-w-[520px] px-5 py-7 sm:px-8 sm:py-9"
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 break-words text-2xl font-semibold leading-snug tracking-tight text-white hyphens-auto sm:text-[28px]">
          {heading}
        </h1>
        <p className="mt-4 text-[14.5px] leading-relaxed text-mute">{lead}</p>

        {ready && (
          <div className="animate-rise-in mt-7 flex flex-col gap-3">
            <a
              href={launchUri(code)}
              onClick={() => setTapped(true)}
              className={`btn-primary w-full ${FOCUS}`}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
                className="shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h13" />
                <path d="M13 6l6 6-6 6" />
              </svg>
              <span>{openLabel}</span>
            </a>
            <button
              type="button"
              onClick={() => void run(`${SITE_ORIGIN}/i/v1/${code}`)}
              className={`btn-ghost w-full ${FOCUS}`}
              data-state={copied ? "copied" : "idle"}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
                className="shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="11" height="11" rx="2.5" />
                <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6a3 3 0 0 0-3 3v6.5A2.5 2.5 0 0 0 5.5 15" />
              </svg>
              <span className={copied ? "text-mesh-soft" : ""}>
                {copied ? copiedLabel : copyLabel}
              </span>
            </button>
            {tapped && (
              <p className="text-[13px] leading-relaxed text-faint">{hint}</p>
            )}
          </div>
        )}

        {measured && !ready && (
          <p className="animate-rise-in mt-7 rounded-xl border border-hair bg-black/30 px-4 py-3 text-[13.5px] leading-relaxed text-mute">
            {noCode}
          </p>
        )}

        <p className="hairline-top mt-7 pt-5 text-[13.5px]">
          <a
            href="/download/"
            className={`inline-flex items-center gap-1.5 rounded-lg text-brand-soft underline-offset-4 hover:underline ${FOCUS}`}
          >
            {downloadLabel}
          </a>
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="pill">{chipNoLog}</span>
          <span className="pill">{chipLocal}</span>
        </div>
      </main>
    </div>
  );
}

"use client";

import type { ReactElement } from "react";
import { CodeBlock, SectionHeading, StatusDot } from "@/components/ui";
import { pick, useLocale, type Localized } from "@/lib/i18n";
import { IOS_REPO_URL } from "@/lib/site";

/**
 * 零信任安全架构 + 密码学基线核查表.
 *
 * Every stage, primitive and number here was read out of the POPOPX iOS client
 * repository (`popopx-chat`, default branch `master`) and is cited by file:line,
 * so a visitor can diff the sentence against the source: a claim without a line
 * is treated as a defect, not as marketing.
 *   apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5,125,175,219                Noise_XX_25519_ChaChaPoly_SHA256, hand-written on CryptoKit
 *   apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:103,121-123            AES-256-GCM at the queue payload layer only
 *   apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:381-383,516-523  pinned Ed25519 root, key id k-ad1dc5463a, fail-closed
 *   apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:366-378 (drop at :375)   no metadata dictionary passed => EXIF/GPS gone
 *   apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:99-103     probes at 3 s and 10 s, not a 10 s heartbeat
 */

type Tone = "brand" | "mesh" | "warn";
type CryptoStatus = "verified" | "boundary";

/** Flow stage. `cites` are locale-free `file:line` strings quoted from the ledger. */
type Stage = {
  readonly index: string; readonly tone: Tone; readonly chip: string;
  readonly arrow: string; readonly cites: readonly string[]; readonly label: Localized<string>;
};

/** Checklist row. `primitive` is a protocol name, so it carries no translation. */
type Row = {
  readonly primitive: string; readonly status: CryptoStatus;
  readonly cites: readonly string[]; readonly use: Localized<string>;
};

const HEAD = {
  eyebrow: {
    en: "Zero trust · verified line by line",
    ru: "Нулевое доверие · проверка построчно",
    de: "Zero Trust · Zeile für Zeile geprüft",
    fr: "Confiance zéro · vérifié ligne par ligne",
    it: "Zero trust · verificato riga per riga",
    nl: "Nul vertrouwen · regel voor regel gecontroleerd",
    cs: "Nulová důvěra · ověřeno řádek po řádku",
    "zh-Hans": "零信任 · 逐行核验",
    "zh-Hant": "零信任 · 逐行核驗",
    es: "Confianza cero · verificado línea a línea",
    pl: "Zero ufności · sprawdzane wiersz po wierszu",
    ja: "ゼロ信頼 · 行単位で検証",
    th: "ศูนย์ความเชื่อ ตรวจสอบทีละบรรทัด",
    fi: "Nollaluottamus · rivi riviltä tarkistettu",
    uk: "Нуль довіри · перевірка рядок за рядком",
    bg: "Нула доверие · проверено ред по ред",
    tr: "Sıfır güven · satır satır doğrulandı",
    hu: "Nulla bizalom · soronként ellenőrizve",
  },
  title: {
    en: "Zero-trust architecture and the cryptography checklist",
    ru: "Архитектура нулевого доверия и чек-лист криптопримитивов",
    de: "Zero-Trust-Architektur und Krypto-Checkliste",
    fr: "Architecture de confiance zéro et liste de contrôle cryptographique",
    it: "Architettura zero trust e checklist dei primitivi crittografici",
    nl: "Zero-trust-architectuur en de cryptografie-controlelijst",
    cs: "Architektura nulové důvěry a kontrolní seznam kryptografie",
    "zh-Hans": "零信任安全架构与密码学基线核查表",
    "zh-Hant": "零信任安全架構與密碼學基線核查表",
    es: "Arquitectura de confianza cero y lista de verificación criptográfica",
    pl: "Architektura zero trust i lista kontrolna kryptografii",
    ja: "ゼロトラスト設計と暗号プリミティブ点検表",
    th: "สถาปัตยกรรมศูนย์ความเชื่อ และตารางตรวจสอบรหัสวิทยา",
    fi: "Nollaluottamusarkkitehtuuri ja salauksen tarkistuslista",
    uk: "Архітектура нульової довіри та чек-лист криптопримітивів",
    bg: "Архитектура с нулово доверие и списък за проверка",
    tr: "Sıfır güven mimarisi ve kriptografi kontrol listesi",
    hu: "Nulla bizalomra épülő architektúra és ellenőrzőlista",
  },
  subtitle: {
    en: "Six stages the bytes really pass through, and every primitive that touches them — each with the file and line it was read from.",
    ru: "Шесть этапов, которые байты действительно проходят, и каждый примитив, что их касается, — с файлом и строкой.",
    de: "Sechs Stufen, die die Bytes wirklich durchlaufen, und jedes Primitive, das sie anfasst — jeweils mit Datei und Zeile.",
    fr: "Les six étapes que les octets traversent réellement, et chaque primitive qui les touche, avec le fichier et la ligne d’où c’est lu.",
    it: "I sei passaggi che i byte attraversano davvero e ogni primitivo che li tocca, con file e riga da cui sono stati letti.",
    nl: "Zes etappes die de bytes echt doorlopen en elk primitief dat ze aanraakt, met bestand en regelnummer vanwaar het werd gelezen.",
    cs: "Šest fází, kterými bajty skutečně projdou, a každý primitivum, které se jich dotkne — se souborem a řádkem.",
    "zh-Hans": "字节真正经过的六个阶段，以及触碰它的每个密码学原语，都标出读出处的文件与行号。",
    "zh-Hant": "位元組真正經過的六個階段，以及觸碰它的每個密碼學原語，都標出讀出處的檔案與行號。",
    es: "Seis etapas por las que los bytes pasan de verdad, y cada primitiva que los toca, con el archivo y la línea de origen.",
    pl: "Sześć etapów, które bajty naprawdę pokonują, i każdy prymityw, który je dotyka — z plikiem i numerem wiersza.",
    ja: "バイトが実際に通る 6 つの段階と、それに関わる全ての暗号プリミティブを読み出し元のファイルと行番号付きで。",
    th: "หกขั้นตอนที่บิตข้อมูลผ่านจริง และทุกตัวเข้ารหัสที่แตะมัน พร้อมไฟล์กับบรรทัดที่อ่านออกมา",
    fi: "Kuusi vaihetta, jotka tavut oikeasti kulkevat, ja jokainen alkio, joka niihin koskee, tiedosto ja rivi mukana.",
    uk: "Шість етапів, які байти справді проходять, і кожен примітив, що їх торкається, — із файлом і рядком, звідки це прочитано.",
    bg: "Шест етапа, които байтовете наистина изминават, и всеки примитив, който ги засяга — с файла и реда на произход.",
    tr: "Baytların gerçekten geçtiği altı aşama ve onlara dokunan her primitif — okunduğu dosya ve satır numarasıyla.",
    hu: "Hat lépés, amelyen a bájtok tényleg áthaladnak, és minden primitív, amely érinti őket — a forrásfájllal és a sorszámmal.",
  },
  panel: {
    en: "What the client types say the relay sees",
    ru: "Что, судя по типам клиента, видит реле",
    de: "Was die Client-Typen über das Relay aussagen",
    fr: "Ce que les types du client disent du relais",
    it: "Cosa i tipi del client dicono del relay",
    nl: "Wat de cliënttypes over het relay zeggen",
    cs: "Co typy klienta říkají o relay",
    "zh-Hans": "从客户端类型看：中继手里有什么",
    "zh-Hant": "從客戶端型別看：中繼手裡有什麼",
    es: "Lo que los tipos del cliente dicen del relé",
    pl: "Co typy klienta mówią o przekaźniku",
    ja: "クライアントの型が示す中継側の視点",
    th: "มุมมองต่อตัวกลางตามชนิดข้อมูลของไคลเอนต์",
    fi: "Mitä client-tyypit kertovat välityspalvelimesta",
    uk: "Що типи клієнта кажуть про реле",
    bg: "Какво типовете на клиента казват за релея",
    tr: "İstemci tiplerinin aktarma sunucusu hakkında dedikleri",
    hu: "Amit a kliens típusai a továbbító szerverről mondanak",
  },
  closing: {
    en: "Open the client repository and check any row against the cited line — a sentence without a line number does not belong on this page.",
    ru: "Откройте репозиторий клиента и сверьте любую строку с указанной — предложение без номера строки здесь неуместно.",
    de: "Öffne das Client-Repo und prüfe jede Zeile an der Fundstelle — ein Satz ohne Zeilennummer gehört nicht auf diese Seite.",
    fr: "Ouvrez le dépôt du client et vérifiez chaque ligne citée — une phrase sans numéro de ligne n’a pas sa place ici.",
    it: "Apri il repository del client e verifica ogni riga alla citazione — una frase senza numero di riga non appartiene a questa pagina.",
    nl: "Open de client-repo en controleer elke rij op de aangehaalde regel — een zin zonder regelnummer hoort hier niet.",
    cs: "Otevřete repozitář klienta a ověřte každý řádek podle citace — věta bez čísla řádku sem nepatří.",
    "zh-Hans": "打开客户端仓库，逐行对照引用位置——没有行号的句子不该出现在这一页上。",
    "zh-Hant": "開啟客戶端倉庫，逐行對照引用位置——沒有行號的句子不應出現在這一頁上。",
    es: "Abre el repositorio del cliente y comprueba cada fila contra la línea citada: una frase sin número de línea no pertenece a esta página.",
    pl: "Otwórz repozytorium klienta i sprawdź każdy wiersz według cytatu — zdanie bez numeru wiersza nie powinno tu być.",
    ja: "クライアントのリポジトリを開き、引用行と突き合わせてください。行番号のない文章はこのページに掲載しません。",
    th: "เปิดเรโปของไคลเอนต์แล้วเทียบทีละแถวกับบรรทัดที่อ้างอิง ประโยคที่ไม่มีเลขบรรทัดไม่ควรมีในหน้านี้",
    fi: "Avaa client-repo ja tarkista joka rivi viitattua riviä vasten — lause ilman rivinumeroa ei kuulu tälle sivulle.",
    uk: "Відкрийте репозиторій клієнта й звірте кожен рядок із зазначеним — речення без номера рядка тут недоречне.",
    bg: "Отворете хранилището на клиента и сверете всеки ред с посочения — изречение без номер на ред тук няма място.",
    tr: "İstemci deposunu açıp her satırı atıf verilen satırla karşılaştırın — satır numarası olmayan cümle bu sayfaya ait değil.",
    hu: "Nyisd meg a kliens repóját és ellenőrizd minden sorát a hivatkozott sornak — szám nélküli mondat nem tartozik ide.",
  },
  flowTitle: {
    en: "Data flow, device to relay", ru: "Поток данных: от устройства к релею",
    de: "Datenfluss: vom Gerät zum Relay", fr: "Flux des données : de l’appareil au relais",
    it: "Flusso dei dati: dal dispositivo al relay", nl: "Gegevensstroom: van toestel naar relay",
    cs: "Datový tok: ze zařízení k relay", "zh-Hans": "数据流向：从设备到中继",
    "zh-Hant": "資料流向：從裝置到中繼", es: "Flujo de datos: del dispositivo al relé",
    pl: "Przepływ danych: od urządzenia do przekaźnika", ja: "データフロー：デバイスから中継まで",
    th: "การไหลของข้อมูล: จากอุปกรณ์ไปยังรีเลย์", fi: "Tietovirta: laitteesta välitykselle",
    uk: "Потік даних: від пристрою до релею", bg: "Поток от данни: от устройството към релея",
    tr: "Veri akışı: cihazdan aktarma sunucusuna", hu: "Adatfolyam: eszköztől a továbbítóig",
  },
  tableTitle: {
    en: "Cryptography baseline, checked in the client", ru: "Криптобаза, сверенная с клиентом",
    de: "Krypto-Baseline, im Client geprüft", fr: "La base cryptographique, vérifiée dans le client",
    it: "La base crittografica, verificata sul client", nl: "Cryptografie-baseline, in de client gecheckt",
    cs: "Kryptografická základna zkontrolovaná v klientu", "zh-Hans": "密码学基线：逐条对照客户端",
    "zh-Hant": "密碼學基線：逐條對照客戶端", es: "Línea base criptográfica, comprobada en el cliente",
    pl: "Baza kryptograficzna sprawdzona w kliencie", ja: "暗号基線：クライアントで突き合わせた一覧",
    th: "ฐานรหัสวิทยา เทียบกับโค้ดไคลเอนต์", fi: "Salauksen perusta tarkistettuna clientissä",
    uk: "Криптобаза, звірена з клієнтом", bg: "Крипто база, сверена с клиента",
    tr: "Kriptografi tabanı, istemcide doğrulandı", hu: "Kriptográfiai alapvonal, a kliensben ellenőrizve",
  },
  colPrimitive: {
    en: "Primitive", ru: "Примитив", de: "Primitive", fr: "Primitive", it: "Primitivo",
    nl: "Primitief", cs: "Primitivum", "zh-Hans": "原语", "zh-Hant": "原語", es: "Primitiva",
    pl: "Prymityw", ja: "プリミティブ", th: "ตัวเข้ารหัส", fi: "Alkio", uk: "Примітив",
    bg: "Примитив", tr: "Primitif", hu: "Primitív",
  },
  colUse: {
    en: "Where it is used", ru: "Где применяется", de: "Wo es eingesetzt wird",
    fr: "Où il est utilisé", it: "Dove viene usato", nl: "Waar het wordt gebruikt",
    cs: "Kde se používá", "zh-Hans": "实际用途", "zh-Hant": "實際用途", es: "Dónde se usa",
    pl: "Gdzie jest używany", ja: "使われ方", th: "ใช้งานที่ใด", fi: "Missä käytetään",
    uk: "Де застосовується", bg: "Къде се използва", tr: "Nerede kullanılıyor", hu: "Hol alkalmazzák",
  },
  colStatus: {
    en: "Status", ru: "Статус", de: "Status", fr: "Statut", it: "Stato", nl: "Status",
    cs: "Stav", "zh-Hans": "核查状态", "zh-Hant": "核查狀態", es: "Estado", pl: "Status",
    ja: "状態", th: "สถานะ", fi: "Tila", uk: "Статус", bg: "Статус", tr: "Durum", hu: "Állapot",
  },
};

/** `file:line` is a citation format, not prose — one locale-free column head. */
const COL_CITE = "file:line";

const STATUS_LABEL: Record<CryptoStatus, Localized<string>> = {
  verified: {
    en: "in client code", ru: "в коде клиента", de: "im Client-Code", fr: "dans le code client",
    it: "nel codice del client", nl: "in clientcode", cs: "v kódu klienta",
    "zh-Hans": "客户端代码内", "zh-Hant": "客戶端程式碼內", es: "en el código del cliente",
    pl: "w kodzie klienta", ja: "クライアント実装内", th: "ในโค้ดไคลเอนต์",
    fi: "client-koodissa", uk: "у коді клієнта", bg: "в кода на клиента",
    tr: "istemci kodunda", hu: "a kliens kódjában",
  },
  boundary: {
    en: "boundary stated", ru: "граница указана", de: "Grenze benannt", fr: "limite énoncée",
    it: "confine dichiarato", nl: "grens benoemd", cs: "hranice uvedena",
    "zh-Hans": "边界已标注", "zh-Hant": "邊界已標註", es: "frontera declarada",
    pl: "granica opisana", ja: "境界を明示", th: "ระบุขอบเขตแล้ว", fi: "raja ilmoitettu",
    uk: "межу зазначено", bg: "границата е посочена", tr: "sınır belirtildi", hu: "a határ leírva",
  },
};

const FLOW: readonly Stage[] = [
  {
    index: "①", tone: "mesh", arrow: ".ppxlz", chip: "FileProtectionType.complete",
    cites: ["apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:330,337,900", "apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:436"],
    label: {
      en: "Device sandbox. The media engine's temporary files and the whole server table are written with FileProtectionType.complete.",
      ru: "Песочница устройства. Временные файлы медиадвижка и вся таблица серверов записаны с FileProtectionType.complete.",
      de: "Geräte-Sandbox. Temporäre Dateien der Media-Engine und die ganze Servertabelle werden mit FileProtectionType.complete geschrieben.",
      fr: "Bac à sable de l’appareil. Les fichiers temporaires du moteur média et toute la table des serveurs s’écrivent avec FileProtectionType.complete.",
      it: "Sandbox del dispositivo. I file temporanei del motore media e l’intera tabella dei server sono scritti con FileProtectionType.complete.",
      nl: "Sandbox van het toestel. De tijdelijke files van de media-engine en de volledige servertabel worden met FileProtectionType.complete geschreven.",
      cs: "Písek na zařízení. Dočasné soubory media enginu i celá tabulka serverů se zapisují s FileProtectionType.complete.",
      "zh-Hans": "设备本地沙盒。媒体引擎写出的临时文件与整张服务器表都以 FileProtectionType.complete 存储。",
      "zh-Hant": "裝置本地沙盒。媒體引擎寫出的暫存檔案與整張伺服器表都以 FileProtectionType.complete 儲存。",
      es: "Arena del dispositivo. Los archivos temporales del motor de medios y toda la tabla de servidores se escriben con FileProtectionType.complete.",
      pl: "Piaskownica urządzenia. Pliki tymczasowe silnika multimediów i cała tabela serwerów zapisywane są z FileProtectionType.complete.",
      ja: "端末内のサンドボックス。メディアエンジンの一時ファイルもサーバー表全体も FileProtectionType.complete で書き込まれます。",
      th: "แซนด์บ็อกซ์บนอุปกรณ์ ไฟล์ชั่วคราวของมีเดียเอนจินและตารางเซิร์ฟเวอร์ทั้งตารางถูกเขียนด้วย FileProtectionType.complete",
      fi: "Laitteen hiekkalaatikko. Mediakoneiston väliaikaiset tiedostot ja koko palvelintaulu kirjoitetaan arvolla FileProtectionType.complete.",
      uk: "Писочниця пристрою. Тимчасові файли медіарухавія й усю таблицю серверів записують із FileProtectionType.complete.",
      bg: "Пясъчникът на устройството. Временните файлове на медийния двигател и цялата сървърна таблица се записват с FileProtectionType.complete.",
      tr: "Cihazın sandbox alanı. Medya motorunun geçici dosyaları ile tüm sunucu tablosu FileProtectionType.complete ile yazılır.",
      hu: "Az eszköz homokozója. A média-engine ideiglenes fájljai és a teljes szervertábla FileProtectionType.complete móddal íródnak.",
    },
  },
  {
    index: "②", tone: "mesh", arrow: "Noise_XX_25519_ChaChaPoly_SHA256", chip: "ImageIO · AVAssetWriter · LZFSE",
    cites: ["apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:18-21,366-378", "apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:22-24,433-442", "apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:11-15,731,735-738"],
    label: {
      en: "On-device compression, no metadata dictionary: ImageIO re-encodes, AVAssetWriter writes metadata = [], LZFSE packs the .ppxlz.",
      ru: "Сжатие на устройстве без словаря метаданных: ImageIO перекодировывает, AVAssetWriter пишет metadata = [], LZFSE пакует .ppxlz.",
      de: "Kompression am Gerät ohne Metadaten-Wörterbuch: ImageIO kodiert neu, AVAssetWriter schreibt metadata = [], LZFSE packt das .ppxlz.",
      fr: "Compression sur l’appareil, sans dictionnaire de métadonnées : ImageIO recode, AVAssetWriter écrit metadata = [], LZFSE emballe le .ppxlz.",
      it: "Compressione sul dispositivo senza dizionario di metadati: ImageIO ricodifica, AVAssetWriter scrive metadata = [], LZFSE impacchetta il .ppxlz.",
      nl: "Compressie op het toestel zonder metadict: ImageIO hercodeert, AVAssetWriter schrijft metadata = [], LZFSE pakt de .ppxlz in.",
      cs: "Komprese na zařízení bez slovníku metadat: ImageIO překóduje, AVAssetWriter zapíše metadata = [], LZFSE zabalí .ppxlz.",
      "zh-Hans": "本地压缩并剥离元数据：ImageIO 重编码、AVAssetWriter 写入 metadata = []、LZFSE 打包 .ppxlz。",
      "zh-Hant": "本地壓縮並剝離元資料：ImageIO 重編碼、AVAssetWriter 寫入 metadata = []、LZFSE 打包 .ppxlz。",
      es: "Compresión local sin diccionario de metadatos: ImageIO recodifica, AVAssetWriter escribe metadata = [], LZFSE empaqueta el .ppxlz.",
      pl: "Kompresja na urządzeniu bez słownika metadanych: ImageIO koduje ponownie, AVAssetWriter zapisuje metadata = [], LZFSE pakuje .ppxlz.",
      ja: "端末内での圧縮とメタデータ除去。ImageIO が再エンコードし、AVAssetWriter は metadata = [] を書き、LZFSE が .ppxlz に格納します。",
      th: "บีบอัดบนเครื่องโดยไม่มีพจนานุกรมเมทาดาทา: ImageIO เข้ารหัสใหม่, AVAssetWriter เขียน metadata = [], LZFSE บรรจุลง .ppxlz",
      fi: "Pakkaus laitteella metadatan-sanakirjaa välittämättä: ImageIO koodaa uudelleen, AVAssetWriter kirjoittaa metadata = [], LZFSE pakkaa .ppxlz:n.",
      uk: "Стискання на пристрої без словника метаданих: ImageIO перекодує, AVAssetWriter пише metadata = [], LZFSE пакує .ppxlz.",
      bg: "Компресия на устройството без речник с метаданни: ImageIO прекодира, AVAssetWriter пише metadata = [], LZFSE опакова .ppxlz.",
      tr: "Aygıt içinde sıkıştırma, meta veri sözlüğü yok: ImageIO yeniden kodlar, AVAssetWriter metadata = [] yazar, LZFSE .ppxlz kalıbını paketler.",
      hu: "Helyi tömörítés metaadat-szótár nélkül: az ImageIO újrakódol, az AVAssetWriter így írja: metadata = [], a LZFSE pedig .ppxlz-be csomagol.",
    },
  },
  {
    index: "③", tone: "brand", arrow: "AES-256-GCM", chip: "Noise XX · ChaCha20-Poly1305",
    cites: ["apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5,125,175,219", "apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:103,121-123"],
    label: {
      en: "End-to-end sealing: hand-written Noise XX over X25519 on BLE with ChaCha20-Poly1305 frames; AES-256-GCM only for queue payloads.",
      ru: "Упаковка от конца до конца: в BLE рукописный Noise XX на X25519 с кадрами ChaCha20-Poly1305; AES-256-GCM только для содержимого очередей.",
      de: "End-zu-End-Versiegelung: handgeschriebenes Noise XX über X25519 auf BLE mit ChaCha20-Poly1305-Rahmen; AES-256-GCM nur für Queue-Nutzlasten.",
      fr: "Scellement de bout en bout : un Noise XX écrit à la main sur X25519 côté BLE avec des trames ChaCha20-Poly1305 ; AES-256-GCM pour les charges de file seulement.",
      it: "Sigillatura end-to-end: Noise XX scritto a mano su X25519 su BLE con frame ChaCha20-Poly1305; AES-256-GCM solo per i payload della coda.",
      nl: "End-to-end-afzetting: handgeschreven Noise XX over X25519 op BLE met ChaCha20-Poly1305-frames; AES-256-GCM alleen voor wachtrij-payloads.",
      cs: "Uzavření end-to-end: ručně psaný Noise XX nad X25519 na BLE s rámci ChaCha20-Poly1305; AES-256-GCM jen pro payloady front.",
      "zh-Hans": "端到端封装：BLE 上是手写 Noise XX（X25519）+ ChaCha20-Poly1305 帧；AES-256-GCM 只用于队列载荷。",
      "zh-Hant": "端到端封裝：BLE 上是手寫 Noise XX（X25519）＋ ChaCha20-Poly1305 幀；AES-256-GCM 只用於佇列載具。",
      es: "Sellado de extremo a extremo: un Noise XX escrito a mano sobre X25519 en BLE con tramas ChaCha20-Poly1305; AES-256-GCM solo para cargas de cola.",
      pl: "Zapieczętowanie end-to-end: ręcznie pisany Noise XX na X25519 w BLE z ramkami ChaCha20-Poly1305; AES-256-GCM tylko dla ładunków kolejki.",
      ja: "エンドツーエンドの封緘。BLE 上は手書きの Noise XX（X25519）に ChaCha20-Poly1305 フレーム、AES-256-GCM はキューのペイロード専用です。",
      th: "ปิดผนึกแบบ end-to-end: Noise XX ที่เขียนเองบน X25519 ผ่าน BLE พร้อมเฟรม ChaCha20-Poly1305; AES-256-GCM ใช้กับ payload ของคิวเท่านั้น",
      fi: "Päästä päähän -sinelöinti: käsin kirjoitettu Noise XX X25519:n päällä BLE:ssä ChaCha20-Poly1305-kehyksillä; AES-256-GCM vain jonon hyötykuormalle.",
      uk: "Пакування від кінця до кінця: рукописний Noise XX на X25519 у BLE з фреймами ChaCha20-Poly1305; AES-256-GCM лише для вмісту черг.",
      bg: "Уплътняване край до край: ръкописен Noise XX върху X25519 над BLE с кадри ChaCha20-Poly1305; AES-256-GCM само за товара на опашките.",
      tr: "Uçtan uca mühürleme: BLE üzerinde elle yazılmış, X25519 tabanlı Noise XX ve ChaCha20-Poly1305 çerçeveleri; AES-256-GCM yalnızca kuyruk yükleri için.",
      hu: "Végpontok közötti lepecsételés: kézzel írt Noise XX X25519-en BLE-n, ChaCha20-Poly1305 keretekkel; az AES-256-GCM csak a sorok payloadjára.",
    },
  },
  {
    index: "④", tone: "brand", arrow: "PopopxChannelEnvelope", chip: "RcvQueueInfo · SndQueueInfo",
    cites: ["apps/ios/POPOPXChat/APITypes.swift:589-615", "apps/ios/POPOPXChat/APITypes.swift:597-604"],
    label: {
      en: "One-way queue relay: the queue types expose one server field per direction plus the switch state — no contact field, no relationship field.",
      ru: "Однонаправленный релей очередей: типы очереди показывают по одному серверному полю на направление плюс состояние переключения — без полей контактов и связей.",
      de: "Einseitige Queue-Weitergabe: die Queue-Typen zeigen je Richtung genau ein Serverfeld plus den Umschaltzustand — kein Kontakt-, kein Beziehungsfeld.",
      fr: "Relais de file à sens unique : les types de file n’exposent qu’un champ serveur par direction et l’état de bascule — aucun champ contact ni relation.",
      it: "Relay di coda a senso unico: i tipi di coda espongono un solo campo server per direzione più lo stato di commutazione — nessun campo contatto, nessun campo relazione.",
      nl: "One-way wachtrij-relais: de wachtrijtypes tonen per richting één serverveld plus de schakelstatus — geen contactveld, geen relatieveld.",
      cs: "Jednosměrné relay front: typy front ukazují na každém směru jen jedno serverové pole a stav přepínání — žádná pole kontaktů ani vztahů.",
      "zh-Hans": "单向队列中继：队列类型每个方向只有一个服务器字段与切换状态，没有联系人字段，也没有关系字段。",
      "zh-Hant": "單向佇列中繼：佇列型別每個方向只有一個伺服器欄位與切換狀態，沒有聯絡人欄位，也沒有關係欄位。",
      es: "Relevé de cola unidireccional: los tipos de cola exponen un solo campo de servidor por dirección más el estado de cambio — sin campos de contacto ni relación.",
      pl: "Przekazywanie kolejki w jedną stronę: typy kolejki ujawniają po jednym polu serwera na kierunek oraz stan przełączenia — bez pola kontaktu i relacji.",
      ja: "一方向のキュー中継。キュー型が持つサーバー項目は方向につき 1 つと切替状態のみで、連絡先も関係を示す項目もありません。",
      th: "ตัวกลางคิวทิศทางเดียว: ชนิดคิวเปิดเผยฟิลด์เซิร์ฟเวอร์ทิศละหนึ่งฟิลด์กับสถานะการสลับ — ไม่มีฟิลด์รายชื่อติดต่อ ไม่มีฟิลด์ความสัมพันธ์",
      fi: "Yksisuuntainen jonovälitys: jonotyypit näyttävät kullekin suunnalle yhden palvelinkentän ja vaihtotilan — ei yhteystietokenttää, ei suhtekenttää.",
      uk: "Односпрямоване реле черг: типи черги показують по одному серверному полю на напрям плюс стан перемикання — без поля контактів і без поля зв’язків.",
      bg: "Еднопосочен релей на опашки: типовете опашки показват по едно сървърно поле за посока плюс състоянието на превключване — без поле за контакти и за връзки.",
      tr: "Tek yönlü kuyruk aktarımı: kuyruk tipleri yön başına tek bir sunucu alanı ile geçiş durumunu gösteriyor — iletişim alanı yok, ilişki alanı yok.",
      hu: "Egyirányú sor-továbbítás: a sor típusok irányonként egyetlen szervermezőt és az átváltás állapotát mutatják — nincs névjegy- és nincs kapcsolatmező.",
    },
  },
  {
    index: "⑤", tone: "brand", arrow: "PopopxServerClusterConfig", chip: "popopx.channel.enc.v1",
    cites: ["apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:5,64,196", "apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:341,381-422"],
    label: {
      en: "Zero-knowledge channel envelope popopx.channel.enc.v1: the per-epoch keys are what keep the relay blind to the content.",
      ru: "Конверт канала с нулевым разглашением popopx.channel.enc.v1: именно ключи по эпохам не дают релею видеть содержимое.",
      de: "Zero-Knowledge-Kanalumschlag popopx.channel.enc.v1: die Epoch-Schlüssel sind der Grund, dass das Relay den Inhalt nicht liest.",
      fr: "Enveloppe de canal à connaissance nulle popopx.channel.enc.v1 : ce sont les clés par epoch qui aveuglent le relais sur le contenu.",
      it: "Busta del canale a conoscenza zero popopx.channel.enc.v1: sono le chiavi per epoch a rendere il relay cieco rispetto al contenuto.",
      nl: "Zero-knowledge-kanaalenvelop popopx.channel.enc.v1: de epochsleutels houden het relay blind voor de inhoud.",
      cs: "Obálka kanálu s nulovou znalostí popopx.channel.enc.v1: právě klíče po epochách drží relay zaslepený vůči obsahu.",
      "zh-Hans": "零知识频道信封 popopx.channel.enc.v1：每 epoch 一把密钥，正是它让中继读不到内容。",
      "zh-Hant": "零知識頻道信封 popopx.channel.enc.v1：每個 epoch 一把金鑰，正是它讓中繼讀不到內容。",
      es: "Sobre de canal de conocimiento cero popopx.channel.enc.v1: son las claves por epoch las que dejan ciego al relé ante el contenido.",
      pl: "Koperta kanału zero-knowledge popopx.channel.enc.v1: to klucze na kolejne epochy sprawiają, że przekaźnik nie widzi treści.",
      ja: "ゼロ知識チャンネルのエンベロープ popopx.channel.enc.v1。エポックごとの鍵があるからこそ、中継側は内容を読めません。",
      th: "ซองช่องทางแบบศูนย์ความรู้ popopx.channel.enc.v1: คีย์ราย epoch คือเหตุที่ตัวกลางอ่านเนื้อหาไม่ได้",
      fi: "Nollatiedon kanavakuo popopx.channel.enc.v1: epoch-avaimet pitävät välityspalvelimen sokeana sisällölle.",
      uk: "Конверт каналу з нульовим розголошенням popopx.channel.enc.v1: саме ключі за епохами не дають релею бачити вміст.",
      bg: "Плик на канал с нула разкриване popopx.channel.enc.v1: ключовете по епохи са причината релеят да не вижда съдържанието.",
      tr: "Sıfır bilgi kanal zarfı popopx.channel.enc.v1: içeriğe karşı röleyi kör tutan şey epoch başına anahtarlardır.",
      hu: "Nulla tudású csatornaboríték, popopx.channel.enc.v1: az epochonkénti kulcsok miatt nem látja a továbbító szerver a tartalmat.",
    },
  },
  {
    index: "⑥", tone: "warn", arrow: "", chip: "Ed25519 · k-ad1dc5463a",
    cites: ["apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:381-383,388,401,411-421,516-523", "apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:99-103", "apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:172,443-461"],
    label: {
      en: "Config surface: Ed25519 against one pinned 32-byte root, a rollback.json snapshot before applying, connectivity probes at 3 s and 10 s.",
      ru: "Слой конфигурации: Ed25519 против зашитого 32-байтного корня, снимок rollback.json до применения и проверки связности на 3-й и 10-й секунде.",
      de: "Konfigurationsebene: Ed25519 gegen einen fest verankerten 32-Byte-Root, rollback.json-Snapshot vor dem Anwenden, Verbindungstests nach 3 s und 10 s.",
      fr: "Surface de configuration : Ed25519 contre une racine fixe de 32 octets, instantané rollback.json avant application, tests de connexion à 3 s et 10 s.",
      it: "Superficie di configurazione: Ed25519 contro una radice fissa di 32 byte, istantanea rollback.json prima dell’applicazione, probe di connettività a 3 s e 10 s.",
      nl: "Config-laag: Ed25519 tegen één vastgezette 32-byte root, een rollback.json-momentopname vóór toepassen en connectiviteitstests op 3 s en 10 s.",
      cs: "Konfigurační vrstva: Ed25519 proti pevně zabudovanému 32bajtovému kořeni, snapshot rollback.json před aplikací a sondy dostupnosti po 3 s a 10 s.",
      "zh-Hans": "配置面：Ed25519 校验钉死的 32 字节信任根，应用前先落 rollback.json 快照，探活在第 3 秒与第 10 秒。",
      "zh-Hant": "設定面：Ed25519 校驗釘死的 32 位元組信任根，套用前先寫 rollback.json 快照，探活在第 3 秒與第 10 秒。",
      es: "Capa de configuración: Ed25519 contra una raíz fija de 32 bytes, instantánea rollback.json antes de aplicar y pruebas de conectividad a los 3 s y 10 s.",
      pl: "Warstwa konfiguracji: Ed25519 wobec zakotwiczonego 32-bajtowego korzenia, migawka rollback.json przed zastosowaniem i próby łączności po 3 s oraz 10 s.",
      ja: "設定面。Ed25519 は固定した 32 バイトの信頼ルートを検証し、適用前に rollback.json のスナップショットを書き、到達確認は 3 秒と 10 秒の 2 時点です。",
      th: "ชั้นการตั้งค่า: Ed25519 เทียบกับรูตความเชื่อ 32 ไบต์ที่ตรึงไว้ เขียนสแนปช็อต rollback.json ก่อนนำไปใช้ และตรวจการเชื่อมต่อที่ 3 วินาทีกับ 10 วินาที",
      fi: "Määrityspuoli: Ed25519 yhtä kiinnitettyä 32-tavun juurta vasten, rollback.json-kuvaus ennen käyttöönottoa ja yhteystestit 3 s ja 10 s.",
      uk: "Шар конфігурації: Ed25519 проти закріпленого 32-байтного кореня, знімок rollback.json перед застосуванням і перевірки зв’язності на 3-й та 10-й секунді.",
      bg: "Конфигурационен слой: Ed25519 срещу фиксиран 32-байтов корен, снимка rollback.json преди прилагане и тестове за свързаност на 3-та и 10-та секунда.",
      tr: "Yapılandırma katmanı: Ed25519 sabitlenmiş 32 baytlık köke karşı, uygulamadan önce rollback.json anlık görüntüsü, bağlantı yoklamaları 3 sn ve 10 sn’de.",
      hu: "Konfigurációs réteg: az Ed25519 egy rögzített 32 bájtos gyökérkulcsot ellenőriz, alkalmazás előtt rollback.json pillanatkép, a kapcsolatpróba 3 mp-nál és 10 mp-nál.",
    },
  },
];

const CRYPTO: readonly Row[] = [
  {
    primitive: "X25519", status: "verified",
    cites: ["apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5,356,618-632,644", "apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxMeshIdentity.swift:9,12-19,35-59"],
    use: {
      en: "Key agreement in the hand-written Noise XX handshake, and the mesh node identity.",
      ru: "Соглашение по ключу в рукописном рукопожатии Noise XX и идентичность узла сети.",
      de: "Schlüsselaustausch im handgeschriebenen Noise-XX-Handshake und Identität des Mesh-Knotens.",
      fr: "Accord de clé dans le handshake Noise XX écrit à la main, et identité du nœud du maillage.",
      it: "Accordo di chiave nel handshake Noise XX scritto a mano e identità del nodo mesh.",
      nl: "Sleutelovereenkomst in de handgeschreven Noise XX-handshake, en de identiteit van het meshknooppunt.",
      cs: "Dohoda o klíči v ručně psaném handshake Noise XX a identita uzlu sítě.",
      "zh-Hans": "手写 Noise 握手的密钥协商，同时也是 Mesh 节点身份。",
      "zh-Hant": "手寫 Noise 握手的金鑰協商，同時也是 Mesh 節點身分。",
      es: "Acuerdo de clave en el handshake Noise XX escrito a mano, e identidad del nodo de la malla.",
      pl: "Uzgodnienie klucza w ręcznie pisanym powitaniu Noise XX oraz tożsamość węzła mesh.",
      ja: "手書きの Noise XX 鍵合意と、Mesh ノードの身元識別子。",
      th: "การตกลงกุญแจในการจับมือ Noise XX ที่เขียนเอง และใช้เป็นตัวตนโหนดเมช",
      fi: "Avaimen sovitus käsin kirjoitetussa Noise XX -kädenpuristuksessa ja mesh-solmun identiteetti.",
      uk: "Узгодження ключа у рукописному рукостисканні Noise XX та ідентичність вузла сітки.",
      bg: "Споделка на ключ в ръкописното Noise XX ръкостискане и самоличността на мрежовия възел.",
      tr: "Elle yazılmış Noise XX el sıkışmasında anahtar uzlaşması ve ağ düğümü kimliği.",
      hu: "Kulcsegyeztetés a kézzel írt Noise XX kézifogás során, és a mesh csomópont azonosítója.",
    },
  },
  {
    primitive: "ChaCha20-Poly1305", status: "verified",
    cites: ["apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:125,128,175,219", "apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Groups/PopopxGroupCrypto.swift:123,153-157", "apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,196"],
    use: {
      en: "Three places: BLE/mesh transport frames, offline group messages on an epoch key with AAD, and the service-account channel envelope.",
      ru: "Три места: кадры BLE/сети, офлайн-сообщения групп по ключу эпохи с AAD и конверт канала сервис-аккаунта.",
      de: "Drei Stellen: BLE-/Mesh-Transportrahmen, Offline-Gruppennachrichten je Epoch-Schlüssel mit AAD und der Kanalumschlag des Servicekontos.",
      fr: "Trois endroits : les trames BLE/maillage, les messages de groupe hors ligne par clé d’epoch avec AAD, et l’enveloppe du canal de compte service.",
      it: "Tre punti: i frame di trasporto BLE/mesh, i messaggi di gruppo offline con chiave per epoch e AAD, e la busta del canale dell’account servizio.",
      nl: "Drie plekken: BLE-/mesh-transportframes, offline groepsberichten per epochsleutel met AAD, en de kanaalenvelop van de serviceaccount.",
      cs: "Tři místa: rámy BLE/meshe, offline skupinové zprávy s klíčem epochy a AAD, a obálka kanálu servisního účtu.",
      "zh-Hans": "三处：BLE/Mesh 传输帧、离线群组消息（每 epoch 群组密钥 + AAD）、服务号频道信封。",
      "zh-Hant": "三處：BLE/Mesh 傳輸幀、離線群組訊息（每 epoch 群組金鑰＋AAD）、服務號頻道信封。",
      es: "Tres lugares: tramas de transporte BLE/malla, mensajes de grupo sin conexión con clave de epoch y AAD, y el sobre del canal de la cuenta de servicio.",
      pl: "Trzy miejsca: ramki transportu BLE/mesh, wiadomości grup offline per klucz epoki z AAD oraz koperta kanału konta usługowego.",
      ja: "使用箇所は 3 つ。BLE/Mesh の転送フレーム、オフライングループメッセージ（エポック鍵 + AAD）、サービスアカウントのチャンネルエンベロープです。",
      th: "ใช้สามแห่ง: เฟรมขนส่ง BLE/เมช, ข้อความกลุ่มออฟไลน์ด้วยคีย์ราย epoch พร้อม AAD และซองช่องทางของบัญชีบริการ",
      fi: "Kolme paikkaa: BLE/mesh-siirtymukehykset, offline-ryhmäviestit epoch-avaimella ja AAD:lla sekä palvelutilin kanavakuo.",
      uk: "Три місця: фрейми транспорту BLE/mesh, офлайн-повідомлення груп за ключем епохи з AAD та конверт каналу сервісного акаунта.",
      bg: "Три места: кадри на BLE/mesh транспорта, офлайн групови съобщения по ключ на епоха с AAD и пликът на канала на сервисния акаунт.",
      tr: "Üç yer: BLE/ağ aktarım çerçeveleri, çevrimdışı grup mesajlarında epoch anahtarı + AAD ve hizmet hesabı kanal zarfı.",
      hu: "Három hely: BLE/mesh szállító keretek, offline csoportüzenetek epochonkénti kulccsal és AAD-vel, valamint a szolgáltatási fiók csatornaborítéka.",
    },
  },
  {
    primitive: "AES-256-GCM", status: "boundary",
    cites: ["apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:103,121-123"],
    use: {
      en: "Only the queue payload layer. It is not the BLE channel cipher — that one is Noise with ChaCha20-Poly1305.",
      ru: "Только слой содержимого очереди. Это не шифр BLE-канала — там Noise и ChaCha20-Poly1305.",
      de: "Nur die Nutzlastebene der Warteschlange. Nicht die BLE-Kanalverschlüsselung – die ist Noise mit ChaCha20-Poly1305.",
      fr: "Seulement la couche de charge utile de la file. Ce n’est pas le chiffrement du canal BLE — celui-là est Noise avec ChaCha20-Poly1305.",
      it: "Solo lo strato payload della coda. Non è il cifrario del canale BLE — quello è Noise con ChaCha20-Poly1305.",
      nl: "Alleen de payloadlaag van de wachtrij. Niet de BLE-kanaalversleuteling — die is Noise met ChaCha20-Poly1305.",
      cs: "Pouze vrstva payloadu fronty. Není to šifra BLE kanálu — ta je Noise s ChaCha20-Poly1305.",
      "zh-Hans": "只用于队列载荷层，不是 BLE 通道的加密——BLE 用的是 Noise + ChaCha20-Poly1305。",
      "zh-Hant": "只用於佇列載具層，不是 BLE 頻道的加密——BLE 用的是 Noise＋ChaCha20-Poly1305。",
      es: "Solo la capa de carga de la cola. No es el cifrado del canal BLE — ese es Noise con ChaCha20-Poly1305.",
      pl: "Tylko warstwa ładunku kolejki. To nie szyfr kanału BLE — tam jest Noise z ChaCha20-Poly1305.",
      ja: "キューのペイロード層だけに使われます。BLE 通道の暗号ではなく、そちらは Noise + ChaCha20-Poly1305 です。",
      th: "ใช้แค่ชั้น payload ของคิว ไม่ใช่การเข้ารหัสช่องทาง BLE — ส่วนนั้นเป็น Noise กับ ChaCha20-Poly1305",
      fi: "Vain jonon hyötykuormakerros. Ei BLE-kanavan salaus — se on Noise ChaCha20-Poly1305:llä.",
      uk: "Лише шар вмісту черги. Це не шифр BLE-каналу — там Noise з ChaCha20-Poly1305.",
      bg: "Само слоя на товара на опашката. Не е шифрът на BLE канала — там е Noise с ChaCha20-Poly1305.",
      tr: "Yalnızca kuyruk yükü katmanı. BLE kanal şifresi değil — o Noise + ChaCha20-Poly1305.",
      hu: "Csak a sor payload rétege. Nem a BLE-csatorna titkosítása — az Noise, ChaCha20-Poly1305-tel.",
    },
  },
  {
    primitive: "Ed25519", status: "boundary",
    cites: ["apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:381-383,388,401,403-409,411-421,516-523", "apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Groups/PopopxGroupWire.swift:145", "apps/ios/Shared/Features/Discover/DiscoverCatalogModels.swift:596-600", "apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:294-304"],
    use: {
      en: "Verifies the server cluster config against a hardcoded 32-byte root (key id k-ad1dc5463a), fail-closed. Group, catalog and channel signatures are trust-on-first-use — that root does not cover them.",
      ru: "Проверяет конфиг кластера серверов против жёстко заданного 32-байтного корня (key id k-ad1dc5463a), с отказом при ошибке. Подписи групп, каталога и канала — доверие при первом использовании.",
      de: "Prüft die Server-Cluster-Konfiguration gegen einen hartcodierten 32-Byte-Root (key id k-ad1dc5463a), fail-closed. Gruppen-, Katalog- und Kanal-Signaturen sind trust-on-first-use — dieser Root deckt sie nicht ab.",
      fr: "Vérifie la config du cluster serveur contre une racine codée en dur de 32 octets (key id k-ad1dc5463a), en échec bloquant. Les signatures de groupe, de catalogue et de canal sont en confiance au premier usage.",
      it: "Verifica la configurazione del cluster di server contro una radice hardcoded di 32 byte (key id k-ad1dc5463a), fail-closed. Le firme di gruppo, catalogo e canale sono trust-on-first-use.",
      nl: "Controleert de serverclusterconfig tegen een hardcoded 32-byte root (key id k-ad1dc5463a), fail-closed. Groeps-, catalogus- en kanaalhandtekeningen zijn trust-on-first-use.",
      cs: "Ověřuje konfiguraci serverového clusteru proti pevně zakódovanému 32bajtovému kořeni (key id k-ad1dc5463a), fail-closed. Podpisy skupin, katalogu a kanálu jsou trust-on-first-use.",
      "zh-Hans": "校验硬编码的 32 字节信任根（key id k-ad1dc5463a），失败即拒绝。群组、发现目录与频道签名是首次信任，不在这个根的覆盖范围内。",
      "zh-Hant": "校驗硬編碼的 32 位元組信任根（key id k-ad1dc5463a），失敗即拒絕。群組、發現目錄與頻道簽章採首次信任，不在這個根的涵蓋範圍。",
      es: "Verifica la configuración del clúster contra una raíz fijada de 32 bytes (key id k-ad1dc5463a), con rechazo si falla. Las firmas de grupo, catálogo y canal son de confianza en el primer uso.",
      pl: "Weryfikuje konfigurację klastra wobec zaszytego 32-bajtowego korzenia (key id k-ad1dc5463a), z odmową przy błędzie. Podpisy grup, katalogu i kanału są zaufaniem przy pierwszym użyciu.",
      ja: "ハードコードした 32 バイトの信頼ルート（key id k-ad1dc5463a）でサーバー群設定を検証し、失敗時は拒否します。グループ・カタログ・チャンネル署名は初回信頼で、この根の範囲外です。",
      th: "ตรวจการตั้งค่ากลุ่มเซิร์ฟเวอร์กับรูต 32 ไบต์ที่ฮาร์ดโค้ด (key id k-ad1dc5463a) แบบล้มเหลวแล้วปฏิเสธ ลายเซ็นของกลุ่ม แคตตาล็อก และช่องทางเป็นแบบเชื่อใจครั้งแรก ไม่อยู่ในขอบเขตของรูตนี",
      fi: "Tarkistaa palvelinclusterin määrityksen kovakoodattua 32-tavun juurta vasten (key id k-ad1dc5463a), fail-closed. Ryhmien, luettelon ja kanavan allekirjoitukset ovat trust-on-first-use.",
      uk: "Перевіряє конфігурацію кластера серверів проти зашитого 32-байтного кореня (key id k-ad1dc5463a), з відмовою при помилці. Підписи груп, каталогу та каналу — довіра при першому використанні.",
      bg: "Проверя конфигурацията на сървърния клъстер срещу втвърден 32-байтов корен (key id k-ad1dc5463a), при грешка отказва. Подписите на групи, каталог и канал са доверие при първа употреба.",
      tr: "Sunucu kümesi yapılandırmasını sabit 32 baytlık köke karşı doğrular (key id k-ad1dc5463a), hata olursa kapatır. Grup, katalog ve kanal imzaları ilk kullanımda güvendir.",
      hu: "A szerverfürt-konfigurációt egy beégetett 32 bájtos gyökérhez ellenőrzi (key id k-ad1dc5463a), hiba esetén elutasít. A csoport-, katalógus- és csatornaaláírások első használatkori bizalmúak.",
    },
  },
  {
    primitive: "HMAC-SHA256", status: "verified",
    cites: ["apps/ios/Shared/Features/ServiceAccount/PopopxH5Launcher.swift:7,120-122,130-142"],
    use: {
      en: "Pairwise-anonymous H5 authorisation for service accounts, keyed by that contact's session key from the Keychain.",
      ru: "Попарно анонимная H5-авторизация сервис-аккаунтов на ключе сессии этого контакта из Keychain.",
      de: "Paarweise anonyme H5-Autorisierung für Servicekonten, mit dem Sitzungsschlüssel dieses Kontakts aus dem Keychain.",
      fr: "Autorisation H5 pairwise-anonyme pour les comptes service, avec la clé de session de ce contact depuis le Trousseau.",
      it: "Autorizzazione H5 a identità accoppiata per gli account servizio, con la chiave di sessione di quel contatto dal Keychain.",
      nl: "Paarsgewijs anonieme H5-autorisatie voor serviceaccounts, met de sessiesleutel van dat contact uit de Keychain.",
      cs: "Párově anonymní autorizace H5 pro servisní účty, klíčem je session klíč daného kontaktu z Keychainu.",
      "zh-Hans": "服务号配对匿名 H5 授权，密钥是 Keychain 里该联系人的会话密钥。",
      "zh-Hant": "服務號配對匿名 H5 授權，金鑰是 Keychain 裡該聯絡人的工作階段金鑰。",
      es: "Autorización H5 de identidad por par para cuentas de servicio, con la clave de sesión de ese contacto del LLavero.",
      pl: "Parowo anonimowa autoryzacja H5 kont usługowych, kluczem jest klucz sesji tego kontaktu z Pęku kluczy.",
      ja: "サービスアカウントのペア単位の匿名 H5 認可。鍵は Keychain にあるその連絡先のセッション鍵です。",
      th: "การอนุญาต H5 แบบนิรนามรายคู่ของบัญชีบริการ ใช้คีย์เซสชันของติดต่อรายนั้นจาก Keychain",
      fi: "Paljuittain anonyymi H5-kirjautuminen palvelintileille, avaimena kyseisen yhteystiedon istuntoavain Keychainista.",
      uk: "Попарно анонімна H5-авторизація сервіс-акаунтів на ключі сесії цього контакту з Keychain.",
      bg: "Двойково анонимно H5 удостоверяване за сервизни профили, с ключа от сесията на този контакт в Keychain.",
      tr: "Hizmet hesapları için çift bazlı anonim H5 yetkilendirmesi; anahtar, Keychain’deki o kişinin oturum anahtarı.",
      hu: "Szolgáltatási fiókok páronként névtelen H5-hitelesítése, a kulcs az adott névjegy munkamenetkulcsa a Keychainben.",
    },
  },
  {
    primitive: "PBKDF2-HMAC-SHA256", status: "verified",
    cites: ["apps/ios/Shared/Features/AntiTheftDuress/PopopxDuressAuthManager.swift:341-345"],
    use: {
      en: "Derives the duress password, 100,000 rounds.",
      ru: "Выводит пароль принуждения, 100 000 итераций.",
      de: "Leitet das Zwangspasswort ab, 100.000 Runden.",
      fr: "Dérive le mot de passe de contrainte, 100 000 tours.",
      it: "Deriva la password di costrizione, 100.000 iterazioni.",
      nl: "leidt het dwangwachtwoord af, 100.000 rondes.",
      cs: "Odvozuje heslo nátlaku, 100 000 cyklů.",
      "zh-Hans": "胁迫密码的派生，100,000 轮。",
      "zh-Hant": "脅迫密碼的派生，100,000 輪。",
      es: "Deriva la contraseña de coacción, 100.000 rondas.",
      pl: "Wyprowadza hasło przymusu, 100 000 rund.",
      ja: "脅迫パスワードの導出、100,000 ラウンド。",
      th: "สร้างรหัสภายใต้การบีบบังคับ 100,000 รอบ",
      fi: "Johtaa pakotetun salasanan, 100 000 kierrosta.",
      uk: "Виводить пароль примусу, 100 000 ітерацій.",
      bg: "Извежда паролата при принуда, 100 000 итерации.",
      tr: "Zorlama parolasını türetir, 100.000 tur.",
      hu: "A kényszerjelszó levezetése, 100 000 kör.",
    },
  },
  {
    primitive: "ECDSA P-256", status: "boundary",
    cites: ["apps/ios/Shared/Features/BadgeCredits/PopopxBadgeCreditsModels.swift:1535,1576-1578"],
    use: {
      en: "Signs commerce badge and credit payloads — deliberately not Ed25519.",
      ru: "Подписывает данные коммерческих бейджей и кредитов — намеренно не Ed25519.",
      de: "Signiert Commerce-Badge- und Guthriftendaten – bewusst nicht Ed25519.",
      fr: "Signe les charges des badges commerciaux et des crédits — volontairement pas Ed25519.",
      it: "Firma i payload dei badge commerciali e dei crediti — deliberatamente non Ed25519.",
      nl: "Ondertekent handelsbadge- en creditgegevens — bewust niet Ed25519.",
      cs: "Podepisuje payload obchodních odznak a kreditů — záměrně ne Ed25519.",
      "zh-Hans": "为商业徽章与积分载荷签名，这里刻意不是 Ed25519。",
      "zh-Hant": "為商業徽章與積分載具簽章，這裡刻意不是 Ed25519。",
      es: "Firma las cargas de insignias comerciales y créditos — a propósito no es Ed25519.",
      pl: "Podpisuje dane odznak handlowych i kredytów — celowo nie Ed25519.",
      ja: "コマースのバッジとクレジットの署名は意図的に Ed25519 ではありません。",
      th: "เซ็นลายกำกับป้ายพาณิชย์และเครดิต — ไม่ใช่ Ed25519 โดยเจตนา",
      fi: "Allekirjoittaa kaupallisten merkkien ja hyvitysten tiedot — tietoisen ei-Ed25519.",
      uk: "Підписує дані комерційних бейджів і кредитів — свідомо не Ed25519.",
      bg: "Подписва данните за търговски значки и кредити — умишлено не е Ed25519.",
      tr: "Ticari rozet ve kredi yüklerini imzalar — bilinçli olarak Ed25519 değil.",
      hu: "Kereskedeli jelvény- és kreditadatokat ír alá — szándékosan nem Ed25519.",
    },
  },
  {
    primitive: "LZFSE", status: "verified",
    cites: ["apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:11-15,731,735-738,741,743-745,846", "apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:5,32"],
    use: {
      en: "Apple's Compression framework, chunked streaming into .ppxlz with magic PPXLZ1, kept only when it saves at least 15% — and it is not zstd.",
      ru: "Фреймворк Compression, потоковое сжатие по частям в .ppxlz с магией PPXLZ1; остаётся только при экономии от 15% — и это не zstd.",
      de: "Apples Compression-Framework, chunkiges Streaming in .ppxlz mit Magie PPXLZ1, behalten nur bei mindestens 15% Ersparnis – und es ist kein zstd.",
      fr: "Le framework Compression d’Apple, flux par blocs vers .ppxlz avec le magic PPXLZ1, conservé s’il économise au moins 15 % — et ce n’est pas du zstd.",
      it: "Il framework Compression di Apple, streaming a blocchi in .ppxlz con magic PPXLZ1, tenuto solo se risparmia almeno il 15% — e non è zstd.",
      nl: "Apple's Compression-framework, chunkgewijs streamen naar .ppxlz met magic PPXLZ1, alleen bewaard als het minstens 15% scheelt — en het is geen zstd.",
      cs: "Apple framework Compression, streamování po částech do .ppxlz s magickým číslem PPXLZ1, zachováno jen při úspoře ≥15 % — a není to zstd.",
      "zh-Hans": "苹果 Compression 框架分块流式压缩进 .ppxlz（魔数 PPXLZ1），只有收益 ≥15% 才保留，并且它不是 zstd。",
      "zh-Hant": "蘋果 Compression 框架分塊串流壓縮進 .ppxlz（魔數 PPXLZ1），只有收益 ≥15% 才保留，而且它不是 zstd。",
      es: "El framework Compression de Apple, flujo en bloques hacia .ppxlz con mágica PPXLZ1, guardado solo si ahorra al menos 15 % — y no es zstd.",
      pl: "Framework Compression Apple, strumieniowe pakowanie porcjami do .ppxlz z magią PPXLZ1, zostaje tylko przy oszczędności ≥15% — i to nie jest zstd.",
      ja: "Apple の Compression フレームワークをチャンクストリームで .ppxlz（マジックナンバー PPXLZ1）へ。節約 15% 以上のみ採用し、zstd ではありません。",
      th: "เฟรมเวิร์ก Compression ของแอปเปิล บีบอัดแบบสตรีมเป็นบล็อกลง .ppxlz (ค่าวิเศษ PPXLZ1) เก็บไว้เมื่อลดได้ ≥15% เท่านั้น และไม่ใช่ zstd",
      fi: "Applen Compression-framework, lohkoina striimaava .ppxlz-arkku taianumerolla PPXLZ1; säilyy vain vähintään 15 % säästönä — eikä ole zstd.",
      uk: "Фреймворк Compression від Apple, потокове стискання частинами в .ppxlz з магією PPXLZ1, лишається лише якщо економить щонайменше 15% — і це не zstd.",
      bg: "Компресийната рамка Compression на Apple: потоково свиване на блокове в .ppxlz с магически номер PPXLZ1, запазва се само при икономия ≥15% — и не е zstd.",
      tr: "Apple'ın Compression framework’ü, PPXLZ1 büyüsüyle .ppxlz içine parçalı akış; yalnızca en az %15 tasarruf varsa korunur — zstd değildir.",
      hu: "Az Apple Compression frameworkje, darabolt streameléssel .ppxlz-be PPXLZ1 bűvös számmal; csak legalább 15%-os megtakarításnál marad meg — és nem zstd.",
    },
  },
];

const PANEL_POINTS: readonly { readonly chip: string; readonly cites: readonly string[]; readonly text: Localized<string> }[] = [
  {
    chip: "rcvServer · sndServer", cites: ["apps/ios/POPOPXChat/APITypes.swift:589-615"],
    text: {
      en: "Per connection there is one receive queue and one send queue, and each type carries a single server field — no relationship column.",
      ru: "На каждое соединение — одна входящая и одна исходящая очередь, и в каждом типе одно серверное поле; колонки связей нет.",
      de: "Pro Verbindung gibt es eine Empfangs- und eine Send-Queue, jeder Typ hat genau ein Serverfeld — keine Beziehungsspalte.",
      fr: "Par connexion, une file de réception et une file d’envoi, et chaque type ne porte qu’un champ serveur — aucune colonne de relation.",
      it: "Per connessione una coda di ricezione e una di invio, e ogni tipo porta un solo campo server — nessuna colonna di relazione.",
      nl: "Per verbinding één ontvangst- en één zendwachtrij, en elk type draagt één serverveld — geen relatiekolom.",
      cs: "Na každé připojení je jedna přijímací a jedna odesílací fronta a každý typ nese jediné serverové pole — žádný sloupec vztahů.",
      "zh-Hans": "每个连接各有一收一发两条队列，类型里只有一个服务器字段，没有承载关系的列。",
      "zh-Hant": "每個連線各有一收一發兩條佇列，型別裡只有一個伺服器欄位，沒有承載關係的欄位。",
      es: "Por conexión hay una cola de recepción y una de envío, y cada tipo lleva un único campo de servidor — sin columna de relación.",
      pl: "Na każde połączenie przypada jedna kolejka odbioru i jedna wysyłki, a każdy typ ma jedno pole serwera — bez kolumny relacji.",
      ja: "接続ごとに受信・送信の 1 対のキューがあり、型が持つサーバー項目は 1 つだけで関係を表す列はありません。",
      th: "ต่อการเชื่อมต่อมีคิวรับหนึ่งคิวกับคิวส่งหนึ่งคิว และแต่ละชนิดมีฟิลด์เซิร์ฟเวอร์ฟิลด์เดียว — ไม่มีคอลัมน์ความสัมพันธ์",
      fi: "Yhteyttä kohti on yksi vastaanotto- ja yksi lähetysjono, ja kussakin tyypissä on yksi palvelinkenttä — ei suhdesaraketta.",
      uk: "На кожне з’єднання — одна черга приймання й одна надсилання, і кожен тип несе єдине серверне поле — без колонки зв’язків.",
      bg: "На всяка връзка има една приемаща и една изпращаща опашка, и всеки тип носи единично сървърно поле — без колона за връзки.",
      tr: "Bağlantı başına bir alma ve bir gönderme kuyruğu vardır, her tip tek bir sunucu alanı taşır — ilişki sütunu yok.",
      hu: "Kapcsolatonként egy fogadó és egy küldő sor van, és minden típus egyetlen szervermezőt tartalmaz — nincs kapcsolat oszlop.",
    },
  },
  {
    chip: "userAddress : UserContactLink?",
    cites: ["apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83", "apps/ios/Shared/Model/ChatModel.swift:426", "apps/ios/Shared/Components/PopopxControls.swift:245"],
    text: {
      en: "No phone number, no email, no global public key; the optional userAddress is a one-time UserContactLink, and no model carries a phoneNumber field.",
      ru: "Ни номера телефона, ни почты, ни глобального публичного ключа; необязательный userAddress — одноразовый UserContactLink, поля phoneNumber в моделях нет.",
      de: "Keine Telefonnummer, kein E-Mail, kein globaler öffentlicher Schlüssel; das optionale userAddress ist ein einmaliger UserContactLink, kein Modell hat ein phoneNumber-Feld.",
      fr: "Pas de numéro, pas d’e-mail, pas de clé publique globale ; le userAddress optionnel est un UserContactLink à usage unique, aucun modèle n’a de champ phoneNumber.",
      it: "Nessun numero, nessuna email, nessuna chiave pubblica globale; il userAddress opzionale è un UserContactLink monouso e nessun modello ha un campo phoneNumber.",
      nl: "Geen telefoonnummer, geen e-mail, geen globale publieke sleutel; de optionele userAddress is een eenmalige UserContactLink, en geen model kent een phoneNumber-veld.",
      cs: "Žádné telefonní číslo, žádný e-mail, žádný globální veřejný klíč; nepovinné userAddress je jednorázový UserContactLink a žádný model nemá pole phoneNumber.",
      "zh-Hans": "不绑定手机号与邮箱，也没有全局公钥；可选的 userAddress 是一次性 UserContactLink，模型里也不存在 phoneNumber 字段。",
      "zh-Hant": "不綁定手機號與電子郵件，也沒有全域公鑰；選填的 userAddress 是一次性 UserContactLink，模型裡也不存在 phoneNumber 欄位。",
      es: "Sin número de teléfono, sin correo, sin clave pública global; el userAddress opcional es un UserContactLink de un solo uso y ningún modelo tiene campo phoneNumber.",
      pl: "Ani numer telefonu, ani e-mail, ani globalny klucz publiczny; opcjonalny userAddress to jednorazowy UserContactLink, a żaden model nie ma pola phoneNumber.",
      ja: "電話番号もメールもグローバル公開鍵もなし。任意の userAddress は使い切りの UserContactLink で、phoneNumber フィールドはどのモデルにもありません。",
      th: "ไม่ผูกเบอร์โทร อีเมล หรือคีย์สาธารณะกลาง userAddress ที่เลือกใส่ได้คือ UserContactLink ใช้ครั้งเดียว และไม่มีโมเดลใดมีฟิลด์ phoneNumber",
      fi: "Ei puhelinnumeroa, ei sähköpostia, ei globaalia julkista avainta; valinnainen userAddress on kertakäyttöinen UserContactLink, eikä malleissa ole phoneNumber-kenttää.",
      uk: "Ні номера телефону, ні пошти, ні глобального відкритого ключа; необов’язковий userAddress — одноразовий UserContactLink, і в моделях немає поля phoneNumber.",
      bg: "Няма телефонен номер, имейл или глобален публичен ключ; необвързващият userAddress е еднократен UserContactLink и никой модел няма поле phoneNumber.",
      tr: "Telefon numarası, e-posta veya genel açık anahtar yok; opsiyonel userAddress tek kullanımlık bir UserContactLink, hiçbir modelde phoneNumber alanı yok.",
      hu: "Nincs telefonszám, nincs e-mail, nincs globális publikus kulcs; az opcionális userAddress egy egyszeri UserContactLink, és egyetlen modellben sincs phoneNumber mező.",
    },
  },
  {
    chip: "protocol property", cites: [],
    text: {
      en: "“The relay holds no social graph” is a property of the open protocol, not something iOS code can prove — so this panel lists only the fields the client types actually show.",
      ru: "«Реле не держит социальный граф» — свойство открытого протокола, а не то, что доказывает код iOS; панель перечисляет только видимые поля типов клиента.",
      de: "„Das Relay hält keinen Sozialgraphen“ ist eine Eigenschaft des offenen Protokolls, kein Beweis aus iOS-Code — die Liste zeigt nur die Felder der Client-Typen.",
      fr: "« Le relais ne détient aucun graphe social » est une propriété du protocole ouvert, pas une preuve tirée du code iOS ; ce panneau ne liste que les champs vus par le client.",
      it: "“Il relay non conserva alcun grafo sociale” è una proprietà del protocollo aperto, non una prova ricavabile dal codice iOS; questo pannello elenca solo i campi dei tipi client.",
      nl: "“Het relay bevat geen sociaal graf” is een eigenschap van het open protocol, geen bewijs uit iOS-code — dit paneel noemt alleen de velden die de clienttypes tonen.",
      cs: "„Relay nedrží sociální graf“ je vlastností otevřeného protokolu, nikoli důkazem z iOS kódu — panel vyjmenovává jen pole, která typy klienta ukazují.",
      "zh-Hans": "“中继不持有社交图谱”是开放协议的性质，不是 iOS 代码能证明的事，所以本栏只列客户端类型真正展示的字段。",
      "zh-Hant": "「中繼不持有社交圖譜」是開放協定的性質，不是 iOS 程式碼能證明的事，因此本欄只列客戶端型別真正展示的欄位。",
      es: "«El relé no conserva ningún grafo social» es una propiedad del protocolo abierto, no algo que el código de iOS pueda demostrar; este panel solo lista los campos de los tipos del cliente.",
      pl: "„Przekaźnik nie przechowuje grafu społecznego” to własność otwartego protokołu, a nie dowód z kodu iOS — ten panel wymienia jedynie pola widoczne w typach klienta.",
      ja: "「中継側にソーシャルグラフが無い」はオープン プロトコルの性質であり、iOS コードで証明できる事実ではありません。この欄は型が見せる項目だけを挙げています。",
      th: "“ตัวกลางไม่เก็บกราฟทางสังคม” เป็นคุณสมบัติของโปรโตคอลเปิด ไม่ใช่สิ่งที่โค้ด iOS พิสูจน์ได้ แผงนี้จึงแสดงเฉพาะฟิลด์ที่ชนิดข้อมูลของไคลเอนต์แสดงจริง",
      fi: "”Välityspalvelimella ei ole sosiaalista graafia” on avoimen protokollan ominaisuus, ei iOS-koodista todistettavissa — paneeli listaa vain client-tyyppien kentät.",
      uk: "«Релей не зберігає соціального графу» — властивість відкритого протоколу, а не те, що доводить код iOS; цей блок перелічує лише поля типів клієнта.",
      bg: "„Релеят не пази социален граф“ е свойство на отворения протокол, не нещо, което iOS кодът може да докаже — този панел изброява само полетата на клиентските типове.",
      tr: "“Aktarma sunucuda sosyal graf yok” açık protokolün bir özelliğidir, iOS kodunun kanıtlayabileceği bir şey değil; bu panel yalnızca istemci tiplerinin gösterdiği alanları listeler.",
      hu: "„A továbbító szerver nem tárol közösségi gráfot” a nyílt protokoll tulajdonsága, nem az iOS-kódból bizonyítható — ez a panel csak a kliens típusai által mutatott mezőket sorolja fel.",
    },
  },
];

/** The one primitive the client does *not* implement — stated, not claimed. */
const RATCHET_NOTE: Localized<string> = {
  en: "The double ratchet sits on the core side: Swift only surfaces ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), so this page never calls it an iOS Swift implementation.",
  ru: "Двойной рэтчет живёт на стороне ядра: Swift показывает лишь ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), поэтому страница не называет его реализацией на Swift для iOS.",
  de: "Der Double Ratchet sitzt auf der Kernseite: Swift stellt nur ratchetSync* bereit (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), darum behauptet diese Seite keine iOS-Swift-Implementierung.",
  fr: "Le double ratchet est du côté du noyau : Swift n’expose que ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), cette page ne l’appelle donc pas une implémentation Swift iOS.",
  it: "Il double ratchet vive lato core: il Swift espone solo ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), quindi questa pagina non lo chiama implementazione Swift per iOS.",
  nl: "De double ratchet zit aan de core-kant: Swift toont alleen ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), dus deze pagina noemt het geen iOS-Swift-implementatie.",
  cs: "Dvojité broušení je na straně jádra: Swift ukazuje jen ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), takže tato stránka z toho nedělá implementaci v Swiftu pro iOS.",
  "zh-Hans": "双重棘轮在核心侧：Swift 层只透出 ratchetSync*（apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18），所以本页从不称它是 iOS Swift 实现。",
  "zh-Hant": "雙重棘輪在核心端：Swift 層只透出 ratchetSync*（apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18），所以本頁從不稱它是 iOS Swift 實作。",
  es: "El doble ratchet está en el núcleo: Swift solo expone ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), así que esta página no lo presenta como implementación en Swift para iOS.",
  pl: "Podwójny ratchet jest po stronie rdzenia: Swift ujawnia tylko ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), więc ta strona nie nazywa go implementacją w Swift dla iOS.",
  ja: "ダブルラチェットはコア側にあり、Swift が見せるのは ratchetSync*（apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18）だけなので、このページは iOS Swift 実装とは呼びません。",
  th: "ดับเบิลแรทเช็ตอยู่ที่ฝั่งคอร์: Swift เผยแค่ ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18) หน้านี้จึงไม่เรียกว่าเป็นการทำใน iOS ด้วย Swift",
  fi: "Double ratchet on ytimen puolella: Swift näyttää vain ratchetSync*:n (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), joten tämä sivu ei kutsu sitä iOS-Swift-toteutukseksi.",
  uk: "Подвійний ретчет — на боці ядра: Swift показує лише ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), тому ця сторінка не називає його реалізацією на Swift для iOS.",
  bg: "Двойният речет е от страната на ядрото: Swift показва само ratchetSync* (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), затова тази страница не го нарича Swift имплементация за iOS.",
  tr: "Çift ratchet çekirdek tarafında: Swift yalnızca ratchetSync*'i dışa vurur (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), bu yüzden bu sayfa ona iOS Swift implementasyonu demez.",
  hu: "A dupla recés a mag oldalán van: a Swift csak a ratchetSync* mezőket mutatja (apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18), ezért ez az oldal nem nevezi iOS Swift-megvalósításnak.",
};


/** Locale-free ledger excerpt: the four load-bearing citations, copy-paste ready. */
const LEDGER_CODE = [
  "X25519             apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5,356,618-632,644",
  "ChaCha20-Poly1305  apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:125,128,175,219 · apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Groups/PopopxGroupCrypto.swift:123,153-157",
  "AES-256-GCM        apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:103,121-123",
  "Ed25519            apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:381-383,516-523  (k-ad1dc5463a)",
].join("\n");

export function SecurityArchitecture(): ReactElement {
  const { locale } = useLocale();

  return (
    <section id="security" aria-label={pick(HEAD.title, locale)} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading
          eyebrow={HEAD.eyebrow}
          title={HEAD.title}
          subtitle={HEAD.subtitle}
          titleAs="h1"
        />
        {/* ── data flow, device to relay ─────────────────────────────── */}
        <div className="glass mt-10 p-5 sm:p-7">
          <p className="eyebrow">{pick(HEAD.flowTitle, locale)}</p>
          <ol className="no-scrollbar mt-5 flex items-stretch gap-2 overflow-x-auto pb-1">
            {FLOW.map((stage, i) => (
              <li key={stage.index} className="flex min-w-[268px] shrink-0 items-stretch gap-2">
                <div className="glass-inset flex w-full flex-col gap-2.5 p-4">
                  <div className="flex items-center gap-2">
                    <span aria-hidden className={`font-mono text-[15px] font-semibold ${stage.tone === "mesh" ? "text-mesh-soft" : "text-brand-soft"}`}>{stage.index}</span>
                    <StatusDot tone={stage.tone} pulse={i === 0} />
                    <code className="chip ml-auto font-mono text-[10px] text-[#d7d7ea]">{stage.chip}</code>
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-mute">{pick(stage.label, locale)}</p>
                  <ul className="hairline-top mt-auto flex flex-col gap-1 pt-2.5 font-mono text-[10.5px] leading-snug text-faint">
                    {stage.cites.map((cite) => (<li key={cite}>{cite}</li>))}
                  </ul>
                </div>
                {stage.arrow.length > 0 ? (
                  <div className="flex w-[78px] shrink-0 flex-col items-center justify-center gap-1">
                    <svg aria-hidden viewBox="0 0 78 12" className="h-3 w-full text-brand-soft">
                      <line x1="0" y1="6" x2="64" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="5 4" /><path d="M78 2 L66 6 L78 10 Z" fill="currentColor" />
                    </svg>
                    <span className="max-w-full truncate font-mono text-[9.5px] text-faint">{stage.arrow}</span>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
        {/* ── cryptography verification table ────────────────────────── */}
        <div className="glass mt-6 p-5 sm:p-7">
          <h3 className="text-[15px] font-semibold text-white sm:text-[17px]">{pick(HEAD.tableTitle, locale)}</h3>
          <div className="no-scrollbar mt-4 overflow-x-auto">
            <table className="w-full min-w-[880px] border-separate border-spacing-0 text-left text-[12px] leading-relaxed">
              <thead>
                <tr>
                  <th scope="col" className="w-[172px] border-b border-hair pb-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-brand-soft">{pick(HEAD.colPrimitive, locale)}</th>
                  <th scope="col" className="border-b border-hair pb-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-brand-soft">{pick(HEAD.colUse, locale)}</th>
                  <th scope="col" className="w-[268px] border-b border-hair pb-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-brand-soft">{COL_CITE}</th>
                  <th scope="col" className="border-b border-hair pb-2 text-[11px] font-semibold uppercase tracking-wider text-brand-soft">{pick(HEAD.colStatus, locale)}</th>
                </tr>
              </thead>
              <tbody>
                {CRYPTO.map((row) => (
                  <tr key={row.primitive}>
                    <th scope="row" className="border-b border-hair py-3.5 pr-4 text-left align-top font-mono text-[12px] font-semibold text-white">{row.primitive}</th>
                    <td className="border-b border-hair py-3.5 pr-4 align-top text-mute">{pick(row.use, locale)}</td>
                    <td className="border-b border-hair py-3.5 pr-4 align-top">
                      <ul className="flex flex-col gap-1 font-mono text-[10.5px] leading-snug text-faint">
                        {row.cites.map((cite) => (<li key={cite}>{cite}</li>))}
                      </ul>
                    </td>
                    <td className="border-b border-hair py-3.5 align-top">
                      <span className="pill whitespace-nowrap py-0.5 text-[10.5px]">
                        <StatusDot tone={row.status === "verified" ? "mesh" : "warn"} />
                        <span className={row.status === "verified" ? "text-mesh-soft" : "text-warn-soft"}>{pick(STATUS_LABEL[row.status], locale)}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <CodeBlock code={LEDGER_CODE} caption={pick(RATCHET_NOTE, locale)} showCopy={false} maxHeightClass="max-h-[150px]" />
          </div>
        </div>
        {/* ── what the client types say the relay sees ───────────────── */}
        <div className="glass mt-6 p-5 sm:p-7">
          <p className="eyebrow">{pick(HEAD.panel, locale)}</p>
          <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-3">
            {PANEL_POINTS.map((point) => (
              <li key={point.chip} className="glass-inset flex flex-col gap-2 p-4">
                <code className="break-words font-mono text-[10.5px] text-white">{point.chip}</code>
                <p className="text-[12px] leading-relaxed text-mute">{pick(point.text, locale)}</p>
                {point.cites.length > 0 ? (
                  <ul className="hairline-top flex flex-col gap-1 pt-2 font-mono text-[10px] text-faint">
                    {point.cites.map((cite) => (<li key={cite} className="break-words">{cite}</li>))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="hairline-top mt-5 text-[11.5px] leading-relaxed text-faint">
            {pick(HEAD.closing, locale)}{" "}
            <a href={IOS_REPO_URL} target="_blank" rel="noreferrer" className="text-brand-soft underline decoration-brand/50 underline-offset-2">popopx-chat</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

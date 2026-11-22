"use client";

import type { ReactElement } from "react";
import { CodeBlock, SectionHeading, StatusDot } from "@/components/ui";
import { pick, useLocale, type Localized } from "@/lib/i18n";
import { IOS_REPO_URL } from "@/lib/site";

/**
 * Three architectures on five engineering questions.
 *
 * The POPOPX column is read out of the iOS client repository (`popopx-chat`,
 * default branch `master`); every one of its cells carries a `file:line`
 * citation so the sentence can be diffed against the source:
 *   Shared/Views/Onboarding/OnboardingView.swift:83        no phone number, no email, no global public key
 *   POPOPXChat/APITypes.swift:589-615,597-604              one RcvQueueInfo / SndQueueInfo pair per connection
 *   PopopxBLETransport.swift:5,26,45-49                    dual-role CoreBluetooth GATT, not the Mesh profile
 *   PopopxMediaEngine.swift:366-378 (drop at :375)         no metadata dictionary => EXIF/GPS gone
 *   Shared/Features/ServiceAccount/BotMenuBarView.swift:40-42  two menu levels, 3 x 5 cap
 * The other two columns stay at category level on purpose: no product is named
 * and no internal detail of a third-party service is asserted.
 */

type Verdict = "full" | "partial" | "none";
type ColumnId = "popopx" | "central" | "e2ee";

/** One matrix cell: a verdict symbol plus a one-line engineering reason. */
type Cell = { readonly v: Verdict; readonly t: Localized<string> };

/** One question row. `cites` are locale-free `file:line` strings from the client. */
type Dimension = {
  readonly id: string; readonly mark: string; readonly label: Localized<string>;
  readonly cites: readonly string[]; readonly cells: Record<ColumnId, Cell>;
};

const HEAD = {
  eyebrow: {
    en: "Architecture-level comparison",
    ru: "Сравнение на уровне архитектуры",
    de: "Architekturvergleich",
    fr: "Comparaison au niveau de l’architecture",
    it: "Confronto a livello di architettura",
    nl: "Vergelijk op architectuurniveau",
    cs: "Srovnání na úrovni architektury",
    "zh-Hans": "架构层面的对比",
    "zh-Hant": "架構層面的對比",
    es: "Comparación a nivel de arquitectura",
    pl: "Porównanie na poziomie architektury",
    ja: "アーキテクチャ水準の比較",
    th: "เปรียบเทียบระดับสถาปัตยกรรม",
    fi: "Vertailu arkkitehtuuritasolla",
    uk: "Порівняння на рівні архітектури",
    bg: "Сравнение на архитектурно ниво",
    tr: "Mimari düzeyinde karşılaştırma",
    hu: "Architektúraszintű összehasonlítás",
  },
  title: {
    en: "Three architectures on five engineering questions",
    ru: "Три архитектуры в ответ на пять инженерных вопросов",
    de: "Drei Architekturen auf fünf ingenieurstechnische Fragen",
    fr: "Trois architectures face à cinq questions d’ingénierie",
    it: "Tre architetture su cinque domande ingegneristiche",
    nl: "Drie architecturen op vijf technische vragen",
    cs: "Tři architektury na pět inženýrských otázek",
    "zh-Hans": "三种架构，五个工程问题",
    "zh-Hant": "三種架構，五個工程問題",
    es: "Tres arquitecturas ante cinco preguntas de ingeniería",
    pl: "Trzy architektury wobec pięciu inżynierskich pytań",
    ja: "5 つの技術質問に対する 3 種類のアーキテクチャ",
    th: "สามสถาปัตยกรรมกับห้าคำถามเชิงวิศวกรรม",
    fi: "Kolme arkkitehtuuria viidelle insinöörikysymykselle",
    uk: "Три архітектури на п’ять інженерних питань",
    bg: "Три архитектури на пет инженерни въпроса",
    tr: "Beş mühendislik sorusunda üç mimari",
    hu: "Három architektúra öt mérnöki kérdésre",
  },
  subtitle: {
    en: "The POPOPX column is this iOS client and each of its cells cites file:line in the public repository. The other two columns describe category-defining architecture in neutral engineering terms: no product is named and no internal detail of anyone else’s service is asserted.",
    ru: "Колонка POPOPX — этот iOS-клиент, и каждая ячейка ссылается на файл:строку в открытом репозитории. Две другие колонки описывают архитектуру класса нейтральными инженерными словами: продукт не называется и ничего о внутренностях чужого сервиса не утверждается.",
    de: "Die POPOPX-Spalte ist dieser iOS-Client, jede Zelle zitiert Datei:Zeile im öffentlichen Repository. Die zwei anderen Spalten beschreiben die gattungsdefinierende Architektur in neutralen technischen Begriffen: kein Produkt wird genannt, keine Internals eines fremden Dienstes behauptet.",
    fr: "La colonne POPOPX est ce client iOS et chaque case cite fichier:ligne dans le dépôt public. Les deux autres colonnes décrivent l’architecture de catégorie en termes d’ingénierie neutres : aucun produit n’est nommé, aucun détail interne d’un service tiers n’est affirmé.",
    it: "La colonna POPOPX è questo client iOS e ogni cella cita file:riga nel repository pubblico. Le altre due colonne descrivono l’architettura di categoria in termini ingegneristici neutri: nessun prodotto è nominato e nessun dettaglio interno di servizi altrui è asserito.",
    nl: "De POPOPX-kolom is deze iOS-cliënt en elke cel citeert bestand:regel in de openbare repository. De andere twee kolommen beschrijven de categoriearchitectuur in neutrale technische termen: geen product wordt genoemd en er wordt niets over de internals van andermans dienst beweerd.",
    cs: "Sloupec POPOPX je tento iOS klient a každá buňka cituje soubor:řádek ve veřejném repozitáři. Zbývající dva sloupce popisují architekturu kategorie neutrálními inženýrskými slovy: žádné jméno produktu, žádné tvrzení o vnitřcích cizí služby.",
    "zh-Hans": "POPOPX 列就是本 iOS 客户端，每一格都给出公开仓库里的 文件:行 引用。另外两列只用中性的工程语言描述品类的定义性架构：不点名任何产品，也不断言他人服务的内部实现。",
    "zh-Hant": "POPOPX 欄就是本 iOS 用戶端，每一格都给出公開倉庫裡的 檔案:行 引用。另外兩欄只用中性工程語言描述品類的定義性架構：不點名任何產品，也不斷言他人服務的內部實作。",
    es: "La columna POPOPX es este cliente de iOS y cada celda cita archivo:línea en el repositorio público. Las otras dos columnas describen la arquitectura de categoría en términos neutros de ingeniería: no se nombra ningún producto ni se afirma ningún detalle interno de otro servicio.",
    pl: "Kolumna POPOPX to ten klient iOS i każda komórka cytuje plik:wiersz w publicznym repozytorium. Pozostałe dwie kolumny opisują architekturę kategorii neutralnymi, inżynierskimi słowami: żadna nazwa produktu, żadne twierdzenie o wnętrzu cudzej usługi.",
    ja: "POPOPX 列はこの iOS クライアントそのもので、各マスは公開リポジトリの ファイル:行 を引用します。残り 2 列は中立な技術用語でジャンル定義上のアーキテクチャだけを述べ、製品名にも第三者サービスの内部実装にも触れません。",
    th: "คอลัมน์ POPOPX คือไคลเอนต์ iOS ตัวนี้ และทุกช่องอ้างถึง ไฟล์:บรรทัด ในรีโปสาธารณะ ส่วนอีกสองคอลัมน์อธิบายสถาปัตยกรรมของหมวดด้วยถ้อยคำวิศวกรรมที่เป็นกลาง ไม่ระบุชื่อผลิตภัณฑ์ และไม่อ้างรายละเอียดภายในของบริการผู้อื่น",
    fi: "POPOPX-sarake on tämä iOS-asiakas, ja jokainen ruutu lainaa tiedosto:rivi julkisesta repositoriossa. Kaksi muuta saraketta kuvaavat kategorian arkkitehtuurin neutraalein teknisin termein: tuotetta ei nimetä eikä toisen palvelun sisäisiä yksityiskohtia väitetä.",
    uk: "Колонка POPOPX — це цей iOS-клієнт, і кожна комірка цитує файл:рядок у відкритому репозиторії. Дві інші колонки описують архітектуру категорії нейтральними інженерними словами: жодної назви продукту й жодних тверджень про внутрішні деталі чужого сервісу.",
    bg: "Колоната POPOPX е този iOS клиент и всяка клетка цитира файл:ред в публичното хранилище. Другите две колони описват архитектурата на категорията с неутрални технически термини: не се назовава продукт и не се твърди нищо за вътрешните неща на чужда услуга.",
    tr: "POPOPX sütunu bu iOS istemcisidir ve her hücre herkese açık depoda dosya:satır alıntısı var. Diğer iki sütun kategorinin tanımlayıcı mimarisini nötr mühendislik terimleriyle anlatır: hiçbir ürün adlandırılmaz, başkasının hizmetinin iç detayı iddia edilmez.",
    hu: "A POPOPX oszlop ez maga az iOS kliens, és minden cella fájl:sor hivatkozást kap a nyilvános repóban. A másik két oszlop a kategória meghatározó architektúráját semleges mérnöki szóval írja le: egyetlen terméknevet sem mondunk, sem más szolgáltatás belső részletét nem állítjuk.",
  },
  legendHead: {
    en: "Legend", ru: "Легенда", de: "Legende", fr: "Légende", it: "Legenda",
    nl: "Legenda", cs: "Legenda", "zh-Hans": "图例", "zh-Hant": "圖例",
    es: "Leyenda", pl: "Legenda", ja: "凡例", th: "สัญลักษณ์", fi: "Selite",
    uk: "Легенда", bg: "Легенда", tr: "Gösterge", hu: "Jelmagyarázat",
  },
  colQuestion: {
    en: "Question", ru: "Вопрос", de: "Frage", fr: "Question", it: "Domanda",
    nl: "Vraag", cs: "Otázka", "zh-Hans": "问题", "zh-Hant": "問題",
    es: "Pregunta", pl: "Pytanie", ja: "質問", th: "คำถาม", fi: "Kysymys",
    uk: "Питання", bg: "Въпрос", tr: "Soru", hu: "Kérdés",
  },
  legendNote: {
    en: "A filled dot means the property follows from the architecture itself; a half dot means it holds only under conditions or for part of the media; an open dot means the architecture does not provide it. The two category columns carry no citations because they describe a class of design, not an audited product.",
    ru: "Заполненная точка — свойство следует из самой архитектуры; половинная — держится лишь при условиях или для части медиа; пустая — архитектура этого не даёт. Две классовые колонки без ссылок: они описывают класс дизайна, а не проверенный продукт.",
    de: "Gefüllter Punkt: die Eigenschaft folgt aus der Architektur selbst; halber Punkt: sie gilt nur unter Bedingungen oder für einen Teil der Medien; offener Punkt: die Architektur bietet das nicht. Die zwei Gattungsspalten haben keine Zitate, weil sie eine Bauart beschreiben, kein geprüftes Produkt.",
    fr: "Point plein : la propriété découle de l’architecture elle-même ; demi-point : elle ne tient que sous conditions ou pour une partie des médias ; point creux : l’architecture ne la fournit pas. Les deux colonnes de catégorie sont sans citation parce qu’elles décrivent une famille de conception, pas un produit audité.",
    it: "Pieno: la proprietà discende dall’architettura stessa; mezzo: vale solo a condizioni date o per parte dei media; vuoto: l’architettura non la offre. Le due colonne di categoria non hanno citazioni perché descrivono una classe di progetto, non un prodotto verificato.",
    nl: "Gevulde stip: de eigenschap volgt uit de architectuur zelf; halve stip: alleen onder voorwaarden of voor een deel van de media; lege stip: de architectuur biedt het niet. De twee categoriekolommen hebben geen citaten, want ze beschrijven een ontwerpfamilie, geen geaudit product.",
    cs: "Plná tečka: vlastnost plyne z architektury samotné; půl tečky: platí jen za podmínek nebo pro část médií; prázdná: architektura to neposkytuje. Dva sloupce kategorie nemají citace, protože popisují třídu návrhu, ne auditovaný produkt.",
    "zh-Hans": "实心点表示该性质由架构本身保证；半点表示只在特定条件下成立，或只对部分媒体成立；空心点表示该架构不提供。另外两列没有引用，是因为它们描述的是一类设计，而不是经过审计的产品。",
    "zh-Hant": "實心點表示該性質由架構本身保證；半點表示只在特定條件下成立，或只對部分媒體成立；空心點表示該架構不提供。另外兩欄沒有引用，是因為它們描述的一類設計，而不是經過審計的產品。",
    es: "Punto lleno: la propiedad se sigue de la propia arquitectura; medio punto: solo vale bajo condiciones o para parte de los medios; punto hueco: la arquitectura no la ofrece. Las dos columnas de categoría no llevan citas porque describen una clase de diseño, no un producto auditado.",
    pl: "Pełna kropka: cecha wynika z samej architektury; pół kropki: trzyma tylko przy warunkach albo dla części mediów; pusta kropka: architektura tego nie daje. Dwie kolumny kategorii nie mają cytatów, bo opisują klasę rozwiązań, nie audytowany produkt.",
    ja: "塗り丸は性質がアーキテクチャ自体から従うことを、半丸は条件付きまたは一部のメディアのみであることを、白丸はそのアーキテクチャが提供しないことを意味します。残り 2 列は監査した製品ではなく設計の一分類を述べているため引用行がありません。",
    th: "จุดเต็ม หมายถึงคุณสมบัติเกิดจากตัวสถาปัตยกรรมเอง จุดครึ่ง หมายถึงใช้ได้เฉพาะเงื่อนไขหรือสื่อบางส่วน จุดวงกลม หมายความว่าสถาปัตยกรรมนั้นไม่ได้ให้ไว้ สองคอลัมน์หมวดไม่มีอ้างอิง เพราะอธิบายกลุ่มของการออกแบบ ไม่ใช่ผลิตภัณฑ์ที่ผ่านการตรวจสอบ",
    fi: "Täystäppä: ominaisuus seuraa arkkitehtuurista sellaisenaan; puolitäppä: pätee vain ehdoilla tai median osasta; ontto täppä: arkkitehtuuri ei sitä anna. Kahta kategoriasaraketta ei lainata, koska ne kuvaavat suunnitteluluokkaa, ei auditoitua tuotetta.",
    uk: "Заповнена крапка: властивість випливає з самої архітектури; напівкрапка: тримає лише за умов або для частини медіа; порожня крапка: архітектура цього не дає. Дві колонки категорії без цитат, бо описують клас проєктування, а не перевірений продукт.",
    bg: "Пълна точка: свойството следва от самата архитектура; половината: важи само при условия или за част от медиите; открита точка: архитектурата не го предоставя. Двете колони за категория нямат цитати, защото описват клас проекти, не одитиран продукт.",
    tr: "Dolu nokta: özellik mimarinin kendisinden gelir; yarım nokta: yalnız koşullarla veya medyanın bir kısmı için geçerlidir; açık nokta: mimari bunu sağlamaz. Kategori sütunlarında alıntı yok, çünkü bunlar denetlenmiş bir ürünü değil bir tasarım sınıfını anlatıyor.",
    hu: "Telepontos: a tulajdonság magából az architektúrából következik; félpontos: csak feltételekkel vagy a média egy részére áll; ürespontos: az architektúra nem nyújtja. A két kategoriaoszlopban nincs idézet, mert egy tervezési osztályt ír le, nem auditált terméket.",
  },
  closing: {
    en: "This is an architecture-level comparison, not a benchmark run. Every POPOPX row is checkable line by line in the open-source client,",
    ru: "Это сравнение на уровне архитектуры, а не замер скорости. Каждую строку POPOPX можно проверить построчно в открытом клиенте,",
    de: "Das ist ein Architekturvergleich, kein Benchmark. Jede POPOPX-Zeile lässt sich Zeile für Zeile im quelloffenen Client nachprüfen,",
    fr: "C’est une comparaison d’architecture, pas un banc d’essai. Chaque ligne POPOPX se vérifie ligne à ligne dans le client open source,",
    it: "Questo è un confronto di architettura, non un benchmark. Ogni riga POPOPX è verificabile riga per riga nel client open source,",
    nl: "Dit is een architectuurvergelijking, geen benchmark. Elke POPOPX-rij is regel voor regel na te kijken in de opensource-cliënt,",
    cs: "Tohle je srovnání architektur, ne benchmark. Každý řádek POPOPX lze řádek po řádce ověřit v open-source klientovi,",
    "zh-Hans": "这份对比停留在架构层面，不是跑分。POPOPX 的每一行都能在开源客户端里逐行核对，",
    "zh-Hant": "這份對比停留在架構層面，不是跑分。POPOPX 的每一行都能在開放原始碼用戶端裡逐行核對，",
    es: "Esta es una comparación de arquitectura, no un benchmark. Cada fila de POPOPX puede verificarse línea a línea en el cliente de código abierto,",
    pl: "To porównanie architektury, nie benchmark. Każdy wiersz POPOPX można sprawdzać wiersz po wierszu w kliencie open source,",
    ja: "これはアーキテクチャの比較であり、ベンチマークではありません。POPOPX の各行はオープンソースのクライアントで行ごとに確認できます。",
    th: "นี่เป็นการเปรียบเทียบระดับสถาปัตยกรรม ไม่ใช่การวัดประสิทธิภาพ ทุกแถวของ POPOPX ตรวจทีละบรรทัดได้ในไคลเอนต์โอเพนซอร์ส",
    fi: "Tämä on arkkitehtuurivertailu, ei benchmark. Jokaisen POPOPX-rivin voi tarkistaa rivi riviltä avoimen clientin koodista,",
    uk: "Це порівняння архітектур, а не бенчмарк. Кожен рядок POPOPX можна перевірити рядок за рядком у відкритому клієнті,",
    bg: "Това е сравнение на архитектури, не бенчмарк. Всеки ред на POPOPX може да се провери ред по ред в клиента с отворен код,",
    tr: "Bu bir mimari karşılaştırması, benchmark değil. Her POPOPX satırı açık kaynak istemcide satır satır doğrulanabilir,",
    hu: "Ez architektúraszintű összehasonlítás, nem benchmark. A POPOPX minden sora sorról sorra ellenőrizhető a nyílt forráskódú kliensben,",
  },
};

const COLUMNS: readonly { readonly id: ColumnId; readonly tag: string; readonly name: Localized<string> }[] = [
  {
    id: "popopx", tag: "popopx-chat · master", name: {
      en: "POPOPX (this client)", ru: "POPOPX (этот клиент)", de: "POPOPX (dieser Client)",
      fr: "POPOPX (ce client)", it: "POPOPX (questo client)", nl: "POPOPX (deze cliënt)",
      cs: "POPOPX (tento klient)", "zh-Hans": "POPOPX（本客户端）", "zh-Hant": "POPOPX（本用戶端）",
      es: "POPOPX (este cliente)", pl: "POPOPX (ten klient)", ja: "POPOPX（本クライアント）",
      th: "POPOPX (ไคลเอนต์นี้)", fi: "POPOPX (tämä client)", uk: "POPOPX (цей клієнт)",
      bg: "POPOPX (този клиент)", tr: "POPOPX (bu istemci)", hu: "POPOPX (ez a kliens)",
    },
  },
  {
    id: "central", tag: "category · no citations", name: {
      en: "Centralized social platform", ru: "Централизованная соцплатформа", de: "Zentralisierte Social-Plattform",
      fr: "Plateforme sociale centralisée", it: "Piattaforma social centralizzata", nl: "Centraliseerd social platform",
      cs: "Centralizovaná sociální platforma", "zh-Hans": "传统中心化社交平台", "zh-Hant": "傳統中心化社群平台",
      es: "Plataforma social centralizada", pl: "Scentralizowana platforma społeczna", ja: "集中型ソーシャルプラットフォーム",
      th: "แพลตฟอร์มโซเชียลแบบรวมศูนย์", fi: "Keskitetty sosiaalialusta", uk: "Централізована соцплатформа",
      bg: "Централизирана социална платформа", tr: "Merkezi sosyal platform", hu: "Központosított közösségi platform",
    },
  },
  {
    id: "e2ee", tag: "category · no citations", name: {
      en: "E2EE messenger, generic", ru: "E2E-мессенджер, общий класс", de: "E2EE-Messenger, Gattung",
      fr: "Messagerie E2EE, catégorie", it: "Messenger E2EE, categoria", nl: "E2EE-messenger, categorie",
      cs: "E2EE messenger, obecně", "zh-Hans": "一般端到端加密聊天工具", "zh-Hant": "一般端對端加密聊天工具",
      es: "Mensajería E2EE, categoría", pl: "Komunikator E2EE, ogólnie", ja: "一般的な E2EE メッセンジャー",
      th: "แอปแชท E2EE ทั่วไป", fi: "Yleinen E2EE-pikaviestin", uk: "E2EE-месенджер, загальний клас",
      bg: "E2EE месинджър, общо", tr: "E2EE mesajlaşma, genel", hu: "Általános E2EE üzenetküldő",
    },
  },
];

/** Verdict symbols are glyphs plus a short name; the glyph itself is locale-free. */
const VERDICTS: Record<Verdict, { readonly mark: string; readonly tone: "mesh" | "warn" | "alert"; readonly className: string; readonly name: Localized<string> }> = {
  full: {
    mark: "●", tone: "mesh", className: "text-mesh-soft", name: {
      en: "follows from the design", ru: "следует из конструкции", de: "aus dem Design folgend",
      fr: "découle du design", it: "discende dal progetto", nl: "volgt uit het ontwerp",
      cs: "plyne z návrhu", "zh-Hans": "架构上具备", "zh-Hant": "架構上具備",
      es: "se sigue del diseño", pl: "wynika z konstrukcji", ja: "設計から従う",
      th: "เกิดจากตัวการออกแบบ", fi: "seuraa suunnitelmasta", uk: "випливає з проєкту",
      bg: "следва от дизайна", tr: "tasarımdan gelir", hu: "a tervből következik",
    },
  },
  partial: {
    mark: "◐", tone: "warn", className: "text-warn-soft", name: {
      en: "only under conditions", ru: "лишь при условиях", de: "nur unter Bedingungen",
      fr: "seulement sous conditions", it: "solo a condizioni", nl: "alleen onder voorwaarden",
      cs: "jen za podmínek", "zh-Hans": "有条件成立", "zh-Hant": "有條件成立",
      es: "solo bajo condiciones", pl: "tylko przy warunkach", ja: "条件付きで成立",
      th: "เฉพาะมีเงื่อนไข", fi: "vain ehdoin", uk: "лише за умов",
      bg: "само при условия", tr: "yalnızca koşulla", hu: "csak feltétellel",
    },
  },
  none: {
    mark: "○", tone: "alert", className: "text-alert-soft", name: {
      en: "not provided", ru: "не предоставляется", de: "nicht vorgesehen",
      fr: "non fourni", it: "non fornito", nl: "niet voorzien",
      cs: "není poskytováno", "zh-Hans": "该架构不提供", "zh-Hant": "該架構不提供",
      es: "no se proporciona", pl: "nie jest zapewniane", ja: "提供されない",
      th: "ไม่ได้ให้ไว้", fi: "ei tarjota", uk: "не надається",
      bg: "не се предоставя", tr: "sağlanmaz", hu: "nem biztosított",
    },
  },
};

const DIMENSIONS: readonly Dimension[] = [
  {
    id: "identity", mark: "01",
    cites: ["Shared/Views/Onboarding/OnboardingView.swift:83", "Shared/Model/ChatModel.swift:426", "Shared/Views/AddContact/PopopxAddFriendView.swift:698"],
    label: {
      en: "Does the identity system require a phone number, an email or a global ID?",
      ru: "Требует ли система идентичности номер телефона, почту или глобальный ID?",
      de: "Verlangt das Identitätssystem Telefonnummer, E-Mail oder eine globale ID?",
      fr: "Le système d’identité exige-t-il un numéro, un e-mail ou une ID globale ?",
      it: "Il sistema di identità richiede numero di telefono, email o un ID globale?",
      nl: "Vereist het identiteitssysteem telefoonnummer, e-mail of een globale ID?",
      cs: "Vyžaduje identitní systém telefonní číslo, e-mail nebo globální ID?",
      "zh-Hans": "身份体系是否依赖手机号、邮箱或全局 ID？",
      "zh-Hant": "身分體系是否依賴手機號、電郵或全域 ID？",
      es: "¿Exige el sistema de identidad teléfono, correo o una ID global?",
      pl: "Czy system tożsamości wymaga numeru telefonu, e-maila czy globalnego ID?",
      ja: "身元体系は電話番号・メール・グローバル ID を要求するか？",
      th: "ระบบตัวตนต้องการหมายเลขโทรศัพท์ อีเมล หรือ ID สากลหรือไม่?",
      fi: "Vaatiiko identiteettijärjestelmä puhelinnumeroa, sähköpostia vai globaalin ID:n?",
      uk: "Чи вимагає система ідентичності номер телефона, пошту чи глобальний ID?",
      bg: "Изисква ли системата за самоличност телефонен номер, имейл или глобален ID?",
      tr: "Kimlik sistemi telefon numarası, e-posta veya küresel ID istiyor mu?",
      hu: "Az identitásrendszer kér telefonszámot, e-mailt vagy globális ID-t?",
    },
    cells: {
      popopx: { v: "full", t: {
        en: "Registration binds no phone number or email and there is no global user ID; new contacts come from a one-time invite address.",
        ru: "Регистрация не привязывает номер или почту, глобального ID пользователя нет; новые контакты — через одноразовый адрес приглашения.",
        de: "Die Registrierung bindet keine Telefonnummer und kein E-Mail, es gibt keine globale Benutzer-ID; neue Kontakte kommen über eine einmalige Einladungsadresse.",
        fr: "L’enregistrement ne lie ni numéro ni e-mail et il n’y a pas d’ID utilisateur globale ; les nouveaux contacts viennent d’une adresse d’invitation à usage unique.",
        it: "La registrazione non lega numero di telefono né email e non c’è un ID utente globale; i nuovi contatti arrivano da un indirizzo d’invito monouso.",
        nl: "Registratie bindt geen telefoonnummer of e-mail en er is geen globale gebruikers-ID; nieuwe contacten komen van een eenmalig uitnodigingsadres.",
        cs: "Registrace neváže telefonní číslo ani e-mail a neexistuje globální ID uživatele; nové kontakty pocházejí z jednorázové pozvánkové adresy.",
        "zh-Hans": "注册不绑定手机号或邮箱，也没有全局用户 ID；新增联系人来自一次性邀请地址。",
        "zh-Hant": "註冊不綁定手機號或電郵，也沒有全域使用者 ID；新增聯絡人來自一次性邀請位址。",
        es: "El registro no vincula teléfono ni correo y no hay una ID global de usuario; los nuevos contactos llegan por una dirección de invitación de un solo uso.",
        pl: "Rejestracja nie wiąże numeru telefonu ani e-maila i nie ma globalnego ID użytkownika; nowe kontakty przychodzą z jednorazowego adresu zaproszenia.",
        ja: "登録は電話番号やメールと紐付けず、グローバルなユーザー ID もありません。新しい連絡先は一回限りの招待アドレスからやってきます。",
        th: "การลงทะเบียนไม่ผูกหมายเลขโทรศัพท์หรืออีเมล และไม่มี ID ผู้ใช้สากล ผู้ติดต่อใหม่มาจากที่อยู่คำเชิญที่ใช้ครั้งเดียว",
        fi: "Rekisteröinti ei sido puhelinnumeroa tai sähköpostia, eikä globaalia käyttäjä-ID:tä ole; uudet yhteystiedot tulevat kertakäyttöisestä kutsuosoitteesta.",
        uk: "Реєстрація не прив’язує номер телефона чи пошту й не має глобального ID користувача; нові контакти приходять з одноразової адреси запрошення.",
        bg: "Регистрацията не обвързва телефонен номер или имейл и няма глобален ID на потребителя; новите контакти идват от еднократен адрес за покана.",
        tr: "Kayıt telefon numarası veya e-posta bağlamaz ve küresel bir kullanıcı ID’si yoktur; yeni kişiler tek kullanımlık bir davet adresinden gelir.",
        hu: "A regisztráció nem kapcsol telefonszámhoz vagy e-mailhez, és nincs globális felhasználó-azonosító; az új névjegyek egyszeri meghívócímből jönnek.",
      } },
      central: { v: "none", t: {
        en: "The account is keyed by a phone number or an email address — that is the category’s defining property, not some vendor’s implementation detail.",
        ru: "Аккаунт привязан к номеру телефона или почте — это определяющее свойство класса, а не деталь реализации какого-то вендора.",
        de: "Das Konto wird über Telefonnummer oder E-Mail-Adresse identifiziert – das ist das Definitionsmerkmal der Gattung, nicht ein Detail eines Anbieters.",
        fr: "Le compte est indexé sur un numéro ou une adresse e-mail — c’est la propriété définissant la catégorie, pas le détail d’implémentation d’un éditeur.",
        it: "L’account è indicizzato da numero di telefono o indirizzo email — è la proprietà che definisce la categoria, non un dettaglio implementativo di un fornitore.",
        nl: "Het account wordt gesleuteld op telefoonnummer of e-mailadres — dat is het kenmerk van de categorie, niet een implementatiedetail van een leverancier.",
        cs: "Účet je indexován telefonním číslem nebo e-mailem — to je definiující vlastnost kategorie, ne detail implementace jednoho výrobce.",
        "zh-Hans": "账号以手机号或邮箱地址作为主键——这是品类的定义性特征，不是某家的实现细节。",
        "zh-Hant": "帳號以手機號或電郵位址作為主鍵——這是品類的定義性特徵，不是某家的實作細節。",
        es: "La cuenta se clave por número de teléfono o correo — esa es la propiedad que define la categoría, no un detalle de implementación de algún proveedor.",
        pl: "Konto jest indeksowane numerem telefonu albo adresem e-mail — to cecha definiująca kategorię, nie detal wdrożenia jakiegoś dostawcy.",
        ja: "アカウントは電話番号かメールアドレスを鍵にします。これはそのジャンルの定義上の性質で、特定ベンダーの実装詳細ではありません。",
        th: "บัญชีใช้หมายเลขโทรศัพท์หรือที่อยู่อีเมลเป็นกุญแจ — นั่นคือคุณสมบัติที่นิยามหมวดนี้ ไม่ใช่รายละเอียดภายในของผู้ขายรายใด",
        fi: "Tili avataan puhelinnumerolla tai sähköpostiosoitteella — se on kategorian määrittelevä piirre, ei jonkin toimittajan toteutusyksityiskohta.",
        uk: "Обліковий запис прив’язується до номера телефону чи поштової адреси — це визначальна властивість категорії, а не деталь реалізації якогось постачальника.",
        bg: "Профилът се ключва с телефонен номер или имейл адрес — това е определящото свойство на категорията, не детайл от реализация на някой доставчик.",
        tr: "Hesap bir telefon numarası veya e-posta adresiyle anahtarlanır — bu kategorinin tanımlayıcı özelliğidir, bir satıcının uygulama detayı değil.",
        hu: "A fiókot telefonszám vagy e-mail cím kulcsolja — ez a kategória meghatározó tulajdonsága, nem egy gyártó implementációs részlete.",
      } },
      e2ee: { v: "partial", t: {
        en: "Encryption protects message content, yet the account still needs an identifier the issuing server assigns — crypto strength and identity collection are separate choices.",
        ru: "Шифрование защищает содержание сообщений, но аккаунту всё равно нужен идентификатор, который выдаёт сервер — стойкость криптографии и сбор личности это разные решения.",
        de: "Verschlüsselung schützt den Nachrichteninhalt, aber das Konto braucht weiterhin eine Kennung, die der Ausgabe-Server vergibt — Kryptostärke und Identitätserfassung sind getrennte Entscheidungen.",
        fr: "Le chiffrement protège le contenu des messages, mais le compte a quand même besoin d’un identifiant attribué par le serveur émetteur — force cryptographique et collecte d’identité sont deux choix distincts.",
        it: "La crittografia protegge il contenuto dei messaggi, eppure l’account ha bisogno di un identificatore assegnato dal server emittente — robustezza crittografica e raccolta d’identità sono scelte separate.",
        nl: "Versleuteling beschermt de berichtinhoud, maar het account heeft nog steeds een identifier nodig die de uitgevende server toewijst — cryptosterkte en identiteitsverzameling zijn aparte keuzes.",
        cs: "Šifrování chrání obsah zpráv, ale účet pořád potřebuje identifikátor, který vydávající server přiřadí — síla kryptografie a sběr identity jsou oddělená rozhodnutí.",
        "zh-Hans": "加密保护消息内容，但账号仍需要一个由签发服务器分配的标识符——加密强度与身份收集是两个独立的选择。",
        "zh-Hant": "加密保護訊息內容，但帳號仍需要一個由簽發伺服器指派的識別碼——加密強度與身分蒐集是兩個獨立的選擇。",
        es: "El cifrado protege el contenido del mensaje, pero la cuenta aún necesita un identificador que asigna el servidor emisor — fuerza criptográfica y recolección de identidad son decisiones separadas.",
        pl: "Szyfrowanie chroni treść wiadomości, ale konto nadal potrzebuje identyfikatora przydzielanego przez wydający serwer — moc kryptografii i zbieranie tożsamości to odrębne decyzje.",
        ja: "暗号化はメッセージ内容を守りますが、アカウントには発行サーバーが割り当てる識別子が依然必要です。暗号の強度と身分の収集は別々の選択です。",
        th: "การเข้ารหัสปกป้องเนื้อหาข้อความ แต่บัญชียังต้องใช้ตัวระบุที่เซิร์ฟเวอร์ผู้ออกเป็นผู้กำหนด — ความแข็งของคริปโตกับการเก็บตัวตนเป็นคนละการเลือก",
        fi: "Salaus suojaa viestien sisällön, mutta tili tarvitsee silti tunnisteen, myöntävä palvelin antaa — kryptovahvuus ja identiteetin keruu ovat erillisiä valintoja.",
        uk: "Шифрування захищає вміст повідомлень, але обліковому запису досі потрібен ідентифікатор, який видає сервер — стійкість криптографії й збір даних про особу — різні рішення.",
        bg: "Криптирането пази съдържанието на съобщенията, но профилът все пак се нуждае от идентификатор, който издаващият сървър назначава — криптосилата и събирането на самоличност са отделни избори.",
        tr: "Şifreleme mesaj içeriğini korur, ancak hesap yine de veren sunucunun atadığı bir tanımlayıcıya ihtiyaç duyar — kriptografik güç ile kimlik toplama ayrı seçimlerdir.",
        hu: "A titkosítás az üzenettartalmat védi, mégis a fióknak kell egy azonosító, amit a kiállító szerver ad — a kriptográfiai erő és a személyazonosság gyűjtése külön döntések.",
      } },
    },
  },
  {
    id: "graph", mark: "02",
    cites: ["POPOPXChat/APITypes.swift:589-615,597-604"],
    label: {
      en: "Does the server side hold the social relationship?",
      ru: "Держит ли серверная сторона социальные связи?",
      de: "Hält die Serverseite die soziale Beziehung?",
      fr: "Le côté serveur détient-il la relation sociale ?",
      it: "Il lato server conserva la relazione sociale?",
      nl: "Houdt de serverkant de sociale relatie?",
      cs: "Drží serverová strana sociální vztah?",
      "zh-Hans": "服务器侧是否掌握社交关系？",
      "zh-Hant": "伺服器側是否掌握社群關係？",
      es: "¿Mantiene el lado del servidor la relación social?",
      pl: "Czy strona serwerowa przechowuje relację społeczną?",
      ja: "サーバー側はソーシャル関係を握っていますか？",
      th: "ฝั่งเซิร์ฟเวอร์เป็นผู้ถือความสัมพันธ์ทางสังคมหรือไม่?",
      fi: "Pitääkö palvelinpuoli sosiaalisen suhteen?",
      uk: "Чи тримає серверний бік соціальний зв’язок?",
      bg: "Държи ли сървърната страна социалната връзка?",
      tr: "Sunucu tarafı sosyal bağı elinde tutuyor mu?",
      hu: "A szerver oldal tartja-e a közösségi kapcsolatot?",
    },
    cells: {
      popopx: { v: "full", t: {
        en: "Per connection the client types carry one receive queue and one send queue, each with a single host field — there is no column in those types that stores a relationship.",
        ru: "На каждое соединение в типах клиента — одна входящая и одна исходящая очередь, каждая с одним полем хоста; колонки для связи в этих типах нет.",
        de: "Pro Verbindung tragen die Client-Typen eine Empfangs- und eine Sende-Queue, je mit einem einzigen Host-Feld — in diesen Typen gibt es keine Beziehungsspalte.",
        fr: "Par connexion, les types du client portent une file de réception et une file d’envoi, chacune avec un seul champ hôte — aucune colonne de ces types ne stocke une relation.",
        it: "Per connessione i tipi del client portano una coda di ricezione e una di invio, ciascuna con un solo campo host — nessuna colonna di quei tipi conserva una relazione.",
        nl: "Per verbinding dragen de cliënttypes één ontvangst- en één zendwachtrij, elk met één hostveld — er is geen kolom in die types die een relatie opslaat.",
        cs: "Na každé připojení nesou typy klienta jednu přijímací a jednu odesílací frontu, každá s jediným polem hostitele — v těch typech žádný sloupec vztah neukládá.",
        "zh-Hans": "每个连接在客户端类型里只有一收一发两条队列，各带一个主机字段——这些类型中没有任何列用来存储关系。",
        "zh-Hant": "每個連線在用戶端型別裡只有一收一發兩條佇列，各帶一個主機欄位——這些型別中沒有任何欄位用來儲存關係。",
        es: "Por conexión, los tipos del cliente llevan una cola de recepción y una de envío, cada una con un único campo de host — ninguna columna de esos tipos guarda una relación.",
        pl: "Na każde połączenie typy klienta niosą jedną kolejkę odbioru i jedną wysyłki, każda z jednym polem hosta — w tych typach nie ma kolumny przechowującej relację.",
        ja: "接続ごとにクライアント側の型は受信キューと送信キューを 1 つずつ持ち、それぞれには host フィールドが 1 つだけあります。関係保存用の列は型のどこにもありません。",
        th: "ต่อการเชื่อมต่อ ชนิดข้อมูลของไคลเอนต์มีคิวรับหนึ่งคิวและคิวส่งหนึ่งคิว แต่ละคิวมีฟิลด์โฮสต์หนึ่งฟิลด์ — ไม่มีคอลัมน์ในชนิดเหล่านั้นที่เก็บความสัมพันธ์",
        fi: "Yhteyttä kohti clientin tyypit kantavat yhden vastaanotto- ja yhden lähetysjonon, ja niissä kummassakin on yksi host-kenttä – näissä tyypeissä ei ole suhdetta tallentavaa saraketta.",
        uk: "На кожне з’єднання типи клієнта несуть одну чергу приймання й одну надсилання, кожна з єдиним полем хоста — у цих типах немає колонки, що зберігає зв’язок.",
        bg: "На всяка връзка типовете в клиента носят една приемаща и една изпращаща опашка, всяка с единично поле за хост — няма колона в тези типове, която да съхранява връзка.",
        tr: "Bağlantı başına istemci tipleri bir alma ve bir gönderme kuyruğu taşır, her biri tek bir ana makine alanıyla — bu tiplerde bir bağı saklayan sütun yoktur.",
        hu: "Kapcsolatonként a kliens típusai egy fogadó és egy küldő sort tartalmaznak, mindegyik egyetlen gazdamezővel — ezekben a típusokban nincs kapcsolat tárolására alkalmas oszlop.",
      } },
      central: { v: "none", t: {
        en: "The friend list, follow graph and address book live in the platform’s own database — that storage is exactly what makes the feature work.",
        ru: "Список друзей, граф подписок и адресная книга живут в базе данных платформы — это хранилище и есть то, что делает функцию возможной.",
        de: "Freundesliste, Follower-Graph und Adressbuch liegen in der Datenbank der Plattform — dieser Speicher ist genau das, was die Funktion möglich macht.",
        fr: "La liste d’amis, le graphe d’abonnements et le carnet d’adresses résident dans la base de la plateforme — ce stockage est précisément ce qui fait fonctionner la fonction.",
        it: "Lista amici, grafo di Seguaci e rubrica risiedono nel database della piattaforma — quello storage è esattamente ciò che fa funzionare la funzione.",
        nl: "Vriendenlijst, volgergrafiek en adresboek leven in de eigen database van het platform — die opslag maakt de functie precies mogelijk.",
        cs: "Seznam přátel, graf sledování a adresář žijí v vlastní databázi platformy — právě to ukládání je tím, co tu funkci umożliwia.",
        "zh-Hans": "好友列表、关注图谱和通讯录存放在平台自己的数据库里——正是这份存储让该功能得以成立。",
        "zh-Hant": "朋友清單、追蹤圖譜與通訊錄存放在平台自己的資料庫裡——正是這份儲存讓該功能得以成立。",
        es: "La lista de amigos, el grafo de seguimientos y el libretón viven en la base de datos de la plataforma — ese almacenamiento es justo lo que hace funcionar la función.",
        pl: "Lista znajomych, graf obserwacji i książka adresowa mieszkają we własnej bazie platformy — to przechowywanie dokładnie umożliwia tę funkcję.",
        ja: "友達リスト、フォロー関係、連絡先台帳はプラットフォーム自身のデータベースにあります。その保存こそが機能を成立させています。",
        th: "รายชื่อเพื่อน กราฟการติดตาม และสมุดอยู่รวมกันในฐานข้อมูลของแพลตฟอร์ม — การเก็บนั้นคือสิ่งที่ทำให้ฟีเจอร์ทำงานได้",
        fi: "Kaverilista, seurantaGraafi ja osoitekirja elävät platformin omassa tietokannassa — tuo tallennus on nimenomaan se, mikä tekee toiminnosta mahdollisen.",
        uk: "Список друзів, граф підписок і адресна книга живляться у власній базі платформи — саме це сховище робить функцію можливою.",
        bg: "Списъкът с приятели, графикът на следвания и адресната книга живеят в собствената база данни на платформата — точно това съхранение прави функцията възможна.",
        tr: "Arkadaş listesi, takip grafiği ve adres defteri platformun kendi veritabanında durur — bu depolama tam olarak özelliği işlevsel kılan şeydir.",
        hu: "A barátlista, a követési gráf és a névjegyjegyzék a platform saját adatbázisában él — pontosan ez a tárolás teszi lehetővé az egész funkciót.",
      } },
      e2ee: { v: "partial", t: {
        en: "Payload encryption keeps content unreadable to the operator, while the contact list is normally still a server-side feature — encrypting bytes does not move the graph back to the device.",
        ru: "Шифрование нагрузки делает содержимое нечитаемым для оператора, но список контактов обычно остаётся серверной функцией — шифрование байтов не переносит граф обратно на устройство.",
        de: "Payload-Verschlüsselung hält den Inhalt für den Betreiber unlesbar, die Kontaktliste ist aber meist weiter eine Serverfunktion — Bytes zu verschlüsseln zurückert den Graphen nicht auf das Gerät.",
        fr: "Le chiffrement de charge rend le contenu illisible pour l’opérateur, alors que la liste de contacts reste normalement une fonction serveur — chiffrer des octets ne renvoie pas le graphe sur l’appareil.",
        it: "La cifratura del payload rende il contenuto illeggibile all’operatore, mentre la lista contatti resta di norma una funzione server — cifrare byte non riporta il grafo sul dispositivo.",
        nl: "Payload-versleuteling houdt de inhoud onleesbaar voor de operator, terwijl de contactenlijst meestal een serverfunctie blijft — bytes versleutelen schuift de grafiek niet terug naar het apparaat.",
        cs: "Šifrování payloadu činí obsah nečitelným pro operátora, zatímco seznam kontaktů bývá dál serverovou funkcí — šifrování bajtů graf zpět na zařízení nepřesune.",
        "zh-Hans": "负载加密让运营方读不到内容，但联系人列表通常仍是服务器侧功能——加密字节并不会把关系图搬回设备。",
        "zh-Hant": "載具加密讓營運方讀不到內容，但聯絡人清單通常仍是伺服器側功能——加密位元並不會把關係圖搬回裝置。",
        es: "El cifrado de la carga mantenido el contenido ilegible para el operador, mientras la lista de contactos suele seguir siendo una función del servidor — cifrar bytes no devuelve el grafo al dispositivo.",
        pl: "Szyfrowanie nośnika czyni treść nieczytelną dla operatora, a lista kontaktów zwykle pozostaje funkcją serwerową — szyfrowanie bajtów nie przenosi grafu z powrotem na urządzenie.",
        ja: "ペイロード暗号化で内容は事業者から読めなくなりますが、連絡先リストは通常のサーバー側機能のままです。バイトを暗号化しても関係グラフは端末に戻りません。",
        th: "การเข้ารหัสโหลดทำให้ผู้ดำเนินการอ่านเนื้อหาไม่ออก แต่รายชื่อผู้ติดต่อมักยังเป็นฟีเจอร์ฝั่งเซิร์ฟเวอร์ — การเข้ารหัสไบต์ไม่ได้ย้ายกราฟกลับเข้าอุปกรณ์",
        fi: "Payloadin salaus pitää sisällön lukukelvottomana operaattorilta, kun taas yhteystietolista on yleensä edelleen palvelintoiminnallisuus – tavujen salaus ei siirrä graafia takaisin laitteelle.",
        uk: "Шифрування корисного вмісту робить його нечитабельним для оператора, тоді як список контактів зазвичай лишається серверною функцією — шифрування байтів не повертає граф на пристрій.",
        bg: "Криптирането на товара прави съдържанието нечетиво за оператора, докато списъкът с контакти обикновено остава сървърна функция — криптирането на байтове не връща графика на устройството.",
        tr: "Yük şifrelemesi içeriği işletmeci için okunamaz kılar, oysa kişi listesi normalde sunucu tarafı bir özelliktir — baytları şifrelemek grafiği cihaza geri taşımaz.",
        hu: "A hasznos teher titkosítása a tartalmat olvashatatlanná teszi az üzemeltető számára, miközben a névjegylista rendesen szerveroldali funkció — a bájtok titkosítása nem viszi vissza a gráfot az eszközre.",
      } },
    },
  },
  {
    id: "offline", mark: "03",
    cites: ["PopopxBLETransport.swift:5,26,45-49", "Protocol/PopopxGCSFilter.swift:5-7", "Router/PopopxMessageRouter.swift:6-19,268"],
    label: {
      en: "Can communication continue with no cellular and no Wi-Fi?",
      ru: "Продолжится ли связь без сотовой сети и без Wi-Fi?",
      de: "Lässt sich Kommunikation ohne Mobilfunk und ohne Wi-Fi fortsetzen?",
      fr: "La communication peut-elle continuer sans réseau cellulaire ni Wi-Fi ?",
      it: "La comunicazione può continuare senza rete cellulare e senza Wi-Fi?",
      nl: "Kan communicatie doorgaan zonder cellular en zonder Wi-Fi?",
      cs: "Může komunikace pokračovat bez mobilní sítě a bez Wi-Fi?",
      "zh-Hans": "无蜂窝、无 Wi-Fi 时能否继续通信？",
      "zh-Hant": "無蜂窩、無 Wi-Fi 時能否持續通訊？",
      es: "¿Puede continuar la comunicación sin celular ni Wi-Fi?",
      pl: "Czy komunikacja może trwać bez sieci komórkowej i bez Wi-Fi?",
      ja: "セルラーも Wi-Fi もない状態で通信は続けられますか？",
      th: "สื่อสารต่อได้ไหมเมื่อไม่มีทั้งเครือข่ายมือถือและ Wi-Fi?",
      fi: "Voiko viestintä jatkua ilman matkaverkkoa ja ilman Wi-Fi:tä?",
      uk: "Чи триває зв’язок без стільникової мережі й без Wi-Fi?",
      bg: "Може ли комуникацията да продължи без мобилна мрежа и без Wi-Fi?",
      tr: "Hücresel ve Wi-Fi olmadan iletişim sürdürülebilir mi?",
      hu: "Folytatható a kommunikáció mobilhálózat és Wi-Fi nélkül?",
    },
    cells: {
      popopx: { v: "full", t: {
        en: "Dual-role CoreBluetooth GATT peer-to-peer carries traffic device to device, flooding is deduplicated with Golomb-coded sets and the router picks the path in `dualChannel`.",
        ru: "Двурольный CoreBluetooth GATT передаёт трафик от устройства к устройству, затопление дедуплицируется множествами Голома, а маршрут выбирается в dualChannel.",
        de: "Dual-role CoreBluetooth-GATT überträgt Gerät zu Gerät, Fluten wird über Golomb-coded Sets entdupliziert und der Router wählt den Pfad in dualChannel.",
        fr: "Un GATT CoreBluetooth à double rôle transporte le trafic d’appareil à appareil, l’inondation est dédupliquée par ensembles de Golomb et le routeur choisit la voie dans dualChannel.",
        it: "Un GATT CoreBluetooth a doppio ruolo porta il traffico da dispositivo a dispositivo, il flooding è deduplicato con insiemi di Golomb e il router sceglie il percorso in dualChannel.",
        nl: "Dual-role CoreBluetooth-GATT draagt verkeer van apparaat naar apparaat, flooding wordt ontdubbeld met Golomb-coded sets en de router kiest het pad in dualChannel.",
        cs: "GATT CoreBluetooth s dvojí rolí nese provoz mezi zařízeními, zaplavování se deduplikuje Golombovými kódovanými množinami a router volí cestu v dualChannel.",
        "zh-Hans": "双角色 CoreBluetooth GATT 让流量在设备之间直接传递，泛洪用 Golomb-coded set 去重，路由在 dualChannel 中选路。",
        "zh-Hant": "雙角色 CoreBluetooth GATT 讓流量在裝置之間直接傳遞，泛洪以 Golomb-coded set 去重，路由在 dualChannel 中選路。",
        es: "Un GATT de CoreBluetooth con doble rol lleva el tráfico de dispositivo a dispositivo, la inundación se deduplica con conjuntos de código Golomb y el enrutador elige la vía en dualChannel.",
        pl: "Dwuróżowy GATT w CoreBluetooth niesie ruch urządzenie-do-urządzenia, flooding jest od deduplikowany zbiorami Golomba, a router wybiera ścieżkę w dualChannel.",
        ja: "デュアルロールの CoreBluetooth GATT が機器間通信を担い、フラッディングは Golomb coded set で重複除去し、ルーターが dualChannel で経路を選びます。",
        th: "CoreBluetooth GATT สองบทบาทส่งทราฟฟิกระหว่างเครื่องโดยตรง การกระจายซ้ำถูกตัดความซ้ำด้วย Golomb coded set และตัวเลือกเส้นทางจะเลือกทางใน dualChannel",
        fi: "Kaksiroolinen CoreBluetooth-GATT kuljettaa liikenteen laitteiden välillä, tulvitus poistetaan Golomb-koodatuilla joukoilla ja reititin valitsee reitin dualChannel-käsittelyssä.",
        uk: "Дворольовий GATT CoreBluetooth несе трафік між пристроями, затоплення дедуплікується множинами Голома, а маршрутизатор обирає шлях у dualChannel.",
        bg: "Двойнорежимният CoreBluetooth GATT пренася трафик между устройства, наводняването се дедупликира с Голом-кодирани множества, а маршрутизаторът избира пътя в dualChannel.",
        tr: "Çift rollü CoreBluetooth GATT trafiği cihazdan cihaza taşır, sel basma tekniği Golomb kodlu kümelerle tekilliştirilir ve yönlendirici rotayı dualChannel içinde seçer.",
        hu: "Kétszerepű CoreBluetooth GATT viszi a forgalmat eszközről eszközre, az elárasztást Golomb-kódolt halmazok deduplikálják, az útválasztó pedig a dualChannel-ban választ útvonalat.",
      } },
      central: { v: "none", t: {
        en: "Reachability means a cellular or Wi-Fi path back to the operator’s datacenter; without either one delivery simply waits for the next connection.",
        ru: "Доступность означает сотовый или Wi-Fi путь обратно в дата-центр оператора; без него доставка просто ждёт следующего подключения.",
        de: "Erreichbarkeit heißt ein Mobilfunk- oder Wi-Fi-Pfad zurück ins Rechenzentrum des Betreibers; ohne beide wartet die Zustellung schlicht auf die nächste Verbindung.",
        fr: "Être joignable suppose une voie cellulaire ou Wi-Fi vers le centre de données de l’opérateur ; sans l’une des deux, la remise attend la connexion suivante.",
        it: "Essere raggiungibili significa una via cellulare o Wi-Fi verso il datacenter dell’operatore; senza una delle due, la consegna attende semplicemente la connessione successiva.",
        nl: "Bereikbaarheid betekent een cellular- of Wi-Fi-pad terug naar het datacenter van de operator; zonder beide wacht bezorging simpelweg op de volgende verbinding.",
        cs: "Dostupnost znamená mobilní nebo Wi-Fi cestu zpět do datacentra operátora; bez ní doručování prostě čeká na další připojení.",
        "zh-Hans": "可达性意味着一条回到运营商机房的蜂窝或 Wi-Fi 路径；两者都没有时，投递只能等待下一次连接。",
        "zh-Hant": "可達性意味著一條回到營運商機房的蜂窩或 Wi-Fi 路徑；兩者皆無時，投遞只能等待下次連線。",
        es: "Ser alcanzable significa una vía celular o Wi-Fi de vuelta al centro de datos del operador; sin ninguna, la entrega simplemente espera la siguiente conexión.",
        pl: "Osiągalność oznacza ścieżkę komórkową lub Wi-Fi z powrotem do centrum danych operatora; bez niej dostarczenie po prostu czeka na kolejne połączenie.",
        ja: "到達可能性とは事業者データセンターへ戻るセルラーか Wi-Fi の経路のことです。どちらも無ければ配信は次の接続を待つだけです。",
        th: "การเข้าถึงได้หมายถึงทางเดินผ่านมือถือหรือ Wi-Fi กลับไปดาต้าเซ็นเตอร์ของผู้ดำเนินการ หากไม่มีทั้งสอง การส่งก็จะรอการเชื่อมต่อครั้งถัดไป",
        fi: "Saavutettavuus tarkoittaa matkaverkko- tai Wi-Fi-reittiä takaisin operaattorin datacenteriin; ilman molempia toimitus yksinkertaisesti odottaa seuraavaa yhteyttä.",
        uk: "Досяжність означає стільниковий або Wi-Fi шлях назад до дата-центру оператора; без нього доставка просто чекає на наступне з’єднання.",
        bg: "Достижимостта означава мобилен или Wi-Fi път обратно към центъра за обработка на данни на оператора; без двата пътя, доставянето просто чака следващата връзка.",
        tr: "Erişilebilirlik, işletmecinin veri merkezine dönen bir hücresel veya Wi-Fi yolu demektir; ikisi de yoksa teslimat bir sonraki bağlantıyı bekler.",
        hu: "Az elérhetőség mobilhálózati vagy Wi-Fi útvonalat jelent vissza az üzemeltető adatközpontjába; egyik nélkül a kézbesítés egyszerűen a következő kapcsolatra vár.",
      } },
      e2ee: { v: "none", t: {
        en: "End-to-end encryption still assumes both peers reach the service’s own servers, often through a relay or a TURN-style path; the transport is not device direct.",
        ru: "Сквозное шифрование по-прежнему предполагает, что обе стороны достают серверы самого сервиса, часто через ретранслятор или путь типа TURN; транспорт не является прямым между устройствами.",
        de: "Ende-zu-Ende-Verschlüsselung setzt voraus, dass beide Gegenstellen die eigenen Server des Dienstes erreichen, oft über ein Relais oder einen TURN-artigen Pfad; der Transport ist nicht direkt von Gerät zu Gerät.",
        fr: "Le chiffrement de bout en bout suppose que les deux pairs atteignent les serveurs du service, souvent via un relais ou une voie de type TURN ; le transport n’est pas direct entre appareils.",
        it: "La crittografia end-to-end presuppone che entrambi i capi raggiungano i server del servizio, spesso tramite un relay o un percorso tipo TURN; il trasporto non è diretto tra dispositivi.",
        nl: "End-to-end-versleuteling gaat er nog steeds van uit dat beide peers de eigen servers van de dienst bereiken, vaak via een relay of een TURN-achtig pad; het transport is niet rechtstreeks tussen apparaten.",
        cs: "Šifrování end-to-end stále předpokládá, že obě strany dosáhnou na servery vlastní služby, často přes relay nebo cestu typu TURN; přenos není přímý mezi zařízeními.",
        "zh-Hans": "端到端加密仍然要求两端都能连到服务自己的服务器，常常还要经过中继或 TURN 类路径；传输并不是设备之间直连的。",
        "zh-Hant": "端對端加密仍要求兩端都能連到服務自己的伺服器，常常還需經過中繼或 TURN 類路徑；傳輸並不是裝置之間直連的。",
        es: "El cifrado de extremo a extremo sigue asumiendo que ambos pares llegan a los servidores propios del servicio, a menudo por un reenvío o una vía tipo TURN; el transporte no es directo entre dispositivos.",
        pl: "Szyfrowanie end-to-end nadal zakłada, że oba końce docierają do serwerów samej usługi, często przez przekaźnik lub ścieżkę typu TURN; transport nie jest bezpośredni między urządzeniami.",
        ja: "エンドツーエンド暗号化でも両端末がサービス自身のサーバーに到達することが前提です。中継や TURN 型の経路が使われることが多く、転送は機器間直送ではありません。",
        th: "การเข้ารหัสแบบ end-to-end ยังสมมติว่าทั้งสองฝั่งเข้าถึงเซิร์ฟเวอร์ของบริการเอง มักผ่านตัวกลางหรือเส้นทางแบบ TURN การส่งต่อจึงไม่ใช่การส่งตรงระหว่างอุปกรณ์",
        fi: "Päästä päähän -salaus olettaa yhä, että molemmat osapuolet tavoittavat palvelimen omat palvelimet, usein välityspalvelimen tai TURN-tyyppisen reitin kautta; kuljetus ei ole suoraa laitteiden välillä.",
        uk: "Сквозне шифрування досі передбачає, що обидві сторони дістають до серверів самої служби, часто через ретранслятор або шлях типу TURN; транспорт не є прямим між пристроями.",
        bg: "Криптирането край-до-край все пак предполага, че и двете страни достигат собствените сървъри на услугата, често чрез релей или път тип TURN; пренасянето не е директно между устройства.",
        tr: "Uçtan uca şifreleme yine de iki ucun hizmetin kendi sunucularına ulaştığını varsayar, çoğunlukla bir aktarıcı veya TURN benzeri bir yolla; taşıma cihazdan cihaza doğrudan değildir.",
        hu: "A végpontok közti titkosítás továbbra is feltételezi, hogy mindkét fél eléri a szolgáltatás saját szervereit, gyakran közvetítőn vagy TURN-szerű vonalon; az átvitel nem eszközközvetlen.",
      } },
    },
  },
  {
    id: "metadata", mark: "04",
    cites: ["PopopxMediaEngine.swift:18-21,366-378 (drop at :375)", "PopopxMediaEngine.swift:22-24,433-442", "PopopxMediaEngine.swift:25-27"],
    label: {
      en: "Is media compressed locally before upload, with EXIF/GPS stripped?",
      ru: "Сжимается ли медиа локально до загрузки и удаляются ли EXIF/GPS?",
      de: "Wird Medien lokal vor dem Upload komprimiert und EXIF/GPS entfernt?",
      fr: "Le média est-il compressé localement avant l’envoi, avec EXIF/GPS retirés ?",
      it: "Il media è compresso localmente prima del caricamento, con EXIF/GPS rimossi?",
      nl: "Wordt media lokaal gecomprimeerd voor upload, met EXIF/GPS verwijderd?",
      cs: "Komprimují se média lokálně před odesláním a odstraňuje se EXIF/GPS?",
      "zh-Hans": "上传前是否在本地压缩并剥离 EXIF/GPS？",
      "zh-Hant": "上傳前是否在本地壓縮並剝除 EXIF/GPS？",
      es: "¿Se comprime el material localmente antes de subirlo, con EXIF/GPS eliminados?",
      pl: "Czy materiały są pakowane lokalnie przed wysłaniem i czy EXIF/GPS są usuwane?",
      ja: "アップロード前にローカルで圧縮し、EXIF/GPS を除去していますか？",
      th: "บีบอัดสื่อในเครื่องก่อนอัปโหลดและตัด EXIF/GPS ออกหรือไม่?",
      fi: "Pakataanko media paikallisesti ennen lähetystä ja poistetaanko EXIF/GPS?",
      uk: "Чи стискаються медіа локально перед завантаженням і чи видаляються EXIF/GPS?",
      bg: "Свиват ли се медиите локално преди качване и се премахват ли EXIF/GPS?",
      tr: "Yüklemeden önce yerel olarak sıkıştırılıyor mu, EXIF/GPS çıkarılıyor mu?",
      hu: "Helyben tömörítődik a média feltöltés előtt, EXIF/GPS eltávolítva?",
    },
    cells: {
      popopx: { v: "partial", t: {
        en: "Still images are re-encoded through ImageIO with no metadata dictionary and video through AVAssetWriter with an empty metadata list; animated GIF and APNG pass through untouched and keep their metadata.",
        ru: "Статичные изображения перекодируются через ImageIO без словаря метаданных, видео — через AVAssetWriter с пустым списком метаданных; GIF и APNG проходят нетронутыми и сохраняют метаданные.",
        de: "Standbilder werden über ImageIO ohne Metadaten-Wörterbuch neu kodiert, Video über AVAssetWriter mit leerer Metadatenliste; animierte GIF und APNG laufen unverändert durch und behalten ihre Metadaten.",
        fr: "Les images fixes sont ré-encodées via ImageIO sans dictionnaire de métadonnées et la vidéo via AVAssetWriter avec une liste de métadonnées vide ; GIF et APNG animés passent tels quels et gardent leurs métadonnées.",
        it: "Le immagini fisse sono ricodificate tramite ImageIO senza dizionario di metadati e il video tramite AVAssetWriter con elenco di metadati vuoto; GIF e APNG animate passano invariate e conservano i metadati.",
        nl: "Stilstaande beelden worden via ImageIO hercodeerd zonder metadata-woordenboek en video via AVAssetWriter met een lege metalijst; geanimeerde GIF en APNG gaan ongewijzigd door en houden hun metadata.",
        cs: "Statické obrazy se překódují přes ImageIO bez slovníku metadat a video přes AVAssetWriter s prázdným seznamem metadat; animované GIF a APNG procházejí nezměněné a metadata si ponechávají.",
        "zh-Hans": "静帧图片经 ImageIO 重新编码且不传元数据字典，视频经 AVAssetWriter 且元数据列表为空；动图 GIF 与 APNG 原样透传，因此保留其元数据。",
        "zh-Hant": "靜止圖片經 ImageIO 重新編碼且不傳元資料字典，影片經 AVAssetWriter 且元資料清單為空；動態 GIF 與 APNG 原樣透傳，因此保留其元資料。",
        es: "Las imágenes fijas se recodifican con ImageIO sin diccionario de metadatos y el video con AVAssetWriter y una lista de metadatos vacía; GIF y APNG animados pasan intactos y conservan sus metadatos.",
        pl: "Obrazy statyczne są kodowane ponownie przez ImageIO bez słownika metadanych, a wideo przez AVAssetWriter z pustą listą metadanych; animowane GIF i APNG przechodzą bez zmian i zachowują metadane.",
        ja: "静止画は ImageIO でメタデータ辞書なしに再エンコードし、動画は AVAssetWriter のメタデータ欄を空にして処理します。アニメーション GIF と APNG はそのまま通るためメタデータが残ります。",
        th: "ภาพนิ่งถูกรีเอนโค้ดผ่าน ImageIO โดยไม่มีพจนานุกรมเมทาดาทา ส่วนวิดีโอผ่าน AVAssetWriter ด้วยรายการเมทาดาทาว่างเปล่า GIF และ APNG แบบเคลื่อนไหวผ่านโดยไม่แตะจึงคงเมทาดาทาไว้",
        fi: "Still-kuvat koodataan uudelleen ImageIO:lla ilman metadatanimiekeä ja video AVAssetWriterilla tyhjällä metadata-listalla; animoidut GIF ja APNG kulkevat koskemattomina ja säilyttävät metadata nsansa.",
        uk: "Статичні зображення перекоднуються через ImageIO без словника метаданих, а відео через AVAssetWriter з порожнім списком метаданих; анімовані GIF та APNG проходять недоторканими й зберігають метадані.",
        bg: "Статичните изображения се реенкодират през ImageIO без речник с метаданни, а видеото през AVAssetWriter с празен списък; анимирани GIF и APNG минават непроменени и запазват метаданните си.",
        tr: "Sabit görüntüler ImageIO üzerinden meta sözlüğü olmadan, video ise AVAssetWriter üzerinden boş bir meta listesiyle yeniden kodlanır; hareketli GIF ve APNG dokunmadan geçer ve metalarını korur.",
        hu: "Az állóképek ImageIO-val újrakódolódnak metaadat-szótár nélkül, a videó AVAssetWriter-rel üres metaadat-listával; az animált GIF és APNG érintetlenül halad át, és megőrzi a metaadatait.",
      } },
      central: { v: "none", t: {
        en: "Original-quality upload keeps the camera metadata, position included, and any server-side processing happens after the copy has already left the device.",
        ru: "Загрузка в исходном качестве сохраняет метаданные камеры, включая позицию, а любая серверная обработка происходит после того, как копия уже покинула устройство.",
        de: "Originalqualitäts-Upload behält die Kamera-Metadaten samt Position, und jegliche Serververarbeitung geschieht, nachdem die Kopie das Gerät schon verlassen hat.",
        fr: "Un envoi en qualité d’origine conserve les métadonnées de l’appareil, position comprise, et tout traitement serveur intervient après que la copie a quitté l’appareil.",
        it: "Il caricamento a qualità originale conserva i metadati della fotocamera, posizione inclusa, e ogni elaborazione server avviene dopo che la copia ha già lasciato il dispositivo.",
        nl: "Upload in originele kwaliteit behoudt de camerametadata, inclusief positie, en eventuele serververwerking gebeurt nadat de kopie het apparaat al verlaten heeft.",
        cs: "Odeslání v původní kvalitě zachovává metadata fotoaparátu včetně polohy a jakékoli zpracování na serveru probíhá až poté, co kopie opustila zařízení.",
        "zh-Hans": "按原图质量上传会保留相机元数据（包括位置），而任何服务器侧处理都发生在副本已经离开设备之后。",
        "zh-Hant": "以原始品質上傳會保留相機元資料（包含位置），而任何伺服器側處理都發生在複本已離開裝置之後。",
        es: "Subir a calidad original conserva los metadatos de la cámara, incluida la posición, y cualquier procesamiento del servidor ocurre después de que la copia ya salió del dispositivo.",
        pl: "Wysyłka w oryginalnej jakości zachowuje metadane aparatu, wraz z pozycją, a wszelkie przetwarzanie po stronie serwera dzieje się już po opuszczeniu urządzenia przez kopię.",
        ja: "原画質のままアップロードするとカメラのメタデータ（位置情報含む）が残り、サーバー側の処理はコピーが端末を出したあとに行われます。",
        th: "การอัปโหลดคุณภาพเดิมจะคงเมทาดาทาของกล้องรวมถึงตำแหน่งไว้ และการประมวลผลฝั่งเซิร์ฟเวอร์ใดๆ เกิดขึ้นหลังสำเนาออกจากอุปกรณ์ไปแล้ว",
        fi: "Alkuperäisessä laadussa lähetys säilyttää kamerametadata mukaan lukien sijainnin, ja mahdollinen palvelinpuolen käsittely tapahtuu vasta kun kopio on jo poistunut laitteesta.",
        uk: "Завантаження в оригінальній якості зберігає метадані камери, включно з позицією, а будь-яка серверна обробка відбувається після того, як копія вже покинула пристрій.",
        bg: "Качването с оригинално качество запазва метаданните на камерата, включително позицията, и всякаква сървърна обработка става след като копието вече е напуснало устройството.",
        tr: "Orijinal kalitede yükleme, konum dâhil kamera meta verilerini korur ve sunucu tarafındaki herhangi bir işlem, kopya cihazı terk ettikten sonra gerçekleşir.",
        hu: "Eredeti minőségű feltöltés megőrzi a kamera metaadatait, a pozícióval együtt, és bármilyen szerveroldali feldolgozás akkor történik, miután a másolat már elhagyta az eszközt.",
      } },
      e2ee: { v: "partial", t: {
        en: "Encrypting a file protects it in transit but says nothing about the metadata the sender attached before encryption — the cipher property and the strip policy are different decisions.",
        ru: "Шифрование файла защищает его при передаче, но ничего не говорит о метаданных, которые отправитель приложил до шифрования — свойство шифра и политика очистки это разные решения.",
        de: "Eine Datei zu verschlüsseln schützt sie unterwegs, sagt aber nichts über die Metadaten, die der Absender vor der Verschlüsselung angehängt hat — die Eigenschaft der Chiffre und die Regel fürs Entfernen sind verschiedene Entscheidungen.",
        fr: "Chiffrer un fichier le protège en transit mais ne dit rien des métadonnées que l’expéditeur a jointes avant le chiffrement — propriété du chiffrement et politique de suppression sont deux décisions distinctes.",
        it: "Cifrare un file lo protegge in transito ma non dice nulla dei metadati che il mittente ha allegato prima della cifratura — proprietà del cifrario e policy di rimozione sono decisioni diverse.",
        nl: "Een bestand versleutelen beschermt het onderweg maar zegt niets over de metadata die de afzender vóór versleuteling toevoegde — de cijfer-eigenschap en de strip-beleid zijn aparte beslissingen.",
        cs: "Šifrování souboru jej chrání na cestě, ale nic neříká o metadatech, která odesílatel přidal před šifrováním — vlastnost šifry a politika odstraňování jsou různá rozhodnutí.",
        "zh-Hans": "对文件加密只保护它在传输中的状态，并不说明发送方在加密前附加的元数据去了哪里——加密属性与剥离策略是两个不同的决定。",
        "zh-Hant": "對檔案加密只保護它在傳輸中的狀態，並不說明傳送方在加密前附加的元資料去了哪裡——加密屬性與剝除策略是兩個不同的決定。",
        es: "Cifrar un archivo lo protege en tránsito pero no dice nada sobre los metadatos que el remitente adjuntó antes del cifrado — la propiedad del cifrado y la política de eliminación son decisiones distintas.",
        pl: "Zaszyfrowanie pliku chroni go w transmisji, ale nic nie mówi o metadanych dołączonych przed szyfrowaniem — własność szyfru i polityka usuwania to odrębne decyzje.",
        ja: "ファイルの暗号化は転送中を守りますが、送信者が暗号化前に付けたメタデータについては何も語りません。暗号の性質と除去ポリシーは別の決定です。",
        th: "การเข้ารหัสไฟล์ปกป้องมันระหว่างทาง แต่ไม่ได้บอกอะไรเกี่ยวกับเมทาดาทาที่ผู้ส่งแนบมาก่อนเข้ารหัส — คุณสมบัติของการเข้ารหัสกับนโยบายการตัดต่างกัน",
        fi: "Tiedon salaaminen suojaa sen matkalla mutta ei kerro mitään lähettäjän ennen salausta lisäämästä metadatasta – salauksen ominaisuus ja poistokäytäntö ovat eri päätöksiä.",
        uk: "Шифрування файлу захищає його під час передачі, але нічого не каже про метадані, які відправник додав до шифрування — властивість шифру й політика видалення є різними рішеннями.",
        bg: "Криптирането на файл го пази при пренасяне, но не казва нищо за метаданните, които подателят е закачил преди криптирането — свойството на шифъра и политиката за изтриване са различни решения.",
        tr: "Bir dosyayı şifrelemek onu aktarım sırasında korur ancak gönderenin şifrelemeden önce eklediği meta veriler hakkında hiçbir şey söylemez — şifre özelliği ile silme politikası ayrı kararlardır.",
        hu: "Egy fájl titkosítása átvitel közben védi, de semmit nem mond azokról a metaadatokról, amelyeket a feladó titkosítás előtt csatolt — a titkosítási tulajdonság és az eltávolítási politika külön döntések.",
      } },
    },
  },
  {
    id: "accounts", mark: "05",
    cites: ["Shared/Features/ServiceAccount/BotMenuBarView.swift:40-42,137-138", "PopopxEcoModels.swift:487-495", "Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:381-383"],
    label: {
      en: "Can the commercial service account be self-hosted?",
      ru: "Может ли коммерческий сервис-аккаунт быть самостоятельно размещённым?",
      de: "Lässt sich der kommerzielle Service-Account selbst hosten?",
      fr: "Le compte de service commercial peut-il être auto-hébergé ?",
      it: "L’account di servizio commerciale può essere self-hosted?",
      nl: "Kan het commerciële serviceaccount zelf gehost worden?",
      cs: "Lze komerční servisní účet hostovat vlastními silami?",
      "zh-Hans": "商业服务号能否自托管？",
      "zh-Hant": "商業服務號能否自託管？",
      es: "¿Puede autoalojarse la cuenta comercial de servicio?",
      pl: "Czy komercyjne konto serwisowe można hostować samodzielnie?",
      ja: "商用サービスアカウントはセルフホストできますか？",
      th: "บัญชีบริการเชิงพาณิชย์โฮสต์เองได้ไหม?",
      fi: "Voidaanko kaupallinen tilinhoitaja asettaa omalle palvelimelle?",
      uk: "Чи можна самостійно розмістити комерційний сервіс-обліковий запис?",
      bg: "Може ли търговският сервизен профил да се самохоства?",
      tr: "Ticari hizmet hesabı kendin-barındırılabilir mi?",
      hu: "Önmagában üzemeltethető a kereskedelmi szolgáltatási fiók?",
    },
    cells: {
      popopx: { v: "full", t: {
        en: "The service-account suite ships as its own public repository with its own portal; the client enforces the menu and card rules itself, and the server table it accepts is signed by the pinned Ed25519 root.",
        ru: "Набор сервис-аккаунтов поставляется как отдельный открытый репозиторий со своим порталом; клиент сам применяет правила меню и карточек, а принимаемая таблица серверов подписана закреплённым Ed25519-корнем.",
        de: "Die Service-Account-Suite erscheint als eigenes öffentliches Repository mit eigenem Portal; der Client erzwingt Menü- und Kartenregeln selbst, und die akzeptierte Servertabelle ist vom gepinnten Ed25519-Root signiert.",
        fr: "La suite de comptes de service est son propre dépôt public avec son propre portail ; le client applique lui-même les règles de menu et de carte, et la table de serveurs acceptée est signée par la racine Ed25519 épinglée.",
        it: "La suite di account di servizio è un repository pubblico proprio con un proprio portale; il client applica da sé le regole di menu e di carta, e la tabella di server accettata è firmata dalla radice Ed25519 fissata.",
        nl: "De serviceaccount-suite verschijnt als een eigen openbare repository met een eigen portaal; de cliënt handhaaft menu- en kaartregels zelf, en de aanvaarde servertabel is ondertekend door de vastgepinde Ed25519-root.",
        cs: "Balíček servisních účtů vychází jako vlastní veřejný repozitář s vlastním portálem; klient sám vynucuje pravidla menu a karet, a přijímaná serverová tabulka je podepsaná připnutým kořenem Ed25519.",
        "zh-Hans": "服务号套件本身是一个公开仓库并有自己的门户；菜单与卡片规则由客户端自己执行，而它接受的服务器表由钉死的 Ed25519 信任根签名。",
        "zh-Hant": "服務號套件本身是一個公開倉庫並有自己的入口網站；選單與卡片規則由用戶端自行執行，而它接受的伺服器表由釘選的 Ed25519 信任根簽名。",
        es: "La suite de cuentas de servicio se publica como su propio repositorio público con su propio portal; el cliente aplica por sí mismo las reglas de menú y de tarjeta, y la tabla de servidores aceptada está firmada por la raíz Ed25519 fijada.",
        pl: "Pakiet kontów serwisowych jest osobnym publicznym repozytorium z osobnym portalem; klient sam stosuje reguły menu i kart, a przyjmowana tabela serwerów jest podpisana przytwierdzonym korzeniem Ed25519.",
        ja: "サービスアカウントのスイートはそれ自体が独立した公開リポジトリで、専用のポータルを持ちます。メニューとカードの規則はクライアント自身が適用し、受け入れるサーバー一覧は固定した Ed25519 ルートで署名されます。",
        th: "ชุดบัญชีบริการเผยแพร่เป็นเรโปสาธารณะของตัวเองพร้อมพอร์ทัลของตัวเอง ไคลเอนต์บังคับกติกาย่อยและบัตรด้วยตัวเอง และตารางเซิร์ฟเวอร์ที่ยอมรับถูกเซ็นด้วยราก Ed25519 ที่ตรึงไว้",
        fi: "Service account -paketti julkaisetaan omana julkisena repositorianaan, omalla portaalillaan; client panee menu- ja korttisäännöt itse voimaan, ja hyväksytty palvelintaulu on sidotun Ed25519-juuren allekirjoittama.",
        uk: "Набір сервіс-облікових записів виходить як власний відкритий репозиторій із власним порталом; клієнт сам застосовує правила меню та карток, а прийнята таблиця серверів підписана закріпленим коренем Ed25519.",
        bg: "Комплектът със сервизни профили излиза като собственото си публично хранилище със собствен портал; клиентът сам налага правилата за меню и карти, а приетата сървърна таблица е подписана от закрепения Ed25519 корен.",
        tr: "Hizmet hesabı paketi kendi portalıyla ayrı bir herkese açık depo olarak yayımlanır; menü ve kart kurallarını istemci kendisi uygular ve kabul edilen sunucu tablosu sabitlenmiş Ed25519 köküyle imzalanır.",
        hu: "A szolgáltatási fiókcsomag saját nyilvános repóban van és saját portállal bír; a kliens maga hajtja végre a menü- és kártyaszabályokat, és az elfogadott szervertáblát a rögzített Ed25519 gyökér írta alá.",
      } },
      central: { v: "none", t: {
        en: "On a centralized platform the commercial account is issued and operated by the platform itself; a third party cannot host that same service from its own machine room.",
        ru: "На централизованной платформе коммерческий аккаунт выдаётся и управляется самой платформой; третья сторона не может разместить тот же сервис из собственного машинного зала.",
        de: "Auf einer zentralisierten Plattform wird das kommerzielle Konto von der Plattform selbst ausgegeben und betrieben; ein Dritter kann denselben Dienst nicht aus seinem eigenen Maschinenraum hosten.",
        fr: "Sur une plateforme centralisée, le compte commercial est émis et exploité par la plateforme elle-même ; un tiers ne peut pas héberger ce même service depuis sa propre salle machine.",
        it: "Su una piattaforma centralizzata l’account commerciale è emesso e gestito dalla piattaforma stessa; un terzo non può hostare quello stesso servizio dalla propria sala macchine.",
        nl: "Op een gecentraliseerd platform wordt het commerciële account door het platform zelf uitgegeven en beheerd; een derde kan diezelfde dienst niet uit zijn eigen machinekamer hosten.",
        cs: "Na centralizované platformě vydává a provozuje komerční účet sama platforma; třetí strana nemůže tutéž službu hostovat ze své vlastní strojovny.",
        "zh-Hans": "在中心化平台上，商业账号由平台自身签发并运营，第三方无法在自己的机房里托管同一个服务。",
        "zh-Hant": "在中心化平台上，商業帳號由平台本身簽發並營運，第三方無法在自己的機房託管同一個服務。",
        es: "En una plataforma centralizada la cuenta comercial la emite y opera la propia plataforma; un tercero no puede alojar ese mismo servicio desde su propia sala de máquinas.",
        pl: "Na platformie scentralizowanej konto komercyjne wydaje i prowadzi sama platforma; strona trzecia nie może hostować tej samej usługi z własnej serwerowni.",
        ja: "集中型プラットフォームでは商用アカウントをプラットフォーム自体が発行・運用するため、第三者が自前の機械室で同じサービスをホストすることはできません。",
        th: "บนแพลตฟอร์มแบบรวมศูนย์ บัญชีเชิงพาณิชย์ออกและดำเนินการโดยตัวแพลตฟอร์มเอง บุคคลที่สามไม่สามารถโฮสต์บริการเดียวกันจากห้องเครื่องของตัวเอง",
        fi: "Keskitetyllä alustalla kaupallisen tilin myöntää ja ylläpitää itse alusta; kolmas osapuoli ei voi isännöidä samaa palvelua omasta konehuoneestaan.",
        uk: "На централізованій платформі комерційний запис видає й обслуговує сама платформа; третя сторона не може розмістити ту саму службу у власному машинному залі.",
        bg: "В централизирана платформа търговският профил се издава и управлява от самата платформа; трета страна не може да хоства същата услуга от собственото си машинно помещение.",
        tr: "Merkezi bir platformda ticari hesabı platformun kendisi düzenler ve işletir; üçüncü bir taraf aynı hizmeti kendi makine odasından barındıramaz.",
        hu: "Központosított platformon a kereskedelmi fiókot a platform maga állítja ki és üzemelteti; egy harmadik fél nem hostolhatja ugyanazt a szolgáltatást a saját gépházából.",
      } },
      e2ee: { v: "partial", t: {
        en: "The server software of that category is often open and self-hostable, yet the official-account function normally stays with whoever operates the network, so self-hosting does not hand the role over.",
        ru: "Серверное ПО этой категории часто открыто и может размещаться самостоятельно, но функция официальных аккаунтов обычно остаётся у того, кто управляет сетью, поэтому самостоятельное размещение не передаёт эту роль.",
        de: "Die Server-Software dieser Kategorie ist oft offen und selbst hostbar, die Amtskonto-Funktion bleibt aber meist beim Betreiber des Netzes, sodass Self-Hosting die Rolle nicht überträgt.",
        fr: "Le logiciel serveur de cette catégorie est souvent ouvert et auto-hébergeable, mais la fonction de compte officiel reste normalement à celui qui exploite le réseau, donc l’auto-hébergement ne transfère pas ce rôle.",
        it: "Il software server di quella categoria è spesso aperto e self-hostabile, eppure la funzione di account ufficiale resta di norma a chi gestisce la rete, quindi il self-hosting non cede quel ruolo.",
        nl: "De serversoftware van die categorie is vaak open en zelf te hosten, maar de officiële-accountfunctie blijft normaal bij wie het netwerk beheert, dus self-hosting geeft die rol niet door.",
        cs: "Serverový software této kategorie je často open source a self-hostovatelný, ale funkce oficiálního účtu zůstává obvykle u provozovatele sítě, takže vlastní hosting tuto roli nepřevádí.",
        "zh-Hans": "这类工具的服务器软件通常是开源、可自托管的，但官方账号的职能一般仍由网络运营方保留，自托管并不把该角色转移出来。",
        "zh-Hant": "這類工具的伺服器軟體通常是開放原始碼、可自託管的，但官方帳號的職能一般仍由網路營運方保留，自託管並不把該角色轉移出來。",
        es: "El software del servidor de esa categoría suele ser abierto y autoalojable, pero la función de cuenta oficial normalmente se queda con quien opera la red, así que el autoalojamiento no transfiere ese rol.",
        pl: "Oprogramowanie serwerowe tej kategorii bywa otwarte i możliwe do samodzielnego hostowania, lecz funkcja konta oficjalnego zwykle zostaje u podmiotu zarządzającego siecią, więc samodzielny hosting tej roli nie przenosi.",
        ja: "この種類のサーバーソフトはしばしばオープンでセルフホスト可能ですが、公式アカウント機能は通常、ネットワークの事業者側に残るため、セルフホストでも役割は移りません。",
        th: "ซอฟต์แวร์เซิร์ฟเวอร์ของหมวดนั้นมักเปิดและโฮสต์เองได้ แต่ฟังก์ชันบัญชีทางการมักยังอยู่กับผู้ดำเนินการเครือข่าย การโฮสต์เองจึงไม่ได้โอนบทบาทนั้นมา",
        fi: "Tämän kategorian palvelinohjelmisto on avoin ja usein itse isännöitävissä, mutta virallisen tilin toiminto jää yleensä verkkoa ylläpitävälle, joten omassa palvelimessa isännöinti ei siirrá roolia.",
        uk: "Серверне ПЗ цієї категорії часто відкрите й таке, що можна розмістити самостійно, але функція офіційного запису зазвичай лишається в того, хто експлуатує мережу, тож самостійне розміщення цю роль не передає.",
        bg: "Сървърният софтуер на тази категория често е отворен и самохостаем, но функцията за официален профил обикновено остава при този, който управлява мрежата, затова самохостването не прехвърля ролята.",
        tr: "Bu kategorinin sunucu yazılımı çoğu zaman açık ve kendin-barındırılabilir olur, ama resmi hesap işlevi normalde ağ işleten tarafta kalır; dolayısıyla self-hosting o rolü devretmez.",
        hu: "Az adott kategória szerverszoftvere gyakran nyílt és önmagában üzemeltethető, de a hivatalos fiók funkciója rendesen a hálózat üzemeltetőjénél marad, így az önüzemeltetés nem adja át ezt a szerepet.",
      } },
    },
  },
];

/** Locale-free citation index for the POPOPX column — copy-paste ready. */
const POPOPX_LEDGER = [
  "identity    Shared/Views/Onboarding/OnboardingView.swift:83 · Shared/Model/ChatModel.swift:426",
  "graph       POPOPXChat/APITypes.swift:589-615,597-604",
  "offline     PopopxBLETransport.swift:5,26,45-49 · PopopxGCSFilter.swift:5-7 · PopopxMessageRouter.swift:6-19,268",
  "metadata    PopopxMediaEngine.swift:18-24,366-378,433-442 · animated pass-through :25-27",
  "accounts    BotMenuBarView.swift:40-42,137-138 · PopopxEcoModels.swift:487-495",
].join("\n");

export function ComparisonMatrix(): ReactElement {
  const { locale } = useLocale();

  return (
    <section id="comparison" aria-label={pick(HEAD.title, locale)} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={HEAD.eyebrow} title={HEAD.title} subtitle={HEAD.subtitle} />

        {/* ── verdict legend ─────────────────────────────────────────── */}
        <div className="glass mt-10 p-5 sm:p-7">
          <p className="eyebrow">{pick(HEAD.legendHead, locale)}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {(["full", "partial", "none"] as Verdict[]).map((v) => (
              <li key={v} className="pill py-1 text-[11px]">
                <StatusDot tone={VERDICTS[v].tone} />
                <span aria-hidden className={`font-mono ${VERDICTS[v].className}`}>{VERDICTS[v].mark}</span>
                <span className={VERDICTS[v].className}>{pick(VERDICTS[v].name, locale)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11.5px] leading-relaxed text-faint">{pick(HEAD.legendNote, locale)}</p>
        </div>

        {/* ── the matrix ─────────────────────────────────────────────── */}
        <div className="glass mt-6 p-5 sm:p-7">
          <div className="no-scrollbar mt-1 overflow-x-auto">
            <table className="w-full min-w-[1020px] border-separate border-spacing-0 text-left text-[12px] leading-relaxed">
              <thead>
                <tr>
                  <th scope="col" className="w-[236px] border-b border-hair pb-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-brand-soft">{pick(HEAD.colQuestion, locale)}</th>
                  {COLUMNS.map((col) => (
                    <th key={col.id} scope="col" className="border-b border-hair pb-2 pr-4 align-top">
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-soft">{pick(col.name, locale)}</span>
                      <code className="mt-1 block font-mono text-[9.5px] text-faint">{col.tag}</code>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DIMENSIONS.map((dim) => (
                  <tr key={dim.id}>
                    <th scope="row" className="border-b border-hair py-4 pr-4 text-left align-top">
                      <span aria-hidden className="mr-2 font-mono text-[11px] text-brand-soft">{dim.mark}</span>
                      <span className="text-[12.5px] font-semibold text-white">{pick(dim.label, locale)}</span>
                    </th>
                    {COLUMNS.map((col) => {
                      const cell = dim.cells[col.id];
                      return (
                        <td key={col.id} className="border-b border-hair py-4 pr-4 align-top">
                          <span className="mb-1.5 inline-flex items-center gap-1.5">
                            <StatusDot tone={VERDICTS[cell.v].tone} />
                            <span aria-hidden className={`font-mono text-[11px] ${VERDICTS[cell.v].className}`}>{VERDICTS[cell.v].mark}</span>
                            <span className={`text-[10.5px] uppercase tracking-wide ${VERDICTS[cell.v].className}`}>{pick(VERDICTS[cell.v].name, locale)}</span>
                          </span>
                          <p className="text-mute">{pick(cell.t, locale)}</p>
                          {col.id === "popopx" ? (
                            <ul className="mt-2 flex flex-col gap-1 font-mono text-[10px] leading-snug text-faint">
                              {dim.cites.map((cite) => (<li key={cite}>{cite}</li>))}
                            </ul>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── the POPOPX column, cited ───────────────────────────────── */}
        <div className="mt-6">
          <CodeBlock code={POPOPX_LEDGER} showCopy={false} maxHeightClass="max-h-[168px]" />
        </div>
        <p className="hairline-top mt-5 text-[11.5px] leading-relaxed text-faint">
          {pick(HEAD.closing, locale)}{" "}
          <a href={IOS_REPO_URL} target="_blank" rel="noreferrer" className="text-brand-soft underline decoration-brand/50 underline-offset-2">popopx-chat</a>.
        </p>
      </div>
    </section>
  );
}

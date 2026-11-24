"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { BOT_STUDIO_REPO_URL, IOS_REPO_URL, MP_PORTAL_URL, NODE_PORTAL_URL, NODE_REPO_URL, SITE_HOST, SUITE_REPO_URL } from "@/lib/site";
import { SectionHeading, StatusDot } from "@/components/ui";

/**
 * EcosystemHub — section `ecosystem`: one project, three official hosts and one
 * project that is only a repository so far (Bot Studio, ledger §14).
 *
 * Every claim is read out of the sibling projects, not written for the page: ledger §11 of
 * `docs/FACTS.md` plus `src/lib/site.ts` (hosts, licences, unregistered marks); Mac Node
 * `../node-popopx-chat-web/README.md:3-8,18-21,116` (ten Discover engines, tier rules, memory
 * ladder, release asset with its digest, AGPL-3.0-only) and its `src/data/enginesCatalog.ts`;
 * Service Suite `../popopx-service-suite-web/README.md:9-16,143-148` (gateway, billing, channel
 * envelope encryption, five ready plugins, admin console, three install paths) and `src/lib/site.ts:11-17`;
 * iOS client: ledger §1 (18 localizations), §2 (five tabs; English is the key itself), §3 (no phone
 * number, no e-mail, no global public key), §10 (iOS 17.0), §11 (AGPL-3.0, unregistered marks).
 * Sibling hosts are only ever linked — nothing loads from another origin, and the diagram below is
 * divs plus one inline SVG: no image, no library, no extra copy slot. The bus stays with the three
 * hosts on purpose: a name that does not resolve is not drawn as a node of a running network.
 */

type Tone = "brand" | "mesh" | "warn" | "alert";

/** `name`, `host`, `href`, `source` and `chips` stay locale-free identifiers. */
type Portal = {
  name: string;
  /** `hosted` = a live origin (drawn on the bus); `source` = repository only. */
  kind: "hosted" | "source";
  host: string;
  href: string;
  external: boolean;
  source: string;
  tone: Tone;
  role: Localized<string>;
  desc: Localized<string>;
  lives: Localized<string>;
  chips: string[];
};

const EYEBROW: Localized<string> = {
  en: "Three-in-one ecosystem",
  ru: "Экосистема из трёх частей",
  de: "Ökosystem aus drei Teilen",
  fr: "Écosystème en trois parties",
  it: "Ecosistema in tre parti",
  nl: "Ecosysteem in drie delen",
  cs: "Ekosystém ze tří částí",
  "zh-Hans": "三位一体生态",
  "zh-Hant": "三位一體生態",
  es: "Ecosistema de tres piezas",
  pl: "Ekosystem z trzech części",
  ja: "三位一体のエコシステム",
  th: "ระบบนิเวศสามส่วน",
  fi: "Kolmiosainen ekosysteemi",
  uk: "Екосистема з трьох частин",
  bg: "Екосистема от три части",
  tr: "Üç parçalı ekosistem",
  hu: "Három részes ökoszisztéma",
};

const TITLE: Localized<string> = {
  en: "One POPOPX, three official hosts",
  ru: "Один POPOPX — три официальных сайта",
  de: "Ein POPOPX, drei offizielle Hosts",
  fr: "Un POPOPX, trois hôtes officiels",
  it: "Un POPOPX, tre host ufficiali",
  nl: "Eén POPOPX, drie officiële hosts",
  cs: "Jeden POPOPX, tři oficiální weby",
  "zh-Hans": "一个 POPOPX，三个官方站点",
  "zh-Hant": "一個 POPOPX，三個官方網站",
  es: "Un POPOPX, tres sitios oficiales",
  pl: "Jeden POPOPX, trzy oficjalne witryny",
  ja: "ひとつの POPOPX、3 つの公式サイト",
  th: "POPOPX หนึ่งเดียว กับสามเว็บไซต์ทางการ",
  fi: "Yksi POPOPX, kolme virallista sivusto-osoitetta",
  uk: "Один POPOPX — три офіційні сайти",
  bg: "Един POPOPX, три официални сайта",
  tr: "Tek POPOPX, üç resmî site",
  hu: "Egy POPOPX, három hivatalos weboldal",
};

const LEAD: Localized<string> = {
  en: "The client in your pocket, the compute on your Mac, the service-account suite on a server you run yourself: three independent static portals that link to one another and load nothing from each other.",
  ru: "Клиент в кармане, вычисления на Mac, набор сервисных аккаунтов на сервере, который вы держите сами: три независимых статичных портала, связанных ссылками и ничего друг у друга не загружающих.",
  de: "Der Client in der Tasche, die Rechenleistung auf dem Mac, die Dienstkonten-Suite auf dem eigenen Server: drei unabhängige statische Portale, die einander verlinken und nichts voneinander laden.",
  fr: "Le client dans la poche, le calcul sur le Mac, la suite de comptes de service sur un serveur qui vous appartient : trois portails statiques indépendants qui se lient entre eux et ne chargent rien les uns des autres.",
  it: "Il client in tasca, la potenza di calcolo sul Mac, la suite degli account di servizio su un server che gestite voi: tre portali statici indipendenti che si collegano tra loro e non caricano nulla gli uni dagli altri.",
  nl: "De client in je zak, de rekenkracht op je Mac, de dienstaccountsuite op een server die je zelf draait: drie onafhankelijke statische portalen die naar elkaar verwijzen en niets van elkaar laden.",
  cs: "Klient v kapse, výkon na Macu, sada služebních účtů na serveru, který provozujete sami: tři nezávislé statické portály, které se navzájem odkazují a navzájem si nic nenačítají.",
  "zh-Hans": "口袋里的客户端、Mac 上的本地算力、你自己服务器上的服务号套件：三个各自独立部署的静态站点，彼此之间只有链接，不会从对方加载任何资源。",
  "zh-Hant": "口袋裡的客戶端、Mac 上的本機算力、你自己伺服器上的服務號套件：三個各自獨立部署的靜態網站，彼此之間只有連結，不會從對方載入任何資源。",
  es: "El cliente en el bolsillo, el cálculo en el Mac y la suite de cuentas de servicio en un servidor propio: tres portales estáticos independientes que se enlazan entre sí y no cargan nada unos de otros.",
  pl: "Klient w kieszeni, obliczenia na Maku, pakiet kont serwisowych na serwerze, który prowadzisz sam: trzy niezależne statyczne portale, które się wzajemnie linkują i niczego od siebie nie pobierają.",
  ja: "ポケットの中のクライアント、Mac の上のローカル計算、自分のサーバーの上のサービスアカウント一式——相互にリンクするだけの独立した 3 つの静的ポータルで、互いのサイトから何も読み込みません。",
  th: "ไคลเอนต์อยู่ในกระเป๋า การคำนวณอยู่บน Mac ชุดบัญชีบริการอยู่บนเซิร์ฟเวอร์ที่คุณรันเอง: พอร์ทัลสถิตอิสระสามแห่งที่ลิงก์หากัน โดยไม่ได้โหลดสิ่งใดจากกัน",
  fi: "Asiakas taskussa, laskenta Macissä, palvelutilien paketti omalla palvelimellasi: kolme toisiaan linkittävää itsenäistä staattista portaalia, jotka eivät lataa toisiltaan mitään.",
  uk: "Клієнт у кишені, обчислення на Mac, набір сервісних акаунтів на сервері, який ви тримаєте самі: три незалежні статичні портали, пов’язані посиланнями й нічого один в одного не завантажують.",
  bg: "Клиентът в джоба, изчислението на Mac, пакетът за сервисни акаунти на сървър, който пускате сами: три независими статични портала, свързани с препратки и нищо едно от друго не зареждащи.",
  tr: "Cepte istemci, Mac’te hesaplama gücü, hizmet hesapları paketi kendi sunucunuzda: birbirine link veren, birbirinden hiçbir şey yüklemeyen üç bağımsız statik portal.",
  hu: "Az ügyfél a zsebedben, a számítás a Macen, a szolgáltatási fiókok csomagja a saját szerveredben: három egymásra linkelő, egymástól semmit be nem töltő önálló statikus portál.",
};

const LINK_SOURCE: Localized<string> = {
  en: "GitHub repository",
  ru: "Репозиторий на GitHub",
  de: "GitHub-Repository",
  fr: "Dépôt GitHub",
  it: "Repository GitHub",
  nl: "GitHub-repo",
  cs: "Repozitář na GitHubu",
  "zh-Hans": "GitHub 源码仓库",
  "zh-Hant": "GitHub 原始碼倉庫",
  es: "Repositorio en GitHub",
  pl: "Repozytorium GitHub",
  ja: "GitHub リポジトリ",
  th: "ซอร์สบน GitHub",
  fi: "GitHub-repo",
  uk: "Репозиторій на GitHub",
  bg: "Хранилище в GitHub",
  tr: "GitHub deposu",
  hu: "GitHub-tároló",
};

/** Nothing in `role`, `desc` or `lives` is marketing: each is the sibling README's own wording. */
const PORTALS: Portal[] = [
  {
    name: "POPOPX iOS",
    kind: "hosted",
    host: SITE_HOST,
    href: "#top",
    external: false,
    source: IOS_REPO_URL,
    tone: "brand",
    role: {
      en: "Flagship client",
      ru: "Флагманский клиент",
      de: "Flaggschiff-Client",
      fr: "Client phare",
      it: "Client di punta",
      nl: "Vlaggenschip-client",
      cs: "Vlajkový klient",
      "zh-Hans": "旗舰客户端",
      "zh-Hant": "旗艦客戶端",
      es: "Cliente insignia",
      pl: "Flagowy klient",
      ja: "フラッグシップ・クライアント",
      th: "ไคลเอนต์เรือธง",
      fi: "Lippulaiva-asiakas",
      uk: "Флагманський клієнт",
      bg: "Флагмански клиент",
      tr: "Amiral gemisi istemcisi",
      hu: "Zászlóshajó ügyfél",
    },
    desc: {
      en: "Five tabs — Messages, Contacts, Cabin, Discover, Me — shipped in 18 localizations, with no phone number, no e-mail and no global user ID. Every technical sentence on this portal is traceable to the shipping Swift source.",
      ru: "Пять разделов навигации и 18 локализаций; без номера телефона, без почты и без глобального ID пользователя. Всё, что портал утверждает о клиенте, проверяется по исходному Swift-коду.",
      de: "Fünf Bereiche in 18 Lokalisierungen – ohne Telefonnummer, ohne E-Mail, ohne globale Benutzer-ID. Jeder technische Satz auf diesem Portal lässt sich im ausgelieferten Swift-Quellcode nachlesen.",
      fr: "Cinq onglets en 18 localizations — sans numéro de téléphone, sans courriel, sans identifiant global. Chaque phrase technique de ce portail se vérifie dans le source Swift livré.",
      it: "Cinque sezioni in 18 localizzazioni; niente numero di telefono, niente e-mail, niente ID globale. Ogni frase tecnica di questo portale è verificabile nel sorgente Swift pubblicato.",
      nl: "Vijf tabbladen in 18 lokalisaties; geen telefoonnummer, geen e-mail, geen gebruikers-ID. Elke technische zin op dit portal is terug te vinden in de meegeleverde Swift-broncode.",
      cs: "Pět záložek v 18 lokalizacích; bez telefonního čísla, bez e-mailu, bez globálního ID. Každou technickou větu na tomto portálu lze dohledat v dodaném Swiftu.",
      "zh-Hans": "消息、联系人、厢语、发现与我五个栏位，自带 18 种本地化；不绑定手机号、邮箱，也没有全局用户 ID。本站每一句技术描述都能回到出厂的 Swift 源码。",
      "zh-Hant": "訊息、聯絡人、廂語、發現與我五個欄位，自帶 18 種本地化；不綁定手機號、電郵，也沒有全域使用者 ID。本站每一句技術描述都能回到出廠的 Swift 原始碼。",
      es: "Cinco pestañas en 18 localizaciones; sin número de teléfono, sin correo, sin ID global. Cada frase técnica de este portal es rastreable en el código Swift publicado.",
      pl: "Pięć zakładek w 18 lokalizacjach; bez numeru telefonu, bez poczty, bez globalnego ID. Każde zdanie techniczne na tym portalu da się sprawdzić w dostarczonym Swiftzie.",
      ja: "5 つのタブと 18 のローカライズ。電話番号もメールもグローバルなユーザー ID もありません。このポータルの技術的文はすべて、出荷済みの Swift ソースに辿れます。",
      th: "ห้าแถบหลักพร้อมการรองรับ 18 ภาษา ไม่มีเบอร์โทร ไม่มีอีเมล ไม่มี ID สากล ข้อความเชิงเทคนิคทุกประโยคบนพอร์ทัลนี้ตามกลับไปดูในซอร์ส Swift ที่ส่งออกจริงได้",
      fi: "Viisi välilehteä ja 18 kieliversiota; ei puhelinnumeroa, ei sähköpostia, ei globaalia käyttäjätunnistetta. Tämän portaalin jokainen tekninen väite on tarkistettavissa toimitetusta Swift-lähdekoodista.",
      uk: "П’ять вкладок і 18 локалізацій; без номера телефону, без пошти, без глобального ID. Кожне технічне речення цього порталу можна звірити з надісланим Swift-кодом.",
      bg: "Пет раздела и 18 локализации; без телефонен номер, без имейл, без глобален ID. Всяко техническо твърдение в този портал може да се проследи до доставения Swift код.",
      tr: "Beş sekme ve 18 yerelleştirme; telefon numarası yok, e-posta yok, küresel kullanıcı kimliği yok. Bu portaldaki her teknik cümle, dağıtılan Swift kaynağında doğrulanabilir.",
      hu: "Öt fül 18 lokalizációval; telefonszám, e-mail és globális felhasználói ID nélkül. A portál minden technikai állítása a szállított Swift forrásban ellenőrizhető.",
    },
    lives: {
      en: "On this host: the feature grid, the security architecture and the comparison table — three anchors of one page.",
      ru: "Здесь: матрица функций, архитектура безопасности и сравнительная таблица — три якоря одной страницы.",
      de: "Hier: Feature-Matrix, Sicherheitsarchitektur und Vergleichstabelle — drei Anker derselben Seite.",
      fr: "Sur ce site : la matrice de fonctionnalités, l’architecture de sécurité et le tableau comparatif — trois ancres d’une seule page.",
      it: "Su questo sito: la matrice delle funzioni, l’architettura di sicurezza e la tabella comparativa — tre ancore della stessa pagina.",
      nl: "Op deze site: de featuresmatrix, de beveiligingsarchitectuur en de vergelijkingstabel — drie ankers op één pagina.",
      cs: "Na tomto webu: matice funkcí, architektura zabezpečení a srovnávací tabulka — tři kotvy jedné stránky.",
      "zh-Hans": "本站上：功能矩阵、安全架构与对照表——同一页里的三个锚点区。",
      "zh-Hant": "本站上：功能矩陣、安全架構與對照表——同一頁裡的三個錨點區。",
      es: "En este sitio: la matriz de funciones, la arquitectura de seguridad y la tabla comparativa — tres anclas de una sola página.",
      pl: "Na tej stronie: macierz funkcji, architektura bezpieczeństwa i tabela porównawcza — trzy kotwice jednej strony.",
      ja: "このサイトで: 機能マトリクス、セキュリティ設計、比較表——1 ページ内の 3 つのアンカー。",
      th: "บนไซต์นี้: ตารางฟีเจอร์ สถาปัตยกรรมความปลอดภัย และตารางเปรียบเทียบ — สามจุดโยงบนหน้าเดียว",
      fi: "Tällä sivustolla: ominaisuusmatriisi, tietoturva-arkkitehtuuri ja vertailutaulu — saman sivun kolme ankkuria.",
      uk: "Тут: матриця функцій, архітектура безпеки й порівняльна таблиця — три якорі однієї сторінки.",
      bg: "На този сайт: матрица на функциите, архитектурата на сигурността и сравнителната таблица — три котви на една страница.",
      tr: "Bu sitede: özellik matrisi, güvenlik mimarisi ve karşılaştırma tablosu — tek sayfadaki üç bağlama noktası.",
      hu: "Ezen a helyen: funkciómátrix, biztonsági architektúra és összehasonlító táblázat — egyetlen oldal három horgonypontja.",
    },
    chips: [SITE_HOST, "AGPL-3.0", "iOS 17.0", "popopx://", "127.0.0.1:3000 / :3016"],
  },
  {
    name: "POPOPX Mac Node",
    kind: "hosted",
    host: "node.popopx.chat",
    href: NODE_PORTAL_URL,
    external: true,
    source: NODE_REPO_URL,
    tone: "mesh",
    role: {
      en: "On-device intelligence engine",
      ru: "Интеллектуальный движок на устройстве",
      de: "Gerätseitige Intelligenz-Engine",
      fr: "Moteur d’intelligence embarqué",
      it: "Motore di intelligenza locale",
      nl: "Intelligentie-engine op het apparaat",
      cs: "Inteligence přímo v zařízení",
      "zh-Hans": "Mac 端侧智能引擎",
      "zh-Hant": "Mac 端側智慧引擎",
      es: "Motor de inteligencia en el dispositivo",
      pl: "Silnik inteligencji na urządzeniu",
      ja: "デバイス上の推論エンジン",
      th: "ขุมพลังอัจฉริยะบนอุปกรณ์",
      fi: "Laitteessa suorittava älymoottori",
      uk: "Інтелектуальний рушій на пристрої",
      bg: "Интелигентен двигател в устройството",
      tr: "Cihaz üstü zekâ motoru",
      hu: "Eszközön futó intelligenciamotor",
    },
    desc: {
      en: "The macOS companion that runs the local compute behind the ten Discover engines of the iOS client. Its three tier rules and its memory ladder come from the shipping app, not from a slide.",
      ru: "Спутник для macOS: локальные вычисления десяти движков Discover идут отсюда. Правила трёх уровней и шкала памяти взяты из самого приложения, а не из презентации.",
      de: "Der macOS-Begleiter, auf dem die lokale Rechenleistung hinter den zehn Discover-Engines des iOS-Clients läuft. Die drei Stufenregeln und die Speichertreppe stammen aus der ausgelieferten App, nicht aus einer Folie.",
      fr: "Le compagnon macOS qui exécute le calcul local des dix moteurs Discover du client iOS. Ses règles à trois niveaux et son échelle mémoire viennent de l’application livrée, pas d’un diaporama.",
      it: "Il compagno macOS che esegue il calcolo locale dei dieci motori Discover del client iOS. Le regole su tre livelli e la scala di memoria vengono dall’app pubblicata, non da una slide.",
      nl: "De macOS-metgezel die de lokale rekenkracht achter de tien Discover-engines van de iOS-client draait. De drie regels en de geheugentrap komen uit de meegeleverde app, niet uit een slide.",
      cs: "Doplněk pro macOS, který zajišťuje lokální výpočty za deseti enginey Discover. Pravidla tří úrovní i paměťový žebříček pocházejí z dodané aplikace, ne z prezentace.",
      "zh-Hans": "macOS 伴侣应用：iOS 客户端发现页十个引擎的本地算力都跑在自己的机器上。它的三档规则与内存阶梯都取自出厂应用，不是宣传稿。",
      "zh-Hant": "macOS 夥伴應用程式：iOS 客戶端發現頁十個引擎的本機算力都跑在自己的機器上。它的三檔規則與記憶體階梯都取自出廠應用，不是宣傳稿。",
      es: "El compañero de macOS que ejecuta el cálculo local tras los diez motores Discover del cliente iOS. Sus reglas de tres niveles y su escalera de memoria salen de la app entregada, no de una diapositiva.",
      pl: "Towarzysz na macOS, na którym liczy się dziesięć silników Discover z klienta iOS. Trzy progi i drabinka pamięci pochodzą z samej aplikacji, nie ze slajdu.",
      ja: "iOS クライアントの Discover エンジン 10 基のローカル計算を担う macOS のコンパニオンアプリ。3 段階のルールもメモリ階梯も、スライドではなく出荷済みアプリから取られています。",
      th: "แอปคู่บน macOS ที่รับหน้าที่คำนวณในเครื่องให้เอนจิน Discover ทั้งสิบของไคลเอนต์ iOS กติกาสามระดับและบันไดหน่วยความจำมาจากแอปที่ส่งออกจริง ไม่ใช่สไลด์",
      fi: "Macin kumppanisovellus, joka hoitaa iOS-asiakkaan kymmenen Discover-moottorin paikallisen laskennan. Kolmen portaan säännöt ja muistitikku otetaan itse sovelluksesta eivätkä dioista.",
      uk: "Супутник для macOS, на якому рахується локальна потужність десяти рушіїв Discover iOS-клієнта. Його правила трьох рівнів і шкала пам’яті взяті з додатка, а не зі слайдів.",
      bg: "Съпутникът за macOS, който изпълнява локалните изчисления за десетте Discover двигателя на iOS клиента. Правилата за три нива и скалата с памет идват от приложението, не от презентация.",
      tr: "iOS istemcisinin on Discover motorunun yerel hesabını çalıştıran macOS yardımcısı. Üç kademe kuralları ve bellek merdiveni sunumdan değil, dağıtılan uygulamanın kendisinden alındı.",
      hu: "A macOS-i társalkalmazás, amely az iOS-ügyfél tíz Discover motorjának helyi számításait végzi. A három szint szabályai és a memória-létra a szállított appból valók, nem egy diavetítésből.",
    },
    lives: {
      en: "There: the ten engines with their shelves and prices, the memory ladder for Apple Silicon and the release asset with its digest.",
      ru: "Там: десять движков с их уровнями и ценами, шкала памяти Apple Silicon и релизный файл с контрольной суммой.",
      de: "Dort: die zehn Engines mit ihren Regalen und Preisen, die Speichertreppe für Apple Silicon und das Release-Artefakt mit seinem Digest.",
      fr: "Là-bas : les dix moteurs avec leurs rayons et leurs prix, l’échelle mémoire pour Apple Silicon et le fichier de publication avec son empreinte.",
      it: "Lassù: i dieci motori con i loro scaffali e prezzi, la scala di memoria per Apple Silicon e l’asset di rilascio con il suo digest.",
      nl: "Daar: de tien engines met hun schappen en prijzen, de geheugentrap voor Apple Silicon en het release-asset met zijn digest.",
      cs: "Tam: deset engineů s jejich policemi a cenami, paměťový žebříček pro Apple Silicon a soubor vydání s jeho digestem.",
      "zh-Hans": "在那里：十个引擎与它们的档位与价格、Apple Silicon 内存阶梯，以及带校验摘要的发布文件。",
      "zh-Hant": "在那裡：十個引擎與它們的檔位與價格、Apple Silicon 記憶體階梯，以及帶校驗摘要的發布檔案。",
      es: "Allí: los diez motores con sus estantes y precios, la escalera de memoria para Apple Silicon y el artefacto de publicación con su resumen.",
      pl: "Tam: dziesięć silników z ich półkami i cenami, drabinka pamięci dla Apple Silicon oraz plik wydania z jego skrótem.",
      ja: "あちら: 10 のエンジンとその棚と価格、Apple Silicon のメモリ階梯、そしてチェックサム付きのリリース資産。",
      th: "ตรงโน้น: สิบเอนจินพร้อมชั้นและราคา บันไดหน่วยความจำสำหรับ Apple Silicon และไฟล์เผยแพร่พร้อมค่า digest",
      fi: "Tuolla: kymmenen moottoria hyllyineen ja hintoineen, muistitikku Apple Siliconille ja julkaisutiedosto tiivisteineen.",
      uk: "Там: десять рушіїв із їхніми полицями та цінами, шкала пам’яті для Apple Silicon і релізний файл із його дайджестом.",
      bg: "Там: десетте двигателя с техните рафтове и цени, скалата с памет за Apple Silicon и релизният файл с неговия дайджест.",
      tr: "Şurada: rafları ve fiyatlarıyla on motor, Apple Silicon için bellek merdiveni ve özet değeriyle sürüm dosyası.",
      hu: "Ott: a tíz motor a polceivel és áraival, az Apple Silicon memória-létra és a kiadási fájl az ellenőrzőösszegével.",
    },
    chips: ["node.popopx.chat", "macOS", "AGPL-3.0-only", "POPOPX-Mac-Node-Universal.dmg"],
  },
  {
    name: "POPOPX Service Suite",
    kind: "hosted",
    host: "mp.popopx.chat",
    href: MP_PORTAL_URL,
    external: true,
    source: SUITE_REPO_URL,
    tone: "warn",
    role: {
      en: "Service accounts and zero-knowledge channels",
      ru: "Сервисные аккаунты и каналы с нулевым знанием",
      de: "Dienstkonten und Zero-Knowledge-Kanäle",
      fr: "Comptes de service et canaux zero-knowledge",
      it: "Account di servizio e canali a conoscenza zero",
      nl: "Dienstaccounts en zero-knowledge-kanalen",
      cs: "Servisní účty a kanály s nulovou znalostí",
      "zh-Hans": "服务号与零知识频道套件",
      "zh-Hant": "服務號與零知識頻道套件",
      es: "Cuentas de servicio y canales de conocimiento cero",
      pl: "Konta serwisowe i kanały o zerowej wiedzy",
      ja: "サービスアカウントとゼロ知識チャンネル",
      th: "บัญชีบริการและแชนเนลศูนย์ความรู้",
      fi: "Palvelutilit ja nollatiedon kanavat",
      uk: "Сервісні акаунти й канали з нульовим знанням",
      bg: "Сервисни акаунти и канали с нулево знание",
      tr: "Hizmet hesapları ve sıfır bilgi kanalları",
      hu: "Szolgáltatási fiókok és nullaismeret-csatornák",
    },
    desc: {
      en: "The backend behind service accounts and zero-knowledge channels: gateway, billing, channel envelope encryption, 117 HTTP interfaces, five ready-made plugins and the admin console in the browser.",
      ru: "Бэкенд сервисных аккаунтов и каналов с нулевым знанием: шлюз, биллинг, шифрование конвертов каналов, 117 HTTP-интерфейсов, пять готовых плагинов и консоль администратора в браузере.",
      de: "Das Backend hinter Dienstkonten und Zero-Knowledge-Kanälen: Gateway, Abrechnung, Umschlagverschlüsselung der Kanäle, 117 HTTP-Schnittstellen, fünf fertige Plugins und die Admin-Konsole im Browser.",
      fr: "Le back-end des comptes de service et des canaux zero-knowledge : passerelle, facturation, chiffrement des enveloppes de canal, 117 interfaces HTTP, cinq extensions prêtes et console d’administration dans le navigateur.",
      it: "Il backend degli account di servizio e dei canali a conoscenza zero: gateway, fatturazione, cifratura delle buste dei canali, 117 interfacce HTTP, cinque plugin pronti e console di amministrazione nel browser.",
      nl: "De backend achter dienstaccounts en zero-knowledge-kanalen: gateway, facturatie, omslagversleuteling van kanalen, 117 HTTP interfaces, vijf kant-en-klare plugins en de beheerconsole in de browser.",
      cs: "Backend za servisními účty a kanály s nulovou znalostí: brána, fakturace, šifrování obálek kanálů, 117 rozhraní HTTP, pět hotových modulů a konsola správce v prohlížeči.",
      "zh-Hans": "服务号与零知识频道背后的后端：网关、计费、频道信封加密、117 项 HTTP 接口、五个即用插件，还有浏览器里的管理台。",
      "zh-Hant": "服務號與零知識頻道背後的後端：閘道、計費、頻道信封加密、117 項 HTTP 介面、五個即用外掛，還有瀏覽器裡的管理台。",
      es: "El backend tras las cuentas de servicio y los canales de conocimiento cero: pasarela, facturación, cifrado de sobres del canal, 117 interfaces HTTP, cinco complementos listos y consola de administración en el navegador.",
      pl: "Backend kont serwisowych i kanałów o zerowej wiedzy: bramka, rozliczenia, szyfrowanie kopert kanałów, 117 interfejsów HTTP, pięć gotowych wtyczek i konsola administratora w przeglądarce.",
      ja: "サービスアカウントとゼロ知識チャンネルのバックエンド: ゲートウェイ、課金、チャンネル封筒の暗号化、117 の HTTP インターフェース、5 種類の既定プラグイン、ブラウザー上の管理コンソール。",
      th: "แบ็กเอนด์ที่อยู่หลังบัญชีบริการและแชนเนลศูนย์ความรู้: เกตเวย์ การเรียกเก็บเงิน การเข้ารหัสซองของแชนเนล อินเทอร์เฟซ HTTP 117 รายการ ปลั๊กอินพร้อมใช้ห้าตัว และคอนโซลผู้ดูแลในเบราว์เซอร์",
      fi: "Palvelutilien ja nollatiedon kanavien taustapalvelu: yhdyskäytävä, laskutus, kanavien kirjekuorien salaus, 117 HTTP-rajapintaa, viisi valmista liitännäistä ja hallintakonsoli selaimessa.",
      uk: "Бекенд сервісних акаунтів і каналів з нульовим знанням: шлюз, білінг, шифрування конвертів каналів, 117 HTTP-інтерфейсів, п’ять готових плагінів і консоль адміністратора в браузері.",
      bg: "Бекендът зад сервисните акаунти и каналите с нулево знание: гейтуей, фактуриране, криптиране на пликите на каналите, 117 HTTP интерфейса, пет готови плъгина и административна конзола в браузъра.",
      tr: "Hizmet hesapları ve sıfır bilgi kanallarının arka ucu: ağ geçidi, faturalandırma, kanal zarflarının şifrelenmesi, 117 HTTP arayüzü, hazır beş eklenti ve tarayıcıdaki yönetici konsolu.",
      hu: "A szolgáltatási fiókok és a nullaismeret-csatornák backendje: átjáró, számlázás, a csatornaborítékok titkosítása, 117 HTTP felület, öt kész bővítmény és a böngészős admin konzol.",
    },
    lives: {
      en: "There: three installation paths, the operator walkthrough of the admin console and the channel envelope quick reference.",
      ru: "Там: три пути установки, обзор консоли администратора для оператора и краткая справка по конверту канала.",
      de: "Dort: drei Installationswege, der Rundgang durch die Admin-Konsole und die Kurzübersicht zum Kanalumschlag.",
      fr: "Là-bas : trois chemins d’installation, la visite guidée de la console d’administration et l’aide-mémoire de l’enveloppe de canal.",
      it: "Lassù: tre percorsi di installazione, la visita guidata della console di amministrazione e il promemoria sulla busta del canale.",
      nl: "Daar: drie installatiepaden, de rondleiding door de beheerconsole en het naslagblad voor de kanaalomslag.",
      cs: "Tam: tři instalační cesty, průvodce konzolí správce a rychlý rozbor obálky kanálu.",
      "zh-Hans": "在那里：三条安装路径、管理台的运营演示，还有频道信封格式速查。",
      "zh-Hant": "在那裡：三條安裝路徑、管理台的營運演示，還有頻道信封格式速查。",
      es: "Allí: tres rutas de instalación, el recorrido por la consola de administración y la guía rápida del sobre del canal.",
      pl: "Tam: trzy ścieżki instalacji, przewodnik po konsoli administratora i ściągawka dotycząca koperty kanału.",
      ja: "あちら: 3 とおりのインストール手順、管理コンソールの操作案内、チャンネル封筒の早見表。",
      th: "ตรงโน้น: สามเส้นทางติดตั้ง คู่มือเดินคอนโซลผู้ดูแล และตารางอ้างอิงเร็วของซองแชนเนล",
      fi: "Tuolla: kolme asennuspolkua, kierros hallintakonsolissa ja kanavien kirjekuorien pikataulukko.",
      uk: "Там: три шляхи встановлення, огляд консолі адміністратора для оператора й коротка довідка про конверт каналу.",
      bg: "Там: три инсталационни пътя, обходът на административната конзола и бързият справочник за пликата на канала.",
      tr: "Şurada: üç kurulum yolu, yönetici konsolunun operatör turu ve kanal zarfı için hızlı başvuru tablosu.",
      hu: "Ott: három telepítési út, az admin konzol végigjárása és a csatornaboríték gyorsreferenciája.",
    },
    chips: ["mp.popopx.chat", "AGPL-3.0-only", "127.0.0.1:8080", "popopx://"],
  },
  {
    name: "POPOPX Bot Studio",
    kind: "source",
    host: "github.com/popopx-chat/popopx-bot-studio",
    href: BOT_STUDIO_REPO_URL,
    external: true,
    source: BOT_STUDIO_REPO_URL,
    tone: "alert",
    role: {
      en: "Bot workbench, repository only",
      ru: "Мастерская ботов — только репозиторий",
      de: "Bot-Werkstatt — bisher nur das Repository",
      fr: "Atelier de robots — le dépôt seul",
      it: "Officina di bot — solo il repository",
      nl: "Botwerkplaats — alleen de bronopslag",
      cs: "Dílna na boty — zatím jen repozitář",
      "zh-Hans": "机器人工作台：目前只有仓库",
      "zh-Hant": "機器人工作台：目前只有倉庫",
      es: "Taller de bots — solo el repositorio",
      pl: "Warsztat botów — tylko repozytorium",
      ja: "Bot 作業台 — リポジトリのみ",
      th: "เวิร์กช็อปบอต — มีเพียงรีโป",
      fi: "Bot-paja — toistaiseksi vain arkisto",
      uk: "Майстерня ботів — поки що лише сховище",
      bg: "Работилница за ботове — само хранилище",
      tr: "Bot atölyesi — yalnızca depo",
      hu: "Botműhely — egyelőre csak a tároló",
    },
    desc: {
      en: "A workbench for bots you run on your own machine. As of 2026-11-24 the published tree of this repository is its AGPL-3.0-only license, and bot.popopx.chat resolves to the shared server without serving a site of its own, so no feature is claimed here — the card reports what exists and links to it.",
      ru: "Верстак для ботов на вашей собственной машине. По замеру 2026-11-24 опубликованное дерево этого репозитория — файл лицензии AGPL-3.0-only, а bot.popopx.chat уже указывает на общий сервер, но своего сайта там нет; поэтому возможности здесь не заявляются: карточка сообщает о том, что есть, и ведёт туда.",
      de: "Eine Werkbank für Bots, die auf dem eigenen Rechner laufen. Stand 2026-11-24 ist der veröffentlichte Baum dieses Repositorys die Lizenzdatei AGPL-3.0-only, und bot.popopx.chat zeigt auf den geteilten Server, ohne dort eine eigene Site zu bedienen; deshalb wird hier keine Funktion behauptet — die Karte meldet, was existiert, und verlinkt darauf.",
      fr: "Un atelier pour des robots que vous faites tourner sur votre propre machine. Mesuré le 2026-11-24, l’arbre publié de ce dépôt est le fichier de licence AGPL-3.0-only, et bot.popopx.chat pointe vers le serveur partagé sans site à lui : aucune fonction n’est donc revendiquée ici — la carte dit ce qui existe et y mène.",
      it: "Un banco da lavoro per bot che eseguite sulla vostra macchina. Al 2026-11-24 l’albero pubblicato di questo repository è il file della licenza AGPL-3.0-only, e bot.popopx.chat punta al server condiviso senza un sito tutto suo: qui non si rivendica alcuna funzione — la scheda dice ciò che esiste e punta lì.",
      nl: "Een werkplaats voor bots die je op je eigen machine draait. Per 2026-11-24 is de gepubliceerde boom van deze bronopslag het AGPL-3.0-only-licentiebestand, en bot.popopx.chat wijst naar de gedeelde server zonder eigen site; hier wordt dus geen functie beweerd — het kaartje meldt wat er is en wijst ernaar toe.",
      cs: "Dílna pro boty, které běží na vašem vlastním počítači. K 2026-11-24 je zveřejněným stromem tohoto repozitáře soubor s licencí AGPL-3.0-only a bot.popopx.chat míří na sdílený server, ale vlastní web tam neslouží — zde se tedy žádná funkce netvrdí: karta hlásí, co existuje, a odkazuje na to.",
      "zh-Hans": "在自己机器上跑的机器人工作台。2026-11-24 实测，这个仓库已发布的目录就是那份 AGPL-3.0-only 许可证文件；bot.popopx.chat 已经指向那台共用的服务器，但还没有自己的站点，所以这里不声称任何功能：卡片只报已有之物，并把链接指向它。",
      "zh-Hant": "在自己機器上跑的機器人工作台。2026-11-24 實測，這個倉庫已發布的目錄就是那份 AGPL-3.0-only 授權條款檔案；bot.popopx.chat 已經指向那台共用的伺服器，但還沒有自己的網站，所以這裡不宣稱任何功能：卡片只回報已有之物，並將連結指向它。",
      es: "Un taller para bots que ejecutas en tu propia máquina. Según lo medido el 2026-11-24, el árbol publicado de este repositorio es el archivo de la licencia AGPL-3.0-only, y bot.popopx.chat apunta al servidor compartido sin servir un sitio propio, así que aquí no se reclama ninguna función: la ficha dice lo que hay y enlaza a ello.",
      pl: "Warsztat do botów uruchamianych na własnym komputerze. Stan na 2026-11-24: opublikowanym drzewem tego repozytorium jest plik licencji AGPL-3.0-only, a bot.popopx.chat wskazuje na współdzielony serwer, nie serwując własnej strony, więc nie ogłaszamy tu żadnych funkcji — karta mówi, co istnieje, i tam prowadzi.",
      ja: "自分のマシンで動かすボットのための作業台です。2026-11-24 の実測では、このリポジトリの公開済みツリーは AGPL-3.0-only のライセンスファイルひとつで、bot.popopx.chat は共用サーバーを指しますが独自のサイトはまだ出していません。ここでは機能を謳わず、あるものだけをカードに書いてそちらへ繋ぎます。",
      th: "โต๊ะทำงานสำหรับบอตที่คุณรันบนเครื่องของคุณเอง ณ 2026-11-24 ต้นไม้ที่เผยแพร่ของรีโปนี้เป็นไฟล์สัญญาอนุญาต AGPL-3.0-only เพียงไฟล์เดียว และ bot.popopx.chat ชี้ไปยังเซิร์ฟเวอร์ที่ใช้ร่วมกันแต่ยังไม่มีเว็บไซต์ของเราเอง ที่นี่จึงไม่อ้างคุณสมบัติใด — การ์ดบอกเฉพาะสิ่งที่มีอยู่แล้วลิงก์ไปหาสิ่งนั้น",
      fi: "Työpaja boteille, joita pyörität omalla koneellasi. 2026-11-24 mitattuna tämän arkiston julkaistu puu on AGPL-3.0-only-lisenssin tiedosto, eikä bot.popopx.chat vielä palvela omaa sivustoaan osoittaessaan jaetulle palvelimelle — tässä ei siis väitetä yhtään ominaisuutta: kortti kertoo, mitä on, ja linkittää siihen.",
      uk: "Майстерня для ботів, які ви запускаєте на власній машині. Станом на 2026-11-24 опубліковане дерево цього сховища — файл ліцензії AGPL-3.0-only, а bot.popopx.chat уже вказує на спільний сервер, але власного сайту там немає, тому тут не заявляємо жодної можливості: картка повідомляє, що є, і веде туди.",
      bg: "Работилница за ботове, които пускате на собствената си машина. Към 2026-11-24 публикуваното дърво на това хранилище е файлът с лиценза AGPL-3.0-only, а bot.popopx.chat сочи към споделения сървър, но не обслужва собствен сайт, затова тук не се твърди нито една функция: картката казва какво има и сочи натам.",
      tr: "Kendi makinenizde çalıştırdığınız botlar için bir tezgâh. 2026-11-24 itibarıyla bu deponun yayımlanan ağacı AGPL-3.0-only lisans dosyasından ibaret ve bot.popopx.chat paylaşılan sunucuyu gösteriyor ama kendi sitesini sunmuyor; burada bu yüzden hiçbir özellik iddia edilmiyor — kart olanı söylüyor ve ona bağlıyor.",
      hu: "Munkaasztal a saját gépeden futó botokhoz. 2026-11-24-en a tároló közzétett fája az AGPL-3.0-only licencfájlt tartalmazza, és a bot.popopx.chat a közös szerverre mutat, de saját oldalt még nem kiszolgál, ezért itt egyetlen funkciót sem állítunk: a kártya azt mondja el, ami megvan, és arra linkel.",
    },
    lives: {
      en: "Public today: the repository and its license file — nothing else was measured. The name resolves to the same box as the other two portals, yet plain HTTP only returns that server's default page and its certificate does not cover the name; the site link goes on the day bot.popopx.chat serves its own portal over HTTPS.",
      ru: "Открыто сегодня: репозиторий и его файл лицензии — больше ничего не измерялось. Имя указывает на ту же машину, что и два других портала, но по HTTP отдаётся только служебная страница сервера, а сертификат имя не покрывает; ссылка на сайт появится в тот день, когда bot.popopx.chat начнёт отдавать собственный портал по HTTPS.",
      de: "Öffentlich heute: das Repository und seine Lizenzdatei — sonst nichts wurde gemessen. Der Name zeigt auf dieselbe Maschine wie die anderen beiden Portale, doch über HTTP kommt nur die Standardseite des Servers, und das Zertifikat deckt den Namen nicht. Der Website-Link kommt an dem Tag, an dem bot.popopx.chat sein eigenes Portal über HTTPS ausliefert.",
      fr: "Public aujourd’hui : le dépôt et son fichier de licence — rien d’autre n’a été mesuré. Le nom pointe sur la même machine que les deux autres portails, mais en HTTP simple ce n’est que la page par défaut du serveur, et le certificat ne couvre pas le nom. Le lien du site viendra le jour où bot.popopx.chat servira son propre portail en HTTPS.",
      it: "Pubblico oggi: il repository e il suo file di licenza — nient’altro è stato misurato. Il nome punta alla stessa macchina degli altri due portali, ma in HTTP semplice restituisce solo la pagina predefinita del server e il certificato non copre il nome. Il link del sito arriverà il giorno in cui bot.popopx.chat servirà il proprio portale in HTTPS.",
      nl: "Vandaag open: de bronopslag en haar licentiebestand — verder niets gemeten. De naam wijst naar dezelfde machine als de andere twee portalen, maar via gewone HTTP komt alleen de standaardpagina van de server en het certificaat dekt de naam niet. De sitelink komt op de dag dat bot.popopx.chat zijn eigen portaal via HTTPS verbindt.",
      cs: "Veřejné dnes: repozitář a jeho soubor s licencí — nic dalšího nebylo změřeno. Název míří na stejný stroj jako ostatní dva portály, ale přes obyčejné HTTP vrací jen výchozí stránku serveru a certifikát jej nepokrývá. Odkaz na web přibude ve dne, kdy bot.popopx.chat začne obsluhovat vlastní portál přes HTTPS.",
      "zh-Hans": "今天公开的是：这个仓库和它的许可证文件——除此之外没有测到别的。这个域名已经指向另外两个门户所在的那台机器，但走普通 HTTP 只会拿到服务器的默认页面，证书也还没覆盖这个名字。等 bot.popopx.chat 能用 HTTPS 返回自己的站点，这张卡片再加上站点链接。",
      "zh-Hant": "今天公開的是：這個倉庫和它的授權條款檔案——除此之外沒有測到別的。這個域名已經指向另外兩個門戶所在的那台伺服器，但走普通 HTTP 只會拿到伺服器的預設頁面，憑證也還沒覆蓋這個名字。等 bot.popopx.chat 能用 HTTPS 返回自己的網站，這張卡片再加上網站連結。",
      es: "Público hoy: el repositorio y su archivo de licencia — nada más fue medido. El nombre apunta a la misma máquina de los otros dos portales, pero en HTTP simple solo devuelve la página por defecto del servidor y el certificado no cubre el nombre. El enlace al sitio se añadirá el día en que bot.popopx.chat sirva su propio portal por HTTPS.",
      pl: "Publiczne dziś: repozytorium i jego plik licencji — nic więcej nie zmierzono. Nazwa wskazuje na tę samą maszynę co pozostałe dwa portale, ale przez zwykłe HTTP zwraca tylko domyślną stronę serwera, a certyfikat jej nie obejmuje. Link do strony dołączy w dniu, gdy bot.popopx.chat zacznie serwować własny portal przez HTTPS.",
      ja: "今日公開されているのはリポジトリとライセンスファイルのみ — それ以上は計測されていません。この名前は他の 2 つのポータルと同じマシンを指しますが、通常の HTTP ではサーバーの既定ページが返るだけで、証明書もこの名前を覆っていません。bot.popopx.chat が HTTPS で独自のポータルを返し始めた日に、このカードへサイトのリンクが足されます。",
      th: "วันนี้ที่เปิดให้ชมคือรีโปและไฟล์สัญญาอนุญาต — ไม่ได้วัดสิ่งอื่นเพิ่ม ชื่อชี้ไปยังเครื่องเดียวกับอีกสองพอร์ทัล แต่ HTTP ธรรมดาตอบกลับแค่เพจเริ่มต้นของเครื่อง และใบรับรองก็ยังไม่คลุมชื่อนี้ ลิงก์เว็บไซต์จะถูกใส่ในวันที่ bot.popopx.chat ให้บริการพอร์ทัลของตนเองผ่าน HTTPS",
      fi: "Tänään julkisina: arkisto ja sen lisenssitiedosto — mitään muuta ei mitattu. Nimi osoittaa samalle koneelle kuin muut kaksi portaalia, mutta tavallisella HTTP:lla palautuu vain palvelimen oletussivu, eikä varmenne kata nimeä. Sivuston linkki tulee sinä päivänä, kun bot.popopx.chat palveli omaa portaaliaan HTTPS:n yli.",
      uk: "Відкрито сьогодні: сховище та його файл ліцензії — більше нічого не вимірювалось. Ім'я вказує на ту саму машину, що й інші два портали, але звичайний HTTP віддає лише типову сторінку сервера, а сертифікат імя не покриває. Посилання на сайт з'явиться того дня, коли bot.popopx.chat почне обслуговувати власний портал через HTTPS.",
      bg: "Публично днес: хранилището и файлът с лиценза — нищо друго не е измерено. Името сочи към същата машина като другите два портала, но обикновеният HTTP връща само началната страница на сървъра, а сертификатът не покрива името. Връзката към сайта ще се появи на деня, когато bot.popopx.chat започне да обслужва собствения си портал през HTTPS.",
      tr: "Bugün açık: depo ve lisans dosyası — başkaca bir şey ölçülmedi. Ad, diğer iki portalın bulunduğu makineyi gösteriyor ama düz HTTP yalnızca sunucunun varsayılan sayfasını döndürüyor ve sertifika adı kapsamıyor. Site bağlantısı, bot.popopx.chat kendi portalını HTTPS üzerinden sunduğu gün eklenecek.",
      hu: "Ma publikus: a tároló és a licencfájlja — ennél többet nem mértünk. A név ugyanarra a gépre mutat, mint a másik két portal, de a sima HTTP csak a kiszolgáló alaplapját adja vissza, a tanúsítvány pedig nem fedi le a nevet. A weboldal-link akkor kerül a kártyára, amikor a bot.popopx.chat a saját portálját HTTPS-en tölti ki.",
    },
    chips: ["AGPL-3.0-only", "2026-11-24"],
  },
];

/** Ring + text classes per tone; the diagram and the cards share them. */
const TONES: Record<Tone, { ring: string; text: string }> = {
  brand: { ring: "border-brand/45 hover:border-brand-soft/70", text: "text-brand-soft" },
  mesh: { ring: "border-mesh/45 hover:border-mesh-soft/70", text: "text-mesh-soft" },
  warn: { ring: "border-warn/40 hover:border-warn-soft/70", text: "text-warn-soft" },
  alert: { ring: "border-alert/40 hover:border-alert/70", text: "text-alert" },
};

/** The bus above the cards only draws origins that answer. */
const HOSTED_PORTALS = PORTALS.filter((portal) => portal.kind === "hosted");

/**
 * The interconnection, drawn with the only primitives this portal allows: divs and
 * one inline SVG. Labels are the locale-free hostnames the cards already print, so
 * the diagram adds no translatable string and loads nothing from another origin.
 * It maps `HOSTED_PORTALS`, not `PORTALS`: the fourth card has no origin to place
 * on a bus of running hosts.
 */
function Topology(): ReactElement {
  return (
    <div className="mt-9">
      <div className="grid gap-3 sm:grid-cols-3">
        {HOSTED_PORTALS.map((portal, index) => (
          <div
            key={portal.host}
            className={`glass-inset flex items-center gap-3 px-4 py-3 ${TONES[portal.tone].ring}`}
          >
            <StatusDot tone={portal.tone} pulse={index === 0} />
            <span className="font-mono text-[12.5px] text-mute">{portal.host}</span>
            <span className={`ml-auto font-mono text-[10.5px] ${TONES[portal.tone].text}`}>
              {`0${index + 1} / 03`}
            </span>
          </div>
        ))}
      </div>
      <svg aria-hidden viewBox="0 0 720 34" className="mt-3 h-8 w-full" fill="none" stroke="currentColor">
        <path d="M120 26h480" strokeWidth="1" strokeDasharray="5 6" className="text-hair-strong" />
        <path d="M120 26V10M360 26V10M600 26V10" strokeWidth="1" className="text-brand/45" />
        <circle cx="120" cy="7" r="3.5" className="fill-brand" />
        <circle cx="360" cy="7" r="3.5" className="fill-mesh" />
        <circle cx="600" cy="7" r="3.5" className="fill-warn" />
      </svg>
      <div aria-hidden className="relative mt-1 h-px">
        <span className="flow-line flow-brand" />
      </div>
    </div>
  );
}

function PortalCard({ portal, index }: { portal: Portal; index: number }): ReactElement {
  const role = useCopy(portal.role);
  const desc = useCopy(portal.desc);
  const lives = useCopy(portal.lives);
  const source = useCopy(LINK_SOURCE);
  const tone = TONES[portal.tone];
  return (
    <article className={`glass glass-hover flex h-full flex-col gap-5 border p-5 ${tone.ring}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`eyebrow ${tone.text}`}>{role}</p>
          <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-white">{portal.name}</h3>
        </div>
        <span className="chip shrink-0 font-mono text-[10.5px] text-faint">{`0${index + 1}`}</span>
      </div>
      <p className="text-[13.5px] leading-relaxed text-mute">{desc}</p>
      <p className="hairline-top pt-4 text-[12.5px] leading-relaxed text-faint">{lives}</p>
      <div className="mt-auto flex min-w-0 flex-wrap items-center gap-2">
        <a
          href={portal.href}
          {...(portal.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`min-w-0 break-all font-mono text-[13px] underline decoration-hair-strong decoration-1 underline-offset-4 transition-colors duration-200 hover:text-white ${tone.text}`}
        >
          {portal.host}
        </a>
        {/* A source-only card already links to its repository: no second link to it. */}
        {portal.kind === "hosted" ? (
          <>
            <span className="text-[11px] text-faint">·</span>
            <a
              href={portal.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-mute underline decoration-hair decoration-1 underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              {source}
            </a>
          </>
        ) : null}
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {portal.chips.map((chip) => (
          <li key={chip} className="chip font-mono text-[10.5px] text-faint">
            {chip}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function EcosystemHub(): ReactElement {
  return (
    <section id="ecosystem" className="relative py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} />
        <Topology />
        {/* Four cards make a square, not a row with an orphan in it. */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PORTALS.map((portal, index) => (
            <PortalCard key={portal.host} portal={portal} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

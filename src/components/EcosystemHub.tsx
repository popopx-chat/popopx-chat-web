"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { IOS_REPO_URL, MP_PORTAL_URL, NODE_PORTAL_URL, NODE_REPO_URL, SITE_HOST, SUITE_REPO_URL } from "@/lib/site";
import { SectionHeading, StatusDot } from "@/components/ui";

/**
 * EcosystemHub — section `ecosystem`: one project, three official hosts.
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
 * divs plus one inline SVG: no image, no library, no extra copy slot.
 */

type Tone = "brand" | "mesh" | "warn";

/** `name`, `host`, `href`, `source` and `chips` stay locale-free identifiers. */
type Portal = {
  name: string;
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
];

/** Ring + text classes per tone; the diagram and the cards share them. */
const TONES: Record<Tone, { ring: string; text: string }> = {
  brand: { ring: "border-brand/45 hover:border-brand-soft/70", text: "text-brand-soft" },
  mesh: { ring: "border-mesh/45 hover:border-mesh-soft/70", text: "text-mesh-soft" },
  warn: { ring: "border-warn/40 hover:border-warn-soft/70", text: "text-warn-soft" },
};

/**
 * The interconnection, drawn with the only primitives this portal allows: divs and
 * one inline SVG. Labels are the locale-free hostnames the cards already print, so
 * the diagram adds no translatable string and loads nothing from another origin.
 */
function Topology(): ReactElement {
  return (
    <div className="mt-9">
      <div className="grid gap-3 sm:grid-cols-3">
        {PORTALS.map((portal, index) => (
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
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <a
          href={portal.href}
          {...(portal.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`font-mono text-[13px] underline decoration-hair-strong decoration-1 underline-offset-4 transition-colors duration-200 hover:text-white ${tone.text}`}
        >
          {portal.host}
        </a>
        <span className="text-[11px] text-faint">·</span>
        <a
          href={portal.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-mute underline decoration-hair decoration-1 underline-offset-4 transition-colors duration-200 hover:text-white"
        >
          {source}
        </a>
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
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PORTALS.map((portal, index) => (
            <PortalCard key={portal.host} portal={portal} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

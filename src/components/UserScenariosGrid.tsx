"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { useCopy, type Localized } from "@/lib/i18n";
import { ROUTE_LABELS } from "@/components/Navbar";
import { CTA_OPEN } from "@/components/PortalCards";
import { STATUS_AVAILABLE, STATUS_EVOLVING } from "@/components/AiThreeLayers";
import { SectionHeading, StatusDot } from "@/components/ui";
import { TONES } from "@/components/EcosystemHub";
import { BOT_STUDIO_URL, MP_PORTAL_URL, NODE_PORTAL_URL } from "@/lib/site";

/**
 * Six everyday-use scenarios, under `AiThreeLayers` on the homepage.
 *
 * The portal's other homepage blocks answer "what is this built on" and "what
 * exists where". This one answers the question a first-time visitor actually
 * arrives with: what would I use it for on Monday. The structure is therefore
 * deliberately honest rather than promotional —
 *
 *  - Five cards are `Available` because the capability is implemented in one of
 *    the repositories and a visitor can open it today; the personal-AI card is
 *    `Evolving` because the on-device assistant does not exist yet, which is
 *    stated in the card's own body and again in its pill. The pill pair is
 *    imported from `AiThreeLayers` rather than re-authored so the homepage cannot
 *    describe one system with two vocabularies, and the claims track
 *    `AgentProtocol.tsx` on /ecosystem/.
 *  - Entries are `PortalCards`-style: an internal route uses `<Link>`, a sibling
 *    site uses `<a target="_blank" rel="noopener noreferrer">`. External anchors
 *    are navigation and load nothing here (see the privacy note in README), which
 *    is what the card footers state in all 18 languages.
 *  - Icons are inline `<svg>` line drawings with no `<text>`, no `<image>` and no
 *    remote reference, so a rendered page still asks for zero static assets from
 *    anywhere but this host.
 *
 * Host strings are locale-free tokens (like every protocol value on the portal)
 * and live outside the `Localized` maps, so they are never translated or scanned
 * as copy.
 */

const EYEBROW: Localized<string> = {
  en: "Six real-world scenarios",
  ru: "Шесть реальных сценариев",
  de: "Sechs echte Anwendungsfälle",
  fr: "Six cas d’usage réels",
  it: "Sei casi d’uso reali",
  nl: "Zes echte gebruiksscenario’s",
  cs: "Šest reálných scénářů",
  "zh-Hans": "六大真实使用场景",
  "zh-Hant": "六大真實使用情境",
  es: "Seis casos de uso reales",
  pl: "Sześć realnych scenariuszy",
  ja: "六つの身近な使い道",
  th: "หกสถานการณ์ใช้งานจริง",
  fi: "Kuusi oikeaa käyttötarkoitusta",
  uk: "Шість реальних сценаріїв",
  bg: "Шест реални сценария",
  tr: "Altı gerçek kullanım senaryosu",
  hu: "Hat valós használati eset",
};

const TITLE: Localized<string> = {
  en: "What this looks like on an ordinary day",
  ru: "Как это выглядит в обычный день",
  de: "Wie das an einem normalen Tag aussieht",
  fr: "À quoi cela ressemble un jour ordinaire",
  it: "Come appare in una giornata normale",
  nl: "Hoe dit er op een gewone dag uitziet",
  cs: "Jak to vypadá běžný den",
  "zh-Hans": "普通的一天里，它会怎么用",
  "zh-Hant": "普通的一天裡，它會怎麼用",
  es: "Cómo se ve esto en un día normal",
  pl: "Jak to wygląda w zwyczajny dzień",
  ja: "ふつうの一日で、どのように使うか",
  th: "มันหน้าตาอย่างไรในวันธรรมดา",
  fi: "Miten tämä näkyy tavallisena päivänä",
  uk: "Як це виглядає у звичайний день",
  bg: "Как изглежда това в един обикновен ден",
  tr: "Olağan bir günde bu nasıl görünür",
  hu: "Milyen ez egy átlagos napon",
};

const LEAD: Localized<string> = {
  en: "Start with the five you can open today; read the one marked Evolving afterward. Internal pages open here, the three sibling sites in a new tab, and this page loads nothing from them.",
  ru: "Начните с пяти карточек, которые можно открыть уже сегодня, а одну с пометкой «Развивается» прочитайте после. Внутренние страницы открываются здесь, три соседних сайта — в новой вкладке, и эта страница у них ничего не загружает.",
  de: "Beginnen Sie mit den fünf Karten, die Sie heute schon öffnen können, und lesen Sie die eine mit „In Entwicklung“ danach. Portalseiten öffnen hier, die drei Schwester-Sites in einem neuen Tab, und diese Seite lädt von ihnen nichts.",
  fr: "Commencez par les cinq cartes que vous pouvez ouvrir aujourd’hui, puis lisez celle marquée « En évolution ». Les pages internes s’ouvrent ici, les trois sites frères dans un nouvel onglet, et cette page ne charge rien chez eux.",
  it: "Inizia dalle cinque carte che puoi aprire oggi, poi leggi quella etichettata «In evoluzione». Le pagine interne si aprono qui, gli altri tre siti in una nuova scheda, e questa pagina non carica nulla da loro.",
  nl: "Begin bij de vijf kaarten die je vandaag kunt openen en lees daarna de kaart met «In ontwikkeling». Portalpagina’s openen hier, de drie zustersites in een nieuw tabblad, en deze pagina laadt niets van hen.",
  cs: "Začněte pěti kartami, které lze otevřít už dnes, a pak si přečtěte tu označenou «Ve vývoji». Interní stránky se otevírají tady, tři přidružené weby v novém panelu a tato stránka z nich nic nenačítá.",
  "zh-Hans": "先看今天就能点开的五张，再看标着「演进中」的那一张。站内页面原地打开，另外三个官方站点在新窗口打开——本页不会从它们加载任何资源。",
  "zh-Hant": "先看今天就能點開的五張，再看標著「演進中」的那一張。站內頁面原地開啟，另外三個官方網站在新視窗開啟——本頁不會從它們載入任何資源。",
  es: "Empiece por las cinco tarjetas que puede abrir hoy y lea después la marcada «En evolución». Las páginas internas se abren aquí, los otros tres sitios en una pestaña nueva, y esta página no carga nada de ellos.",
  pl: "Zacznijcie od pięciu kart, które można otworzyć już dziś, a potem przeczytajcie tę oznaczoną «W rozwoju». Strony wewnętrzne otwierają się tutaj, trzy siostrzane witryny w nowej karcie, a ta strona niczego od nich nie pobiera.",
  ja: "今日そのまま開ける 5 枚から見て、「進化中」の 1 枚はあとで。内側のページはこの場で開き、ほかの 3 つの公式サイトは新しいタブで開きます。このページはそこから何も読み込みません。",
  th: "เริ่มจากห้าการ์ดที่เปิดได้เลยตั้งแต่วันนี้ แล้วค่อยอ่านใบเดียวที่ติดป้าย «กำลังพัฒนา» หน้าในเว็บเปิดตรงนี้ อีกสามเว็บไซต์ทางการเปิดในแท็บใหม่ และหน้านี้ไม่โหลดสิ่งใดจากที่นั่น",
  fi: "Aloita viidestä kortista, jotka voit avata jo tänään, ja lue sitten yksi «Kehitysvaiheessa»-leimattu. Oman sivuston sivut avautuvat täällä, kolme sisarsivustoa uuteen välilehteen, eikä tämä sivu lataa niiltä mitään.",
  uk: "Почніть із п’яти карток, які можна відкрити вже сьогодні, а потім прочитайте одну з позначкою «Розвивається». Внутрішні сторінки відкриваються тут, три сусідні сайти — у новій вкладці, і ця сторінка в них нічого не завантажує.",
  bg: "Започнете с петте карти, които можете да отворите още днес, после прочетете едната маркирана «В развитие». Вътрешните страници се отварят тук, трите сродни сайта — в нов раздел, а тази страница не зарежда нищо от тях.",
  tr: "Bugün açabileceğiniz beş kartla başlayın, ardından „Gelişiyor“ etiketli tek kartı okuyun. Portal içi sayfalar burada, üç kardeş site yeni sekmede açılır; bu sayfa onlardan hiçbir şey yüklemez.",
  hu: "Kezdje az öt, már ma nyitható kártyával, azután olvassa az egyetlen «Fejlesztés alatt» jelűt. A belső oldalak itt nyílnak, a három testoldal új lapon, és ez az oldal tőlük semmit nem tölt be.",
};

const SC1_TITLE: Localized<string> = {
  en: "Private chat",
  ru: "Приватная переписка",
  de: "Private Unterhaltung",
  fr: "Messagerie privée",
  it: "Messaggistica privata",
  nl: "Privéberichten",
  cs: "Soukromá konverzace",
  "zh-Hans": "私密通讯",
  "zh-Hant": "私密通訊",
  es: "Mensajería privada",
  pl: "Prywatna korespondencja",
  ja: "プライベートなやりとり",
  th: "การคุยที่เป็นส่วนตัว",
  fi: "Yksityisviestintä",
  uk: "Приватне листування",
  bg: "Лична кореспонденция",
  tr: "Özel sohbet",
  hu: "Privát üzenetváltás",
};

const SC1_BODY: Localized<string> = {
  en: "You want to reach someone, not hand over a phone number first: sign-up asks for neither a number nor an e-mail, there is no global identity, and each connection is its own pair of queues.",
  ru: "Хочется связаться с человеком, не отдавая сначала номер телефона: регистрация не просит ни номера, ни почты, глобального идентификатора нет, а каждое соединение — своя пара очередей.",
  de: "Man will jemanden erreichen, statt zuerst die Telefonnummer zu lassen: Die Anmeldung fragt weder nach Nummer noch nach E-Mail, es gibt keine globale Identität, und jede Verbindung ist ihr eigenes Queue-Paar.",
  fr: "On veut joindre quelqu’un sans donner d’abord son numéro : l’inscription ne demande ni numéro ni e-mail, il n’y a pas d’identité globale, et chaque connexion forme son propre couple de files.",
  it: "Si vuole raggiungere qualcuno senza consegnare prima il numero: l’iscrizione non chiede né numero né e-mail, non c’è identità globale, e ogni connessione è una propria coppia di code.",
  nl: "Iemand bereiken zonder eerst je telefoonnummer te geven: de aanmelding vraagt om geen nummer en geen e-mail, er is geen globale identiteit, en elke verbinding is haar eigen paar wachtrijen.",
  cs: "Chcete se s někým spojit, aniž byste nejdřív vydali telefonní číslo: registrace nechce číslo ani e-mail, globální identita neexistuje a každé spojení je vlastní dvojice front.",
  "zh-Hans": "想找人说话，而不是先交手机号：注册既不要号码也不要邮箱，没有全局身份，每条连接都是单独一对队列。",
  "zh-Hant": "想找人說話，而不是先交手機號：註冊既不要號碼也不要電郵，沒有全域身份，每條連線都是單獨一對佇列。",
  es: "Querer hablar con alguien sin entregar primero el número de teléfono: el registro no pide número ni correo, no hay identidad global, y cada conexión es su propio par de colas.",
  pl: "Chcecie się z kimś skontaktować, nie oddając najpierw numeru telefonu: rejestracja nie prosi ani o numer, ani o pocztę, nie ma globalnej tożsamości, a każde połączenie to własna para kolejek.",
  ja: "誰かとつながりたいときに、まず電話番号を渡したくない。登録は番号もメールも求めず、グローバルな ID もなく、各接続はそれぞれ別のキューの一組です。",
  th: "อยากคุยกับใครสักคนโดยไม่ยอมให้เบอร์โทรก่อน การสมัครไม่ขอทั้งเบอร์และอีเมล ไม่มีตัวตนสากล และการเชื่อมต่อแต่ละครั้งใช้คิวของตนเองเป็นคู่",
  fi: "Haluat tavoittaa jonkun antamatta ensin puhelinnumeroasi: rekisteröityminen ei kysy numeroa eikä sähköpostia, globaalia identiteettiä ei ole, ja jokainen yhteys on oma jonoparinsa.",
  uk: "Хочеться зв’язатися з кимось, не віддаючи спершу номер телефону: реєстрація не просить ані номера, ані пошти, глобального ідентифікатора немає, а кожне з’єднання — це власна пара черг.",
  bg: "Искаш да се свържеш с някого, без първо да даваш телефонния си номер: регистрацията не иска нито номер, нито имейл, няма глобална самоличност, а всяка връзка е собствена двойка опашки.",
  tr: "Birine ulaşmak istiyorsunuz ama önce numaranızı vermek istemiyorsunuz: kayıt ne numara ne e-posta sorar, küresel kimlik yoktur ve her bağlantı kendi kuyruk çiftidir.",
  hu: "Olyan emberrel beszélsz, akinek nem kell odaadnod a telefonszámod: a regisztráció sem számot, sem e-mailt nem kér, nincs globális azonosító, és minden kapcsolat saját sorpárt jelent.",
};

const SC2_TITLE: Localized<string> = {
  en: "Personal AI",
  ru: "Персональный ассистент",
  de: "Persönlicher Assistent",
  fr: "Assistant personnel",
  it: "Assistente personale",
  nl: "Persoonlijke assistent",
  cs: "Osobní asistent",
  "zh-Hans": "个人随身助理",
  "zh-Hant": "個人隨身助理",
  es: "Asistente personal",
  pl: "Osobisty asystent",
  ja: "手元の個人アシスタント",
  th: "ผู้ช่วยส่วนตัว",
  fi: "Henkohtainen avustaja",
  uk: "Персональний асистент",
  bg: "Личен асистент",
  tr: "Kişisel asistan",
  hu: "Személyes asszisztens",
};

const SC2_BODY: Localized<string> = {
  en: "The small errands of a day should settle on the phone itself. The privacy base is already there, the offline Bluetooth path with it; the on-device assistant is still absent from the client.",
  ru: "Мелкие дела дня должны решаться на самом телефоне. Основа приватности уже есть, вместе с Bluetooth без сети; самого ассистента на устройстве в клиенте пока нет.",
  de: "Die kleinen Besorgungen eines Tages sollten sich auf dem Telefon selbst erledigen. Die Privatsphäre-Basis ist da, samt Bluetooth-Weg ohne Netz; der Assistent auf dem Gerät fehlt im Client noch.",
  fr: "Les petites tâches du jour devraient se régler sur le téléphone lui-même. Le socle de confidentialité est là, avec le trajet Bluetooth hors réseau ; l’assistant sur l’appareil manque encore au client.",
  it: "Le piccole faccende della giornata dovrebbero risolversi sul telefono stesso. La base di privacy c’è già, insieme al percorso Bluetooth offline; l’assistente sul dispositivo nel client manca ancora.",
  nl: "De kleine klusjes van een dag moeten op de telefoon zelf worden opgelost. De privacybasis is er al, met het Bluetooth-pad zonder netwerk; de assistent op het apparaat ontbreekt nog in de client.",
  cs: "Drobné denní povinnosti by se měly vyřídit na telefonu samotném. Základ soukromí už je, s Bluetooth cestou bez sítě; asistent v zařízení zatím v klientovi chybí.",
  "zh-Hans": "一天里那些琐碎的来回，本该就在手机本地消化掉。隐私底座已经出厂，断网走蓝牙也在；端侧模型助手还没有进客户端。",
  "zh-Hant": "一天裡那些瑣碎的來回，本來就該在手機本地消化掉。隱私底座已經出廠，斷網走藍牙也在；端側模型助手還沒進客戶端。",
  es: "Las pequeñas gestiones del día deberían resolverse en el propio teléfono. La base de privacidad ya está, junto con el camino Bluetooth sin red; el asistente en el dispositivo aún falta en el cliente.",
  pl: "Drobne sprawy dnia powinny załatwiać się na samym telefonie. Podstawa prywatności już jest, razem ze ścieżką Bluetooth bez sieci; samego asystenta na urządzeniu w kliencie jeszcze brak.",
  ja: "一日の中の細かい用事は、スマホの上で片付くべきものです。プライバシーの土台も、ネットワークが無いときの Bluetooth もすでにあります。端で動くアシスタント自体は、まだクライアントに入っていません。",
  th: "เรื่องจุกจิกในแต่ละวันควรจบลงบนตัวโทรศัพท์ ฐานความเป็นส่วนตัวมาพร้อมแอปแล้ว รวมถึงเส้นทางบลูทูธตอนไร้เครือข่าย แต่ตัวผู้ช่วยบนเครื่องยังไม่ได้อยู่ในไคลเอนต์",
  fi: "Päivän pikku hommat hoituisivat mielellään puhelimella itsellään. Yksityisyyden perusta on jo paikallaan Bluetooth-reitteineen ilman verkkoa; laitekohtainen avustaja puuttuu asiakkaasta vielä.",
  uk: "Дрібні справи дня мають вирішуватися на самому телефоні. Основа приватності вже є, разом із Bluetooth без мережі; самого асистента на пристрої в клієнті ще немає.",
  bg: "Ситните работи през деня трябва да се уредят на самия телефон. Основата за поверителност я има, заедно с Bluetooth пътят без мрежа; самият асистент на устройството все още липсва в клиента.",
  tr: "Günün ufak tefek işleri telefonun kendi üstünde çözülmeli. Gizlilik temeli ve ağsız Bluetooth yolu zaten var; uçtaki asistan ise istemcide henüz yok.",
  hu: "A nap apró ügyei magán a telefonon rendeződnének. Az adatvédelmi alap adott, hálózat nélküli Bluetooth úttal együtt; az eszközön futó asszisztens még hiányzik az ügyfélből.",
};

const SC3_TITLE: Localized<string> = {
  en: "Your own agents",
  ru: "Собственные агенты",
  de: "Eigene Agenten",
  fr: "Vos propres agents",
  it: "I tuoi agenti",
  nl: "Eigen agents",
  cs: "Vlastní agenti",
  "zh-Hans": "私有智能体",
  "zh-Hant": "私有智能體",
  es: "Tus propios agentes",
  pl: "Własne agenty",
  ja: "自分だけのエージェント",
  th: "เอเจนต์ของคุณเอง",
  fi: "Omat agentit",
  uk: "Власні агенти",
  bg: "Собствени агенти",
  tr: "Kendi ajanlarınız",
  hu: "Saját ügynökök",
};

const SC3_BODY: Localized<string> = {
  en: "You want an assistant that answers to you, not somebody else’s bot. Bot Studio creates, configures and isolates several roles on your own machine, and its console stays on loopback.",
  ru: "Хочется помощника, который слушается вас, а не чужого бота. Bot Studio создаёт, настраивает и разводит по изоляции несколько ролей на вашей машине, а консоль остаётся на локальной петле.",
  de: "Man möchte einen Assistenten, der auf einen selbst hört, nicht auf einen fremden Bot. Bot Studio legt mehrere Rollen auf dem eigenen Rechner an, konfiguriert und isoliert sie, und die Konsole bleibt auf Loopback.",
  fr: "On veut un assistant qui vous obéisse, pas le robot de quelqu’un d’autre. Bot Studio crée, configure et isole plusieurs rôles sur votre propre machine, et sa console reste sur la boucle locale.",
  it: "Vuoi un assistente che risponda a te, non al bot di qualcun altro. Bot Studio crea, configura e isola più ruoli sulla tua macchina, e la console resta sul loopback.",
  nl: "Je wilt een assistent die naar jou luistert, niet de bot van iemand anders. Bot Studio maakt, configureert en isoleert meerdere rollen op je eigen machine, en de console blijft op loopback.",
  cs: "Chcete asistenta, který poslouchá vás, ne cizího bota. Bot Studio na vašem stroji vytvoří, nastaví a oddělí několik rolí a jeho konzole zůstává na loopbacku.",
  "zh-Hans": "想要一个只听你安排的助手，而不是别人机器上的机器人。Bot Studio 在你自己的机器上创建、配置并隔离运行多个角色，控制台只绑本机回环。",
  "zh-Hant": "想要一個只聽你安排的助手，而不是別人機器上的機器人。Bot Studio 在你自己的機器上建立、設定並隔離執行多個角色，控制台只綁本機回環。",
  es: "Quiere un asistente que le escuche a usted, no el bot de otro. Bot Studio crea, configura y aísla varios roles en su propia máquina, y su consola se queda en loopback.",
  pl: "Chcecie asystenta, który słucha was, a nie czyjegoś bota. Bot Studio tworzy, konfiguruje i izoluje kilka ról na waszej maszynie, a konsola pozostaje na loopbacku.",
  ja: "自分についてくれる助手がほしくて、他人のボットではいけない。Bot Studio は自分のマシン上で複数の役割を作り、設定し、互いに隔離して動かし、コンソールはループバックにだけ閉じています。",
  th: "อยากได้ผู้ช่วยที่ฟังคุณ ไม่ใช่บอตของใคร Bot Studio สร้าง ตั้งค่า และแยกบทบาทหลายตัวบนเครื่องของคุณเอง ส่วนคอนโซลก็อยู่แต่ในช่วงลูปแบ็ก",
  fi: "Haluat avustajan, joka kuuntelee sinua ettei jonkun muun bottia. Bot Studio luo, määrittää ja eristää useita rooleja omalla koneellasi, ja konsoli pysyy loopbackissä.",
  uk: "Хочеться помічника, який слухається вас, а не чужого бота. Bot Studio створює, налаштовує та ізолює кілька ролей на вашій машині, а консоль лишається на локальній петлі.",
  bg: "Искате асистент, който се подчинява на вас, а не на чужд бот. Bot Studio създава, настройва и изолира няколко роли на вашата машина, а конзолата остава в локалната обратна петля.",
  tr: "Başkasının botu değil, size kulak veren bir asistan istiyorsunuz. Bot Studio kendi makinenizde birden çok rolü oluşturur, yapılandırır ve ayırır; konsolu da loopback’te kalır.",
  hu: "Olyan asszisztenst akart, aki önre hallgat, nem valaki más botjára. A Bot Studio saját gépén hoz létre, állít be és különít el több szerepkört, a konzol pedig a loopbacken marad.",
};

const SC4_TITLE: Localized<string> = {
  en: "Local intelligence",
  ru: "Локальные вычисления",
  de: "Lokale Rechenleistung",
  fr: "Intelligence locale",
  it: "Intelligenza locale",
  nl: "Lokale intelligentie",
  cs: "Místní inteligence",
  "zh-Hans": "本地边缘算力",
  "zh-Hant": "本地邊緣算力",
  es: "Inteligencia local",
  pl: "Lokalna inteligencja",
  ja: "手元で動かす計算力",
  th: "พลังประมวลผลในเครื่อง",
  fi: "Paikallinen laskenta",
  uk: "Локальні обчислення",
  bg: "Локални изчисления",
  tr: "Yerel işlem gücü",
  hu: "Helyi számítási erő",
};

const SC4_BODY: Localized<string> = {
  en: "Some material has no business on somebody else’s GPU: a video, a private recording. Mac Node runs the model and the media pipeline on your own Mac and keeps its console on loopback.",
  ru: "Есть материалы, которым не место на чужом GPU: видео, приватная запись. Mac Node запускает модель и медиаконвейер на вашем же Mac, а консоль держит на локальной петле.",
  de: "Manches gehört nicht auf fremde Grafikkarten: ein Video, eine private Aufnahme. Mac Node führt Modell und Medienpipeline auf dem eigenen Mac aus und hält die Konsole auf Loopback.",
  fr: "Certaines matières n’ont rien à faire sur le GPU d’autrui : une vidéo, un enregistrement privé. Mac Node exécute le modèle et le pipeline média sur votre propre Mac et garde sa console sur la boucle locale.",
  it: "Certo materiale non deve finire sulla GPU di qualcun altro: un video, una registrazione privata. Mac Node esegue il modello e la pipeline media sul tuo Mac e tiene la console sul loopback.",
  nl: "Sommig materiaal hoort niet op de GPU van iemand anders: een video, een privé-opname. Mac Node draait het model en de mediapijplijn op je eigen Mac en houdt de console op loopback.",
  cs: "Některé materiály nemají co dělat na cizím GPU: video, soukromý záznam. Mac Node pouští model i mediální řetězec na vašem Macu a konzoli drží na loopbacku.",
  "zh-Hans": "有些素材不该传到别人的显卡上：一段视频、一份内部录音。Mac Node 在你自己的 Mac 上跑模型与多媒体流水线，控制台从构造上只绑回环。",
  "zh-Hant": "有些素材不該傳到別人的顯示卡上：一段影片、一份內部錄音。Mac Node 在你自己的 Mac 上跑模型與多媒體管線，控制台從構造上只綁回環。",
  es: "Cierto material no debe acabar en la GPU de otro: un vídeo, una grabación privada. Mac Node ejecuta el modelo y el flujo de medios en su propio Mac y mantiene la consola en loopback.",
  pl: "Some materiały nie mają po co trafiać na cudze GPU: nagranie, prywatne wideo. Mac Node uruchamia model i potok mediowy na waszym Macu i trzyma konsolę na loopbacku.",
  ja: "他人の GPU 上に置くべきでない素材があります。動画や、社内の録音です。Mac Node は自分の Mac 上でモデルとメディアパイプラインを動かし、コンソールはループバックにだけ閉じています。",
  th: "ข้อมูลบางอย่างไม่ควรไปอยู่บน GPU ของคนอื่น เช่น วิดีโอและไฟล์บันทึกส่วนตัว Mac Node รันโมเดลและไปป์ไลน์สื่อบน Mac ของคุณเอง และเก็บคอนโซลไว้ในช่วงลูปแบ็ก",
  fi: "Jotkin aineistot eivät kuulu toisen näytönohjaimelle: video, yksityinen nauhoite. Mac Node ajaa mallin ja mediaputken omalla Macillaan ja pitää konsolin loopbackissä.",
  uk: "Певні матеріали не мають опинятися на чужому GPU: відео, приватний запис. Mac Node запускає модель і медіаконвеєр на вашому власному Mac, а консоль тримає на локальній петлі.",
  bg: "Има материали, които не трябва да попадат на чужд GPU: видео, личен запис. Mac Node стартира модела и медийната верига на вашия собствен Mac и държи конзолата в локалната обратна петля.",
  tr: "Bazı malzeme başkasının ekran kartına gitmemeli: bir video, özel bir kayıt. Mac Node, modeli ve medya hattını kendi Mac’inizde çalıştırır; konsolu loopback’te tutar.",
  hu: "Van, ami nem való más GPU-jára: egy videó, egy belső felvétel. A Mac Node a saját Macjén futtatja a modellt és a médiafolyamatot, a konzolt pedig a loopbacken tartja.",
};

const SC5_TITLE: Localized<string> = {
  en: "Connected services",
  ru: "Подключённые сервисы",
  de: "Angebundene Dienste",
  fr: "Services connectés",
  it: "Servizi collegati",
  nl: "Aangesloten diensten",
  cs: "Připojené služby",
  "zh-Hans": "开放服务连接",
  "zh-Hant": "開放服務連結",
  es: "Servicios conectados",
  pl: "Podłączone usługi",
  ja: "つながるサービス",
  th: "บริการที่เชื่อมต่อ",
  fi: "Kytketyt palvelut",
  uk: "Підключені сервіси",
  bg: "Свързани услуги",
  tr: "Bağlı hizmetler",
  hu: "Csatlakoztatott szolgáltatások",
};

const SC5_BODY: Localized<string> = {
  en: "One more task should not mean one more app: the service comes into the chat. The suite gives a two-level menu, dynamic cards, the zero-knowledge channel envelope and H5 pages opened outside the app.",
  ru: "Одна новая задача не должна означать ещё одно приложение: сервис приходит в переписку. Набор даёт двухуровневое меню, динамические карточки, конверт канала с нулевым знанием и H5 вне приложения.",
  de: "Eine weitere Aufgabe sollte nicht eine weitere App bedeuten: Der Dienst kommt in die Unterhaltung. Die Suite gibt das Menü mit zwei Ebenen, dynamische Karten, den Zero-Knowledge-Kanalumschlag und H5-Seiten außerhalb der App.",
  fr: "Une tâche de plus ne devrait pas valoir une application de plus : le service vient dans la conversation. La suite donne le menu à deux niveaux, les cartes dynamiques, l’enveloppe de canal à connaissance nulle et les pages H5 ouvertes hors de l’application.",
  it: "Un compito in più non dovrebbe significare un’altra app: il servizio entra nella conversazione. La suite offre il menu a due livelli, le carte dinamiche, la busta del canale a conoscenza zero e le pagine H5 aperte fuori dall’app.",
  nl: "Nog een taak mag niet nog een app betekenen: de dienst komt het gesprek in. De suite geeft het menu met twee niveaus, dynamische kaarten, de kanaalomslag met zero-knowledge en H5-pagina’s buiten de app.",
  cs: "Jeden úkol navíc nemusí znamenat další aplikaci: služba přichází do konverzace. Sada nabízí dvouúrovňové menu, dynamické karty, obálku kanálu s nulovou znalostí a H5 stránky otevřené mimo aplikaci.",
  "zh-Hans": "办一件事不必再多装一个应用：服务直接接进聊天里。服务号套件给的是两级菜单、动态卡片、零知识频道信封，以及在应用外打开的 H5。",
  "zh-Hant": "辦一件事不必再多裝一個應用程式：服務直接接進對話裡。服務號套件給的是兩級選單、動態卡片、零知識頻道信封，以及在應用程式外開啟的 H5。",
  es: "Una tarea más no debería significar otra aplicación: el servicio entra en la conversación. El conjunto ofrece el menú de dos niveles, las tarjetas dinámicas, el sobre de canal de conocimiento cero y las páginas H5 abiertas fuera de la aplicación.",
  pl: "Jedno nowe zadanie nie powinno znaczyć jednej aplikacji więcej: usługa przychodzi do rozmowy. Zestaw daje dwupoziomowe menu, dynamiczne karty, kopertę kanału o zerowej wiedzy i strony H5 otwierane poza aplikacją.",
  ja: "用事がひとつ増えるたびにアプリをひとつ入れる必要はなく、サービスのほうが会話のほうへ来ます。スイートは 2 階層のメニューと動的なカード、ゼロ知識のチャンネル封筒、アプリの外で開く H5 ページを用意します。",
  th: "งานเพิ่มหนึ่งอย่างไม่ควรหมายถึงแอปเพิ่มอีกหนึ่ง: บริการเดินเข้ามาหาแชทเอง ชุดบริการมีเมนูสองระดับ การ์ดแบบพลวัต ซองแชนเนลแบบศูนย์ความรู้พร้อมการหมุนคีย์ และหน้า H5 ที่เปิดนอกแอป",
  fi: "Yksi lisää tehtävä ei saa tarkoittaa yhtä sovellusta lisää: palvelu tulee keskusteluun. Paketti antaa kaksitasoisen valikon, dynaamiset kortit, nollatiedon kanavakirjekuoren ja sovelluksen ulkopuolella avattavat H5-sivut.",
  uk: "Одне нове завдання не повинно означати ще один застосунок: сервіс приходить у розмову. Набір дає дворівневе меню, динамічні картки, конверт каналу з нульовим знанням і H5-сторінки, відкриті поза застосунком.",
  bg: "Една нова задача не би трябвало да означава още едно приложение: услугата идва в разговора. Комплектът дава менюто на две нива, динамичните карти, пликът на канала с нулево знание и H5 страниците, отваряни извън приложението.",
  tr: "Yeni bir iş, yeni bir uygulama demek olmak zorunda değil: hizmet sohbete gelir. Paket, iki düzeyli menüyü, dinamik kartları, sıfır bilgi kanal zarfını ve uygulamanın dışında açılan H5 sayfalarını verir.",
  hu: "Egy újabb feladat nem jelenthet újabb alkalmazást: a szolgáltatás jön a beszélgetésbe. A csomag adja a két szintű menüt, a dinamikus kártyákat, a nullaismeretű csatornaborítékot és az alkalmazáson kívül nyíló H5-oldalakat.",
};

const SC6_TITLE: Localized<string> = {
  en: "Cross-device collaboration",
  ru: "Работа между устройствами",
  de: "Geräteübergreifende Zusammenarbeit",
  fr: "Collaboration entre appareils",
  it: "Collaborazione tra dispositivi",
  nl: "Samenwerking tussen apparaten",
  cs: "Spolupráce mezi zařízeními",
  "zh-Hans": "跨端协作",
  "zh-Hant": "跨端協作",
  es: "Colaboración entre dispositivos",
  pl: "Współpraca między urządzeniami",
  ja: "端末をまたぐ連携",
  th: "การทำงานร่วมข้ามอุปกรณ์",
  fi: "Laitteiden välinen yhteistyö",
  uk: "Співпраця між пристроями",
  bg: "Съвместна работа между устройства",
  tr: "Cihazlar arası iş birliği",
  hu: "Eszközök közti együttműködés",
};

const SC6_BODY: Localized<string> = {
  en: "Live once the owner turns it on: an iOS or Android phone paired to a bound Mac Node with a signed one-time credential gets the assistant loop — a briefing at the hour you set (08:00 by default), read-only mail triage whose sending waits for your confirmation, a home-device sentinel whose repairs wait for your approval, a signed LAN-only Discover feed that quietly refreshes the phone, and signed update cards. The phone↔Mac Node line is wired; a shared scheduler across products is not.",
  ru: "Работает, как только владелец это включит: телефон на iOS или Android, сопряжённый с привязанным Mac Node по подписанному одноразовому удостоверению, получает цикл помощника — сводку в заданный час (по умолчанию 08:00), сортировку почты только для чтения с отправкой после вашего подтверждения, сторож домашних устройств, чьи исправления ждут вашего одобрения, подписанную ленту Discover только в локальной сети, тихо обновляющую телефон, и подписанные карточки обновлений. Линия телефон↔Mac Node проложена; общего планировщика между продуктами нет.",
  de: "Live, sobald der Besitzer es einschaltet: Ein iOS- oder Android-Handy, das per signierter Einmal-Berechtigung an einen gebundenen Mac Node gekoppelt ist, erhält die Assistentenschleife — ein Briefing zur eingestellten Stunde (standardmäßig 08:00), schreibgeschützte Mail-Sichtung, deren Versand auf Ihre Bestätigung wartet, ein Hausgeräte-Wächter, dessen Reparaturen auf Ihre Freigabe warten, ein signierter LAN-only-Discover-Feed, der das Handy still aktualisiert, und signierte Update-Karten. Die Handy↔Mac-Node-Linie ist verdrahtet; einen gemeinsamen Scheduler über Produkte hinweg gibt es nicht.",
  fr: "Actif dès que le propriétaire l’active : un téléphone iOS ou Android appairé à un Mac Node lié par un justificatif signé à usage unique reçoit la boucle d’assistant — un briefing à l’heure choisie (08:00 par défaut), un tri des mails en lecture seule dont l’envoi attend votre confirmation, une sentinelle des appareils domestiques dont les correctifs attendent votre approbation, un flux Discover signé limité au réseau local qui rafraîchit discrètement le téléphone, et des cartes de mise à jour signées. La ligne téléphone↔Mac Node est câblée ; un ordonnanceur commun entre produits ne l’est pas.",
  it: "Attivo appena il proprietario lo accende: un telefono iOS o Android abbinato a un Mac Node vincolato con una credenziale firmata e monouso riceve il ciclo dell’assistente — un briefing all’ora scelta (08:00 per impostazione predefinita), triage della posta in sola lettura il cui invio attende la tua conferma, una sentinella dei dispositivi domestici i cui interventi attendono la tua approvazione, un feed Discover firmato solo LAN che aggiorna il telefono in silenzio e carte di aggiornamento firmate. La linea telefono↔Mac Node è cablata; un pianificatore condiviso tra prodotti no.",
  nl: "Live zodra de eigenaar het aanzet: een iOS- of Android-telefoon die met een ondertekende eenmalige referentie aan een gebonden Mac Node is gekoppeld, krijgt de assistentlus — een briefing op het ingestelde uur (standaard 08:00), alleen-lezen mailtriage waarvan het verzenden op uw bevestiging wacht, een huisapparaatwacht waarvan reparaties op uw goedkeuring wachten, een ondertekende LAN-only Discover-feed die de telefoon stil ververst, en ondertekende updatekaarten. De lijn telefoon↔Mac Node is bedraad; een gedeelde planner tussen producten niet.",
  cs: "Běží, jakmile to vlastník zapne: telefon s iOS nebo Androidem spárovaný s připojeným Mac Node přes podepsaný jednorázový údaj dostane smyčku asistenta — briefing ve zvolenou hodinu (výchozí 08:00), třídění pošty jen pro čtení, jehož odeslání čeká na vaše potvrzení, hlídač domácích zařízení, jehož opravy čekají na vaše schválení, podepsaný feed Discover pouze v LAN, který tiše obnovuje telefon, a podepsané karty aktualizací. Linka telefon↔Mac Node je zapojená; společný plánovač napříč produkty ne.",
  "zh-Hans": "你打开它就生效：iOS 或 Android 手机凭一份签名的一次性配对凭据连上已绑定的 Mac Node，就能用上助理闭环——在你设定的时间（默认 08:00）送上简报，只读整理邮件、发送要等你确认，看守家庭设备、修复要等你批准，用仅限局域网的签名 Discover 流静默刷新手机，并送来签名的升级卡片。手机↔Mac Node 这条线已经接上；跨产品的共用调度器还没有。",
  "zh-Hant": "你打開它就生效：iOS 或 Android 手機憑一份簽章的一次性配對憑證連上已綁定的 Mac Node，就能用上助理閉環——在你設定的時間（預設 08:00）送上簡報，唯讀整理郵件、傳送要等你確認，看守家庭裝置、修復要等你批准，用僅限區域網路的簽章 Discover 流靜默刷新手機，並送來簽章的升級卡片。手機↔Mac Node 這條線已經接上；跨產品的共用排程器還沒有。",
  es: "Activo en cuanto el dueño lo enciende: un teléfono iOS o Android emparejado con un Mac Node vinculado mediante una credencial firmada de un solo uso recibe el bucle de asistente: un informe a la hora elegida (08:00 por defecto), triaje de correo en solo lectura cuyo envío espera tu confirmación, un centinela de dispositivos del hogar cuyas reparaciones esperan tu aprobación, un feed Discover firmado solo LAN que actualiza el teléfono en silencio y tarjetas de actualización firmadas. La línea teléfono↔Mac Node está cableada; un planificador compartido entre productos no.",
  pl: "Działa, gdy właściciel je włączy: telefon z iOS lub Androidem sparowany z powiązanym Mac Node przez podpisane jednorazowe poświadczenie otrzymuje pętlę asystenta — briefing o wybranej godzinie (domyślnie 08:00), przegląd poczty tylko do odczytu, którego wysyłka czeka na twoje potwierdzenie, strażnik urządzeń domowych, którego naprawy czekają na twoje zatwierdzenie, podpisany kanał Discover tylko w sieci lokalnej, po cichu odświeżający telefon, oraz podpisane karty aktualizacji. Linia telefon↔Mac Node jest połączona; wspólnego planisty między produktami nie ma.",
  ja: "所有者がオンにすれば動きます。署名された使い捨てのペアリング資格情報でバインド済み Mac Node につないだ iOS または Android のスマホが、アシスタントループを使えます。設定した時刻（既定は 08:00）のブリーフィング、読み取り専用で送信はあなたの確認を待つメール整理、修復はあなたの承認を待つ家庭内デバイスの見張り、スマホを静かに更新する LAN 限定の署名付き Discover フィード、そして署名付きの更新カードです。スマホ↔Mac Node の線はつながっていますが、製品をまたぐ共通スケジューラーはありません。",
  th: "เปิดเมื่อเจ้าของเปิดใช้: มือถือ iOS หรือ Android ที่จับคู่กับ Mac Node ที่ผูกไว้ด้วยข้อมูลจับคู่ใช้แล้วทิ้งที่ลงนาม จะได้วงจรผู้ช่วย — สรุปตามเวลาที่ตั้งไว้ (ค่าเริ่มต้น 08:00) คัดกรองอีเมลแบบอ่านอย่างเดียวที่การส่งรอคุณยืนยัน เฝ้าระวังอุปกรณ์ในบ้านที่การซ่อมรอการอนุมัติของคุณ ฟีด Discover ที่ลงนามและจำกัดใน LAN ซึ่งรีเฟรชมือถืออย่างเงียบ ๆ และการ์ดอัปเดตที่ลงนาม เส้นทางมือถือ↔Mac Node เชื่อมแล้ว แต่ตัวจัดกำหนดงานร่วมข้ามผลิตภัณฑ์ยังไม่มี",
  fi: "Toimii, kun omistaja kytkee sen päälle: iOS- tai Android-puhelin, joka on paritettu sidottuun Mac Nodeen allekirjoitetulla kertaluonteisella tunnisteella, saa avustajasilmukan — briifaus valittuna hetkenä (oletus 08:00), vain luku -sähköpostin lajittelu, jonka lähetys odottaa vahvistustasi, kotilaitteiden vahti, jonka korjaukset odottavat hyväksyntääsi, allekirjoitettu vain lähiverkossa toimiva Discover-syöte, joka päivittää puhelinta hiljaa, ja allekirjoitetut päivityskortit. Puhelin↔Mac Node -linja on kytketty; yhteistä tuotteiden välistä ajoitinta ei ole.",
  uk: "Працює, щойно власник це ввімкне: телефон на iOS або Android, спряжений із прив’язаним Mac Node через підписане одноразове облікове дані, отримує цикл помічника — брифінг у призначену годину (типово 08:00), сортування пошти лише для читання, надсилання якої чекає вашого підтвердження, сторож домашніх пристроїв, чиї виправлення чекають на ваш дозвіл, підписаний потік Discover лише в локальній мережі, який тихо оновлює телефон, і підписані картки оновлень. Лінію телефон↔Mac Node прокладено; спільного планувальника між продуктами немає.",
  bg: "Работи, щом собственикът го включи: телефон с iOS или Android, сдвоен със свързан Mac Node чрез подписан еднократен идентификатор, получава цикъла на асистента — брифинг в зададения час (по подразбиране 08:00), сортиране на поща само за четене, чието изпращане чака вашето потвърждение, страж на домашните устройства, чиито поправки чакат вашето одобрение, подписан Discover поток само в LAN, който тихо обновява телефона, и подписани карти за актуализация. Линията телефон↔Mac Node е свързана; общ планировчик между продуктите няма.",
  tr: "Sahip açtığı anda çalışır: imzalı tek kullanımlık kimlikle bağlı bir Mac Node’a eşleştirilmiş iOS veya Android telefon asistan döngüsünü alır — seçtiğiniz saatte brifing (varsayılan 08:00), gönderimi onayınızı bekleyen salt okunur e-posta taraması, onarımları onayınızı bekleyen ev cihazı gözcüsü, telefonu sessizce yenileyen imzalı ve yalnız LAN’da çalışan Discover akışı ve imzalı güncelleme kartları. Telefon↔Mac Node hattı bağlı; ürünler arası ortak bir zamanlayıcı yok.",
  hu: "Akkor él, amikor a tulajdonos bekapcsolja: az aláírt, egyszer használatos hitelesítő adattal kötött Mac Node-hoz párosított iOS vagy Android telefon megkapja az asszisztens-ciklust — eligazítás a beállított órában (alapértelmezés 08:00), csak olvasható levélszűrés, amelynek küldése a jóváhagyására vár, otthoni eszközfigyelő, amelynek javításai a jóváhagyására várnak, aláírt, csak helyi hálózaton működő Discover-hírfolyam, amely csendesen frissíti a telefont, és aláírt frissítési kártyák. A telefon↔Mac Node vonal be van kötve; a termékek közti közös ütemező nincs.",
};

const FOOT: Localized<string> = {
  en: "Five of the six can be opened and tried right now; the one marked Evolving is missing code, not a plan. Every icon here is a vector line drawn inside the page — no image files, no external fonts, no trackers, and the sibling sites load only when you click them.",
  ru: "Пять из шести можно открыть и попробовать прямо сейчас; одной с пометкой «Развивается» не хватает кода, а не плана. Каждая иконка здесь — векторные линии внутри страницы: нет файлов изображений, внешних шрифтов и трекеров, а соседние сайты грузятся только по клику.",
  de: "Fünf der sechs lassen sich jetzt öffnen und ausprobieren; der einen mit „In Entwicklung“ fehlt Code, nicht Plan. Jedes Symbol hier ist eine Vektorlinie innerhalb der Seite — keine Bilddateien, keine externen Schriften, keine Tracker, und die Schwester-Sites laden erst auf Klick.",
  fr: "Cinq sur six s’ouvrent et s’essaient dès maintenant ; à celle marquée « En évolution », il manque du code, pas un plan. Chaque icône ici est un tracé vectoriel de la page — aucun fichier image, aucune police externe, aucun traqueur, et les sites frères ne se chargent qu’au clic.",
  it: "Cinque su sei si possono aprire e provare subito; a quella etichettata «In evoluzione» manca codice, non un piano. Ogni icona qui è un tracciato vettoriale dentro la pagina — nessun file immagine, nessun font esterno, nessun tracciatore, e gli altri siti si caricano solo al clic.",
  nl: "Vijf van de zes zijn nu te openen en uit te proberen; aan de kaart met «In ontwikkeling» ontbreekt code, geen plan. Elk pictogram hier is een vectorlijn binnen de pagina — geen bestandsafbeeldingen, geen externe lettertypen, geen trackers, en de zustersites laden pas na een klik.",
  cs: "Pět ze šesti lze otevřít a vyzkoušet hned; jedné označené «Ve vývoji» chybí kód, ne plán. Každá ikona tady je vektorová linka uvnitř stránky — žádné obrázkové soubory, žádné externí fonty, žádné sledovače, a přidružené weby se načtou až po kliknutí.",
  "zh-Hans": "六个场景里，五个今天就能自己点开试；标着「演进中」的那一个缺的是代码，不是计划。卡片里的图标都是页面内画的矢量线条，没有图片文件、没有外部字体、没有任何追踪器，另外三个站点只在你点击后才加载。",
  "zh-Hant": "六個情境裡，五個今天就能自己點開試；標著「演進中」的那一個缺的是程式碼，不是計畫。卡片裡的圖示都是頁面內繪製的向量線條，沒有圖片檔案、沒有外部字型、沒有追蹤器，另外三個網站只在您點擊後才載入。",
  es: "Cinco de las seis se pueden abrir y probar ya; a la marcada «En evolución» le falta código, no un plan. Cada icono aquí es una línea vectorial dentro de la página — sin archivos de imagen, sin fuentes externas, sin rastreadores, y los sitios hermanos se cargan solo al hacer clic.",
  pl: "Pięć z sześciu można otworzyć i wypróbować od razu; tej oznaczonej «W rozwoju» brakuje kodu, nie planu. Każda ikona tutaj to wektorowa linia wewnątrz strony — żadnych plików graficznych, zewnętrznych fontów ani trackerów, a siostrzane witryny ładują się dopiero po kliknięciu.",
  ja: "六つのうち五つはこれから開いて試せます。「進化中」の一つに足りないのは計画ではなくコードです。このページの図柄はいずれもページ内に引いたベクターの線で、画像ファイルも外部フォントも計測もありません。外のサイトはクリックしたときに開くだけです。",
  th: "ห้าจากหกใบเปิดลองได้เลยตอนนี้ ส่วนใบเดียวที่ติดป้าย «กำลังพัฒนา» ขาดโค้ด ไม่ใช่แผน ไอคอนทุกอันในหน้านี้คือเส้นเวกเตอร์ที่วาดไว้ในหน้า ไม่มีไฟล์รูป ไม่มีฟอนต์ภายนอก ไม่มีตัวติดตาม และเว็บอื่นจะโหลดก็ต่อเมื่อคุณคลิก",
  fi: "Viisi kuudesta avautuu ja kokeillaan heti; yhdeltä «Kehitysvaiheessa»-kortilta puuttuu koodi, ei suunnitelma. Jokainen kuvake täällä on sivun sisälle piirretty vektoriviiva — ei kuvatiedostoja, ei ulkoisia fontteja, ei seurantaa, ja sisarsivustot latautuvat vasta klikkauksesta.",
  uk: "П’ять із шести можна відкрити й спробувати вже тепер; одній із позначкою «Розвивається» бракує коду, а не плану. Кожна піктограма тут — це векторні лінії всередині сторінки: жодних файлів зображень, зовнішніх шрифтів і відстеження, а сусідні сайти завантажуються лише після кліку.",
  bg: "Пет от шестте могат да се отворят и пробват веднага; на едната маркирана «В развитие» липсва код, а не план. Всяка икона тук е векторна линия вътре в страницата — без файлове с изображения, без външни шрифтове, без проследяване, а сродните сайтове се зареждат чак при клик.",
  tr: "Altının beşi hemen açılıp denenebilir; «Gelişiyor» etiketli tek kartın eksiği plan değil kod. Buradaki her simge sayfanın içinde çizilmiş vektör çizgisidir — dosya resmi yok, dış yazı tipi yok, izleyici yok, ve kardeş siteler yalnızca tıkladığınızda yüklenir.",
  hu: "A hat közül öt azonnal felnyitható és kipróbálható; az egyetlen «Fejlesztés alatt» jelűnek kód hiányzik, nem terv. Itt minden ikon az oldal belsejében rajzolt vektorvonal — nincs képfájl, nincs külső betűtípus, nincs követő, a testoldalak pedig csak kattintás után töltődnek.",
};

type Icon = (props: { className: string }) => ReactElement;

/* Line icons, drawn inline. No <text>, no <image>, no external reference: a card
   that renders must not ask another host for anything. */
const IconChat: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M20.5 11.4c0 3.9-3.8 7.1-8.5 7.1-.9 0-1.8-.1-2.6-.3L5 19.6l1.1-3A6.8 6.8 0 0 1 3.5 11.4c0-3.9 3.8-7.1 8.5-7.1s8.5 3.2 8.5 7.1Z" />
    <path d="M8.6 11.4h.01M12 11.4h.01M15.4 11.4h.01" />
  </svg>
);

const IconDevice: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <rect x="6.6" y="2.6" width="10.8" height="18.8" rx="2.6" />
    <path d="M10.4 5.6h3.2" />
    <path d="M12 10.2l1.3 3 3 1.3-3 1.3-1.3 3-1.3-3-3-1.3 3-1.3Z" />
  </svg>
);

const IconAgents: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <circle cx="12" cy="5" r="2.4" />
    <circle cx="5.4" cy="18.6" r="2.4" />
    <circle cx="18.6" cy="18.6" r="2.4" />
    <path d="M12 7.4v4.1M12 11.5 6.6 16.5M12 11.5l5.4 5" />
  </svg>
);

const IconChip: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <rect x="7.6" y="7.6" width="8.8" height="8.8" rx="1.8" />
    <path d="M10.4 4.2v3.4M13.6 4.2v3.4M10.4 16.4v3.4M13.6 16.4v3.4M4.2 10.4h3.4M4.2 13.6h3.4M16.4 10.4h3.4M16.4 13.6h3.4" />
  </svg>
);

const IconServices: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M10.1 13.9a3.7 3.7 0 0 0 5.2 0l2.5-2.5a3.7 3.7 0 0 0-5.2-5.2l-1.1 1.1" />
    <path d="M13.9 10.1a3.7 3.7 0 0 0-5.2 0l-2.5 2.5a3.7 3.7 0 0 0 5.2 5.2l1.1-1.1" />
  </svg>
);

const IconCalendar: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <rect x="3.6" y="5.4" width="16.8" height="15" rx="2.4" />
    <path d="M3.6 9.9h16.8M8.2 3.6v3.4M15.8 3.6v3.4" />
    <path d="M8.9 15.6l1.8 1.8 4.2-4.2" />
  </svg>
);

type Scenario = {
  title: Localized<string>;
  body: Localized<string>;
  icon: Icon;
  /** Locale-free destination shown in the card footer. */
  target: string;
  href: string;
  external: boolean;
  available: boolean;
};

const SCENARIOS: readonly Scenario[] = [
  {
    title: SC1_TITLE,
    body: SC1_BODY,
    icon: IconChat,
    target: "/download/",
    href: "/download/",
    external: false,
    available: true,
  },
  {
    title: SC2_TITLE,
    body: SC2_BODY,
    icon: IconDevice,
    target: "/download/",
    href: "/download/",
    external: false,
    available: false,
  },
  {
    title: SC3_TITLE,
    body: SC3_BODY,
    icon: IconAgents,
    target: BOT_STUDIO_URL.replace("https://", ""),
    href: BOT_STUDIO_URL,
    external: true,
    available: true,
  },
  {
    title: SC4_TITLE,
    body: SC4_BODY,
    icon: IconChip,
    target: NODE_PORTAL_URL.replace("https://", ""),
    href: NODE_PORTAL_URL,
    external: true,
    available: true,
  },
  {
    title: SC5_TITLE,
    body: SC5_BODY,
    icon: IconServices,
    target: MP_PORTAL_URL.replace("https://", ""),
    href: MP_PORTAL_URL,
    external: true,
    available: true,
  },
  {
    title: SC6_TITLE,
    body: SC6_BODY,
    icon: IconCalendar,
    target: "/ecosystem/",
    href: "/ecosystem/",
    external: false,
    available: true,
  },
];

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export function UserScenariosGrid(): ReactElement {
  const sectionLabel = useCopy(TITLE);
  const note = useCopy(FOOT);

  return (
    <section id="scenarios" aria-label={sectionLabel} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} />
        <ul className="mt-9 grid grid-cols-[minmax(0,1fr)] items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((scenario, index) => (
            <ScenarioCard key={`sc${index + 1}`} scenario={scenario} index={index} />
          ))}
        </ul>
        <p className="mt-5 min-w-0 break-words text-[12.5px] leading-relaxed text-faint">{note}</p>
      </div>
    </section>
  );
}

function ScenarioCard({ scenario, index }: { scenario: Scenario; index: number }): ReactElement {
  const body = useCopy(scenario.body);
  const action = useCopy(
    scenario.external ? CTA_OPEN : scenario.href === "/download/" ? ROUTE_LABELS.download : ROUTE_LABELS.ecosystem,
  );
  const status = useCopy(scenario.available ? STATUS_AVAILABLE : STATUS_EVOLVING);
  const tone = scenario.available ? TONES.mesh : TONES.warn;

  return (
    <li className="flex min-w-0">
      {scenario.external ? (
        <a
          href={scenario.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass(tone.ring)}
        >
          <CardBody
            scenario={scenario}
            index={index}
            body={body}
            action={action}
            status={status}
            toneText={tone.text}
          />
        </a>
      ) : (
        <Link href={scenario.href} prefetch={false} className={cardClass(tone.ring)}>
          <CardBody
            scenario={scenario}
            index={index}
            body={body}
            action={action}
            status={status}
            toneText={tone.text}
          />
        </Link>
      )}
    </li>
  );
}

function cardClass(ring: string): string {
  return `glass glass-hover flex h-full min-w-0 flex-col border p-5 ${ring} ${FOCUS}`;
}

function CardBody({
  scenario,
  index,
  body,
  action,
  status,
  toneText,
}: {
  scenario: Scenario;
  index: number;
  body: string;
  action: string;
  status: string;
  toneText: string;
}): ReactElement {
  const title = useCopy(scenario.title);
  const Icon = scenario.icon;
  const available = scenario.available;

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className={`min-w-0 break-words font-mono text-[10.5px] text-faint`}>{`0${index + 1}`}</span>
        <span className="flex shrink-0 items-center gap-2">
          <StatusDot tone={available ? "mesh" : "warn"} pulse={false} />
          <span className={`chip ${toneText}`}>{status}</span>
        </span>
      </div>
      <div className="mt-4 flex items-start gap-3">
        <Icon className={`h-[22px] w-[22px] shrink-0 ${toneText}`} />
        <h3 className="min-w-0 break-words text-[15.5px] font-semibold leading-snug tracking-tight text-white">
          {title}
        </h3>
      </div>
      <p className="mt-3 min-w-0 break-words hyphens-auto text-[13px] leading-relaxed text-mute">
        {body}
      </p>
      <div className="hairline-top mt-auto flex min-w-0 items-center justify-between gap-3 pt-4">
        <span className="min-w-0 break-words font-mono text-[12px] text-faint">{scenario.target}</span>
        <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-faint">
          {action}
          <span aria-hidden className="text-[13px]">
            {scenario.external ? "↗" : "→"}
          </span>
        </span>
      </div>
    </>
  );
}

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
 *  - Four cards are `Available` because the capability is implemented in one of
 *    the four repositories and a visitor can open it today; two are `Evolving`
 *    because the code does not exist yet, which is stated in the card's own body
 *    and again in its pill. The pill pair is imported from `AiThreeLayers` rather
 *    than re-authored so the homepage cannot describe one system with two
 *    vocabularies, and the claims track `AgentProtocol.tsx` on /ecosystem/.
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
  en: "Start with the four you can open today; read the two marked Evolving afterward. Internal pages open here, the three sibling sites in a new tab, and this page loads nothing from them.",
  ru: "Начните с четырёх карточек, которые можно открыть уже сегодня, затем прочитайте две с пометкой «Развивается». Внутренние страницы открываются здесь, три соседних сайта — в новой вкладке, и эта страница у них ничего не загружает.",
  de: "Beginnen Sie mit den vier Karten, die Sie heute schon öffnen können, und lesen Sie die beiden mit „In Entwicklung“ danach. Portalseiten öffnen hier, die drei Schwester-Sites in einem neuen Tab, und diese Seite lädt von ihnen nichts.",
  fr: "Commencez par les quatre cartes que vous pouvez ouvrir aujourd’hui, puis lisez les deux marquées « En évolution ». Les pages internes s’ouvrent ici, les trois sites frères dans un nouvel onglet, et cette page ne charge rien chez eux.",
  it: "Inizia dalle quattro carte che puoi aprire oggi, poi leggi le due etichettate «In evoluzione». Le pagine interne si aprono qui, gli altri tre siti in una nuova scheda, e questa pagina non carica nulla da loro.",
  nl: "Begin bij de vier kaarten die je vandaag kunt openen en lees daarna de twee met «In ontwikkeling». Portalpagina’s openen hier, de drie zustersites in een nieuw tabblad, en deze pagina laadt niets van hen.",
  cs: "Začněte čtyřmi kartami, které lze otevřít už dnes, a pak si přečtěte dvě označené «Ve vývoji». Interní stránky se otevírají tady, tři přidružené weby v novém panelu a tato stránka z nich nic nenačítá.",
  "zh-Hans": "先看今天就能点开的四张，再看标着「演进中」的两张。站内页面原地打开，另外三个官方站点在新窗口打开——本页不会从它们加载任何资源。",
  "zh-Hant": "先看今天就能點開的四張，再看標著「演進中」的兩張。站內頁面原地開啟，另外三個官方網站在新視窗開啟——本頁不會從它們載入任何資源。",
  es: "Empiece por las cuatro tarjetas que puede abrir hoy y lea después las dos marcadas «En evolución». Las páginas internas se abren aquí, los otros tres sitios en una pestaña nueva, y esta página no carga nada de ellos.",
  pl: "Zacznijcie od czterech kart, które można otworzyć już dziś, a potem przeczytajcie dwie oznaczone «W rozwoju». Strony wewnętrzne otwierają się tutaj, trzy siostrzane witryny w nowej karcie, a ta strona niczego od nich nie pobiera.",
  ja: "今日そのまま開ける 4 枚から見て、「進化中」の 2 枚はあとで。内側のページはこの場で開き、ほかの 3 つの公式サイトは新しいタブで開きます。このページはそこから何も読み込みません。",
  th: "เริ่มจากสี่การ์ดที่เปิดได้เลยตั้งแต่วันนี้ แล้วค่อยอ่านสองใบที่ติดป้าย «กำลังพัฒนา» หน้าในเว็บเปิดตรงนี้ อีกสามเว็บไซต์ทางการเปิดในแท็บใหม่ และหน้านี้ไม่โหลดสิ่งใดจากที่นั่น",
  fi: "Aloita neljästä kortista, jotka voit avata jo tänään, ja lue sitten kaksi «Kehitysvaiheessa»-leimattua. Oman sivuston sivut avautuvat täällä, kolme sisarsivustoa uuteen välilehteen, eikä tämä sivu lataa niiltä mitään.",
  uk: "Почніть із чотирьох карток, які можна відкрити вже сьогодні, а потім прочитайте дві з позначкою «Розвивається». Внутрішні сторінки відкриваються тут, три сусідні сайти — у новій вкладці, і ця сторінка в них нічого не завантажує.",
  bg: "Започнете с четирите карти, които можете да отворите още днес, после прочетете двете маркирани «В развитие». Вътрешните страници се отварят тук, трите сродни сайта — в нов раздел, а тази страница не зарежда нищо от тях.",
  tr: "Bugün açabileceğiniz dört kartla başlayın, ardından „Gelişiyor“ etiketli ikisini okuyun. Portal içi sayfalar burada, üç kardeş site yeni sekmede açılır; bu sayfa onlardan hiçbir şey yüklemez.",
  hu: "Kezdje a négy, már ma nyitható kártyával, azután olvassa a két «Fejlesztés alatt» jelűt. A belső oldalak itt nyílnak, a három testoldal új lapon, és ez az oldal tőlük semmit nem tölt be.",
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
  en: "Intelligent collaboration",
  ru: "Умное расписание и работа между устройствами",
  de: "Intelligente Terminplanung, Geräte übergreifend",
  fr: "Agenda intelligent et travail multi-appareils",
  it: "Agenda intelligente e lavoro tra dispositivi",
  nl: "Slimme planning en werk over apparaten",
  cs: "Chytrý rozvrh a práce napříč zařízeními",
  "zh-Hans": "智能日程与跨端协作",
  "zh-Hant": "智慧日程與跨端協作",
  es: "Agenda inteligente y trabajo entre dispositivos",
  pl: "Inteligentny harmonogram i praca między urządzeniami",
  ja: "スケジュールと端末をまたぐ協働",
  th: "ตารางงานอัจฉริยะและการทำงานข้ามอุปกรณ์",
  fi: "Älykäs aikataulu ja laitteiden välinen työ",
  uk: "Розумний графік і робота між пристроями",
  bg: "Умен график и работа между устройства",
  tr: "Akıllı takvim ve cihazlar arası çalışma",
  hu: "Intelligens naptár és eszközök közti munka",
};

const SC6_BODY: Localized<string> = {
  en: "One sentence that fills the calendar and follows you from phone to machine is what people ask for first — and the one thing with no code behind it: no cross-component scheduling call exists in any of the four repositories.",
  ru: "Одна фраза, которая заполняет расписание и следует за вами от телефона к машине, — самое частое желание, и единственное пока без кода: вызова планирования между компонентами нет ни в одном из четырёх репозиториев.",
  de: "Ein Satz, der den Kalender füllt und vom Telefon auf den Rechner mitwandert, ist der häufigste Wunsch — und das einzige ohne Code dahinter: In den vier Repositories existiert kein Aufruf übergreifender Automatisierung.",
  fr: "Une phrase qui remplit l’agenda et vous suit du téléphone à l’ordinateur est la demande la plus fréquente — et la seule sans code derrière : aucun appel d’ordonnancement entre composants n’existe dans les quatre dépôts.",
  it: "Una frase che riempie l’agenda e ti segue dal telefono al computer è la richiesta più frequente — e l’unica senza codice: nelle quattro repository non esiste alcuna chiamata di scheduling fra i componenti.",
  nl: "Eén zin die de agenda vult en je van telefoon naar machine volgt is wat mensen het eerste vragen — en het enige zonder code: in geen van de vier repos bestaat een call voor automatische planning tussen de onderdelen.",
  cs: "Věta, která naplní rozvrh a provází vás od telefonu k počítači, je nejčastější přání — a jediná bez kódu: ve čtyřech repozitářích neexistuje jediné volání automatického plánování napříč komponentami.",
  "zh-Hans": "一句话排好日程、跟着你从手机走到电脑，这是大家最先想要的效果，也是目前唯一还没有代码的那件：跨组件自动调度在四个仓库里找不到一处调用。",
  "zh-Hant": "一句話排好日程、跟著你從手機走到電腦，這是大家最先想要的效果，也是目前唯一還沒有程式碼的那件：跨元件自動排程在四個倉庫裡找不到一處呼叫。",
  es: "Una frase que llena la agenda y lo sigue del teléfono a la máquina es lo primero que pide la gente — y lo único sin código: en los cuatro repositorios no existe ni una sola llamada de programación automática entre componentes.",
  pl: "Zdanie, które wypełnia harmonogram i idzie za wami od telefonu do komputera, jest najczęściej wymienianą potrzebą — i jedyną bez kodu: w czterech repozytoriach nie ma ani jednego wywołania automatycznego planowania między komponentami.",
  ja: "ひと言で予定が並び、スマホからパソコンまでついてくる——いちばん聞きたいのはそれで、しかも今はコードが無い唯一の項目です。コンポーネントをまたぐ自動スケジューリングの呼び出しは、4 つのリポジトリのどこにもありません。",
  th: "พูดประโยคเดียวแล้วตารางงานถูกจัดและตามคุณไปจากมือถือถึงเครื่องคอมพิวเตอร์ คือสิ่งที่คนขอมากที่สุด — และเป็นสิ่งเดียวที่ยังไม่มีโค้ด: ไม่พบการเรียกวางกำหนดงานข้ามส่วนประกอบในรีโปทั้งสี่แห่งเลย",
  fi: "Yksi lause, joka täyttää kalenterin ja seuraa puhelimesta koneelle, on ensimmäinen toive — ja ainoa, jonka takana ei vielä ole koodia: neljästä arkistosta ei löydy yhtään komponenttien välistä ajoituskutsua.",
  uk: "Один рядок, який заповнює графік і йде за вами від телефону до комп’ютера, — найчастіше бажання, і єдине поки без коду: виклику автоматичного планування між компонентами немає в жодному з чотирьох репозиторіїв.",
  bg: "Изречение, което попълва графика и ви следва от телефона до машината, е най-честото желание — и единственото засега без код: и в четирите хранилища няма нито едно извикване за планиране между компонентите.",
  tr: "Tek cümleyle takvimi doldurup telefondan bilgisayara sizi izlemesi en çok istenen şey — ve ardında kod olmayan tek madde: dört deponun hiçbirinde bileşenler arası otomatik zamanlama çağrısı yok.",
  hu: "Egy mondat, amely kitölti a naptárat és telefonról számítógépre követ, a leggyakoribb kérés — és egyetlen olyan, amely mögött még nincs kód: a négy tárolóban egyetlen komponensek közti ütemezési hívás sincs.",
};

const FOOT: Localized<string> = {
  en: "Four of the six can be opened and tried right now; the two marked Evolving are missing code, not a plan. Every icon here is a vector line drawn inside the page — no image files, no external fonts, no trackers, and the sibling sites load only when you click them.",
  ru: "Четыре из шести можно открыть и попробовать прямо сейчас; тем двум, что помечены «Развивается», не хватает кода, а не плана. Каждая иконка здесь — векторные линии внутри страницы: нет файлов изображений, внешних шрифтов и трекеров, а соседние сайты грузятся только по клику.",
  de: "Vier der sechs lassen sich jetzt öffnen und ausprobieren; den beiden mit „In Entwicklung“ fehlt Code, nicht Plan. Jedes Symbol hier ist eine Vektorlinie innerhalb der Seite — keine Bilddateien, keine externen Schriften, keine Tracker, und die Schwester-Sites laden erst auf Klick.",
  fr: "Quatre sur six s’ouvrent et s’essaient dès maintenant ; aux deux marquées « En évolution », il manque du code, pas un plan. Chaque icône ici est un tracé vectoriel de la page — aucun fichier image, aucune police externe, aucun traqueur, et les sites frères ne se chargent qu’au clic.",
  it: "Quattro su sei si possono aprire e provare subito; alle due etichettate «In evoluzione» manca codice, non un piano. Ogni icona qui è un tracciato vettoriale dentro la pagina — nessun file immagine, nessun font esterno, nessun tracciatore, e gli altri siti si caricano solo al clic.",
  nl: "Vier van de zes zijn nu te openen en uit te proberen; aan de twee met «In ontwikkeling» ontbreekt code, geen plan. Elk pictogram hier is een vectorlijn binnen de pagina — geen bestandsafbeeldingen, geen externe lettertypen, geen trackers, en de zustersites laden pas na een klik.",
  cs: "Čtyři ze šesti lze otevřít a vyzkoušet hned; dvě označené «Ve vývoji» postrádají kód, ne plán. Každá ikona tady je vektorová linka uvnitř stránky — žádné obrázkové soubory, žádné externí fonty, žádné sledovače, a přidružené weby se načtou až po kliknutí.",
  "zh-Hans": "六个场景里，四个今天就能自己点开试；标着「演进中」的两个缺的是代码，不是计划。卡片里的图标都是页面内画的矢量线条，没有图片文件、没有外部字体、没有任何追踪器，另外三个站点只在你点击后才加载。",
  "zh-Hant": "六個情境裡，四個今天就能自己點開試；標著「演進中」的兩個缺的是程式碼，不是計畫。卡片裡的圖示都是頁面內繪製的向量線條，沒有圖片檔案、沒有外部字型、沒有追蹤器，另外三個網站只在您點擊後才載入。",
  es: "Cuatro de las seis se pueden abrir y probar ya; a las dos marcadas «En evolución» les falta código, no un plan. Cada icono aquí es una línea vectorial dentro de la página — sin archivos de imagen, sin fuentes externas, sin rastreadores, y los sitios hermanos se cargan solo al hacer clic.",
  pl: "Cztery z sześciu można otworzyć i wypróbować od razu; dwom oznaczonym «W rozwoju» brakuje kodu, nie planu. Każda ikona tutaj to wektorowa linia wewnątrz strony — żadnych plików graficznych, zewnętrznych fontów ani trackerów, a siostrzane witryny ładują się dopiero po kliknięciu.",
  ja: "六つのうち四つはこれから開いて試せます。「進化中」の二つに足りないのは計画ではなくコードです。このページの図柄はいずれもページ内に引いたベクターの線で、画像ファイルも外部フォントも計測もありません。外のサイトはクリックしたときに開くだけです。",
  th: "สี่จากหกใบเปิดลองได้เลยตอนนี้ ส่วนสองใบที่ติดป้าย «กำลังพัฒนา» ขาดโค้ด ไม่ใช่แผน ไอคอนทุกอันในหน้านี้คือเส้นเวกเตอร์ที่วาดไว้ในหน้า ไม่มีไฟล์รูป ไม่มีฟอนต์ภายนอก ไม่มีตัวติดตาม และเว็บอื่นจะโหลดก็ต่อเมื่อคุณคลิก",
  fi: "Neljä kuudesta avautuu ja kokeillaan heti; kahdelta «Kehitysvaiheessa»-kortilta puuttuu koodi, ei suunnitelma. Jokainen kuvake täällä on sivun sisälle piirretty vektoriviiva — ei kuvatiedostoja, ei ulkoisia fontteja, ei seurantaa, ja sisarsivustot latautuvat vasta klikkauksesta.",
  uk: "Чотири з шести можна відкрити й спробувати вже тепер; двом із позначкою «Розвивається» бракує коду, а не плану. Кожна піктограма тут — це векторні лінії всередині сторінки: жодних файлів зображень, зовнішніх шрифтів і відстеження, а сусідні сайти завантажуються лише після кліку.",
  bg: "Четири от шестте могат да се отворят и пробват веднага; на две маркирани «В развитие» липсва код, а не план. Всяка икона тук е векторна линия вътре в страницата — без файлове с изображения, без външни шрифтове, без проследяване, а сродните сайтове се зареждат чак при клик.",
  tr: "Altının dördü hemen açılıp denenebilir; «Gelişiyor» etiketli ikisinin eksiği plan değil kod. Buradaki her simge sayfanın içinde çizilmiş vektör çizgisidir — dosya resmi yok, dış yazı tipi yok, izleyici yok, ve kardeş siteler yalnızca tıkladığınızda yüklenir.",
  hu: "A hat közül négy azonnal felnyitható és kipróbálható; a két «Fejlesztés alatt» jelűnek kód hiányzik, nem terv. Itt minden ikon az oldal belsejében rajzolt vektorvonal — nincs képfájl, nincs külső betűtípus, nincs követő, a testoldalak pedig csak kattintás után töltődnek.",
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
    available: false,
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
  const action = useCopy(scenario.external ? CTA_OPEN : ROUTE_LABELS.download);
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

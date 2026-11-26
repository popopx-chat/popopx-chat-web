"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { SectionHeading, StatusDot } from "@/components/ui";
import { TONES, type Tone } from "@/components/EcosystemHub";
import { STATUS_AVAILABLE, STATUS_EVOLVING } from "@/components/AiThreeLayers";

/**
 * The three connection pillars, between `UserScenariosGrid` and the compact
 * `FeaturesGrid` on the homepage.
 *
 * The brief asked for the three things that separate POPOPX from a centralised
 * AI tool: privacy of the connection, control over it, and interoperability of
 * it. Two rules decide what may be printed here:
 *
 *  1. Every line either points at an implementation in one of the four
 *     repositories or it is marked `Evolving`. That is not a hedge — measured
 *     2026-11-26: one-tap revocation does exist (a guest link, an unpaired
 *     peer, a paired Mac device), whereas a machine-checked dotted scope
 *     string has zero occurrences in Swift, Kotlin, Haskell or Python. Those
 *     are the amber dots here, plus the desktop build that states outright
 *     that it has no radio. Ledger §18 holds the measurements and recipes.
 *  2. The status vocabulary is imported, not re-authored. `STATUS_AVAILABLE` /
 *     `STATUS_EVOLVING` are the same two words `AiThreeLayers` and
 *     `UserScenariosGrid` print, so three homepage blocks cannot tell three
 *     different stories about the same repository.
 *
 * The pillar names are locale-free, like the layer names and the product names:
 * `Connection Privacy`, `Connection Control`, `Connection Interoperability` are
 * the brand's own terms and get printed identically in all 18 languages.
 */

/* Every map below is an exhaustive literal: `Localized<T>` is checked slot by slot,
   and a derived, spread or cast map would let one of the eighteen locales silently
   inherit another one's text. */

const EYEBROW: Localized<string> = {
  en: "Three connection pillars",
  ru: "Три опоры соединения",
  de: "Drei Verbindungssäulen",
  fr: "Trois piliers de la connexion",
  it: "Tre pilastri della connessione",
  nl: "Drie pijlers van verbinding",
  cs: "Tři pilíře spojení",
  "zh-Hans": "三大连接壁垒",
  "zh-Hant": "三大連接壁壘",
  es: "Tres pilares de la conexión",
  pl: "Trzy filary połączenia",
  ja: "三つの接続の柱",
  th: "สามเสาหลักของการเชื่อมต่อ",
  fi: "Kolme yhteyden pylvästä",
  uk: "Три опори з'єднання",
  bg: "Три стълба на свързването",
  tr: "Üç bağlantı sütunu",
  hu: "Három kapcsolatoszlop",
};

const TITLE: Localized<string> = {
  en: "Privacy, control and interoperability of the connection itself",
  ru: "Приватность, контроль и совместимость самого соединения",
  de: "Datenschutz, Kontrolle und Interoperabilität der Verbindung selbst",
  fr: "Confidentialité, contrôle et interopérabilité de la connexion elle-même",
  it: "Riservatezza, controllo e interoperabilità della connessione in sé",
  nl: "Privacy, controle en interoperabiliteit van de verbinding zelf",
  cs: "Soukromí, kontrola a interoperabilita samotného spojení",
  "zh-Hans": "连接本身的隐私、控制与互操作",
  "zh-Hant": "連接本身的隱私、控制與互操作",
  es: "Privacidad, control e interoperabilidad de la propia conexión",
  pl: "Prywatność, kontrola i interoperacyjność samego połączenia",
  ja: "接続そのものの秘匿・制御・相互運用",
  th: "ความเป็นส่วนตัว การควบคุม และการทำงานร่วมกันของช่องเชื่อมต่อเอง",
  fi: "Yhteyden itsensä yksityisyys, hallinta ja yhteentoimivuus",
  uk: "Приватність, контроль і сумісність самого з'єднання",
  bg: "Поверителност, контрол и интероперабилност на самото свързване",
  tr: "Bağlantının kendinde gizlilik, denetim ve birlikte çalışabilirlik",
  hu: "Magának a kapcsolatnak a titkossága, irányítása és együttműködése",
};

const LEAD: Localized<string> = {
  en: "Centralised AI tools compete on model weights. POPOPX competes on the connection itself: every line below either points at an implementation in one of the four repositories or says Evolving, and it is the same test /ecosystem/ applies.",
  ru: "Централизованные ИИ-инструменты соревнуются весами модели. POPOPX соревнуется самим соединением: каждая строка ниже либо указывает на реализацию в одном из четырёх репозиториев, либо помечена «Развивается» — и критерий тот же, что и на /ecosystem/.",
  de: "Zentralisierte KI-Werkzeuge konkurrieren um Modellgewichte. POPOPX konkurriert um die Verbindung selbst: Jede Zeile unten zeigt entweder auf eine Implementierung in einem der vier Repositories oder steht als „In Entwicklung“ — derselbe Maßstab, der auch auf /ecosystem/ gilt.",
  fr: "Les outils d’IA centralisés se disputent sur les poids de modèle. POPOPX se dispute sur la connexion elle-même : chaque ligne ci-dessous pointe soit vers une implémentation dans l’un des quatre dépôts, soit est marquée « En évolution » — même critère que sur /ecosystem/.",
  it: "Gli strumenti di IA centralizzati competono sui pesi del modello. POPOPX compete sulla connessione stessa: ogni riga qui sotto indica un’implementazione in uno dei quattro repository oppure è etichettata «In evoluzione» — lo stesso criterio usato su /ecosystem/.",
  nl: "Gecentraliseerde AI-hulpmiddelen concurreren op modelgewichten. POPOPX concurreert op de verbinding zelf: elke regel hieronder wijst óf op een implementatie in een van de vier repositories, óf staat als «In ontwikkeling» — dezelfde toets die /ecosystem/ hanteert.",
  cs: "Centralizované nástroje AI soutěží v vahách modelu. POPOPX soutěží v samotném spojení: každý řádek níže buď ukazuje na implementaci v jednom ze čtyř repozitářů, nebo je označen «Ve vývoji» — stejný test jako na /ecosystem/.",
  "zh-Hans": "中心化 AI 工具比的是模型权重，POPOPX 比的是连接本身。下面每一条要么指得出四个仓库里的实现，要么就明标「演进中」——判定口径与 /ecosystem/ 完全一致。",
  "zh-Hant": "中心化 AI 工具比的是模型權重，POPOPX 比的是連接本身。下面每一條要嘛指得出四個倉庫裡的實作，要嘛就明標「演進中」——判定口徑與 /ecosystem/ 完全一致。",
  es: "Las herramientas de IA centralizadas compiten en pesos del modelo. POPOPX compite en la propia conexión: cada línea de abajo señala una implementación en uno de los cuatro repositorios o está marcada «En evolución» — la misma prueba que aplica /ecosystem/.",
  pl: "Scentralizowane narzędzia AI rywalizują wagami modelu. POPOPX rywalizuje samym połączeniem: każdy poniższy zapis albo wskazuje na implementację w jednym z czterech repozytoriów, albo jest oznaczony «W rozwoju» — ta sama miara co na /ecosystem/.",
  ja: "中央集約型の AI ツールはモデルの重みで競います。POPOPX が競うのは接続そのものです。以下の各行は、4 つのリポジトリにある実装を指しているか、「進化中」と明記されています——判定基準は /ecosystem/ とまったく同じです。",
  th: "เครื่องมือ AI แบบรวมศูนย์แข่งกันที่น้ำหนักโมเดล ส่วน POPOPX แข่งกันที่ช่องเชื่อมต่อเอง ทุกข้อความข้างล่างนี้ชี้ไปยังสิ่งที่มีจริงในคลังโค้ดสี่แห่ง หรือระบุ «กำลังพัฒนา» — เกณฑ์เดียวกับที่ /ecosystem/ ใช้ทุกประการ",
  fi: "Keskitetyt tekoälytyökalut kilpailevat mallipainoilla. POPOPX kilpailee itse yhteydestä: jokainen alla oleva rivi joko osoittaa toteutukseen neljästä varastosta tai on merkitty «Kehitysvaiheessa» — sama mittana kuin /ecosystem/-sivulla.",
  uk: "Централізовані ІІ-інструменти змагаються вагами моделі. POPOPX змагається самим з'єднанням: кожен рядок нижче або вказує на реалізацію в одному з чотирьох репозиторіїв, або позначений «Розвивається» — той самий критерій, що й на /ecosystem/.",
  bg: "Централизираните ИИ-инструменти се състезават с теглата на модела. POPOPX се състезава със самото свързване: всеки ред надолу сочи към реализация в едно от четирите хранилища или е отбелязан «В развитие» — същият критерий като в /ecosystem/.",
  tr: "Merkezileştirilmiş YZ araçları model ağırlıklarıyla yarışır. POPOPX ise bağlantının kendisiyle yarışır: aşağıdaki her satır ya dört depodaki bir uygulamaya işaret eder ya «Gelişiyor» der — /ecosystem/'in uyguladığı aynı sınav.",
  hu: "A centralizált MI-eszközök modellsúlyokon verszenek. A POPOPX magán a kapcsolaton verszened: az alábbi sorok vagy a négy tároló egyikében lévő megvalósításra mutatnak, vagy «Fejlesztés alatt» feliratot kapnak — ugyanaz a mérce, mint az /ecosystem/ oldalon.",
};

/* ---------------------------------------------------------------- */
/* Pillar 1 — Connection Privacy                                    */
/* ---------------------------------------------------------------- */

const P1_DESC: Localized<string> = {
  en: "The connection never asks for an identity first. There is no global user ID, and addressing is a set of one-way queues rather than a graph anyone can walk.",
  ru: "Соединение не требует сначала личность. Глобального ID пользователя нет, а адресация — это набор односторонних очередей, а не граф, по которому можно пройти.",
  de: "Die Verbindung verlangt nie zuerst eine Identität. Es gibt keine globale Benutzer-ID, und Adressierung ist ein Bündel einseitiger Warteschlangen statt eines Graphen, den jemand durchgehen kann.",
  fr: "La connexion ne demande jamais d’identité d’abord. Il n’y a pas d’identifiant global, et l’adressage est un ensemble de files unidirectionnelles plutôt qu’un graphe que quiconque peut parcourir.",
  it: "La connessione non chiede mai prima un’identità. Non esiste un ID utente globale, e l’indirizzamento è un insieme di code unidirezionali anziché un grafo che chiunque può percorrere.",
  nl: "De verbinding vraagt nooit eerst om een identiteit. Er is geen globale gebruikers-ID, en adressering is een bundel eenrichtingswachtrijen in plaats van een grafen iemand kan doorlopen.",
  cs: "Spojení nikdy nejprve nechce identitu. Neexistuje žádné globální ID uživatele a adresování je soubor jednosměrných front, nikoli graf, kterým může projít kdokoli.",
  "zh-Hans": "连接从不先索要身份。没有全局用户 ID，寻址是一条条单向队列，而不是一张谁都能走一遍的关系图。",
  "zh-Hant": "連接從不先索要身份。沒有全域使用者 ID，定址是一條條單向佇列，而不是一張誰都能走一遍的關係圖。",
  es: "La conexión nunca pide primero una identidad. No hay ID de usuario global, y el direccionamiento es un conjunto de colas unidireccionales en lugar de un grafo que cualquiera pueda recorrer.",
  pl: "Połączenie nigdy nie żąda najpierw tożsamości. Nie ma globalnego identyfikatora użytkownika, a adresowanie to zbiór jednokierunkowych kolejek, a nie graf, po którym każdy może przejść.",
  ja: "接続は最初に身元を求めません。グローバルなユーザー ID はなく、アドレッシングは誰でも歩けるグラフではなく、一方向キューの集合です。",
  th: "ช่องเชื่อมต่อไม่เคยขอตัวตนก่อน ไม่มี ID ผู้ใช้กลาง และการกำหนดที่อยู่คือชุดคิวทางเดียว ไม่ใช่กราฟที่ใครก็เดินตามได้",
  fi: "Yhteys ei koskaan pyydä ensin henkilöllisyyttä. Yleistä käyttäjätunnusta ei ole, ja osoitteistus on joukko yksisuuntaisia jonoja eikä kenenkään kävelämä kaavio.",
  uk: "З'єднання ніколи не вимагає спершу особи. Глобального ID користувача немає, а адресування — це набір односторонніх черг, а не граф, яким може пройти будь-хто.",
  bg: "Свързването никога не иска първо самоличност. Няма глобален потребителски ID, а адресирането е набор от еднопосочни опашки, а не графика, по която всеки може да мине.",
  tr: "Bağlantı asla önce kimlik istemez. Küresel bir kullanıcı kimliği yok ve adresleme, herkesin gezebileceği bir çizge değil, tek yönlü kuyruklar demeti.",
  hu: "A kapcsolat soha nem kér először személyazonosságot. Nincs globális felhasználói azonosító, a címzés pedig irányított sorok halmaza, nem egy bárki járta gráf.",
};

const P1_I1: Localized<string> = {
  en: "Sign-up asks for no phone number, no e-mail and no global key — every connection is its own pair of queues.",
  ru: "Регистрация не требует ни номера телефона, ни почты, ни глобального ключа — каждое соединение это собственная пара очередей.",
  de: "Die Anmeldung braucht keine Nummer, keine E-Mail und keinen globalen Schlüssel — jede Verbindung ist ihr eigenes Paar von Warteschlangen.",
  fr: "L’inscription n’exige ni numéro, ni courriel, ni clé globale — chaque connexion est son propre couple de files.",
  it: "L’iscrizione non chiede numero, e-mail né chiave globale — ogni connessione è una coppia di code tutta sua.",
  nl: "Voor registratie heb je geen nummer, geen e-mail en geen globale sleutel nodig — elke verbinding is haar eigen wachtrij-paar.",
  cs: "Registrace nechce číslo, e-mail ani globální klíč — každé spojení je vlastní dvojice front.",
  "zh-Hans": "注册不要手机号、不要邮箱、没有全局公钥——每条连接都是独立的一对队列。",
  "zh-Hant": "註冊不要手機號、不要電郵、沒有全域金鑰——每條連線都是獨立的一對佇列。",
  es: "El registro no pide número, correo ni clave global — cada conexión es su propio par de colas.",
  pl: "Rejestracja nie wymaga numeru, e-maila ani klucza globalnego — każde połączenie to własna para kolejek.",
  ja: "登録は電話番号もメールもグローバル鍵も不要——接続はひとつひとつが独立したキューの対です。",
  th: "ตอนสมัครไม่ต้องใช้เบอร์โทร อีเมล หรือคีย์กลาง — ทุกการเชื่อมต่อคือคิวคู่ของมันเอง",
  fi: "Rekisteröinti ei kysy numeroa, sähköpostia eikä yleistä avainta — jokainen yhteys on oma kahden jonon parinsa.",
  uk: "Реєстрація не вимагає ні номера, ні пошти, ні глобального ключа — кожне з'єднання це власна пара черг.",
  bg: "Регистрацията не иска нито номер, нито поща, нито глобален ключ — всяка връзка е собствена двойка опашки.",
  tr: "Kayıt ne numara ne e-posta ne de genel anahtar istiyor — her bağlantı kendine ait bir kuyruk çiftidir.",
  hu: "A regisztráció nem kér számot, e-mailt és globális kulcsot — minden kapcsolat saját sorpárt jelent.",
};

const P1_I2: Localized<string> = {
  en: "The table that maps an offline neighbour to a contact lives in the Keychain: never in a backup, never in the chat database.",
  ru: "Таблица, сопоставляющая офлайн-соседа с контактом, живёт в Keychain: никогда в резервной копии и никогда в базе чата.",
  de: "Die Tabelle, die einen Offline-Nachbarn einem Kontakt zuordnet, liegt im Keychain: nie in einem Backup, nie in der Chat-Datenbank.",
  fr: "La table qui associe un voisin hors ligne à un contact vit dans le Keychain : jamais dans une sauvegarde, jamais dans la base de chat.",
  it: "La tabella che collega un vicino offline a un contatto vive nel Keychain: mai in un backup, mai nel database della chat.",
  nl: "De tabel die een offline buur aan een contact koppelt staat in de Keychain: nooit in een back-up, nooit in de chatdatabase.",
  cs: "Tabulka přiřazující offline souseda ke kontaktu žije v Keychain: nikdy v záloze, nikdy v databázi chatu.",
  "zh-Hans": "离线邻居对应哪个联系人，这张表只写进钥匙串：不进备份，也不进聊天数据库。",
  "zh-Hant": "離線鄰居對應哪個聯絡人，這張表只寫進金鑰串：不進備份，也不進聊天資料庫。",
  es: "La tabla que empareja un vecino sin conexión con un contacto vive en el Keychain: nunca en una copia de seguridad, nunca en la base de datos del chat.",
  pl: "Tabela przypisująca offline’owego sąsiada do kontaktu mieszka w Keychain: nigdy w kopii zapasowej, nigdy w bazie czatu.",
  ja: "オフラインの隣接端末と連絡先を対応付ける表は Keychain にだけあります。バックアップにも、チャットのデータベースにも入りません。",
  th: "ตารางที่จับคู่เพื่อนบ้านออฟไลน์กับรายชื่อติดต่อเก็บไว้ใน Keychain เท่านั้น — ไม่เข้าแบ็กอัพ ไม่เข้าฐานข้อมูลแชท",
  fi: "Taulukko, joka yhdistää offline-naapurin yhteystietoon, asuu Keychainissa: ei koskaan varmuuskopiossa, ei koskaan keskustelutietokannassa.",
  uk: "Таблиця, що прив'язує офлайн-сусіда до контакту, живе в Keychain: ніколи в резервній копії і ніколи в базі чату.",
  bg: "Таблицата, която свързва офлайн съсед с контакт, живее в Keychain: никога в резервно копие, никога в базата на чата.",
  tr: "Çevrimdışı bir komşuyu bir kişiyle eşleştiren tablo Keychain içinde yaşar: asla yedekte, asla sohbet veritabanında.",
  hu: "A tároló, amely egy offline szomszédot egy névjegyhez rendel, a Keychain-ben él: soha nem biztonsági mentésben, soha nem a csevegés-adatbázisban.",
};

const P1_I3: Localized<string> = {
  en: "Offline it runs its own flood net: dual-role GATT, TTL 7, an unseen packet re-flooded once with one hop less — not the Bluetooth Mesh specification.",
  ru: "Вне сети работает собственная лавинная сеть: два роли GATT, TTL 7, невиданный пакет ретранслируется один раз на один хоп меньше — это не спецификация Bluetooth Mesh.",
  de: "Offline läuft ein eigenes Flutnetz: GATT in beiden Rollen, TTL 7, ein unbekanntes Paket wird einmal mit einem Hop weniger weitergereicht — nicht die Bluetooth-Mesh-Spezifikation.",
  fr: "Hors ligne, son propre réseau inondant : GATT à double rôle, TTL 7, un paquet inaperçu re-propagé une fois avec un saut de moins — pas la spécification Bluetooth Mesh.",
  it: "Offline gira una propria rete a inondazione: GATT a doppio ruolo, TTL 7, un pacchetto mai visto rigirato una volta con un hop in meno — non è la specifica Bluetooth Mesh.",
  nl: "Offline draait een eigen overstromingsnetwerk: GATT in beide rollen, TTL 7, een onbekend pakket één keer met een hop minder doorgegeven — niet de Bluetooth Mesh-specificatie.",
  cs: "Offline běží vlastní zaplavovací síť: GATT v obou rolích, TTL 7, neviděný paket se jednou předá s o jednu skok méně — není to specifikace Bluetooth Mesh.",
  "zh-Hans": "断网时走自建洪泛网格：双角色 GATT、TTL 7、没见过的报文只重播一次并少一跳——不是 Bluetooth Mesh 规范。",
  "zh-Hant": "斷網時走自建洪泛網格：雙角色 GATT、TTL 7、沒見過的報文只重播一次並少一跳——不是 Bluetooth Mesh 規範。",
  es: "Sin conexión corre una propia red inundante: GATT de doble rol, TTL 7, un paquete no visto se re-difunde una vez con un salto menos — no es la especificación Bluetooth Mesh.",
  pl: "Offline działa własna sieć zalewowa: GATT w obu rolach, TTL 7, nie widziany pakiet przekazywany raz z jednym hopem mniej — to nie specyfikacja Bluetooth Mesh.",
  ja: "オフラインでは自前のフラッドネットが動きます。デュアルロールの GATT、TTL 7、見たことのないパケットは 1 ホップ減らして 1 回だけ中継——Bluetooth Mesh 規格ではありません。",
  th: "เมื่อออฟไลน์จะใช้เครือข่ายกระจายต่อของตัวเอง: GATT สองบทบาท, TTL 7, แพ็กเก็ตที่ไม่เคยเห็นจะถูกส่งต่ออีกครั้งโดยลดหนึ่งฮอป — ไม่ใช่มาตรฐาน Bluetooth Mesh",
  fi: "Offlinessa käy oma tulvimverkko: GATT molemmissa rooleissa, TTL 7, näkemättömän paketin välitys kerran yhteen hyppyyn vähemmän — ei Bluetooth Mesh -määritys.",
  uk: "Поза мережею працює власна лавинна мережа: GATT у двох ролях, TTL 7, невиданий пакет ретранслюється один раз на один хоп менше — це не специфікація Bluetooth Mesh.",
  bg: "Извън мрежата работи собствена приливна мрежа: GATT в двете роли, TTL 7, непознат пакет се препредава веднъж с един скок по-малко — не е спецификация Bluetooth Mesh.",
  tr: "Çevrimdışı kendi taşan ağını çalıştırır: çift rollü GATT, TTL 7, görülmemiş paket bir atlam eksikle bir kez yeniden yayılır — Bluetooth Mesh şartnamesi değil.",
  hu: "Offline saját elöntéses hálózat fut: kettős szerepű GATT, TTL 7, egy nem látott csomag egyszer továbbítva egy ugrással kevesebbel — nem a Bluetooth Mesh szabvány.",
};

const P1_I4: Localized<string> = {
  en: "A peer is addressed by a public key that a handshake or an announce proved — never by the 8-byte wire id alone.",
  ru: "Собеседник адресуется открытым ключом, доказанным рукопожатием или анонсом — никогда одним 8-байтовым проводным id.",
  de: "Ein Gegenüber wird über einen öffentlichen Schlüssel adressiert, den ein Handschlag oder eine Ankündigung bewiesen hat — nie über die 8-Byte-Leitungskennung allein.",
  fr: "Un pair est adressé par une clé publique prouvée par une poignée de main ou une annonce — jamais par le seul identifiant 8 octets de la ligne.",
  it: "Un peer è indirizzato da una chiave pubblica dimostrata da un handshake o un annuncio — mai dal solo id a 8 byte sul filo.",
  nl: "Een peer wordt geadresseerd via een publieke sleutel die een handshake of aankondiging bewees — nooit door alleen de 8-byte draad-id.",
  cs: "Protější strana je adresována veřejným klíčem, který prokázal handshake nebo oznámení — nikoli samotnou 8bajtovou linkovou identifikací.",
  "zh-Hans": "对端由握手或通告证明过的公钥来寻址——绝不靠那 8 字节线上 id 单独定位。",
  "zh-Hant": "對端由握手或通告證明過的公鑰來定址——絕不靠那 8 位元組線上 id 單獨定位。",
  es: "Un par se direcciona con una clave pública que probó un saludo o un anuncio — nunca solo con el id de 8 bytes de la línea.",
  pl: "Partner jest adresowany kluczem publicznym potwierdzonym przez podanie ręki albo ogłoszenie — nigdy samym 8-bajtowym id linii.",
  ja: "通信相手はハンドシェイクか告知で証明された公開鍵で特定します。8 バイトの線路上の id だけで位置づけることはありません。",
  th: "อีกฝั่งถูกกำหนดที่อยู่ด้วยคีย์สาธารณะที่การจับมือหรือการประกาศพิสูจน์แล้ว — ไม่เคยใช้ id บนสาย 8 ไบต์เพียงอย่างเดียว",
  fi: "Vertaisosoite määräytyy julkisesta avaimesta, jonka kättely tai ilmoitus osoitti — ei koskaan pelkän 8-tavun linjatunnisteen perusteella.",
  uk: "Співрозмовника адресує відкритий ключ, підтверджений рукостисканням або анонсом — ніколи одним 8-байтовим id проводу.",
  bg: "Отсрещната страна се адресира с публичен ключ, доказан от ръкостискане или обява — никога само с 8-байтовия идентификационен номер по линията.",
  tr: "Karşı uç, el sıkışma ya da duyurunun kanıtladığı açık anahtarla adreslenir — asla yalnızca 8 baytlık hat kimliğiyle değil.",
  hu: "A szemközti felet egy kézfogás vagy bejelentés által igazolt publikus kulcs azonosítja — soha nem önmagában a 8 bájtos vonal-azonosító.",
};

/* ---------------------------------------------------------------- */
/* Pillar 2 — Connection Control                                    */
/* ---------------------------------------------------------------- */

const P2_DESC: Localized<string> = {
  en: "Every step between an agent and you passes a human. The approval is the owner's own tap; the audit is a local row written per step.",
  ru: "Каждый шаг между агентом и вами проходит через человека. Подтверждение — это собственное касание владельца, а аудит — локальная строка на каждый шаг.",
  de: "Jeder Schritt zwischen einem Agenten und dir geht durch einen Menschen. Die Zustimmung ist der eigene Tipp des Besitzers; das Audit ist eine lokale Zeile pro Schritt.",
  fr: "Chaque étape entre un agent et vous passe par un humain. La validation est le propre geste du propriétaire ; l’audit est une ligne locale écrite à chaque étape.",
  it: "Ogni passo tra un agente e te passa da un umano. L’approvazione è il tocco stesso del proprietario; la revisione è una riga locale scritta per ogni passo.",
  nl: "Elke stap tussen een agent en jou gaat langs een mens. De goedkeuring is de eigen tik van de eigenaar; het auditverslag is een lokale rij per stap.",
  cs: "Každý krok mezi agentem a vámi prochází přes člověka. Schválení je vlastní klepnutí vlastníka; audit je místní záznam na každý krok.",
  "zh-Hans": "智能体与你之间的每一步都要经过人。批准是主人自己的那一次点击；审计是每一步写下的一条本地记录。",
  "zh-Hant": "智能體與你之間的每一步都要經過人。批准是主人自己的那一次點擊；稽核是每一步寫下的一條本機記錄。",
  es: "Cada paso entre un agente y tú pasa por un humano. La aprobación es el propio toque del dueño; la auditoría es una fila local escrita en cada paso.",
  pl: "Każdy krok między agentem a tobą przechodzi przez człowieka. Zatwierdzenie to własne dotknięcie właściciela; audyt to lokalny wiersz zapisywany na krok.",
  ja: "エージェントとあなたの間のすべてのステップは人間を通ります。承認は所有者自身のタップ、監査はステップごとにローカルへ書き込まれる 1 行です。",
  th: "ทุกขั้นตอนระหว่างเอเจนต์กับคุณต้องผ่านมนุษย์ การอนุมัติคือการแตะของเจ้าของเอง ส่วนการตรวจสอบคือบันทึกในเครื่องที่เขียนขึ้นทีละขั้น",
  fi: "Jokainen vaihe agentin ja sinun välillä käy ihmisen kautta. Hyväksyntä on omistajan oma napautus; tarkistuskirja on paikallinen rivi kustakin vaiheesta.",
  uk: "Кожен крок між агентом і вами проходить через людину. Підтвердження — це власне торикання власника; аудит — локальний рядок на кожен крок.",
  bg: "Всяка стъпка между агент и вас минава през човек. Одобрението е собствено докосване на притежателя; одитът е локален запис, написан на всяка стъпка.",
  tr: "Bir ajanla sen arasındaki her adım bir insandan geçer. Onay, sahibin kendi dokunuşudur; denetim ise adım başına yazılan yerel bir satırdır.",
  hu: "Minden lépés az ügynök és közted emberen megy át. Az engedélyezés a tulajdonos saját koppintása; a napló pedig lépésenként írt helyi sor.",
};

const P2_I1: Localized<string> = {
  en: "Each agent is its own process and its own instance; the console binds 127.0.0.1 by default and a bot's control port is never opened outward.",
  ru: "Каждый агент — отдельный процесс и отдельный экземпляр; консоль по умолчанию привязана к 127.0.0.1, а управляющий порт бота никогда не открывается наружу.",
  de: "Jeder Agent ist eigener Prozess und eigene Instanz; die Konsole bindet standardmäßig 127.0.0.1, und ein Bot-Steuerport wird nie nach außen geöffnet.",
  fr: "Chaque agent est son propre processus et sa propre instance ; la console se lie par défaut à 127.0.0.1 et le port de contrôle d’un bot n’est jamais ouvert vers l’extérieur.",
  it: "Ogni agente è un processo e un’istanza a sé stante; la console si lega di default a 127.0.0.1 e la porta di controllo del bot non viene mai esposta.",
  nl: "Elke agent is een eigen proces en een eigen instantie; de console bindt standaard aan 127.0.0.1 en de poort van een bot gaat nooit naar buiten open.",
  cs: "Každý agent je vlastní proces i vlastní instance; konzole se výchoze váže na 127.0.0.1 a řídicí port bota se nikdy neotevře navenek.",
  "zh-Hans": "每个智能体都是独立进程、独立实例；控制台默认只绑 127.0.0.1，bot 的控制端口从不对外打开。",
  "zh-Hant": "每個智能體都是獨立程序、獨立實例；控制台預設只綁 127.0.0.1，bot 的控制埠從不對外開啟。",
  es: "Cada agente es su propio proceso y su propia instancia; la consola se liga por defecto a 127.0.0.1 y el puerto de control del bot nunca se abre hacia fuera.",
  pl: "Każdy agent to osobny proces i osobna instancja; konsola domyślnie wiąże się z 127.0.0.1, a port sterujący bota nigdy nie jest otwierany na zewnątrz.",
  ja: "各エージェントは独立したプロセスかつ独立したインスタンスです。コンソールは既定で 127.0.0.1 のみにバインドされ、ボットの制御ポートが外に開かれることはありません。",
  th: "แต่ละเอเจนต์เป็นโปรเซสและอินสแตนซ์ของตัวเอง คอนโซลผูกกับ 127.0.0.1 เป็นค่าเริ่มต้น และพอร์ตควบคุมของบอทไม่เคยเปิดออกภายนอก",
  fi: "Jokainen agentti on oma prosessinsa ja oma instanssinensa; konsoli sitoutuu oletuksena osoitteeseen 127.0.0.1 eikä botin ohjausporttia avata ulospäin.",
  uk: "Кожен агент — окремий процес і окремий екземпляр; консоль типово прив'язана до 127.0.0.1, а керувальний порт бота ніколи не відкривається назовні.",
  bg: "Всеки агент е отделен процес и отделен екземпляр; конзолата по подразбиране се обвързва с 127.0.0.1, а контролният порт на бота никога не се отваря навън.",
  tr: "Her ajan kendi süreci ve kendi örneğidir; konsol varsayılan olarak 127.0.0.1’e bağlanır ve bir botun denetim portu dışarı açılmaz.",
  hu: "Minden ügynök saját folyamat és saját példány; a konzol alapértelmezetten 127.0.0.1-hez kötődik, és egy bot vezérlő portja sosem nyílik kifelé.",
};

const P2_I2: Localized<string> = {
  en: "Every transition of the negotiation state machine writes an audit row — stage, event, level, timestamp, latency.",
  ru: "Каждый переход машины согласований пишет строку аудита — этап, событие, уровень, метку времени и задержку.",
  de: "Jeder Übergang der Verhandlungs-Zustandsmaschine schreibt eine Audit-Zeile — Stufe, Ereignis, Niveau, Zeitstempel, Verzögerung.",
  fr: "Chaque transition de la machine à états de négociation écrit une ligne d’audit — étape, événement, niveau, horodatage, latence.",
  it: "Ogni transizione della macchina a stati della trattativa scrive una riga di revisione — fase, evento, livello, marca temporale, latenza.",
  nl: "Elke overgang van de onderhandelings-toestandsmachine schrijft een auditrij — fase, gebeurtenis, niveau, tijdstempel, vertraging.",
  cs: "Každý přechod stavového automatu vyjednávání zapíše auditní řádek — fáze, událost, úroveň, časové razítko, latence.",
  "zh-Hans": "协商状态机的每一次迁移都写一条审计记录——阶段、事件、级别、时间戳与耗时。",
  "zh-Hant": "協商狀態機的每一次移轉都寫一條稽核記錄——階段、事件、層級、時間戳與耗時。",
  es: "Cada transición de la máquina de estados de negociación escribe una fila de auditoría — etapa, suceso, nivel, marca de tiempo, latencia.",
  pl: "Każde przejście maszyny stanów negocjacji zapisuje wiersz audytu — etap, zdarzenie, poziom, znacznik czasu, opóźnienie.",
  ja: "ネゴシエーション状態機械のすべての遷移で監査行が 1 行書かれます——段階、イベント、レベル、タイムスタンプ、遅延です。",
  th: "ทุกการเปลี่ยนสถานะของเครื่องเจรจาจะเขียนบันทึกตรวจสอบหนึ่งแถว — ขั้น เหตุการณ์ ระดับ เวลา และหน่วงเวลา",
  fi: "Jokainen neuvottelun tilakoneen siirtymä kirjoittaa tarkistusrivin — vaihe, tapahtuma, taso, aikaleima, viive.",
  uk: "Кожен перехід машини станів узгодження записує рядок аудиту — етап, подію, рівень, мітку часу й затримку.",
  bg: "Всеки преход на машината на състоянието на преговорите записва ред за одит — етап, събитие, ниво, времеви stamp и забавяне.",
  tr: "Pazarlık durum makinesinin her geçişi bir denetim satırı yazar — aşama, olay, düzey, zaman damgası, gecikme.",
  hu: "A tárgyalás állapotgép minden átmenete egy naplósort ír — szakasz, esemény, szint, időbélyeg, késés.",
};

const P2_I3: Localized<string> = {
  en: "A converged proposal writes zero bytes to the calendar: the owner's tap on the confirmation card is what calls approve.",
  ru: "Согласованное предложение не пишет в календарь ни одного байта: запись запускает касание владельца на карточке подтверждения.",
  de: "Ein converged-Vorschlag schreibt null Bytes in den Kalender: erst der Tipp des Besitzers auf die Bestätigungskarte ruft approve auf.",
  fr: "Une proposition convergente écrit zéro octet dans le calendrier : c’est le geste du propriétaire sur la carte de confirmation qui déclenche l’approbation.",
  it: "Una proposta convergente scrive zero byte sul calendario: è il tocco del proprietario sulla carta di conferma a invocare l’approvazione.",
  nl: "Een geconvergeerd voorstel schrijft nul bytes naar de agenda: pas de tik van de eigenaar op de bevestigingskaart roept goedkeuring aan.",
  cs: "Dohodnutý návrh zapíše do kalendáře nula bajtů: approve zavolá až klepnutí vlastníka na potvrzovací kartě.",
  "zh-Hans": "方案收敛时日历一个字节都不写：是主人在确认卡片上点一下，才触发批准。",
  "zh-Hant": "方案收斂時日曆一個位元組都不寫：是主人在確認卡片上點一下，才觸發批准。",
  es: "Una propuesta convergente escribe cero bytes en el calendario: es el toque del dueño en la tarjeta de confirmación lo que invoca la aprobación.",
  pl: "Uzgodniona propozycja zapisuje w kalendarzu zero bajtów: to dotknięcie właściciela na karcie potwierdzenia wywołuje zatwierdzenie.",
  ja: "合意した提案はカレンダーに 1 バイトも書きません。所有者が確認カードをタップして初めて承認が呼ばれます。",
  th: "ข้อเสนอที่ตกลงแล้วจะไม่เขียนลงปฏิทินแม้ไบต์เดียว: การแตะของเจ้าของบนบัตรยืนยันต่างหากที่เรียกการอนุมัติ",
  fi: "Yhdenmukaistettu ehdotus kirjoittaa kalenteriin nolla tavua: vasta omistajan napautus vahvistuskortilla kutsuu hyväksynnän.",
  uk: "Узгоджена пропозиція не записує в календар жодного байта: саме торкання власника на картці підтвердження викликає затвердження.",
  bg: "Съгласувано предложение не записва и байт в календаря: докосването на притежателя върху потвърдителната карта призовава одобрението.",
  tr: "Uzlaşılan öneri takvime sıfır bayt yazar: onayı çağıran, sahibin onay kartonuna dokunuşudur.",
  hu: "Az egyeztetett javaslat nulla bájtot ír a naptárba: a tulajdonos koppintása a megerősítő kártyán hívja elő az engedélyezést.",
};

const P2_I4: Localized<string> = {
  en: "One-tap revocation is shipped: a guest link, a paired peer or a paired Mac device is revoked in one click, and the next check is refused.",
  ru: "Отзыв одним касанием готов: гостевая ссылка, сопряжённый агент или сопряжённый Mac отзываются одним касанием, и следующая проверка отклоняется.",
  de: "Ein-Tipp-Widerruf ist ausgeliefert: Gastlink, gekoppelter Agent oder gekoppeltes Mac-Gerät sind mit einem Tipp widerrufen, die nächste Prüfung schlägt fehl.",
  fr: "La révocation en un geste est livrée : lien invité, agent appairé ou Mac appairé sont révoqués d'un geste, et le contrôle suivant est refusé.",
  it: "La revoca con un tocco è consegnata: link ospite, agent accoppiato o Mac abbinato si revocano con un tocco, e il controllo successivo viene rifiutato.",
  nl: "Één-tik-herroeping is geleverd: een gastlink, gekoppelde agent of gekoppelde Mac is met één tik ingetrokken, en de volgende controle wordt geweigerd.",
  cs: "Zrušení jedním klepnutím je hotové: hostitelský odkaz, spárovaný agent či spárovaný Mac se zruší jedním klepnutím a další kontrola selže.",
  "zh-Hans": "一键撤销已经落地：访客链接、已配对的对端、已配对的 Mac 设备，都是一次点击撤销，下一次校验立即被拒。",
  "zh-Hant": "一鍵撤銷已經落地：訪客連結、已配對的對端、已配對的 Mac 裝置，都是一次點擊撤銷，下一次驗證立即被拒。",
  es: "La revocación con un toque está entregada: un enlace de invitado, un agente emparejado o un Mac emparejado se revocan con un toque, y la siguiente comprobación se rechaza.",
  pl: "Odwołanie jednym dotknięciem jest gotowe: link gościa, sparowany agent albo sparowany Mac są odwoływane jednym dotknięciem, a następna kontrola zostaje odrzucona.",
  ja: "ワンタップ取り消しは実装済み。ゲストリンク、ペアリング済みの相手、ペアリング済みの Mac はいずれもワンタップで取り消され、次の検証はすぐ拒否されます。",
  th: "การเพิกถอนด้วยการแตะครั้งเดียวมีอยู่แล้ว: ลิงก์ผู้มาเยือน คู่ที่จับคู่ หรือ Mac ที่จับคู่ ถูกเพิกถอนด้วยการแตะครั้งเดียว และการตรวจครั้งถัดไปจะถูกปฏิเสธทันที",
  fi: "Yhden napautuksen peruutus on toimitettu: vieraan linkki, paritettu agentti tai paritettu Mac peruuttuu yhdellä napautuksella, ja seuraava tarkistus hylätään.",
  uk: "Відкликання одним торканням готове: посилання гостя, спарений агент чи спарений Mac відкликаються одним торканням, і наступна перевірка відхиляється.",
  bg: "Отмяната с едно докосване е готова: гостова връзка, сдвоен агент или сдвоен Mac се отменят с едно докосване, а следващата проверка се отказва.",
  tr: "Tek dokunuşla geri alma yayınlandı: bir konuk bağlantısı, eşlenmiş bir uç veya eşlenmiş bir Mac tek dokunuşla geri alınır, sonraki doğrulama reddedilir.",
  hu: "Az egy koppintásos visszavonás kész: egy látogatói hivatkozás, egy párosított fél vagy egy párosított Mac egy koppintással visszavonható, a következő ellenőrzés pedig elutasításra kerül.",
};

const P2_I5: Localized<string> = {
  en: "Least-privilege ranges are not: no repository has a machine-enforced range string, and the one label that exists is bound into a token but gates nothing.",
  ru: "Областей минимальных прав нет: ни в одном репозитории нет строки области, проверяемой машиной, а существующая метка лишь вшита в токен и ничего не ограничивает.",
  de: "Mindestrechte-Bereiche nicht: Kein Repository erzwingt eine Bereichskette; das eine vorhandene Etikett sitzt im Token, blockiert aber nichts.",
  fr: "Les portées de moindre privilège non plus : aucun dépôt n’impose de chaîne de portée, et la seule étiquette qui existe est liée au jeton sans rien filtrer.",
  it: "Gli ambiti di minimo privilegio no: nessun repository impone una stringa di ambito, e l’unica etichetta esistente è legata al token ma non regola nulla.",
  nl: "Minimale-rechten-omvang niet: geen enkele opslag dwingt een omvang-tekenreeks af, en het enige label zit in het token maar blokkeert niets.",
  cs: "Oblasti nejmenších práv ne: žádný repozitář nevynucuje řetězec oblasti, a jediný existující štítek je svázán s tokenem, ale nic neomezuje.",
  "zh-Hans": "最小权限范围还没有：四个仓库里没有任何由机器判定的范围串，唯一存在的那个标签只是绑进令牌，不拦任何动作。",
  "zh-Hant": "最小權限範圍還沒有：四個倉庫裡沒有任何由機器判定的範圍字串，唯一存在的那個標籤只是綁進權杖，不阻擋任何動作。",
  es: "Los ámbitos de mínimo privilegio no: ningún repositorio impone una cadena de ámbito, y la única etiqueta que existe va ligada al token pero no regula nada.",
  pl: "Zakresów najmniejszych uprawnień nie: żadne repozytorium nie wymusza łańcucha zakresu, a jedyna istniejąca etykieta jest wpięta w token, ale niczego nie ogranicza.",
  ja: "最小権限の範囲はまだありません。どのリポジトリにも機械が判定する範囲文字列は無く、唯一存在するラベルはトークンに結ばれるだけで、何も遮りません。",
  th: "ขอบเขตสิทธิ์น้อยสุดยังไม่มี: ไม่มีคลังใดบังคับสตริงขอบเขตด้วยเครื่อง และป้ายชื่อที่มีอยู่เพียงผูกเข้ากับโทเคนโดยไม่ควบคุมสิ่งใด",
  fi: "Vähimmäisoikeuksia ei: missään varastossa ei koneen valvomaa oikeusmerkkijonoa, ja ainoa olemassa oleva nimike on sidottu tunnisteeseen mutta ei estä mitään.",
  uk: "Областей найменших прав немає: жоден репозиторій не перевіряє рядок області машиною, а єдина наявна мітка лише вшита в токен і нічого не обмежує.",
  bg: "Областите на най-малките права няма: нито едно хранилище не налага машинно проверяем низ, а единственият етикет е вшит в токена и не спира нищо.",
  tr: "En az yetki kapsamları yok: hiçbir depoda makinenin doğruladığı bir kapsam dizgisi yok, ve var olan tek etiket belirtece bağlanıyor ama hiçbir şeyi engellemiyor.",
  hu: "A legkisebb jogkör-hatókörök még nincsenek meg: egy tároló sem kényszerít ki egy hatókör-karaktérsort, és az egyetlen létező címkét csak a tokenbe köti, de semmit nem szabályoz.",
};

/* ---------------------------------------------------------------- */
/* Pillar 3 — Connection Interoperability                            */
/* ---------------------------------------------------------------- */

const P3_DESC: Localized<string> = {
  en: "The connection is open outward and open in source. The protocol has a specification, the cross-platform envelope agrees byte for byte, and the compute runs on your own machine.",
  ru: "Соединение открыто наружу и открыто в исходниках. У протокола есть спецификация, конверт между платформами совпадает побайтно, а вычисления идут на вашей машине.",
  de: "Die Verbindung ist nach außen offen und offen im Quellcode. Das Protokoll hat eine Spezifikation, der plattformübergreifende Umschlag stimmt byte für byte überein, und die Rechenarbeit läuft auf dem eigenen Rechner.",
  fr: "La connexion est ouverte vers l’extérieur et ouverte dans le source. Le protocole a une spécification, l’enveloppe multiplateforme s’accorde octet pour octet, et le calcul tourne sur votre propre machine.",
  it: "La connessione è aperta verso l’esterno e aperta nel sorgente. Il protocollo ha una specifica, la busta multipiattaforma coincide byte per byte e il calcolo gira sulla tua macchina.",
  nl: "De verbinding is naar buiten open en open in de broncode. Het protocol heeft een specificatie, de platformoverschrijdende envelop komt byte voor byte overeen, en het rekenwerk draait op je eigen machine.",
  cs: "Spojení je navenek otevřené a otevřené ve zdrojovém kódu. Protokol má specifikaci, napříč platformami obálka souhlasí bajt po bajtu a výpočet běží na vašem vlastním stroji.",
  "zh-Hans": "连接对外面开放，源码也开放。协议有规范，跨平台的信封逐字节一致，算力跑在你自己的机器上。",
  "zh-Hant": "連接對外面開放，原始碼也開放。協定有規範，跨平台的信封逐位元組一致，算力跑在你自己的機器上。",
  es: "La conexión está abierta hacia fuera y abierta en el código fuente. El protocolo tiene especificación, el sobre multiplataforma coincide byte a byte y el cómputo corre en tu propia máquina.",
  pl: "Połączenie jest otwarte na zewnątrz i otwarte w kodzie źródłowym. Protokół ma specyfikację, koperta międzyplatformowa zgadza się bajt po bajcie, a obliczenia idą na własnej maszynie.",
  ja: "接続は外に向けても、ソースコードでも開かれています。プロトコルには仕様があり、プラットフォーム横断のエンベロープはバイト単位で一致し、計算はあなた自身の機械で動きます。",
  th: "ช่องเชื่อมต่อเปิดออกสู่ภายนอกและเปิดในซอร์สโค้ด โปรโตคอลมีข้อกำหนด ซองข้ามแพลตฟอร์มตรงกันทีละไบต์ และการคำนวณรันบนเครื่องของคุณเอง",
  fi: "Yhteys on ulospäin avoin ja avoin lähdekoodissa. Protokollalla on määritys, alustojen välinen kirje täsmää tavu tavulta, ja laskenta käy omalla koneellasi.",
  uk: "З'єднання відкрите назовні і відкрите вихідним кодом. У протоколу є специфікація, конверт між платформами збігається байт до байта, а обчислення йдуть на вашій власній машині.",
  bg: "Свързването е отворено навън и отворено в изходния код. Протоколът има спецификация, конвертът между платформите съвпада байт по байт, а изчислението тече на твоя собствена машина.",
  tr: "Bağlantı dışarıya açık, kaynak kodunda da açık. Protokolün bir şartnamesi var, platformlar arası zarf bayt bayt uyuşuyor ve hesaplama kendi makinende çalışıyor.",
  hu: "A kapcsolat kifelé is nyitott, és nyitott a forrásban is. A protokollnak van szabványa, a platformok közdi boríték bájt bájt egyezik, és a számítás a saját gépeden fut.",
};

const P3_I1: Localized<string> = {
  en: "The SMP Agent Protocol is open — a Version 7 specification and its implementation are both in the repository, and it runs as a library inside the app's own process. PAP is still zero.",
  ru: "Протокол SMP Agent открыт — спецификация Version 7 и её реализация лежат в репозитории, и работает он библиотекой внутри самого приложения, а не демоном. Реализаций PAP по-прежнему ноль.",
  de: "Das SMP Agent Protocol ist offen — Version-7-Spezifikation und Umsetzung stehen beide im Repository, und es läuft als Bibliothek im Prozess der App selbst. PAP hat weiterhin null.",
  fr: "Le SMP Agent Protocol est ouvert — spécification Version 7 et implémentation sont dans le dépôt, et il tourne comme bibliothèque dans le processus de l’application, pas en démon. PAP en est toujours à zéro.",
  it: "L’SMP Agent Protocol è aperto — specifica Version 7 e implementazione sono entrambe nel repository, e gira come libreria nel processo dell’app stessa. PAP è ancora a zero.",
  nl: "Het SMP Agent Protocol is open — Version 7-specificatie en uitwerking staan allebei in de repository, en het draait als bibliotheek in het proces van de app zelf, niet als demon. PAP is nog nul.",
  cs: "SMP Agent Protocol je otevřený — specifikace Version 7 i její implementace jsou v repozitáři, a běží jako knihovna v procesu samotné aplikace, ne jako démon. PAP je stále na nule.",
  "zh-Hans": "SMP Agent 协议是开放的——Version 7 规范与它的实现都在仓库里，而且它以库的形式跑在应用自己的进程里，不是守护进程；PAP 目前仍是零实现。",
  "zh-Hant": "SMP Agent 協定是開放的——Version 7 規範與它的實作都在倉庫裡，而且它以函式庫的形式跑在應用自己的行程裡，不是常駐程式；PAP 目前仍是零實作。",
  es: "El SMP Agent Protocol es abierto: la especificación Version 7 y su implementación están en el repositorio, y corre como biblioteca dentro del proceso de la propia app, no como un demonio. PAP sigue en cero.",
  pl: "Protokół SMP Agent jest otwarty — specyfikacja Version 7 i jego implementacja są w repozytorium, a działa jako biblioteka w procesie samej aplikacji, nie jako demon. PAP nadal ma zero.",
  ja: "SMP Agent プロトコルは公開されています——Version 7 の仕様と実装の両方がリポジトリにあり、アプリ自身のプロセスの中でライブラリとして動きます。常駐プロセスではありません。PAP は依然としてゼロです。",
  th: "โปรโตคอล SMP Agent เป็นแบบเปิด — ทั้งข้อกำหนด Version 7 และการใช้งานมันอยู่ในคลังโค้ด และมันรันเป็นไลบรารีภายในโพรเซสของแอปเอง ไม่ใช่โพรเซสพื้นหลัง ส่วน PAP ยังเป็นศูนย์",
  fi: "SMP Agent -protokolla on avoin — Version 7 -määritys ja sen toteutus ovat varastossa, ja se toimii kirjastona sovelluksen omassa prosessissa, ei daemonina. PAP on yhä nolla.",
  uk: "Протокол SMP Agent відкритий — специфікація Version 7 і її реалізація лежать у репозиторії, і працює він бібліотекою всередині самого застосунку, а не демоном. Реалізацій PAP досі нуль.",
  bg: "SMP Agent протоколът е отворен — спецификация Version 7 и нейната реализация са в хранилището, и той работи като библиотека в самия процес на приложението, а не като демон. Реализациите на PAP все още са нула.",
  tr: "SMP Agent Protokolü açık — Version 7 şartnamesi ve uygulaması depoda duruyor, ve uygulama olarak kendi süreç içinde bir kitaplık biçiminde çalışıyor, bir artalan süreci değil. PAP ise hâlâ sıfır.",
  hu: "Az SMP Agent protokoll nyitott — a Version 7 szabvány és a megvalósítása is a tárolóban van, és a könyvtárként fut az alkalmazás saját folyamatában, nem démonként. A PAP még mindig nulla.",
};

const P3_I2: Localized<string> = {
  en: "The iOS and Android offline envelope agree byte for byte: four fields in one key order, plus 28 mesh values copied from one configuration, all proven with vectors minted from the iOS code.",
  ru: "Офлайн-конверты iOS и Android совпадают побайтно: четыре поля в одном порядке ключей плюс 28 сетевых значений, списанных с одной конфигурации, — всё доказано векторами, отчеканенными из кода iOS.",
  de: "Die Offline-Umschläge von iOS und Android stimmen byte für byte überein: vier Felder in einer Schlüsselreihenfolge, dazu 28 Mesh-Werte aus einer Konfiguration, alles bewiesen mit Vektoren, die aus dem iOS-Code geprägt wurden.",
  fr: "Les enveloppes hors ligne d’iOS et d’Android s’accordent octet pour octet : quatre champs dans un ordre de clés, plus 28 valeurs de mesh recopiées d’une même configuration, le tout prouvé par des vecteurs frappés depuis le code iOS.",
  it: "Le buste offline di iOS e Android coincidono byte per byte: quattro campi in un ordine di chiavi, più 28 valori di mesh copiati da una configurazione, il tutto dimostrato con vettori coniati dal codice iOS.",
  nl: "De offline enveloppen van iOS en Android komen byte voor byte overeen: vier velden in één sleutelvolgorde, plus 28 mesh-waarden uit één configuratie, alles bewezen met vectoren die uit de iOS-code zijn geslagen.",
  cs: "Offline obálky iOS a Androidu souhlasí bajt po bajtu: čtyři pole v jednom pořadí klíčů a 28 hodnot přepsaných z jedné konfigurace, vše doložené vektory raženými z kódu iOS.",
  "zh-Hans": "iOS 与 Android 的离线信封逐字节一致：四个字段同一份键序，外加 28 个网格数值照抄同一份配置，全部用从 iOS 代码打出来的测试向量证明。",
  "zh-Hant": "iOS 與 Android 的離線信封逐位元組一致：四個欄位同一份鍵序，外加 28 個網格數值照抄同一份設定，全部用從 iOS 程式碼打出來的測試向量證明。",
  es: "Los sobres sin conexión de iOS y Android coinciden byte a byte: cuatro campos en un orden de claves, más 28 valores de malla copiados de una configuración, todo probado con vectores acuñados del código de iOS.",
  pl: "Koperty offline iOS i Androida zgadzają się bajt po bajcie: cztery pola w jednym porządku kluczy plus 28 wartości mesh przepisanych z jednej konfiguracji, wszystko udowodnione wektorami wybitymi z kodu iOS.",
  ja: "iOS と Android のオフライン・エンベロープはバイト単位で一致します。4 つのフィールドは同じ鍵順、さらに 28 のメッシュ値は同じ設定から写したもので、いずれも iOS のコードから打ち出したテストベクトルで証明されています。",
  th: "ซองออฟไลน์ของ iOS และ Android ตรงกันทีละไบต์: ฟิลด์สี่ตัวในลำดับคีย์เดียวกัน บวกค่าเมช 28 ตัวที่คัดจากคอนฟิกชันเดียวกัน ทั้งหมดพิสูจน์ด้วยเวกเตอร์ที่ตีออกมาจากโค้ด iOS",
  fi: "iOS:n ja Androidin offline-kirjeet täsmäävät tavu tavulta: neljä kenttää samassa avainjärjestyksessä ja 28 mesh-arvoa yhdestä määrityksestä, kaikki todistettu iOS-koodista lyönneillä vektoreilla.",
  uk: "Офлайн-конверти iOS та Android збігаються байт до байта: чотири поля в одному порядку ключів плюс 28 сітьових значень, переписаних з однієї конфігурації, усе доведено векторами, викарбуваними з коду iOS.",
  bg: "Офлайн конвертите на iOS и Android съвпадат байт по байт: четири полета в един ред на ключовете, плюс 28 mesh стойности, преписани от една конфигурация, всичко доказано с вектори, отбити от iOS кода.",
  tr: "iOS ve Android çevrimdışı zarfları bayt bayt uyuşuyor: tek anahtar sıralamasında dört alan, üstüne tek yapılandırmadan kopyalanan 28 mesh değeri, hepsi iOS kodundan basılmış vektörlerle kanıtlandı.",
  hu: "Az iOS és az Android offline borítéka bájt bájt egyezik: négy mező egy kulcs-sorrendben, plusz 28 hálózat-érték egy konfigurációból másolva, mindezt az iOS kódból ütött vektorok bizonyítják.",
};

const P3_I3: Localized<string> = {
  en: "Local compute stays on loopback: files are digested inside hand-listed folders, and inference goes to a model service on 127.0.0.1.",
  ru: "Локальные вычисления не выходят за пределы обратной петли: файлы разбираются внутри вручную перечисленных папок, а инференс идёт к сервису модели на 127.0.0.1.",
  de: "Lokale Rechenarbeit bleibt auf loopback: Dateien werden in von Hand gelisteten Ordnern verdaut, und die Inferenz geht an einen Modelldienst auf 127.0.0.1.",
  fr: "Le calcul local reste sur loopback : les fichiers sont digérés dans des dossiers listés à la main, et l’inférence va à un service de modèle sur 127.0.0.1.",
  it: "Il calcolo locale resta su loopback: i file vengono digeriti in cartelle elencate a mano e l’inferenza va a un servizio modello su 127.0.0.1.",
  nl: "Lokaal rekenwerk blijft op loopback: bestanden worden verteerd in met de hand opgesomde mappen, en de inferentie gaat naar een modeldienst op 127.0.0.1.",
  cs: "Místní výpočet zůstává na loopback: soubory se stráví ve ručně vypsaných složkách a inference míří na modelovou službu na 127.0.0.1.",
  "zh-Hans": "本机算力只走回环：文件在手工列出的目录里就地摘要，推理打给 127.0.0.1 上的模型服务。",
  "zh-Hant": "本機算力只走回環：檔案在手動列出的目錄裡就地摘要，推理打給 127.0.0.1 上的模型服務。",
  es: "El cómputo local se queda en loopback: los archivos se digieren en carpetas listadas a mano y la inferencia va a un servicio de modelo en 127.0.0.1.",
  pl: "Lokalne obliczenia zostają na loopback: pliki są trawione w ręcznie wypisanych katalogach, a wnioskowanie idzie do serwisu modelu na 127.0.0.1.",
  ja: "ローカル計算はループバック内に留まります。ファイルは手で列挙したフォルダ内で要約され、推論は 127.0.0.1 のモデルサービスへ渡ります。",
  th: "การคำนวณในเครื่องจะอยู่ในเครื่องตัวเองเท่านั้น: ไฟล์ถูกย่อยภายในโฟลเดอร์ที่ระบุด้วยมือ และการอนุมานส่งไปยังบริการโมเดลบน 127.0.0.1",
  fi: "Paikallinen laskenta pysyy loopbackissä: tiedostot tiivistetään käsin listatuissa kansioissa, ja päättely menee 127.0.0.1 -mallipalvelulle.",
  uk: "Локальні обчислення не виходять за межі зворотної петлі: файли розбираються в перелічених вручну папках, а інференс іде до сервісу моделі на 127.0.0.1.",
  bg: "Локалното изчисление не излиза извън обратната примка: файловете се смилат в ръчно изброени папки, а изводът отива към моделна услуга на 127.0.0.1.",
  tr: "Yerel hesaplama loopback'te kalır: dosyalar elle listelenen klasörlerde özetlenir, çıkarım ise 127.0.0.1'deki model servisine gider.",
  hu: "A helyi számítás loopbackben marad: a fájlokat kézzel felsorolt mappákban emésztik fel, a következtetés pedig az 127.0.0.1-en lévő modellszervizre megy.",
};

const P3_I4: Localized<string> = {
  en: "Cross-platform mesh is one end short: a desktop client does exist and packages for macOS, but its Bluetooth transport is a stub that reports UNSUPPORTED, and the iOS app target is iPhone-only.",
  ru: "Стыковка сетки между платформами не доделана на один конец: десктопный клиент есть и собирается под macOS, но его Bluetooth-транспорт — заглушка, которая сообщает UNSUPPORTED, а целевое устройство основного приложения iOS — только iPhone.",
  de: "Der plattformübergreifende Mesh hat noch ein offenes Ende: ein Desktop-Client existiert und wird für macOS verpackt, doch sein Bluetooth-Transport ist ein Platzhalter, der UNSUPPORTED meldet, und das Ziel der iOS-App ist nur iPhone.",
  fr: "Le maillage entre plateformes manque d’un bout : un client bureau existe bien et s’empaquette pour macOS, mais son transport Bluetooth est un bouchon qui annonce UNSUPPORTED, et la cible de l’app iOS ne couvre que l’iPhone.",
  it: "La mesh fra piattaforme manca di un capo: un client desktop esiste e viene impacchettato per macOS, ma il suo trasporto Bluetooth è uno stub che segnala UNSUPPORTED, e il target dell’app iOS è solo iPhone.",
  nl: "Platformoverschrijdende mesh mist één kant: er is een desktop-cliënt die voor macOS wordt verpakt, maar zijn Bluetooth-transport is een stub die UNSUPPORTED meldt, en het iOS-app-doel is alleen iPhone.",
  cs: "Víceplatformní mesh má jeden konec nezavřený: desktopový klient existuje a balí se pro macOS, ale jeho Bluetooth transport je záplatka hlásící UNSUPPORTED, a cíl iOS aplikace je jen iPhone.",
  "zh-Hans": "跨端网格还少一端：桌面客户端确实有，也出 macOS 包，但它的蓝牙实现是个桩，直接报 UNSUPPORTED；主 App 的目标设备也只有 iPhone。",
  "zh-Hant": "跨端網格還少一端：桌面客戶端確實有，也出 macOS 套件，但它的藍牙實作是個樁，直接回報 UNSUPPORTED；主 App 的目標裝置也只有 iPhone。",
  es: "La malla entre plataformas tiene un extremo pendiente: sí existe un cliente de escritorio que se empaqueta para macOS, pero su transporte Bluetooth es un stub que informa UNSUPPORTED, y el objetivo de la app de iOS es solo iPhone.",
  pl: "Międzyplatformowa sieć ma jeden koniec wolny: klient desktopowy istnieje i jest pakowany na macOS, ale jego transport Bluetooth to atrapa zgłaszająca UNSUPPORTED, a cel aplikacji iOS to tylko iPhone.",
  ja: "プラットフォーム横断のメッシュはまだ片側が空です。デスクトップクライアントは存在して macOS 用パッケージも出ますが、Bluetooth の実装は UNSUPPORTED を返すスタブで、iOS App の対象機器も iPhone のみです。",
  th: "เน็ตเวิร์กเมชข้ามแพลตฟอร์มยังขาดหนึ่งด้าน: ไคลเอนต์เดสก์ท็อปมีอยู่และแพ็กสำหรับ macOS จริง แต่ตัวส่ง Bluetooth เป็นสตั๊ບที่รายงาน UNSUPPORTED และเป้าหมายอุปกรณ์ของแอป iOS มีแค่ iPhone",
  fi: "Alustojen välinen mesh on toisesta päästä auki: työpöytäasiakas on olemassa ja paketoidaan macOS:lle, mutta sen Bluetooth-kuljetus on tyhjä toteutus, joka ilmoittaa UNSUPPORTED, ja iOS-sovelluksen tavoite on vain iPhone.",
  uk: "Міжплатформна сіть має один відкритий кінець: десктопний застосунок існує і пакується для macOS, але його Bluetooth-транспорт — заглушка, що повідомляє UNSUPPORTED, а ціль основного застосунку iOS — лише iPhone.",
  bg: "Мрежата между платформите има един свободен край: настолният клиент съществува и се пакетира за macOS, но Bluetooth транспортът му е тапа, която съобщава UNSUPPORTED, а целта на iOS-приложението е само iPhone.",
  tr: "Platformlar arası örgünün bir ucu eksik: bir masaüstü istemcisi var ve macOS için paketleniyor, ama Bluetooth taşıyıcısı UNSUPPORTED bildiren bir tıkaç, ve iOS uygulamasının hedefi yalnızca iPhone.",
  hu: "A platformok közti hálózatnak az egyik vége nyitott: létezik asztali ügyfél és készül macOS-csomag is, de a Bluetooth-transportja egy UNSUPPORTED-t jelző dugó, és az iOS alkalmazás célja csak iPhone.",
};

const FOOT: Localized<string> = {
  en: "No line here is a roadmap promise. A sentence that points at code in a repository says Available; one that does not says Evolving. The same measurement backs the three AI layers and the six scenarios above, and every count is re-derivable from the open repositories.",
  ru: "Ни одна строка здесь не обещание из роадмапа. Предложение, указывающее на код в репозитории, помечено «Доступно», остальное — «Развивается». Тот же замер стоит за тремя уровнями ИИ и шестью сценариями выше, и любое число можно заново получить из открытых репозиториев.",
  de: "Keine Zeile hier ist ein Roadmap-Versprechen. Ein Satz, der auf Code in einem Repository zeigt, sagt Verfügbar; einer, der es nicht tut, sagt In Entwicklung. Dieselbe Messung stützt die drei KI-Ebenen und die sechs Szenarien oben, und jede Zahl lässt sich aus den offenen Repositories neu ableiten.",
  fr: "Aucune ligne ici n’est une promesse de feuille de route. Une phrase qui pointe vers du code dans un dépôt dit Disponible ; une autre qui ne le fait pas dit En évolution. La même mesure soutient les trois niveaux d’IA et les six scénarios ci-dessus, et tout comptage se redérive des dépôts ouverts.",
  it: "Nessuna riga qui è una promessa di roadmap. Una frase che indica codice in un repository dice Disponibile; una che non lo fa dice In evoluzione. La stessa misura sostiene i tre livelli di IA e i sei scenari qui sopra, e ogni conteggio si può riottenere dai repository aperti.",
  nl: "Geen regel hier is een roadmap-belofte. Een zin die naar code in een repository wijst zegt Beschikbaar; een zin die dat niet doet zegt In ontwikkeling. Dezelfde meting onderbouwt de drie AI-lagen en de zes scenario's hierboven, en elke telling is opnieuw af te leiden uit de open repositories.",
  cs: "Žádný řádek tady není slib z roadmapu. Věta, která ukazuje na kód v repozitáři, říká K dispozici; která ne, říká Ve vývoji. Stejné měření opírá tři úrovně AI a šest scénářů výše a každý počet je znovu odvoditelný z otevřených repozitářů.",
  "zh-Hans": "这里没有一条是路线图承诺。指得出仓库里代码的句子写「已可用」，指不出的写「演进中」。同一份实测也支撑着上面的 AI 三层与六个场景，而每一个数字都能从开源仓库里重新算出来。",
  "zh-Hant": "這裡沒有一條是路線圖承諾。指得出倉庫裡程式碼的句子寫「已可用」，指不出的寫「演進中」。同一份實測也支撐著上面的 AI 三層與六個場景，而每個數字都能從開源倉庫裡重新算出來。",
  es: "Ninguna línea aquí es promesa de hoja de ruta. Una frase que señala código en un repositorio dice Disponible; una que no lo hace dice En evolución. La misma medición respalda las tres capas de IA y los seis escenarios de arriba, y cada recuento se puede volver a derivar de los repositorios abiertos.",
  pl: "Żaden zapis tutaj nie jest obietnicą z roadmapy. Zdanie wskazujące na kod w repozytorium mówi Dostępne; takie, które nie wskazuje, mówi W rozwoju. Ten sam pomiar wspiera trzy warstwy AI i sześć scenariuszy powyżej, a każde liczenie da się wyprowadzić ponownie z otwartych repozytoriów.",
  ja: "ここにはロードマップ上の約束が 1 つもありません。リポジトリ内のコードを指せる文は「利用可能」と書き、指せないものは「進化中」と書きます。同じ実測が上の AI 三層と六つのシナリオも支えており、すべての数値はオープンなリポジトリから再び導けます。",
  th: "ไม่มีข้อความใดในนี้เป็นคำมั่นบนเส้นทางพัฒนา ประโยคที่ชี้ไปยังโค้ดในคลังจะระบุว่า «ใช้งานได้» ส่วนที่ชี้ไม่ได้อย่าง «กำลังพัฒนา» การวัดชุดเดียวกันนี้ยังรองรับชั้น AI สามชั้นและหกสถานการณ์ข้างบน และทุกตัวเลขคำนวณซ้ำได้จากคลังโค้ดโอเพนซอร์ส",
  fi: "Mikään rivi tässä ei ole tiekartan lupaus. Lause, joka osoittaa koodiin varastossa, sanoo Käytettävissä; lause, joka ei, sanoo Kehitysvaiheessa. Sama mittaus tukee yllä olevia kolmea tekoälykerrosta ja kuutta skendaariota, ja jokainen luku on johdettavissa uudelleen avoimista varastoista.",
  uk: "Жоден рядок тут не є обіцянкою з роадмапа. Речення, що вказує на код у репозиторії, позначене «Доступно», те, що не вказує, — «Розвивається». Те саме вимірювання підтримує три ІІ-рівні й шість сценаріїв вище, і будь-яке число можна повторно дістати з відкритих репозиторіїв.",
  bg: "Нито един ред тук не е обещание от пътна карта. Изречение, което сочи към код в хранилище, казва Налично; което не сочи, казва В развитие. Същото измерване подкрепя и трите ИИ слоя, и шестте сценария отгоре, и всяко число може да се преизведе от отворените хранилища.",
  tr: "Buradaki hiçbir satır bir yol haritası sözü değil. Bir depodaki koda işaret eden cümle Kullanıma hazır der; etmeyen Gelişiyor der. Aynı ölçüm, yukarıdaki üç YZ katmanını ve altı senaryoyu da destekliyor ve her sayım açık depolardan yeniden türetilebilir.",
  hu: "Itt egyetlen sor sem útiterv-ígéret. Egy mondat, amely egy tárolóban lévő kódra mutat, Elérhető feliratot kap; amelyik nem, az Fejlesztés alatt. Ugyanez a mérés támasztja alá a fenti három MI-réteget és hat forgatókönyvet, és minden darabszám újra levezethető a nyílt tárolókból.",
};

type ItemState = "live" | "next";

interface PillarItem {
  readonly text: Localized<string>;
  readonly state: ItemState;
}

interface Pillar {
  readonly name: string;
  readonly tone: Tone;
  readonly icon: "privacy" | "control" | "interop";
  readonly desc: Localized<string>;
  readonly items: readonly PillarItem[];
}

const PILLARS: readonly Pillar[] = [
  {
    name: "Connection Privacy",
    tone: "brand",
    icon: "privacy",
    desc: P1_DESC,
    items: [
      { text: P1_I1, state: "live" },
      { text: P1_I2, state: "live" },
      { text: P1_I3, state: "live" },
      { text: P1_I4, state: "live" },
    ],
  },
  {
    name: "Connection Control",
    tone: "mesh",
    icon: "control",
    desc: P2_DESC,
    items: [
      { text: P2_I1, state: "live" },
      { text: P2_I2, state: "live" },
      { text: P2_I3, state: "live" },
      { text: P2_I4, state: "live" },
      { text: P2_I5, state: "next" },
    ],
  },
  {
    name: "Connection Interoperability",
    tone: "warn",
    icon: "interop",
    desc: P3_DESC,
    items: [
      { text: P3_I1, state: "live" },
      { text: P3_I2, state: "live" },
      { text: P3_I3, state: "live" },
      { text: P3_I4, state: "next" },
    ],
  },
];

export function ConnectionPillars(): ReactElement {
  const sectionLabel = useCopy(TITLE);

  return (
    <section id="pillars" aria-label={sectionLabel} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} />
        <ol className="mt-9 grid grid-cols-[minmax(0,1fr)] items-stretch gap-3 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <PillarCard key={pillar.name} pillar={pillar} index={index} />
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex min-w-0 items-center gap-2">
            <StatusDot tone="mesh" pulse={false} />
            <span className="min-w-0 break-words text-[12px] text-faint">{useCopy(STATUS_AVAILABLE)}</span>
          </span>
          <span className="flex min-w-0 items-center gap-2">
            <StatusDot tone="warn" pulse={false} />
            <span className="min-w-0 break-words text-[12px] text-faint">{useCopy(STATUS_EVOLVING)}</span>
          </span>
        </div>
        <p className="mt-3 min-w-0 break-words text-[12.5px] leading-relaxed text-faint">{useCopy(FOOT)}</p>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }): ReactElement {
  const desc = useCopy(pillar.desc);
  const tone = TONES[pillar.tone];

  return (
    <li className="flex min-w-0">
      <article
        className={`glass glass-hover flex h-full min-w-0 flex-1 flex-col border p-5 ${tone.ring}`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2">
            <span className={`shrink-0 ${tone.text}`}>
              <PillarIcon kind={pillar.icon} />
            </span>
            <h3 className="min-w-0 break-words text-[15.5px] font-semibold tracking-tight text-white">
              {pillar.name}
            </h3>
          </span>
          <span className="chip shrink-0 font-mono text-[10.5px] text-faint">{`0${index + 1}`}</span>
        </div>
        <p className="mt-3 min-w-0 break-words text-[13.5px] leading-relaxed text-mute">{desc}</p>
        <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 border-t border-hair pt-4">
          {pillar.items.map((item, itemIndex) => (
            <PillarRow key={`${pillar.name}-${itemIndex}`} item={item} />
          ))}
        </ul>
      </article>
    </li>
  );
}

/** One line of the pillar, with the dot that says whether a repository backs it. */
function PillarRow({ item }: { item: PillarItem }): ReactElement {
  const text = useCopy(item.text);

  return (
    <li className="flex min-w-0 gap-2">
      <span className="mt-[7px] shrink-0">
        <StatusDot tone={item.state === "live" ? "mesh" : "warn"} pulse={false} />
      </span>
      <p className="min-w-0 break-words text-[12.5px] leading-relaxed text-faint">{text}</p>
    </li>
  );
}

/** Line icons drawn here — no image file, no font, no request. */
function PillarIcon({ kind }: { kind: Pillar["icon"] }): ReactElement {
  const paths: Record<Pillar["icon"], ReactElement> = {
    privacy: (
      <>
        <rect x="4" y="10.5" width="16" height="9.5" rx="2.2" />
        <path d="M8 10.5V7.2a4 4 0 0 1 8 0v3.3" />
      </>
    ),
    control: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M8.4 12.4l2.4 2.4 4.8-5.2" />
      </>
    ),
    interop: (
      <>
        <path d="M9.5 14.5l5-5" />
        <path d="M7.5 11l-1.9 1.9a3.1 3.1 0 0 0 4.4 4.4l1.9-1.9" />
        <path d="M16.5 13l1.9-1.9a3.1 3.1 0 0 0-4.4-4.4L12.1 8.6" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {paths[kind]}
    </svg>
  );
}

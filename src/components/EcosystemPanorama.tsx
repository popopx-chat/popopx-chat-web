"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { SectionHeading, StatusDot } from "@/components/ui";
import {
  ROLE_CLIENT,
  ROLE_NODE,
  ROLE_STUDIO,
  ROLE_SUITE,
  TONES,
  type Tone,
} from "@/components/EcosystemHub";

/**
 * The four-product panorama, directly under `PortalCards` on the homepage.
 *
 * Two rules shape everything below. First, nothing is loaded: the diagram is one
 * inline `<svg>` of lines, with no `<text>`, no image, no icon font and no
 * cross-origin URL, and the colours are the `--brand` / `--mesh` tokens the rest
 * of the portal already uses (`TONES`, `StatusDot`). Second, every line is either
 * in `docs/FACTS.md` §16 or it is drawn dashed and labelled Planned — the solid
 * set is Chat↔Suite (service accounts, channel envelope, H5: §9), Chat↔Studio
 * (bot conversations over the SMP network, while Studio supervises its own
 * `popopx-cli`) and Chat↔Mac Node (the signed pairing offer, the node's local
 * `popopx-chat` daemon and the owner-enabled assistant loop). The dashed set is
 * PAP, which has zero implementations, and a shared cross-product scheduler,
 * which no repository implements; Bot Studio's loopback tool calls into Mac Node
 * are a controlled, approval-gated call, not that bus.
 *
 * The four role lines are imported from `EcosystemHub`, and the four product
 * names from the same locale-free vocabulary `PortalCards` prints, so the three
 * homepage blocks cannot narrate the ecosystem three different ways.
 */

/* The copy block below is fifteen exhaustive literal maps: `Localized<T>` is
   checked slot by slot, and a derived or spread map would let one of the eighteen
   locales silently inherit another one's text. */
const EYEBROW: Localized<string> = {
  en: "Ecosystem panorama",
  ru: "Панорама экосистемы",
  de: "Ökosystem-Panorama",
  fr: "Panorama de l’écosystème",
  it: "Panoramica dell’ecosistema",
  nl: "Panorama van het ecosysteem",
  cs: "Panorama ekosystému",
  "zh-Hans": "生态全景图",
  "zh-Hant": "生態全景圖",
  es: "Panorama del ecosistema",
  pl: "Panorama ekosystemu",
  ja: "エコシステム全景図",
  th: "ภาพรวมระบบนิเวศ",
  fi: "Ekosysteemin kokonaiskuva",
  uk: "Панорама екосистеми",
  bg: "Панорама на екосистемата",
  tr: "Ekosistem panoraması",
  hu: "Ökoszisztéma-panoráma",
};

const TITLE: Localized<string> = {
  en: "How four products form one map — the links that are live, and the ones still evolving",
  ru: "Как четыре продукта складываются в одну карту — линии, что уже связаны, и те, что ещё развиваются",
  de: "Wie vier Produkte eine Karte bilden — die Verbindungen, die live sind, und die, die sich noch entwickeln",
  fr: "Comment quatre produits forment une carte — les liens qui sont en ligne et ceux qui évoluent encore",
  it: "Come quattro prodotti formano una mappa — i collegamenti attivi e quelli che stanno ancora evolvendo",
  nl: "Hoe vier producten één kaart vormen — de verbindingen die live zijn en degenen die nog evolueren",
  cs: "Jak čtyři produkty skládají jednu mapu — spojení, která už fungují, a ta, která se ještě vyvíjejí",
  "zh-Hans": "四端如何连成一张图——已打通的链路，与仍在演进的协同",
  "zh-Hant": "四端如何連成一張圖——已打通的鏈路，與仍在演進的協同",
  es: "Cómo cuatro productos forman un mapa — los enlaces que están en línea y los que aún evolucionan",
  pl: "Jak cztery produkty tworzą jedną mapę — łącza, które już działają, i te, które jeszcze się rozwijają",
  ja: "4 つの製品が 1 枚の図になるまで——すでに結ばれたリンクと、まだ進化中の連携",
  th: "ผลิตภัณฑ์สี่ตัวรวมเป็นแผนภาพเดียว — เส้นที่เชื่อมถึงกันแล้ว กับเส้นที่ยังพัฒนาต่อเนื่อง",
  fi: "Miten neljä tuotetta muodostaa yhden kartan — yhteydet, jotka ovat jo auki, ja yhteydet, jotka vielä kehittyvät",
  uk: "Як чотири продукти складаються в єдину карту — лінії, що вже пов’язані, і ті, що ще розвиваються",
  bg: "Как четирите продукта се подреждат в една карта — линиите, които вече са свързани, и тези, които все още се развиват",
  tr: "Dört ürün tek şemada nasıl buluşuyor — yayındaki bağlantılar ve hâlâ evrilenler",
  hu: "Hogyan válik négy termék egyetlen térképpé — a már működő kapcsolatok és azok, amelyek még fejlődnek",
};

const LEAD: Localized<string> = {
  en: "The client is the entry point. Bot Studio, the service-account suite and Mac Node are each deployed on their own and meet it over the SMP network or a local console bridge, and this map only draws the lines the ledger can open in source. Everything else is dashed.",
  ru: "Клиент — это точка входа. Bot Studio, набор сервисных аккаунтов и Mac Node развёрнуты независимо друг от друга и общаются с ним через сеть SMP или локальный консольный мост; эта карта рисует только те линии, по которым реестр отсылает к исходному коду. Всё остальное — пунктир.",
  de: "Der Client ist der Einstieg. Bot Studio, die Dienstkonten-Suite und Mac Node werden jeweils für sich betrieben und begegnen ihm über das Netzwerk SMP oder eine lokale Konsolenbrücke; gezeichnet werden nur die Linien, deren Quellcode das Ledger nennen kann. Alles andere ist gestrichelt.",
  fr: "Le client est le point d’entrée. Bot Studio, la suite de comptes de service et Mac Node sont déployés chacun de leur côté et le rejoignent par le réseau SMP ou par un pont console local ; cette carte ne trace que les lignes dont le registre peut citer la source. Tout le reste est en pointillés.",
  it: "Il client è il punto d’ingresso. Bot Studio, la suite degli account di servizio e Mac Node sono distribuiti ciascuno per conto proprio e lo incontrano tramite la rete SMP o un ponte console locale; questa mappa disegna soltanto le linee per le quali il registro indica il sorgente. Tutto il resto è tratteggiato.",
  nl: "De client is de ingang. Bot Studio, de dienstaccountsuite en Mac Node worden elk apart uitgezet en ontmoeten de client via het netwerk SMP of een lokale consolebrug; deze kaart tekent alleen de lijnen waarvan het ledger de bron kan aanwijzen. De rest is onderbroken.",
  cs: "Klient je vstupní bod. Bot Studio spolu se sadou servisních účtů a Mac Node jsou nasazeny každý zvlášť a potkávají se s ním přes síť SMP nebo místní konzolový most — tahle mapa kreslí jen čáry, u nichž deník umí otevřít zdroj. Všechno ostatní je čárkované.",
  "zh-Hans": "客户端是中心入口。Bot Studio、服务号套件与 Mac Node 各自独立部署，经 SMP 网络或本机控制台桥与它发生关系。这张图只画台账里指得出源码的线；指不出的，一律画成虚线。",
  "zh-Hant": "客戶端是中心入口。Bot Studio、服務號套件與 Mac Node 各自獨立部署，經 SMP 網路或本機控制台橋與它發生關係。這張圖只畫台帳裡指得出原始碼的線；指不出的，一律畫成虛線。",
  es: "El cliente es el punto de entrada. Bot Studio, la suite de cuentas de servicio y Mac Node se despliegan cada uno por su cuenta y se encuentran con él a través de la red SMP o de un puente de consola local; este mapa solo traza las líneas cuya fuente el registro puede señalar. Todo lo demás es discontinuo.",
  pl: "Klient jest punktem wejścia. Bot Studio wraz z pakietem kont serwisowych i Mac Node są wdrażane osobno i spotykają się z klientem przez sieć SMP albo lokalny pomost konsoli — ta mapa rysuje tylko te linie, dla których rejestr potrafi otworzyć kod źródłowy. Wszystko inne jest przerywane.",
  ja: "入口はクライアント。Bot Studio、サービスアカウント套件、Mac Node はいずれも単独でデプロイされ、SMP ネットワークかローカルのコンソールブリッジを介してクライアントとつながる。この図が引くのは、台帳がソースまで開ける線だけで、それ以外はすべて破線。",
  th: "ไคลเอนต์คือจุดเข้า Bot Studio ชุดบัญชีบริการ และ Mac Node ต่างตั้งแยกกันคนละที่ แล้วมาบรรจบกับไคลเอนต์ผ่านเครือข่าย SMP หรือบริดจ์คอนโซลในเครื่อง แผนภาพนี้ลากเฉพาะเส้นที่บัญชีแหล่งที่มาตามกลับไปถึงซอร์สได้ ที่เหลือเป็นเส้นประทั้งหมด",
  fi: "Asiakas on sisääntulopiste. Bot Studio, palvelutilien paketti ja Mac Node on ylläpidetty kukin erikseen, ja ne kohtaavat asiakkaan joko SMP verkon tai paikallisen konsolisillan kautta — tämä kartta piirtää vain ne viivat, joiden lähdekoodin kirjanpito pystyy avaamaan. Kaikki muu on katkoviivaa.",
  uk: "Клієнт — це точка входу. Bot Studio, набір сервісних акаунтів і Mac Node розгорнуті незалежно один від одного й спілкуються з ним через мережу SMP або локальний консольний міст; ця карта малює лише ті лінії, за якими реєстр відсилає до вихідного коду. Решта — пунктир.",
  bg: "Клиентът е входната точка. Bot Studio, пакетът за сервисни акаунти и Mac Node са разгърнати поотделно и говорят с него чрез мрежата на SMP или през локален конзолен мост; тази карта начертава само линиите, за които регистърът сочи към изходен код. Всичко останало е с прекъсната линия.",
  tr: "Giriş noktası istemci. Bot Studio, hizmet hesabı paketi ve Mac Node ayrı ayrı barındırılır ve istemciyle SMP ağı üzerinden ya da yerel konsol köprüsü üzerinden buluşur; bu şema yalnızca defterin kaynakta açabildiği çizgileri çizer, gerisi kesikli kalır.",
  hu: "Az ügyfél a belépési pont. A Bot Studio, a szolgáltatási fiókok csomagja és a Mac Node külön-külön települnek, és az SMP hálózaton vagy egy helyi konzol-hídon találkoznak vele; ez a térkép csak azokat a vonalakat rajzolja meg, amelyekhez a napló tud forrássort nyitni. Minden más szaggatott.",
};

const FACT_CHAT: Localized<string> = {
  en: "Five tabs — Messages, Contacts, Cabin, Discover, Me — in 18 interface languages, with no phone number, no e-mail and no global user ID.",
  ru: "Пять вкладок — «Сообщения», «Контакты», «Кабина», «Поиск» и «Я» — и 18 языков интерфейса; без номера телефона, без почты и без глобального ID пользователя.",
  de: "Fünf Bereiche — Nachrichten, Kontakte, Kabine, Entdecken, Ich — in 18 Lokalisierungen, ohne Telefonnummer, ohne E-Mail und ohne globale Benutzer-ID.",
  fr: "Cinq onglets — Messages, Contacts, Cabine, Découvrir, Moi — en 18 localizations, sans numéro de téléphone, sans courriel et sans identifiant global.",
  it: "Cinque sezioni — Messaggi, Contatti, Cabina, Scopri, Io — in 18 localizzazioni, senza numero di telefono, senza e-mail e senza ID globale.",
  nl: "Vijf tabbladen — Berichten, Contacten, Cabine, Ontdekken, Ik — in 18 lokalisaties; geen telefoonnummer, geen e-mail en geen gebruikers-ID.",
  cs: "Pět záložek — Zprávy, Kontakty, Kabina, Objevovat, Já — v 18 jazycích rozhraní; bez telefonního čísla, bez e-mailu a bez globálního uživatelského ID.",
  "zh-Hans": "消息、联系人、厢语、发现与我五个栏位，18 种界面语言；不绑定手机号、邮箱，也没有全局用户 ID。",
  "zh-Hant": "訊息、聯絡人、廂語、發現與我五個欄位，18 種介面語言；不綁定手機號、電郵，也沒有全域使用者 ID。",
  es: "Cinco pestañas — Mensajes, Contactos, Cabina, Descubrir, Yo — en 18 localizaciones; sin número de teléfono, sin correo y sin ID global.",
  pl: "Pięć zakładek — Wiadomości, Kontakty, Kabina, Odkrywaj, Ja — w 18 językach interfejsu; bez numeru telefonu, bez poczty i bez globalnego ID użytkownika.",
  ja: "メッセージ、連絡先、キャビン、見つける、自分の 5 つのタブに、18 のインターフェース言語。電話番号もメールもグローバルなユーザー ID も持たない。",
  th: "แถบหลักห้าแถบ — ข้อความ ผู้ติดต่อ ห้องส่วนตัว ค้นหา และฉัน — พร้อมอินเทอร์เฟซ 18 ภาษา ไม่ผูกเบอร์โทร ไม่ผูกอีเมล และไม่มี ID สากล",
  fi: "Viisi välilehteä — Viestit, Yhteystiedot, Hytti, Löydä, Minä — ja 18 kieliversiota; ei puhelinnumeroa, ei sähköpostia eikä globaalia käyttäjätunnistetta.",
  uk: "П’ять вкладок — «Повідомлення», «Контакти», «Кабіна», «Знайти» і «Я» — і 18 мов інтерфейсу; без номера телефону, без пошти й без глобального ID.",
  bg: "Пет раздела — «Съобщения», «Контакти», «Кабина», «Открий» и «Аз» — на 18 езика на интерфейса; без телефонен номер, без имейл и без глобален ID.",
  tr: "Mesajlar, Kişiler, Kabin, Keşfet ve Ben — beş sekme, 18 arayüz dili; telefon numarası yok, e-posta yok, küresel kullanıcı kimliği yok.",
  hu: "Öt fül — Üzenetek, Névjegyek, Kabin, Felfedezés, Én — 18 felületi nyelven; telefonszám, e-mail és globális felhasználói ID nélkül.",
};

const FACT_STUDIO: Localized<string> = {
  en: "One process supervises any number of popopx-cli instances; the console binds 127.0.0.1:8090 by default and the bot control ports 5230-5299 are never published off loopback.",
  ru: "Один процесс управляет любым числом экземпляров popopx-cli; консоль по умолчанию привязана к 127.0.0.1:8090, а порты управления ботами 5230-5299 никогда не публикуются за пределы локальной петли.",
  de: "Ein Prozess beaufsichtigt beliebig viele Instanzen von popopx-cli; die Konsole ist standardmäßig an 127.0.0.1:8090 gebunden, und die Steuerports der Bots, 5230-5299, gehen niemals über Loopback hinaus.",
  fr: "Un seul processus supervise un nombre illimité d’instances de popopx-cli ; la console se lie par défaut à 127.0.0.1:8090 et les ports de contrôle des bots, 5230-5299, ne sortent jamais de l’interface de bouclage.",
  it: "Un solo processo supervisiona qualsiasi numero di istanze di popopx-cli; la console si lega per default a 127.0.0.1:8090 e le porte di controllo dei bot, 5230-5299, non sono mai esposte fuori dal loopback.",
  nl: "Eén proces beheert een willekeurig aantal instanties van popopx-cli; de console bindt standaard aan 127.0.0.1:8090 en de bot-poorten 5230-5299 worden nooit buiten loopback gepubliceerd.",
  cs: "Jeden proces dohlíží na libovolný počet instancí popopx-cli a konzole se ve výchozím nastavení váže jen na 127.0.0.1:8090; řídicí porty botů 5230-5299 se nikdy nedostanou mimo loopback.",
  "zh-Hans": "一个进程托管任意多个 popopx-cli 实例；控制台默认只绑 127.0.0.1:8090，bot 控制端口 5230-5299 从不对外开放。",
  "zh-Hant": "一個程序託管任意多個 popopx-cli 實例；控制台預設僅綁 127.0.0.1:8090，bot 控制埠 5230-5299 從不對外開放。",
  es: "Un solo proceso supervisa cualquier número de instancias de popopx-cli; la consola se liga por defecto a 127.0.0.1:8090 y los puertos de control de bots, 5230-5299, nunca se publican fuera del loopback.",
  pl: "Jeden proces nadzoruje dowolną liczbę instancji popopx-cli, konsola domyślnie wiąże się tylko z adresem 127.0.0.1:8090, a porty sterowania botów 5230-5299 nigdy nie wychodzą poza loopback.",
  ja: "1 つのプロセスが任意数の popopx-cli インスタンスを束ねる。コンソールは既定で 127.0.0.1:8090 にのみバインドされ、ボットの制御ポート 5230-5299 をループバックの外に公開することはない。",
  th: "กระบวนการเดียวดูแล popopx-cli ได้ทุกจำนวน คอนโซลผูกกับ 127.0.0.1:8090 เป็นค่าเริ่มต้น และพอร์ตควบคุมบอต 5230-5299 ไม่เคยถูกเผยแพร่ออกนอกช่วงลูปแบ็ก",
  fi: "Yksi prosessi valvoo mitä tahansa määrää popopx-cli instansseja, konsoli sitoutuu oletuksena vain osoitteeseen 127.0.0.1:8090, eikä bottien ohjausportteja 5230-5299 julkisteta koskaan loopbackin ulkopuolelle.",
  uk: "Один процес супроводжує будь-яку кількість екземплярів popopx-cli; консоль типово прив’язана до 127.0.0.1:8090, а порти керування ботами 5230-5299 ніколи не публікуються за межі локальної зворотної петлі.",
  bg: "Един процес надзирава произволен брой инстанции на popopx-cli; конзолата по подразбиране е обвързана с 127.0.0.1:8090, а портовете за управление на ботове 5230-5299 никога не се публикуват извън локалната обратна петля.",
  tr: "Tek süreç, istediğiniz sayıda popopx-cli örneğini denetler; konsol varsayılan olarak yalnızca 127.0.0.1:8090 adresine bağlanır ve bot denetim portları 5230-5299 loopback dışına asla yayımlanmaz.",
  hu: "Egy folyamat felügyel tetszőleges számú popopx-cli példányra, a konzol alapértelmezés szerint csak a 127.0.0.1:8090 címet köti be, a bot vezérlő portjai 5230-5299 pedig soha nem lépnek ki a loopbackből.",
};

const FACT_SUITE: Localized<string> = {
  en: "A FastAPI gateway, POPX-CP metering and channel envelope encryption with zero-knowledge key rotation, plus nine business plugins that can each be switched off on its own.",
  ru: "Шлюз FastAPI, учёт POPX-CP и шифрование конвертов каналов с ротацией ключей с нулевым знанием, плюс девять бизнес-плагинов, каждый из которых можно отключить отдельно.",
  de: "Ein Gateway mit FastAPI, das Metering über POPX-CP und die Umschlagverschlüsselung der Kanäle mit Zero-Knowledge-Schlüsselrotation, dazu neun Business-Plugins, die sich einzeln abschalten lassen.",
  fr: "Une passerelle avec FastAPI, le comptage POPX-CP et le chiffrement des enveloppes de canal avec rotation de clés à connaissance nulle, plus neuf extensions métier désactivables une par une.",
  it: "Un gateway con FastAPI, la misurazione POPX-CP e la cifratura delle buste dei canali con rotazione delle chiavi a conoscenza zero, più nove plugin di business disattivabili uno per uno.",
  nl: "Een gateway op FastAPI, de metering via POPX-CP en de omslagversleuteling van kanalen met zero-knowledge-sleutelrotatie, plus negen businessplugins die elk apart uit te schakelen zijn.",
  cs: "Brána FastAPI, měření POPX-CP a šifrování obálek kanálů s rotací klíčů s nulovou znalostí, k tomu devět obchodních modulů, z nichž každý lze vypnout zvlášť.",
  "zh-Hans": "FastAPI 网关、POPX-CP 计量、带零知识密钥轮换的频道信封加密，外加九个可单独关掉的业务插件。",
  "zh-Hant": "FastAPI 閘道、POPX-CP 計量、具零知識金鑰輪換的頻道信封加密，另有九個可個別關閉的業務外掛。",
  es: "Una pasarela con FastAPI, la medición POPX-CP y el cifrado de sobres del canal con rotación de claves de conocimiento cero, más nueve complementos de negocio que se pueden apagar uno por uno.",
  pl: "Bramka FastAPI, rozliczenia w POPX-CP i szyfrowanie kopert kanałów z rotacją kluczy o zerowej wiedzy, plus dziewięć wtyczek biznesowych, z których każdą można wyłączyć osobno.",
  ja: "FastAPI ゲートウェイ、POPX-CP による使用量計測、ゼロ知識の鍵ローテーション付きチャンネル封筒の暗号化、それに個別にオフにできる 9 つの業務プラグイン。",
  th: "เกตเวย์ FastAPI การวัดปริมาณการใช้งานด้วย POPX-CP การเข้ารหัสซองของแชนเนลพร้อมการหมุนคีย์แบบศูนย์ความรู้ และปลั๊กอินธุรกิจเก้าตัวที่ปิดแยกทีละตัวได้",
  fi: "Yhdyskäytävänä toimii FastAPI, POPX-CP hoitaa mittauksen ja kanavien kirjekuoret salataan nollatiedon avaimenkierrolla; lisäksi yhdeksän liiketoiminnallista liitännäistä, jotka voi kytkeä irti yksitellen.",
  uk: "Шлюз FastAPI, облік POPX-CP і шифрування конвертів каналів з ротацією ключів із нульовим знанням, плюс дев'ять бізнес-плагінів, кожен з яких можна вимкнути окремо.",
  bg: "Гейтуей на FastAPI, отчитане на POPX-CP и криптиране на пликите на каналите с ротация на ключовете с нулево знание, плюс девет бизнес плъгина, всеки от които може да се изключи поотделно.",
  tr: "FastAPI ağ geçidi, POPX-CP ölçümlemesi, sıfır bilgi anahtar rotasyonlu kanal zarfı şifrelemesi ve her biri tek tek kapatılabilen dokuz iş eklentisi.",
  hu: "Egy FastAPI átjáró, POPX-CP mérés és a csatornaborítékok titkosítása nullaismeretű kulcsrotációval, mellette kilenc üzleti bővítmény, amelyek mindegyike külön kikapcsolható.",
};

const FACT_NODE: Localized<string> = {
  en: "Runs Ollama, the Qwen and Inkling weights and the LTX-2.5 MLX plus FFmpeg pipeline on the machine itself, and its console is bound to loopback by construction.",
  ru: "Запускает на самой машине Ollama, веса Qwen и Inkling и конвейер LTX-2.5 MLX вместе с FFmpeg; его консоль по построению привязана к локальной петле.",
  de: "Auf dem Rechner selbst laufen Ollama, die Modellgewichte von Qwen und Inkling und die Pipeline aus LTX-2.5 MLX und FFmpeg; die Konsole ist konstruktionsbedingt an Loopback gebunden.",
  fr: "Fait tourner Ollama, les poids de Qwen et d’Inkling et le pipeline de LTX-2.5 MLX et FFmpeg sur la machine elle-même, et sa console est liée par construction à l’interface de bouclage.",
  it: "Esegue sulla macchina stessa Ollama, i pesi di Qwen e Inkling e la pipeline con LTX-2.5 MLX e FFmpeg; la sua console è legata al loopback per costruzione.",
  nl: "Draait Ollama, de gewichten van Qwen en Inkling en de pipeline met LTX-2.5 MLX en FFmpeg op de machine zelf, en de console is per constructie aan loopback gebonden.",
  cs: "Přímo na stroji běží Ollama, váhy Qwen a Inkling i řetězec LTX-2.5 MLX s FFmpeg, a konzole je konstrukčně vázána na loopback.",
  "zh-Hans": "在本机跑 Ollama、Qwen 与 Inkling 权重，以及 LTX-2.5 MLX 与 FFmpeg 的多媒体流水线；它的控制台从构造上只绑回环。",
  "zh-Hant": "在本機執行 Ollama、Qwen 與 Inkling 權重，以及 LTX-2.5 MLX 與 FFmpeg 的多媒體管線；它的控制台從構造上僅綁回環。",
  es: "Ejecuta Ollama, los pesos de Qwen e Inkling y el pipeline con LTX-2.5 MLX y FFmpeg en la propia máquina, y su consola está ligada a loopback por construcción.",
  pl: "Na własnym urządzeniu działają Ollama, wagi Qwen i Inkling oraz potok LTX-2.5 MLX razem z FFmpeg, a konsola jest z samej konstrukcji przypisana do loopbacka.",
  ja: "Ollama、Qwen と Inkling の重み、LTX-2.5 MLX と FFmpeg のパイプラインをマシン上でそのまま動かし、コンソールは構造上ループバック以外にバインドされない。",
  th: "รัน Ollama น้ำหนักโมเดลของ Qwen และ Inkling รวมถึงไปป์ไลน์ LTX-2.5 MLX ร่วมกับ FFmpeg บนเครื่องนั้นเอง และคอนโซลก็ผูกกับลูปแบ็กมาตั้งแต่โครงสร้าง",
  fi: "Omalla koneella pyörivät Ollama, Qwen ja Inkling -mallipainot sekä LTX-2.5 MLX ja FFmpeg -putki, ja konsoli on rakenteestaan asti sidottu loopbackiin.",
  uk: "Запускає на самій машині Ollama, ваги Qwen і Inkling та конвеєр LTX-2.5 MLX разом із FFmpeg; консоль за конструкцією прив’язана до локальної зворотної петлі.",
  bg: "Стартира на самата машина Ollama, теглата на Qwen и Inkling и веригата на LTX-2.5 MLX и FFmpeg; конзолата му по построение е обвързана с локалната обратна петля.",
  tr: "Ollama’yı, Qwen ve Inkling ağırlıklarını ve LTX-2.5 MLX ile FFmpeg medya hattını doğrudan o makinede çalıştırır; konsolu yapı gereği loopback’e bağlıdır.",
  hu: "A gépén helyben fut az Ollama, a Qwen és Inkling súlyai, valamint az LTX-2.5 MLX és az FFmpeg közös adatfolyama; a konzol eleve a loopbackre van kötve.",
};

const LINK_CHAT_SUITE: Localized<string> = {
  en: "Live: service-account chats, the two-level menu, the zero-knowledge channel envelope and the H5 authorisation — client and suite speak one wire protocol.",
  ru: "Работает: переписка с сервисными аккаунтами, двухуровневое меню, конверт канала с нулевым знанием и H5 авторизация — клиент и набор говорят на одном протоколе передачи.",
  de: "Online: Unterhaltungen mit Dienstkonten, das Menü mit zwei Ebenen, der Zero-Knowledge-Kanalumschlag und die Autorisierung über H5 — Client und Suite sprechen dasselbe Wire-Protokoll.",
  fr: "En ligne : les sessions des comptes de service, le menu à deux niveaux, l’enveloppe de canal à connaissance nulle et l’autorisation H5 — client et suite parlent le même protocole de ligne.",
  it: "Online: le conversazioni degli account di servizio, il menu a due livelli, la busta del canale a conoscenza zero e l’autorizzazione H5 — client e suite parlano lo stesso protocollo di linea.",
  nl: "Werkt: gesprekken met dienstaccounts, het menu met twee niveaus, de kanaalomslag met zero-knowledge en de autorisatie via H5 — client en suite spreken hetzelfde wire-protocol.",
  cs: "Propojeno: konverzace se servisními účty, dvouúrovňové menu, obálka kanálu s nulovou znalostí a autorizace H5 — klient i sada mluví týmž přenosovým protokolem.",
  "zh-Hans": "已打通：服务号会话、两级菜单、零知识频道信封与 H5 授权——客户端与套件说的是同一套线协议。",
  "zh-Hant": "已打通：服務號會話、兩級選單、零知識頻道信封與 H5 授權——客戶端與套件說的是一套線通訊協定。",
  es: "En línea: las conversaciones de las cuentas de servicio, el menú de dos niveles, el sobre de canal de conocimiento cero y la autorización H5 — el cliente y la suite hablan el mismo protocolo de línea.",
  pl: "Połączone: konwersacje kont serwisowych, dwupoziomowe menu, koperta kanału o zerowej wiedzy i autoryzacja H5 — klient i pakiet mówią tym samym protokołem transmisji.",
  ja: "稼働中：サービスアカウントの会話、2 階層のメニュー、ゼロ知識のチャンネル封筒、H5 認可——クライアントとスイートは同じラインプロトコルで話している。",
  th: "ออนไลน์: แชทบัญชีบริการ เมนูสองระดับ ซองแชนเนลแบบศูนย์ความรู้ และการอนุญาต H5 — ไคลเอนต์กับชุดบริการใช้โปรโตคอลบนสายเดียวกัน",
  fi: "Käytössä: palvelutilien keskustelut, kaksitasoinen valikko, nollatiedon kanavien kirjekuori ja H5 valtuutus — asiakas ja paketti puhuvat täsmälleen samaa siirtoprotokollaa.",
  uk: "Працює: розмови з сервісними акаунтами, дворівневе меню, конверт каналу з нульовим знанням та H5 авторизація — клієнт і набір говорять одним протоколом передачі.",
  bg: "Работи: разговори със сервисните акаунти, менюто на две нива, пликът на канала с нулево знание и H5 удостоверяването — клиентът и пакетът говорят на един протокол за предаване.",
  tr: "Yayında: hizmet hesabı sohbetleri, iki düzeyli menü, sıfır bilgi kanal zarfı ve H5 yetkilendirmesi — istemci ile paket tel üzerinde aynı protokolü konuşuyor.",
  hu: "Élő: szolgáltatási fiókos beszélgetések, a két szintű menü, a nullaismeretű csatornaboríték és a H5 engedélyezés — az ügyfél és a csomag ugyanazt a szállítási protokollt használja.",
};

const LINK_CHAT_STUDIO: Localized<string> = {
  en: "Live: bot conversations ride the SMP network, while Studio drives its own popopx-cli. Neither one embeds the other.",
  ru: "Работает: беседы с ботами идут по сети SMP, а Bot Studio запускает свой собственный popopx-cli. Ни один из них не встраивается в другой.",
  de: "Online: Bot-Unterhaltungen laufen über das Netzwerk SMP, und Studio treibt sein eigenes popopx-cli an. Keine von beiden ist in die andere eingebettet.",
  fr: "En ligne : les conversations de bots passent par le réseau SMP, tandis que Studio pilote son propre popopx-cli. Aucun des deux n’embarque l’autre.",
  it: "Online: le conversazioni dei bot viaggiano sulla rete SMP, mentre Studio pilota il proprio popopx-cli. Nessuno dei due incorpora l’altro.",
  nl: "Werkt: botgesprekken lopen over het netwerk SMP, terwijl Studio zijn eigen popopx-cli aanstuurt. De ene is niet in de andere ingebed.",
  cs: "Propojeno: konverzace botů jedou přes síť SMP, zatímco Bot Studio pohání svůj vlastní popopx-cli. Ani jeden z nich není vnořen do druhého.",
  "zh-Hans": "已打通：bot 会话走 SMP 网络，Studio 驱动的是它自己的 popopx-cli；两边互不内嵌。",
  "zh-Hant": "已打通：bot 會話走 SMP 網路，Studio 驅動的是它自己的 popopx-cli；兩邊互不內嵌。",
  es: "En línea: las conversaciones de bots circulan por la red SMP, mientras Studio maneja su propio popopx-cli. Ninguno de los dos incorpora al otro.",
  pl: "Połączone: rozmowy z botami jadą siecią SMP, a Bot Studio napędza własne popopx-cli. Żadne z nich nie osadza drugiego.",
  ja: "稼働中：ボットの会話は SMP ネットワークを流れ、Studio は自分専用の popopx-cli を動かす。どちらにも相手は組み込まれていない。",
  th: "ออนไลน์: การสนทนาของบอตวิ่งไปบนเครือข่าย SMP ขณะที่ Studio ขับ popopx-cli ของมันเอง ไม่มีฝ่ายใดฝังอีกฝ่ายไว้ข้างใน",
  fi: "Käytössä: bottikeskustelut kulkevat SMP verkon yli, ja Bot Studio ajaa omaa popopx-cli instanssiaan. Kumpikaan ei sisällä toistaan.",
  uk: "Працює: розмови з ботами йдуть мережею SMP, а Bot Studio запускає власний popopx-cli. Жоден із них не вбудовується в інший.",
  bg: "Работи: разговори с ботове минават през мрежата на SMP, а Bot Studio задвижва собствения си popopx-cli. Нито единият не вгражда другия.",
  tr: "Yayında: bot sohbetleri SMP ağı üzerinden gider, Studio ise kendi popopx-cli’ını çalıştırır. Hiçbiri diğerini içinde barındırmıyor.",
  hu: "Élő: a bot beszélgetések az SMP hálózaton mennek, a Bot Studio pedig a saját popopx-cli példányát hajtja. Egyik sem ágyazza be a másikat.",
};

const LINK_CHAT_NODE: Localized<string> = {
  en: "Live: a signed one-time pairing offer, plus the node starting the popopx-chat daemon on its own machine so engine results reach the phone. With the owner's switch on, that link also carries the assistant loop: a briefing at the hour you set, read-only mail triage whose sending waits for confirmation, a home-device sentinel, a signed LAN-only Discover feed that refreshes the phone, and signed update cards.",
  ru: "Работает: подписанное одноразовое приглашение для сопряжения, плюс узел сам запускает на своей машине демон popopx-chat, чтобы результаты движка доходили до телефона. Если владелец включил тумблер, эта же связка несёт цикл помощника: сводку в заданный час, сортировку почты только для чтения с отправкой после подтверждения, сторож домашних устройств, подписанную ленту Discover только в локальной сети, обновляющую телефон, и подписанные карточки обновлений.",
  de: "Online: ein signiertes einmaliges Kopplungsangebot, dazu dass der Knoten den Daemon popopx-chat auf dem eigenen Rechner startet, damit die Ergebnisse der Engine das Handy erreichen. Ist der Schalter des Besitzers an, trägt dieselbe Verbindung auch die Assistentenschleife: ein Briefing zur eingestellten Stunde, schreibgeschützte Mail-Sichtung, deren Versand auf Bestätigung wartet, ein Hausgeräte-Wächter, ein signierter LAN-only-Discover-Feed, der das Handy aktualisiert, und signierte Update-Karten.",
  fr: "En ligne : une offre de couplage signée à usage unique, et le nœud qui démarre le démon popopx-chat sur sa propre machine pour que les résultats du moteur reviennent sur le téléphone. Quand l’interrupteur du propriétaire est activé, ce même lien porte aussi la boucle d’assistant : un briefing à l’heure choisie, un tri des mails en lecture seule dont l’envoi attend confirmation, une sentinelle des appareils domestiques, un flux Discover signé limité au réseau local qui rafraîchit le téléphone, et des cartes de mise à jour signées.",
  it: "Online: un’offerta di abbinamento firmata e monouso, più il nodo che avvia il demone popopx-chat sulla propria macchina perché i risultati del motore arrivino al telefono. Con l’interruttore del proprietario attivo, lo stesso collegamento porta anche il ciclo dell’assistente: un briefing all’ora scelta, triage della posta in sola lettura il cui invio attende conferma, una sentinella dei dispositivi domestici, un feed Discover firmato solo LAN che aggiorna il telefono e carte di aggiornamento firmate.",
  nl: "Werkt: een ondertekende eenmalige koppelingsaanbieding, plus het feit dat de node de daemon popopx-chat op zijn eigen machine start, zodat de resultaten van de engine op de telefoon aankomen. Staat de schakelaar van de eigenaar aan, dan draagt dezelfde verbinding ook de assistentlus: een briefing op het ingestelde uur, alleen-lezen mailtriage waarvan het verzenden op bevestiging wacht, een huisapparaatwacht, een ondertekende LAN-only Discover-feed die de telefoon ververst, en ondertekende updatekaarten.",
  cs: "Propojeno: podepsaná jednorázová párovací nabídka, a k tomu to, že Mac Node na svém počítači nastartuje démona popopx-chat, aby se výsledky enginu dostaly do telefonu. Když vlastník zapne přepínač, stejné spojení nese i smyčku asistenta: briefing ve zvolenou hodinu, třídění pošty jen pro čtení, jehož odeslání čeká na potvrzení, hlídač domácích zařízení, podepsaný feed Discover pouze v LAN, který obnovuje telefon, a podepsané karty aktualizací.",
  "zh-Hans": "已打通：签名的一次性配对凭据，加上节点在本机拉起 popopx-chat 守护进程，把引擎结果送回手机。主人打开开关后，这条链路还承载助理闭环：在你设定的时间送上简报，只读整理邮件、发送等你确认，看守家庭设备，用仅限局域网的签名 Discover 流刷新手机，并送来签名的升级卡片。",
  "zh-Hant": "已打通：簽章的一次性配對憑證，加上節點在本機拉起 popopx-chat 常駐程序，把引擎結果送回手機。主人打開開關後，這條鏈路還承載助理閉環：在你設定的時間送上簡報，唯讀整理郵件、傳送等你確認，看守家庭裝置，用僅限區域網路的簽章 Discover 流刷新手機，並送來簽章的升級卡片。",
  es: "En línea: una oferta de emparejamiento firmada y de un solo uso, y el nodo que arranca el demonio popopx-chat en su propia máquina para que los resultados del motor lleguen al teléfono. Con el interruptor del dueño activado, ese mismo enlace también lleva el bucle de asistente: un informe a la hora elegida, triaje de correo en solo lectura cuyo envío espera confirmación, un centinela de dispositivos del hogar, un feed Discover firmado solo LAN que actualiza el teléfono y tarjetas de actualización firmadas.",
  pl: "Połączone: podpisana jednorazowa propozycja parowania, a do tego Mac Node uruchamia demona popopx-chat na własnym komputerze, więc wyniki silnika trafiają do telefonu. Gdy przełącznik właściciela jest włączony, to samo połączenie niesie też pętlę asystenta: briefing o wybranej godzinie, przegląd poczty tylko do odczytu, którego wysyłka czeka na potwierdzenie, strażnik urządzeń domowych, podpisany kanał Discover tylko w sieci lokalnej, odświeżający telefon, oraz podpisane karty aktualizacji.",
  ja: "稼働中：署名された使い捨てのペアリングオファー、加えてノードが自分のマシン上で popopx-chat デーモンを起動し、エンジンの結果をスマホに届ける。所有者がスイッチを入れれば、同じ回線がアシスタントループも運ぶ。設定した時刻のブリーフィング、送信は確認を待つ読み取り専用のメール整理、家庭内デバイスの見張り、スマホを更新する LAN 限定の署名付き Discover フィード、そして署名付きの更新カードである。",
  th: "ออนไลน์: ข้อมูลจับคู่ใช้แล้วทิ้งที่ลงนาม รวมถึงการที่โหนดเริ่มเดมอน popopx-chat บนเครื่องของมันเอง เพื่อให้ผลจากเอนจินส่งไปถึงมือถือ เมื่อเจ้าของเปิดสวิตช์ เส้นทางเดิมยังพาวงจรผู้ช่วยมาด้วย: สรุปตามเวลาที่ตั้งไว้ คัดกรองอีเมลแบบอ่านอย่างเดียวที่การส่งรอการยืนยัน เฝ้าระวังอุปกรณ์ในบ้าน ฟีด Discover ที่ลงนามและจำกัดใน LAN ซึ่งรีเฟรชมือถือ และการ์ดอัปเดตที่ลงนาม",
  fi: "Käytössä: allekirjoitettu kertaluonteinen paritustarjous, ja lisäksi Mac Node käynnistää omalla koneellaan taustapalvelun popopx-chat, jotta moottorin tulokset päätyvät puhelimelle. Kun omistajan kytkin on päällä, sama yhteys kuljettaa myös avustajasilmukan: briifaus valittuna hetkenä, vain luku -sähköpostin lajittelu, jonka lähetys odottaa vahvistusta, kotilaitteiden vahti, allekirjoitettu vain lähiverkossa toimiva Discover-syöte, joka päivittää puhelinta, ja allekirjoitetut päivityskortit.",
  uk: "Працює: підписане одноразове запрошення для спряження, плюс вузол сам запускає демона popopx-chat на власній машині, щоб результати рушія доходили до телефона. Коли перемикач власника ввімкнено, та сама ланка несе й цикл помічника: брифінг у призначену годину, сортування пошти лише для читання, надсилання якої чекає підтвердження, сторож домашніх пристроїв, підписаний потік Discover лише в локальній мережі, що оновлює телефон, і підписані картки оновлень.",
  bg: "Работи: подписана еднократна покана за сдвояване, плюс възелът самостоятелно стартира демона popopx-chat на собствена машина, за да стигат резултатите от двигателя до телефона. Когато ключът на собственика е включен, същата връзка носи и цикъла на асистента: брифинг в зададения час, сортиране на поща само за четене, чието изпращане чака потвърждение, страж на домашните устройства, подписан Discover поток само в LAN, който обновява телефона, и подписани карти за актуализация.",
  tr: "Yayında: imzalı tek kullanımlık bir eşleştirme daveti, bir de düğümün kendi makinesinde popopx-chat daemon’ını başlatması — böylece motor sonuçları telefona ulaşıyor. Sahibin anahtarı açıkken aynı hat asistan döngüsünü de taşır: seçtiğiniz saatte brifing, gönderimi onay bekleyen salt okunur e-posta taraması, ev cihazı gözcüsü, telefonu yenileyen imzalı ve yalnız LAN’da çalışan Discover akışı ve imzalı güncelleme kartları.",
  hu: "Élő: aláírt, egyszer használatos párosítási ajánlat, plusz hogy a Mac Node a saját gépén elindítja a popopx-chat démont, így a motor eredménye eléri a telefont. Ha a tulajdonos kapcsolója be van kapcsolva, ugyanez a vonal viszi az asszisztens-ciklust is: eligazítás a beállított órában, csak olvasható levélszűrés, amelynek küldése megerősítésre vár, otthoni eszközfigyelő, aláírt, csak helyi hálózaton működő Discover-hírfolyam, amely frissíti a telefont, és aláírt frissítési kártyák.",
};

const LINK_PAP: Localized<string> = {
  en: "Planned: PAP, the POPOPX Agent Protocol, has zero implementations today. The SMP Agent Protocol itself has a version-7 spec and a server-side implementation.",
  ru: "В планах: у PAP, протокола POPOPX Agent, сегодня ноль реализаций. Сам протокол SMP Agent имеет спецификацию Version 7 и серверную реализацию.",
  de: "In Planung: PAP, das POPOPX Agent Protocol, hat heute null Implementierungen. Das SMP Agent Protocol selbst hat eine Spezifikation mit Version 7 und eine serverseitige Implementierung.",
  fr: "En projet : PAP, le POPOPX Agent Protocol, n’a aucune implémentation aujourd’hui. Le SMP Agent Protocol, lui, a une spécification Version 7 et une implémentation côté serveur.",
  it: "In pianificazione: PAP, il POPOPX Agent Protocol, oggi ha zero implementazioni. Il SMP Agent Protocol, in sé, ha una specifica Version 7 e un’implementazione server-side.",
  nl: "Gepland: PAP, het POPOPX Agent Protocol, heeft vandaag nul implementaties. Het SMP Agent Protocol zelf heeft een specificatie met Version 7 en een server-side implementatie.",
  cs: "Plánováno: PAP, tedy POPOPX Agent Protocol, má dnes nula implementací. Samotný protokol SMP Agent má specifikaci Version 7 i serverovou implementaci.",
  "zh-Hans": "生态协同演进中：PAP（POPOPX Agent 协议）目前零实现。SMP Agent 协议本身有 Version 7 规范，也有服务端实现。",
  "zh-Hant": "生態協同演進中：PAP（POPOPX Agent 協定）目前零實作。SMP Agent 協定本身有 Version 7 規範，也有服務端實作。",
  es: "Planificado: PAP, el POPOPX Agent Protocol, tiene cero implementaciones hoy. El propio SMP Agent Protocol tiene una especificación Version 7 y una implementación del lado del servidor.",
  pl: "Planowane: PAP, czyli POPOPX Agent Protocol, ma dziś zero implementacji. Sam protokół SMP Agent ma specyfikację Version 7 i implementację po stronie serwera.",
  ja: "計画中：PAP（POPOPX Agent プロトコル）はいま実装ゼロ。SMP Agent プロトコル自体には Version 7 の仕様とサーバー側実装がある。",
  th: "กำลังวางแผน: PAP (POPOPX Agent Protocol) ยังไม่มีการดำเนินการเลยในปัจจุบัน ส่วนโปรโตคอล SMP Agent มีข้อกำหนด Version 7 และมีการดำเนินการฝั่งเซิร์ฟเวอร์",
  fi: "Suunnitteilla: PAP, eli POPOPX Agent Protocol, on toistaiseksi nolla toteutusta. Itse SMP Agent protokollalla on sen sijaan Version 7 määrittely ja palvelinpuolen toteutus.",
  uk: "У планах: PAP, протокол POPOPX Agent, сьогодні не має жодної реалізації. Сам протокол SMP Agent має специфікацію Version 7 і серверну реалізацію.",
  bg: "Планирано: PAP, протоколът POPOPX Agent, днес има нула реализации. Самият протокол SMP Agent има спецификация Version 7 и сървърна реализация.",
  tr: "Planlamada: PAP, yani POPOPX Ajan Protokolü’nün bugün hiçbir uygulaması yok. SMP Ajan Protokolü’nün kendisinin ise Version 7 spesifikasyonu ve sunucu tarafı uygulaması var.",
  hu: "Tervezésben: a PAP, azaz a POPOPX Agent Protocol ma nulla megvalósításnál tart. Magának az SMP Agent protokollnak van Version 7 specifikációja és szerver oldali megvalósítása.",
};

const LINK_AUTO: Localized<string> = {
  en: "Evolving: no shared scheduler drives these three. Bot Studio reaches Mac Node only through loopback privacy tools, and calendar writes wait for the owner's approval — a controlled call, not a job bus. The one scheduled loop that ships is the phone↔Mac Node line above.",
  ru: "Развивается: общего планировщика, который двигал бы эти три продукта, нет. Bot Studio обращается к Mac Node только через локальные инструменты приватности, а запись в календарь ждёт одобрения владельца — это управляемый вызов, а не шина задач. Единственный работающий цикл по расписанию — линия телефон↔Mac Node выше.",
  de: "In Entwicklung: Kein gemeinsamer Scheduler treibt diese drei. Bot Studio erreicht Mac Node nur über lokale Datenschutz-Werkzeuge, und Kalendereinträge warten auf die Freigabe des Besitzers — ein kontrollierter Aufruf, kein Job-Bus. Die einzige ausgelieferte Schleife nach Zeitplan ist die Handy↔Mac-Node-Linie oben.",
  fr: "En évolution : aucun ordonnanceur commun ne pilote ces trois produits. Bot Studio n’atteint Mac Node que par des outils de confidentialité locaux, et les écritures d’agenda attendent l’approbation du propriétaire — un appel contrôlé, pas un bus de tâches. La seule boucle planifiée livrée est la ligne téléphone↔Mac Node ci-dessus.",
  it: "In evoluzione: nessun pianificatore condiviso guida questi tre. Bot Studio raggiunge Mac Node solo tramite strumenti di privacy locali, e le scritture in calendario attendono l’approvazione del proprietario — una chiamata controllata, non un bus di job. L’unico ciclo pianificato pubblicato è la linea telefono↔Mac Node qui sopra.",
  nl: "In ontwikkeling: geen gedeelde planner stuurt deze drie aan. Bot Studio bereikt Mac Node alleen via lokale privacytools, en agendawijzigingen wachten op de goedkeuring van de eigenaar — een gecontroleerde aanroep, geen jobbus. De enige geplande lus die meegaat is de lijn telefoon↔Mac Node hierboven.",
  cs: "Ve vývoji: žádný společný plánovač tyto tři neřídí. Bot Studio dosáhne na Mac Node jen přes lokální nástroje soukromí a zápisy do kalendáře čekají na schválení vlastníka — řízené volání, ne sběrnice úloh. Jediná dodaná smyčka podle plánu je linka telefon↔Mac Node výše.",
  "zh-Hans": "演进中：没有一个共用调度器来驱动这三者。Bot Studio 只能通过本地回环的隐私工具触达 Mac Node，日历写入要等主人批准——这是受控调用，不是任务总线。唯一按计划运行的闭环，是上面的手机↔Mac Node 那条线。",
  "zh-Hant": "演進中：沒有一個共用排程器來驅動這三者。Bot Studio 只能透過本地回環的隱私工具觸達 Mac Node，行事曆寫入要等主人批准——這是受控呼叫，不是任務匯流排。唯一按計畫運行的閉環，是上面的手機↔Mac Node 那條線。",
  es: "En evolución: ningún planificador compartido mueve a estos tres. Bot Studio solo llega a Mac Node mediante herramientas locales de privacidad, y las escrituras de calendario esperan la aprobación del dueño: una llamada controlada, no un bus de tareas. El único bucle programado que se entrega es la línea teléfono↔Mac Node de arriba.",
  pl: "W rozwoju: żaden wspólny planista nie steruje tymi trzema. Bot Studio dociera do Mac Node tylko przez lokalne narzędzia prywatności, a zapisy do kalendarza czekają na zatwierdzenie właściciela — to kontrolowane wywołanie, nie szyna zadań. Jedyna dostarczona pętla według harmonogramu to linia telefon↔Mac Node powyżej.",
  ja: "進化中：この 3 つを動かす共通スケジューラーはない。Bot Studio が Mac Node に届くのはローカルのプライバシーツール経由だけで、カレンダー書き込みは所有者の承認を待つ。制御された呼び出しであって、ジョブバスではない。唯一出荷されている定時ループは、上のスマホ↔Mac Node の線である。",
  th: "กำลังพัฒนา: ไม่มีตัวจัดกำหนดงานร่วมที่ขับเคลื่อนทั้งสามสิ่งนี้ Bot Studio ไปถึง Mac Node ได้เพียงผ่านเครื่องมือความเป็นส่วนตัวบนลูปแบ็ก และการเขียนปฏิทินรอการอนุมัติของเจ้าของ — เป็นการเรียกที่ควบคุมไว้ ไม่ใช่บัสงาน วงจรตั้งเวลาที่ส่งมอบจริงมีเพียงเส้นมือถือ↔Mac Node ข้างบน",
  fi: "Kehitysvaiheessa: mikään yhteinen ajoitin ei ohjaa näitä kolmea. Bot Studio yltää Mac Nodeen vain paikallisten yksityisyystyökalujen kautta, ja kalenterikirjoitukset odottavat omistajan hyväksyntää — hallittu kutsu, ei työjonoväylä. Ainoa toimitettu ajastettu silmukka on yllä oleva puhelin↔Mac Node -linja.",
  uk: "Розвивається: жоден спільний планувальник не керує цими трьома. Bot Studio дістає до Mac Node лише через локальні інструменти приватності, а записи в календар чекають схвалення власника — це контрольований виклик, а не шина задач. Єдиний поставлений цикл за розкладом — лінія телефон↔Mac Node вище.",
  bg: "В развитие: нито един общ планировчик не движи тези три. Bot Studio достига до Mac Node само чрез локални инструменти за поверителност, а записите в календара чакат одобрението на собственика — контролирано извикване, не шина за задачи. Единственият доставен цикъл по график е линията телефон↔Mac Node по-горе.",
  tr: "Gelişiyor: bu üçünü süren ortak bir zamanlayıcı yok. Bot Studio Mac Node’a yalnızca yerel gizlilik araçlarıyla ulaşır, takvim yazmaları sahibin onayını bekler — bu kontrollü bir çağrı, iş veri yolu değil. Zamanlanmış tek döngü, yukarıdaki telefon↔Mac Node hattıdır.",
  hu: "Fejlesztés alatt: nincs közös ütemező, amely ezt a hármat hajtaná. A Bot Studio csak helyi adatvédelmi eszközökön át éri el a Mac Node-ot, a naptárírások pedig a tulajdonos jóváhagyására várnak — ez ellenőrzött hívás, nem feladatbusz. Az egyetlen kiszállított ütemezett ciklus a fenti telefon↔Mac Node vonal.",
};

const STATUS_LIVE: Localized<string> = {
  en: "Live",
  ru: "Работает",
  de: "Online",
  fr: "En ligne",
  it: "Online",
  nl: "Werkt",
  cs: "Propojeno",
  "zh-Hans": "已打通",
  "zh-Hant": "已打通",
  es: "En línea",
  pl: "Połączone",
  ja: "稼働中",
  th: "ออนไลน์",
  fi: "Käytössä",
  uk: "Працює",
  bg: "Работи",
  tr: "Yayında",
  hu: "Élő",
};

const STATUS_PLANNED: Localized<string> = {
  en: "Planned",
  ru: "В планах",
  de: "In Planung",
  fr: "En projet",
  it: "In pianificazione",
  nl: "Gepland",
  cs: "Plánováno",
  "zh-Hans": "生态协同演进中",
  "zh-Hant": "生態協同演進中",
  es: "Planificado",
  pl: "Planowane",
  ja: "計画中",
  th: "กำลังวางแผน",
  fi: "Suunnitteilla",
  uk: "У планах",
  bg: "Планирано",
  tr: "Planlamada",
  hu: "Tervezésben",
};

const FOOT_NOTE: Localized<string> = {
  en: "The diagram above is a sketch: the lines are decoration, the page loads nothing from these four hosts, and only a click navigates. A solid line corresponds to a source line ledger §16 can open; a dashed line is a plan, not a promise.",
  ru: "Приведённая выше схема условна: линии — это оформление, страница не загружает ничего с этих четырёх сайтов, и только клик выполняет переход. Сплошная линия соответствует строке исходного кода, которую реестр §16 может открыть; пунктирная — это план, а не обещание.",
  de: "Das Diagramm oben ist eine Skizze: die Linien sind Dekoration, die Seite lädt von diesen vier Hosts nichts, und nur ein Klick navigiert. Eine durchgezogene Linie steht für eine Quellcodezeile, die das Ledger §16 öffnen kann; eine gestrichelte ist ein Plan, kein Versprechen.",
  fr: "Le schéma ci-dessus est une esquisse : les traits sont décoratifs, la page ne charge rien chez ces quatre hôtes et seul un clic navigue. Un trait plein correspond à une ligne de source que le registre §16 peut ouvrir ; un trait interrompu est un plan, pas une promesse.",
  it: "Il diagramma qui sopra è uno schizzo: le linee sono decorazione, la pagina non carica nulla da questi quattro host e solo un clic naviga. Una linea piena corrisponde a una riga di sorgente che il registro §16 può aprire; una tratteggiata è un piano, non una promessa.",
  nl: "De tekening hierboven is een schets: de lijnen zijn decoratie, de pagina laadt niets van deze vier hosts en alleen een klik navigeert. Een doorlopende lijn hoort bij een regel broncode die het ledger §16 kan openen; een onderbroken lijn is een plan, geen belofte.",
  cs: "Nahoře je jen nákres: čáry jsou dekorace, tato stránka z těch čtyř webů nenačítá nic a teprve kliknutí je navigace. Plná čára odpovídá řádce zdrojáku, kterou deník §16 umí otevřít; čárkovaná je plán, ne slib.",
  "zh-Hans": "上面的图只是示意：线条是装饰，本页不从这四个站点加载任何资源，只有点击才是导航。实线对应台账 §16 里指得出的源码行，虚线是规划，不是承诺。",
  "zh-Hant": "上面的圖只是示意：線條是裝飾，本頁不從這四個網站載入任何資源，只有點擊才是導覽。實線對應台帳 §16 裡指得出的原始碼行，虛線是規劃，不是承諾。",
  es: "El diagrama de arriba es un boceto: las líneas son decoración, la página no carga nada de estos cuatro hosts y solo un clic navega. Una línea continua corresponde a una línea de código fuente que el registro §16 puede abrir; una discontinua es un plan, no una promesa.",
  pl: "Powyższy rysunek jest tylko szkicem: linie są dekoracją, strona nie pobiera niczego od tych czterech hostów, a dopiero kliknięcie jest nawigacją. Linia ciągła odpowiada linii kodu, którą rejestr §16 potrafi otworzyć; linia przerywana to plan, nie obietnica.",
  ja: "上の図は概略にすぎず、線は装飾。このページは 4 つのホストから何も読み込まず、遷移するのはクリックしたときだけ。実線は台帳の §16 がソースまで開ける 1 行に対応し、破線は計画であって約束ではない。",
  th: "แผนภาพข้างบนเป็นเพียงภาพร่าง เส้นทั้งหมดคือของตกแต่ง เพจนี้ไม่โหลดสิ่งใดจากโฮสต์ทั้งสี่ และการคลิกเท่านั้นที่เป็นการไปหน้าใหม่ เส้นทึบตรงกับบรรทัดซอร์สที่บัญชีแหล่งที่มา §16 เปิดถึงได้ ส่วนเส้นประคือแผน ไม่ใช่คำสัญญา",
  fi: "Yllä oleva kaavio on luonnos: viivat ovat koristetta, sivu ei lataa mitään näiltä neljältä isäntäpalvelimelta, ja vain klikkaus siirtää toiselle sivulle. Yhtenäinen viiva vastaa lähderiviä, jonka kirjanpito §16 pystyy avaamaan; katkoviiva on suunnitelma, ei lupaus.",
  uk: "Наведена вище схема є умовною: лінії — це оформлення, сторінка нічого не завантажує з цих чотирьох сайтів, а перехід виконує лише клік. Суцільна лінія відповідає рядку вихідного коду, який реєстр §16 може відкрити; пунктир — це план, а не обіцянка.",
  bg: "Схемата по-горе е ориентировъчна: линиите са декорация, страницата не зарежда нищо от тези четири сайта и само кликът е навигация. Пълната линия съответства на ред изходен код, който регистърът §16 може да отвори; прекъснатата линия е план, не обещание.",
  tr: "Yukarıdaki şema bir taslaktır: çizgiler dekorasyondur, bu sayfa o dört hosttan hiçbir şey yüklemez ve yönlendirme yalnızca tıklamayla olur. Düz çizgi, defterde §16’nın açabildiği bir kaynak satırına karşılık gelir; kesikli çizgi bir plandır, bir söz değil.",
  hu: "A fenti ábra csak vázlat: a vonalak díszek, az oldal a négy host egyikéről sem tölt be semmit, és csak a kattintás a navigáció. A folytonos vonal egy olyan forrássornak felel meg, amelyet a napló §16 tud nyitni; a szaggatott vonal terv, nem ígéret.",
};

type Node = {
  /** Locale-free, identical to the card `PortalCards` links. */
  name: string;
  tone: Tone;
  role: Localized<string>;
  fact: Localized<string>;
};

const NODES: readonly Node[] = [
  { name: "POPOPX Chat", tone: "brand", role: ROLE_CLIENT, fact: FACT_CHAT },
  { name: "Bot Studio", tone: "mesh", role: ROLE_STUDIO, fact: FACT_STUDIO },
  { name: "Service Suite", tone: "warn", role: ROLE_SUITE, fact: FACT_SUITE },
  { name: "Mac Node", tone: "alert", role: ROLE_NODE, fact: FACT_NODE },
];

type Link = {
  id: string;
  /** Endpoints are locale-free product names, joined for print. */
  path: string;
  label: Localized<string>;
  live: boolean;
};

const LINKS: readonly Link[] = [
  {
    id: "chat-suite",
    path: "POPOPX Chat ↔ Service Suite",
    label: LINK_CHAT_SUITE,
    live: true,
  },
  {
    id: "chat-studio",
    path: "POPOPX Chat ↔ Bot Studio",
    label: LINK_CHAT_STUDIO,
    live: true,
  },
  {
    id: "chat-node",
    path: "POPOPX Chat ↔ Mac Node",
    label: LINK_CHAT_NODE,
    live: true,
  },
  {
    id: "pap",
    path: "POPOPX Chat ↔ PAP",
    label: LINK_PAP,
    live: false,
  },
  {
    id: "auto",
    path: "Bot Studio · Service Suite · Mac Node",
    label: LINK_AUTO,
    live: false,
  },
];

/** The bus mirrors the four equal columns, exactly as `/ecosystem/` does. */
const BUS_SPAN = 720 / NODES.length;
const nodeX = (index: number): number => BUS_SPAN * index + BUS_SPAN / 2;

export function EcosystemPanorama(): ReactElement {
  const sectionLabel = useCopy(TITLE);
  const note = useCopy(FOOT_NOTE);

  return (
    <section id="panorama" aria-label={sectionLabel} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} />
        <ol className="mt-9 grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-4 md:items-stretch">
          {NODES.map((node, index) => (
            <NodeCard key={node.name} node={node} index={index} />
          ))}
        </ol>
        <Bus />
        <Legend />
        <ol className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-2">
          {LINKS.map((link) => (
            <LinkRow key={link.id} link={link} />
          ))}
        </ol>
        <p className="mt-5 min-w-0 break-words text-[12.5px] leading-relaxed text-faint">{note}</p>
      </div>
    </section>
  );
}

function NodeCard({ node, index }: { node: Node; index: number }): ReactElement {
  const role = useCopy(node.role);
  const fact = useCopy(node.fact);
  const live = useCopy(STATUS_LIVE);
  const tone = TONES[node.tone];

  return (
    <li className="flex min-w-0 gap-3 md:block">
      {/* Under `md` the four cards become one downward flow, so the rail is the
          only thing that has to say "these hang off the client". */}
      {index > 0 ? (
        <span
          aria-hidden
          className="w-px shrink-0 self-stretch border-l border-dashed border-hair-strong md:hidden"
        />
      ) : null}
      <article className={`glass glass-hover flex h-full min-w-0 flex-1 flex-col border p-5 ${tone.ring}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={`eyebrow min-w-0 break-words ${tone.text}`}>{role}</p>
            <h3 className="mt-2 min-w-0 break-words text-[16px] font-semibold tracking-tight text-white">
              {node.name}
            </h3>
          </div>
          <span className="chip shrink-0 font-mono text-[10.5px] text-faint">{`0${index + 1}`}</span>
        </div>
        <p className="mt-3 min-w-0 break-words text-[13px] leading-relaxed text-mute">{fact}</p>
        <div className="hairline-top mt-auto flex min-w-0 items-center gap-2 pt-4">
          <StatusDot tone={node.tone} pulse={index === 0} />
          <span className="min-w-0 break-words text-[12px] text-faint">{live}</span>
        </div>
      </article>
    </li>
  );
}

/**
 * Decorative only: `preserveAspectRatio="none"` stretches the lines onto the four
 * columns, and `vectorEffect` keeps every stroke one device pixel, so the shape
 * cannot grow past the container at 300px. No `<text>` is drawn anywhere, which
 * is why the diagram cannot clip a translation.
 */
function Bus(): ReactElement {
  return (
    <div aria-hidden className="mt-3 hidden h-10 w-full md:block">
      <svg viewBox="0 0 720 40" preserveAspectRatio="none" className="h-full w-full" fill="none">
        <path
          d={`M${nodeX(0)} 22H${nodeX(NODES.length - 1)}`}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="text-brand/55"
          stroke="currentColor"
        />
        {NODES.map((node, index) => (
          <path
            key={node.name}
            d={`M${nodeX(index)} 22V10`}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className="text-brand/40"
            stroke="currentColor"
          />
        ))}
        <path
          d={`M${nodeX(1)} 34H${nodeX(NODES.length - 1)}`}
          strokeWidth="1"
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
          className="text-warn/60"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

function Legend(): ReactElement {
  const live = useCopy(STATUS_LIVE);
  const planned = useCopy(STATUS_PLANNED);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-faint">
      <span className="inline-flex min-w-0 items-center gap-2">
        <span aria-hidden className="h-0 w-7 shrink-0 border-t-2 border-brand/70" />
        <span className="min-w-0 break-words">{live}</span>
      </span>
      <span className="inline-flex min-w-0 items-center gap-2">
        <span aria-hidden className="h-0 w-7 shrink-0 border-t border-dashed border-warn/70" />
        <span className="min-w-0 break-words">{planned}</span>
      </span>
    </div>
  );
}

function LinkRow({ link }: { link: Link }): ReactElement {
  const label = useCopy(link.label);
  const status = useCopy(link.live ? STATUS_LIVE : STATUS_PLANNED);

  return (
    <li className="glass-inset flex min-w-0 items-start gap-3 px-4 py-3">
      <span
        aria-hidden
        className={
          link.live
            ? "mt-2 h-0 w-6 shrink-0 border-t-2 border-brand/70"
            : "mt-2 h-0 w-6 shrink-0 border-t border-dashed border-warn/70"
        }
      />
      <div className="min-w-0 flex-1">
        <p className="min-w-0 break-words font-mono text-[12px] leading-relaxed text-mute">
          {link.path}
        </p>
        <p className="mt-1 min-w-0 break-words text-[13px] leading-relaxed text-faint">{label}</p>
      </div>
      <span
        className={`chip shrink-0 ${link.live ? "text-mesh-soft" : "text-warn-soft"}`}
      >
        {status}
      </span>
    </li>
  );
}

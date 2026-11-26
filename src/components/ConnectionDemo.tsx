"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { SectionHeading, StatusDot } from "@/components/ui";
import { TONES, type Tone } from "@/components/EcosystemHub";
import { STATUS_AVAILABLE, STATUS_EVOLVING } from "@/components/AiThreeLayers";

/**
 * The interactive demo of the three strategic scenarios, right after
 * `ConnectionPillars` and before the compact `FeaturesGrid`.
 *
 * Everything in here is deliberately local. There is no `fetch`, no image, no
 * font and no third-party script: the whole panel is four `useState` cells
 * (tab, step, approval, revocation) over three tabs, and clicking a button
 * moves a counter in this page's own React state. That is what makes the disclaimer honest rather than decorative — the
 * visitor is watching a *model* of the flow, so the panel says so in all 18
 * languages before it says anything else.
 *
 * Two honesty rules shape the copy, and both are measurable rather than
 * rhetorical:
 *
 *  1. A step whose mechanism exists in a repository carries a green dot, and a
 *     step whose mechanism does not carries an amber one. Measured 2026-11-26:
 *     the dotted scope string `calendar.availability:read` has zero
 *     implementations — its only occurrence anywhere is the label this panel
 *     prints — while one-tap revocation *does* exist for a guest link, an
 *     unpaired peer and a paired Mac device, only never at per-scope
 *     granularity. So scenarios two and three show amber where the brief
 *     originally promised green.
 *  2. A number is only printed when it is a real wire value. `127.0.0.1:18920`
 *     is the console's loopback port and it is labelled as such: a phone never
 *     dials it. Pairing is a `PPXNODE1` deep link the owner opened once, and the
 *     `0 B` on the last step of scenario one is the literal claim — convergence
 *     touches no calendar until the owner's own tap does.
 *
 * Timestamps are fixed strings. A clock would make the shipped HTML differ from
 * the hydrated one, and this is a static export.
 */

const NOTICE_LABEL: Localized<string> = {
  en: "Notice",
  ru: "Важно",
  de: "Hinweis",
  fr: "À noter",
  it: "Nota",
  nl: "Let op",
  cs: "Poznámka",
  "zh-Hans": "说明",
  "zh-Hant": "說明",
  es: "Aviso",
  pl: "Uwaga",
  ja: "注意事項",
  th: "หมายเหตุ",
  fi: "Huomautus",
  uk: "Примітка",
  bg: "Забележка",
  tr: "Not",
  hu: "Megjegyzés",
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

const PRIMARY = `inline-flex min-w-0 items-center gap-2 rounded-full border border-brand/55 bg-brand/12 px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:border-brand ${FOCUS}`;

const GHOST = `inline-flex min-w-0 items-center gap-2 rounded-full border border-hair bg-white/[0.05] px-3.5 py-2 text-[12.5px] text-mute transition-colors duration-200 hover:border-hair-strong hover:text-white ${FOCUS}`;

/* Every map below is an exhaustive literal — `Localized<T>` is checked slot by slot. */

const EYEBROW: Localized<string> = {
  en: "Three scenarios, played out",
  ru: "Три сценария по шагам",
  de: "Drei Szenarien, Schritt für Schritt",
  fr: "Trois scénarios, joués étape par étape",
  it: "Tre scenari, passo dopo passo",
  nl: "Drie scenario’s, stap voor stap",
  cs: "Tři scénáře, krok za krokem",
  "zh-Hans": "三大场景，逐步演示",
  "zh-Hant": "三大場景，逐步演示",
  es: "Tres escenarios, paso a paso",
  pl: "Trzy scenariusze krok po kroku",
  ja: "三つのシナリオを一歩ずつ",
  th: "สามสถานการณ์ ทีละขั้น",
  fi: "Kolme skendaariota vaihe vaiheelta",
  uk: "Три сценарії крок за кроком",
  bg: "Три сценария стъпка по стъпка",
  tr: "Üç senaryo, adım adım",
  hu: "Három forgatókönyv, lépésről lépésre",
};

const TITLE: Localized<string> = {
  en: "What the connection does when you actually use it",
  ru: "Что соединение делает, когда им действительно пользуются",
  de: "Was die Verbindung tut, wenn man sie wirklich benutzt",
  fr: "Ce que fait la connexion quand on s’en sert vraiment",
  it: "Cosa fa la connessione quando la usi davvero",
  nl: "Wat de verbinding doet als je er echt mee werkt",
  cs: "Co spojení dělá, když se skutečně používá",
  "zh-Hans": "真正用起来的时候，这条连接在做什么",
  "zh-Hant": "真正用起來的時候，這條連接在做什麼",
  es: "Qué hace la conexión cuando de verdad la usas",
  pl: "Co połączenie robi, kiedy naprawdę się go używa",
  ja: "実際に使ったとき、この接続は何をしているのか",
  th: "ช่องเชื่อมต่อทำอะไรเมื่อคุณใช้งานจริง",
  fi: "Mitä yhteys tekee, kun sitä oikeasti käyttää",
  uk: "Що з'єднання робить, коли ним справді користуються",
  bg: "Какво прави свързването, когато наистина го използваш",
  tr: "Bağlantı gerçekten kullanıldığında ne yapıyor",
  hu: "Mit csinál a kapcsolat, amikor tényleg használod",
};

const LEAD: Localized<string> = {
  en: "Not a video. Each line is a state of this page’s own interface — nothing is fetched, nothing is uploaded, and the buttons only ever do what their label says. Scenario one opens by default because it is the one the codebase already runs end to end.",
  ru: "Это не видео. Каждая строка — состояние самого этой страницы: ничего не запрашивается по сети, ничего не загружается, а кнопки делают ровно то, что на них написано. Первый сценарий открыт по умолчанию, потому что он в коде уже работает от начала до конца.",
  de: "Kein Video. Jede Zeile ist ein Zustand dieser Seite selbst — es wird nichts geladen, nichts hochgeladen, und die Knöpfe tun genau das, was auf ihnen steht. Szenario eins ist vorausgewählt, weil der Code es bereits durchläuft.",
  fr: "Pas une vidéo. Chaque ligne est un état de cette page elle-même — rien n’est demandé au réseau, rien n’est téléversé, et les boutons font exactement ce que dit leur libellé. Le scénario un s’ouvre par défaut car le code l’exécute déjà de bout en bout.",
  it: "Non è un video. Ogni riga è uno stato di questa pagina: nulla viene richiesto alla rete, nulla viene caricato, e i pulsanti fanno solo ciò che dice la loro etichetta. Lo scenario uno è aperto di default perché il codice lo esegue già dall’inizio alla fine.",
  nl: "Geen video. Elke regel is een staat van deze pagina zelf — er wordt niets opgevraagd, niets geüpload, en de knoppen doen alleen wat erop staat. Scenario één staat standaard open, omdat de code het al uitvoert.",
  cs: "Žádné video. Každý řádek je stav této stránky — nic se nenačítá ze sítě, nic se nenahrává a tlačítka dělají jen to, co na nich stojí. Scénář jedna je otevřený výchoze, protože ho kód už zvládá od začátku do konce.",
  "zh-Hans": "这不是视频。下面每一行都是这个页面自己的状态——不请求网络，不上传任何东西，按钮也只做到标签上写的那件事。场景一默认排在首屏，因为它是仓库里已经端到端跑通的那一个。",
  "zh-Hant": "這不是影片。下面每一行都是這個頁面自己的狀態——不請求網路，不上傳任何東西，按鈕也只做到標籤上寫的那件事。場景一預設排在首屏，因為它是倉庫裡已經端到端跑通的那一個。",
  es: "No es un video. Cada línea es un estado de esta propia página: no se solicita nada a la red, no se sube nada, y los botones hacen solo lo que dice su etiqueta. El escenario uno abre por defecto porque el código ya lo recorre de principio a fin.",
  pl: "To nie jest film. Każdy wiersz to stan tej strony — nic nie jest pobierane z sieci, nic nie jest wysyłane, a przyciski robią tylko to, co mówi ich etykieta. Scenariusz pierwszy jest otwarty domyślnie, bo kod przeprowadza go od początku do końca.",
  ja: "動画ではありません。下の各行はこのページ自体の状態です。ネットワーク要求もアップロードもなく、ボタンはラベルに書いたことだけを行います。シナリオ 1 が既定で開くのは、リポジトリ側で端から端まで動いているのがそれだからです。",
  th: "นี่ไม่ใช่วิดีโอ ทุกบรรทัดคือสถานะของหน้านี้เอง ไม่มีการดึงข้อมูล ไม่มีการอัปโหลด และปุ่มทำได้แค่ที่ป้ายเขียนไว้ สถานการณ์หนึ่งเปิดเป็นค่าเริ่มต้น เพราะเป็นสิ่งที่คลังโค้ดรันครบวงจรแล้ว",
  fi: "Ei video. Jokainen rivi on tämän sivun oma tila — mitään ei haeta verkosta, mitään ei ladata, ja painikkeet tekevät vain sen, mitä niissä lukee. Skenaario yksi on auki oletuksena, koska koodi suorittaa sen jo päästä päähän.",
  uk: "Це не відео. Кожен рядок — стан цієї сторінки: нічого не завантажується з мережі, нічого не вивантажується, а кнопки роблять рівно те, що на них написано. Перший сценарій відкрито типово, бо код уже проходить його від початку до кінця.",
  bg: "Това не е видео. Всеки ред е състояние на самата страница — нищо не се изтегля от мрежата, нищо не се качва, а бутоните правят само онова, което пише на тях. Първият сценарий е отворен по подразбиране, защото кодът вече го изпълнява от край до край.",
  tr: "Bu bir video değil. Her satır bu sayfanın kendi durumu: ağdan hiçbir şey istenmiyor, hiçbir şey yüklenmiyor ve düğmeler yalnızca etiketlerinde yazanı yapıyor. Birinci senaryo, kod tabanının baştan sona çalıştırdığı senaryo olduğu için varsayılan olarak açık gelir.",
  hu: "Ez nem videó. Minden sor az oldal saját állapota — a hálózatból semmi nem kérődik le, semmi nem töltődik fel, és a gombok csak azt teszik, ami rajtuk áll. Az első forgatókönyv alapértelmezettként nyílik meg, mert a kódbázis azt már végigfuttatja.",
};

/**
 * The brief's mandatory framing, printed above the tabs rather than below the
 * fold, because a visitor who mistakes a model for a measurement is the failure
 * this panel has to prevent.
 */
const DISCLAIMER: Localized<string> = {
  en: "Concept interaction demo (Interactive Concept Demo) — the flow, the roles and the wire values below are a working model of the design, not a screen recording. Initiating, negotiating, approving and auditing are implemented on the stand-in bot and the Mac node today; parts of the automatic orchestration between components are still evolving along the roadmap, and every such step carries an amber dot here.",
  ru: "Интерактивная концепт-демонстрация (Interactive Concept Demo) — приведённые ниже поток, роли и сетевые значения это рабочая модель замысла, а не запись экрана. Запуск, согласование, одобрение и аудит сегодня реализованы на стороне бота-заместителя и Mac-узла; часть полностью автоматической оркестрации между компонентами ещё развивается по дорожной карте, и такие шаги помечены здесь жёлтым.",
  de: "Interaktives Konzept-Demo (Interactive Concept Demo) — Ablauf, Rollen und Leitungs Werte unten sind ein Arbeitsmodell des Entwurfs, keine Bildschirmaufzeichnung. Anstoßen, Verhandeln, Freigeben und Prüfen laufen heute auf der Stand-in-Bot-Seite und dem Mac-Node; Teile der automatischen Orchestrierung zwischen Bausteinen entwickeln sich laut Roadmap noch weiter, und jeder solche Schritt hat hier einen gelben Punkt.",
  fr: "Démo conceptuelle interactive (Interactive Concept Demo) — le flux, les rôles et les valeurs en ligne ci-dessous sont un modèle de travail de la conception, pas un enregistrement d’écran. Lancer, négocier, approuver et auditer sont déjà implémentés du côté du bot suppléant et du nœud Mac ; une part de l’orchestration automatique entre composants évolue encore selon la feuille de route, et chaque étape concernée porte un point jaune ici.",
  it: "Demo concettuale interattiva (Interactive Concept Demo) — il flusso, i ruoli e i valori in linea qui sotto sono un modello di lavoro del progetto, non una registrazione dello schermo. Avvio, trattativa, approvazione e verifica sono oggi implementati dal lato del bot sostituto e del Mac node; parte dell’orchestratura automatica tra componenti è ancora in evoluzione secondo la roadmap, e ogni passaggio del genere ha un punto giallo.",
  nl: "Interactieve conceptdemo (Interactive Concept Demo) — de stroom, de rollen en de lijnwaarden hieronder zijn een werkmodel van het ontwerp, geen schermopname. Starten, onderhandelen, goedkeuren en controleren zijn vandaag aan de stand-in-bot- en de Mac-node-kant geïmplementeerd; delen van de automatische orkestratie tussen componenten ontwikkelen zich volgens de roadmap nog, en elke zulke stap heeft hier een gele stip.",
  cs: "Interaktivní konceptní demo (Interactive Concept Demo) — tok, role a přenosové hodnoty níže jsou pracovní model návrhu, ne nahrávka obrazovky. Spuštění, vyjednávání, schválení a audit jsou dnes implementovány na straně zástupného agenta a Mac uzlu; části automatické orchestry mezi komponentami se podle roadmapu ještě vyvíjejí a každý takový krok má tady žlutý bod.",
  "zh-Hans": "概念交互示意（Interactive Concept Demo）——下面的流程、角色与线上数值是该设计的工作模型，不是屏幕录像。发起、协商、批准与审计今天在替身机器人和 Mac 节点这一侧都有实现；部分跨组件的全自动调度能力正按路线图演进中，这类步骤在这里一律标黄点。",
  "zh-Hant": "概念互動示意（Interactive Concept Demo）——下面的流程、角色與線上數值是該設計的工作模型，不是螢幕錄影。發起、協商、批准與稽核今天在替身機器人與 Mac 節點這一側都有實作；部分跨元件的全自動調度能力正按路線圖演進中，這類步驟在這裡一律標黃點。",
  es: "Demo conceptual interactivo (Interactive Concept Demo) — el flujo, los roles y los valores en la línea de abajo son un modelo de trabajo del diseño, no una grabación de pantalla. Iniciar, negociar, aprobar y auditar están hoy implementados en el bot sustituto y el nodo Mac; parte de la orquestación automática entre componentes aún está evolucionando según la hoja de ruta, y cada uno de esos pasos lleva un punto ámbar.",
  pl: "Interaktywne demo koncepcji (Interactive Concept Demo) — przepływ, role i wartości przesyłane poniżej to roboczy model rozwiązania, a nie nagranie ekranu. Zainicjowanie, negocjowanie, zatwierdzanie i audytowanie są dziś zaimplementowane po stronie bota-zastępcy i węzła Mac; części automatycznej orkiestracji między komponentami wciąż się rozwijają zgodnie z roadmapą, i każdy taki krok ma tu bursztynową kropkę.",
  ja: "概念インタラクション示意（Interactive Concept Demo）——以下の流れ・役割・線上の値は設計の作業モデルであり、画面収録ではありません。発起・交渉・承認・監査はスタンドインのボットと Mac ノード側に実装されています。コンポーネントをまたぐ全自動調達は一部がロードマップに沿って進化中のため、そういうステップはすべて黄点で示しています。",
  th: "ภาพสาธิตเชิงแนวคิดแบบโต้ตอบ (Interactive Concept Demo) — ขั้นตอน บทบาท และค่าบนสายด้านล่างคือแบบจำลองการทำงานของออกแบบนี้ ไม่ใช่การบันทึกหน้าจอ การเริ่ม การเจรจา การอนุมัติ และการตรวจสอบ มีการใช้งานแล้วฝั่งบอตตัวแทนและโหนด Mac ส่วนการจัดทำงานอัตโนมัติข้ามองค์ประกอบบางส่วนของยังกำลังพัฒนาตามเส้นทางพัฒนา และขั้นเหล่านั้นจะมีจุดสีเหลืองกำกับ",
  fi: "Interaktiivinen konseptidemo (Interactive Concept Demo) — alla olevat virta, roolit ja linja-arvot ovat suunnitelman työkuvio eivätkä näytöltä nauhoitettu. Käynnistäminen, neuvottelu, hyväksyminen ja tarkistaminen ovat sijaisbotin ja Mac-solmun puolella jo toteutettuina; osa komponenttien välisestä automaattisesta orkesteroinnista on vielä kehitysvaiheessa tiekartan mukaan, ja jokainen tällainen vaihe on merkitty keltaisella pisteellä.",
  uk: "Інтерактивна концепт-демонстрація (Interactive Concept Demo) — наведений нижче потік, ролі та мережеві значення це робоча модель задуму, а не запис екрана. Запуск, узгодження, схвалення й аудит сьогодні реалізовані на боці бота-замінника та Mac-вузла; частина повністю автоматичної оркестрації між компонентами ще розвивається за дорожньою картою, і такі кроки позначені тут жовтим.",
  bg: "Интерактивно концептно демо (Interactive Concept Demo) — потокът, ролите и стойностите по линиите отдолу са работен модел на замисъла, а не запис на екрана. Стартиране, преговаряне, одобряване и одит днес са реализирани в страната на бота-заместник и Mac възела; част от автоматичната оркестрация между компонентите все още се развива по пътна карта, и всяка такава стъпка тук има жълта точка.",
  tr: "Etkileşimli kavram demosu (Interactive Concept Demo) — aşağıdaki akış, roller ve hat üzerindeki değerler tasarlığın çalışan bir modelidir, ekran kaydı değildir. Başlatma, pazarlık, onay ve denetim bugün vekil bot ve Mac düğümü tarafında uygulanmış durumda; bileşenler arası tam otomatik orkestrasyonun bir bölümü yol haritası boyunca hâlâ gelişiyor ve bu adımların her biri burada sarı nokta taşıyor.",
  hu: "Interaktív koncepció-bemutató (Interactive Concept Demo) — az alábbi flow, szerepek és vonalértékek a terv munkamodellei, nem képernyőfelvétel. Az indítás, a tárgyalás, az engedélyezés és a naplózás ma már megvannak a helyettesítő bot és a Mac csomópont oldalán; az összetevők közti automatikus irányítás egyes részei az útiterv mentén még fejlődik, és minden ilyen lépés borostyánszínű pontot kap.",
};

const S1_TAB: Localized<string> = {
  en: "Scenario 1 · Private scheduling",
  ru: "Сценарий 1 · приватное планирование",
  de: "Szenario 1 · Private Terminfindung",
  fr: "Scénario 1 · Prise de rendez-vous privée",
  it: "Scenario 1 · Pianificazione privata",
  nl: "Scenario 1 · Privé plannen",
  cs: "Scénář 1 · Soukromé plánování",
  "zh-Hans": "场景一 · 隐私日程协商",
  "zh-Hant": "場景一 · 隱私日程協商",
  es: "Escenario 1 · Agenda privada",
  pl: "Scenariusz 1 · Prywatne planowanie",
  ja: "シナリオ 1 · 秘密の日程調整",
  th: "สถานการณ์ 1 · การนัดหมายแบบส่วนตัว",
  fi: "Skenaario 1 · Yksityinen aikataulutus",
  uk: "Сценарій 1 · Приватне планування",
  bg: "Сценарий 1 · Поверително планиране",
  tr: "Senaryo 1 · Gizli takvim ayarı",
  hu: "1. forgatókönyv · Titkos egyeztetés",
};

const S2_TAB: Localized<string> = {
  en: "Scenario 2 · Phone to your own Mac",
  ru: "Сценарий 2 · Телефон к своему Mac",
  de: "Szenario 2 · Telefon zum eigenen Mac",
  fr: "Scénario 2 · Du téléphone à son propre Mac",
  it: "Scenario 2 · Telefono al proprio Mac",
  nl: "Scenario 2 · Telefoon naar je eigen Mac",
  cs: "Scénář 2 · Telefon k vlastnímu Macu",
  "zh-Hans": "场景二 · 手机连自己的 Mac",
  "zh-Hant": "場景二 · 手機連自己的 Mac",
  es: "Escenario 2 · Del teléfono a tu propio Mac",
  pl: "Scenariusz 2 · Telefon do własnego Maka",
  ja: "シナリオ 2 · スマートフォンから自分の Mac へ",
  th: "สถานการณ์ 2 · มือถือเชื่อม Mac ของตนเอง",
  fi: "Skenaario 2 · Puhelin omaan Maciin",
  uk: "Сценарій 2 · Телефон до власного Mac",
  bg: "Сценарий 2 · Телефон към собствения Mac",
  tr: "Senaryo 2 · Telefondan kendi Mac’ine",
  hu: "2. forgatókönyv · Telefon a saját Macjére",
};

const S3_TAB: Localized<string> = {
  en: "Scenario 3 · Agent to agent",
  ru: "Сценарий 3 · Агент к агенту",
  de: "Szenario 3 · Agent zu Agent",
  fr: "Scénario 3 · D’agent à agent",
  it: "Scenario 3 · Da agente ad agente",
  nl: "Scenario 3 · Agent naar agent",
  cs: "Scénář 3 · Agent na agenta",
  "zh-Hans": "场景三 · 智能体与智能体",
  "zh-Hant": "場景三 · 智能體與智能體",
  es: "Escenario 3 · De agente a agente",
  pl: "Scenariusz 3 · Agent do agenta",
  ja: "シナリオ 3 · エージェント同士",
  th: "สถานการณ์ 3 · เอเจนต์หาเอเจนต์",
  fi: "Skenaario 3 · Agentilta agentille",
  uk: "Сценарій 3 · Агент до агента",
  bg: "Сценарий 3 · Агент към агент",
  tr: "Senaryo 3 · Ajandan ajana",
  hu: "3. forgatókönyv · Ügynökről ügynökre",
};

const S1_STEP1: Localized<string> = {
  en: "The initiator taps the request on their own device. The agent picks it up locally — no mailbox is contacted and no calendar service is asked.",
  ru: "Инициатор нажимает запрос на своём устройстве. Агент подхватывает его локально — почта не опрашивается и календарный сервис не вызывается.",
  de: "Der Initiator tippt die Anfrage auf dem eigenen Gerät. Der Agent nimmt sie lokal an — kein Postfach wird angefasst, kein Kalenderdienst gefragt.",
  fr: "L’initiateur touche la demande sur son propre appareil. L’agent la prend en charge localement — aucune boîte mail n’est contactée, aucun service de calendrier interrogé.",
  it: "Chi avvia tocca la richiesta sul proprio dispositivo. L’agente la raccoglie in locale — nessuna casella email viene interpellata, nessun servizio calendario viene chiamato.",
  nl: "De initiator tikt het verzoek op het eigen apparaat. De agent pakt het lokaal op — geen mailbox wordt benaderd, geen kalenderdienst bevraagd.",
  cs: "Initiátor ťukne na požadavek na vlastním zařízení. Agent ho převezme lokálně — žádná poštovní schránka se neoslovuje, žádná kalendářová služba se nepytuje.",
  "zh-Hans": "发起人在自己的设备上点下请求。智能体在本地接手——不联系邮箱，也不调用任何日历服务。",
  "zh-Hant": "發起人在自己的裝置上點下請求。智能體在本機接手——不聯絡電郵，也不呼叫任何日曆服務。",
  es: "Quien inicia toca la solicitud en su propio dispositivo. El agente la toma en local — no se contacta ningún buzón ni se pregunta a ningún servicio de calendario.",
  pl: "Inicjujący dotyka żądania na własnym urządzeniu. Agent przejmuje je lokalnie — żadna skrzynka nie jest zaczepiana, żadna usługa kalendarza nie jest pytana.",
  ja: "発起人が自分のデバイスでリクエストをタップします。エージェントはそれをローカルで受け取り、メールボックスにもカレンダーサービスにも一切問い合わせません。",
  th: "ผู้เริ่มกดคำขอบนอุปกรณ์ของตนเอง เอเจนต์รับเรื่องไว้ในเครื่อง ไม่ติดต่อกล่องจดหมาย และไม่เรียกบริการปฏิทินใด ๆ",
  fi: "Käynnistäjä napautaa pyynnön omalla laitteellaan. Agentti ottaa sen paikallisesti — postilaatikkoon ei kosketa, kalenteripalvelulta ei kysytä.",
  uk: "Ініціатор натискає запит на власному пристрої. Агент підхоплює його локально — поштова скринька не опитується, календар-сервіс не викликається.",
  bg: "Иницииращият докосва заявката на собственото си устройство. Агентът я поема локално — не се докосва пощенска кутия и не се пита календар услуга.",
  tr: "Başlatan, kendi aygıtında isteğe dokunur. Aján isteği yerelde üstlenir — ne bir posta kutusu aranır ne de takvim servisine sorulur.",
  hu: "A kezdeményező a saját eszközén koppint a kérésre. Az ügynök helyben veszi át — postaláda nem érintett, naptárszolgáltatás nem kérdezett.",
};

const S1_STEP2: Localized<string> = {
  en: "Agent A and Agent B exchange masked availability over the encrypted queue only: free and busy windows. Never an event title, never the mailbox behind it.",
  ru: "Агент A и агент B обмениваются маскированной занятостью только по шифрованной очереди: окна «свободно» и «занято». Ни названия событий, ни почты за ними.",
  de: "Agent A und Agent B tauschen maskierte Verfügbarkeit nur über die verschlüsselte Warteschlange: freie und belegte Fenster. Nie ein Titel eines Termins, nie das Postfach dahinter.",
  fr: "L’agent A et l’agent B échangent la disponibilité masquée uniquement via la file chiffrée : créneaux libres et occupés. Jamais un intitulé d’événement, jamais la boîte mail derrière.",
  it: "L’agente A e l’agente B scambiano la disponibilità mascherata solo sulla coda cifrata: finestre libere e occupate. Mai un titolo dell’evento, mai la casella email che ci sta dietro.",
  nl: "Agent A en agent B wisselen gemaskeerde beschikbaarheid alleen via de versleutelde wachtrij: vrije en bezette vensters. Nooit een agendanaam, nooit de mailbox erachter.",
  cs: "Agent A a agent B si vyměňují maskovanou dostupnost pouze po šifrované frontě: okna volna a obsazena. Nikdy název události, nikdy schránka za ním.",
  "zh-Hans": "智能体 A 与智能体 B 只在加密队列上交换脱敏后的忙闲：哪些时段空、哪些时段满。永远不给日程标题，也不给标题背后的邮箱。",
  "zh-Hant": "智能體 A 與智能體 B 只在加密佇列上交換去敏後的忙閒：哪些時段空、哪些時段滿。永遠不給日程標題，也不給標題背後的電郵。",
  es: "El agente A y el agente B intercambian disponibilidad enmascarada solo por la cola cifrada: ventanas libres y ocupadas. Nunca un título del evento, nunca el buzón detrás.",
  pl: "Agent A i agent B wymieniają zamaskowaną dostępność wyłącznie przez zaszyfrowaną kolejkę: okna wolne i zajęte. Nigdy tytuł spotkania, nigdy skrzynka za nim.",
  ja: "エージェント A と B は、暗号化されたキュー越しに伏せられた空き状況だけをやり取りします——空いている時間帯と埋まっている時間帯です。予定のタイトルも、その背後のメールボックスも渡りません。",
  th: "เอเจนต์ A และ B แลกเปลี่ยนเฉพาะเวลาว่างที่ปกปิดแล้ว ผ่านคิวเข้ารหัสเท่านั้น: ช่วงว่างและช่วงไม่ว่าง ไม่ส่งชื่อกิจกรรม และ ไม่ส่งกล่องจดหมายที่อยู่ข้างหลัง",
  fi: "Agentti A ja agentti B vaihtavat peitetyn saatavuuden vain salatun jonon yli: vapaat ja varatut ikkunat. Ei koskaan tapahtuman nimeä, ei koskaan sen takaista postilaatikkoa.",
  uk: "Агент A та агент B обмінюються замаскованим статусом лише шифрованою чергою: вікна «вільно» і «зайнято». Жодної назви події, жодної поштової скриньки за нею.",
  bg: "Агент A и агент B си разменят маскирана заетост само през криптирана опашка: прозорци свободни и заети. Никога заглавието на събитие, никога пощенската кутия зад него.",
  tr: "Ajan A ile Aján B, maskelenmiş uygunluğu yalnızca şifreli kuyruk üzerinden paylaşır: boş ve dolu saat pencereleri. Etkinlik başlığı asla, ardındaki posta kutusu asla.",
  hu: "Az A és B ügynök a titkosított soron keresztül csak álarcos elérhetőséget cserél: szabad és foglalt ablakok. Soha egy program címe, soha a mögötte lévő postaláda.",
};

const S1_STEP3: Localized<string> = {
  en: "Both sides converge on the same two candidates — Tuesday 10:00 and Wednesday 14:30. Convergence itself writes zero bytes into either calendar.",
  ru: "Обе стороны сходятся на тех же двух вариантах — вторник 10:00 и среда 14:30. Само согласование не пишет в календари ни байта.",
  de: "Beide Seiten einigen sich auf dieselben zwei Kandidaten — Dienstag 10:00 und Mittwoch 14:30. Das Einigen selbst schreibt in keinen der Kalender ein Byte.",
  fr: "Les deux côtés convergent vers les mêmes deux créneaux — mardi 10:00 et mercredi 14:30. La convergence n’écrit zéro octet dans aucun des deux calendriers.",
  it: "Entrambe le parti convergono sugli stessi due candidati — martedì 10:00 e mercoledì 14:30. La convergenza in sé non scrive un byte in nessuno dei due calendari.",
  nl: "Beide kanten convergeren naar dezelfde twee kandidaten — dinsdag 10:00 en woensdag 14:30. Het convergeren zelf schrijft nul bytes in welke agenda dan ook.",
  cs: "Obě strany se shodnou na stejných dvou návrzích — úterý 10:00 a středa 14:30. Samotná shoda nezapíše do žádného kalendáře ani bajt.",
  "zh-Hans": "双方收敛到同样的两个候选——周二 10:00 与周三 14:30。收敛这件事本身，两边日历一个字节都不写。",
  "zh-Hant": "雙方收斂到同樣的兩個候選——週二 10:00 與週三 14:30。收斂這件事本身，兩邊日曆一個位元組都不寫。",
  es: "Las dos partes convergen en las mismas dos candidatas — martes 10:00 y miércoles 14:30. La convergencia en sí no escribe ni un byte en ninguno de los dos calendarios.",
  pl: "Obie strony zbiegają się do tych samych dwóch propozycji — wtorek 10:00 i środa 14:34. Samo zbiegnięcie nie zapisuje w żadnym kalendarzu ani bajtu.",
  ja: "両者が同じ二つの候補に収束します——火曜 10:00 と水曜 14:30 です。収束そのものは、どちらのカレンダーにも 1 バイトも書き込みません。",
  th: "ทั้งสองฝ่ายตรงกันที่ตัวเลือกเดียวกันสองเวลา — อังคาร 10:00 และพุธ 14:30 โดยตัวการตรงกันจะไม่เขียนลงปฏิทินฝ่ายใดแม้ไบต์เดียว",
  fi: "Molemmat osapuolet suppenevat samoihin kahteen ehdotukseen — tiistai 10:00 ja keskiviikko 14:30. Itse suppeneminen ei kirjoita kumpaankaan kalenteriin yhtään tavua.",
  uk: "Обидві сторінки сходяться на тих самих двох варіантах — вівторок 10:00 і середа 14:30. Саме узгодження не записує в жоден календар жодного байта.",
  bg: "И двете страни се събират към същите два варианта — вторник 10:00 и сряда 14:30. Самото събиране не записва и байт в нито един от двата календара.",
  tr: "İki taraf da aynı iki adaya kavuşur — salı 10:00 ve çarşamba 14:30. Kavuşmanın kendisi iki takvimden birine sıfır bayt yazar.",
  hu: "Mindkét fél ugyanarra a két jelöltre fut össze — kedd 10:00 és szerda 14:30. Maga az összeérés egyetlen bájtot sem ír egyik naptárba sem.",
};

const S1_STEP4: Localized<string> = {
  en: "Nothing is booked yet. The owner’s tap on the confirmation card is what calls approve, and that tap is the only write in the whole flow.",
  ru: "Пока не забронировано ничего. Подтверждение вызывает касание владельца на карточке, и это касание — единственная запись во потоке.",
  de: "Gebucht ist noch nichts. Erst der Tipp des Besitzers auf die Bestätigungskarte ruft die Freigabe auf, und dieser Tipp ist der einzige Schreibvorgang im ganzen Ablauf.",
  fr: "Rien n’est encore réservé. C’est le geste du propriétaire sur la carte de confirmation qui déclenche l’approbation, et ce geste est la seule écriture de tout le flux.",
  it: "Non è ancora prenotato nulla. È il tocco del proprietario sulla carta di conferma a invocare l’approvazione, e quel tocco è la sola scrittura di tutto il flusso.",
  nl: "Er is nog niets geboekt. Pas de tik van de eigenaar op de bevestigingskaart roept goedkeuring op, en die tik is de enige schrijfactie in de hele stroom.",
  cs: "Zatím není nic zamluveno. Až klepnutí vlastníka na potvrzovací kartě zavolá schválení, a to klepnutí je jediný zápis v celém toku.",
  "zh-Hans": "此刻还没有任何东西被写进日程。主人在确认卡片上的那一次点击才会触发批准，而那一次点击也是整条流程里唯一的写入。",
  "zh-Hant": "此時還沒有任何東西被寫進日程。主人在確認卡片上的那一次點擊才會觸發批准，而那一次點擊也是整條流程裡唯一的寫入。",
  es: "Todavía no hay nada reservado. Es el toque del dueño en la tarjeta de confirmación lo que invoca la aprobación, y ese toque es la única escritura de todo el flujo.",
  pl: "Nic jeszcze nie jest zarezerwowane. Dopiero dotknięcie właściciela na karcie potwierdzenia wywołuje zatwierdzenie i to dotknięcie jest jedynym zapisem w całym przepływie.",
  ja: "まだ何も予定は登録されていません。所有者が確認カードをタップして初めて承認が呼ばれ、そのタップがこの流れ全体の唯一の書き込みになります。",
  th: "ยังไม่มีสิ่งใดถูกจอง การแตะของเจ้าของบนบัตรยืนยันต่างหากที่เรียกการอนุมัติ และการแตะนั้นคือการเขียนเดียวทั้งกระบวน",
  fi: "Mitään ei ole vielä varattu. Vasta omistajan napautus vahvistuskortilla kutsuu hyväksynnän, ja tuo napautus on ainoa kirjoitus koko kulussa.",
  uk: "Поки що нічого не заброньовано. Саме торкання власника на картці підтвердження викликає схвалення, і це торкання — єдиний запис усьому потоці.",
  bg: "Все още нищо не е резервирано. Докосването на притежателя върху потвърдителната карта призовава одобрението, и самото докосване е единственият запис в целия поток.",
  tr: "Henüz hiçbir şey planlanmadı. Onayı çağıran, sahibin onay kartonundaki dokunuşudur ve bu dokunuş tüm akıştaki tek yazmadır.",
  hu: "Még semmi sincs bejegyezve. A tulajdonos koppintása a megerősítő kártyán hívja elő az engedélyezést, és ez a koppintás az egész folyamat egyetlen írása.",
};

const S2_STEP1: Localized<string> = {
  en: "A task typed on the phone goes to the Mac Node paired with that phone. The pairing is a deep link the owner opened once, not an account.",
  ru: "Задача, набранная на телефоне, уходит на Mac Node, сопряжённый с этим телефоном. Сопряжение — это ссылка, которую владелец открыл один раз, а не аккаунт.",
  de: "Eine auf dem Telefon getippte Aufgabe geht an den Mac Node, der mit diesem Telefon gekoppelt ist. Die Kopplung ist ein einmal geöffneter Link, kein Konto.",
  fr: "Une tâche tapée sur le téléphone part vers le Mac Node couplé à ce téléphone. Le couplage est un lien que le propriétaire a ouvert une fois, pas un compte.",
  it: "Un compito scritto sul telefono va al Mac Node abbinato a quel telefono. L’abbinamento è un link aperto una volta dal proprietario, non un account.",
  nl: "Een op de telefoon getikte taak gaat naar de Mac Node die met die telefoon gekoppeld is. De koppeling is een link die de eigenaar één opende, geen account.",
  cs: "Úkol napsaný na telefonu míří na Mac Node spárovaný s tímto telefonem. Párování je odkaz, který vlastník jednou otevřel, ne účet.",
  "zh-Hans": "在手机上写下的任务，发往与这台手机配对的那个 Mac Node。配对是主人当年打开过一次的深链，不是一个账号。",
  "zh-Hant": "在手機上寫下的任務，發往與這支手機配對的那個 Mac Node。配對是主人當年開啟過一次的深鏈，不是一個帳號。",
  es: "Una tarea escrita en el teléfono va al Mac Node emparejado con ese teléfono. El emparejamiento es un enlace que el dueño abrió una vez, no una cuenta.",
  pl: "Zadanie wpisane w telefonie idzie do Mac Node sparowanego z tym telefonem. Sparowanie to łącze, które właściciel otworzył raz, a nie konto.",
  ja: "スマートフォンで入力したタスクは、その電話とペアリング済みの Mac Node へ送られます。ペアリングは所有者が一度開いたディープリンクであって、アカウントではありません。",
  th: "งานที่พิมพ์บนมือถือจะถูกส่งไปยัง Mac Node ที่จับคู่กับมือถือเครื่องนั้น การจับคู่คือลิงก์ลึกที่เจ้าของเปิดเพียงครั้งเดียว ไม่ใช่บัญชี",
  fi: "Puhelimella kirjoitettu tehtävä menee sen puhelimen parin muodostamalle Mac Nodelle. Pariutus on omistajan kerran avaama syvälinkki, ei tili.",
  uk: "Завдання, набране на телефоні, йде до Mac Node, пов'язаного з цим телефоном. Пов'язання — це посилання, яке власник відкрив один раз, а не обліковий запис.",
  bg: "Задача, написана на телефона, отива към Mac Node, сдвоен с този телефон. Сдояването е връзка, която притежателят е отворил веднъж, не профил.",
  tr: "Telefonda yazılan görev, o telefonla eşleşmiş Mac Node’a gider. Eşleştirme, sahibin bir kez açtığı bir derin bağlantıdır, bir hesap değil.",
  hu: "A telefonra gépel feladat a telefonhoz párosított Mac Node-hoz megy. A párosítás egy link, amit a tulaj egyszer megnyitott, nem fiók.",
};

const S2_STEP2: Localized<string> = {
  en: "The task lands in the console, which binds 127.0.0.1 by default: only that Mac can reach it. The phone gets to the machine through the encrypted queue, never through that port.",
  ru: "Задача попадает в консоль, которая по умолчанию привязана к 127.0.0.1: доступ к ней есть только у того Mac. Телефон добирается до машины через шифрованную очередь, а не через тот порт.",
  de: "Die Aufgabe landet in der Konsole, die standardmäßig an 127.0.0.1 gebunden ist: nur dieser Mac kommt an sie. Das Telefon erreicht den Rechner über die verschlüsselte Warteschlange, nie über den Port.",
  fr: "La tâche atterrit dans la console, liée par défaut à 127.0.0.1 : seul ce Mac y accède. Le téléphone arrive à la machine par la file chiffrée, jamais par ce port.",
  it: "Il compito arriva nella console, che di default si lega a 127.0.0.1: solo quel Mac la raggiunge. Il telefono arriva alla macchina tramite la coda cifrata, mai tramite quella porta.",
  nl: "De taak landt in de console, die standaard aan 127.0.0.1 gebonden is: alleen die Mac bereikt hem. De telefoon komt de machine via de versleutelde wachtrij binnen, nooit via die poort.",
  cs: "Úkol dopadne do konzole, která se výchoze váže na 127.0.0.1: jen ten který Mac se k ní dostane. Telefon se k počítači dostane šifrovanou frontou, nikdy tímto portem.",
  "zh-Hans": "任务落到控制台，而控制台默认只绑 127.0.0.1：只有那台 Mac 自己够得着它。手机是通过加密队列摸到这台机器的，从来不走那个端口。",
  "zh-Hant": "任務落到控制台，而控制台預設只綁 127.0.0.1：只有那台 Mac 自己够得著它。手機是透過加密佇列摸到這台機器的，從來不走那個連接埠。",
  es: "La tarea aterriza en la consola, que por defecto se liga a 127.0.0.1: solo ese Mac puede alcanzarla. El teléfono llega a la máquina a través de la cola cifrada, nunca por ese puerto.",
  pl: "Zadanie trafia do konsoli, która domyślnie wiąże się z 127.0.0.1: tylko ten Mac ją osiąga. Telefon dociera do maszyny przez zaszyfrowaną kolejkę, nigdy przez tamten port.",
  ja: "タスクはコンソールに届きますが、コンソールは既定で 127.0.0.1 にのみバインドされているため、アクセスできるのはその Mac だけです。電話は暗号化キューを通じてマシンに到達し、あのポートを使うことはありません。",
  th: "งานจะเข้าไปในคอนโซลซึ่งผูกกับ 127.0.0.1 เป็นค่าเริ่มต้น: มีเพียง Mac เครื่องนั้นที่เข้าถึงได้ มือถือไปถึงเครื่องผ่านคิวเข้ารหัส ไม่เคยผ่านพอร์ตนั้น",
  fi: "Tehtävä päätyy konsoliin, joka sitoutuu oletuksena vain 127.0.0.1:hen: vain tuo Mac yltää siihen. Puhelin tulee koneelle salatun jonon kautta, ei koskaan tuon portin.",
  uk: "Завдання потрапляє в консоль, яка типово прив'язана до 127.0.0.1: доступ до неї має лише той Mac. Телефон дістається до машини шифрованою чергою, а не через той порт.",
  bg: "Задачата попада в конзола, която по подразбиране е обвързана с 127.0.0.1: само онзи Mac я достига. Телефонът стига до машината през криптираната опашка, никога през онзи порт.",
  tr: "Görev, varsayılan olarak 127.0.0.1’e bağlanan konsolün içine düşer: ona yalnızca o Mac erişebilir. Telefon, makineye şifreli kuyruk üzerinden ulaşır, o porttan asla.",
  hu: "A feladat a konzolba érkezik, amely alapértelmezetten a 127.0.0.1-hez kötődik: csak az a Mac éri el. A telefon a titkosított soron át jut a gépre, soha azon a porton.",
};

const S2_STEP3: Localized<string> = {
  en: "The files are digested inside folders the owner listed by hand, and inference goes to a model service on the same machine. The raw file is not what travels.",
  ru: "Файлы разбираются внутри папок, которые владелец перечислил сам, а инференс идёт к сервису модели на той же машине. Путешествует не сам исходный файл.",
  de: "Die Dateien werden in von Hand gelisteten Ordnern verdaut, und die Inferenz geht an einen Modelldienst auf derselben Maschine. Was reist, ist nicht die Rohdatei.",
  fr: "Les fichiers sont digérés dans des dossiers listés à la main par le propriétaire, et l’inférence va à un service de modèle sur la même machine. Ce ne’est pas le fichier brut qui voyage.",
  it: "I file vengono digeriti in cartelle elencate a mano dal proprietario e l’inferenza va a un servizio modello sulla stessa macchina. A viaggiare non è il file grezzo.",
  nl: "De bestanden worden verteerd in mappen die de eigenaar met de hand opsomde, en de inferentie gaat naar een modeldienst op dezelfde machine. Niet het ruwe bestand maakt de reis.",
  cs: "Soubory se stráví ve složkách, které vlastník vypsal ručně, a inference míří na modelovou službu na stejném stroji. Neputuje tedy surový soubor.",
  "zh-Hans": "文件在主人手工列出的目录里被就地摘要，推理打给同一台机器上的模型服务。在路上走的不是原始文件。",
  "zh-Hant": "檔案在主人手動列出的目錄裡被就地摘要，推理打給同一台機器上的模型服務。在路上走的不是一個原始檔案。",
  es: "Los archivos se digieren en carpetas que el dueño listó a mano, y la inferencia va a un servicio de modelo en la misma máquina. Lo que viaja no es el archivo en bruto.",
  pl: "Pliki są trawione w katalogach wypisanych przez właściciela ręcznie, a wnioskowanie idzie do serwisu modelu na tej samej maszynie. Surowy plik nie jest tym, co podróżuje.",
  ja: "ファイルは所有者が手作業で並べたフォルダの中で要約され、推論は同じマシン上にあるモデルサービスへ渡ります。移動するのは生そのものではありません。",
  th: "ไฟล์จะถูกย่อยภายในโฟลเดอร์ที่เจ้าของระบุด้วยมือ และการอนุมานส่งไปยังบริการโมเดลบนเครื่องเดียวกัน สิ่งที่เดินทางไม่ใช่ไฟล์ดิบ",
  fi: "Tiedostot tiivistetään omistajan käsin listaamissa kansioissa, ja päättely menee saman koneen mallipalvelulle. Matkustava ei ole alkuperäinen tiedosto.",
  uk: "Файли розбираються в папках, які власник перелічив вручну, а інференс іде до сервісу моделі на тій самій машині. Мандрує не сирий файл.",
  bg: "Файловете се смилат в папки, изброени ръчно от притежателя, а изводът отива към моделна услуга на същата машина. Пътуващото не е суровият файл.",
  tr: "Dosyalar, sahibin elle listelediği klasörlerde özetlenir; çıkarım ise aynı makinedeki bir model servisine gider. Yola çıkan ham dosyanın kendisi değildir.",
  hu: "A fájlokat a tulajdonos által kézzel felsorolt mappákban emésztik fel, a következtetés pedig ugyanazon a gépen lévő modellszervizre megy. Nem a nyers fájl utazik.",
};

const S2_STEP4: Localized<string> = {
  en: "What comes back to the phone is a summary card — the path, the size, the headings and the bullets — and the document itself stays at home.",
  ru: "Обратно на телефон приходит карточка-резюме: путь, размер, заголовки и пункты — а сам документ остаётся дома.",
  de: "Zurück aufs Telefon kommt eine Zusammenfassungs-Karte — Pfad, Größe, die Überschriften und die Punkte —, das Dokument selbst bleibt zu Hause.",
  fr: "Ce qui revient sur le téléphone est une carte de synthèse — le chemin, la taille, les titres et les puces — et le document lui-même reste à la maison.",
  it: "Sul telefono torna una carta di riepilogo — percorso, dimensione, titoli ed elenchi — e il documento in sé resta a casa.",
  nl: "Wat terugkomt op de telefoon is een samenvattingskaart — pad, grootte, de koppen en de punten — en het document zelf blijft thuis.",
  cs: "Zpátky na telefon přijde karta shrnutí — cesta, velikost, nadpisy a odrážky — a dokument sám zůstává doma.",
  "zh-Hans": "回到手机的是一张摘要卡片——路径、大小、章节与要点——而文档本体一直留在家里。",
  "zh-Hant": "回到手機的是一張摘要卡片——路徑、大小、章節與要點——而文件本體一直留在家裡。",
  es: "Lo que vuelve al teléfono es una tarjeta resumen —ruta, tamaño, los encabezados y los puntos— y el documento en sí se queda en casa.",
  pl: "Z powrotem do telefonu wraca karta podsumowania — ścieżka, rozmiar, nagłówki i punkty — a sam dokument zostaje w domu.",
  ja: "スマートフォンに戻ってくるのは要約カードです——パス、サイズ、見出しと箇条書き——で、文書そのものは自宅に留まります。",
  th: "สิ่งที่กลับมายังมือถือคือบัตรสรุป — เส้นทาง ขนาด หัวข้อ และรายการ — ส่วนเอกสารจริงยังคงอยู่ที่เครื่อง",
  fi: "Puhelimeen palaa yhteenvetokortti — polku, koko, otsikot ja luettelomerkit — ja asiakirja itse jää kotiin.",
  uk: "Назад на телефон приходить картка-резюме: шлях, розмір, заголовки і пункти — а сам документ лишається вдома.",
  bg: "Обратно на телефона идва карта с резюме — път, размер, заглавията и точките — а документът си остава вкъщи.",
  tr: "Telefona geri dönen, bir özet kartonudur — yol, boyut, başlıklar ve maddeler — belgenin kendisi ise evde kalır.",
  hu: "A telefonra visszaérkező egy összefoglaló kártya — útvonal, méret, a címsorok és a pontok — a dokumentum maga pedig otthon marad.",
};

const S3_STEP1: Localized<string> = {
  en: "A personal agent calls a service agent for one thing: this week’s free slots. The call carries that agent’s own identity — its own process, its own instance.",
  ru: "Личный агент обращается к сервисному агенту ради одного: свободные окна на этой неделе. Вызов несёт собственную идентичность агента — свой процесс, свой экземпляр.",
  de: "Ein persönlicher Agent ruft einen Dienst-Agenten für genau eines auf: die freien Fenster dieser Woche. Der Aufruf trägt die eigene Identität dieses Agenten — eigener Prozess, eigene Instanz.",
  fr: "Un agent personnel appelle un agent de service pour une seule chose : les créneaux libres de cette semaine. L’appel porte la propre identité de cet agent — son propre processus, sa propre instance.",
  it: "Un agente personale chiama un agente di servizio per una sola cosa: le finestre libere di questa settimana. La chiamata porta l’identità di quell’agente — processo suo, istanza sua.",
  nl: "Een persoonlijke agent roept een dienstagent op voor één ding: de vrije vensters van deze week. De oproep draagt de eigen identiteit van die agent — eigen proces, eigen instantie.",
  cs: "Osobní agent volá servisního agenta kvůli jediné věci: volná okna tohoto týdne. Volání nese vlastní identitu toho agenta — vlastní proces, vlastní instance.",
  "zh-Hans": "个人智能体向服务智能体只问一件事：本周的空档。这次调用带的是该智能体自己的身份——独立进程、独立实例。",
  "zh-Hant": "個人智能體向服務智能體只問一件事：本週的空檔。這次呼叫帶的是該智能體自己的身份——獨立程序、獨立實例。",
  es: "Un agente personal llama a un agente de servicio por una sola cosa: los huecos libres de esta semana. La llamada lleva la identidad propia de ese agente — proceso suyo, instancia suya.",
  pl: "Agent osobisty dzwoni do agenta serwisowego o jedną rzecz: wolne okna tego tygodnia. Wezwanie niesie własną tożsamość tego agenta — własny proces, własną instancję.",
  ja: "個人エージェントがサービス側エージェントに尋ねるのは一つだけです——今週の空き枠。その呼び出しには、そのエージェント自身の身元、つまり独立したプロセスと独立したインスタンスが付いていきます。",
  th: "เอเจนต์ส่วนตัวเรียกเอเจนต์บริการเพื่อเรื่องเดียว: ช่องว่างของสัปดาห์นี้ การเรียกนี้จะพาตัวตนของเอเจนต์นั้นไปด้วย — โปรเซสของตัวเอง อินสแตนซ์ของตัวเอง",
  fi: "Henkohtainen agentti kutsuu palveluagenttia yhtä asiaa varten: tämän viikon vapaat ikkunat. Kutsu kantaa tuon agentin oman henkilöllisyyden — oman prosessin, oman instanssin.",
  uk: "Особистий агент звертається до сервісного агента задля одного: вільні вікна цього тижня. Виклик несе власну ідентичність агента — власний процес, власний екземпляр.",
  bg: "Личен агент се обажда на сервисен агент за едно: свободните прозорци тази седмица. Обаждането носи собствената самоличност на агента — собствен процес, собствен екземпляр.",
  tr: "Kişisel ajan, hizmet ajanını tek bir şey için arar: bu haftanın boş saatleri. Arama, o ajanın kendi kimliğini taşır — kendi süreci, kendi örneği.",
  hu: "Egy személyes ügynök egy dolog miatt hív egy szolgáltatási ügynököt: e hét szabad ablakai. A hívás magán viseli az ügynök saját identitását — saját folyamat, saját példány.",
};

const S3_STEP2: Localized<string> = {
  en: "The gateway checks the permission range before anything goes out: one named, read-only scope. Dotted scope tokens like this one have zero implementations in the four repositories today, which is why this dot is amber.",
  ru: "Шлюз проверяет диапазон прав до отправки: один именованный доступ только на чтение. Точечные маркеры области, как этот, сегодня во четырёх репозиториях не реализованы вообще — потому точка и жёлтая.",
  de: "Das Gateway prüft den Bereichtsumfang, bevor etwas hinausgeht: ein benannter, nur lesender Umfang. Punktgetrennte Umfang-Marker wie dieser haben heute in den vier Repositories null Implementierungen, deshalb ist dieser Punkt gelb.",
  fr: "La passerelle vérifie la portée de permission avant que quoi que ce sorte : un périmètre nommé, en lecture seule. Des marqueurs de portée à points comme celui-ci ont zéro implémentation dans les quatre dépôts aujourd’hui, d’où le point jaune.",
  it: "Il gateway controlla l’ambito di permesso prima che qualcosa esca: un ambito nominato, di solo lettura. Marker di ambito puntati come questo hanno zero implementazioni nei quattro repository oggi, ed è per questo che il punto è giallo.",
  nl: "De gateway controleert het rechtenbereik voordat er iets uitgaat: één benoemd, alleen-lezen bereik. Gepunte bereikmarkers zoals deze hebben vandaag nul implementaties in de vier repositories, vandaar de gele stip.",
  cs: "Brána kontroluje rozsah oprávnění, než něco vyjde ven: jeden pojmenovaný rozsah jen pro čtení. Tečkované markery rozsahu jako tento mají dnes ve čtyřech repozitářích nula implementací, proto je bod žlutý.",
  "zh-Hans": "网关在任何东西发出去之前先校验权限范围：一个具名的、只读的范围。像这样用点分开的范围串，今天在四个仓库里是零实现——所以这一颗点是黄的。",
  "zh-Hant": "閘道在任何東西發出去之前先校驗權限範圍：一個具名的、唯讀的範圍。像這樣用點分開的範圍字串，今天在四個倉庫裡是零實作——所以這一顆點是黃的。",
  es: "La pasarela comprueba el alcance de permiso antes de que algo salga: un alcance nombrado, de solo lectura. Marcadores de alcance punteados como este tienen hoy cero implementaciones en los cuatro repositorios, por eso el punto es ámbar.",
  pl: "Bramka sprawdza zakres uprawnień, zanim cokolwiek wyjdzie: jeden nazwany zakres tylko do odczytu. Kropkowane znaczniki zakresu jak ten mają dziś w czterech repozytoriach zero implementacji, dlatego ta kropka jest bursztynowa.",
  ja: "ゲートウェイは何かを外に出す前に権限範囲を確認します——名前付きの読み取り専用スコープです。このような点区切りのスコープ文字列は、4 つのリポジトリに現時点で実装がゼロ。だからこの点は黄色です。",
  th: "เกตเวย์ตรวจขอบเขตสิทธิ์ก่อนมีอะไรถูกส่งออกไป: ขอบเขตที่ระบุชื่อและเป็นแบบอ่านอย่างเดียว เครื่องหมายขอบเขตแบบมีจุดเช่นนี้ยังไม่มีในคลังโค้ดทั้งสี่วันนี้ นี่คือเหตุผลที่จุดนี้เป็นสีเหลือง",
  fi: "Yhdyskäytävä tarkistaa oikeusalueen ennen lähetystä: yksi nimetty, vain lukua vaativa alue. Tällaiset pisteelliset alue-avaimet ovat neljässä varastossa vielä toteuttamatta, siksi piste on keltainen.",
  uk: "Шлюз перевіряє діапазон прав, перш ніж щось вийде назовні: один іменований дозвіл лише на читання. Точкові маркери області на кшталт цього сьогодні мають нуль реалізацій у чотирьох репозиторіях, тому крапка жовта.",
  bg: "Шлюзът проверява обхвата на правата, преди нещо да излезе: един назован обхват само за четене. Точкувани маркери на обхват като този днес имат нула реализации в четирите хранилища — затова точката е жълта.",
  tr: "Geçit, dışarı bir şey çıkmadan önce izin kapsamını denetler: tek, adlandırılmış, yalnız okuma kapsamında bir yetki. Bu noktalamı kapsam işaretçilerinin dört depoda bugün sıfır uygulaması var, nokta bu yüzden sarı.",
  hu: "Az átjáró kiküldés előtt ellenőrzi a jogosultsági hatókört: egy megnevezett, csak olvasható hatókör. Az ilyen pontozott hatókör-jelölőknek ma nulla megvalósításuk van a négy tárolóban, ezért sárga a pont.",
};

const S3_STEP3: Localized<string> = {
  en: "The owner is asked before the call goes out — an approval prompt on the requesting device — and withdrawing it is one tap on the same card too, only it drops the whole pairing, not just this scope.",
  ru: "Владельца спрашивают до отправки вызова — подсказка одобрения на запрашивающем устройстве — отозвать его тоже можно одним касанием на той же карточке, но снимется вся пара, а не одна эта область.",
  de: "Der Besitzer wird vor dem Hinausgehen des Aufrufs gefragt — eine Freigabe-Eingabeaufforderung auf dem anfordernden Gerät —, und der Widerruf ist ein Tipp auf derselben Karte — nur fällt die ganze Kopplung, nicht nur diese Reichweite.",
  fr: "Le propriétaire est interrogé avant la sortie de l’appel — une invite d’approbation sur l’appareil demandeur — retirer cette permission tient aussi en un geste sur la même carte — mais c’est l’appairage entier qui saute, pas ce seul périmètre.",
  it: "Il proprietario viene interpellato prima che la chiamata esca — un prompt di approvazione sul dispositivo richiedente — revocare quel consenso è un tocco sulla stessa carta — ma cade l’intero abbinamento, non solo quell’ambito.",
  nl: "De eigenaar wordt gevraagd voordat de oproep uitgaat — een goedkeuringsvraag op het verzoekende apparaat — die vergunning intrekken is één tik op dezelfde kaart — maar de hele koppeling valt, niet alleen dit bereik.",
  cs: "Vlastník je tázán před odchodem volání — výzva ke schválení na žádajícím zařízení — odebrání je jedno klepnutí na stejné kartě — padá ale celý pár, ne jenom tento rozsah.",
  "zh-Hans": "调用发出去之前会先问主人——请求侧弹一次批准提示，撤销这份授权也是同一张卡片上的一次点击——只是掉的是整条配对，不是这一项范围。",
  "zh-Hant": "呼叫發出去之前會先問主人——請求端彈出一次批准提示，撤銷這份授權也是同一張卡片上的一次點擊——只是掉的是整條配對，不是這一項範圍。",
  es: "Se pregunta al dueño antes de que la llamada salga — un aviso de aprobación en el dispositivo que pide — retirar esa concesión es un toque en la misma tarjeta — pero cae el emparejamiento entero, no solo ese alcance.",
  pl: "Właściciel jest pytany, zanim wezwanie wyjdzie — podpowiedź zatwierdzenia na urządzeniu żądającym — cofnięcie tego przyzwolenia to jedno dotknięcie na tej samej karcie — ale odpada całe sparowanie, nie tylko ten zakres.",
  ja: "呼び出しを外に出す前に所有者へ確認します——リクエスト側のデバイスに承認のプロンプトが出ます——そしてその許可の取り消しも同じカード上の 1 タップで済みます——ただし落ちるのはペアリング全体で、この 1 項目ではありません。",
  th: "จะถามเจ้าของก่อนที่การเรียกจะถูกส่งออกไป — จะมีกล่องขออนุมัติบนอุปกรณ์ที่ขอ — และการถอนสิทธิ์นั้นคือการแตะครั้งเดียวบนบัตรเดียวกัน — แต่ที่หลุดคือการจับคู่ทั้งหมด ไม่ใช่ขอบเขตเดียว",
  fi: "Omistajalta kysytään ennen kutsun lähtöä — hyväksyntäkehote pyytävällä laitteella — tämän luvan peruutus on yksi napautus samalla kortilla — mutta koko paritus putoaa, ei vain tämä alue.",
  uk: "Власника питають, перш ніж виклик вийде назовні — підказка схвалення на пристрої, що запитує, — відкликати цей дозвіл можна одним торканням на тій самій картці — але відпадає вся пара, а не лише ця область.",
  bg: "Притежателят се пита, преди обаждането да излезе — подкана за одобрение на искащото устройство — изтеглянето на това разрешение е едно докосване на същата карта — но пада цялото сдвояване, не само този обхват.",
  tr: "Arama dışarı çıkmadan önce sahibe sorulur — isteyen aygıtta bir onay istemi — bu yetkiyi geri almak aynı kartta tek dokunuş — ama tüm eşleştirme düşer, yalnız bu kapsam değil.",
  hu: "A tulajdonost kérdezik meg, mielőtt a hívás kimenne — engedély-kérés a kérő eszközön — e jog visszavonása egy koppintás ugyanarra a kártyára — csak éppen a teljes párosítás kiesik, nem csak ez a hatókör.",
};

const S3_STEP4: Localized<string> = {
  en: "Every decision leaves a row in the local audit table: stage, event, level, timestamp, latency. It is a table in the app’s own database, not a log shipped somewhere.",
  ru: "Каждое решение оставляет строку в локальной таблице аудита: этап, событие, уровень, метка времени, задержка. Это таблица в базе самого приложения, а не отосланный куда-то лог.",
  de: "Jede Entscheidung hinterlässt eine Zeile in der lokalen Audit-Tabelle: Stufe, Ereignis, Niveau, Zeitstempel, Verzögerung. Sie ist eine Tabelle in der Datenbank der App, kein weggeschicktes Protokoll.",
  fr: "Chaque décision laisse une ligne dans la table d’audit locale : étape, événement, niveau, horodatage, latence. C’est une table de la base de l’application, pas un journal expédié ailleurs.",
  it: "Ogni decisione lascia una riga nella tabella di revisione locale: fase, evento, livello, marca temporale, latenza. È una tabella nel database dell’app, non un log spedito chissà dove.",
  nl: "Elke beslissing laat een rij na in de lokale audit-tabel: fase, gebeurtenis, niveau, tijdstempel, vertraging. Het is een tabel in de eigen databank van de app, geen log die ergens heen gaat.",
  cs: "Każde rozhodnutí zanechá řádek v místní auditní tabulce: fáze, událost, úroveň, časové razítko, latence. Je to tabule v databázi aplikace, ne log odnesený někam.",
  "zh-Hans": "每一次决定都会在本地审计表里留下一行：阶段、事件、级别、时间戳与耗时。它是应用自己数据库里的一张表，不是发到别处的日志。",
  "zh-Hant": "每一次決定都會在本機稽核表裡留下一列：階段、事件、層級、時間戳與耗時。它是應用自己的資料庫裡的一張表，不是發到別處的日誌。",
  es: "Cada decisión deja una fila en la tabla de auditoría local: etapa, suceso, nivel, marca de tiempo, latencia. Es una tabla en la base de datos de la aplicación, no un log enviado a otro sitio.",
  pl: "Każda decyzja zostawia wiersz w lokalnej tabeli audytu: etap, zdarzenie, poziom, znacznik czasu, opóźnienie. To tabela we własnej bazie aplikacji, nie log wyprawiony gdzieś.",
  ja: "判断が下されるたびにローカルの監査テーブルへ 1 行残ります——段階、イベント、レベル、タイムスタンプ、遅延です。これはアプリ自身のデータベースにあるテーブルで、どこかへ送られるログではありません。",
  th: "ทุกครั้งที่มีคำสั่งจะเหลือหนึ่งแถวในตารางตรวจสอบในเครื่อง: ขั้น ตอน เหตุการณ์ ระดับ เวลา และหน่วงเวลา มันเป็นตารางในฐานข้อมูลของแอปเอง ไม่ใช่บันทึกที่ถูกส่งไปที่อื่น",
  fi: "Jokainen päätös jättää rivi paikalliseen tarkistustauluun: vaihe, tapahtuma, taso, aikaleima, viive. Se on taulu sovelluksen omassa tietokannassa, ei jonnekin lähetetty loki.",
  uk: "Кожне рішення лишає рядок у локальній таблиці аудиту: етап, подія, рівень, мітка часу, затримка. Це таблиця в базі самого застосунку, а не відсиланий кудись лог.",
  bg: "Всяко решение оставя ред в локалната одит таблица: етап, събитие, ниво, времеви отпечатък, забавяне. Това е таблица в собствената база на приложението, не изпратен някъде дневник.",
  tr: "Her karar, yerel denetim tablosuna bir satır bırakır: aşama, olay, düzey, zaman damgası, gecikme. Bu, uygulamanın kendi veritabanındaki bir tablodur, bir yere gönderilen günlük değil.",
  hu: "Minden döntés egy sort hagy a helyi naplótáblában: szakasz, esemény, szint, időbélyeg, késés. Ez az alkalmazás saját adatbázisának egy táblája, nem valahová elküldött napló.",
};

const S1_RES: Localized<string> = {
  en: "Proposal confirmed on the device. Two candidates, one tap, and no third party ever read a calendar.",
  ru: "Предложение подтверждено на устройстве. Два варианта, одно касание, и никто посторонний не читал календарь.",
  de: "Vorschlag auf dem Gerät bestätigt. Zwei Kandidaten, ein Tipp, und kein Dritter hat je einen Kalender gelesen.",
  fr: "Proposition confirmée sur l’appareil. Deux créneaux, un geste, et aucun tiers n’a jamais lu un calendrier.",
  it: "Proposta confermata sul dispositivo. Due candidati, un tocco, e nessun terzo ha mai letto un calendario.",
  nl: "Voorstel bevestigd op het apparaat. Twee kandidaten, één tik, en geen derde las ooit een agenda.",
  cs: "Návrh potvrzen na zařízení. Dva návrhy, jedno klepnutí, a žádná třetí strana nikdy nečetla kalendář.",
  "zh-Hans": "提案已在设备上确认。两个候选、一次点击，第三方从未读过任何日历。",
  "zh-Hant": "提案已在裝置上確認。兩個候選、一次點擊，第三方從未讀過任何日曆。",
  es: "Propuesta confirmada en el dispositivo. Dos candidatas, un toque, y ningún tercero leyó nunca un calendario.",
  pl: "Propozycja potwierdzona na urządzeniu. Dwie propozycje, jedno dotknięcie, i żadna trzecia strona nigdy nie czytała kalendarza.",
  ja: "提案はデバイス上で確定しました。二つの候補、タップ 1 回、そして第三者がカレンダーを読むことはありませんでした。",
  th: "ข้อเสนอยืนยันบนอุปกรณ์แล้ว สองตัวเลือก หนึ่งการแตะ และไม่มีบุคคลที่สามอ่านปฏิทินเลย",
  fi: "Ehdotus vahvistettu laitteella. Kaksi ehdotusta, yksi napautus, eikä kolmas osapuoli koskaan lukenut kalenteria.",
  uk: "Пропозицію підтверджено на пристрої. Два варіанти, одне торкання, і жодна третя сторона не читала календар.",
  bg: "Предложението е потвърдено на устройството. Два варианта, едно докосване, и никоя трета страна никога не е чела календар.",
  tr: "Öneri aygıtta onaylandı. İki aday, tek dokunuş, ve üçüncü bir taraf hiçbir zaman takvim okumadı.",
  hu: "A javaslat az eszközön megerősítve. Két jelölt, egy koppintás, és harmadik fél soha nem olvasott naptárat.",
};

const S2_RES: Localized<string> = {
  en: "The digest came back. The files never left the Mac, and the port stayed shut to the network.",
  ru: "Резюме вернулось. Файлы не покинули Mac, а порт остался закрыт для сети.",
  de: "Die Zusammenfassung kam zurück. Die Dateien verließen den Mac nie, und der Port blieb fürs Netz zu.",
  fr: "La synthèse est revenue. Les fichiers n’ont jamais quitté le Mac, et le port est resté fermé au réseau.",
  it: "Il riepilogo è tornato. I file non hanno mai lasciato il Mac, e la porta è rimasta chiusa alla rete.",
  nl: "De samenvatting kwam terug. De bestanden verlieten de Mac nooit, en de poort bleef dicht voor het netwerk.",
  cs: "Shrnutí se vrátilo. Soubory Mac nikdy neopustily a port zůstal vůči síti zavřený.",
  "zh-Hans": "摘要已经回来了。文件从未离开那台 Mac，端口也始终对网络关着。",
  "zh-Hant": "摘要已經回來了。檔案從未離開那台 Mac，連接埠也始終對網路關著。",
  es: "El resumen volvió. Los archivos nunca dejaron el Mac, y el puerto siguió cerrado a la red.",
  pl: "Podsumowanie wróciło. Pliki nigdy nie opuściły Maka, a port pozostał zamknięty dla sieci.",
  ja: "要約が戻ってきました。ファイルはあの Mac を一度も出ておらず、ポートもネットワークに対して閉じたままです。",
  th: "บทสรุปส่งกลับมาแล้ว ไฟล์ไม่เคยออกจาก Mac และพอร์ตยังคงปิดต่อเครือข่าย",
  fi: "Yhteenveto palasi. Tiedostot eivät koskaan poistuneet Macista, ja portti pysyi verkolta kiinni.",
  uk: "Резюме повернулось. Файли не полишали Mac, а порт лишився закритий для мережі.",
  bg: "Резюмето се завърна. Файловете никога не напуснаха Mac, а портът остана затворен за мрежата.",
  tr: "Özet geri geldi. Dosyalar Mac’ten hiç ayrılmadı ve port ağa kapalı kaldı.",
  hu: "Az összefoglaló visszaért. A fájlok sosem hagyták el a Maka, és a port a hálózat előtt zárva maradt.",
};

const S3_RES: Localized<string> = {
  en: "Granted, and written to the local ledger: one owner decision, one row. Withdrawing the grant goes through that same card and that same table; withdrawing only this scope does not exist.",
  ru: "Разрешение выдано и записано в локальный реестр: одно решение владельца, одна строка. Отозвать его должны те же карточка и таблица; отзыв только этой области не реализован.",
  de: "Erlaubt und ins lokale Protokoll geschrieben: eine Besitzer-Entscheidung, eine Zeile. Den Widerruf tragen dieselbe Karte und dieselbe Tabelle; nur diesen Umfang widerrufen gibt es noch nicht.",
  fr: "Accordé, et écrit dans le registre local : une décision du propriétaire, une ligne. Le retrait passe par la même carte et la même table ; ne retirer que cette portée n’existe pas.",
  it: "Concesso e scritto nel registro locale: una decisione del proprietario, una riga. La revoca passa dalla stessa carta e dalla stessa tabella; revocare solo questo ambito non esiste.",
  nl: "Toegekend en geschreven in het lokale register: één eigenaarbeslissing, één rij. Het intrekken gaat via dezelfde kaart en dezelfde tabel; alleen dit bereik intrekken bestaat niet.",
  cs: "Uděleno a zapsáno do místního deníku: jedno rozhodnutí vlastníka, jeden řádek. Odebrání jde stejnou kartou a stejnou tabulkou; odebrat jen tento rozsah neexistuje.",
  "zh-Hans": "已批准，并写入本地台账：一次主人决定、一行记录。撤销走的就是同一张卡片和同一张表——但只撤这一项范围不存在。",
  "zh-Hant": "已核准，並寫入本機台帳：一次主人決定、一列記錄。撤銷走的就是同一張卡片和同一張表——但只撤這一項範圍不存在。",
  es: "Concedido y escrito en el registro local: una decisión del dueño, una fila. Retirarlo pasa por la misma tarjeta y la misma tabla; retirar solo ese alcance no existe.",
  pl: "Przyznane i zapisane w lokalnym rejestrze: jedna decyzja właściciela, jeden wiersz. Cofnięcie idzie tą samą kartą i tą samą tabelą; cofnięcie tylko tego zakresu nie istnieje.",
  ja: "許可し、ローカルの台帳に書き込みました——所有者の判断 1 回、行 1 件です。取消も同じカードと同じテーブルを通りますが、この 1 項目だけの取り消しはありません。",
  th: "อนุมัติแล้วและเขียนลงในสมุดบัญชีในเครื่อง: คำสั่งของเจ้าของหนึ่งครั้ง หนึ่งแถว การถอนใช้บัตรเดียวกันและตารางเดียวกัน — แต่การถอนเฉพาะขอบเขตเดียวไม่มี",
  fi: "Myönnetty ja kirjoitettu paikalliseen kirjanpitoon: yksi omistajan päätös, yksi rivi. Peruutus käy saman kortin ja saman taulun kautta; vain tämän alueen peruutusta ei ole.",
  uk: "Надано й записано в локальний реєстр: одне рішення власника, один рядок. Відклик іде тією самою карткою й тією самою таблицею; відклик лише цієї області не існує.",
  bg: "Отсъдено и записано в локалния регистър: едно решение на притежателя, един ред. Отмяната минава през същата карта и същата таблица; отмяна само на този обхват няма.",
  tr: "Verildi ve yerel deftere yazıldı: bir sahip kararı, bir satır. Geri alma aynı kart ve aynı tablo üzerinden yürür; yalnız bu kapsamı geri alma yok.",
  hu: "Engedélyezve és beírva a helyi naplóba: egy tulajdonosi döntés, egy sor. A visszavonás ugyanarra a kártyára és ugyanabba a táblába megy; egyedül ezt a hatókört nem lehet visszavonni.",
};

const RUN_LABEL: Localized<string> = {
  en: "Run the flow",
  ru: "Прогнать поток",
  de: "Ablauf durchspielen",
  fr: "Jouer le flux",
  it: "Esegui il flusso",
  nl: "Stroom afspelen",
  cs: "Prohrát tok",
  "zh-Hans": "运行演示",
  "zh-Hant": "執行示範",
  es: "Recorrer el flujo",
  pl: "Przejdź przepływ",
  ja: "流れを試す",
  th: "รันขั้นตอน",
  fi: "Toista kulku",
  uk: "Прогнати потік",
  bg: "Изпълни потока",
  tr: "Akışı yürüt",
  hu: "Folyamat lejátszása",
};

const S1_ACT: Localized<string> = {
  en: "Approve and create the proposal",
  ru: "Подтвердить и создать предложение",
  de: "Freigeben und Vorschlag anlegen",
  fr: "Approuver et créer la proposition",
  it: "Approva e crea la proposta",
  nl: "Goedkeuren en voorstel maken",
  cs: "Schválit a vytvořit návrh",
  "zh-Hans": "批准并生成提案",
  "zh-Hant": "批准並產生提案",
  es: "Aprobar y crear la propuesta",
  pl: "Zatwierdź i utwórz propozycję",
  ja: "承認して提案を作る",
  th: "อนุมัติและสร้างข้อเสนอ",
  fi: "Hyväksy ja luo ehdotus",
  uk: "Схвалити й створити пропозицію",
  bg: "Одобрете и създайте предложението",
  tr: "Onayla ve öneriyi oluştur",
  hu: "Engedélyezés és javaslat létrehozása",
};

const S2_ACT: Localized<string> = {
  en: "Hand the task to this Mac",
  ru: "Передать задачу этому Mac",
  de: "Aufgabe an diesen Mac übergeben",
  fr: "Confier la tâche à ce Mac",
  it: "Affida il compito a questo Mac",
  nl: "Taak aan deze Mac geven",
  cs: "Předat úkol tomuto Macu",
  "zh-Hans": "把任务交给这台 Mac",
  "zh-Hant": "把任務交給這台 Mac",
  es: "Entregar la tarea a este Mac",
  pl: "Przekaż zadanie temu Macowi",
  ja: "この Mac にタスクを渡す",
  th: "ส่งงานให้ Mac เครื่องนี้",
  fi: "Anna tehtävä tälle Macille",
  uk: "Передати завдання цьому Mac",
  bg: "Предай задачата на този Mac",
  tr: "Görevi bu Mac’e devret",
  hu: "Feladat átadása ennek a Macnek",
};

const S3_ACT: Localized<string> = {
  en: "Approve the call",
  ru: "Схвалить вызов",
  de: "Aufruf freigeben",
  fr: "Approuver l’appel",
  it: "Approva la chiamata",
  nl: "Oproep goedkeuren",
  cs: "Schválit volání",
  "zh-Hans": "批准调用",
  "zh-Hant": "批准呼叫",
  es: "Aprobar la llamada",
  pl: "Zatwierdź wezwanie",
  ja: "呼び出しを承認する",
  th: "อนุมัติการเรียก",
  fi: "Hyväksy kutsu",
  uk: "Схвалити виклик",
  bg: "Одобрете обаждането",
  tr: "Aramayı onayla",
  hu: "Hívás engedélyezése",
};

const REVOKE_LABEL: Localized<string> = {
  en: "Revoke the grant",
  ru: "Отозвать разрешение",
  de: "Erlaubnis widerrufen",
  fr: "Retirer la permission",
  it: "Revoca il consenso",
  nl: "Toegang intrekken",
  cs: "Odebrat povolení",
  "zh-Hans": "撤销授权",
  "zh-Hant": "撤銷授權",
  es: "Revocar la concesión",
  pl: "Cofnij przyzwolenie",
  ja: "許可を取り消す",
  th: "เพิกถอนสิทธิ์",
  fi: "Peru lupa",
  uk: "Відкликати дозвіл",
  bg: "Отземи разрешението",
  tr: "Yetkiyi geri al",
  hu: "Engedély visszavonása",
};

const RESET_LABEL: Localized<string> = {
  en: "Reset",
  ru: "Сбросить",
  de: "Zurücksetzen",
  fr: "Réinitialiser",
  it: "Reimposta",
  nl: "Opnieuw",
  cs: "Od začátku",
  "zh-Hans": "重置",
  "zh-Hant": "重設",
  es: "Reiniciar",
  pl: "Od nowa",
  ja: "リセット",
  th: "เริ่มใหม่",
  fi: "Nollaa",
  uk: "Скинути",
  bg: "Нулирай",
  tr: "Sıfırla",
  hu: "Visszaállítás",
};

const AUDIT_APPROVED: Localized<string> = {
  en: "approved",
  ru: "разрешено",
  de: "freigegeben",
  fr: "approuvé",
  it: "approvato",
  nl: "goedgekeurd",
  cs: "schváleno",
  "zh-Hans": "已批准",
  "zh-Hant": "已批准",
  es: "aprobado",
  pl: "zatwierdzono",
  ja: "承認済み",
  th: "อนุมัติแล้ว",
  fi: "hyväksytty",
  uk: "схвалено",
  bg: "одобрено",
  tr: "onaylandı",
  hu: "engedélyezve",
};

const AUDIT_REVOKED: Localized<string> = {
  en: "revoked",
  ru: "отозвано",
  de: "widerrufen",
  fr: "révoqué",
  it: "revocato",
  nl: "ingetrokken",
  cs: "zrušeno",
  "zh-Hans": "已撤销",
  "zh-Hant": "已撤銷",
  es: "revocado",
  pl: "cofnięto",
  ja: "取り消し",
  th: "เพิกถอนแล้ว",
  fi: "peruttu",
  uk: "відкликано",
  bg: "оттеглено",
  tr: "geri alındı",
  hu: "visszavonva",
};

const REVOKE_NOTE: Localized<string> = {
  en: "Revocation is implemented, at the granularity of a whole guest link or a whole pairing: one click flips the state and the next check is refused. Per-scope withdrawal is the part that is missing.",
  ru: "Отзыв реализован — целой гостевой ссылки или целой пары: один клик меняет состояние, и следующая проверка отказывает. Не хватает отзыва по одной области прав.",
  de: "Widerruf ist implementiert, bezogen auf einen ganzen Gastlink oder eine ganze Kopplung: ein Klick setzt den Status, die nächste Prüfung wird abgewiesen. Was fehlt, ist der Widerruf nach Einzelumfang.",
  fr: "La révocation est implémentée, à l’échelle d’un lien invité entier ou d’un appairage entier : un geste change l’état et la vérification suivante refuse. Il manque la révocation par périmètre unique.",
  it: "La revoca è implementata, a livello di link ospite o di abbinamento intero: un tocco cambia lo stato e il controllo successivo rifiuta. Manca la revoca per singolo ambito.",
  nl: "Intrekken is geïmplementeerd, op de korrel van een hele gastlink of een hele koppeling: één klik zet de status om en de volgende controle wijst af. Intrekken per één bereik ontbreekt.",
  cs: "Zrušení je implementováno, a to po celém hostovském odkazu nebo celém párování: jedno klepnutí přepne stav a další kontrola zamítne. Chybí zrušení podle jediného rozsahu.",
  "zh-Hans": "撤销有实现，粒度是整条访客链接或整个配对：一次点击改状态，下一次校验立即被拒。缺的是只撤某一项范围。",
  "zh-Hant": "撤銷有實作，粒度是整條訪客連結或整個配對：一次點擊改狀態，下一次校驗立即被拒。缺的是只撤某一項範圍。",
  es: "Revocar está implementado, a nivel de un enlace de invitado entero o de un emparejamiento entero: un toque cambia el estado y la comprobación siguiente rechaza. Falta revocar un alcance individual.",
  pl: "Odwołanie jest zaimplementowane — całego linku gościa albo całego sparowania: jedno dotknięcie zmienia stan, a następne sprawdzenie odmawia. Brakuje odwołania pojedynczego zakresu.",
  ja: "取り消しは実装されています。粒度はゲストリンク 1 本またはペアリング 1 件で、1 タップで状態が変わり、次の検証はすぐ拒まれます。足りないのはスコープ 1 項目だけの取り消しです。",
  th: "การเพิกถอนมีการใช้งานจริง ระดับทั้งลิงก์แขกรับเชิญหรือทั้งการจับคู่ แตะครั้งเดียวเปลี่ยนสถานะ และการตรวจครั้งถัดไปถูกปฏิเสธทันที สิ่งที่ขาดคือการเพิกถอนทีละขอบเขตเดียว",
  fi: "Peruutus on toteutettu kokonaisen vieraslinkin tai kokonaisen parituksen tasolla: yksi napautus vaihtaa tilan ja seuraava tarkistus hylkää. Puuttuu yksittäisen alueen peruutus.",
  uk: "Відклик реалізований — цілого гостьового посилання або цілої пари: одне торкання змінює стан, і наступна перевірка відмовляє. Бракує відклику за одною областю прав.",
  bg: "Отмяната е реализирана — за цяла гостова връзка или цяло сдвояване: едно докосване сменя състоянието, а следващата проверка отказва. Липсва отмяна по единичен обхват.",
  tr: "Geri alma uygulanmış; ölçüt tüm konuk bağlantısı veya tüm eşleştirmedir: tek dokunuş durumu değiştirir, sonraki deneme reddedilir. Eksik olan tek kapsama göre geri alma.",
  hu: "A visszavonás megvalósult, egy teljes vendéghivatkozás vagy egy teljes párosítás szintjén: egy koppintás átállítja az állapotot, a következő ellenőrzés elutasít. Az egyetlen hatókör szerinti visszavonás hiányzik.",
};

type DemoState = "live" | "next";

interface DemoStep {
  readonly tag: string;
  readonly body: Localized<string>;
  readonly state: DemoState;
}

interface Scenario {
  readonly id: 1 | 2 | 3;
  readonly tone: Tone;
  readonly tab: Localized<string>;
  readonly steps: readonly DemoStep[];
  readonly action: Localized<string>;
  readonly result: Localized<string>;
}

/** The wire tokens are real values from the code; the flow around them is the model. */
const SCENARIOS: readonly Scenario[] = [
  {
    id: 1,
    tone: "brand",
    tab: S1_TAB,
    action: S1_ACT,
    result: S1_RES,
    steps: [
      { tag: "A → Agent A", body: S1_STEP1, state: "live" },
      { tag: "Free/Busy", body: S1_STEP2, state: "live" },
      { tag: "10:00 · 14:30", body: S1_STEP3, state: "live" },
      { tag: "0 B", body: S1_STEP4, state: "live" },
    ],
  },
  {
    id: 2,
    tone: "mesh",
    tab: S2_TAB,
    action: S2_ACT,
    result: S2_RES,
    steps: [
      { tag: "PPXNODE1", body: S2_STEP1, state: "live" },
      { tag: "127.0.0.1:18920", body: S2_STEP2, state: "live" },
      { tag: "WorkspaceSandbox", body: S2_STEP3, state: "live" },
      { tag: "digest", body: S2_STEP4, state: "live" },
    ],
  },
  {
    id: 3,
    tone: "warn",
    tab: S3_TAB,
    action: S3_ACT,
    result: S3_RES,
    steps: [
      { tag: "agent → agent", body: S3_STEP1, state: "live" },
      { tag: "calendar.availability:read", body: S3_STEP2, state: "next" },
      { tag: "grant / revoke", body: S3_STEP3, state: "next" },
      { tag: "negotiation_audit", body: S3_STEP4, state: "live" },
    ],
  },
];

const AUDIT_ROWS: readonly { readonly time: string; readonly scope: string }[] = [
  { time: "09:12:04", scope: "calendar.availability:read" },
];

export function ConnectionDemo(): ReactElement {
  const [activeId, setActiveId] = useState<Scenario["id"]>(1);
  const [revealed, setRevealed] = useState(1);
  const [approved, setApproved] = useState(false);
  const [revoked, setRevoked] = useState(false);

  const scenario = SCENARIOS.find((item) => item.id === activeId) ?? SCENARIOS[0];

  // Hooks stay unconditional: every label this render might need is taken up front.
  const sectionLabel = useCopy(TITLE);
  const noticeLabel = useCopy(NOTICE_LABEL);
  const disclaimer = useCopy(DISCLAIMER);
  const runLabel = useCopy(RUN_LABEL);
  const resetLabel = useCopy(RESET_LABEL);
  const revokeLabel = useCopy(REVOKE_LABEL);
  const actionLabel = useCopy(scenario.action);
  const resultLine = useCopy(scenario.result);
  const approvedLabel = useCopy(AUDIT_APPROVED);
  const revokedLabel = useCopy(AUDIT_REVOKED);
  const revokeNote = useCopy(REVOKE_NOTE);
  const liveLabel = useCopy(STATUS_AVAILABLE);
  const nextLabel = useCopy(STATUS_EVOLVING);
  const tone = TONES[scenario.tone];

  const select = (id: Scenario["id"]): void => {
    setActiveId(id);
    setRevealed(1);
    setApproved(false);
    setRevoked(false);
  };

  const run = (): void => {
    setRevealed((value) => Math.min(value + 1, scenario.steps.length));
  };

  const approve = (): void => {
    setRevealed(scenario.steps.length);
    setApproved(true);
  };

  const reset = (): void => {
    setRevealed(1);
    setApproved(false);
    setRevoked(false);
  };

  const atEnd = revealed >= scenario.steps.length;

  return (
    <section id="connection-demo" aria-label={sectionLabel} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} />

        <p
          className={`mt-7 min-w-0 break-words rounded-xl border ${tone.ring} bg-ink-800/60 px-4 py-3 text-[12.5px] leading-relaxed text-mute`}
        >
          <span className={`font-semibold ${tone.text}`}>
            {noticeLabel}
            {" · "}
          </span>
          {disclaimer}
        </p>

        <div
          role="tablist"
          aria-label={sectionLabel}
          className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-1 border-y border-hair py-2 sm:grid-cols-3"
        >
          {SCENARIOS.map((item) => (
            <TabButton
              key={item.id}
              scenario={item}
              selected={item.id === activeId}
              onSelect={() => select(item.id)}
            />
          ))}
        </div>

        <div
          role="tabpanel"
          id="connection-demo-panel"
          aria-labelledby={`connection-demo-tab-${scenario.id}`}
          className={`glass mt-5 flex min-w-0 flex-col border p-5 ${tone.ring}`}
        >
          <ol className="grid grid-cols-[minmax(0,1fr)] gap-3">
            {scenario.steps.slice(0, revealed).map((step, index) => (
              <StepRow key={`${scenario.id}-${index}`} step={step} />
            ))}
          </ol>

          {scenario.id === 3 && approved && (
            <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-2 border-t border-hair pt-4">
              {AUDIT_ROWS.map((row) => (
                <li
                  key={row.time}
                  className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11.5px] text-faint"
                >
                  <span>{row.time}</span>
                  <span className="min-w-0 break-all">{row.scope}</span>
                  <span
                    className={`chip shrink-0 ${revoked ? "text-warn-soft" : "text-mesh-soft"}`}
                  >
                    {revoked ? revokedLabel : approvedLabel}
                  </span>
                </li>
              ))}
              {revoked && (
                <li className="min-w-0 break-words text-[11.5px] leading-relaxed text-warn-soft">
                  {revokeNote}
                </li>
              )}
            </ul>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {!atEnd && (
              <button type="button" onClick={run} className={PRIMARY}>
                {runLabel}
              </button>
            )}
            {atEnd && !approved && (
              <button type="button" onClick={approve} className={PRIMARY}>
                {actionLabel}
              </button>
            )}
            {approved && scenario.id === 3 && !revoked && (
              <button
                type="button"
                onClick={() => setRevoked(true)}
                className={GHOST}
              >
                {revokeLabel}
              </button>
            )}
            <button type="button" onClick={reset} className={GHOST}>
              {resetLabel}
            </button>
            {approved && (
              <span className="flex min-w-0 items-start gap-2 text-[12.5px] leading-relaxed text-mute">
                <span className="mt-[6px] shrink-0">
                  <StatusDot tone={revoked ? "warn" : "mesh"} pulse={false} />
                </span>
                <span className="min-w-0 break-words">{resultLine}</span>
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex min-w-0 items-center gap-2">
            <StatusDot tone="mesh" pulse={false} />
            <span className="min-w-0 break-words text-[12px] text-faint">{liveLabel}</span>
          </span>
          <span className="flex min-w-0 items-center gap-2">
            <StatusDot tone="warn" pulse={false} />
            <span className="min-w-0 break-words text-[12px] text-faint">{nextLabel}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  scenario,
  selected,
  onSelect,
}: {
  scenario: Scenario;
  selected: boolean;
  onSelect: () => void;
}): ReactElement {
  const label = useCopy(scenario.tab);
  return (
    <button
      type="button"
      role="tab"
      id={`connection-demo-tab-${scenario.id}`}
      aria-selected={selected}
      aria-controls="connection-demo-panel"
      onClick={onSelect}
      className={`flex min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-[12.5px] leading-snug transition-colors duration-150 ${FOCUS} ${
        selected ? "bg-white/[0.06] text-white" : "text-faint hover:text-mute"
      }`}
    >
      <span className="shrink-0 font-mono text-[10.5px] text-faint">{`0${scenario.id}`}</span>
      <span className="min-w-0 break-words">{label}</span>
    </button>
  );
}

/** One revealed step: the real wire token, the status dot, the sentence. */
function StepRow({ step }: { step: DemoStep }): ReactElement {
  const body = useCopy(step.body);
  return (
    <li className="flex min-w-0 gap-3">
      <span className="mt-[7px] shrink-0">
        <StatusDot tone={step.state === "live" ? "mesh" : "warn"} pulse={false} />
      </span>
      <div className="min-w-0">
        <p className="min-w-0 break-words font-mono text-[11.5px] text-faint">{step.tag}</p>
        <p className="mt-1 min-w-0 break-words text-[13px] leading-relaxed text-mute">{body}</p>
      </div>
    </li>
  );
}

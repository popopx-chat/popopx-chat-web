"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui";

/**
 * Architecture layers — six-layer stack from experience to crypto foundation.
 *
 * Layer names and responsibilities are manually translated. No banned words
 * from the original architecture diagram are included.
 */

type Layer = {
  readonly index: string;
  readonly name: Localized<string>;
  readonly responsibility: Localized<string>;
  readonly tone: "brand" | "mesh";
};

const LAYERS: readonly Layer[] = [
  {
    index: "01",
    name: {
      en: "Experience Layer",
      ru: "Слой опыта",
      de: "Erlebnisschicht",
      fr: "Couche d'expérience",
      it: "Strato esperienza",
      nl: "Ervaringslaag",
      cs: "Vrstva zkušeností",
      "zh-Hans": "体验层",
      "zh-Hant": "體驗層",
      es: "Capa de experiencia",
      pl: "Warstwa doświadczenia",
      ja: "体験レイヤー",
      th: "ชั้นประสบการณ์",
      fi: "Kokemuskerros",
      uk: "Шар досвіду",
      bg: "Слой опит",
      tr: "Deneyim katmanı",
      hu: "Élmény réteg",
    },
    responsibility: {
      en: "User interface, navigation, and interaction patterns across all client surfaces.",
      ru: "Пользовательский интерфейс, навигация и паттерны взаимодействия на всех клиентских поверхностях.",
      de: "Benutzeroberfläche, Navigation und Interaktionsmuster auf allen Client-Oberflächen.",
      fr: "Interface utilisateur, navigation et modèles d'interaction sur toutes les surfaces client.",
      it: "Interfaccia utente, navigazione e modelli di interazione su tutte le superfici client.",
      nl: "Gebruikersinterface, navigatie en interactiepatronen op alle clientoppervlakken.",
      cs: "Uživatelské rozhraní, navigace a vzory interakce napříč všemi klientskými povrchy.",
      "zh-Hans": "所有客户端界面上的用户界面、导航和交互模式。",
      "zh-Hant": "所有客戶端介面上的使用者介面、導航和互動模式。",
      es: "Interfaz de usuario, navegación y patrones de interacción en todas las superficies del cliente.",
      pl: "Interfejs użytkownika, nawigacja i wzorce interakcji na wszystkich powierzchniach klienta.",
      ja: "すべてのクライアントサーフェスにおけるユーザーインターフェース、ナビゲーション、インタラクションパターン。",
      th: "อินเทอร์เฟซผู้ใช้ การนำทาง และรูปแบบการโต้ตอบบนพื้นผิวไคลเอ็นต์ทั้งหมด",
      fi: "Käyttöliittymä, navigointi ja vuorovaikutusmallit kaikilla asiakaspinnoilla.",
      uk: "Інтерфейс користувача, навігація та шаблони взаємодії на всіх клієнтських поверхнях.",
      bg: "Потребителски интерфейс, навигация и модели на взаимодействие на всички клиентски повърхности.",
      tr: "Tüm istemci yüzeylerinde kullanıcı arayüzü, gezinme ve etkileşim kalıpları.",
      hu: "Felhasználói felület, navigáció és interakciós minták az összes kliens felületen.",
    },
    tone: "brand",
  },
  {
    index: "02",
    name: {
      en: "Agent Layer",
      ru: "Слой агента",
      de: "Agent-Schicht",
      fr: "Couche d'agent",
      it: "Strato agente",
      nl: "Agentlaag",
      cs: "Vrstva agenta",
      "zh-Hans": "Agent 层",
      "zh-Hant": "Agent 層",
      es: "Capa de agente",
      pl: "Warstwa agenta",
      ja: "エージェントレイヤー",
      th: "ชั้นตัวแทน",
      fi: "Agenttikerros",
      uk: "Шар агента",
      bg: "Слой агент",
      tr: "Ajan katmanı",
      hu: "Ágens réteg",
    },
    responsibility: {
      en: "Bot orchestration, rule-based routing, and plugin architecture for extensible automation.",
      ru: "Оркестрация ботов, маршрутизация на основе правил и архитектура плагинов для расширяемой автоматизации.",
      de: "Bot-Orchestrierung, regelbasierte Routenführung und Plugin-Architektur für erweiterbare Automatisierung.",
      fr: "Orchestration de bots, routage basé sur des règles et architecture de plugins pour l'automatisation extensible.",
      it: "Orchestrazione bot, instradamento basato su regole e architettura plugin per l'automazione estendibile.",
      nl: "Bot-orkestratie, op regels gebaseerde routering en plugin-architectuur voor uitbreidbare automatisering.",
      cs: "Orchestrace botů, routování založené na pravidlech a architektura pluginů pro rozšiřitelnou automatizaci.",
      "zh-Hans": "Bot 编排、基于规则的路由和插件架构，用于可扩展的自动化。",
      "zh-Hant": "Bot 編排、基於規則的路由和插件架構，用於可擴展的自動化。",
      es: "Orquestación de bots, enrutamiento basado en reglas y arquitectura de complementos para automatización extensible.",
      pl: "Orkiestracja botów, trasowanie oparte na regułach i architektura wtyczek dla rozszerzalnej automatyzacji.",
      ja: "ボットオーケストレーション、ルールベースのルーティング、拡張可能な自動化のためのプラグインアーキテクチャ。",
      th: "การประสานงานบอต การเส้นทางตามกฎ และสถาปัตยกรรมปลั๊กอินสำหรับระบบอัตโนมัติที่ขยายได้",
      fi: "Bottien orkestrointi, sääntöpohjainen reititys ja laajennusarkkitehtuuri laajennettavalle automaatiolle.",
      uk: "Оркестрація ботів, маршрутизація на основі правил та архітектура плагінів для розширюваної автоматизації.",
      bg: "Оркестрация на ботове, маршрутизиране базирано на правила и плугин архитектура за разширяема автоматизация.",
      tr: "Bot orkestrasyonu, kural tabanlı yönlendirme ve genişletilebilir otomasyon için eklenti mimarisi.",
      hu: "Bot vezérlés, szabály-alapú útválasztás és beépülő architektúra bővíthető automatizáláshoz.",
    },
    tone: "mesh",
  },
  {
    index: "03",
    name: {
      en: "Control Layer",
      ru: "Слой управления",
      de: "Steuerungsschicht",
      fr: "Couche de contrôle",
      it: "Strato di controllo",
      nl: "Controlelaag",
      cs: "Řídicí vrstva",
      "zh-Hans": "控制层",
      "zh-Hant": "控制層",
      es: "Capa de control",
      pl: "Warstwa kontrolna",
      ja: "制御レイヤー",
      th: "ชั้นควบคุม",
      fi: "Ohjauskerros",
      uk: "Контрольний шар",
      bg: "Контролен слой",
      tr: "Kontrol katmanı",
      hu: "Vezérlő réteg",
    },
    responsibility: {
      en: "Configuration management, signed updates, and pinned key verification for server settings.",
      ru: "Управление конфигурацией, подписанные обновления и проверка закрепленных ключей для настроек сервера.",
      de: "Konfigurationsverwaltung, signierte Updates und Überprüfung gepinnter Schlüssel für Servereinstellungen.",
      fr: "Gestion de la configuration, mises à jour signées et vérification de clés épinglées pour les paramètres du serveur.",
      it: "Gestione della configurazione, aggiornamenti firmati e verifica delle chiavi bloccate per le impostazioni del server.",
      nl: "Configuratiebeheer, ondertekende updates en verificatie van vastgezette sleutels voor serverinstellingen.",
      cs: "Správa konfigurace, podepsané aktualizace a ověření připnutých klíčů pro nastavení serveru.",
      "zh-Hans": "配置管理、签名更新和固定密钥验证，用于服务器设置。",
      "zh-Hant": "配置管理、簽名更新和固定金鑰驗證，用於伺服器設定。",
      es: "Gestión de configuración, actualizaciones firmadas y verificación de claves fijadas para la configuración del servidor.",
      pl: "Zarządzanie konfiguracją, podpisane aktualizacje i weryfikacja przypiętych kluczy dla ustawień serwera.",
      ja: "サーバー設定のための構成管理、署名付き更新、固定キーの検証。",
      th: "การจัดการการกำหนดค่า การอัปเดตที่ลงนาม และการตรวจสอบคีย์ที่ตรึงไว้สำหรับการตั้งค่าเซิร์ฟเวอร์",
      fi: "Konfiguraation hallinta, allekirjoitetut päivitykset ja kiinnitettyjen avainten vahvistus palvelinasetuksille.",
      uk: "Керування конфігурацією, підписані оновлення та перевірка закріплених ключів для налаштувань сервера.",
      bg: "Управление на конфигурацията, подписани актуализации и проверка на фиксирани ключове за сървърни настройки.",
      tr: "Sunucu ayarları için yapılandırma yönetimi, imzalı güncellemeler ve sabitlenmiş anahtar doğrulaması.",
      hu: "Konfiguráció kezelés, aláírt frissítések és rögzített kulcsok ellenőrzése a szerver beállításokhoz.",
    },
    tone: "brand",
  },
  {
    index: "04",
    name: {
      en: "Connection Layer",
      ru: "Слой соединения",
      de: "Verbindungsschicht",
      fr: "Couche de connexion",
      it: "Strato di connessione",
      nl: "Verbindingslaag",
      cs: "Spojovací vrstva",
      "zh-Hans": "连接层",
      "zh-Hant": "連接層",
      es: "Capa de conexión",
      pl: "Warstwa połączenia",
      ja: "接続レイヤー",
      th: "ชั้นการเชื่อมต่อ",
      fi: "Yhteyskerros",
      uk: "Шар з'єднання",
      bg: "Слой за връзка",
      tr: "Bağlantı katmanı",
      hu: "Kapcsolat réteg",
    },
    responsibility: {
      en: "Transport protocols, peer-to-peer discovery, and relay coordination for message delivery.",
      ru: "Транспортные протоколы, обнаружение peer-to-peer и координация ретрансляторов для доставки сообщений.",
      de: "Transportprotokolle, Peer-to-Peer-Erkennung und Relaiskoordination für die Nachrichtenzustellung.",
      fr: "Protocoles de transport, découverte peer-to-peer et coordination des relais pour la livraison de messages.",
      it: "Protocolli di trasporto, scoperta peer-to-peer e coordinamento dei relay per la consegna dei messaggi.",
      nl: "Transportprotocollen, peer-to-peer ontdekking en relaycoördinatie voor berichtbezorging.",
      cs: "Transportní protokoly, peer-to-peer objevování a koordinace relé pro doručování zpráv.",
      "zh-Hans": "传输协议、点对点发现和继电器协调，用于消息传递。",
      "zh-Hant": "傳輸協定、點對點發現和中繼協調，用於訊息傳遞。",
      es: "Protocolos de transporte, descubrimiento peer-to-peer y coordinación de relés para la entrega de mensajes.",
      pl: "Protokoły transportowe, wykrywanie peer-to-peer i koordynacja przekaźników dla dostarczania wiadomości.",
      ja: "メッセージ配信のためのトランスポートプロトコル、ピアツーピア検出、リレー調整。",
      th: "โปรโตคอลการขนส่ง การค้นพบ peer-to-peer และการประสานงานรีเลย์สำหรับการส่งข้อความ",
      fi: "Kuljetusprotokollat, vertaisverkon löytäminen ja releiden koordinointi viestien toimittamiseen.",
      uk: "Транспортні протоколи, виявлення peer-to-peer та координація ретрансляторів для доставки повідомлень.",
      bg: "Транспортни протоколи, откриване на peer-to-peer и координация на ретранслатори за доставка на съобщения.",
      tr: "Mesaj teslimi için taşıma protokolleri, peer-to-peer keşfi ve geçiş koordinasyonu.",
      hu: "Szállítási protokollok, peer-to-peer felfedezés és relé koordináció az üzenet kézbesítéshez.",
    },
    tone: "mesh",
  },
  {
    index: "05",
    name: {
      en: "Execution Layer",
      ru: "Слой выполнения",
      de: "Ausführungsschicht",
      fr: "Couche d'exécution",
      it: "Strato di esecuzione",
      nl: "Uitvoeringslaag",
      cs: "Prováděcí vrstva",
      "zh-Hans": "执行层",
      "zh-Hant": "執行層",
      es: "Capa de ejecución",
      pl: "Warstwa wykonawcza",
      ja: "実行レイヤー",
      th: "ชั้นการดำเนินการ",
      fi: "Suorituskerros",
      uk: "Шар виконання",
      bg: "Слой за изпълнение",
      tr: "Yürütme katmanı",
      hu: "Végrehajtó réteg",
    },
    responsibility: {
      en: "Message processing, queue management, and state transitions for conversation flow.",
      ru: "Обработка сообщений, управление очередями и переходы состояний для потока разговора.",
      de: "Nachrichtenverarbeitung, Queue-Verwaltung und Zustandsübergänge für den Gesprächsfluss.",
      fr: "Traitement des messages, gestion des files et transitions d'état pour le flux de conversation.",
      it: "Elaborazione dei messaggi, gestione delle code e transizioni di stato per il flusso di conversazione.",
      nl: "Berichtverwerking, wachtrijbeheer en statusovergangen voor de gespreksstroom.",
      cs: "Zpracování zpráv, správa front a přechody stavů pro tok konverzace.",
      "zh-Hans": "消息处理、队列管理和状态转换，用于对话流程。",
      "zh-Hant": "訊息處理、佇列管理和狀態轉換，用於對話流程。",
      es: "Procesamiento de mensajes, gestión de colas y transiciones de estado para el flujo de conversación.",
      pl: "Przetwarzanie wiadomości, zarządzanie kolejkami i przejścia stanów dla przepływu rozmowy.",
      ja: "会話フローのためのメッセージ処理、キュー管理、状態遷移。",
      th: "การประมวลผลข้อความ การจัดการคิว และการเปลี่ยนสถานะสำหรับกระแสการสนทนา",
      fi: "Viestien käsittely, jonon hallinta ja tilasiirtymät keskustelun kululle.",
      uk: "Обробка повідомлень, керування чергами та переходи станів для потоку розмови.",
      bg: "Обработка на съобщения, управление на опашки и преходи на състояния за поток на разговор.",
      tr: "Konuşma akışı için mesaj işleme, kuyruk yönetimi ve durum geçişleri.",
      hu: "Üzenet feldolgozás, sor kezelés és állapot átmenetek a beszélgetés áramláshoz.",
    },
    tone: "brand",
  },
  {
    index: "06",
    name: {
      en: "Data & Crypto Foundation",
      ru: "Основа данных и криптографии",
      de: "Daten- und Kryptografie-Grundlage",
      fr: "Fondation de données et de cryptographie",
      it: "Fondamento di dati e crittografia",
      nl: "Data- en cryptografie-fundering",
      cs: "Základ dat a kryptografie",
      "zh-Hans": "数据与密码学底座",
      "zh-Hant": "資料與密碼學底座",
      es: "Fundamento de datos y criptografía",
      pl: "Fundament danych i kryptografii",
      ja: "データと暗号の基盤",
      th: "รากฐานข้อมูลและการเข้ารหัส",
      fi: "Tieto- ja salausperusta",
      uk: "Основа даних та криптографії",
      bg: "Основа на данни и криптография",
      tr: "Veri ve şifreleme temeli",
      hu: "Adat és kriptográfia alap",
    },
    responsibility: {
      en: "End-to-end encryption, secure storage, and cryptographic primitives for data protection.",
      ru: "Сквозное шифрование, безопасное хранилище и криптографические примитивы для защиты данных.",
      de: "Ende-zu-Ende-Verschlüsselung, sichere Speicherung und kryptografische Primitive für den Datenschutz.",
      fr: "Chiffrement de bout en bout, stockage sécurisé et primitives cryptographiques pour la protection des données.",
      it: "Crittografia end-to-end, archiviazione sicura e primitive crittografiche per la protezione dei dati.",
      nl: "End-to-end versleuteling, veilige opslag en cryptografische primitieven voor gegevensbescherming.",
      cs: "End-to-end šifrování, bezpečné úložiště a kryptografické primitivy pro ochranu dat.",
      "zh-Hans": "端到端加密、安全存储和密码学原语，用于数据保护。",
      "zh-Hant": "端到端加密、安全儲存和密碼學原語，用於資料保護。",
      es: "Cifrado de extremo a extremo, almacenamiento seguro y primitivas criptográficas para la protección de datos.",
      pl: "Szyfrowanie end-to-end, bezpieczne przechowywanie i prymitywy kryptograficzne dla ochrony danych.",
      ja: "データ保護のためのエンドツーエンド暗号化、安全なストレージ、暗号プリミティブ。",
      th: "การเข้ารหัสแบบ end-to-end ที่เก็บข้อมูลที่ปลอดภัย และพื้นฐานการเข้ารหัสสำหรับการปกป้องข้อมูล",
      fi: "Päästä päähän -salaus, turvallinen tallennus ja kryptografiset alkeet tietosuojalle.",
      uk: "Наскрізне шифрування, безпечне зберігання та криптографічні примітиви для захисту даних.",
      bg: "Криптиране от край до край, сигурно съхранение и криптографски примитиви за защита на данните.",
      tr: "Veri koruması için uçtan uca şifreleme, güvenli depolama ve kriptografik ilkeller.",
      hu: "Végponttól végpontig terjedő titkosítás, biztonságos tárolás és kriptográfiai primitívek az adatvédelemhez.",
    },
    tone: "mesh",
  },
];

const HEAD: Record<"eyebrow" | "title" | "subtitle", Localized<string>> = {
  eyebrow: {
    en: "Six-layer architecture",
    ru: "Шестислойная архитектура",
    de: "Sechs-Schichten-Architektur",
    fr: "Architecture à six couches",
    it: "Architettura a sei strati",
    nl: "Zes-laagse architectuur",
    cs: "Šestivrstvá architektura",
    "zh-Hans": "六层架构",
    "zh-Hant": "六層架構",
    es: "Arquitectura de seis capas",
    pl: "Sześciowarstwowa architektura",
    ja: "6 層アーキテクチャ",
    th: "สถาปัตยกรรมหกชั้น",
    fi: "Kuusikerroksinen arkkitehtuuri",
    uk: "Шестишарова архітектура",
    bg: "Шестслойна архитектура",
    tr: "Altı katmanlı mimari",
    hu: "Hatréteges architektúra",
  },
  title: {
    en: "From experience to crypto foundation",
    ru: "От опыта до криптографической основы",
    de: "Vom Erlebnis zur Kryptografie-Grundlage",
    fr: "De l'expérience au fondement cryptographique",
    it: "Dall'esperienza al fondamento crittografico",
    nl: "Van ervaring tot cryptografie-fundering",
    cs: "Od zkušenosti po kryptografický základ",
    "zh-Hans": "从体验到密码学底座",
    "zh-Hant": "從體驗到密碼學底座",
    es: "De la experiencia al fundamento criptográfico",
    pl: "Od doświadczenia po fundament kryptograficzny",
    ja: "体験から暗号基盤まで",
    th: "จากประสบการณ์สู่รากฐานการเข้ารหัส",
    fi: "Kokemuksesta salausperustaan",
    uk: "Від досвіду до криптографічної основи",
    bg: "От опит до криптографска основа",
    tr: "Deneyimden şifreleme temeline",
    hu: "Élménytől a kriptográfiai alapig",
  },
  subtitle: {
    en: "Each layer has a single responsibility. The stack is auditable, replaceable, and verifiable at every level.",
    ru: "Каждый слой имеет одну ответственность. Стек аудируем, заменяем и проверяем на каждом уровне.",
    de: "Jede Schicht hat eine einzige Verantwortung. Der Stapel ist auf jeder Ebene prüfbar, ersetzbar und verifizierbar.",
    fr: "Chaque couche a une seule responsabilité. La pile est auditable, remplaçable et vérifiable à chaque niveau.",
    it: "Ogni strato ha una singola responsabilità. Lo stack è verificabile, sostituibile e controllabile a ogni livello.",
    nl: "Elke laag heeft één verantwoordelijkheid. De stapel is controleerbaar, vervangbaar en verifieerbaar op elk niveau.",
    cs: "Každá vrstva má jedinou odpovědnost. Zásobník je auditovatelný, nahraditelný a ověřitelný na každé úrovni.",
    "zh-Hans": "每一层只有一个职责。整个栈在每一层都是可审计、可替换、可验证的。",
    "zh-Hant": "每一層只有一個職責。整個堆疊在每一層都是可稽核、可替換、可驗證的。",
    es: "Cada capa tiene una única responsabilidad. La pila es auditable, reemplazable y verificable en cada nivel.",
    pl: "Każda warstwa ma jedną odpowiedzialność. Stos jest audytowalny, wymienialny i weryfikowalny na każdym poziomie.",
    ja: "各レイヤーには単一の責任があります。スタックはすべてのレベルで監査可能、置換可能、検証可能です。",
    th: "แต่ละชั้นมีความรับผิดชอบเดียว สแต็กสามารถตรวจสอบได้ แทนที่ได้ และยืนยันได้ในทุกระดับ",
    fi: "Jokaisella kerroksella on yksi vastuu. Pino on auditoitavissa, korvattavissa ja vahvistettavissa jokaisella tasolla.",
    uk: "Кожен шар має одну відповідальність. Стек можна аудитувати, замінювати та перевіряти на кожному рівні.",
    bg: "Всеки слой има една отговорност. Стекът е одитируем, заменим и проверим на всяко ниво.",
    tr: "Her katmanın tek bir sorumluluğu vardır. Yığın her seviyede denetlenebilir, değiştirilebilir ve doğrulanabilir.",
    hu: "Minden rétegnek egyetlen felelőssége van. A verem minden szinten ellenőrizhető, cserélhető és igazolható.",
  },
};

function LayerCard({ layer }: { layer: Layer }): ReactElement {
  const name = useCopy(layer.name);
  const responsibility = useCopy(layer.responsibility);

  return (
    <li className="animate-rise-in">
      <article className="glass glass-hover flex h-full flex-col gap-3 p-5">
        <header className="flex items-start gap-3">
          <span
            aria-hidden
            className={`font-mono text-[13px] font-semibold ${
              layer.tone === "brand" ? "text-brand-soft" : "text-mesh-soft"
            }`}
          >
            {layer.index}
          </span>
          <h3 className="text-[15.5px] font-semibold leading-snug text-white sm:text-[17px]">
            {name}
          </h3>
        </header>

        <p className="text-[13px] leading-relaxed text-mute">{responsibility}</p>
      </article>
    </li>
  );
}

export function ArchitectureLayers(): ReactElement {
  const title = useCopy(HEAD.title);

  return (
    <section id="architecture" aria-label={title} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={HEAD.eyebrow} title={HEAD.title} subtitle={HEAD.subtitle} titleAs="h2" />

        <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAYERS.map((layer) => (
            <LayerCard key={layer.index} layer={layer} />
          ))}
        </ul>
      </div>
    </section>
  );
}

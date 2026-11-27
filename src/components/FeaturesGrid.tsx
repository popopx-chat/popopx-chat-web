"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { LtrText } from "@/components/Ltr";
import { useCopy, type Localized } from "@/lib/i18n";
import { SectionHeading, StatusDot } from "@/components/ui";
import { IOS_REPO_URL } from "@/lib/site";

/**
 * 「iOS 客户端六大核心功能」 — six cards, each one read out of the open-source
 * client rather than written from a marketing brief. Zero exaggeration: every
 * number, type name, constant and file name below exists in that repo.
 *
 * Load-bearing citations (paths relative to the client repo root):
 *   apps/ios/POPOPX--iOS--Info.plist:63-83 ............ the 18 shipped localizations
 *   apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 ... no phone number, no email, no global public key
 *   apps/ios/POPOPXChat/APITypes.swift:589-615 .................. RcvQueueInfo / SndQueueInfo, sending_qadd / sending_quse / received_qend
 *   apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5,125 ..... Noise_XX_25519_ChaChaPoly_SHA256, nonce form
 *   apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/BLE/PopopxBLETransport.swift:26-49  CBCentralManager + CBPeripheralManager, queuedFramesPerLink = 64
 *   apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:6-19,268 ... dualChannel, 3 s SMP / 5 s BLE ACK
 *   apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375,731-745 .... no metadata dict, .ppxlz / PPXLZ1 / 15 %
 *   apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:381-421  pinned key, k-ad1dc5463a, fail-closed
 *   apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172 .. two tiers, rollback.json
 *   apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,360-368 ... six steps, 3 taps in 1.0 s, 15 s confirm
 *   apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341 .... popopx.channel.enc.v1, epoch key
 *
 * Copy follows the portal's authoring rule: a `Localized<T>` slot is a total map
 * over the 21 portal tags (the client's 18, then three additions), so every string here is written literally
 * in all 21 languages and a missing one is a compile error, not a fallback.
 * Protocol tokens, file names and byte counts stay locale-free.
 */

type Feature = {
  readonly index: string;
  readonly title: Localized<string>;
  readonly hook: Localized<string>;
  readonly facts: readonly Localized<string>[];
  /** Locale-free protocol token, verbatim from the source. */
  readonly chip: string;
  readonly tone: "brand" | "mesh";
};

const HEAD: Record<"eyebrow" | "title" | "subtitle", Localized<string>> = {
  eyebrow: {
    en: "iOS client · six core features",
    "pt-BR": "Cliente iOS · seis recursos principais",
    ko: "iOS 클라이언트 · 여섯 가지 핵심 기능",
    ar: "عميل iOS · ست ميزات أساسية",
    ru: "Клиент для iOS · шесть ключевых возможностей",
    de: "iOS-Client · sechs Kernfunktionen",
    fr: "Client iOS · six fonctions clés",
    it: "Client iOS · sei funzionalità principali",
    nl: "iOS-cliënt · zes kernfuncties",
    cs: "Klient pro iOS · šest klíčových funkcí",
    "zh-Hans": "iOS 客户端 · 六大核心功能",
    "zh-Hant": "iOS 客戶端 · 六大核心功能",
    es: "Cliente para iOS · seis funciones principales",
    pl: "Klient na iOS · sześć funkcji kluczowych",
    ja: "iOS クライアント · 6 つのコア機能",
    th: "ไคลเอนต์ iOS · หกฟีเจอร์หลัก",
    fi: "iOS-asiakas · kuusi ydintoimintoa",
    uk: "Клієнт для iOS · шість ключових можливостей",
    bg: "Клиент за iOS · шестте основни функции",
    tr: "iOS istemcisi · altı temel özellik",
    hu: "iOS kliens · hat alapfunkció",
  },
  title: {
    en: "The iOS client's six core features",
    "pt-BR": "Os seis recursos principais do cliente iOS",
    ko: "iOS 클라이언트의 여섯 가지 핵심 기능",
    ar: "الميزات الأساسية الست في عميل iOS",
    ru: "Шесть ключевых возможностей клиента для iOS",
    de: "Die sechs Kernfunktionen des iOS-Clients",
    fr: "Les six fonctions clés du client iOS",
    it: "Le sei funzionalità principali del client iOS",
    nl: "De zes kernfuncties van de iOS-cliënt",
    cs: "Šest klíčových funkcí iOS klienta",
    "zh-Hans": "iOS 客户端六大核心功能",
    "zh-Hant": "iOS 客戶端六大核心功能",
    es: "Las seis funciones principales del cliente iOS",
    pl: "Sześć kluczowych funkcji klienta iOS",
    ja: "iOS クライアントの 6 つのコア機能",
    th: "หกฟีเจอร์หลักของไคลเอนต์ iOS",
    fi: "iOS-asiakkaan kuusi ydintoimintoa",
    uk: "Шість ключових можливостей клієнта для iOS",
    bg: "Шестте основни функции на iOS клиента",
    tr: "iOS istemcisinin altı temel özelliği",
    hu: "Az iOS kliens hat alapfunkciója",
  },
  subtitle: {
    en: "Every number, type name and file name below is the code's own wording, checked in the open-source client — nothing is rounded up.",
    "pt-BR": "Cada número, nome de tipo e nome de arquivo abaixo é a redação do próprio código, conferida no cliente de código aberto — nada é arredondado para cima.",
    ko: "아래의 모든 숫자, 타입 이름, 파일 이름은 코드 자체의 표현이며 오픈 소스 클라이언트에서 확인했습니다. 부풀린 것은 없습니다.",
    ar: "كل عدد واسم نوع واسم ملف أدناه هو صياغة الشيفرة نفسها، مفحوصة في العميل مفتوح المصدر — ولا شيء مبالغ فيه.",
    ru: "Каждое число, имя типа и имя файла ниже взято из самого кода и проверено в клиенте с открытым исходным кодом — ничего не приукрашено.",
    de: "Jede Zahl, jeder Typname und jeder Dateiname unten ist der Wortlaut des Codes, geprüft im Open-Source-Client – nichts wird hochgerundet.",
    fr: "Chaque nombre, nom de type et nom de fichier ci-dessous est le mot du code lui-même, vérifié dans le client open source — rien n'est enjolivé.",
    it: "Ogni numero, nome di tipo e nome di file qui sotto è la formulazione del codice, verificata nel client open source: nulla è arrotondato per eccesso.",
    nl: "Elk getal, typenaam en bestandsnaam hieronder is de eigen tekst van de code, gecontroleerd in de open-source cliënt — niets wordt opgetuigd.",
    cs: "Každé číslo, název typu i název souboru níže je doslovný text kódu, ověřený v open-source klientovi — nic se nezveličuje.",
    "zh-Hans": "下面的每个数值、类型名和文件名都取自代码本身，并在开源客户端里核对过，没有任何夸大。",
    "zh-Hant": "下方的每個數值、型別名稱和檔名都取自程式碼本身，並在開放原始碼客戶端裡核對過，沒有任何誇大。",
    es: "Cada cifra, nombre de tipo y nombre de archivo a continuación es la formulación del propio código, verificada en el cliente de código abierto; nada se exagera.",
    pl: "Każda liczba, nazwa typu i nazwa pliku poniżej to dosłowny zapis z kodu, sprawdzony w kliencie open source — nic nie jest naciągane.",
    ja: "以下の数値・型名・ファイル名はすべてコードそのものの表記で、オープンソースのクライアントで確認しています。誇張はありません。",
    th: "ตัวเลข ชื่อชนิด และชื่อไฟล์ทั้งหมดด้านล่างเป็นการเขียนของโค้ดเอง ซึ่งตรวจสอบในไคลเอนต์โอเพนซอร์สแล้ว ไม่มีใด ๆ ถูกตกแต่งให้เกินจริง",
    fi: "Jokainen alla oleva luku, tyypin nimi ja tiedostonimi on koodin omaa sanamuotoa, tarkistettu avoimen lähdekoodin asiakkaasta — mitään ei kaunistella.",
    uk: "Кожне число, ім'я типу та ім'я файлу нижче — це власний формулювання коду, перевірені в клієнті з відкритим кодом; ніщо не перебільшене.",
    bg: "Всяко число, име на тип и име на файл по-долу са собствената формулировка на кода, проверена в клиента с отворен код — нищо не е преувеличено.",
    tr: "Aşağıdaki her sayı, tür adı ve dosya adı kodun kendi ifadesidir ve açık kaynaklı istemcide doğrulanmıştır; hiçbir şey abartılmaz.",
    hu: "Az alábbi minden szám, típusnév és fájlnév a kód saját megfogalmazása, ellenőrizve a nyílt forráskódú kliensben — semmit nem nagyítunk fel.",
  },
};

const FEATURES: readonly Feature[] = [
  {
    index: "01",
    tone: "brand",
    chip: "Noise_XX_25519_ChaChaPoly_SHA256",
    title: {
      en: "End-to-end encrypted queues, no global ID",
      "pt-BR": "Filas criptografadas ponta a ponta, sem ID global",
      ko: "종단간 암호화된 큐, 전역 ID 없음",
      ar: "طوابير مشفرة من الطرف إلى الطرف، بلا ID عالمي",
      ru: "Сквозное шифрование очередей без глобального ID",
      de: "Ende-zu-Ende-verschlüsselte Queues, kein globales ID",
      fr: "Files chiffrées de bout en bout, sans ID global",
      it: "Code cifrate end-to-end, nessun ID globale",
      nl: "Eind-tot-eind versleutelde wachtrijen, geen global ID",
      cs: "Koncové šifrované fronty, bez globálního ID",
      "zh-Hans": "单向队列端到端加密（无全局 ID）",
      "zh-Hant": "單向佇列端對端加密（無全域 ID）",
      es: "Colas cifradas de extremo a extremo, sin ID global",
      pl: "Kolejki szyfrowane end-to-end, bez globalnego ID",
      ja: "片方向キューのエンドツーエンド暗号化（グローバル ID なし）",
      th: "คิวเข้ารหัสต้นทางถึงปลายทาง โดยไม่มี ID สากล",
      fi: "Päästä päähän salautetut jonot, ei globaalia ID:tä",
      uk: "Наскрізне шифрування черг без глобального ID",
      bg: "Край до край криптирани опашки, без глобален ID",
      tr: "Uçtan uca şifreli kuyruklar, genel kimlik yok",
      hu: "Végpontok között titkosított sorok, globális ID nélkül",
    },
    hook: {
      en: "Sign-up asks for nothing: each connection is its own pair of queues, not one identity reused everywhere.",
      "pt-BR": "O cadastro não pede nada: cada conexão é o seu próprio par de filas, não uma identidade reutilizada em todo lugar.",
      ko: "가입은 아무것도 요구하지 않습니다. 각 연결은 어디서나 재사용되는 하나의 신원이 아니라 그 자체의 큐 쌍입니다.",
      ar: "لا يطلب التسجيل أي شيء: كل اتصال زوج طوابير خاص به، لا هوية واحدة تعاد في كل مكان.",
      ru: "Регистрация ничего не спрашивает: каждое соединение — это своя пара очередей, а не один ID на все случаи.",
      de: "Bei der Anmeldung wird nichts verlangt: jede Verbindung ist ihr eigenes Queue-Paar, nicht eine überall wiederverwendete Identität.",
      fr: "L'inscription ne demande rien : chaque connexion forme son propre couple de files, et non une identité resservie partout.",
      it: "L'iscrizione non chiede nulla: ogni connessione è una coppia di code a sé, non un'identità riusata ovunque.",
      nl: "Registratie vraagt om niets: elke verbinding is haar eigen paar wachtrijen, niet één identiteit overal hergebruikt.",
      cs: "Registrace nechce nic: každé spojení je vlastní dvojfronta, nikoli jedna identita používaná všude.",
      "zh-Hans": "注册什么都不要：每条连接都是独立的一对队列，而不是处处复用的一个身份。",
      "zh-Hant": "註冊什麼都不必給：每條連線都是獨立的一對佇列，而不是四處重複使用的一個身分。",
      es: "El registro no pide nada: cada conexión es su propio par de colas, no una identidad reutilizada en todas partes.",
      pl: "Rejestracja o nic nie prosi: każde połączenie to własna para kolejek, a nie jedna tożsamość używana wszędzie.",
      ja: "登録は任何の情報も求めません。各接続は独自のキューの組であり、至る所で使い回す身分ではありません。",
      th: "การลงทะเบียนไม่ต้องให้อะไรเลย: แต่ละการเชื่อมต่อคือคิวเป็นคู่ของมันเอง ไม่ใช่ตัวตนเดียวที่ใช้ซ้ำทุกที่",
      fi: "Rekisteröinti ei kysy mitään: jokainen yhteys on oma jonoparinsa, ei kaikkialle uusiokäytetty henkilöllisyys.",
      uk: "Реєстрація нічого не запитує: кожне з'єднання — це власна пара черг, а не один ID, використаний усюди.",
      bg: "Регистрацията не изисква нищо: всяка връзка е собствена двойка опашки, а не един самоличност, преизползван навсякъде.",
      tr: "Kayıt hiçbir şey istemiyor: her bağlantı kendi kuyruk çiftidir, her yerde yeniden kullanılan bir kimlik değil.",
      hu: "A regisztráció semmit nem kér: minden kapcsolat saját sorpár, nem pedig mindenhol újrahasznált személyazonosság.",
    },
    facts: [
      {
        en: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 says it in one line: no phone number, no email, no global public key — and no phoneNumber field exists in any model.",
        "pt-BR": "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 diz isso em uma linha: sem número de telefone, sem e-mail, sem chave pública global — e não existe campo phoneNumber em nenhum modelo.",
        ko: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83이 한 줄로 말합니다. 전화번호 없음, 이메일 없음, 전역 공개 키 없음 — 그리고 어떤 모델에도 phoneNumber 필드는 존재하지 않습니다.",
        ar: "يقول apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 ذلك في سطر واحد: لا رقم هاتف، ولا بريد إلكتروني، ولا مفتاح عام عالمي — ولا يوجد حقل phoneNumber في أي نموذج.",
        ru: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 говорит это в одну строку: ни номера телефона, ни почты, ни глобального открытого ключа — и поля phoneNumber нет ни в одной модели.",
        de: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 sagt es in einer Zeile: keine Telefonnummer, keine E-Mail, kein globales öffentliches Schlüssel – und ein Feld phoneNumber existiert in keinem Modell.",
        fr: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 le dit en une ligne : pas de numéro de téléphone, pas d'e-mail, pas de clé publique globale — et aucun champ phoneNumber n'existe dans un modèle.",
        it: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 lo dice in una riga: nessun numero di telefono, nessuna email, nessuna chiave pubblica globale; e il campo phoneNumber non esiste in alcun modello.",
        nl: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 zegt het in één regel: geen telefoonnummer, geen e-mail, geen globale publieke sleutel — en geen veld phoneNumber bestaat in enig model.",
        cs: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 říká jednu řádku: žádné telefonní číslo, žádný e-mail, žádný globální veřejný klíč — a žádný řádek phoneNumber neexistuje v žádném modelu.",
        "zh-Hans": "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 一句话说清：不要手机号、不要邮箱、没有全局公钥，模型里也不存在 phoneNumber 字段。",
        "zh-Hant": "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 一句話說清楚：不要手機號、不要電子郵件、沒有全域公鑰，模型裡也不存在 phoneNumber 欄位。",
        es: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 lo dice en una línea: sin número de teléfono, sin correo, sin clave pública global; y ningún modelo tiene un campo phoneNumber.",
        pl: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 mówi to jednym zdaniem: bez numeru telefonu, bez e-maila, bez globalnego klucza publicznego — i żaden model nie ma pola phoneNumber.",
        ja: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 は一行で言い切っています。電話番号もメールもグローバルな公開鍵も不要で、どのモデルにも phoneNumber フィールドはありません。",
        th: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 ระบุไว้ในบรรทัดเดียว: ไม่ต้องการเบอร์โทร ไม่ต้องการอีเมล ไม่มีสาธารณะคีย์ระดับโลก และไม่มีฟิลด์ phoneNumber ในโมเดลใด",
        fi: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 sanoo sen yhdellä rivillä: ei puhelinnumeroa, ei sähköpostia, ei globaalia julkista avainta — eikä phoneNumber-kenttää ole missään mallissa.",
        uk: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 каже це одним рядком: без номера телефону, без пошти, без глобального відкритого ключа — і поля phoneNumber немає жодній моделі.",
        bg: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 го казва с един ред: без телефонен номер, без имейл, без глобален обществен ключ — и няма поле phoneNumber в нито един модел.",
        tr: "apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 bunu tek satırda söylüyor: telefon numarası yok, e-posta yok, genel açık anahtar yok — ve hiçbir modelde phoneNumber alanı yok.",
        hu: "Az apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83 egy sorban kimondja: nincs telefonszám, nincs e-mail, nincs globális nyilvános kulcs — és egyetlen modellben sem létezik phoneNumber mező.",
      },
      {
        en: "A connection is a queue pair: RcvQueueInfo and SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) carry a server host and a queue, switching via sending_qadd, sending_quse and received_qend.",
        "pt-BR": "Uma conexão é um par de filas: RcvQueueInfo e SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) carregam um host de servidor e uma fila, alternando via sending_qadd, sending_quse e received_qend.",
        ko: "연결은 큐 쌍입니다. RcvQueueInfo와 SndQueueInfo(apps/ios/POPOPXChat/APITypes.swift:589-615)는 서버 호스트와 큐를 담고 있으며, sending_qadd, sending_quse, received_qend를 통해 전환합니다.",
        ar: "الاتصال زوج طوابير: يحمل RcvQueueInfo وSndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) مضيف خادم وطابور، ويجري التبديل عبر sending_qadd وsending_quse وreceived_qend.",
        ru: "Соединение — это пара очередей: RcvQueueInfo и SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) несут лишь хост сервера и очередь, переключаясь через sending_qadd, sending_quse и received_qend.",
        de: "Eine Verbindung ist ein Queue-Paar: RcvQueueInfo und SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) tragen nur einen Server-Host und eine Queue, mit Wechsel über sending_qadd, sending_quse und received_qend.",
        fr: "Une connexion est un couple de files : RcvQueueInfo et SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) portent un hôte de serveur et une file, avec les états sending_qadd, sending_quse et received_qend.",
        it: "Una connessione è una coppia di code: RcvQueueInfo e SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) portano host del server e coda, passando per sending_qadd, sending_quse e received_qend.",
        nl: "Een verbinding is een paar wachtrijen: RcvQueueInfo en SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) dragen een serverhost en een wachtrij, met switch via sending_qadd, sending_quse en received_qend.",
        cs: "Spojení je dvojfronta: RcvQueueInfo a SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) nesou host serveru a frontu a přepínají přes sending_qadd, sending_quse a received_qend.",
        "zh-Hans": "一条连接就是一对队列：RcvQueueInfo 和 SndQueueInfo（apps/ios/POPOPXChat/APITypes.swift:589-615）只带服务器主机和队列，切换状态是 sending_qadd、sending_quse、received_qend。",
        "zh-Hant": "一條連線就是一對佇列：RcvQueueInfo 與 SndQueueInfo（apps/ios/POPOPXChat/APITypes.swift:589-615）只帶伺服器主機與佇列，切換狀態為 sending_qadd、sending_quse、received_qend。",
        es: "Una conexión es un par de colas: RcvQueueInfo y SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) llevan un host del servidor y una cola, conmutando mediante sending_qadd, sending_quse y received_qend.",
        pl: "Połączenie to para kolejek: RcvQueueInfo i SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) niosą host serwera i kolejkę, przełączając się przez sending_qadd, sending_quse i received_qend.",
        ja: "接続とはキューの組です。RcvQueueInfo と SndQueueInfo（apps/ios/POPOPXChat/APITypes.swift:589-615）が持つのはサーバーホストとキューだけで、切替は sending_qadd、sending_quse、received_qend で進みます。",
        th: "การเชื่อมต่อคือคิวเป็นคู่: RcvQueueInfo และ SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) ถือเฉพาะโฮสต์ของเซิร์ฟเวอร์กับคิว สลับผ่าน sending_qadd, sending_quse และ received_qend",
        fi: "Yhteys on jonopari: RcvQueueInfo ja SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) sisältävät palvelin-isännän ja jonon, ja vaihto kulkee sending_qadd, sending_quse ja received_qend -tilojen kautta.",
        uk: "З'єднання — це пара черг: RcvQueueInfo та SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) несуть лише хост сервера і чергу, а перемикання йде через sending_qadd, sending_quse та received_qend.",
        bg: "Връзката е двойка опашки: RcvQueueInfo и SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) носят хост на сървъра и опашка, превключвайки през sending_qadd, sending_quse и received_qend.",
        tr: "Bir bağlantı bir kuyruk çiftidir: RcvQueueInfo ve SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) yalnızca bir sunucu ana makinesi ve bir kuyruk taşır; geçiş sending_qadd, sending_quse ve received_qend ile olur.",
        hu: "Egy kapcsolat egy sorpár: a RcvQueueInfo és a SndQueueInfo (apps/ios/POPOPXChat/APITypes.swift:589-615) csak a kiszolgáló hostnevét és a sort hordozza, a váltás sending_qadd, sending_quse és received_qend állapotokon megy át.",
      },
      {
        en: "The transport is a hand-written Noise_XX_25519_ChaChaPoly_SHA256 on CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); the only address a user ever mints is one-time, via PopopxInviteLink.mintOneTime.",
        "pt-BR": "O transporte é um Noise_XX_25519_ChaChaPoly_SHA256 escrito à mão sobre o CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); o único endereço que um usuário gera é de uso único, via PopopxInviteLink.mintOneTime.",
        ko: "전송 계층은 CryptoKit 위에 직접 작성한 Noise_XX_25519_ChaChaPoly_SHA256입니다(apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5). 사용자가 발급하는 유일한 주소는 PopopxInviteLink.mintOneTime을 통한 일회성 주소입니다.",
        ar: "النقل هو Noise_XX_25519_ChaChaPoly_SHA256 مكتوب باليد على CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5)؛ والعنوان الوحيد الذي يصدره المستخدم قط هو عنوان لمرة واحدة، عبر PopopxInviteLink.mintOneTime.",
        ru: "Транспорт — самописный Noise_XX_25519_ChaChaPoly_SHA256 на CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); единственный выдаваемый пользователем адрес — одноразовый, через PopopxInviteLink.mintOneTime.",
        de: "Der Transport ist ein handgeschriebenes Noise_XX_25519_ChaChaPoly_SHA256 auf CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); die einzige Adresse, die ein Nutzer je prägt, ist einmalig – via PopopxInviteLink.mintOneTime.",
        fr: "Le transport est un Noise_XX_25519_ChaChaPoly_SHA256 écrit à la main sur CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5) ; la seule adresse qu'un utilisateur fabrique est à usage unique, via PopopxInviteLink.mintOneTime.",
        it: "Il trasporto è un Noise_XX_25519_ChaChaPoly_SHA256 scritto a mano su CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); l'unica indirizzo che un utente conia è monouso, tramite PopopxInviteLink.mintOneTime.",
        nl: "De transportlaag is een handgeschreven Noise_XX_25519_ChaChaPoly_SHA256 op CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); het enige adres een gebruiker munt is eenmalig, via PopopxInviteLink.mintOneTime.",
        cs: "Transport je ručně napsaný Noise_XX_25519_ChaChaPoly_SHA256 nad CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); jediná adresa, kterou uživatel vyrobí, je jednorázová přes PopopxInviteLink.mintOneTime.",
        "zh-Hans": "传输层是手写在 CryptoKit 上的 Noise_XX_25519_ChaChaPoly_SHA256（apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5）；用户唯一会铸造的地址是一次性的，由 PopopxInviteLink.mintOneTime 生成。",
        "zh-Hant": "傳輸層是手寫在 CryptoKit 上的 Noise_XX_25519_ChaChaPoly_SHA256（apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5）；使用者唯一會產生的位址是一次性的，由 PopopxInviteLink.mintOneTime 產生。",
        es: "El transporte es un Noise_XX_25519_ChaChaPoly_SHA256 escrito a mano sobre CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); la única dirección que un usuario acuña es de un solo uso, mediante PopopxInviteLink.mintOneTime.",
        pl: "Warstwa transportu to ręcznie napisany Noise_XX_25519_ChaChaPoly_SHA256 na CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); jedyny adres, który użytkownik wybija, jest jednorazowy — przez PopopxInviteLink.mintOneTime.",
        ja: "トランスポートは CryptoKit 上に手書きされた Noise_XX_25519_ChaChaPoly_SHA256 です（apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5）。ユーザーが採番するアドレスは一回限りのものだけで、PopopxInviteLink.mintOneTime が生成します。",
        th: "ชั้นทรานสปอร์ตคือ Noise_XX_25519_ChaChaPoly_SHA256 ที่เขียนด้วยมือบน CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5) และที่อยู่เดียวที่ผู้ใช้สร้างได้คือแบบใช้ครั้งเดียว ผ่าน PopopxInviteLink.mintOneTime",
        fi: "Kerros on käsin kirjoitettu Noise_XX_25519_ChaChaPoly_SHA256 CryptoKitin päällä (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); ainoa osoite, jonka käyttäjä koskaan lyö, on kertakäyttöinen PopopxInviteLink.mintOneTime-funktiolla.",
        uk: "Транспорт — це самописний Noise_XX_25519_ChaChaPoly_SHA256 на CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); єдина адреса, яку користувач карбує, є одноразовою, через PopopxInviteLink.mintOneTime.",
        bg: "Транспортът е ръчно написан Noise_XX_25519_ChaChaPoly_SHA256 върху CryptoKit (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); единственият адрес, който потребителят отсича, е еднократен, през PopopxInviteLink.mintOneTime.",
        tr: "Taşıma katmanı, CryptoKit üzerinde elle yazılmış bir Noise_XX_25519_ChaChaPoly_SHA256'dır (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); bir kullanıcının ürettiği tek adres, PopopxInviteLink.mintOneTime ile oluşturulan tek kullanımlık adrestir.",
        hu: "Az átviteli réteg a CryptoKitre kézzel írt Noise_XX_25519_ChaChaPoly_SHA256 (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5); az egyetlen cím, amelyet egy felhasználó valaha ver ki, egyszerűen egyszer használható — a PopopxInviteLink.mintOneTime segítségével.",
      },
    ],
  },
  {
    index: "02",
    tone: "mesh",
    chip: "dualChannel",
    title: {
      en: "Offline routing with direct BLE relay",
      "pt-BR": "Roteamento offline com retransmissão BLE direta",
      ko: "직접 BLE 중계를 통한 오프라인 라우팅",
      ar: "توجيه دون اتصال مع مرحّل BLE مباشر",
      ru: "Автономная маршрутизация и прямое BLE-ретранслирование",
      de: "Offline-Routing mit direktem BLE-Relais",
      fr: "Routage hors ligne avec relais BLE direct",
      it: "Routing offline con relay BLE diretto",
      nl: "Offline routeren met directe BLE-relais",
      cs: "Offline směrování s přímým BLE relayem",
      "zh-Hans": "离线路由与 BLE 直连中继",
      "zh-Hant": "離線路由與 BLE 直連中繼",
      es: "Enrutado sin conexión con retransmisión BLE directa",
      pl: "Routing offline z bezpośrednim przekaźnikiem BLE",
      ja: "オフラインルーティングと BLE 直結中継",
      th: "การกำหนดเส้นทางแบบออฟไลน์กับการส่งต่อ BLE ตรง",
      fi: "Offline-reititys suoralla BLE-välityksellä",
      uk: "Автономна маршрутизація та прямий BLE-ретранслятор",
      bg: "Офлайн маршрутизация с директно BLE препредаване",
      tr: "Çevrimdışı yönlendirme ve doğrudan BLE aktarımı",
      hu: "Offline útvonalválasztás közvetlen BLE-továbbítással",
    },
    hook: {
      en: "Two roles in one radio object, and a router that picks whichever path can carry the message right now.",
      "pt-BR": "Dois papéis em um único objeto de rádio, e um roteador que escolhe o caminho que consegue levar a mensagem agora.",
      ko: "하나의 무선 객체에 두 역할이 있고, 지금 메시지를 실어 나를 수 있는 경로를 고르는 라우터가 있습니다.",
      ar: "دوران في كائن راديو واحد، وموجّه يختار أي مسار يستطيع حمل الرسالة الآن.",
      ru: "Две роли в одном радио-объекте и маршрутизатор, выбирающий тот канал, который может отправить сообщение прямо сейчас.",
      de: "Zwei Rollen in einem Radio-Objekt, und ein Router, der den Pfad wählt, der die Nachricht gerade tragen kann.",
      fr: "Deux rôles dans un seul objet radio, et un routeur qui choisit le chemin capable de porter le message maintenant.",
      it: "Due ruoli in un unico oggetto radio e un router che sceglie il percorso che può trasportare il messaggio adesso.",
      nl: "Twee rollen in één radio-object, en een router die het pad kiest dat het bericht nu kan dragen.",
      cs: "Dvě role v jednom radiovém objektu a router, který volí cestu, jež zprávu právě teď unese.",
      "zh-Hans": "一个蓝牙对象兼任两种角色，路由器只挑此刻能把消息送出去的那条路。",
      "zh-Hant": "一個藍牙物件兼任兩種角色，路由器只挑此刻能把訊息送出去的那條路。",
      es: "Dos roles en un solo objeto de radio y un enrutador que elige la ruta que puede llevar el mensaje en este momento.",
      pl: "Dwie role w jednym obiekcie radiowym i router wybierający tę ścieżkę, która właśnie teraz uniesie wiadomość.",
      ja: "1 つのラジオオブジェクトが 2 つの役割を担い、ルーターは「今送れる経路」を選びます。",
      th: "หนึ่งวัตถุวิทยุรับสองบทบาท และเราเตอร์เลือกเส้นทางที่ส่งข้อความได้ในขณะนั้น",
      fi: "Kaksi roolia yhdessä radio-oliossa, ja reititin valitsee sen reitin, joka voi viedä viestin juuri nyt.",
      uk: "Дві ролі в одному радіооб'єкті та маршрутизатор, що обирає той канал, який може надіслати повідомлення просто зараз.",
      bg: "Две роли в един радиообект и маршрутизатор, който избира пътя, способен да пренесе съобщението точно сега.",
      tr: "Tek bir radyo nesnesinde iki rol ve mesajı şu anda taşıyabilecek yolu seçen bir yönlendirici.",
      hu: "Két szerep egy rádiós objektumban, és egy útvonalválasztó, amely mindig azt az utat választja, amelyik most elviszi az üzenetet.",
    },
    facts: [
      {
        en: "PopopxBLETransport holds a CBCentralManager and a CBPeripheralManager at the same time under one service UUID, so a neighbour can dial us while we dial it; each link buffers at most 64 frames.",
        "pt-BR": "O PopopxBLETransport mantém um CBCentralManager e um CBPeripheralManager ao mesmo tempo sob um único UUID de serviço, então um vizinho pode nos chamar enquanto chamamos ele; cada link armazena no máximo 64 quadros.",
        ko: "PopopxBLETransport는 하나의 서비스 UUID 아래에서 CBCentralManager와 CBPeripheralManager를 동시에 보유하므로, 우리가 이웃에 접속하는 동안 이웃도 우리에게 접속할 수 있습니다. 각 링크는 최대 64개 프레임을 버퍼링합니다.",
        ar: "يحمل PopopxBLETransport كائن CBCentralManager وكائن CBPeripheralManager في الوقت نفسه تحت UUID خدمة واحد، فيستطيع جار أن يتصل بنا بينما نتصل به؛ وكل رابط يخزن 64 إطار في الذاكرة المؤقتة على الأكثر.",
        ru: "PopopxBLETransport одновременно держит CBCentralManager и CBPeripheralManager под одним UUID сервиса, поэтому сосед может позвонить нам, пока звоним ему; каждая линия буферизует не более 64 кадров.",
        de: "PopopxBLETransport hält zugleich einen CBCentralManager und einen CBPeripheralManager unter einer Service-UUID, ein Nachbar kann uns also anrufen, während wir ihn anrufen; jede Verbindung puffert höchstens 64 Rahmen.",
        fr: "PopopxBLETransport conserve à la fois un CBCentralManager et un CBPeripheralManager sous un seul UUID de service, un voisin peut donc nous appeler pendant que nous l'appelons ; chaque lien met en tampon au plus 64 trames.",
        it: "PopopxBLETransport contiene contemporaneamente un CBCentralManager e un CBPeripheralManager sotto un unico service UUID, quindi un vicino può chiamare noi mentre noi chiamiamo lui; ogni collegamento memorizza al più 64 frame.",
        nl: "PopopxBLETransport houdt gelijktijdig een CBCentralManager en een CBPeripheralManager aan onder één service-UUID, dus een buur kan ons bellen terwijl wij die bellen; elke link buffert maximaal 64 frames.",
        cs: "PopopxBLETransport drží zároveň CBCentralManager i CBPeripheralManager pod jedním UUID služby, takže soused může volat nás, zatímco my voláme jeho; každý odkaz bufferuje nejvýše 64 rámů.",
        "zh-Hans": "PopopxBLETransport 在同一个服务 UUID 下同时持有 CBCentralManager 和 CBPeripheralManager，邻居可以呼我们、我们也能呼邻居；每条链路最多缓存 64 帧。",
        "zh-Hant": "PopopxBLETransport 在同一個服務 UUID 下同時持有 CBCentralManager 與 CBPeripheralManager，鄰居可以呼叫我們、我們也能呼叫鄰居；每條連結最多緩衝 64 幀。",
        es: "PopopxBLETransport mantiene a la vez un CBCentralManager y un CBPeripheralManager bajo un único UUID de servicio, así un vecino nos llama mientras nosotros le llamamos; cada enlace almacena como máximo 64 cuadros.",
        pl: "PopopxBLETransport trzyma jednocześnie CBCentralManager i CBPeripheralManager pod jednym UUID usługi, więc sąsiad może do nas dzwonić, gdy my dzwonimy do niego; każde łącze buforuje co najwyżej 64 ramek.",
        ja: "PopopxBLETransport は 1 つのサービス UUID の下に CBCentralManager と CBPeripheralManager を同時に保持するため、相手から呼ばれながらこちらも呼べます。リンクごとに溜められるのは最大 64 フレームです。",
        th: "PopopxBLETransport ถือ CBCentralManager และ CBPeripheralManager พร้อมกันใต้ service UUID เดียว จึงรับสายจากเพื่อนบ้านได้ในขณะที่เราโทรหาเขา และแต่ละลิงก์จะบัฟเฟอร์ได้สูงสุด 64 เฟรม",
        fi: "PopopxBLETransport pitää samanaikaisesti CBCentralManagerin ja CBPeripheralManagerin yhden palvelu-UUID:n alla, joten naapuri voi soittaa meille samaan aikaan kun soitamme sille; jokainen linkki puskuroi enintään 64 kehystä.",
        uk: "PopopxBLETransport одночасно тримає CBCentralManager і CBPeripheralManager під одним UUID сервісу, тому сусід може телефонувати до нас, поки ми телефонуємо до нього; кожне з'єднання буферизує щонайбільше 64 кадри.",
        bg: "PopopxBLETransport държи едновременно CBCentralManager и CBPeripheralManager под един service UUID, така че съсед да се обажда на нас, докато ние се обаждаме на него; всяка връзка буферира най-много 64 кадъра.",
        tr: "PopopxBLETransport tek bir hizmet UUID'si altında aynı anda bir CBCentralManager ve bir CBPeripheralManager tutar; böylece bir komşu biz ararken bizi arayabilir, her bağlantıda en çok 64 çerçeve tamponlanır.",
        hu: "A PopopxBLETransport egyetlen service UUID alatt egyszerre tart egy CBCentralManager-t és egy CBPeripheralManager-t, így a szomszéd hív minket, miközben mi hívjuk őt; linkenként legfeljebb 64 keret pufferelődik.",
      },
      {
        en: "The route switch is the status case dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): with no SMP ACK in 3 s the same message goes out over the radio at the same time, and BLE stops after 5 s.",
        "pt-BR": "A troca de rota é o caso de status dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): sem ACK do SMP em 3 s, a mesma mensagem sai pelo rádio ao mesmo tempo, e o BLE para após 5 s.",
        ko: "경로 전환은 상태 케이스 dualChannel입니다(apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268). 3 s 안에 SMP ACK가 없으면 같은 메시지가 동시에 무선으로도 나가고, BLE는 5 s 후에 멈춥니다.",
        ar: "مفتاح المسار هو الحالة dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): فبدون SMP ACK خلال 3 s تخرج الرسالة نفسها عبر الراديو في الوقت نفسه، ويتوقف BLE بعد 5 s.",
        ru: "Переключение маршрута — это статус dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): без SMP-ACK за 3 с то же сообщение параллельно уходит по радио, а BLE прекращает после 5 с.",
        de: "Der Umschalter ist der Status-Fall dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): bleibt der SMP-ACK 3 s aus, geht dieselbe Nachricht gleichzeitig auch übers Radio, und BLE endet nach 5 s.",
        fr: "Le basculement est le cas de statut dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268) : sans ACK SMP sous 3 s, le même message part aussi par la radio en parallèle, et BLE s'arrête après 5 s.",
        it: "Il cambio di rotta è il caso di stato dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): senza ACK SMP entro 3 s lo stesso messaggio esce anche per radio, in parallelo, e BLE si ferma dopo 5 s.",
        nl: "De routewissel is de statuscase dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): zonder SMP-ACK binnen 3 s gaat hetzelfde bericht tegelijk ook via de radio, en BLE stopt na 5 s.",
        cs: "Přepínač trasy je stav dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): bez SMP ACK do 3 s jde stejná zpráva souběžně i rádiem a BLE končí po 5 s.",
        "zh-Hans": "路由切换就是状态 dualChannel（apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268）：3 秒内没等到 SMP 的 ACK，同一条消息会同时再走一次无线电，BLE 则在 5 秒后放弃。",
        "zh-Hant": "路由切換就是狀態 dualChannel（apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268）：3 秒內沒等到 SMP 的 ACK，同一則訊息會同時再走一次無線電，BLE 則在 5 秒後放棄。",
        es: "El conmutador de ruta es el caso de estado dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): sin ACK de SMP en 3 s el mismo mensaje sale también por radio en paralelo, y BLE se detiene a los 5 s.",
        pl: "Przełącznikiem trasy jest przypadek statusu dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): brak ACK SMP w 3 s sprawia, że ta sama wiadomość idzie równolegle radiem, a BLE rezygnuje po 5 s.",
        ja: "経路の切り出しはステータス case dualChannel です（apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268）。3 秒以内に SMP の ACK が無い場合、同じメッセージを同時に電波にも流し、BLE は 5 秒で諦めます。",
        th: "จุดสลับเส้นทางคือสถานะ dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): หากไม่มี SMP ACK ภายใน 3 s ข้อความเดิมจะถูกส่งออกไปทางวิทยุพร้อมกันด้วย และ BLE จะยอมแพ้หลัง 5 s",
        fi: "Reitin vaihto on status-tapaus dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): jos SMP-ACK ei tule 3 sekunnissa, sama viesti lähtee rinnan myös radiotaitse, ja BLE luovuttaa 5 sekunnin jälkeen.",
        uk: "Перемикання маршруту — це статус dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): без SMP ACK за 3 с те саме повідомлення паралельно іде радіоканалом, а BLE припиняє після 5 с.",
        bg: "Преключвачът на маршрута е статусният случай dualChannel (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): без SMP ACK за 3 s съобщението излиза едновременно и по радиото, а BLE се отказва след 5 s.",
        tr: "Yön değiştirici, durum durumu dualChannel'dır (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): 3 s içinde SMP ACK gelmezse aynı mesaj eş zamanlı olarak radyo üzerinden de gönderilir, BLE ise 5 s sonra vazgeçer.",
        hu: "Az útvonalváltó a dualChannel státusz-case (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:268): ha 3 másodpercen belül nem érkezik SMP ACK, ugyanaz az üzenet párhuzamosan rádióra is megy, a BLE pedig 5 másodperc után feladja.",
      },
      {
        en: "Flooded frames are deduplicated with a Golomb-coded set, serialized as version(1), p(1), M(4) and a Golomb-Rice bitstream (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), and every radio frame is sealed by NOISE.",
        "pt-BR": "Os quadros inundados são deduplicados com um conjunto codificado por Golomb, serializado como version(1), p(1), M(4) e um fluxo de bits Golomb-Rice (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), e cada quadro de rádio é selado por NOISE.",
        ko: "플러딩된 프레임은 Golomb-coded set으로 중복 제거되며, version(1), p(1), M(4)와 Golomb-Rice 비트스트림으로 직렬화되고(apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), 모든 무선 프레임은 NOISE로 봉인됩니다.",
        ar: "ويجري إزالة تكرارات الإطارات المغرقة بمجموعة مرمزة بـGolomb، مسلسلة كـversion(1) وp(1) وM(4) وتدفق بتات Golomb-Rice (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12)؛ وكل إطار راديو مختوم بـNOISE.",
        ru: "Затопленные кадры дедуплицируются множеством Голума, сериализуемым как version(1), p(1), M(4) и битпоток Голума-Райса (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), и каждый радиокадр запечатан NOISE.",
        de: "Geflutete Rahmen werden mit einem Golomb-Coded-Set dedupliziert, serialisiert als version(1), p(1), M(4) und einem Golomb-Rice-Bitstrom (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), und jeder Funkrahmen ist von NOISE versiegelt.",
        fr: "Les trames inondées sont dédupliquées par un ensemble de Golomb, sérialisé en version(1), p(1), M(4) et un flux de bits Golomb-Rice (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), et chaque trame radio est scellée par NOISE.",
        it: "I frame in flood vengono deduplicati con un Golomb-coded set, serializzato come version(1), p(1), M(4) e un bitstream Golomb-Rice (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), e ogni frame radio è sigillato da NOISE.",
        nl: "Gefloode frames worden ontdubbeld met een Golomb-coded set, geserialiseerd als version(1), p(1), M(4) en een Golomb-Rice-bitstream (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), en elk radioframe wordt door NOISE verzegeld.",
        cs: "Zaplavené rámy se deduplikují Golomb-coded setem, serializovaným jako version(1), p(1), M(4) a Golomb-Rice bitstream (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), a každý rádiový rám je zapečetěn NOISE.",
        "zh-Hans": "洪泛帧用 Golomb 编码集合去重，序列化为 version(1)、p(1)、M(4) 加一段 Golomb-Rice 位流（apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12），而每个无线电帧都由 NOISE 封好。",
        "zh-Hant": "氾溢幀用 Golomb 編碼集合去重，序列化為 version(1)、p(1)、M(4) 加一段 Golomb-Rice 位元流（apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12），而每個無線電幀都由 NOISE 封存。",
        es: "Los cuadros inundados se deduplican con un conjunto Golomb-coded, serializado como version(1), p(1), M(4) y un flujo de bits Golomb-Rice (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), y cada cuadro de radio está sellado por NOISE.",
        pl: "Rozgłaszane ramki są oddużowane za pomocą zbioru Golomb-coded, serializowanego jako version(1), p(1), M(4) i strumień bitów Golomb-Rice (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), a każda ramka radiowa jest pieczętowana przez NOISE.",
        ja: "フラッドしたフレームは Golomb-coded set で重複排除します。serialize は version(1)、p(1)、M(4) に Golomb-Rice のビット列です（apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12）。電波に出るフレームはすべて NOISE で封をされます。",
        th: "เฟรมที่แพร่กระจายแบบ flood จะถูกกำจัดซ้ำด้วย Golomb-coded set ซึ่งถูกเรียงลำดับเป็น version(1), p(1), M(4) และบิตสตรีมแบบ Golomb-Rice (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12) และทุกเฟรมวิทยุจะถูกผนึกด้วย NOISE",
        fi: "Yleislähetyksen kehykset yksilöidään Golomb-koodatulla joukolla, serialisoituna version(1), p(1), M(4) ja Golomb-Rice-bittivirtana (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), ja jokaisen radiokehyksen sinetöi NOISE.",
        uk: "Затоплені кадри дедуплікуються множином Голомба, серіалізованою як version(1), p(1), M(4) та бітпотік Голомба-Райса (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), і кожен радіокадр запечатаний NOISE.",
        bg: "Наводнените кадри се дедупликират с Множество на Голомб, сериализирано като version(1), p(1), M(4) и Голомб-Райс битов поток (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), и всеки радиокадр е запечатан от NOISE.",
        tr: "Taşan çerçeveler, version(1), p(1), M(4) ve bir Golomb-Rice bit akışı olarak serialize edilen Golomb kodlu bir küme ile tekilleştirilir (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12) ve her radyo çerçevesi NOISE tarafından mühürlenir.",
        hu: "Az elárasztott kereteket egy Golomb-kódolt halmazzal deduplikáljuk, version(1), p(1), M(4) és egy Golomb-Rice bitfolyam formájában szerializálva (apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-12), és minden keretet a NOISE pecsétel le.",
      },
    ],
  },
  {
    index: "03",
    tone: "brand",
    chip: ".ppxlz",
    title: {
      en: "Local media compression, metadata stripped",
      "pt-BR": "Compressão local de mídia, metadados removidos",
      ko: "로컬 미디어 압축, 메타데이터 제거",
      ar: "ضغط الوسائط محليًا، مع تجريد البيانات الوصفية",
      ru: "Локальное сжатие медиа со снятыми метаданными",
      de: "Lokale Medienkomprimierung, Metadaten entfernt",
      fr: "Compression locale des médias, métadonnées retirées",
      it: "Compressione locale dei media, metadati rimossi",
      nl: "Lokale media-compressie, metadata gestript",
      cs: "Lokální komprese médií, odstraněná metadata",
      "zh-Hans": "本地多媒体压缩与元数据剥离",
      "zh-Hant": "本機多媒體壓縮與中繼資料剝離",
      es: "Compresión local de multimedia, metadatos eliminados",
      pl: "Lokalne kompresowanie multimediów, usunięte metadane",
      ja: "ローカルでのメディア圧縮とメタデータ除去",
      th: "บีบอัดสื่อในเครื่องและถอดเมทาดาทาออก",
      fi: "Paikallinen median pakkaus, metadata poistettu",
      uk: "Локальне стиснення медіа зі знятими метаданими",
      bg: "Локално компресиране на медия с премахнати метаданни",
      tr: "Yerel medya sıkıştırma, üstveri temizleme",
      hu: "Helyi média-tömörítés, metaadatok eltávolítása",
    },
    hook: {
      en: "Files shrink on the device, and location or camera data is never written in the first place.",
      "pt-BR": "Os arquivos encolhem no dispositivo, e dados de localização ou de câmera nunca chegam a ser gravados.",
      ko: "파일은 기기에서 작아지고, 위치나 카메라 데이터는 처음부터 기록되지 않습니다.",
      ar: "تصغر الملفات على الجهاز، وبيانات الموقع أو الكاميرا لا تدخل فيها من الأصل.",
      ru: "Файлы сжимаются на устройстве, а данные о локации и камере не записываются с самого начала.",
      de: "Dateien schrumpfen auf dem Gerät, und Orts- oder Kameradaten werden gar nicht erst geschrieben.",
      fr: "Les fichiers se réduisent sur l'appareil, et les données de position ou d'appareil photo ne sont jamais écrites.",
      it: "I file si riducono sul dispositivo, e i dati di posizione o della fotocamera non vengono mai scritti.",
      nl: "Bestanden krimpen op het apparaat, en locatie- of cameragegevens worden nooit geschreven.",
      cs: "Soubory se zmenšují v zařízení a údaje o poloze či kameře se nikdy nezapíšou.",
      "zh-Hans": "文件在设备本机变小，位置和相机信息从一开始就没被写进去。",
      "zh-Hant": "檔案在裝置本機變小，位置和相機資訊從一開始就沒被寫進去。",
      es: "Los archivos se reducen en el dispositivo, y los datos de ubicación o de cámara nunca llegan a escribirse.",
      pl: "Pliki zmniejszają się na urządzeniu, a dane o lokalizacji czy aparacie w ogóle nie są zapisywane.",
      ja: "ファイルは端末内で小さくなり、位置情報やカメラデータはそもそも書き込まれません。",
      th: "ไฟล์จะเล็กลงบนอุปกรณ์ และข้อมูลตำแหน่งหรือข้อมูลกล้องไม่เคยถูกเขียนตั้งแต่ต้น",
      fi: "Tiedostot kutistuvat laitteella, eikä sijainti- tai kameratietoja kirjoiteta alkuunkaan.",
      uk: "Файли зменшуються на пристрої, а дані про локацію та камеру не записуються взагалі.",
      bg: "Файловете се свиват на устройството, а данните за локация или камера изобщо не се записват.",
      tr: "Dosyalar cihazda küçülür ve konum ya da kamera verisi baştan hiç yazılmaz.",
      hu: "A fájlok az eszközön zsugorodnak, és a helyszín- vagy kameraadatok egyáltalán nem kerülnek kiírásra.",
    },
    facts: [
      {
        en: "Images are scaled with ImageIO's thumbnail API and encoded with a dictionary holding only kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — so no EXIF, no GPS, no camera model.",
        "pt-BR": "As imagens são dimensionadas com a API de miniaturas do ImageIO e codificadas com um dicionário que contém apenas kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — portanto, sem EXIF, sem GPS, sem modelo de câmera.",
        ko: "이미지는 ImageIO의 썸네일 API로 축소하고, kCGImageDestinationLossyCompressionQuality만 담은 딕셔너리로 인코딩합니다(apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — 그래서 EXIF도, GPS도, 카메라 모델도 없습니다.",
        ar: "تحجّم الصور باستخدام API الصور المصغّرة في ImageIO وترمّز بمعجم لا يحمل سوى kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — فلا EXIF، ولا GPS، ولا طراز كاميرا.",
        ru: "Изображения масштабируются thumbnail API ImageIO и кодируются словарём, содержащим лишь kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375), — значит без EXIF, без GPS и без модели камеры.",
        de: "Bilder werden über den Thumbnail-API von ImageIO skaliert und mit einem Wörterbuch kodiert, das nur kCGImageDestinationLossyCompressionQuality enthält (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — also kein EXIF, kein GPS, kein Kameramodell.",
        fr: "Les images sont redimensionnées via l'API miniature d'ImageIO et encodées avec un dictionnaire ne contenant que kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — donc pas d'EXIF, pas de GPS, pas de modèle d'appareil.",
        it: "Le immagini vengono ridimensionate con l'API thumbnail di ImageIO e codificate con un dizionario che contiene solo kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375), quindi niente EXIF, niente GPS, niente modello di fotocamera.",
        nl: "Afbeeldingen worden geschaald met de thumbnail-API van ImageIO en gecodeerd met een dictionary die alleen kCGImageDestinationLossyCompressionQuality bevat (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — dus geen EXIF, geen GPS, geen cameramodel.",
        cs: "Obrázky se škálují přes thumbnail API ImageIO a kódují se slovníkem obsahujícím pouze kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — tedy bez EXIF, bez GPS, bez modelu fotoaparátu.",
        "zh-Hans": "图片用 ImageIO 的缩略图 API 缩放，编码时传入的字典里只有 kCGImageDestinationLossyCompressionQuality（apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375），所以没有 EXIF、没有 GPS、也没有相机型号。",
        "zh-Hant": "圖片用 ImageIO 的縮圖 API 縮放，編碼時傳入的字典裡只有 kCGImageDestinationLossyCompressionQuality（apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375），所以沒有 EXIF、沒有 GPS、也沒有相機型號。",
        es: "Las imágenes se escalan con la API de miniaturas de ImageIO y se codifican con un diccionario que solo contiene kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375): sin EXIF, sin GPS, sin modelo de cámara.",
        pl: "Obrazy są skalowane przez API miniatur ImageIO i kodowane słownikiem zawierającym wyłącznie kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — więc bez EXIF, bez GPS, bez modelu aparatu.",
        ja: "画像は ImageIO のサムネイル API で縮小し、辞書には kCGImageDestinationLossyCompressionQuality だけ渡して符号化します（apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375）。そのため EXIF も GPS もカメラ機種も入りません。",
        th: "ภาพถูกย่อขนาดด้วย thumbnail API ของ ImageIO และถูกเข้ารหัสด้วยพจนานุกรมที่มีเฉพาะ kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) จึงไม่มี EXIF ไม่มี GPS และไม่มีรุ่นกล้อง",
        fi: "Kuvat skaalataan ImageIO:n thumbnail-API:lla ja koodataan sanakirjalla, jossa on vain kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — ei EXIF:ää, ei GPS:ää, ei kameramallia.",
        uk: "Зображення масштабуються через thumbnail API ImageIO та кодуються словником, що містить лише kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — отже, без EXIF, без GPS, без моделі камери.",
        bg: "Изображенията се мащабират чрез thumbnail API на ImageIO и се кодират с речник, съдържащ само kCGImageDestinationLossyCompressionQuality (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — следователно без EXIF, без GPS, без модел на камерата.",
        tr: "Görseller ImageIO'nun küçük resim API'siyle ölçeklenir ve sözlükte yalnızca kCGImageDestinationLossyCompressionQuality bulunacak şekilde kodlanır (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — yani EXIF yok, GPS yok, kamera modeli yok.",
        hu: "A képeket az ImageIO bélyegkép-API-jával méretezzük, és olyan szótárral kódoljuk, amely csak a kCGImageDestinationLossyCompressionQuality kulcsot tartalmazza (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:375) — tehát nincs EXIF, nincs GPS, nincs kamera modell.",
      },
      {
        en: "Video is re-encoded by an AVAssetWriter on the hardware encoder with metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), and export applies AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Animated images pass through untouched.",
        "pt-BR": "O vídeo é recodificado por um AVAssetWriter no codificador de hardware com metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), e a exportação aplica AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Imagens animadas passam intactas.",
        ko: "동영상은 하드웨어 인코더에서 AVAssetWriter로 metadata = []를 지정해 다시 인코딩하고(apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), 내보낼 때는 AVMetadataItemFilter.forSharing()을 적용합니다(apps/ios/POPOPXChat/ImageUtils.swift:355). 애니메이션 이미지는 손대지 않고 그대로 통과합니다.",
        ar: "يعاد ترميز الفيديو بواسطة AVAssetWriter على مرمّز العتاد مع metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442)، ويطبّق التصدير AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). وتمرّ الصور المتحركة كما هي دون تغيير.",
        ru: "Видео перекодируется через AVAssetWriter на аппаратном кодировщике с metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), а экспорт применяет AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Анимированные изображения проходят без изменений.",
        de: "Video wird von einem AVAssetWriter auf dem Hardware-Encoder mit metadata = [] neu kodiert (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), und der Export wendet AVMetadataItemFilter.forSharing() an (apps/ios/POPOPXChat/ImageUtils.swift:355). Animierte Bilder bleiben unangetastet.",
        fr: "La vidéo est ré-encodée par un AVAssetWriter sur l'encodeur matériel avec metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), et l'export applique AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Les images animées passent sans modification.",
        it: "Il video viene ri-codificato da un AVAssetWriter sull'encoder hardware con metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), e l'esportazione applica AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Le immagini animate passano invariate.",
        nl: "Video wordt hercodeerd door een AVAssetWriter op de hardwareencoder met metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), en de export past AVMetadataItemFilter.forSharing() toe (apps/ios/POPOPXChat/ImageUtils.swift:355). Geanimeerde beelden blijven onaangeroerd.",
        cs: "Video je překódováno AVAssetWriterem na hardwarovém kodeku s metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442) a export aplikuje AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Animované obrázky procházejí beze změny.",
        "zh-Hans": "视频由 AVAssetWriter 走硬件编码器重新编码，metadata 传空数组（apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442），导出时再套一层 AVMetadataItemFilter.forSharing()（apps/ios/POPOPXChat/ImageUtils.swift:355）。动图原样透传，不做处理。",
        "zh-Hant": "影片由 AVAssetWriter 走硬體編碼器重新編碼，metadata 傳空陣列（apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442），匯出時再套一層 AVMetadataItemFilter.forSharing()（apps/ios/POPOPXChat/ImageUtils.swift:355）。動畫圖片原樣通過，不做處理。",
        es: "El video recodifica un AVAssetWriter sobre el codificador de hardware con metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), y la exportación aplica AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Las imágenes animadas pasan sin tocar.",
        pl: "Wideo jest rekodowane przez AVAssetWriter na enkoderze sprzętowym z metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), a eksport stosuje AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Animacje przechodzą bez zmian.",
        ja: "動画はハードウェアエンコーダ上の AVAssetWriter で metadata = [] とともに再符号化し（apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442）、書き出しでは AVMetadataItemFilter.forSharing() を適用します（apps/ios/POPOPXChat/ImageUtils.swift:355）。アニメーション画像はそのまま通します。",
        th: "วิดีโอถูกเข้ารหัสใหม่ด้วย AVAssetWriter บนตัวเข้ารหัสฮาร์ดแวร์ โดยส่ง metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442) และการส่งออกจะใช้ AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355) ส่วนภาพเคลื่อนไหวจะผ่านโดยไม่แตะต้อง",
        fi: "Video koodataan uudelleen AVAssetWriterilla laitteistokooderilla metadata = [] -arvolla (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), ja vienti käyttää AVMetadataItemFilter.forSharing()-suodatinta (apps/ios/POPOPXChat/ImageUtils.swift:355). Animoidut kuvat kulkevat koskemattomina.",
        uk: "Відео перекодується AVAssetWriter на апаратному кодері з metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), а експорт застосовує AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Анімовані зображення проходять без змін.",
        bg: "Видеото се прекодира от AVAssetWriter върху хардуерния енкодер с metadata = [] (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), а експортът прилага AVMetadataItemFilter.forSharing() (apps/ios/POPOPXChat/ImageUtils.swift:355). Анимационните изображения минават непокътнати.",
        tr: "Video, donanım kodlayıcı üzerindeki bir AVAssetWriter ile metadata = [] değerleriyle yeniden kodlanır (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442) ve dışa aktarma AVMetadataItemFilter.forSharing() uygular (apps/ios/POPOPXChat/ImageUtils.swift:355). Hareketli görseller olduğu gibi geçer.",
        hu: "A videót egy AVAssetWriter újra-kódolja a hardveres kódolón metadata = [] értékkel (apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:433-442), az export pedig alkalmazza az AVMetadataItemFilter.forSharing() szűrőt (apps/ios/POPOPXChat/ImageUtils.swift:355). Az animált képek érintetlenül haladnak át.",
      },
      {
        en: "Plain-text documents stream through Apple's Compression framework with COMPRESSION_LZFSE into a .ppxlz container whose magic is PPXLZ1, kept only when more than 15 % smaller (minimumReductionRatio = 0.85).",
        "pt-BR": "Documentos de texto simples passam em fluxo pelo framework Compression da Apple com COMPRESSION_LZFSE para um contêiner .ppxlz cujo magic é PPXLZ1, mantido apenas quando o arquivo fica mais de 15 % menor (minimumReductionRatio = 0.85).",
        ko: "일반 텍스트 문서는 Apple의 Compression 프레임워크에서 COMPRESSION_LZFSE로 .ppxlz 컨테이너에 스트리밍되며, 매직은 PPXLZ1이고, 15 % 넘게 작아질 때만 유지합니다(minimumReductionRatio = 0.85).",
        ar: "تبثّ مستندات النص العادي عبر إطار Compression من Apple بـ COMPRESSION_LZFSE إلى حاوية .ppxlz بصمتها PPXLZ1، ولا تبقى إلا حين تكون أصغر بأكثر من 15 % (minimumReductionRatio = 0.85).",
        ru: "Текстовые документы потоком проходят через фреймворк Apple Compression с COMPRESSION_LZFSE в контейнер .ppxlz с магией PPXLZ1 и оставляются, лишь когда стали больше чем на 15 % меньше (minimumReductionRatio = 0.85).",
        de: "Klartext-Dokumente streamen durch Apples Compression-Framework mit COMPRESSION_LZFSE in einen .ppxlz-Container mit der Magic PPXLZ1, behalten nur, wenn er über 15 % kleiner ist (minimumReductionRatio = 0.85).",
        fr: "Les documents texte sont streamés dans le framework Compression d'Apple avec COMPRESSION_LZFSE vers un conteneur .ppxlz dont le magic est PPXLZ1, conservé seulement s'il est de plus de 15 % plus petit (minimumReductionRatio = 0.85).",
        it: "I documenti di testo puro scorreano nel framework Compression di Apple con COMPRESSION_LZFSE in un contenitore .ppxlz la cui magic è PPXLZ1, mantenuto solo se più piccolo di oltre il 15 % (minimumReductionRatio = 0.85).",
        nl: "Platetekst-documenten streamen door Apple's Compression-framework met COMPRESSION_LZFSE naar een .ppxlz-container met magic PPXLZ1, alleen behouden als hij meer dan 15 % kleiner is (minimumReductionRatio = 0.85).",
        cs: "Textové dokumenty proudí Compression frameworkem Apple s COMPRESSION_LZFSE do kontejneru .ppxlz s magic PPXLZ1, ponechán jen pokud je o více než 15 % menší (minimumReductionRatio = 0.85).",
        "zh-Hans": "纯文本文档以流式走 Apple 的 Compression 框架、用 COMPRESSION_LZFSE 压进 .ppxlz 容器，魔数是 PPXLZ1，只有小了 15% 以上才保留（minimumReductionRatio = 0.85）。",
        "zh-Hant": "純文字文件以串流方式走 Apple 的 Compression 框架、用 COMPRESSION_LZFSE 壓進 .ppxlz 容器，魔數是 PPXLZ1，只有小了 15% 以上才保留（minimumReductionRatio = 0.85）。",
        es: "Los documentos de texto plano se transmiten en streaming por el framework Compression de Apple con COMPRESSION_LZFSE hacia un contenedor .ppxlz cuya magic es PPXLZ1, conservado solo si es más de un 15 % más pequeño (minimumReductionRatio = 0.85).",
        pl: "Dokumenty czystego tekstu przepływają przez framework Compression Apple z COMPRESSION_LZFSE do kontenera .ppxlz z magią PPXLZ1, zachowywany tylko gdy jest o ponad 15 % mniejszy (minimumReductionRatio = 0.85).",
        ja: "プレーンテキストの文書は Apple の Compression フレームワークを流れる形で COMPRESSION_LZFSE により .ppxlz コンテナへ詰められ、magic は PPXLZ1、15% 以上小さくなったときだけ採用します（minimumReductionRatio = 0.85）。",
        th: "เอกสารข้อความธรรมดาจะถูกส่งผ่านเฟรมเวิร์ก Compression ของ Apple ด้วย COMPRESSION_LZFSE ลงในคอนเทนเนอร์ .ppxlz ที่มี magic เป็น PPXLZ1 และจะเก็บไว้เมื่อเล็กลงเกิน 15% เท่านั้น (minimumReductionRatio = 0.85)",
        fi: "Raakatekstidokumentit virtaavat Appen Compression-kehyksessä COMPRESSION_LZFSE:llä .ppxlz-säiliöön, jonka magic-tavut ovat PPXLZ1; säiliö säilytetään vain jos se on yli 15 % pienempi (minimumReductionRatio = 0.85).",
        uk: "Звичайні текстові документи потоково проходять через фреймворк Compression від Apple з COMPRESSION_LZFSE у контейнер .ppxlz з магією PPXLZ1, зберігаються, лише коли стали більш ніж на 15 % меншими (minimumReductionRatio = 0.85).",
        bg: "Обикновените текстови документи преминават на поток през framework Compression на Apple с COMPRESSION_LZFSE в контейнер .ppxlz с magic PPXLZ1, запазва се само ако е с повече от 15 % по-малък (minimumReductionRatio = 0.85).",
        tr: "Düz metin belgeleri, Apple'ın Compression framework'ünden COMPRESSION_LZFSE ile akıtılarak magic değeri PPXLZ1 olan bir .ppxlz kapsayıcısına konur ve yalnızca %15'ten fazla küçüldüyse korunur (minimumReductionRatio = 0.85).",
        hu: "A simaszöveges dokumentumok az Apple Compression framework-jén áramlanak át COMPRESSION_LZFSE-vel egy .ppxlz konténerbe, PPXLZ1 varázsfájllal, csak akkor őrződik meg, ha több mint 15 %-kal kisebb (minimumReductionRatio = 0.85).",
      },
    ],
  },
  {
    index: "04",
    tone: "mesh",
    chip: "k-ad1dc5463a",
    title: {
      en: "Signed server-config hot update",
      "pt-BR": "Atualização a quente assinada da configuração de servidor",
      ko: "서명된 서버 설정 핫 업데이트",
      ar: "تحديث ساخن موقّع لتهيئة الخادم",
      ru: "Горячее обновление подписанной конфигурации сервера",
      de: "Signierter Server-Konfigurations-Hot-Update",
      fr: "Mise à jour à chaud de la configuration serveur signée",
      it: "Hot update firmato della configurazione del server",
      nl: "Ondertekende serverconfiguratie hot-update",
      cs: "Podepsovaná horká aktualizace konfigurace serveru",
      "zh-Hans": "签名服务器配置热更新",
      "zh-Hant": "簽章伺服器設定熱更新",
      es: "Actualización en caliente firmada de la configuración del servidor",
      pl: "Podpisana gorąca aktualizacja konfiguracji serwera",
      ja: "署名付きサーバー設定のホットアップデート",
      th: "อัปเดตค่าเซิร์ฟเวอร์แบบร้อนพร้อมลายเซ็น",
      fi: "Allekirjoitettu palvelinmääritysten päivitys lennossa",
      uk: "Підписане гаряче оновлення конфігурації сервера",
      bg: "Подписено горещо обновяване на конфигурацията на сървъра",
      tr: "İmzalı sunucu yapılandırması sıcak güncelleme",
      hu: "Aláírt szerverkonfiguréció forró frissítése",
    },
    hook: {
      en: "A new server table is applied only if a pinned key signed it — and only after a snapshot that makes rollback possible.",
      "pt-BR": "Uma nova tabela de servidores só é aplicada se tiver sido assinada por uma chave fixada — e só depois de um instantâneo que torne a reversão possível.",
      ko: "새 서버 테이블은 고정된 키가 서명한 경우에만 — 그리고 롤백이 가능한 스냅샷을 남긴 뒤에만 적용됩니다.",
      ar: "جدول الخوادم الجديد لا يدخل حيّز التطبيق إلا إذا وقّعه مفتاح مثبّت — ولا يدخل إلا بعد لقطة تجعل التراجع ممكنًا.",
      ru: "Новая таблица серверов применяется, только если её подписал закреплённый ключ, — и лишь после снимка, который делает возможен откат.",
      de: "Eine neue Servertabelle wird nur übernommen, wenn ein gepinnter Schlüssel sie signiert hat – und erst nach einem Snapshot, der einen Rollback möglich macht.",
      fr: "Un nouveau tableau de serveurs n'est appliqué que si une clé épinglée l'a signé — et seulement après un instantané rendant le retour arrière possible.",
      it: "Una nuova tabella dei server viene applicata solo se una chiave pinata l'ha firmata, e solo dopo uno snapshot che rende possibile il rollback.",
      nl: "Een nieuwe servertabel wordt alleen toegepast als een gepinde sleutel haar ondertekende — en pas na een snapshot dat rollback mogelijk maakt.",
      cs: "Nová tabulka serverů se aplikuje jen pokud ji podepsal připevněný klíč — a až po snímku, který umožňuje rollback.",
      "zh-Hans": "新的服务器表只有在被固定密钥签过、并且写完可回滚的快照后才会生效。",
      "zh-Hant": "新的伺服器表格只有在被固定金鑰簽過、並且寫完可回滾的快照後才會生效。",
      es: "Una nueva tabla de servidores solo se aplica si una clave fijada la firmó, y solo después de una instantánea que haga posible el rollback.",
      pl: "Nowa tabela serwerów jest stosowana tylko, jeśli podpisał ją przypięty klucz — i dopiero po zrzucie, który umożliwia wycofanie zmian.",
      ja: "新しいサーバーテーブルが適用されるのは、固定した鍵が署名したものだけであること、そしてロールバック可能なスナップショットを書いた後に限られます。",
      th: "ตารางเซิร์ฟเวอร์ชุดใหม่จะถูกใช้ก็ต่อเมื่อคีย์ที่ตรึงไว้เป็นผู้เซ็น เท่านั้น และต้องเขียนสแนปช็อตที่ย้อนกลับได้ให้เรียบร้อยก่อน",
      fi: "Uusi palvelintaulu otetaan käyttöön vain jos kiinnitetty avain allekirjoitti sen — ja vasta peruutuksen mahdollistavan välestä kirjoittamisen jälkeen.",
      uk: "Нова таблиця серверів застосовується, лише якщо її підписав закріплений ключ, — і тільки після знімка, який уможливлює відкат.",
      bg: "Нова сървърна таблица се прилага само ако я е подписал фиксиран ключ — и чак след като е записан моментен снимка, която позволява отстъпване.",
      tr: "Yeni bir sunucu tablosu yalnızca sabitlenmiş bir anahtar onu imzaladıysa uygulanır — ve ancak geri almayı mümkün kılan bir anlık görüntü yazıldıktan sonra.",
      hu: "Egy új szervertáblát csak akkor alkalmazunk, ha egy rögzített kulcs aláírta — és csak egy olyan pillanatkép után, amely lehetővé teszi a visszaállítást.",
    },
    facts: [
      {
        en: "Ed25519 checks the signature over the domain popopx|popx_srv_cfg_v1| followed by the compressed config (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); the trust root is one hard-pinned 32-byte key, id k-ad1dc5463a.",
        "pt-BR": "O Ed25519 verifica a assinatura sobre o domínio popopx|popx_srv_cfg_v1| seguido da configuração comprimida (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); a raiz de confiança é uma única chave de 32 bytes fixada em código, id k-ad1dc5463a.",
        ko: "Ed25519는 도메인 popopx|popx_srv_cfg_v1| 뒤에 압축된 설정을 이어 붙인 값에 대한 서명을 검사하며(apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409), 신뢰 루트는 하드 고정된 32바이트 키 하나이고, id는 k-ad1dc5463a입니다.",
        ar: "يتحقق Ed25519 من التوقيع على النطاق popopx|popx_srv_cfg_v1| متبوعًا بالتهيئة المضغوطة (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409)؛ وجذر الثقة مفتاح واحد بطول 32 بايت مثبّت تثبيتًا صارمًا، معرّفه k-ad1dc5463a.",
        ru: "Ed25519 проверяет подпись по домену popopx|popx_srv_cfg_v1| и сжатой конфигурации (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); корень доверия — один жёстко закреплённый 32-байтовый ключ с id k-ad1dc5463a.",
        de: "Ed25519 prüft die Signatur über die Domäne popopx|popx_srv_cfg_v1| plus die komprimierte Konfiguration (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); die Vertrauenswurzel ist ein hart gepinnter 32-Byte-Schlüssel mit der Id k-ad1dc5463a.",
        fr: "Ed25519 vérifie la signature portant sur le domaine popopx|popx_srv_cfg_v1| suivi de la configuration compressée (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409) ; la racine de confiance est une clé de 32 octets épinglée en dur, id k-ad1dc5463a.",
        it: "Ed25519 verifica la firma sul dominio popopx|popx_srv_cfg_v1| seguito dalla configurazione compressa (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); la radice di fiducia è una chiave fissa da 32 byte, id k-ad1dc5463a.",
        nl: "Ed25519 controleert de handtekening over het domein popopx|popx_srv_cfg_v1| gevolgd door de gecomprimeerde config (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); de vertrouwensbasis is een hard gepinde 32-byte sleutel, id k-ad1dc5463a.",
        cs: "Ed25519 kontroluje podpis nad doménou popopx|popx_srv_cfg_v1| následovanou komprimovanou konfigurací (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); kořen důvěry je jeden tvrdě připevněný 32bajtový klíč, id k-ad1dc5463a.",
        "zh-Hans": "Ed25519 校验的签名原文是域名字符串 popopx|popx_srv_cfg_v1| 加上压缩后的配置（apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409）；信任根是一枚硬编码的 32 字节公钥，ID 为 k-ad1dc5463a。",
        "zh-Hant": "Ed25519 驗證的簽章原文是網域名稱字串 popopx|popx_srv_cfg_v1| 加上壓縮後的設定（apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409）；信任根是一枚硬編碼的 32 位元組公鑰，ID 為 k-ad1dc5463a。",
        es: "Ed25519 comprueba la firma sobre el dominio popopx|popx_srv_cfg_v1| seguido de la configuración comprimida (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); la raíz de confianza es una clave fijada de 32 bytes, id k-ad1dc5463a.",
        pl: "Ed25519 sprawdza podpis nad domeną popopx|popx_srv_cfg_v1| poprzedzającą skompresowaną konfigurację (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); korzeń zaufania to jeden na stałe przypięty klucz 32-bajtowy, id k-ad1dc5463a.",
        ja: "Ed25519 が確認するのは、ドメイン文字列 popopx|popx_srv_cfg_v1| の後ろに圧縮した設定を連結した署名です（apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409）。信頼の根はハードコードされた 32 バイトの公開鍵 1 枚で、ID は k-ad1dc5463a です。",
        th: "Ed25519 ตรวจลายเซ็นที่คำนวณจากโดเมน popopx|popx_srv_cfg_v1| ตามด้วย config ที่บีบอัด (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409) โดย trust root คือคีย์สาธารณะ 32 ไบต์ที่ฝังไว้หนึ่งคีย์ ทางด้าน ID คือ k-ad1dc5463a",
        fi: "Ed25519 tarkistaa allekirjoituksen domaineesta popopx|popx_srv_cfg_v1| ja sen perään pusketusta määrityksestä (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); luottamuksen juuri on yksi kovakoodattu 32-tavun avain, id k-ad1dc5463a.",
        uk: "Ed25519 перевіряє підпис за доменим рядком popopx|popx_srv_cfg_v1| та стисненою конфігурацією після нього (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); корінь довіри — один жорстко закріплений 32-байтовий ключ, ID k-ad1dc5463a.",
        bg: "Ed25519 проверя подписа върху домейна popopx|popx_srv_cfg_v1| последван от компримираната конфигурация (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); коренът на доверието е един здраво фиксиран 32-байтов ключ, id k-ad1dc5463a.",
        tr: "Ed25519, popopx|popx_srv_cfg_v1| alan adının ardından gelen sıkıştırılmış yapılandırma üzerinden atılan imzayı doğrular (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); güven kökü, sabit gömülü 32 baytlık tek bir anahtardır, kimliği k-ad1dc5463a.",
        hu: "Az Ed25519 a popopx|popx_srv_cfg_v1| tartománysorozat és az azt követő tömörített konfiguráció felett ellenőrzi az aláírást (apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:388,403-409); a bizalmi gyökér egy keményen rögzített 32 bájtos kulcs, azonosítója k-ad1dc5463a.",
      },
      {
        en: "State is kept in two tiers: UserDefaults for the per-key generation floors and the broken-generation list, App Group files for rollback.json and staged.json, both written with FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        "pt-BR": "O estado fica em duas camadas: UserDefaults para os pisos de geração por chave e a lista de gerações quebradas, e arquivos do App Group para rollback.json e staged.json, ambos gravados com FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        ko: "상태는 두 계층에 보관합니다. 키별 세대 하한과 손상된 세대 목록은 UserDefaults에, rollback.json과 staged.json은 App Group 파일에 두며, 둘 다 FileProtectionType.complete로 기록합니다(apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        ar: "الحالة موزّعة على مستويين: UserDefaults للحدود الدنيا للأجيال لكل مفتاح ولقائمة الأجيال المعطوبة، وملفات App Group لـ rollback.json و staged.json، وكلاهما مكتوب بـ FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        ru: "Состояние хранится в двух слоях: UserDefaults для поколенческих порогов по ключам и списка сломанных поколений, файлы App Group для rollback.json и staged.json — обе записи идут с FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        de: "Zustand liegt in zwei Stufen: UserDefaults für die generationsweisen Untergrenzen je Schlüssel und die Liste defekter Generationen, App-Group-Dateien für rollback.json und staged.json, beide mit FileProtectionType.complete geschrieben (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        fr: "L'état tient en deux niveaux : UserDefaults pour les planchers de génération par clé et la liste des générations cassées, les fichiers App Group pour rollback.json et staged.json, écrits avec FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        it: "Lo stato è su due livelli: UserDefaults per le soglie di generazione per chiave e l'elenco delle generazioni rotte, file App Group per rollback.json e staged.json, scritti con FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        nl: "State leeft in twee lagen: UserDefaults voor de generatievloeren per sleutel en de lijst van gebroken generaties, App Group-bestanden voor rollback.json en staged.json, beide geschreven met FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        cs: "Stav je ve dvou vrstvách: UserDefaults pro generační minima klíčů a seznam rozbitých generací, soubory App Group pro rollback.json a staged.json, oba zapsány s FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        "zh-Hans": "状态分两层存放：UserDefaults 存每个密钥的代数下限和坏代数列表，App Group 文件存 rollback.json 与 staged.json，两者都以 FileProtectionType.complete 写入（apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173）。",
        "zh-Hant": "狀態分兩層存放：UserDefaults 存每個金鑰的世代下限與壞世代清單，App Group 檔案存 rollback.json 與 staged.json，兩者都以 FileProtectionType.complete 寫入（apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173）。",
        es: "El estado se guarda en dos niveles: UserDefaults para los mínimos de generación por clave y la lista de generaciones rotas, archivos App Group para rollback.json y staged.json, ambos escritos con FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        pl: "Stan jest trzymany w dwóch warstwach: UserDefaults na progi generacji dla każdego klucza i listę zepsutych generacji, pliki App Group na rollback.json i staged.json, oba zapisywane z FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        ja: "状態は 2 層構成です。UserDefaults に各鍵の世代フロアと壊れた世代のリスト、App Group のファイルに rollback.json と staged.json を置き、どちらも FileProtectionType.complete で書き込みます（apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173）。",
        th: "สถานะถูกเก็บสองชั้น: UserDefaults เก็บค่าพื้นของเจนเนอเรชันต่อคีย์กับรายการเจนเนอเรชันที่เสีย ส่วนไฟล์ App Group เก็บ rollback.json และ staged.json โดยทั้งสองถูกเขียนด้วย FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173)",
        fi: "Tila säilytetään kahdessa kerroksessa: UserDefaultsissa avainkohtaiset sukupolvalattiat ja lista rikotuista sukupolvista, App Group -tiedostoissa rollback.json ja staged.json, molemmat kirjoitettu FileProtectionType.complete:lla (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        uk: "Стан зберігається у двох шарах: UserDefaults для порогів поколінь за ключами та списку зламаних поколінь, файли App Group для rollback.json і staged.json — обидва записані з FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        bg: "Състоянието се пази в два слоя: UserDefaults за поколенческите прагове по ключове и списъка на счупените поколения, файловете на App Group за rollback.json и staged.json, и двата записани с FileProtectionType.complete (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        tr: "Durum iki katmanda tutulur: anahtar başına nesil tabanları ve bozuk nesil listesi UserDefaults'ta, rollback.json ile staged.json ise App Group dosyalarında; ikisi de FileProtectionType.complete ile yazılır (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
        hu: "Az állapot két rétegben tárolódik: a UserDefaults a kulcsenkénti generáció-alapszinteket és a hibás generációk listáját tartja, az App Group fájlok a rollback.json és a staged.json — mindkettő FileProtectionType.complete védelemmel íródik (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12,172-173).",
      },
      {
        en: "Applying stops if the rollback snapshot cannot be written (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); floors only ever rise, a revocation lifts one to ms − 1, and the new table is probed 3 s and 10 s after apply.",
        "pt-BR": "A aplicação para se o instantâneo de reversão não puder ser gravado (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); os pisos só sobem, uma revogação eleva um deles para ms − 1, e a nova tabela é sondada 3 s e 10 s depois da aplicação.",
        ko: "롤백 스냅샷을 기록할 수 없으면 적용이 멈춥니다(apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336). 하한은 오르기만 하고, 철회는 하한 하나를 ms − 1로 끌어올리며, 새 테이블은 적용 후 3 s와 10 s에 검사합니다.",
        ar: "يتوقف التطبيق إذا تعذّرت كتابة لقطة التراجع (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336)؛ والحدود الدنيا لا تنخفض أبدًا، ويرفع الإلغاء أحدها إلى ms − 1، ويخضع الجدول الجديد لاختبار عند 3 s و 10 s بعد التطبيق.",
        ru: "Применение останавливается, если снимок для отката не удаётся записать (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); пороги только растут, отзыв поднимает его до ms − 1, а новая таблица проверяется через 3 с и 10 с после применения.",
        de: "Das Anwenden stoppt, wenn der Rollback-Snapshot nicht geschrieben werden kann (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); Untergrenzen steigen nur, ein Widerruf hebt eine auf ms − 1, und die neue Tabelle wird 3 s und 10 s nach dem Anwenden geprüft.",
        fr: "L'application s'arrête si l'instantané de rollback ne peut pas être écrit (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336) ; les planchers ne font que monter, une révocation en remonte un à ms − 1, et le nouveau tableau est sondé 3 s puis 10 s après l'application.",
        it: "L'applicazione si ferma se lo snapshot di rollback non può essere scritto (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); le soglie salgono soltanto, una revoca porta la soglia a ms − 1, e la nuova tabella viene sondata 3 s e 10 s dopo l'applicazione.",
        nl: "Toepassen stopt als het rollback-snapshot niet geschreven kan worden (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); de vloeren stijgen alleen, een intrekking tilt er een naar ms − 1, en de nieuwe tabel wordt 3 s en 10 s na het toepassen gepeild.",
        cs: "Aplikace se zastaví, pokud snímek rollbacku nelze zapsat (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); minima jen rostou, odvolání jedno zvedne na ms − 1, a nová tabulka je sondována po 3 s a po 10 s aplikaci.",
        "zh-Hans": "如果回滚快照写不下去，应用会直接停住（apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336）；下限只会往上走，吊销操作把某项抬到 ms − 1，新配置在生效后 3 秒和 10 秒各探活一次。",
        "zh-Hant": "如果回滾快照寫不下去，套用會直接停住（apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336）；下限只會往上走，撤銷動作會把某項抬到 ms − 1，新設定在生效後 3 秒與 10 秒各探活一次。",
        es: "La aplicación se detiene si la instantánea de rollback no puede escribirse (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); los mínimos solo suben, una revocación eleva uno a ms − 1, y la nueva tabla se sondea 3 s y 10 s después de aplicar.",
        pl: "Zastosowanie zatrzymuje się, jeśli nie da się zapisać zrzutu rollback (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); progi tylko rosną, unieważnienie podnosi jeden do ms − 1, a nowa tabela jest testowana 3 s i 10 s po zastosowaniu.",
        ja: "ロールバック用スナップショットが書けない場合、適用は停止します（apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336）。フロアは上がるだけで、失効処置はそれを ms − 1 まで引き上げ、新しいテーブルは適用後 3 秒と 10 秒に一度ずつ疎通を測ります。",
        th: "หากเขียนสแนปช็อตสำหรับย้อนกลับไม่ได้ การปรับใช้จะหยุดทันที (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336) ค่าพื้นจะสูงขึ้นเท่านั้น และการเรียกคืนจะดันค่าหนึ่งขึ้นไปถึง ms − 1 ส่วนตารางใหม่จะถูกทดสอบการเชื่อมต่อหลังปรับใช้ 3 วินาทีกับ 10 วินาที",
        fi: "Käyttöönotto pysähtyy, jos rollback-välestä ei saatu kirjoitetuksi (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); lattiat nousevat vain, peruonnos nostaa yhden arvoon ms − 1, ja uutta taulua tutkaillaan 3 s ja 10 s käyttöönoton jälkeen.",
        uk: "Застосування зупиняється, якщо не вдається записати знімок відкату (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); пороги лише зростають, відкликання піднімає один до ms − 1, а нову таблицю перевіряють через 3 с і 10 с після застосування.",
        bg: "Прилагането спира, ако снимката за откат не може да се запише (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); праговете само се покачват, а оттеглянето повдига един до ms − 1, и новата таблица се проверява 3 s и 10 s след прилагането.",
        tr: "Geri alma anlık görüntüsü yazılamıyorsa uygulama durur (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); tabanlar yalnızca yükselir, bir iptal işlemi onu ms − 1'e çeker ve yeni tablo uygulama sonrası 3 s ile 10 s sonra yoklanır.",
        hu: "Az alkalmazás megáll, ha a rollback pillanatkép nem írható ki (apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336); az alapszintek csak emelkednek, egy visszavonás ms − 1-re emeli őket, az új táblát pedig az alkalmazás után 3 és 10 másodperces próba ellenőrzi.",
      },
    ],
  },
  {
    index: "05",
    tone: "brand",
    chip: "popopx.channel.enc.v1",
    title: {
      en: "Native service accounts, zero-knowledge channels",
      "pt-BR": "Contas de serviço nativas, canais de conhecimento zero",
      ko: "네이티브 서비스 계정, 영지식 채널",
      ar: "حسابات خدمة أصلية، وقنوات عديمة المعرفة",
      ru: "Встроенные сервис-аккаунты и каналы с нулевым разглашением",
      de: "Natives Dienstekonto und Zero-Knowledge-Kanäle",
      fr: "Comptes de service natifs et canaux à connaissance nulle",
      it: "Account di servizio nativi e canali a conoscenza zero",
      nl: "Native serviceaccounts en zero-knowledge-kanalen",
      cs: "Nativní servisní účty a kanály s nulovou znalostí",
      "zh-Hans": "原生服务号与零知识频道",
      "zh-Hant": "原生服務號與零知識頻道",
      es: "Cuentas de servicio nativas y canales de conocimiento cero",
      pl: "Natywne konta serwisowe i kanały zero-knowledge",
      ja: "ネイティブなサービスアカウントとゼロ知識チャンネル",
      th: "บัญชีบริการแบบเนทีฟและช่องทางความรู้อย่างศูนย์",
      fi: "Natiivit palvelutilit ja nollatiedon kanavat",
      uk: "Вбудовані сервіс-акаунти та канали з нульовим розголошенням",
      bg: "Вградени акаунти за услуги и канали с нулево разкриване",
      tr: "Yerleşik hizmet hesapları ve sıfır bilgi kanalları",
      hu: "Natív szolgáltatási fiókok és nulla-ismeretű csatornák",
    },
    hook: {
      en: "The menu has two levels, the card has three styles, and an H5 page opens outside this app's own process.",
      "pt-BR": "O menu tem dois níveis, o cartão tem três estilos, e uma página H5 abre fora do próprio processo deste app.",
      ko: "메뉴는 두 단계, 카드는 세 가지 스타일이며, H5 페이지는 이 앱 자체의 프로세스 밖에서 열립니다.",
      ar: "القائمة من مستويين، والبطاقة بثلاثة أنماط، وصفحة H5 تفتح خارج عملية هذا التطبيق نفسها.",
      ru: "У меню два уровня, у карточки три стиля, а H5-страница открывается за пределами процесса этого приложения.",
      de: "Das Menü hat zwei Ebenen, die Karte drei Stile, und eine H5-Seite öffnet sich außerhalb des Prozesses dieser App.",
      fr: "Le menu a deux niveaux, la carte trois styles, et une page H5 s'ouvre hors du processus de cette application.",
      it: "Il menu ha due livelli, la carta tre stili, e una pagina H5 si apre fuori dal processo di questa applicazione.",
      nl: "Het menu heeft twee niveaus, de kaart drie stijlen, en een H5-pagina opent buiten het proces van deze app.",
      cs: "Menu má dvě úrovně, karta tři styly a H5 stránka se otevírá mimo proces této aplikace.",
      "zh-Hans": "菜单只有两级，卡片只有三种样式，H5 页面在本进程之外打开。",
      "zh-Hant": "選單只有兩級，卡片只有三種樣式，H5 頁面在本程序之外開啟。",
      es: "El menú tiene dos niveles, la tarjeta tres estilos, y una página H5 se abre fuera del proceso de esta aplicación.",
      pl: "Menu ma dwa poziomy, karta trzy style, a strona H5 otwiera się poza procesem tej aplikacji.",
      ja: "メニューは 2 階層、カードは 3 種類のスタイルだけで、H5 ページは本アプリのプロセス外で開きます。",
      th: "เมนูมีสองระดับ การ์ดมีสามสไตล์ และหน้า H5 จะเปิดนอกโปรเซสของแอปนี้",
      fi: "Valikossa on kaksi tasoa, kortissa kolme tyyliä, ja H5-sivu avautuu tämän sovelluksen oman prosessin ulkopuolella.",
      uk: "Меню має два рівні, картка три стилі, а H5-сторінка відкривається поза процесом цієї застосунку.",
      bg: "Менюто има две нива, картата три стила, а H5 страница се отваря извън процеса на това приложение.",
      tr: "Menü iki düzeyden oluşur, kartın üç biçimi vardır ve bir H5 sayfası bu uygulamanın kendi sürecinin dışında açılır.",
      hu: "A menü két szintű, a kártyának három stílusa van, és egy H5 oldal ezen alkalmazás saját folyamatán kívül nyílik meg.",
    },
    facts: [
      {
        en: "The bottom bar owns exactly two levels: maximumMenuItems = 3 with maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), and a payload that carries a third level drops the whole menu (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        "pt-BR": "A barra inferior tem exatamente dois níveis: maximumMenuItems = 3 com maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), e um payload que carregue um terceiro nível descarta o menu inteiro (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        ko: "하단 바는 정확히 두 단계만 가집니다: maximumMenuItems = 3, maximumSubItems = 5(apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), 그리고 세 번째 단계를 담은 페이로드는 메뉴 전체를 버립니다(apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        ar: "يملك الشريط السفلي مستويين بالضبط: maximumMenuItems = 3 مع maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67)، وأي حمولة تحمل مستوى ثالثًا تلغي القائمة كلها (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        ru: "Нижняя панель владеет ровно двумя уровнями: maximumMenuItems = 3 и maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), а полезная нагрузка с третьим уровнем отбрасывает всё меню (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        de: "Die untere Leiste besitzt genau zwei Ebenen: maximumMenuItems = 3 mit maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), und eine Nutzlast mit dritter Ebene wirft das ganze Menü raus (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        fr: "La barre basse ne possède que deux niveaux : maximumMenuItems = 3 avec maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), et une charge utile avec un troisième niveau jette tout le menu (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        it: "La barra inferiore possiede esattamente due livelli: maximumMenuItems = 3 con maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), e un payload con un terzo livello scarta l'intero menu (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        nl: "De onderste balk bezit precies twee niveaus: maximumMenuItems = 3 met maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), en een payload met een derde niveau laat het hele menu vallen (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        cs: "Spodní lišta vlastní přesně dvě úrovně: maximumMenuItems = 3 s maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), a payload s třetí úrovní zahodí celé menu (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        "zh-Hans": "底部菜单栏只渲染两级：maximumMenuItems = 3、每项最多 maximumSubItems = 5（apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67）；一旦载荷里出现第三级，整个菜单会被丢弃（apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138）。",
        "zh-Hant": "底部選單列只渲染兩級：maximumMenuItems = 3、每項最多 maximumSubItems = 5（apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67）；一旦載入內容出現第三級，整個選單會被丟棄。",
        es: "La barra inferior posee exactamente dos niveles: maximumMenuItems = 3 con maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), y una carga útil con un tercer nivel descarta todo el menú (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        pl: "Dolny pasek ma dokładnie dwa poziomy: maximumMenuItems = 3 przy maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), a ładunek z trzecim poziomem odrzuca całe menu (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        ja: "ボトムバーが持つのはちょうど 2 階層で、maximumMenuItems = 3 と maximumSubItems = 5 が上限です（apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67）。3 階層目を含むペイロードはメニュー全体を破棄します（apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138）。",
        th: "แถบล่างสุดมีได้เพียงสองระดับ: maximumMenuItems = 3 และ maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67) หาก payload มีระดับที่สามเข้ามา ทั้งเมนูจะถูกทิ้งทันที (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138)",
        fi: "Alapalkilla on täsmälleen kaksi tasoa: maximumMenuItems = 3 ja maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), ja hyötykuorma, jossa on kolmas taso, hylkää koko valikon (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        uk: "Нижня панель має рівно два рівні: maximumMenuItems = 3 та maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), а корисне навантаження з третім рівнем відкидає все меню (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        bg: "Долната лента притежава точно две нива: maximumMenuItems = 3 с maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), а полезно натоварване с трето ниво изхвърля цялото меню (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        tr: "Alt çubuk tam olarak iki düzeye sahiptir: maximumMenuItems = 3 ve maximumSubItems = 5 (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67); üçüncü düzeyi içeren bir yük, tüm menüyü geçersiz kılar (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
        hu: "Az alsó sáv pontosan két szintet birtokol: maximumMenuItems = 3 a maximumSubItems = 5 mellé (apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67), és egy harmadik szintet tartalmazó hasznos teher az egész menüt eldobja (apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:137-138).",
      },
      {
        en: "A service card is standard, receipt or security — those three words are the enum — with create and update modes, at most 8 fields and 4 actions, newest winning on updatedAtMs.",
        "pt-BR": "Um cartão de serviço é standard, receipt ou security (essas três palavras são o enum), com modos de criação e atualização, no máximo 8 campos e 4 ações, e o mais recente prevalece em updatedAtMs.",
        ko: "서비스 카드는 standard, receipt, security 가운데 하나이며 — 이 세 단어가 열거형입니다 — create와 update 모드를 갖고, 필드는 최대 8개, 액션은 최대 4개이고, updatedAtMs가 더 새로운 쪽이 이깁니다.",
        ar: "بطاقة الخدمة إما standard أو receipt أو security — وهذه الكلمات الثلاث هي قيم التعداد نفسها — بوضعي الإنشاء والتحديث، وبحد أقصى 8 حقول و4 إجراءات، والأحدث يفوز وفق updatedAtMs.",
        ru: "Карточка сервиса — это standard, receipt или security, эти три слова и есть enum, с режимами create и update, максимум 8 полей и 4 действия, победителей определяет updatedAtMs.",
        de: "Eine Dienstekarte ist standard, receipt oder security — genau diese drei Wörter sind das Enum — mit create- und update-Modus, höchstens 8 Feldern und 4 Aktionen, den Ausschlag gibt updatedAtMs.",
        fr: "Une carte de service est standard, receipt ou security — ces trois mots sont l'enum — avec les modes create et update, au plus 8 champs et 4 actions, la plus récente gagne sur updatedAtMs.",
        it: "Una carta di servizio è standard, receipt o security — queste tre parole sono l'enum — con modalità create e update, al più 8 campi e 4 azioni, vince la più recente su updatedAtMs.",
        nl: "Een servicekaart is standard, receipt of security — die drie woorden zijn de enum — met create- en update-modus, maximaal 8 velden en 4 acties, de nieuwste wint op updatedAtMs.",
        cs: "Servisní karta je standard, receipt nebo security — tato tři slova jsou enum — s režimy create a update, nejvýše 8 polí a 4 akce, nejnovější vyhrává podle updatedAtMs.",
        "zh-Hans": "动态卡片样式就三种，枚举值写的是 standard、receipt、security，模式分 create 和 update，字段最多 8 个、操作最多 4 个，谁新谁赢（按 updatedAtMs 判）。",
        "zh-Hant": "動態卡片樣式就三種，列舉值寫的是 standard、receipt、security，模式分 create 與 update，欄位最多 8 個、操作最多 4 個，依 updatedAtMs 判定誰新誰贏。",
        es: "Una tarjeta de servicio es standard, receipt o security — esas tres palabras son el enum — con modos create y update, como máximo 8 campos y 4 acciones; gana la más reciente por updatedAtMs.",
        pl: "Karta serwisowa to standard, receipt albo security — te trzy słowa tworzą enum — z trybami create i update, co najwyżej 8 polami i 4 akcjami; nowsza wygrywa według updatedAtMs.",
        ja: "サービスカードのスタイルは standard / receipt / security の 3 つで、これが enum の値そのものです。モードは create と update、フィールドは最大 8、アクションは最大 4 で、updatedAtMs の新しい方が勝ちます。",
        th: "สไตล์ของการ์ดบริการมีสามแบบ คือ standard, receipt และ security ซึ่งเป็นค่า enum ตรง ๆ โดยมีโหมด create กับ update ฟิลด์สูงสุด 8 รายการ การกระทำสูงสุด 4 รายการ และยึด updatedAtMs ที่ใหม่กว่าเป็นผู้ชนะ",
        fi: "Palvelukortti on standard, receipt tai security — nuo kolme sanaa ovat enum — create- ja update-tilat mukana, korkeintaan 8 kenttää ja 4 toimintoa, uusin voittaa updatedAtMs:n perusteella.",
        uk: "Картка сервісу буває standard, receipt або security — ці три слова і є enum — із режимами create та update, щонайбільше 8 полів і 4 дії, перемагає найновіша за updatedAtMs.",
        bg: "Карточката за услуга е standard, receipt или security — тези три думи са енум — с режими create и update, най-много 8 полета и 4 действия, печели най-новата по updatedAtMs.",
        tr: "Bir hizmet kartı standard, receipt veya security'dir — bu üç sözcük enum'ın ta kendisidir — create ve update modlarıyla, en çok 8 alan ve 4 eylem içerir; güncel olan updatedAtMs üzerinden kazanır.",
        hu: "Egy szolgáltatási kártya lehet standard, receipt vagy security — ez a három szó maga az enum — create és update móddal, legfeljebb 8 mezővel és 4 művelettel; az updatedAtMs alapján a frissebb nyer.",
      },
      {
        en: "Channel traffic is popopx.channel.enc.v1, a ChaCha20-Poly1305 box signed by the channel's Ed25519 identity key, and the next epoch key travels inside an envelope sealed with the key it replaces (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        "pt-BR": "O tráfego do canal é popopx.channel.enc.v1, uma caixa ChaCha20-Poly1305 assinada pela chave de identidade Ed25519 do canal, e a chave da época seguinte viaja dentro de um envelope selado com a chave que ela substitui (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        ko: "채널 트래픽은 popopx.channel.enc.v1이며, 채널의 Ed25519 신원 키로 서명한 ChaCha20-Poly1305 박스이고, 다음 에폭 키는 자기가 대체하는 키로 봉인한 봉투 안에서 이동합니다(apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        ar: "حركة القناة هي popopx.channel.enc.v1، صندوق ChaCha20-Poly1305 موقّع بمفتاح هوية القناة Ed25519، ومفتاح الحقبة التالية ينتقل داخل مغلّف مختوم بالمفتاح الذي يحل محله (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        ru: "Трафик канала — это popopx.channel.enc.v1, коробка ChaCha20-Poly1305, подписанная идентификационным Ed25519-ключом канала, а следующий ключ эпохи идёт внутри конверта, запечатанного заменяемым им ключом (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        de: "Kanalverkehr ist popopx.channel.enc.v1, eine ChaCha20-Poly1305-Box, signiert vom Ed25519-Identitätsschlüssel des Kanals, und der nächste Epoch-Schlüssel reist in einem Umschlag, versiegelt mit dem Schlüssel, den er ersetzt (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        fr: "Le trafic de canal est popopx.channel.enc.v1, une boîte ChaCha20-Poly1305 signée par la clé d'identité Ed25519 du canal, et la clé d'epoch suivante voyage dans une enveloppe scellée avec la clé qu'elle remplace (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        it: "Il traffico del canale è popopx.channel.enc.v1, una box ChaCha20-Poly1305 firmata dalla chiave di identità Ed25519 del canale, e la prossima chiave epoch viaggia in una busta sigillata con la chiave che sostituisce (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        nl: "Kanaalverkeer is popopx.channel.enc.v1, een ChaCha20-Poly1305-box ondertekend door de Ed25519-identiteitssleutel van het kanaal, en de volgende epoch-sleutel reist in een envelop verzegeld met de sleutel die hij vervangt (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        cs: "Provoz kanálu je popopx.channel.enc.v1, box ChaCha20-Poly1305 podepsaný identifikačním klíčem Ed25519 kanálu, a další epoch klíč putuje v obálce zapečetěné klíčem, který nahrazuje (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        "zh-Hans": "频道流量走 popopx.channel.enc.v1：一个用频道 Ed25519 身份密钥签名的 ChaCha20-Poly1305 盒子，而下一个 epoch 密钥装在用旧密钥封好的信封里传输（apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341）。",
        "zh-Hant": "頻道流量走 popopx.channel.enc.v1：一個用頻道 Ed25519 身分金鑰簽名的 ChaCha20-Poly1305 盒子，而下一個 epoch 金鑰裝在用舊金鑰封好的信封裡傳輸（apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341）。",
        es: "El tráfico del canal es popopx.channel.enc.v1, una caja ChaCha20-Poly1305 firmada por la clave de identidad Ed25519 del canal, y la siguiente clave de época viaja dentro de un sobre sellado con la clave que reemplaza (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        pl: "Ruch kanału to popopx.channel.enc.v1, pudełko ChaCha20-Poly1305 podpisane kluczem tożsamości Ed25519 kanału, a następny klucz epoki podróżuje w kopercie zapieczętowanej kluczem, który zastępuje (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        ja: "チャンネルの通信は popopx.channel.enc.v1 で、チャンネルの Ed25519 ID 鍵で署名された ChaCha20-Poly1305 ボックスです。次のエポック鍵は、置き換える鍵で封をした信封の中に収めて送られます（apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341）。",
        th: "การรับส่งของช่องทางคือ popopx.channel.enc.v1 ซึ่งเป็นกล่อง ChaCha20-Poly1305 ที่เซ็นด้วยคีย์ตัวตน Ed25519 ของช่องทาง และ epoch คีย์ถัดไปจะถูกส่งในซองที่ผนึกด้วยคีย์เก่าที่มันมาแทนที่ (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341)",
        fi: "Kanavaliikenne on popopx.channel.enc.v1, ChaCha20-Poly1305-laatikko, joka on kanavan Ed25519-identiteettiavaimella allekirjoitettu, ja seuraava epoch-avain matkustaa kirjeessa, joka on sinetöity sen korvaavalla avaimella (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        uk: "Трафік каналу — це popopx.channel.enc.v1, коробка ChaCha20-Poly1305, підписана ідентифікаційним Ed25519-ключем каналу, а наступний ключ епохи подорожує в конверті, запечатаному ключем, який він замінює (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        bg: "Каналният трафик е popopx.channel.enc.v1, кутия ChaCha20-Poly1305, подписана с идентитетския Ed25519 ключ на канала, а следващият ключ на епохата пътува в плик, запечатан с ключа, който замества (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        tr: "Kanal trafiği popopx.channel.enc.v1'dir: kanalın Ed25519 kimlik anahtarıyla imzalanmış bir ChaCha20-Poly1305 kutusu; sıradaki epoch anahtarı, yerine geçtiği anahtarla mühürlenmiş bir zarf içinde yolculuk eder (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
        hu: "A csatornaforgalom popopx.channel.enc.v1: egy ChaCha20-Poly1305 doboz, amelyet a csatorna Ed25519 azonosító kulcsa írt alá, és a következő epoch-kulcs az általa leváltott kulccsal lepecsételt borítékban utazik (apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,341).",
      },
    ],
  },
  {
    index: "06",
    tone: "mesh",
    chip: "PanicWipe 6 steps",
    title: {
      en: "Duress protection and emergency wipe",
      "pt-BR": "Proteção contra coação e apagamento de emergência",
      ko: "강압 보호와 긴급 와이프",
      ar: "الحماية من الإكراه ومحو الطوارئ",
      ru: "Защита при принуждении и экстренное стирание",
      de: "Duress-Schutz und Notfalllöschung",
      fr: "Protection sous contrainte et effacement d'urgence",
      it: "Protezione sotto costrizione e cancellazione d'emergenza",
      nl: "Bescherming onder dwang en noodwissen",
      cs: "Ochrana při nátlaku a nouzové vymazání",
      "zh-Hans": "防窥与紧急擦除",
      "zh-Hant": "防窺與緊急擦除",
      es: "Protección bajo coacción y borrado de emergencia",
      pl: "Ochrona pod przymusem i awaryjne kasowanie",
      ja: "強要への対策と緊急消去",
      th: "การป้องกันถูกบังคับและลบฉุกเฉิน",
      fi: "Pakotussuoja ja hätäpyyhkäisy",
      uk: "Захист від примусу та термінове витирання",
      bg: "Защита при принуда и спешно изтриване",
      tr: "Baskı altında koruma ve acil silme",
      hu: "Kényszer elleni védelem és vésztörlés",
    },
    hook: {
      en: "Three taps, a 15-second confirmation and six fixed steps — and the chat database is touched only on an explicit opt-in.",
      "pt-BR": "Três toques, uma confirmação de 15 segundos e seis etapas fixas — e o banco de dados do chat só é tocado com um consentimento explícito.",
      ko: "세 번의 탭, 15초 확인, 여섯 개의 고정 단계 — 그리고 채팅 데이터베이스는 명시적으로 선택했을 때만 건드립니다.",
      ar: "ثلاث نقرات، وتأكيد مدته 15 ثانية، وست خطوات ثابتة — ولا مساس بقاعدة بيانات المحادثة إلا بموافقة صريحة.",
      ru: "Три касания, подтверждение в течение 15 секунд и шесть фиксированных шагов — а база чатов затрагивается только по явному включению.",
      de: "Drei Tipps, eine 15-Sekunden-Bestätigung und sechs feste Schritte – und die Chat-Datenbank wird nur bei ausdrücklicher Opt-in angefasst.",
      fr: "Trois appuis, une confirmation de 15 secondes et six étapes fixes — et la base de chats n'est touchée qu'avec un opt-in explicite.",
      it: "Tre tocchi, una conferma di 15 secondi e sei passi fissi — e il database delle chat viene toccato solo con un opt-in esplicito.",
      nl: "Drie tikken, een bevestiging van 15 seconden en zes vaste stappen — en de chatdatabank wordt alleen aangeraakt bij een expliciete opt-in.",
      cs: "Tři klepnutí, 15s potvrzení a šest pevných kroků — a do chatové databáze se sahá jen při explicitním opt-in.",
      "zh-Hans": "连点三次、15 秒内确认、六个固定步骤——聊天数据库默认不动，除非显式打开。",
      "zh-Hant": "連點三次、15 秒內確認、六個固定步驟——聊天資料庫預設不動，除非明確開啟。",
      es: "Tres toques, una confirmación de 15 segundos y seis pasos fijos — y la base de datos del chat solo se toca con un opt-in explícito.",
      pl: "Trzy stuknięcia, 15-sekundowe potwierdzenie i sześć stałych kroków — a bazy danych czatu dotyka się tylko przy jawnym włączeniu.",
      ja: "3 回のタップ、15 秒の確認、6 つの固定ステップ。チャットのデータベースは明示的にオプトインしない限り触りません。",
      th: "แตะสามครั้ง ยืนยันภายใน 15 วินาที และหกขั้นตอนคงที่ — ส่วนฐานข้อมูลแชทจะถูกแตะเฉพาะเมื่อเปิดใช้แบบชัด ๆ เท่านั้น",
      fi: "Kolme napautusta, 15 sekunnin vahvistus ja kuusi kiinteää vaihetta — eikä chat-tietokantaan kosketa ilman nimenomaista opt-iniä.",
      uk: "Три дотики, 15-секундне підтвердження і шість фіксованих кроків — а базу даних чату чіпають лише за явного увімкнення.",
      bg: "Три допирания, 15-секундно потвърждение и шестте фиксирани стъпки — и базата от данни на чата се докосва само при изрично включване.",
      tr: "Üç dokunuş, 15 saniyelik onay ve altı sabit adım — ve sohbet veritabanına yalnızca açık bir opt-in ile dokunulur.",
      hu: "Három koppintás, 15 másodperces megerősítés és hat rögzített lépés — és a chat-adatbázist csak kifejezett bekapcsolás esetén érintjük meg.",
    },
    facts: [
      {
        en: "Arming is exactly three taps inside a 1.0-second window, with a confirmation that stays answerable for 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — no hardware-button combo is involved.",
        "pt-BR": "O armamento é exatamente três toques dentro de uma janela de 1.0 segundo, com uma confirmação que permanece respondível por 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — nenhuma combinação de botões de hardware está envolvida.",
        ko: "무장은 1.0초 창 안에서 정확히 세 번 탭하는 것이고, 확인은 15 s 동안 응답할 수 있는 상태로 유지됩니다(apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — 하드웨어 버튼 조합은 관여하지 않습니다.",
        ar: "التسليح ثلاث نقرات بالضبط خلال نافذة 1.0 ثانية، مع تأكيد يبقى قابلًا للإجابة 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — ولا تدخل أي تركيبة من أزرار العتاد في ذلك.",
        ru: "Взведение — это ровно три касания в окне 1,0 секунды с подтверждением, которое остаётся активным 15 с (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368), — аппаратная комбинация кнопок не участвует.",
        de: "Das Scharfschalten sind genau drei Tipps in einem 1,0-Sekunden-Fenster mit einer 15 s beantwortbaren Bestätigung (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — eine Hardware-Tastenkombination ist nicht im Spiel.",
        fr: "L'armement est exactement trois appuis dans une fenêtre de 1,0 seconde, avec une confirmation restant répondable 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — aucune combinaison de boutons matériels n'intervient.",
        it: "L'armamento è esattamente tre tocchi in una finestra di 1,0 secondi, con una conferma rispondibile per 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368): nessuna combinazione di tasti hardware è coinvolta.",
        nl: "Bewapenen is precies drie tikken binnen een venster van 1,0 seconde, met een bevestiging die 15 s beantwoordbaar blijft (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — geen hardwaretoetsencombinatie is betrokken.",
        cs: "Aktivace je přesně tři klepnutí v okně 1,0 s, s potvrzením, které je otevřeno 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — žádná kombinace hardwareových tlačítek není ve hře.",
        "zh-Hans": "触发就是在 1.0 秒内正好连点三次，随后的确认框有效 15 秒（apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368），不涉及任何硬件按键组合。",
        "zh-Hant": "觸發就是在 1.0 秒內正好連點三次，隨後確認框有效 15 秒（apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368），不涉及任何硬體按鍵組合。",
        es: "El armado son exactamente tres toques en una ventana de 1,0 segundos, con una confirmación que permanece respondible 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368); no interviene ninguna combinación de botones físicos.",
        pl: "Uzbrojenie to dokładnie trzy stuknięcia w oknie 1,0 sekundy, z potwierdzeniem odpowiadającym przez 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — żadna kombinacja przycisków sprzętowych nie wchodzi w grę.",
        ja: "起動条件は 1.0 秒以内にちょうど 3 回タップすることで、その後 15 秒間確認ダイアログが有効です（apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368）。物理ボタンの同時押しは使いません。",
        th: "การอาร์มคือการแตะสามครั้งภายในหน้าต่าง 1.0 วินาที พร้อมกล่องยืนยันที่ตอบกลับได้ 15 วินาที (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) และไม่มีการใช้ปุ่มฮาร์ดแวร์ร่วมกันเลย",
        fi: "Aseistus on täsmälleen kolme napautusta 1,0 sekunnin ikkunassa, ja vahvistus pysyy vastattavissa 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — laitteiston painokytkelmää ei ole mukana.",
        uk: "Зведення — це рівно три дотики впродовж вікна 1,0 с із підтвердженням, активним 15 с (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — апаратна комбінація кнопок не залучена.",
        bg: "Зареждането е точно три допирания в прозорец от 1,0 секунда, с потвърждение, на което може да се отговори за 15 s (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — не е намесена хардуерна комбинация от бутони.",
        tr: "Kurulma, 1,0 saniyelik bir pencere içinde tam olarak üç dokunuştur ve ardından 15 s boyunca yanıtlanabilir bir onay gelir (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — herhangi bir donanım tuşu kombinasyonu kullanılmaz.",
        hu: "Az aktiválás pontosan három koppintás egy 1,0 másodperces ablakban, egy 15 másodpercig válaszolható megerősítéssel (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:360-368) — semmilyen hardveres gombkombináció nincs benne.",
      },
      {
        en: "The order is fixed: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — and step 5 defaults to off (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        "pt-BR": "A ordem é fixa: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — e a etapa 5 vem desativada por padrão (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        ko: "순서는 고정입니다: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — 그리고 5단계는 기본적으로 꺼져 있습니다(apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        ar: "الترتيب ثابت: stopRadio، clearVolatileState، eraseKeychainMapping، overwriteMeshSandbox، overwriteApplicationDatabase، terminate — والخطوة 5 معطّلة افتراضيًا (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        ru: "Порядок фиксирован: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — и шаг 5 по умолчанию выключен (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        de: "Die Reihenfolge ist fest: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — und Schritt 5 ist standardmäßig aus (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        fr: "L'ordre est fixe : stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — et l'étape 5 est désactivée par défaut (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        it: "L'ordine è fisso: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — e il passo 5 è spento di default (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        nl: "De volgorde is vast: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — en stap 5 staat standaard uit (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        cs: "Pořadí je pevné: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — a krok 5 je ve výchozím nastavení vypnutý (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        "zh-Hans": "步骤顺序是固定的：stopRadio、clearVolatileState、eraseKeychainMapping、overwriteMeshSandbox、overwriteApplicationDatabase、terminate，其中第 5 步默认关闭（apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100）。",
        "zh-Hant": "步驟順序是固定的：stopRadio、clearVolatileState、eraseKeychainMapping、overwriteMeshSandbox、overwriteApplicationDatabase、terminate，其中第 5 步預設關閉（apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100）。",
        es: "El orden es fijo: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — y el paso 5 está desactivado por defecto (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        pl: "Kolejność jest ustalona: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — a krok 5 jest domyślnie wyłączony (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        ja: "手順は固定順です。stopRadio、clearVolatileState、eraseKeychainMapping、overwriteMeshSandbox、overwriteApplicationDatabase、terminate で、5 番目のステップは既定でオフです（apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100）。",
        th: "ลำดับขั้นถูกกำหนดตายตัว: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase และ terminate โดยขั้นที่ 5 ปิดเป็นค่าเริ่มต้น (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100)",
        fi: "Järjestys on kiinteä: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — ja vaihe 5 on oletuksena pois päältä (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        uk: "Порядок фіксований: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — і крок 5 типово вимкнено (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        bg: "Поредността е фиксирана: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — и стъпка 5 е изключена по подразбиране (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        tr: "Sıra sabittir: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — ve 5. adım varsayılan olarak kapalıdır (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
        hu: "A sorrend rögzített: stopRadio, clearVolatileState, eraseKeychainMapping, overwriteMeshSandbox, overwriteApplicationDatabase, terminate — és az 5. lépés alapértelmezetten ki van kapcsolva (apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:5-15,100).",
      },
      {
        en: "Unpacked plaintext is purged on didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) and at every wipe step; duress passwords are PBKDF2-HMAC-SHA256 with 100,000 iterations, and Face ID gates the mnemonic, the app lock and the secure window.",
        "pt-BR": "Texto simples desempacotado é purgado em didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) e em cada etapa do apagamento; as senhas de coação são PBKDF2-HMAC-SHA256 com 100,000 iterações, e o Face ID controla o acesso à mnemônica, ao bloqueio do app e à janela segura.",
        ko: "압축을 푼 평문은 didEnterBackground에서(apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) 그리고 모든 와이프 단계에서 삭제되며, 강압 비밀번호는 100,000회 반복의 PBKDF2-HMAC-SHA256이고, Face ID가 니모닉, 앱 잠금, 보안 창에 대한 접근을 통제합니다.",
        ar: "يمحى النص العادي المفكوك عند didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) وعند كل خطوة من خطوات المحو؛ وكلمات مرور الإكراه هي PBKDF2-HMAC-SHA256 بـ 100,000 دورة، ويحرس Face ID العبارة الاستذكارية وقفل التطبيق والنافذة الآمنة.",
        ru: "Распакованный открытый текст вычищается при didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) и на каждом шаге стирания; пароли принуждения — PBKDF2-HMAC-SHA256 со 100 000 итерациями, а Face ID закрывает мнемонику, блокировку приложения и безопасное окно.",
        de: "Ungepackter Klartext wird bei didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) und bei jedem Löschungsschritt getilgt; Duress-Passwörter sind PBKDF2-HMAC-SHA256 mit 100.000 Iterationen, und Face ID versperrt Mnemonic, App-Sperre und das sichere Fenster.",
        fr: "Le texte clair dépaqueté est purgé à didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) et à chaque étape d'effacement ; les mots de passe sous contrainte sont en PBKDF2-HMAC-SHA256 avec 100 000 itérations, et Face ID verrouille la mnémonique, le verrouillage de l'app et la fenêtre sécurisée.",
        it: "Il testo in chiaro decompresso viene eliminato su didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) e a ogni passo di cancellazione; le password sotto costrizione usano PBKDF2-HMAC-SHA256 con 100.000 iterazioni, e Face ID protegge la mnemonica, il blocco app e la finestra sicura.",
        nl: "Ungepakte platetekst wordt gepurgeerd bij didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) en bij elke wis-stap; duress-wachtwoorden zijn PBKDF2-HMAC-SHA256 met 100.000 iteraties, en Face ID vergrendelt de herstelin, de app-vergrendeling en het beveiligde venster.",
        cs: "Rozbalený čistý text je vymazán při didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) a při každém kroku vymazání; nátlaková hesla jsou PBKDF2-HMAC-SHA256 se 100 000 iteracemi a Face ID zamyká mnemonic, zámek aplikace a bezpečné okno.",
        "zh-Hans": "解包出来的明文会在 didEnterBackground 时清除（apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169），每个擦除步骤也会清；防窥密码用 PBKDF2-HMAC-SHA256、100000 次迭代，助记词、应用锁和安全窗口都要过 Face ID。",
        "zh-Hant": "解包出來的明文會在 didEnterBackground 時清除（apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169），每個擦除步驟也會清；防窺密碼採 PBKDF2-HMAC-SHA256、100000 次迭代，助記詞、應用鎖與安全視窗都要過 Face ID。",
        es: "El texto plano desempaquetado se purga en didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) y en cada paso del borrado; las contraseñas bajo coacción usan PBKDF2-HMAC-SHA256 con 100.000 iteraciones, y Face ID protege el mnemónico, el bloqueo de la app y la ventana segura.",
        pl: "Rozpakowany jawny tekst jest czyszczony przy didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) i w każdym kroku kasowania; hasła pod przymusem to PBKDF2-HMAC-SHA256 ze 100 000 iteracji, a Face ID pilnuje frazy startowej, blokady aplikacji i bezpiecznego okna.",
        ja: "展開された平文は didEnterBackground で消去され（apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169）、消去の各ステップでも同様に処理されます。強要用パスワードは PBKDF2-HMAC-SHA256 の 100,000 反復で、リカバリーフレーズ、アプリロック、セーフウィンドウは Face ID を通ります。",
        th: "ข้อความที่ถูกแตกออกมาจะถูกล้างตอน didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) และในทุกขั้นของการลบ ส่วนรหัสผ่านกรณีถูกบังคับจะใช้ PBKDF2-HMAC-SHA256 จำนวน 100000 รอบ และ Face ID จะคุมทั้งคำช่วยจำ, การล็อกแอป และหน้าต่างปลอดภัย",
        fi: "Purettu raakateksti siivotaan didEnterBackgroundin aikana (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) ja jokaisella pyyhkäisyn vaiheella; pakotussanat ovat PBKDF2-HMAC-SHA256 100 000 iteraatiolla, ja Face ID lukitsee muistilauseen, sovelluslukon ja suojatun ikkunan.",
        uk: "Розпакований відкритий текст вилучується під час didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) і на кожному кроці витирання; паролі примусу — PBKDF2-HMAC-SHA256 зі 100 000 ітерацій, а Face ID замикає мнемоніку, блокування застосунку й безпечне вікно.",
        bg: "Разопакованият чист текст се зачиства при didEnterBackground (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) и на всяка стъпка от изтриването; паролите при принуда са PBKDF2-HMAC-SHA256 със 100 000 итерации, а Face ID заключва мнемониката, заключването на приложението и защитения прозорец.",
        tr: "Açılmış düz metin didEnterBackground sırasında (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) ve silmenin her adımında temizlenir; baskı altındaki parolalar PBKDF2-HMAC-SHA256 ile 100.000 yinelemeden türetilir ve Face ID, kurtarma kelimelerini, uygulama kilidini ve güvenli pencereyi korur.",
        hu: "A kicsomagolt nyílt szöveg törlődik didEnterBackground-kor (apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:148-169) és a törlés minden lépésénél; a kényszer-hitelmszavak PBKDF2-HMAC-SHA256 alapján, 100 000 iterációval származékolódnak, a Face ID pedig a helyreállító mondat, az alkalmazászár és a biztonságos ablák elé társul.",
      },
    ],
  },
];

/** Label of the link that points at the client repository. */
const REPO_LINK_LABEL: Localized<string> = {
  en: "Open the client repo",
  "pt-BR": "Abrir o repositório do cliente",
  ko: "클라이언트 저장소 열기",
  ar: "افتح مستودع العميل",
  ru: "Открыть репозиторий клиента",
  de: "Client-Repository öffnen",
  fr: "Ouvrir le dépôt du client",
  it: "Apri il repository del client",
  nl: "Client-repo openen",
  cs: "Otevřít repozitář klienta",
  "zh-Hans": "打开客户端仓库",
  "zh-Hant": "開啟客戶端倉庫",
  es: "Abrir el repositorio del cliente",
  pl: "Otwórz repozytorium klienta",
  ja: "クライアントのリポジトリを開く",
  th: "เปิดคลังโค้ดของไคลเอนต์",
  fi: "Avaa asiakkaan ohjelmavarasto",
  uk: "Відкрити сховище клієнта",
  bg: "Отвори хранилището на клиента",
  tr: "İstemci deposunu aç",
  hu: "A kliens tárolójának megnyitása",
};

/** Closing honesty row: what a visitor is allowed to check for themselves. */
const NOTE: Localized<string> = {
  en: "Each row above can be checked line by line in the open-source client: same file names, same constants, same numbers. The repo is linked here, and no claim on this page is rounded up.",
  "pt-BR": "Cada linha acima pode ser conferida linha a linha no cliente de código aberto: mesmos nomes de arquivo, mesmas constantes, mesmos números. O repositório está linkado aqui, e nenhuma afirmação nesta página é arredondada.",
  ko: "위의 각 행은 오픈 소스 클라이언트에서 줄 단위로 확인할 수 있습니다: 같은 파일 이름, 같은 상수, 같은 숫자입니다. 저장소는 여기에서 연결되어 있으며, 이 페이지의 어떤 주장도 반올림하지 않습니다.",
  ar: "يمكن فحص كل صف أعلاه سطرًا بسطر في العميل مفتوح المصدر: الأسماء نفسها للملفات، والثوابت نفسها، والأرقام نفسها. والمستودع مرتبط هنا، ولا يوجد في هذه الصفحة أي ادعاء فيه مبالغة.",
  ru: "Каждую строку выше можно сверить построчно в клиенте с открытым исходным кодом: те же имена файлов, те же константы, те же числа. Репозиторий приведён здесь, и ни одно утверждение на этой странице не приукрашено.",
  de: "Jede Zeile oben lässt sich Zeile für Zeile im Open-Source-Client nachprüfen: dieselben Dateinamen, dieselben Konstanten, dieselben Zahlen. Der Repo-Link ist hier, und keine Aussage auf dieser Seite wird hochgerundet.",
  fr: "Chaque ligne ci-dessus se vérifie ligne à ligne dans le client open source : mêmes noms de fichiers, mêmes constantes, mêmes nombres. Le dépôt est lié ici, et aucune affirmation de cette page n'est enjolivée.",
  it: "Ogni riga qui sopra è verificabile riga per riga nel client open source: stessi nomi di file, stesse costanti, stessi numeri. Il repository è collegato qui e nessuna affermazione di questa pagina è arrotondata per eccesso.",
  nl: "Elke regel hierboven is regel voor regel te controleren in de open-source cliënt: dezelfde bestandsnamen, dezelfde constanten, dezelfde getallen. De repo is hier gelinkt en geen bewering op deze pagina wordt opgetuigd.",
  cs: "Každý řádek výše lze řádek po řádce ověřit v open-source klientovi: stejné názvy souborů, stejné konstanty, stejná čísla. Repozitář je odkazován zde a žádné tvrzení na této stránce se nezveličuje.",
  "zh-Hans": "上面的每一行都能在开源客户端里逐行核对：同样的文件名、同样的常量、同样的数值。仓库链接就在旁边，本页没有任何夸大。",
  "zh-Hant": "上方的每一行都能在開放原始碼客戶端裡逐行核對：相同的檔名、相同的常數、相同的數值。倉庫連結就在旁邊，本頁沒有任何誇大。",
  es: "Cada línea anterior puede verificarse línea por línea en el cliente de código abierto: los mismos nombres de archivo, las mismas constantes, los mismos números. El repositorio está enlazado aquí y ninguna afirmación de esta página se exagera.",
  pl: "Każdy wiersz powyżej można wiersz po wierszu zweryfikować w kliencie open source: te same nazwy plików, te same stałe, te same liczby. Repozytorium jest podlinkowane tutaj i żadne stwierdzenie na tej stronie nie jest naciągane.",
  ja: "上記の各行は、オープンソースのクライアントを 1 行ずつ開いて確認できます。同じファイル名、同じ定数、同じ数値。リポジトリへのリンクをこの横に置いており、このページのどんな主張も誇張していません。",
  th: "ทุกข้อความด้านบนสามารถตรวจสอบแบบบรรทัดต่อบรรทัดในไคลเอนต์โอเพนซอร์สได้: ชื่อไฟล์เดียวกัน ค่าคงที่เดียวกัน ตัวเลขเดียวกัน ลิงก์ไปยังคลังโค้ดอยู่ข้าง ๆ นี้ และไม่มีข้อความใดในหน้านี้ที่ถูกตกแต่งให้เกินจริง",
  fi: "Jokainen yllä oleva rivi on tarkistettavissa rivi kerrallaan avoimen lähdekoodin asiakkaasta: samat tiedostonimet, samat vakiot, samat luvut. Ohjelmavarasto on linkitetty tähän, eikä mikään väite tällä sivulla ole kaunisteltu.",
  uk: "Кожен рядок вище можна перевірити рядок за рядком у клієнті з відкритим кодом: ті самі імена файлів, ті самі константи, ті самі числа. Сховище залинковане тут, і жодне твердження на цій сторінці не перебільшене.",
  bg: "Всеки от горните редове може да бъде проверен ред по ред в клиента с отворен код: същите имена на файлове, същите константи, същите числа. Хранилището е свързано тук, и нито едно твърдение на тази страница не е преувеличено.",
  tr: "Yukarıdaki her satır, açık kaynaklı istemcide satır satır doğrulanabilir: aynı dosya adları, aynı sabitler, aynı sayılar. Depo bağlantısı burada yer alıyor ve bu sayfadaki hiçbir iddia abartılmış değil.",
  hu: "A fenti minden sort sorról sorra ellenőrizhetjük a nyílt forráskódú kliensben: ugyanazok a fájlnevek, ugyanazok az állandók, ugyanazok a számok. A tárolóra itt található a hivatkozás, és ezen az oldalon egyetlen állítás sincs felnagyítva.",
};

/** Compact variant: entry to /security with full source ledger. */
const SECURITY_ENTRY_COPY: Localized<string> = {
  en: "View full security model & source ledger",
  "pt-BR": "Ver o modelo de segurança completo e o registro de fatos das fontes",
  ko: "전체 보안 모델과 소스 대장 보기",
  ar: "اطّلع على نموذج الأمان الكامل وسجل المصادر",
  ru: "Просмотреть полную модель безопасности и реестр исходного кода",
  de: "Vollständiges Sicherheitsmodell und Quellcode-Register anzeigen",
  fr: "Voir le modèle de sécurité complet et le registre source",
  it: "Visualizza il modello di sicurezza completo e il registro sorgente",
  nl: "Bekijk volledig beveiligingsmodel en bronregister",
  cs: "Zobrazit úplný model zabezpečení a registr zdrojového kódu",
  "zh-Hans": "查看完整安全模型与源码台账",
  "zh-Hant": "檢視完整安全模型與原始碼台帳",
  es: "Ver modelo de seguridad completo y registro de código fuente",
  pl: "Zobacz pełny model bezpieczeństwa i rejestr kodu źródłowego",
  ja: "完全なセキュリティモデルとソースレッジャーを表示",
  th: "ดูโมเดลความปลอดภัยเต็มรูปแบบและบัญชีแหล่งที่มา",
  fi: "Näytä täydellinen tietoturvamalli ja lähdekoodirekisteri",
  uk: "Переглянути повну модель безпеки та реєстр вихідного коду",
  bg: "Преглед на пълния модел на сигурност и регистъра на изходния код",
  tr: "Tam güvenlik modelini ve kaynak kaydını görüntüle",
  hu: "Teljes biztonsági modell és forráskód-nyilvántartás megtekintése",
};

/** One fact bullet — a hook-free line with a dot in the card's tone. */
function FactRow({ text, tone }: { text: Localized<string>; tone: "brand" | "mesh" }): ReactElement {
  const value = useCopy(text);
  return (
    <li className="flex gap-2">
      <span className="mt-[7px] shrink-0">
        <StatusDot tone={tone} />
      </span>
      <span className="min-w-0 break-words"><LtrText text={value} /></span>
    </li>
  );
}

/** One feature card: index, title, hook, three measured facts and a token chip. */
function FeatureCard({ feature, compact = false }: { feature: Feature; compact?: boolean }): ReactElement {
  const title = useCopy(feature.title);
  const hook = useCopy(feature.hook);

  return (
    <li className="animate-rise-in">
      <article className="glass glass-hover flex h-full flex-col gap-3 p-5">
        <header className="flex items-start gap-3">
          <span
            aria-hidden
            className={`font-mono text-[13px] font-semibold ${
              feature.tone === "brand" ? "text-brand-soft" : "text-mesh-soft"
            }`}
          >
            {feature.index}
          </span>
          <h3 className="text-[15.5px] font-semibold leading-snug text-white sm:text-[17px]">
            <LtrText text={title} />
          </h3>
        </header>

        <p className="text-[13px] leading-relaxed text-mute"><LtrText text={hook} /></p>

        {!compact && (
          <ul className="flex flex-col gap-2 text-[12px] leading-relaxed text-faint">
            {feature.facts.map((fact, i) => (
              <FactRow key={`${feature.index}-${i}`} text={fact} tone={feature.tone} />
            ))}
          </ul>
        )}

        <footer className="hairline-top mt-auto flex items-center gap-2 pt-3">
          <code dir="ltr" className="chip font-mono text-[10.5px] text-[#d7d7ea]">{feature.chip}</code>
        </footer>
      </article>
    </li>
  );
}

export function FeaturesGrid({ variant = "full" }: { variant?: "compact" | "full" }): ReactElement {
  const sectionLabel = useCopy(HEAD.title);
  const note = useCopy(NOTE);
  const repoLabel = useCopy(REPO_LINK_LABEL);
  const securityEntry = useCopy(SECURITY_ENTRY_COPY);

  const isCompact = variant === "compact";

  return (
    <section id="features" aria-label={sectionLabel} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading
          eyebrow={HEAD.eyebrow}
          title={HEAD.title}
          subtitle={HEAD.subtitle}
          titleAs="h1"
        />

        <ul className={`mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 ${isCompact ? "" : "lg:grid-cols-3"}`}>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.index} feature={feature} compact={isCompact} />
          ))}
        </ul>

        {isCompact ? (
          <div className="mt-8 flex justify-center">
            <Link
              href="/security/"
              className="pill text-[13px] text-white hover:bg-white/10 transition-colors"
            >
              {securityEntry}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ms-1.5 h-3.5 w-3.5 rtl:-scale-x-100"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="glass-inset mt-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex gap-2 text-[12px] leading-relaxed text-faint">
              <span className="mt-[6px] shrink-0">
                <StatusDot tone="mesh" pulse />
              </span>
              <span><LtrText text={note} /></span>
            </p>
            <p className="flex shrink-0 items-center gap-2">
              <a
                href={IOS_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill text-[12px] text-white"
              >
                {repoLabel}
              </a>
              <code className="chip font-mono text-[10.5px] text-[#d7d7ea]">AGPL-3.0</code>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

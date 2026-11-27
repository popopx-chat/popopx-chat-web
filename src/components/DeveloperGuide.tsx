"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { ROUTE_LABELS } from "@/components/Navbar";
import { LtrText } from "@/components/Ltr";
import { CodeBlock, SectionHeading, StatusDot } from "@/components/ui";
import {
  BOT_STUDIO_REPO_URL,
  BOT_STUDIO_WEB_REPO_URL,
  IOS_REPO_URL,
  MQ_REPO_URL,
  NODE_REPO_URL,
  SUITE_REPO_URL,
  SUITE_WEB_REPO_URL,
  WEB_REPO_URL,
} from "@/lib/site";

/**
 * DeveloperGuide — `/developers/`: build the iOS client from public source, and
 * the repositories that make the platform.
 *
 * Everything on this page was measured in the client repository; the anchors are
 * in `docs/FACTS.md` (§10 build, §7 config engine, §14 version, §15 hosted
 * portals and the engine's publication state) and the same numbers are cited
 * there with the command that re-derives them.
 *
 * · Build: ledger §10 — `MinimumOSVersion = 17.0` and `SWIFT_VERSION = 5.0`
 *   (`apps/ios/POPOPX.xcodeproj/project.pbxproj`), `swift-tools-version: 6.0` +
 *   `.iOS(.v15)` (`apps/ios/PopopxMeshKit/Package.swift:1,10`, package-side only),
 *   Xcode not pinned (`.github/workflows/ios-sim.yml:101,116`), the CI command and
 *   `scripts/ci/ios-stub-libs.sh` (`.github/workflows/build.yml:1400-1408`), shared
 *   schemes (`apps/ios/POPOPX.xcodeproj/xcshareddata/xcschemes/`), helpers in
 *   `scripts/ios/`.
 * · Config engine: ledger §7 for the client side (two tiers of storage, probes at
 *   3 s and 10 s after apply) and §15 for the server side, which is NOT public on
 *   2026-11-25 — `api.github.com/repos/popopx-chat/popopx-server-up-bot` answers
 *   404 — so the panel states the capability, marks it 开发中 / 源码待公开 and links
 *   nothing. `popopx-bot-studio` is a different product and must not be used to
 *   point at this engine.
 * · Repositories: the eight names below are the measured published tree of
 *   `github.com/popopx-chat`; GitHub's own `description` field for several of them
 *   contains words this portal never renders, so the list is built from
 *   `src/lib/site.ts` and nothing is read from the API at runtime.
 */

/** Verbatim from the client repository's CI job — a command, so locale-free. */
const BUILD_COMMAND =
  "xcodebuild build -quiet \\\n" +
  "  -project apps/ios/POPOPX.xcodeproj \\\n" +
  "  -scheme \"POPOPX (iOS)\" \\\n" +
  "  -configuration Debug \\\n" +
  "  -destination \"generic/platform=iOS Simulator\" \\\n" +
  "  -onlyUsePackageVersionsFromResolvedFile \\\n" +
  "  -skipPackagePluginValidation -skipMacroValidation \\\n" +
  "  ARCHS=arm64 CODE_SIGNING_ALLOWED=NO";

const BUILD_TITLE: Localized<string> = {
  en: "Build it from the public source",
  "pt-BR": "Compile a partir do código-fonte público",
  ko: "공개 소스에서 직접 빌드하기",
  ar: "ابنِه من المصدر العام",
  ru: "Сборка из публичного исходника",
  de: "Aus dem öffentlichen Quellcode bauen",
  fr: "Construire depuis le source public",
  it: "Compilare dal sorgente pubblico",
  nl: "Bouwen uit de openbare broncode",
  cs: "Sestavení z veřejného zdroje",
  "zh-Hans": "从公开源码构建",
  "zh-Hant": "從公開原始碼建置",
  es: "Compilar desde el código público",
  pl: "Zbuduj z publicznego kodu",
  ja: "公開ソースからビルドする",
  th: "สร้างจากซอร์สสาธารณะ",
  fi: "Käännä julkisesta lähteestä",
  uk: "Збірка з відкритого коду",
  bg: "Изградете от публичния код",
  tr: "Açık kaynaktan derleme",
  hu: "Fordítás a nyilvános forrásból",
};

const ROW_VERSION: Localized<string> = {
  en: "App MARKETING_VERSION",
  "pt-BR": "MARKETING_VERSION do app",
  ko: "앱 MARKETING_VERSION",
  ar: "MARKETING_VERSION في التطبيق",
  ru: "MARKETING_VERSION приложения",
  de: "MARKETING_VERSION der App",
  fr: "MARKETING_VERSION de l’app",
  it: "MARKETING_VERSION dell’app",
  nl: "MARKETING_VERSION van de app",
  cs: "MARKETING_VERSION aplikace",
  "zh-Hans": "App 的 MARKETING_VERSION",
  "zh-Hant": "App 的 MARKETING_VERSION",
  es: "MARKETING_VERSION de la app",
  pl: "MARKETING_VERSION aplikacji",
  ja: "アプリの MARKETING_VERSION",
  th: "MARKETING_VERSION ของแอป",
  fi: "Appin MARKETING_VERSION",
  uk: "MARKETING_VERSION застосунку",
  bg: "MARKETING_VERSION на приложението",
  tr: "Uygulamanın MARKETING_VERSION’ı",
  hu: "Az app MARKETING_VERSION értéke",
};

/**
 * What v1.2.0 is and what it is not: the fork's own number, adopted on
 * 2026-11-24, changing the published version string and nothing on the wire —
 * ledger §14. Measured in `project.pbxproj` on 2026-11-25: 6 configurations
 * carry 1.2.0 (app, NSE, SE — Debug and Release each) and 4 still carry the
 * inherited number (the test target and the framework target), so the copy
 * says "the app target and its two extensions" and never "the app target
 * only". The store record that would let this page link the release is still
 * `resultCount: 0`.
 */
const FACT_VERSION: Localized<string> = {
  en: "v1.2.0 is this fork’s own number, adopted on 2026-11-24. It replaced the inherited one in the app target and its two extensions; the test and framework targets still print the old number. The SMP and XFTP handshake versions and the database schema were left alone, so the client still talks to the relays as before. No store link comes with it.",
  "pt-BR": "v1.2.0 é o número próprio deste fork, adotado em 2026-11-24. Ele substituiu o número herdado no alvo do app e em suas duas extensões; os alvos de teste e de framework ainda imprimem o número antigo. As versões de handshake do SMP e do XFTP e o esquema do banco de dados ficaram intactos, então o cliente continua falando com os retransmissores como antes. Nenhum link de loja vem com isso.",
  ko: "v1.2.0은 2026-11-24에 채택된 이 포크 자체의 번호입니다. 앱 타깃과 두 확장에서 물려받은 번호를 대체했습니다. 테스트 및 프레임워크 타깃은 여전히 예전 번호를 출력합니다. SMP와 XFTP 핸드셰이크 버전과 데이터베이스 스키마는 그대로 두었으므로 클라이언트는 이전과 같이 릴레이와 통신합니다. 함께 제공되는 스토어 링크는 없습니다.",
  ar: "v1.2.0 رقم هذا التفرع نفسه، اعتمد في 2026-11-24. حل محل الرقم الموروث في هدف التطبيق وإضافتيه؛ أما هدفا الاختبار وإطار العمل فلا يزالان يطبعان الرقم القديم. وقد تركت إصدارات مصافحة SMP وXFTP ومخطط قاعدة البيانات دون مساس، لذا ما زال العميل يخاطب المرحّلات كما كان. ولا يأتي معه أي رابط متجر.",
  ru: "v1.2.0 — собственное число этого форка, введённое 2026-11-24. Оно заменило унаследованное в настройках цели приложения и двух его расширений; тестовая цель и цель framework всё ещё печатают старое число. Версии рукопожатия SMP и XFTP и схема базы данных не менялись, так что клиент по-прежнему говорит с релеями как раньше. Ссылки в магазин это не даёт.",
  de: "v1.2.0 ist die eigene Nummer dieses Forks, eingeführt am 2026-11-24. Sie ersetzt die geerbte in den Build-Einstellungen des App-Ziels und seiner zwei Erweiterungen; das Test- und das Framework-Ziel drucken noch die alte Nummer. Die SMP- und XFTP-Handshake-Versionen und das Datenbankschema blieben unverändert, der Client spricht also weiterhin wie zuvor mit den Relays. Ein Store-Link ergibt sich daraus nicht.",
  fr: "v1.2.0 est le numéro propre à ce fork, adopté le 2026-11-24. Il remplace l’hérité dans les réglages de build de la cible app et de ses deux extensions ; les cibles de test et de framework affichent encore l’ancien numéro. Les versions de poignée de main SMP et XFTP et le schéma de base sont restés tels quels, donc le client parle toujours aux relays comme avant. Cela n’apporte aucun lien de store.",
  it: "v1.2.0 è il numero proprio di questo fork, adottato il 2026-11-24. Sostituisce quello ereditato nelle build settings del target app e delle sue due extension; i target di test e framework stampano ancora il vecchio numero. Le versioni di handshake SMP e XFTP e lo schema del database sono lasciati invariati, quindi il client parla ancora ai relay come prima. Nessun link dello store ne deriva.",
  nl: "v1.2.0 is het eigen nummer van deze fork, aangenomen op 2026-11-24. Het vervangt het geërfde in de buildinstellingen van het app-target en zijn twee extensions; het test- en het framework-target tonen nog het oude nummer. De SMP- en XFTP-handshakesversies en het databaseschema bleven ongewijzigd, dus de client praat nog steeds tegen de relays zoals voorheen. Er komt geen storelink bij.",
  cs: "v1.2.0 je vlastní číslo tohoto forku, zavedené 2026-11-24. Nahrazuje zděděné číslo v nastavení buildu cíle aplikace a jejích dvou rozšíření; testovací cíl a cíl framework stále tisknou staré číslo. Verze handshake SMP a XFTP i schéma databáze zůstaly nedotčené, klient tedy mluví s relayi stále stejně jako dřív. Odkaz do obchodu z toho neplyne.",
  "zh-Hans": "v1.2.0 是这个分支自己的编号，2026-11-24 启用。它替换了 App 及其两个扩展的构建配置里继承来的那个号，测试与框架配置仍印旧号。SMP 与 XFTP 的握手版本、数据库 Schema 都没有改动，客户端照旧和已部署的中继通信。这个数字不附带任何商店链接。",
  "zh-Hant": "v1.2.0 是這個分支自己的編號，2026-11-24 啟用。它替換了 App 與其兩個擴充的建置設定裡繼承來的那個號，測試與框架設定仍顯示舊號。SMP 與 XFTP 的握手版本、資料庫 Schema 都沒有改動，客戶端照舊和已部署的中繼通訊。這個數字不附帶任何商店連結。",
  es: "v1.2.0 es el número propio de este fork, adoptado el 2026-11-24. Reemplaza al heredado en la configuración de build del target de la app y sus dos extensiones; los targets de test y framework aún imprimen el número viejo. Las versiones de handshake SMP y XFTP y el esquema de la base de datos quedan intactos, así que el cliente sigue hablando con los relays como antes. Esto no trae ningún enlace de tienda.",
  pl: "v1.2.0 to własny numer tego forka, przyjęty 2026-11-24. Zastępuje przejęty numer w ustawieniach buildu celu aplikacji i jego dwóch rozszerzeń; cel testów i cel framework nadal drukują stary numer. Wersje handshaku SMP i XFTP oraz schemat bazy danych pozostały bez zmian, więc klient rozmawia z relayami jak dotąd. Nie wiąże się z nim żaden link do sklepu.",
  ja: "v1.2.0 はこのフォーク独自の番号で、2026-11-24 に採用されました。アプリのターゲットとその 2 つのエクステンションのビルド設定で継承先の番号を置き換えたもので、テストとフレームワークのターゲットは旧番号のままです。SMP と XFTP のハンドシェイク版やデータベース スキーマはそのままなので、クライアントは今まで通りリレーと通信します。ストアのリンクは付いてきません。",
  th: "v1.2.0 คือเลขของฟอร์กนี้เอง เริ่มใช้เมื่อ 2026-11-24 มันแทนเลขที่รับมาใน build setting ของแอปและส่วนขยายอีกสองตัว ส่วนเป้าทดสอบกับเป้าเฟรมเวิร์กยังพิมพ์เลขเดิม เวอร์ชันแฮนด์เชกของ SMP และ XFTP กับสคีมาของฐานข้อมูลไม่ได้แตะ ไคลเอนต์จึงคุยกับ relay เหมือนเดิม และไม่มีลิงก์สโตร์มาพร้อมเลขนี้",
  fi: "v1.2.0 on tämän forkin oma numero, otettu käyttöön 2026-11-24. Se korvaa perityn numeron app-tavoitteen ja sen kahden laajennoksen build-asetuksissa; testi- ja kehystavoitteet tulostavat vielä vanhan numeron. SMP- ja XFTP-käsipversion sekä tietokantakaavan jätettiin ennalleen, joten asiakas puhuu releille kuten ennenkin. Tähän ei kuulu kauppalinkkiä.",
  uk: "v1.2.0 — власне число цього форка, введене 2026-11-24. Воно замінило успадковане в налаштуваннях збірки цілі застосунку та двох його розширень; ціль тестів і ціль framework досі друкують старе число. Версії handshak SMP і XFTP та схему бази даних не чіпали, тож клієнт говорить із релями як раніше. Посилання в магазин із цим не йде.",
  bg: "v1.2.0 е собственото число на този форк, прието на 2026-11-24. То замества наслепеното в настройките за сглобяване на целта на приложението и двете му разширения; целите за тест и framework все още отпечатват старото число. Версиите на SMP и XFTP ръкостискане и схемата на базата остават недокоснати, така че клиентът говори с релетата както преди. Никаква магазинска връзка не идва с него.",
  tr: "v1.2.0 bu fork’un kendi numarası ve 2026-11-24’te benimsendi. Devralınan numarayı uygulama hedefiyle iki uzantısının build ayarlarında değiştirdi; test ve framework hedefleri hâlâ eski numarayı basıyor. SMP ve XFTP el sıkışma sürümleriyle veritabanı şemasına dokunulmadı, yani istemci röle’lerle eskisi gibi konuşmaya devam ediyor. Bununla birlikte bir mağaza bağlantısı gelmiyor.",
  hu: "a v1.2.0 ennek a forknak a saját száma, 2026-11-24-én bevezetve. Az örökölt számot az app target és a két kiterjesztés build beállításaiban váltotta; a teszt és a framework target még a régi számot nyomtatja. Az SMP és XFTP kézfogás verziói és az adatbázis sémája érintetlen, úgyhogy az ügyfél ugyanúgy beszél a relékkel, mint eddig. Bolti link hozzá nem jár.",
};

const ROW_TARGET: Localized<string> = {
  en: "Deployment target",
  "pt-BR": "Alvo de implantação",
  ko: "배포 대상",
  ar: "هدف النشر",
  ru: "Целевая платформа",
  de: "Deployment-Ziel",
  fr: "Cible de déploiement",
  it: "Piattaforma minima",
  nl: "Doelplatform",
  cs: "Cílová platforma",
  "zh-Hans": "部署目标",
  "zh-Hant": "部署目標",
  es: "Plataforma de destino",
  pl: "Platforma docelowa",
  ja: "デプロイ先",
  th: "แพลตฟอร์มเป้าหมาย",
  fi: "Kohdealusta",
  uk: "Цільова платформа",
  bg: "Целева платформа",
  tr: "Hedef sürüm",
  hu: "Célplatform",
};

const ROW_SWIFT: Localized<string> = {
  en: "SWIFT_VERSION in the app",
  "pt-BR": "SWIFT_VERSION no app",
  ko: "앱의 SWIFT_VERSION",
  ar: "SWIFT_VERSION في التطبيق",
  ru: "SWIFT_VERSION в приложении",
  de: "SWIFT_VERSION der App",
  fr: "SWIFT_VERSION dans l'app",
  it: "SWIFT_VERSION nell'app",
  nl: "SWIFT_VERSION in de app",
  cs: "SWIFT_VERSION v aplikaci",
  "zh-Hans": "App 的 SWIFT_VERSION",
  "zh-Hant": "App 的 SWIFT_VERSION",
  es: "SWIFT_VERSION en la app",
  pl: "SWIFT_VERSION w aplikacji",
  ja: "アプリの SWIFT_VERSION",
  th: "SWIFT_VERSION ในแอป",
  fi: "SWIFT_VERSION sovelluksessa",
  uk: "SWIFT_VERSION у застосунку",
  bg: "SWIFT_VERSION в приложението",
  tr: "Uygulamada SWIFT_VERSION",
  hu: "SWIFT_VERSION az appben",
};

const ROW_XCODE: Localized<string> = {
  en: "What CI logs about Xcode",
  "pt-BR": "O que a CI registra sobre o Xcode",
  ko: "CI가 Xcode에 대해 기록하는 것",
  ar: "ما يسجله CI عن Xcode",
  ru: "Что CI пишет про Xcode",
  de: "Was CI über Xcode protokolliert",
  fr: "Ce que CI journalise sur Xcode",
  it: "Cosa CI registra su Xcode",
  nl: "Wat CI over Xcode logt",
  cs: "Co CI zaznamenává o Xcodu",
  "zh-Hans": "CI 记录的 Xcode 版本行",
  "zh-Hant": "CI 記錄的 Xcode 版本行",
  es: "Lo que CI registra sobre Xcode",
  pl: "Co CI loguje o Xcode",
  ja: "CI が Xcode について出力する行",
  th: "สิ่งที่ CI บันทึกเรื่อง Xcode",
  fi: "Mitä CI lokittaa Xcodesta",
  uk: "Що CI пише про Xcode",
  bg: "Какво CI записва за Xcode",
  tr: "CI'ın Xcode hakkında kaydettiği",
  hu: "Mit naplóz a CI az Xcode-ról",
};

const FACT_UNPINNED: Localized<string> = {
  en: "Nothing in the repository pins an Xcode build: CI only runs xcodebuild -version and logs whatever the runner has. So this page claims no floor like Xcode 16+ or Swift 5.9+ — there is no such requirement to verify.",
  "pt-BR": "Nada no repositório fixa uma build do Xcode: a CI só executa xcodebuild -version e registra o que o runner tiver. Portanto esta página não afirma nenhum piso como Xcode 16+ ou Swift 5.9+ — não existe tal requisito a verificar.",
  ko: "저장소에는 Xcode 빌드를 고정하는 것이 없습니다. CI는 xcodebuild -version만 실행하고 러너에 있는 것을 그대로 기록합니다. 그래서 이 페이지는 Xcode 16+나 Swift 5.9+ 같은 최소 버전을 주장하지 않습니다. 검증할 그런 요구 사항이 없기 때문입니다.",
  ar: "لا شيء في المستودع يحدد إصدار Xcode بعينه: فـCI لا يشغل سوى xcodebuild -version ويسجل ما لدى المشغل. لذا لا تزعم هذه الصفحة حدًا أدنى مثل Xcode 16+ أو Swift 5.9+ — فلا وجود لمتطلب كهذا يتم التحقق منه.",
  ru: "Репозиторий не закрепляет версию Xcode: CI только запускает xcodebuild -version и пишет то, что есть на раннере. Поэтому здесь нет обещания «Xcode 16+» или «Swift 5.9+» — такой требования нет, и проверять нечего.",
  de: "Im Repository ist keine Xcode-Version festgenagelt: CI führt nur xcodebuild -version aus und loggt, was der Runner hat. Deshalb behauptet diese Seite keine Untergrenze wie Xcode 16+ oder Swift 5.9+ — eine solche Anforderung gibt es nicht.",
  fr: "Rien dans le dépôt n'épingle une version d'Xcode : CI lance seulement xcodebuild -version et journalise ce que le runner contient. Cette page ne revendique donc aucun plancher du type Xcode 16+ ou Swift 5.9+ — il n'y a pas une telle exigence à vérifier.",
  it: "Nel repository nessuna versione di Xcode è fissata: CI esegue solo xcodebuild -version e registra quello che il runner ha. Per questo questa pagina non dichiara un minimo come Xcode 16+ o Swift 5.9+ — non c'è un tale requisito da verificare.",
  nl: "In de repository wordt geen Xcode-versie vastgezet: CI voert alleen xcodebuild -version uit en logt wat de runner heeft. Deze pagina claimt dus geen ondergrens zoals Xcode 16+ of Swift 5.9+ — zo'n vereiste is er niet.",
  cs: "Repozitář napevno neurčuje verzi Xcode: CI jen spustí xcodebuild -version a zapíše, co runner má. Tato strana proto netvrdí žádnou mez, jako Xcode 16+ nebo Swift 5.9+ — takový požadavek není co ověřit.",
  "zh-Hans": "仓库里没有钉死 Xcode 版本：CI 只是运行 xcodebuild -version，打印运行器上当前的版本。所以本站不写「需要 Xcode 16+」或「Swift 5.9+」这类无法验证的下限。",
  "zh-Hant": "倉庫裡沒有釘死 Xcode 版本：CI 只是執行 xcodebuild -version，印出執行環境當前的版本。所以本站不寫「需要 Xcode 16+」或「Swift 5.9+」這類無法驗證的下限。",
  es: "El repositorio no fija una versión de Xcode: CI solo ejecuta xcodebuild -version y registra lo que tenga el runner. Por eso esta página no afirma un mínimo como Xcode 16+ o Swift 5.9+ — no existe ese requisito que verificar.",
  pl: "Repozytorium nie przypisuje wersji Xcode: CI tylko uruchamia xcodebuild -version i loguje to, co jest na runnerze. Dlatego ta strona nie twierdzi, że trzeba Xcode 16+ albo Swift 5.9+ — takiego wymagania nie ma czego sprawdzać.",
  ja: "リポジトリは Xcode のバージョンを固定していません。CI は xcodebuild -version を実行してランナーにあるものを出力するだけです。だからこのページに「Xcode 16+ が必要」や「Swift 5.9+」のような下限は書きません。検証しようが無いからです。",
  th: "ในคลังโค้ดไม่ได้ตรึงเวอร์ชัน Xcode ไว้: CI แค่วิ่ง xcodebuild -version แล้วบันทึกสิ่งที่เครื่องรันมี หน้านี้จึงไม่อ้างขั้นต่ำแบบ Xcode 16+ หรือ Swift 5.9+ เพราะไม่มีข้อกำหนดนั้นให้ตรวจ",
  fi: "Mikään repo ei lukitse Xcode-versiota: CI ajaa vain xcodebuild -version ja lokittaa runnerin sisällön. Tämä sivu ei siksi väitä alarajaa kuten Xcode 16+ tai Swift 5.9+ — tällaista vaatimusta ei ole tarkistettavissa.",
  uk: "У репозиторії версія Xcode не закріплена: CI лише запускає xcodebuild -version і пише те, що є на ранері. Тому ця сторінка не стверджує жодної межі на кшталт Xcode 16+ чи Swift 5.9+ — таку вимогу нікому перевіряти.",
  bg: "В хранилището няма фиксирана версия на Xcode: CI само пуска xcodebuild -version и записва каквото има на ранера. Затова тази страница не твърди долна граница като Xcode 16+ или Swift 5.9+ — няма такова изискване за проверка.",
  tr: "Depo Xcode sürümünü sabitlemiyor: CI yalnızca xcodebuild -version çalıştırıp üzerindekini günlüğe yazıyor. Bu yüzden bu sayfa Xcode 16+ ya da Swift 5.9+ gibi bir taban iddia etmiyor — doğrulanacak böyle bir gereksinim yok.",
  hu: "A tároló nem rögzít Xcode-verziót: a CI csak az xcodebuild -version parancsot futtatja, és naplózza, ami a futón van. Ez az oldal ezért nem állít ilyet, hogy Xcode 16+ vagy Swift 5.9+ kell — egy ilyen követelményt nem lehet ellenőrizni.",
};

const FACT_KIT_ONLY: Localized<string> = {
  en: "swift-tools-version: 6.0 is the manifest line of PopopxMeshKit, and the .iOS(.v15) floor written there constrains the package only — the app itself still needs iOS 17.0.",
  "pt-BR": "swift-tools-version: 6.0 é a linha de manifesto do PopopxMeshKit, e o piso .iOS(.v15) escrito ali restringe apenas o pacote — o app em si ainda exige iOS 17.0.",
  ko: "swift-tools-version: 6.0은 PopopxMeshKit의 매니페스트 줄이며, 거기에 적힌 .iOS(.v15) 최소 버전은 패키지만 제약합니다. 앱 자체는 여전히 iOS 17.0이 필요합니다.",
  ar: "السطر swift-tools-version: 6.0 هو سطر بيان PopopxMeshKit، والحد الأدنى .iOS(.v15) المكتوب فيه يقيد الحزمة وحدها — أما التطبيق نفسه فما زال يحتاج iOS 17.0.",
  ru: "swift-tools-version: 6.0 — строка манифеста пакета PopopxMeshKit, и указанная там граница .iOS(.v15) касается только пакета: приложению по-прежнему нужен iOS 17.0.",
  de: "swift-tools-version: 6.0 ist die Manifestzeile von PopopxMeshKit, und die dort geschriebene .iOS(.v15)-Grenze betrifft nur das Paket — die App selbst braucht weiterhin iOS 17.0.",
  fr: "swift-tools-version: 6.0 est la ligne de manifeste du paquet PopopxMeshKit, et le plancher .iOS(.v15) qui y est écrit ne contraint que le paquet — l'app elle-même exige toujours iOS 17.0.",
  it: "swift-tools-version: 6.0 è la riga di manifesto del pacchetto PopopxMeshKit, e il limite .iOS(.v15) scritto lì vincola solo il pacchetto — l'app stessa richiede ancora iOS 17.0.",
  nl: "swift-tools-version: 6.0 is de manifestregel van PopopxMeshKit, en de .iOS(.v15)-grens daarin geldt alleen voor het pakket — de app zelf heeft nog steeds iOS 17.0 nodig.",
  cs: "swift-tools-version: 6.0 je řádek manifestu balíčku PopopxMeshKit a mez .iOS(.v15) v něm váže pouze balíček — aplikace sama i nadále potřebuje iOS 17.0.",
  "zh-Hans": "swift-tools-version: 6.0 是 PopopxMeshKit 包清单里的那一行，其中写的 .iOS(.v15) 也只约束这个包——App 本身仍然要 iOS 17.0。",
  "zh-Hant": "swift-tools-version: 6.0 是 PopopxMeshKit 套件清單裡的那一行，其中寫的 .iOS(.v15) 也只約束這個套件——App 本身仍然需要 iOS 17.0。",
  es: "swift-tools-version: 6.0 es la línea de manifiesto del paquete PopopxMeshKit, y el mínimo .iOS(.v15) que declara solo atañe al paquete — la app sigue necesitando iOS 17.0.",
  pl: "swift-tools-version: 6.0 to linia manifestu pakietu PopopxMeshKit, a próg .iOS(.v15) w nim zapisany dotyczy wyłącznie pakietu — sama aplikacja nadal wymaga iOS 17.0.",
  ja: "swift-tools-version: 6.0 は PopopxMeshKit パッケージのマニフェスト行であり、そこに書かれた .iOS(.v15) もパッケージにだけ適用されます。アプリ本体は引き続き iOS 17.0 が必要です。",
  th: "swift-tools-version: 6.0 เป็นแค่บรรทัด manifest ของแพ็กเกจ PopopxMeshKit และขีดจำกัด .iOS(.v15) ที่เขียนไว้ก็ผูกเฉพาะแพ็กเกจ — ตัวแอปยังต้องใช้ iOS 17.0",
  fi: "swift-tools-version: 6.0 on PopopxMeshKit-paketin manifestirivi, ja sen .iOS(.v15)-alaraja sitoo vain paketin — itse appi tarvitsee edelleen iOS 17.0.",
  uk: "swift-tools-version: 6.0 — це рядок маніфеста пакета PopopxMeshKit, і межа .iOS(.v15) там стосується лише пакета: сам застосунок досі потребує iOS 17.0.",
  bg: "swift-tools-version: 6.0 е редът от манифеста на пакета PopopxMeshKit, а посочената там граница .iOS(.v15) важи само за пакета — самото приложение продължава да изисква iOS 17.0.",
  tr: "swift-tools-version: 6.0 PopopxMeshKit paketinin bildirim satırıdır ve içindeki .iOS(.v15) tabanı yalnızca paketi bağlar — uygulamanın kendisi hâlâ iOS 17.0 ister.",
  hu: "a swift-tools-version: 6.0 a PopopxMeshKit csomag manifest-sora, és a benne álló .iOS(.v15) korlát csak a csomagra vonatkozik — magának az appnak továbbra is iOS 17.0 kell.",
};

const BUILD_SCHEME: Localized<string> = {
  en: "The shared scheme is POPOPX (iOS); the two extensions ship as POPOPX NSE and POPOPX SE.",
  "pt-BR": "O esquema compartilhado é POPOPX (iOS); as duas extensões são entregues como POPOPX NSE e POPOPX SE.",
  ko: "공유 스킴은 POPOPX (iOS)이며, 두 확장은 POPOPX NSE와 POPOPX SE로 출시됩니다.",
  ar: "المخطط المشترك هو POPOPX (iOS)؛ وتأتي الإضافتان باسم POPOPX NSE وPOPOPX SE.",
  ru: "Общая схема называется POPOPX (iOS); два расширения поставляются как POPOPX NSE и POPOPX SE.",
  de: "Das gemeinsame Scheme ist POPOPX (iOS); die zwei Erweiterungen erscheinen als POPOPX NSE und POPOPX SE.",
  fr: "Le scheme partagé est POPOPX (iOS) ; les deux extensions sont livrées comme POPOPX NSE et POPOPX SE.",
  it: "Lo scheme condiviso è POPOPX (iOS); le due estensioni sono distribuite come POPOPX NSE e POPOPX SE.",
  nl: "Het gedeelde scheme is POPOPX (iOS); de twee uitbreidingen worden meegeleverd als POPOPX NSE en POPOPX SE.",
  cs: "Sdílené scheme je POPOPX (iOS); dvě rozšíření se dodávají jako POPOPX NSE a POPOPX SE.",
  "zh-Hans": "共享 scheme 是 POPOPX (iOS)；两个扩展分别是 POPOPX NSE 与 POPOPX SE。",
  "zh-Hant": "共用 scheme 是 POPOPX (iOS)；兩個擴充分別是 POPOPX NSE 與 POPOPX SE。",
  es: "El scheme compartido es POPOPX (iOS); las dos extensiones se publican como POPOPX NSE y POPOPX SE.",
  pl: "Wspólne scheme to POPOPX (iOS); dwa rozszerzenia występują jako POPOPX NSE i POPOPX SE.",
  ja: "共有スキームは POPOPX (iOS)。2 つの拡張は POPOPX NSE と POPOPX SE として出荷されています。",
  th: "scheme ที่แชร์กันคือ POPOPX (iOS); ส่วนสองส่วนขยายมาในชื่อ POPOPX NSE และ POPOPX SE",
  fi: "Jaettu scheme on POPOPX (iOS); kaksi laajennosta toimitaan nimillä POPOPX NSE ja POPOPX SE.",
  uk: "Спільна схема — POPOPX (iOS); два розширення постачаються як POPOPX NSE та POPOPX SE.",
  bg: "Споделата схема е POPOPX (iOS); двете разширения се доставят като POPOPX NSE и POPOPX SE.",
  tr: "Paylaşılan şema POPOPX (iOS); iki uzantı POPOPX NSE ve POPOPX SE olarak yayımlanıyor.",
  hu: "A közös scheme a POPOPX (iOS); a két kiterjesztés POPOPX NSE és POPOPX SE néven kerül ki.",
};

const CMD_CAPTION: Localized<string> = {
  en: "The command CI runs, copied verbatim; scripts/ci/ios-stub-libs.sh runs before it.",
  "pt-BR": "O comando que a CI executa, copiado literalmente; scripts/ci/ios-stub-libs.sh roda antes dele.",
  ko: "CI가 실행하는 명령이며 그대로 옮겼습니다. 그 전에 scripts/ci/ios-stub-libs.sh가 실행됩니다.",
  ar: "الأمر الذي يشغله CI، منسوخ كما هو؛ ويسبقه تشغيل scripts/ci/ios-stub-libs.sh.",
  ru: "Команда, которую запускает CI, скопирована дословно; перед ней отрабатывает scripts/ci/ios-stub-libs.sh.",
  de: "Der Befehl, den CI ausführt, wortwörtlich übernommen; vorher läuft scripts/ci/ios-stub-libs.sh.",
  fr: "La commande exécutée par CI, copiée mot pour mot ; scripts/ci/ios-stub-libs.sh tourne avant elle.",
  it: "Il comando eseguito dalla CI, copiato alla lettera; prima di esso esegue scripts/ci/ios-stub-libs.sh.",
  nl: "Het commando dat CI uitvoert, letterlijk overgenomen; eerst draait scripts/ci/ios-stub-libs.sh.",
  cs: "Příkaz, který CI spouští, opsán slovo od slova; před ním běží scripts/ci/ios-stub-libs.sh.",
  "zh-Hans": "CI 实际执行的那条命令，逐字照抄；在它之前先跑 scripts/ci/ios-stub-libs.sh。",
  "zh-Hant": "CI 實際執行的那條命令，逐字照抄；在它之前先跑 scripts/ci/ios-stub-libs.sh。",
  es: "El comando que ejecuta la CI, copiado literalmente; antes corre scripts/ci/ios-stub-libs.sh.",
  pl: "Polecenie uruchamiane przez CI, przepisane dosłownie; wcześniej wykonuje się scripts/ci/ios-stub-libs.sh.",
  ja: "CI が実行しているコマンドをそのまま転記しました。その前に scripts/ci/ios-stub-libs.sh が走ります。",
  th: "คำสั่งที่ CI รันจริง ถอดมาคำต่อคำ และก่อนหน้านั้นจะรัน scripts/ci/ios-stub-libs.sh",
  fi: "CI:n ajama komento sanottuna sanalle; ennen sitä ajetaan scripts/ci/ios-stub-libs.sh.",
  uk: "Команду, яку запускає CI, подано дослівно; перед нею відпрацьовує scripts/ci/ios-stub-libs.sh.",
  bg: "Командата, която CI изпълнява, е преписана дума по дума; преди нея се изпълнява scripts/ci/ios-stub-libs.sh.",
  tr: "CI'ın çalıştırdığı komut birebir kopyalandı; hemen öncesinde scripts/ci/ios-stub-libs.sh çalışıyor.",
  hu: "A CI által futtatott parancs szó szerint; előtte a scripts/ci/ios-stub-libs.sh fut le.",
};

const BUILD_SCRIPTS: Localized<string> = {
  en: "Helper scripts live in scripts/ios/: prepare.sh, download-libs.sh and server-config-mint.swift.",
  "pt-BR": "Os scripts auxiliares ficam em scripts/ios/: prepare.sh, download-libs.sh e server-config-mint.swift.",
  ko: "도우미 스크립트는 scripts/ios/에 있습니다: prepare.sh, download-libs.sh, server-config-mint.swift.",
  ar: "توجد سكربتات مساعدة في scripts/ios/: prepare.sh وdownload-libs.sh وserver-config-mint.swift.",
  ru: "Вспомогательные скрипты лежат в scripts/ios/: prepare.sh, download-libs.sh и server-config-mint.swift.",
  de: "Hilfsskripte liegen in scripts/ios/: prepare.sh, download-libs.sh und server-config-mint.swift.",
  fr: "Les scripts d'aide se trouvent dans scripts/ios/ : prepare.sh, download-libs.sh et server-config-mint.swift.",
  it: "Gli script di ausilio stanno in scripts/ios/: prepare.sh, download-libs.sh e server-config-mint.swift.",
  nl: "Helpscripts staan in scripts/ios/: prepare.sh, download-libs.sh en server-config-mint.swift.",
  cs: "Pomocné skripty jsou v scripts/ios/: prepare.sh, download-libs.sh a server-config-mint.swift.",
  "zh-Hans": "仓库里还备有辅助脚本，放在 scripts/ios/：prepare.sh、download-libs.sh、server-config-mint.swift。",
  "zh-Hant": "倉庫裡還備有輔助腳本，放在 scripts/ios/：prepare.sh、download-libs.sh、server-config-mint.swift。",
  es: "Los auxiliares viven en scripts/ios/: prepare.sh, download-libs.sh y server-config-mint.swift.",
  pl: "Skrypty pomocnicze znajdują się w scripts/ios/: prepare.sh, download-libs.sh i server-config-mint.swift.",
  ja: "補助スクリプトは scripts/ios/ にあります: prepare.sh、download-libs.sh、server-config-mint.swift。",
  th: "สคริปต์ช่วยงานอยู่ใน scripts/ios/: prepare.sh, download-libs.sh และ server-config-mint.swift",
  fi: "Apuohjelmat ovat hakemistossa scripts/ios/: prepare.sh, download-libs.sh ja server-config-mint.swift.",
  uk: "Допоміжні скрипти містяться у scripts/ios/: prepare.sh, download-libs.sh і server-config-mint.swift.",
  bg: "Помощните скриптове са в scripts/ios/: prepare.sh, download-libs.sh и server-config-mint.swift.",
  tr: "Yardımcı betikler scripts/ios/ altında: prepare.sh, download-libs.sh ve server-config-mint.swift.",
  hu: "A segédszkriptek a scripts/ios/ könyvtárban vannak: prepare.sh, download-libs.sh és server-config-mint.swift.",
};

const ENGINE_TITLE: Localized<string> = {
  en: "The engine that signs the server list",
  "pt-BR": "O motor que assina a lista de servidores",
  ko: "서버 목록에 서명하는 엔진",
  ar: "المحرك الذي يصدر توقيع قائمة الخوادم",
  ru: "Движок, который подписывает список серверов",
  de: "Die Engine, die die Serverliste signiert",
  fr: "Le moteur qui signe la liste de serveurs",
  it: "Il motore che firma l'elenco dei server",
  nl: "De engine die de serverlijst ondertekent",
  cs: "Engine, která podepisuje seznam serverů",
  "zh-Hans": "配套的签名配置推送引擎",
  "zh-Hant": "配套的簽章設定推送引擎",
  es: "El motor que firma la lista de servidores",
  pl: "Silnik podpisujący listę serwerów",
  ja: "サーバー一覧に署名するエンジン",
  th: "ขุมพลังที่เซ็นรายชื่อเซิร์ฟเวอร์",
  fi: "Moottori, joka allekirjoittaa palvelinluettelon",
  uk: "Рушій, який підписує список серверів",
  bg: "Двигателят, който подписва списъка със сървъри",
  tr: "Sunucu listesini imzalayan motor",
  hu: "A motor, amely aláírja a szerverlistát",
};

const ENGINE_BODY: Localized<string> = {
  en: "popopx-server-up-bot signs cluster.json — SMP, XFTP, notification, chat relay and STUN/TURN entries — into an offline-verifiable config payload, then turns the SERVER_CFG_ACK receipts it collects back into a coverage figure.",
  "pt-BR": "O popopx-server-up-bot assina o cluster.json — entradas de SMP, XFTP, notificação, retransmissor de chat e STUN/TURN — em uma carga de configuração verificável offline, e então converte os recibos SERVER_CFG_ACK que coleta de volta em um número de cobertura.",
  ko: "popopx-server-up-bot은 cluster.json, 즉 SMP, XFTP, 알림, 채팅 중계, STUN/TURN 항목에 서명해 오프라인에서 검증 가능한 구성 페이로드로 만들고, 수집한 SERVER_CFG_ACK 영수증을 다시 커버리지 수치로 바꿉니다.",
  ar: "يوقع popopx-server-up-bot الملف cluster.json — مدخلات SMP وXFTP والإشعارات ومرحّل المحادثة وSTUN/TURN — ضمن حمولة إعداد قابلة للتحقق دون اتصال، ثم يعيد تحويل إيصالات SERVER_CFG_ACK التي يجمعها إلى رقم تغطية.",
  ru: "popopx-server-up-bot подписывает cluster.json — записи SMP, XFTP, уведомлений, chat relay и STUN/TURN — в офлайн-проверяемый конфигуационный payload, а затем превращает полученные SERVER_CFG_ACK-квитанции в цифру покрытия.",
  de: "popopx-server-up-bot signiert cluster.json — SMP-, XFTP-, Benachrichtigungs-, Chat-Relay- und STUN/TURN-Einträge — zu einem offline überprüfbaren Konfigurationsdatenpaket und rechnet die eingehenden SERVER_CFG_ACK-Quittungen in eine Abdeckungsquote um.",
  fr: "popopx-server-up-bot signe cluster.json — entrées SMP, XFTP, notification, chat relay et STUN/TURN — en une charge de configuration vérifiable hors ligne, puis convertit les accusés SERVER_CFG_ACK reçus en un taux de couverture.",
  it: "popopx-server-up-bot firma cluster.json — voci SMP, XFTP, notifica, chat relay e STUN/TURN — in un payload di configurazione verificabile offline, quindi trasforma le ricevute SERVER_CFG_ACK raccolte in una cifra di copertura.",
  nl: "popopx-server-up-bot ondertekent cluster.json — SMP-, XFTP-, notificatie-, chat relay- en STUN/TURN-items — tot een offline verifieerbare configuratieload, en rekent de ontvangen SERVER_CFG_ACK-ontvangstbewijzen om naar een dekkingscijfer.",
  cs: "popopx-server-up-bot podepisuje cluster.json — položky SMP, XFTP, notifikací, chat relay a STUN/TURN — do offline ověřitelného konfiguračního payloadu a přijatá potvrzení SERVER_CFG_ACK pak přepočítá na míru pokrytí.",
  "zh-Hans": "popopx-server-up-bot 把 cluster.json（SMP、XFTP、通知、chat relay、STUN/TURN 条目）离线签成一份可独立验证的配置载荷，再把收回的 SERVER_CFG_ACK 回执算成覆盖率。",
  "zh-Hant": "popopx-server-up-bot 把 cluster.json（SMP、XFTP、通知、chat relay、STUN/TURN 條目）離線簽成一份可獨立驗證的設定封包，再把收回的 SERVER_CFG_ACK 回條算成涵蓋率。",
  es: "popopx-server-up-bot firma cluster.json — entradas SMP, XFTP, de notificación, chat relay y STUN/TURN — en una carga de configuración verificable sin conexión, y convierte los acuses SERVER_CFG_ACK recibidos en una cifra de cobertura.",
  pl: "popopx-server-up-bot podpisuje cluster.json — wpisy SMP, XFTP, powiadomień, chat relay i STUN/TURN — jako konfiguracyjny payload weryfikowalny offline, a otrzymane potwierdzenia SERVER_CFG_ACK przelicza na wskaźnik pokrycia.",
  ja: "popopx-server-up-bot は cluster.json（SMP、XFTP、通知、chat relay、STUN/TURN の各項目）を、オフラインで検証できる設定ペイロードとして署名し、集めた SERVER_CFG_ACK の受信証をカバー率に換算します。",
  th: "popopx-server-up-bot เซ็น cluster.json (รายการ SMP, XFTP, การแจ้งเตือน, chat relay และ STUN/TURN) เป็น payload การตั้งค่าที่ตรวจแบบออฟไลน์ได้ แล้วคำนวณใบตอบรับ SERVER_CFG_ACK ที่เก็บได้ให้เป็นตัวเลขความครอบคลุม",
  fi: "popopx-server-up-bot allekirjoittaa cluster.jsonin — SMP-, XFTP-, ilmoitus-, chat relay- ja STUN/TURN-merkinnät — offline vahvistettavaksi asetuskappaleeksi ja muuttaa kerätyt SERVER_CFG_ACK-kuitit kattavuusluvuksi.",
  uk: "popopx-server-up-bot підписує cluster.json — записи SMP, XFTP, сповіщень, chat relay та STUN/TURN — в офлайн-перевірюваний конфіг-пейлоад, а потім перетворює отримані SERVER_CFG_ACK-квитанції на показник покриття.",
  bg: "popopx-server-up-bot подписва cluster.json — записи на SMP, XFTP, известия, chat relay и STUN/TURN — в офлайн проверяем конфигурационен пакет и после превръща получените SERVER_CFG_ACK разписки в число на покритието.",
  tr: "popopx-server-up-bot, cluster.json dosyasını — SMP, XFTP, bildirim, chat relay ve STUN/TURN kayıtlarını — çevrimdışı doğrulanabilir bir yapılandırma yükü olarak imzalar, ardından topladığı SERVER_CFG_ACK makbuzlarını kapsama oranına çevirir.",
  hu: "a popopx-server-up-bot aláírja a cluster.json fájlt — SMP, XFTP, értesítés, chat relay és STUN/TURN bejegyzéseket — offline ellenőrizhető konfigurációs csomaggá, majd a gyűjtött SERVER_CFG_ACK nyugdákat lefedettségi számmá alakítja.",
};

const ENGINE_TIERS: Localized<string> = {
  en: "On the client the result lands in two tiers of storage only — UserDefaults and App Group files — and connectivity is probed twice after apply: at three seconds and at ten seconds.",
  "pt-BR": "No cliente, o resultado fica em apenas dois níveis de armazenamento — UserDefaults e arquivos do App Group — e a conectividade é verificada duas vezes após a aplicação: aos três segundos e aos dez segundos.",
  ko: "클라이언트에서 결과는 UserDefaults와 App Group 파일, 이렇게 두 계층의 저장소에만 들어가며, 적용 후 3초와 10초에 연결 상태를 확인합니다.",
  ar: "في العميل تهبط النتيجة في طبقتين من التخزين فقط — UserDefaults وملفات App Group — ويجري اختبار الاتصال مرتين بعد التطبيق: عند ثلاث ثوان وعند عشر ثوان.",
  ru: "На стороне клиента результат попадает ровно в два уровня хранения — UserDefaults и файлы в App Group, — а связность проверяется дважды после применения: на третьей и на десятой секунде.",
  de: "Auf der Client-Seite landet das Ergebnis in genau zwei Speicherebenen — UserDefaults und App-Group-Dateien — und die Erreichbarkeit wird nach dem Anwenden zweimal geprüft: nach drei und nach zehn Sekunden.",
  fr: "Côté client, le résultat n'arrive que dans deux niveaux de stockage — UserDefaults et fichiers App Group — et la connectivité est sondée deux fois après l'application : à trois secondes et à dix secondes.",
  it: "Lato client il risultato finisce in due soli livelli di archiviazione — UserDefaults e file in App Group — e la connettività viene verificata due volte dopo l'applicazione: a tre e a dieci secondi.",
  nl: "Aan de clientkant belandt het resultaat in precies twee opslaglagen — UserDefaults en App Group-bestanden — en de connectiviteit wordt twee keer getest na toepassen: op 3 en op 10 seconden.",
  cs: "Na straně klienta výsledek končí ve právě dvou úrovních úložiště — UserDefaults a soubory App Group — a konektivita se po aplikaci zkouší dvakrát: ve třech a v deseti sekundách.",
  "zh-Hans": "客户端这一侧只有两层存储：UserDefaults 与 App Group 文件；应用之后在第 3 秒与第 10 秒各探测一次连通性。",
  "zh-Hant": "客戶端這一側只有兩層儲存：UserDefaults 與 App Group 檔案；套用之後在第 3 秒與第 10 秒各偵測一次連通性。",
  es: "En el cliente el resultado acaba en solo dos niveles de almacenamiento —UserDefaults y archivos de App Group— y la conectividad se comprueba dos veces tras aplicar: a los tres y a los diez segundos.",
  pl: "Po stronie klienta wynik trafia dokładnie do dwóch warstw przechowywania — UserDefaults i plików App Group — a łączność jest sprawdzana dwa razy po zastosowaniu: w trzeciej i w dziesiątej sekundzie.",
  ja: "クライアント側で結果が収まる保存層は UserDefaults と App Group ファイルの 2 つだけ。適用後の到達確認も 3 秒後と 10 秒後の 2 回です。",
  th: "ฝั่งไคลเอนต์ผลลัพธ์จะอยู่ในชั้นเก็บข้อมูลแค่สองชั้น — UserDefaults กับไฟล์ใน App Group — และจะทดสอบการเชื่อมต่อหลังใช้ค่าสองครั้ง ที่ 3 วินาทีและ 10 วินาที",
  fi: "Asiakkaan puolella tulos päätyy vain kahteen tallennustasoon — UserDefaults ja App Group -tiedostot — ja yhteys mitataan kahdesti soveltamisen jälkeen: kolmen ja kymmenen sekunnin kohdalla.",
  uk: "На боці клієнта результат потрапляє рівно у два шари сховища — UserDefaults і файли App Group — а зв'язність перевіряється двічі після застосування: на третій і на десятій секунді.",
  bg: "От страна на клиента резултатът попада точно в две нива на съхранение — UserDefaults и файлове в App Group — а свързаността се тества два пъти след прилагане: на третата и на десетата секунда.",
  tr: "İstemci tarafında sonuç yalnızca iki depolama katmanına iner — UserDefaults ve App Group dosyaları — ve uygulama sonrası bağlantı iki kez yoklanır: üçüncü ve onuncu saniyede.",
  hu: "Az ügyfél oldalán az eredmény pontosan két tárolási rétegbe kerül — UserDefaults és App Group fájlok — és az összeköttetést az alkalmazás után kétszer tapintjuk ki: a harmadik és a tizedik másodpercben.",
};

const FACT_ROWS = [
  { label: ROW_VERSION, value: "v1.2.0" },
  { label: ROW_TARGET, value: "iOS 17.0" },
  { label: ROW_SWIFT, value: "SWIFT_VERSION = 5.0" },
  { label: ROW_XCODE, value: "xcodebuild -version" },
];

function FactRow({ label, value }: { label: Localized<string>; value: string }): ReactElement {
  const l = useCopy(label);
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2">
      <dt className="text-[12.5px] text-faint">
        <LtrText text={l} />
      </dt>
      <dd dir="ltr" className="text-start font-mono text-[12.5px] text-mute">
        {value}
      </dd>
    </div>
  );
}


/**
 * 「开发中 / 源码待公开」 — the marker the 2026-11-25 ruling asked for. It is a
 * status, not a euphemism: the engine's client-side half is in the shipped Swift
 * (ledger §7) and its server-side half has no public repository today (ledger §15).
 */
const STATUS_PENDING: Localized<string> = {
  en: "In development · source not published yet",
  "pt-BR": "Em desenvolvimento · código ainda não publicado",
  ko: "개발 중 · 소스 미공개",
  ar: "قيد التطوير · المصدر غير منشور بعد",
  ru: "В разработке · исходник ещё не опубликован",
  de: "In Entwicklung · Quellcode noch nicht veröffentlicht",
  fr: "En développement · source pas encore publié",
  it: "In sviluppo · sorgente non ancora pubblicato",
  nl: "In ontwikkeling · broncode nog niet gepubliceerd",
  cs: "Ve vývoji · zdroj zatím nezveřejněn",
  "zh-Hans": "开发中 · 源码待公开",
  "zh-Hant": "開發中 · 原始碼待公開",
  es: "En desarrollo · código aún sin publicar",
  pl: "W rozwoju · kod jeszcze nieopublikowany",
  ja: "開発中 · ソースはまだ非公開",
  th: "กำลังพัฒนา · ยังไม่เปิดเผยซอร์ส",
  fi: "Kehityksessä · lähdettä ei vielä julkaistu",
  uk: "У розробці · вихідний код ще не опублікований",
  bg: "В разработка · кодът все още не е публикуван",
  tr: "Geliştiriliyor · kaynak henüz yayımlanmadı",
  hu: "Fejlesztés alatt · a forrás még nem nyilvános",
};

/** Locale-free: repository paths, exactly as they are published on GitHub. */
const REPOS: readonly { readonly href: string; readonly name: string }[] = [
  { href: IOS_REPO_URL, name: "popopx-chat · iOS client" },
  { href: WEB_REPO_URL, name: "popopx-chat-web · this portal" },
  { href: SUITE_REPO_URL, name: "popopx-service-suite · service accounts" },
  { href: SUITE_WEB_REPO_URL, name: "popopx-service-suite-web · suite portal" },
  { href: NODE_REPO_URL, name: "popopx-mac-node · edge engine" },
  { href: BOT_STUDIO_REPO_URL, name: "popopx-bot-studio · bot workbench" },
  { href: BOT_STUDIO_WEB_REPO_URL, name: "popopx-bot-studio-web · studio portal" },
  { href: MQ_REPO_URL, name: "popopxmq · SMP and XFTP relays" },
];

const EXTERNAL = "mt-1 inline-flex items-center gap-2 font-mono text-[12.5px] text-brand-soft underline decoration-hair underline-offset-4 transition-colors duration-200 hover:text-white";

function RepoLink({ repo }: { repo: { href: string; name: string } }): ReactElement {
  return (
    <li>
      <a
        href={repo.href}
        target="_blank"
        rel="noopener noreferrer"
        dir="ltr"
        className={`${EXTERNAL} text-start`}
      >
        {repo.name}
      </a>
    </li>
  );
}

export function DeveloperGuide(): ReactElement {
  const versionFact = useCopy(FACT_VERSION);
  const unpinned = useCopy(FACT_UNPINNED);
  const kitOnly = useCopy(FACT_KIT_ONLY);
  const scheme = useCopy(BUILD_SCHEME);
  const caption = useCopy(CMD_CAPTION);
  const scripts = useCopy(BUILD_SCRIPTS);
  const engineTitle = useCopy(ENGINE_TITLE);
  const engineBody = useCopy(ENGINE_BODY);
  const engineTiers = useCopy(ENGINE_TIERS);
  const pending = useCopy(STATUS_PENDING);

  return (
    <section id="build" className="relative py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading
          eyebrow={ROUTE_LABELS.developers}
          title={BUILD_TITLE}
          titleAs="h1"
        />

        <div className="mt-9 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          {/* Measured toolchain facts, straight out of the project file. */}
          <article className="glass p-5 sm:p-6">
            <p dir="ltr" className="eyebrow text-start">apps/ios · project.pbxproj</p>
            <dl className="mt-4 divide-y divide-hair">
              {FACT_ROWS.map((row) => (
                <FactRow key={row.value} label={row.label} value={row.value} />
              ))}
            </dl>
            <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
              <LtrText text={versionFact} />
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
              <LtrText text={unpinned} />
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
              <LtrText text={kitOnly} />
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
              <LtrText text={scheme} />
            </p>
            <p className="mt-4 text-[11.5px] leading-relaxed text-faint">
              <LtrText text={scripts} />
            </p>
            <a
              href={IOS_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="mt-4 inline-flex text-start font-mono text-[12.5px] text-brand-soft underline decoration-hair underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              popopx-chat · master
            </a>
          </article>

          <div className="flex flex-col gap-4">
            <CodeBlock code={BUILD_COMMAND} maxHeightClass="max-h-[280px]" caption={caption} />
            {/* The engine that feeds the client its server list — ledger §7, two tiers. */}
            <div className="glass-inset p-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="eyebrow">
                  <LtrText text={engineTitle} />
                </p>
                <span className="chip flex items-center gap-2 py-1 text-[11px] text-warn-soft">
                  <StatusDot tone="warn" />
                  {/* One wrapping flex item: `LtrText` emits several inline
                      `<bdi>`s, and as direct flex children they cannot break
                      between words, so the chip overflowed at 300px. */}
                  <span><LtrText text={pending} /></span>
                </span>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
                <LtrText text={engineBody} />
              </p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
                <LtrText text={engineTiers} />
              </p>
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10.5px] text-faint">
                {["popopx-server-up-bot", "cluster.json", "Ed25519", "SERVER_CFG_ACK"].map((chip) => (
                  <span key={chip} dir="ltr" className="chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The published tree, by name and path only — no upstream descriptions. */}
        <div className="glass mt-12 p-5 sm:p-6">
          <p dir="ltr" className="eyebrow text-start">github.com/popopx-chat</p>
          <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-2 sm:grid-cols-2">
            {REPOS.map((repo) => (
              <RepoLink key={repo.name} repo={repo} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

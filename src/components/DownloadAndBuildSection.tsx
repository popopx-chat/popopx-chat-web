"use client";

import type { ReactElement } from "react";
import { QRCodeSVG } from "qrcode.react";
import { LOCALE_COUNT, LOCALES, LOCALE_NATIVE, useCopy, type Localized } from "@/lib/i18n";
import { IOS_REPO_URL, SITE_URL } from "@/lib/site";
import { CodeBlock, CopyButton, SectionHeading, StatusDot } from "@/components/ui";

/**
 * DownloadAndBuildSection — section `download`: availability, build from source, 18 languages.
 *
 * · Distribution: ledger §12 of `docs/FACTS.md` — the App Store record does not resolve
 *   (`itunes.apple.com/lookup` → `resultCount: 0`, re-measured 2026-11-22) and the standing ruling
 *   of 2026-11-16 (`../popopx.chat-site/README.md:97-101`) forbids rendering any store badge or
 *   link, or reusing another project's TestFlight code, until that record resolves on its own.
 * · QR: `qrcode.react` 4.2.0 in `package.json` renders inline SVG client-side, zero requests.
 * · Build: ledger §10 — `MinimumOSVersion = 17.0` and `SWIFT_VERSION = 5.0`
 *   (`apps/ios/POPOPX.xcodeproj/project.pbxproj`), `swift-tools-version: 6.0` + `.iOS(.v15)`
 *   (`apps/ios/PopopxMeshKit/Package.swift:1,10`, package-side only), Xcode not pinned
 *   (`.github/workflows/ios-sim.yml:101,116`), the CI command and `scripts/ci/ios-stub-libs.sh`
 *   (`.github/workflows/build.yml:1400-1408`), shared schemes
 *   (`apps/ios/POPOPX.xcodeproj/xcshareddata/xcschemes/`), helpers in `scripts/ios/`.
 * · Config engine: `../popopx-server-up-bot/README.md:3-4,7,159` — offline Ed25519 signature over
 *   `cluster.json`, SERVER_CFG_ACK receipts into coverage. Client side: ledger §7 — two tiers of
 *   storage, connectivity probed at 3 s and 10 s after apply. Never three layers.
 * · Languages: ledger §1 — `CFBundleLocalizations` in `apps/ios/POPOPX--iOS--Info.plist`.
 */

const QR_BG = "#07080D";
const QR_FG = "#E9E9F5";

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

const EYEBROW: Localized<string> = {
  en: "Get it, build it",
  ru: "Получение и сборка",
  de: "Beziehen und Bauen",
  fr: "Obtenir et construire",
  it: "Ottenere e compilare",
  nl: "Verkrijgen en bouwen",
  cs: "Získání a sestavení",
  "zh-Hans": "获取与构建",
  "zh-Hant": "取得與建置",
  es: "Obtenerlo y compilarlo",
  pl: "Pobranie i zbudowanie",
  ja: "入手とビルド",
  th: "การรับและการสร้าง",
  fi: "Hankinta ja kääntäminen",
  uk: "Отримання й збірка",
  bg: "Получаване и изграждане",
  tr: "Edinme ve derleme",
  hu: "Beszerzés és fordítás",
};

const TITLE: Localized<string> = {
  en: "No store listing yet — the source is open today",
  ru: "В магазине пока пусто — исходный код открыт уже сегодня",
  de: "Noch kein Store-Eintrag — der Quellcode ist heute offen",
  fr: "Pas encore de fiche en magasin — le source est ouvert dès aujourd'hui",
  it: "Ancora nessuna scheda nello store — il sorgente è aperto da oggi",
  nl: "Nog geen vermelding in de store — de broncode is vandaag al open",
  cs: "Zatím žádný výpis v obchodě — zdrojový kód je otevřený už dnes",
  "zh-Hans": "商店链接还没有，源码现在就开着",
  "zh-Hant": "商店連結還沒有，原始碼現在就是公開的",
  es: "Aún sin ficha en la tienda — el código ya está abierto hoy",
  pl: "Jeszcze bez wpisu w sklepie — kod źródłowy jest otwarty już dziś",
  ja: "ストアへのリンクはまだありません——ソースは今日から構築できます",
  th: "ยังไม่มีลิงก์ในสโตร์ — ซอร์สเปิดอยู่แล้ววันนี้",
  fi: "Kauppakaalinkkia ei vielä — lähdekoodi on auki jo tänään",
  uk: "У магазині поки порожньо — код відкритий уже сьогодні",
  bg: "Все още без запис в магазина — кодът е отворен вече днес",
  tr: "Mağaza bağlantısı henüz yok — kaynak bugün açık",
  hu: "Még nincs áruházi hivatkozás — a forráskód már ma nyitott",
};

const LEAD: Localized<string> = {
  en: "Two honest panels and one language wall: what you can get today, what a build really needs, and the 18 localizations the client ships with.",
  ru: "Две честные панели и одна стена языков: что можно получить сегодня, что действительно нужно для сборки и 18 локализаций клиента.",
  de: "Zwei ehrliche Panels und eine Sprachwand: was es heute gibt, was der Build wirklich braucht, und die 18 Lokalisierungen des Clients.",
  fr: "Deux volets honnêtes et un mur de langues : ce qu'on obtient aujourd'hui, ce que la construction exige vraiment, et les 18 localizations du client.",
  it: "Due pannelli onesti e una parete di lingue: cosa si ottiene oggi, cosa serve davvero per compilare, e le 18 localizzazioni del client.",
  nl: "Eerlijke panelen en een taalmuur: wat je vandaag kunt krijgen, wat de build werkelijk nodig heeft, en de 18 lokalisaties van de client.",
  cs: "Dvě upřímné panely a zeď jazyků: co dnes dostanete, co skutečně potřebuje sestavení, a 18 lokalizací klienta.",
  "zh-Hans": "两块老实的面板与一面语言墙：今天能拿到什么、构建到底需要什么、客户端自带的 18 种本地化。",
  "zh-Hant": "兩塊老實的面板與一面語言牆：今天能拿到什麼、建置到底需要什麼、客戶端自帶的 18 種本地化。",
  es: "Dos paneles honestos y un muro de idiomas: qué se puede obtener hoy, qué necesita de verdad la compilación y las 18 localizaciones del cliente.",
  pl: "Dwie uczciwe sekcje i ściana języków: co dziś można dostać, czego naprawdę wymaga zbudowanie, i 18 lokalizacji klienta.",
  ja: "誠実な2枚のパネルと言語の壁。今日入手できるもの、ビルドに本当に必要なもの、クライアント同梱の 18 のローカライズ。",
  th: "สองพาเนลซื่อสัตย์และกำแพงภาษาหนึ่งแนว: วันนี้ติดตั้งอะไรได้จริง การสร้างต้องใช้อะไร และการรองรับ 18 ภาษาที่มากับไคลเอนต์",
  fi: "Rehellinen kaksi paneelia ja kieliseinä: mitä tänään saa, mitä kääntäminen oikeasti vaatii, ja asiakkaan mukana tulevat 18 kieliversiota.",
  uk: "Два чесні блоки та стіна мов: що доступне сьогодні, що справді потрібне для збірки, й 18 локалізацій клієнта.",
  bg: "Два честни блока и една езикова стена: какво можете да получите днес, от какво наистина има нужда изграждането, и 18-те локализации на клиента.",
  tr: "İki dürüst bölüm ve bir dil duvarı: bugün ne alınabilir, derleme gerçekten ne istiyor, ve istemcinin yayımladığı 18 yerelleştirme.",
  hu: "Két becsületes panel és egy nyelvfall: ma mit kaphatsz, mire van valóban szükség a fordításhoz, és az ügyfél 18 lokalizációja.",
};

const AVAIL_TITLE: Localized<string> = {
  en: "How to get the client today",
  ru: "Как получить клиента сегодня",
  de: "So bekommst du den Client heute",
  fr: "Comment obtenir le client aujourd'hui",
  it: "Come ottenere il client oggi",
  nl: "Zo krijg je de client vandaag",
  cs: "Jak klienta získat dnes",
  "zh-Hans": "今天怎么拿到客户端",
  "zh-Hant": "今天怎麼拿到客戶端",
  es: "Cómo conseguir el cliente hoy",
  pl: "Jak dziś zdobyć klienta",
  ja: "今日クライアントを入手するには",
  th: "วิธีรับไคลเอนต์วันนี้",
  fi: "Miten asiakkaan saa tänään",
  uk: "Як отримати клієнта сьогодні",
  bg: "Как да получите клиента днес",
  tr: "İstemci bugün nasıl edinilir",
  hu: "Hogyan juthatsz hozzá az ügyfélhez ma",
};

const AVAIL_BODY: Localized<string> = {
  en: "The App Store record for this client does not resolve: the iTunes lookup answers resultCount: 0, measured again on 2026-11-22. There is nothing to link to yet, and we are not going to pretend otherwise.",
  ru: "Запись клиента в App Store не резолвится: iTunes lookup отвечает resultCount: 0 — замер повторён 2026-11-22. Ссылку вести некуда, и мы не делаем вид, что это не так.",
  de: "Der App-Store-Eintrag dieses Clients lässt sich nicht auflösen: Der iTunes-Lookup antwortet resultCount: 0, am 2026-11-22 erneut gemessen. Es gibt noch nichts zu verlinken, und wir tun nicht so, als wäre es anders.",
  fr: "La fiche App Store de ce client ne se résout pas : la recherche iTunes répond resultCount: 0, mesurée à nouveau le 2026-11-22. Il n'y a encore rien à lier, et nous ne faisons pas semblant du contraire.",
  it: "La scheda App Store di questo client non si risolve: il lookup iTunes risponde resultCount: 0, misurato di nuovo il 2026-11-22. Non c'è ancora nulla da linkare, e non facciamo finta del contrario.",
  nl: "De App Store-vermelding van deze client lost niet op: de iTunes-lookup antwoordt resultCount: 0, opnieuw gemeten op 2026-11-22. Er is nog niets om naar te linkeren, en doen alsof doen we niet.",
  cs: "Záznam tohoto klienta v App Store se nenajde: lookup iTunes odpovídá resultCount: 0, změřeno znovu 2026-11-22. Není kam odkazovat a neděláme, že by to bylo jinak.",
  "zh-Hans": "这个客户端的 App Store 记录解析不出来：iTunes 查询返回 resultCount: 0（2026-11-22 复测）。眼下没有可链接的目标，我们也不会假装它存在。",
  "zh-Hant": "這個客戶端的 App Store 記錄解析不出來：iTunes 查詢回傳 resultCount: 0（2026-11-22 複測）。眼下沒有可連結的目標，我們也不會假裝它存在。",
  es: "La ficha en la App Store de este cliente no resuelve: la búsqueda de iTunes devuelve resultCount: 0, medido otra vez el 2026-11-22. Todavía no hay nada que enlazar y no fingimos lo contrario.",
  pl: "Wpis tego klienta w App Store się nie odnajduje: lookup iTunes zwraca resultCount: 0, zmierzone ponownie 2026-11-22. Nie ma jeszcze do czego linkować i nie udajemy, że jest inaczej.",
  ja: "このクライアントの App Store レコードは解決できません。iTunes の lookup は resultCount: 0 を返し、2026-11-22 に再測定しました。リンク先はまだ無く、あるふりはしません。",
  th: "บันทึก App Store ของไคลเอนต์นี้ยังค้นหาไม่พบ: lookup ของ iTunes ตอบ resultCount: 0 วัดซ้ำเมื่อ 2026-11-22 ยังไม่มีอะไรจะให้ลิงก์ และไม่แสร้งว่ามี",
  fi: "Tämän asiakkaan App Store -tietue ei ratkea: iTunes-luautus vastaa resultCount: 0, mitattu uudelleen 2026-11-22. Ei ole vielä mihin linkittää, emmekä esitä muuta.",
  uk: "Запис клієнта в App Store не резолвиться: lookup iTunes відповідає resultCount: 0 — вимряно знову 2026-11-22. Немає на що посилатися, і не робимо вигляду, що це не так.",
  bg: "Записът на този клиент в App Store не се разрешава: проверката в iTunes връща resultCount: 0, премерено отново на 2026-11-22. Няма към какво да се посочва и не правим вид, че е иначе.",
  tr: "Bu istemcinin App Store kaydı çözümlenmiyor: iTunes araması resultCount: 0 dönüyor, 2026-11-22'de yeniden ölçüldü. Bağlanacak bir şey henüz yok ve varmış gibi de yapmıyoruz.",
  hu: "Ennek az ügyfélnek az App Store-bejegyzése nem oldható fel: az iTunes-lookup válasza resultCount: 0, 2026-11-22-én újrámérve. Még nincs hová linkelni, és nem teszünk úgy, mintha lenne.",
};

const AVAIL_RULING: Localized<string> = {
  en: "The standing ruling since 2026-11-16 is blunt: until that record resolves on its own, no App Store, Google Play or APK badge and no TestFlight code is rendered. Not another project's code, not an invented launch date.",
  ru: "Постоянное решение с 2026-11-16: пока запись не разрешится сама, не рисуем ни бейджей App Store / Google Play / APK, ни TestFlight-кода. Ни чужих кодов, ни выдуманной даты релиза.",
  de: "Der Dauerbeschluss seit 2026-11-16: Solange der eigene Eintrag sich nicht auflöst, gibt es kein App-Store-, Google-Play- oder APK-Badge und keinen TestFlight-Code. Keinen Code eines anderen Projekts, kein erfundenes Startdatum.",
  fr: "La décision permanente depuis le 2026-11-16 : tant que sa propre fiche ne se résout pas, aucun badge App Store, Google Play ou APK, aucun code TestFlight. Ni le code d'un autre projet, ni une date de sortie inventée.",
  it: "La decisione permanente dal 2026-11-16: finché la sua scheda non si risolve, nessun badge App Store, Google Play o APK e nessun codice TestFlight. Né il codice di un altro progetto, né una data di uscita inventata.",
  nl: "Het staande besluit sinds 2026-11-16: zolang die eigen vermelding niet oplost, geen App Store-, Google Play- of APK-badge en geen TestFlight-code. Evenmin een code van een ander project of een verzonnen releasedatum.",
  cs: "Stálý rozsudek od 2026-11-16: dokud se vlastní záznam neobjeví sám, nezobrazujeme žádné odznaky App Store, Google Play ani APK ani žádný TestFlight kód. Ani cizí kód, ani vymyšlené datum spuštění.",
  "zh-Hans": "2026-11-16 起的裁定很直接：在商店记录自己解析成功之前，不渲染任何 App Store、Google Play 或 APK 徽章，也不放 TestFlight 邀请码——既不借用别的项目的码，也不编造上线日期。",
  "zh-Hant": "自 2026-11-16 起的裁定很直接：在商店記錄自己解析成功之前，不呈現任何 App Store、Google Play 或 APK 徽章，也不放 TestFlight 邀請碼——既不借用別專案的碼，也不編造上線日期。",
  es: "El fallo permanente desde 2026-11-16: hasta que su propia ficha resuelva, no hay insignias de App Store, Google Play ni APK, ni código de TestFlight. Ni el código de otro proyecto, ni una fecha inventada.",
  pl: "Stałe postanowienie od 2026-11-16: dopóki własny wpis się nie pojawi, nie renderujemy plakietek App Store, Google Play ani APK ani kodu TestFlight. Ani kodu z innego projektu, ani wymyślonej daty premiery.",
  ja: "2026-11-16 からの決定は単純です。自身のレコードが解決できるまで、App Store・Google Play・APK のバッジも TestFlight コードも表示しません。他のプロジェクトのコードを流用せず、発売日も作りません。",
  th: "ข้อบังคับถาวรตั้งแต่ 2026-11-16: ตราบที่บันทึกของไคลเอนต์ยังไม่ปรากฏ จะไม่แสดงป้าย App Store, Google Play หรือ APK และไม่แสดงโค้ด TestFlight ไม่นำโค้ดของโปรเจกต์อื่นมาใช้ และไม่แต่งวันที่วางจำหน่าย",
  fi: "Vuodesta 2026-11-16 voimassa oleva päätös: emme näytä App Store-, Google Play- tai APK-merkkejä emmekä TestFlight-koodia, ennen kuin oma tietue ratkeaa. Emme lainaa toisen projektin koodia emmekä keksi julkaisupäivää.",
  uk: "Постійне рішення від 2026-11-16: доки власний запис не резолвиться, не виводимо ні бейджів App Store, Google Play чи APK, ні TestFlight-коду. Ані чужого коду, ані вигаданої дати релізу.",
  bg: "Постоянното решение от 2026-11-16: докато собствената запись не се появи, не показваме нито значки на App Store, Google Play или APK, нито TestFlight код. Нито чужд код, нито измислена дата.",
  tr: "2026-11-16'dan beri geçerli karar: kendi kaydı çözülene dek App Store, Google Play veya APK rozeti de TestFlight kodu da göstermiyoruz. Başka projenin kodu da uydurma bir yayın tarihi de yok.",
  hu: "2026-11-16-i állandó határozat: amíg a saját bejegyzés fel nem oldódik, nem jelenítünk meg App Store-, Google Play- vagy APK-jelvényt, sem TestFlight-kódot. Sem más projekt kódját, sem kitalált megjelenési dátumot.",
};

const AVAIL_HOW: Localized<string> = {
  en: "So today there are exactly two routes: build the client from the public source, or wait for the closed test channel to open. Both announcements land here first.",
  ru: "Значит сегодня есть ровно два пути: собрать клиента из публичного исходника либо дождаться открытия внутреннего тестового канала. Оба анонса выйдут здесь.",
  de: "Heute gibt es damit genau zwei Wege: den Client aus dem öffentlichen Quellcode bauen oder auf den offenen internen Testkanal warten. Beides wird hier angekündigt.",
  fr: "Donc deux routes seulement aujourd'hui : construire le client depuis le source public, ou attendre l'ouverture du canal de test interne. Les deux annonces sortiront ici.",
  it: "Quindi oggi ci sono esattamente due strade: compilare il client dal sorgente pubblico oppure attendere l'apertura del canale di test interno. Entrambe le notizie saranno pubblicate qui.",
  nl: "Dus vandaag precies twee wegen: de client bouwen uit de openbare broncode, of wachten tot het interne testkanaal opengaat. Beide aankondigingen verschijnen hier.",
  cs: "Dnes tedy existují právě dvě cesty: sestavit klienta z veřejného zdroje, nebo počkat na otevření interního testovacího kanálu. Obojí se oznámí tady.",
  "zh-Hans": "所以今天只有两条路：从公开源码自己构建，或者等内测通道开启。两条路的消息都会先出现在本站。",
  "zh-Hant": "所以今天只有兩條路：從公開原始碼自己建置，或者等內部測試通道開啟。兩條路的消息都會先出現在本站。",
  es: "Así que hoy hay exactamente dos caminos: compilar el cliente desde el código público o esperar a que se abra el canal interno de pruebas. Los dos anuncios saldrán aquí.",
  pl: "Dziś są więc dokładnie dwie drogi: zbudować klienta z publicznego kodu albo poczekać na otwarcie wewnętrznego kanału testów. Oba ogłoszenia pojawią się tutaj.",
  ja: "つまり今日、道は 2 つだけです。公開ソースからクライアントをビルドするか、内部テスト枠の開始を待つか。両方の発表はこのサイトで行われます。",
  th: "ดังนั้นวันนี้มีเพียงสองทาง: สร้างไคลเอนต์จากซอร์สที่เปิดสาธารณะ หรือรอให้การทดสอบภายในเปิดขึ้น ทั้งสองข่าวจะประกาศที่นี่",
  fi: "Tänään on siis täsmälleen kaksi tapaa: käännä asiakas julkisesta lähteestä tai odota sisäisen testikanavan avaamista. Molemmat ilmoitetaan täällä.",
  uk: "Тож сьогодні є рівно два шляхи: зібрати клієнта з відкритого коду або дочекатися відкриття внутрішнього тестового каналу. Обидва анонси з'являться тут.",
  bg: "Следователно днес има точно два пътя: да изградите клиента от публичния код или да изчакате отварянето на вътрешния тестов канал. И двете обявления ще излязат тук.",
  tr: "Yani bugün tam olarak iki yol var: istemciyi açık kaynaktan derlemek ya da kapalı test kanalının açılmasını beklemek. Her iki duyuru da önce burada yapılacak.",
  hu: "Tehát ma pontosan két út van: fordítsd le az ügyfelet a nyílt forrásból, vagy várd meg a belső tesztcsatorna nyitását. Mindkét hírt itt hozzuk nyilvánosságra.",
};

const QR_ARIA: Localized<string> = {
  en: "QR code with the address of this portal",
  ru: "QR-код с адресом этого портала",
  de: "QR-Code mit der Adresse dieses Portals",
  fr: "QR code contenant l'adresse de ce portail",
  it: "QR code con l'indirizzo di questo portale",
  nl: "QR-code met het adres van dit portaal",
  cs: "QR kód s adresou tohoto portálu",
  "zh-Hans": "包含本站地址的二维码",
  "zh-Hant": "包含本站地址的二維碼",
  es: "Código QR con la dirección de este portal",
  pl: "Kod QR z adresem tego portalu",
  ja: "このポータルのアドレスを含む QR コード",
  th: "QR โค้ดที่เก็บที่อยู่ของพอร์ทัลนี้",
  fi: "QR-koodi, joka sisältää tämän portaalin osoitteen",
  uk: "QR-код із адресою цього порталу",
  bg: "QR код с адреса на този портал",
  tr: "Bu portalın adresini içeren QR kodu",
  hu: "QR-kód a portál címével",
};

const QR_NOTE: Localized<string> = {
  en: "qrcode.react draws this code as inline SVG inside your own browser: no QR service, no image request, nothing leaves this origin.",
  ru: "QR рисует qrcode.react прямо в браузере как инлайн SVG: ни QR-сервиса, ни запроса за картинкой, ничего с этого адреса не уходит.",
  de: "Der QR wird von qrcode.react als Inline-SVG im Browser gezeichnet: kein QR-Dienst, keine Bildanfrage, nichts verlässt diese Origin.",
  fr: "Le QR est dessiné dans votre navigateur par qrcode.react en SVG en ligne : pas de service QR, pas de requête d'image, rien ne quitte cette origine.",
  it: "Il QR è disegnato nel browser da qrcode.react come SVG inline: nessun servizio QR, nessuna richiesta di immagine, nulla lascia questa origine.",
  nl: "De QR wordt door qrcode.react in je browser als inline-svg getekend: geen QR-dienst, geen image-request, niets verlaat deze origin.",
  cs: "QR kreslí v prohlížeči qrcode.react jako inline SVG: žádná QR služba, žádný požadavek na obrázek, nic odtud nikam neputuje.",
  "zh-Hans": "二维码由 qrcode.react 在你自己的浏览器里画成内联 SVG：没有二维码服务，没有图片请求，什么都没离开本站。",
  "zh-Hant": "二維碼由 qrcode.react 在你自己的瀏覽器裡畫成內嵌 SVG：沒有二維碼服務，沒有圖片請求，什麼都沒離開本站。",
  es: "El QR lo dibuja qrcode.react en tu navegador como SVG en línea: sin servicio de QR, sin petición de imagen, nada sale de este origen.",
  pl: "Kod QR rysuje w przeglądarce qrcode.react jako inline SVG: bez serwisu QR, bez żądania obrazu, nic nie opuszcza tego źródła.",
  ja: "QR はブラウザーの中で qrcode.react が SVG として描きます。QR サービスも画像リクエストも無く、何もこのサイトを離れません。",
  th: "QR วาดไว้ในเบราว์เซอร์ของคุณด้วย qrcode.react เป็น SVG ในหน้า ไม่มีบริการ QR ไม่มีการขอรูปภาพ และไม่มีสิ่งใดออกจากไซต์นี้",
  fi: "qrcode.react piirtää QR-koodin selaimessasi inline-SVG:nä: ei QR-palvelua, ei kuvapyyntöä, mitään ei lähte tältä sivustolta.",
  uk: "QR малює у вашому браузері qrcode.react як вбудований SVG: без QR-сервісу, без запиту зображення, ніщо не залишає цього сайту.",
  bg: "QR кодът се рисуе във вашия браузър от qrcode.react като вграден SVG: без QR услуга, без заявка за изображение, нищо не напуска този сайт.",
  tr: "QR, qrcode.react tarafından tarayıcınızda satır içi SVG olarak çizilir: QR servisi yok, resim isteği yok, bu kaynaktan hiçbir şey çıkmıyor.",
  hu: "A QR-kódot a qrcode.react a böngésződben rajzolja beágyazott SVG-ként: nincs QR-szolgáltatás, nincs kép-kérés, semmi nem hagyja el ezt az oldalt.",
};

const BUILD_TITLE: Localized<string> = {
  en: "Build it from the public source",
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

const ROW_TARGET: Localized<string> = {
  en: "Deployment target",
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

const LANG_TITLE: Localized<string> = {
  en: "The client's own 18 localizations",
  ru: "18 собственных локализаций клиента",
  de: "Die 18 eigenen Lokalisierungen des Clients",
  fr: "Les 18 localizations propres au client",
  it: "Le 18 localizzazioni del client",
  nl: "De 18 eigen lokalisaties van de client",
  cs: "18 základních lokalizací klienta",
  "zh-Hans": "客户端自带的 18 种本地化",
  "zh-Hant": "客戶端自帶的 18 種本地化",
  es: "Las 18 localizaciones del cliente",
  pl: "18 własnych lokalizacji klienta",
  ja: "クライアント同梱の 18 ローカライズ",
  th: "18 ภาษาที่ไคลเอนต์ติดมาเอง",
  fi: "Asiakkaan omat 18 kieliversiota",
  uk: "18 власних локалізацій клієнта",
  bg: "18-те собствени локализации на клиента",
  tr: "İstemcinin kendi 18 yerelleştirmesi",
  hu: "Az ügyfél saját 18 lokalizációja",
};

const LANG_NOTE: Localized<string> = {
  en: "The list below is the client's own CFBundleLocalizations: exactly 18 tags, in the same order, and every name is written in its own language.",
  ru: "Список ниже — это CFBundleLocalizations самого клиента: ровно 18 тегов в том же порядке, и каждое название написано на своём языке.",
  de: "Die Liste unten ist die CFBundleLocalizations des Clients selbst: genau 18 Tags in derselben Reihenfolge, und jeder Name steht in seiner eigenen Sprache.",
  fr: "La liste ci-dessous est la CFBundleLocalizations du client lui-même : exactement 18 étiquettes, dans le même ordre, et chaque nom est écrit dans sa propre langue.",
  it: "L'elenco qui sotto è il CFBundleLocalizations del client stesso: esattamente 18 tag nello stesso ordine, e ogni nome è scritto nella propria lingua.",
  nl: "De lijst hieronder is de CFBundleLocalizations van de client zelf: precies 18 tags, in dezelfde volgorde, en elke naam staat in zijn eigen taal.",
  cs: "Seznam níže je CFBundleLocalizations samotného klienta: přesně 18 tagů ve stejném pořadí a každý název je psán vlastním jazykem.",
  "zh-Hans": "下面的清单就是客户端 Info.plist 里的 CFBundleLocalizations：恰好 18 项，顺序一致，每个名字都用该语言自己的写法。",
  "zh-Hant": "下面的清單就是客戶端 Info.plist 裡的 CFBundleLocalizations：恰好 18 項，順序一致，每個名字都用該語言自己的寫法。",
  es: "La lista de abajo es la CFBundleLocalizations del propio cliente: exactamente 18 etiquetas, en el mismo orden, y cada nombre escrito en su idioma.",
  pl: "Poniższa lista to CFBundleLocalizations samego klienta: dokładnie 18 znaczników w tej samej kolejności, a każda nazwa jest zapisana we własnym języku.",
  ja: "下のリストはクライアント自身の CFBundleLocalizations です。18 個のタグを同じ順で並べ、それぞれの名前はその言語の表記で書いています。",
  th: "รายการด้านล่างคือ CFBundleLocalizations ของไคลเอนต์เอง: มี 18 แท็กตรงตามลำดับเดิม และทุกชื่อเขียนในภาษาของตัวเอง",
  fi: "Alla oleva lista on asiakkaan oma CFBundleLocalizations: täsmälleen 18 tunnistetta samassa järjestyksessä, ja jokainen nimi on kirjoitettu omalla kielellään.",
  uk: "Список нижче — це CFBundleLocalizations самого клієнта: рівно 18 тегів у тому ж порядку, і кожна назва написана власною мовою.",
  bg: "Списъкът долу е собственото CFBundleLocalizations на клиента: точно 18 маркера в същия ред и всяко име е изписано на собствения си език.",
  tr: "Aşağıdaki liste istemcinin kendi CFBundleLocalizations değeridir: tam 18 etiket, aynı sırayla, ve her ad kendi dilinde yazılmıştır.",
  hu: "Az alábbi lista az ügyfél saját CFBundleLocalizations listája: pontosan 18 címke ugyanabban a sorrendben, és minden név a saját nyelvén szerepel.",
};

const FACT_ROWS = [
  { label: ROW_TARGET, value: "iOS 17.0" },
  { label: ROW_SWIFT, value: "SWIFT_VERSION = 5.0" },
  { label: ROW_XCODE, value: "xcodebuild -version" },
];

function QrCard(): ReactElement {
  const aria = useCopy(QR_ARIA);
  const note = useCopy(QR_NOTE);

  return (
    <div className="glass-inset flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">qrcode.react · QRCodeSVG</p>
        <span className="chip font-mono text-[10.5px] text-faint">SVG</span>
      </div>
      <div className="flex flex-col items-start gap-4 xs:flex-row xs:items-center xs:gap-5">
        <div className="shrink-0 rounded-xl border border-hair-strong bg-ink p-3">
          <QRCodeSVG
            value={SITE_URL}
            size={150}
            level="M"
            bgColor={QR_BG}
            fgColor={QR_FG}
            marginSize={2}
            title={aria}
            aria-label={aria}
          />
        </div>
        <div className="min-w-0">
          <p className="break-all font-mono text-[13.5px] text-white">{SITE_URL}</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-mute">{note}</p>
          <div className="mt-3">
            <CopyButton value={SITE_URL} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FactRow({ label, value }: { label: Localized<string>; value: string }): ReactElement {
  const l = useCopy(label);
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2">
      <dt className="text-[12.5px] text-faint">{l}</dt>
      <dd className="font-mono text-[12.5px] text-mute">{value}</dd>
    </div>
  );
}

export function DownloadAndBuildSection(): ReactElement {
  const availTitle = useCopy(AVAIL_TITLE);
  const availBody = useCopy(AVAIL_BODY);
  const availRuling = useCopy(AVAIL_RULING);
  const availHow = useCopy(AVAIL_HOW);
  const buildTitle = useCopy(BUILD_TITLE);
  const unpinned = useCopy(FACT_UNPINNED);
  const kitOnly = useCopy(FACT_KIT_ONLY);
  const scheme = useCopy(BUILD_SCHEME);
  const caption = useCopy(CMD_CAPTION);
  const scripts = useCopy(BUILD_SCRIPTS);
  const engineTitle = useCopy(ENGINE_TITLE);
  const engineBody = useCopy(ENGINE_BODY);
  const engineTiers = useCopy(ENGINE_TIERS);
  const langTitle = useCopy(LANG_TITLE);
  const langNote = useCopy(LANG_NOTE);

  return (
    <section id="download" className="relative py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} />

        {/* 1 · Availability — the honest panel, straight from ledger §12. */}
        <div className="mt-9 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <article className="glass p-5 sm:p-6">
            <h3 className="text-[15px] font-semibold text-white">{availTitle}</h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-mute">{availBody}</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-mute">{availRuling}</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-brand-soft/90">{availHow}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["resultCount: 0", "2026-11-22", "2026-11-16"].map((chip) => (
                <li key={chip} className="chip font-mono text-[10.5px] text-faint">
                  {chip}
                </li>
              ))}
            </ul>
          </article>

          {/* 2 · The QR of this portal, drawn locally — no badge artwork anywhere. */}
          <QrCard />
        </div>

        {/* 3 · Build from source — measured versions, verbatim CI command. */}
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <article className="glass p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <StatusDot tone="brand" />
              <h3 className="text-[15px] font-semibold text-white">{buildTitle}</h3>
            </div>
            <dl className="mt-4 divide-y divide-hair">
              {FACT_ROWS.map((row) => (
                <FactRow key={row.value} label={row.label} value={row.value} />
              ))}
            </dl>
            <p className="mt-3 text-[12.5px] leading-relaxed text-mute">{unpinned}</p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-mute">{kitOnly}</p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-mute">{scheme}</p>
            <p className="mt-4 text-[11.5px] leading-relaxed text-faint">{scripts}</p>
            <a
              href={IOS_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex font-mono text-[12.5px] text-brand-soft underline decoration-hair underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              popopx-chat · master
            </a>
          </article>

          <div className="flex flex-col gap-4">
            <CodeBlock code={BUILD_COMMAND} maxHeightClass="max-h-[280px]" caption={caption} />
            {/* The engine that feeds the client its server list — ledger §7, two tiers. */}
            <div className="glass-inset p-5">
              <p className="eyebrow">{engineTitle}</p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-mute">{engineBody}</p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-mute">{engineTiers}</p>
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10.5px] text-faint">
                {["popopx-server-up-bot", "cluster.json", "Ed25519", "SERVER_CFG_ACK"].map((chip) => (
                  <span key={chip} className="chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 · The 18-language wall: the client's own tags, names in their own script. */}
        <div className="glass mt-12 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-white">{langTitle}</h3>
            <span className="chip font-mono text-[10.5px] text-faint">{LOCALE_COUNT}</span>
          </div>
          <p className="mt-3 max-w-4xl text-[12.5px] leading-relaxed text-mute">{langNote}</p>
          <ul className="mt-5 grid grid-cols-2 gap-1.5 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
            {LOCALES.map((code) => (
              <li
                key={code}
                className="flex items-center justify-between gap-2 rounded-lg border border-hair px-2.5 py-1.5"
              >
                <span className="truncate text-[12.5px] text-mute">{LOCALE_NATIVE[code]}</span>
                <span className="shrink-0 font-mono text-[10px] text-faint">{code}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

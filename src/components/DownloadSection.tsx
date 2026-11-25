"use client";

import type { ReactElement } from "react";
import { QRCodeSVG } from "qrcode.react";
import { LOCALE_COUNT, LOCALES, LOCALE_NATIVE, useCopy, type Localized } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { CopyButton, SectionHeading } from "@/components/ui";

/**
 * DownloadSection — `/download/`: store status, the local QR, v1.2.0 as written,
 * and the 18-language wall.
 *
 * The build-from-source panel and the config-engine panel that used to sit here
 * are on `/developers/` now (`src/components/DeveloperGuide.tsx`), together with
 * the ledger anchors that back them.
 *
 * · Distribution: ledger §12 of `docs/FACTS.md` — the App Store record does not
 *   resolve (`itunes.apple.com/lookup` → `resultCount: 0`, re-measured 2026-11-22)
 *   and the standing ruling of 2026-11-16 (`../popopx.chat-site/README.md:97-101`)
 *   forbids rendering any store badge or link, or reusing another project's
 *   TestFlight code, until that record resolves on its own.
 * · QR: `qrcode.react` 4.2.0 in `package.json` renders inline SVG client-side,
 *   zero requests.
 * · Release notes: ledger §14 — what `CHANGELOG.md` claims for v1.2.0, quoted with
 *   its line numbers rather than summarised.
 * · Languages: ledger §1 — `CFBundleLocalizations` in
 *   `apps/ios/POPOPX--iOS--Info.plist`.
 */



const QR_BG = "#07080D";
const QR_FG = "#E9E9F5";

const EYEBROW: Localized<string> = {
  en: "Get it, and what is in it",
  ru: "Как получить и что внутри",
  de: "Beziehen und was enthalten ist",
  fr: "Obtenir et ce qu'il contient",
  it: "Ottenere e cosa contiene",
  nl: "Verkrijgen en wat erin zit",
  cs: "Získání a co je uvnitř",
  "zh-Hans": "获取与内容",
  "zh-Hant": "取得與內容",
  es: "Obtenerlo y qué contiene",
  pl: "Pobranie i co jest w środku",
  ja: "入手と中身",
  th: "การรับและสิ่งที่อยู่ข้างใน",
  fi: "Hankinta ja sisältö",
  uk: "Як отримати і що всередині",
  bg: "Какво получавате и какво съдържа",
  tr: "Edinme ve içeriği",
  hu: "Beszerzés és ami benne van",
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

/*
 * The build-from-source panel moved to `/developers/` with the route split, so
 * this lead sends the reader there instead of describing a compiler invocation
 * the page no longer shows.
 */
const LEAD: Localized<string> = {
  en: "Two honest panels and one language wall: what you can get today, what the v1.2.0 notes really claim, and the 18 localizations the client ships with. Building from source is on the developers page.",
  ru: "Две честные панели и стена языков: что можно получить сегодня, что действительно сказано в заметках v1.2.0, и 18 локализаций клиента. Сборка из исходников — на странице для разработчиков.",
  de: "Zwei ehrliche Panels und eine Sprachwand: was es heute gibt, was die v1.2.0-Notes wirklich behaupten, und die 18 Lokalisierungen des Clients. Der Build aus dem Quellcode steht auf der Entwicklerseite.",
  fr: "Deux volets honnêtes et un mur de langues : ce qu'on obtient aujourd'hui, ce que les notes v1.2.0 affirment vraiment, et les 18 localizations du client. La compilation depuis le source est sur la page développeurs.",
  it: "Due pannelli onesti e una parete di lingue: cosa si ottiene oggi, cosa dichiarano davvero le note v1.2.0, e le 18 localizzazioni del client. La compilazione dal sorgente è nella pagina per gli sviluppatori.",
  nl: "Eerlijke panelen en een taalmuur: wat je vandaag kunt krijgen, wat de v1.2.0-notities werkelijk beweren, en de 18 lokalisaties van de client. Bouwen uit broncode staat op de ontwikkelaarspagina.",
  cs: "Dvě upřímné panely a zeď jazyků: co dnes dostanete, co poznámky v1.2.0 skutečně tvrdí, a 18 lokalizací klienta. Sestavení ze zdroje je na vývojářské stránce.",
  "zh-Hans": "两块老实的面板与一面语言墙：今天能拿到什么、v1.2.0 的说明里真正写了什么、客户端自带的 18 种本地化。从源码构建在开发者页面。",
  "zh-Hant": "兩塊老實的面板與一面語言牆：今天能拿到什麼、v1.2.0 的說明裡真正寫了什麼、客戶端自帶的 18 種本地化。從原始碼建置在開發者頁面。",
  es: "Dos paneles honestos y un muro de idiomas: qué se puede obtener hoy, qué afirman de verdad las notas de v1.2.0 y las 18 localizaciones del cliente. Compilar desde el código está en la página para desarrolladores.",
  pl: "Dwie uczciwe sekcje i ściana języków: co dziś można dostać, co naprawdę twierdzą notatki v1.2.0, i 18 lokalizacji klienta. Budowanie z kodu jest na stronie dla programistów.",
  ja: "誠実な 2 枚のパネルと言語の壁。今日入手できるもの、v1.2.0 のノートが実際に述べていること、クライアント同梱の 18 のローカライズ。ソースからのビルドは開発者ページにあります。",
  th: "สองพาเนลซื่อสัตย์และกำแพงภาษาหนึ่งแนว: วันนี้ติดตั้งอะไรได้จริง โน้ต v1.2.0 พูดไว้อย่างไร และการรองรับ 18 ภาษาที่มากับไคลเอนต์ การสร้างจากซอร์สอยู่ที่หน้าสำหรับนักพัฒนา",
  fi: "Rehellinen kaksi paneelia ja kieliseinä: mitä tänään saa, mitä v1.2.0:n huomautukset oikeasti väittävät, ja asiakkaan mukana tulevat 18 kieliversiota. Kääntäminen lähteestä on kehittäjäsivulla.",
  uk: "Два чесні блоки та стіна мов: що доступне сьогодні, що справді стверджують нотатки v1.2.0, й 18 локалізацій клієнта. Збірка з коду — на сторінці для розробників.",
  bg: "Два честни блока и една езикова стена: какво можете да получите днес, какво наистина твърдят бележките за v1.2.0, и 18-те локализации на клиента. Изграждането от код е в страницата за разработчици.",
  tr: "İki dürüst bölüm ve bir dil duvarı: bugün ne alınabilir, v1.2.0 notları gerçekte ne iddia ediyor, ve istemcinin yayımladığı 18 yerelleştirme. Kaynaktan derleme geliştirici sayfasında.",
  hu: "Két becsületes panel és egy nyelvfall: ma mit kaphatsz, mit állítanak valójában a v1.2.0 jegyzetek, és az ügyfél 18 lokalizációja. A forrásból fordítás a fejlesztői oldalon van.",
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

const RELEASE_TITLE: Localized<string> = {
  en: "What the release notes actually claim",
  ru: "Что реально говорят заметки о релизе",
  de: "Was die Release-Notes wirklich behaupten",
  fr: "Ce que les notes de version affirment vraiment",
  it: "Cosa dicono davvero le note di rilascio",
  nl: "Wat de releasenotes werkelijk beweren",
  cs: "Co poznámky k vydání opravdu tvrdí",
  "zh-Hans": "版本说明里真正写了的三件事",
  "zh-Hant": "版本說明裡真正寫了的三件事",
  es: "Lo que las notas de la versión realmente afirman",
  pl: "Co naprawdę mówią notki wydania",
  ja: "リリースノートが実際に書いている三つ",
  th: "สามสิ่งที่โน้ตเวอร์ชันกล่าวไว้จริง",
  fi: "Mitä julkaisun tiedot todella väittävät",
  uk: "Що насправді кажуть нотатки релізу",
  bg: "Това, което бележките за изданието реално твърдят",
  tr: "Sürüm notlarının gerçekten iddia ettiği üç şey",
  hu: "Amit a kiadási jegyzetek valójában állítanak",
};

const RELEASE_LEAD: Localized<string> = {
  en: "Three lines, each one read out of the shipping Swift source rather than a changelog heading. The file and line under each is the place a reader can go and check.",
  ru: "Три строки, каждая прочитана из рабочего Swift-кода, а не из заголовка чейнджлога. Файл и строка под каждой — то место, где читатель может проверить.",
  de: "Drei Zeilen, jede dem ausgelieferten Swift-Quellcode gelesen, nicht einer Changelog-Überschrift. Datei und Zeile darunter sind die Stelle, die jemand nachprüfen kann.",
  fr: "Trois lignes, chacune lue dans le source Swift livré plutôt que dans un titre de changelog. Le fichier et la ligne dessous sont l’endroit où le lecteur peut vérifier.",
  it: "Tre righe, ciascuna letta nel sorgente Swift pubblicato invece che in un titolo del changelog. File e riga sotto ogni voce sono il punto dove il lettore può verificare.",
  nl: "Drie regels, elk uit de meegeleverde Swift-broncode gelezen, niet uit een changelogkop. Bestand en regel eronder zijn plek die een lezer kan nalopen.",
  cs: "Tři řádky, každý čtený ze dodaného Swiftového zdroje, ne z nadpisu changelogu. Soubor a řádek pod každým jsou místo, kde se dá ověřit.",
  "zh-Hans": "三行说明，每一行都读自出厂的 Swift 源码，而不是变更日志的标题。每条下面标的文件与行号，就是读者可以去核对的地方。",
  "zh-Hant": "三行說明，每一行都讀自出廠的 Swift 原始碼，而不是變更日誌的標題。每條下面標的檔案與行號，就是讀者可以去核對的地方。",
  es: "Tres líneas, cada una leída del código Swift publicado y no de un título del changelog. El archivo y la línea de cada una son el lugar donde el lector puede comprobar.",
  pl: "Trzy linijki, każdą wyczytano z dostarczonego Swifta, nie z nagłówka changelogu. Plik i numer linii pod każdym z nich to miejsce, które można sprawdzić.",
  ja: "三つの行はいずれも 変更履歴の見出しではなく、出荷済みの Swift ソースから読みました。各項目の下に書いたファイルと行番号が、確認しに行ける場所です。",
  th: "สามบรรทัด แต่ละบรรทัดอ่านจากซอร์ส Swift ที่ส่งออกจริง ไม่ใช่จากหัวบันทึกการเปลี่ยนแปลง ไฟล์และหมายเลขบรรทัดที่เขียนใต้แต่ละข้อ คือจุดที่ผู้อ่านไปตรวจได้",
  fi: "Kolme riviä, kukin luettuna toimitetusta Swift-lähdekoodista changelogin otsikon sijaan. Tiedosto ja rivinumero jokaisen alla ovat paikka, jossa lukija voi tarkistaa.",
  uk: "Три рядки, кожен прочитаний із надісланого Swift-коду, а не з заголовка чейнджлогу. Файл і рядок під кожним — те місце, де читач може перевірити.",
  bg: "Три реда, всеки прочетен от доставения Swift код, а не от заглавие на списък с промени. Файлът и редът под всеки са мястото, където читателят може да провери.",
  tr: "Üç satır, her biri changelog başlığından değil dağıtılan Swift kaynağından okundu. Her birinin altındaki dosya ve satır, okuyanın gidip doğrulayacağı yer.",
  hu: "Három sor, mindegyiket a szállított Swift forrásból olvastuk ki, nem egy changelog-címből. A fájl és a sorszám mindegyik alatt az a hely, ahol az olvasó utánanézhet.",
};

const REL_DUAL_NAME: Localized<string> = {
  en: "Two-channel routing",
  ru: "Двухканальная маршрутизация",
  de: "Zwei-Kanal-Routing",
  fr: "Routage à deux canaux",
  it: "Routing a due canali",
  nl: "Tweekanaalsrouting",
  cs: "Směrování dvěma kanály",
  "zh-Hans": "双通道路由",
  "zh-Hant": "雙通道路由",
  es: "Enrutado por dos canales",
  pl: "Trasa dwoma kanałami",
  ja: "二経路のルーティング",
  th: "การกำหนดเส้นทางสองช่องทาง",
  fi: "Kaksikanavareititys",
  uk: "Маршрутизація двома каналами",
  bg: "Двуканално насочване",
  tr: "İki kanallı yönlendirme",
  hu: "Kétcsatornás útvonalválasztás",
};

const REL_DUAL_BODY: Localized<string> = {
  en: "SMP stays the default. When it does not answer inside three seconds, the very same message goes out over Bluetooth at the same time — concurrently, never instead; and when Bluetooth reports no BLE_ACK after five seconds, the send continues over SMP under the original message ID.",
  ru: "SMP остаётся каналом по умолчанию. Если он не отвечает в течение трёх секунд, то же сообщение параллельно уходит по Bluetooth — параллельно, а не вместо; если же Bluetooth не даёт BLE_ACK за пять секунд, отправка продолжается через SMP под прежним идентификатором.",
  de: "SMP bleibt der Standard. Antwortet es nicht binnen drei Sekunden, geht dieselbe Nachricht gleichzeitig auch über Bluetooth raus – parallel, nie stattdessen; meldet Bluetooth nach fünf Sekunden keinen BLE_ACK, läuft der Versand unter derselben message-ID über SMP weiter.",
  fr: "SMP reste le canal par défaut. S’il ne répond pas dans les trois secondes, le même message part aussi en Bluetooth en parallèle — jamais à la place ; et si Bluetooth ne donne pas de BLE_ACK au bout de cinq secondes, l’envoi continue sur SMP sous l’identifiant d’origine.",
  it: "SMP resta il canale predefinito. Se non risponde entro tre secondi, lo stesso messaggio esce anche via Bluetooth, in parallelo, mai in vece; e se Bluetooth non dà un BLE_ACK dopo cinque secondi, l’invio continua su SMP sotto lo stesso message ID.",
  nl: "SMP blijft de standaard. Antwoordt het niet binnen drie seconden, dan gaat hetzelfde bericht tegelijk ook over Bluetooth — parallel, nooit in de plaats; en als Bluetooth na vijf seconden geen BLE_ACK geeft, loopt de verzending onder hetzelfde message-ID over SMP verder.",
  cs: "SMP zůstává výchozí kanál. Neodpoví-li do tří sekund, táž zpráva jde současně i Bluetoothem — souběžně, nikdy namísto; a když Bluetooth nedá BLE_ACK do pěti sekund, odesílání pokračuje přes SMP pod původním ID zprávy.",
  "zh-Hans": "SMP 仍是默认通道。它若在三秒内没有应答，同一条消息就同时再走蓝牙——是并行，不是替换；蓝牙五秒内没等到 BLE_ACK 时，发送又回到 SMP，沿用原来的 message ID。",
  "zh-Hant": "SMP 仍是預設通道。它若在三秒內沒有應答，同一條訊息就同時再走藍牙——是並行，不是取代；藍牙五秒內沒等到 BLE_ACK 時，發送又回到 SMP，沿用原來的 message ID。",
  es: "SMP sigue siendo el canal por defecto. Si no responde en tres segundos, el mismo mensaje sale también por Bluetooth, en paralelo, nunca en su lugar; y si Bluetooth no da un BLE_ACK tras cinco segundos, el envío continúa por SMP con el ID de mensaje original.",
  pl: "SMP pozostaje kanałem domyślnym. Jeśli nie odpowie w trzy sekundy, ta sama wiadomość leci jednocześnie Bluetoothem — równolegle, nie zamiast; a gdy Bluetooth nie da BLE_ACK po pięciu sekundach, wysyłka idzie dalej przez SMP pod pierwotnym ID.",
  ja: "既定の通信路は SMP のまま。3 秒以内に答えが無いと、同じメッセージが Bluetooth へ同時に流れます——併走であって切替えではありません。逆に Bluetooth が 5 秒以内に BLE_ACK を返さなければ、送信は元のメッセージ ID のまま SMP で続きます。",
  th: "SMP ยังเป็นช่องทางเริ่มต้น ถ้าไม่ตอบในสามวินาที ข้อความเดิมจะถูกส่งผ่านบลูทูธไปด้วยพร้อมกัน — ส่งคู่กัน ไม่ใช่ส่งแทน และถ้าบลูทูธไม่ส่ง BLE_ACK ภายในห้าวินาที การส่งจะไปต่อผ่าน SMP ด้วย message ID เดิม",
  fi: "SMP pysyy oletuskanavana. Jos se ei vastaa kolmessa sekunnissa, sama viesti lähtee yhtä aikaa Bluetoothilla — rinnan, ei sen tilalla; eikä Bluetoothin antaessa BLE_ACK:ia viidessä sekunnissa lähetys jatkuu SMP:llä alkuperäisellä message-ID:llä.",
  uk: "SMP лишається каналом типовим. Якщо він не відповість за три секунди, те саме сообщение паралельно іде Bluetooth — паралельно, а не замість; якщо ж Bluetooth не дасть BLE_ACK за п’ять секунд, надсилання продовжується через SMP під тим самим ID.",
  bg: "SMP си остава каналът по подразбиране. Ако не отговори в рамките на три секунди, същото съобщение излиза едновременно и по Bluetooth — успоредно, а не вместо; и ако Bluetooth не даде BLE_ACK след пет секунди, изпращането продължава през SMP под първоначалното ID.",
  tr: "SMP varsayılan kanal olarak kalıyor. Üç saniye içinde yanıt vermezse aynı mesaj Bluetooth üzerinden aynı anda da gönderiliyor — eşzamanlı, yerine değil; Bluetooth beş saniyede bir BLE_ACK vermezse gönderim, orijinal mesaj kimliğiyle SMP üzerinden sürüyor.",
  hu: "Az SMP marad az alapértelmezett csatorna. Ha három másodpercen belül nem válaszol, ugyanaz az üzenet egyszerre Bluetoothon is kijön — párhuzamosan, nem helyette; ha a Bluetooth öt másodperc múlva sem ad BLE_ACK-t, a küldés SMP-n megy tovább az eredeti üzenetazonosítóval.",
};

const REL_BADGE_NAME: Localized<string> = {
  en: "StoreKit 2 privacy-node badge",
  ru: "Бейдж приватного узла на StoreKit 2",
  de: "StoreKit-2-Datenschutzknoten-Abzeichen",
  fr: "Badge de nœud privé via StoreKit 2",
  it: "Badge nodo-privacy con StoreKit 2",
  nl: "Privacyknooppunt-badge via StoreKit 2",
  cs: "Odznak soukromého uzlu přes StoreKit 2",
  "zh-Hans": "StoreKit 2 动态隐私节点徽章",
  "zh-Hant": "StoreKit 2 動態隱私節點徽章",
  es: "Insignia de nodo privado con StoreKit 2",
  pl: "Odznaka węzła prywatności w StoreKit 2",
  ja: "StoreKit 2 のプライバシーノードバッジ",
  th: "ป้ายโหนดส่วนตัวบน StoreKit 2",
  fi: "StoreKit 2 -privacyntoon merkki",
  uk: "Значок приватного вузла на StoreKit 2",
  bg: "Значка на поверителен възел чрез StoreKit 2",
  tr: "StoreKit 2 gizlilik düğümü rozeti",
  hu: "StoreKit 2-ös privát csomó jelvény",
};

const REL_BADGE_BODY: Localized<string> = {
  en: "The thirteen node-badge products are read from StoreKit at launch, so price and availability come from Apple rather than a table in the app; the capsule shows free, trial or lit with the time left, and the renewal switch stays Apple’s. Buying writes a local ledger record first, and only then is the transaction finished.",
  ru: "Тринадцать продуктов бейджа читаются из StoreKit при старте, поэтому цена и наличие приходят от Apple, а не из таблицы в приложении; капсула показывает «свободен», «пробный» или «активен» с остатком времени, а переключатель продления остаётся у Apple. Покупка сначала пишет локальную запись, и только потом завершается транзакция.",
  de: "Die dreizehn Badge-Produkte werden beim Start von StoreKit gelesen, Preis und Verfügbarkeit kommen also von Apple und nicht aus einer Tabelle in der App; die Kapsel zeigt frei, Test oder aktiv mit Restzeit, und der Verlängerungsschalter bleibt Apples. Ein Kauf schreibt zuerst den lokalen Ledger-Eintrag und schließt die Transaktion erst danach ab.",
  fr: "Les treize produits du badge sont lus dans StoreKit au lancement, prix et disponibilité viennent donc d’Apple et non d’un tableau de l’app ; la capsule affiche libre, essai ou actif avec le temps restant, et l’interrupteur de renouvellement reste chez Apple. Un achat écrit d’abord le registre local, puis seulement la transaction est terminée.",
  it: "I tredici prodotti del badge si leggono da StoreKit all’avvio, quindi prezzo e disponibilità vengono da Apple e non da una tabella nell’app; la capsula mostra libero, prova o attivo col tempo residuo, e l’interruttore di rinnovo resta quello di Apple. Un acquisto scrive prima il registro locale, poi e solo allora la transazione è conclusa.",
  nl: "De dertien badgeproducten worden bij opstarten uit StoreKit gelezen, dus prijs en beschikbaarheid komen van Apple en niet uit een tabel in de app; de capsule toont vrij, proef of aan met de resterende tijd, en de verlengk nop blijft van Apple. Een aankoop schrijft eerst de lokale ledger, en pas daarna wordt de transactie afgerond.",
  cs: "Třináct produktů odznaku se při startu čte ze StoreKitu, takže cena a dostupnost přicházejí od Applu, ne z tabulky v aplikaci; kapsle ukazuje volný, zkušební nebo aktivní se zbývajícím časem a přepínač obnovy zůstává Applovský. Nákup nejprve zapíše místní účetní záznam a teprve pak je transakce dokončena.",
  "zh-Hans": "徽章的十三个商品在启动时从 StoreKit 读取，价格与可售状态来自 Apple，而不是 App 里的表；胶囊显示空闲、试用或已点亮并带上剩余时间，续订开关仍归 Apple。购买先写入本地账本记录，之后才把那笔交易标记完成。",
  "zh-Hant": "徽章的十三個商品在啟動時從 StoreKit 讀取，價格與可售狀態來自 Apple，而不是 App 裡的表；膠囊顯示空閒、試用或已點亮並帶上剩餘時間，續訂開關仍歸 Apple。購買先寫入本地帳本記錄，之後才把那筆交易標記完成。",
  es: "Los trece productos del badge se leen de StoreKit al arrancar, así que precio y disponibilidad vienen de Apple y no de una tabla en la app; la cápsula muestra libre, prueba o encendido con el tiempo restante, y el interruptor de renovación sigue siendo de Apple. La compra escribe primero el registro local y solo después se cierra la transacción.",
  pl: "Trzynaście produktów odznaki odczytywanych jest z StoreKit przy starcie, więc cena i dostępność przychodzą od Apple, nie z tabelki w aplikacji; kapsuła pokazuje wolny, próbny lub aktywny z pozostałym czasem, a przełącznik odnowienia zostaje u Apple. Zakup najpierw zapisuje lokalny rejestr, a dopiero potem transakcja jest zamykana.",
  ja: "バッジの 13 品目は起動時に StoreKit から読むため、価格も販売状況も Apple 側のもので、アプリ内の表ではありません。カプセルは未契約・試用・点灯のいずれかを残り時間付きで示し、更新のスイッチは Apple のまま。購入では最初にロー台帳へ書き込み、その後で取引を確定します。",
  th: "สินค้าของป้ายทั้งสิบสามตัวอ่านจาก StoreKit ตอนเปิดแอป ราคาและสถานะการขายจึงมาจาก Apple ไม่ใช่ตารางในแอป; แคปซูลแสดงสถานะว่าง ทดลองใช้งาน หรือเปิดใช้พร้อมเวลาที่เหลือ สวิตช์ต่ออายุยังอยู่ที่ Apple และการซื้อจะเขียนลงบัญชีในเครื่องก่อน แล้วจึงจบทรานแซกชัน",
  fi: "Kolmetoista badge-tuotetta luetaan StoreKitista käynnistyksessä, joten hinta ja saatavuus tulevat Applelta eivätkä taulukosta sovelluksessa; kapseli näyttää vapaa, kokeilu tai sytytetty jäljellä olevan ajan kanssa, ja jatkamisen valitsin on Applella. Ostoksesta kirjoitetaan ensin paikallinen kirjaus, vasta sen jälkeen transaktio suljetaan.",
  uk: "Тринадцять продуктів значка читаються з StoreKit при запуску, тому ціна й наявність приходять від Apple, а не з таблиці в додатку; капсула показує вільний, пробний чи активний із залишком часу, а перемикач продовження лишається в Apple. Покупка спершу пише локальний запис, і лише тоді транзакція завершується.",
  bg: "Тринайсетте продукта за значката се четат от StoreKit при стартиране, така че цената и наличността идват от Apple, а не от таблица в приложението; капсулата показва свободен, пробен или светнал с оставащото време, а превключвателят за подновяване си остава на Apple. Купуването първо записва в локалния регистър и чак тогава транзакцията се приключва.",
  tr: "Rozetin on üç ürünü açılışta StoreKit’ten okunur, yani fiyat ve bulunabilirlik uygulamadaki bir tablodan değil Apple’dan gelir; kapsül boş, deneme ya da yanık durumunda kalan süreyle gösterilir ve yenileme anahtarı Apple’da kalır. Satın alma önce yerel defter kaydını yazar, işlem ancak ondan sonra tamamlanır.",
  hu: "A jelvény tizenhárom termékét induláskor a StoreKitből olvassuk, így az ár és a elérhetőség Apple-től jön, nem egy az appben lévő táblázatból; a kapszula szabad, próba vagy világuló állapotot mutat a hátralévő idővel, az újítás kapcsolója pedig Apple-nél marad. A vásárlás előbb a helyi naplóba ír, s csak utána zárul a tranzakció.",
};

const REL_BACKUP_NAME: Localized<string> = {
  en: "Local passphrase and database copies",
  ru: "Локальный пароль и копии базы данных",
  de: "Lokales Passwort und Datenbankkopien",
  fr: "Mot de passe local et copies de base",
  it: "Passphrase locale e copie del database",
  nl: "Lokaal wachtwoord en databankkopies",
  cs: "Místní heslový klíč a kopie databáze",
  "zh-Hans": "本机口令加密与数据库副本",
  "zh-Hant": "本機口令加密與資料庫副本",
  es: "Frase local y copias de la base de datos",
  pl: "Lokalne hasło i kopie bazy danych",
  ja: "ローカルのパスフレーズ暗号化とデータベースの複写",
  th: "รหัสผ่านในเครื่องและสำเนาฐานข้อมูล",
  fi: "Paikallinen salasana ja tietokantakopiot",
  uk: "Локальний пароль і копії бази даних",
  bg: "Локална парола и копия на базата данни",
  tr: "Yerel parola ve veritabanı kopyaları",
  hu: "Helyi jelmondat és adatbázismásolatok",
};

const REL_BACKUP_BODY: Localized<string> = {
  en: "The chat database takes a passphrase you set yourself, with the option to keep it in the Keychain, and both databases are copied to .bak files on disk that the app can check and roll back. This is local protection only: identity keys, credits and badges stay on the device and are never uploaded — reinstalling without a backup still loses them.",
  ru: "База чата получает пароль, который задаёте вы, с опцией хранить его в Keychain, а обе базы копируются в .bak-файлы на диске, которые приложение может проверить и откатить. Это только локальная защита: ключи, кредиты и бейджи остаются на устройстве и никуда не загружаются — переустановка без резервной копии всё равно их потеряет.",
  de: "Die Chat-Datenbank bekommt ein selbst gesetztes Passwort, das optional im Schlüsselbund liegt, und beide Datenbanken werden als .bak-Dateien auf die Platte kopiert, die die App prüfen und zurückspielen kann. Das ist nur lokaler Schutz: Identitätsschlüssel, Guthaben und Abzeichen bleiben auf dem Gerät und werden nie hochgeladen – ohne Backup geht ein Neuaufsetzen trotzdem verloren.",
  fr: "La base de chat reçoit une phrase secrète que vous fixez vous-même, avec l’option de la garder dans le trousseau, et les deux bases sont copiées en fichiers .bak sur le disque, que l’app peut vérifier et restaurer. Ce n’est qu’une protection locale : clés d’identité, crédits et badges restent sur l’appareil et ne sont jamais téléversés — réinstaller sans sauvegarde les perd quand même.",
  it: "Il database della chat riceve una passphrase che impostate voi, con l’opzione di tenerla nel Keychain, e entrambi i database vengono copiati in file .bak su disco che l’app può controllare e ripristinare. È solo protezione locale: chiavi d’identità, crediti e badge restano sul dispositivo e non vengono mai caricati — reinstallare senza backup li perde comunque.",
  nl: "De chatdatabank krijgt een zelf gekozen wachtwoordzin, desgewenst bewaard in de Sleutelhanger, en beide databanken worden als .bak-bestanden op schijf gezet die de app kan controleren en terugzetten. Dit is alleen lokale bescherming: identiteitssleutels, tegoed en badges blijven op het apparaat en worden nooit geüpload — herinstalleren zonder backup verliest ze alsnog.",
  cs: "Databáze chatu dostane heslový klíč, který si nastavíte sami, volitelně uložený v Keychainu, a obě databáze se kopírují do souborů .bak na disku, které aplikace umí zkontrolovat a vrátit zpět. Jde pouze o místní ochranu: identitní klíče, kredity i odznaky zůstávají v zařízení a nikam se nenahrávají — přeinstalace bez zálohy je stejně ztratí.",
  "zh-Hans": "聊天数据库使用你自己设定的口令，可选择把口令存进钥匙串；两个数据库都会在数据库文件旁边留下 .bak 副本，App 能检查它、也能回滚它。这只是本机保护：身份密钥、算力点与徽章都留在设备上，永不上传——没有备份就重装，它们照样会丢。",
  "zh-Hant": "聊天資料庫使用你自己設定的口令，可選擇把口令存進鑰匙串；兩個資料庫都會在資料庫檔案旁邊留下 .bak 副本，App 能檢查它、也能回滾它。這只是本機保護：身份金鑰、算力點與徽章都留在裝置上，永不上傳——沒有備份就重安裝，它們照樣會丟。",
  es: "La base de datos del chat recibe una frase que defines tú, con la opción de guardarla en el llavero, y ambas bases se copian a archivos .bak en disco que la app puede comprobar y revertir. Esto es solo protección local: claves de identidad, créditos y insignias se quedan en el dispositivo y nunca se suben — reinstalar sin copia los pierde igualmente.",
  pl: "Baza czatów dostaje hasło, które ustawiasz sam, z opcją trzymania go w Kluczu, a obie bazy są kopiowane do plików .bak na dysku, które aplikacja może sprawdzić i cofnąć. To tylko ochrona lokalna: klucze tożsamości, kredyty i odznaki zostają na urządzeniu i nigdy nie są przesyłane — reinstalacja bez kopii i tak je zgubi.",
  ja: "チャットのデータベースには自分で決めた暗号化パスフレーズを使い、Keychain に保存する選択肢もあります。二つのデータベースはいずれもディスク上に .bak として複写され、アプリはその確認と巻き戻しができます。守るのはローカルだけ: 身元鍵・計算クレジット・バッジはデバイスに残り、アップロードされません。バックアップ無しで再インストールすれば失われます。",
  th: "ฐานข้อมูลแชทใช้รหัสผ่านที่คุณตั้งเอง โดยมีตัวเลือกให้เก็บใน Keychain และทั้งสองฐานจะถูกคัดลอกเป็นไฟล์ .bak บนดิสก์ที่แอปตรวจและย้อนกลับได้ นี่คือเกราะเฉพาะในเครื่อง: คีย์ประจำตัว เครดิต และป้ายอยู่ในอุปกรณ์ ไม่ถูกอัปโหลด — ติดตั้งใหม่โดยไม่มีสำเนาก็ยังหายไป",
  fi: "Keskustelutietokanta saa itse asettamasi salasanan, ja sen voi halutessaan pitää avainnauhassa, ja molemmat tietokannat kopioidaan levyn .bak-tiedostoiksi, jotka appi voi tarkistaa ja palauttaa. Tämä on vain paikallista suojaa: identiteettiavaimet, krediitapisteet ja merkit pysyvät laitteella eivätkä lähetetä — uudelleenasennus ilman varmuuskopiota hukkaa ne edelleen.",
  uk: "База чатів отримує пароль, який ви задаєте самі, з опцією зберігати його в Keychain, а обидві бази копіюються у файли .bak на диску, які додаток може перевірити й відкотити. Це лише локальний захист: ключі особи, кредити і значки лишаються на пристрої й нікуди не вантажаться — перевстановлення без копії їх усе одно втратить.",
  bg: "Чат базата данни получава парола, която задавате сами, с опция да я пази в Keychain, и двете бази се копират като .bak файлове на диска, които приложението може да провери и върне. Това е само локална защита: ключовете за самоличност, кредитите и значките остават в устройството и не се качват никъде — преинсталиране без копие пак ги губи.",
  tr: "Sohbet veritabanı sizin belirlediğiniz bir parolayı alır, istenirse bu parola Anahtar Zinciri’nde tutulur, ve her iki veritabanı diskin .bak dosyalarına kopyalanır; uygulama bunları denetleyip geri alabilir. Bu yalnızca yerel bir koruma: kimlik anahtarları, krediler ve rozetler cihazda kalır, hiçbir yere yüklenmez — yedek almadan yeniden kurmak yine de kaybeder.",
  hu: "A csevegés adatbázisa saját jelmondatot kap, amely kérésre a Kulcskarikában tárolható, és mindkét adatbázis .bak fájlokként kimásolódik a lemezre, amelyeket az app ellenőrizhet és visszaállíthat. Ez csak helyi védelem: az identitáskulcsok, kreditpontok és jelvények az eszközön maradnak, fel sem töltődnek — mentés nélküli újratelepítés őket is elveszi.",
};

const RELEASE_ITEMS: { name: Localized<string>; body: Localized<string>; cite: string }[] = [
  {
    name: REL_DUAL_NAME,
    body: REL_DUAL_BODY,
    cite: "apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:10-11,19,271",
  },
  {
    name: REL_BADGE_NAME,
    body: REL_BADGE_BODY,
    cite: "apps/ios/Shared/Features/BadgeCredits/PopopxBadgeCreditsModels.swift:145-163 · apps/ios/Shared/Features/BadgeCredits/PopopxStoreKitManager.swift:9,130-137,354-359",
  },
  {
    name: REL_BACKUP_NAME,
    body: REL_BACKUP_BODY,
    cite: "apps/ios/Shared/Views/Database/DatabaseEncryptionView.swift:73,91,95 · apps/ios/POPOPXChat/FileUtils.swift:50,52,215-231",
  },
];

const RELEASE_NOTE: Localized<string> = {
  en: "Every path above is relative to the client repository root — the same root the fact ledger cites. git grep -n finds each line; no row here is a reworded changelog heading.",
  ru: "Все пути выше — относительно корня репозитория клиента, того же корня, который цитирует журнал фактов. git grep -n находит каждый ряд; здесь ничего не переписано из заголовков чейнджлога.",
  de: "Alle Pfade oben sind relativ zur Wurzel des Client-Repos — dieselbe Wurzel, die das Faktenledger zitiert. git grep -n findet jede Zeile; keine Zeile hier ist eine umformulierte Changelog-Überschrift.",
  fr: "Les chemins ci-dessus sont relatifs à la racine du dépôt client — la même racine que cite le journal des faits. git grep -n trouve chaque ligne ; aucune ici n'est un titre de journal des modifications réécrit.",
  it: "I percorsi qui sopra sono relativi alla radice del repository client, la stessa citata dal registro dei fatti. git grep -n trova ogni riga; nessuna riga è un titolo del changelog riscritto.",
  nl: "Alle paden hierboven zijn relatief aan de root van de client-repo — dezelfde root die het feitenregister citeert. git grep -n vindt elke regel; geen enkele regel hier is een hertaalde changelog-kop.",
  cs: "Všechny cesty výše jsou relativní ke kořenu repozitáře klienta, tedy ke stejnému kořenu, jaký cituje evidence faktů. git grep -n najde každý řádek; žádný řádek zde není přepsaným nadpisem changelogu.",
  "zh-Hans": "上面每条路径都相对客户端仓库根目录，和事实台账引用的是同一个根。用 git grep -n 就能定位到行；这里没有哪一行是改写自变更日志的标题。",
  "zh-Hant": "上面每條路徑都相對於客戶端倉庫根目錄，和事實台帳引用的同一個根。用 git grep -n 就能定位到行；這裡沒有哪一行是改寫自變更日誌的標題。",
  es: "Las rutas de arriba son relativas a la raíz del repositorio del cliente — la misma raíz que cita el registro de hechos. git grep -n encuentra cada línea; ninguna fila es un título del changelog reescrito.",
  pl: "Wszystkie ścieżki powyżej są względem katalogu głównego repo klienta — tego samego, który cytuje rejestr faktów. git grep -n znajdzie każdy wiersz; żaden wiersz nie jest przepisany z nagłówka changelogu.",
  ja: "上のパスはいずれもクライアント リポジトリのルートからの相対で、事実台帳が引くのと同じルートです。git grep -n で各行を見つけられます。ここには変更履歴の見出しを書き換えた行はありません。",
  th: "พาธทั้งหมดด้านบนเทียบจากรูทของรีโปไคลเอนต์ ซึ่งเป็นรูทเดียวกับที่บัญชีข้อเท็จจริงอ้างอิง ใช้ git grep -n หาแต่ละบรรทัดได้ และไม่มีบรรทัดไหนเป็นพาดหัวบันทึกการเปลี่ยนแปลงที่ถูกเขียนใหม่",
  fi: "Kaikki yllä olevat polut ovat suhteessa asiakasrepón juureen — samaan juureen, jonka fact-luettelo lainaa. git grep -n löytää jokaisen rivin; yksikään rivi ei ole muotoiltu changelogin otsikosta uudelleen.",
  uk: "Усі шляхи вище — відносно кореню репозиторія клієнта, того самого, який цитує журнал фактів. git grep -n знаходить кожен рядок; тут жоден рядок не переписаний із заголовків чейнджлогу.",
  bg: "Всички пътища по-горе са относителни към корена на клиентското хранилище — същия корен, който цитира регистърът на фактите. git grep -n намира всеки ред; нито един ред не е преработено заглавие от списък с промени.",
  tr: "Yukarıdaki yolların tamamı istemci deposunun köküne göre — kayıt defterinin alıntıladığı aynı kök. git grep -n her satırı bulur; burada hiçbir satır changelog başlığının yeniden yazımı değil.",
  hu: "A fenti útvonalak mind a kliens repó gyökeréhez viszonyítottak — ugyanahhoz a gyökérhez, amit a ténytár idéz. A git grep -n minden sort megtalál; egyik sor sem a changelog címszavának átírása.",
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

function ReleaseItem({
  item,
  index,
}: {
  item: { name: Localized<string>; body: Localized<string>; cite: string };
  index: number;
}): ReactElement {
  const name = useCopy(item.name);
  const body = useCopy(item.body);
  return (
    <div className="glass-inset min-w-0 p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-[13.5px] font-semibold text-white">{name}</h4>
        <span className="shrink-0 font-mono text-[10.5px] text-faint">
          {`0${index + 1} / 03`}
        </span>
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-mute">{body}</p>
      <p className="mt-3 break-all font-mono text-[10.5px] text-faint">{item.cite}</p>
    </div>
  );
}

export function DownloadSection(): ReactElement {
  const availTitle = useCopy(AVAIL_TITLE);
  const availBody = useCopy(AVAIL_BODY);
  const availRuling = useCopy(AVAIL_RULING);
  const availHow = useCopy(AVAIL_HOW);
  const releaseTitle = useCopy(RELEASE_TITLE);
  const releaseLead = useCopy(RELEASE_LEAD);
  const releaseNote = useCopy(RELEASE_NOTE);
  const langTitle = useCopy(LANG_TITLE);
  const langNote = useCopy(LANG_NOTE);

  return (
    <section id="download" className="relative py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} titleAs="h1" />

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

        {/* 3 · v1.2.0 — three lines, each one read out of the shipped Swift. */}
        <div className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-white">{releaseTitle}</h3>
            <span className="chip font-mono text-[10.5px] text-faint">v1.2.0</span>
          </div>
          <p className="mt-3 max-w-4xl text-[12.5px] leading-relaxed text-mute">{releaseLead}</p>
          <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-3">
            {RELEASE_ITEMS.map((item, index) => (
              <ReleaseItem key={item.cite} item={item} index={index} />
            ))}
          </div>
          <p className="mt-4 max-w-4xl text-[11.5px] leading-relaxed text-faint">{releaseNote}</p>
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

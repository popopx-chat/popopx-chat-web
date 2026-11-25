"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import { pick, useCopy, useLocale, type Localized } from "@/lib/i18n";
import { IOS_REPO_URL, SITE_URL } from "@/lib/site";

/**
 * Hero.
 *
 * What is true here, and where it comes from (`docs/FACTS.md`):
 *  - the four badges are the four claims the client code supports — no global
 *    user ID (§3), queue payload encrypted with AES-256-GCM and the Bluetooth
 *    link with a Noise XX handshake (§4, §6), dual-role CoreBluetooth GATT
 *    peer-to-peer transport (§6), and a public repository whose LICENSE is the
 *    full AGPL-3.0 text (§11);
 *  - the phone is an *illustration*, and says so: the five tab names, their
 *    order and their Chinese labels are read from
 *    `Shared/Navigation/MainTabView.swift` (§2), but nothing on the screen is a
 *    screenshot, and no invented contact, message or avatar appears;
 *  - the technical chips under each tab are protocol identifiers and constant
 *    names, so they are locale-free on purpose and identical in all 18
 *    languages; each one is quoted from the source (§3, §4, §6, §8, §9);
 *  - no store link is rendered anywhere: the App Store record does not resolve
 *    and the existing ruling says nothing may be shown until it does (§12).
 */

const TABS = ["messages", "contacts", "cabin", "discover", "me"] as const;
type TabId = (typeof TABS)[number];

const HERO_COPY: Record<
  "eyebrow" | "title" | "subtitle" | "ctaGet" | "ctaRepo" | "ctaSecurity",
  Localized<string>
> = {
  eyebrow: {
    en: "iOS client · from iOS 17.0",
    ru: "Клиент для iOS · начиная с iOS 17.0",
    de: "iOS-Client · ab iOS 17.0",
    fr: "Client iOS · à partir d’iOS 17.0",
    it: "Client iOS · da iOS 17.0",
    nl: "iOS-client · vanaf iOS 17.0",
    cs: "Klient pro iOS · od iOS 17.0",
    "zh-Hans": "iOS 客户端 · 需 iOS 17.0 起",
    "zh-Hant": "iOS 用戶端 · 需 iOS 17.0 起",
    es: "Cliente para iOS · desde iOS 17.0",
    pl: "Klient iOS · od iOS 17.0",
    ja: "iOS クライアント / iOS 17.0 以降",
    th: "ไคลเอ็นต์ iOS · ตั้งแต่ iOS 17.0",
    fi: "iOS-asiakias · iOS 17.0:stä eteenpäin",
    uk: "Клієнт для iOS · від iOS 17.0",
    bg: "Клиент за iOS · от iOS 17.0 нататък",
    tr: "iOS istemcisi · iOS 17.0 ve üzeri",
    hu: "iOS ügyfél · iOS 17.0-tól",
  },
  title: {
    en: "End-to-end encrypted messaging with no global ID",
    ru: "Сквозное шифрование без глобального идентификатора",
    de: "Ende-zu-Ende-verschlüsselte Nachrichten ohne globale ID",
    fr: "Messagerie chiffrée de bout en bout, sans identifiant global",
    it: "Messaggistica crittografata end-to-end, senza ID globale",
    nl: "End-to-end versleutelde berichten zonder globale ID",
    cs: "Koncové šifrování zpráv bez globální identifikace",
    "zh-Hans": "端到端加密通讯，没有全局 ID",
    "zh-Hant": "端到端加密通訊，沒有全域 ID",
    es: "Mensajería cifrada de extremo a extremo sin ID global",
    pl: "Szyfrowanie end-to-end bez globalnego identyfikatora",
    ja: "グローバル ID なしのエンドツーエンド暗号化メッセンジャー",
    th: "ข้อความเข้ารหัสปลายทางถึงปลายทาง โดยไม่มี ID กลาง",
    fi: "Päästä päähän salattu viestittely ilman globaalia tunnusta",
    uk: "Наскрізне шифрування повідомлень без глобального ID",
    bg: "Криптиране край до край без глобален идентикатор",
    tr: "Küresel kimlik olmadan uçtan uca şifreli mesajlaşma",
    hu: "Végpontok közötti titkosítás globális azonosító nélkül",
  },
  subtitle: {
    en: "POPOPX binds nothing to a phone number or an email address, and there is no global user ID: a connection is a pair of one-time queue addresses. Queue payloads, the Bluetooth link and service-account channels are encrypted end to end in the same open-source iOS client. This portal loads no third-party script, font or image, sets no cookie and runs no analytics — only your language choice is stored, on your device.",
    ru: "POPOPX ничего не привязывает к номеру телефона или электронной почте и не имеет глобального идентификатора пользователя: соединение — это пара одноразовых адресов очередей. Нагрузки очередей, Bluetooth-канал и каналы сервисных аккаунтов шифруются сквозно в одном и том же клиенте с открытым кодом. Этот портал не загружает сторонних сценариев, шрифтов и изображений, не ставит cookie и не собирает статистику — выбирается только язык, и он хранится на вашем устройстве.",
    de: "POPOPX verknüpft nichts mit Telefonnummer oder E-Mail-Adresse und kennt keine globale Benutzer-ID: eine Verbindung ist ein Paar einmaliger Queue-Adressen. Queue-Nutzdaten, Bluetooth-Verbindung und Service-Account-Kanäle werden in ein und demselben Open-Source-Client Ende-zu-Ende verschlüsselt. Dieses Portal lädt kein Drittanbieter-Skript, -Schrift oder -Bild, setzt keinen Cookie und führt keine Analyse – nur Ihre Sprachwahl bleibt auf Ihrem Gerät.",
    fr: "POPOPX n’associe rien à un numéro de téléphone ni à une adresse e-mail et ne connaît aucun identifiant utilisateur global : une connexion est une paire d’adresses de file d’attente à usage unique. Les charges des files, le lien Bluetooth et les canaux des comptes de service sont chiffrés de bout en bout dans le même client open source. Ce portail ne charge aucun script, police ou image tiers, ne dépose aucun cookie et n’exécute aucune mesure — seul votre choix de langue reste sur l’appareil.",
    it: "POPOPX non associa nulla a un numero di telefono o a un indirizzo email e non ha un ID utente globale: una connessione è una coppia di indirizzi di coda monouso. I carichi delle code, il collegamento Bluetooth e i canali degli account di servizio sono crittografati end-to-end nello stesso client open source. Questo portale non carica script, font o immagini di terze parti, non imposta cookie ed esegue analisi: solo la scelta della lingua resta sul dispositivo.",
    nl: "POPOPX koppelt niets aan een telefoonnummer of e-mailadres en kent geen globale gebruikers-ID: een verbinding is een paar eenmalige wachtrijadressen. Wachtrijladingen, de Bluetooth-verbinding en de kanalen van serviceaccounts worden in dezelfde opensource-client end-to-end versleuteld. Deze portal laadt geen scripts, lettertypen of afbeeldingen van derden, plaatst geen cookie en doet geen analyse — alleen uw taalkeuze blijft op uw apparaat.",
    cs: "POPOPX nic nevazuje na telefonní číslo ani e-mail a nemá žádný globální ID uživatele: spojením je pár jednorazových adres front. Zatížení front, Bluetooth spojení i kanály servisních účtů jsou koncově šifrovány v témže open-source klientovi. Tento portál nenačítá žádné skripty, písma ani obrázky třetích stran, nenastavuje cookies a neměří návštěvnost — pouze volba jazyka zůstává ve vašem zařízení.",
    "zh-Hans": "POPOPX 不把任何信息绑定到手机号或邮箱，也不存在全局用户 ID：一条连接只是一对一次性队列地址。队列载荷、蓝牙链路和服务号频道，都在同一个开源 iOS 客户端里完成端到端加密。本站不加载任何第三方脚本、字体或图片，不写 Cookie、不做统计——只把你的语言选择保存在你自己的设备上。",
    "zh-Hant": "POPOPX 不把任何資訊綁定到手機號或電子信箱，也不存在全域使用者 ID：一條連線只是一對一次性佇列位址。佇列負載、藍芽鏈路與服務號頻道，都在同一個開放原始碼 iOS 用戶端完成端到端加密。本站不載入任何第三方腳本、字型或圖片，不寫 Cookie、不做統計——只把你的語言選擇保存在你自己的裝置上。",
    es: "POPOPX no vincula nada a un número de teléfono ni a un correo, y no existe un ID global de usuario: una conexión es un par de direcciones de cola de un solo uso. Las cargas de las colas, el enlace Bluetooth y los canales de cuentas de servicio se cifran de extremo a extremo en el mismo cliente de código abierto. Este portal no carga scripts, fuentes ni imágenes de terceros, no instala cookies y no hace analítica: solo tu elección de idioma queda en tu dispositivo.",
    pl: "POPOPX nic nie wiąże z numerem telefonu ani adresem e-mail i nie ma globalnego identyfikatora użytkownika: połączenie to para jednorazowych adresów kolejek. Ładunki kolejek, łącze Bluetooth i kanały kont usług są szyfrowane end-to-end w tym samym kliencie open source. Ten portal nie wczytuje zewnętrznych skryptów, fontów ani obrazów, nie ustawia ciasteczek i nie prowadzi analiz — tylko wybór języka zostaje na Twoim urządzeniu.",
    ja: "POPOPX は電話番号にもメールアドレスにも何も紐づけず、グローバルなユーザー ID もありません。接続は使い捨てのキューアドレスの一対です。キューのペイロード、Bluetooth のリンク、サービスアカウントのチャンネルは、すべて同じオープンソースのクライアントでエンドツーエンドに暗号化されます。本ポータルは第三者のスクリプト・フォント・画像を読まず、Cookie も設定せず、解析も走りません。言語の選択だけがお使いの端末に保存されます。",
    th: "POPOPX ไม่ผูกอะไรกับหมายเลขโทรศัพท์หรืออีเมล และไม่มี ID ผู้ใช้กลาง: การเชื่อมต่อคือที่อยู่คิวแบบใช้ครั้งเดียวหนึ่งคู่ ตัวบรรทุกของคิว ลิงก์ Bluetooth และช่องทางบัญชีบริการ ล้วนเข้ารหัสปลายทางถึงปลายทางในไคลเอ็นต์โอเพนซอร์สตัวเดียวกัน พอร์ทัลนี้ไม่โหลดสคริปต์ ฟอนต์ หรือรูปภาพจากภายนอก ไม่ตั้งคุกกี้ และไม่มีการวิเคราะห์ข้อมูล มีเพียงการเลือกภาษาที่เก็บไว้บนเครื่องของคุณ",
    fi: "POPOPX ei sidota mitään puhelinnumeroon tai sähköpostiin, eikä globaalia käyttäjätunnusta ole: yhteys on pari kertakäyttöisiä jonosoitteita. Jonojen kuormat, Bluetooth-yhteys ja palvelutilien kanavat salataan päästä päähän samassa avoimen lähdekoodin asiakkaassa. Tämä portaali ei lataa kolmannen osapuolen skriptejä, fontteja kuvia, ei aseta evästeitä eikä tee analytiikkaa — vain kielivalintasi säilyy laitteellasi.",
    uk: "POPOPX нічого не прив’язує до номера телефона чи пошти й не має глобального ID користувача: з’єднання — це пара одноразових адрес черг. Вантажі черг, Bluetooth-канал і канали сервісних акаунтів наскрізно шифруються в тому самому клієнті з відкритим кодом. Цей портал не завантажує сторонніх скриптів, шрифтів чи зображень, не ставить cookie й не веде аналітики — лише вибір мови зберігається на вашому пристрої.",
    bg: "POPOPX не обвързва нищо с телефонен номер или имейл и няма глобален потребителски идентикатор: връзката е двойка еднократни адреси на опашки. Товарите на опашките, Bluetooth връзката и каналите на акаунтите за услуги се криптират край до край в един и същ клиент с отворен код. Този портал не зарежда външни скриптове, шрифтове или изображения, не поставя бисквитки и не прави анализ — само изборът на език остава на устройството ви.",
    tr: "POPOPX hiçbir şeyi telefon numarasına veya e-postaya bağlamaz ve küresel bir kullanıcı kimliği yoktur: bir bağlantı, tek kullanımlık iki kuyruk adresidir. Kuyruk yükleri, Bluetooth bağlantısı ve hizmet hesabı kanalları aynı açık kaynak istemcide uçtan uca şifrelenir. Bu portal üçüncü taraf betik, yazı tipi veya görüntü yüklemez, çerez koymaz ve analiz yürütmez — yalnızca dil tercihiniz aygıtınızda saklanır.",
    hu: "A POPOPX semmit nem köt telefonszámhoz vagy e-mail-címhez, és globális felhasználói azonosító sincs: egy kapcsolat egy pár egyszer használatos sor-cím. A sorok terhei, a Bluetooth-link és a szolgáltatási fiókok csatornai ugyanabban a nyílt forráskódú ügyfélben végpontok között titkosulnak. Ez a portál nem tölt be harmadik fél szkriptjét, betűtípusát vagy képét, nem helyez sütit, és nem végez elemzést — csak a nyelvválasztás marad az eszközön.",
  },
  ctaGet: {
    en: "Get the client & build it",
    ru: "Получить клиент и собрать",
    de: "Client holen und bauen",
    fr: "Obtenir le client et le compiler",
    it: "Ottieni il client e compilarlo",
    nl: "Client ophalen en bouwen",
    cs: "Získat klienta a sestavit ho",
    "zh-Hans": "获取客户端并自行构建",
    "zh-Hant": "取得用戶端並自行建置",
    es: "Consigue el cliente y compílalo",
    pl: "Pobierz klient i zbuduj go",
    ja: "クライアントを取得してビルドする",
    th: "รับไคลเอ็นต์และสร้างเอง",
    fi: "Hanki asiakas ja rakenna se",
    uk: "Отримати клієнт і зібрати його",
    bg: "Свалете клиента и го сглобете",
    tr: "İstemciyi edin ve derle",
    hu: "Szerezd meg az ügyfelet és fordítsd le",
  },
  ctaRepo: {
    en: "Open the source repository",
    ru: "Открыть репозиторий с кодом",
    de: "Quellcode-Repository öffnen",
    fr: "Ouvrir le dépôt du code source",
    it: "Apri il repository del codice sorgente",
    nl: "Broncode-repository openen",
    cs: "Otevřít repozitář se zdrojovým kódem",
    "zh-Hans": "打开源码仓库",
    "zh-Hant": "開啟原始碼倉庫",
    es: "Abrir el repositorio de código",
    pl: "Otwórz repozytorium kodu",
    ja: "ソースリポジトリを開く",
    th: "เปิดที่เก็บซอร์สโค้ด",
    fi: "Avaa lähdekoodin repositorio",
    uk: "Відкрити репозиторій із кодом",
    bg: "Отворете хранилището с изходен код",
    tr: "Kaynak deposunu aç",
    hu: "Forrástároló megnyitása",
  },
  ctaSecurity: {
    en: "Read the security model",
    ru: "Прочитать модель безопасности",
    de: "Sicherheitsmodell lesen",
    fr: "Lire le modèle de sécurité",
    it: "Leggi il modello di sicurezza",
    nl: "Beveiligingsmodel lezen",
    cs: "Přečíst model zabezpečení",
    "zh-Hans": "查看安全模型",
    "zh-Hant": "檢視安全模型",
    es: "Leer el modelo de seguridad",
    pl: "Przeczytaj model bezpieczeństwa",
    ja: "セキュリティモデルを読む",
    th: "อ่านโมเดลความปลอดภัย",
    fi: "Lue tietoturvamalli",
    uk: "Прочитати модель безпеки",
    bg: "Прочетете модела за сигурност",
    tr: "Güvenlik modelini oku",
    hu: "A biztonsági modell elolvasása",
  },
};

const BADGE_COPY: Record<
  "identityLabel" | "identityNote" | "e2eeLabel" | "e2eeNote" | "bleLabel" | "bleNote" | "ossLabel" | "ossNote",
  Localized<string>
> = {
  identityLabel: {
    en: "No global user ID",
    ru: "Нет глобального ID",
    de: "Keine globale Benutzer-ID",
    fr: "Aucun identifiant global",
    it: "Nessun ID globale",
    nl: "Geen globale gebruikers-ID",
    cs: "Žádné globální ID",
    "zh-Hans": "0 全局用户 ID",
    "zh-Hant": "0 全域使用者 ID",
    es: "Sin ID global de usuario",
    pl: "Brak globalnego ID",
    ja: "グローバル ID なし",
    th: "ไม่มี ID ผู้ใช้กลาง",
    fi: "Ei globaalia käyttäjätunnusta",
    uk: "Немає глобального ID",
    bg: "Няма глобален потребителски ID",
    tr: "Küresel kullanıcı kimliği yok",
    hu: "Nincs globális felhasználói azonosító",
  },
  identityNote: {
    en: "No phone number, no email, no global public key",
    ru: "Ни номера телефона, ни почты, ни глобального открытого ключа",
    de: "Keine Telefonnummer, keine E-Mail, kein globaler öffentlicher Schlüssel",
    fr: "Ni numéro de téléphone, ni e-mail, ni clé publique globale",
    it: "Nessun numero di telefono, email o chiave pubblica globale",
    nl: "Geen telefoonnummer, geen e-mail, geen globale openbare sleutel",
    cs: "Žádné telefonní číslo, e-mail ani globální veřejný klíč",
    "zh-Hans": "无手机号、无邮箱、无全局公钥",
    "zh-Hant": "無手機號、無電子信箱、無全域公開金鑰",
    es: "Sin teléfono, sin correo, sin clave pública global",
    pl: "Bez numeru telefonu, e-maila i globalnego klucza publicznego",
    ja: "電話番号もメールもグローバル公開鍵もなし",
    th: "ไม่มีเบอร์โทร อีเมล หรือกุญแจสาธารณะกลาง",
    fi: "Ei puhelinnumeroa, sähköpostia tai globaalia julkista avainta",
    uk: "Ні номера телефона, ні пошти, ні глобального відкритого ключа",
    bg: "Няма телефонен номер, имейл или глобален публичен ключ",
    tr: "Telefon numarası, e-posta veya küresel açık anahtar yok",
    hu: "Telefonszám, e-mail és globális publikus kulcs nélkül",
  },
  e2eeLabel: {
    en: "End-to-end encrypted",
    ru: "Сквозное шифрование",
    de: "Ende-zu-Ende verschlüsselt",
    fr: "Chiffré de bout en bout",
    it: "Crittografato end-to-end",
    nl: "End-to-end versleuteld",
    cs: "Koncové šifrováno",
    "zh-Hans": "端到端加密",
    "zh-Hant": "端到端加密",
    es: "Cifrado de extremo a extremo",
    pl: "Szyfrowanie end-to-end",
    ja: "エンドツーエンド暗号化",
    th: "เข้ารหัสปลายทางถึงปลายทาง",
    fi: "Päästä päähän salattu",
    uk: "Наскрізне шифрування",
    bg: "Криптиране край до край",
    tr: "Uçtan uca şifreli",
    hu: "Végpontok közötti titkosítás",
  },
  e2eeNote: {
    en: "Queue payload AES-256-GCM · Bluetooth link via Noise XX",
    ru: "Нагрузка очереди AES-256-GCM · Bluetooth по Noise XX",
    de: "Queue-Nutzdaten AES-256-GCM · Bluetooth über Noise XX",
    fr: "Charge de file AES-256-GCM · lien Bluetooth via Noise XX",
    it: "Carico della coda AES-256-GCM · Bluetooth tramite Noise XX",
    nl: "Wachtrijlading AES-256-GCM · Bluetooth via Noise XX",
    cs: "Zatížení fronty AES-256-GCM · Bluetooth přes Noise XX",
    "zh-Hans": "队列载荷 AES-256-GCM · 蓝牙链路走 Noise XX",
    "zh-Hant": "佇列負載 AES-256-GCM · 藍芽鏈路走 Noise XX",
    es: "Carga de cola AES-256-GCM · Bluetooth mediante Noise XX",
    pl: "Ładunek kolejki AES-256-GCM · Bluetooth przez Noise XX",
    ja: "キュー・ペイロード AES-256-GCM · Bluetooth は Noise XX",
    th: "ตัวบรรทุกคิว AES-256-GCM · Bluetooth ผ่าน Noise XX",
    fi: "Jonokuormat AES-256-GCM · Bluetooth Noise XX:llä",
    uk: "Вантаж черги AES-256-GCM · Bluetooth через Noise XX",
    bg: "Товар на опашка AES-256-GCM · Bluetooth през Noise XX",
    tr: "Kuyruk yükü AES-256-GCM · Bluetooth Noise XX ile",
    hu: "Sor-teher AES-256-GCM · Bluetooth Noise XX-on",
  },
  bleLabel: {
    en: "Offline Bluetooth link",
    ru: "Офлайн-канал Bluetooth",
    de: "Offline-Bluetooth-Verbindung",
    fr: "Lien Bluetooth hors ligne",
    it: "Collegamento Bluetooth offline",
    nl: "Offline Bluetooth-verbinding",
    cs: "Offline Bluetooth spojení",
    "zh-Hans": "蓝牙离线直连",
    "zh-Hant": "藍芽離線直連",
    es: "Enlace Bluetooth sin conexión",
    pl: "Łącze Bluetooth offline",
    ja: "オフラインの Bluetooth 接続",
    th: "ลิงก์ Bluetooth ออฟไลน์",
    fi: "Offline Bluetooth -yhteys",
    uk: "Офлайн-канал Bluetooth",
    bg: "Офлайн Bluetooth връзка",
    tr: "Çevrimdışı Bluetooth bağlantısı",
    hu: "Offline Bluetooth-link",
  },
  bleNote: {
    en: "Dual-role CoreBluetooth GATT, peer to peer",
    ru: "Двухролевая GATT на CoreBluetooth, напрямую",
    de: "Dual-Role CoreBluetooth-GATT, Peer-to-Peer",
    fr: "GATT CoreBluetooth double rôle, de pair à pair",
    it: "GATT CoreBluetooth a doppio ruolo, peer-to-peer",
    nl: "Dual-role CoreBluetooth GATT, peer-to-peer",
    cs: "GATT na CoreBluetooth s dvěma rolemi, mezi zařízeními",
    "zh-Hans": "双角色 CoreBluetooth GATT 点对点",
    "zh-Hant": "雙角色 CoreBluetooth GATT 點對點",
    es: "GATT de doble rol en CoreBluetooth, entre iguales",
    pl: "GATT CoreBluetooth w podwójnej roli, peer to peer",
    ja: "デュアルロールの CoreBluetooth GATT で点对点",
    th: "GATT แบบ dual-role บน CoreBluetooth ระหว่างเครื่องต่อเครื่อง",
    fi: "Kaksiroolinen CoreBluetooth GATT suoraan laitteelta toiselle",
    uk: "Дворольова GATT на CoreBluetooth, безпосередньо",
    bg: "Двурежимна CoreBluetooth GATT, машина до машина",
    tr: "Çift rollü CoreBluetooth GATT, uçtan uca",
    hu: "Kétszerepos CoreBluetooth GATT, gépről gépre",
  },
  ossLabel: {
    en: "AGPL-3.0 source",
    ru: "Код под AGPL-3.0",
    de: "Quellcode unter AGPL-3.0",
    fr: "Code sous AGPL-3.0",
    it: "Codice sotto AGPL-3.0",
    nl: "Broncode onder AGPL-3.0",
    cs: "Kód pod AGPL-3.0",
    "zh-Hans": "AGPL-3.0 开源",
    "zh-Hant": "AGPL-3.0 開放原始碼",
    es: "Código bajo AGPL-3.0",
    pl: "Kod na AGPL-3.0",
    ja: "AGPL-3.0 のソース",
    th: "ซอร์สใต้ AGPL-3.0",
    fi: "Lähdekoodi AGPL-3.0",
    uk: "Код під AGPL-3.0",
    bg: "Код под AGPL-3.0",
    tr: "AGPL-3.0 kaynak kodu",
    hu: "AGPL-3.0 forráskód",
  },
  ossNote: {
    en: "The client repository is public; LICENSE is the full AGPL-3.0 text",
    ru: "Репозиторий клиента открыт; LICENSE — полный текст AGPL-3.0",
    de: "Das Client-Repository ist öffentlich; LICENSE ist der vollständige AGPL-3.0-Text",
    fr: "Le dépôt du client est public ; LICENSE est le texte intégral AGPL-3.0",
    it: "Il repository del client è pubblico; LICENSE è il testo integrale AGPL-3.0",
    nl: "De client-repository is openbaar; LICENSE is de volledige AGPL-3.0-tekst",
    cs: "Repozitář klienta je veřejný; LICENSE je plný text AGPL-3.0",
    "zh-Hans": "客户端仓库公开，LICENSE 为 AGPL-3.0 全文",
    "zh-Hant": "用戶端倉庫公開，LICENSE 為 AGPL-3.0 全文",
    es: "El repositorio del cliente es público; LICENSE es el texto completo de AGPL-3.0",
    pl: "Repozytorium klienta jest publiczne; LICENSE to pełny tekst AGPL-3.0",
    ja: "クライアントのリポジトリは公開、LICENSE は AGPL-3.0 全文",
    th: "ที่เก็บไคลเอ็นต์เป็นสาธารณะ และ LICENSE คือข้อความ AGPL-3.0 เต็มฉบับ",
    fi: "Asiakkaan repositorio on julkinen; LICENSE on täysi AGPL-3.0 -teksti",
    uk: "Репозиторій клієнта відкритий; LICENSE — повний текст AGPL-3.0",
    bg: "Хранилището на клиента е публично; LICENSE е пълният текст на AGPL-3.0",
    tr: "İstemci deposu herkese açık; LICENSE tam AGPL-3.0 metnidir",
    hu: "Az ügyfél tárolója nyilvános; a LICENSE az AGPL-3.0 teljes szövege",
  },
};

const TAB_LABELS: Record<TabId, Localized<string>> = {
  messages: {
    en: "Messages",
    ru: "Сообщения",
    de: "Nachrichten",
    fr: "Messages",
    it: "Messaggi",
    nl: "Berichten",
    cs: "Zprávy",
    "zh-Hans": "消息",
    "zh-Hant": "訊息",
    es: "Mensajes",
    pl: "Wiadomości",
    ja: "メッセージ",
    th: "ข้อความ",
    fi: "Viestit",
    uk: "Повідомлення",
    bg: "Съобщения",
    tr: "Mesajlar",
    hu: "Üzenetek",
  },
  contacts: {
    en: "Contacts",
    ru: "Контакты",
    de: "Kontakte",
    fr: "Contacts",
    it: "Contatti",
    nl: "Contacten",
    cs: "Kontakty",
    "zh-Hans": "联系人",
    "zh-Hant": "聯絡人",
    es: "Contactos",
    pl: "Kontakty",
    ja: "連絡先",
    th: "ผู้ติดต่อ",
    fi: "Yhteystiedot",
    uk: "Контакти",
    bg: "Контакти",
    tr: "Kişiler",
    hu: "Névjegyek",
  },
  cabin: {
    en: "Cabin",
    ru: "Кабина",
    de: "Kabine",
    fr: "Cabine",
    it: "Cabina",
    nl: "Cabine",
    cs: "Kabina",
    "zh-Hans": "厢语",
    "zh-Hant": "廂語",
    es: "Cabina",
    pl: "Kabina",
    ja: "キャビン",
    th: "ห้องส่วนตัว",
    fi: "Hytti",
    uk: "Кабіна",
    bg: "Кабина",
    tr: "Kabin",
    hu: "Kabin",
  },
  discover: {
    en: "Discover",
    ru: "Поиск",
    de: "Entdecken",
    fr: "Découvrir",
    it: "Scopri",
    nl: "Ontdekken",
    cs: "Objevovat",
    "zh-Hans": "发现",
    "zh-Hant": "發現",
    es: "Descubrir",
    pl: "Odkrywaj",
    ja: "見つける",
    th: "ค้นหา",
    fi: "Löydä",
    uk: "Знайти",
    bg: "Открий",
    tr: "Keşfet",
    hu: "Felfedezés",
  },
  me: {
    en: "Me",
    ru: "Я",
    de: "Ich",
    fr: "Moi",
    it: "Io",
    nl: "Ik",
    cs: "Já",
    "zh-Hans": "我",
    "zh-Hant": "我",
    es: "Yo",
    pl: "Ja",
    ja: "自分",
    th: "ฉัน",
    fi: "Minä",
    uk: "Я",
    bg: "Аз",
    tr: "Ben",
    hu: "Én",
  },
};

const TAB_NOTES: Record<TabId, Localized<string>> = {
  messages: {
    en: "A connection is a pair of one-time queue addresses",
    ru: "Соединение — пара одноразовых адресов очередей",
    de: "Eine Verbindung ist ein Paar einmaliger Queue-Adressen",
    fr: "Une connexion est une paire d’adresses de file à usage unique",
    it: "Una connessione è una coppia di indirizzi di coda monouso",
    nl: "Een verbinding is een paar eenmalige wachtrijadressen",
    cs: "Spojení je pár jednorazových adres front",
    "zh-Hans": "一条连接只是一对一次性队列地址",
    "zh-Hant": "一條連線只是一對一次性佇列位址",
    es: "Una conexión es un par de direcciones de cola de un solo uso",
    pl: "Połączenie to para jednorazowych adresów kolejek",
    ja: "接続は使い捨てのキューアドレスの一対",
    th: "การเชื่อมต่อก็คือที่อยู่คิวแบบใช้ครั้งเดียวหนึ่งคู่",
    fi: "Yhteys on pari kertakäyttöisiä jonosoitteita",
    uk: "З’єднання — це пара одноразових адрес черг",
    bg: "Връзката е двойка еднократни адреси на опашки",
    tr: "Bir bağlantı, tek kullanımlık iki kuyruk adresidir",
    hu: "A kapcsolat egy pár egyszer használatos sor-cím",
  },
  contacts: {
    en: "Invitation links and one-time addresses are the only way in",
    ru: "Пригласительные ссылки и одноразовые адреса — единственный путь",
    de: "Einladungslinks und einmalige Adressen sind der einzige Weg",
    fr: "Liens d’invitation et adresses à usage unique sont la seule entrée",
    it: "Link di invito e indirizzi monouso sono l’unica porta d’ingresso",
    nl: "Uitnodigingslinks en eenmalige adressen zijn de enige ingang",
    cs: "Pozvací odkazy a jednorazové adresy jsou jediný vstup",
    "zh-Hans": "邀请链接与一次性地址是唯一入口",
    "zh-Hant": "邀請連結與一次性位址是唯一入口",
    es: "Los enlaces de invitación y las direcciones de un solo uso son la única entrada",
    pl: "Zaproszenia i jednorazowe adresy są jedynym wejściem",
    ja: "招待リンクと使い捨てアドレスだけが入り口",
    th: "ลิงก์คำเชิญและที่อยู่ใช้ครั้งเดียวคือทางเข้าเดียว",
    fi: "Kutsulinkit ja kertakäyttöiset osoitteet ainoa sisäänpääsy",
    uk: "Запрос-посилання й одноразові адреси — єдиний вхід",
    bg: "Поканите и еднократните адреси са единственият вход",
    tr: "Davet bağlantıları ve tek kullanımlık adresler tek giriş",
    hu: "Meghívó linkek és egyszeri címek az egyetlen bejárat",
  },
  cabin: {
    en: "Offline groups with a per-epoch key and a signed roster",
    ru: "Офлайн-группы: ключ на эпоху и подписанный список",
    de: "Offline-Gruppen mit epochenweisem Schlüssel und signierter Liste",
    fr: "Groupes hors ligne avec clé par époque et liste signée",
    it: "Gruppi offline con chiave per epoca e roster firmato",
    nl: "Offline groepen met een epoch-sleutel en een ondertekende lijst",
    cs: "Offline skupiny s klíčem za epochu a podepsaným seznamem",
    "zh-Hans": "离线群组：每个轮次一把密钥，花名册带签名",
    "zh-Hant": "離線群組：每個輪次一把金鑰，名冊帶簽章",
    es: "Grupos sin conexión con clave por época y roster firmado",
    pl: "Grupy offline z kluczem na epokę i podpisaną listą",
    ja: "オフライングループはエポック毎の鍵と署名付き名簿",
    th: "กลุ่มออฟไลน์มีกุญแจต่อ epoch และรายชื่อที่ลงนาม",
    fi: "Offline-ryhmät: avain jaksoa kohden ja allekirjoitettu luettelo",
    uk: "Офлайн-групи: ключ на епоху та підписаний список",
    bg: "Офлайн групи с ключ за епоха и подписан списък",
    tr: "Çevrimdışı gruplar: dönem başına anahtar ve imzalı liste",
    hu: "Offline csoportok epochonkénti kulccsal és aláírt névsorral",
  },
  discover: {
    en: "A signed directory, plus service accounts and channels",
    ru: "Подписанный каталог, сервисные аккаунты и каналы",
    de: "Signiertes Verzeichnis, plus Service-Konten und Kanäle",
    fr: "Annuaire signé, comptes de service et canaux",
    it: "Directory firmata, account di servizio e canali",
    nl: "Ondertekende map, plus serviceaccounts en kanalen",
    cs: "Podepsaný adresář, servisní účty a kanály",
    "zh-Hans": "带签名的目录，以及服务号与零知识频道",
    "zh-Hant": "帶簽章的目錄，以及服務號與零知識頻道",
    es: "Un directorio firmado, cuentas de servicio y canales",
    pl: "Podpisany katalog, konta usługowe i kanały",
    ja: "署名付きカタログとサービスアカウント / チャンネル",
    th: "ไดเรกทอรีที่ลงนาม พร้อมบัญชีบริการและช่องทาง",
    fi: "Allekirjoitettu hakemisto, lisäksi palvelutilit ja kanavat",
    uk: "Підписаний каталог, сервісні акаунти та канали",
    bg: "Подписан указател, акаунти за услуги и канали",
    tr: "İmzalı dizin, ayrıca hizmet hesapları ve kanallar",
    hu: "Aláírt könyvtár, valamint szolgáltatási fiókok és csatornák",
  },
  me: {
    en: "Emergency wipe, duress password and decoy profile",
    ru: "Экстренное стирание, стресс-пароль и обманка",
    de: "Notfall-Wipe, Erpressungs-Passwort und Tarnprofil",
    fr: "Effacement d’urgence, mot de contrainte et profil leurre",
    it: "Cancellazione d’emergenza, password di costrizione e profilo esca",
    nl: "Noodgeping, dwangwachtwoord en lokprofiel",
    cs: "Tísňové vymazání, nátlakové heslo a lákadlový profil",
    "zh-Hans": "紧急擦除、胁迫密码与诱饵配置",
    "zh-Hant": "緊急擦除、脅迫密碼與誘餌設定",
    es: "Borrado de emergencia, contraseña de coacción y perfil señuelo",
    pl: "Awaryjne wymazanie, hasło przymusu i profil-wabik",
    ja: "緊急消去・強制時パスワード・偽プロファイル",
    th: "ลบฉุกเฉิน รหัสผ่านแรงกดดัน และโปรไฟล์ล่อ",
    fi: "Hätäpyyhkäisy, pakotussana ja harhaanjohtava profiili",
    uk: "Термінове стирання, пароль примусу та хибний профіль",
    bg: "Аварийно изтриване, принудителна парола и профил примамка",
    tr: "Acil silme, baskı parolası ve sahte profil",
    hu: "Vésztörlés, kényszer-jelszó és csali profil",
  },
};

/**
 * Locale-free on purpose: each string is a protocol identifier, a type name or
 * a build constant quoted from the client source, so it is the same text in all
 * 18 languages and no translation can change its meaning.
 */
const TAB_TECH: Record<TabId, string> = {
  messages: "AES-256-GCM payload · ratchetSync",
  contacts: "one-time UserContactLink · Keychain",
  cabin: "ChaCha20-Poly1305 per epoch · Ed25519 roster",
  discover: "popopx.channel.enc.v1 · Ed25519 TOFU",
  me: "6-step wipe · PBKDF2-HMAC-SHA256 ×100 000",
};

const PHONE_COPY: Record<"frameNote" | "releaseNote" | "tablistLabel" | "badgeRowLabel", Localized<string>> = {
  frameNote: {
    en: "Illustration, not a screenshot — the five tab names and their order are taken from the client’s MainTabView.",
    ru: "Иллюстрация, не снимок экрана — пять имён вкладок и их порядок взяты из MainTabView клиента.",
    de: "Illustration, kein Screenshot — die fünf Tab-Namen und ihre Reihenfolge stammen aus MainTabView des Clients.",
    fr: "Illustration, et non une capture — les cinq noms d’onglets et leur ordre viennent du MainTabView du client.",
    it: "Illustrazione, non uno screenshot — i cinque nomi delle schede e il loro ordine vengono dal MainTabView del client.",
    nl: "Illustratie, geen screenshot — de vijf tabnamen en hun volgorde komen uit MainTabView van de client.",
    cs: "Ilustrace, nikoli snímek — pět názvů karet a jejich pořadí vychází z MainTabView klienta.",
    "zh-Hans": "这是示意界面，不是截图——五个标签的名称与顺序取自客户端的 MainTabView。",
    "zh-Hant": "這是示意介面，不是擷取畫面——五個標籤的名稱與順序取自用戶端的 MainTabView。",
    es: "Ilustración, no una captura — los cinco nombres de pestañas y su orden salen del MainTabView del cliente.",
    pl: "Ilustracja, nie zrzut — pięć nazw kartek i ich kolejność pochodzi z MainTabView klienta.",
    ja: "イメージ図でありスクリーンショットではありません — 5 つのタブ名と並びはクライアントの MainTabView から。",
    th: "เป็นภาพประกอบ ไม่ใช่ภาพหน้าจอ — ชื่อห้าแท็บและลำดับมาจาก MainTabView ของไคลเอ็นต์",
    fi: "Kuvitus, ei näyttökuva — viiden välilehden nimet ja järjestys tulevat asiakkaan MainTabView’stä.",
    uk: "Ілюстрація, не знімок — п’ять назв вкладок та їх порядок узято з MainTabView клієнта.",
    bg: "Илюстрация, не екранна снимка — петте имена на раздели и редът им са от MainTabView на клиента.",
    tr: "Bu bir çizim, ekran görüntüsü değil — beş sekme adı ve sırası istemcinin MainTabView’inden.",
    hu: "Illusztráció, nem képernyőkép — az öt lap neve és sorrendje az ügyfél MainTabView-jéből.",
  },
  releaseNote: {
    en: "No App Store or TestFlight link is shown: the store record does not resolve yet, so the QR code and every link point back to this portal.",
    ru: "Ссылок на App Store и TestFlight нет: запись в магазине ещё не разрешается, поэтому QR-код и все ссылки ведут на этот портал.",
    de: "Kein App-Store- oder TestFlight-Link: Der Storeeintrag löst noch nicht auf, deshalb zeigen QR-Code und alle Links auf dieses Portal zurück.",
    fr: "Aucun lien App Store ou TestFlight : la fiche de la boutique ne se résout pas encore, donc le QR code et tous les liens reviennent à ce portail.",
    it: "Nessun link App Store o TestFlight: la scheda dello store non si risolve ancora, quindi QR code e link puntano a questo portale.",
    nl: "Geen App Store- of TestFlight-link: de winkelrecord resolveert nog niet, dus de QR-code en elke link wijzen terug naar deze portal.",
    cs: "Žádný odkaz na App Store ani TestFlight: záznam v obchodě se zatím neresolvuje, proto QR i všechny odkazy vedou zpět na tento portál.",
    "zh-Hans": "这里不显示任何 App Store 或 TestFlight 链接：商店记录尚不能解析，所以二维码与所有链接都指回本站。",
    "zh-Hant": "這裡不顯示任何 App Store 或 TestFlight 連結：商店記錄尚無法解析，所以QR 碼與所有連結都指回本站。",
    es: "No se muestra ningún enlace de App Store o TestFlight: el registro de la tienda aún no resuelve, así que el código QR y todos los enlaces vuelven a este portal.",
    pl: "Bez linku App Store ani TestFlight: wpis w sklepie jeszcze się nie rozwiązuje, więc kod QR i wszystkie linki wracają do tego portalu.",
    ja: "App Store や TestFlight のリンクは表示しません: ストア記録はまだ解決できず、QR も全てのリンクも本 portal に戻ります。",
    th: "ไม่แสดงลิงก์ App Store หรือ TestFlight: รายการในสโอร์ยังแยกไม่ออก ดังนั้นรหัส QR และทุกลิงก์จึงชี้กลับพอร์ทัลนี้",
    fi: "App Store- tai TestFlight -linkkiä ei näytetä: kaupan tietue ei vielä ratkea, joten QR ja kaikki linkit osoittavat takaisin tälle portalille.",
    uk: "Жодного посилання на App Store чи TestFlight: запис у магазині ще не розв’язується, тому QR і всі посилання ведуть назад на цей портал.",
    bg: "Не се показва връзка към App Store или TestFlight: записът в магазина все още не се резолви, затова QR кодът и всички връзки сочат обратно към този портал.",
    tr: "App Store veya TestFlight bağlantısı gösterilmez: mağaza kaydı henüz çözümlenmiyor, bu yüzden QR kodu ve tüm bağlantılar bu portala geri döner.",
    hu: "Nincs App Store vagy TestFlight link: az áruház-bejegyzés még nem oldódik fel, ezért a QR-kód és minden link vissza mutat erre a portálra.",
  },
  tablistLabel: {
    en: "Client tab bar preview",
    ru: "Предпросмотр панели вкладок клиента",
    de: "Vorschau der Client-Tab-Leiste",
    fr: "Aperçu de la barre d’onglets du client",
    it: "Anteprima della barra delle schede del client",
    nl: "Voorbeeld van de tabbalk van de client",
    cs: "Náhled panelu karet klienta",
    "zh-Hans": "客户端标签栏预览",
    "zh-Hant": "用戶端標籤列預覽",
    es: "Vista previa de la barra de pestañas del cliente",
    pl: "Podgląd paska kart klienta",
    ja: "クライアントのタブバーのプレビュー",
    th: "ตัวอย่างแถบแท็บของไคลเอ็นต์",
    fi: "Asiakkaan välilehtipalkin esikatselu",
    uk: "Попередній перегляд панелі вкладок клієнта",
    bg: "Преглед на лентата с раздели на клиента",
    tr: "İstemci sekme çubuğu önizlemesi",
    hu: "Az ügyfél lapsáv-jelenete",
  },
  badgeRowLabel: {
    en: "Four properties of the client",
    ru: "Четыре свойства клиента",
    de: "Vier Eigenschaften des Clients",
    fr: "Quatre propriétés du client",
    it: "Quattro proprietà del client",
    nl: "Vier eigenschappen van de client",
    cs: "Čtyři vlastnosti klienta",
    "zh-Hans": "客户端的四项事实",
    "zh-Hant": "用戶端的四項事實",
    es: "Cuatro propiedades del cliente",
    pl: "Cztery właściwości klienta",
    ja: "クライアントの四つの特徴",
    th: "สี่คุณสมบัติของไคลเอ็นต์",
    fi: "Neljä asiakkaan ominaisuutta",
    uk: "Чотири властивості клієнта",
    bg: "Четири свойства на клиента",
    tr: "İstemcinin dört özelliği",
    hu: "Az ügyfél négy tulajdonsága",
  },
};

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft/70";

function PhoneTabIcon({ tab }: { tab: TabId }): ReactElement {
  const paths: Record<TabId, string> = {
    messages: "M4 6.5h16M4 12h11M4 17.5h7",
    contacts: "M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 20a7 7 0 0 1 14 0",
    cabin: "M4 9h16M4 9l8-5 8 5M6 9v10h12V9",
    discover: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM14.8 9.2l-2 5.6-5.6 2 2-5.6 5.6-2z",
    me: "M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM4.5 20a7.5 7.5 0 0 1 15 0",
  };
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
    >
      <path d={paths[tab]} />
    </svg>
  );
}

export function HeroSection(): ReactElement {
  const [tab, setTab] = useState<TabId>("messages");
  const { locale } = useLocale();

  const eyebrow = useCopy(HERO_COPY.eyebrow);
  const title = useCopy(HERO_COPY.title);
  const subtitle = useCopy(HERO_COPY.subtitle);
  const ctaGet = useCopy(HERO_COPY.ctaGet);
  const ctaRepo = useCopy(HERO_COPY.ctaRepo);
  const ctaSecurity = useCopy(HERO_COPY.ctaSecurity);

  const badgeRowLabel = useCopy(PHONE_COPY.badgeRowLabel);
  const tablistLabel = useCopy(PHONE_COPY.tablistLabel);
  const frameNote = useCopy(PHONE_COPY.frameNote);
  const releaseNote = useCopy(PHONE_COPY.releaseNote);

  const identityLabel = useCopy(BADGE_COPY.identityLabel);
  const identityNote = useCopy(BADGE_COPY.identityNote);
  const e2eeLabel = useCopy(BADGE_COPY.e2eeLabel);
  const e2eeNote = useCopy(BADGE_COPY.e2eeNote);
  const bleLabel = useCopy(BADGE_COPY.bleLabel);
  const bleNote = useCopy(BADGE_COPY.bleNote);
  const ossLabel = useCopy(BADGE_COPY.ossLabel);
  const ossNote = useCopy(BADGE_COPY.ossNote);

  const badges = [
    { key: "identity", label: identityLabel, note: identityNote, tone: "brand" as const },
    { key: "e2ee", label: e2eeLabel, note: e2eeNote, tone: "mesh" as const },
    { key: "ble", label: bleLabel, note: bleNote, tone: "brand" as const },
    { key: "oss", label: ossLabel, note: ossNote, tone: "mesh" as const },
  ];

  return (
    <section id="hero" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-halo absolute -left-24 -top-32 h-[520px] w-[520px]" />
        <div className="bg-mesh-halo absolute -right-20 top-40 h-[460px] w-[460px]" />
      </div>

      <div className="section-wrap grid grid-cols-[minmax(0,1fr)] gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:pb-24 lg:pt-20">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-[22ch] text-[clamp(2.15rem,5vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-balance">
            {title}
          </h1>
          <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.75] text-mute">{subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Link
              href="/download/"
              prefetch={false}
              className={`btn-primary ${FOCUS}`}
            >
              {ctaGet}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </Link>
            <a
              href={IOS_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-ghost ${FOCUS}`}
            >
              {ctaRepo}
            </a>
            <Link href="/security/" prefetch={false} className={`btn-mesh ${FOCUS}`}>
              {ctaSecurity}
            </Link>
          </div>

          <dl aria-label={badgeRowLabel} className="mt-10 grid gap-2.5 sm:grid-cols-2">
            {badges.map((badge) => (
              <div
                key={badge.key}
                className="glass glass-inset flex items-start gap-3 px-3.5 py-3"
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    badge.tone === "mesh" ? "bg-mesh" : "bg-brand-soft"
                  }`}
                  aria-hidden
                />
                <div className="min-w-0">
                  <dt className="text-[13.5px] font-semibold text-white">{badge.label}</dt>
                  <dd className="mt-1 text-[12px] leading-[1.6] text-faint">{badge.note}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="glass relative w-[min(88vw,326px)] rounded-[46px] p-3 shadow-[0_40px_120px_-40px_rgba(110,63,243,0.55)]">
            <div className="relative overflow-hidden rounded-[36px] border border-hair bg-ink-700">
              <div className="flex h-9 items-center justify-center" aria-hidden>
                <span className="h-[22px] w-[92px] rounded-full bg-ink" />
              </div>

              <div
                role="tabpanel"
                id="hero-panel"
                tabIndex={0}
                aria-labelledby={`hero-tab-${tab}`}
                className={`min-h-[320px] px-4 pb-4 pt-1 ${FOCUS}`}
              >
                <p className="eyebrow">{pick(TAB_LABELS[tab], locale)}</p>
                <p className="mt-3 text-[14px] leading-[1.6] text-white">
                  {pick(TAB_NOTES[tab], locale)}
                </p>
                <p className="code-surface mt-4 block break-words px-2.5 py-2 font-mono text-[11px] leading-[1.6] text-brand-soft">
                  {TAB_TECH[tab]}
                </p>
                <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-1.5">
                  {TABS.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-[12.5px] ${
                        item === tab
                          ? "border-brand/50 bg-brand/15 text-white"
                          : "border-transparent bg-white/[0.02] text-faint"
                      }`}
                    >
                      <PhoneTabIcon tab={item} />
                      <span className="min-w-0 flex-1 truncate">
                        {item === tab
                          ? pick(TAB_NOTES[item], locale)
                          : pick(TAB_LABELS[item], locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                role="tablist"
                aria-label={tablistLabel}
                className="grid grid-cols-5 gap-1 border-t border-hair bg-ink-800/80 px-1.5 py-2"
              >
                {TABS.map((item) => {
                  const active = item === tab;
                  return (
                    <button
                      key={item}
                      role="tab"
                      type="button"
                      id={`hero-tab-${item}`}
                      aria-selected={active}
                      aria-controls="hero-panel"
                      onClick={() => setTab(item)}
                      className={`flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] leading-none transition-colors duration-150 ${FOCUS} ${
                        active ? "bg-white/[0.06] text-white" : "text-faint hover:text-mute"
                      }`}
                    >
                      <PhoneTabIcon tab={item} />
                      <span className="max-w-full truncate">{pick(TAB_LABELS[item], locale)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="max-w-[38ch] text-center text-[11.5px] leading-[1.7] text-faint">{frameNote}</p>

          <a
            href={SITE_URL}
            className="chip text-faint hover:text-mute"
            title={releaseNote}
          >
            popopx.chat
          </a>
          <p className="max-w-[46ch] text-center text-[11.5px] leading-[1.7] text-faint">
            {releaseNote}
          </p>
        </div>
      </div>
    </section>
  );
}

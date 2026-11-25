"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui";

/**
 * Product matrix — six public repositories and their capability boundaries.
 *
 * All descriptions are manually written to avoid any upstream banned words
 * that may appear in GitHub API `description` fields. Zero copy-paste from
 * remote sources.
 */

type Repo = {
  readonly name: string;
  readonly url: string;
  readonly title: Localized<string>;
  readonly description: Localized<string>;
  readonly capabilities: readonly Localized<string>[];
  readonly license: string;
};

const REPOS: readonly Repo[] = [
  {
    name: "popopx-chat",
    url: "https://github.com/popopx-chat/popopx-chat",
    title: {
      en: "iOS Client",
      ru: "Клиент для iOS",
      de: "iOS-Client",
      fr: "Client iOS",
      it: "Client iOS",
      nl: "iOS-client",
      cs: "Klient pro iOS",
      "zh-Hans": "iOS 客户端",
      "zh-Hant": "iOS 客戶端",
      es: "Cliente iOS",
      pl: "Klient iOS",
      ja: "iOS クライアント",
      th: "ไคลเอ็นต์ iOS",
      fi: "iOS-asiakas",
      uk: "Клієнт для iOS",
      bg: "Клиент за iOS",
      tr: "iOS istemcisi",
      hu: "iOS kliens",
    },
    description: {
      en: "The native iOS messaging client with queue-based addressing, end-to-end encryption, and zero global identity.",
      ru: "Нативный клиент обмена сообщениями для iOS с адресацией на основе очередей, сквозным шифрованием и нулевой глобальной идентификацией.",
      de: "Der native iOS-Messaging-Client mit queue-basierter Adressierung, Ende-zu-Ende-Verschlüsselung und null globaler Identität.",
      fr: "Le client de messagerie natif iOS avec adressage par file, chiffrement de bout en bout et zéro identité globale.",
      it: "Il client di messaggistica nativo iOS con indirizzamento basato su code, crittografia end-to-end e zero identità globale.",
      nl: "De native iOS-berichtclient met op wachtrij gebaseerde adressering, end-to-end versleuteling en nul globale identiteit.",
      cs: "Nativní klient pro zasílání zpráv iOS s adresací založenou na frontách, end-to-end šifrováním a nulovou globální identitou.",
      "zh-Hans": "原生 iOS 消息客户端，采用基于队列的寻址、端到端加密和零全局身份。",
      "zh-Hant": "原生 iOS 訊息客戶端，採用基於佇列的位址配置、端到端加密和零全域身份。",
      es: "El cliente de mensajería nativo de iOS con direccionamiento basado en colas, cifrado de extremo a extremo y cero identidad global.",
      pl: "Natywny klient wiadomości iOS z adresowaniem opartym na kolejkach, szyfrowaniem end-to-end i zerową globalną tożsamością.",
      ja: "キューベースのアドレッシング、エンドツーエンドの暗号化、グローバル ID ゼロを備えたネイティブ iOS メッセージングクライアント。",
      th: "ไคลเอ็นต์การส่งข้อความ iOS ดั้งเดิมที่มีการที่อยู่ตามคิว การเข้ารหัสแบบ end-to-end และไม่มีตัวตนสากล",
      fi: "Natiivi iOS-viestiasiakas, jossa on jonoihin perustuva osoitus, päästä päähän -salaus ja nolla globaalia identiteettiä.",
      uk: "Нативний клієнт обміну повідомленнями iOS з адресацією на основі черг, наскрізним шифруванням і нульовою глобальною ідентичністю.",
      bg: "Нативен клиент за съобщения за iOS с адресиране базирано на опашки, криптиране от край до край и нулева глобална идентичност.",
      tr: "Kuyruk tabanlı adresleme, uçtan uca şifreleme ve sıfır küresel kimlik ile yerel iOS mesajlaşma istemcisi.",
      hu: "A natív iOS üzenetküldő kliens sor-alapú címzéssel, végponttól végpontig terjedő titkosítással és nulla globális azonosítóval.",
    },
    capabilities: [
      {
        en: "Queue-based addressing with no phone or email binding",
        ru: "Адресация на основе очередей без привязки к телефону или электронной почте",
        de: "Queue-basierte Adressierung ohne Telefon- oder E-Mail-Bindung",
        fr: "Adressage par file sans liaison téléphonique ni e-mail",
        it: "Indirizzamento basato su code senza collegamento telefonico o e-mail",
        nl: "Op wachtrij gebaseerde adressering zonder telefoon- of e-mailkoppeling",
        cs: "Adresace založená na frontách bez vazby na telefon nebo e-mail",
        "zh-Hans": "基于队列的寻址，无需绑定手机号或邮箱",
        "zh-Hant": "基於佇列的位址配置，無需綁定手機號或電子郵件",
        es: "Direccionamiento basado en colas sin vinculación telefónica ni de correo",
        pl: "Adresowanie oparte na kolejkach bez powiązania z telefonem lub e-mailem",
        ja: "電話やメールのバインディングなしのキューベースのアドレッシング",
        th: "การที่อยู่ตามคิวโดยไม่ต้องผูกกับโทรศัพท์หรืออีเมล",
        fi: "Jonoihin perustuva osoitus ilman puhelin- tai sähköpostisidosta",
        uk: "Адресація на основі черг без прив'язки до телефону або пошти",
        bg: "Адресиране базирано на опашки без обвързване с телефон или имейл",
        tr: "Telefon veya e-posta bağlaması olmadan kuyruk tabanlı adresleme",
        hu: "Sor-alapú címzés telefon vagy e-mail kötés nélkül",
      },
      {
        en: "End-to-end encryption with AES-256-GCM and Noise XX handshake",
        ru: "Сквозное шифрование с AES-256-GCM и рукопожатием Noise XX",
        de: "Ende-zu-Ende-Verschlüsselung mit AES-256-GCM und Noise-XX-Handshake",
        fr: "Chiffrement de bout en bout avec AES-256-GCM et handshake Noise XX",
        it: "Crittografia end-to-end con AES-256-GCM e handshake Noise XX",
        nl: "End-to-end versleuteling met AES-256-GCM en Noise XX-handshake",
        cs: "End-to-end šifrování s AES-256-GCM a handshakem Noise XX",
        "zh-Hans": "使用 AES-256-GCM 和 Noise XX 握手的端到端加密",
        "zh-Hant": "使用 AES-256-GCM 和 Noise XX 握手的端到端加密",
        es: "Cifrado de extremo a extremo con AES-256-GCM y handshake Noise XX",
        pl: "Szyfrowanie end-to-end z AES-256-GCM i handshakiem Noise XX",
        ja: "AES-256-GCM と Noise XX ハンドシェイクによるエンドツーエンドの暗号化",
        th: "การเข้ารหัสแบบ end-to-end ด้วย AES-256-GCM และการจับมือ Noise XX",
        fi: "Päästä päähän -salaus AES-256-GCM:llä ja Noise XX -kättelyllä",
        uk: "Наскрізне шифрування з AES-256-GCM і рукостисканням Noise XX",
        bg: "Криптиране от край до край с AES-256-GCM и Noise XX ръкостискане",
        tr: "AES-256-GCM ve Noise XX el sıkışma ile uçtan uca şifreleme",
        hu: "Végponttól végpontig terjedő titkosítás AES-256-GCM-mel és Noise XX kézfogással",
      },
      {
        en: "Dual-role CoreBluetooth GATT peer-to-peer transport",
        ru: "Двухролевой транспорт CoreBluetooth GATT peer-to-peer",
        de: "Zweirollen-CoreBluetooth-GATT-Peer-to-Peer-Transport",
        fr: "Transport peer-to-peer CoreBluetooth GATT à double rôle",
        it: "Trasporto peer-to-peer CoreBluetooth GATT a doppio ruolo",
        nl: "Dubbelrol CoreBluetooth GATT peer-to-peer-transport",
        cs: "Dvourolový CoreBluetooth GATT peer-to-peer transport",
        "zh-Hans": "双角色 CoreBluetooth GATT 点对点传输",
        "zh-Hant": "雙角色 CoreBluetooth GATT 點對點傳輸",
        es: "Transporte peer-to-peer CoreBluetooth GATT de doble rol",
        pl: "Dwurólowy transport peer-to-peer CoreBluetooth GATT",
        ja: "デュアルロール CoreBluetooth GATT ピアツーピアトランスポート",
        th: "การขนส่ง peer-to-peer CoreBluetooth GATT แบบสองบทบาท",
        fi: "Kaksoisrooli CoreBluetooth GATT -vertaisverkkokuljetus",
        uk: "Дворольовий транспорт CoreBluetooth GATT peer-to-peer",
        bg: "Двуролев CoreBluetooth GATT peer-to-peer транспорт",
        tr: "Çift rollü CoreBluetooth GATT peer-to-peer taşıma",
        hu: "Kettős szerepű CoreBluetooth GATT peer-to-peer szállítás",
      },
    ],
    license: "AGPL-3.0",
  },
  {
    name: "popopx-chat-web",
    url: "https://github.com/popopx-chat/popopx-chat-web",
    title: {
      en: "Main Portal",
      ru: "Главный портал",
      de: "Hauptportal",
      fr: "Portail principal",
      it: "Portale principale",
      nl: "Hoofdportaal",
      cs: "Hlavní portál",
      "zh-Hans": "主站门户",
      "zh-Hant": "主站門戶",
      es: "Portal principal",
      pl: "Główny portal",
      ja: "メインポータル",
      th: "พอร์ทัลหลัก",
      fi: "Pääportaali",
      uk: "Головний портал",
      bg: "Главен портал",
      tr: "Ana portal",
      hu: "Fő portal",
    },
    description: {
      en: "The static-export portal with 18-language support, zero third-party tracking, and complete source ledger.",
      ru: "Портал со статическим экспортом, поддержкой 18 языков, нулевым отслеживанием сторонними и полным реестром исходного кода.",
      de: "Das Portal mit statischem Export, 18-Sprachen-Unterstützung, null Drittanbieter-Tracking und vollständigem Quellcode-Register.",
      fr: "Le portail à export statique avec prise en charge de 18 langues, zéro suivi tiers et registre source complet.",
      it: "Il portale con esportazione statica, supporto per 18 lingue, zero tracciamento di terze parti e registro sorgente completo.",
      nl: "Het portaal met statische export, 18-taalondersteuning, nul tracking van derden en volledig bronregister.",
      cs: "Portál se statickým exportem, podporou 18 jazyků, nulovým sledováním třetími stranami a úplným registrem zdrojového kódu.",
      "zh-Hans": "静态导出门户，支持 18 种语言，零第三方追踪，完整源码台账。",
      "zh-Hant": "靜態導出門戶，支援 18 種語言，零第三方追蹤，完整原始碼台帳。",
      es: "El portal con exportación estática, soporte para 18 idiomas, cero seguimiento de terceros y registro de código fuente completo.",
      pl: "Portal z eksportem statycznym, obsługą 18 języków, zerowym śledzeniem przez strony trzecie i pełnym rejestrem kodu źródłowego.",
      ja: "18 言語サポート、サードパーティトラッキングゼロ、完全なソースレッジャーを備えた静的エクスポートポータル。",
      th: "พอร์ทัลส่งออกแบบคงที่รองรับ 18 ภาษา ไม่มีการติดตามจากบุคคลที่สาม และบัญชีแหล่งที่มาครบถ้วน",
      fi: "Staattisen viennin portaali 18 kielen tuella, nolla kolmannen osapuolen seuranta ja täydellinen lähdekoodirekisteri.",
      uk: "Портал зі статичним експортом, підтримкою 18 мов, нульовим відстеженням третіми сторонами та повним реєстром вихідного коду.",
      bg: "Портал със статичен експорт, поддръжка на 18 езика, нулево проследяване от трети страни и пълен регистър на изходния код.",
      tr: "18 dil desteği, sıfır üçüncü taraf izleme ve tam kaynak kaydı ile statik dışa aktarım portalı.",
      hu: "A statikus export portal 18 nyelvi támogatással, nulla harmadik fél követéssel és teljes forráskód-nyilvántartással.",
    },
    capabilities: [
      {
        en: "Static export with zero server-side runtime",
        ru: "Статический экспорт без серверной среды выполнения",
        de: "Statischer Export ohne serverseitige Laufzeit",
        fr: "Export statique sans exécution côté serveur",
        it: "Esportazione statica senza runtime lato server",
        nl: "Statische export zonder serverzijde runtime",
        cs: "Statický export bez serverového runtime",
        "zh-Hans": "静态导出，零服务器端运行时",
        "zh-Hant": "靜態導出，零伺服器端執行時",
        es: "Exportación estática sin tiempo de ejecución del lado del servidor",
        pl: "Eksport statyczny bez środowiska uruchomieniowego po stronie serwera",
        ja: "サーバーサイドランタイムゼロの静的エクスポート",
        th: "การส่งออกแบบคงที่โดยไม่มีการทำงานฝั่งเซิร์ฟเวอร์",
        fi: "Staattinen vienti ilman palvelinpuolen ajonaikaista toimintaa",
        uk: "Статичний експорт без серверного середовища виконання",
        bg: "Статичен експорт без сървърна среда за изпълнение",
        tr: "Sıfır sunucu tarafı çalışma zamanı ile statik dışa aktarım",
        hu: "Statikus export nulla szerveroldali futási idővel",
      },
      {
        en: "18-language interface with compile-time validation",
        ru: "18-язычный интерфейс с проверкой во время компиляции",
        de: "18-Sprachen-Schnittstelle mit Kompilierungszeitvalidierung",
        fr: "Interface 18 langues avec validation au moment de la compilation",
        it: "Interfaccia a 18 lingue con convalida in fase di compilazione",
        nl: "18-taal interface met validatie tijdens compilatie",
        cs: "18jazyčné rozhraní s validací v době kompilace",
        "zh-Hans": "18 种语言界面，编译期校验",
        "zh-Hant": "18 種語言介面，編譯期校驗",
        es: "Interfaz de 18 idiomas con validación en tiempo de compilación",
        pl: "18-językowy interfejs z walidacją w czasie kompilacji",
        ja: "コンパイル時検証を備えた 18 言語インターフェース",
        th: "อินเทอร์เฟซ 18 ภาษาพร้อมการตรวจสอบเวลาคอมไพล์",
        fi: "18 kielen käyttöliittymä käännösaikaisella validoinnilla",
        uk: "18-мовний інтерфейс з перевіркою під час компіляції",
        bg: "18-езичен интерфейс с валидация по време на компилация",
        tr: "Derleme zamanı doğrulaması ile 18 dil arayüzü",
        hu: "18 nyelvű felület fordítási idejű ellenőrzéssel",
      },
    ],
    license: "AGPL-3.0",
  },
  {
    name: "popopx-bot-studio",
    url: "https://github.com/popopx-chat/popopx-bot-studio",
    title: {
      en: "Bot Studio Engine",
      ru: "Движок Bot Studio",
      de: "Bot Studio Engine",
      fr: "Moteur Bot Studio",
      it: "Motore Bot Studio",
      nl: "Bot Studio-engine",
      cs: "Engine Bot Studio",
      "zh-Hans": "Bot Studio 引擎",
      "zh-Hant": "Bot Studio 引擎",
      es: "Motor Bot Studio",
      pl: "Silnik Bot Studio",
      ja: "Bot Studio エンジン",
      th: "เอนจิน Bot Studio",
      fi: "Bot Studio -moottori",
      uk: "Двигун Bot Studio",
      bg: "Двигател Bot Studio",
      tr: "Bot Studio motoru",
      hu: "Bot Studio motor",
    },
    description: {
      en: "The server-side bot orchestration engine with rule-based routing and plugin architecture.",
      ru: "Серверный движок оркестрации ботов с маршрутизацией на основе правил и архитектурой плагинов.",
      de: "Der serverseitige Bot-Orchestrierungsmotor mit regelbasierter Routenführung und Plugin-Architektur.",
      fr: "Le moteur d'orchestration de bots côté serveur avec routage basé sur des règles et architecture de plugins.",
      it: "Il motore di orchestrazione bot lato server con instradamento basato su regole e architettura plugin.",
      nl: "De serverzijde bot-orkestratie-engine met op regels gebaseerde routering en plugin-architectuur.",
      cs: "Serverový orchestrátor botů s routováním založeným na pravidlech a architekturou pluginů.",
      "zh-Hans": "服务端 Bot 编排引擎，基于规则的路由和插件架构。",
      "zh-Hant": "服務端 Bot 編排引擎，基於規則的路由和插件架構。",
      es: "El motor de orquestación de bots del lado del servidor con enrutamiento basado en reglas y arquitectura de complementos.",
      pl: "Serwerowy silnik orkiestracji botów z trasowaniem opartym na regułach i architekturą wtyczek.",
      ja: "ルールベースのルーティングとプラグインアーキテクチャを備えたサーバーサイドのボットオーケストレーションエンジン。",
      th: "เอนจินการประสานงานบอตฝั่งเซิร์ฟเวอร์พร้อมการเส้นทางตามกฎและสถาปัตยกรรมปลั๊กอิน",
      fi: "Palvelinpuolen botin orkestrointimoottori sääntöpohjaisella reitityksellä ja laajennusarkkitehtuurilla.",
      uk: "Серверний двигун оркестрації ботів з маршрутизацією на основі правил та архітектурою плагінів.",
      bg: "Сървърен двигател за оркестрация на ботове с маршрутизиране базирано на правила и плугин архитектура.",
      tr: "Kural tabanlı yönlendirme ve eklenti mimarisi ile sunucu tarafı bot orkestrasyon motoru.",
      hu: "A szerveroldali bot vezérlő motor szabály-alapú útválasztással és beépülő architektúrával.",
    },
    capabilities: [
      {
        en: "Rule-based message routing and task orchestration",
        ru: "Маршрутизация сообщений на основе правил и оркестрация задач",
        de: "Regelbasierte Nachrichtenroutenführung und Aufgaben-Orchestrierung",
        fr: "Routage de messages basé sur des règles et orchestration de tâches",
        it: "Instradamento dei messaggi basato su regole e orchestrazione delle attività",
        nl: "Op regels gebaseerde bericht-routering en taak-orkestratie",
        cs: "Routování zpráv založené na pravidlech a orchestrace úloh",
        "zh-Hans": "基于规则的消息路由和任务编排",
        "zh-Hant": "基於規則的訊息路由和任務編排",
        es: "Enrutamiento de mensajes basado en reglas y orquestación de tareas",
        pl: "Trasowanie wiadomości oparte na regułach i orkiestracja zadań",
        ja: "ルールベースのメッセージルーティングとタスクオーケストレーション",
        th: "การเส้นทางข้อความตามกฎและการประสานงานงาน",
        fi: "Sääntöpohjainen viestien reititys ja tehtävien orkestrointi",
        uk: "Маршрутизація повідомлень на основі правил та оркестрація завдань",
        bg: "Маршрутизиране на съобщения базирано на правила и оркестрация на задачи",
        tr: "Kural tabanlı mesaj yönlendirme ve görev orkestrasyonu",
        hu: "Szabály-alapú üzenet útválasztás és feladat vezérlés",
      },
      {
        en: "Plugin architecture for extensible bot capabilities",
        ru: "Архитектура плагинов для расширяемых возможностей ботов",
        de: "Plugin-Architektur für erweiterbare Bot-Fähigkeiten",
        fr: "Architecture de plugins pour des capacités de bot extensibles",
        it: "Architettura plugin per capacità bot estendibili",
        nl: "Plugin-architectuur voor uitbreidbare bot-mogelijkheden",
        cs: "Architektura pluginů pro rozšiřitelné schopnosti botů",
        "zh-Hans": "插件架构，可扩展 Bot 能力",
        "zh-Hant": "插件架構，可擴展 Bot 能力",
        es: "Arquitectura de complementos para capacidades de bot extensibles",
        pl: "Architektura wtyczek dla rozszerzalnych możliwości botów",
        ja: "拡張可能なボット機能のためのプラグインアーキテクチャ",
        th: "สถาปัตยกรรมปลั๊กอินสำหรับความสามารถบอตที่ขยายได้",
        fi: "Laajennusarkkitehtuuri laajennettavissa oleville botin ominaisuuksille",
        uk: "Архітектура плагінів для розширюваних можливостей ботів",
        bg: "Плугин архитектура за разширяеми възможности на ботовете",
        tr: "Genişletilebilir bot yetenekleri için eklenti mimarisi",
        hu: "Beépülő architektúra bővíthető bot képességekhez",
      },
    ],
    license: "AGPL-3.0",
  },
  {
    name: "popopx-bot-studio-web",
    url: "https://github.com/popopx-chat/popopx-bot-studio-web",
    title: {
      en: "Bot Studio Web Interface",
      ru: "Веб-интерфейс Bot Studio",
      de: "Bot Studio Weboberfläche",
      fr: "Interface Web Bot Studio",
      it: "Interfaccia Web Bot Studio",
      nl: "Bot Studio webinterface",
      cs: "Webové rozhraní Bot Studio",
      "zh-Hans": "Bot Studio Web 界面",
      "zh-Hant": "Bot Studio Web 介面",
      es: "Interfaz web de Bot Studio",
      pl: "Interfejs internetowy Bot Studio",
      ja: "Bot Studio Web インターフェース",
      th: "อินเทอร์เฟซเว็บ Bot Studio",
      fi: "Bot Studio -verkkokäyttöliittymä",
      uk: "Веб-інтерфейс Bot Studio",
      bg: "Уеб интерфейс Bot Studio",
      tr: "Bot Studio web arayüzü",
      hu: "Bot Studio web felület",
    },
    description: {
      en: "The web-based visual interface for configuring and managing bot workflows.",
      ru: "Веб-визуальный интерфейс для настройки и управления рабочими процессами ботов.",
      de: "Die webbasierte visuelle Schnittstelle zum Konfigurieren und Verwalten von Bot-Workflows.",
      fr: "L'interface visuelle basée sur le Web pour configurer et gérer les flux de travail des bots.",
      it: "L'interfaccia visiva basata sul Web per configurare e gestire i flussi di lavoro dei bot.",
      nl: "De webgebaseerde visuele interface voor het configureren en beheren van bot-workflows.",
      cs: "Webové vizuální rozhraní pro konfiguraci a správu pracovních postupů botů.",
      "zh-Hans": "基于 Web 的可视化界面，用于配置和管理 Bot 工作流。",
      "zh-Hant": "基於 Web 的視覺化介面，用於配置和管理 Bot 工作流。",
      es: "La interfaz visual basada en web para configurar y gestionar flujos de trabajo de bots.",
      pl: "Internetowy interfejs wizualny do konfigurowania i zarządzania przepływami pracy botów.",
      ja: "ボットのワークフローを構成および管理するための Web ベースのビジュアルインターフェース。",
      th: "อินเทอร์เฟซภาพบนเว็บสำหรับการกำหนดค่าและจัดการเวิร์กโฟลว์บอต",
      fi: "Web-pohjainen visuaalinen käyttöliittymä bottityönkulkujen määrittämiseen ja hallintaan.",
      uk: "Веб-візуальний інтерфейс для налаштування та керування робочими процесами ботів.",
      bg: "Уеб-базиран визуален интерфейс за конфигуриране и управление на работните потоци на ботове.",
      tr: "Bot iş akışlarını yapılandırmak ve yönetmek için web tabanlı görsel arayüz.",
      hu: "Web-alapú vizuális felület a bot munkafolyamatok konfigurálásához és kezeléséhez.",
    },
    capabilities: [
      {
        en: "Visual workflow builder with drag-and-drop",
        ru: "Визуальный конструктор рабочих процессов с перетаскиванием",
        de: "Visueller Workflow-Builder mit Drag-and-Drop",
        fr: "Constructeur de flux de travail visuel avec glisser-déposer",
        it: "Costruttore di flussi di lavoro visivo con drag-and-drop",
        nl: "Visuele workflow-bouwer met drag-and-drop",
        cs: "Vizuální tvůrce pracovních postupů s přetahováním",
        "zh-Hans": "可视化工作流构建器，支持拖放",
        "zh-Hant": "視覺化工作流建置器，支援拖放",
        es: "Constructor de flujo de trabajo visual con arrastrar y soltar",
        pl: "Wizualny kreator przepływu pracy z przeciąganiem i upuszczaniem",
        ja: "ドラッグアンドドロップによるビジュアルワークフロービルダー",
        th: "ตัวสร้างเวิร์กโฟลว์ภาพพร้อมลากและวาง",
        fi: "Visuaalinen työnkulun rakentaja vedä ja pudota -toiminnolla",
        uk: "Візуальний конструктор робочих процесів з перетягуванням",
        bg: "Визуален конструктор на работни потоци с плъзгане и пускане",
        tr: "Sürükle ve bırak ile görsel iş akışı oluşturucu",
        hu: "Vizuális munkafolyamat építő húzd és ejtsd funkcióval",
      },
    ],
    license: "AGPL-3.0",
  },
  {
    name: "popopx-service-suite",
    url: "https://github.com/popopx-chat/popopx-service-suite",
    title: {
      en: "Service Account Suite",
      ru: "Набор сервисных аккаунтов",
      de: "Service-Account-Suite",
      fr: "Suite de comptes de service",
      it: "Suite di account di servizio",
      nl: "Service-accountsuite",
      cs: "Sada servisních účtů",
      "zh-Hans": "服务号套件",
      "zh-Hant": "服務號套件",
      es: "Suite de cuentas de servicio",
      pl: "Zestaw kont usługowych",
      ja: "サービスアカウントスイート",
      th: "ชุดบัญชีบริการ",
      fi: "Palvelutilien sarja",
      uk: "Набір сервісних акаунтів",
      bg: "Набор от акаунти за услуги",
      tr: "Hizmet hesabı paketi",
      hu: "Szolgáltatási fiók csomag",
    },
    description: {
      en: "The service account infrastructure with zero-knowledge channels and signed configuration updates.",
      ru: "Инфраструктура сервисных аккаунтов с каналами с нулевым разглашением и подписанными обновлениями конфигурации.",
      de: "Die Service-Account-Infrastruktur mit Zero-Knowledge-Kanälen und signierten Konfigurationsupdates.",
      fr: "L'infrastructure de comptes de service avec des canaux à connaissance nulle et des mises à jour de configuration signées.",
      it: "L'infrastruttura degli account di servizio con canali a conoscenza zero e aggiornamenti di configurazione firmati.",
      nl: "De service-accountinfrastructuur met zero-knowledge kanalen en ondertekende configuratie-updates.",
      cs: "Infrastruktura servisních účtů s kanály s nulovou znalostí a podepsanými aktualizacemi konfigurace.",
      "zh-Hans": "服务号基础设施，具有零知识频道和签名的配置更新。",
      "zh-Hant": "服務號基礎設施，具有零知識頻道和簽名的配置更新。",
      es: "La infraestructura de cuentas de servicio con canales de conocimiento cero y actualizaciones de configuración firmadas.",
      pl: "Infrastruktura kont usługowych z kanałami o zerowej wiedzy i podpisanymi aktualizacjami konfiguracji.",
      ja: "ゼロナレッジチャネルと署名付き構成更新を備えたサービスアカウントインフラストラクチャ。",
      th: "โครงสร้างพื้นฐานบัญชีบริการพร้อมช่องทางความรู้ที่เป็นศูนย์และการอัปเดตการกำหนดค่าที่ลงนาม",
      fi: "Palvelutilien infrastruktuuri nolla-tietämyskanavilla ja allekirjoitetuilla kokoonmäärityspäivityksillä.",
      uk: "Інфраструктура сервісних акаунтів з каналами з нульовим знанням та підписаними оновленнями конфігурації.",
      bg: "Инфраструктура на акаунти за услуги с канали с нулево знание и подписани актуализации на конфигурацията.",
      tr: "Sıfır bilgi kanalları ve imzalı yapılandırma güncellemeleri ile hizmet hesabı altyapısı.",
      hu: "Szolgáltatási fiók infrastruktúra nulla ismeretű csatornákkal és aláírt konfigurációs frissítésekkel.",
    },
    capabilities: [
      {
        en: "Zero-knowledge channels with encrypted key rotation",
        ru: "Каналы с нулевым разглашением и шифрованной ротацией ключей",
        de: "Zero-Knowledge-Kanäle mit verschlüsselter Schlüsselrotation",
        fr: "Canaux à connaissance nulle avec rotation de clés chiffrée",
        it: "Canali a conoscenza zero con rotazione delle chiavi crittografata",
        nl: "Zero-knowledge kanalen met versleutelde sleutelrotatie",
        cs: "Kanály s nulovou znalostí se šifrovanou rotací klíčů",
        "zh-Hans": "零知识频道，加密密钥轮换",
        "zh-Hant": "零知識頻道，加密金鑰輪換",
        es: "Canales de conocimiento cero con rotación de claves cifrada",
        pl: "Kanały o zerowej wiedzy z szyfrowaną rotacją kluczy",
        ja: "暗号化されたキーローテーションを備えたゼロナレッジチャネル",
        th: "ช่องทางความรู้ที่เป็นศูนย์พร้อมการหมุนคีย์ที่เข้ารหัส",
        fi: "Nolla-tietämyskanavat salatulla avainten kierrolla",
        uk: "Канали з нульовим знанням із зашифрованою ротацією ключів",
        bg: "Канали с нулево знание с криптирана ротация на ключове",
        tr: "Şifreli anahtar rotasyonu ile sıfır bilgi kanalları",
        hu: "Nulla ismeretű csatornák titkosított kulcs rotációval",
      },
      {
        en: "Signed server configuration with pinned keys",
        ru: "Подписанная конфигурация сервера с закрепленными ключами",
        de: "Signierte Serverkonfiguration mit gepinnten Schlüsseln",
        fr: "Configuration de serveur signée avec des clés épinglées",
        it: "Configurazione del server firmata con chiavi bloccate",
        nl: "Ondertekende serverconfiguratie met vastgezette sleutels",
        cs: "Podepsaná konfigurace serveru s připnutými klíči",
        "zh-Hans": "签名的服务器配置，固定密钥",
        "zh-Hant": "簽名的伺服器配置，固定金鑰",
        es: "Configuración de servidor firmada con claves fijadas",
        pl: "Podpisana konfiguracja serwera z przypiętymi kluczami",
        ja: "固定されたキーを持つ署名付きサーバー構成",
        th: "การกำหนดค่าเซิร์ฟเวอร์ที่ลงนามพร้อมคีย์ที่ตรึง",
        fi: "Allekirjoitettu palvelinkokoonpano kiinnitetyillä avaimilla",
        uk: "Підписана конфігурація сервера з закріпленими ключами",
        bg: "Подписана сървърна конфигурация с фиксирани ключове",
        tr: "Sabitlenmiş anahtarlarla imzalı sunucu yapılandırması",
        hu: "Aláírt szerver konfiguráció rögzített kulcsokkal",
      },
    ],
    license: "AGPL-3.0",
  },
  {
    name: "popopx-mac-node",
    url: "https://github.com/popopx-chat/popopx-mac-node",
    title: {
      en: "Mac Node",
      ru: "Mac-нода",
      de: "Mac-Knoten",
      fr: "Nœud Mac",
      it: "Nodo Mac",
      nl: "Mac-knooppunt",
      cs: "Uzel Mac",
      "zh-Hans": "Mac 节点",
      "zh-Hant": "Mac 節點",
      es: "Nodo Mac",
      pl: "Węzeł Mac",
      ja: "Mac ノード",
      th: "โหนด Mac",
      fi: "Mac-solmu",
      uk: "Вузол Mac",
      bg: "Възел Mac",
      tr: "Mac düğümü",
      hu: "Mac csomópont",
    },
    description: {
      en: "The macOS native node for running a self-hosted relay with full protocol support.",
      ru: "Нативный узел macOS для запуска самодостаточного ретранслятора с полной поддержкой протокола.",
      de: "Der native macOS-Knoten zum Ausführen eines selbst gehosteten Relais mit vollständiger Protokollunterstützung.",
      fr: "Le nœud natif macOS pour exécuter un relais auto-hébergé avec une prise en charge complète du protocole.",
      it: "Il nodo nativo macOS per eseguire un relay self-hosted con supporto completo del protocollo.",
      nl: "Het native macOS-knooppunt voor het uitvoeren van een zelfgehoste relay met volledige protocolondersteuning.",
      cs: "Nativní uzel macOS pro spuštění self-hostovaného relé s plnou podporou protokolu.",
      "zh-Hans": "macOS 原生节点，用于运行自托管中继，完全支持协议。",
      "zh-Hant": "macOS 原生節點，用於執行自託管中繼，完全支援協定。",
      es: "El nodo nativo de macOS para ejecutar un relé autoalojado con soporte completo de protocolo.",
      pl: "Natywny węzeł macOS do uruchamiania samohostowanego przekaźnika z pełną obsługą protokołu.",
      ja: "完全なプロトコルサポートを備えたセルフホスト型リレーを実行するための macOS ネイティブノード。",
      th: "โหนด macOS ดั้งเดิมสำหรับเรียกใช้รีเลย์ที่โฮสต์เองพร้อมการรองรับโปรโตคอลเต็มรูปแบบ",
      fi: "Alkuperäinen macOS-solmu itse isännöidyn releen käyttämiseen täydellä protokollatuen avulla.",
      uk: "Нативний вузол macOS для запуску самостійного ретранслятора з повною підтримкою протоколу.",
      bg: "Нативен macOS възел за стартиране на самостоятелно хостван ретранслатор с пълна поддръжка на протокол.",
      tr: "Tam protokol desteği ile kendi kendine barındırılan bir geçişi çalıştırmak için yerel macOS düğümü.",
      hu: "A natív macOS csomópont önállóan hosztolt relé futtatásához teljes protokoll támogatással.",
    },
    capabilities: [
      {
        en: "Self-hosted relay with full SMP protocol support",
        ru: "Самодостаточный ретранслятор с полной поддержкой протокола SMP",
        de: "Selbst gehostetes Relais mit vollständiger SMP-Protokollunterstützung",
        fr: "Relais auto-hébergé avec prise en charge complète du protocole SMP",
        it: "Relay self-hosted con supporto completo del protocollo SMP",
        nl: "Zelfgehoste relay met volledige SMP-protocolondersteuning",
        cs: "Self-hostované relé s plnou podporou protokolu SMP",
        "zh-Hans": "自托管中继，完全支持 SMP 协议",
        "zh-Hant": "自託管中繼，完全支援 SMP 協定",
        es: "Relé autoalojado con soporte completo del protocolo SMP",
        pl: "Samohostowany przekaźnik z pełną obsługą protokołu SMP",
        ja: "完全な SMP プロトコルサポートを備えたセルフホスト型リレー",
        th: "รีเลย์ที่โฮสต์เองพร้อมการรองรับโปรโตคอล SMP เต็มรูปแบบ",
        fi: "Itse isännöity rele täydellä SMP-protokollatuen avulla",
        uk: "Самостійний ретранслятор з повною підтримкою протоколу SMP",
        bg: "Самостоятелно хостван ретранслатор с пълна поддръжка на SMP протокол",
        tr: "Tam SMP protokol desteği ile kendi kendine barındırılan geçiş",
        hu: "Önállóan hosztolt relé teljes SMP protokoll támogatással",
      },
    ],
    license: "AGPL-3.0",
  },
];

const HEAD: Record<"eyebrow" | "title" | "subtitle", Localized<string>> = {
  eyebrow: {
    en: "Open-source repository matrix",
    ru: "Матрица репозиториев с открытым исходным кодом",
    de: "Open-Source-Repository-Matrix",
    fr: "Matrice de dépôts open source",
    it: "Matrice dei repository open source",
    nl: "Open-source repository-matrix",
    cs: "Matice open-source repozitářů",
    "zh-Hans": "开源仓库矩阵",
    "zh-Hant": "開源倉庫矩陣",
    es: "Matriz de repositorios de código abierto",
    pl: "Macierz repozytoriów open source",
    ja: "オープンソースリポジトリマトリックス",
    th: "เมทริกซ์ที่เก็บโอเพนซอร์ส",
    fi: "Avoimen lähdekoodin ohjelmavarastomatriisi",
    uk: "Матриця репозиторіїв з відкритим кодом",
    bg: "Матрица на хранилища с отворен код",
    tr: "Açık kaynak depo matrisi",
    hu: "Nyílt forráskódú tároló mátrix",
  },
  title: {
    en: "Six public repositories, one ecosystem",
    ru: "Шесть публичных репозиториев, одна экосистема",
    de: "Sechs öffentliche Repositories, ein Ökosystem",
    fr: "Six dépôts publics, un écosystème",
    it: "Sei repository pubblici, un ecosistema",
    nl: "Zes openbare repositories, één ecosysteem",
    cs: "Šest veřejných repozitářů, jeden ekosystém",
    "zh-Hans": "六个公开仓库，一个生态",
    "zh-Hant": "六個公開倉庫，一個生態",
    es: "Seis repositorios públicos, un ecosistema",
    pl: "Sześć publicznych repozytoriów, jeden ekosystem",
    ja: "6 つの公開リポジトリ、1 つのエコシステム",
    th: "ที่เก็บสาธารณะหกแห่ง ระบบนิเวศเดียว",
    fi: "Kuusi julkista ohjelmavarastoa, yksi ekosysteemi",
    uk: "Шість публічних репозиторіїв, одна екосистема",
    bg: "Шест публични хранилища, една екосистема",
    tr: "Altı açık depo, bir ekosistem",
    hu: "Hat nyilvános tároló, egy ökoszisztéma",
  },
  subtitle: {
    en: "Each repository below is publicly accessible on GitHub, licensed under AGPL-3.0, and independently auditable. Descriptions are manually written to ensure accuracy.",
    ru: "Каждый репозиторий ниже общедоступен на GitHub, лицензирован по AGPL-3.0 и независимо аудируем. Описания написаны вручную для обеспечения точности.",
    de: "Jedes Repository unten ist öffentlich auf GitHub zugänglich, unter AGPL-3.0 lizenziert und unabhängig prüfbar. Beschreibungen sind manuell geschrieben, um Genauigkeit sicherzustellen.",
    fr: "Chaque dépôt ci-dessous est accessible publiquement sur GitHub, sous licence AGPL-3.0 et auditable indépendamment. Les descriptions sont écrites manuellement pour garantir l'exactitude.",
    it: "Ogni repository qui sotto è accessibile pubblicamente su GitHub, con licenza AGPL-3.0 e verificabile in modo indipendente. Le descrizioni sono scritte manualmente per garantire la precisione.",
    nl: "Elke repository hieronder is openbaar toegankelijk op GitHub, gelicenseerd onder AGPL-3.0 en onafhankelijk controleerbaar. Beschrijvingen zijn handmatig geschreven om nauwkeurigheid te waarborgen.",
    cs: "Každý repozitář níže je veřejně přístupný na GitHubu, licencovaný pod AGPL-3.0 a nezávisle auditovatelný. Popisy jsou ručně napsány pro zajištění přesnosti.",
    "zh-Hans": "下面的每个仓库都在 GitHub 上公开访问，采用 AGPL-3.0 许可证，可独立审计。描述为手动编写以确保准确性。",
    "zh-Hant": "下方的每個倉庫都在 GitHub 上公開存取，採用 AGPL-3.0 授權條款，可獨立稽核。描述為手動編寫以確保準確性。",
    es: "Cada repositorio a continuación es de acceso público en GitHub, con licencia AGPL-3.0 y auditable de forma independiente. Las descripciones están escritas manualmente para garantizar la precisión.",
    pl: "Każde repozytorium poniżej jest publicznie dostępne na GitHub, licencjonowane na AGPL-3.0 i niezależnie audytowalne. Opisy są ręcznie napisane, aby zapewnić dokładność.",
    ja: "以下の各リポジトリは GitHub で公開されており、AGPL-3.0 でライセンスされ、独立して監査可能です。説明は正確性を確保するために手動で記述されています。",
    th: "ที่เก็บแต่ละแห่งด้านล่างสามารถเข้าถึงได้แบบสาธารณะบน GitHub ได้รับอนุญาตภายใต้ AGPL-3.0 และสามารถตรวจสอบได้อย่างอิสระ คำอธิบายถูกเขียนด้วยตนเองเพื่อให้แน่ใจว่าถูกต้อง",
    fi: "Jokainen alla oleva ohjelmavarasto on julkisesti saatavilla GitHubissa, lisensoitu AGPL-3.0:llä ja riippumattomasti auditoitavissa. Kuvaukset on kirjoitettu käsin tarkkuuden varmistamiseksi.",
    uk: "Кожен репозиторій нижче є загальнодоступним на GitHub, ліцензованим за AGPL-3.0 і незалежно аудійованим. Описи написані вручну для забезпечення точності.",
    bg: "Всяко хранилище по-долу е публично достъпно в GitHub, лицензирано под AGPL-3.0 и независимо одитируемо. Описанията са написани ръчно, за да се гарантира точност.",
    tr: "Aşağıdaki her depo GitHub'da herkese açık erişilebilir, AGPL-3.0 altında lisanslanmıştır ve bağımsız olarak denetlenebilir. Açıklamalar doğruluğu sağlamak için manuel olarak yazılmıştır.",
    hu: "Az alábbi minden tároló nyilvánosan elérhető a GitHubon, AGPL-3.0 alatt licencelt és függetlenül ellenőrizhető. A leírások kézzel vannak írva a pontosság biztosítása érdekében.",
  },
};

function RepoCard({ repo }: { repo: Repo }): ReactElement {
  const title = useCopy(repo.title);
  const description = useCopy(repo.description);

  return (
    <li className="animate-rise-in">
      <article className="glass glass-hover flex h-full flex-col gap-4 p-6">
        <header className="flex items-start justify-between gap-3">
          <h3 className="text-[17px] font-semibold leading-snug text-white">{title}</h3>
          <code className="shrink-0 rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[11px] text-brand-soft">
            {repo.license}
          </code>
        </header>

        <p className="text-[13.5px] leading-relaxed text-mute">{description}</p>

        {repo.capabilities.length > 0 && (
          <ul className="flex flex-col gap-2 border-t border-hair pt-4">
            {repo.capabilities.map((cap, i) => {
              const capText = useCopy(cap);
              return (
                <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-faint">
                  <span className="mt-[6px] shrink-0 text-brand-soft" aria-hidden>
                    ›
                  </span>
                  <span className="min-w-0 break-words">{capText}</span>
                </li>
              );
            })}
          </ul>
        )}

        <footer className="hairline-top mt-auto flex items-center justify-between pt-4">
          <code className="font-mono text-[11px] text-faint">{repo.name}</code>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pill text-[12px] text-white hover:bg-white/10 transition-colors"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              className="mr-1.5"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </footer>
      </article>
    </li>
  );
}

export function ProductMatrix(): ReactElement {
  const title = useCopy(HEAD.title);

  return (
    <section id="products" aria-label={title} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={HEAD.eyebrow} title={HEAD.title} subtitle={HEAD.subtitle} titleAs="h1" />

        <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REPOS.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </ul>
      </div>
    </section>
  );
}

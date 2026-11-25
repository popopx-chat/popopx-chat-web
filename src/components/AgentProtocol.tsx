"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { SectionHeading, StatusDot } from "@/components/ui";

/**
 * Agent protocol — SMP Agent Protocol status and PAP planning direction.
 *
 * PAP (POPOPX Agent Protocol) has 0 occurrences in the codebase. It is marked
 * as a planning direction, not an implemented feature. Zero fabricated references.
 */

const HEAD: Record<"eyebrow" | "title" | "subtitle", Localized<string>> = {
  eyebrow: {
    en: "Agent protocol status",
    ru: "Статус протокола агента",
    de: "Agent-Protokollstatus",
    fr: "Statut du protocole d'agent",
    it: "Stato del protocollo agente",
    nl: "Agent-protocolstatus",
    cs: "Stav protokolu agenta",
    "zh-Hans": "Agent 协议状态",
    "zh-Hant": "Agent 協定狀態",
    es: "Estado del protocolo de agente",
    pl: "Stan protokołu agenta",
    ja: "エージェントプロトコルのステータス",
    th: "สถานะโปรโตคอลตัวแทน",
    fi: "Agenttiprotokollan tila",
    uk: "Статус протоколу агента",
    bg: "Статус на протокола на агента",
    tr: "Ajan protokol durumu",
    hu: "Ágens protokoll állapot",
  },
  title: {
    en: "SMP Agent Protocol & planning direction",
    ru: "Протокол SMP Agent и направление планирования",
    de: "SMP-Agent-Protokoll & Planungsrichtung",
    fr: "Protocole SMP Agent & direction de planification",
    it: "Protocollo SMP Agent & direzione di pianificazione",
    nl: "SMP Agent-protocol & planningsrichting",
    cs: "Protokol SMP Agent & směr plánování",
    "zh-Hans": "SMP Agent 协议与规划方向",
    "zh-Hant": "SMP Agent 協定與規劃方向",
    es: "Protocolo SMP Agent & dirección de planificación",
    pl: "Protokół SMP Agent & kierunek planowania",
    ja: "SMP Agent プロトコルと計画方向",
    th: "โปรโตคอล SMP Agent & ทิศทางการวางแผน",
    fi: "SMP Agent -protokolla & suunnittelusuunta",
    uk: "Протокол SMP Agent & напрямок планування",
    bg: "Протокол SMP Agent & посока на планиране",
    tr: "SMP Ajan protokolü & planlama yönü",
    hu: "SMP Agent protokoll & tervezési irány",
  },
  subtitle: {
    en: "The SMP Agent Protocol defines tool invocation and task flow. PAP (POPOPX Agent Protocol) is a planning direction with zero current implementations.",
    ru: "Протокол SMP Agent определяет вызов инструментов и поток задач. PAP (POPOPX Agent Protocol) — это направление планирования без текущих реализаций.",
    de: "Das SMP-Agent-Protokoll definiert den Werkzeugaufruf und den Aufgabenfluss. PAP (POPOPX Agent Protocol) ist eine Planungsrichtung ohne aktuelle Implementierungen.",
    fr: "Le protocole SMP Agent définit l'invocation des outils et le flux des tâches. PAP (POPOPX Agent Protocol) est une direction de planification sans implémentations actuelles.",
    it: "Il protocollo SMP Agent definisce l'invocazione degli strumenti e il flusso delle attività. PAP (POPOPX Agent Protocol) è una direzione di pianificazione senza implementazioni correnti.",
    nl: "Het SMP Agent-protocol definieert de aanroep van tools en de taakstroom. PAP (POPOPX Agent Protocol) is een planningsrichting zonder huidige implementaties.",
    cs: "Protokol SMP Agent definuje volání nástrojů a tok úloh. PAP (POPOPX Agent Protocol) je směr plánování bez aktuálních implementací.",
    "zh-Hans": "SMP Agent 协议定义了工具调用和任务流转。PAP（POPOPX Agent 协议）是一个规划方向，目前零实现。",
    "zh-Hant": "SMP Agent 協定定義了工具呼叫和任務流轉。PAP（POPOPX Agent 協定）是一個規劃方向，目前零實作。",
    es: "El protocolo SMP Agent define la invocación de herramientas y el flujo de tareas. PAP (POPOPX Agent Protocol) es una dirección de planificación sin implementaciones actuales.",
    pl: "Protokół SMP Agent definiuje wywoływanie narzędzi i przepływ zadań. PAP (POPOPX Agent Protocol) to kierunek planowania bez bieżących implementacji.",
    ja: "SMP Agent プロトコルは、ツール呼び出しとタスクフローを定義します。PAP（POPOPX Agent プロトコル）は、現在の実装がない計画方向です。",
    th: "โปรโตคอล SMP Agent กำหนดการเรียกใช้เครื่องมือและกระแสงาน PAP (POPOPX Agent Protocol) เป็นทิศทางการวางแผนที่ไม่มีการดำเนินการในปัจจุบัน",
    fi: "SMP Agent -protokolla määrittelee työkalujen kutsun ja tehtävien virran. PAP (POPOPX Agent Protocol) on suunnittelusuunta ilman nykyisiä toteutuksia.",
    uk: "Протокол SMP Agent визначає виклик інструментів та потік завдань. PAP (POPOPX Agent Protocol) — це напрямок планування без поточних реалізацій.",
    bg: "Протоколът SMP Agent дефинира извикването на инструменти и потока на задачи. PAP (POPOPX Agent Protocol) е посока на планиране без текущи реализации.",
    tr: "SMP Ajan Protokolü, araç çağrısını ve görev akışını tanımlar. PAP (POPOPX Ajan Protokolü), mevcut uygulaması olmayan bir planlama yönüdür.",
    hu: "Az SMP Agent protokoll meghatározza az eszköz meghívást és a feladat áramlást. A PAP (POPOPX Agent Protocol) egy tervezési irány jelenlegi megvalósítások nélkül.",
  },
};

const PROTOCOL_STATUS: Localized<string> = {
  en: "SMP Agent Protocol: defined and in use for tool invocation and task orchestration across bot surfaces.",
  ru: "Протокол SMP Agent: определен и используется для вызова инструментов и оркестрации задач на поверхностях ботов.",
  de: "SMP-Agent-Protokoll: definiert und in Verwendung für Werkzeugaufrufe und Aufgaben-Orchestrierung auf Bot-Oberflächen.",
  fr: "Protocole SMP Agent : défini et utilisé pour l'invocation d'outils et l'orchestration de tâches sur les surfaces de bots.",
  it: "Protocollo SMP Agent: definito e in uso per l'invocazione degli strumenti e l'orchestrazione delle attività sulle superfici dei bot.",
  nl: "SMP Agent-protocol: gedefinieerd en in gebruik voor het aanroepen van tools en het orkestreren van taken op bot-oppervlakken.",
  cs: "Protokol SMP Agent: definovaný a používaný pro volání nástrojů a orchestraci úloh na površích botů.",
  "zh-Hans": "SMP Agent 协议：已定义并用于 Bot 界面上的工具调用和任务编排。",
  "zh-Hant": "SMP Agent 協定：已定義並用於 Bot 介面上的工具呼叫和任務編排。",
  es: "Protocolo SMP Agent: definido y en uso para la invocación de herramientas y la orquestación de tareas en las superficies de bots.",
  pl: "Protokół SMP Agent: zdefiniowany i używany do wywoływania narzędzi i orkiestracji zadań na powierzchniach botów.",
  ja: "SMP Agent プロトコル：ボットサーフェスでのツール呼び出しとタスクオーケストレーションのために定義され、使用されています。",
  th: "โปรโตคอล SMP Agent: ถูกกำหนดและใช้งานสำหรับการเรียกใช้เครื่องมือและการประสานงานงานบนพื้นผิวบอต",
  fi: "SMP Agent -protokolla: määritelty ja käytössä työkalujen kutsumiseen ja tehtävien orkestrointiin bottipinnoilla.",
  uk: "Протокол SMP Agent: визначений та використовується для виклику інструментів та оркестрації завдань на поверхнях ботів.",
  bg: "Протокол SMP Agent: дефиниран и използван за извикване на инструменти и оркестрация на задачи на повърхности на ботове.",
  tr: "SMP Ajan Protokolü: bot yüzeylerinde araç çağrısı ve görev orkestrasyonu için tanımlanmış ve kullanımda.",
  hu: "SMP Agent protokoll: meghatározott és használatban van az eszköz meghíváshoz és feladat vezérléshez a bot felületeken.",
};

const PAP_STATUS: Localized<string> = {
  en: "PAP (POPOPX Agent Protocol): planning direction only. Zero occurrences in the current codebase. Not yet implemented.",
  ru: "PAP (POPOPX Agent Protocol): только направление планирования. Ноль вхождений в текущей кодовой базе. Еще не реализовано.",
  de: "PAP (POPOPX Agent Protocol): nur Planungsrichtung. Null Vorkommen in der aktuellen Codebasis. Noch nicht implementiert.",
  fr: "PAP (POPOPX Agent Protocol) : direction de planification uniquement. Zéro occurrence dans la base de code actuelle. Pas encore implémenté.",
  it: "PAP (POPOPX Agent Protocol): solo direzione di pianificazione. Zero occorrenze nella base di codice corrente. Non ancora implementato.",
  nl: "PAP (POPOPX Agent Protocol): alleen planningsrichting. Nul voorkomens in de huidige codebasis. Nog niet geïmplementeerd.",
  cs: "PAP (POPOPX Agent Protocol): pouze směr plánování. Nula výskytů v aktuální kódové základně. Zatím neimplementováno.",
  "zh-Hans": "PAP（POPOPX Agent 协议）：仅为规划方向。当前代码库中零出现。尚未实现。",
  "zh-Hant": "PAP（POPOPX Agent 協定）：僅為規劃方向。目前程式碼庫中零出現。尚未實作。",
  es: "PAP (POPOPX Agent Protocol): solo dirección de planificación. Cero ocurrencias en la base de código actual. Aún no implementado.",
  pl: "PAP (POPOPX Agent Protocol): tylko kierunek planowania. Zero wystąpień w aktualnej bazie kodu. Jeszcze nie zaimplementowane.",
  ja: "PAP（POPOPX Agent プロトコル）：計画方向のみ。現在のコードベースでは 0  occurrences。まだ実装されていません。",
  th: "PAP (POPOPX Agent Protocol): เฉพาะทิศทางการวางแผน ไม่มีการเกิดขึ้นในฐานรหัสปัจจุบัน ยังไม่ได้ดำเนินการ",
  fi: "PAP (POPOPX Agent Protocol): vain suunnittelusuunta. Nolla esiintymää nykyisessä koodipohjassa. Ei vielä toteutettu.",
  uk: "PAP (POPOPX Agent Protocol): лише напрямок планування. Нуль входжень у поточній кодовій базі. Ще не реалізовано.",
  bg: "PAP (POPOPX Agent Protocol): само посока на планиране. Нула срещания в текущата кодова база. Все още не е реализирано.",
  tr: "PAP (POPOPX Ajan Protokolü): yalnızca planlama yönü. Geçerli kod tabanında sıfır oluşum. Henüz uygulanmadı.",
  hu: "PAP (POPOPX Agent Protocol): csak tervezési irány. Nulla előfordulás a jelenlegi kódbázisban. Még nincs megvalósítva.",
};

const NOTE: Localized<string> = {
  en: "Protocol names and abbreviations are quoted verbatim from the codebase. PAP appears in documentation and planning materials only, not in shipped source.",
  ru: "Имена протоколов и аббревиатуры цитируются дословно из кодовой базы. PAP встречается только в документации и планировочных материалах, а не в выпущенном исходном коде.",
  de: "Protokollnamen und Abkürzungen werden wörtlich aus der Codebasis zitiert. PAP erscheint nur in Dokumentation und Planungsmaterialien, nicht im ausgelieferten Quellcode.",
  fr: "Les noms de protocole et les abréviations sont cités textuellement à partir de la base de code. PAP apparaît uniquement dans la documentation et les matériaux de planification, pas dans le source livré.",
  it: "I nomi dei protocolli e le abbreviazioni sono citati testualmente dalla base di codice. PAP appare solo nella documentazione e nei materiali di pianificazione, non nel sorgente rilasciato.",
  nl: "Protocolnamen en afkortingen zijn letterlijk geciteerd uit de codebasis. PAP verschijnt alleen in documentatie en planningsmaterialen, niet in de geleverde bron.",
  cs: "Názvy protokolů a zkratky jsou citovány doslovně z kódové základny. PAP se objevuje pouze v dokumentaci a plánovacích materiálech, ne v dodaném zdroji.",
  "zh-Hans": "协议名称和缩写逐字引自代码库。PAP 仅出现在文档和规划材料中，不在已发布的源码中。",
  "zh-Hant": "協定名稱和縮寫逐字引自程式碼庫。PAP 僅出現在文件和規劃材料中，不在已發佈的原始碼中。",
  es: "Los nombres de protocolo y las abreviaturas se citan textualmente de la base de código. PAP aparece solo en documentación y materiales de planificación, no en el código fuente entregado.",
  pl: "Nazwy protokołów i skróty są cytowane dosłownie z bazy kodu. PAP pojawia się tylko w dokumentacji i materiałach planistycznych, nie w dostarczonym źródle.",
  ja: "プロトコル名と略語は、コードベースからそのまま引用されています。PAP はドキュメントと計画資料にのみ表示され、出荷されたソースには表示されません。",
  th: "ชื่อโปรโตคอลและตัวย่อถูกอ้างอิงตามตัวอักษรจากฐานรหัส PAP ปรากฏในเอกสารและวัสดุการวางแผนเท่านั้น ไม่ใช่ในซอร์สที่จัดส่ง",
  fi: "Protokollanimet ja lyhenteet on lainattu sellaisenaan koodipohjasta. PAP näkyy vain dokumentaatiossa ja suunnittelumateriaaleissa, ei toimitetussa lähteessä.",
  uk: "Назви протоколів та абревіатури цитуються дослівно з кодової бази. PAP з'являється лише в документації та планувальних матеріалах, а не в поставленому вихідному коді.",
  bg: "Имената на протоколите и съкращенията са цитирани дословно от кодовата база. PAP се появява само в документацията и планировъчните материали, а не в доставения източник.",
  tr: "Protokol adları ve kısaltmalar, kod tabanından kelimesi kelimesine alıntılanmıştır. PAP yalnızca belgelerde ve planlama malzemelerinde görünür, teslim edilen kaynakta görünmez.",
  hu: "A protokoll nevek és rövidítések szó szerint vannak idézve a kódbázisból. A PAP csak a dokumentációban és a tervezési anyagokban jelenik meg, nem a szállított forrásban.",
};

export function AgentProtocol(): ReactElement {
  const title = useCopy(HEAD.title);
  const protocolStatus = useCopy(PROTOCOL_STATUS);
  const papStatus = useCopy(PAP_STATUS);
  const note = useCopy(NOTE);

  return (
    <section id="agent-protocol" aria-label={title} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={HEAD.eyebrow} title={HEAD.title} subtitle={HEAD.subtitle} titleAs="h2" />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="glass glass-hover flex flex-col gap-4 p-6">
            <header className="flex items-center gap-3">
              <StatusDot tone="brand" />
              <h3 className="text-[17px] font-semibold text-white">SMP Agent Protocol</h3>
            </header>
            <p className="text-[13.5px] leading-relaxed text-mute">{protocolStatus}</p>
          </article>

          <article className="glass glass-hover flex flex-col gap-4 p-6">
            <header className="flex items-center gap-3">
              <StatusDot tone="mesh" />
              <h3 className="text-[17px] font-semibold text-white">PAP (POPOPX Agent Protocol)</h3>
            </header>
            <p className="text-[13.5px] leading-relaxed text-mute">{papStatus}</p>
          </article>
        </div>

        <div className="glass-inset mt-6 flex items-start gap-3 p-5">
          <span className="mt-[6px] shrink-0">
            <StatusDot tone="mesh" />
          </span>
          <p className="text-[12.5px] leading-relaxed text-faint">{note}</p>
        </div>
      </div>
    </section>
  );
}

"use client";

import type { ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { SectionHeading, StatusDot } from "@/components/ui";
import { TONES, type Tone } from "@/components/EcosystemHub";

/**
 * The three AI capability layers, under `EcosystemPanorama` on the homepage.
 *
 * This is the capability view of the same system that `/ecosystem/` draws as six
 * engineering layers, so the two must not tell different stories. Three rules keep
 * them together:
 *
 *  1. Nothing here claims a capability the four repositories do not contain. Each
 *     card splits what already ships from what is still evolving, and the second
 *     half is stated as plainly as the first — the on-device assistant has zero
 *     implementations in the client, and cross-component scheduling has zero
 *     calls in any repository (ledger §16, last two rows).
 *  2. The status wording follows `AgentProtocol.tsx` and `EcosystemPanorama.tsx`
 *     rather than inventing a third vocabulary: an existing implementation is
 *     `Available`, an absent one is `Evolving`, and the SMP Agent Protocol / PAP
 *     sentence is the same measurement those two components publish.
 *  3. No `file:line` citation is rendered. The layer cards speak in user terms;
 *     the pointers live in `docs/FACTS.md` §16 and §17, where `check:facts` can
 *     open them. A page number that no one can re-measure is not evidence.
 *
 * The layer names are locale-free — Personal AI, AI Agents, AI Connection — in the
 * same way `PortalCards` prints product names, so the three homepage blocks name
 * the same things with the same words in all 18 languages.
 */

/* Every map below is an exhaustive literal: `Localized<T>` is checked slot by slot,
   and a derived, spread or cast map would let one of the eighteen locales silently
   inherit another one's text. */

const EYEBROW: Localized<string> = {
  en: "Three layers of AI capability",
  ru: "Три уровня интеллектуальных возможностей",
  de: "Drei Ebenen der KI-Fähigkeiten",
  fr: "Trois niveaux de capacités d’IA",
  it: "Tre livelli di capacità IA",
  nl: "Drie lagen van AI-mogelijkheden",
  cs: "Tři úrovně inteligentních schopností",
  "zh-Hans": "AI 能力三层架构",
  "zh-Hant": "AI 能力三層架構",
  es: "Tres niveles de capacidad de IA",
  pl: "Trzy warstwy zdolności AI",
  ja: "AI 機能の三層構造",
  th: "ความสามารถด้าน AI สามชั้น",
  fi: "Tekoälyn kolme tasoa",
  uk: "Три рівні інтелектуальних можливостей",
  bg: "Три нива на интелектуалните възможности",
  tr: "Üç katmanlı yapay zekâ yeteneği",
  hu: "Az MI-képességek három rétege",
};

const TITLE: Localized<string> = {
  en: "Three layers: a helper on your device, agents you host, and what they reach",
  ru: "Три уровня: помощник на устройстве, свои агенты и то, к чему они подключаются",
  de: "Drei Ebenen: Helfer auf dem Gerät, eigene Agenten und was sie erreichen",
  fr: "Trois niveaux : l’assistant sur l’appareil, ses agents et ce qu’ils rejoignent",
  it: "Tre livelli: l’assistente sul dispositivo, i propri agenti e ciò che collegano",
  nl: "Drie lagen: een helper op het apparaat, eigen agents en wat ze bereiken",
  cs: "Tři úrovně: pomocník v zařízení, vlastní agenti a to, k čemu se dostanou",
  "zh-Hans": "三层能力：端侧助手、你自己的智能体、它能连上的世界",
  "zh-Hant": "三層能力：端側助手、你自己的智能體、它能連上的世界",
  es: "Tres niveles: un asistente en el dispositivo, tus agentes y a qué llegan",
  pl: "Trzy warstwy: asystent na urządzeniu, własne agenty i to, co osiągają",
  ja: "三つの層——デバイス上のアシスタント、自分で運用するエージェント、その先の世界",
  th: "สามชั้น: ผู้ช่วยบนอุปกรณ์ เอเจนต์ที่คุณรันเอง และสิ่งที่เชื่อมต่อถึง",
  fi: "Kolme tasoa: avustaja laitteella, omat agentit ja se, mihin ne yltävät",
  uk: "Три рівні: помічник на пристрої, власні агенти та те, до чого вони дістають",
  bg: "Три нива: помощник на устройството, свои агенти и това до което стигат",
  tr: "Üç katman: cihazdaki asistan, kendi ajanlarınız ve ulaştıkları dünya",
  hu: "Három réteg: az eszközön futó asszisztens, a saját ügynökök és amit elérnek",
};

const LEAD: Localized<string> = {
  en: "Each layer sits closer to a machine you own than the one above it. Every card separates what already ships from what is still evolving, on the same terms the Agent protocol status uses on /ecosystem/.",
  ru: "Каждый уровень ближе к вашей собственной машине, чем тот, что над ним. На каждой карточке отдельно сказано, что уже работает и что ещё развивается — в тех же формулировках, что и статус Agent-протокола на /ecosystem/.",
  de: "Jede Ebene liegt näher an einer eigenen Maschine als die über ihr. Jede Karte trennt das bereits Ausgelieferte von dem, was sich noch entwickelt — nach denselben Maßstäben wie der Agent-Protokollstatus auf /ecosystem/.",
  fr: "Chaque niveau est plus près d’une machine qui vous appartient que le précédent. Chaque carte sépare ce qui est déjà livré de ce qui évolue encore, dans les mêmes termes que le statut du protocole Agent sur /ecosystem/.",
  it: "Ogni livello è più vicino a una macchina che possiedi rispetto a quello sopra. Ogni carta separa ciò che è già pubblicato da ciò che sta ancora evolvendo, con gli stessi termini dello stato del protocollo Agent su /ecosystem/.",
  nl: "Elke laag dichter bij een machine die je bezit dan de laag erboven. Elke kaart scheidt wat al uitgeleverd is van wat nog evolueert, met dezelfde termen als de Agent-protocolstatus op /ecosystem/.",
  cs: "Každá úroveň je blíž k vašemu vlastnímu stroji než ta nad ní. Každá karta odděluje, co už funguje, od toho, co se ještě vyvíjí — stejnými slovy jako stav Agent protokolu na /ecosystem/.",
  "zh-Hans": "越往下，越靠近你自己手里那台机器。每一层都分开写：今天已经能用的部分，和还在演进的部分。判定口径与 /ecosystem/ 的 Agent 协议状态一致，不多写一句代码里不存在的能力。",
  "zh-Hant": "越往下，越靠近你自己手裡那台裝置。每一層都分開寫：今天已經能用的部分，和還在演進的部分。判定口徑與 /ecosystem/ 的 Agent 協定狀態一致，不多寫一句程式碼裡不存在的能力。",
  es: "Cada capa está más cerca de una máquina suya que la de arriba. Cada tarjeta separa lo que ya funciona de lo que aún evoluciona, con los mismos términos del estado del protocolo Agent en /ecosystem/.",
  pl: "Każda warstwa jest bliżej maszyny, która jest wasza, niż ta nad nią. Każda karta oddziela to, co już działa, od tego, co jeszcze się rozwija — tymi samymi słowami co status protokołu Agent na /ecosystem/.",
  ja: "下の層ほど、自分の手持ちの機械に近づきます。各カードは「すでに動く部分」と「進化中の部分」を分けて書き、判定の基準は /ecosystem/ の Agent プロトコル状態と同じです。",
  th: "แต่ละชั้นอยู่ใกล้เครื่องที่เป็นของคุณเองมากขึ้นกว่าชั้นข้างบน การ์ดทุกใบแยกระหว่างสิ่งที่ใช้งานได้แล้วกับสิ่งที่ยังพัฒนาต่อ โดยใช้เกณฑ์เดียวกับสถานะโปรโตคอล Agent บน /ecosystem/",
  fi: "Jokainen kerros on lähempänä omaa konettasi kuin sen yläpuolinen. Jokainen kortti erottaa jo toimitetun ja vielä kehittyvän osan samoin ehdoin kuin Agent-protokollan tila /ecosystem/-sivulla.",
  uk: "Кожен рівень ближчий до вашої власної машини, ніж той, що над ним. На кожній картці окремо сказано, що вже працює і що ще розвивається — тими самими словами, що й статус Agent-протоколу на /ecosystem/.",
  bg: "Всеки слой е по-близо до собствената ви машина от този над него. Всяка карта разделя това, което вече работи, от това, което още се развива — същите формулировки като при статуса на Agent протокола на /ecosystem/.",
  tr: "Her katman, üstündekine göre sizin olan bir makineye daha yakındır. Her kart, çalışan ile hâlâ evrilen kısmı ayrı yazar; ölçüt, /ecosystem/ üzerindeki Agent protokol durumuyla aynıdır.",
  hu: "Minden réteg közelebb van a saját gépedhez, mint a felette lévő. Minden kártya szétválasztja a már működőt és a még fejlődőt, ugyanazokkal a megfogalmazásokkal, mint az Agent-protokoll állása az /ecosystem/ oldalon.",
};

const L1_DESC: Localized<string> = {
  en: "The layer closest to you. Its job is to work out what you need on the phone itself, and to do the work without moving your data off it.",
  ru: "Самый близкий к вам уровень. Его задача — понять, что нужно, прямо на телефоне и сделать это, не вынося данные наружу.",
  de: "Die Ebene am nächsten bei Ihnen. Ihre Aufgabe ist es, auf dem Telefon selbst zu erkennen, was Sie brauchen, und die Arbeit zu erledigen, ohne Ihre Daten vom Gerät zu bewegen.",
  fr: "Le niveau le plus près de vous. Son rôle : comprendre ce dont vous avez besoin directement sur le téléphone et le traiter sans faire sortir vos données.",
  it: "Il livello più vicino a te. Il suo compito è capire cosa ti serve direttamente sul telefono e svolgerlo senza far uscire i tuoi dati.",
  nl: "De laag die het dichtst bij je staat. Zijn taak is op de telefoon zelf uit te maken wat je nodig hebt en dat te doen zonder je data van het toestel te halen.",
  cs: "Nejbližší úroveň k vám. Jejím úkolem je na telefonu samotném zjistit, co potřebujete, a vyřídit to, aniž by vaše data opustila přístroj.",
  "zh-Hans": "最靠近你的一层。它负责在你自己的手机上弄清你要做什么，并把事办完——数据不离开这台设备。",
  "zh-Hant": "最靠近你的一層。它負責在你自己的手機上釐清你要做什麼，並把事情辦完——資料不離開這台裝置。",
  es: "La capa más cercana a usted. Su trabajo es entender qué necesita directamente en el teléfono y resolverlo sin sacar sus datos del aparato.",
  pl: "Warstwa najbliżej was. Jej zadaniem jest rozpoznanie, czego potrzebujecie, wprost na telefonie i załatwienie tego bez wyprowadzania danych z urządzenia.",
  ja: "いちばん手近な層です。スマホの上でやりたいことを読み取り、データを端末の外に出さずに片付けるのが役割です。",
  th: "ชั้นที่ใกล้คุณที่สุด หน้าที่ของมันคืออ่านให้ออกบนเครื่องโทรศัพท์ว่าคุณต้องการอะไร แล้วจัดการให้จบโดยไม่ดึงข้อมูลออกจากเครื่อง",
  fi: "Sinua lähinnä oleva kerros. Sen tehtävä on selvittää puhelimella itsellään, mitä tarvitset, ja hoitaa se ilman että data poistuu laitteesta.",
  uk: "Найближчий до вас рівень. Його завдання — зрозуміти, що вам потрібно, просто на телефоні та виконати це, не виносячи дані з пристрою.",
  bg: "Най-близкият до вас слой. Задачата му е да разбере какво ви трябва прямо на телефона и да го уреди, без данните да напускат устройството.",
  tr: "Size en yakın katman. İşi, telefonda neye ihtiyaç duyduğunuzu anlamak ve veriyi cihazdan çıkarmadan işi bitirmek.",
  hu: "A hozzátok legközelebbi réteg. Feladata, hogy a telefonon magán kiderítse, mire van szükségetek, és elintézze, anélkül hogy az adat kikerülne az eszközről.",
};

const L1_DONE: Localized<string> = {
  en: "The privacy base already ships: no phone number and no e-mail, no global user ID, encrypted queue payloads, EXIF/GPS stripped before a photo leaves, and a Bluetooth peer-to-peer path when the network is gone. And the on-device inference that does exist is real: a 320x320 detector runs on the Neural Engine and answers one question — is a lens pointed at you.",
  ru: "Основа приватности уже в продукте: без номера телефона и почты, без глобального ID, шифрование полезной нагрузки очередей, EXIF/GPS снимаются до отправки фото, а без сети остаётся Bluetooth «точка-точка». Локальный вывод на устройстве тоже не пустое обещание: детектор 320x320 считается на Neural Engine и отвечает на один вопрос — направлен ли на вас объектив.",
  de: "Die Privatsphäre-Basis ist ausgeliefert: keine Telefonnummer und keine E-Mail, keine globale Benutzer-ID, verschlüsselte Queue-Nutzdaten, EXIF/GPS verschwinden vor dem Foto-Versand, und ohne Netz bleibt der Bluetooth-Weg von Paar zu Paar. Und die Inferenz auf dem Gerät ist kein Versprechen, sondern vorhanden: ein 320x320-Detektor rechnet auf der Neural Engine und beantwortet eine Frage — zeigt eine Linse auf Sie?",
  fr: "Le socle de confidentialité est livré : pas de numéro de téléphone ni d’e-mail, pas d’identifiant global, charge utile des files chiffrée, EXIF/GPS retirés avant l’envoi de la photo et, sans réseau, le trajet Bluetooth de pair à pair. Et l’inférence sur l’appareil existe bel et bien : un détecteur 320x320 calcule sur le Neural Engine et répond à une seule question — un objectif est-il pointé vers vous ?",
  it: "La base di privacy è già consegnata: niente numero di telefono né e-mail, nessun ID utente globale, payload delle code cifrati, EXIF/GPS rimossi prima che la foto parta e, senza rete, il percorso Bluetooth punto a punto. E l’inferenza sul dispositivo esiste già: un rilevatore 320x320 calcola sul Neural Engine e risponde a una sola domanda, se un obiettivo è puntato verso di te.",
  nl: "De privacybasis is er al: geen telefoonnummer en geen e-mail, geen globale gebruikers-ID, versleutelde wachtrij-payloads, EXIF/GPS van een foto af vóórdat die vertrekt, en zonder netwerk een Bluetooth-pad van paar naar paar. En lokale inferentie is er ook echt: een 320x320-detector rekent op de Neural Engine en beantwoordt één vraag — wijst een lens naar je toe?",
  cs: "Základ soukromí už v aplikaci je: bez telefonního čísla a e-mailu, bez globálního uživatelského ID, šifrované nálože front, EXIF/GPS se oříznou dřív, než fotka odejde, a bez sítě zůstává cesta Bluetooth bod-bod. A lokální výpočet v telefonu také existuje: detektor 320x320 počítá na Neural Engine a zodpovídá jedinou otázku — míří na vás nějaký objektiv?",
  "zh-Hans": "隐私底座已经出厂：不绑手机号与邮箱，没有全局用户 ID，队列载荷加密，图片发出前剥掉 EXIF/GPS，断网时还有蓝牙点对点这条路。端侧推理也不是空头承诺：一个 320×320 的视觉检测跑在 Neural Engine 上，只回答一个问题——有没有镜头正对着你。",
  "zh-Hant": "隱私底座已經出廠：不綁手機號與電郵，沒有全域使用者 ID，佇列載具加密，圖片送出前剝掉 EXIF/GPS，斷網時還有藍牙點對點這條路。裝置端推論也不是空頭承諾：一個 320×320 的視覺偵測跑在 Neural Engine 上，只回答一個問題——有沒有鏡頭正對著你。",
  es: "La base de privacidad ya está entregada: sin número de teléfono ni correo, sin ID global, carga útil de las colas cifrada, EXIF/GPS quitados antes de que la foto salga y, sin red, el camino Bluetooth de punto a punto. Y la inferencia en el dispositivo también es real: un detector 320x320 calcula en el Neural Engine y responde a una sola pregunta — ¿apunta una lente hacia usted?",
  pl: "Podstawa prywatności jest już w aplikacji: bez numeru telefonu i poczty, bez globalnego ID, zaszyfrowana zawartość kolejek, EXIF/GPS usuwane zanim zdjęcie wyjdzie, a bez sieci zostaje ścieżka Bluetooth punkt-punkt. A wnioskowanie na urządzeniu też jest realne: detektor 320x320 liczy się na Neural Engine i odpowiada na jedno pytanie — czy obiektyw jest skierowany na was?",
  ja: "プライバシーの土台はすでに出荷済み：電話番号もメールも不要、グローバルなユーザー ID なし、キューのペイロードは暗号化、写真は送出前に EXIF/GPS を除去、ネットワークが無いときは Bluetooth のポイントツーポイントが残ります。デバイス上の推論も実際に動いています。320×320 の検出モデルが Neural Engine で走り、レンズが自分に向けられているかという一つの問いだけに答えます。",
  th: "ฐานความเป็นส่วนตัวมาพร้อมแอปแล้ว: ไม่ต้องใช้เบอร์โทรหรืออีเมล ไม่มี ID ผู้ใช้สากล เนื้อหาของคิวถูกเข้ารหัส ลบ EXIF/GPS ก่อนรูปออกจากเครื่อง และตอนไร้เครือข่ายก็ยังมีเส้นทางบลูทูธแบบจุดต่อจุดการประมวลผลบนเครื่องก็มีอยู่จริง: โมเดลตรวจภาพ 320×320 รันบน Neural Engine และตอบคำถามเดียวเท่านั้น—มีเลนส์จ้องมาที่คุณอยู่หรือไม่",
  fi: "Yksityisyyden perusta on jo mukana: ei puhelinnumeroa eikä sähköpostia, ei globaalia käyttäjätunnistetta, jonojen kuormat salattu, EXIF/GPS poistetaan ennen kuvan lähtöä ja verkon puuttuessa tarjolla on Bluetoothin piste-piste-reitti. Ja laitteella tehtävä päättely on myös totta: 320x320-tunnistain laskee Neural Enginella ja vastaa yhteen kysymykseen — osoittaako jokin objektiivi sinua kohti?",
  uk: "Основу приватності вже поставлено: без номера телефону й пошти, без глобального ID, вміст черг шифрується, EXIF/GPS знімаються до відправки фото, а без мережі лишається Bluetooth «точка-точка». Локальний висновок на пристрої — теж не порожня обіцянка: детектор 320x320 рахується на Neural Engine і відповідає на одне запитання — чи спрямований на вас об’єктив.",
  bg: "Основата за поверителност вече идва с приложението: без телефонен номер и имейл, без глобален ID, съдържанието на опашките е криптирано, EXIF/GPS се махат преди снимката да тръгне, а без мрежа остава Bluetooth път точка-точка. Локалното извеждане на изводи тоже не е празно обещание: детектор 320x320 се изчислява на Neural Engine и отговаря на един въпрос — сочи ли обектив към вас.",
  tr: "Gizlilik temeli çoktan yayında: telefon numarası ve e-posta yok, küresel kullanıcı kimliği yok, kuyruk yükleri şifreli, fotoğraf yola çıkmadan EXIF/GPS düşülüyor, ağ yoksa Bluetooth uç-uca yolu var. Cihaz üstü çıkarım da gerçekten var: 320x320 bir algılayıcı Neural Engine üzerinde hesaplıyor ve tek bir soruyu yanıtlıyor — bir mercek size mi dönük?",
  hu: "Az adatvédelmi alap már benne van a termékben: nincs telefonszám és e-mail, nincs globális felhasználói azonosító, a sorok terhelése titkosított, a EXIF/GPS a kép indulása előtt lekerül, hálózat nélkül pedig ott a Bluetooth pont-pont út. És az eszközön futó következtetés is valós: egy 320x320-as detektor a Neural Engine-en számol, és egyetlen kérdésre felel: irányul-e objektív rátok?",
};

const L1_NEXT: Localized<string> = {
  en: "The assistant itself is not in the client yet: the iOS repository has no dialogue or generative model, no speech recognizer and no local inference server, so this portal does not count it as shipped. The weights that do ship only detect objects.",
  ru: "Самого ассистента в клиенте ещё нет: в iOS-репозитории нет ни диалоговой, ни генеративной модели, ни распознавания речи, ни локального сервера вывода, поэтому портал не считает это выпущенным. Те веса, что поставляются, занимаются только детекцией объектов.",
  de: "Der Assistent selbst ist noch nicht im Client: Im iOS-Repository gibt es weder ein Dialog- noch ein generatives Modell, weder Spracherkennung noch einen lokalen Inferenzserver, also zählt diese Seite sie nicht als ausgeliefert. Die mitgelieferten Gewichte erkennen nur Objekte.",
  fr: "L’assistant lui-même n’est pas encore dans le client : le dépôt iOS ne contient ni modèle de dialogue ni modèle génératif, ni reconnaissance vocale, ni serveur d’inférence local, donc ce portail ne le compte pas comme livré. Les poids livrés ne font que détecter des objets.",
  it: "L’assistente in sé non è ancora nel client: il repository iOS non contiene né un modello di dialogo né un modello generativo, né riconoscimento vocale né un server di inferenza locale, quindi questo portale non lo conta come pubblicato. I pesi inclusi si limitano a rilevare oggetti.",
  nl: "De assistent zelf zit nog niet in de client: de iOS-repo bevat geen dialoog- of generatief model, geen spraakherkenning en geen lokale inferentieserver, dus deze portal telt het niet als uitgeleverd. De meegeleverde gewichten detecteren alleen objecten.",
  cs: "Samotný asistent zatím v klientovi není: v iOS repozitáři není žádný dialogový ani generační model, žádné rozpoznávání řeči ani lokální server pro odvozování, a tento portál to tedy nepovažuje za vydané. Dodané váhy jen detekují objekty.",
  "zh-Hans": "助手本体还没进客户端：iOS 仓库里既没有对话模型也没有生成式模型，没有语音识别，也没有本地推理服务，因此本站不把它算作已发布能力。随包发布的那份权重只做目标检测。",
  "zh-Hant": "助理本體還沒進客戶端：iOS 倉庫裡沒有對話模型，也沒有生成式模型、語音辨識或本機推論服務，因此本站不把它算作已發布能力。隨包釋出的那份權重只做目標偵測。",
  es: "El asistente en sí todavía no está en el cliente: el repositorio de iOS no tiene ni modelo de diálogo ni modelo generativo, ni reconocimiento de voz ni servidor local de inferencia, así que este portal no lo cuenta como entregado. Los pesos que se incluyen solo detectan objetos.",
  pl: "Sam asystent jeszcze nie jest w kliencie: repozytorium iOS nie ma modelu dialogowego ani generatywnego, ani rozpoznawania mowy, ani lokalnego serwera wnioskowania, więc ten portal nie liczy tego jako wydanego. Dostarczone wagi tylko wykrywają obiekty.",
  ja: "アシスタント本体はまだクライアントに入っていません。iOS リポジトリには対話モデルも生成モデルもなく、音声認識もローカル推論サーバもなく、このポータルでは出荷済みとして数えていません。同梱されている重みは物体の検出専用品です。",
  th: "ตัวผู้ช่วยยังไม่อยู่ในไคลเอนต์: ในรีโปของ iOS ไม่มีทั้งโมเดลสนทนาและโมเดลสร้างเนื้อหา ไม่มีทั้งการรู้จำเสียงพูดและเซิร์ฟเวอร์เหตุผลในเครื่อง พอร์ทัลนี้จึงไม่นับว่าส่งมอบแล้ว ส่วนน้ำหนักที่ส่งมาทำได้อย่างเดียวคือตรวจพบวัตถุ",
  fi: "Itse avustaja ei ole vielä asiakassovelluksessa: iOS-arkistossa ei ole keskustelumallia eikä generatiivista mallia, ei puheentunnistusta eikä paikallista päättelypalvelinta, joten tämä portaali ei laske sitä toimitetuksi. Pakkauksen painot tekevät vain kohteiden tunnistusta.",
  uk: "Самого асистента в клієнті ще немає: у iOS-репозиторії немає ані діалогової, ані генеративної моделі, ані розпізнавання мови, ані локального сервера виведення, тому портал не рахує це випущеним. Ваги, що постачаються, лише виявляють об’єкти.",
  bg: "Самият асистент още го няма в клиента: в iOS хранилището няма нито диалогов, нито генеративен модел, нито разпознаване на реч, нито локален сървър за изводи, затова порталът не го брои за доставен. Теглата в пакета само засичат обекти.",
  tr: "Asistanın kendisi henüz istemcide yok: iOS deposunda ne bir sohbet ne de üretken model, ne konuşma tanıma ne de yerel çıkarım sunucusu var; bu yüzden portal onu yayınlanmış saymıyor. Pakette gelen ağırlıklar yalnızca nesne algılıyor.",
  hu: "Magát az asszisztenst még nem tartalmazza az ügyfél: az iOS-tárolóban nincs párbeszédmodell és nincs generatív modell, nincs beszédfelismerés és nincs helyi következtetésszerver sem, ezért a portál nem tekinti kiszállítottnak. A csomagban érkező súlyok csak tárgyak észlelésére valók.",
};

const L2_DESC: Localized<string> = {
  en: "The layer you host yourself: create agents in Bot Studio, configure them, and let several roles run apart from each other.",
  ru: "Уровень, который размещаете сами: агентов создаёте в Bot Studio, настраиваете, и несколько ролей работают изолированно.",
  de: "Die Ebene, die Sie selbst betreiben: Agenten in Bot Studio anlegen, konfigurieren und mehrere Rollen getrennt voneinander laufen lassen.",
  fr: "Le niveau que vous hébergez vous-même : créer les agents dans Bot Studio, les configurer et faire tourner plusieurs rôles isolés les uns des autres.",
  it: "Il livello che ospiti tu stesso: crei gli agenti in Bot Studio, li configuri e fai girare più ruoli separati tra loro.",
  nl: "De laag die je zelf host: agents aanmaken in Bot Studio, configureren en meerdere rollen geïsoleerd van elkaar laten draaien.",
  cs: "Úroveň, kterou hostujete sami: agenty vytvoříte v Bot Studio, nastavíte je a necháte několik rolí běžet odděleně.",
  "zh-Hans": "你自己托管的一层：在 Bot Studio 里创建智能体、配置它们，并让多个角色彼此隔离地跑起来。",
  "zh-Hant": "你自己託管的一層：在 Bot Studio 裡建立智能體、設定它們，並讓多個角色彼此隔離地跑起來。",
  es: "La capa que aloja usted mismo: crea los agentes en Bot Studio, los configura y deja que varios roles corran aislados entre sí.",
  pl: "Warstwa, którą hostujecie sami: tworzycie agenty w Bot Studio, konfigurujecie je i pozwalacie kilku rolom działać w izolacji.",
  ja: "自分がホストする層。Bot Studio でエージェントを作り、設定し、複数の役割を互いに隔離して動かします。",
  th: "ชั้นที่คุณโฮสต์เอง: สร้างเอเจนต์ใน Bot Studio ตั้งค่า แล้วให้หลายบทบาททำงานแยกกันโดยไม่ปนกัน",
  fi: "Kerroksen, jota ylläpidät itse: teet agentit Bot Studiossa, määrität ne ja annat useiden roolien pyöriä erillään toisistaan.",
  uk: "Рівень, який ви розміщуєте самі: агентів створюєте в Bot Studio, налаштовуєте, і кілька ролей працюють ізольовано.",
  bg: "Слоятът, който сами хоствате: създавате агентите в Bot Studio, настройвате ги и карате няколко роли да работят разделено.",
  tr: "Kendi barındırdığınız katman: ajanları Bot Studio’da oluşturur, yapılandırır ve birden çok rolün birbirinden ayrı çalışmasını sağlarsınız.",
  hu: "A réteg, amelyet magán hostolsz: az ügynököket a Bot Studioában hozod létre, állítod be, és több szerepkör fut elkülönítve.",
};

const L2_DONE: Localized<string> = {
  en: "Live: the Bot Studio portal and its engine repository are both public, one process supervises any number of popopx-cli instances, the console binds 127.0.0.1:8090 by default and the bot control ports never leave loopback.",
  ru: "Работает: портал Bot Studio и репозиторий движка опубликованы, один процесс ведёт произвольное число экземпляров popopx-cli, консоль типово привязана к 127.0.0.1:8090, а порты управления ботами не выходят за пределы локальной петли.",
  de: "Verfügbar: Bot-Studio-Portal und Engine-Repository sind offen, ein Prozess beaufsichtigt beliebig viele popopx-cli-Instanzen, die Konsole bindet standardmäßig 127.0.0.1:8090, und die Bot-Steuerports verlassen nie das Loopback.",
  fr: "Disponible : le portail Bot Studio et le dépôt du moteur sont publics, un seul processus supervise un nombre illimité d’instances de popopx-cli, la console se lie par défaut à 127.0.0.1:8090 et les ports de contrôle des bots ne sortent jamais de la boucle locale.",
  it: "Disponibile: il portale di Bot Studio e il repository del motore sono pubblici, un solo processo supervisiona qualsiasi numero di istanze di popopx-cli, la console si lega per default a 127.0.0.1:8090 e le porte di controllo dei bot non escono mai dal loopback.",
  nl: "Beschikbaar: de portal van Bot Studio en de engine-repo zijn openbaar, één proces beheert een willekeurig aantal instanties van popopx-cli, de console bindt standaard 127.0.0.1:8090 en de bot-poorten verlaten nooit de loopback.",
  cs: "K dispozici: portál Bot Studio i repozitář enginu jsou veřejné, jeden proces dohlíží na libovolný počet instancí popopx-cli, konzole se výchoze váže na 127.0.0.1:8090 a řídicí porty botů nikdy neopustí loopback.",
  "zh-Hans": "已可用：Bot Studio 门户与引擎仓库都已公开，一个进程托管任意多个 popopx-cli 实例，控制台默认只绑 127.0.0.1:8090，bot 控制端口从不对外开放。",
  "zh-Hant": "已可用：Bot Studio 入口網站與引擎倉庫都已公開，一個程序託管任意多個 popopx-cli 實例，控制台預設僅綁 127.0.0.1:8090，bot 控制埠從不對外開放。",
  es: "Disponible: el portal de Bot Studio y el repositorio del motor son públicos, un solo proceso supervisa cualquier número de instancias de popopx-cli, la consola se enlaza por defecto a 127.0.0.1:8090 y los puertos de control de bots nunca salen del loopback.",
  pl: "Dostępne: portal Bot Studio i repozytorium silnika są publiczne, jeden proces nadzoruje dowolną liczbę instancji popopx-cli, konsola domyślnie wiąże się z 127.0.0.1:8090, a porty sterowania botów nigdy nie wychodzą poza loopback.",
  ja: "利用可能：Bot Studio のポータルもエンジンリポジトリも公開済みで、1 つのプロセスが任意数の popopx-cli インスタンスを束ね、コンソールは既定で 127.0.0.1:8090 にだけバインドし、ボットの制御ポートをループバックの外に公開しません。",
  th: "ใช้งานได้: พอร์ทัลของ Bot Studio และรีโปเอนจินเผยแพร่แล้ว กระบวนการเดียวดูแลอินสแตนซ์ popopx-cli ได้ทุกจำนวน คอนโซลผูกกับ 127.0.0.1:8090 เป็นค่าเริ่มต้น และพอร์ตควบคุมบอตไม่เคยออกไปนอกช่วงลูปแบ็ก",
  fi: "Käytettävissä: Bot Studion portaali ja moottorin arkisto ovat julkisia, yksi prosessi valvoo mitä tahansa määrää popopx-cli-instansseja, konsoli sitoutuu oletuksena vain osoitteeseen 127.0.0.1:8090, eikä bottien ohjausportteja julkisteta loopbackin ulkopuolelle.",
  uk: "Доступно: портал Bot Studio і репозиторій рушія опубліковані, один процес супроводжує будь-яку кількість екземплярів popopx-cli, консоль типово прив’язана до 127.0.0.1:8090, а порти керування ботами не виходять за межі локальної петлі.",
  bg: "Налично: порталът на Bot Studio и хранилището на двигателя са публични, един процес надзирава произволен брой инстанции на popopx-cli, конзолата по подразбиране е обвързана с 127.0.0.1:8090, а портовете за управление на ботове никога не излизат от локалната обратна петля.",
  tr: "Kullanıma hazır: Bot Studio portalı da motor deposu da açık, tek süreç istediğiniz sayıda popopx-cli örneğini denetler, konsol varsayılan olarak yalnızca 127.0.0.1:8090’a bağlanır ve bot denetim portları loopback dışına asla çıkmaz.",
  hu: "Elérhető: a Bot Studio portálja és a motor tárolója is nyilvános, egyetlen folyamat tetszőleges számú popopx-cli példányt felügyel, a konzol alapértelmezés szerint csak a 127.0.0.1:8090 címet köti be, a bot vezérlő portjai pedig soha nem lépnek ki a loopbackből.",
};

const L2_NEXT: Localized<string> = {
  en: "Evolving: the layer that would let several agents hand work to one another is not implemented; today bot conversations ride the SMP network while Studio drives its own popopx-cli.",
  ru: "Развивается: слой, который позволял бы агентам передавать задачи друг другу, не реализован; сегодня беседы с ботами идут по сети SMP, а Studio запускает собственный popopx-cli.",
  de: "In Entwicklung: die Schicht, in der mehrere Agenten sich Arbeit zuspielen, ist nicht implementiert; heute laufen Bot-Unterhaltungen über das Netzwerk SMP, während Studio sein eigenes popopx-cli treibt.",
  fr: "En évolution : la couche qui ferait se transmettre le travail entre plusieurs agents n’est pas implémentée ; aujourd’hui les conversations de bots passent par le réseau SMP tandis que Studio pilote son propre popopx-cli.",
  it: "In evoluzione: il livello che farebbe passare lavoro tra più agenti non è implementato; oggi le conversazioni dei bot viaggiano sulla rete SMP mentre Studio pilota il proprio popopx-cli.",
  nl: "In ontwikkeling: de laag waarbij agents werk aan elkaar doorgeven is niet geïmplementeerd; vandaag lopen botgesprekken over het netwerk SMP terwijl Studio zijn eigen popopx-cli aanstuurt.",
  cs: "Ve vývoji: vrstva, v níž by si agenti předávali úkoly, není implementována; dnes konverzace botů jedou přes síť SMP a Bot Studio pohání svůj vlastní popopx-cli.",
  "zh-Hans": "演进中：让多个智能体互相派活的编排层还没有实现。今天 bot 会话走 SMP 网络，Studio 驱动的是它自己的 popopx-cli，两边互不内嵌。",
  "zh-Hant": "演進中：讓多個智能體互相派活的編排層還沒有實作。今天 bot 會話走 SMP 網路，Studio 驅動的是它自己的 popopx-cli，兩邊互不內嵌。",
  es: "En evolución: la capa que haría que varios agentes se pasen trabajo no está implementada; hoy las conversaciones de bots circulan por la red SMP mientras Studio maneja su propio popopx-cli.",
  pl: "W rozwoju: warstwa, w której agenty przekazywaliby sobie zadania, nie jest zaimplementowana; dziś rozmowy z botami jadą siecią SMP, a Studio napędza własne popopx-cli.",
  ja: "進化中：複数のエージェントが仕事を回し合うオーケストレーション層はまだ実装されていません。いまボットの会話は SMP ネットワークを流れ、Studio は自分専用の popopx-cli を動かします。",
  th: "กำลังพัฒนา: ชั้นที่ให้เอเจนต์หลายตัวส่งต่องานกันยังไม่มีจริง ทุกวันนี้การสนทนาของบอตวิ่งบนเครือข่าย SMP ส่วน Studio ก็ขับ popopx-cli ของมันเอง",
  fi: "Kehitysvaiheessa: kerrosta, jossa useampi agentti siirtäisi töitä toiselleen, ei ole toteutettu; tänä päivänä bottikeskustelut kulkevat SMP-verkon yli ja Bot Studio ajaa omaa popopx-cli-instanssiaan.",
  uk: "Розвивається: шар, у якому агенти передавали б задачі одні одним, не реалізований; сьогодні розмови з ботами йдуть мережею SMP, а Bot Studio запускає власний popopx-cli.",
  bg: "В развитие: слой, при който няколко агента си подават задачи, не е реализиран; днес разговори с ботове минават през мрежата на SMP, а Bot Studio задвижва собствения си popopx-cli.",
  tr: "Gelişiyor: birden çok ajanın işi birbirine devrettiği katman henüz uygulanmadı; bugün bot sohbetleri SMP ağı üzerinden gider, Studio kendi popopx-cli’ını çalıştırır.",
  hu: "Fejlesztés alatt: a réteg, ahol több ügynök adna át munkát egymásnak, nincs megvalósítva; ma a bot beszélgetések az SMP hálózaton mennek, a Bot Studio pedig a saját popopx-cli példányát hajtja.",
};

const L3_DESC: Localized<string> = {
  en: "The outward-facing layer: through Service Suite and Mac Node an agent reaches external tools, services and your own hardware.",
  ru: "Уровень наружу: через Service Suite и Mac Node агент дотягивается до внешних инструментов, сервисов и вашего собственного оборудования.",
  de: "Die nach außen gerichtete Ebene: Über Service Suite und Mac Node erreicht ein Agent externe Werkzeuge, Dienste und die eigene Hardware.",
  fr: "Le niveau tourné vers l’extérieur : par Service Suite et Mac Node, un agent atteint les outils externes, les services et votre propre matériel.",
  it: "Il livello rivolto all’esterno: tramite Service Suite e Mac Node un agente raggiunge strumenti esterni, servizi e il tuo hardware.",
  nl: "De naar buiten gerichte laag: via Service Suite en Mac Node bereikt een agent externe tools, diensten en je eigen hardware.",
  cs: "Venkovní úroveň: přes Service Suite a Mac Node se agent dostane k externím nástrojům, službám a vašemu vlastnímu hardwaru.",
  "zh-Hans": "向外连接的一层：经由 Service Suite 与 Mac Node，让智能体安全地连上外部工具、服务和你自己的设备。",
  "zh-Hant": "向外連結的一層：經由 Service Suite 與 Mac Node，讓智能體安全地連上外部工具、服務與你自己的裝置。",
  es: "La capa hacia afuera: a través de Service Suite y Mac Node un agente llega a herramientas externas, servicios y su propio hardware.",
  pl: "Warstwa zwrócona na zewnątrz: przez Service Suite i Mac Node agent sięga po zewnętrzne narzędzia, usługi i wasz własny sprzęt.",
  ja: "外へつながる層。Service Suite と Mac Node 経由で、エージェントは外部のツールやサービス、そして自分のハードに届きます。",
  th: "ชั้นที่หันออกข้างนอก: ผ่าน Service Suite และ Mac Node เอเจนต์จะไปยังเครื่องมือ บริการภายนอก และฮาร์ดแวร์ของคุณเองได้",
  fi: "Ulospäin suuntautuva kerros: Service Suiten ja Mac Noden kautta agentti yltää ulkoisiin työkaluihin, palveluihin ja omaan laitteistoon.",
  uk: "Рівень назовні: через Service Suite і Mac Node агент дістає до зовнішніх інструментів, сервісів і власного обладнання.",
  bg: "Слоятът навън: през Service Suite и Mac Node агент стига до външни инструменти, услуги и собствения ти хардуер.",
  tr: "Dışa dönük katman: Service Suite ve Mac Node üzerinden bir ajan harici araçlara, hizmetlere ve kendi donanımınıza ulaşır.",
  hu: "A kifelé forduló réteg: a Service Suite és a Mac Node révén egy ügynök külső eszközöket, szolgáltatásokat és a saját hardveret éri el.",
};

const L3_DONE: Localized<string> = {
  en: "Live: service-account chats, the two-level menu, the zero-knowledge channel envelope and H5 authorisation; Mac Node runs Ollama, the Qwen weights and the LTX-2.5 MLX plus FFmpeg pipeline on the machine itself, its console bound to loopback by construction.",
  ru: "Работает: переписка с сервисными аккаунтами, двухуровневое меню, конверт канала с ротацией ключей с нулевым знанием и H5-авторизация; Mac Node запускает Ollama, веса Qwen и конвейер LTX-2.5 MLX с FFmpeg на самой машине, его консоль по построению привязана к локальной петле.",
  de: "Verfügbar: Unterhaltungen mit Dienstkonten, das Menü mit zwei Ebenen, der Kanalumschlag mit Zero-Knowledge-Schlüsselrotation und die H5-Autorisierung; Mac Node führt Ollama, die Qwen-Gewichte und die Kette aus LTX-2.5 MLX und FFmpeg auf dem Rechner selbst aus, die Konsole ist konstruktionsbedingt an Loopback gebunden.",
  fr: "Disponible : les comptes de service, le menu à deux niveaux, l’enveloppe de canal à rotation de clés à connaissance nulle et l’autorisation H5 ; Mac Node exécute Ollama, les poids Qwen et le pipeline LTX-2.5 MLX avec FFmpeg sur la machine elle-même, sa console étant liée au bouclage par construction.",
  it: "Disponibile: le conversazioni degli account di servizio, il menu a due livelli, la busta del canale con rotazione a conoscenza zero e l’autorizzazione H5; Mac Node esegue Ollama, i pesi Qwen e la catena LTX-2.5 MLX con FFmpeg sulla macchina stessa, con la console legata al loopback per costruzione.",
  nl: "Beschikbaar: gesprekken met dienstaccounts, het menu met twee niveaus, de kanaalomslag met zero-knowledge-sleutelrotatie en de H5-autorisatie; Mac Node draait Ollama, de Qwen-gewichten en de LTX-2.5 MLX-pijplijn met FFmpeg op de machine zelf, en de console is per constructie aan loopback gebonden.",
  cs: "K dispozici: konverzace se servisními účty, dvouúrovňové menu, obálka kanálu s rotací klíčů s nulovou znalostí a autorizace H5; Mac Node pouští Ollama, váhy Qwen a řetězec LTX-2.5 MLX s FFmpeg přímo na stroji a jeho konzole je konstrukčně vázaná na loopback.",
  "zh-Hans": "已可用：服务号会话、两级菜单、带零知识密钥轮换的频道信封与 H5 授权；Mac Node 在本机跑 Ollama、Qwen 权重与 LTX-2.5 MLX 加 FFmpeg 的媒体流水线，它的控制台从构造上只绑回环。",
  "zh-Hant": "已可用：服務號會話、兩級選單、具零知識金鑰輪換的頻道信封與 H5 授權；Mac Node 在本機執行 Ollama、Qwen 權重與 LTX-2.5 MLX 加 FFmpeg 的多媒體管線，它的控制台從構造上僅綁回環。",
  es: "Disponible: las conversaciones de cuentas de servicio, el menú de dos niveles, el sobre de canal con rotación de claves de conocimiento cero y la autorización H5; Mac Node ejecuta Ollama, los pesos de Qwen y la cadena LTX-2.5 MLX con FFmpeg en la propia máquina, con su consola ligada a loopback por construcción.",
  pl: "Dostępne: konwersacje kont serwisowych, dwupoziomowe menu, koperta kanału z rotacją kluczy o zerowej wiedzy i autoryzacja H5; Mac Node uruchamia Ollama, wagi Qwen oraz potok LTX-2.5 MLX z FFmpeg na własnym urządzeniu, a konsola jest z konstrukcji przypisana do loopbacka.",
  ja: "利用可能：サービスアカウントの会話、2 階層のメニュー、ゼロ知識の鍵ローテーション付きチャンネル封筒と H5 認可——Mac Node は自分のマシン上で Ollama、Qwen の重み、LTX-2.5 MLX と FFmpeg のパイプラインを動かし、コンソールは構造上ループバックしかバインドしません。",
  th: "ใช้งานได้: แชทบัญชีบริการ เมนูสองระดับ ซองแชนเนลแบบศูนย์ความรู้พร้อมการหมุนคีย์ และการอนุญาต H5; Mac Node รัน Ollama น้ำหนักของ Qwen และไปป์ไลน์ LTX-2.5 MLX ร่วมกับ FFmpeg บนเครื่องนั้นเอง โดยคอนโซลผูกกับลูปแบ็กมาตั้งแต่โครงสร้าง",
  fi: "Käytettävissä: palvelutilien keskustelut, kaksitasoinen valikko, nollatiedon kanavien kirjekuori avaimenkierrolla ja H5-valtuutus; Mac Node ajaa Ollaman, Qwenin mallipainot sekä LTX-2.5 MLX:n ja FFmpegin putken omalla koneellaan, ja konsoli on rakenteestaan asti sidottu loopbackiin.",
  uk: "Доступно: розмови з сервісними акаунтами, дворівневе меню, конверт каналу з ротацією ключів із нульовим знанням та H5-авторизація; Mac Node запускає Ollama, ваги Qwen і конвеєр LTX-2.5 MLX разом із FFmpeg на самій машині, а консоль за конструкцією прив’язана до локальної петлі.",
  bg: "Налично: разговори със сервисните акаунти, менюто на две нива, пликът на канала с ротация на ключовете с нулево знание и H5 удостоверяването; Mac Node стартира Ollama, теглата на Qwen и веригата LTX-2.5 MLX с FFmpeg на самата машина, а конзолата му по построение е обвързана с локалната обратна петля.",
  tr: "Kullanıma hazır: hizmet hesabı sohbetleri, iki düzeyli menü, sıfır bilgi anahtar rotasyonlu kanal zarfı ve H5 yetkilendirmesi; Mac Node, Ollama’yı, Qwen ağırlıklarını ve LTX-2.5 MLX ile FFmpeg hattını doğrudan o makinede çalıştırır; konsolu yapı gereği loopback’e bağlıdır.",
  hu: "Elérhető: a szolgáltatási fiókos beszélgetések, a két szintű menü, a nullaismeretű kulcsrotációval ellátott csatornaboríték és a H5 engedélyezés; a Mac Node a saját gépén futtatja az Ollamát, a Qwen súlyait és az LTX-2.5 MLX és FFmpeg folyamatot, a konzol pedig eleve a loopbackre van kötve.",
};

const L3_NEXT: Localized<string> = {
  en: "Evolving: no cross-component scheduling call exists anywhere in the four repositories. Today the pieces are linked, not wired together.",
  ru: "Развивается: вызова автоматического планирования между компонентами нет ни в одном из четырёх репозиториев. Сегодня они связаны ссылками, а не проводами.",
  de: "In Entwicklung: ein Aufruf produktübergreifender Automatisierung existiert in den vier Repositories nirgends. Heute sind die Teile verlinkt, nicht verdrahtet.",
  fr: "En évolution : aucun appel d’ordonnancement entre composants n’existe dans les quatre dépôts. Aujourd’hui ils sont liés par des liens, pas câblés entre eux.",
  it: "In evoluzione: nelle quattro repository non esiste alcuna chiamata di scheduling fra i componenti. Oggi sono collegati dai link, non cablati tra loro.",
  nl: "In ontwikkeling: in geen van de vier repos bestaat een call voor automatische planning tussen de onderdelen. Vandaag zijn ze gelinkt, niet bedraad.",
  cs: "Ve vývoji: ve čtyřech repozitářích neexistuje jediné volání automatického plánování napříč komponentami. Dnes jsou propojeny odkazy, ne dráty.",
  "zh-Hans": "演进中：跨组件的自动调度还没有——四个仓库里找不到任何一处调用。今天它们之间只有链接，没有接线。",
  "zh-Hant": "演進中：跨元件的自動排程還沒有——四個倉庫裡找不到任何一處呼叫。今天它們之間只有連結，沒有接線。",
  es: "En evolución: en los cuatro repositorios no existe ni una sola llamada de programación automática entre componentes. Hoy están enlazados, no cableados entre sí.",
  pl: "W rozwoju: w czterech repozytoriach nie ma ani jednego wywołania automatycznego planowania między komponentami. Dziś łączą je odsyłacze, nie przewody.",
  ja: "進化中：コンポーネントをまたぐ自動スケジューリングの呼び出しは、4 つのリポジトリのどこにも存在しません。いま結ばれているのはリンクであって、配線ではありません。",
  th: "กำลังพัฒนา: ไม่พบการเรียกวางกำหนดงานข้ามส่วนประกอบในรีโปทั้งสี่แห่งเลย สิ่งที่เชื่อมถึงกันทุกวันนี้คือลิงก์ ไม่ใช่สายที่เดินถึงกัน",
  fi: "Kehitysvaiheessa: neljästä arkistosta ei löydy yhtään komponenttien välistä automaattista ajoituskutsua. Tänä päivänä ne on linkitetty, ei johdotettu.",
  uk: "Розвивається: виклику автоматичного планування між компонентами немає в жодному з чотирьох репозиторіїв. Сьогодні вони поєднані посиланнями, а не проводами.",
  bg: "В развитие: и в четирите хранилища няма нито едно извикване за автоматично планиране между компонентите. Днес те са свързани с препратки, а не с кабели.",
  tr: "Gelişiyor: dört deponun hiçbirinde bileşenler arası otomatik zamanlama çağrısı yok. Bugün aralarındaki şey link, kablolanmış bir devre değil.",
  hu: "Fejlesztés alatt: a négy tárolóban egyetlen komponensek közti automatikus ütemezési hívás sincs. Ma link köti össze őket, nem vezeték.",
};

/**
 * The two status words are exported so `UserScenariosGrid` prints the same pair
 * instead of authoring a second one — the same reason `PortalCards` imports the
 * footer blurbs rather than paraphrasing them.
 */
export const STATUS_AVAILABLE: Localized<string> = {
  en: "Available",
  ru: "Доступно",
  de: "Verfügbar",
  fr: "Disponible",
  it: "Disponibile",
  nl: "Beschikbaar",
  cs: "K dispozici",
  "zh-Hans": "已可用",
  "zh-Hant": "已可用",
  es: "Disponible",
  pl: "Dostępne",
  ja: "利用可能",
  th: "ใช้งานได้",
  fi: "Käytettävissä",
  uk: "Доступно",
  bg: "Налично",
  tr: "Kullanıma hazır",
  hu: "Elérhető",
};

export const STATUS_EVOLVING: Localized<string> = {
  en: "Evolving",
  ru: "Развивается",
  de: "In Entwicklung",
  fr: "En évolution",
  it: "In evoluzione",
  nl: "In ontwikkeling",
  cs: "Ve vývoji",
  "zh-Hans": "演进中",
  "zh-Hant": "演進中",
  es: "En evolución",
  pl: "W rozwoju",
  ja: "進化中",
  th: "กำลังพัฒนา",
  fi: "Kehitysvaiheessa",
  uk: "Розвивається",
  bg: "В развитие",
  tr: "Gelişiyor",
  hu: "Fejlesztés alatt",
};

const FOOT: Localized<string> = {
  en: "These three layers describe capability; the six-layer diagram on /ecosystem/ describes the same system as engineering. Every line here is either in a repository or it is labelled Evolving — and the Agent protocol status says the same thing: the SMP Agent Protocol has a Version 7 specification and a server-side implementation, PAP has zero.",
  ru: "Эти три уровня — про возможности; шестислойная схема на /ecosystem/ — про инженерию той же системы. Каждая строка здесь либо есть в репозитории, либо помечена «Развивается» — и статус Agent-протокола говорит то же самое: у SMP Agent Protocol есть спецификация Version 7 и серверная реализация, у PAP реализаций ноль.",
  de: "Diese drei Ebenen beschreiben Fähigkeiten; das Diagramm mit sechs Ebenen auf /ecosystem/ beschreibt dieselbe Systemtechnik. Jede Zeile hier ist entweder in einem Repository vorhanden oder als „In Entwicklung“ gekennzeichnet — und der Agent-Protokollstatus sagt dasselbe: Das SMP Agent Protocol hat eine Version-7-Spezifikation und eine serverseitige Implementierung, PAP hat keine.",
  fr: "Ces trois niveaux parlent de capacité ; le schéma à six niveaux sur /ecosystem/ parle d’ingénierie du même système. Chaque ligne ici est soit dans un dépôt, soit marquée « En évolution » — et le statut du protocole Agent dit la même chose : le SMP Agent Protocol a une spécification Version 7 et une implémentation serveur, PAP en a zéro.",
  it: "Questi tre livelli parlano di capacità; lo schema a sei livelli su /ecosystem/ parla di ingegneria dello stesso sistema. Ogni riga qui è o in un repository o etichettata «In evoluzione» — e lo stato del protocollo Agent dice lo stesso: il SMP Agent Protocol ha una specifica Version 7 e un’implementazione server-side, PAP ne ha zero.",
  nl: "Deze drie lagen gaan over vermogen; het diagram met zes lagen op /ecosystem/ gaat over engineering van hetzelfde systeem. Elke regel hier staat in een repo of is gemarkeerd als «In ontwikkeling» — en de Agent-protocolstatus zegt hetzelfde: het SMP Agent Protocol heeft een Version 7-specificatie en een server-side implementatie, PAP heeft nul.",
  cs: "Tyto tři úrovně mluví o schopnostech; šestiúrovňové schéma na /ecosystem/ mluví o inženýrství téhož systému. Každý řádek tady buď v repozitáři je, nebo je označen «Ve vývoji» — a stav Agent protokolu říká totéž: SMP Agent má specifikaci Version 7 a serverovou implementaci, PAP nula.",
  "zh-Hans": "这三层讲的是能力，/ecosystem/ 的六层图讲的是同一套系统的工程分层。这里的每一句要么指得出仓库里的实现，要么就标着「演进中」——与 Agent 协议状态同一口径：SMP Agent 协议已有 Version 7 规范与服务端实现，PAP 目前零实现。",
  "zh-Hant": "這三層講的是能力，/ecosystem/ 的六層圖講的是同一套系統的工程分層。這裡的每一句都或者指得出倉庫裡的實作，或者就標著「演進中」——與 Agent 協定狀態同一口徑：SMP Agent 協定已有 Version 7 規範與服務端實作，PAP 目前零實作。",
  es: "Estas tres capas hablan de capacidad; el diagrama de seis capas en /ecosystem/ habla de ingeniería del mismo sistema. Cada línea aquí está en un repositorio o está marcada «En evolución» — y el estado del protocolo Agent dice lo mismo: el SMP Agent Protocol tiene una especificación Version 7 y una implementación del lado del servidor; PAP tiene cero.",
  pl: "Te trzy warstwy mówią o zdolnościach; schemat sześciu warstw na /ecosystem/ mówi inżynieryjnie o tym samym systemie. Każda linia tutaj albo jest w repozytorium, albo jest oznaczona «W rozwoju» — a status protokołu Agent mówi to samo: SMP Agent Protocol ma specyfikację Version 7 i implementację serwerową, PAP nie ma żadnej.",
  ja: "この 3 つの層は能力の話、/ecosystem/ の 6 層図は同じシステムを工学の言い方で書いたものです。ここの各行は、リポジトリにあるか「進化中」と標されたかのどちらかで、Agent プロトコルの状態も同じことを言っています：SMP Agent プロトコルには Version 7 の仕様とサーバー側実装がありますが、PAP の実装は 0 件です。",
  th: "สามชั้นนี้พูดเรื่องความสามารถ ส่วนแผนภาพหกชั้นบน /ecosystem/ พูดเรื่องวิศวกรรมของระบบเดียวกัน ทุกบรรทัดที่นี่มีอยู่แค่สองสถานะ คือมีโค้ดอยู่ในรีโปแล้ว หรือติดป้ายว่ากำลังพัฒนา และสถานะโปรโตคอล Agent ก็พูดอย่างเดียวกัน: SMP Agent Protocol มีข้อกำหนด Version 7 และการดำเนินการฝั่งเซิร์ฟเวอร์ ส่วน PAP ไม่มีการดำเนินการเลย",
  fi: "Nämä kolme kerrosta puhuvat kyvyistä; /ecosystem/ kuusikerroksinen kaavio puhuu saman järjestelmän rakenteesta. Jokainen rivi täällä on joko arkistossa tai merkitty «Kehitysvaiheessa» — ja Agent-protokollan tila sanoo saman: SMP Agent Protocolilla on Version 7 -määrittely ja palvelinpuolen toteutus, PAPilla toteutuksia on nolla.",
  uk: "Ці три рівні — про можливості; шестислойна схема на /ecosystem/ — про інженерію тієї ж системи. Кожен рядок тут або є в репозиторії, або позначений «Розвивається» — і статус Agent-протоколу каже те саме: у SMP Agent Protocol є специфікація Version 7 і серверна реалізація, у PAP реалізацій нуль.",
  bg: "Тези три нива говорят за възможности; шестослойната схема на /ecosystem/ говори за инженерството на същата система. Всеки ред тук или е в хранилище, или е маркиран «В развитие» — и статусът на Agent протокола казва същото: SMP Agent Protocol има спецификация Version 7 и сървърна реализация, PAP няма нито една.",
  tr: "Bu üç katman yetenekten söz eder; /ecosystem/ üzerindeki altı katmanlı şema aynı sistemin mühendisliğinden söz eder. Buradaki her satır ya bir depoda vardır ya da «Gelişiyor» diye etiketlenmiştir — ve Agent protokol durumu da aynı şeyi söyler: SMP Ajan Protokolü’nün bir Version 7 spesifikasyonu ve sunucu tarafı uygulaması var, PAP’ın yok.",
  hu: "Ez a három réteg képességről beszél; az /ecosystem/ hatréteges ábrája ugyanannak a rendszernek a műszaki felépítéséről. Itt minden sor vagy benne van egy tárolóban, vagy «Fejlesztés alatt» feliratú — és az Agent-protokoll állása is ugyanezt mondja: az SMP Agent protokollnak van Version 7 specifikációja és szerver oldali megvalósítása, a PAPnak nincs.",
};

type Layer = {
  /** Locale-free layer name, matching the panorama and portal cards. */
  name: string;
  tone: Tone;
  desc: Localized<string>;
  done: Localized<string>;
  next: Localized<string>;
};

const LAYERS: readonly Layer[] = [
  { name: "Personal AI", tone: "brand", desc: L1_DESC, done: L1_DONE, next: L1_NEXT },
  { name: "AI Agents", tone: "mesh", desc: L2_DESC, done: L2_DONE, next: L2_NEXT },
  { name: "AI Connection", tone: "warn", desc: L3_DESC, done: L3_DONE, next: L3_NEXT },
];

export function AiThreeLayers(): ReactElement {
  const sectionLabel = useCopy(TITLE);
  const note = useCopy(FOOT);

  return (
    <section id="ai-layers" aria-label={sectionLabel} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} />
        <ol className="mt-9 grid grid-cols-[minmax(0,1fr)] items-stretch gap-3 md:grid-cols-3">
          {LAYERS.map((layer, index) => (
            <LayerCard key={layer.name} layer={layer} index={index} />
          ))}
        </ol>
        <p className="mt-5 min-w-0 break-words text-[12.5px] leading-relaxed text-faint">{note}</p>
      </div>
    </section>
  );
}

function LayerCard({ layer, index }: { layer: Layer; index: number }): ReactElement {
  const desc = useCopy(layer.desc);
  const tone = TONES[layer.tone];

  return (
    <li className="flex min-w-0">
      <article
        className={`glass glass-hover flex h-full min-w-0 flex-1 flex-col border p-5 ${tone.ring}`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 break-words text-[16px] font-semibold tracking-tight text-white">
            {layer.name}
          </h3>
          <span className="chip shrink-0 font-mono text-[10.5px] text-faint">{`0${index + 1}`}</span>
        </div>
        <p className="mt-3 min-w-0 break-words text-[13.5px] leading-relaxed text-mute">{desc}</p>
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 border-t border-hair pt-4">
          <StateRow tone="mesh" label={STATUS_AVAILABLE} text={layer.done} />
          <StateRow tone="warn" label={STATUS_EVOLVING} text={layer.next} />
        </div>
      </article>
    </li>
  );
}

/** One half of the honest split: a pill, a dot, and the sentence that belongs to it. */
function StateRow({
  tone,
  label,
  text,
}: {
  tone: "mesh" | "warn";
  label: Localized<string>;
  text: Localized<string>;
}): ReactElement {
  const value = useCopy(label);
  const body = useCopy(text);

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <StatusDot tone={tone} pulse={false} />
        <span className={`chip ${tone === "mesh" ? "text-mesh-soft" : "text-warn-soft"}`}>
          {value}
        </span>
      </div>
      <p className="mt-2 min-w-0 break-words text-[12.5px] leading-relaxed text-faint">{body}</p>
    </div>
  );
}

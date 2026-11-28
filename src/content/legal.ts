/**
 * The two legal documents the App Store submission requires to be reachable on
 * this origin: `/privacy/` and `/terms/`.
 *
 * Source of truth: `AppStore-Submission/03-Privacy/privacy-policy.md` and
 * `AppStore-Submission/05-Legal-and-Compliance/terms-of-use.md` (the task brief
 * named them `Privacy-Policy.md` / `Terms-of-Service.md`; the files on disk use
 * the lower-case names). The English text below is the operative text; the
 * Chinese text is a translation published for convenience. The precedence
 * sentence in `languageNote` is the one clause that is not in the source files —
 * publishing two versions requires it.
 *
 * The status tags in the source documents (`[已从代码验证]`,
 * `[需产品或法务确认]`, `[尚未实现]`), the internal file paths and the
 * submission checklist are deliberately absent: they are review notes, not
 * policy text. The governing-law sentence of the Terms is also absent because
 * the source says to leave it blank until counsel decides and never to publish
 * a placeholder.
 *
 * Keys are `english` / `chinese` rather than locale tags on purpose: a literal
 * carrying two locale tags is a copy object to `tools/check-i18n.mjs`, and a
 * two-locale copy object is a hard error in a portal that speaks 21 languages.
 * These are documents, not interface copy; the interface around them stays in
 * the 21-locale system.
 */

import { IOS_REPO_URL, LICENSE_URL } from "@/lib/site";

export interface LocalText {
  english: string;
  chinese: string;
}

export type LegalBlock =
  | { kind: "p"; text: LocalText }
  | { kind: "ul"; english: string[]; chinese: string[] }
  | { kind: "defs"; items: { term: LocalText; detail: LocalText }[] };

export interface LegalSection {
  id: string;
  number: string;
  title: LocalText;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  eyebrow: string;
  title: LocalText;
  lead: LocalText;
  languageNote: LocalText;
  meta: {
    label: LocalText;
    value: LocalText;
    href?: string;
  }[];
  sections: LegalSection[];
}

const PRIVACY_SOURCE_URL = `${IOS_REPO_URL}/blob/master/PRIVACY.md`;

export const PRIVACY_DOC = {
  eyebrow: "LEGAL · PRIVACY",
  title: {
    english: "Privacy Policy",
    chinese: "隐私政策",
  },
  lead: {
    english:
      "POPOPX is built so that there is nothing to hand over. This policy states what the app and the POPOPX-operated relays do and do not collect; the repository's PRIVACY.md names the code or measurement behind each technical statement.",
    chinese:
      "POPOPX 的设计目标是：没有任何东西可以交出去。本政策说明 App 与 POPOPX 运营的中继收集什么、不收集什么；仓库中的 PRIVACY.md 为每条技术表述标注了对应的代码或测量。",
  },
  languageNote: {
    english:
      "Published in English and Simplified Chinese. If the two texts differ, the English text controls.",
    chinese:
      "本页以英文和简体中文发布；两种文本不一致时，以英文文本为准。",
  },
  meta: [
    {
      label: { english: "Effective", chinese: "生效日期" },
      value: { english: "2026-11-28", chinese: "2026-11-28" },
    },
    {
      label: { english: "Applies to", chinese: "适用范围" },
      value: {
        english:
          "POPOPX Chat for iOS, distributed by POPOPX, and the popopx.im relays the app presets.",
        chinese:
          "由 POPOPX 分发的 iOS 版 POPOPX Chat，以及 App 预置的 popopx.im 中继。",
      },
    },
    {
      label: { english: "Operator", chinese: "运营者" },
      value: {
        english: "POPOPX — the distributor of this build.",
        chinese: "POPOPX——本构建的分发者。",
      },
    },
    {
      label: { english: "Contact", chinese: "联系方式" },
      value: { english: "chat@popopx.chat", chinese: "chat@popopx.chat" },
      href: "mailto:chat@popopx.chat",
    },
    {
      label: { english: "Canonical source", chinese: "规范来源" },
      value: {
        english: "PRIVACY.md in the client repository.",
        chinese: "客户端仓库中的 PRIVACY.md。",
      },
      href: PRIVACY_SOURCE_URL,
    },
  ],
  sections: [
    {
      id: "what-we-never-collect",
      number: "1",
      title: {
        english: "What we never collect",
        chinese: "我们绝不收集什么",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english: "POPOPX is built so that there is nothing to hand over:",
            chinese: "POPOPX 的设计目标是：没有任何东西可以交出去。",
          },
        },
        {
          kind: "ul",
          english: [
            "No phone number, no email address, no name. There is no registration, sign-in or verification step.",
            "No global user ID. Your POPOPX address is a link to a queue on a relay; no directory maps people to identifiers.",
            "No contact list. The address book is never read: CNContactStore, ABAddressBook and NSContactsUsageDescription do not appear in the iOS target.",
            "No analytics, crash-reporting or advertising SDK. The complete SPM list is CodeScanner, SwiftyGif, lzstring-swift, WebRTC, Yams, ink and Elegant-Emoji-Picker; there is no Firebase, Sentry, Segment, Amplitude or equivalent, and there are no ATT/IDFA calls.",
            "No profile data on a server. Profiles and preferences live in the encrypted local database; a peer learns only what you send in a conversation.",
          ],
          chinese: [
            "不收集手机号、邮箱地址或姓名。没有注册、登录或验证步骤。",
            "没有全局用户 ID。你的 POPOPX 地址是某个中继上一条队列的链接；不存在把人与标识对应起来的目录。",
            "不读取通讯录。iOS target 中不出现 CNContactStore、ABAddressBook 与 NSContactsUsageDescription。",
            "没有分析、崩溃上报或广告 SDK。完整的 SPM 依赖是 CodeScanner、SwiftyGif、lzstring-swift、WebRTC、Yams、ink 与 Elegant-Emoji-Picker；没有 Firebase、Sentry、Segment、Amplitude 或同类组件，也没有 ATT/IDFA 调用。",
            "服务器上没有个人资料。资料与偏好保存在加密的本地数据库里；对方只能知道你在这段对话里主动发送的内容。",
          ],
        },
      ],
    },
    {
      id: "what-the-relays-know",
      number: "2",
      title: {
        english: "What the relays necessarily know",
        chinese: "中继必然知道什么",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english: "When you use a relay operated by POPOPX:",
            chinese: "当你使用 POPOPX 运营的中继时：",
          },
        },
        {
          kind: "ul",
          english: [
            "The IP address that dials it, unless you route through a SOCKS5 proxy or a .onion endpoint.",
            "Traffic metadata: which queues exist on the relay, when a queue is polled or written, the size of each encrypted message, and how many recipients a queue has. It cannot see message content, who the sender or recipient is, or which queues belong to the same person.",
            "Ciphertext, never plaintext. Message bodies are encrypted end to end before transmission. Queue persistence and retention are per-relay server settings; the client cannot attest to a specific deployment's settings from this repository.",
            "The relay cluster presets are smp1..8.popopx.im:5223, relay1.popopx.im:5227, xftp1/xftp6/xftp8.popopx.im:8443, ntf1..3.popopx.im:5226 and stun1.popopx.im:5349, all operated by POPOPX.",
          ],
          chinese: [
            "连接它的 IP 地址——除非你经由 SOCKS5 转发通道（proxy）或 .onion 端点。",
            "流量元数据：中继上存在哪些队列、队列何时被轮询或写入、每条加密消息的大小，以及一条队列有多少接收方。它看不到消息内容、发送者或接收者是谁，也无法判断哪些队列属于同一个人。",
            "只持有密文，从不持有明文。消息正文在传输前已端到端加密。队列的持久化与保留期由各中继的服务器配置决定；客户端无法从本仓库证明某一次具体部署的设置。",
            "App 预置的中继集群为 smp1..8.popopx.im:5223、relay1.popopx.im:5227、xftp1/xftp6/xftp8.popopx.im:8443、ntf1..3.popopx.im:5226 与 stun1.popopx.im:5349，全部由 POPOPX 运营。",
          ],
        },
      ],
    },
    {
      id: "what-stays-on-device",
      number: "3",
      title: {
        english: "What stays on your device",
        chinese: "什么留在你的设备上",
      },
      blocks: [
        {
          kind: "ul",
          english: [
            "The conversation database is SQLCipher; its key lives in the iOS Keychain with kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly, so it is not synced through iCloud Keychain.",
            "The database file is excluded from device backups; if you want a copy, export one deliberately.",
            "Push is a wake-up, not a transport. The notification extension reads only userInfo[\"notificationData\"], decrypts it on the device, and then fetches the conversation. No message text, sender name or conversation title is in the payload Apple carries.",
            "Calls are WebRTC, peer-to-peer first; media is encrypted between peers. A STUN request reveals your public address to stun1.popopx.im; ICE candidates are exchanged with the peer you chose to call. No conference service mixes, records or stores call media.",
            "The on-device anti-peek guard opens the front camera only while a top-secret sheet is open, at the lowest resolution, processes every frame on the device and stops when the sheet closes. Nothing is written to disk or uploaded.",
            "Duress erasure is a real deletion of databases, keys, exports and temporary directories; the mesh panic wipe clears mesh keys and records but not the chat database.",
          ],
          chinese: [
            "会话数据库是 SQLCipher；密钥保存在 iOS 钥匙串，属性为 kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly，因此不会通过 iCloud 钥匙串同步。",
            "数据库文件被排除在设备备份之外；如果你想要副本，请主动导出。",
            "推送只是唤醒，不是传输通道。通知扩展只读取 userInfo[\"notificationData\"]，在设备上解密，然后再去获取会话。Apple 承载的载荷里没有消息文本、发送者姓名或会话标题。",
            "通话使用 WebRTC，优先点对点；媒体在两端之间加密。STUN 请求会让 stun1.popopx.im 看到你的公网地址；ICE 候选只与你选择通话的对方交换。没有会议服务对通话媒体进行混流、录制或存储。",
            "端侧防窥保护只在绝密面板打开时启用前置摄像头，使用最低分辨率，每一帧都在设备上处理，面板关闭即停止。不会写入磁盘，也不会被上传。",
            "紧急擦除会真正删除数据库、密钥、导出与临时目录；Mesh 恐慌擦除会清除 Mesh 密钥与记录，但不包括聊天数据库。",
          ],
        },
      ],
    },
    {
      id: "purchases",
      number: "4",
      title: {
        english: "Purchases",
        chinese: "购买",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "Badge and credit purchases are StoreKit 2 products (13 SKUs: 2 auto-renewable subscriptions, 2 non-renewing passes, 9 consumables). The ledger is on your device, in the Keychain; POPOPX operates no store service and sees no order, receipt, email or name. Apple sees the purchase under its own privacy policy. Entitlements do not sync between devices, and restoring is a reconciliation with Apple.",
            chinese:
              "徽章与点数购买是 StoreKit 2 商品（13 个 SKU：2 个自动续期订阅、2 个非续期通行证、9 个消耗型商品）。账本保存在你的设备上、在钥匙串里；POPOPX 不运营商店服务，看不到订单、收据、邮箱或姓名。Apple 依据其自身隐私政策处理购买。权益不会在设备之间同步，恢复购买是与 Apple 的一次对账。",
          },
        },
      ],
    },
    {
      id: "network-identity",
      number: "5",
      title: {
        english: "Network identity, Tor and proxies",
        chinese: "网络身份、Tor 与转发通道",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "The presets are dual-addressed: each SMP/XFTP/NTF/chat-relay entry has a public host and a V3 .onion host. iOS exposes a SOCKS5 proxy setting and a .onion-preference toggle. No Tor is bundled; the SOCKS5 path requires a proxy you provide and is off by default, so an ordinary install reveals your IP to whichever relay it dials.",
            chinese:
              "预置项是双地址的：每个 SMP/XFTP/NTF/聊天中继条目都有一个公网主机和一个 V3 .onion 主机。iOS 提供 SOCKS5 转发通道（proxy）设置与 .onion 偏好开关。App 不内置 Tor；SOCKS5 路径需要你自备转发通道，且默认关闭，因此普通安装会向它所连接的中继暴露你的 IP。",
          },
        },
      ],
    },
    {
      id: "third-parties",
      number: "6",
      title: {
        english: "Third parties",
        chinese: "第三方",
      },
      blocks: [
        {
          kind: "defs",
          items: [
            {
              term: { english: "Apple", chinese: "Apple" },
              detail: {
                english:
                  "App Store, APNs wake-ups and StoreKit 2. What they can learn: Apple account, purchase records, push token, size and timing of an opaque payload.",
                chinese:
                  "App Store、APNs 唤醒与 StoreKit 2。它们能知道：Apple 账户、购买记录、推送令牌、一个不透明载荷的大小与时间。",
              },
            },
            {
              term: { english: "POPOPX relays", chinese: "POPOPX 中继" },
              detail: {
                english:
                  "Queue, file and notification delivery. What they can learn: the metadata in §2 — never plaintext.",
                chinese:
                  "队列、文件与通知投递。它们能知道：§2 所述元数据——绝不包含明文。",
              },
            },
            {
              term: { english: "Your ISP / network", chinese: "你的 ISP / 网络" },
              detail: {
                english:
                  "Carrying the traffic. What they can learn: that you connect to popopx.im hosts unless you use onion endpoints.",
                chinese:
                  "承载流量。它们能知道：你连接 popopx.im 主机这一事实——除非你使用 onion 端点。",
              },
            },
            {
              term: { english: "Certificate authority", chinese: "证书颁发机构" },
              detail: {
                english:
                  "TLS certificates. What they can learn: that the domains exist.",
                chinese:
                  "TLS 证书。它们能知道：这些域名存在。",
              },
            },
            {
              term: { english: "A Mac you pair", chinese: "你配对的 Mac" },
              detail: {
                english:
                  "Optional Discover services you choose to use. What they can learn: what you send to that node; the iOS app does not open 127.0.0.1:18920 — that console address is displayed read-only and belongs to the Mac.",
                chinese:
                  "你选择使用的可选 Discover 服务。它们能知道：你发送给该节点的内容；iOS App 不会打开 127.0.0.1:18920——该控制台地址只作只读展示，属于 Mac。",
              },
            },
          ],
        },
        {
          kind: "p",
          text: {
            english:
              "There is no advertising network, no analytics vendor, no CDN, no third-party AI service and no cloud storage provider in the message path.",
            chinese:
              "消息路径上没有广告网络、没有分析供应商、没有 CDN、没有第三方 AI 服务，也没有云存储供应商。",
          },
        },
      ],
    },
    {
      id: "your-choices",
      number: "7",
      title: {
        english: "Your choices",
        chinese: "你的选择",
      },
      blocks: [
        {
          kind: "ul",
          english: [
            "Change or add relays in Settings; you are not tied to the POPOPX cluster.",
            "Route over .onion or your own SOCKS5 proxy to keep your IP from the relay.",
            "Self-host the same server software; then you are the operator.",
            "Delete an identity or all local data at any time. There is no account to close because there was no account to open.",
          ],
          chinese: [
            "在设置中更改或添加中继；你不被绑定在 POPOPX 集群上。",
            "通过 .onion 或你自己的 SOCKS5 转发通道连接，让中继看不到你的 IP。",
            "自托管同一套服务器软件；那时你就是运营者。",
            "随时删除一个身份或全部本地数据。没有账号需要注销，因为从来不需要开账号。",
          ],
        },
      ],
    },
    {
      id: "retention",
      number: "8",
      title: {
        english: "Retention",
        chinese: "保留",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "Message bodies exist in a queue until the recipient fetches them; files exist on an XFTP relay until retrieved or its configured retention removes them. POPOPX holds no profile, contact graph, message copy outside those queues, and no analytics store.",
            chinese:
              "消息正文会留在队列里，直到接收方取走；文件会留在 XFTP 中继上，直到被取回或按该中继配置的保留期删除。除这些队列之外，POPOPX 不持有个人资料、联系人图谱、消息副本，也没有分析数据库。",
          },
        },
      ],
    },
    {
      id: "requests-and-disclosure",
      number: "9",
      title: {
        english: "Requests and disclosure",
        chinese: "请求与披露",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "There is no user database to subpoena: no email, phone number, name, contact list or plaintext message is held. A request could reach relay metadata only to the extent the operating relay persisted it under §2.",
            chinese:
              "没有可供传票调取的用户数据库：我们不持有邮箱、手机号、姓名、通讯录或明文消息。请求最多只能触及中继元数据，且以运营中继按 §2 实际持久化的范围为限。",
          },
        },
      ],
    },
    {
      id: "children",
      number: "10",
      title: {
        english: "Children",
        chinese: "儿童",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "POPOPX is not directed to children. The App Store age rating is set by the operator (recommended 18+ because the app provides unmoderated user-to-user messaging). We do not knowingly collect personal information from children; because no personal information is collected at all, there is no separate children's data store to delete.",
            chinese:
              "POPOPX 不以儿童为对象。App Store 年龄分级由运营者设定（建议 18+，因为本 App 提供未经审核的用户间消息功能）。我们不会在知情情况下收集儿童的个人信息；由于根本不收集个人信息，也就不存在需要单独删除的儿童数据存储。",
          },
        },
      ],
    },
    {
      id: "changes-and-contact",
      number: "11",
      title: {
        english: "Changes and contact",
        chinese: "变更与联系",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "This policy is revised by commit. Privacy and security reports: chat@popopx.chat.",
            chinese:
              "本政策按提交修订。隐私与安全报告：chat@popopx.chat。",
          },
        },
      ],
    },
  ],
} satisfies LegalDoc;

export const TERMS_DOC = {
  eyebrow: "LEGAL · TERMS",
  title: {
    english: "Terms of Use",
    chinese: "服务条款",
  },
  lead: {
    english:
      "These Terms govern your use of the app and the relays POPOPX operates. The client source stays under AGPL-3.0-only; the licence to the code is a separate grant.",
    chinese:
      "本条款约束你对本 App 及 POPOPX 运营的中继的使用。客户端源码仍以 AGPL-3.0-only 发布；代码许可是一项单独的授权。",
  },
  languageNote: {
    english:
      "Published in English and Simplified Chinese. If the two texts differ, the English text controls.",
    chinese:
      "本页以英文和简体中文发布；两种文本不一致时，以英文文本为准。",
  },
  meta: [
    {
      label: { english: "Effective", chinese: "生效日期" },
      value: { english: "2026-11-28", chinese: "2026-11-28" },
    },
    {
      label: { english: "Operator", chinese: "运营者" },
      value: {
        english: "POPOPX (\u201cwe\u201d, \u201cus\u201d).",
        chinese: "POPOPX（\u201c我们\u201d）。",
      },
    },
    {
      label: { english: "Contact", chinese: "联系方式" },
      value: { english: "chat@popopx.chat", chinese: "chat@popopx.chat" },
      href: "mailto:chat@popopx.chat",
    },
    {
      label: { english: "Source licence", chinese: "源码许可" },
      value: {
        english: "LICENSE — AGPL-3.0-only.",
        chinese: "LICENSE——AGPL-3.0-only。",
      },
      href: LICENSE_URL,
    },
  ],
  sections: [
    {
      id: "what-this-is",
      number: "1",
      title: {
        english: "What this is",
        chinese: "本条款是什么",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "POPOPX Chat is a free, open-source, end-to-end encrypted messaging application distributed by POPOPX. The client source is published under AGPL-3.0-only; these Terms govern your use of the app and the relays POPOPX operates, not the licence to the source code (see LICENSE).",
            chinese:
              "POPOPX Chat 是由 POPOPX 分发的免费、开源、端到端加密消息应用。客户端源码以 AGPL-3.0-only 发布；本条款约束你对本 App 及 POPOPX 运营的中继的使用，而不涉及源码许可（见 LICENSE）。",
          },
        },
      ],
    },
    {
      id: "acceptance-and-eligibility",
      number: "2",
      title: {
        english: "Acceptance and eligibility",
        chinese: "接受与资格",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "By using the app you agree to these Terms and to the Privacy Policy. You must be at least 18 years old, or the age of majority in your jurisdiction, to use public groups and channels. If you do not agree, do not use the app.",
            chinese:
              "使用本 App 即表示你同意本条款与隐私政策。使用公开群组与频道，你必须年满 18 周岁，或达到你所在司法辖区的成年年龄。如果你不同意，请不要使用本 App。",
          },
        },
      ],
    },
    {
      id: "no-account",
      number: "3",
      title: {
        english: "No account; encrypted service; operator conditions",
        chinese: "没有账号；加密服务；运营者条件",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "There is no POPOPX account, no phone number and no email registration. Your identity exists only on your device. Messages, files and calls are end-to-end encrypted; POPOPX relays cannot read their content and do not hold a directory of users. Relay operators may set conditions for their servers; where an operator requires acceptance, the app shows those conditions and records your acceptance before use.",
            chinese:
              "POPOPX 没有账号、没有手机号、没有邮箱注册。你的身份只存在于你的设备上。消息、文件与通话端到端加密；POPOPX 中继无法读取其内容，也不持有用户目录。中继运营者可以为其服务器设定条件；当运营者要求接受时，App 会在使用前展示这些条件并记录你的接受。",
          },
        },
      ],
    },
    {
      id: "acceptable-use",
      number: "4",
      title: {
        english: "Your content and acceptable use",
        chinese: "你的内容与可接受使用",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "You are responsible for what you send and publish. You must not use POPOPX to:",
            chinese: "你对自己发送和发布的内容负责。你不得利用 POPOPX：",
          },
        },
        {
          kind: "ul",
          english: [
            "break the law of the country you are in;",
            "publish or share non-consensual intimate imagery, including AI-generated imagery;",
            "harass, threaten, defame, or discriminate against others;",
            "distribute spam, malware, phishing, or illegal content;",
            "infringe intellectual property, privacy, or other rights.",
          ],
          chinese: [
            "违反你所在国家的法律；",
            "发布或分享未经同意的私密影像，包括 AI 生成的影像；",
            "骚扰、威胁、诽谤或歧视他人；",
            "分发垃圾信息、恶意软件、钓鱼内容或违法内容；",
            "侵犯知识产权、隐私或其他权利。",
          ],
        },
        {
          kind: "p",
          text: {
            english:
              "Because content is end-to-end encrypted, we cannot review it in transit. We may act on reports you send us about content or behaviour that reaches POPOPX-operated infrastructure, including by removing a reported address from POPOPX relays where technically possible, and we may suspend access to POPOPX-operated services for violations. We do not operate a user directory and cannot remove a sender from the network.",
            chinese:
              "由于内容端到端加密，我们无法在传输中审查。我们可以对你发送的、触及 POPOPX 运营基础设施的内容或行为报告采取行动，包括在技术上可行时从 POPOPX 中继移除被举报的地址，并可因违反行为暂停对 POPOPX 运营服务的访问。我们不运营用户目录，也无法把发送者从网络中移除。",
          },
        },
      ],
    },
    {
      id: "keys-and-irreversibility",
      number: "5",
      title: {
        english: "Your keys and irreversibility",
        chinese: "你的密钥与不可逆性",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "Your mnemonic phrase, identity keys, badges and Compute Credits exist only on your device (and in any backup you make). If the device or phrase is lost, nobody — including POPOPX — can recover, freeze or reissue them. Panic Wipe erases local data irreversibly; messages already waiting in a relay queue cannot be erased from your device and are not recovered for you.",
            chinese:
              "你的助记词、身份密钥、徽章与计算点数只存在于你的设备上（以及你自己制作的备份中）。如果设备或助记词丢失，任何人——包括 POPOPX——都无法恢复、冻结或补发它们。恐慌擦除会不可逆地删除本地数据；已经在中继队列中等待的消息无法从你的设备上擦除，也不会为你恢复。",
          },
        },
      ],
    },
    {
      id: "purchases",
      number: "6",
      title: {
        english: "Purchases",
        chinese: "购买",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "The app is free. Optional purchases are sold by Apple through In-App Purchase:",
            chinese: "本 App 免费。可选购买通过 Apple 的应用内购买完成：",
          },
        },
        {
          kind: "ul",
          english: [
            "POPOPX Node Badge — auto-renewable subscription (monthly or annual). Payment is charged to your Apple Account at confirmation. It renews automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel in App Store settings.",
            "POPOPX Node Badge Pass — 30-day or 365-day one-time purchase; it does not renew.",
            "Compute Credits — consumable packs used for optional in-app services. Consumables are used when purchased and are not restorable. Credits have no cash value, cannot be exchanged for money, and cannot be transferred off-device.",
          ],
          chinese: [
            "POPOPX Node Badge——自动续期订阅（按月或按年）。确认时向你的 Apple 账户扣款。除非在当前周期结束前至少 24 小时取消，否则自动续期。可在 App Store 设置中管理或取消。",
            "POPOPX Node Badge Pass——30 天或 365 天的一次性购买；不会续期。",
            "计算点数——用于可选应用内服务的消耗型礼包。消耗型商品在购买时使用，不可恢复。点数没有现金价值，不能兑换成钱，也不能转出设备。",
          ],
        },
        {
          kind: "p",
          text: {
            english:
              "Prices are shown in the app before purchase. Refunds are handled by Apple under its policies. Badge entitlements do not sync between devices; restoring is a reconciliation with Apple.",
            chinese:
              "价格会在购买前显示在 App 中。退款由 Apple 按其政策处理。徽章权益不会在设备之间同步；恢复购买是与 Apple 的一次对账。",
          },
        },
      ],
    },
    {
      id: "privacy",
      number: "7",
      title: {
        english: "Privacy",
        chinese: "隐私",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "Our Privacy Policy describes what the app and the POPOPX relays do and do not collect. It is part of these Terms.",
            chinese:
              "我们的隐私政策说明本 App 与 POPOPX 中继收集与不收集什么。它是本条款的一部分。",
          },
        },
      ],
    },
    {
      id: "availability-and-changes",
      number: "8",
      title: {
        english: "Availability and changes",
        chinese: "可用性与变更",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "Relays, push wake-ups and Bluetooth Mesh hops are provided \u201cas is\u201d. Offline delivery depends on nearby devices being present and switched on. We may change, suspend or discontinue POPOPX-operated relays. We may update these Terms; the app shows the version you agreed to, and continuing to use POPOPX after an update means you accept it.",
            chinese:
              "中继、推送唤醒与蓝牙 Mesh 跳转均按「现状」提供。离线投递取决于附近有设备存在并开机。我们可以更改、暂停或停止 POPOPX 运营的中继。我们可以更新本条款；App 会展示你同意过的版本，更新后继续使用 POPOPX 即表示你接受更新。",
          },
        },
      ],
    },
    {
      id: "disclaimers",
      number: "9",
      title: {
        english: "Disclaimers and limitation of liability",
        chinese: "免责声明与责任限制",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "To the maximum extent permitted by law, the app and POPOPX-operated services are provided without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose and non-infringement. To the maximum extent permitted by law, POPOPX is not liable for indirect, incidental, special, consequential or punitive damages, or for loss of data, keys, credits or profits, arising from your use of the app. Nothing in these Terms limits liability that cannot be limited by law.",
            chinese:
              "在法律允许的最大范围内，本 App 与 POPOPX 运营的服务不提供任何明示或暗示的保证，包括适销性、特定用途适用性与不侵权。在法律允许的最大范围内，POPOPX 不对因你使用本 App 而产生的间接、附带、特殊、后果性或惩罚性损害，或数据、密钥、点数或利润的损失承担责任。本条款中的任何内容均不限制依法不能限制的责任。",
          },
        },
      ],
    },
    {
      id: "termination",
      number: "10",
      title: {
        english: "Termination",
        chinese: "终止",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "You may stop using the app at any time and delete your local data. We may suspend access to POPOPX-operated services for violations of these Terms. Sections that by their nature survive (including §5, §6, §9 and §12) survive termination.",
            chinese:
              "你可以随时停止使用本 App 并删除本地数据。对于违反本条款的行为，我们可以暂停对 POPOPX 运营服务的访问。按其性质应继续有效的条款（包括 §5、§6、§9 与 §12）在终止后继续有效。",
          },
        },
      ],
    },
    {
      id: "export-and-sanctions",
      number: "11",
      title: {
        english: "Export and sanctions",
        chinese: "出口与制裁",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english:
              "The app uses standard encryption (TLS, NaCl, Noise, DTLS-SRTP) and is exported under the applicable exemptions. You may not use the app in violation of applicable export control or sanctions laws.",
            chinese:
              "本 App 使用标准加密（TLS、NaCl、Noise、DTLS-SRTP），并按适用的豁免出口。你不得违反适用的出口管制或制裁法律使用本 App。",
          },
        },
      ],
    },
    {
      id: "contact",
      number: "12",
      title: {
        english: "Contact",
        chinese: "联系",
      },
      blocks: [
        {
          kind: "p",
          text: {
            english: "Questions about these Terms: chat@popopx.chat.",
            chinese: "关于本条款的问题：chat@popopx.chat。",
          },
        },
      ],
    },
  ],
} satisfies LegalDoc;
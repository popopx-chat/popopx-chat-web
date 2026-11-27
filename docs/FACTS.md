# POPOPX 主站文案事实台账 / claim ledger

每一行都是 iOS 客户端仓库（分支 `master`，默认 checkout 在本仓库同级的 `../popopx-chat`，也可用环境变量 `POPOPX_CLIENT` 指定）里实测出来的事实。**出处路径一律相对该客户端仓库根目录**，`apps/ios/` 前缀写在路径里；本文件不出现任何本机绝对路径。
`npm run check:facts` 逐条打开这些指针：文件必须存在、路径必须按上述约定可解析、行号必须落在有内容的行上。它只证明「指针打得到东西」，不证明行内的语义——那仍然要人开着文件读这一行。
⚠️ 全表最后一次重钉落在 2026-11-27，对齐上游四个仓库的提交——客户端 `5ff040eb8`、服务套件 `d68f2d5`、Bot Studio `766cee5`、Mac 节点 `6dd719a`。
2026-11-26 的上一轮重钉（客户端 `3daec259e`、套件 `a6c1632`、Bot Studio `c114368`、Mac Node `040ef25`）当时有 13 条门禁红与 11 行静默漂移，那批指针已逐条改好；同一次回读把套件的业务插件由 5 个改成 8 个、接口由 117 改成 118（55 + 63）。这两个数字最终被本轮覆盖。

2026-11-27 又钉了一次：上一轮（`691176e`）的 8 个插件／118 条路由在当时是对的，但套件随后落地的 `d68f2d5` 新增了第九个插件 `slack_discord`（7 条路由）与 4 条网关自身路由——README 现在的原话是 "nine business plugins" 与 **129 条路由**（59 + 70）。本轮把那 36 个 18 语槽位一并改成九／129，并把 §16 的配方重跑成 59 + 70。同一轮把首页五个组件与生态页套件卡共六个组件里 17 张 `Localized` map 的 306 个槽位按新代码改写：Bot Studio 的进程内多智能体编排与「已配对手机 ↔ 已绑定 Mac Node」的助手环从「演进中」翻成「已可用 / Live」，而 PAP、手机端内嵌模型权重、跨产品共享调度器、网络权限网关继续留在「演进中」。§19 是新落地的两块的逐条出处。

主站上任何一句技术描述都必须能在本表中找到出处；本表没有的说法，页面不能写。

Every technical claim rendered by the portal must be backed by a row here. If a sentence on the
site cannot be traced to a `file:line` below, it is a defect, not marketing.

## 1. 语言与本地化

| 事实 | 出处 |
| --- | --- |
| `CFBundleLocalizations` 恰好 18 项，顺序 `en, ru, de, fr, it, nl, cs, zh-Hans, zh-Hant, es, pl, ja, th, fi, uk, bg, tr, hu` | `apps/ios/POPOPX--iOS--Info.plist:63-83` |
| 打包产物里 18 个 `.lproj`（App、NSE、SE 各 18） | `apps/ios/*.lproj/`、`apps/ios/POPOPX NSE/`、`apps/ios/POPOPX SE/` |
| `apps/ios/POPOPX Localizations` 里的 28 个 `.xcloc` 是导出给译者的工作目录，**不是** 28 种语言；页面严禁写 "28 语" | `apps/ios/POPOPX Localizations/` |
| Xcode `developmentRegion = en`（源码 plist 无 `CFBundleDevelopmentRegion`，实测该行不存在）；主站默认语言 `zh-Hans` 是门户自己的选择 | `apps/ios/POPOPX.xcodeproj/project.pbxproj:1921`、`apps/ios/POPOPX--iOS--Info.plist` |
| URL scheme 为 `popopx` | `apps/ios/POPOPX--iOS--Info.plist`（`CFBundleURLSchemes`） |

## 2. 五栏导航（真实名称）

`PopopxTab` 枚举 `apps/ios/Shared/Navigation/MainTabView.swift:63-74`，展示顺序 :142-202，图标 :86-96。

| 序号 | 枚举 | zh-Hans | zh-Hant | 英文（即 key 本身） | 出处（zh-Hans 语言包行号） |
| --- | --- | --- | --- | --- | --- |
| 1 | `.chats` | 消息 | 訊息 | Messages | `apps/ios/zh-Hans.lproj/Localizable.strings:4064` |
| 2 | `.contacts` | 联系人 | 聯絡人 | Contacts | `apps/ios/zh-Hans.lproj/Localizable.strings:1801` |
| 3 | `.cabin` | 厢语 | 廂語 | Cabin | `apps/ios/zh-Hans.lproj/Localizable.strings:8470` |
| 4 | `.discover` | 发现 | 發現 | Discover | `apps/ios/zh-Hans.lproj/Localizable.strings:8307` |
| 5 | `.me` | 我 | 我 | Me | `apps/ios/zh-Hans.lproj/Localizable.strings:8061` |

第 2 栏是「联系人」，**不是**「通讯」。第 3 栏 `厢语 / Cabin` 是 C 位。

五个行号按 2026-11-25 复测：`grep -n '^"Messages" = ' apps/ios/zh-Hans.lproj/Localizable.strings` → `4064:"Messages" = "消息";`，
`Contacts` → 1801、`Cabin` → 8470、`Discover` → 8307、`Me` → 8061，五者在全文件中各只命中一次。
⚠️ 这一节是「静默漂移」的样本：改名前那五条锚点整体 +1，`8472` 仍指向有内容的行，但读出来是
`"Cabin offline mesh"`，`8309` 是 `"Erase now"`，`8063` 是 `"Identity number"`——`check:facts` 全都不报错。
所以引用行号必须用上面的 `grep -n '^"键名" = '` 复现，不能只信门禁的绿色。

## 3. 身份与队列

| 事实 | 出处 |
| --- | --- |
| 不绑定手机号、邮箱，也没有全局公钥/用户 ID（客户端内文案原话 "No phone number, no email, no global public key…"） | `apps/ios/Shared/Views/Onboarding/OnboardingView.swift:83`、`apps/ios/Shared/Views/Onboarding/HowItWorks.swift:83`、`apps/ios/Shared/Features/Me/PopopxMeView.swift:1127` |
| 全仓所有模型里都不存在 `phoneNumber` 字段（唯一命中是键盘类型） | `apps/ios/Shared/Components/PopopxControls.swift:245` |
| `userAddress` 是可选的一次性 `UserContactLink`，不是用户 ID | `apps/ios/Shared/Model/ChatModel.swift:426` |
| 代码用词是 **one-time**（一次性）地址，不是 "single use"；铸造入口 `PopopxInviteLink.mintOneTime` | `apps/ios/Shared/Features/AddFriend/PopopxAddFriendView.swift:261`、`apps/ios/POPOPXChat/ChatTypes.swift:2958-2980,6036`、`apps/ios/Shared/Features/BadgeCredits/PopopxBadgeCreditsModels.swift:485,512` |
| 每个连接一对队列：`RcvQueueInfo` / `SndQueueInfo`，服务器侧只带 host；队列切换状态 `sending_qadd` / `sending_quse` / `received_qend` | `apps/ios/POPOPXChat/APITypes.swift:589-615`、:597-604 |
| 「中继服务器不掌握社交图谱」属于协议性质，iOS 端代码无法证明；页面只能用「队列地址不含关系信息」这类可从类型定义看出的措辞 | — |

## 4. 密码学基线

| 原语 | 实际用途 | 出处 |
| --- | --- | --- |
| X25519 | 手写 Noise 握手 `Noise_XX_25519_ChaChaPoly_SHA256` 的密钥协商（基于 CryptoKit），以及 Mesh 节点身份 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:5,356,618-632,644`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxMeshIdentity.swift:9,12-19,35-59` |
| ChaCha20-Poly1305 | 三处：BLE/Mesh 传输帧（nonce = 4 字节 0 + 小端计数器）、离线群组消息（每 epoch 群组密钥 + AAD）、服务号频道信封 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift:125,128,175,219`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Groups/PopopxGroupCrypto.swift:123,153-157`、`apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:64,196` |
| AES-256-GCM | 仅队列载荷层；**严禁**说成 BLE 通道加密 | `apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:103,121-123` |
| Ed25519 | 校验服务器集群配置：签名域 `popopx|popx_srv_cfg_v1|` + 压缩字节；信任根是**硬编码固定的** 32 字节公钥，key id `k-ad1dc5463a`（= `k-` + SHA-256 前 10 位十六进制），验证失败即拒绝（fail-closed） | `apps/ios/Shared/Features/ServerConfigSync/PopopxServerClusterConfig.swift:381-391,394-397,401-405,410-418,420-425,516-523` |
| Ed25519（TOFU 一类） | 群组创建者签名、发现目录签名、频道密钥校验的公钥来自数据本身（首次信任），与上面的固定信任根不同 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Groups/PopopxGroupWire.swift:145`、`apps/ios/Shared/Features/Discover/DiscoverCatalogModels.swift:596-600`、`apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:294-304` |
| ECDSA P-256 | 商业徽章/积分签名，**不是** Ed25519 | `apps/ios/Shared/Features/BadgeCredits/PopopxBadgeCreditsModels.swift:1542-1545,1553-1559,1577-1583` |
| HMAC-SHA256 | 服务号配对匿名 H5 授权：原文形如 `uid=<pairwise_uid>&ts=<unix-seconds>`，密钥为该联系人会话密钥（Keychain） | `apps/ios/Shared/Features/ServiceAccount/PopopxH5Launcher.swift:7,120-122,130-142` |
| PBKDF2-HMAC-SHA256 | 胁迫密码，100,000 轮 | `apps/ios/Shared/Features/AntiTheftDuress/PopopxDuressAuthManager.swift:310,341-345` |
| LZFSE | `Compression` 框架 `COMPRESSION_LZFSE` 流式分块压缩；容器扩展名 `.ppxlz`、魔数 `PPXLZ1`；只有在压缩收益 ≥15% 时才保留；明确不是 zstd | `apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:15-19,731,735-738,741,743-747,843-850`、`apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:5,32` |
| 双重棘轮 | 在核心（Haskell）侧，Swift 层只透出 `ratchetSync*` 字段；**严禁**写成「iOS Swift 实现的双棘轮」 | `apps/ios/Shared/Features/SecureEphemeral/PopopxSecurePayload.swift:18`、`apps/ios/POPOPXChat/APITypes.swift:572-585` |

## 5. 媒体压缩与元数据剥离

| 事实 | 出处 |
| --- | --- |
| 图片走 ImageIO 缩图解码 + `CGImageDestination`，只传有损质量键、**不传任何元数据字典**——EXIF/GPS 因此被结构性丢弃 | `apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:20-25,360-366,370-381`（丢弃点在 :378-379） |
| 视频走 AVFoundation `AVAssetWriter` 重编码，`metadata = []` | `apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:26-28,422-426` |
| 另一条导出路径使用 `AVMetadataItemFilter.forSharing()` | `apps/ios/POPOPXChat/ImageUtils.swift:355`、`apps/ios/Shared/Features/PersonalProfile/ProfileStorageManager.swift:337`（说明见 :307） |
| 动图（GIF/APNG）原样透传，**不做**元数据剥离 | `apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:29-31` |
| 引擎产出的临时目录与文件用 `FileProtectionType.complete` | `apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:349,356,915-916,918-919` |

## 6. 离线路由 / BLE

| 事实 | 出处 |
| --- | --- |
| `PopopxMeshKit` 是 SPM 包，两个 module：`PopopxMeshKit`、`PopopxMeshUI`，已链接进 App target | `apps/ios/PopopxMeshKit/Package.swift:10-13,16-19`、`apps/ios/POPOPX.xcodeproj/project.pbxproj:926-927,3217` |
| 传输是**双角色 CoreBluetooth GATT 点对点**（`CBCentralManager` + `CBPeripheralManager`，单一 service UUID），不是 Bluetooth Mesh 规范 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/BLE/PopopxBLETransport.swift:24,29,45-49`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Core/PopopxMeshConfig.swift:93-96` |
| 泛洪转发用 Golomb-coded set 去重并分片 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxGCSFilter.swift:5-7` |
| 通道加密为 NOISE over BLE | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Crypto/PopopxNoiseXX.swift` |
| 网络/BLE 的路线选择在代码里叫 `dualChannel`；SMP ACK 超时 3 秒、BLE ACK 超时 5 秒；结果枚举见 :217-238 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:6-19,217-238,271`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Core/PopopxMeshConfig.swift:70,72` |
| 离线群组：每 epoch ChaCha20-Poly1305 + 创建者 Ed25519 签名花名册 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Groups/PopopxGroupCrypto.swift:8-9`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Groups/PopopxGroupWire.swift:139-145` |

## 7. 服务器配置热更新

| 事实 | 出处 |
| --- | --- |
| 存储是**两层**：UserDefaults + App Group 文件；不存在「三层」机制 | `apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:1-12` |
| 应用前先写 `rollback.json` 快照；快照写不进去就拒绝应用（失败自动回滚的实现方式） | `apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:176,447-455`、`apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:330-336` |
| 单向防重放：按 key 的 generation 下限 + 策略吊销下限 `max(stored, ms-1)`、`exp` 到期、staged 帧 `installWindowSeconds`、坏 generation 抑制名单、回执去重 | `apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:217-254,54-56,657-658`、`apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:234` |
| 连通性探活在应用后 **3 秒**与 **10 秒**两个时点（不是「10 秒心跳」） | `apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigSignalHandler.swift:99-103` |
| 回滚快照的保护级别同样是 `FileProtectionType.complete`（它就是用户整张服务器表） | `apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:449-451,457-459,503-505`、staged :177 |

## 8. 防窥与紧急擦除

| 事实 | 出处 |
| --- | --- |
| 类型名 `PopopxPanicWipeManager` / `PopopxPanicWipeStep` / `PopopxPanicWipeArming`，位于 `PopopxMeshUI` | `apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:40,360,437` |
| 6 个有序步骤：stopRadio → clearVolatileState → eraseKeychainMapping → overwriteMeshSandbox → overwriteApplicationDatabase → terminate | `apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:13-18,41-46` |
| 覆盖 App 数据库是**可选项、默认关闭** | `apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:17,20-22,103,447` |
| 触发方式是 1 秒内连点品牌标 / 「我」页 3 次，随后 15 秒确认窗口；没有实体键组合，也没有 Face ID 关卡 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:363,367,371` |
| 后台明文缓存清理是真的：进入后台时清空解包临时件 | `apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:152-173`（安装点 `apps/ios/Shared/Navigation/MainTabView.swift:240`） |
| 擦除每一步都过一遍媒体清除记录 | `apps/ios/Shared/Features/MediaCompression/PopopxIncomingFileUnpacker.swift:187-200`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshUI/PanicWipeManager.swift:162-168` |
| Face ID 用在别处：助记词显示、应用锁、安全窗口（不要挂在紧急擦除上） | `apps/ios/Shared/Features/AntiTheftDuress/PopopxDuressAuthManager.swift:1156,1521,2074`、`apps/ios/Shared/Features/SecureEphemeral/PopopxSecureWindowManager.swift:570-572` |
| 诱饵配置文件同样以 `FileProtectionType.complete` 存储 | `apps/ios/Shared/Features/AntiTheftDuress/PopopxDecoyProfileGenerator.swift:419` |

## 9. 服务号 / 零知识频道 / H5

| 事实 | 出处 |
| --- | --- |
| 底部菜单只有**两级**；带第三级的菜单整包被丢弃。上限：3 个一级按钮、每按钮 ≤5 子项 | `apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:40-42,137-138`、`apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:65-67` |
| 动态业务卡片样式字面量 `standard` / `receipt` / `security`；`create` / `update` 模式；≤8 字段、≤4 操作；按 `updatedAtMs` 新者胜 | `apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:487-495,497-500,63-64,512-513` |
| H5 用**进程外 `SFSafariViewController`** 打开（因此 App 自身的 Cookie 容器不会被带进去），签名 URL 只存一个值、关闭即弃，非 http(s) 与 `javascript:` 一律拒绝；这不是自研「免追踪浏览器」 | `apps/ios/Shared/Features/ServiceAccount/PopopxH5Launcher.swift:12-17,52-54,237-243`（`import SafariServices` :37） |
| 零知识频道信封 `popopx.channel.enc.v1`：`PopopxChannelEnvelope` / `PopopxChannelCrypto` / `PopopxChannelEpoch` / `PopopxChannelKeyState`；epoch 密钥是中继保持盲的原因；Ed25519 信任根只能被签名交接替换。代码里没有「盲存 / blind store」这个词 | `apps/ios/Shared/Features/ServiceAccount/ChannelKeyRotationManager.swift:5,64,74,294,341,381-422,424` |

## 10. 构建与版本

| 事实 | 出处 |
| --- | --- |
| 部署目标 iOS 17.0：构建设置取 `$(RECOMMENDED_IPHONEOS_DEPLOYMENT_TARGET)`，产物 `MinimumOSVersion = 17.0` 只在重新构建后才是可核对的事实（旧的 `apps/ios/build/artifacts/…` 已被清理，不再是出处） | `apps/ios/POPOPX.xcodeproj/project.pbxproj:2776`、`apps/ios/Shared/Navigation/MainTabView.swift:44-46` |
| `SWIFT_VERSION = 5.0`（12 处）；`PopopxMeshKit` 包用 `swift-tools-version: 6.0` 且包内最低 `.iOS(.v15)`（仅包侧，不要写成 App 支持 iOS 15） | `apps/ios/POPOPX.xcodeproj/project.pbxproj:2789`、`apps/ios/PopopxMeshKit/Package.swift:1,12-13` |
| Xcode 版本没有被钉死，CI 只打印 `xcodebuild -version` | `.github/workflows/ios-sim.yml:101,116` |
| 真实构建命令（CI 用，先跑 `scripts/ci/ios-stub-libs.sh` 与 `scripts/ci/ios-stub-mlpackage.sh`） | `.github/workflows/build.yml:1011-1012,1016-1026` |
| 共享 scheme：`POPOPX (iOS)`、`POPOPX NSE`、`POPOPX SE` | `apps/ios/POPOPX.xcodeproj/xcshareddata/xcschemes/` |
| 辅助脚本目录 `scripts/ios/`：`prepare.sh`、`download-libs.sh`、`server-config-mint.swift` | `scripts/ios/prepare.sh`、`scripts/ios/download-libs.sh`、`scripts/ios/server-config-mint.swift` |
| `apps/ios/README.md` 是**过期文档**（仍在讲旧工程名与 iOS 15+），主站严禁以它为事实来源 | `apps/ios/README.md` |

构建命令原文（页面上要给的就是这一条，可折行显示）：

```
xcodebuild build -quiet \
  -project apps/ios/POPOPX.xcodeproj \
  -scheme "POPOPX (iOS)" \
  -configuration Debug \
  -destination "generic/platform=iOS Simulator" \
  -onlyUsePackageVersionsFromResolvedFile \
  -skipPackagePluginValidation -skipMacroValidation \
  ARCHS=arm64 CODE_SIGNING_ALLOWED=NO
```

## 11. 许可、商标与仓库

| 事实 | 出处 |
| --- | --- |
| 客户端仓库根 `LICENSE` 是 AGPL-3.0 全文；文件内**没有** SPDX 行，README 的措辞是 "GNU Affero General Public License version 3 (AGPLv3)" | `LICENSE:1-2`、`README.md:271-272` |
| 上游自有的名称、logo 与图片资产不在本许可之内 | `README.md:277-281` |
| `TRADEMARK-POPOPX.md` 存在，并明确商标**尚未注册** | `TRADEMARK-POPOPX.md:5-7` |
| `ASSETS_LICENSE.md` 存在（2026-11-25 起去掉 `-POPOPX` 后缀），且它只授予本分支自己画的图，**不释放**其中列出的与上游同名的文件 | `ASSETS_LICENSE.md:3-5`、`README.md:284-286` |
| 仓库公开、默认分支 `master`（`api.github.com/repos/popopx-chat/popopx-chat` → HTTP 200、`private: false`） | GitHub API |
| 门户自身仓库 `https://github.com/popopx-chat/popopx-chat-web`（默认分支 `main`）；服务号套件 `popopx-service-suite`（`main`）；Mac Node `popopx-mac-node`（`main`） | GitHub API |
| 四个官方站点：`popopx.chat`（本站）、`node.popopx.chat`、`mp.popopx.chat`、`bot.popopx.chat`（第二、第三者的 `server_name` 实测自同级工程配置，第四者按 §15 的 vhost 与证书实测） | `../node-popopx-chat-web/deploy/centos/nginx-node.popopx.chat.conf:64`、`../popopx-service-suite-web/src/lib/site.ts:11`、`../popopx-bot-studio-web/index.html:6` |

⚠️ `README.md:277-281` 这一段原文含上游名称与上游仓库 URL，属 §13 的禁词范围。台账可以指过去，
**页面上只能转述「上游自有的名称与美术资产不在本许可之内」这一层意思，严禁原样引用或链接过去**。


## 12. 发行状态（严禁编造商店链接）

| 事实 | 出处 |
| --- | --- |
| `https://apps.apple.com/us/app/popopx-chat/id6799146157` 无法解析：`itunes.apple.com/lookup?id=6799146157` 返回 `resultCount: 0`（2026-11-22 复测） | 本机 curl 实测 |
| 既有裁定（2026-11-16）：记录未解析前，不渲染任何 App Store / Google Play / APK 徽章或链接 | `../popopx.chat-site/README.md:97-101` |
| 旧站点里残留的 TestFlight 加入码属于别的项目，严禁复用 | `../site-link-sources/`、`../rebrand-log-popopxmq/REPLACE-LOG.md` |

结论：下载区只写状态（内测通道尚未公开）、二维码内容指向 `https://popopx.chat` 本身。

## 13. 页面禁词（`check:out` 会扫产物）

`SimpleX`（任意大小写）、`VPN`、`代理`、`专网`、`军工`、`Bitchat`、任何本地绝对路径（`/Users/…`）。
注意 iOS 源码里有大量上游历史残留，以及旧 bundle id / 旧 URL scheme —— 这些都是**不能**出现在门户产物里的字符串，引用源码路径时也要避开含旧名的目录名。数量按配方实测（2026-11-25，客户端仓库 `master`，HEAD 含 11-25 的文档合并提交）：

```sh
git grep -c "SimpleX Chat" -- 'apps/ios/**.swift' | awk -F: '{s+=$NF} END {print s" 行 / "NR" 文件"}'   # → 223 行 / 221 文件
git grep -i -c "SimpleX"   -- 'apps/ios'           | awk -F: '{s+=$NF} END {print s" 行 / "NR" 文件"}'   # → 882 行 / 369 文件
```

上一版记录的是 225 行与 945 行 / 374 个文件（2026-11-23 实测）；11-25 客户端把根目录文档合并、删掉一份规划稿，行数随之变小。
引用这两个数字时必须连命令一起写出来——光一个行数无法复现。

## 14. v1.2.0 与发布说明三条（下载区，逐行读自出厂 Swift）

| 事实 | 出处 |
| --- | --- |
| 10 处 `MARKETING_VERSION` 实测是 **6 处 `1.2.0` / 4 处 `7.1.2`**：App、NSE、SE 三个 target 都已改号（各 Debug+Release 两条），仍留 `7.1.2` 的是 iOS Tests 与 `POPOPXChat` framework target。主站严禁写「整个工程统一到 1.2.0」，也严禁写「只有 App target 改号」（这句是 2026-11-23 的旧状态，客户端 `056aff908`（2026-11-25）之后不再成立） | `apps/ios/POPOPX.xcodeproj/project.pbxproj:2782,2832,2851,2869,2904,2940,2989,3044,3085,3118` |

复测配方（两条都要跑，光看行号看不出配属）：

```sh
grep -o 'MARKETING_VERSION = [0-9.]*' apps/ios/POPOPX.xcodeproj/project.pbxproj | sort | uniq -c
grep -n -A14 'MARKETING_VERSION' apps/ios/POPOPX.xcodeproj/project.pbxproj | grep -E 'MARKETING_VERSION|PRODUCT_BUNDLE_IDENTIFIER'
```

⚠️ NSE 与 SE 的 `PRODUCT_BUNDLE_IDENTIFIER` 字面量里含上游旧名（形如 `com.popopxchat.popopx` + 旧名 + `-NSE`）。
台账写得出，产物写不得——下载页与产品页一律不得渲染 bundle id。
| 分支自己的版本化裁定（2026-11-24）：脱离上游 7.1.x 编号，SMP/XFTP 握手版本与数据库 Schema 明确不变，iOS 侧由 Xcode Build Settings 手动改 | `CHANGELOG.md:144,147-148` |
| Android / Desktop 侧的 1.2.0 确实写进了 gradle 属性（若要提「其他端也已改号」，只有这一行撑得住） | `apps/multiplatform/gradle.properties:28,31` |
| 双通道路由：SMP ACK 超时 3 秒后同一条消息**并发**再走蓝牙（源码原话 "concurrently, never instead"）；蓝牙 5 秒等不到 BLE_ACK 就回到 SMP 并沿用原 `messageId`；状态名 `dualChannel` | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:10-11,19,271` |
| 徽章商品**恰好 13 个** SKU（文档注释原话 "The 13 in-app purchase products"，枚举 13 个 `case`）；价格与在售状态启动时从 StoreKit 读，`fallbackPriceText` 只在读取失败时兜底 | `apps/ios/Shared/Features/BadgeCredits/PopopxBadgeCreditsModels.swift:145-163`、`apps/ios/Shared/Features/BadgeCredits/PopopxStoreKitManager.swift:130-137` |
| 购买先写本地账本，`Transaction.finish()` **只在本地写入成功之后**被调用（文件头注释与 `finish` 注释两处写明） | `apps/ios/Shared/Features/BadgeCredits/PopopxStoreKitManager.swift:9,354-359` |
| 聊天库口令由用户自设，「Save passphrase in Keychain」是可开关项；改口令入口 `Update database passphrase` | `apps/ios/Shared/Views/Database/DatabaseEncryptionView.swift:73,91,95` |
| 两个数据库各有 `.bak` 副本（`_chat.db.bak`、`_agent.db.bak`，与主库同目录），`hasBackup` 检查、`restoreBackup` 回滚 | `apps/ios/POPOPXChat/FileUtils.swift:50,52,215-231` |

这三条严禁写成「双栈」「Mesh 组网」「加密备份上传」「云同步」：`.bak` 只在设备磁盘上，不是异地备份；口令保护的是本机数据库文件。
另需注意 `CHANGELOG.md:147` 原文自己写了「双栈」这个词——台账指得过去，页面上绝不能原样引用那一行。

## 15. Bot Studio 发布状态（门户已上线，引擎仓库已公开源码）

| 事实 | 出处 |
| --- | --- |
| `bot.popopx.chat` 与 `popopx.chat`、`node.popopx.chat` 解析到同一台服务器（43.129.40.33） | 本机 `dig +short` 实测（2026-11-24） |
| 门户已上线：普通 HTTP 返回 301，跳转目标是 `Location: https://bot.popopx.chat/`（`Server: nginx/1.14.1`），不再是该机的 nginx 默认测试页 | 本机 `curl --noproxy '*' -sI http://bot.popopx.chat` |
| 443 以 HTTP/2 返回 200：`content-length: 30246`、`last-modified: 2026-11-24 10:01:15 GMT`，并带 `x-frame-options: DENY` 与 `x-content-type-options: nosniff` | 本机 `curl --noproxy '*' -sI https://bot.popopx.chat` |
| 证书就是按这个域名签的：`subject: CN=bot.popopx.chat`，SAN 命中，verify ok，签发者 `O=Let's Encrypt; CN=YR1`，有效期到 2027-02-22 | 本机 `curl --noproxy '*' -sv https://bot.popopx.chat` |
| 页面只加载自己目录里的文件：css、js、图标全是相对路径；两个 js 里绝对 URL 0 个、fetch 0 次，产物里没有任何第三方主机与统计脚本 | 本机对线上 HTML 与 assets/js/app.js、assets/js/i18n.js 的 grep |
| 站点是零构建静态页、自带 18 语文案：无框架、无打包器、无 CDN、无 Web 字体请求、无统计脚本 | `../popopx-bot-studio-web/README.md:3-4` |
| 线上首屏的标题与描述由站点仓库写出：POPOPX Bot Studio，self-hosted bot factory | `../popopx-bot-studio-web/index.html:6-7` |
| 引擎仓库 `https://github.com/popopx-chat/popopx-bot-studio`（默认分支 main、AGPL-3.0-only）已公开源码：今日实测该树 **40 个条目 / 32 个文件**，顶层含 README.md、README.en.md、studio/、official_tools/、site/、docs/、docker-compose.yml、install_macos.sh、install_ubuntu22.sh。此前记录「树里只有 LICENSE 一个条目」是 2026-11-24 的状态，已失效 | GitHub API（配方见下） |
| **服务端配置签名推送引擎（popopx-server-up-bot）源码待公开**：本次复测（2026-11-25）该仓库 API 返回 404，且不在 api.github.com/users/popopx-chat/repos 的 78 个公开仓库里；本地工作副本的 origin 指向它，说明尚未推送。门户按裁定保留对它的能力叙述，但必须带「开发中 / 源码待公开」标记，**不挂仓库链接**，也不写「已开源」 | GitHub API（配方见下） |
| 两个易混点已核实：api.github.com/orgs/popopx-chat 返回 404，即 github.com/popopx-chat 是**用户账号**而非组织；popopx-bot-studio 内 0 处 cluster.json / SERVER_CFG / Ed25519 签名相关代码，它是 Bot 工厂与插件网关，**不能**用来指代上面那个签名引擎 | GitHub API、本机 `git grep` 实测（2026-11-25） |
| 任务书点名的六个仓库全部公开（popopx-chat、popopx-chat-web、popopx-bot-studio、popopx-bot-studio-web、popopx-service-suite、popopx-mac-node）；产品页只渲染 API 的 name / default_branch / license / pushed_at，**严禁渲染 description 字段**——上游派生项目的描述含 §13 禁词 | `api.github.com/users/popopx-chat/repos`（2026-11-25） |
| **未上文案，记录给下一位**：站点仓库自称正式域名是 apex，即 `CNAME`、canonical、全部 hreflang、og:url、robots 的 Sitemap 行与 sitemap 的 loc 写的都是 popopx.chat，而 apex 由本站 nginx 的 server_name 持有（本仓库 deploy/centos/nginx-popopx-main.conf 的 80 与 443 两块）。两个站点对同一个 apex 同时主张归属是 SEO 冲突，应由该站改掉；主站文案不引用这一点 | `../popopx-bot-studio-web/README.md:6-8`、`../popopx-bot-studio-web/CNAME:1`、`../popopx-bot-studio-web/index.html:10-11,33`、`../popopx-bot-studio-web/robots.txt:7`、`../popopx-bot-studio-web/sitemap.xml:6` |

复测配方（网络与仓库部分 2026-11-24 实测，GitHub 仓库状态部分 2026-11-25 复测；域名、证书与仓库内容都会变，引用时必须重跑并改日期。注意本机 curl 走 SOCKS5 代理会让 TLS 探测假超时，直连需 `--noproxy '*'`）：

```
dig +short bot.popopx.chat popopx.chat node.popopx.chat mp.popopx.chat
curl --noproxy '*' -sI http://bot.popopx.chat | head -6                 # 301 + Location
curl --noproxy '*' -sI https://bot.popopx.chat | head -10               # HTTP/2 200 与响应头
curl --noproxy '*' -sv https://bot.popopx.chat 2>&1 | grep -i "subject\|issuer\|altname\|expire\|verify ok"
curl --noproxy '*' -s https://bot.popopx.chat | grep -oE '(src|href)="[^"]*"' | sort -u
for f in assets/js/app.js assets/js/i18n.js; do
  curl --noproxy '*' -s "https://bot.popopx.chat/$f" | grep -c "http"   # 两个都是 0
done
curl -s "https://api.github.com/repos/popopx-chat/popopx-bot-studio/git/trees/main?recursive=1" | jq -r '.tree[].path'      # 2026-11-25 实测 40 条目 / 32 文件：README.md、studio/、official_tools/、site/、docs/ 等
curl -s "https://api.github.com/repos/popopx-chat/popopx-bot-studio-web/git/trees/main?recursive=1" | jq -r '.tree[].path' | head -12
grep -c "server_name  popopx.chat;" deploy/centos/nginx-popopx-main.conf   # 2（本站持有 apex）
curl -s "https://api.github.com/repos/popopx-chat/popopx-chat" | jq -r '.default_branch, .private'                        # master / false
curl -s -o /dev/null -w '%{http_code}\n' "https://api.github.com/repos/popopx-chat/popopx-server-up-bot"                   # 404 = 未公开（2026-11-25）
curl -s "https://api.github.com/users/popopx-chat/repos?per_page=100" | jq -r '.[].name' | grep -c '^popopx'               # 公开仓库数；orgs/popopx-chat 则 404（是用户账号）
grep -c "MARKETING_VERSION = 1.2.0" apps/ios/POPOPX.xcodeproj/project.pbxproj   # 6（2026-11-25 起，含 NSE 与 SE）
grep -c "MARKETING_VERSION = 7.1.2" apps/ios/POPOPX.xcodeproj/project.pbxproj   # 4（Tests 与 framework target）
awk 'NR>=148 && NR<=163 && /^    case /' apps/ios/Shared/Features/BadgeCredits/PopopxBadgeCreditsModels.swift | wc -l   # 13
```


## 16. 四端协同链路的实测口径（首页生态全景图）

首页 `EcosystemPanorama` 只画这一节撑得住的线：实线 = 下面某一行指得出源码，虚线 = 跨产品调度器仍无调用。
以下出处在 2026-11-27 逐条 `sed` 回读过；配方在本节末，引用前重跑。

| 事实 | 出处 |
| --- | --- |
| **Chat ↔ Mac Node 的真实通路不是手机连 18920，而是节点在本机拉起本 fork 的 `popopx-chat` 守护进程**：`--chat-server-port` 打开 WebSocket 控制口，节点写死 `5225`（客户端库用的就是这个值），plain `ws://`、无 TLS、无任何鉴权 | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:60-64,66-67`、`src/Popopx/Chat/Options.hs:408`、`../popopxmq/src/Popopx/Messaging/Transport/Server.hs:169-171` |
| 该 actor 拥着这条链的全部环节：守护进程生命周期（探测、常驻 `Process`、崩溃重启上限、SIGTERM→SIGKILL）、回环控制通道、Ed25519 节点身份密钥（0600 权限）、`PPXNODE1-…` 配对凭据、**已配对设备白名单（节点唯一真正掌控的授权门）**、把引擎结果送回 iOS（带磁盘 outbox 兜底） | `../PopopxMacNode/Sources/PopopxMacNode/Core/MacNodePopopxBridge.swift:7-15` |
| 节点只驱动自己 fork 的 CLI：上游构建「说的是另一套线协议，探测它只会把一个看得见的缺失依赖变成一次无法解释的握手失败」，所以根本不去 probe | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:69-72` |
| 邀请链接的 scheme 字面量是 `popopx:/`，协议侧同名同源；节点侧还有长度上限与敏感字符黑名单 | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:74-76,81-84`、`../popopxmq/src/Popopx/Messaging/ServiceScheme.hs:23` |
| 手机**从不**打开 `127.0.0.1:18920`：那是节点侧给同一台 Mac 上的工具用的本机控制台桥，配对屏上的这一段是「可复制的契约」，源码原话 "The app **never opens** that socket" 与 "on a phone that address is the phone" | `apps/ios/Shared/Features/Discover/MacNodePairingSheet.swift:10-12,620-622` |
| 客户端侧只是把这条契约原样展示（host、port、token 头名三个常量拼出地址串），没有任何连接测试 | `apps/ios/Shared/Features/Discover/DiscoverCatalogModels.swift:73-77`、`apps/ios/Shared/Features/Discover/MacNodePairingSheet.swift:650-656` |
| 控制台被钉在回环是安全模型而不是偏好：`requiredInterfaceType = .loopback`、`acceptLocalOnly`、`includePeerToPeer = false`，注释写明这台机器上除了 bearer token 没有别的东西在鉴权 | `../PopopxMacNode/Sources/PopopxMacNode/WebConsole/LocalWebConsoleServer.swift:6888-6894` |
| 本机推理链有实现：Ollama 探活走 `http://127.0.0.1:11434`（一次回环往返）；装机步骤依次是 FFmpeg/ffprobe、uv、Ollama、按内存拉取适配的 Qwen、初始化 LTX-2.5 MLX 工作区、下载并校验权重、端到端自检 | `../PopopxMacNode/Sources/PopopxMacNode/Core/HardwareProfilerAndInstaller.swift:437-439,516-522` |
| 模型清单恰好四项，控制台按此顺序列：`qwen3.8-27b-q8_0`、`qwen3.8-27b-q4_k_m`、`qwen3.8-9b-q4_k_m`、`inkling-2-mini`（约 20 GB 权重、建议 32 GB 起步；节点没发布参数量，`parameterBillions` 就留 `nil` 而不是猜一个进界面） | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:975-981,991-997,1007-1013,1022-1031` |
| 内存阶梯三档（≥96 / 48–95 / <48 GB）与每档的 LTX 权重写法、理由都是代码里的字面量；<48 GB 档的原话是「轻推理，重视频交给 mesh」 | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:558,560,562,567-569,745-746,762-763,779-780` |
| 每个任务的依赖都写明：需要本地模型的任务是 `["ffmpeg", "ollama"]`，不需要的只 `["ffmpeg"]`；另有一次性 `DispatchSource` kill switch，「卡死的 ffmpeg 永远 wedge 不住」后续流程 | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:1809,3754-3756` |
| **Chat ↔ 服务号套件**这一头有客户端实现撑着：服务号两级菜单、动态业务卡片、进程外 `SFSafariViewController` 的 H5、零知识频道信封 `popopx.channel.enc.v1`（见 §9）；套件侧的对应说法是「线协议与出厂 iOS 客户端逐字节对齐」 | `apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:40-42`、`../popopx-service-suite/README.en.md:9-12` |
| 套件的五个组成是 README 自述：FastAPI 网关、POPX-CP 计量、带零知识密钥轮换的频道信封加密、九个业务插件、浏览器管理台；且声明不链接、不修改、不重分发 node 的任何代码 | `../popopx-service-suite/README.en.md:9-13` |
| 注意同名词：**套件脚本里的 `node` 指它自己在 `127.0.0.1:5225` 拉起的消息服务端**（gateway 在 8080），与 Mac 节点无关，全景图不把这两个 node 连成一条线 | `../popopx-service-suite/README.en.md:12-13,71,77` |
| 九个插件是九个命名字段（`ai_agent`、`alert_ops`、`privacy_sso`、`polls`、`web3_bridge`、`workflow_webhook`、`carddav_connector`、`caldav_connector`、`slack_discord`），前四项默认开、后五项默认关；`POPOPX_PLUGIN_<NAME>=0` 能把任意一个从 enabled 列表里摘掉，这套开关是网关自测逐条断言过的 | `../popopx-service-suite/gateway/app/config.py:250-259,861-868` |
| 首页生态全景图与生态页的服务套件卡现都写「九个」：两处由同一组证据撑着——九个命名字段、插件目录九个模块、README 原话 "nine business plugins"；两个组件各 18 语在本轮逐槽核对，没有任何一槽残留「八」 | `../popopx-service-suite/gateway/app/config.py:250-259`、`./src/components/EcosystemPanorama.tsx:143-160`、`./src/components/EcosystemHub.tsx:326-343` |
| 生态页套件卡的「129 项 HTTP 接口」是两个数相加：网关自身在 create_app 里声明的 59 条由官方命令打印，九个插件另加 70 条经 include_router 挂载、官方命令数不到；逐插件拆分（workflow_webhook 12、alert_ops 10、web3_bridge 9、polls 8、slack_discord 7、ai_agent 6、privacy_sso 6、carddav_connector 6、caldav_connector 6）与 59+70 的口径同时写在套件中英两份 README 里，18 语槽位已按 129 统一 | `../popopx-service-suite/README.md:406-412`、`../popopx-service-suite/README.en.md:492-498`、`./src/components/EcosystemHub.tsx:326-343` |
| **Bot Studio 是 `popopx-cli` 的 supervisor**，不是聊天客户端的扩展：一个进程经回环 WebSocket 管任意多个 bot 实例；仓库零内置二进制（"Zero binary bundling"），运行时只驱动外部 cli，安装器可按需把二进制取到系统可执行目录（README 给了具体路径） | `../popopx-bot-studio/README.en.md:3-6,16-18` |
| Studio 的控制面同样只在回环：控制台默认 `127.0.0.1:8090`，非回环绑定必须显式 `STUDIO_ALLOW_LAN=1` 或 `--lan`；bot 控制端口从 `BOT_WS_PORT_BASE`（默认 5230）起到 5299 止，"never 0.0.0.0"；compose 也只发布回环 | `../popopx-bot-studio/README.en.md:67,82-83,182-183` |
| SMP Agent 协议既有规范也有服务端实现：规范头两行是 "Version 7, 2025-01-24" 与 "# SMP agent protocol - duplex communication over SMP protocol"；实现侧 Agent.hs 4558 行、Agent/Protocol.hs 2412 行，`data AgentErrorType` 是错误词汇表本体 | `../popopxmq/protocol/agent-protocol.md:1-3`、`../popopxmq/src/Popopx/Messaging/Agent.hs:1`、`../popopxmq/src/Popopx/Messaging/Agent/Protocol.hs:2161` |
| iOS 侧对 agent 层的可见面只有 Decodable 镜像（`AgentErrorType` 与八个 `A_*` 的 `SMPAgentError`）——「客户端能解码 agent 层错误」可以写，「客户端已实现跨组件编排」不可以写 | `apps/ios/POPOPXChat/APITypes.swift:1021,1185-1193` |
| **跨产品调度器仍是 0 处，但「跨组件」已不能一概而论。** 四个仓库之间没有共享任务总线：Bot Studio 的派活只在同一个 Studio 进程内、只在兄弟 Bot 之间（§19 第 1–4 行），Mac Node 的助手环只由本机 `LocalTaskScheduler` 驱动（§19 第 6–7 行）。旧版三条 grep 按文件计数现在分别是 2／3／3，逐条读全是别的东西：Bot Studio 与套件的 `opaque_invite_codec` 共享密封链接格式常量（注释与自测断言，不是调用；套件里唯一 `.py` 命中的 `8090` 是 hex 字面量 `…08090a…` 的子串假阳性，另两个命中是 `.pyc` 与向量 JSON），Mac Node 的 `PrivacyToolRoute` 把 `"bot-studio"` 当审计来源标签（回环工具面的调用方名字，不是调度器）。全景图 `Bot Studio · Service Suite · Mac Node` 那一条仍虚线 + Planned | 本机 grep（配方见下）、`../popopx-bot-studio/studio/app/orchestrator.py:1-23`、`../PopopxMacNode/Sources/PopopxMacNode/Assistant/LocalTaskScheduler.swift:1-20`、`../PopopxMacNode/Sources/PopopxMacNode/PrivacyBridges/PrivacyToolEngine.swift:93,166` |

复测配方（在四个仓库的公共父目录里跑，即同时放着 `popopx-chat` 与 `popopx-chat-web` 的那一级）：

```sh
sed -n '60,64p;69,72p;74,76p' PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift
sed -n '558p;560p;562p;567,569p;745,746p;762,763p;779,780p;975,981p;991,997p;1007,1013p;1022,1031p;1809p;3754,3756p' PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift
sed -n '7,15p' PopopxMacNode/Sources/PopopxMacNode/Core/MacNodePopopxBridge.swift
sed -n '437,439p;516,522p' PopopxMacNode/Sources/PopopxMacNode/Core/HardwareProfilerAndInstaller.swift
sed -n '6888,6894p' PopopxMacNode/Sources/PopopxMacNode/WebConsole/LocalWebConsoleServer.swift
sed -n '8,12p;617,625p;648,658p' popopx-chat/apps/ios/Shared/Features/Discover/MacNodePairingSheet.swift
sed -n '73,77p' popopx-chat/apps/ios/Shared/Features/Discover/DiscoverCatalogModels.swift
sed -n '408p' popopx-chat/src/Popopx/Chat/Options.hs
sed -n '169,171p' popopxmq/src/Popopx/Messaging/Transport/Server.hs
sed -n '23p' popopxmq/src/Popopx/Messaging/ServiceScheme.hs
sed -n '1,3p' popopxmq/protocol/agent-protocol.md
sed -n '2161p' popopxmq/src/Popopx/Messaging/Agent/Protocol.hs
wc -l popopxmq/src/Popopx/Messaging/Agent.hs popopxmq/src/Popopx/Messaging/Agent/Protocol.hs
sed -n '9,13p;71p;77p' popopx-service-suite/README.en.md
sed -n '250,259p;861,868p' popopx-service-suite/gateway/app/config.py
ls popopx-service-suite/gateway/app/plugins/ | grep -E '\.py$' | grep -v __init__ | wc -l   # 9（插件模块数）
(cd popopx-service-suite/gateway && python3 -m app.main --print-routes | tail -1)   # routes: 59, all guarded or explicitly public（纯 AST 解析源码，不需要装依赖）
for f in popopx-service-suite/gateway/app/plugins/*.py; do printf '%s %s\n' "$(basename $f .py)" "$(grep -cE '@[A-Za-z_]+\.(get|post|put|patch|delete)\(' $f)"; done   # 逐插件合计 70；59+70=129 = 生态页卡的数字
sed -n '9,13p' popopx-service-suite/README.en.md
sed -n '492,498p' popopx-service-suite/README.en.md
sed -n '3,6p;16,18p;67p;82,83p;182,183p' popopx-bot-studio/README.en.md
sed -n '1021p;1185,1193p' popopx-chat/apps/ios/POPOPXChat/APITypes.swift
grep -rlE "service-suite|POPX-CP|mp\.popopx" popopx-bot-studio --include="*.py" | wc -l    # 2：格式对齐注释与自测断言，不是调用
grep -rlE "bot-studio|bot\.popopx|8090" popopx-service-suite/gateway | wc -l              # 3：唯一 .py 命中是 hex 子串假阳性，另两个是 .pyc 与向量 JSON
grep -rlE "bot-studio|service-suite" PopopxMacNode/Sources | wc -l                        # 3：格式对齐注释 + PrivacyToolRoute 的审计来源标签，不是调度调用
```

三条严禁：不得写成「手机经 127.0.0.1 直连 Mac 节点」（§16 第 5 行否掉了）；不得把套件脚本里的 `node`
当成 Mac 节点（第 14 行）；跨产品调度器（job bus）与 PAP 仍 0 处，不得写成既成事实或任何「四端已自动协同」。
但**可以**写两件已落地的事：手机↔Mac Node 的助手环（§19 第 6–12 行）与 Bot Studio 经回环隐私工具调用 Mac Node
（§19 第 5 行）；两者都不是共享调度器，句子必须把边界一起写出来。
另外「企业服务 / 企业治理」在四个仓库里 0 处证据，一律不写——套件侧可写的是九个业务插件与 POPX-CP 计量。

## 17. 首页「AI 三层 + 六大场景」与端侧推理的实测口径（2026-11-27 实测）

`AiThreeLayers.tsx` 与 `UserScenariosGrid.tsx` 是首页新增的两块普通用户叙事。规则与 §16 一样：
每一个「已可用」都必须落在下面某一行，或 §3/§4/§5/§6/§9/§15/§16 已经撑住的行上；「演进中」指缺**代码**，不缺计划。
以下出处在 2026-11-27 逐条 `sed` 回读过；组件文件里不写 `file:line`，出处只在本节。

| 事实 | 出处 |
| --- | --- |
| **端侧确有一条真推理链，但它是安全传感器而不是助手**：同一帧里并行跑 `VNDetectFaceRectanglesRequest`（只数人头）与 CoreML 目标检测（手机/相机）；`configuration.computeUnits = .cpuAndNeuralEngine`，注释原话「only on the ANE is this 320x320 model down to single-digit milliseconds」；用途原话「We only use "is there a phone"」 | `apps/ios/Shared/Features/SecureEphemeral/PopopxCameraGuardEngine.swift:11,229-230,385-387,391-392` |
| 模型随仓库出厂：`model.mlmodel` 167,513 字节、`weight.bin` 5,257,128 字节（≈5.0 MiB），`apps/ios/Resources/SecureEphemeral/` 与 `apps/ios/Shared/Features/SecureEphemeral/` 两份 `apps/ios/Shared/Features/SecureEphemeral/POPOPXAntiSpyDetector.mlpackage/Manifest.json` 同哈希；运行时只认 Xcode 预编译出的 `POPOPXAntiSpyDetector.mlmodelc`（注释：bare `.mlpackage` in the bundle equals no model at all），取不到就返回 nil、整条链降级，用户侧另有总开关 | `apps/ios/Shared/Features/SecureEphemeral/PopopxCameraGuardEngine.swift:397-406,409-410`、`apps/ios/Shared/Features/SecureEphemeral/PopopxSecureWindowManager.swift:107` |
| **客户端 0 处对话/生成式模型、0 处语音识别、0 处本地推理服务**：十个标识符大小写不敏感全仓 0 命中（配方见下）。两个已知假阳性**不在**该列表内，复测时别把它们算成实现：口令词表里的英文单词 `whisper`、CoreFoundation 的 `CFStringTokenizer` | `apps/ios/Shared/Features/AntiTheftDuress/PopopxDuressAuthManager.swift:536`、`apps/ios/Shared/Views/Chat/ChatItem/FramedItemView.swift:517` |
| 第二层的「已可用」= §15 的门户与引擎仓库 + §16 的 supervisor 事实：Studio 一个进程经回环 WebSocket 管任意多个 `popopx-cli` 实例、零内置二进制、控制台默认 `127.0.0.1:8090`、bot 控制端口 5230–5299「never 0.0.0.0」；本轮同一条「已可用」再加编排器：默认拒绝的 (origin,target,capability) 授权、五个只读投影、11 条 `/api/agent/orch*` 端点（§19 第 1–4 行） | `../popopx-bot-studio/README.en.md:3-6,16-18,67,82-83,228-230,345-368`、`../popopx-bot-studio/studio/app/orchestrator.py:1-23`、`../popopx-bot-studio/studio/app/agent_admin.py:709-850` |
| 第二层的「演进中」= 编排仍止步于工作台边界：orchestrator 只在同一个 Studio 进程内、只在兄弟 Bot 之间派活，跨产品编排器仍 0 处，PAP 仍 0 命中（§19 第 1 行） | `../popopx-bot-studio/studio/app/orchestrator.py:1-23`、`../popopx-bot-studio/studio/app/orchestrator_local.py:1-30`、`../popopxmq/protocol/agent-protocol.md:1-3` |
| 第三层的「已可用」两半来自 §9（服务号两级菜单、动态卡片、`popopx.channel.enc.v1` 零知识信封、进程外 H5）与 §16（Mac Node 本机 Ollama/Qwen/LTX-2.5 MLX + FFmpeg，控制台 `requiredInterfaceType = .loopback`）；本轮再把 Mac Node 助手环加进同一条「已可用」：两个默认关闭的定时任务（简报上午 8 点、巡检 30 分钟）、邮件只读 EXAMINE/BODY.PEEK、家庭哨兵只提案、HMAC 回执（vault 0600）、签名 Discover 仅局域网、`::POPOPX_UPD::v1` 更新卡（§19 第 6–12 行） | `apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:40-42`、`../PopopxMacNode/Sources/PopopxMacNode/WebConsole/LocalWebConsoleServer.swift:6192-6205`、`../PopopxMacNode/Sources/PopopxMacNode/Assistant/LocalTaskScheduler.swift:1-20`、`../PopopxMacNode/Sources/PopopxMacNode/Assistant/PersonalAssistantManager.swift:142-232` |
| 第三层的「演进中」与第六张卡同一条证据：跨产品共享调度器仍 0 处；已打通的是「已配对手机 ↔ 已绑定 Mac Node」这一条，Bot Studio 只经回环隐私工具调用节点，不是任务总线（§19 第 5、9 行）。第六张卡已由「一句话排好日程、跨端接力」改写为这条真实闭环 + 缺口 | `../popopx-bot-studio/studio/app/mac_node_bridge.py:1-53`、`../PopopxMacNode/Sources/PopopxMacNode/Assistant/LocalTaskScheduler.swift:1-20` |
| 三处用词不同、含义同一把尺子：生态图 `已打通 / Live` 与 `生态协同演进中 / Planned`（实线 = §16 指得出源码，虚线 = 计划），新卡片 `已可用 / Available` 与 `演进中 / Evolving`，生态页 AgentProtocol 写「SMP Agent Protocol: defined and in use」与「PAP … zero occurrences … Not yet implemented」。严禁把任何虚线/演进中的说法改写成既成事实。第六张卡（跨端协作）现为 Available，仍为 Evolving 的只剩「Personal AI」一张（端侧助手本体），与 §13 的禁词扫描互不影响 | `./src/components/EcosystemPanorama.tsx:291,312`、`./src/components/AiThreeLayers.tsx:294,315`、`./src/components/UserScenariosGrid.tsx:455,482`、`./src/components/AgentProtocol.tsx:77,98` |
| 卡片图标是页面内画的 `<svg>` 线条：18 语共用同一组 path，无 `<text>`、无 `<image>`、无外链，因此不产生任何网络请求，也无需翻译 | `./src/components/UserScenariosGrid.tsx:338-443` |
| **四层品牌主张是品牌叙述，不是技术断言**（2026-11-26 用户裁定）：`Connect Everything.` 主张、`自由连接 · 私密沟通 · 智能协作` 宣传语、`POPOPX — 隐私优先的智能连接平台` 定位、以及「人、AI、Agent、设备和服务安全连接、自由协作」的生态使命。可被访客验证的仍然是 Hero 的四枚徽章与本表；`SEO_DESCRIPTION` 每语首句必须与 `BRAND_MISSION` 同槽逐字节相同 | `./src/lib/seo.ts:60,90,140`、`./src/components/HeroSection.tsx:47,70-73` |
| `Connect Everything.` 故意不进 18 槽 map：一条拉丁标语在 7 个非拉丁槽里各重复一次，就是残字探针要报的 12+ 条警告；它与产品名一样按 locale-free 打印，解释句交给 `BRAND_CLAIM_LOCAL` | `./tools/check-i18n.mjs:85,171-183`、`./src/lib/seo.ts:53-60` |

复测配方（客户端仓库根目录跑前四条，其余在四个仓库的公共父目录）：

```sh
sed -n '11p;229,230p;385,392p;397,410p' apps/ios/Shared/Features/SecureEphemeral/PopopxCameraGuardEngine.swift
grep -n "const STATUS_AVAILABLE\|const STATUS_EVOLVING\|const L1_DONE\|const L1_NEXT" src/components/AiThreeLayers.tsx
grep -n "const STATUS_LIVE\|const STATUS_PLANNED" src/components/EcosystemPanorama.tsx
grep -n "const PROTOCOL_STATUS\|const PAP_STATUS" src/components/AgentProtocol.tsx
stat -f "%N %z" apps/ios/Resources/SecureEphemeral/POPOPXAntiSpyDetector.mlpackage/Data/com.apple.CoreML/model.mlmodel \
  apps/ios/Resources/SecureEphemeral/POPOPXAntiSpyDetector.mlpackage/Data/com.apple.CoreML/weights/weight.bin
md5 -q apps/ios/Resources/SecureEphemeral/POPOPXAntiSpyDetector.mlpackage/Manifest.json \
  apps/ios/Shared/Features/SecureEphemeral/POPOPXAntiSpyDetector.mlpackage/Manifest.json      # 相同
grep -rniE --include='*.swift' "MLComputeUnits|generateText|VNRecognizeText|SFSpeechRecognizer|AVSpeechSynthesizer|Ollama|llama|ggml|gguf|ONNX" apps/ios | wc -l    # 0
python3 - <<'EOF'
import re
L=["en","ru","de","fr","it","nl","cs","zh-Hans","zh-Hant","es","pl","ja","th","fi","uk","bg","tr","hu"]
s=open("src/lib/seo.ts",encoding="utf-8").read()
def m(name):
    i=s.index("export const %s"%name); j=s.index("\n};", i)
    return {k:re.search(r'\n\s*"?"%s"?:\s*"((?:[^"\\]|\\.)*)"'%k,s[i:j]).group(1) for k in L}
d,mi=m("SEO_DESCRIPTION"),m("BRAND_MISSION")
print("SEO_DESCRIPTION 首句与 BRAND_MISSION 不一致的槽数:", sum(1 for k in L if not d[k].startswith(mi[k])))
EOF
```

三条严禁：不得写「客户端已有端侧助手/意图识别」（第 3 行是 0）；不得把那份 5 MiB 权重说成对话或生成式模型（第 1 行的用途原话只管「画面里有没有手机」）；
不得把跨产品调度器、PAP 或「一句话排好日程、跨端接力」写成已可用；但第六张卡已改写为「已配对手机 ↔ 已绑定 Mac Node」的真实助手环，可以写「已打通」，同时必须写出跨产品调度器仍缺（第 7 行、§19）。
另外「双栈 / Mesh 组网 / 加密备份上传 / 云同步 / 企业服务」仍是禁词（§13），品牌主张四句里一个字都不能带上它们。

## 18. 首页「三大连接壁垒」与「概念交互示意」的实测口径（2026-11-27 实测）

`ConnectionPillars.tsx`（13 句，实测 2 句黄点：`P2_I5`、`P3_I4`）与 `ConnectionDemo.tsx`（3 场景 × 4 步，实测 2 步黄点：`S3_STEP2`、`S3_STEP3`）插在 `UserScenariosGrid` 之后、`FeaturesGrid` 之前。尺子与 §16/§17 同一把：每个「已可用」都指得出下面某一行的代码，指不出的写「演进中」并标黄点。
以下出处在 2026-11-27 逐条 `sed` 回读过（客户端与兄弟仓库均在各自工作区根目录下打开）；组件文件里不写 `file:line`，出处只在本节。

| 事实 | 出处 |
| --- | --- |
| **场景一的脱敏是结构性的，不是关键词过滤**：Mac 节点的 EventKit 桥原话「summary, location, notes and attendees die there and cannot reach a response builder, an audit row, a log line or the snapshot」，取忙闲时只构造 `RedactedBusyInterval(start:end:)`；唯一写标题的地方是提案落地，而写进去的文本按注释「Every string here was authored by POPOPX」——桥自己不引用主人既有日程 | `../PopopxMacNode/Sources/PopopxMacNode/PrivacyBridges/EventKitAvailability.swift:14-16,292,312,153-155,327` |
| Studio 侧同一件事由两道闸把住：出站只投影白名单键 `MASKED_KEYS = ("start","end","tz","free","ref")`，`FORBIDDEN_KEYS` 里显式含 `title` 与 `email`，`mask_slots` 逐帧重建而不是删字段；入站帧先过 `_guard_body`（在 HMAC 之前），协商轮数封顶 6 | `../popopx-bot-studio/studio/app/a2a.py:68,81,97,218,239-240,486-494,524,673` |
| **「收敛写 0 字节」与「点击才写」都是源码原话**：`converged 之后只产出一条 pending 提案，日历一个字节都不写`；卡片侧 `主人没点之前，日历一个字节都不会写`，批准回执是常量 `ppxok`；节点侧「approval *is* the execution attempt」（没有独立的 approved 态），拒绝分支自己写「已拒绝，系统日历与文件未发生任何改动」，执行只在 `approve(id:receipt:)` 之后 | `../popopx-bot-studio/studio/app/a2a.py:22-24`、`../popopx-bot-studio/studio/app/eco_cards.py:43,307`、`../PopopxMacNode/Sources/PopopxMacNode/PrivacyBridges/PrivacyProposalLedger.swift:59-68,467,504,514,520,530` |
| **批准有两个入口，必须说成一个闸门**：「the console button and a signed card reply from a paired phone」，令牌把 HMAC 绑在 `id + verb` 上（自限域）并用 constant-time 比较，防止回环调用方逐字节试探；Studio 侧「写日历的唯一入口：先过 Mac Node」是同一条链的编排端 | `../PopopxMacNode/Sources/PopopxMacNode/PrivacyBridges/PrivacyProposalLedger.swift:280-286`、`../popopx-bot-studio/studio/app/agent_runtime.py:1237,1259` |
| **iOS 客户端在这三个场景里只负责卡片回执**：`::CB::` 静默回执前缀与注释都对得上，但 `approveCommand`、`pending_user_approval`、日历可用性协商在 `apps/ios` 全为 0 命中——所以面板的 `LEAD`/`DISCLAIMER` 只写「仓库里已端到端跑通」「在替身机器人和 Mac 节点这一侧都有实现」，不得写「iOS 客户端已端到端跑通」 | `apps/ios/Shared/Features/ServiceAccount/PopopxEcoModels.swift:170,654`、`./src/components/ConnectionDemo.tsx:114,140` |
| **审计行的字段名是实测出来的**：节点侧 `PrivacyAuditEntry` 只有 at、domain、action、outcome、detail，且台账自己不写 EventKit 也不落盘；Studio 侧 `negotiation_audit` 的列正是面板念的那五个——`stage`（9 个取值的 CHECK）、`event`、`level`（info/warn/error）、`latency_ms`、`ts`，外加本机的 `HOME` 隔离 | `../PopopxMacNode/Sources/PopopxMacNode/PrivacyBridges/PrivacyProposalLedger.swift:195-215,240-242`、`../popopx-bot-studio/studio/app/database.py:400-417` |
| **一键撤销确实存在，粒度是整条链接/整个对端/整台设备**：Studio 的 revoke 路由与被撤链接下一次访问直接报错是两段代码，控制台一次点击的按钮在同一文件；配对手机侧是 `revokeDevice(publicKey:)` 加控制台 `Revoke` 按钮；节点自己的威胁模型写「Revocation removes the whitelist entry, which removes all authority. It does not delete the SMP connection」——这句必须在，否则「撤销」会被读成删连接。另一端是 Bot Studio 的 `agent_task_grants`：单条授权可按 id 停用或删除（`set_grant_enabled` / `delete_grant`），但那只在一个工作台内部的 (origin,target,capability) 三元组上生效，不是网络网关的范围串 | `../popopx-bot-studio/studio/app/agent_admin.py:643-644,755-769`、`../popopx-bot-studio/studio/app/database.py:1530-1533,2029-2045`、`../popopx-bot-studio/studio/app/guest_portal.py:1811-1813`、`../popopx-bot-studio/studio/static/index.html:1762-1765`、`../PopopxMacNode/Sources/PopopxMacNode/Core/MacNodePopopxBridge.swift:59-60,1298`、`../PopopxMacNode/Sources/PopopxMacNode/WebConsole/LocalWebConsoleServer.swift:3634,6372-6380,6685` |
| **但「网关校验点分范围串」仍是 0 实现**：五个仓库按 `x.y:read` 形态扫，命中 0 行，全站唯一出现处就是面板自己打印的那枚标签；套件里唯一像 scope 的东西是 `DEFAULT_SCOPE = "openid"`，其注释原话「the scope in the preimage is a binding, not a label」——绑进令牌，不拦动作。Bot Studio 现在确有五个点分**能力名**（`reply.compose`、`router.plan`、`calendar.availability`、`workspace.summarize`、`ledger.profile`），但它们是同一个工作台内的只读投影、按 (origin,target,capability) 默认拒绝，不是网络网关的范围串，也不带 `:read` 后缀。所以 S3_STEP2 与 S3_STEP3 仍是黄点，`P2_I5` 仍是「演进中」（§19 第 2–3 行） | `../popopx-service-suite/gateway/app/plugins/privacy_sso_plugin.py:481,791`、`../popopx-bot-studio/studio/app/orchestrator.py:84-117`、`./src/components/ConnectionDemo.tsx:781,789` |
| **场景二的回环是真的，但那串回环地址加端口是标签而不是链路**：控制台 `requiredInterfaceType = .loopback` + `acceptLocalOnly = true`，且 `isLoopbackLiteral` 注释「`0.0.0.0`、局域网地址和主机名在套接字存在之前就被拒」；默认端口 18920、配对前缀 `PPXNODE1` 都是出厂常量（客户端 Discover 目录同串）。手机走 SMP 队列摸到这台机器，从不拨这个口——桥侧控制口注释自述「loopback-only but unauthenticated」，唯一真正的授权闸门是配对白名单 | `../PopopxMacNode/Sources/PopopxMacNode/WebConsole/LocalWebConsoleServer.swift:6891-6894,7095-7098`、`../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:55,58`、`../PopopxMacNode/Sources/PopopxMacNode/Core/MacNodePopopxBridge.swift:13,46,55,59-60,2288`、`apps/ios/Shared/Features/Discover/DiscoverCatalogModels.swift:65-66,73-77` |
| **入站身份只认配对表**：「入站帧的合法身份来源：只认配对表；没配对就返回空串，帧被拒」；撤销配对的 `unpair_peer` 与一次点击的 Unpair 按钮同一条路径；出站结果靠落盘 outbox 按队列顺序补投，超 30 天丢弃 | `../popopx-bot-studio/studio/app/agent_runtime.py:510,537`、`../popopx-bot-studio/studio/static/index.html:1674-1675`、`../PopopxMacNode/Sources/PopopxMacNode/Core/MacNodePopopxBridge.swift:986,1359,1381` |
| **Studio 的端口纪律，以及它的一个例外**：`DEFAULT_HOST = "127.0.0.1"`、bot 控制口 5230–5299、非回环直接 `ConfigError`；CLI 控制通道那条检查是无条件的（原话「严禁监听 0.0.0.0」）；每个 bot 独立 `HOME`、独立端口、独立库。**例外必须记住**：`STUDIO_ALLOW_LAN` 是文档化的 opt-in，所以只能说「默认只绑回环」，不能说「只能回环」 | `../popopx-bot-studio/studio/app/config.py:21,23-24,181,368-369`、`../popopx-bot-studio/studio/app/ws_protocol.py:29,641-644`、`../popopx-bot-studio/studio/app/bot_supervisor.py:179-186,592,593` |
| **摘要卡片回传什么是字段级的**：`WorkspaceDigest` 带 `headings`/`bullets`，渲染成「章节：」与项目符号，响应里是 bytes、headings、bullets 加 `"uploadedToCloud": false` 与 `"egress": "仅回环 / loopback only (127.0.0.1)"`（日程域那套响应同样带 `redaction`/`egress`）；目录是主人手工列的，四条路径检查在前，注释原话「only the digest goes into the response」 | `../PopopxMacNode/Sources/PopopxMacNode/PrivacyBridges/WorkspaceSandbox.swift:5-7,114-115,241-249,421-422,640-644`、`../PopopxMacNode/Sources/PopopxMacNode/PrivacyBridges/PrivacyToolEngine.swift:89-92,841-853` |
| **信封逐字节一致的证据等级要照抄它自己的说法**：iOS 信封是 4 个标量字段、JSON 走 `.sortedKeys`；Kotlin 自述「an envelope has four scalar fields」「copied field for field … 28 values, verified」，向量测试 `assertEquals(28, rows.size)`。测试向量头部自述证据等级：由 iOS 那套代码用 Apple Swift 6.4.2 **为 macOS 编译**后打出来、2026-11-26 铸造，且「Nothing here proves BLE behaviour on hardware」——所以只能说「从 iOS 代码打出来的向量证明」，不能说「真机验证过」 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Events/PopopxMeshEvents.swift:46,54-58`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Engine/PopopxMeshEngine.swift:1203-1204`、`apps/multiplatform/common/src/commonMain/kotlin/chat/popopx/common/mesh/PopopxMeshEnvelope.kt:164`、`apps/multiplatform/common/src/commonMain/kotlin/chat/popopx/common/mesh/PopopxMeshConfig.kt:4-5`、`apps/multiplatform/common/src/desktopTest/kotlin/chat/popopx/app/mesh/PopopxMeshConfigVectorTest.kt:25`、`apps/multiplatform/common/src/desktopTest/kotlin/chat/popopx/app/mesh/PopopxMeshSwiftVectors.kt:5-7,16-19` |
| **网格参数与寻址（支柱一那两句的落点）**：TTL 默认 7、稠密广播上限 5、去重命中就整包丢弃、否则 `ttl - 1` 再转；双角色 GATT 注释「so a neighbour can dial us while we dial it」；那 8 字节 id 是 `SHA256(pubkey)` 的前 8 字节、注释写明「not chosen by the peer」，且 `peerID alone is not enough to build a session`——所以面板写「绝不靠那 8 字节线上 id 单独定位」 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Core/PopopxMeshConfig.swift:22,28`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Engine/PopopxMeshEngine.swift:536,941,950`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/BLE/PopopxBLETransport.swift:28,48`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Protocol/PopopxMeshProtocol.swift:49,51,61`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Events/PopopxMeshEvents.swift:32-33` |
| **跨端少的两端各是哪一端**：桌面 Compose 客户端存在且 `TargetFormat.Dmg` 出 macOS 包，但它的蓝牙 actual 是 `PopopxNoBLETransport`，状态直接 `UNSUPPORTED`；iOS 侧主 App 的 `TARGETED_DEVICE_FAMILY = 1`（同一文件里另有 6 处 `"1,2"` 属于其他 target，所以口径只能落在主 App）且 `SUPPORTS_MACCATALYST = NO` | `apps/multiplatform/desktop/build.gradle.kts:64,80`、`apps/multiplatform/common/src/desktopMain/kotlin/chat/popopx/common/mesh/PopopxBLETransport.desktop.kt:4,18,42`、`apps/ios/POPOPX.xcodeproj/project.pbxproj:2790,2839,2996` |
| **SMP Agent 协议是库，不是守护进程**：规范头一行 `Version 7, 2025-01-24`，命令类型 `data ACommand` 与「receives commands and sends responses via TBQueue」的客户端实例都在仓库里，README 原话「in the application's process; it is not a daemon and binds no port」；PAP 仍按 §16 记为 0 命中 | `../popopxmq/protocol/agent-protocol.md:1`、`../popopxmq/src/Popopx/Messaging/Agent/Protocol.hs:472`、`../popopxmq/src/Popopx/Messaging/Agent/Client.hs:518`、`../popopxmq/README.md:43` |
| **两处「不是全部」的偏离，必须留在台账里**：服务套件网关默认 `gateway_host=… "0.0.0.0"` 且 `forwarded_allow_ips="*"`，README.en.md 自己记了与 Ubuntu 的 bind 差异；套件确有 session/epoch/membership 三种 revoke。结论：任何「全都只绑回环」的全称句只能限到 Studio 控制台与 Mac 节点控制台 | `../popopx-service-suite/gateway/app/config.py:494`、`../popopx-service-suite/gateway/app/main.py:704,1730,2162,7124,7130`、`../popopx-service-suite/README.en.md:157-163` |
| 两块面板零外部请求、零图片：两文件 `fetch(`/`<img`/`http` 三种写法各 0 命中，图标是页内 `<svg>`；面板状态只有四个 `useState` 单元（场景、步序、批准、撤销），点击只推进本页计数 | `./src/components/ConnectionDemo.tsx:1-20,793-796`、`./src/components/ConnectionPillars.tsx:1-20` |

复测配方（兄弟仓库与客户端仓库都在本站的上一级目录，先 `cd` 到位再跑；前两条在本仓库）：

```sh
grep -n 'const P2_I5\|const P3_I4\|state: "next"' src/components/ConnectionPillars.tsx
grep -n 'state: "next"\|calendar.availability:read\|const LEAD' src/components/ConnectionDemo.tsx

# 1) 点分范围串：五仓 0 命中（唯一出现处是本站组件自己的标签）
cd .. && grep -rnoE '"[a-z][a-z0-9_]+(\.[a-z][a-z0-9_]+)+:(read|write|admin)"' \
  popopx-chat/apps popopx-bot-studio/studio popopx-service-suite popopxmq/src PopopxMacNode/Sources \
  --include='*.swift' --include='*.kt' --include='*.py' --include='*.hs' --include='*.ts' --include='*.tsx' | wc -l   # 0

# 2) iOS 客户端没有协商/批准链路（三条都必须 0）
cd ../popopx-chat && grep -rn "approveCommand\|pending_user_approval" apps/ios | wc -l
grep -rniE "availability|freebusy|free/busy" apps/ios/Shared/Features/Calendar 2>/dev/null | wc -l

# 3) 28 这个数只能从 Swift 侧数出来，别和 noiseTransportOverhead = 28 混为一谈
grep -c "^    public var" apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Core/PopopxMeshConfig.swift   # 28
grep -n "noiseTransportOverhead" apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Core/PopopxMeshConfig.swift

# 4) 设备族：主 App 是 1，其他 target 有 1,2 —— 口径只能落在主 App
grep -c "TARGETED_DEVICE_FAMILY = 1;" apps/ios/POPOPX.xcodeproj/project.pbxproj
grep -c 'TARGETED_DEVICE_FAMILY = "1,2"' apps/ios/POPOPX.xcodeproj/project.pbxproj
sed -n '2790p;2839p;2996p' apps/ios/POPOPX.xcodeproj/project.pbxproj

# 5) 面板零外部请求
cd .. && grep -cE "fetch\(|<img|https?://" popopx-chat-web/src/components/ConnectionDemo.tsx \
  popopx-chat-web/src/components/ConnectionPillars.tsx                                          # 两个都是 0
```

三条严禁：**一**、不得把场景二写成「手机拨那台机器的 18920 口」——那个口只绑回环、只给那台 Mac 自己，手机经 SMP 队列到达，也**不得**顺手写「该口有鉴权」（桥自己的注释是 unauthenticated，闸门是白名单）。
**二**、不得把点分 scope 串或「网关校验权限范围」写成已实现，也不得把 Bot Studio 的进程内能力名写成网络 scope：`reply.compose` 等五个名字在同一个工作台内按 (origin,target,capability) 默认拒绝，网络网关仍没有机器可查的范围串。反向的旧话「仓库里没有任何撤销路径」同样禁止复活——撤销是事实：网络侧口径仍是「撤销整条链接/整个对端，不按单项范围」，工作台内则多了「单条授权可停用/删除」（§19 第 2–3 行）。
**三**、不得把「只绑回环」推广到服务套件网关（默认 `0.0.0.0`），不得把 `STUDIO_ALLOW_LAN` 藏掉，不得写「信封一致性已在真机验证」，不得写「iOS 客户端已端到端跑通这三个场景」。
§13 的禁词（双栈 / Mesh 组网 / 加密备份上传 / 云同步 / 企业服务）在这两块里仍是零命中，`check:out` 会扫产物。

## 19. Bot Studio 编排器与 Mac Node 助手环（2026-11-27 实测）

本节是 2026-11-27 把首页两处「演进中」翻成「已可用」时新增的台账：Bot Studio 的进程内多智能体编排，
以及「已配对手机 ↔ 已绑定 Mac Node」的助手环。尺子同 §16–§18：每个「已可用」都指得出下面的代码；
翻不动的 PAP、手机端内嵌模型权重、跨产品共享调度器、网络权限网关继续留在「演进中」。
以下出处在 2026-11-27 逐条 `sed` 回读过；组件文件里不写 `file:line`，出处只在本节。

| 事实 | 出处 |
| --- | --- |
| **Bot Studio 的编排器只在一个工作台进程内、只在兄弟 Bot 之间派活**：模块头写明与 `app.a2a` 的分工——a2a 管远端已配对替身、本模块管同机 Studio 里已存在的 Bot；三条结构约束是不靠调用方自觉的默认拒绝、只读、可回放；真正的副作用仍只在主人确认后由 `app.mac_node_bridge` 发生。不是跨产品调度器，也不是 PAP | `../popopx-bot-studio/studio/app/orchestrator.py:1-23` |
| **授权默认拒绝，按 (origin,target,capability) 建条**：`agent_task_grants` 的唯一键就是这三元组（另有 `enabled`），没有命中就在落库前判 `refused / no_grant`；通配 `*` 也必须显式建条，控制台可停用或删除单条授权。11 条编排管理端点全挂在 /api/agent 前缀下且都要 `require_admin` | `../popopx-bot-studio/studio/app/database.py:356-368,1981-2045`、`../popopx-bot-studio/studio/app/agent_admin.py:709-850`、`../popopx-bot-studio/README.en.md:228-230,352-355` |
| **硬上限是字面量**：跳数 3、并发 32、单任务超时 0.5–300 秒、扇出最多 8 且总预算 900 秒；五个内置能力全部 `writes: False`（`reply.compose`、`router.plan`、`calendar.availability`、`workspace.summarize`、`ledger.profile`）。执行体只读目标 Bot 自己的隔离配置，返回结论不返回原料：令牌、SMP 地址、日程标题、联系人标识在返回值里没有路径 | `../popopx-bot-studio/studio/app/database.py:54-57`、`../popopx-bot-studio/studio/app/orchestrator.py:79-117`、`../popopx-bot-studio/studio/app/orchestrator_local.py:1-30` |
| **审计与回放共用一条关联号**：SQLite 版本 6；`agent_tasks` 落每次派发（状态机 queued、running、succeeded、failed、timeout、refused、cancelled，另有 `correlation_id`、父任务、结果摘要与拒绝原因），`negotiation_audit_v6` 的 `stage` 取值包含 `'orchestrator'`；`orch/replay?correlation_id=` 按关联号取回整棵树与时间正序的审计序列 | `../popopx-bot-studio/studio/app/database.py:24,373-428,1810-1826`、`../popopx-bot-studio/README.en.md:360-362` |
| **Bot Studio 到 Mac Node 只有一条受控回环桥**：节点侧 /v1/tools/{domain}/{action} 的每次调用都由 Studio 在开 socket 前重新校验回环，`follow_redirects=False`，3xx 一律失败；节点不可达时忙闲读取退回掩码缓存；令牌永不出现在状态、异常或审计 detail；写日历走「提案 → approvalReceipt → approvePath」两步，桥自己从不伪造回执。节点侧同一路径把调用方来源记成 `"bot-studio"`（审计标签，不是调度器） | `../popopx-bot-studio/studio/app/mac_node_bridge.py:1-53`、`../PopopxMacNode/Sources/PopopxMacNode/PrivacyBridges/PrivacyToolEngine.swift:93,166`、`../PopopxMacNode/Sources/PopopxMacNode/WebConsole/LocalWebConsoleServer.swift:7211,7509` |
| **Mac Node 的助手调度器只有两个定时任务，且默认关闭**：每日简报（主人设的小时，默认上午 8 点）与家庭巡检（默认 30 分钟、离线 15 分钟）；重启到 8 点 01 分不会补跑当天 8 点那一班；手动「立即运行」也推进标记，所以一天不会出两份简报 | `../PopopxMacNode/Sources/PopopxMacNode/Assistant/LocalTaskScheduler.swift:1-20`、`../PopopxMacNode/Sources/PopopxMacNode/Assistant/AssistantModels.swift:377-429,435-470` |
| **简报 = 邮件整理 + 设备巡检 + 一张卡加每份草稿一张批准卡**：`runBriefing` 在 `config.enabled` 之后先做邮件分诊（最多 5 条摘要、最多 3 份草稿），再做哨兵扫描，最后经已配对的 E2E 会话推一张卡；投递失败进审计而不是被隐藏。`runPatrol` 只报告与提案，不执行修复 | `../PopopxMacNode/Sources/PopopxMacNode/Assistant/PersonalAssistantManager.swift:1-14,142-232` |
| **邮件读是只读的，发是批准门控的**：IMAP 会话开 `EXAMINE`、取 `BODY.PEEK[...]`，所以分诊不会把邮件标成已读；`sendApproved` 在读凭据或调传输之前先过 `AssistantApprovalGate`——pending、rejected、expired、re-used、re-bound 的批准都在那里被拒 | `../PopopxMacNode/Sources/PopopxMacNode/Assistant/MailAssistantBridge.swift:1-18,356-370` |
| **家庭哨兵只读扫描，修复提案绑定目标与摘要**：提案是 `kind = home.service`、`target = action#entity`、`digest = SHA-256`、`expiry = 15 分钟`；回执是 HMAC-SHA256 落在 `assistant.v1 / id / kind / target / digest / expiry`，密钥文件 assistant-approval.key 位于节点 vault 目录（0600），比较是 constant-time，提案只在内存里（重启即丢）。只读桥上即使有合法回执也修不了——主人配置优先 | `../PopopxMacNode/Sources/PopopxMacNode/Assistant/HomeSentinelLoop.swift:1-20`、`../PopopxMacNode/Sources/PopopxMacNode/Assistant/AssistantApprovalGate.swift:1-20` |
| **Discover 聚合默认关闭、只走局域网、每层都签名**：信封是 `popopx.discover.feed.v1`，每条 item 自己签、信封再对 `{ schema, generatedAt, nodeId, publicKey, items }` 签；信封密钥是节点 vault 目录下自己的 discover-signing.key，故意不是配对密钥，防止变签名预言机；公网 RSS/JSON 源被 `.privateNetworkOnly` 拒收并在控制台逐源显示 | `../PopopxMacNode/Sources/PopopxMacNode/Discover/DiscoverModels.swift:1-16,240-255`、`../PopopxMacNode/Sources/PopopxMacNode/Discover/DiscoverCenter.swift:17-22` |
| **升级通知卡是签名的，下载在主人点击之前不会发生**：清单必须过 Ed25519 校验、版本必须严格大于当前、egress 只放行主人钉的一个 HTTPS 主机且不跟随跨主机重定向；`UpdateCenter` 没有「无回执取包」的路径，回执 HMAC 绑 `update / version / sha-prefix` 加动词；卡的字面量是 `::POPOPX_UPD::` + `v1` | `../PopopxMacNode/Sources/PopopxMacNode/Updates/UpdateModels.swift:8-25,479-506` |
| **手机端只收「已绑定节点」的 feed，且静默接收**：`PopopxNodeFeedWire` 的 schema、60 条上限、256 KiB 上限与 fromBoundNode 谓词；`POPOPXAPI` 的自动接收在 actor 上再问一次 `DiscoverSubscriptionManager.nodeFeedSenderBound(contactId:)`；`ingest` 的注释写明「Silent by contract」，成功与拒绝都不发通知，拒绝保留旧快照 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Node/PopopxNodeFeedWire.swift:153-200,345-355`、`apps/ios/Shared/Model/POPOPXAPI.swift:2769-2790,4187-4195`、`apps/ios/Shared/Features/Discover/DiscoverSubscriptionManager.swift:513-529,550-590` |
| **升级卡在客户端也有读取器**：`PopopxNodeUpdateWire` 认 `::POPOPX_UPD::` + `v1`，只接受节点自己的 `updates::approve::` / `updates::snooze::` 前缀命令，其余文本不当卡 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Node/PopopxNodeUpdateWire.swift:8,39-44,89-101` |
| **配对凭据是签名的一次性码，不是 /i/v1/ 链接**：Mac Node 侧 `PPXNODE1-<base64url(body)>.<base64url(sig)>` 是签名载荷（`NodeWire.pairingCodePrefix` = `PPXNODE1`），`openPairing` 只接受这一种 payload，链接前缀 `https://popopx.chat/i/v1/` 只是信封格式 v1。手机端配对屏的粘贴框提示就是 `PPXNODE1-…`，且 `PopopxNodePairingOffer.decode` 在存任何东西之前验 Ed25519；/i/v1/ 密封信封即使包着 `PPXNODE1-`，也被 `isConnectableOpened` 判为「不是连接地址」（测试里就是这么断言的）。所以页面写「signed one-time pairing credential」，不写「经 /i/v1/ 配对」 | `../PopopxMacNode/Sources/PopopxMacNode/Pairing/OpaquePairingCodec.swift:60-70,100-112,181-186`、`../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:55`、`apps/ios/Shared/Features/Discover/MacNodePairingSheet.swift:1-12,158-170`、`apps/ios/Shared/Features/Discover/DiscoverCatalogModels.swift:537-600`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Invite/PopopxOpaqueInviteCodec.swift:95-108`、`apps/ios/PopopxMeshKit/Tests/PopopxMeshKitTests/PopopxOpaqueInviteCodecTests.swift:220-231` |
| **两个候选官方域名还不在清单里**。2026-11-27 实测 `domains.popopx.chat` 有 A 记录（43.129.40.33）但 HTTPS 证书不覆盖该主机名（curl 报 no alternative certificate subject name，exit 60），`status.popopx.chat` 仍是 NXDOMAIN（curl exit 97）。所以 §11 的四站点清单与页脚「四个官方站点」一个字没动；等证书/记录就绪并经用户裁定后再加 | 本机 `dig` 与 `curl`（配方见下） |

复测配方（兄弟仓库与客户端仓库都在本站的上一级目录，先 `cd` 到位再跑；第 3 组前半在客户端仓库根）：

```sh
# 1) 编排器：结构约束、五个只读能力、硬上限、11 条端点、库版本与审计
sed -n '1,23p;79,117p' popopx-bot-studio/studio/app/orchestrator.py
sed -n '1,30p' popopx-bot-studio/studio/app/orchestrator_local.py
sed -n '24p;54,57p;356,368p;373,428p;1810,1826p;1981,2045p' popopx-bot-studio/studio/app/database.py
grep -n 'orch' popopx-bot-studio/studio/app/agent_admin.py | grep '@app\.' | wc -l   # 11
sed -n '228,230p;345,368p' popopx-bot-studio/README.en.md

# 2) Mac Node：回环桥、调度器、简报/巡检、邮件、哨兵、批准门、Discover、升级卡
sed -n '1,53p' popopx-bot-studio/studio/app/mac_node_bridge.py
sed -n '1,20p' PopopxMacNode/Sources/PopopxMacNode/Assistant/LocalTaskScheduler.swift
sed -n '377,470p' PopopxMacNode/Sources/PopopxMacNode/Assistant/AssistantModels.swift
sed -n '1,14p;142,232p' PopopxMacNode/Sources/PopopxMacNode/Assistant/PersonalAssistantManager.swift
sed -n '1,18p;356,370p' PopopxMacNode/Sources/PopopxMacNode/Assistant/MailAssistantBridge.swift
sed -n '1,20p' PopopxMacNode/Sources/PopopxMacNode/Assistant/HomeSentinelLoop.swift
sed -n '1,20p' PopopxMacNode/Sources/PopopxMacNode/Assistant/AssistantApprovalGate.swift
sed -n '1,16p;240,255p' PopopxMacNode/Sources/PopopxMacNode/Discover/DiscoverModels.swift
sed -n '17,22p' PopopxMacNode/Sources/PopopxMacNode/Discover/DiscoverCenter.swift
sed -n '8,25p;479,506p' PopopxMacNode/Sources/PopopxMacNode/Updates/UpdateModels.swift
sed -n '93p;166p' PopopxMacNode/Sources/PopopxMacNode/PrivacyBridges/PrivacyToolEngine.swift

# 3) 客户端：feed/升级卡接收、绑定检查、配对凭据
sed -n '153,200p;345,355p' popopx-chat/apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Node/PopopxNodeFeedWire.swift
sed -n '8p;39,44p;89,101p' popopx-chat/apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Node/PopopxNodeUpdateWire.swift
sed -n '2769,2790p;4187,4195p' popopx-chat/apps/ios/Shared/Model/POPOPXAPI.swift
sed -n '513,529p;550,590p' popopx-chat/apps/ios/Shared/Features/Discover/DiscoverSubscriptionManager.swift
sed -n '1,12p;158,170p' popopx-chat/apps/ios/Shared/Features/Discover/MacNodePairingSheet.swift
sed -n '537,600p' popopx-chat/apps/ios/Shared/Features/Discover/DiscoverCatalogModels.swift
sed -n '60,70p;100,112p;181,186p' PopopxMacNode/Sources/PopopxMacNode/Pairing/OpaquePairingCodec.swift
sed -n '55p' PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift
sed -n '95,108p' popopx-chat/apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Invite/PopopxOpaqueInviteCodec.swift
sed -n '220,231p' popopx-chat/apps/ios/PopopxMeshKit/Tests/PopopxMeshKitTests/PopopxOpaqueInviteCodecTests.swift

# 4) 官方域名：一个证书不覆盖、一个 NXDOMAIN
dig +short domains.popopx.chat; curl -sS -o /dev/null -w '%{http_code}\n' https://domains.popopx.chat/ || echo "curl exit $?"   # 证书 exit 60
dig +short status.popopx.chat | wc -l; curl -sS -o /dev/null https://status.popopx.chat/ || echo "curl exit $?"                  # 0 行 / exit 97
```

三条严禁：**一**、不得把编排器写成跨产品调度器或 PAP——它只在同一个 Studio 进程内、只在兄弟 Bot 之间，五个能力全是只读投影（第 1–3 行）；
**二**、不得把 /i/v1/ 写成配对入口，配对屏只认原始 `PPXNODE1-` 签名码（第 14 行）；
**三**、不得把助手环写成「默认开启」或「跨产品自动调度」：两个定时任务默认关闭、Discover 默认关闭且仅局域网、升级下载必须主人点击，所有跨产品协同仍缺一个共享调度器（第 5–12 行）。

## 20. 资源页文档矩阵（/resources/，2026-11-25 实测）

`ResourceLibrary.tsx` 列出的每一条路径，都在当日通过 GitHub Contents API 核实存在。复测配方：

```sh
# 客户端仓库根文档
curl -s "https://api.github.com/repos/popopx-chat/popopx-chat/contents/?ref=master" \
  | jq -r '.[].name' | grep -E '^(README|FORK|CHANGELOG|PRIVACY-POPOPX|AGPL-COMPLIANCE|LICENSE|TRADEMARK-POPOPX|ASSETS_LICENSE|NOTICE)(\.md)?$'

# iOS 工程规格
curl -s "https://api.github.com/repos/popopx-chat/popopx-chat/contents/apps/ios/spec?ref=master" \
  | jq -r '.[].name' | grep -E '^(architecture|api|database|state|impact)\.md$'

# popopxmq 协议规范
curl -s "https://api.github.com/repos/popopx-chat/popopxmq/contents/protocol?ref=master" \
  | jq -r '.[].name' | grep -E '^(agent-protocol|popopx-messaging|crypto-registry|security|pqdr|xftp|xrcp|push-notifications|overview-tjr)\.md$'
```

⚠️ 资源页只列文件路径，不做摘要。任何对文件内容的概括性描述都必须另起一条台账记录，并附 `sed -n` 或 `grep -n` 复测命令。

## 21. 深度链接校验文件与 /i/v1/ 邀请落地页（2026-11-26 实测）

任务书要的是「点击 `https://popopx.chat<code>` 不再 404」，落地成两件事：`./public/.well-known/` 里两个系统校验文件（`next build` 原样拷进 out/.well-known/，实测 830 与 341 字节、与站内源文件同哈希），以及一个只读地址、不写地址的静态落地页 `./src/app/i/v1/page.tsx` + `./src/components/InviteCard.tsx`。
下面每一条都在 2026-11-26 用 `sed`/`grep` 逐条回读；任务书里与源码不符的四个值（Android 包名、唤起协议、`/contact/*` 的写法、AASA 的 schema 键名）一律以出厂值为准，偏离记在最后一节的「严禁」里。

| 事实 | 出处 |
| --- | --- |
| **iOS 的 AppID 只有一个**：Team ID `PDBA6XRBQT`（同文件 4 处 `DEVELOPMENT_TEAM` 全等）配主 App 的 `com.popopxchat.popopx`（Debug 与 Release 各一处；同文件另有 `.Tests-iOS`、`.SimpleX-NSE` 等带后缀的 target，它们不进 AASA）。entitlements 声明的域是 `applinks:popopx.chat`、`applinks:www.popopx.chat`、`applinks:*.popopx.im`，前两条各带一个 `?mode=developer` 副本 | `apps/ios/POPOPX.xcodeproj/project.pbxproj:2659,2784,2834`、`apps/ios/POPOPX (iOS).entitlements:9-13` |
| **Android 的包名取 applicationId，不取源码包**：`applicationId` 与 `namespace` 都是 `com.popopxchat.popopx`；任务书写的 `chat.popopx.app` 是 `commonMain` 的 Kotlin 源码包路径，不是安装标识，写进 `assetlinks.json` 会让校验对不上任何已安装应用。debug 变体靠根工程的 `application_id.suffix` 追加后缀与发布版并存，所以校验文件里只能出现不带后缀的那个 id | `apps/multiplatform/android/build.gradle.kts:15-16,55`、`apps/multiplatform/build.gradle.kts:22-25` |
| **签名指纹只有一个，且这是写进规则的**：值来自发布证书（`subject= /CN=com.popopxchat.popopx`），配方在下一节的 `openssl` 行；先前站点目录的 README 原话「The fingerprint list has **one** entry」——上游列三把是因为 Play、GitHub APK、F-Droid 是三把不同的密钥，本站只有一把发布密钥、不发 APK，写第三把等于替本站不持有的授权背书。将来若用第二把密钥签 Play 上传，才往数组里加，否则安卓链路校验只对这把密钥签出的包生效 | `../popopx.chat/.well-known/README.md:13-18` |
| **邀请地址的出厂写法只有一种，可读写法有三种**：铸造端是 Swift 的 `linkPrefix` 与 Kotlin 的 `LINK_PREFIX`，同为 `https://popopx.chat/i/v1/`；打开端接受该前缀加 `popopx:/i/v1/` 与 `popopx://popopx.chat/i/v1/` 三种拼法，注释的理由是「只认铸造写法会让同一条链接粘贴能用、点击失败」。Kotlin 测试把三条字面量写死而不是遍历生产列表，注释明说这是为了抓住列表缩水这种回归。落地页的复制按钮产出的必须是铸造写法 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Invite/PopopxOpaqueInviteCodec.swift:71,193-195`、`apps/multiplatform/common/src/commonMain/kotlin/chat/popopx/common/invite/PopopxOpaqueInviteCodec.kt:53,141-142`、`apps/multiplatform/common/src/desktopTest/kotlin/chat/popopx/app/invite/PopopxOpaqueInviteCodecTest.kt:236-239,248` |
| **站内已经在mint真链接，不是演示**：付费徽章机器人的联系地址就是一条密封好的 /i/v1/ 串，注释「Sealing is what lets the app name a…」——所以落地页面对的是出厂格式，不是本站自造的格式 | `apps/multiplatform/common/src/commonMain/kotlin/chat/popopx/common/views/badges/BadgeStore.kt:61,71` |
| **iOS 按前缀接单数段，`popopxchat:` 是死路**：「/i/v1/」前缀命中后走连接流程；「/contact、/invitation、/a、/c、/g、/i」六条是**全等**匹配（这些链接的载荷在 fragment 里，路径本身没有第二段，所以任务书的 `/contact/*` 单独一条不等于出厂形状）。`appLinkSchemes = ["popopxchat", "simplexchat"]` 的处理函数只弹一句 "Update the app to open this link."，因此落地页的唤起只用 `popopx:`；`Info.plist` 两个 URL type 都注册了，`popopx` 有 handler | `apps/ios/Shared/ContentView.swift:494,503,535,542-543`、`apps/ios/POPOPX--iOS--Info.plist:40-42,50-53` |
| **安卓不会把 https 邀请链接直接交给 App，这是设计内的落点**：`autoVerify` 那个 intent-filter 的 host 表含 `popopx.chat`、`smp1`–`smp8`、`relay1`，path 只有上述六条的 `android:path` 与 `android:pathPrefix` 成对写法，全文件 i/v1 命中 0；而 scheme 过滤器 `android:scheme="popopx"` 不限 host 也不限 path。结论：安卓点击 https 邀请链接停在浏览器 → 正好落到本页 → 本页那颗按钮用 `popopx:` 一样能把 code 送进 App。要让安卓直接接管 https，改的是客户端 manifest，不是本站 | `apps/multiplatform/android/src/main/AndroidManifest.xml:97-104,114,122-143` |
| **AASA 的 schema 键名是 `appIDs` + `components`**：本站文件与依赖里那份、与先前站点目录那份逐字段相同（后两者本身字节级一致），只在最前面多出 `/i/v1/*` 一条，旧的 12 条形状一条没减；`"appID"` 单数在本文件命中 0。这是从两份出厂文件抄的，不是选出来的 | `./public/.well-known/apple-app-site-association`、`../popopxmq/apps/common/Web/static/.well-known/apple-app-site-association:5-6`、`../popopx.chat/.well-known/apple-app-site-association`、`FORK.md:1112-1113` |
| **无扩展名文件必须显式给 JSON 类型**：Apple 取的是「/.well-known/apple-app-site-association」——无扩展名、无尾斜杠，nginx 默认按 application/octet-stream 发出去，iOS 就静默不认这条关联，所以 vhost 用 default_type application/json；依赖侧的 Haskell 服务器为同一个文件名做了两处特判（文件服务器与生成响应各一处）。`assetlinks.json` 更严：一条路径、200、不许重定向、不许 HTML 错误页 | `./deploy/centos/nginx-popopx-main.conf:202-229`、`../popopxmq/src/Popopx/Messaging/Server/Web.hs:122,232`、`FORK.md:1127` |
| **邀请码不出设备的三层保险**：页面只从 `window.location.pathname` 取码，产物里 10 个子资源（9 个 `/_next/static/**` chunk + 1 个站内 Logo）全部以「/」开头、非站内来源 0 个；`robots: { index: false, follow: true }` 与 robots.txt 的 `Disallow: /i/v1/` 双写，因为前者只管已经取到页面的爬虫；vhost 对整个前缀 `access_log off`，且 fallback 目标故意仍带「/i/v1/」前缀——`try_files` 的内部重定向会重跑一次 location 匹配，而访问日志由**结束所在**的 block 决定，落回 location / 就会把 code 记进日志 | `./src/components/InviteCard.tsx:44,281-287`、`./src/app/i/v1/page.tsx:29-35`、`./public/robots.txt:6-10`、`./deploy/centos/nginx-popopx-main.conf:280-289` |
| **落地页只认一段，不猜**：取码的正则要求「/i/v1/」之后恰好一段、1–512 字符、可带尾斜杠；多段、超长或空段一律进「这条地址里没有邀请码」状态，既不生成 `popopx:` 目标也不生成复制值。值也**不做** `decodeURIComponent`：解出来的 `%2F` 会把斜杠放回一个 bearer token。`output: "export"` 下不可能为每个 code 预渲染，`generateStaticParams` 在这里没有合法取值——枚举 code 正是密封格式要防的事 | `./src/components/InviteCard.tsx:44,259-261,319-322`、`./src/app/i/v1/page.tsx:7-19` |
| **本站闸门怎么记住这个豁免**：`check-links` 的 sitemap 对齐用**名字集合**豁免「/i/v1/」，自检样本里同时放了「/i/v1/leak/」作为控制，证明豁免是按名字生效而不是把整棵子树关掉；sitemap 的注释同步说明这条路由是有意不列 | `./tools/check-links.mjs:98-105,149-152,173-174`、`./public/sitemap.xml` |
| **`www.popopx.chat` 仍未覆盖，这是需要裁定的一项**：entitlements 同时声明 `applinks:popopx.chat` 与 `applinks:www.popopx.chat`，先前站点的 README 明写「Both hosts need the AASA」；而本站 vhost 的 `server_name` 只有 `popopx.chat`（80 与 443 各一处），`deploy_centos.sh` 也只向 certbot 要 `-d "$SITE_HOST"` 一个名字。要么补 `server_name` 与 SAN，要么改 entitlements 删掉 www 那条——本次改动没有替用户决定 | `apps/ios/POPOPX (iOS).entitlements:9-10`、`../popopx.chat/.well-known/README.md:68`、`./deploy/centos/nginx-popopx-main.conf:53,82`、`./deploy/centos/deploy_centos.sh:322-324` |

复测配方（第 1、6 条在本仓库跑，其余先 cd ../popopx-chat；第 5 条的证书在两个仓库之外，只能作为配方存在，路径按各人工作区填）：

```sh
# 1) 三个 .well-known 文件逐字段比对：本站 vs 依赖 vs 先前站点
cd .. && for f in apple-app-site-association assetlinks.json; do
  diff <(jq -S . popopx-chat-web/public/.well-known/$f) \
       <(jq -S . popopxmq/apps/common/Web/static/.well-known/$f) >/dev/null \
    && echo "$f: 与依赖一致" || echo "$f: 有差异（AASA 只应多出 /i/v1/* 这一条）"
done
grep -c '"appIDs"' popopx-chat-web/public/.well-known/apple-app-site-association          # 1
grep -c '"appID"'  popopx-chat-web/public/.well-known/apple-app-site-association          # 0
python3 -c "import json;print(len(json.load(open('popopx-chat-web/public/.well-known/apple-app-site-association'))['applinks']['details'][0]['components']))"   # 13

# 2) 出厂邀请地址与三种可读拼法
cd popopx-chat && grep -n 'linkPrefix = \|openLinkPrefixes = ' \
  apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Invite/PopopxOpaqueInviteCodec.swift
grep -n 'LINK_PREFIX = \|OPEN_LINK_PREFIXES =' \
  apps/multiplatform/common/src/commonMain/kotlin/chat/popopx/common/invite/PopopxOpaqueInviteCodec.kt

# 3) iOS：/i/v1/ 是前缀匹配，其余六条是全等；popopxchat: 只会弹「更新 App」
grep -n 'hasPrefix("/i/v1/")\|appLinkSchemes\|Update the app to open this link' apps/ios/Shared/ContentView.swift

# 4) 安卓：autoVerify 里没有 /i/v1/，但 popopx: 过滤器不带 path
grep -c 'i/v1' apps/multiplatform/android/src/main/AndroidManifest.xml                      # 0
grep -n 'android:scheme="popopx"' apps/multiplatform/android/src/main/AndroidManifest.xml   # 103

# 5) 指纹（发布证书 .crt，绝不读同名 .key）：期望 subject= /CN=com.popopxchat.popopx
openssl x509 -in <发布证书.crt> -noout -fingerprint -sha256 -subject
#    输出必须与 assetlinks.json 数组里唯一那条逐字符相同

# 6) 落地页产物的子资源全部同源；页面自身无任何出网调用
grep -oE 'src="[^"]*"' out/i/v1/index.html | grep -vc 'src="/'                               # 0
grep -nE 'fetch\(|XMLHttpRequest' src/components/InviteCard.tsx                              # 只剩注释那一行
node tools/check-links.mjs out && node tools/scan-compliance.mjs out
```

线上核验只能在部署之后由主机操作者跑，命令已写进 `./deploy/centos/deploy_centos.sh` 的收尾提示：两个 `.well-known` 必须 200 且 `content-type: application/json`，`/i/v1/<自测码>` 必须 200，且访问日志里 `grep -c <自测码>` 必须为 0。

四条严禁：**一**、不得把 Android 包名写成 `chat.popopx.app`，也不得把唤起协议写成 `popopxchat:`——前者在校验里对不上任何已安装应用，后者在 iOS 只会弹出「Update the app to open this link.」。**二**、不得写「安卓点击 https 邀请链接会直接打开 App」：manifest 的 `autoVerify` 没有声明「/i/v1/」，安卓停在浏览器、由本页交接，这是出厂行为。**三**、不得写「已线上验证 200」——本次交付里所有 200 都来自本地按 vhost 规则复刻的静态服务与 headless Chrome，线上那两条 curl 在用户部署之前没有取过任何响应。**四**、不得把 `www.popopx.chat` 说成已覆盖，也不得悄悄往 vhost 加 `server_name www.popopx.chat`（证书没签这个名字）；§13 的禁词在本节新增的两个文件里仍是零命中，`check:out` 会扫产物。

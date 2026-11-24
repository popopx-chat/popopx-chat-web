# POPOPX 主站文案事实台账 / claim ledger

每一行都是 iOS 客户端仓库（分支 `master`，默认 checkout 在本仓库同级的 `../popopx-chat`，也可用环境变量 `POPOPX_CLIENT` 指定）里实测出来的事实。**出处路径一律相对该客户端仓库根目录**，`apps/ios/` 前缀写在路径里；本文件不出现任何本机绝对路径。
`npm run check:facts` 逐条打开这些指针：文件必须存在、路径必须按上述约定可解析、行号必须落在有内容的行上。它只证明「指针打得到东西」，不证明行内的语义——那仍然要人开着文件读这一行。
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
| 1 | `.chats` | 消息 | 訊息 | Messages | `apps/ios/zh-Hans.lproj/Localizable.strings:4065` |
| 2 | `.contacts` | 联系人 | 聯絡人 | Contacts | `apps/ios/zh-Hans.lproj/Localizable.strings:1802` |
| 3 | `.cabin` | 厢语 | 廂語 | Cabin | `apps/ios/zh-Hans.lproj/Localizable.strings:8472` |
| 4 | `.discover` | 发现 | 發現 | Discover | `apps/ios/zh-Hans.lproj/Localizable.strings:8309` |
| 5 | `.me` | 我 | 我 | Me | `apps/ios/zh-Hans.lproj/Localizable.strings:8063` |

第 2 栏是「联系人」，**不是**「通讯」。第 3 栏 `厢语 / Cabin` 是 C 位。

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
| ECDSA P-256 | 商业徽章/积分签名，**不是** Ed25519 | `apps/ios/Shared/Features/BadgeCredits/PopopxBadgeCreditsModels.swift:1535,1576-1578` |
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
| 引擎产出的临时目录与文件用 `FileProtectionType.complete` | `apps/ios/Shared/Features/MediaCompression/PopopxMediaEngine.swift:334,341,903-904`（理由见 :900-901） |

## 6. 离线路由 / BLE

| 事实 | 出处 |
| --- | --- |
| `PopopxMeshKit` 是 SPM 包，两个 module：`PopopxMeshKit`、`PopopxMeshUI`，已链接进 App target | `apps/ios/PopopxMeshKit/Package.swift:10-13,16-19`、`apps/ios/POPOPX.xcodeproj/project.pbxproj:926-927,3217` |
| 传输是**双角色 CoreBluetooth GATT 点对点**（`CBCentralManager` + `CBPeripheralManager`，单一 service UUID），不是 Bluetooth Mesh 规范 | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/BLE/PopopxBLETransport.swift:24,29,45-49`、`apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Core/PopopxMeshConfig.swift:78` |
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
| 回滚快照的保护级别同样是 `FileProtectionType.complete`（它就是用户整张服务器表） | `apps/ios/Shared/Features/ServerConfigSync/PopopxServerConfigStore.swift:392-394,438-442`（理由 :384-386）、staged :177 |

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
| 客户端仓库根 `LICENSE` 是 AGPL-3.0 全文；文件内**没有** SPDX 行，README 的措辞是 "GNU Affero General Public License version 3 (AGPLv3)" | `LICENSE:1-2`、`README.md:394-395` |
| 上游自有的图片与商标不授予 | `README.md:400-403` |
| `TRADEMARK-POPOPX.md` 存在，并明确商标**尚未注册** | `TRADEMARK-POPOPX.md:5-7` |
| `ASSETS_LICENSE-POPOPX.md` 存在 | 仓库根 |
| 仓库公开、默认分支 `master`（`api.github.com/repos/popopx-chat/popopx-chat` → HTTP 200、`private: false`） | GitHub API |
| 门户自身仓库 `https://github.com/popopx-chat/popopx-chat-web`（默认分支 `main`）；服务号套件 `popopx-service-suite`（`main`）；Mac Node `popopx-mac-node`（`main`） | GitHub API |
| 四个官方站点：`popopx.chat`（本站）、`node.popopx.chat`、`mp.popopx.chat`、`bot.popopx.chat`（第二、第三者的 `server_name` 实测自同级工程配置，第四者按 §15 的 vhost 与证书实测） | `../node-popopx-chat-web/deploy/centos/nginx-node.popopx.chat.conf:64`、`../popopx-service-suite-web/src/lib/site.ts:11`、`../popopx-bot-studio-web/index.html:6` |

## 12. 发行状态（严禁编造商店链接）

| 事实 | 出处 |
| --- | --- |
| `https://apps.apple.com/us/app/popopx-chat/id6799146157` 无法解析：`itunes.apple.com/lookup?id=6799146157` 返回 `resultCount: 0`（2026-11-22 复测） | 本机 curl 实测 |
| 既有裁定（2026-11-16）：记录未解析前，不渲染任何 App Store / Google Play / APK 徽章或链接 | `../popopx.chat-site/README.md:97-101` |
| 旧站点里残留的 TestFlight 加入码属于别的项目，严禁复用 | `../site-link-sources/`、`../rebrand-log-popopxmq/REPLACE-LOG.md` |

结论：下载区只写状态（内测通道尚未公开）、二维码内容指向 `https://popopx.chat` 本身。

## 13. 页面禁词（`check:out` 会扫产物）

`SimpleX`（任意大小写）、`VPN`、`代理`、`专网`、`军工`、`Bitchat`、任何本地绝对路径（`/Users/…`）。
注意 iOS 源码里有大量 `SimpleX Chat` 历史残留，以及旧 bundle id / 旧 URL scheme —— 这些都是**不能**出现在门户产物里的字符串，引用源码路径时也要避开含旧名的目录名。数量按配方实测（2026-11-23，客户端仓库 `master`）：`git grep -c "SimpleX Chat" -- 'apps/ios/**.swift'` 逐文件相加 = **225 行**；大小写不敏感、不限文件类型、覆盖 iOS 工程全部目录的匹配 = **945 行 / 374 个文件**。引用这个数字时必须带上其中一种配方，光写一个行数无法复现。

## 14. v1.2.0 与发布说明三条（下载区，逐行读自出厂 Swift）

| 事实 | 出处 |
| --- | --- |
| iOS App target 的两个构建配置里 `MARKETING_VERSION = 1.2.0`；**另外 8 个配置仍是 `7.1.2`**，所以主站只能写「App 的 MARKETING_VERSION」，严禁写「整个工程统一到 1.2.0」 | `apps/ios/POPOPX.xcodeproj/project.pbxproj:2782,2832,2851,2869,2904,2940,2989,3044,3085,3118` |
| 分支自己的版本化裁定（2026-11-24）：脱离上游 7.1.x 编号，SMP/XFTP 握手版本与数据库 Schema 明确不变，iOS 侧由 Xcode Build Settings 手动改 | `CHANGELOG-POPOPX.md:6,10-13` |
| Android / Desktop 侧的 1.2.0 确实写进了 gradle 属性（若要提「其他端也已改号」，只有这一行撑得住） | `apps/multiplatform/gradle.properties:28,31` |
| 双通道路由：SMP ACK 超时 3 秒后同一条消息**并发**再走蓝牙（源码原话 "concurrently, never instead"）；蓝牙 5 秒等不到 BLE_ACK 就回到 SMP 并沿用原 `messageId`；状态名 `dualChannel` | `apps/ios/PopopxMeshKit/Sources/PopopxMeshKit/Router/PopopxMessageRouter.swift:10-11,19,271` |
| 徽章商品**恰好 13 个** SKU（文档注释原话 "The 13 in-app purchase products"，枚举 13 个 `case`）；价格与在售状态启动时从 StoreKit 读，`fallbackPriceText` 只在读取失败时兜底 | `apps/ios/Shared/Features/BadgeCredits/PopopxBadgeCreditsModels.swift:145-163`、`apps/ios/Shared/Features/BadgeCredits/PopopxStoreKitManager.swift:130-137` |
| 购买先写本地账本，`Transaction.finish()` **只在本地写入成功之后**被调用（文件头注释与 `finish` 注释两处写明） | `apps/ios/Shared/Features/BadgeCredits/PopopxStoreKitManager.swift:9,354-359` |
| 聊天库口令由用户自设，「Save passphrase in Keychain」是可开关项；改口令入口 `Update database passphrase` | `apps/ios/Shared/Views/Database/DatabaseEncryptionView.swift:73,91,95` |
| 两个数据库各有 `.bak` 副本（`_chat.db.bak`、`_agent.db.bak`，与主库同目录），`hasBackup` 检查、`restoreBackup` 回滚 | `apps/ios/POPOPXChat/FileUtils.swift:50,52,215-231` |

这三条严禁写成「双栈」「Mesh 组网」「加密备份上传」「云同步」：`.bak` 只在设备磁盘上，不是异地备份；口令保护的是本机数据库文件。

## 15. Bot Studio 发布状态（门户已上线，引擎仓库仍只发布许可证）

| 事实 | 出处 |
| --- | --- |
| `bot.popopx.chat` 与 `popopx.chat`、`node.popopx.chat` 解析到同一台服务器（43.129.40.33） | 本机 `dig +short` 实测（2026-11-24） |
| 门户已上线：普通 HTTP 返回 301，跳转目标是 `Location: https://bot.popopx.chat/`（`Server: nginx/1.14.1`），不再是该机的 nginx 默认测试页 | 本机 `curl --noproxy '*' -sI http://bot.popopx.chat` |
| 443 以 HTTP/2 返回 200：`content-length: 30246`、`last-modified: 2026-11-24 10:01:15 GMT`，并带 `x-frame-options: DENY` 与 `x-content-type-options: nosniff` | 本机 `curl --noproxy '*' -sI https://bot.popopx.chat` |
| 证书就是按这个域名签的：`subject: CN=bot.popopx.chat`，SAN 命中，verify ok，签发者 `O=Let's Encrypt; CN=YR1`，有效期到 2027-02-22 | 本机 `curl --noproxy '*' -sv https://bot.popopx.chat` |
| 页面只加载自己目录里的文件：css、js、图标全是相对路径；两个 js 里绝对 URL 0 个、fetch 0 次，产物里没有任何第三方主机与统计脚本 | 本机对线上 HTML 与 assets/js/app.js、assets/js/i18n.js 的 grep |
| 站点是零构建静态页、自带 18 语文案：无框架、无打包器、无 CDN、无 Web 字体请求、无统计脚本 | `../popopx-bot-studio-web/README.md:3-4` |
| 线上首屏的标题与描述由站点仓库写出：POPOPX Bot Studio，self-hosted bot factory | `../popopx-bot-studio-web/index.html:6-7` |
| 引擎仓库 `https://github.com/popopx-chat/popopx-bot-studio`（默认分支 main）公开可访问，但**已发布的树只有 `LICENSE`（AGPL-3.0-only）一个条目**：无 README、无源码目录，因此门户不转述它宣称的任何功能 | GitHub API（配方见下） |
| **未上文案，记录给下一位**：站点仓库自称正式域名是 apex，即 `CNAME`、canonical、全部 hreflang、og:url、robots 的 Sitemap 行与 sitemap 的 loc 写的都是 popopx.chat，而 apex 由本站 nginx 的 server_name 持有（本仓库 deploy/centos/nginx-popopx-main.conf 的 80 与 443 两块）。两个站点对同一个 apex 同时主张归属是 SEO 冲突，应由该站改掉；主站文案不引用这一点 | `../popopx-bot-studio-web/README.md:6-8`、`../popopx-bot-studio-web/CNAME:1`、`../popopx-bot-studio-web/index.html:10-11,33`、`../popopx-bot-studio-web/robots.txt:7`、`../popopx-bot-studio-web/sitemap.xml:6` |

复测配方（2026-11-24 实测；域名、证书与仓库内容都会变，引用时必须重跑并改日期。注意本机 curl 走 SOCKS5 代理会让 TLS 探测假超时，直连需 `--noproxy '*'`）：

```
dig +short bot.popopx.chat popopx.chat node.popopx.chat mp.popopx.chat
curl --noproxy '*' -sI http://bot.popopx.chat | head -6                 # 301 + Location
curl --noproxy '*' -sI https://bot.popopx.chat | head -10               # HTTP/2 200 与响应头
curl --noproxy '*' -sv https://bot.popopx.chat 2>&1 | grep -i "subject\|issuer\|altname\|expire\|verify ok"
curl --noproxy '*' -s https://bot.popopx.chat | grep -oE '(src|href)="[^"]*"' | sort -u
for f in assets/js/app.js assets/js/i18n.js; do
  curl --noproxy '*' -s "https://bot.popopx.chat/$f" | grep -c "http"   # 两个都是 0
done
curl -s "https://api.github.com/repos/popopx-chat/popopx-bot-studio/git/trees/main?recursive=1" | jq -r '.tree[].path'      # 只有 LICENSE
curl -s "https://api.github.com/repos/popopx-chat/popopx-bot-studio-web/git/trees/main?recursive=1" | jq -r '.tree[].path' | head -12
grep -c "server_name  popopx.chat;" deploy/centos/nginx-popopx-main.conf   # 2（本站持有 apex）
curl -s "https://api.github.com/repos/popopx-chat/popopx-chat" | jq -r '.default_branch, .private'                        # master / false
grep -c "MARKETING_VERSION = 1.2.0" apps/ios/POPOPX.xcodeproj/project.pbxproj   # 2
grep -c "MARKETING_VERSION = 7.1.2" apps/ios/POPOPX.xcodeproj/project.pbxproj   # 8
awk 'NR>=148 && NR<=163 && /^    case /' apps/ios/Shared/Features/BadgeCredits/PopopxBadgeCreditsModels.swift | wc -l   # 13
```


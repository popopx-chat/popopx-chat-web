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

首页 `EcosystemPanorama` 只画这一节撑得住的线：实线 = 下面某一行指得出源码，虚线 = 四个仓库里 grep 不到任何调用。
以下出处在 2026-11-25 逐条 `sed` 回读过；配方在本节末，引用前重跑。

| 事实 | 出处 |
| --- | --- |
| **Chat ↔ Mac Node 的真实通路不是手机连 18920，而是节点在本机拉起本 fork 的 `popopx-chat` 守护进程**：`--chat-server-port` 打开 WebSocket 控制口，节点写死 `5225`（客户端库用的就是这个值），plain `ws://`、无 TLS、无任何鉴权 | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:60-64,66-67`、`src/Popopx/Chat/Options.hs:408`、`../popopxmq/src/Popopx/Messaging/Transport/Server.hs:169-171` |
| 该 actor 拥着这条链的全部环节：守护进程生命周期（探测、常驻 `Process`、崩溃重启上限、SIGTERM→SIGKILL）、回环控制通道、Ed25519 节点身份密钥（0600 权限）、`PPXNODE1-…` 配对凭据、**已配对设备白名单（节点唯一真正掌控的授权门）**、把引擎结果送回 iOS（带磁盘 outbox 兜底） | `../PopopxMacNode/Sources/PopopxMacNode/Core/MacNodePopopxBridge.swift:7-15` |
| 节点只驱动自己 fork 的 CLI：上游构建「说的是另一套线协议，探测它只会把一个看得见的缺失依赖变成一次无法解释的握手失败」，所以根本不去 probe | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:69-72` |
| 邀请链接的 scheme 字面量是 `popopx:/`，协议侧同名同源；节点侧还有长度上限与敏感字符黑名单 | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:74-76,81-84`、`../popopxmq/src/Popopx/Messaging/ServiceScheme.hs:23` |
| 手机**从不**打开 `127.0.0.1:18920`：那是节点侧给同一台 Mac 上的工具用的本机控制台桥，配对屏上的这一段是「可复制的契约」，源码原话 "The app **never opens** that socket" 与 "on a phone that address is the phone" | `apps/ios/Shared/Features/Discover/MacNodePairingSheet.swift:10-12,617-619` |
| 客户端侧只是把这条契约原样展示（host、port、token 头名三个常量拼出地址串），没有任何连接测试 | `apps/ios/Shared/Features/Discover/DiscoverCatalogModels.swift:69-73`、`apps/ios/Shared/Features/Discover/MacNodePairingSheet.swift:647-648` |
| 控制台被钉在回环是安全模型而不是偏好：`requiredInterfaceType = .loopback`、`acceptLocalOnly`、`includePeerToPeer = false`，注释写明这台机器上除了 bearer token 没有别的东西在鉴权 | `../PopopxMacNode/Sources/PopopxMacNode/WebConsole/LocalWebConsoleServer.swift:3428-3434` |
| 本机推理链有实现：Ollama 探活走 `http://127.0.0.1:11434`（一次回环往返）；装机步骤依次是 FFmpeg/ffprobe、uv、Ollama、按内存拉取适配的 Qwen、初始化 LTX-2.5 MLX 工作区、下载并校验权重、端到端自检 | `../PopopxMacNode/Sources/PopopxMacNode/Core/HardwareProfilerAndInstaller.swift:437-439,516-522` |
| 模型清单恰好四项，控制台按此顺序列：`qwen3.8-27b-q8_0`、`qwen3.8-27b-q4_k_m`、`qwen3.8-9b-q4_k_m`、`inkling-2-mini`（约 20 GB 权重、建议 32 GB 起步；节点没发布参数量，`parameterBillions` 就留 `nil` 而不是猜一个进界面） | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:944-946,960-962,976-978,991-1000,1011-1012` |
| 内存阶梯三档（≥96 / 48–95 / <48 GB）与每档的 LTX 权重写法、理由都是代码里的字面量；<48 GB 档的原话是「轻推理，重视频交给 mesh」 | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:690-693,714-715,731-732,740-748` |
| 每个任务的依赖都写明：需要本地模型的任务是 `["ffmpeg", "ollama"]`，不需要的只 `["ffmpeg"]`；另有一次性 `DispatchSource` kill switch，「卡死的 ffmpeg 永远 wedge 不住」后续流程 | `../PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift:1737,3187` |
| **Chat ↔ 服务号套件**这一头有客户端实现撑着：服务号两级菜单、动态业务卡片、进程外 `SFSafariViewController` 的 H5、零知识频道信封 `popopx.channel.enc.v1`（见 §9）；套件侧的对应说法是「线协议与出厂 iOS 客户端逐字节对齐」 | `apps/ios/Shared/Features/ServiceAccount/BotMenuBarView.swift:40-42`、`../popopx-service-suite/README.en.md:9-12` |
| 套件的五个组成是 README 自述：FastAPI 网关、POPX-CP 计量、带零知识密钥轮换的频道信封加密、五个业务插件、浏览器管理台；且声明不链接、不修改、不重分发 node 的任何代码 | `../popopx-service-suite/README.en.md:9-13` |
| 注意同名词：**套件脚本里的 `node` 指它自己在 `127.0.0.1:5225` 拉起的消息服务端**（gateway 在 8080），与 Mac 节点无关，全景图不把这两个 node 连成一条线 | `../popopx-service-suite/README.en.md:12-13,65,71` |
| 五个插件是五个命名字段，默认 `web3_bridge` 关；`POPOPX_PLUGIN_<NAME>=0` 能把任意一个从 enabled 列表里摘掉，这套开关是网关自测逐条断言过的 | `../popopx-service-suite/gateway/app/config.py:250-255,811-814` |
| **Bot Studio 是 `popopx-cli` 的 supervisor**，不是聊天客户端的扩展：一个进程经回环 WebSocket 管任意多个 bot 实例；仓库零内置二进制（"Zero binary bundling"），运行时只驱动外部 cli，安装器可按需把二进制取到系统可执行目录（README 给了具体路径） | `../popopx-bot-studio/README.en.md:3-12` |
| Studio 的控制面同样只在回环：控制台默认 `127.0.0.1:8090`，非回环绑定必须显式 `STUDIO_ALLOW_LAN=1` 或 `--lan`；bot 控制端口从 `BOT_WS_PORT_BASE`（默认 5230）起到 5299 止，"never 0.0.0.0"；compose 也只发布回环 | `../popopx-bot-studio/README.en.md:26,41,51-52,139-140` |
| SMP Agent 协议既有规范也有服务端实现：规范头两行是 "Version 7, 2025-01-24" 与 "# SMP agent protocol - duplex communication over SMP protocol"；实现侧 Agent.hs 4558 行、Agent/Protocol.hs 2412 行，`data AgentErrorType` 是错误词汇表本体 | `../popopxmq/protocol/agent-protocol.md:1-3`、`../popopxmq/src/Popopx/Messaging/Agent.hs:1`、`../popopxmq/src/Popopx/Messaging/Agent/Protocol.hs:2161` |
| iOS 侧对 agent 层的可见面只有 Decodable 镜像（`AgentErrorType` 与八个 `A_*` 的 `SMPAgentError`）——「客户端能解码 agent 层错误」可以写，「客户端已实现跨组件编排」不可以写 | `apps/ios/POPOPXChat/APITypes.swift:1021,1185-1193` |
| **跨组件自动调度 0 处证据。**popopx-bot-studio 的 .py 里 grep `service-suite|POPX-CP|mp\.popopx` 0 命中；popopx-service-suite/gateway 里 grep `bot-studio|bot\.popopx|8090` 0 命中；PopopxMacNode/Sources 里 grep `bot-studio|service-suite` 0 命中（唯一命中的 5225 是它自己的本机守护进程端口）。全景图这三条一律虚线 + Planned | 本机 grep（配方见下） |

复测配方（在四个仓库的公共父目录里跑，即同时放着 `popopx-chat` 与 `popopx-chat-web` 的那一级）：

```sh
sed -n '60,64p;69,72p;74,76p' PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift
sed -n '57,58p;85,92p;690,693p;944,946p;991,1000p;1011,1012p;1737p;3187p' PopopxMacNode/Sources/PopopxMacNode/Models/MacNodeModels.swift
sed -n '7,15p' PopopxMacNode/Sources/PopopxMacNode/Core/MacNodePopopxBridge.swift
sed -n '437,439p;516,522p' PopopxMacNode/Sources/PopopxMacNode/Core/HardwareProfilerAndInstaller.swift
sed -n '3428,3434p' PopopxMacNode/Sources/PopopxMacNode/WebConsole/LocalWebConsoleServer.swift
sed -n '8,12p;616,620p;646,650p' popopx-chat/apps/ios/Shared/Features/Discover/MacNodePairingSheet.swift
sed -n '69,73p' popopx-chat/apps/ios/Shared/Features/Discover/DiscoverCatalogModels.swift
sed -n '408p' popopx-chat/src/Popopx/Chat/Options.hs
sed -n '169,171p' popopxmq/src/Popopx/Messaging/Transport/Server.hs
sed -n '23p' popopxmq/src/Popopx/Messaging/ServiceScheme.hs
sed -n '1,3p' popopxmq/protocol/agent-protocol.md
sed -n '2161p' popopxmq/src/Popopx/Messaging/Agent/Protocol.hs
wc -l popopxmq/src/Popopx/Messaging/Agent.hs popopxmq/src/Popopx/Messaging/Agent/Protocol.hs
sed -n '9,13p;65p;71p' popopx-service-suite/README.en.md
sed -n '250,255p;811,814p' popopx-service-suite/gateway/app/config.py
sed -n '3,12p;26p;41p;51,52p;139,140p' popopx-bot-studio/README.en.md
sed -n '1021p;1185,1193p' popopx-chat/apps/ios/POPOPXChat/APITypes.swift
grep -rlE "service-suite|POPX-CP|mp\.popopx" popopx-bot-studio --include="*.py" | wc -l    # 0
grep -rlE "bot-studio|bot\.popopx|8090" popopx-service-suite/gateway | wc -l              # 0
grep -rlE "bot-studio|service-suite" PopopxMacNode/Sources | wc -l                        # 0
```

三条严禁：不得写成「手机经 127.0.0.1 直连 Mac 节点」（§16 第 5 行否掉了）；不得把套件脚本里的 `node`
当成 Mac 节点（第 14 行）；不得把跨组件自动调度、PAP、任何「四端已自动协同」写成实线或既成事实（第 20 行）。
另外「企业服务 / 企业治理」在四个仓库里 0 处证据，一律不写——套件侧可写的是五个业务插件与 POPX-CP 计量。

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

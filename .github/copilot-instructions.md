<!-- 自动为 AI 代理和协作开发者提供的项目速览与工作要点 -->
# Copilot / AI 代理 使用说明（项目特定）

此仓库是一个基于微信小程序（WeChat Mini Program）的 TypeScript + SCSS 示例工程。以下说明集中描述对 AI 编码代理立即有用的项目结构、约定、关键文件与工作流程线索。

**项目概览**
- **根目录：** `package.json`（当前无构建脚本）。
- **小程序源：** `miniprogram/`（入口与所有页面、组件均在此目录）。
- **类型支持：** `devDependencies` 使用 `miniprogram-api-typings`，并在 `typings/` 下有自定义类型声明（例如 `IAppOption` 在 `typings/index.d.ts`）。

**架构要点（大图景）**
- **运行环境：** 微信小程序运行时（不是 Web）。通常使用微信开发者工具进行构建/调试；仓库中未包含自动化 CLI 脚本。
- **组件模型：** 本项目广泛使用 `Component({...})` 来实现页面与 UI 组件（例如 `miniprogram/pages/index/index.ts` 和 `miniprogram/components/navigation-bar/navigation-bar.ts`），并通过 `lifetimes.attached`、`properties` 与 `methods` 组织逻辑。
- **全局数据流：** `miniprogram/app.ts` 定义 `App<IAppOption>({...})`，并通过 `getApp<IAppOption>()` 在页面/组件中读取 `globalData`；避免在不兼容处改变 `IAppOption` 结构。

**关键文件与模式示例**
- `miniprogram/app.ts`：应用入口，用于初始化 `globalData`、调用 `wx.login()` 与本地存储（`wx.getStorageSync` / `wx.setStorageSync`）。AI 修改全局状态时请保持向后兼容。
- `miniprogram/utils/util.ts`：工具函数示例（`formatTime`），页面通过相对路径 `import { formatTime } from '../../utils/util'` 使用。
- `miniprogram/components/navigation-bar/navigation-bar.ts`：演示对设备信息与安全区的处理（`wx.getMenuButtonBoundingClientRect()`、`wx.getSystemInfo()`），以及 `properties` 的 `observer` 使用（例如 `show` -> `_showChange`）。
- `miniprogram/pages/*`：页面通常以组件方式实现；注意 `setData` 更新数据和事件处理 (`methods`) 的约定。

**项目约定与注意事项（只记录可发现的规则）**
- **TypeScript + typings：** 使用 `miniprogram-api-typings`，代码中以泛型调用 `getApp<IAppOption>()`，建议保留或扩展 `typings/` 中的类型声明。
- **样式组织：** 每个页面/组件旁边存在 `.scss` 文件（例如 `miniprogram/pages/index/index.scss`），请保持对应命名与相对路径。
- **页面实现风格：** 本仓库的页面有时是以 `Component()` 实现（而非 `Page()`），不要自动将其改为 `Page()`，除非确认该页面应为页面生命周期而非组件。
- **兼容性处理：** `navigation-bar` 里有针对 `devtools`/`android` 的判断和 `safeArea` 处理，修改 UI 时应尊重这些平台差异逻辑。

**构建 / 运行 / 调试（可发现的信息）**
- 仓库未包含 `npm run` 脚本或 CI 配置。常用流程：
  - 在微信开发者工具中打开项目根目录（`miniprogram/` 为源），进行预览与真机调试。
  - 代码静态检查与类型提示依赖 `miniprogram-api-typings` 与 `typings/` 下的声明。
- 如果需要自动化（建议开发者决定），可在 `package.json` 添加脚本（例如 `build:ts` / `watch:sass`），但当前仓库没有这类脚本，AI 不应擅自插入复杂构建链。

**对 AI 代理的具体建议（行动性指引）**
- 变更组件或页面逻辑时：检查对应的 `wxml` / `.scss` 文件是否需要同步更新（路径和命名匹配）。
- 修改全局类型或 `IAppOption`：先更新 `typings/index.d.ts`，并在至少一个页面中调整 `getApp<IAppOption>()` 的用法以保持类型一致性。
- 引入新依赖：在修改 `package.json` 前，确认是否需要在 CI 或开发者机器上运行 `npm install`；尽量保持依赖精简。
- 增加脚本或工具链：先在 PR 描述中说明原因与运行方式（例如建议添加 `npm run dev` 用于 Sass 编译或 TypeScript 构建），避免未经讨论直接提交。

**快速定位示例**
- 页面取 `globalData`：`getApp<IAppOption>()`（见 `miniprogram/pages/index/index.ts`）。
- 工具函数：`formatTime`（见 `miniprogram/utils/util.ts`）。
- 组件安全区处理：`navigation-bar` 使用 `wx.getMenuButtonBoundingClientRect()` 与 `wx.getSystemInfo()`（见 `miniprogram/components/navigation-bar/navigation-bar.ts`）。

请审阅以上内容是否满足你的需求；若希望我把 `README.md` 或 CI 脚本一并补充进此说明（例如添加 `npm` 脚本或 GitHub Actions 模板），我可以基于你希望的工作流继续扩展。

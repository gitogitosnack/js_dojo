# ☺Playwright チートシート

出典: https://web-cheatsheet.com/playwright/

Microsoft が開発した E2E テストフレームワーク「Playwright」の要点まとめ。クロスブラウザテスト、Auto-wait、ロケーター、アサーション、テストランナー、設定ファイル、スクリーンショット、トレースなどを扱う。

## 目次

- [セットアップ & CLI](#セットアップ--cli)
- [ロケーター](#ロケーター)
- [ページ操作](#ページ操作)
- [アサーション](#アサーション)
- [テストランナー](#テストランナー)
- [設定ファイル](#設定ファイル)
- [スクリーンショット & トレース](#スクリーンショット--トレース)
- [ベストプラクティス](#ベストプラクティス)

---

## セットアップ & CLI

### インストール

```bash
# Create new project with Playwright
npm init playwright@latest

# Or add to existing project
npm install -D @playwright/test
npx playwright install
```

### CLIコマンド一覧

| コマンド | 説明 |
|---------|------|
| `npx playwright test` | 全テストを実行 |
| `npx playwright test tests/login.spec.ts` | 特定のテストファイルを実行 |
| `npx playwright test --grep "login"` | テスト名でフィルタして実行 |
| `npx playwright test --headed` | ブラウザを表示してテストを実行 |
| `npx playwright test --ui` | UIモードでテストを実行（インタラクティブ） |
| `npx playwright test --debug` | デバッグモードでテストを実行 |
| `npx playwright test --project=chromium` | 特定のブラウザプロジェクトのみ実行 |
| `npx playwright codegen https://example.com` | ブラウザ操作を記録してテストコードを自動生成 |
| `npx playwright show-report` | HTMLテストレポートを開く |
| `npx playwright install` | テスト用ブラウザをインストール |
| `npx playwright install-deps` | システム依存パッケージをインストール |
| `npx playwright test --list` | テスト一覧を表示（実行しない） |

---

## ロケーター

### 推奨ロケーター

| ロケーター | 説明 | 例 |
|-----------|------|-----|
| `getByRole` | アクセシブルロールで要素を検索（最も推奨） | `page.getByRole('button', { name: 'Submit' })` |
| `getByText` | テキスト内容で検索 | `page.getByText('Hello World')` |
| `getByLabel` | フォームラベルで検索 | `page.getByLabel('Email')` |
| `getByPlaceholder` | プレースホルダーで検索 | `page.getByPlaceholder('Enter email')` |
| `getByTestId` | data-testid属性で検索 | `page.getByTestId('submit-btn')` |
| `getByAltText` | alt属性で画像を検索 | `page.getByAltText('Logo')` |
| `getByTitle` | title属性で検索 | `page.getByTitle('Settings')` |

### CSS / XPath セレクター

```javascript
// CSS selector
page.locator('.submit-button')
page.locator('#email-input')
page.locator('[data-cy="login"]')
page.locator('article >> .title')

// XPath
page.locator('xpath=//button[@type="submit"]')

// nth element
page.locator('.item').nth(2)
page.locator('.item').first()
page.locator('.item').last()
```

### ロケーターの連鎖

```javascript
// Filter by text
page.getByRole('listitem')
  .filter({ hasText: 'Product' })

// Filter by child locator
page.getByRole('listitem')
  .filter({
    has: page.getByRole('heading', { name: 'Title' })
  })

// Chain locators
page.getByRole('dialog')
  .getByRole('button', { name: 'OK' })

// Filter + action
page.getByRole('row')
  .filter({ hasText: 'admin' })
  .getByRole('button', { name: 'Edit' })
  .click()
```

---

## ページ操作

### ナビゲーション

| アクション | 説明 |
|-----------|------|
| `await page.goto('https://example.com')` | 指定URLに移動 |
| `await page.goBack()` | ブラウザの「戻る」を実行 |
| `await page.goForward()` | ブラウザの「進む」を実行 |
| `await page.reload()` | ページをリロード |

### 値の取得

| アクション | 説明 |
|-----------|------|
| `await locator.textContent()` | 要素のテキストコンテンツを取得 |
| `await locator.inputValue()` | 入力フィールドの値を取得 |
| `await locator.getAttribute('href')` | 要素の属性値を取得 |
| `await locator.innerHTML()` | 要素のHTMLコンテンツを取得 |
| `await locator.isVisible()` | 要素が表示されているかを確認 |
| `await locator.count()` | 一致する要素の数を取得 |

### 要素操作

| アクション | 説明 |
|-----------|------|
| `await locator.click()` | 要素をクリック |
| `await locator.dblclick()` | 要素をダブルクリック |
| `await locator.fill('text')` | 入力フィールドに値を設定（既存値をクリア） |
| `await locator.type('text')` | 文字を1つずつ入力 |
| `await locator.check()` | チェックボックスをONにする |
| `await locator.uncheck()` | チェックボックスをOFFにする |
| `await locator.selectOption('value')` | ドロップダウンの値を選択 |
| `await locator.hover()` | 要素の上にマウスカーソルを移動 |
| `await locator.focus()` | 要素にフォーカス |
| `await locator.press('Enter')` | キーボードキーを押す |
| `await locator.setInputFiles('file.pdf')` | ファイルをアップロード |

---

## アサーション

### 要素アサーション

| アサーション | 説明 |
|-----------|------|
| `expect(locator).toBeVisible()` | 要素が表示されていることを確認 |
| `expect(locator).toBeHidden()` | 要素が非表示であることを確認 |
| `expect(locator).toBeEnabled()` | 要素が有効であることを確認 |
| `expect(locator).toBeDisabled()` | 要素が無効であることを確認 |
| `expect(locator).toHaveText('text')` | テキストが完全一致することを確認 |
| `expect(locator).toContainText('text')` | テキストが含まれていることを確認 |
| `expect(locator).toHaveValue('value')` | 入力値が一致することを確認 |
| `expect(locator).toHaveAttribute('name', 'val')` | 属性値が一致することを確認 |
| `expect(locator).toHaveClass(/active/)` | CSSクラスが含まれていることを確認 |
| `expect(locator).toHaveCount(3)` | 要素の数が一致することを確認 |
| `expect(locator).toBeChecked()` | チェックボックスがONであることを確認 |

### ページアサーション

| アサーション | 説明 |
|-----------|------|
| `expect(page).toHaveTitle(/Dashboard/)` | ページタイトルが一致することを確認 |
| `expect(page).toHaveURL(/dashboard/)` | URLが一致することを確認 |
| `expect(page).toHaveScreenshot()` | スクリーンショットがベースラインと一致 |

> **補足:** Web-first アサーションは条件が満たされるまで自動リトライする（デフォルト5秒）。

---

## テストランナー

### テスト構造

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('valid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('user@test.com');
    await page.getByLabel('Password').fill('pass123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('wrong@test.com');
    await page.getByLabel('Password').fill('wrong');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
```

### カスタムFixtures

```typescript
import { test as base } from '@playwright/test';

const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@test.com');
    await page.getByLabel('Password').fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await use(page);
  },
});

// Use fixture in test
test('dashboard', async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL('/dashboard');
});
```

### テスト制御

```typescript
// Skip a test
test.skip('feature not ready', async () => {});

// Run only this test
test.only('debug this', async ({ page }) => {});

// Conditional skip
test('mobile only', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile only test');
  // ...
});

// Slow test (3x timeout)
test('complex flow', async ({ page }) => {
  test.slow();
  // ...
});
```

---

## 設定ファイル

### 基本設定

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  fullyParallel: true,
  reporter: [
    ['html'],
    ['json', { outputFile: 'results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    viewport: { width: 1280, height: 720 },
    locale: 'ja-JP',
    timezoneId: 'Asia/Tokyo',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10_000,
  },
});
```

### ブラウザプロジェクト設定

```typescript
// playwright.config.ts (projects section)
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  { name: 'mobile', use: { ...devices['iPhone 13'] } },
],
```

### Webサーバー自動起動

```typescript
// playwright.config.ts
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 120_000,
},
```

---

## スクリーンショット & トレース

### スクリーンショット

```javascript
// Full page
await page.screenshot({ path: 'full.png', fullPage: true });

// Element only
await page.getByRole('main').screenshot({ path: 'main.png' });

// With clip region
await page.screenshot({
  path: 'clip.png',
  clip: { x: 0, y: 0, width: 800, height: 600 },
});
```

### トレース

```javascript
// Start tracing
await context.tracing.start({
  screenshots: true, snapshots: true, sources: true,
});

// ... run test actions ...

// Stop and save
await context.tracing.stop({ path: 'trace.zip' });
// View: npx playwright show-trace trace.zip
```

### ビジュアルリグレッションテスト

```javascript
// Visual comparison test
await expect(page).toHaveScreenshot('homepage.png');

// With threshold
await expect(page).toHaveScreenshot(
  'homepage.png',
  { maxDiffPixelRatio: 0.01 }
);

// Update baselines:
// npx playwright test --update-snapshots
```

---

## ベストプラクティス

- ユーザーの行動をテストする（実装の詳細ではなく）
- CSSセレクターより `getByRole` 等の意味的ロケーターを優先する
- `page.waitForTimeout()` や sleep を使わない（Auto-wait を活用）
- Page Object Model (POM) パターンでテストコードを整理する
- `beforeEach` より Fixtures を使って共通セットアップを定義する
- テストは並列実行できるよう独立させる
- 各テストで Browser Context を分離する（Cookie/Storage 独立）
- Web-first アサーション（自動リトライ付き）を使う

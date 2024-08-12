## 使い方

ライブラリとして配信しているわけではないので、コピペして使ってください。

### サイト側

`FeatureFlagScript`コンポーネント(`src/components/FeatureFlagScript/FeatureFlagScript.tsx`)をlayout.tsxで読み込む。
```tsx
<FeatureFlagScript />
```
↑内部的にはフィーチャーフラグ用のグローバルなオブジェクト(`window.featureFlags`)を初期化するためのスクリプトを実行している。  
(NextScriptの`strategy="beforeInteractive"`で実行されるので、ハイドレートされるよりも先に実行される。)

`FeatureFlag`コンポーネント(`src/components/FeatureFlag/FeatureFlag.tsx`)でテストしたいコンポーネントをラップし、`code`に任意のコードを設定する。  
このコードはA/Bテストツール側で設定する。

```tsx
<FeatureFlag code="任意のコード">
  {/* なんらかのチャレンジャーで表示したいコンポーネント */}
</FeatureFlag>
```

### A/Bテストツール側

Optimize Nextとか。  
チャレンジャー側でカスタムスクリプトが実行されるように設定する。

```js
window.featureFlags.push("サイト側に設定した任意のコード")
```

これで、サイト側で`FeatureFlag`コンポーネントでラップしたコンポーネントが表示されるようになる。

## コンポーネントの表示非表示ではなく、AパターンとBパターンの切り替えをしたい場合

`FeatureFlag`コンポーネントのchildrenに関数を渡すことで、A/Bテストの結果によって表示するコンポーネントを切り替えることができる。

```tsx
<FeatureFlag code="任意のコード">
  {(active) => active ? <Challenger /> : <Original />}
</FeatureFlag>
```
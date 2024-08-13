## 実際に動いているところを見てみたいとき

https://feature-flag-test.vercel.app/optimize-next にアクセス。

画面の右下に青色の丸いボタンが表示されていたら、あなたが今アクセスしているページはチャレンジャー。表示されていなかったらオリジナル。  
ランダムに振られるのでシークレットモードで試してください。

オリジナル側に振られたら、コンソールを開いて
```js
window.featureFlags.push("sample-feature")
```
を実行すると、チャレンジャー側のコンポーネントが表示されるはず。  

つまり、A/Bテストサービス(ここではOptimize Next)側で、
- オリジナルのときは何もしない
- チャレンジャーのときは「JavaScriptを実行」で`window.featureFlags.push("sample-feature")`を実行する

という設定をしている。

## 使い方

ライブラリとして配信しているわけではないので、コピペして使ってください。

### サイト側

`FeatureFlagScript`コンポーネント(`src/components/FeatureFlagScript/FeatureFlagScript.tsx`)を`layout.tsx`などで読み込む。
```tsx
<head>
  <FeatureFlagScript />
</head>
```
(NextScriptの`strategy="beforeInteractive"`で実行されるようにしているので、`<head>`内に設置すること)
↑内部的にはフィーチャーフラグ用のグローバルなオブジェクト(`window.featureFlags`)を初期化するためのスクリプトを実行している。  

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
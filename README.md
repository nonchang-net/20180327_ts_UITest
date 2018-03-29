# 20180327火曜日 UIテスト

## 概要

- WebGLゲームのUI実装の検討


## 方針メモ

- pure typescriptによる実装の検討から。
	- 古いブラウザの考慮は一切除外。

- 全画面表示。

- WebGLやcanvas2dにdivを重ねて、flexboxで手早くUI作れるようなベースを整えたい。
	- `目標` UnityのuGUIに近い考え方や使い勝手が実現できると嬉しい。


`EOF`




### 古いメモ


- vanilla typescriptでどのようなui設計が可能か少し調べてみる。
- flexboxの動的生成で制御可能かどうか。

- まずcanvasが配置され、基本的なUIはその上にHTMLとして重ねるイメージ。
	- 画面最上部・最下部などは広告枠などが要求されるかも。
	- また、canvasのサイズを調整したい。


- 制限事項
	- jsだけでできないことは素直にcssを定義する。
		- とりあえずリセットとして以下をhtml側に定義。ボタンフォーカスのアウトラインも邪魔。。
			<style type="text/css">
			*{
				margin : 0 ; padding : 0 ; box-sizing: border-box ;
			}
			*:focus { outline: 0 }
			</style>

- メモ
	- https://coliss.com/articles/build-websites/operation/css/css3-flexbox-properties-by-scotch.html
		- flexboxで概ね設定できそうな気配。uGUIで言う所のhorizontal,vertical,grid layoutに相当する動きは問題なくいけそう。
		- もちろんUnityと違って全体の比率をGUIで調節できる訳ではないので、計画ならびに「複雑すぎないUI」の検討が重要になると思うけど。

- 実現したい挙動の案

	- 下部ボタンを最低限のcssによる表現で。
			- 9sliceに当たる表現は可能か？ →border-imageでいけそう。素材探しが難点かも。自作する？

		- webフォントでも使えば十分雰囲気出せたりしないか？
			https://liginc.co.jp/web/design/font/15639
			- Googleフォントはすぐ使えるけど……無料で雰囲気のある和文フォントを探すのは辛いだろうなぁ。
			- 欧文フォントは色々あるので、雰囲気作りのために欧文フォントの部分採用を検討するのは良いと思う。



	- 下部ボタンの表示・非表示をtweenで表現したい
			- 階層メニューをalpha含むtweenアニメーション付きで入れ替えたい。css animationかな？
			- ここで、:hoverなど擬似要素はjavascriptから設定できないことを知る……。これ、「DOM要素じゃない」という説明を見かけるけどどういうことなんだろうなぁ。レンダリング結果に反映される要因なのだからAPI用意して欲しいところだけど＞＜；
			- ということで、jsからサクッと使えるアニメーションライブラリを探す方法に切り替えた方が良いだろう。
				- とりあえず見つかったanime.jsを試してみようか？
				- TypeScriptソースごと晒してるようなライブラリがあると助かるのだけども。自作しちまおうかなぁ。

`EOF`
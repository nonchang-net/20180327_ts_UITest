/*
# main.ts

Copyright(C) nonchang.net All rights reserved.

## 概要

- webpackビルドのエントリポイントです。

*/

// import * as Maze from "./Maze"

// Windowスコープを拡張: コンソールからMainのpublic要素にアクセスできるように
// 例: console.log("test",window.Main.dirty) //note: 実行時はjavascriptなので、privateプロパティも参照できる点に注意
// declare global{
// 	interface Window{
// 		Main?
// 	}
// }

// bootstrap
window.addEventListener('DOMContentLoaded', () => {
	// window.Main = 
	new Main(
		document.querySelector('body')
	);
});

class Main{


	constructor(body: HTMLBodyElement){
		//UIモジュールのテスト

		// UNDONE: 「new Styler」をshorthandしたい……けど、どうやら返り値を特定できてない。
		// const st = (str: keyof HTMLElementTagNameMap)=>{ return new Styler(str)}

	
		const canvas = new Styler("canvas").fullWindow().appendTo(body).getElement()

		canvas.style.backgroundColor = "rgba(230,255,255,1)"
		body.appendChild(canvas)
		this.renderCanvas2d(canvas.getContext('2d'))

		const ui = new Styler("div").fullWindow().appendTo(body).getElement()

		// console.log(ui)
	

		//右下ボタンテスト
		// const button = new Styler("button")
		// 	.bg(255,255,255,0.7)
		// 	.text("testButton")
		// 	.size(100,100)
		// 	.abs().r(0).b(0)
		// 	.appendTo(ui)
		// 	.getElement()

		// button.onclick = ()=>{ console.log("testtest") }


		// button shorthand
		var btn = (text: string, elm: HTMLElement) => {
			var newButton = new Styler("button")
				.text(text)
				.size(100, 50)
				.glow()
				// .round(10)
				.framed()
				// .margin(3)
				.appendTo(elm)
				.getElement()
				;
			newButton.onmouseover = () => {
				// console.log("onmouseover");
				newButton.style.backgroundColor = "rgba(255,0,0,1)"
				newButton.style.borderWidth = "10"
				newButton.style.borderColor = "rgba(255,255,255,0.3)"
			}
			newButton.onmousedown = () => {
				// console.log("onmouseover");
				newButton.style.backgroundColor = "rgba(255,0,255,1)"
			}
			newButton.onmouseup = () => {
				// console.log("onmouseover");
				newButton.style.backgroundColor = "rgba(255,255,255,1)"
			}
			newButton.onmouseout = () => {
				// console.log("onmouseout");
				newButton.style.backgroundColor = "rgba(255,255,255,1)"
				newButton.style.borderColor = "#fff"
			}
			newButton.onclick = (e) => {
				e.preventDefault()
				console.log("onclick");
			}
		}


		// 下部ボタンをflex layoutで。

		const bottomButtonLayout = new Styler("div")
			.abs().fullWindow()//b()
			.flexVertical()
			.appendTo(body)
			.getElement()
			;
		bottomButtonLayout.style.width = "100%";

		// 下部ボタン以外「全て」
		const mainContent = new Styler("div")
			.appendTo(bottomButtonLayout)
			.text("mainContents")
			.getElement()
		;
		mainContent.style.display = "flex";
		mainContent.style.flex = "1";
		mainContent.style.border="solid"
		mainContent.style.borderWidth="40px 40px 40px 40px"
		mainContent.style.borderImage="url(borderimage_sample.png) 40 40 40 40 fill repeat"

		//1列目
		const bottomButtonLayoutSub1 = new Styler("div")
			.height(50)
			.flexHorizontal()
			.appendTo(bottomButtonLayout)
			.getElement()
			;
		bottomButtonLayoutSub1.style.width = "100%";

		btn("atk", bottomButtonLayoutSub1)
		btn("mgk", bottomButtonLayoutSub1)
		btn("テスト", bottomButtonLayoutSub1)

		//2列目
		const bottomButtonLayoutSub2 = new Styler("div")
			.height(50)
			.flexHorizontal()
			.appendTo(bottomButtonLayout)
			.getElement()
			;
		bottomButtonLayoutSub2.style.width = "100%";

		btn("4", bottomButtonLayoutSub2)
		btn("5", bottomButtonLayoutSub2)
		btn("6", bottomButtonLayoutSub2)



		//ダイアログ - うまくいってない
		// const div = new Styler("div")
		// 	.text("123123")
		// 	.marginWindow(80)
		// 	.appendTo(body)
		// 	.getElement()
		// div.style.border="1px solid gray"
		// div.style.borderWidth="40px 40px 40px 40px"
		// div.style.borderImage="url(borderimage_sample.png) 40 40 40 40 fill repeat"




		// =========================
		// boilerplates

		// update boilerplate
		// window.addEventListener('resize',()=>{
		// 	this.updateView()
		// })
		// this.updateView()
	}

	renderCanvas2d(ctx: CanvasRenderingContext2D){
		ctx.beginPath();
		const paddingX = 20
		const paddingY = 20
		ctx.moveTo(paddingX, paddingY);
		ctx.lineTo(40, paddingY);
		ctx.lineTo(40, 40);
		ctx.lineTo(paddingX, 40);
		ctx.closePath();
		ctx.stroke();
	}

}






//==================================================
// Styler
// 検討中: 
// - jQueryのようにメソッドチェーンするCSS設定ユーティリティにできると嬉しい。
//	- 面白がってjQueryの再発明をし続けないように注意。目的はHTML5ゲーム設計時のDOM生成とCSS周りの補佐。
// - せっかくのTypeScriptなので、document.createElementの返す型を維持するように設計。
// - CSSは「目的」に対して「決まった記述のセット」が多いように感じたため作成。
// - flexboxによるUI検討のヘルパーにしていきたい。

// 利用例:
// - `const canvas = new Styler("canvas").fullWindow().appendTo(body).getElement()` //→HTMLCanvasElement型

class Styler<T extends keyof HTMLElementTagNameMap>{

	private elm: HTMLElementTagNameMap[T]

	constructor(tagName: T) {
		this.elm = document.createElement(tagName)
		return this
	}

	// set style shorthand

	fullWindow(): Styler<T> {
		// this.marginWindow(100);
		this.abs()
		this.elm.style.width = `100%`
		this.elm.style.height = `100%`
		return this
	}

	// marginWindow(percent: number): Styler<T> {
	// 	this.abs()
	// 	this.elm.style.width = `{percent}%`
	// 	this.elm.style.height = `{percent}%`
	// 	return this
	// }

	bg(r: number | string, g?: number, b?: number, a?: number): Styler<T> {
		if (typeof r === "string") {
			this.elm.style.background = r
			return this
		}
		this.elm.style.background = `rgba(${r},${g},${b},${a})`
		return this
	}

	// height(num: number): Styler<T>{
	// 	this.elm.style.height = "1px solid gray;"
	// 	return this
	// }

	//UNDONE: 検討中
	bordered1(): Styler<T> {
		this.elm.style.border = "1px solid gray;"
		return this
	}

	margin(num: number = 1): Styler<T> {
		this.elm.style.margin = `${num}px`
		return this
	}

	padding(num: number = 1): Styler<T> {
		this.elm.style.padding = `${num}px`
		return this
	}

	round(radius: number): Styler<T> {
		this.elm.style.borderRadius = `${radius}px`
		return this
	}

	text(text: string): Styler<T> {
		this.elm.innerText = text
		return this
	}

	abs(): Styler<T> {
		this.elm.style.position = "absolute"
		return this
	}

	size(width: number | string, height: number | string): Styler<T> {
		if (typeof width === "string") {
			this.elm.style.width = width
		} else {
			this.elm.style.width = `${width}px`
		}
		if (typeof height === "string") {
			this.elm.style.height = height
		} else {
			this.elm.style.height = `${height}px`
		}
		return this
	}
	height(height: number): Styler<T>{
		this.elm.style.height = `${height}px`
		return this
	}
	width(width: number): Styler<T>{
		this.elm.style.width = `${width}px`
		return this
	}

	//right, left, top, bottom

	r(num: number = 0): Styler<T> {
		this.elm.style.right = `${num}px`
		return this
	}

	l(num: number = 0): Styler<T> {
		this.elm.style.left = `${num}px`
		return this
	}

	t(num: number = 0): Styler<T> {
		this.elm.style.top = `${num}px`
		return this
	}

	b(num: number = 0): Styler<T> {
		this.elm.style.bottom = `${num}px`
		return this
	}

	//flexbox

	flexHorizontal(): Styler<T> {
		this.elm.style.display = "flex"
		this.elm.style.flexDirection = "row"
		return this
	}
	flexVertical(): Styler<T> {
		this.elm.style.display = "flex"
		this.elm.style.flexDirection = "column"
		return this
	}
	glow(num: number = 1): Styler<T> {
		this.elm.style.flexGrow = `${num}`
		return this
	}

	// framed image
	framed(): Styler<T> {
		this.elm.style.borderStyle = "solid"
		this.elm.style.borderWidth = "16px 16px 16px 16px"
		this.elm.style.borderImage = "url(frame-small.png) 16 16 16 16 fill repeat"
		return this
	}

	// output utils

	appendTo(dom: HTMLElement): Styler<T> {
		dom.appendChild(this.elm)
		return this
	}

	getElement(): HTMLElementTagNameMap[T] {
		return this.elm
	}

}







//==================================================
//ユーティリティ


// async sleep
// https://qiita.com/asa-taka/items/888bc5a1d7f30ee7eda2
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

// ディープクローン
// https://kuroeveryday.blogspot.jp/2017/05/deep-clone-object-in-javascript.html

class Utils{
	static deepClone(object) {
		let node;
		if (object === null) {
			node = object;
		}
		else if (Array.isArray(object)) {
			node = object.slice(0) || [];
			node.forEach(n => {
				if (typeof n === 'object' && n !== {} || Array.isArray(n)) {
					n = this.deepClone(n);
				}
			});
		}
		else if (typeof object === 'object') {
			node = Object.assign({}, object);
			Object.keys(node).forEach(key => {
				if (typeof node[key] === 'object' && node[key] !== {}) {
					node[key] = this.deepClone(node[key]);
				}
			});
		}
		else {
			node = object;
		}
		return node;
	}
}
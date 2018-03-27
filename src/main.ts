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

	//canvas
	readonly CellDrawSize = 8


	constructor(body: HTMLBodyElement){
		//UIモジュールのテスト

		// UNDONE: 「new Styler」をshorthandしたい……けど、どうやら返り値を特定できてない。
		// const st = (str: keyof HTMLElementTagNameMap)=>{ return new Styler(str)}

	
		const canvas = new Styler("canvas").fullWindow().appendTo(body).getElement()

		canvas.style.backgroundColor = "rgba(230,255,255,1)"
		body.appendChild(canvas)
		this.renderCanvas2d(canvas.getContext('2d'))

		const ui = new Styler("div").fullWindow().appendTo(body).getElement()

		console.log(ui)
	
		const button = new Styler("button")
			.bg(255,255,255,0.7)
			.text("testButton")
			.size(100,100)
			.abs().r(0).b(0)
			.appendTo(ui)
			.getElement()

		button.onclick = ()=>{ console.log("testtest") }






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
// - CSSは「目的」に対して「決まった記述のセット」が多いように感じたため。

// 利用例
// - `const canvas = new Styler("canvas").fullWindow().appendTo(body).getElement()`

class Styler<T extends keyof HTMLElementTagNameMap>{

	private elm: HTMLElementTagNameMap[T]

	constructor(tagName: T){
		this.elm = document.createElement(tagName)
		return this
	}

	// set style shorthand

	fullWindow(): Styler<T>{
		this.elm.style.position = "absolute"
		this.elm.style.width = "100%"
		this.elm.style.height = "100%"
		return this
	}

	bg(r:number, g:number, b:number, a:number): Styler<T>{
		this.elm.style.background = `rgba(${r},${g},${b},${a})`
		return this
	}

	bordered1(): Styler<T>{
		this.elm.style.border = "1px solid gray;"
		return this
	}

	round(radius: number): Styler<T>{
		this.elm.style.borderRadius = `${radius}px`
		return this
	}

	text(text: string): Styler<T>{
		this.elm.innerText = text
		return this
	}

	abs(): Styler<T>{
		this.elm.style.position = "absolute"
		return this
	}

	size(width: number, height: number): Styler<T>{
		this.elm.style.width = `${width}px`
		this.elm.style.height = `${height}px`
		return this
	}

	//right, left, top, bottom

	r(num: number): Styler<T>{
		this.elm.style.right = `${num}px`
		return this
	}

	l(num: number): Styler<T>{
		this.elm.style.left = `${num}px`
		return this
	}

	t(num: number): Styler<T>{
		this.elm.style.top = `${num}px`
		return this
	}

	b(num: number): Styler<T>{
		this.elm.style.bottom = `${num}px`
		return this
	}

	// output utils

	appendTo(dom: HTMLElement): Styler<T>{
		dom.appendChild(this.elm)
		return this
	}

	// appendToStyler(styler: any): Styler<T>{
	// 	styler.appendTo(this.elm)
	// 	return this
	// }

	getElement(): HTMLElementTagNameMap[T]{
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
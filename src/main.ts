/*
# main.ts

Copyright(C) nonchang.net All rights reserved.

## 概要

- webpackビルドのエントリポイントです。

*/

// import * as Maze from "./Maze"
import { default as Tween } from "./Common/Tween"
import Utils from "./Common/Utils"
import Styler from "./UI/Styler"
import * as ButtonClasses from "./UI/Buttons"

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

class Main {


	constructor(body: HTMLBodyElement) {
		//UIモジュールのテスト

		// canvasテスト
		// map表示に必要になる気がする
		const canvas = new Styler("canvas").fullWindow().appendTo(body).getElement()
		canvas.style.backgroundColor = "rgba(0,0,0,1)"
		// body.appendChild(canvas)
		// this.renderCanvas2d(canvas.getContext('2d'))

		const ui = new Styler("div").fullWindow().appendTo(body).getElement()
		ui.style.overflow = `hidden`

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


		// 全体レイアウト
		const layout = new Styler("div")
			.abs().fullWindow()//b()
			.flexVertical()
			.appendTo(ui)
			.getElement()
			;
		layout.style.width = "100%";

		// 下部ボタン以外「全て」
		const mainContent = new Styler("div")
			.appendTo(layout)
			.text("mainContents")
			.getElement()
			;
		mainContent.style.display = "flex";
		mainContent.style.flex = "1";
		mainContent.style.border = "solid"
		mainContent.style.borderWidth = "40px 40px 40px 40px"
		mainContent.style.borderImage = "url(borderimage_sample.png) 40 40 40 40 fill repeat"

		// 下部ボタンUI
		const buttons = new ButtonClasses.Buttons((elm: HTMLElement) => {
			//ボタンスタイル設定
			elm.style.borderStyle = "solid"
			elm.style.borderWidth = "16px 16px 16px 16px"
			elm.style.borderImage = "url(borderimage_20180331_2.png) 16 16 16 16 repeat"
			elm.style.background = "none"
			elm.style.color = "#999"
			elm.style.alignItems = "center"
		})
		layout.appendChild(buttons.element)
		buttons.element.style.background = "url(texturemate_metal10_small.jpg)"
		buttons.element.style.backgroundSize = "cover"


		const mainMenu: ButtonClasses.IUpdateData = {
			rows: [
				{ //row 1
					buttons: [
						{
							text: "command",
							onclick: async () => {
								buttons.interactable = false
								await buttons.hide()
								buttons.update(commandMenu)
								await buttons.show()
								buttons.interactable = true
							}
						},
						{
							text: "↑",
							onclick: () => {
								console.log("up")
							}
						},
						{
							text: "menu",
							onclick: () => {
								console.log("test3")
							}
						},
					]
				},
				{ //row 2
					buttons: [
						{
							text: "←",
							onclick: () => {
								console.log("left")
							}
						},
						{
							text: "↓",
							onclick: () => {
								console.log("down")
							}
						},
						{
							text: "→",
							onclick: () => {
								console.log("right")
							}
						},
					]
				},
			]
		}


		const commandMenu: ButtonClasses.IUpdateData = {
			rows: [
				{ //row 1
					buttons: [
						{
							text: "back",
							onclick: async () => {
								buttons.interactable = false
								await buttons.hide()
								buttons.update(mainMenu)
								await buttons.show()
								buttons.interactable = true
							}
						},
						{
							text: "1",
							onclick: () => {
								console.log("up")
							}
						},
						{
							text: "2",
							onclick: () => {
								console.log("test3")
							}
						},
					]
				},
				{ //row 2
					buttons: [
						{
							text: "3",
							onclick: () => {
								console.log("left")
							}
						},
						{
							text: "4",
							onclick: () => {
								console.log("down")
							}
						},
						{
							text: "5",
							onclick: () => {
								console.log("right")
							}
						},
					]
				},
			]
		}

		buttons.update(mainMenu);

		(async () => {
			// console.log("all show")
			await buttons.show()
		})()

		// 下部ボタンをflex layoutで。





		// =========================
		// animation test


		// とりあえずtweenを試す。

		// 0.0-1.0 tween
		// Tween.To({
		// 	shift: 0,
		// 	duration: 500,
		// 	onUpdate: (x) => {
		// 		console.log(`onUpdate1: ${x}`);
		// 	}
		// });

		// 20-40 tween
		// Tween.To({
		// 	value: {
		// 		start: 20,
		// 		end: 40
		// 	},
		// 	duration: 2000, //ms
		// 	onUpdate: (x) => { console.log(`onUpdate: ${x}`); },
		// 	onComplete: () => { console.log(`onComplete`); }
		// });





		// =========================
		// ダイアログ表現 - うまくいってない。flexbox入れ子にするしかない？

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

	renderCanvas2d(ctx: CanvasRenderingContext2D) {
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
// 「下部ボタン」UIの検討
// b-wizで重要になりそう。






/*

- シンプルなtweenクラス
	- メモ: tween関数はjquery.easingを参考。GSGDのBSD Licenseに準拠します。

	- Simple Tweenを参考に再実装中。
		- https://npm.runkit.com/simple-tween/tween.js?t=1522335794218


## 概要メモ

- Flash時代からよくみたeasing functionが揃ってた。
- 改造してよくわからなくなってきたので、使いそうなtween functionだけ残してあとは自前で設計し直す方向で。

*/

type tweenfunc = (t: number, b: number, c: number, d: number) => number

interface Properties {
	intervalRestDuration?: number
	value?: {
		start?: number
		end?: number
	}
	duration?: number
	tweeningFunction?: tweenfunc
}

export default class Tween {

	//メモ: tween関数はjquery.easingを参考。GSGDのBSD Licenseに準拠します。
	// > http://easings.net/ja
	// > http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
	// > Open source under the BSD License. 

	private static easeInQuad(t, b, c, d): number {
		return c * (t /= d) * t + b;
	}
	private static easeOutQuad(t, b, c, d): number {
		return -c * (t /= d) * (t - 2) + b;
	}
	private static easeInOutQuad(t, b, c, d): number {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	}
	private static easeInCubic(t, b, c, d): number {
		return c * (t /= d) * t * t + b;
	}
	private static easeOutCubic(t, b, c, d): number {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}
	private static easeInOutCubic(t, b, c, d): number {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}
	private static easeInQuart(t, b, c, d): number {
		return c * (t /= d) * t * t * t + b;
	}
	private static easeOutQuart(t, b, c, d): number {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}
	private static easeInOutQuart(t, b, c, d): number {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}
	private static easeInQuint(t, b, c, d): number {
		return c * (t /= d) * t * t * t * t + b;
	}
	private static easeOutQuint(t, b, c, d): number {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}
	// private static easeInOutQuint(t, b, c, d): number {
	// 	if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	// 	return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	// }
	// private static easeInSine(t, b, c, d): number {
	// 	return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	// }
	// private static easeOutSine(t, b, c, d): number {
	// 	return c * Math.sin(t / d * (Math.PI / 2)) + b;
	// }
	// private static easeInOutSine(t, b, c, d): number {
	// 	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	// }
	// private static easeInExpo(t, b, c, d): number {
	// 	return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	// }
	// private static easeOutExpo(t, b, c, d): number {
	// 	return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	// }
	// private static easeInOutExpo(t, b, c, d): number {
	// 	if (t == 0) return b;
	// 	if (t == d) return b + c;
	// 	if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	// 	return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	// }
	// private static easeInCirc(t, b, c, d): number {
	// 	return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	// }
	// private static easeOutCirc(t, b, c, d): number {
	// 	return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	// }
	// private static easeInOutCirc(t, b, c, d): number {
	// 	if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	// 	return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	// }
	// private static easeInElastic(t, b, c, d): number {
	// 	var s = 1.70158; var p = 0; var a = c;
	// 	if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
	// 	if (a < Math.abs(c)) { a = c; var s = p / 4; }
	// 	else var s = p / (2 * Math.PI) * Math.asin(c / a);
	// 	return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	// }
	// private static easeOutElastic(t, b, c, d): number {
	// 	var s = 1.70158; var p = 0; var a = c;
	// 	if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
	// 	if (a < Math.abs(c)) { a = c; var s = p / 4; }
	// 	else var s = p / (2 * Math.PI) * Math.asin(c / a);
	// 	return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	// }
	// private static easeInOutElastic(t, b, c, d): number {
	// 	var s = 1.70158; var p = 0; var a = c;
	// 	if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
	// 	if (a < Math.abs(c)) { a = c; var s = p / 4; }
	// 	else var s = p / (2 * Math.PI) * Math.asin(c / a);
	// 	if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	// 	return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	// }
	// private static easeInBack(t, b, c, d, s): number {
	// 	if (s == undefined) s = 1.70158;
	// 	return c * (t /= d) * t * ((s + 1) * t - s) + b;
	// }
	// private static easeOutBack(t, b, c, d, s): number {
	// 	if (s == undefined) s = 1.70158;
	// 	return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	// }
	// private static easeInOutBack(t, b, c, d, s): number {
	// 	if (s == undefined) s = 1.70158;
	// 	if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
	// 	return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	// }
	// private static easeInBounce(t, b, c, d): number {
	// 	return c - this.easeOutBounce(d - t, 0, c, d) + b;
	// }
	// private static easeOutBounce(t, b, c, d): number {
	// 	if ((t /= d) < (1 / 2.75)) {
	// 		return c * (7.5625 * t * t) + b;
	// 	} else if (t < (2 / 2.75)) {
	// 		return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
	// 	} else if (t < (2.5 / 2.75)) {
	// 		return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
	// 	} else {
	// 		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
	// 	}
	// }

	static readonly DefaultProperties: Properties = {
		intervalRestDuration: 20,
		value: {
			start: 0,
			end: 1.0
		},
		duration: 500,
		tweeningFunction: Tween.easeInQuad
	};

	constructor(propsPartial: Properties) {
		// this.exec = startTweeningFunction;

		const properties = Object.assign(Object.create(Tween.DefaultProperties), propsPartial);
		var currentTime = 0,
			currentValue = properties.value.start;

		var interval = setInterval(() => {
			currentTime += properties.intervalRestDuration;
			currentValue = (currentTime / properties.duration) * properties.value.end;
			const calculatedValue = properties.tweeningFunction(currentTime, properties.value.start, currentValue, properties.duration);

			// emit(calculatedValue);

			if (currentTime >= properties.duration)
				clearInterval(interval);

		}, properties.intervalRestDuration)
	}

	// startTweeningFunction(emit) {
	// 	const properties = Object.assign(Object.create(this.DefaultProperties), propsPartial);
	// 	var currentTime = 0,
	// 		currentValue = properties.value.start;
	// 	var interval = setInterval(function () {
	// 		currentTime += properties.intervalRestDuration;
	// 		currentValue = (currentTime / properties.duration) * properties.value.end;
	// 		const calculatedValue = properties.tweeningFunction(currentTime, properties.value.start, currentValue, properties.duration);
	// 		emit(calculatedValue);
	// 		if (currentTime >= properties.duration)
	// 			clearInterval(interval);
	// 	}, properties.intervalRestDuration);
	// }

	static To(propsPartial: Properties): Tween {
		const properties = Object.assign(Object.create(Tween.DefaultProperties), propsPartial);

		if (propsPartial.tweeningFunction !== undefined)
			properties.tweeningFunction = propsPartial.tweeningFunction;

		if (propsPartial.value !== undefined && propsPartial.value.end !== undefined)
			properties.value = { start: 0, end: propsPartial.value.end };

		if (propsPartial.duration !== undefined)
			properties.duration = propsPartial.duration;

		if (propsPartial.intervalRestDuration !== undefined)
			properties.intervalRestDuration = propsPartial.intervalRestDuration;

		return new Tween(properties);
	};


}



/**
* Export modules.
* @callback tweenTo
* @param {number?} duration
* @param {number?} endValue
* @param {number?} restIntervalDuration
* @returns {{exec: receiveValue}}
*
* @callback receiveValue
* @param {number} currentValue
*/
// (() => {
// 	var moduleExists = false;
// 	try {
// 		moduleExists = module.exports !== undefined;
// 	} catch (e) { }
// 	if (moduleExists === true)
// 		/** @type {TweeningFunctions} */
// 		module.exports = Object.keys(TweeningFunctions).
// 			reduce((state, key) => { state[key] = (function () { return Tween.to.apply(this, [TweeningFunctions[key], ...arguments]) }); return state }, {});
// })();
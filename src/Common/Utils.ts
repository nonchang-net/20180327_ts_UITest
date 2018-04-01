

export default class Utils {

	// wait until


	private static readonly DEFAULT_INTERVAL = 50;
	private static readonly DEFAULT_TIMEOUT = 5000;


	/**
	 * Waits for predicate to be truthy and resolves a Promise
	 *
	 * @param  predicate  Function  Predicate that checks the condition
	 * @param  timeout  Number  Maximum wait interval, 5000ms by default
	 * @param  interval  Number  Wait interval, 50ms by default
	 * @return  Promise  Promise to return a callback result
	 */
	static waitUntil(
		predicate,
		timeout?,
		interval?
	) {
		var timerInterval = interval || Utils.DEFAULT_INTERVAL;
		var timerTimeout = timeout || Utils.DEFAULT_TIMEOUT;

		return new Promise(function promiseCallback(resolve, reject) {
			var timer;
			var timeoutTimer;
			var clearTimers;
			var doStep;

			clearTimers = function clearWaitTimers() {
				clearTimeout(timeoutTimer);
				clearInterval(timer);
			};

			doStep = function doTimerStep() {
				var result;

				try {
					result = predicate();

					if (result) {
						clearTimers();
						resolve(result);
					} else {
						timer = setTimeout(doStep, timerInterval);
					}
				} catch (e) {
					clearTimers();
					reject(e);
				}
			};

			timer = setTimeout(doStep, timerInterval);
			timeoutTimer = setTimeout(function onTimeout() {
				clearTimers();
				reject(new Error('Timed out after waiting for ' + timerTimeout + 'ms'));
			}, timerTimeout);
		});
	};

	// async sleep
	// https://qiita.com/asa-taka/items/888bc5a1d7f30ee7eda2
	static sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

	// ディープクローン
	// https://kuroeveryday.blogspot.jp/2017/05/deep-clone-object-in-javascript.html
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
/**
 * Date: 2013-06-27
 */
/*console.log($.fn.jquery);*/


/**
 * 非同期関数を並列実行後、コールバックを実行するラッパークラス
 * @param configs {object}
 * @returns {object} Instance Return. self chain methods.
 * @constructor
 * @license The MIT License (MIT)
 */
var AsyncTasks = function (configs) {
  "use strict";
  /**
   * 非同期タスク実行後のステータスを格納する
   * @type {Array}
   */
  this.flags   = [];
  /**
   * Success コールバック
   * @type {Function}
   */
  this.success = configs && configs.success || function () {};
  /**
   * fail コールバック
   * @type {Function}
   */
  this.fail    = configs && configs.fail    || function () {};
  return this;
};


AsyncTasks.prototype = {
  /**
   * runs
   * 非同期実行する関数を複数渡す
   * @param {...Function}
   * @returns {object} Instance Return. self chain methods.
   */
  runs: function () {
    "use strict";
    this.funcs = Array.prototype.slice.call(arguments);
    return this;
  },
  /**
   * runs にセットされた非同期処理を全て実行する
   */
  start: function () {
    "use strict";
    var i, iz;
    for (i = 0, iz = this.funcs.length; i < iz; i++) this.funcs[i]();
  },
  /**
   * async で実行されたコールバック毎に呼ばれる<br>
   * 引数 status を渡すことで success と fail を最終的に振り分ける
   * @param status {Boolean} 非同期処理を実行後のステータスをセット Default: true
   * @returns {object} Instance Return. self chain methods.
   */
  next: function (status) {
    "use strict";
    // status が渡ってこない場合は true をセットする
    this.flags[this.flags.length] = !!(status);

    // runs に渡った関数の数と flags の数が一致したら complete() を実行する
    if (this.funcs.length === this.flags.length) this.complete();
    return this;
  },
  /**
   * complete
   * 非同期タスク全て完了時に呼ばれ
   * success もしくは fail コールバック関数を呼び出す
   * @returns {boolean} Success to true or Fail to false
   */
  complete: function () {
    "use strict";
    var i, iz;

    for (i = 0, iz = this.flags.length; i < iz; i++) {
      // Status is fail.
      if (!this.flags[i]) {
        this.fail();
        return false;
      }
    }

    this.success();
    return true;
  }
};


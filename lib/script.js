"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var player1Name, player2Name, currentPlayer, board, ROWS, COLS;
var gameOver = false;
function startGame() {
  player1Name = document.getElementById('player1').value || "Joueur Orange";
  player2Name = document.getElementById('player2').value || "Joueur Mauve";
  currentPlayer = 'orange';
  ROWS = parseInt(document.getElementById('grid-rows').value) || 6;
  COLS = parseInt(document.getElementById('grid-cols').value) || 6;
  board = Array.from({
    length: ROWS
  }, function () {
    return Array(COLS).fill(null);
  });
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  document.getElementById('player-turn').textContent = "Tour de ".concat(player1Name);
  document.getElementById('player-info').textContent = "".concat(player1Name, " = Orange / ").concat(player2Name, " = Mauve");
  createBoard();
}
function createBoard() {
  var boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  boardElement.style.gridTemplateColumns = "repeat(".concat(COLS, ", min(50px, 6vw))");
  for (var row = 0; row < ROWS; row++) {
    var _loop = function _loop(col) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', function () {
        return placeDisc(col);
      });
      boardElement.appendChild(cell);
    };
    for (var col = 0; col < COLS; col++) {
      _loop(col);
    }
  }
}
function resetGame() {
  document.getElementById('setup').classList.remove('hidden');
  document.getElementById('game').classList.add('hidden');
}
function restartGame() {
  board = Array.from({
    length: ROWS
  }, function () {
    return Array(COLS).fill(null);
  });
  gameOver = false;
  document.getElementById('player-turn').textContent = "Tour de ".concat(currentPlayer === 'orange' ? player1Name : player2Name);
  document.querySelectorAll('.cell').forEach(function (cell) {
    cell.classList.remove('orange', 'mauve');
  });
}
function isBoardFull() {
  return board.every(function (row) {
    return row.every(function (cell) {
      return cell !== null;
    });
  });
}
function checkWin(row, col) {
  var directions = [[[-1, 0], [1, 0]],
  // Vertical
  [[0, -1], [0, 1]],
  // Horizontal
  [[-1, -1], [1, 1]],
  // Diagonale /
  [[-1, 1], [1, -1]] // Diagonale \
  ];
  for (var _i = 0, _directions = directions; _i < _directions.length; _i++) {
    var direction = _directions[_i];
    var count = 1;
    var _iterator = _createForOfIteratorHelper(direction),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          dr = _step$value[0],
          dc = _step$value[1];
        var r = row + dr,
          c = col + dc;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
          count++;
          if (count >= 4) return true;
          r += dr;
          c += dc;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return false;
}
function placeDisc(col) {
  if (gameOver) return;
  var _loop2 = function _loop2(row) {
      if (!board[row][col]) {
        board[row][col] = currentPlayer;
        var cell = document.querySelector("[data-row='".concat(row, "'][data-col='").concat(col, "']"));
        cell.classList.add(currentPlayer);
        setTimeout(function () {
          if (checkWin(row, col)) {
            alert("Le joueur ".concat(currentPlayer === 'orange' ? player1Name : player2Name, " a gagn\xE9 !"));
            gameOver = true;
            return;
          }
          if (isBoardFull()) {
            alert("Match nul !");
            gameOver = true;
            return;
          }
          currentPlayer = currentPlayer === 'orange' ? 'mauve' : 'orange';
          document.getElementById('player-turn').textContent = "Tour du joueur ".concat(currentPlayer === 'orange' ? player1Name : player2Name);
        }, 50);
        return {
          v: void 0
        };
      }
    },
    _ret;
  for (var row = ROWS - 1; row >= 0; row--) {
    _ret = _loop2(row);
    if (_ret) return _ret.v;
  }
}
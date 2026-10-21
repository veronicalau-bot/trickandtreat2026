(function () {
  'use strict';

  const C = window.CONTENT;
  const S = C.settings;
  const $app = document.getElementById('app');

  let lang = 'zh';
  let sound = true;
  try { lang = localStorage.getItem('ttl-lang') || 'zh'; } catch (e) { /* storage unavailable */ }

  let state = newState();
  let lastActive = Date.now();

  // ---------- helpers ----------
  const t = (o) => (o && typeof o === 'object') ? (o[lang] !== undefined ? o[lang] : o.en) : o;
  const ui = (k) => t(C.ui[k]);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const pick = (arr, n) => shuffle(arr).slice(0, n);

  // ddhhmmss, no punctuation
  function makeTimestamp(d) {
    d = d || new Date();
    const p = (n) => String(n).padStart(2, '0');
    return p(d.getDate()) + p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds());
  }

  function newState() {
    return { screen: 'home', name: '', introStep: 0, lvl: 0, qi: 0, score: 0, candies: 0, plan: null, ts: null, warn: null };
  }

  // ---------- sound ----------
  const music = new Audio(S.musicFile);
  music.loop = true;
  music.volume = 0.3;

  // Browsers only allow playback after a user gesture, so this is also called on every tap
  function syncMusic() {
    if (sound) {
      if (music.paused) music.play().catch(() => { /* blocked until next tap */ });
    } else {
      music.pause();
    }
  }

  let audio;
  function beep(notes) {
    if (!sound) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      let at = audio.currentTime;
      notes.forEach((f) => {
        const o = audio.createOscillator();
        const g = audio.createGain();
        o.frequency.value = f;
        o.type = 'triangle';
        g.gain.setValueAtTime(0.15, at);
        g.gain.exponentialRampToValueAtTime(0.001, at + 0.18);
        o.connect(g); g.connect(audio.destination);
        o.start(at); o.stop(at + 0.18);
        at += 0.12;
      });
    } catch (e) { /* audio not available */ }
  }

  // ---------- plan (random questions per game) ----------
  function buildPlan() {
    const l1 = pick(C.l1, 3).map((q) => ({
      type: 'choice',
      prompt: q.prompt,
      opts: shuffle([q.answer].concat(pick(q.distractors, 2))).map((k) => ({
        icon: C.platforms[k].icon, label: C.platforms[k].name, ok: k === q.answer
      })),
      why: q.why,
      answered: false, ok: false, picked: null
    }));

    const l2 = pick(C.l2fill, 2).map((q) => ({
      type: 'fill',
      prompt: q.prompt,
      opts: shuffle(q.options.map((o, i) => ({ label: o, ok: i === 0 }))),
      from: q.from, to: q.to, why: q.why,
      answered: false, ok: false, picked: null
    }));
    l2.push({
      type: 'build',
      tiles: shuffle(C.l2build.tiles.map((text, id) => ({ id, text }))),
      line: [],
      answered: false, ok: false
    });

    const f = rand(C.l3filter);
    const l3 = [
      { type: 'filter', q: f, on: [], prev: C.l3base, answered: false, ok: false },
      Object.assign({ type: 'choice' }, (function () {
        const q = rand(C.l3choice);
        return {
          prompt: q.prompt, why: q.why,
          opts: shuffle(q.options.map((o, i) => ({ label: o, ok: i === 0 })))
        };
      })(), { answered: false, ok: false, picked: null })
    ];

    const rel = C.l4.filter((c) => c.reliable);
    const unrel = C.l4.filter((c) => !c.reliable);
    const nRel = 1 + Math.floor(Math.random() * 3);
    const l4 = shuffle(pick(rel, nRel).concat(pick(unrel, 4 - nRel))).map((c) => ({
      type: 'card', card: c, answered: false, ok: false, picked: null
    }));

    return [l1, l2, l3, l4];
  }

  // ---------- render pieces ----------
  function header(showName) {
    return '<div class="topbar">' +
      '<div class="who">' + (showName && state.name ? '👻 ' + esc(state.name) : '') + '</div>' +
      '<div class="ctl">' +
      '<button class="chip" data-act="sound" aria-label="sound">' + (sound ? '🔊' : '🔇') + '</button>' +
      '<button class="chip" data-act="lang" aria-label="language">' + (lang === 'zh' ? 'EN' : '中') + '</button>' +
      '</div></div>';
  }

  function hud() {
    let steps = '';
    for (let i = 0; i < 4; i++) steps += '<i class="' + (i <= state.lvl ? 'on' : '') + '"></i>';
    let bag = '';
    for (let i = 0; i < 4; i++) bag += i < state.candies ? '🍬' : '⬜';
    return '<div class="hud"><div class="steps">' + steps + '</div>' +
      '<div class="bag"><small>' + esc(ui('bag')) + '</small>' + bag + '</div></div>';
  }

  const barPct = (n, max) => Math.max(2, Math.min(100, Math.log10(n + 1) / Math.log10(max + 1) * 100));

  function meter(from, to, max) {
    return '<div class="meter"><div class="row"><span>' + esc(ui('results')) + '</span>' +
      '<b data-from="' + from + '" data-to="' + to + '">' + fmt(from) + '</b></div>' +
      '<div class="bar"><i data-w="' + barPct(to, max).toFixed(1) + '" style="width:' + barPct(from, max).toFixed(1) + '%"></i></div></div>';
  }

  function isLast() {
    return state.qi >= state.plan[state.lvl].length - 1;
  }

  function feedback(item, text, extra) {
    return '<div class="fb ' + (item.ok ? 'good' : 'bad') + '">' +
      '<div class="fb-h">' + (item.ok ? '✅ ' + esc(ui('correct')) : '❌ ' + esc(ui('wrong'))) + '</div>' +
      (extra || '') + '<p>' + text + '</p>' +
      '<button class="btn primary" data-act="next">' + esc(isLast() ? ui('getTrick') : ui('next')) + '</button></div>';
  }

  function optionsHtml(item) {
    return '<div class="opts">' + item.opts.map((o, i) => {
      let cls = 'opt';
      if (item.answered) {
        if (o.ok) cls += ' right';
        else if (item.picked === i) cls += ' pickbad';
      }
      return '<button class="' + cls + '" data-act="pick" data-i="' + i + '"' + (item.answered ? ' disabled' : '') + '>' +
        (o.icon ? '<span class="ic">' + o.icon + '</span>' : '') + '<span>' + esc(t(o.label)) + '</span></button>';
    }).join('') + '</div>';
  }

  function rightLabel(item) {
    const r = item.opts.find((o) => o.ok);
    return '<p><b>' + esc(ui('rightAnswer')) + '</b>' + esc(t(r.label)) + '</p>';
  }

  function renderChoice(item) {
    let h = '<div class="prompt">' + esc(t(item.prompt)) + '</div>' + optionsHtml(item);
    if (item.answered) h += feedback(item, esc(t(item.why)), item.ok ? '' : rightLabel(item));
    return h;
  }

  function renderFill(item) {
    const picked = item.picked !== null ? t(item.opts[item.picked].label) : null;
    const text = t(item.prompt);
    let prompt;
    if (text.indexOf('___') >= 0) {
      const [a, b] = text.split('___');
      prompt = esc(a) + '<span class="blank">' + (picked ? esc(picked) : '?') + '</span>' + esc(b);
    } else {
      prompt = esc(text);
    }
    let h = '<div class="prompt">' + prompt + '</div>' +
      meter(item.from, item.answered ? item.to : item.from, 2000000) + optionsHtml(item);
    if (item.answered) h += feedback(item, esc(t(item.why)), item.ok ? '' : rightLabel(item));
    return h;
  }

  function buildLine(item) {
    return item.line.map((id) => item.tiles.find((x) => x.id === id).text).join(' ');
  }

  function renderBuild(item) {
    const B = C.l2build;
    const line = item.line.map((id) => {
      const tl = item.tiles.find((x) => x.id === id);
      return '<button class="tile placed" data-act="remove" data-id="' + id + '"' + (item.answered ? ' disabled' : '') + '>' + esc(tl.text) + '</button>';
    }).join('') || '<span class="empty">' + esc(ui('tapBlocks')) + '</span>';
    const bank = item.tiles.filter((x) => item.line.indexOf(x.id) < 0).map((x) =>
      '<button class="tile" data-act="add" data-id="' + x.id + '"' + (item.answered ? ' disabled' : '') + '>' + esc(x.text) + '</button>').join('');
    let h = '<div class="prompt">' + esc(ui('buildTask')) + '</div>' +
      meter(B.from, item.answered ? B.to : B.from, 2000000) +
      '<div><div class="small">' + esc(ui('yourSearch')) + ' ' + esc(ui('tapToRemove')) + '</div><div class="line">' + line + '</div></div>' +
      '<div class="tiles">' + bank + '</div>';
    if (!item.answered) {
      h += '<button class="btn primary" data-act="buildDone"' + (item.line.length ? '' : ' disabled') + '>' + esc(ui('done')) + '</button>';
    } else {
      h += feedback(item, esc(t(item.ok ? B.whyOk : B.whyBad)),
        item.ok ? '' : '<p><b>' + esc(ui('rightAnswer')) + '</b><br><code>' + esc(B.correct) + '</code></p>');
    }
    return h;
  }

  function filterCount(on) {
    let n = C.l3base;
    on.forEach((k) => { n *= C.l3filters[k].f; });
    return Math.max(1, Math.round(n));
  }

  function renderFilter(item) {
    const need = item.q.need;
    const count = filterCount(item.on);
    const chips = C.l3filterOrder.map((k) => {
      const on = item.on.indexOf(k) >= 0;
      let cls = 'flt' + (on ? ' on' : '');
      if (item.answered) {
        const needed = need.indexOf(k) >= 0;
        if (on && needed) cls += ' right';
        else if (on && !needed) cls += ' bad';
        else if (!on && needed) cls += ' miss';
      }
      return '<button class="' + cls + '" data-act="flt" data-k="' + k + '"' + (item.answered ? ' disabled' : '') + '>' +
        (on ? '✔ ' : '') + esc(t(C.l3filters[k].label)) + '</button>';
    }).join('');
    let h = '<div class="prompt">' + esc(t(item.q.task)) + '</div>' +
      meter(item.prev, count, C.l3base) +
      '<div class="small">' + esc(ui('filterHint')) + '</div><div class="filters">' + chips + '</div>';
    item.prev = count;
    if (!item.answered) {
      h += '<button class="btn primary" data-act="fltDone">' + esc(ui('done')) + '</button>';
    } else {
      const names = (keys) => keys.map((k) => t(C.l3filters[k].label)).join(', ');
      const miss = need.filter((k) => item.on.indexOf(k) < 0);
      const extra = item.on.filter((k) => need.indexOf(k) < 0);
      let ex = '';
      if (miss.length) ex += '<p><b>' + esc(ui('missing')) + '</b>' + esc(names(miss)) + '</p>';
      if (extra.length) ex += '<p><b>' + esc(ui('extra')) + '</b>' + esc(names(extra)) + '</p>';
      h += feedback(item, esc(item.ok ? t(item.q.why) : ''), item.ok ? '' : ex);
    }
    return h;
  }

  function renderCard(item) {
    const c = item.card;
    const clue = (k) => (item.answered && c.clues.indexOf(k) >= 0) ? ' clue' : '';
    const row = (k, lbl, val) => '<div class="f' + clue(k) + '"><span>' + esc(ui(lbl)) + '</span><span>' + esc(t(val)) + '</span></div>';
    let h = '<div class="prompt">' + esc(ui('cardPrompt')) + '</div>' +
      '<div class="src" id="srcCard"><h2>' + esc(t(c.title)) + '</h2>' +
      row('author', 'fAuthor', c.author) + row('source', 'fSource', c.source) +
      row('date', 'fDate', c.date) + row('type', 'fType', c.type) +
      '<div class="ex' + clue('excerpt') + '">' + esc(t(c.excerpt)) + '</div>' +
      '<div class="note">' + esc(ui('fictional')) + '</div></div>';
    if (!item.answered) {
      h += '<div class="duo"><button class="btn trickb" data-act="card" data-v="0">' + esc(ui('trickBtn')) + '</button>' +
        '<button class="btn treat" data-act="card" data-v="1">' + esc(ui('treatBtn')) + '</button></div>' +
        '<div class="small" style="text-align:center">' + esc(ui('swipeHint')) + '</div>';
    } else {
      const tags = '<div class="tags">' + c.tags.map((k) => '<span>' + esc(t(C.craap[k])) + '</span>').join('') + '</div>';
      const verdict = c.reliable ? '🍬 Treat — ' + (lang === 'zh' ? '可靠' : 'reliable') : '👻 Trick — ' + (lang === 'zh' ? '不可靠' : 'unreliable');
      h += feedback(item, esc(t(c.why)), '<p><b>' + esc(verdict) + '</b></p>' + tags);
    }
    return h;
  }

  function renderQuestion() {
    const items = state.plan[state.lvl];
    const item = items[state.qi];
    const fn = { choice: renderChoice, fill: renderFill, build: renderBuild, filter: renderFilter, card: renderCard }[item.type];
    return header(true) + hud() +
      '<main class="card-area"><div class="qhead"><span>' + esc(ui('level')) + ' ' + (state.lvl + 1) + ' · ' + esc(t(C.levels[state.lvl].topic)) +
      '</span><span>' + (state.qi + 1) + '/' + items.length + '</span></div>' + fn(item) + '</main>';
  }

  function credits() {
    return '<div class="credits">' + S.credits.map((l) => '<div>' + esc(l) + '</div>').join('') + '</div>';
  }

  function renderHome() {
    const valid = state.name.trim().length > 0;
    return header(false) +
      '<div class="home"><div class="logo">🎃</div><h1>Trick and Treat@Lib</h1>' +
      '<p class="sub">' + esc(ui('subtitle')) + '</p>' +
      '<div class="field"><label for="name">' + esc(ui('nameLabel')) + '</label>' +
      '<input id="name" type="text" maxlength="' + S.maxNameLength + '" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
      'placeholder="' + esc(ui('namePlaceholder')) + '" value="' + esc(state.name) + '">' +
      '<p class="hint">' + esc(ui('nameHint')) + '</p></div>' +
      '<button class="btn primary" id="startBtn" data-act="start"' + (valid ? '' : ' disabled') + '>' + esc(ui('start')) + '</button></div>' + credits();
  }

  function introLines() {
    return state.screen === 'interlude' ? C.interludes[state.lvl] : [C.ui.intro1, C.ui.intro2, C.ui.intro3];
  }

  function renderIntro() {
    const lines = introLines();
    const inter = state.screen === 'interlude';
    const text = t(lines[state.introStep]).replace('{name}', state.name.trim());
    const last = state.introStep === lines.length - 1;
    const label = last ? (inter ? ui('goLevel').replace('{n}', state.lvl + 1) : ui('go')) : ui('tapContinue');
    return header(true) +
      '<div class="intro"><div class="boo">👻</div>' +
      '<div class="bubble fresh" data-act="introNext">' + esc(text) + '</div>' +
      '<div class="dots">' + lines.map((_, i) => '<i class="' + (i === state.introStep ? 'on' : '') + '"></i>').join('') + '</div>' +
      '<button class="btn primary" data-act="' + (last ? 'go' : 'introNext') + '">' + esc(label) + '</button></div>';
  }

  function renderTrick() {
    const lastLevel = state.lvl >= 3;
    return header(true) + hud() +
      '<div class="trick"><div class="candy-fly">🍬</div><h2 style="margin:0">' + esc(ui('candyWon')) + '</h2>' +
      '<div class="tcard"><h2>💡 ' + esc(ui('trickCard')) + ' ' + (state.lvl + 1) + '</h2>' +
      C.tricks[state.lvl].map((l) => '<p>' + esc(t(l)) + '</p>').join('') + '</div>' +
      '<button class="btn primary" data-act="trickNext">' + esc(lastLevel ? ui('seeResult') : ui('nextLevel')) + '</button></div>';
  }

  function tierFor(score) {
    return C.tiers.find((x) => score >= x.min);
  }

  function renderEnd() {
    const tier = tierFor(state.score);
    return header(false) +
      '<div class="end"><aside class="notice" role="note"><strong>' + esc(ui('claimTitle')) + '</strong><p>' + esc(ui('showStaff')) + '</p></aside>' +
      '<div class="badge"><h2>' + esc(ui('endTitle').replace('{name}', state.name.trim())) + '</h2>' +
      '<div class="stats"><span>' + esc(ui('score')) + ' ' + state.score + ' / 12</span><span>🍬 ' + state.candies + '</span></div>' +
      '<div class="big-tier">' + tier.icon + ' ' + esc(t(tier.name)) + '</div>' +
      '<div class="prize">' + esc(t(tier.prize)) + '</div>' +
      '<div class="code"><div class="lbl">' + esc(ui('code')) + '</div><div class="num">' + state.ts + '</div></div></div>' +
      '<div class="recap"><h3>💡 ' + esc(ui('tricksLearned')) + '</h3><ul>' +
      C.tricks.map((g) => g.map((l) => '<li>' + esc(t(l)) + '</li>').join('')).join('') + '</ul></div>' +
      '<div class="qr"><img src="' + S.qrImage + '" alt="QR code"><div><div>' + esc(ui('learnMore')) + '</div>' +
      '<b>' + esc(t(S.guideLabel)) + '</b><div class="u">' + esc(S.guideUrl) + '</div></div></div>' +
      '<button class="btn primary" data-act="restart">' + esc(ui('nextPlayer')) + '</button>' + credits() + '</div>';
  }

  function renderWarn() {
    if (state.warn === null) return '';
    return '<div class="modal"><div class="box"><h2>' + esc(ui('idleTitle')) + '</h2>' +
      '<p>' + esc(ui('idleBody').replace('{s}', state.warn)) + '</p>' +
      '<button class="btn primary" data-act="stay">' + esc(ui('idleStay')) + '</button></div></div>';
  }

  // ---------- render ----------
  function render() {
    let h;
    switch (state.screen) {
      case 'home': h = renderHome(); break;
      case 'intro':
      case 'interlude': h = renderIntro(); break;
      case 'q': h = renderQuestion(); break;
      case 'trick': h = renderTrick(); break;
      default: h = renderEnd();
    }
    $app.innerHTML = h + renderWarn();
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    animateMeters();
    if (state.screen !== 'q' && state.screen !== 'home') window.scrollTo(0, 0);
  }

  function animateMeters() {
    document.querySelectorAll('.meter').forEach((m) => {
      const b = m.querySelector('b');
      const bar = m.querySelector('.bar i');
      const from = Number(b.dataset.from);
      const to = Number(b.dataset.to);
      requestAnimationFrame(() => { bar.style.width = bar.dataset.w + '%'; });
      if (from === to) return;
      const start = performance.now();
      const dur = 700;
      (function step(now) {
        if (!b.isConnected) return;
        const p = Math.min(1, (now - start) / dur);
        b.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(start);
    });
  }

  // ---------- game flow ----------
  function curItem() { return state.plan[state.lvl][state.qi]; }

  function finishAnswer(item, ok) {
    item.answered = true;
    item.ok = ok;
    if (ok) state.score++;
    beep(ok ? [660, 880] : [220, 160]);
    render();
  }

  function startGame() {
    state.name = state.name.trim();
    if (!state.name) return;
    state.plan = buildPlan();
    state.screen = 'intro';
    state.introStep = 0;
    render();
  }

  function goPlay() {
    state.screen = 'q'; state.lvl = 0; state.qi = 0;
    render();
  }

  function next() {
    if (isLast()) {
      state.candies = state.lvl + 1;
      state.screen = 'trick';
      beep([523, 659, 784]);
    } else {
      state.qi++;
    }
    render();
  }

  function trickNext() {
    if (state.lvl >= 3) {
      state.ts = makeTimestamp();
      state.screen = 'end';
    } else {
      state.lvl++; state.qi = 0; state.introStep = 0;
      state.screen = C.interludes[state.lvl] ? 'interlude' : 'q';
    }
    render();
  }

  function reset() {
    state = newState();
    render();
  }

  const actions = {
    start: startGame,
    introNext() { if (state.introStep < introLines().length - 1) { state.introStep++; render(); } },
    go() {
      if (state.screen === 'interlude') { state.screen = 'q'; state.qi = 0; render(); } else goPlay();
    },
    next: next,
    trickNext: trickNext,
    restart: reset,
    stay() { state.warn = null; lastActive = Date.now(); render(); },
    lang() {
      lang = lang === 'zh' ? 'en' : 'zh';
      try { localStorage.setItem('ttl-lang', lang); } catch (e) { /* ignore */ }
      render();
    },
    sound() { sound = !sound; syncMusic(); beep([660]); render(); },
    pick(el) {
      const item = curItem();
      if (item.answered) return;
      item.picked = Number(el.dataset.i);
      finishAnswer(item, item.opts[item.picked].ok);
    },
    add(el) {
      const item = curItem();
      if (item.answered) return;
      item.line.push(Number(el.dataset.id));
      render();
    },
    remove(el) {
      const item = curItem();
      if (item.answered) return;
      item.line = item.line.filter((id) => id !== Number(el.dataset.id));
      render();
    },
    buildDone() {
      const item = curItem();
      const B = C.l2build;
      const texts = item.line.map((id) => item.tiles.find((x) => x.id === id).text);
      const termsOk = [0, 2, 4].every((i) => B.terms.indexOf(texts[i]) >= 0) &&
        new Set([texts[0], texts[2], texts[4]]).size === 3;
      const ok = texts.length === 5 && termsOk && texts[1] === 'AND' && texts[3] === 'AND';
      finishAnswer(item, ok);
    },
    flt(el) {
      const item = curItem();
      if (item.answered) return;
      const k = el.dataset.k;
      const i = item.on.indexOf(k);
      if (i >= 0) item.on.splice(i, 1); else item.on.push(k);
      render();
    },
    fltDone() {
      const item = curItem();
      const need = item.q.need;
      const ok = item.on.length === need.length && need.every((k) => item.on.indexOf(k) >= 0);
      finishAnswer(item, ok);
    },
    card(el) { answerCard(Number(el.dataset.v) === 1); }
  };

  function answerCard(says) {
    const item = curItem();
    if (!item || item.type !== 'card' || item.answered) return;
    item.picked = says;
    finishAnswer(item, says === item.card.reliable);
  }

  // ---------- events ----------
  $app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    if (state.warn !== null && el.dataset.act !== 'stay') return;
    const fn = actions[el.dataset.act];
    if (fn) fn(el);
  });

  $app.addEventListener('input', (e) => {
    if (e.target.id !== 'name') return;
    state.name = e.target.value;
    const btn = document.getElementById('startBtn');
    if (btn) btn.disabled = state.name.trim().length === 0;
  });

  $app.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.id === 'name' && state.name.trim()) {
      e.target.blur();
      startGame();
    }
  });

  // swipe right = Treat, left = Trick on source cards
  let touchX = null;
  $app.addEventListener('touchstart', (e) => {
    touchX = e.target.closest('#srcCard') ? e.touches[0].clientX : null;
  }, { passive: true });
  $app.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 90 && state.screen === 'q') answerCard(dx > 0);
  }, { passive: true });

  // kiosk hardening
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('dblclick', (e) => { if (!e.target.closest('input')) e.preventDefault(); });

  // ---------- idle auto reset ----------
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => {
    document.addEventListener(ev, () => {
      if (state.warn === null) lastActive = Date.now();
      syncMusic();
    }, true);
  });

  setInterval(() => {
    const idle = (Date.now() - lastActive) / 1000;
    if (state.warn !== null) {
      state.warn--;
      if (state.warn < 0) {
        reset(); lastActive = Date.now();
      } else {
        const p = document.querySelector('.modal p');
        if (p) p.textContent = ui('idleBody').replace('{s}', state.warn);
      }
      return;
    }
    if (state.screen === 'end') {
      if (idle > S.endIdleSeconds) { reset(); lastActive = Date.now(); }
    } else if (state.screen === 'home') {
      if (state.name && idle > S.idleWarnSeconds) { reset(); lastActive = Date.now(); }
    } else if (idle > S.idleWarnSeconds) {
      state.warn = S.idleConfirmSeconds;
      render();
    }
  }, 1000);

  render();
})();

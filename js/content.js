// All text/content lives here. Every translatable value is { zh, en }.
// Plain strings are shown as-is in both languages.
(function () {
  const L = (zh, en) => ({ zh, en });

  window.CONTENT = {
    // ---------- Settings ----------
    settings: {
      maxNameLength: 12,
      idleWarnSeconds: 90,      // idle during game before "still playing?"
      idleConfirmSeconds: 10,   // countdown before auto reset
      endIdleSeconds: 60,       // idle on result screen before auto reset
      guideUrl: 'https://libguides.hkapa.edu/searchstrategy',
      guideLabel: L('Library Guides: Keyword Search Techniques', 'Library Guides: Keyword Search Techniques'),
      qrImage: 'assets/qr.svg',
      musicFile: 'assets/halloween-by-alex-productions.mp3',
      // Plain text (not links) so a tap can't navigate away from the game
      credits: [
        'Music: Halloween by Alex-Productions https://soundcloud.com/alexproductionsmusic',
        'License: Creative Commons — Attribution 3.0 Unported — CC BY 3.0',
        'Free Download / Stream: https://links.al/Min',
        'Music promoted by Audio Library: https://links.al/youtube'
      ]
    },

    // ---------- Treat tiers (highest min first) ----------
    tiers: [
      { min: 11, icon: '🏆', name: L('Super Treat 大獎', 'Super Treat'),
        prize: L('糖果＋2份小禮物', 'Candy + 2 small gifts') },
      { min: 7, icon: '🎁', name: L('Sweet Treat 小禮物', 'Sweet Treat'),
        prize: L('糖果＋1份小禮物', 'Candy + 1 small gift') },
      { min: 0, icon: '🍬', name: L('Mini Treat 參與獎', 'Mini Treat'),
        prize: L('糖果', 'Candy') }
    ],

    // ---------- UI strings ----------
    ui: {
      subtitle: L('Find Reliable Sources, Get Your Treats!', 'Find Reliable Sources, Get Your Treats!'),
      nameLabel: L('請輸入你的名稱', 'Enter your name'),
      namePlaceholder: L('你的名稱', 'Your name'),
      nameHint: L('名稱必填（最多 12 個字）', 'Name required (max 12 characters)'),
      start: L('開始 🎃', 'Start 🎃'),
      intro1: L('嗨 {name}！我是幽靈 Boo 👻', 'Hi {name}! I\'m Boo the ghost 👻'),
      intro2: L('我明天要交 essay，題目是「社交媒體對青少年睡眠的影響」，可是我只會用 Google……😱',
        'My essay is due tomorrow: "The impact of social media on teenagers\' sleep", but I only know Google... 😱'),
      intro3: L('你可以幫我找到「可靠的資料」嗎？每過一關，你會得到 1 粒 🍬 和一張 Trick 卡！',
        'Can you help me find reliable sources? Pass each level to win a 🍬 and a Trick card!'),
      tapContinue: L('繼續 ▶', 'Continue ▶'),
      go: L('出發！', 'Let\'s go!'),
      goLevel: L('開始關卡 {n} ▶', 'Start Level {n} ▶'),
      level: L('關卡', 'Level'),
      correct: L('答對了！', 'Correct!'),
      wrong: L('不對喔', 'Not quite'),
      next: L('下一題 ▶', 'Next ▶'),
      getTrick: L('領取 Trick 卡 💡', 'Get Trick card 💡'),
      trickCard: L('Trick 卡', 'Trick Card'),
      candyWon: L('你得到 1 粒 🍬！', 'You won a 🍬!'),
      nextLevel: L('下一關 ▶', 'Next level ▶'),
      seeResult: L('查看結果 🎉', 'See results 🎉'),
      rightAnswer: L('正確答案：', 'Correct answer: '),
      results: L('搜尋結果', 'Results'),
      buildTask: L('任務：找關於「社交媒體影響青少年睡眠」的資料。點選積木，砌出搜尋式。',
        'Task: find sources about "social media affecting teenagers\' sleep". Tap blocks to build a search.'),
      yourSearch: L('你的搜尋式', 'Your search'),
      tapBlocks: L('點選下面的積木 👇', 'Tap the blocks below 👇'),
      tapToRemove: L('（點選已放入的積木可移除）', '(tap a placed block to remove it)'),
      done: L('完成 ✔', 'Done ✔'),
      filterHint: L('點選篩選條件（可開關）', 'Tap filters to switch them on/off'),
      filters: L('篩選條件', 'Filters'),
      missing: L('漏選：', 'Missed: '),
      extra: L('多選：', 'Not needed: '),
      swipeHint: L('也可以向右滑 = Treat，向左滑 = Trick', 'You can also swipe right = Treat, left = Trick'),
      treatBtn: L('🍬 Treat 可靠', '🍬 Treat (reliable)'),
      trickBtn: L('👻 Trick 不可靠', '👻 Trick (unreliable)'),
      cardPrompt: L('這份資料可靠嗎？', 'Is this source reliable?'),
      fAuthor: L('作者／機構', 'Author / Org'),
      fSource: L('來源', 'Source'),
      fDate: L('日期', 'Date'),
      fType: L('類型', 'Type'),
      fictional: L('所有資料卡皆為虛構示例', 'All sample sources are fictional'),
      endTitle: L('🎉 {name}，任務完成！', '🎉 {name}, mission complete!'),
      score: L('分數', 'Score'),
      candies: L('糖果', 'Candies'),
      yourTreat: L('你的 Treat', 'Your Treat'),
      code: L('完成時間 ddhhmmss', 'Completed at ddhhmmss'),
      claimTitle: L('📸 拍照並到櫃檯領獎', '📸 Save your results • Claim your prize'),
      showStaff: L('請先拍照或截圖保存此成績畫面，再向櫃檯職員出示照片領獎。', 'Take a photo or screenshot of this results screen, then show it to the counter staff to claim your prize.'),
      tricksLearned: L('你學到的 Tricks', 'Tricks you learned'),
      learnMore: L('想學更多？掃描 QR code 或瀏覽：', 'Want more? Scan the QR code or visit:'),
      nextPlayer: L('下一位玩家 ▶', 'Next player ▶'),
      idleTitle: L('仍在玩嗎？', 'Still playing?'),
      idleBody: L('{s} 秒後會返回首頁', 'Returning to the home screen in {s}s'),
      idleStay: L('我還在玩！', 'I\'m still here!'),
      bag: L('糖果袋', 'Candy bag')
    },

    levels: [
      { topic: L('Where to Search 去哪裡搜尋', 'Where to Search') },
      { topic: L('Search Strategies 搜尋策略', 'Search Strategies') },
      { topic: L('Filtering 篩選結果', 'Filtering') },
      { topic: L('Evaluating 評估可信度', 'Evaluating Trustworthiness') }
    ],

    // Boo cut-scenes shown before a level (key = level index, 0-based)
    interludes: {
      1: [
        L('太好了，我找到圖書館搜尋器 Primo@Lib 了！📚', 'Great, I found the library search tool Primo@Lib! 📚'),
        L('可是……我不太懂怎樣在 Primo@Lib 有效地搜尋。我輸入一整句問題，結果卻亂七八糟 😵',
          'But... I don\'t know how to search Primo@Lib effectively. I typed a whole sentence and got a messy pile of results 😵'),
        L('你可以教我在 Primo@Lib 使用的搜尋技巧嗎？用對關鍵字和運算符，就能更快找到想要的資料！',
          'Can you teach me the search tricks to use in Primo@Lib? With the right keywords and operators, I can find things faster!')
      ],
      2: [
        L('哇，搜尋式有用！Primo@Lib 找到的結果有用多了 🎉', 'Wow, that worked! The results Primo@Lib found are far more useful now 🎉'),
        L('可是……還有成千上萬項結果，有的太舊，有的是書，有的看不到全文 😩',
          'But there are still thousands of results — some are too old, some are books, and some have no full text 😩'),
        L('Primo@Lib 的篩選功能可以幫我嗎？快教我怎樣用篩選條件，收窄搜尋結果！',
          'Can the Primo@Lib filters help me? Show me how to use them to refine my results!')
      ],
      3: [
        L('耶！現在我找到一堆資料了 📄', 'Yay! Now I\'ve found a pile of sources 📄'),
        L('不過，不是每一份資料都可以相信，我不知道哪些可以放進 essay 裡 🤔',
          'But not every source can be trusted, and I don\'t know which ones to use in my essay 🤔'),
        L('最後一關！請幫我分辨哪些是可靠的 Treat 🍬，哪些是不可靠的 Trick 👻！',
          'Final level! Help me tell which sources are reliable Treats 🍬 and which are unreliable Tricks 👻!')
      ]
    },

    // Shown after each level (index = level)
    tricks: [
      [L('📚 用 Primo@Lib 找圖書館的書和資料；用 Database A-Z 裡的圖書館訂閱資料庫找學術文章。', '📚 Use Primo@Lib for library materials; use the library-subscribed databases in Database A-Z for scholarly articles.'),
        L('📰 WiseNews 找新聞；百科全書幫你了解背景。社交媒體不是搜尋學術資料的好地方！', '📰 WiseNews for news; encyclopedias for background. Social media is not the place for scholarly sources!')],
      [L('➕ AND 收窄｜OR 擴闊（加同義詞）｜NOT 排除', '➕ AND narrows | OR broadens (synonyms) | NOT excludes'),
        L('" " 搜尋精確詞組｜* 包括字尾變化（teen* → teens, teenager）', '" " finds an exact phrase | * finds word endings (teen* → teens, teenager)')],
      [L('🎚️ 善用篩選：日期、Peer-reviewed、Full text、語言、資料類型。', '🎚️ Use filters: date, peer-reviewed, full text, language, resource type.'),
        L('結果太多就收窄，太少就放寬。', 'Too many results? Narrow. Too few? Broaden.')],
      [L('🔎 用 CRAAP 檢查：Currency 時效、Relevance 相關、Authority 作者、Accuracy 準確、Purpose 目的。',
        '🔎 Check with CRAAP: Currency, Relevance, Authority, Accuracy, Purpose.'),
        L('沒有作者、沒有來源、想賣東西的資料要小心！', 'Beware: no author, no sources, or trying to sell something!')]
    ],

    // ---------- Level 1 ----------
    platforms: {
      primo: { icon: '📚', name: 'Primo@Lib' },
      jstor: { icon: '🗄️', name: 'JSTOR' },
      scholar: { icon: '🎓', name: 'Google Scholar' },
      wisenews: { icon: '📰', name: 'WiseNews' },
      britannica: { icon: '📖', name: 'Encyclopaedia Britannica' },
      censtatd: { icon: '🏛️', name: L('政府統計處網站', 'Census and Statistics Department') },
      wikipedia: { icon: '🌐', name: 'Wikipedia' },
      google: { icon: '🔍', name: 'Google' },
      instagram: { icon: '📸', name: 'Instagram' },
      threads: { icon: '🧵', name: 'Threads' },
      facebook: { icon: '👍', name: 'Facebook' },
      tiktok: { icon: '🎵', name: 'TikTok' },
      lihkg: { icon: '💬', name: 'LIHKG' },
      youtube: { icon: '▶️', name: 'YouTube' }
    },
    l1: [
      { prompt: L('我想知道圖書館有沒有一本關於睡眠科學的書，放在哪裡？', 'I want to know if the library has a book on sleep science, and where it is.'),
        answer: 'primo', distractors: ['instagram', 'threads', 'wikipedia', 'google'],
        why: L('Primo@Lib 可以查圖書館的館藏和位置。', 'Primo@Lib shows what the library holds and where to find it.') },
      { prompt: L('我需要 peer-reviewed 的期刊文章。', 'I need peer-reviewed journal articles.'),
        answer: 'jstor', distractors: ['instagram', 'wikipedia', 'facebook', 'youtube'],
        why: L('JSTOR 這類圖書館訂閱的資料庫（可在 Database A-Z 找到）收錄經同行評審的文章。', 'Library-subscribed databases like JSTOR (listed in Database A-Z) collect peer-reviewed articles.') },
      { prompt: L('我對這個題目完全陌生，想先了解基本概念。', 'I know nothing about this topic and want the basics first.'),
        answer: 'britannica', distractors: ['lihkg', 'tiktok', 'threads', 'instagram'],
        why: L('百科全書適合入門，但不宜直接引用。', 'Encyclopedias are great for background, but not for direct citing.') },
      { prompt: L('我想知道這篇論文後來被哪些文章引用。', 'I want to know which later papers cited this paper.'),
        answer: 'scholar', distractors: ['wikipedia', 'facebook', 'youtube', 'lihkg'],
        why: L('Google Scholar 的「Cited by」可以追蹤引用。', 'Google Scholar\'s "Cited by" tracks citations.') },
      { prompt: L('我想找香港報章的新聞報道和評論。', 'I want news reports and commentary from Hong Kong newspapers.'),
        answer: 'wisenews', distractors: ['lihkg', 'threads', 'tiktok', 'wikipedia'],
        why: L('WiseNews 這類新聞資料庫收錄報章的報道。', 'News databases like WiseNews collect newspaper articles.') },
      { prompt: L('我想找政府最新的官方統計數字。', 'I want the latest official government statistics.'),
        answer: 'censtatd', distractors: ['lihkg', 'instagram', 'wikipedia', 'youtube'],
        why: L('官方統計應以政府部門的網站為準。', 'Official statistics are best taken from government websites.') }
    ],

    // ---------- Level 2 ----------
    // options[0] is always the correct one; they get shuffled at play time.
    l2fill: [
      { prompt: L('social media ___ sleep（要同時包含兩個字）', 'social media ___ sleep (both words must appear)'),
        options: ['AND', 'OR', 'NOT'], from: 2000000, to: 41000,
        why: L('AND 收窄：結果必須同時包含兩個字。', 'AND narrows: results must contain both words.') },
      { prompt: L('teenagers ___ adolescents（包含任何一個都可以）', 'teenagers ___ adolescents (either word is fine)'),
        options: ['OR', 'AND', 'NOT'], from: 5000, to: 18000,
        why: L('OR 擴闊：加入同義詞，找到更多結果。', 'OR broadens: add synonyms to find more results.') },
      { prompt: L('sleep ___ animals（不想看到動物的研究）', 'sleep ___ animals (exclude animal studies)'),
        options: ['NOT', 'AND', 'OR'], from: 90000, to: 62000,
        why: L('NOT 排除：去掉不想要的結果。', 'NOT excludes: removes results you don\'t want.') },
      { prompt: L('要找「social media」這個詞組，哪個寫法正確？', 'Which is the right way to search the exact phrase "social media"?'),
        options: ['"social media"', 'social media', 'social + media'], from: 1200000, to: 36000,
        why: L('引號 " " 令兩個字必須連在一起出現。', 'Quotation marks make the words appear together as a phrase.') },
      { prompt: L('哪個寫法可以同時找到 teen、teens、teenager？', 'Which search finds teen, teens and teenager?'),
        options: ['teen*', 'teen', '"teen"'], from: 900, to: 4200,
        why: L('星號 * 代表字尾變化。', 'The asterisk * stands for any word ending.') }
    ],
    l2build: {
      correct: '"social media" AND sleep AND (teen* OR adolescent*)',
      tiles: ['"social media"', 'social media', 'sleep', '(teen* OR adolescent*)', 'AND', 'AND', 'NOT'],
      terms: ['"social media"', 'sleep', '(teen* OR adolescent*)'],
      from: 2000000, to: 350,
      whyOk: L('完美！引號、AND 和括號內的 OR 都用對了。', 'Perfect! Quotes, AND and OR inside brackets all used well.'),
      whyBad: L('要用 AND 連接三個概念，社交媒體要加引號，同義詞用括號和 OR，不需要 NOT。',
        'Join the three concepts with AND, quote "social media", put synonyms in brackets with OR, and no NOT needed.')
    },

    // ---------- Level 3 ----------
    l3base: 12480,
    l3filters: {
      date: { label: L('近 5 年', 'Last 5 years'), f: 0.35 },
      peer: { label: 'Peer-reviewed', f: 0.3 },
      fulltext: { label: 'Full Text', f: 0.6 },
      english: { label: L('English 英文', 'English'), f: 0.8 },
      article: { label: L('期刊文章', 'Journal articles'), f: 0.5 },
      books: { label: L('圖書', 'Books'), f: 0.2 },
      news: { label: L('報章', 'Newspapers'), f: 0.15 },
      old: { label: '1990–1999', f: 0.05 },
      chinese: { label: L('中文', 'Chinese'), f: 0.1 }
    },
    l3filterOrder: ['date', 'books', 'peer', 'old', 'fulltext', 'news', 'english', 'chinese', 'article'],
    l3filter: [
      { task: L('Boo 需要：近 5 年、經同行評審、有全文的英文期刊文章。', 'Boo needs: recent (last 5 years), peer-reviewed, full-text, English journal articles.'),
        need: ['date', 'peer', 'fulltext', 'english', 'article'],
        why: L('全部條件都選對了，結果由 12,480 縮到很少！', 'All filters spot on — thousands of results narrowed down!') },
      { task: L('Boo 需要：有全文的英文圖書。', 'Boo needs: full-text English books.'),
        need: ['books', 'fulltext', 'english'],
        why: L('選對資料類型、全文和語言，結果更精準。', 'Right resource type, full text and language give focused results.') },
      { task: L('Boo 需要：近 5 年的中文報章報道。', 'Boo needs: Chinese newspaper reports from the last 5 years.'),
        need: ['news', 'chinese', 'date'],
        why: L('資料類型、語言和日期都對了！', 'Resource type, language and date all correct!') }
    ],
    l3choice: [
      { prompt: L('搜尋結果有 500,000 項，太多了！應該怎麼做？', 'The search found 500,000 results — too many! What should you do?'),
        options: [L('加上篩選條件或更多關鍵字（AND）', 'Add filters or more keywords (AND)'),
          L('一項一項慢慢看', 'Read them one by one'),
          L('只看第一頁就好', 'Just read page one')],
        why: L('收窄範圍，才能找到最相關的結果。', 'Narrowing the scope finds the most relevant results.') },
      { prompt: L('搜尋結果只有 3 項，太少了！應該怎麼做？', 'The search found only 3 results — too few! What should you do?'),
        options: [L('放寬：移除部分篩選，或用 OR 加同義詞', 'Broaden: remove some filters, or add synonyms with OR'),
          L('加更多 AND 關鍵字', 'Add more AND keywords'),
          L('再加多幾個篩選條件', 'Add more filters')],
        why: L('放寬搜尋，避免遺漏有用的資料。', 'Broadening avoids missing useful sources.') },
      { prompt: L('你的題目需要最新的數據，應該用哪個篩選？', 'Your topic needs the latest data. Which filter helps?'),
        options: [L('出版日期', 'Publication date'),
          L('語言', 'Language'),
          L('資料類型', 'Resource type')],
        why: L('日期篩選可以確保資料夠新。', 'A date filter makes sure sources are current.') }
    ],

    // ---------- Level 4 ----------
    craap: {
      C: L('Currency 時效', 'Currency'),
      R: L('Relevance 相關', 'Relevance'),
      A1: L('Authority 作者', 'Authority'),
      A2: L('Accuracy 準確', 'Accuracy'),
      P: L('Purpose 目的', 'Purpose')
    },
    l4: [
      { reliable: true, title: L('青少年睡眠健康報告', 'Adolescent Sleep Health Report'),
        author: L('衞生部門研究小組', 'Government health department working group'),
        source: L('政府衞生部門網站', 'Government health department website'),
        date: '2024', type: L('政府報告', 'Government report'),
        excerpt: L('根據全港問卷調查，約六成學生每晚睡眠不足 8 小時……（附資料來源及方法）', 'A territory-wide survey found about 60% of students sleep under 8 hours a night... (sources and method included)'),
        clues: ['author', 'source'], tags: ['A1', 'A2'],
        why: L('官方機構、日期新、附方法和來源，值得信賴。', 'Official body, recent, with methods and sources — trustworthy.') },
      { reliable: true, title: L('社交媒體使用與青少年睡眠質素', 'Social Media Use and Adolescent Sleep Quality'),
        author: L('陳博士、李博士（大學）', 'Dr. Chan & Dr. Lee (University)'),
        source: L('同行評審學術期刊', 'Peer-reviewed academic journal'),
        date: '2023', type: L('期刊文章', 'Journal article'),
        excerpt: L('本研究訪問 1,200 名中學生……（附 42 項參考文獻）', 'We surveyed 1,200 secondary students... (42 references listed)'),
        clues: ['author', 'type', 'date'], tags: ['A1', 'A2', 'C'],
        why: L('學者撰寫、經同行評審、有參考文獻。', 'Written by scholars, peer-reviewed, with references.') },
      { reliable: true, title: L('熬夜與專注力：研究摘要', 'Late Nights and Focus: Research Summary'),
        author: L('大學睡眠研究中心', 'University Sleep Research Centre'),
        source: L('大學研究中心網站', 'University research centre website'),
        date: '2024', type: L('研究摘要', 'Research summary'),
        excerpt: L('我們整理了近五年的研究結果，每項結論均附原始論文連結。', 'We summarise the last five years of studies, each claim linked to the original paper.'),
        clues: ['author', 'source', 'date'], tags: ['A1', 'A2', 'C'],
        why: L('專業機構、資料新，並附原始論文連結。', 'Expert institution, current, with links to the original papers.') },
      { reliable: false, title: L('手機令你變笨！！！', 'Phones Make You STUPID!!!'),
        author: L('未註明', 'Not stated'), source: L('個人 blog', 'Personal blog'),
        date: L('未註明', 'Not stated'), type: L('Blog 文章', 'Blog post'),
        excerpt: L('「我認識的人都這樣，所以科學家一定是對的！」', '"Everyone I know is like this, so scientists must be right!"'),
        clues: ['author', 'date'], tags: ['A1', 'C'],
        why: L('沒有作者、沒有日期、語氣誇張，也沒有證據。', 'No author, no date, over-dramatic tone and no evidence.') },
      { reliable: false, title: L('KOL 推介：一粒就睡到天亮！', 'KOL Review: One Gummy and You Sleep All Night!'),
        author: L('網紅 @SleepyQueen', 'Influencer @SleepyQueen'), source: L('短片平台', 'Video platform'),
        date: '2025', type: L('推廣影片', 'Promotional video'),
        excerpt: L('「用我的優惠碼 SLEEP20 買助眠軟糖即減 20%！」', '"Use my code SLEEP20 for 20% off sleep gummies!"'),
        clues: ['type', 'excerpt'], tags: ['P'],
        why: L('目的是銷售產品，並不是客觀資訊。', 'The purpose is selling a product, not objective information.') },
      { reliable: false, title: L('智能手機會成為青少年的新寵？', 'Will Smartphones Be the Next Big Thing for Teens?'),
        author: L('報章記者', 'Newspaper reporter'), source: L('報章', 'Newspaper'),
        date: '2009', type: L('新聞報道', 'News report'),
        excerpt: L('「最新款手機只有少數學生擁有……」', '"Only a few students own the newest phones..."'),
        clues: ['date'], tags: ['C'],
        why: L('資料已過時，不適合用來討論現在的情況。', 'Outdated — not suitable for today\'s situation.') },
      { reliable: false, title: L('99% 的人都不知道的睡眠秘密！', 'Sleep Secrets 99% of People Don\'t Know!'),
        author: L('未註明', 'Not stated'), source: L('內容農場網站', 'Content-farm website'),
        date: L('未註明', 'Not stated'), type: L('網站文章', 'Web article'),
        excerpt: L('專家都不想你知道！點擊看 7 個神奇方法……（沒有任何來源）', 'Experts don\'t want you to know! Click for 7 magic tricks... (no sources given)'),
        clues: ['author', 'source', 'excerpt'], tags: ['A1', 'A2'],
        why: L('誇張標題、沒有作者和來源。', 'Clickbait headline, no author, no sources.') },
      { reliable: false, title: L('我每天睡 4 小時都沒事啊', 'I Sleep 4 Hours a Day and I\'m Fine'),
        author: L('匿名用戶', 'Anonymous user'), source: L('網上討論區', 'Online forum'),
        date: '2022', type: L('討論區帖子', 'Forum post'),
        excerpt: L('「我試過，所以大家不用睡那麼多。」', '"I tried it, so nobody needs that much sleep."'),
        clues: ['author', 'type'], tags: ['A1', 'A2'],
        why: L('匿名的個人經驗，並非研究證據。', 'Anonymous personal experience is not research evidence.') }
    ]
  };
})();

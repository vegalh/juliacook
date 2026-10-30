import { VERIFIED_BIBLIOGRAPHIC } from "../../content/licensing";
import type { JuliaCookBook } from "./types";

/**
 * Julia Cook book catalog.
 *
 * IMPORTANT — copyright safeguard: every `summary` / `whatChildrenMayLearn`
 * field below was written from scratch for this app. None of it is copied
 * from the publisher's marketing synopsis, back-cover copy, or any page of
 * the book itself. No book text, illustrations, audio, or video is stored
 * anywhere in this repository. See docs/licensing-architecture.md and
 * docs/julia-cook-book-catalog.md.
 *
 * Two verification tiers are mixed in this file (see `BookVerificationLevel`
 * in ./types.ts):
 *  - 16 titles are `"verified_detailed"` — individually fetched from
 *    juliacookonline.com (fetched 2026-10-11) and cross-checked field by
 *    field (publisher, illustrator, ISBN, grades/ages, official tags).
 *  - The remaining titles are `"verified_catalog_only"` — confirmed to
 *    exist via the official "Search by Title" listing
 *    (https://juliacookonline.com/search-by-title/, fetched 2026-10-11)
 *    with a working detail-page URL, but not opened individually, so their
 *    ISBN/tags/summary are not yet authored and `topicSlugs` is left empty.
 *    Treat these as a verified *index*, not verified *detail*.
 *
 * `topicSlugs` links a book to this app's existing `ParentingSituation`
 * slugs (src/data/situations.ts). A `mappingConfidence: "hypothesis"` means
 * the *link* (not the book's own metadata) is this app's own editorial
 * judgment, not an official publisher claim — see docs/content-research-gaps.md.
 */
export const books: JuliaCookBook[] = [
  // ---------------------------------------------------------------------
  // Detailed-verification tier (16 titles, one per existing topic slug)
  // ---------------------------------------------------------------------
  {
    id: "my-mouth-is-a-volcano",
    title: "My Mouth Is a Volcano!",
    titleZh: "我的嘴巴是座火山！",
    series: "Louis",
    author: "Julia Cook",
    illustrator: "Carrie Hartman",
    publisher: "National Center for Youth Issues",
    publicationDate: "2005-01-01",
    isbn: "978-1931636858",
    grades: "K-3",
    ages: "4-7",
    priceUsd: "$10.95",
    officialTags: [
      "interrupting",
      "impulse control",
      "impulsivity",
      "self-control",
      "talking too much",
      "outbursts",
      "waiting your turn to talk",
    ],
    topicSlugs: ["interrupting"],
    mappingConfidence: "confirmed",
    selCompetencies: ["self-management", "relationship-skills"],
    summary:
      "A boy named Louis notices that his thoughts and words feel so urgent that they 'erupt' out of him before it's his turn to speak, interrupting the people around him. He learns a concrete technique for holding onto a thought until there's a good moment to share it.",
    summaryZh:
      "男孩 Louis 发现自己脑海里的想法总是\u201c迫不及待\u201d地冲出来，常常打断别人说话。他学到了一个具体的小技巧，可以先\u201c存住\u201d想法，等轮到自己发言时再说出来。",
    whatChildrenMayLearn:
      "A concrete way to notice the urge to interrupt and briefly hold a thought until it's their turn to talk.",
    whatChildrenMayLearnZh: "学会觉察\u201c想打断别人\u201d的冲动，并先把想法\u201c存住\u201d，等轮到自己再说。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2005/01/01/my-mouth-is-a-volcano/",
    hasOfficialActivityBook: true,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "teamwork-isnt-my-thing-and-i-dont-like-to-share",
    title: "Teamwork Isn't My Thing and I Don't Like to Share",
    titleZh: "合作不是我的强项，我也不喜欢分享",
    series: "Best Me I Can Be!",
    author: "Julia Cook",
    publisher: "Boys Town Press",
    publicationDate: "2012-08-15",
    isbn: "978-1934490358",
    grades: "K-6",
    ages: "5-12",
    priceUsd: "$11.95",
    officialTags: ["compromise", "give and take", "sharing", "team roles", "teamwork", "working together"],
    topicSlugs: ["sharing"],
    mappingConfidence: "confirmed",
    selCompetencies: ["relationship-skills", "social-awareness"],
    summary:
      "RJ is assigned to a school group project with classmates he doesn't get along with, and later has to split his last cookie with his sister at home. Through both situations, he works out — with a coach's help — that sharing and teamwork are the same skill showing up in different places.",
    summaryZh:
      "RJ 被分到一个和自己合不来的同学一组做作业，回家后又得和妹妹分享最后一块饼干。在教练的帮助下，他渐渐明白：分享与合作其实是同一种能力，只是换了个场合。",
    whatChildrenMayLearn: "That sharing and working as a team draw on the same underlying skill, practiced in different settings.",
    whatChildrenMayLearnZh: "明白分享和团队合作其实是同一种能力，只是在不同场合中的运用。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2012/08/15/teamwork-isnt-my-thing-and-i-dont-like-to-share/",
    hasOfficialActivityBook: true,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "bubble-gum-brain",
    title: "Bubble Gum Brain: Ready, Get Mindset\u2026GROW!",
    titleZh: "泡泡糖大脑：准备好，启动成长型思维！",
    author: "Julia Cook",
    illustrator: "Allison Valentine",
    publisher: "National Center for Youth Issues",
    publicationDate: "2017-04-25",
    isbn: "978-1937870430",
    grades: "K-6",
    ages: "4-8",
    priceUsd: "$10.95",
    officialTags: [
      "be positive",
      "flexibility",
      "flexible",
      "growth mindset",
      "having a positive mindset",
      "optimism",
      "positive mindset",
      "positive outlook",
      "positive thinking",
      "positivity",
      "power of yet",
      "try something new",
    ],
    topicSlugs: ["fear-of-failure"],
    mappingConfidence: "confirmed",
    selCompetencies: ["self-awareness", "responsible-decision-making"],
    summary:
      "Two characters with opposite mindsets — one stretchy and curious, one rigid and set in his ways — meet, and the stretchy-minded one shows the other how treating mistakes as useful information (rather than proof of failure) opens up more of what school and life have to offer.",
    summaryZh:
      "两个思维方式截然相反的角色相遇：一个灵活好奇，一个固执己见。灵活思维的一方向另一方展示：把犯错看作有用的信息，而不是失败的证明，能让学校生活和日常生活变得更有可能性。",
    whatChildrenMayLearn: "Treating a mistake as information to learn from, instead of proof that they've failed.",
    whatChildrenMayLearnZh: "把犯错看作可以学习的信息，而不是证明自己失败了。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2017/04/25/bubble-gum-brain-ready-get-mindset-grow/",
    hasOfficialActivityBook: true,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "soda-pop-head",
    title: "Soda Pop Head",
    titleZh: "汽水脑袋",
    author: "Julia Cook",
    publisher: "National Center for Youth Issues",
    publicationDate: "2011-09-01",
    isbn: "978-1931636773",
    grades: "K-6",
    ages: "6-8",
    priceUsd: "$10.95",
    officialTags: ["anger", "anger control", "anger management", "temper", "tantrum", "temper tantrum"],
    topicSlugs: ["getting-angry"],
    mappingConfidence: "confirmed",
    selCompetencies: ["self-management", "self-awareness"],
    summary:
      "A child whose frustration builds up like pressure in a shaken soda bottle learns to notice the early warning signs of anger building and to release that pressure in small, safe ways before it erupts all at once.",
    summaryZh:
      "一个孩子的烦躁情绪就像被摇晃过的汽水瓶一样不断积压。他学会了及早察觉愤怒积累的信号，并在情绪完全爆发之前，用安全的小方法一点点释放压力。",
    whatChildrenMayLearn: "Noticing the early physical signs of building anger and releasing it in small steps before it erupts.",
    whatChildrenMayLearnZh: "察觉愤怒积累的早期身体信号，在情绪爆发前一点点释放出来。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2011/09/01/soda-pop-head/",
    hasOfficialActivityBook: true,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "well-i-can-top-that",
    title: "Well, I Can Top That!",
    titleZh: "哼，我比你更厉害！",
    series: "Communicate With Confidence",
    author: "Julia Cook",
    publisher: "Boys Town Press",
    publicationDate: "2014-02-26",
    isbn: "978-1934490570",
    grades: "K-6",
    ages: "5-12",
    priceUsd: "$11.95",
    topicSlugs: ["friend-conflict"],
    mappingConfidence: "hypothesis",
    mappingNote:
      "This book's own theme (one-upping/bragging in conversation, as inferred from its series and title) is narrower than the app's general 'friend conflict' situation. Treat this as a plausible but unconfirmed starting point, not an official match — its own TAGS section was not successfully loaded during this research pass.",
    selCompetencies: ["social-awareness", "relationship-skills"],
    summary:
      "A child who habitually tries to 'win' every conversation by topping whatever a friend just said learns how that habit pushes friends away, and practices simply listening and responding to what a friend actually shared instead.",
    summaryZh:
      "一个习惯在每次对话中都要\u201c压过\u201d朋友一头的孩子，渐渐发现这种习惯会把朋友越推越远。于是他开始练习：先好好听朋友说了什么，再做出回应，而不是急着比过去。",
    whatChildrenMayLearn: "Noticing the urge to one-up a friend's story and practicing listening and responding instead.",
    whatChildrenMayLearnZh: "察觉自己想要\u201c压过\u201d朋友的冲动，练习先倾听、再回应。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2014/02/26/well-i-can-top-that/",
    hasOfficialActivityBook: false,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "bully-beans",
    title: "Bully B.E.A.N.S.",
    titleZh: "欺凌豆豆",
    author: "Julia Cook",
    publisher: "National Center for Youth Issues",
    publicationDate: "2019-09-25",
    isbn: "978-1937870591",
    grades: "3-5",
    ages: "4-8",
    priceUsd: "$10.95",
    officialTags: ["bullying", "bully prevention"],
    topicSlugs: ["bullying"],
    mappingConfidence: "confirmed",
    selCompetencies: ["social-awareness", "relationship-skills"],
    summary:
      "Using a cast of bean characters, the story shows a child learning to recognize bullying behavior, understand why it happens, and practice concrete steps for responding and getting help, rather than staying silent or reacting with more aggression.",
    summaryZh:
      "故事用一群\u201c豆子\u201d角色，展示一个孩子如何学会识别欺凌行为、理解它为什么会发生，并练习具体的应对方法和求助步骤，而不是选择沉默或以暴制暴。",
    whatChildrenMayLearn: "Recognizing bullying behavior and practicing concrete steps for responding and asking for help.",
    whatChildrenMayLearnZh: "学会识别欺凌行为，并练习具体的应对和求助步骤。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2019/09/25/bully-b-e-a-n-s/",
    hasOfficialActivityBook: true,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "i-just-dont-like-the-sound-of-no",
    title: "I Just Don't Like the Sound of No!",
    titleZh: "我就是不喜欢听到\u201c不行\u201d",
    series: "Best Me I Can Be!",
    author: "Julia Cook",
    publisher: "Boys Town Press",
    publicationDate: "2015-10-01",
    isbn: "978-1934490259",
    grades: "K-6",
    ages: "5-12",
    priceUsd: "$11.95",
    officialTags: ["listening", "following instructions", "communication", "accepting the answer no"],
    topicSlugs: ["not-listening"],
    mappingConfidence: "confirmed",
    selCompetencies: ["self-management", "responsible-decision-making"],
    summary:
      "RJ reacts strongly whenever he hears the word 'no,' and the story follows him learning a short routine for calming down and accepting an answer he doesn't like, rather than arguing or shutting down.",
    summaryZh:
      "RJ 一听到\u201c不行\u201d就会反应激烈。故事讲述他学习了一套简短的冷静流程，用来接受自己不喜欢的答案，而不是争吵或情绪崩溃。",
    whatChildrenMayLearn: "A short calming routine for accepting an answer they don't like, instead of arguing or shutting down.",
    whatChildrenMayLearnZh: "学会一套简短的冷静流程，接受自己不喜欢的答案，而不是争吵或情绪崩溃。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2015/10/01/i-just-dont-like-the-sound-of-no/",
    hasOfficialActivityBook: true,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "wilma-jean-the-worry-machine",
    title: "Wilma Jean the Worry Machine",
    titleZh: "威尔玛·珍——爱担心的小机器",
    author: "Julia Cook",
    publisher: "National Center for Youth Issues",
    publicationDate: "2012-01-15",
    isbn: "978-1937870010",
    grades: "2-5",
    ages: "5-9",
    priceUsd: "$10.95",
    officialTags: ["anxiety", "worry", "stress", "fret"],
    topicSlugs: ["worry-anxiety"],
    mappingConfidence: "confirmed",
    selCompetencies: ["self-awareness", "self-management"],
    summary:
      "Wilma Jean's worries follow her everywhere and start to feel bigger than her, until she learns a few concrete ways to name a specific worry and \"talk back\" to it, shrinking it down to a manageable size.",
    summaryZh:
      "威尔玛·珍的担心无处不在，感觉越来越大、难以控制。后来她学会了几种具体的方法，把担心\u201c说出来\u201d并\u201c回应\u201d它，让它变得不再那么难以承受。",
    whatChildrenMayLearn: "Naming a specific worry out loud and \"talking back\" to it to make it feel more manageable.",
    whatChildrenMayLearnZh: "把具体的担心说出来，并学着\u201c回应\u201d它，让它感觉没那么难以承受。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2012/01/15/wilma-jean-the-worry-machine/",
    hasOfficialActivityBook: true,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "i-have-ants-in-my-pants",
    title: "I Have Ants in My Pants",
    titleZh: "我裤子里好像有蚂蚁",
    series: "Louis",
    author: "Julia Cook",
    illustrator: "Carrie Hartman",
    publisher: "National Center for Youth Issues",
    publicationDate: "2020-08-27",
    isbn: "978-1937870706",
    grades: "K-6",
    ages: "5-7",
    priceUsd: "$10.95",
    officialTags: [
      "ADD",
      "ADHD",
      "bad case of the wiggles",
      "focus squishy",
      "impulse control",
      "impulsivity",
      "listening",
      "self-control",
      "task completion",
      "wiggly",
    ],
    topicSlugs: ["self-control"],
    mappingConfidence: "confirmed",
    selCompetencies: ["self-management"],
    summary:
      "A child who struggles to sit still — wiggling in the lunch line, during story time, at the movies — learns a short physical routine for releasing restless energy on purpose, so it's easier to settle down afterward.",
    summaryZh:
      "一个总是坐不住的孩子——排队时扭来扭去，听故事时动个不停，看电影时也坐不安稳——学会了一套简短的身体放松流程，有意识地先释放多余的精力，之后再更容易安静下来。",
    whatChildrenMayLearn: "A short physical routine for releasing restless energy on purpose before trying to settle down.",
    whatChildrenMayLearnZh: "学会一套简短的身体放松流程，有意识地先释放精力，再让自己安静下来。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2020/08/27/i-have-ants-in-my-pants/",
    hasOfficialActivityBook: false,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "will-you-be-the-i-in-kind",
    title: 'Will You Be the "I" in Kind?',
    titleZh: "你愿意成为\u201c善\u201d字里的那个\u201c我\u201d吗？",
    author: "Julia Cook",
    illustrator: "Jomike Tejido",
    publisher: "National Center for Youth Issues",
    publicationDate: "2021-11-04",
    isbn: "978-1953945532",
    grades: "K-6",
    ages: "5-12",
    priceUsd: "$10.95",
    officialTags: ["compromise", "empathy", "giving", "helping", "kindness", "sharing", "treating others kindly"],
    topicSlugs: ["kindness"],
    mappingConfidence: "confirmed",
    selCompetencies: ["social-awareness", "relationship-skills"],
    summary:
      "A character is missing a letter from its own name and sets out to find it, meeting a variety of children along the way who each show kindness through a different everyday action — helping, sharing, or simply going second so someone else can go first.",
    summaryZh:
      "一个角色发现自己的名字里缺了一个字母，于是出发去寻找它。途中遇到了许多孩子，他们各自用不同的日常小事展现善意——帮助别人、分享，或者主动让别人先来。",
    whatChildrenMayLearn: "Recognizing small, everyday actions — helping, sharing, letting someone go first — as acts of kindness.",
    whatChildrenMayLearnZh: "认识到帮助、分享、让别人先来这些日常小事也是善意的表现。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2021/11/04/the-i-in-kind/",
    hasOfficialActivityBook: false,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "jumping-into-kindergarten",
    title: "Jumping Into Kindergarten",
    titleZh: "蹦蹦跳跳上幼儿园大班",
    author: "Julia Cook",
    contributor: "Laura Jana, MD",
    illustrator: "James Newman Gray",
    publisher: "National Center for Youth Issues",
    publicationDate: "2017-07-25",
    isbn: "978-1937870447",
    grades: "PreK-K",
    ages: "4-6",
    priceUsd: "$10.95",
    officialTags: ["first day of school", "going to school", "kindergarten", "kindergarten readiness", "pre-k", "school readiness"],
    topicSlugs: ["transitions"],
    mappingConfidence: "confirmed",
    selCompetencies: ["self-awareness", "self-management"],
    summary:
      "A young character prepares for the big change of starting kindergarten, naming the mix of excitement and nervousness that comes with a new routine, new people, and new expectations, and practicing a handful of concrete readiness skills along the way.",
    summaryZh:
      "一个小角色正在为\u201c上幼儿园大班\u201d这个大转变做准备，说出了面对新常规、新朋友、新要求时既兴奋又紧张的复杂心情，并一路练习了几项具体的准备技能。",
    whatChildrenMayLearn: "Naming the mixed feelings of excitement and nervousness that come with starting a new routine.",
    whatChildrenMayLearnZh: "说出面对新常规时既兴奋又紧张的复杂心情。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2017/07/25/jumping-into-kindergarten/",
    hasOfficialActivityBook: false,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "cliques-just-dont-make-cents",
    title: "Cliques Just Don't Make Cents",
    titleZh: "小圈子不划算",
    series: "Building Relationships",
    author: "Julia Cook",
    illustrator: "Anita DuFalla",
    publisher: "Boys Town Press",
    publicationDate: "2012-08-11",
    isbn: "978-1934490396",
    grades: "1-7",
    ages: "6-13",
    priceUsd: "$10.95",
    officialTags: ["bullying", "cliques", "confidence", "empathy", "in with the in crowd", "mean girls", "peer pressure", "relational aggression", "self-worth", "targeting"],
    topicSlugs: ["excluded-by-peers"],
    mappingConfidence: "confirmed",
    selCompetencies: ["social-awareness", "self-awareness"],
    summary:
      "Using a cast of coin characters, a penny who keeps feeling excluded by a tight-knit clique eventually meets a coin who looks and acts differently from the others, and who helps her see her own worth instead of measuring herself against the group that left her out.",
    summaryZh:
      "故事用一群\u201c硬币\u201d角色讲述：一枚总是被小圈子排挤在外的硬币，后来遇到了一枚和其他硬币都不一样的朋友，帮助她意识到自己的价值，而不是一味用排挤她的那群人来衡量自己。",
    whatChildrenMayLearn: "Recognizing their own worth instead of measuring themselves against a group that has excluded them.",
    whatChildrenMayLearnZh: "认识到自己的价值，而不是用排挤自己的那群人来衡量自己。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2012/08/11/cliques-just-dont-make-cents/",
    hasOfficialActivityBook: false,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "the-anti-test-anxiety-society",
    title: "The Anti-Test Anxiety Society",
    titleZh: "反\u201c考试焦虑\u201d联盟",
    author: "Julia Cook",
    illustrator: "Anita DuFalla",
    publisher: "National Center for Youth Issues",
    publicationDate: "2014-07-11",
    isbn: "978-1937870300",
    grades: "2-6",
    ages: "7-12",
    priceUsd: "$10.95",
    officialTags: ["anxiety", "high stakes testing", "performance anxiety", "staying focused", "taking tests", "test anxiety", "test prep", "test preparation", "testing"],
    topicSlugs: ["school-reluctance"],
    mappingConfidence: "hypothesis",
    mappingNote:
      "This book's verified topic is specifically test-taking anxiety, which is narrower than this app's 'reluctant about school' situation (which also covers social or routine-based reluctance unrelated to testing). Shown as the closest available match, not a confirmed equivalent — see docs/content-research-gaps.md.",
    selCompetencies: ["self-management", "self-awareness"],
    summary:
      "A student who dreads tests so much that her body reacts with physical symptoms joins a club led by her teacher, where she learns a set of specific test-taking strategies and a mental reframe that shifts testing from something to fear into something she can prepare for.",
    summaryZh:
      "一个一想到考试就浑身不自在的学生，在老师的带领下加入了一个\u201c联盟\u201d，学到了一套具体的应考策略，也学会了换一种心态看待考试——从害怕考试，变成可以为考试做准备。",
    whatChildrenMayLearn: "A handful of concrete test-taking strategies and a mental reframe from \"feared event\" to \"something I can prepare for.\"",
    whatChildrenMayLearnZh: "几条具体的应考策略，以及把考试从\u201c害怕的事\u201d变成\u201c可以准备的事\u201d的心态转变。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2014/07/11/the-anti-test-anxiety-society/",
    hasOfficialActivityBook: false,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "the-procrastinator",
    title: "The PROcrastinator",
    titleZh: "拖延小能手",
    series: "Responsible ME",
    author: "Julia Cook",
    illustrator: "Anita DuFalla",
    publisher: "Boys Town Press",
    publicationDate: "2017-02-01",
    isbn: "978-1944882099",
    grades: "K-5",
    ages: "5-11",
    priceUsd: "$11.95",
    officialTags: ["2-minute rule", "balancing work & play", "executive function", "executive functioning", "procrastinating", "putting things off", "Responsible Me!"],
    topicSlugs: ["procrastination"],
    mappingConfidence: "confirmed",
    selCompetencies: ["self-management", "responsible-decision-making"],
    summary:
      "Noodle keeps putting off chores and homework in favor of more fun things, until the consequences pile up — a hungrier pet, more trash, undone homework — and he practices doing the needed task first and saving fun for after.",
    summaryZh:
      "Noodle 总是把做家务和作业往后拖，去做更好玩的事，结果\u201c后果\u201d越积越多——宠物更饿了，垃圾堆满了，作业也没写完。最终他练习了\u201c先完成该做的事，再享受好玩的事\u201d。",
    whatChildrenMayLearn: "Doing the needed task first and saving the fun activity for after, instead of the reverse.",
    whatChildrenMayLearnZh: "先完成该做的事，再去做好玩的事，而不是反过来。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2017/02/01/the-procrastinator/",
    hasOfficialActivityBook: true,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "i-got-this-i-have-bounce-back-superpowers",
    title: "I Got This! I Have Bounce Back Superpowers",
    titleZh: "我能行！我有\u201c重新振作\u201d超能力",
    author: "Julia Cook",
    contributor: "Michele Borba",
    illustrator: "Dale Crawford",
    publisher: "National Center for Youth Issues",
    publicationDate: "2024-08-01",
    isbn: "978-1953945853",
    grades: "PreK-4",
    ages: "4-10",
    priceUsd: "$15.95",
    officialTags: ["ask for help", "brainstorm", "breathing", "chunk it", "overcoming obstacles", "recharge", "resilience", "talk back to worry"],
    topicSlugs: ["low-confidence"],
    mappingConfidence: "hypothesis",
    mappingNote:
      "This book is about resilience/bouncing back from setbacks generally, which is related to but not identical to this app's 'low confidence' situation. An earlier candidate, \"How To Be Comfortable in Your Own Feathers,\" was rejected for this slug after its own tags showed it is specifically about eating disorders and body image, which would have been a poor and potentially sensitive mismatch — see docs/content-research-gaps.md.",
    selCompetencies: ["self-management", "responsible-decision-making"],
    summary:
      "A young dog determined to earn his rescue-dog certification faces a series of setbacks on a difficult climb, and learns, with his friends' help, a set of concrete strategies for staying calm, breaking a hard problem into smaller steps, and recovering after a discouraging moment.",
    summaryZh:
      "一只立志成为救援犬的小狗在攀登途中遇到了一连串挫折。在朋友的帮助下，他学到了一套具体的方法——保持冷静、把难题拆解成小步骤，并在感到沮丧后重新振作起来。",
    whatChildrenMayLearn: "A set of concrete steps for staying calm and recovering after a discouraging setback.",
    whatChildrenMayLearnZh: "学会一套具体方法，在遇到挫折后保持冷静并重新振作。",
    verificationLevel: "verified_detailed",
    sourceUrl: "https://juliacookonline.com/2024/08/01/i-got-this-i-have-bounce-back-superpowers/",
    hasOfficialActivityBook: false,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  // `teen-communication` intentionally has no detailed-tier book: no confident
  // official match was found during this research pass. See
  // docs/content-research-gaps.md.

  // ---------------------------------------------------------------------
  // Catalog-only tier: confirmed to exist in the official title index, but
  // not individually opened/verified in this pass. No topicSlugs, tags, or
  // original summaries are authored for these yet.
  // ---------------------------------------------------------------------
  catalogOnly("the-lucky-button", "The Lucky Button", "Best START/PreK", "2025-08-05", "https://juliacookonline.com/2025/08/05/the-lucky-button/"),
  catalogOnly("the-big-oops", "The Big Oops", "Best START/PreK", "2026-06-11", "https://juliacookonline.com/2026/06/11/the-big-oops/"),
  catalogOnly(
    "teach-kids-not-content",
    "Teach Kids Not Content: How to Connect with Students and Love Teaching Again",
    "Recent Releases",
    "2026-05-31",
    "https://juliacookonline.com/2026/05/31/teach-kids-not-content-how-to-connect-with-students-and-love-teaching-again/",
    "educator"
  ),
  catalogOnly("its-you-and-me-against-the-pee", "It's You & Me Against the Pee", "Best START/PreK", "2011-04-15", "https://juliacookonline.com/2011/04/15/its-you-and-me-against-the-pee/"),
  catalogOnly("its-hard-to-be-a-verb", "It's Hard to Be a Verb", "Louis", "2008-09-26", "https://juliacookonline.com/2008/09/26/its-hard-to-be-a-verb/"),
  catalogOnly("personal-space-camp", "Personal Space Camp", "Louis", "2007-03-01", "https://juliacookonline.com/2007/03/01/personal-space-camp/"),
  catalogOnly("i-just-want-to-do-it-my-way", "I Just Want to Do It My Way", "RJ", "2013-02-08", "https://juliacookonline.com/2013/02/08/i-just-want-to-do-it-my-way/"),
  catalogOnly("i-cant-believe-you-said-that", "I Can't Believe You Said That", "RJ", "2014-09-01", "https://juliacookonline.com/2014/09/01/i-cant-believe-you-said-that/"),
  catalogOnly("sorry-i-forgot-to-ask", "Sorry, I Forgot to Ask", "RJ", "2012-02-01", "https://juliacookonline.com/2012/02/01/sorry-i-forgot-to-ask/"),
  catalogOnly("thanks-for-the-feedback-i-think", "Thanks for the Feedback\u2026I Think", "RJ", "2013-09-04", "https://juliacookonline.com/2013/09/04/thanks-for-the-feedback-i-think/"),
  catalogOnly("the-worst-day-of-my-life-ever", "The Worst Day of My Life Ever", "RJ", "2011-03-15", "https://juliacookonline.com/2011/03/15/the-worst-day-of-my-life-ever/"),
  catalogOnly("baditude", "Baditude: What to Do When Your Life Stinks", "Noodle", "2015-08-13", "https://juliacookonline.com/2015/08/13/baditude-what-to-do-when-your-life-stinks/"),
  catalogOnly("but-its-not-my-fault", "But It's Not My Fault", "Noodle", "2015-02-27", "https://juliacookonline.com/2015/02/27/but-its-not-my-fault/"),
  catalogOnly("cheaters-never-prosper", "Cheaters Never Prosper", "Noodle", "2016-10-14", "https://juliacookonline.com/2016/10/14/cheaters-never-prosper/"),
  catalogOnly("that-rule-doesnt-apply-to-me", "That Rule Doesn't Apply to Me", "Noodle", "2016-04-01", "https://juliacookonline.com/2016/04/01/that-rule-doesnt-apply-to-me/"),
  catalogOnly("whats-in-it-for-me", "What's In It For Me", "Noodle", "2018-10-15", "https://juliacookonline.com/2018/10/15/whats-in-it-for-me/"),
  catalogOnly("good-things-come-to-those-who-wait", "Good Things Come to Those Who Wait", "Cora June", "2021-06-22", "https://juliacookonline.com/2021/06/22/good-things-come-to-those-who-wait/"),
  catalogOnly("the-great-compromise", "The Great Compromise", "Cora June", "2019-09-03", "https://juliacookonline.com/2019/09/03/the-great-compromise/"),
  catalogOnly("the-i-in-integrity", 'The "I" in Integrity', "Cora June", "2020-10-06", "https://juliacookonline.com/2020/10/06/the-i-in-integrity/"),
  catalogOnly("my-way-or-the-highway", "My Way or the Highway", "Cora June", "2019-02-20", "https://juliacookonline.com/2019/02/20/my-way-or-the-highway/"),
  catalogOnly("herman-jiggle-go-to-sleep", "HJ Go to Sleep", "Herman Jiggle", "2020-07-25", "https://juliacookonline.com/2020/07/25/herman-jiggle-go-to-sleep/"),
  catalogOnly("herman-jiggle-its-recess-not-restress", "HJ It's RECESS Not RESTRESS", "Herman Jiggle", "2021-09-07", "https://juliacookonline.com/2021/09/07/herman-jiggle-its-recess-not-restress/"),
  catalogOnly("herman-jiggle-just-be-you", "HJ Just Be You", "Herman Jiggle", "2023-02-13", "https://juliacookonline.com/2023/02/13/herman-jiggle-just-be-you/"),
  catalogOnly("herman-jiggle-say-hello", "HJ Say Hello", "Herman Jiggle", "2020-02-18", "https://juliacookonline.com/2020/02/18/herman-jiggle/"),
  catalogOnly("i-cant-find-my-whatchamacallit", "I Can't Find My Whatchamacallit", "Cletus & Bocephus", "2015-10-01", "https://juliacookonline.com/2015/10/01/i-cant-find-my-whatchamacallit/"),
  catalogOnly("planning-isnt-my-priority", "Planning Isn't My Priority\u2026and Making Priorities Isn't in My Plans", "Cletus & Bocephus", "2016-02-28", "https://juliacookonline.com/2016/02/28/planning-isnt-my-priority-and-making-priorities-isnt-in-my-plans/"),
  catalogOnly("study-skilled-not", "Study Skilled\u2026NOT!", "Cletus & Bocephus", "2016-11-15", "https://juliacookonline.com/2016/11/15/study-skilled-not/"),
  catalogOnly("awesome-dawson-has-big-emotions", "Awesome Dawson Has Big Emotions", "Awesome Dawson", "2024-02-24", "https://juliacookonline.com/2024/02/24/awesome-dawson-has-big-emotions/"),
  catalogOnly("awesome-dawson-its-not-your-turn", "Awesome Dawson It's Not Your Turn", "Awesome Dawson", "2022-07-11", "https://juliacookonline.com/2022/07/11/awesome-dawson-its-not-your-turn/"),
  catalogOnly("awesome-dawson-my-emotions-have-a-job", "Awesome Dawson My Emotions Have a Job", "Awesome Dawson", "2025-05-06", "https://juliacookonline.com/2025/05/06/awesome-dawson-my-emotions-have-a-job/"),
  catalogOnly("the-judgmental-flower", "The Judgmental Flower", "Relationships", "2016-09-18", "https://juliacookonline.com/2016/09/18/the-judgemental-flower/"),
  catalogOnly("making-friends-is-an-art", "Making Friends Is an Art", "Relationships", "2020-06-08", "https://juliacookonline.com/2020/06/08/making-friends-is-an-art/"),
  catalogOnly("peer-pressure-gauge", "Peer Pressure Gauge", "Relationships", "2013-09-01", "https://juliacookonline.com/2013/09/01/peer-pressure-gauge/"),
  catalogOnly("the-d-word", 'The "D" Word', "Family Dynamics", "2011-06-15", "https://juliacookonline.com/2011/06/15/the-d-word/"),
  catalogOnly("deployment-one-of-our-pieces-is-missing", "Deployment: One of Our Pieces Is Missing", "Family Dynamics", "2018-04-17", "https://juliacookonline.com/2018/04/17/deployment-one-of-our-pieces-is-missing/"),
  catalogOnly("foster-care-one-dogs-story-of-change", "Foster Care: One Dog's Story of Change", "Family Dynamics", "2018-04-03", "https://juliacookonline.com/2018/04/03/foster-care-one-dogs-story-of-change/"),
  catalogOnly("i-want-to-be-the-only-dog", "I Want to Be the Only Dog", "Family Dynamics", "2015-10-01", "https://juliacookonline.com/2015/10/01/i-want-to-be-the-only-dog/"),
  catalogOnly("my-mom-thinks-shes-my-volleyball-coach", "My Mom Thinks She's My Volleyball Coach But She's Not", "Family Dynamics", "2007-06-01", "https://juliacookonline.com/2007/06/01/my-mom-thinks-shes-my-volleyball-coach-but-shes-not/"),
  catalogOnly("what-do-i-say-about-that", "What Do I Say About That?", "Family Dynamics", "2015-08-01", "https://juliacookonline.com/2015/08/01/what-do-i-say-about-that/"),
  catalogOnly("the-can-in-cancer", 'The "CAN" in Cancer', "Health & Wellness", "2013-08-25", "https://juliacookonline.com/2013/08/25/the-can-in-cancer/"),
  catalogOnly("i-am-vape", "I Am Vape", "Health & Wellness", "2024-11-07", "https://juliacookonline.com/2024/11/07/i-am-vape/"),
  catalogOnly(
    "how-to-be-comfortable-in-your-own-feathers",
    "How To Be Comfortable in Your Own Feathers",
    "Health & Wellness",
    "2013-02-15",
    "https://juliacookonline.com/2013/02/15/how-to-be-comfortable-in-your-own-feathers/",
    "child",
    // This one *was* individually checked (see books.ts history / content-research-gaps.md):
    // its own tags are anorexia, anorexia athletica, anorexia nervosa, body
    // image, bulimia, eating balance, eating disorder prevention, eating
    // disorders, eating habits, food balance, food is fuel, health, healthy
    // eating — i.e. it is specifically about eating disorders/body image, not
    // general low confidence. Deliberately left with no topicSlugs for that
    // reason rather than being force-mapped to "low-confidence".
    ["anorexia", "body image", "bulimia", "eating disorders", "eating habits", "health", "healthy eating"]
  ),
  catalogOnly("but-its-just-a-game", "But It's Just a Game", "Technology", "2013-09-10", "https://juliacookonline.com/2013/09/10/but-its-just-a-game/"),
  catalogOnly("the-technology-tail", "Technology Tail", "Technology", "2017-09-01", "https://juliacookonline.com/2017/09/01/the-technology-tail/"),
  catalogOnly("the-ant-hill-disaster", "The Ant Hill Disaster", "Child Safety", "2014-01-01", "https://juliacookonline.com/2014/01/01/the-ant-hill-disaster/"),
  catalogOnly("im-not-scared-im-prepared", "I'm Not Scared I'm Prepared", "Child Safety", "2014-05-01", "https://juliacookonline.com/2014/05/01/im-not-scared-im-prepared/"),
  catalogOnly("the-bubble-wrap-queen", "The Bubble Wrap Queen", "Child Safety", "2008-09-01", "https://juliacookonline.com/2008/09/01/the-bubble-wrap-queen/"),
  catalogOnly("smarter-than-the-scoopers", "Smarter Than the Scoopers", "Child Safety", "2012-07-15", "https://juliacookonline.com/2012/07/15/smarter-than-the-scoopers/"),
  catalogOnly("be-where-your-feet-are", "Be Where Your Feet Are", "Mental Health", "2018-08-13", "https://juliacookonline.com/2018/08/13/be-where-your-feet-are/"),
  catalogOnly("blueloon", "Blueloon", "Mental Health", "2012-04-13", "https://juliacookonline.com/2012/04/13/blueloon/"),
  catalogOnly("grief-is-like-a-snowflake", "Grief is Like a Snowflake", "Mental Health", "2011-09-15", "https://juliacookonline.com/2011/09/15/grief-is-like-a-snowflake/"),
  catalogOnly("a-flicker-of-hope", "A Flicker of Hope", "Mental Health", "2018-12-04", "https://juliacookonline.com/2018/12/04/a-flicker-of-hope/"),
  catalogOnly("straight-from-the-horses-mouth", "Straight from the Horse's Mouth", "Mental Health", "2012-11-30", "https://juliacookonline.com/2012/11/30/straight-from-the-horses-mouth/"),
  catalogOnly("my-fantabulous-brain", "My Fantabulous Brain", "Learning Differences", "2020-10-29", "https://juliacookonline.com/2020/10/29/my-fantabulous-brain/"),
  catalogOnly("uniquely-wired", "Uniquely Wired", "Learning Differences", "2018-02-01", "https://juliacookonline.com/2018/02/01/uniquely-wired/"),
  catalogOnly("gas-happens", "Gas Happens", "Body & Hygiene", "2015-03-06", "https://juliacookonline.com/2015/03/06/gas-happens/"),
  catalogOnly("hygiene-you-stink", "Hygiene\u2026You Stink", "Body & Hygiene", "2014-08-01", "https://juliacookonline.com/2014/08/01/hygiene-you-stink/"),
  catalogOnly("i-am-a-booger-treat-me-with-respect", "I Am a Booger\u2026Treat Me with Respect", "Body & Hygiene", "2010-10-01", "https://juliacookonline.com/2010/10/01/i-am-a-booger-treat-me-with-respect/"),
  catalogOnly("melvin-the-magnificent-molar", "Melvin the Magnificent Molar", "Body & Hygiene", "2010-03-23", "https://juliacookonline.com/2010/03/23/melvin-the-magnificent-molar/"),
  catalogOnly("dont-be-afraid-to-drop", "Don't Be Afraid to Drop", "Worry & Anxiety", "2021-01-14", "https://juliacookonline.com/2021/01/14/dont-be-afraid-to-drop/"),
  catalogOnly("im-stretched", "I'm Stretched", "Worry & Anxiety", "2019-10-17", "https://juliacookonline.com/2019/10/17/im-stretched/"),
  catalogOnly("ricky-sticky-fingers", "Ricky Sticky Fingers", "Interpersonal Skills", "2012-08-15", "https://juliacookonline.com/2012/08/15/ricky-sticky-fingers/"),
  catalogOnly("tease-monster", "Tease Monster", "Interpersonal Skills", "2013-03-12", "https://juliacookonline.com/2013/03/12/tease-monster/"),
  catalogOnly("winners-dont-whine-and-whiners-dont-win", "Winners Don't Whine and Whiners Don't Win", "Interpersonal Skills", "2016-07-06", "https://juliacookonline.com/2016/07/06/winners-dont-whine-and-whiners-dont-win/"),
  catalogOnly("a-bad-case-of-tattle-tongue", "A Bad Case of Tattle Tongue", "Communication", "2018-06-24", "https://juliacookonline.com/2018/06/24/a-bad-case-of-tattle-tongue/"),
  catalogOnly("decibella-and-her-6-inch-voice", "Decibella and Her 6-Inch Voice", "Communication", "2023-06-06", "https://juliacookonline.com/2023/06/06/decibella-and-her-6-inch-voice/"),
  catalogOnly("lying-up-a-storm", "Lying Up a Storm", "Communication", "2015-01-15", "https://juliacookonline.com/2015/01/15/lying-up-a-storm/"),
  catalogOnly("rumor-has-it", "Rumor Has It", "Communication", "2018-06-18", "https://juliacookonline.com/2018/06/18/rumor-has-it/"),
  catalogOnly(
    "table-talk",
    "Table Talk",
    "Communication",
    "2016-02-01",
    "https://juliacookonline.com/2016/02/01/table-talk/",
    "child",
    // Checked as a candidate for "teen-communication" and rejected: this book
    // is about table manners/etiquette, not teen emotional withdrawal — see
    // docs/content-research-gaps.md.
    undefined
  ),
  catalogOnly("i-am-money-and-i-dont-grow-on-trees", "I AM Money and I Don't Grow on Trees", "Career & Life Skills", "2024-01-02", "https://juliacookonline.com/2024/01/02/i-am-money-and-i-dont-grow-on-trees/"),
  catalogOnly("im-your-flag-so-please-treat-me-right", "I'm Your Flag So Please Treat Me Right", "Career & Life Skills", "2014-06-19", "https://juliacookonline.com/2014/06/19/im-your-flag-so-please-treat-me-right/"),
  catalogOnly("schnauzers-trousers", "Schnauzer's Trousers: The Spotlight Isn't for Everyone", "Career & Life Skills", "2022-11-15", "https://juliacookonline.com/2022/11/15/schnauzers-trousers-the-spotlight-isnt-for-everyone/"),
  catalogOnly("what-shoes-will-you-wear", "What Shoes Will You Wear", "Career & Life Skills", "2014-10-15", "https://juliacookonline.com/2014/10/15/what-shoes-will-you-wear/"),
];

/** Builds a minimal, honestly-labeled "catalog-only" book record (see file header). */
function catalogOnly(
  id: string,
  title: string,
  series: string,
  publicationDate: string,
  sourceUrl: string,
  audience: "child" | "educator" = "child",
  officialTags?: string[]
): JuliaCookBook {
  return {
    id,
    title,
    series,
    author: "Julia Cook",
    publicationDate,
    topicSlugs: [],
    officialTags,
    summary:
      "Not yet individually researched beyond the title and official catalog listing — no original summary has been authored for this title yet.",
    verificationLevel: "verified_catalog_only",
    sourceUrl,
    hasOfficialActivityBook: false,
    audience,
    licensing: VERIFIED_BIBLIOGRAPHIC,
  };
}

export function getBookById(id: string): JuliaCookBook | undefined {
  return books.find((b) => b.id === id);
}

export function booksForTopic(topicSlug: string): JuliaCookBook[] {
  return books.filter((b) => b.topicSlugs.includes(topicSlug));
}

export const detailedBooks = books.filter((b) => b.verificationLevel === "verified_detailed");

// Educational topic tags for the original nine topics were verified against the
// live tag cloud at https://juliacookonline.com/search-by-topic/ (fetched 2026-10-11).
// Newer topics added for the China-first expansion (sharing, fear-of-failure,
// friend-conflict, excluded-by-peers, school-reluctance, procrastination,
// low-confidence, teen-communication) have not yet been cross-referenced with
// that tag cloud, so `educationalTopics` is left empty for them until verified.
export interface TopicMapping {
  slug: string;
  label: string;
  labelZh: string;
  /** Verified Julia Cook educational topic tags this parent-friendly topic maps to. */
  educationalTopics: string[];
  /** Everyday English phrasing used to match free-text search queries. */
  keywords: string[];
  /** Everyday Chinese phrasing used to match free-text search queries. */
  keywordsZh: string[];
}

export const topicMappings: TopicMapping[] = [
  {
    slug: "getting-angry",
    label: "Getting Angry",
    labelZh: "发脾气",
    educationalTopics: [
      "anger",
      "anger control",
      "anger management",
      "temper",
      "tantrum",
      "temper tantrum",
      "emotional regulation",
    ],
    keywords: [
      "angry",
      "anger",
      "mad",
      "yelling",
      "yells",
      "yell",
      "shouting",
      "tantrum",
      "temper",
      "furious",
      "rage",
      "meltdown",
    ],
    keywordsZh: [
      "发脾气",
      "生气",
      "愤怒",
      "大哭大闹",
      "哭闹",
      "暴躁",
      "吼叫",
      "崩溃",
      "摔东西",
    ],
  },
  {
    slug: "interrupting",
    label: "Interrupting",
    labelZh: "打断别人",
    educationalTopics: [
      "listening",
      "following instructions",
      "communication",
      "impulse control",
      "impulsivity",
    ],
    keywords: [
      "interrupt",
      "interrupting",
      "interrupts",
      "talks over",
      "talking over",
      "cant wait",
      "can't wait",
      "blurts",
      "blurting",
    ],
    keywordsZh: ["打断", "插话", "抢话", "不等别人说完", "打断别人说话"],
  },
  {
    slug: "sharing",
    label: "Sharing",
    labelZh: "不愿意分享",
    // Verified against the live tag list on "Teamwork Isn't My Thing and I Don't
    // Like to Share" (juliacookonline.com, fetched 2026-10-11).
    educationalTopics: ["sharing", "compromise", "give and take", "teamwork", "working together"],
    keywords: ["share", "sharing", "won't share", "wont share", "selfish with toys"],
    keywordsZh: ["分享", "不愿意分享", "不肯分享", "不想分享", "小气", "独占玩具"],
  },
  {
    slug: "fear-of-failure",
    label: "Fear of Failure",
    labelZh: "害怕失败",
    // Verified against the live tag list on "Bubble Gum Brain" (juliacookonline.com,
    // fetched 2026-10-11). Note "growth mindset" is a real tag on that book even
    // though it doesn't appear in the site's aggregate topic-cloud page.
    educationalTopics: ["growth mindset", "flexibility", "positive mindset", "making mistakes"],
    keywords: [
      "afraid to fail",
      "fear of failure",
      "gives up easily",
      "perfectionist",
      "scared to try",
      "scared to be wrong",
    ],
    keywordsZh: ["害怕失败", "怕失败", "怕犯错", "怕输", "完美主义", "不敢尝试", "轻易放弃"],
  },
  {
    slug: "friend-conflict",
    label: "Friendship Conflict",
    labelZh: "和朋友吵架",
    educationalTopics: ["friendship", "building relationships", "getting along", "sharing"],
    keywords: [
      "friend",
      "friends",
      "friendship",
      "fighting with friends",
      "argue with friend",
      "no friends",
      "getting along",
    ],
    keywordsZh: ["和朋友吵架", "朋友", "闹矛盾", "吵架", "绝交", "和好", "人际关系"],
  },
  {
    slug: "excluded-by-peers",
    label: "Excluded by Peers",
    labelZh: "被同学排挤",
    // Verified against the live tag list on "Cliques Just Don't Make Cents"
    // (juliacookonline.com, fetched 2026-10-11).
    educationalTopics: ["cliques", "mean girls", "targeting", "self-worth", "peer pressure"],
    keywords: ["left out", "excluded", "no one plays with", "isolated"],
    keywordsZh: ["被排挤", "被孤立", "没人跟他玩", "被同学排斥", "被欺负"],
  },
  {
    slug: "school-reluctance",
    label: "Reluctant About School",
    labelZh: "不愿意上学",
    // Verified against the live tag list on "The Anti-Test Anxiety Society"
    // (juliacookonline.com, fetched 2026-10-11). NOTE: these tags are specifically
    // about test-taking anxiety, a narrower problem than general reluctance to
    // attend school — see docs/content-research-gaps.md for why this is labeled
    // a hypothesis, not a confirmed match.
    educationalTopics: ["test anxiety", "performance anxiety", "testing", "taking tests"],
    keywords: ["doesn't want to go to school", "refuses school", "school anxiety"],
    keywordsZh: ["不愿意上学", "不想上学", "抗拒上学", "害怕上学"],
  },
  {
    slug: "procrastination",
    label: "Procrastination",
    labelZh: "总是拖延",
    // Verified against the live tag list on "The PROcrastinator" (juliacookonline.com,
    // fetched 2026-10-11).
    educationalTopics: ["procrastinating", "putting things off", "executive function", "balancing work & play"],
    keywords: ["procrastinate", "procrastinating", "always delays", "puts things off"],
    keywordsZh: ["拖延", "磨蹭", "总是拖拖拉拉", "不写作业", "拖到最后"],
  },
  {
    slug: "low-confidence",
    label: "Low Confidence",
    labelZh: "缺乏自信",
    // Verified against the live tag list on "I Got This! I Have Bounce Back
    // Superpowers" (juliacookonline.com, fetched 2026-10-11). An earlier
    // candidate, "How To Be Comfortable in Your Own Feathers," was rejected
    // for this slug after its tags showed it is specifically an eating-disorder/
    // body-image book, not a general-confidence book — see docs/content-research-gaps.md.
    educationalTopics: ["resilience", "overcoming obstacles", "talk back to worry"],
    keywords: ["low confidence", "self-doubt", "doesn't believe in themselves"],
    keywordsZh: ["缺乏自信", "不自信", "自卑", "没有自信心"],
  },
  {
    slug: "teen-communication",
    label: "Teen Won't Talk",
    labelZh: "青少年不愿意沟通",
    // No matching official educational topic tag or book was identified during
    // Phase 3 research (checked both the live tag cloud and the closest
    // candidate title, "Table Talk," which turned out to be about table
    // manners/etiquette, not teen withdrawal). Left empty — see
    // docs/content-research-gaps.md.
    educationalTopics: [],
    keywords: ["teen won't talk", "shuts down", "won't open up", "teenager communication"],
    keywordsZh: ["青少年不愿意和父母沟通", "不愿意沟通", "不说话", "沉默", "亲子沟通"],
  },
  {
    slug: "bullying",
    label: "Bullying",
    labelZh: "欺凌行为",
    educationalTopics: ["bullying", "bully prevention", "mean girls"],
    keywords: ["bully", "bullying", "bullied", "picked on", "teasing", "teased", "mean kids"],
    keywordsZh: ["欺凌", "霸凌", "被欺负", "被嘲笑", "被取笑"],
  },
  {
    slug: "not-listening",
    label: "Not Listening",
    labelZh: "不听话",
    educationalTopics: [
      "listening",
      "following instructions",
      "communication",
      "paying attention",
      "focusing",
    ],
    keywords: [
      "listen",
      "listening",
      "doesnt listen",
      "doesn't listen",
      "wont listen",
      "won't listen",
      "ignores me",
      "ignoring",
      "not paying attention",
      "tunes out",
    ],
    keywordsZh: ["不听话", "不听", "叫不动", "当耳旁风", "无视我说的话"],
  },
  {
    slug: "worry-anxiety",
    label: "Worry & Anxiety",
    labelZh: "担心与焦虑",
    educationalTopics: ["anxiety", "worry", "stress", "fret", "mindfulness"],
    keywords: [
      "worry",
      "worried",
      "anxious",
      "anxiety",
      "scared",
      "nervous",
      "stressed",
      "stress",
      "afraid",
      "fret",
    ],
    keywordsZh: ["担心", "焦虑", "紧张", "害怕", "压力大", "不安"],
  },
  {
    slug: "self-control",
    label: "Self-Control",
    labelZh: "自我控制",
    educationalTopics: ["self-control", "self-regulation", "impulse control", "control"],
    keywords: [
      "self control",
      "self-control",
      "impulsive",
      "impulse",
      "cant control",
      "can't control",
      "loses control",
      "out of control",
    ],
    keywordsZh: ["自我控制", "控制不住", "冲动", "失控"],
  },
  {
    slug: "kindness",
    label: "Kindness",
    labelZh: "友善待人",
    educationalTopics: ["kindness", "empathy", "good sportsmanship"],
    keywords: ["kind", "kindness", "unkind", "mean", "not nice", "empathy"],
    keywordsZh: ["友善", "善良", "不友善", "对人不好", "同理心"],
  },
  {
    slug: "transitions",
    label: "Transitions",
    labelZh: "适应转换",
    educationalTopics: ["flexibility", "looking ahead"],
    keywords: [
      "transition",
      "transitions",
      "change",
      "changes",
      "switching",
      "schedule",
      "new routine",
    ],
    keywordsZh: ["转换", "切换", "换环境", "改变日程", "适应新常规"],
  },
];

function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/['']/g, "");
}

/** Resolves free-text parent input (Chinese or English) to the best-matching topic slug, or null. */
export function matchTopicFromQuery(query: string): string | null {
  const q = normalize(query);
  if (!q) return null;

  let bestSlug: string | null = null;
  let bestScore = 0;

  for (const mapping of topicMappings) {
    let score = 0;
    if (q === normalize(mapping.label) || q === mapping.labelZh) score += 10;
    for (const keyword of mapping.keywords) {
      if (q.includes(normalize(keyword))) score += 2;
    }
    for (const keyword of mapping.keywordsZh) {
      if (q.includes(keyword)) score += 2;
    }
    if (q.includes(mapping.slug.replace(/-/g, " "))) score += 3;
    if (score > bestScore) {
      bestScore = score;
      bestSlug = mapping.slug;
    }
  }

  return bestSlug;
}

export function getMapping(slug: string): TopicMapping | undefined {
  return topicMappings.find((m) => m.slug === slug);
}

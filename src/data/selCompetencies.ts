export type SelCompetencyId =
  | "self-awareness"
  | "self-management"
  | "social-awareness"
  | "relationship-skills"
  | "responsible-decision-making";

export interface SelCompetency {
  id: SelCompetencyId;
  labelZh: string;
  labelEn: string;
  descriptionZh: string;
  descriptionEn: string;
  /** A short, concrete everyday-family-life example of this competency in action. */
  everydayExample: string;
  everydayExampleZh: string;
  /** How this competency tends to show up differently at a younger vs. older age. */
  youngerExample: string;
  youngerExampleZh: string;
  olderExample: string;
  olderExampleZh: string;
}

export const selCompetencies: SelCompetency[] = [
  {
    id: "self-awareness",
    labelZh: "自我认知",
    labelEn: "Self-Awareness",
    descriptionZh: "认识并说出自己的情绪、想法和需要，是孩子管理情绪的第一步。",
    descriptionEn:
      "Recognizing and naming one's own emotions, thoughts, and needs is the first step toward managing them.",
    everydayExample:
      "A child pausing mid-meltdown to say \"I'm frustrated\" instead of just yelling or shutting down.",
    everydayExampleZh: "孩子在情绪爆发的过程中停下来说\u201c我很烦躁\u201d，而不是只会大喊或闷不作声。",
    youngerExample: "Pointing to a feelings chart to show \"this is how I feel right now.\"",
    youngerExampleZh: "指着情绪图卡说\u201c我现在是这种感觉\u201d。",
    olderExample: "Recognizing that a snippy tone at dinner is really about a hard day at school.",
    olderExampleZh: "意识到晚饭时说话冲，其实是因为今天在学校过得不顺。",
  },
  {
    id: "self-management",
    labelZh: "自我管理",
    labelEn: "Self-Management",
    descriptionZh: "在感受强烈情绪时，依然能够调节行为、专注目标、完成任务。",
    descriptionEn:
      "Regulating behavior, staying focused, and following through even when emotions run high.",
    everydayExample: "Taking a few breaths before responding, instead of slamming a door right away.",
    everydayExampleZh: "在回应之前先深呼吸几次，而不是立刻摔门。",
    youngerExample: "Squeezing a soft toy for a few seconds before trying to use words.",
    youngerExampleZh: "先捏一捏软玩具几秒钟，再试着用语言表达。",
    olderExample: "Stepping away from a group chat for ten minutes before replying to something upsetting.",
    olderExampleZh: "在群聊里看到让自己不开心的消息后，先离开手机十分钟再回复。",
  },
  {
    id: "social-awareness",
    labelZh: "社会认知",
    labelEn: "Social Awareness",
    descriptionZh: "理解他人的感受和视角，尊重与自己不同的背景和想法。",
    descriptionEn:
      "Understanding others' feelings and perspectives, and respecting different backgrounds and viewpoints.",
    everydayExample: "Noticing that a sibling looks left out and inviting them to join in, unprompted.",
    everydayExampleZh: "注意到兄弟姐妹看起来被冷落了，主动邀请对方一起玩。",
    youngerExample: "Patting a crying friend on the back, even without knowing exactly why they're upset.",
    youngerExampleZh: "即使不完全明白朋友为什么难过，也会轻拍对方的背表示安慰。",
    olderExample: "Considering how a joke might land differently with a friend who's having a hard week.",
    olderExampleZh: "考虑到朋友这周过得不顺，一句玩笑话可能会让对方有不同的感受。",
  },
  {
    id: "relationship-skills",
    labelZh: "人际关系技能",
    labelEn: "Relationship Skills",
    descriptionZh: "建立并维护健康的关系，包括沟通、合作与化解冲突。",
    descriptionEn:
      "Building and maintaining healthy relationships through communication, cooperation, and conflict resolution.",
    everydayExample: "Working out with a sibling who gets to pick the game first, without an adult stepping in.",
    everydayExampleZh: "和兄弟姐妹自己商量好谁先选游戏，不需要大人介入。",
    youngerExample: "Taking turns holding hands while crossing the street, without being told every time.",
    youngerExampleZh: "过马路时主动轮流牵手，不需要每次都被提醒。",
    olderExample: "Sending a short text to patch things up with a friend after an argument.",
    olderExampleZh: "和朋友吵架后，主动发一条简短的信息修复关系。",
  },
  {
    id: "responsible-decision-making",
    labelZh: "负责任的决策",
    labelEn: "Responsible Decision-Making",
    descriptionZh: "根据安全、道德和他人感受，做出建设性的选择。",
    descriptionEn:
      "Making constructive choices based on safety, ethics, and consideration for others.",
    everydayExample: "Choosing to tell a parent about a broken vase right away instead of hiding it.",
    everydayExampleZh: "打碎花瓶后，主动第一时间告诉家长，而不是藏起来。",
    youngerExample: "Deciding to put a toy back rather than hide it when asked to clean up.",
    youngerExampleZh: "在被要求收拾时，选择把玩具放回原位，而不是藏起来。",
    olderExample: "Weighing whether to join a group decision that could get someone in trouble.",
    olderExampleZh: "在是否要跟着朋友一起做某件可能让人惹麻烦的事之前，先权衡一下。",
  },
];

export function getCompetency(id: SelCompetencyId): SelCompetency | undefined {
  return selCompetencies.find((c) => c.id === id);
}

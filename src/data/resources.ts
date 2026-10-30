import { ORIGINAL_DEMO, RESTRICTED_PENDING_RIGHTS, VERIFIED_BIBLIOGRAPHIC } from "../content/licensing";
import { matchTopicFromQuery } from "./topicMappings";
import type { Filters, Resource } from "../types";

/**
 * Prototype resource catalog. Every entry carries licensing metadata (see
 * src/content/types.ts). Only `my-mouth-is-a-volcano` is a real, verified
 * Julia Cook work — its sourceUrl was confirmed against juliacookonline.com.
 * Everything else is original demonstration content and is explicitly *not*
 * attributed to Julia Cook (see docs/content-model.md and
 * docs/licensing-architecture.md).
 */
export const resources: Resource[] = [
  {
    id: "big-feelings-are-normal",
    title: "Big Feelings are Normal",
    titleZh: "大情绪也很正常",
    description: "A short demo video concept about why kids get angry and how to respond.",
    descriptionZh: "一个关于孩子为什么会生气、以及如何回应的演示视频概念。",
    type: "video",
    topics: ["getting-angry"],
    skills: ["emotions"],
    settings: ["home", "classroom"],
    selCompetencies: ["self-awareness", "self-management"],
    duration: "4:12",
    content:
      "This is a demonstration video concept only (no video file exists in this prototype) walking through why anger shows up in kids and simple ways to respond in the moment.",
    contentZh: "这只是一个演示性的视频概念（本原型中没有实际视频文件），内容是孩子为什么会生气，以及当下可以如何回应。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "calm-down-toolbox",
    title: "Calm Down Toolbox",
    titleZh: "冷静工具箱",
    description: "A simple, hands-on activity you can do at home.",
    descriptionZh: "一个可以在家进行的简单动手活动。",
    type: "activity",
    topics: ["getting-angry", "self-control"],
    skills: ["self-control", "emotions"],
    settings: ["home"],
    selCompetencies: ["self-management"],
    content:
      "Build a small box of calming tools together — a stress ball, a breathing card, and a favorite photo.",
    contentZh: "和孩子一起准备一个小盒子，装上解压球、呼吸提示卡和一张喜欢的照片。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "my-mouth-is-a-volcano",
    title: "My Mouth Is a Volcano!",
    titleZh: "我的嘴巴是座火山！",
    description: "A real Julia Cook story about learning to manage the urge to interrupt.",
    descriptionZh: "Julia Cook 的真实作品，讲述孩子如何学习管理打断别人的冲动。",
    type: "book",
    topics: ["interrupting"],
    skills: ["self-control", "communication"],
    settings: ["home", "classroom"],
    selCompetencies: ["self-management", "relationship-skills"],
    language: ["en"],
    content:
      "Verified bibliographic metadata only — this app does not reproduce the book's text or illustrations. The story follows a boy named Louis who learns a technique for holding onto his words until it's his turn to speak.",
    contentZh:
      "仅展示已核实的书目信息——本应用不会复制书中的文字或插图。故事讲述男孩 Louis 学习如何\u201c存住\u201d想说的话，直到轮到自己发言。",
    sourceUrl: "https://juliacookonline.com/2005/01/01/my-mouth-is-a-volcano/",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "feeling-thermometer",
    title: "Feeling Thermometer",
    titleZh: "情绪温度计",
    description: "A visual tool to help kids identify and express feelings.",
    descriptionZh: "一个帮助孩子识别和表达情绪的可视化工具。",
    type: "printable",
    topics: ["getting-angry", "worry-anxiety"],
    skills: ["emotions"],
    settings: ["home", "classroom"],
    selCompetencies: ["self-awareness"],
    content:
      "Print and color this thermometer with your child to talk about how big a feeling is getting.",
    contentZh: "和孩子一起打印并涂色这个温度计，聊聊情绪\u201c有多大\u201d。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "breathing-buddies",
    title: "Breathing Buddies",
    titleZh: "呼吸小伙伴",
    description: "A calming breathing exercise for anxious moments.",
    descriptionZh: "一个在焦虑时刻可以使用的平静呼吸练习。",
    type: "video",
    topics: ["worry-anxiety", "self-control"],
    skills: ["emotions", "self-control"],
    settings: ["home"],
    selCompetencies: ["self-management"],
    duration: "3:05",
    content:
      "A demonstration video concept only (no video file exists in this prototype) — a short guided breathing sequence kids can follow along with.",
    contentZh: "这只是一个演示性的视频概念（本原型中没有实际视频文件）——一个简短的引导式呼吸练习。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "waiting-my-turn",
    title: "Waiting My Turn Cards",
    titleZh: "等待轮到我卡片",
    description: "Simple cue cards to practice patience before speaking.",
    descriptionZh: "简单的提示卡，帮助孩子练习说话前的耐心等待。",
    type: "printable",
    topics: ["interrupting"],
    skills: ["communication", "self-control"],
    settings: ["classroom"],
    selCompetencies: ["self-management"],
    content: "Print these cards to help kids practice waiting for a pause in conversation.",
    contentZh: "打印这些卡片，帮助孩子练习在对话中等待停顿。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "listening-ears-game",
    title: "Listening Ears Game",
    titleZh: "倾听耳朵游戏",
    description: "A quick game that rewards focused listening.",
    descriptionZh: "一个奖励专注倾听的快速小游戏。",
    type: "activity",
    topics: ["not-listening"],
    skills: ["communication"],
    settings: ["home", "classroom"],
    selCompetencies: ["self-management"],
    content: "A playful way to practice listening the first time it's asked.",
    contentZh: "用有趣的方式练习\u201c第一次就听到\u201d。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "the-worry-workbook",
    title: "The Worry Workbook",
    titleZh: "担心练习册",
    description: "An original demo concept — pages to help kids name and shrink their worries.",
    descriptionZh: "一个原创的演示概念——帮助孩子命名并缩小担心的练习页面。",
    type: "book",
    topics: ["worry-anxiety"],
    skills: ["emotions"],
    settings: ["home"],
    selCompetencies: ["self-awareness"],
    content:
      "This is an original demonstration concept for this prototype, not an actual Julia Cook publication.",
    contentZh: "这是本原型的原创演示概念，并非真实出版的 Julia Cook 作品。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "friendship-repair-kit",
    title: "Friendship Repair Kit",
    titleZh: "友谊修复工具包",
    description: "Steps to help kids make up after a disagreement.",
    descriptionZh: "帮助孩子在争执后和好的步骤。",
    type: "activity",
    topics: ["friend-conflict"],
    skills: ["friendship", "empathy"],
    settings: ["both"],
    selCompetencies: ["social-awareness", "relationship-skills"],
    content: "A simple framework kids can use to repair a friendship after a conflict.",
    contentZh: "一个简单的框架，帮助孩子在朋友间发生矛盾后进行修复。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "stand-up-stories",
    title: "Stand Up Stories",
    titleZh: "勇敢发声的故事",
    description: "An original demo concept — stories about recognizing and responding to bullying.",
    descriptionZh: "一个原创的演示概念——关于识别和应对欺凌的故事。",
    type: "book",
    topics: ["bullying"],
    skills: ["empathy", "communication"],
    settings: ["both"],
    selCompetencies: ["social-awareness", "relationship-skills"],
    content:
      "This is an original demonstration concept for this prototype, not an actual Julia Cook publication.",
    contentZh: "这是本原型的原创演示概念，并非真实出版的 Julia Cook 作品。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "kindness-jar",
    title: "Kindness Jar",
    titleZh: "友善罐子",
    description: "A visual way to track small acts of kindness.",
    descriptionZh: "一个记录小小善举的可视化方式。",
    type: "activity",
    topics: ["kindness"],
    skills: ["empathy"],
    settings: ["home", "classroom"],
    selCompetencies: ["social-awareness"],
    content: "Fill a jar with notes each time your child does something kind.",
    contentZh: "每次孩子做了友善的事，就在罐子里放一张小纸条。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "ready-set-go-schedule",
    title: "Ready, Set, Go! Schedule Cards",
    titleZh: "预备，开始！日程卡片",
    description: "Visual cards to make transitions easier to predict.",
    descriptionZh: "让转换更容易预测的可视化卡片。",
    type: "printable",
    topics: ["transitions"],
    skills: ["self-control", "communication"],
    settings: ["home", "classroom"],
    selCompetencies: ["self-management"],
    content: "Print and arrange these cards to preview the next transition.",
    contentZh: "打印并排列这些卡片，提前预告接下来的转换。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "sharing-steps-cards",
    title: "Turn-Taking Steps Cards",
    titleZh: "轮流分享步骤卡",
    description: "A simple step-by-step card set for practicing sharing and turn-taking.",
    descriptionZh: "一套用于练习分享和轮流的简单步骤卡片。",
    type: "printable",
    topics: ["sharing"],
    skills: ["self-control", "friendship"],
    settings: ["home", "classroom"],
    selCompetencies: ["relationship-skills", "responsible-decision-making"],
    content: "Print these cards to walk through asking for a turn, waiting, and trading back.",
    contentZh: "打印这些卡片，带孩子练习\u201c请求轮流\u201d\u201c等待\u201d和\u201c交换回去\u201d。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "brave-mistakes-cards",
    title: "Brave Mistakes Cards",
    titleZh: "勇敢犯错卡片",
    description: "Prompt cards that celebrate trying, not just getting it right.",
    descriptionZh: "庆祝\u201c尝试\u201d而不只是\u201c做对\u201d的提示卡片。",
    type: "activity",
    topics: ["fear-of-failure"],
    skills: ["emotions", "problem-solving"],
    settings: ["home", "classroom"],
    selCompetencies: ["self-awareness", "responsible-decision-making"],
    content: "Each card describes a small brave attempt your child can try and reflect on.",
    contentZh: "每张卡片描述一个孩子可以尝试并回顾的小小勇敢行动。",
    licensing: ORIGINAL_DEMO,
  },
  {
    id: "friend-conflict-check-in",
    title: "Friendship Check-In Cards",
    titleZh: "友谊状态检查卡",
    description: "Conversation starter cards for talking through a disagreement with a friend.",
    descriptionZh: "用于和朋友讨论矛盾的对话启动卡片。",
    type: "printable",
    topics: ["friend-conflict"],
    skills: ["friendship", "empathy"],
    settings: ["both"],
    selCompetencies: ["social-awareness", "relationship-skills"],
    content: "Use these prompts to help your child talk through what happened and what's next.",
    contentZh: "用这些提示帮助孩子聊聊发生了什么，以及接下来可以怎么做。",
    licensing: ORIGINAL_DEMO,
  },
  // Fixture resource used to exercise and test the "restricted content" path
  // (hidden from search/listing; shown with a friendly unavailable message
  // only if a direct link somehow resolves it). Not real content.
  {
    id: "partner-video-pending-rights",
    title: "Partner Video (Rights Pending)",
    titleZh: "合作伙伴视频（版权确认中）",
    description: "Placeholder for a future licensed-partner video not yet cleared for any territory.",
    descriptionZh: "占位条目，代表尚未获得任何地区授权的未来合作伙伴视频。",
    type: "video",
    topics: ["getting-angry"],
    skills: ["emotions"],
    settings: ["home"],
    content: "Not available. This placeholder exists only to test licensing enforcement.",
    contentZh: "暂不可用。此占位条目仅用于测试版权控制逻辑。",
    licensing: RESTRICTED_PENDING_RIGHTS,
  },
];

export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export function resourcesForTopic(topicSlug: string, type?: Resource["type"]): Resource[] {
  return resources.filter(
    (r) => r.topics.includes(topicSlug) && (!type || r.type === type)
  );
}

export function searchResources(options: {
  query?: string;
  topic?: string | null;
  filters?: Filters;
}): Resource[] {
  const query = options.query?.trim().toLowerCase() ?? "";
  const topic = options.topic ?? null;
  const filters = options.filters;
  const queryWords = query.split(/\s+/).filter((w) => w.length > 2);
  // Everyday phrasing ("my child keeps yelling" or "孩子总是发脾气") resolves to
  // a parent-friendly topic even when the words don't appear verbatim.
  const matchedTopicSlug = query ? matchTopicFromQuery(query) : null;

  return resources.filter((r) => {
    if (topic && !r.topics.includes(topic)) return false;

    if (query) {
      const topicWords = r.topics.map((t) => t.replace(/-/g, " ")).join(" ");
      const haystack = `${r.title} ${r.titleZh ?? ""} ${r.description} ${r.descriptionZh ?? ""} ${topicWords}`.toLowerCase();
      const matchesQuery =
        haystack.includes(query) ||
        queryWords.some((w) => haystack.includes(w)) ||
        (matchedTopicSlug !== null && r.topics.includes(matchedTopicSlug));
      if (!matchesQuery) return false;
    }

    if (filters?.types.length && !filters.types.includes(r.type)) return false;

    if (filters?.setting && !r.settings.includes(filters.setting) && !r.settings.includes("both")) {
      return false;
    }

    if (filters?.skills.length && !filters.skills.some((skill) => r.skills.includes(skill))) {
      return false;
    }

    return true;
  });
}

import type { Locale } from "../i18n";
import type { ResourceType, Setting, Skill } from "../types";

const typeLabels: Record<Locale, Record<ResourceType, string>> = {
  en: { video: "Videos", activity: "Activities", book: "Books", printable: "Printables" },
  zh: { video: "视频", activity: "活动", book: "图书", printable: "可打印资料" },
};

const settingLabels: Record<Locale, Record<Setting, string>> = {
  en: { home: "Home", classroom: "Classroom", both: "Both" },
  zh: { home: "家庭", classroom: "课堂", both: "均适用" },
};

const skillLabels: Record<Locale, Record<Skill, string>> = {
  en: {
    emotions: "Emotions",
    communication: "Communication",
    friendship: "Friendship",
    "self-control": "Self-Control",
    empathy: "Empathy",
    "problem-solving": "Problem Solving",
  },
  zh: {
    emotions: "情绪",
    communication: "沟通",
    friendship: "友谊",
    "self-control": "自我控制",
    empathy: "同理心",
    "problem-solving": "解决问题",
  },
};

export function typeLabel(type: ResourceType, locale: Locale): string {
  return typeLabels[locale][type];
}

export function settingLabel(setting: Setting, locale: Locale): string {
  return settingLabels[locale][setting];
}

export function skillLabel(skill: Skill, locale: Locale): string {
  return skillLabels[locale][skill];
}

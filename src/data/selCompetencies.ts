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
}

export const selCompetencies: SelCompetency[] = [
  {
    id: "self-awareness",
    labelZh: "自我认知",
    labelEn: "Self-Awareness",
    descriptionZh: "认识并说出自己的情绪、想法和需要，是孩子管理情绪的第一步。",
    descriptionEn:
      "Recognizing and naming one's own emotions, thoughts, and needs is the first step toward managing them.",
  },
  {
    id: "self-management",
    labelZh: "自我管理",
    labelEn: "Self-Management",
    descriptionZh: "在感受强烈情绪时，依然能够调节行为、专注目标、完成任务。",
    descriptionEn:
      "Regulating behavior, staying focused, and following through even when emotions run high.",
  },
  {
    id: "social-awareness",
    labelZh: "社会认知",
    labelEn: "Social Awareness",
    descriptionZh: "理解他人的感受和视角，尊重与自己不同的背景和想法。",
    descriptionEn:
      "Understanding others' feelings and perspectives, and respecting different backgrounds and viewpoints.",
  },
  {
    id: "relationship-skills",
    labelZh: "人际关系技能",
    labelEn: "Relationship Skills",
    descriptionZh: "建立并维护健康的关系，包括沟通、合作与化解冲突。",
    descriptionEn:
      "Building and maintaining healthy relationships through communication, cooperation, and conflict resolution.",
  },
  {
    id: "responsible-decision-making",
    labelZh: "负责任的决策",
    labelEn: "Responsible Decision-Making",
    descriptionZh: "根据安全、道德和他人感受，做出建设性的选择。",
    descriptionEn:
      "Making constructive choices based on safety, ethics, and consideration for others.",
  },
];

export function getCompetency(id: SelCompetencyId): SelCompetency | undefined {
  return selCompetencies.find((c) => c.id === id);
}

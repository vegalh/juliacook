/**
 * UI chrome string dictionary. Educational/content copy (situations, activities,
 * resource metadata) lives in `src/data/*` as bilingual records instead, since
 * that content is authored per-item rather than as reusable interface strings.
 */
export type Locale = "zh" | "en";

export const locales: Locale[] = ["zh", "en"];

export const localeLabels: Record<Locale, string> = {
  zh: "简体中文",
  en: "English",
};

export interface TranslationDictionary {
  nav: {
    home: string;
    learn: string;
    practice: string;
    library: string;
    saved: string;
    profile: string;
  };
  common: {
    searchPlaceholder: string;
    filter: string;
    reset: string;
    showResults: string;
    resultsCount: string;
    resultCount: string;
    noResults: string;
    back: string;
    profile: string;
    language: string;
    ageGroup: string;
    demoNotice: string;
    verifiedMetadataNotice: string;
    sourceLink: string;
    seeAll: string;
    voiceSearch: string;
    setting: string;
    skillArea: string;
    readAloud: string;
    saveItem: string;
    removeSavedItem: string;
  };
  ageGroups: {
    title: string;
    "3-6": string;
    "6-10": string;
    "10-12": string;
    "13+": string;
  };
  home: {
    title: string;
    subtitle: string;
    tryExample: string;
  };
  situation: {
    yourSituation: string;
    understandTitle: string;
    respondTitle: string;
    trySayingTitle: string;
    trySayingLessHelpful: string;
    trySayingMoreHelpful: string;
    learnTitle: string;
    practiceTitle: string;
    relatedTitle: string;
    relatedEmpty: string;
    reflectTitle: string;
    reflectPlaceholder: string;
    reflectSave: string;
    reflectSaved: string;
    reflectPrivacyNote: string;
    watch: string;
    watchDesc: string;
    play: string;
    playDesc: string;
    read: string;
    readDesc: string;
    exploreMore: string;
    disclaimer: string;
  };
  learn: {
    title: string;
    subtitle: string;
  };
  practice: {
    title: string;
    subtitle: string;
    goal: string;
    suggestedAge: string;
    timeRequired: string;
    materials: string;
    instructions: string;
    parentLanguage: string;
    reflectionQuestions: string;
  };
  library: {
    title: string;
    subtitle: string;
    byChallenge: string;
    byCompetency: string;
    byAge: string;
    byType: string;
    metadataOnlyNotice: string;
  };
  saved: {
    title: string;
    empty: string;
    savedSituations: string;
    savedResources: string;
    savedReflections: string;
  };
  profile: {
    title: string;
    about: string;
    contact: string;
    privacy: string;
    brandingNotice: string;
  };
  licensing: {
    statusOriginal: string;
    statusPublicMetadata: string;
    statusLicensedPending: string;
    statusLicensedApproved: string;
    statusRestricted: string;
    statusUnknown: string;
    restrictedMessage: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  zh: {
    nav: {
      home: "首页",
      learn: "理解孩子",
      practice: "一起试试看",
      library: "资源库",
      saved: "收藏",
      profile: "我的",
    },
    common: {
      searchPlaceholder: "今天遇到了什么？",
      filter: "筛选",
      reset: "重置",
      showResults: "查看结果",
      resultsCount: "{count} 个结果",
      resultCount: "1 个结果",
      noResults: "暂时没有匹配的内容，试试换个说法或调整筛选条件。",
      back: "返回",
      profile: "个人中心",
      language: "语言",
      ageGroup: "孩子年龄段",
      demoNotice: "示范内容 · 待编辑审核",
      verifiedMetadataNotice: "已核实的资源信息",
      sourceLink: "查看原始资源",
      seeAll: "查看全部",
      voiceSearch: "语音搜索",
      setting: "使用场景",
      skillArea: "能力领域",
      readAloud: "朗读",
      saveItem: "收藏",
      removeSavedItem: "取消收藏",
    },
    ageGroups: {
      title: "孩子的年龄段",
      "3-6": "3–6 岁",
      "6-10": "6–10 岁",
      "10-12": "10–12 岁",
      "13+": "13 岁以上",
    },
    home: {
      title: "今天遇到了\n什么？",
      subtitle: "搜索日常育儿难题，获取理解孩子、马上能用的实用建议。",
      tryExample: "常见问题",
    },
    situation: {
      yourSituation: "当前情况",
      understandTitle: "理解孩子",
      respondTitle: "现在可以怎么做？",
      trySayingTitle: "换一种说法",
      trySayingLessHelpful: "可能不太有效",
      trySayingMoreHelpful: "可以试试这样说",
      learnTitle: "了解背后的 SEL 能力",
      practiceTitle: "一起练习",
      relatedTitle: "相关资源",
      relatedEmpty: "暂无已核实的相关资源。",
      reflectTitle: "记录一点发现",
      reflectPlaceholder: "今天你注意到了什么？（不会被分享，也不会记录孩子的身份信息）",
      reflectSave: "保存记录",
      reflectSaved: "已保存到本机",
      reflectPrivacyNote: "记录仅保存在本设备上，我们不会收集孩子的身份信息。",
      watch: "观看",
      watchDesc: "看看实际场景",
      play: "练习",
      playDesc: "试试简单活动",
      read: "阅读",
      readDesc: "了解相关故事",
      exploreMore: "查看更多相关内容 →",
      disclaimer: "以下建议基于常见的儿童发展规律，并非适用于所有孩子的唯一答案。",
    },
    learn: {
      title: "理解孩子",
      subtitle: "通过五大社会情感能力，了解孩子行为背后的原因。",
    },
    practice: {
      title: "一起试试看",
      subtitle: "原创、可在家中立即尝试的亲子练习活动。",
      goal: "练习目标",
      suggestedAge: "建议年龄",
      timeRequired: "所需时间",
      materials: "所需材料",
      instructions: "操作步骤",
      parentLanguage: "家长可以这样说",
      reflectionQuestions: "练习后可以聊聊",
    },
    library: {
      title: "Julia Cook 资源库",
      subtitle: "按育儿难题、能力、年龄段或类型，发现已核实的 Julia Cook 资源。",
      byChallenge: "按育儿难题",
      byCompetency: "按 SEL 能力",
      byAge: "按年龄段",
      byType: "按资源类型",
      metadataOnlyNotice:
        "目前展示的是已核实的资源信息和授权外部链接，完整内容将在获得正式合作许可后提供。",
    },
    saved: {
      title: "收藏",
      empty: "收藏的情况和资源会显示在这里。",
      savedSituations: "收藏的情况",
      savedResources: "收藏的资源",
      savedReflections: "我的记录",
    },
    profile: {
      title: "我的",
      about: "关于 Cookie Bytes by Julia",
      contact: "联系支持",
      privacy: "隐私政策",
      brandingNotice:
        "Cookie Bytes by Julia 目前为开发演示版本，尚未获得官方授权认证；一旦获得授权文件，将启用正式品牌标识。",
    },
    licensing: {
      statusOriginal: "原创内容",
      statusPublicMetadata: "公开元数据",
      statusLicensedPending: "授权确认中",
      statusLicensedApproved: "已授权",
      statusRestricted: "受限内容",
      statusUnknown: "权利状态未知",
      restrictedMessage: "此资源的完整内容暂不可用，正在等待版权确认。",
    },
  },
  en: {
    nav: {
      home: "Home",
      learn: "Learn",
      practice: "Practice",
      library: "Library",
      saved: "Saved",
      profile: "Profile",
    },
    common: {
      searchPlaceholder: "What's happening with your child?",
      filter: "Filter",
      reset: "Reset",
      showResults: "Show Results",
      resultsCount: "{count} results",
      resultCount: "1 result",
      noResults: "No resources match yet. Try adjusting your search or filters.",
      back: "Back",
      profile: "Profile",
      language: "Language",
      ageGroup: "Child's age group",
      demoNotice: "Demonstration content \u00b7 pending editorial review",
      verifiedMetadataNotice: "Verified resource metadata",
      sourceLink: "View original resource",
      seeAll: "See all",
      voiceSearch: "Voice search",
      setting: "Setting",
      skillArea: "Skill Area",
      readAloud: "Read aloud",
      saveItem: "Save",
      removeSavedItem: "Remove from saved",
    },
    ageGroups: {
      title: "Child's age group",
      "3-6": "3\u20136 years",
      "6-10": "6\u201310 years",
      "10-12": "10\u201312 years",
      "13+": "13+ years",
    },
    home: {
      title: "What's happening\ntoday?",
      subtitle: "Search everyday parenting moments for practical, understanding-first guidance.",
      tryExample: "Try an example",
    },
    situation: {
      yourSituation: "Your situation",
      understandTitle: "Understand your child",
      respondTitle: "What can you do right now?",
      trySayingTitle: "Try saying this instead",
      trySayingLessHelpful: "Less helpful",
      trySayingMoreHelpful: "More constructive",
      learnTitle: "Learn the SEL skill behind this",
      practiceTitle: "Practice together",
      relatedTitle: "Related resources",
      relatedEmpty: "No verified related resources yet.",
      reflectTitle: "Jot down a reflection",
      reflectPlaceholder:
        "What did you notice today? (Stays on this device \u2014 no information about your child is collected.)",
      reflectSave: "Save reflection",
      reflectSaved: "Saved on this device",
      reflectPrivacyNote:
        "Reflections stay on this device only. We don't collect identifying information about children.",
      watch: "Watch",
      watchDesc: "See it in action",
      play: "Play",
      playDesc: "Try a simple activity",
      read: "Read",
      readDesc: "Explore a story",
      exploreMore: "Explore more for this moment \u2192",
      disclaimer:
        "These suggestions reflect common patterns in child development, not a single guaranteed answer for every child.",
    },
    learn: {
      title: "Understand Your Child",
      subtitle: "Five social-emotional learning competencies behind everyday behavior.",
    },
    practice: {
      title: "Let's Try It",
      subtitle: "Original, practical activities you can try with your child right away.",
      goal: "Learning goal",
      suggestedAge: "Suggested age",
      timeRequired: "Time required",
      materials: "Materials",
      instructions: "Instructions",
      parentLanguage: "Parent language",
      reflectionQuestions: "Reflection questions",
    },
    library: {
      title: "Julia Cook Resource Library",
      subtitle: "Discover verified Julia Cook resources by challenge, skill, age, or type.",
      byChallenge: "By parenting challenge",
      byCompetency: "By SEL competency",
      byAge: "By age group",
      byType: "By resource type",
      metadataOnlyNotice:
        "This view shows verified metadata and authorized external links. Full content will be available once a formal licensing agreement is confirmed.",
    },
    saved: {
      title: "Saved",
      empty: "Save situations and resources to find them here later.",
      savedSituations: "Saved situations",
      savedResources: "Saved resources",
      savedReflections: "My reflections",
    },
    profile: {
      title: "Profile",
      about: "About Cookie Bytes by Julia",
      contact: "Contact Support",
      privacy: "Privacy Policy",
      brandingNotice:
        "Cookie Bytes by Julia is currently a development/demo build and is not yet officially authorized or endorsed. Official branding will be enabled once authorization is documented.",
    },
    licensing: {
      statusOriginal: "Original content",
      statusPublicMetadata: "Public metadata",
      statusLicensedPending: "Licensing pending verification",
      statusLicensedApproved: "Licensed \u2014 approved",
      statusRestricted: "Restricted",
      statusUnknown: "Rights status unknown",
      restrictedMessage: "This resource's full content isn't available yet, pending rights confirmation.",
    },
  },
};

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
    discover: string;
    activities: string;
    my: string;
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
    featuredStoryEyebrow: string;
    featuredStoryTitle: string;
    featuredActivityEyebrow: string;
    featuredActivityTitle: string;
    languageLabEyebrow: string;
    languageLabTitle: string;
    languageLabCta: string;
    quickAccessTitle: string;
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
    everydayTitle: string;
    ageExamplesTitle: string;
    activityTitle: string;
    tryActivity: string;
    expand: string;
    collapse: string;
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
    noticeTitle: string;
    noMaterials: string;
    disclaimer: string;
    languageLabCardTitle: string;
    languageLabCardDesc: string;
  };
  explorer: {
    prompt: string;
    selectPrompt: string;
    tryAnother: string;
    nextScenario: string;
    communicatesTitle: string;
    childInterpretsTitle: string;
    cooperationTitle: string;
    alternativeTitle: string;
    tryThis: string;
    reflectionNote: string;
  };
  languageLab: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterYounger: string;
    filterTeen: string;
    filterGeneral: string;
    shuffle: string;
  };
  discover: {
    title: string;
    subtitle: string;
    modeTopics: string;
    modeStories: string;
    modeResources: string;
    byChallenge: string;
    byAge: string;
    byType: string;
    metadataOnlyNotice: string;
    booksHeading: string;
    storiesSubtitle: string;
    storiesBySeriesTitle: string;
    noSeriesLabel: string;
    seriesBookCount: string;
    resourcesSubtitle: string;
    formatComingSoon: string;
  };
  activities: {
    title: string;
    subtitle: string;
    filter: {
      all: string;
      "no-materials": string;
      quick: string;
      younger: string;
      teen: string;
    };
    printablesCardTitle: string;
    printablesCardDesc: string;
  };
  my: {
    title: string;
    tab: {
      saved: string;
      recent: string;
      reflections: string;
      settings: string;
    };
    savedEmpty: string;
    savedSituations: string;
    savedStories: string;
    savedActivities: string;
    savedResources: string;
    recentEmpty: string;
    recentClear: string;
    recentSituation: string;
    recentBook: string;
    recentResource: string;
    recentActivity: string;
    reflectionsEmpty: string;
    settings: {
      about: string;
      contact: string;
      privacy: string;
    };
    brandingNotice: string;
  };
  viewer: {
    unavailableNote: string;
    audioLabel: string;
    openInNewTab: string;
    quizProgress: string;
    quizScore: string;
    quizNext: string;
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
  book: {
    eyebrow: string;
    notFound: string;
    verifiedDetailed: string;
    verifiedCatalogOnly: string;
    catalogOnlyNotice: string;
    seriesLabel: string;
    authorLabel: string;
    publisherLabel: string;
    isbnLabel: string;
    agesLabel: string;
    whatChildrenMayLearnTitle: string;
    relatedSituationsTitle: string;
    relatedSituationsEmpty: string;
    resourcesTitle: string;
    resourcesEmpty: string;
    accessPurchaseRequired: string;
    accessFreeLink: string;
    accessSubscription: string;
    hypothesisNote: string;
    educatorAudienceNote: string;
    relatedBooksTitle: string;
    relatedBooksEmpty: string;
    listenTitle: string;
    watchTitle: string;
    practiceSectionTitle: string;
    printTitle: string;
    parentGuidanceTitle: string;
    posterTitle: string;
    quizTitle: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  zh: {
    nav: {
      home: "首页",
      discover: "探索",
      activities: "一起玩",
      my: "我的",
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
      featuredStoryEyebrow: "本周绘本",
      featuredStoryTitle: "来读一本 Julia Cook 的书",
      featuredActivityEyebrow: "推荐活动",
      featuredActivityTitle: "今天可以一起试试这个",
      languageLabEyebrow: "试试互动练习",
      languageLabTitle: "换一种说法",
      languageLabCta: "查看更多情境 →",
      quickAccessTitle: "快速入口",
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
      everydayTitle: "在日常家庭生活中",
      ageExamplesTitle: "不同年龄段的表现",
      activityTitle: "推荐练习",
      tryActivity: "去试试这个活动 →",
      expand: "展开了解更多",
      collapse: "收起",
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
      noticeTitle: "家长可以留意",
      noMaterials: "无需材料",
      disclaimer: "这些活动是帮助亲子互动的小练习，并非保证有效的治疗或干预方法。",
      languageLabCardTitle: "换一种说法",
      languageLabCardDesc: "互动练习：同一个情境，试试两种不同的回应方式。",
    },
    explorer: {
      prompt: "你会怎么说？",
      selectPrompt: "点一个回应，看看它可能传递什么。",
      tryAnother: "换一个回应看看",
      nextScenario: "下一个情境",
      communicatesTitle: "这可能在传递",
      childInterpretsTitle: "孩子可能的理解",
      cooperationTitle: "对配合与情绪安全的影响",
      alternativeTitle: "也可以试试这样说",
      tryThis: "试试这句",
      reflectionNote: "这里没有标准答案——这是用来帮助你反思的，不是给家长打分。",
    },
    languageLab: {
      title: "换一种说法",
      subtitle: "同一个日常情境，试试两种不同的回应，看看可能带来什么不同。",
      filterAll: "全部",
      filterYounger: "幼儿",
      filterTeen: "青少年",
      filterGeneral: "通用",
      shuffle: "换一个情境",
    },
    discover: {
      title: "探索",
      subtitle: "按主题、故事系列或资源类型，探索已核实的 Julia Cook 育儿与绘本资源。",
      modeTopics: "主题",
      modeStories: "故事",
      modeResources: "资源",
      byChallenge: "按育儿难题",
      byAge: "按年龄段",
      byType: "按资源类型",
      metadataOnlyNotice:
        "目前展示的是已核实的资源信息和授权外部链接，完整内容将在获得正式合作许可后提供。",
      booksHeading: "相关 Julia Cook 童书",
      storiesSubtitle: "按系列浏览 Julia Cook 的童书，也可以先按育儿难题缩小范围。",
      storiesBySeriesTitle: "按系列浏览",
      noSeriesLabel: "其他童书",
      seriesBookCount: "{count} 本",
      resourcesSubtitle: "按资源格式浏览——音频书、视频、练习单、活动、家长指南等。",
      formatComingSoon: "这个类型暂时还没有已核实的资源，敬请期待。",
    },
    activities: {
      title: "一起玩",
      subtitle: "原创、可在家中立即尝试的亲子练习活动。",
      filter: {
        all: "全部",
        "no-materials": "无需材料",
        quick: "快速（10 分钟内）",
        younger: "幼儿",
        teen: "青少年",
      },
      printablesCardTitle: "可打印资源",
      printablesCardDesc: "查看练习单、海报等可打印材料。",
    },
    my: {
      title: "我的",
      tab: {
        saved: "收藏",
        recent: "最近浏览",
        reflections: "我的记录",
        settings: "设置",
      },
      savedEmpty: "收藏的情况、故事和活动会显示在这里。",
      savedSituations: "收藏的情况",
      savedStories: "收藏的故事",
      savedActivities: "收藏的活动",
      savedResources: "收藏的资源",
      recentEmpty: "你浏览过的内容会显示在这里。",
      recentClear: "清除浏览记录",
      recentSituation: "情况",
      recentBook: "童书",
      recentResource: "资源",
      recentActivity: "活动",
      reflectionsEmpty: "保存的记录会显示在这里。",
      settings: {
        about: "关于 Cookie Bytes by Julia",
        contact: "联系支持",
        privacy: "隐私政策",
      },
      brandingNotice:
        "Cookie Bytes by Julia 目前为开发演示版本，尚未获得官方授权认证；一旦获得授权文件，将启用正式品牌标识。",
    },
    viewer: {
      unavailableNote: "该资源暂时无法在应用内预览，详情见下方说明。",
      audioLabel: "{title} 音频播放",
      openInNewTab: "在新标签页中打开",
      quizProgress: "第 {current} / {total} 题",
      quizScore: "得分：{score} / {total}",
      quizNext: "下一题",
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
    book: {
      eyebrow: "Julia Cook 童书",
      notFound: "没有找到这本书的信息。",
      verifiedDetailed: "书目信息已逐条核实",
      verifiedCatalogOnly: "仅核实书名已收录于官方书目，详细信息尚待核实",
      catalogOnlyNotice: "这本书目前只确认了书名和官方链接，出版社、ISBN、简介等细节尚未逐一核实，先不显示以免出错。",
      seriesLabel: "系列",
      authorLabel: "作者",
      publisherLabel: "出版社",
      isbnLabel: "ISBN",
      agesLabel: "适读年龄",
      whatChildrenMayLearnTitle: "孩子可能从中学到什么",
      relatedSituationsTitle: "相关育儿情境",
      relatedSituationsEmpty: "这本书暂未关联到具体的育儿情境。",
      resourcesTitle: "相关配套资源",
      resourcesEmpty: "暂未找到该书的官方配套资源（如活动手册）。",
      accessPurchaseRequired: "需从出版社购买",
      accessFreeLink: "可免费查看（外部链接）",
      accessSubscription: "需订阅",
      hypothesisNote: "这是本应用编辑团队自己的判断，并非出版社官方认定的关联——仅供参考。",
      educatorAudienceNote: "这本书主要面向教师/家长，而非儿童直接阅读。",
      relatedBooksTitle: "相关 Julia Cook 童书",
      relatedBooksEmpty: "暂无已核实的相关童书。",
      listenTitle: "听一听",
      watchTitle: "看一看",
      practiceSectionTitle: "练一练",
      printTitle: "打印资源",
      parentGuidanceTitle: "家长指南",
      posterTitle: "海报",
      quizTitle: "小测验",
    },
  },
  en: {
    nav: {
      home: "Home",
      discover: "Discover",
      activities: "Play",
      my: "My Space",
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
      featuredStoryEyebrow: "Featured Story",
      featuredStoryTitle: "Explore a Julia Cook Story",
      featuredActivityEyebrow: "Featured Activity",
      featuredActivityTitle: "Try This Together Today",
      languageLabEyebrow: "Try an interactive exercise",
      languageLabTitle: "Try Saying It Differently",
      languageLabCta: "Explore more scenarios \u2192",
      quickAccessTitle: "Quick access",
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
      everydayTitle: "In everyday family life",
      ageExamplesTitle: "Across ages",
      activityTitle: "Recommended activity",
      tryActivity: "Try this activity \u2192",
      expand: "Learn more",
      collapse: "Show less",
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
      noticeTitle: "What to notice",
      noMaterials: "No materials needed",
      disclaimer:
        "These activities are small, supportive exercises for connecting with your child \u2014 not a guaranteed treatment or intervention.",
      languageLabCardTitle: "Try Saying It Differently",
      languageLabCardDesc: "Interactive: try two different responses to the same everyday moment.",
    },
    explorer: {
      prompt: "What would you say?",
      selectPrompt: "Tap a response to see what it might communicate.",
      tryAnother: "Try the other response",
      nextScenario: "Next scenario",
      communicatesTitle: "What this might communicate",
      childInterpretsTitle: "How your child might hear it",
      cooperationTitle: "Possible effect on cooperation & emotional safety",
      alternativeTitle: "A more connecting way to say it",
      tryThis: "Try this instead",
      reflectionNote: "There's no single right answer here \u2014 this is for reflection, not for grading yourself.",
    },
    languageLab: {
      title: "Try Saying It Differently",
      subtitle: "Same everyday moment, two different responses \u2014 see what each might lead to.",
      filterAll: "All",
      filterYounger: "Younger kids",
      filterTeen: "Teens",
      filterGeneral: "General",
      shuffle: "Try another scenario",
    },
    discover: {
      title: "Discover",
      subtitle: "Explore verified Julia Cook parenting guidance, stories, and resources by topic, series, or format.",
      modeTopics: "Topics",
      modeStories: "Stories",
      modeResources: "Resources",
      byChallenge: "By parenting challenge",
      byAge: "By age group",
      byType: "By resource type",
      metadataOnlyNotice:
        "This view shows verified metadata and authorized external links. Full content will be available once a formal licensing agreement is confirmed.",
      booksHeading: "Related Julia Cook books",
      storiesSubtitle: "Browse Julia Cook's books by series, or narrow down by parenting challenge first.",
      storiesBySeriesTitle: "Browse by series",
      noSeriesLabel: "Other books",
      seriesBookCount: "{count} books",
      resourcesSubtitle: "Browse by resource format \u2014 audiobooks, videos, worksheets, activities, parent guides, and more.",
      formatComingSoon: "No verified resources in this format yet \u2014 check back soon.",
    },
    activities: {
      title: "Play & Practice",
      subtitle: "Original, practical activities you can try with your child right away.",
      filter: {
        all: "All",
        "no-materials": "No materials",
        quick: "Quick (10 min)",
        younger: "Younger kids",
        teen: "Teens",
      },
      printablesCardTitle: "Printable Resources",
      printablesCardDesc: "Browse worksheets, posters, and other printables.",
    },
    my: {
      title: "My Space",
      tab: {
        saved: "Saved",
        recent: "Recent",
        reflections: "Reflections",
        settings: "Settings",
      },
      savedEmpty: "Save situations, stories, and activities to find them here later.",
      savedSituations: "Saved situations",
      savedStories: "Saved stories",
      savedActivities: "Saved activities",
      savedResources: "Saved resources",
      recentEmpty: "Things you've viewed will show up here.",
      recentClear: "Clear recent history",
      recentSituation: "Situation",
      recentBook: "Book",
      recentResource: "Resource",
      recentActivity: "Activity",
      reflectionsEmpty: "Your saved reflections will show up here.",
      settings: {
        about: "About Cookie Bytes by Julia",
        contact: "Contact Support",
        privacy: "Privacy Policy",
      },
      brandingNotice:
        "Cookie Bytes by Julia is currently a development/demo build and is not yet officially authorized or endorsed. Official branding will be enabled once authorization is documented.",
    },
    viewer: {
      unavailableNote: "This resource can't be previewed in-app yet; see the details below.",
      audioLabel: "Audio player for {title}",
      openInNewTab: "Open in a new tab",
      quizProgress: "Question {current} of {total}",
      quizScore: "Score: {score} / {total}",
      quizNext: "Next question",
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
    book: {
      eyebrow: "Julia Cook book",
      notFound: "We couldn't find information for this book.",
      verifiedDetailed: "Bibliographic details individually verified",
      verifiedCatalogOnly: "Title verified in the official catalog; full details not yet checked",
      catalogOnlyNotice:
        "Only this book's title and official link have been confirmed so far. Publisher, ISBN, and summary haven't been individually verified yet, so they aren't shown here.",
      seriesLabel: "Series",
      authorLabel: "Author",
      publisherLabel: "Publisher",
      isbnLabel: "ISBN",
      agesLabel: "Ages",
      whatChildrenMayLearnTitle: "What children may learn",
      relatedSituationsTitle: "Related parenting situations",
      relatedSituationsEmpty: "This book isn't linked to a specific parenting situation yet.",
      resourcesTitle: "Companion resources",
      resourcesEmpty: "No verified official companion resources (like an activity book) were found for this title.",
      accessPurchaseRequired: "Purchase from the publisher",
      accessFreeLink: "Free to view (external link)",
      accessSubscription: "Subscription required",
      hypothesisNote:
        "This link to the situation below is this app's own editorial judgment, not an official claim by the publisher.",
      educatorAudienceNote: "This title is aimed at educators/parents rather than being a child-facing picture book.",
      relatedBooksTitle: "Related Julia Cook books",
      relatedBooksEmpty: "No verified related books yet.",
      listenTitle: "Listen",
      watchTitle: "Watch",
      practiceSectionTitle: "Practice",
      printTitle: "Print",
      parentGuidanceTitle: "Parent Guidance",
      posterTitle: "Posters",
      quizTitle: "Quizzes",
    },
  },
};

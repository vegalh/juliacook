import type { ParentingSituation, SituationContent } from "../types";
import type { AgeBucket } from "./ageGroups";

/**
 * All educational copy here is original, written for this prototype. None of
 * it is attributed to Julia Cook and no quotes are invented on her behalf —
 * see docs/content-model.md. Every entry is demonstration content pending
 * editorial review (see the `demoNotice` chrome string shown alongside it).
 *
 * The five "flagship" journeys (getting-angry, interrupting, sharing,
 * fear-of-failure, friend-conflict) are the complete demonstration journeys
 * required by the product brief and include younger/older age variants. The
 * remaining topics carry forward the original prototype's lighter-weight
 * single-tier guidance, translated and extended with SEL competency links.
 */
export const situations: ParentingSituation[] = [
  {
    topicSlug: "getting-angry",
    selCompetencies: ["self-awareness", "self-management"],
    practiceActivityId: "calm-down-toolbox-activity",
    reflectPrompt: "What helped your child come back to calm today?",
    reflectPromptZh: "今天是什么帮助孩子重新平静下来的？",
    isFlagshipJourney: true,
    understandByAge: {
      "3-6": {
        text: "At this age, big emotions arrive before language and self-control are ready. A meltdown is often sensory or emotional overload, not manipulation.",
        textZh: "这个年龄段的孩子，情绪比语言和自控能力发育得更快；崩溃大哭通常是感官或情绪被瞬间压垮，而不是故意使坏。",
      },
      "6-10": {
        text: "Kids this age are starting to notice fairness and can feel intense frustration when things seem unjust. They can name feelings but still lose control under stress.",
        textZh: "这个阶段的孩子开始在意“公平”，遇到他们觉得不公的事时情绪会特别激烈；他们已经能说出感受，但压力大时仍然容易失控。",
      },
      "10-12": {
        text: "Preteens are more self-conscious and may suppress anger in public, then release it more sharply at home, where they feel safest.",
        textZh: "这个年龄段的孩子更在意别人的看法，常常把怒气压在心里，直到在家里这个相对安全的地方才一次性爆发出来。",
      },
      "13+": {
        text: "A teen's brain is rewiring for independence, and irritability can spike with hormonal changes, sleep needs, and a strong desire to be taken seriously.",
        textZh: "青少年的大脑正在为独立做准备，加上荷尔蒙变化和睡眠需求增加，他们更容易烦躁，也更渴望被认真对待。",
      },
    },
    default: {
      heading: "My child\nis getting angry",
      headingZh: "孩子一生气就\n大哭大闹",
      understand:
        "At this age, kids feel big emotions before they have the words or self-control to manage them. A meltdown is often a sign of an overwhelmed nervous system, not defiance.",
      understandZh:
        "这个年龄段的孩子常常情绪来得比语言和自我控制能力更快。崩溃大哭通常是神经系统被情绪淹没的表现，而不是故意捣乱。",
      respond: [
        "Get down to their eye level and stay calm before saying anything.",
        "Name the feeling out loud so they know you understand.",
        "Wait for the big wave to pass before you talk about what happened.",
      ],
      respondZh: [
        "蹲下来和孩子平视，先让自己冷静下来。",
        "把他的感受说出来，让他知道你理解他。",
        "等情绪的浪潮过去后，再一起聊聊发生了什么。",
      ],
      trySaying: {
        lessHelpful: "Stop crying right now!",
        lessHelpfulZh: "别哭了，马上给我停下来！",
        moreHelpful: "I can see you're really upset. I'm here with you.",
        moreHelpfulZh: "我看到你很生气，我在这里陪着你。",
      },
    },
    ageVariants: {
      younger: {
        heading: "My child\nis getting angry",
        headingZh: "孩子一生气就\n大哭大闹",
        understand:
          "At this age, kids feel big emotions before they have the words or self-control to manage them. A meltdown is often a sign of an overwhelmed nervous system, not defiance.",
        understandZh:
          "这个年龄段的孩子常常情绪来得比语言和自我控制能力更快。崩溃大哭通常是神经系统被情绪淹没的表现，而不是故意捣乱。",
        respond: [
          "Get down to their eye level and stay calm before saying anything.",
          "Name the feeling out loud so they know you understand.",
          "Wait for the big wave to pass before you talk about what happened.",
        ],
        respondZh: [
          "蹲下来和孩子平视，先让自己冷静下来。",
          "把他的感受说出来，让他知道你理解他。",
          "等情绪的浪潮过去后，再一起聊聊发生了什么。",
        ],
        trySaying: {
          lessHelpful: "Stop crying right now!",
          lessHelpfulZh: "别哭了，马上给我停下来！",
          moreHelpful: "I can see you're really upset. I'm here with you.",
          moreHelpfulZh: "我看到你很生气，我在这里陪着你。",
        },
      },
      older: {
        heading: "My child\nsnaps when frustrated",
        headingZh: "孩子一不耐烦就\n摔门、发火",
        understand:
          "Older kids and teens are learning to manage frustration with a still-developing brain. A sharp reaction is often about feeling unheard, not about you.",
        understandZh:
          "大一点的孩子和青少年的大脑仍在发育中，他们也在学习如何处理挫败感。激烈的反应通常是因为感觉不被理解，而不是针对你。",
        respond: [
          "Give them space first, and check in once things cool down.",
          "Ask what's underneath the anger instead of focusing only on the outburst.",
          "Agree on a signal they can use when they need a break.",
        ],
        respondZh: [
          "先给他一点空间，等情绪平复后再聊。",
          "问问愤怒背后真正在意的是什么，而不只是关注这次爆发。",
          "和他约定一个需要冷静时可以用的暗号。",
        ],
        trySaying: {
          lessHelpful: "You're too old to act like this.",
          lessHelpfulZh: "你都这么大了，还这样闹脾气？",
          moreHelpful: "Something's clearly bothering you. Want to talk now or in a bit?",
          moreHelpfulZh: "看得出你现在很不舒服，想现在聊聊，还是等一下再说？",
        },
      },
    },
  },
  {
    topicSlug: "interrupting",
    selCompetencies: ["self-management", "relationship-skills"],
    practiceActivityId: "pause-signal-practice",
    reflectPrompt: "When did you notice your child pause today, even briefly?",
    reflectPromptZh: "今天你有没有注意到孩子有哪怕很短暂的停顿？",
    isFlagshipJourney: true,
    understandByAge: {
      "3-6": {
        text: "Young children have very limited working memory, so they blurt out thoughts immediately for fear of losing them — not because they're being rude.",
        textZh: "小朋友的“工作记忆”有限，他们急着把想法说出来是怕一等就忘了，而不是没礼貌。",
      },
      "6-10": {
        text: "Kids are learning conversational turn-taking as a real skill, and excitement about a topic can easily override that still-wobbly skill.",
        textZh: "这个阶段的孩子正在学习轮流对话这项技能，一旦对某个话题特别兴奋，这项还不够稳固的技能就容易“掉线”。",
      },
      "10-12": {
        text: "Preteens may interrupt to assert status within a group, or because they themselves fear being talked over.",
        textZh: "这个年龄段的孩子打断别人，有时是想在群体中争取话语权，有时是担心自己也会被别人抢话。",
      },
      "13+": {
        text: "Teens often interrupt during fast, emotionally charged conversations — like with siblings or parents — when they feel unheard, rather than out of disrespect.",
        textZh: "青少年打断别人，常常发生在情绪比较强烈的对话中（比如和父母或兄弟姐妹），这多半是因为觉得自己没被听见，而不是不尊重人。",
      },
    },
    default: {
      heading: "My child\nkeeps interrupting",
      headingZh: "孩子总是\n打断别人说话",
      understand:
        "Young children often interrupt because they're afraid they'll forget their idea before it's their turn — not because they don't care about listening.",
      understandZh:
        "小朋友打断别人，常常是因为担心轮到自己说话时会忘记想说的内容，而不是不在乎倾听。",
      respond: [
        "Give them a hand signal to hold their thought instead of scolding.",
        "Agree on a quiet word they can say to ask for a turn.",
        "Praise them the moment they wait, even briefly.",
      ],
      respondZh: [
        "教他一个手势，先把想法\u201c存起来\u201d，而不是直接责备。",
        "约定一个可以小声说的词，用来表示想发言。",
        "只要他等了一下，就立刻给予肯定。",
      ],
      trySaying: {
        lessHelpful: "How many times do I have to tell you to stop interrupting?",
        lessHelpfulZh: "我说了多少次不要打断别人，你怎么又来了？",
        moreHelpful: "I want to hear your idea. Can you hold it for one more minute?",
        moreHelpfulZh: "我很想听你的想法，可以再等一分钟吗？",
      },
    },
    ageVariants: {
      younger: {
        heading: "My child\nkeeps interrupting",
        headingZh: "孩子总是\n打断别人说话",
        understand:
          "Young children often interrupt because they're afraid they'll forget their idea before it's their turn — not because they don't care about listening.",
        understandZh:
          "小朋友打断别人，常常是因为担心轮到自己说话时会忘记想说的内容，而不是不在乎倾听。",
        respond: [
          "Give them a hand signal to hold their thought instead of scolding.",
          "Agree on a quiet word they can say to ask for a turn.",
          "Praise them the moment they wait, even briefly.",
        ],
        respondZh: [
          "教他一个手势，先把想法\u201c存起来\u201d，而不是直接责备。",
          "约定一个可以小声说的词，用来表示想发言。",
          "只要他等了一下，就立刻给予肯定。",
        ],
        trySaying: {
          lessHelpful: "How many times do I have to tell you to stop interrupting?",
          lessHelpfulZh: "我说了多少次不要打断别人，你怎么又来了？",
          moreHelpful: "I want to hear your idea. Can you hold it for one more minute?",
          moreHelpfulZh: "我很想听你的想法，可以再等一分钟吗？",
        },
      },
      older: {
        heading: "My child\ntalks over others",
        headingZh: "孩子在对话中\n总是抢话",
        understand:
          "Older kids may interrupt when they're excited, anxious about being forgotten, or still building patience in fast-moving conversations.",
        understandZh:
          "大一点的孩子抢话，可能是因为太兴奋，担心被忽略，或者还在学习如何在快节奏的对话中保持耐心。",
        respond: [
          "Talk privately about how interrupting affects others, not in front of peers.",
          "Practice turn-taking in lower-stakes conversations at home.",
          "Acknowledge when they catch themselves and wait.",
        ],
        respondZh: [
          "私下聊聊打断别人会给对方什么感受，而不是当着同伴的面指出。",
          "在家里轻松的对话中多练习轮流发言。",
          "当他意识到并等待时，及时给予肯定。",
        ],
        trySaying: {
          lessHelpful: "You never let anyone finish talking.",
          lessHelpfulZh: "你从来不让别人把话说完。",
          moreHelpful: "Let's both practice waiting for a pause before jumping in.",
          moreHelpfulZh: "我们一起练习，等对方说完停顿了再开口。",
        },
      },
    },
  },
  {
    topicSlug: "sharing",
    selCompetencies: ["relationship-skills", "responsible-decision-making"],
    practiceActivityId: "sharing-timer-game",
    reflectPrompt: "What's one thing your child shared today, big or small?",
    reflectPromptZh: "今天孩子分享了什么，不管大小？",
    isFlagshipJourney: true,
    understandByAge: {
      "3-6": {
        text: "Object ownership feels absolute at this age. Sharing can genuinely feel like permanent loss, not a temporary turn.",
        textZh: "这个阶段的孩子对“这是我的”有非常绝对的认知，分享对他们来说可能真的感觉像是永远失去。",
      },
      "6-10": {
        text: "Kids start understanding reciprocity (\"I'll get a turn too\"), but still need the exchange made explicit and clearly fair.",
        textZh: "孩子开始理解“互相轮流”的概念，但仍然需要大人把交换的规则说得很清楚、很公平。",
      },
      "10-12": {
        text: "\"Sharing\" shifts toward credit, attention, and inclusion in a group — material objects matter less than this social currency.",
        textZh: "这个阶段的“分享”更多指向功劳、关注和被群体接纳——实物本身的重要性反而变小了。",
      },
      "13+": {
        text: "Teens navigate sharing time, space, and responsibility with family and peers, often weighing it against their push for independence.",
        textZh: "青少年要面对的“分享”是时间、空间和责任——这常常和他们追求独立的心理拉扯在一起。",
      },
    },
    default: {
      heading: "My child\ndoesn't want to share",
      headingZh: "孩子不愿意\n分享玩具",
      understand:
        "Young children are still learning that sharing doesn't mean losing something forever. Object ownership feels very real and important to them.",
      understandZh:
        "小朋友还在学习\u201c分享不等于永远失去\u201d这件事，物品归属感对他们来说非常真实和重要。",
      respond: [
        "Offer a turn-taking timer instead of asking them to give the toy up for good.",
        "Praise specific moments of sharing right when they happen.",
        "Let them choose one or two \"special\" toys that don't have to be shared.",
      ],
      respondZh: [
        "用轮流计时的方式，而不是要求他把玩具永远让出去。",
        "在他做到分享的那一刻，具体地表扬他。",
        "让他挑一两件\u201c专属\u201d玩具，可以不用分享。",
      ],
      trySaying: {
        lessHelpful: "Don't be so selfish, just share it!",
        lessHelpfulZh: "别这么小气，赶紧分享！",
        moreHelpful: "You can have it for two more minutes, then it's your friend's turn.",
        moreHelpfulZh: "你可以再玩两分钟，然后轮到朋友玩。",
      },
    },
    ageVariants: {
      younger: {
        heading: "My child\ndoesn't want to share toys",
        headingZh: "孩子不愿意\n分享玩具",
        understand:
          "Young children are still learning that sharing doesn't mean losing something forever. Object ownership feels very real and important to them.",
        understandZh:
          "小朋友还在学习\u201c分享不等于永远失去\u201d这件事，物品归属感对他们来说非常真实和重要。",
        respond: [
          "Offer a turn-taking timer instead of asking them to give the toy up for good.",
          "Praise specific moments of sharing right when they happen.",
          "Let them choose one or two \"special\" toys that don't have to be shared.",
        ],
        respondZh: [
          "用轮流计时的方式，而不是要求他把玩具永远让出去。",
          "在他做到分享的那一刻，具体地表扬他。",
          "让他挑一两件\u201c专属\u201d玩具，可以不用分享。",
        ],
        trySaying: {
          lessHelpful: "Don't be so selfish, just share it!",
          lessHelpfulZh: "别这么小气，赶紧分享！",
          moreHelpful: "You can have it for two more minutes, then it's your friend's turn.",
          moreHelpfulZh: "你可以再玩两分钟，然后轮到朋友玩。",
        },
      },
      older: {
        heading: "My child won't\nshare credit or space",
        headingZh: "孩子不愿意分享\n功劳或关注",
        understand:
          'As kids get older, "sharing" shows up differently — splitting credit on a group project, sharing a parent\'s attention with a sibling, or compromising with friends.',
        understandZh:
          "孩子长大后，\u201c分享\u201d的形式也在变化——比如小组作业中分享功劳、和兄弟姐妹分享父母的关注，或在朋友之间做出让步。",
        respond: [
          "Name the specific kind of sharing that's hard right now.",
          "Talk through what a fair compromise could look like together.",
          "Recognize generosity when you see it, even small moments.",
        ],
        respondZh: [
          "具体说出现在哪种\u201c分享\u201d对他来说比较难。",
          "一起讨论怎样的让步才算公平。",
          "看到他慷慨的举动时，及时肯定，哪怕很小。",
        ],
        trySaying: {
          lessHelpful: "You always have to have everything your way.",
          lessHelpfulZh: "你总是什么都要按自己的想法来。",
          moreHelpful: "What would feel fair to both of you here?",
          moreHelpfulZh: "怎样对你们两个来说都算公平呢？",
        },
      },
    },
  },
  {
    topicSlug: "fear-of-failure",
    selCompetencies: ["self-awareness", "responsible-decision-making"],
    practiceActivityId: "brave-mistakes-jar",
    reflectPrompt: "What did your child try today, even if it didn't go perfectly?",
    reflectPromptZh: "今天孩子尝试了什么，即使结果不完美？",
    isFlagshipJourney: true,
    understandByAge: {
      "3-6": {
        text: "A young child's self-concept is still very concrete, so a mistake can feel like \"I did it wrong\" turns into \"I am bad at this.\"",
        textZh: "小朋友的自我认知还比较“具体”，犯错很容易被他们理解成“我很差劲”，而不只是“这件事没做好”。",
      },
      "6-10": {
        text: "Kids this age start comparing themselves to peers and may avoid trying altogether if they expect to end up \"behind\" someone else.",
        textZh: "这个阶段的孩子开始和同伴比较，如果预感自己会“落后”，可能就直接选择不去尝试。",
      },
      "10-12": {
        text: "Preteens are highly sensitive to making mistakes in front of classmates — sometimes that feeling of being watched matters more than the mistake itself.",
        textZh: "这个年龄段的孩子对“当众出错”特别敏感，有时候这种“被看到”的担心比犯错本身影响更大。",
      },
      "13+": {
        text: "Teens may tie failure to long-term identity and future plans (\"if I fail this, it says something about my whole path\"), which raises the emotional stakes.",
        textZh: "青少年容易把一次失败和长远的自我价值、未来联系在一起（“这次不行是不是说明我整个方向都不行”），情绪压力也因此更大。",
      },
    },
    default: {
      heading: "My child\nis afraid to fail",
      headingZh: "孩子一遇到困难\n就想放弃",
      understand:
        'Young children often link mistakes to being "bad" at something, rather than seeing mistakes as a normal part of learning.',
      understandZh: "小朋友常常把犯错等同于\u201c自己不行\u201d，而不是把犯错看作学习过程中很正常的一部分。",
      respond: [
        "Celebrate the attempt, not just the result.",
        "Share a small mistake of your own and what you learned.",
        "Break the task into one small, winnable next step.",
      ],
      respondZh: [
        "庆祝孩子\u201c尝试\u201d这件事本身，而不只是结果。",
        "分享你自己犯过的小错误，以及从中学到了什么。",
        "把任务拆成一个小小的、能够完成的下一步。",
      ],
      trySaying: {
        lessHelpful: "It's not that hard, just try harder.",
        lessHelpfulZh: "这有什么难的，再努力一点就好了。",
        moreHelpful: "Mistakes help your brain grow. What's one small step we could try?",
        moreHelpfulZh: "犯错能帮助大脑成长。我们可以先试试哪一小步？",
      },
    },
    ageVariants: {
      younger: {
        heading: "My child gives up\nwhen things feel hard",
        headingZh: "孩子一遇到困难\n就想放弃",
        understand:
          'Young children often link mistakes to being "bad" at something, rather than seeing mistakes as a normal part of learning.',
        understandZh:
          "小朋友常常把犯错等同于\u201c自己不行\u201d，而不是把犯错看作学习过程中很正常的一部分。",
        respond: [
          "Celebrate the attempt, not just the result.",
          "Share a small mistake of your own and what you learned.",
          "Break the task into one small, winnable next step.",
        ],
        respondZh: [
          "庆祝孩子\u201c尝试\u201d这件事本身，而不只是结果。",
          "分享你自己犯过的小错误，以及从中学到了什么。",
          "把任务拆成一个小小的、能够完成的下一步。",
        ],
        trySaying: {
          lessHelpful: "It's not that hard, just try harder.",
          lessHelpfulZh: "这有什么难的，再努力一点就好了。",
          moreHelpful: "Mistakes help your brain grow. What's one small step we could try?",
          moreHelpfulZh: "犯错能帮助大脑成长。我们可以先试试哪一小步？",
        },
      },
      older: {
        heading: "My child avoids\ntrying new things",
        headingZh: "孩子因为害怕失败\n不敢尝试新事物",
        understand:
          "Older kids and teens are more aware of being judged by peers, so the fear isn't just about failing — it's about being seen failing.",
        understandZh:
          "大一点的孩子和青少年更在意同伴的看法，所以他们害怕的不只是失败本身，更是\u201c被别人看到自己失败\u201d。",
        respond: [
          "Separate their worth from the outcome of any one attempt.",
          "Ask what the worst realistic outcome actually is, together.",
          "Model trying something new yourself and talking about it out loud.",
        ],
        respondZh: [
          "让他明白自己的价值不取决于某一次尝试的结果。",
          "和他一起聊聊，最坏的真实情况到底是什么。",
          "自己也尝试一些新事物，并大声说出你的感受。",
        ],
        trySaying: {
          lessHelpful: "Just don't worry about what other people think.",
          lessHelpfulZh: "别管别人怎么想就好了。",
          moreHelpful: "It makes sense to feel nervous. What's one small way to try it safely?",
          moreHelpfulZh: "会紧张很正常。有没有什么比较安全的小方式可以先试试看？",
        },
      },
    },
  },
  {
    topicSlug: "friend-conflict",
    selCompetencies: ["social-awareness", "relationship-skills"],
    practiceActivityId: "friendship-repair-steps",
    reflectPrompt: "What did your child say about how they're feeling about their friend?",
    reflectPromptZh: "孩子今天对这段友谊说了些什么感受？",
    isFlagshipJourney: true,
    understandByAge: {
      "3-6": {
        text: "Friendships at this age form mostly around shared play, so a single conflict can feel like the whole friendship is over — the gray area in between isn't obvious yet.",
        textZh: "这个阶段的友谊主要建立在一起玩耍上，一次冲突很容易让孩子觉得“友谊结束了”，还不太能理解其中的灰色地带。",
      },
      "6-10": {
        text: "Kids are learning to repair relationships and can benefit from a simple script, but often still need an adult to help structure the first step.",
        textZh: "孩子开始学习如何修复关系，一句简单的话就可能有帮助，但往往还需要大人帮他们理清第一步该怎么做。",
      },
      "10-12": {
        text: "Friend groups and social standing — who's \"in\" or \"out\" — become more central, which makes conflicts feel higher-stakes than they might look from outside.",
        textZh: "这个阶段朋友圈和“谁是自己人”的社交结构变得更重要，这让冲突感觉风险更高。",
      },
      "13+": {
        text: "Conflicts may now play out partly online or in group chats, adding an audience and a permanent record that younger kids never have to deal with.",
        textZh: "青少年的冲突可能一部分发生在线上或群聊里，多了“观众”和“被记录下来”的复杂性，这是小朋友不会遇到的情况。",
      },
    },
    default: {
      heading: "My child\nhad a fight with a friend",
      headingZh: "孩子和朋友\n吵架了",
      understand:
        "At this age, friendships can feel like they're over after one argument, because kids haven't yet learned that relationships can bend without breaking.",
      understandZh:
        "这个年龄段的孩子可能觉得吵了一次架友谊就结束了，因为他们还没学会关系是可以修复的，而不是一吵就碎。",
      respond: [
        "Listen to their side fully before offering any suggestions.",
        "Ask what they think their friend might have been feeling.",
        "Practice one simple repair phrase they could use tomorrow.",
      ],
      respondZh: [
        "先完整地听孩子讲他的想法，再给建议。",
        "问问他觉得朋友当时可能是什么感受。",
        "一起练习一句明天可以用来和好的简单话。",
      ],
      trySaying: {
        lessHelpful: "Just ignore it, it's not a big deal.",
        lessHelpfulZh: "别理他就好了，没什么大不了的。",
        moreHelpful: "That sounds like it really hurt. What do you think happened?",
        moreHelpfulZh: "听起来你很难受。你觉得当时发生了什么？",
      },
    },
    ageVariants: {
      younger: {
        heading: "My child\nhad a fight with a friend",
        headingZh: "孩子和朋友\n吵架了",
        understand:
          "At this age, friendships can feel like they're over after one argument, because kids haven't yet learned that relationships can bend without breaking.",
        understandZh:
          "这个年龄段的孩子可能觉得吵了一次架友谊就结束了，因为他们还没学会关系是可以修复的，而不是一吵就碎。",
        respond: [
          "Listen to their side fully before offering any suggestions.",
          "Ask what they think their friend might have been feeling.",
          "Practice one simple repair phrase they could use tomorrow.",
        ],
        respondZh: [
          "先完整地听孩子讲他的想法，再给建议。",
          "问问他觉得朋友当时可能是什么感受。",
          "一起练习一句明天可以用来和好的简单话。",
        ],
        trySaying: {
          lessHelpful: "Just ignore it, it's not a big deal.",
          lessHelpfulZh: "别理他就好了，没什么大不了的。",
          moreHelpful: "That sounds like it really hurt. What do you think happened?",
          moreHelpfulZh: "听起来你很难受。你觉得当时发生了什么？",
        },
      },
      older: {
        heading: "My child's conflict\nwith a friend won't resolve",
        headingZh: "孩子和朋友之间的\n矛盾一直没解决",
        understand:
          "Older friendships involve more complex dynamics — group loyalty, social media, and pride can all make conflicts harder to resolve quickly.",
        understandZh:
          "大一点孩子的友谊会涉及更复杂的因素——小团体、社交媒体和自尊心，都会让矛盾更难很快解决。",
        respond: [
          "Resist the urge to solve it for them — help them think it through instead.",
          "Ask what they want the friendship to look like going forward.",
          "Watch for signs this has moved from conflict into bullying, and step in if so.",
        ],
        respondZh: [
          "忍住直接替他解决的冲动，而是帮助他自己理清思路。",
          "问问他希望这段友谊以后是什么样子。",
          "留意矛盾是否已经演变成欺凌，如果是，要及时介入。",
        ],
        trySaying: {
          lessHelpful: "You should just find new friends.",
          lessHelpfulZh: "你干脆换个朋友得了。",
          moreHelpful: "What do you need to feel okay about this, whatever happens next?",
          moreHelpfulZh: "不管接下来怎样，你需要什么才能让自己好受一些？",
        },
      },
    },
  },

  // Additional topics carried forward from the original prototype (and new
  // ones added for the China-first home search examples). These use a single
  // content tier rather than full younger/older variants — see
  // docs/content-model.md for the rationale and backlog.
  {
    topicSlug: "bullying",
    selCompetencies: ["social-awareness", "relationship-skills"],
    reflectPrompt: "What did your child need most from you today?",
    reflectPromptZh: "今天孩子最需要你给予的是什么？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child\nis dealing with bullying",
      headingZh: "孩子正在\n遭遇欺凌",
      understand:
        "Kids who are bullied often stay quiet out of fear, shame, or worry that telling someone will make it worse.",
      understandZh: "遭遇欺凌的孩子常常因为害怕、羞愧，或担心说出来情况会变得更糟而选择沉默。",
      respond: [
        "Listen first and reassure them it's not their fault.",
        "Work with the school or caregivers on a concrete next step together.",
      ],
      respondZh: ["先倾听，并让他知道这不是他的错。", "和学校或照看者一起商量具体的下一步。"],
      lessHelpful: "Just stand up for yourself.",
      lessHelpfulZh: "你要学会自己站出来。",
      moreHelpful: "Thank you for telling me. We'll figure this out together.",
      moreHelpfulZh: "谢谢你告诉我，我们一起来想办法。",
    }),
  },
  {
    topicSlug: "not-listening",
    selCompetencies: ["self-management"],
    reflectPrompt: "What helped your child respond the first time today?",
    reflectPromptZh: "今天是什么让孩子第一次就回应了？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child\nisn't listening",
      headingZh: "孩子\n不听话",
      understand:
        '"Not listening" is often about a skill or attention gap in the moment, not defiance — especially when a child is absorbed in something else.',
      understandZh:
        "\u201c不听话\u201d很多时候是当下的注意力或能力问题，而不是故意反抗，尤其是孩子正专注在别的事情上时。",
      respond: [
        "Get on their level before you ask again.",
        "Use fewer words and wait for eye contact first.",
      ],
      respondZh: ["蹲下来，在同一高度再说一次。", "简化你的话，先等孩子看向你再说。"],
      lessHelpful: "I've told you a hundred times!",
      lessHelpfulZh: "我都说了一百遍了！",
      moreHelpful: "I need your eyes for a second. Can you look at me?",
      moreHelpfulZh: "我需要你看看我，可以吗？",
    }),
  },
  {
    topicSlug: "worry-anxiety",
    selCompetencies: ["self-awareness", "self-management"],
    reflectPrompt: "What calmed your child down today, even a little?",
    reflectPromptZh: "今天是什么让孩子感觉平静了一点？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child\nis worried or anxious",
      headingZh: "孩子感到\n担心或焦虑",
      understand:
        "Naming a worry out loud often makes it feel smaller and more manageable for a child than trying to push it away.",
      understandZh: "把担心说出来，往往比试图压下去更能让孩子感觉这件事变得可以应对。",
      respond: [
        "Name the feeling before you try to fix it.",
        "Practice one simple calming routine together regularly.",
      ],
      respondZh: ["先说出感受，再想办法解决。", "一起定期练习一个简单的平静小仪式。"],
      lessHelpful: "There's nothing to be scared of.",
      lessHelpfulZh: "这没什么好怕的。",
      moreHelpful: "It's okay to feel worried. Let's breathe together.",
      moreHelpfulZh: "担心是可以的，我们一起深呼吸吧。",
    }),
  },
  {
    topicSlug: "self-control",
    selCompetencies: ["self-management"],
    reflectPrompt: "What strategy worked for your child today?",
    reflectPromptZh: "今天哪种方法对孩子有效？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child\nneeds help with self-control",
      headingZh: "孩子需要\n练习自我控制",
      understand:
        "Self-control develops gradually, and it's often the first skill to slip when a child is tired, hungry, or overstimulated.",
      understandZh:
        "自我控制是逐渐发展起来的能力，当孩子疲惫、饥饿或过度刺激时，往往最先\u201c掉线\u201d的就是它。",
      respond: [
        "Offer a calming strategy before the moment escalates.",
        "Set up the environment to reduce triggers when you can.",
      ],
      respondZh: ["在情况升级前，提供一个平静策略。", "尽量调整环境，减少容易触发情绪的因素。"],
      lessHelpful: "Get control of yourself right now.",
      lessHelpfulZh: "你马上给我控制好自己。",
      moreHelpful: "Let's take three big breaths together, right now.",
      moreHelpfulZh: "我们现在一起深呼吸三次。",
    }),
  },
  {
    topicSlug: "kindness",
    selCompetencies: ["social-awareness", "relationship-skills"],
    reflectPrompt: "What kind moment did you notice today?",
    reflectPromptZh: "今天你注意到孩子哪个友善的瞬间？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child\nis working on kindness",
      headingZh: "孩子正在\n学习友善待人",
      understand:
        "Kindness is a skill that grows with practice and noticing — kids repeat what gets attention, including small kind acts.",
      understandZh: "友善是一种需要练习和被看见的技能——孩子会重复那些得到关注的行为，包括微小的善举。",
      respond: [
        "Point out small, kind choices as they happen.",
        "Talk about how a kind choice made someone else feel.",
      ],
      respondZh: ["在孩子做出友善的举动时，立刻指出来。", "聊聊这个友善的举动让别人有什么感受。"],
      lessHelpful: "Why can't you just be nicer?",
      lessHelpfulZh: "你就不能友善一点吗？",
      moreHelpful: "That was a kind thing to do. How did it feel?",
      moreHelpfulZh: "你刚才那样做很友善，感觉怎么样？",
    }),
  },
  {
    topicSlug: "transitions",
    selCompetencies: ["self-management"],
    reflectPrompt: "What made today's transition easier or harder?",
    reflectPromptZh: "今天的转换哪里比较顺利，哪里比较困难？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child\nstruggles with transitions",
      headingZh: "孩子难以\n适应转换",
      understand:
        "Transitions ask kids to stop something engaging and shift attention, which is a harder self-management task than it looks.",
      understandZh: "转换意味着孩子要停下正在投入的事情并转移注意力，这比看起来更考验自我管理能力。",
      respond: [
        "Give a heads-up before the change happens.",
        "Use a visual or verbal countdown to the transition.",
      ],
      respondZh: ["在变化发生前先给孩子一个提醒。", "用图示或口头倒数来提示转换。"],
      lessHelpful: "We don't have time for this, let's go!",
      lessHelpfulZh: "没时间了，赶紧走！",
      moreHelpful: "In five minutes, we're going to clean up. I'll remind you.",
      moreHelpfulZh: "再过五分钟我们要收拾了，我会提醒你的。",
    }),
  },
  {
    topicSlug: "excluded-by-peers",
    selCompetencies: ["social-awareness", "relationship-skills"],
    reflectPrompt: "Who did your child connect with today, even briefly?",
    reflectPromptZh: "今天孩子和谁有过哪怕很短暂的连接？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child feels\nexcluded by classmates",
      headingZh: "孩子感觉\n被同学排挤",
      understand:
        "Feeling left out can be just as painful for kids as an outright conflict, even if nothing dramatic happened.",
      understandZh: "即使没有发生激烈冲突，被排挤在外的感觉对孩子来说也可能同样令人难受。",
      respond: [
        "Validate the feeling before jumping to solutions.",
        "Help them identify one safe peer or activity to reconnect through.",
      ],
      respondZh: ["先认可孩子的感受，再考虑解决办法。", "帮他找到一个可以重新建立联系的安全同伴或活动。"],
      lessHelpful: "Just go make other friends.",
      lessHelpfulZh: "你就去交别的朋友好了。",
      moreHelpful: "That sounds lonely. I'm glad you told me.",
      moreHelpfulZh: "听起来你很孤单，谢谢你告诉我。",
    }),
  },
  {
    topicSlug: "school-reluctance",
    selCompetencies: ["self-awareness", "social-awareness"],
    reflectPrompt: "What's one small thing that felt okay about school today?",
    reflectPromptZh: "今天上学有哪件小事感觉还不错？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child doesn't\nwant to go to school",
      headingZh: "孩子\n不愿意上学",
      understand:
        "Reluctance about school can come from many places — social worry, academic stress, or simply missing home — and usually isn't about laziness.",
      understandZh:
        "不愿意上学的原因有很多——社交压力、学业压力，或只是想家——通常都不是因为懒惰。",
      respond: [
        "Ask open questions about what feels hard, without judgment.",
        "Work with the teacher on one small, specific adjustment.",
      ],
      respondZh: ["用不带评判的开放式问题，问问是什么让他觉得难。", "和老师一起商量一个具体的小调整。"],
      lessHelpful: "You have to go, no excuses.",
      lessHelpfulZh: "必须去上学，没有借口。",
      moreHelpful: "Help me understand what feels hard about school right now.",
      moreHelpfulZh: "跟我说说，现在上学哪里让你觉得难？",
    }),
  },
  {
    topicSlug: "procrastination",
    selCompetencies: ["self-management", "responsible-decision-making"],
    reflectPrompt: "What small first step did your child take today?",
    reflectPromptZh: "今天孩子迈出了哪个小小的第一步？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child always\nprocrastinates",
      headingZh: "孩子总是\n拖延",
      understand:
        "Procrastination is often about a task feeling too big or too boring, not about a lack of caring.",
      understandZh: "拖延常常是因为任务感觉太庞大或太枯燥，而不是因为不在乎。",
      respond: [
        "Break the task into the smallest possible first step.",
        "Set a short timer for just getting started, not finishing.",
      ],
      respondZh: ["把任务拆成最小的第一步。", "设一个短的计时器，只是为了\u201c开始\u201d，而不是\u201c完成\u201d。"],
      lessHelpful: "Why do you always leave everything until the last minute?",
      lessHelpfulZh: "你为什么每次都拖到最后一刻？",
      moreHelpful: "What's the smallest first step we could do together?",
      moreHelpfulZh: "我们可以一起做的最小的第一步是什么？",
    }),
  },
  {
    topicSlug: "low-confidence",
    selCompetencies: ["self-awareness", "responsible-decision-making"],
    reflectPrompt: "What's one thing your child handled well today?",
    reflectPromptZh: "今天孩子有哪件事处理得不错？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My child\nlacks confidence",
      headingZh: "孩子\n缺乏自信",
      understand:
        'Confidence grows from real experiences of trying and improving, not from being told "you can do it."',
      understandZh: "自信来自于真实的尝试和进步的经历，而不是仅仅被告知\u201c你可以做到\u201d。",
      respond: [
        "Point to specific past moments they handled well.",
        "Let them choose a low-stakes challenge to build on.",
      ],
      respondZh: ["提醒他过去具体处理得好的时刻。", "让他自己选一个风险较低的小挑战来练习。"],
      lessHelpful: "Just believe in yourself.",
      lessHelpfulZh: "你要相信自己就好了。",
      moreHelpful: "Remember when you figured out a hard thing before? You can figure this out too.",
      moreHelpfulZh: "还记得你之前解决过一件很难的事吗？这次你也可以的。",
    }),
  },
  {
    topicSlug: "teen-communication",
    selCompetencies: ["relationship-skills", "social-awareness"],
    reflectPrompt: "What small moment of connection happened today?",
    reflectPromptZh: "今天有哪个小小的连接时刻？",
    isFlagshipJourney: false,
    default: simpleContent({
      heading: "My teen doesn't\nwant to talk to me",
      headingZh: "青少年不愿意\n和我沟通",
      understand:
        "Teens pulling away from conversation is often a normal part of building independence, not a sign they don't need you.",
      understandZh: "青少年在沟通上有所保留，往往是建立独立性的正常过程，并不代表他们不需要你。",
      respond: [
        "Stay available without forcing a conversation.",
        "Talk side-by-side during an activity instead of face-to-face.",
      ],
      respondZh: ["保持在场和可被求助的状态，但不强迫对话。", "在一起做事时并肩聊天，而不是面对面\u201c审问\u201d。"],
      lessHelpful: "You never tell me anything anymore.",
      lessHelpfulZh: "你现在什么都不跟我说了。",
      moreHelpful: "I'm here whenever you want to talk, no pressure.",
      moreHelpfulZh: "你想聊的时候我都在，不着急。",
    }),
  },
];

function simpleContent(input: {
  heading: string;
  headingZh: string;
  understand: string;
  understandZh: string;
  respond: string[];
  respondZh: string[];
  lessHelpful: string;
  lessHelpfulZh: string;
  moreHelpful: string;
  moreHelpfulZh: string;
}): SituationContent {
  return {
    heading: input.heading,
    headingZh: input.headingZh,
    understand: input.understand,
    understandZh: input.understandZh,
    respond: input.respond,
    respondZh: input.respondZh,
    trySaying: {
      lessHelpful: input.lessHelpful,
      lessHelpfulZh: input.lessHelpfulZh,
      moreHelpful: input.moreHelpful,
      moreHelpfulZh: input.moreHelpfulZh,
    },
  };
}

export function getSituation(slug: string): ParentingSituation {
  return situations.find((s) => s.topicSlug === slug) ?? situations[0];
}

/** Resolves the right content tier for a situation given the active age bucket. */
export function resolveSituationContent(
  situation: ParentingSituation,
  bucket: AgeBucket
): SituationContent {
  return situation.ageVariants?.[bucket] ?? situation.default;
}

export const flagshipTopicSlugs: string[] = situations
  .filter((s) => s.isFlagshipJourney)
  .map((s) => s.topicSlug);

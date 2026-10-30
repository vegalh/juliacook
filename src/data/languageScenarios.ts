import type { AgeBucket } from "./ageGroups";

/**
 * Data for the "换一种说法" (ParentLanguageExplorer) interactive feature.
 *
 * All scenarios and feedback copy here are original, written for this
 * prototype — none of it is attributed to Julia Cook. Feedback is written to
 * be descriptive and hedged ("often", "may", "can") rather than judgmental or
 * absolute: the goal is reflection, not grading a parent's response. See
 * docs/content-model.md.
 */

export interface LanguageOption {
  /** The line a parent might actually say. */
  text: string;
  textZh: string;
  /** What this response tends to communicate to a child, beyond its literal words. */
  communicates: string;
  communicatesZh: string;
  /** A plausible (not guaranteed) way a child could interpret or feel about it. */
  childInterprets: string;
  childInterpretsZh: string;
  /** How it could influence cooperation and emotional safety in the moment. */
  cooperationNote: string;
  cooperationNoteZh: string;
  /** Optional nudge toward a more connecting alternative, shown only when useful. */
  alternative?: string;
  alternativeZh?: string;
}

export type ScenarioAgeContext = "younger" | "teen" | "general";

export interface LanguageScenario {
  id: string;
  ageContext: ScenarioAgeContext;
  /** One-line restatement of what just happened. */
  situationLine: string;
  situationLineZh: string;
  optionA: LanguageOption;
  optionB: LanguageOption;
}

/**
 * Everyday, standalone parenting moments for the Language Lab (`/language-lab`)
 * and the Home screen's featured exercise. These are intentionally smaller and
 * more universal than the five flagship SEL journeys.
 */
export const standaloneLanguageScenarios: LanguageScenario[] = [
  {
    id: "spilled-water",
    ageContext: "younger",
    situationLine: "Your child spills water on the floor.",
    situationLineZh: "孩子把水洒在地上。",
    optionA: {
      text: "You spilled water again!",
      textZh: "你怎么又把水洒了！",
      communicates: "That this was a careless, repeated failure worth calling out.",
      communicatesZh: "这件事是一次不小心的、反复出现的“失误”，需要被点名。",
      childInterprets: "A child may hear mainly the frustration and focus on not getting in trouble, rather than on what to do next.",
      childInterpretsZh: "孩子可能更多听到的是你的不满，注意力会放在“别再惹麻烦”上，而不是接下来该怎么做。",
      cooperationNote: "This can still get the floor cleaned, but it may also make a child hesitant to tell you about small accidents next time.",
      cooperationNoteZh: "这样说通常还是能让地板被擦干净，但也可能让孩子下次更不敢主动告诉你类似的小意外。",
      alternative: "The water spilled. Let's grab a towel and clean it up together.",
      alternativeZh: "水洒出来了，我们一起拿毛巾擦干净吧。",
    },
    optionB: {
      text: "The water spilled. Let's grab a towel and clean it up together.",
      textZh: "水洒出来了，我们一起拿毛巾擦干净吧。",
      communicates: "That accidents are a normal, fixable part of life, not a verdict on the child.",
      communicatesZh: "意外是生活中正常、可以解决的一部分，不是对孩子本身的评判。",
      childInterprets: "A child is more likely to feel safe admitting mistakes and may focus on the practical next step — cleaning up.",
      childInterpretsZh: "孩子更可能安心地承认自己的小失误，并把注意力放在实际要做的事——收拾干净。",
      cooperationNote: "This tends to invite cooperation on cleanup, though it doesn't guarantee the spill won't happen again tomorrow.",
      cooperationNoteZh: "这种说法通常更容易带来配合收拾的意愿，但不代表明天就一定不会再发生类似的事。",
    },
  },
  {
    id: "toy-grab",
    ageContext: "younger",
    situationLine: "Your child grabs a toy another kid was playing with.",
    situationLineZh: "孩子抢了别的小朋友正在玩的玩具。",
    optionA: {
      text: "Give it back right now, that's so rude!",
      textZh: "马上把玩具还回去，你怎么这么没礼貌！",
      communicates: "Urgency and disapproval of the child as a person, not just the action.",
      communicatesZh: "传递出紧迫感，并且带有对孩子本身（而不仅是这个行为）的否定。",
      childInterprets: "A young child may feel shamed in front of others and focus on the embarrassment more than on the other child's feelings.",
      childInterpretsZh: "小朋友可能会觉得在别人面前很丢脸，注意力更多放在自己的难堪上，而不是对方的感受。",
      cooperationNote: "The toy likely gets returned, but the child may not yet understand why turn-taking matters.",
      cooperationNoteZh: "玩具大概率会被还回去，但孩子可能还没理解“为什么要轮流玩”这件事本身。",
      alternative: "That toy is still his turn. Let's go ask when you can have it next.",
      alternativeZh: "这个玩具现在是他在玩，我们一起去问问什么时候能轮到你。",
    },
    optionB: {
      text: "That toy is still his turn. Let's go ask when you can have it next.",
      textZh: "这个玩具现在是他在玩，我们一起去问问什么时候能轮到你。",
      communicates: "That turns are fair and can be negotiated, and that wanting something is okay even when you can't have it yet.",
      communicatesZh: "轮流是公平的、可以商量的，也在传递“想要某样东西是可以的，只是现在还不能拥有”。",
      childInterprets: "A child can start to connect waiting with a concrete next step, rather than experiencing it as a flat no.",
      childInterpretsZh: "孩子能把“等待”和一个具体的下一步联系起来，而不只是感觉被简单地拒绝了。",
      cooperationNote: "This models the turn-taking skill directly, though a young child may still need the step repeated many times.",
      cooperationNoteZh: "这直接示范了轮流的技巧，不过小朋友可能还需要反复练习很多次才能真正掌握。",
    },
  },
  {
    id: "supermarket-meltdown",
    ageContext: "younger",
    situationLine: "Your child cries loudly in the store because you won't buy a toy.",
    situationLineZh: "孩子在商店里因为你不给买玩具而大声哭闹。",
    optionA: {
      text: "Keep crying and we're leaving with nothing!",
      textZh: "再哭我们就走，什么都不买了！",
      communicates: "That the behavior itself — not the underlying want — is the problem to be stopped.",
      communicatesZh: "传递出“行为本身是问题，需要被制止”，而没有回应孩子真正想要的东西。",
      childInterprets: "A child mid-meltdown often can't process a threat logically and may just escalate further, feeling cornered.",
      childInterpretsZh: "情绪崩溃中的孩子往往无法理性处理这种威胁，反而可能因为感觉被逼到墙角而情绪升级。",
      cooperationNote: "It may end the moment through fear of consequences, but it doesn't teach what to do with big disappointment next time.",
      cooperationNoteZh: "这可能会因为害怕后果而暂时结束场面，但并没有教会孩子下次该如何应对巨大的失望。",
      alternative: "I know you really want it. We're not buying a toy today, but we can put it on your wish list.",
      alternativeZh: "我知道你真的很想要这个，今天我们没有计划买玩具，不过你可以把它记在你的愿望清单里。",
    },
    optionB: {
      text: "I know you really want it. We're not buying a toy today, but we can put it on your wish list.",
      textZh: "我知道你真的很想要这个，今天我们没有计划买玩具，不过你可以把它记在你的愿望清单里。",
      communicates: "That the want itself is understood and valid, even while the answer stays no.",
      communicatesZh: "承认并理解孩子的渴望本身是合理的，即使答案依然是不可以。",
      childInterprets: "A child may still be disappointed, but feeling understood can make the disappointment easier to move through.",
      childInterpretsZh: "孩子可能仍然会失望，但“被理解”这件事往往能让失望感更容易被消化。",
      cooperationNote: "This doesn't promise the crying will stop immediately, but it keeps the connection open while holding the boundary.",
      cooperationNoteZh: "这不代表哭闹会立刻停止，但能在坚持原则的同时，保持和孩子之间的情感连接。",
    },
  },
  {
    id: "homework-procrastination",
    ageContext: "general",
    situationLine: "Your child has put off homework until right before bedtime, again.",
    situationLineZh: "孩子又把作业拖到睡前最后一刻才开始做。",
    optionA: {
      text: "You always leave everything until the last minute!",
      textZh: "你又把作业拖到这么晚，每次都这样！",
      communicates: "That this is a fixed, repeated character trait (\"always\"), not a specific, solvable moment.",
      communicatesZh: "暗示这是一个固定的、反复出现的性格问题（“每次都”），而不是一个具体、可以解决的当下情况。",
      childInterprets: "A child may feel labeled as someone who can't manage time, which can make starting feel even harder.",
      childInterpretsZh: "孩子可能会觉得自己被贴上了“不会管理时间”的标签，这反而会让开始做作业变得更难。",
      cooperationNote: "It may produce a rushed start out of pressure, but doesn't address why the task kept getting put off.",
      cooperationNoteZh: "这可能会因为压力让孩子匆忙开始，但并没有解决作业一直被拖延的真正原因。",
      alternative: "Homework looks like a lot tonight. What's one small part we could start with?",
      alternativeZh: "作业看起来有点多，我们先从哪一小部分开始？",
    },
    optionB: {
      text: "Homework looks like a lot tonight. What's one small part we could start with?",
      textZh: "作业看起来有点多，我们先从哪一小部分开始？",
      communicates: "That the task feeling big is understandable, and that starting small is a reasonable strategy.",
      communicatesZh: "认可任务本身确实让人觉得庞大，并提出“从小处开始”是一个合理的策略。",
      childInterprets: "A child may feel the task is more manageable, rather than facing one large wall of \"homework.\"",
      childInterpretsZh: "孩子可能会感觉任务更容易上手，而不是面对一整堵“作业”的高墙。",
      cooperationNote: "This can lower the activation energy to begin, though it won't instantly fix a pattern built over many nights.",
      cooperationNoteZh: "这能降低“开始”这件事所需要的心理门槛，但不会一下子改变长期养成的拖延习惯。",
    },
  },
  {
    id: "teen-closed-door",
    ageContext: "teen",
    situationLine: "Your teen shuts their bedroom door and doesn't want to talk.",
    situationLineZh: "青少年把自己关在房间里，不想说话。",
    optionA: {
      text: "You're shutting yourself away again — what's going on?",
      textZh: "你又把自己关起来，到底怎么回事？",
      communicates: "That withdrawing is itself being treated as the problem, which can feel like pressure rather than care.",
      communicatesZh: "把“把自己关起来”本身当作问题来质问，这可能会让孩子感觉是压力而不是关心。",
      childInterprets: "A teen may feel cornered into explaining before they're ready, and close off further instead.",
      childInterpretsZh: "青少年可能会觉得自己在还没准备好的时候就被逼着解释，反而会更加封闭。",
      cooperationNote: "It may prompt a short, defensive answer, but is less likely to open an honest conversation right now.",
      cooperationNoteZh: "这可能换来一句简短、带防御性的回答，但目前不太可能换来一次真诚的对话。",
      alternative: "You seem like you don't feel like talking. I'm around if you want to later, no rush.",
      alternativeZh: "我看到你好像不太想说话，我就在旁边，等你想聊的时候我都在，不着急。",
    },
    optionB: {
      text: "You seem like you don't feel like talking. I'm around if you want to later, no rush.",
      textZh: "我看到你好像不太想说话，我就在旁边，等你想聊的时候我都在，不着急。",
      communicates: "That space is okay, and that your availability doesn't depend on them talking right now.",
      communicatesZh: "传递出“需要空间是可以的”，也说明你的陪伴不取决于他现在是否愿意说话。",
      childInterprets: "A teen may feel less pressure to perform openness on demand, which can make them more likely to approach you later.",
      childInterpretsZh: "青少年可能会感觉不需要立刻“表演”出愿意沟通的样子，这反而可能让他们之后更愿意主动来找你。",
      cooperationNote: "This won't force a conversation tonight, but it keeps the door open without making withdrawal feel punished.",
      cooperationNoteZh: "这不会让对话今晚就发生，但它让沟通的大门保持敞开，也不会让“想独处”这件事变成一种被惩罚的行为。",
    },
  },
  {
    id: "teen-group-chat-anger",
    ageContext: "teen",
    situationLine: "Your teen slams their phone down after being talked about in a group chat.",
    situationLineZh: "青少年因为被朋友在群聊里说坏话，生气地把手机摔在一边。",
    optionA: {
      text: "What's the big deal, why slam your phone like that?",
      textZh: "有什么大不了的，至于摔手机吗？",
      communicates: "That the reaction is being judged before the underlying hurt is even understood.",
      communicatesZh: "在还没了解背后的委屈之前，先对孩子的反应做出了评判。",
      childInterprets: "A teen may feel their distress was dismissed as an overreaction, making them less likely to share what happened.",
      childInterpretsZh: "青少年可能会觉得自己的情绪被当成“小题大做”而被否定，之后也更不愿意说出发生了什么。",
      cooperationNote: "It may stop the slamming in the moment, but is unlikely to help them process what actually happened online.",
      cooperationNoteZh: "这可能会让摔东西的动作暂时停止，但不太能帮助他们真正消化线上发生的事情。",
      alternative: "That sounds like it really hurt. Want to take a minute, or tell me what happened?",
      alternativeZh: "听起来这件事让你很难受，想先冷静一下，还是想跟我说说发生了什么？",
    },
    optionB: {
      text: "That sounds like it really hurt. Want to take a minute, or tell me what happened?",
      textZh: "听起来这件事让你很难受，想先冷静一下，还是想跟我说说发生了什么？",
      communicates: "That the feeling is taken seriously and that the teen gets to choose the pace of talking about it.",
      communicatesZh: "认真对待孩子的感受，同时把“什么时候谈这件事”的主动权交给孩子。",
      childInterprets: "A teen may feel their reaction makes sense to someone, which can lower the intensity of the moment.",
      childInterpretsZh: "青少年可能会感觉自己的反应是“有人理解的”，这往往能让当下的情绪强度降低一些。",
      cooperationNote: "This doesn't erase the online conflict, but it can make a teen more willing to loop you in on what's happening.",
      cooperationNoteZh: "这不会让线上的冲突消失，但更可能让青少年愿意让你了解正在发生的事情。",
    },
  },
];

/**
 * Enriched explorer scenarios for the five flagship SEL journeys, keyed by
 * topic slug and age bucket. Built from the same "try saying" phrases already
 * shown on `SituationPage` (see src/data/situations.ts) so the static and
 * interactive copy always agree, with additional structured feedback layered
 * on top for the interactive experience.
 */
export const flagshipLanguageScenarios: Record<
  string,
  Partial<Record<AgeBucket, LanguageScenario>>
> = {
  "getting-angry": {
    younger: {
      id: "getting-angry-younger",
      ageContext: "younger",
      situationLine: "Your child is mid-meltdown over something that feels small to you.",
      situationLineZh: "孩子因为一件在你看来很小的事，正在崩溃大哭。",
      optionA: {
        text: "Stop crying right now!",
        textZh: "别哭了，马上给我停下来！",
        communicates: "That the crying itself needs to end immediately, more than the feeling behind it matters.",
        communicatesZh: "传递出“哭这件事必须马上停止”，而不是先关注哭闹背后的情绪。",
        childInterprets: "A child mid-meltdown usually can't simply switch off big feelings on command, and may feel more alone in them.",
        childInterpretsZh: "崩溃中的孩子往往没办法一声令下就关掉强烈的情绪，反而可能感觉更孤单。",
        cooperationNote: "It may suppress the crying briefly out of fear, but doesn't help the nervous system actually settle.",
        cooperationNoteZh: "这可能会因为害怕而暂时压下哭声，但并不能真正帮助神经系统平静下来。",
        alternative: "I can see you're really upset. I'm here with you.",
        alternativeZh: "我看到你很生气，我在这里陪着你。",
      },
      optionB: {
        text: "I can see you're really upset. I'm here with you.",
        textZh: "我看到你很生气，我在这里陪着你。",
        communicates: "That big feelings are allowed, and that your presence isn't conditional on the child calming down first.",
        communicatesZh: "大情绪是被允许的，而且你的陪伴并不以孩子先平静下来为条件。",
        childInterprets: "A child can start to feel less alone with the emotion, which often (not always) helps the wave pass sooner.",
        childInterpretsZh: "孩子会感觉自己在情绪中没有被孤立，这通常（但并非总是）能帮助情绪浪潮更快地过去。",
        cooperationNote: "This keeps connection open during the meltdown, which tends to make the calmer conversation afterward easier.",
        cooperationNoteZh: "这能在崩溃期间保持情感连接，往往能让之后冷静下来的对话更容易进行。",
      },
    },
    older: {
      id: "getting-angry-older",
      ageContext: "teen",
      situationLine: "Your preteen or teen snaps and slams a door after being told no.",
      situationLineZh: "青少年被拒绝后，不耐烦地摔门发火。",
      optionA: {
        text: "You're too old to act like this.",
        textZh: "你都这么大了，还这样闹脾气？",
        communicates: "That the reaction is being measured against an age standard, rather than being understood on its own.",
        communicatesZh: "把这次反应拿去和“这个年龄该有的样子”做比较，而不是先理解当下发生了什么。",
        childInterprets: "An older kid may feel shamed for still having normal feelings, and may hide reactions rather than share them.",
        childInterpretsZh: "大一点的孩子可能会因为“还有情绪”而感到羞耻，之后更可能隐藏反应，而不是说出来。",
        cooperationNote: "This can end the visible outburst, but may push the underlying frustration further out of view.",
        cooperationNoteZh: "这可能会让表面的爆发停止，但也可能让背后真正的情绪更难被看见。",
        alternative: "Something's clearly bothering you. Want to talk now or in a bit?",
        alternativeZh: "看得出你现在很不舒服，想现在聊聊，还是等一下再说？",
      },
      optionB: {
        text: "Something's clearly bothering you. Want to talk now or in a bit?",
        textZh: "看得出你现在很不舒服，想现在聊聊，还是等一下再说？",
        communicates: "That the frustration is noticed without judgment, and the teen has some say over timing.",
        communicatesZh: "注意到了孩子的不满，但不做评判，并且把“什么时候谈”的选择权留给孩子。",
        childInterprets: "A teen may feel their reaction was seen as valid, which can reduce the urge to escalate further.",
        childInterpretsZh: "青少年可能会感觉自己的反应被看见和认可，这往往能降低继续升级的冲动。",
        cooperationNote: "This doesn't guarantee an instant calm conversation, but it leaves the door open on the teen's terms.",
        cooperationNoteZh: "这不保证马上就能冷静对话，但按青少年自己的节奏，把沟通的大门留开了。",
      },
    },
  },
  interrupting: {
    younger: {
      id: "interrupting-younger",
      ageContext: "younger",
      situationLine: "Your child interrupts you mid-sentence, again.",
      situationLineZh: "孩子又一次在你说话说到一半时打断了你。",
      optionA: {
        text: "How many times do I have to tell you to stop interrupting?",
        textZh: "我说了多少次不要打断别人，你怎么又来了？",
        communicates: "That this is treated as repeated disobedience rather than a still-developing skill.",
        communicatesZh: "把这件事当成反复出现的“不听话”，而不是一项还在发展中的能力。",
        childInterprets: "A young child may focus on feeling scolded rather than on learning what to do instead.",
        childInterpretsZh: "小朋友可能更多感受到被责备，而不是学到该怎么做才对。",
        cooperationNote: "It may produce a brief pause out of caution, but doesn't give the child a concrete tool to use next time.",
        cooperationNoteZh: "这可能会因为小心而带来短暂的停顿，但并没有给孩子一个下次可以用的具体办法。",
        alternative: "I want to hear your idea. Can you hold it for one more minute?",
        alternativeZh: "我很想听你的想法，可以再等一分钟吗？",
      },
      optionB: {
        text: "I want to hear your idea. Can you hold it for one more minute?",
        textZh: "我很想听你的想法，可以再等一分钟吗？",
        communicates: "That the child's thought matters and will get heard, just not at this exact second.",
        communicatesZh: "孩子的想法是重要的、会被听见的，只是现在还不是时候。",
        childInterprets: "A child may feel reassured their idea won't be forgotten, which can make waiting feel more doable.",
        childInterpretsZh: "孩子可能会安心，觉得自己的想法不会被忘记，这会让“等待”这件事感觉更容易做到。",
        cooperationNote: "This gives a concrete, practicable skill (holding a thought) rather than just naming the problem.",
        cooperationNoteZh: "这给了孩子一个具体、可以练习的技巧（先存住想法），而不只是指出问题所在。",
      },
    },
    older: {
      id: "interrupting-older",
      ageContext: "teen",
      situationLine: "Your older child keeps talking over others in a family conversation.",
      situationLineZh: "大一点的孩子在家庭对话中总是抢话。",
      optionA: {
        text: "You never let anyone finish talking.",
        textZh: "你从来不让别人把话说完。",
        communicates: "That this is framed as an absolute, unchanging trait (\"never\").",
        communicatesZh: "用“从来”这样的绝对化说法，把这当成了固定不变的性格。",
        childInterprets: "An older kid may feel permanently labeled rather than invited to adjust one specific habit.",
        childInterpretsZh: "大一点的孩子可能会觉得自己被“定性”了，而不是被邀请去调整一个具体的习惯。",
        cooperationNote: "This may trigger defensiveness (\"that's not true\") rather than reflection on the actual pattern.",
        cooperationNoteZh: "这可能引发防御性的反驳（“才不是呢”），而不是对这个习惯本身的反思。",
        alternative: "Let's both practice waiting for a pause before jumping in.",
        alternativeZh: "我们一起练习，等对方说完停顿了再开口。",
      },
      optionB: {
        text: "Let's both practice waiting for a pause before jumping in.",
        textZh: "我们一起练习，等对方说完停顿了再开口。",
        communicates: "That this is a shared, practicable skill rather than a one-sided character flaw to fix.",
        communicatesZh: "这是一项可以共同练习的技能，而不是单方面需要被纠正的性格缺点。",
        childInterprets: "An older kid may feel less singled out, since the parent is practicing it too.",
        childInterpretsZh: "大一点的孩子可能会觉得没有被单独针对，因为家长也在一起练习。",
        cooperationNote: "Framing it as mutual practice tends to lower defensiveness, though the habit still takes repetition to shift.",
        cooperationNoteZh: "把它说成共同练习，通常能降低防御心理，不过习惯的改变仍然需要反复练习。",
      },
    },
  },
  sharing: {
    younger: {
      id: "sharing-younger",
      ageContext: "younger",
      situationLine: "Your child refuses to let a friend play with a favorite toy.",
      situationLineZh: "孩子不愿意把心爱的玩具让朋友玩。",
      optionA: {
        text: "Don't be so selfish, just share it!",
        textZh: "别这么小气，赶紧分享！",
        communicates: "That wanting to keep the toy is a character flaw (\"selfish\") rather than a normal, age-typical feeling.",
        communicatesZh: "把“想留着玩具”这种正常的年龄阶段性感受，直接定义成一种性格缺陷（“小气”）。",
        childInterprets: "A child may feel bad about themselves for a feeling that's actually developmentally typical.",
        childInterpretsZh: "孩子可能会因为一种其实很正常的感受，而对自己产生负面评价。",
        cooperationNote: "It may produce reluctant compliance, but doesn't teach that sharing can be temporary and safe.",
        cooperationNoteZh: "这可能换来不情愿的服从，但并没有让孩子明白“分享”可以是暂时的、安全的。",
        alternative: "You can have it for two more minutes, then it's your friend's turn.",
        alternativeZh: "你可以再玩两分钟，然后轮到朋友玩。",
      },
      optionB: {
        text: "You can have it for two more minutes, then it's your friend's turn.",
        textZh: "你可以再玩两分钟，然后轮到朋友玩。",
        communicates: "That the toy isn't being taken away forever, just shared on a clear, time-limited basis.",
        communicatesZh: "玩具并不是被永久拿走，而是在一个清楚的、有时间限制的范围内分享。",
        childInterprets: "A child can hold onto the idea that they'll get the toy back, which makes the handoff feel safer.",
        childInterpretsZh: "孩子能记住“玩具最终还是会回到自己手上”，这会让交接的过程感觉更安全。",
        cooperationNote: "A visible time limit tends to make the moment easier for both kids, though it may need a reminder when time's up.",
        cooperationNoteZh: "一个清楚可见的时间限制通常能让两个孩子都更容易接受，不过时间到了可能还需要再提醒一次。",
      },
    },
    older: {
      id: "sharing-older",
      ageContext: "teen",
      situationLine: "Your older child is unwilling to split credit on a group project.",
      situationLineZh: "大一点的孩子不愿意在小组作业中分享功劳。",
      optionA: {
        text: "Don't be so selfish, just share it!",
        textZh: "别这么小气，赶紧分享！",
        communicates: "That wanting recognition for one's own work is framed as simple selfishness.",
        communicatesZh: "把“希望自己的付出被看到”直接简化成了“小气”。",
        childInterprets: "An older kid may feel their real effort and fairness concerns are being dismissed.",
        childInterpretsZh: "大一点的孩子可能会觉得自己的真实付出和公平诉求被忽视了。",
        cooperationNote: "This skips past the actual fairness question the child may be wrestling with.",
        cooperationNoteZh: "这忽略了孩子可能真正在纠结的那个公平问题。",
        alternative: "What would feel like a fair way to share the credit here?",
        alternativeZh: "你觉得怎么分享这份功劳会比较公平？",
      },
      optionB: {
        text: "What would feel like a fair way to share the credit here?",
        textZh: "你觉得怎么分享这份功劳会比较公平？",
        communicates: "That fairness is a real, worthwhile question to think through together, not something to brush past.",
        communicatesZh: "公平是一个值得认真一起思考的问题，而不是可以随便带过的小事。",
        childInterprets: "An older kid may feel taken seriously, which can make them more open to compromise.",
        childInterpretsZh: "大一点的孩子可能会感觉自己被认真对待，这会让他们更愿意做出让步。",
        cooperationNote: "Inviting their input tends to surface a workable compromise faster than insisting on an outcome.",
        cooperationNoteZh: "邀请孩子一起想办法，往往比直接要求结果更快找到一个可行的折中方案。",
      },
    },
  },
  "fear-of-failure": {
    younger: {
      id: "fear-of-failure-younger",
      ageContext: "younger",
      situationLine: "Your child gives up after one try at something new.",
      situationLineZh: "孩子尝试新事物一次没成功就想放弃。",
      optionA: {
        text: "It's not that hard, just try harder.",
        textZh: "这有什么难的，再努力一点就好了。",
        communicates: "That the difficulty the child feels isn't being taken at face value.",
        communicatesZh: "没有把孩子感受到的“困难”当回事。",
        childInterprets: "A child may feel their struggle is invisible or not legitimate, which can add shame on top of frustration.",
        childInterpretsZh: "孩子可能会觉得自己的困难没有被看见，在挫败感之上又多了一层羞愧。",
        cooperationNote: "It may push a half-hearted retry, but doesn't address the underlying fear of doing it wrong again.",
        cooperationNoteZh: "这可能会换来一次不太情愿的再次尝试，但并没有处理“又做错”这种潜在的害怕。",
        alternative: "Mistakes help your brain grow. What's one small step we could try?",
        alternativeZh: "犯错能帮助大脑成长。我们可以先试试哪一小步？",
      },
      optionB: {
        text: "Mistakes help your brain grow. What's one small step we could try?",
        textZh: "犯错能帮助大脑成长。我们可以先试试哪一小步？",
        communicates: "That mistakes are a normal, even useful, part of learning rather than a verdict on ability.",
        communicatesZh: "犯错是学习过程中正常甚至有用的一部分，而不是对能力的判决。",
        childInterprets: "A child may feel more willing to attempt a smaller, less intimidating next step.",
        childInterpretsZh: "孩子可能会更愿意去尝试一个更小、没那么吓人的下一步。",
        cooperationNote: "Breaking the task down tends to lower resistance, though some tasks may still need several small steps.",
        cooperationNoteZh: "把任务拆小通常能降低抵触情绪，不过有些任务可能仍然需要拆成好几个小步骤。",
      },
    },
    older: {
      id: "fear-of-failure-older",
      ageContext: "teen",
      situationLine: "Your teen avoids trying out for something because they might not make it.",
      situationLineZh: "青少年因为担心选不上，不敢去尝试报名。",
      optionA: {
        text: "Just don't worry about what other people think.",
        textZh: "别管别人怎么想就好了。",
        communicates: "That the social fear is easy to dismiss, even though it usually doesn't feel that way to a teen.",
        communicatesZh: "暗示这种对他人看法的担心很容易放下，而青少年实际上往往并不觉得容易。",
        childInterprets: "A teen may feel their very real worry is being minimized rather than understood.",
        childInterpretsZh: "青少年可能会觉得自己真实的担忧被轻视了，而不是被理解。",
        cooperationNote: "This rarely changes the underlying fear, since it doesn't engage with what's actually driving it.",
        cooperationNoteZh: "这通常无法改变背后真正的恐惧，因为它没有触及问题的根源。",
        alternative: "It makes sense to feel nervous. What's one small way to try it safely?",
        alternativeZh: "会紧张很正常。有没有什么比较安全的小方式可以先试试看？",
      },
      optionB: {
        text: "It makes sense to feel nervous. What's one small way to try it safely?",
        textZh: "会紧张很正常。有没有什么比较安全的小方式可以先试试看？",
        communicates: "That the nervousness is a reasonable response, not something to be talked out of.",
        communicatesZh: "紧张是一种合理的反应，而不是需要被说服放下的东西。",
        childInterprets: "A teen may feel understood first, which can make it easier to consider a lower-stakes first step.",
        childInterpretsZh: "青少年可能会先感觉被理解，这会让他们更愿意考虑一个风险较低的第一步。",
        cooperationNote: "Naming a small, safe first step tends to make trying feel more possible than a blanket reassurance would.",
        cooperationNoteZh: "提出一个具体、安全的小小第一步，往往比空泛的安慰更能让“尝试”这件事变得可行。",
      },
    },
  },
  "friend-conflict": {
    younger: {
      id: "friend-conflict-younger",
      ageContext: "younger",
      situationLine: "Your child comes home upset after an argument with a friend.",
      situationLineZh: "孩子因为和朋友吵架，回家后很难过。",
      optionA: {
        text: "Just ignore it, it's not a big deal.",
        textZh: "别理他就好了，没什么大不了的。",
        communicates: "That the hurt doesn't need much attention, even though it may feel very big to the child.",
        communicatesZh: "暗示这件事不值得太在意，而孩子自己的感受可能完全相反。",
        childInterprets: "A child may feel their feelings were brushed off, and may stop bringing up friendship worries to you.",
        childInterpretsZh: "孩子可能会觉得自己的感受被轻视了，以后也更不愿意跟你说友谊方面的烦恼。",
        cooperationNote: "It may end the conversation quickly, but doesn't help the child process what happened or plan a next step.",
        cooperationNoteZh: "这可能会让对话很快结束，但并没有帮助孩子消化发生的事，也没有想出下一步该怎么做。",
        alternative: "That sounds like it really hurt. What do you think happened?",
        alternativeZh: "听起来你很难受。你觉得当时发生了什么？",
      },
      optionB: {
        text: "That sounds like it really hurt. What do you think happened?",
        textZh: "听起来你很难受。你觉得当时发生了什么？",
        communicates: "That the feeling is valid and worth understanding fully before jumping to a solution.",
        communicatesZh: "承认孩子的感受是真实的、值得先被充分理解，而不是急着给出解决办法。",
        childInterprets: "A child may feel heard, which often makes it easier for them to think through what happened on their own.",
        childInterpretsZh: "孩子可能会感觉被倾听，这通常能让他们更容易自己理清发生了什么。",
        cooperationNote: "Listening first tends to surface more of the real story before any repair steps are discussed.",
        cooperationNoteZh: "先倾听往往能了解到更完整的事情经过，之后再讨论如何修复关系也会更有针对性。",
      },
    },
    older: {
      id: "friend-conflict-older",
      ageContext: "teen",
      situationLine: "Your teen is stuck in an unresolved conflict with a friend group.",
      situationLineZh: "青少年和朋友圈之间的矛盾一直没有解决。",
      optionA: {
        text: "Just apologize and move on already.",
        textZh: "赶紧道个歉，这件事就过去了。",
        communicates: "That the fastest resolution is the goal, more than understanding what actually needs to be repaired.",
        communicatesZh: "把“快点解决”当成目标，而不是先搞清楚到底需要修复什么。",
        childInterprets: "A teen may feel pushed toward a quick fix that doesn't reflect how they actually feel about the situation.",
        childInterpretsZh: "青少年可能会感觉被推着做一个快速了事的决定，而这和他们真实的感受并不一致。",
        cooperationNote: "A rushed apology may paper over the conflict without addressing the underlying group dynamics.",
        cooperationNoteZh: "一次匆忙的道歉可能只是表面上盖过了冲突，并没有处理背后真正的群体关系问题。",
        alternative: "What do you want this friendship to look like going forward?",
        alternativeZh: "你希望这段友谊以后是什么样子？",
      },
      optionB: {
        text: "What do you want this friendship to look like going forward?",
        textZh: "你希望这段友谊以后是什么样子？",
        communicates: "That the teen's own sense of what they want matters, rather than imposing a fixed outcome.",
        communicatesZh: "重视青少年自己对这段关系的期待，而不是强加一个固定的结果。",
        childInterprets: "A teen may feel more ownership over how to handle it, which can reduce resentment about being told what to do.",
        childInterpretsZh: "青少年可能会对如何处理这件事更有主导感，这能减少“被要求该怎么做”的抵触情绪。",
        cooperationNote: "This invites the teen to think it through rather than solving it for them, which tends to build longer-term skill.",
        cooperationNoteZh: "这邀请青少年自己理清思路，而不是替他们解决问题，更有利于长期培养这项能力。",
      },
    },
  },
};

export function flagshipScenarioFor(topicSlug: string, bucket: AgeBucket): LanguageScenario | undefined {
  return flagshipLanguageScenarios[topicSlug]?.[bucket];
}

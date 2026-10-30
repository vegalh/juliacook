import { VERIFIED_BIBLIOGRAPHIC } from "../../content/licensing";
import type { BookResource } from "./types";

/**
 * Companion resources related to the Julia Cook book catalog.
 *
 * None of these are purchasable, downloadable, or playable from within this
 * app — every record only links out to the publisher's own site. "Verified"
 * here means a link to the item was actually observed live on
 * juliacookonline.com (fetched 2026-10-11), not that this app has obtained
 * any rights to the item itself. See docs/julia-cook-resource-inventory.md.
 */
export const bookResources: BookResource[] = [
  {
    id: "activity-book-my-mouth-is-a-volcano",
    bookIds: ["my-mouth-is-a-volcano"],
    kind: "activity_book",
    title: "My Mouth Is a Volcano! Activity Book",
    titleZh: "《我的嘴巴是座火山！》配套活动手册",
    existenceStatus: "verified",
    accessType: "purchase_required",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/2005/01/01/my-mouth-is-a-volcano/",
    note:
      "A \"buy the activity book\" purchase link is present on the book's official page, confirming this companion product exists. It is sold directly by the publisher; this app does not sell, host, or preview it.",
    noteZh: "书籍官方页面上有\u201c购买配套活动手册\u201d的链接，确认该配套产品确实存在。该产品由出版方直接销售，本应用不出售、不托管、也不预览其内容。",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "activity-book-teamwork-isnt-my-thing",
    bookIds: ["teamwork-isnt-my-thing-and-i-dont-like-to-share"],
    kind: "activity_book",
    title: "Teamwork Isn't My Thing and I Don't Like to Share — Activity Book",
    existenceStatus: "verified",
    accessType: "purchase_required",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/2012/08/15/teamwork-isnt-my-thing-and-i-dont-like-to-share/",
    note: "Confirmed via a \"buy the Activity book\" purchase link on the book's official page.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "activity-book-bubble-gum-brain",
    bookIds: ["bubble-gum-brain"],
    kind: "activity_book",
    title: "Bubble Gum Brain Activity Book",
    existenceStatus: "verified",
    accessType: "purchase_required",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/2017/04/25/bubble-gum-brain-ready-get-mindset-grow/",
    note: "Confirmed via a \"buy the activity book\" purchase link on the book's official page.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "activity-book-soda-pop-head",
    bookIds: ["soda-pop-head"],
    kind: "activity_book",
    title: "Soda Pop Head Activity Book",
    existenceStatus: "verified",
    accessType: "purchase_required",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/2011/09/01/soda-pop-head/",
    note: "Confirmed via a \"buy the activity book\" purchase link on the book's official page.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "activity-book-bully-beans",
    bookIds: ["bully-beans"],
    kind: "activity_book",
    title: "Bully B.E.A.N.S. Activity Book",
    existenceStatus: "verified",
    accessType: "purchase_required",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/2019/09/25/bully-b-e-a-n-s/",
    note: "Confirmed via a \"buy the activity book\" purchase link on the book's official page.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "spanish-edition-i-just-dont-like-the-sound-of-no",
    bookIds: ["i-just-dont-like-the-sound-of-no"],
    kind: "spanish_edition",
    title: "I Just Don't Like the Sound of No! (Spanish edition)",
    existenceStatus: "verified",
    accessType: "purchase_required",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/2015/10/01/i-just-dont-like-the-sound-of-no/",
    note: "Confirmed via a \"buy the book espa\u00f1ol\" purchase link on the book's official page. No Simplified Chinese edition was found for any title in this catalog.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "activity-book-i-just-dont-like-the-sound-of-no",
    bookIds: ["i-just-dont-like-the-sound-of-no"],
    kind: "activity_book",
    title: "I Just Don't Like the Sound of No! Activity Book",
    existenceStatus: "verified",
    accessType: "purchase_required",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/2015/10/01/i-just-dont-like-the-sound-of-no/",
    note: "Confirmed via a \"buy the activity book\" purchase link on the book's official page.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "activity-book-wilma-jean-the-worry-machine",
    bookIds: ["wilma-jean-the-worry-machine"],
    kind: "activity_book",
    title: "Wilma Jean the Worry Machine Activity Book",
    existenceStatus: "verified",
    accessType: "purchase_required",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/2012/01/15/wilma-jean-the-worry-machine/",
    note: "Confirmed via a \"buy the activity book\" purchase link on the book's official page.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "activity-book-responsible-me-the-procrastinator",
    bookIds: ["the-procrastinator"],
    kind: "activity_book",
    title: "Responsible Me! Activity Book (shared with The PROcrastinator)",
    existenceStatus: "verified",
    accessType: "purchase_required",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/2017/02/01/the-procrastinator/",
    note:
      "Confirmed via a \"buy the responsible me activity book\" purchase link on this book's page. This activity book appears to be shared across the 'Responsible ME' series rather than unique to this title; other series titles were not individually checked for the same link.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "official-classroom-order-form",
    bookIds: [],
    kind: "classroom_order_form",
    title: "Julia Cook Classroom Order Form (PDF)",
    titleZh: "Julia Cook 课堂订购表（PDF）",
    existenceStatus: "verified",
    accessType: "free_link",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/assets/uploads/2026/10/2026PrintOrderForm.pdf",
    note:
      "An official, freely downloadable PDF linked from every book page and the site footer. It is a print order form for schools, not SEL content — included here only as a verified, brand-level resource link, not something this app distributes.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "official-titles-and-topics-pdf",
    bookIds: [],
    kind: "titles_topics_pdf",
    title: "Julia Cook Titles & Topics (PDF)",
    titleZh: "Julia Cook 书目与主题一览（PDF）",
    existenceStatus: "verified",
    accessType: "free_link",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/assets/uploads/2026/09/2026JCookTitlesTopics.pdf",
    note:
      "An official, freely downloadable PDF index of titles grouped by topic, linked from every book page and the site footer. Useful as a cross-check reference for this catalog, not reproduced here.",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "official-youtube-channel",
    bookIds: [],
    kind: "official_video_channel",
    title: "Julia Cook \u2014 official YouTube channel",
    titleZh: "Julia Cook 官方 YouTube 频道",
    existenceStatus: "verified",
    accessType: "free_link",
    availableInChinaApp: false,
    sourceUrl: "https://www.youtube.com/channel/UCS1Yfoy5FqdRCNC0bNmmN5Q",
    note:
      "The channel's existence and link (from the official homepage) were confirmed, but individual videos were not catalogued or matched to specific books in this research pass, and YouTube is not reliably accessible in Mainland China — so no 'Watch' resource is linked to any book from this channel yet. See docs/content-research-gaps.md.",
    noteZh:
      "已确认该频道存在（来自官网首页的链接），但本次研究未逐一整理具体视频或将其与书籍对应，且 YouTube 在中国大陆访问不稳定——因此目前没有任何书籍关联到该频道的\u201c观看\u201d类资源。详见 docs/content-research-gaps.md。",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
  {
    id: "cookie-bytes-newsletter",
    bookIds: [],
    kind: "newsletter",
    title: "COOKIE BYTES (Julia Cook's newsletter)",
    titleZh: "COOKIE BYTES（Julia Cook 的订阅通讯）",
    existenceStatus: "verified",
    accessType: "subscription",
    availableInChinaApp: false,
    sourceUrl: "https://juliacookonline.com/cookie-bytes/",
    note:
      "A real, publisher-run newsletter (hosted on Substack) with free and paid tiers, linked from the official site's footer on every page (\"JOIN COOKIE BYTES!\"). Paid-tier content was not accessed or reviewed. This app's own in-app feature with a similar name is original content and is not the same product — see docs/content-research-gaps.md for the naming-collision note.",
    noteZh:
      "这是出版方自己运营的真实订阅通讯（托管在 Substack 上），设有免费和付费层级，在官网每一页的页脚都有\u201cJOIN COOKIE BYTES!\u201d链接。本次研究未访问或查看付费内容。本应用中同名的功能是原创内容，与该通讯并非同一产品——命名巧合的说明见 docs/content-research-gaps.md。",
    licensing: VERIFIED_BIBLIOGRAPHIC,
  },
];

export function bookResourcesForBook(bookId: string): BookResource[] {
  return bookResources.filter((r) => r.bookIds.includes(bookId));
}

export function getBookResourceById(id: string): BookResource | undefined {
  return bookResources.find((r) => r.id === id);
}

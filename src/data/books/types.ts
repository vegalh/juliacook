import type { SelCompetencyId } from "../selCompetencies";
import type { LicensingMetadata } from "../../content/types";

/**
 * How thoroughly a book's own bibliographic record was checked against the
 * publisher's live site during Phase 3 research (see
 * docs/julia-cook-book-catalog.md for the full methodology).
 *
 * - "verified_detailed": publisher, illustrator, publication date, ISBN,
 *   grades/ages, official tags, and an original (not copied) synopsis were
 *   all individually confirmed by loading the book's page on
 *   juliacookonline.com.
 * - "verified_catalog_only": the title and its official detail-page URL were
 *   confirmed to exist via the official "Search by Title" listing, but the
 *   individual detail page was not separately opened/checked in this pass —
 *   treat ISBN/grades/tags for these as unconfirmed until someone does that
 *   follow-up pass.
 */
export type BookVerificationLevel = "verified_detailed" | "verified_catalog_only";

/**
 * How confident the *link* between this book and a given parenting-situation
 * topic slug is — independent of how well-verified the book's own metadata
 * is. A book can be fully `verified_detailed` while its topic link is still
 * a `hypothesis` authored for this app (not an official publisher claim).
 */
export type TopicMappingConfidence = "confirmed" | "hypothesis";

export interface JuliaCookBook {
  /** Stable kebab-case id, also used in the `/books/:bookId` route. */
  id: string;
  title: string;
  /**
   * An original, unofficial working translation of the title authored for
   * this China-first prototype — not a published/official Chinese title.
   * Only populated for the detailed-verification tier; see `titleZhIsOfficial`.
   */
  titleZh?: string;
  /** Always `false` here: no title in this catalog is an official Chinese release. */
  titleZhIsOfficial?: boolean;
  /** Series name (e.g. "Louis", "RJ", "Best Me I Can Be!"), if the book belongs to one. */
  series?: string;
  author: string;
  /** A named contributor/co-author credited on the book page, if any. */
  contributor?: string;
  illustrator?: string;
  publisher?: string;
  /** ISO 8601 date (YYYY-MM-DD) as published on juliacookonline.com. */
  publicationDate?: string;
  isbn?: string;
  grades?: string;
  ages?: string;
  /** USD list price as listed on the publisher's site. Informational only — nothing in this app supports purchasing. */
  priceUsd?: string;
  /** Official educational topic tags, copied verbatim from the book's own "TAGS" section (not the aggregate tag-cloud page). */
  officialTags?: string[];
  /** This app's parenting-situation slugs this book is associated with. Empty array means "no confident match found yet" — a real research gap, not an oversight. */
  topicSlugs: string[];
  mappingConfidence?: TopicMappingConfidence;
  /** Required whenever `mappingConfidence` is "hypothesis" — explains the reasoning and its limits. */
  mappingNote?: string;
  selCompetencies?: SelCompetencyId[];
  /** Original one-paragraph summary written for this app — never copied from the publisher's marketing copy. */
  summary: string;
  summaryZh?: string;
  /** Original one-sentence "what this book helps a child practice" framing, for the Book Hub. */
  whatChildrenMayLearn?: string;
  whatChildrenMayLearnZh?: string;
  verificationLevel: BookVerificationLevel;
  /** The book's own detail page on the publisher's site. */
  sourceUrl: string;
  /** Whether a "buy the activity book" (or shared series activity book) link was observed on the book's page. */
  hasOfficialActivityBook: boolean;
  /** Marks a title aimed at educators/parents rather than being a child-facing picture book (e.g. a teacher professional-development title). Defaults to "child" when omitted. */
  audience?: "child" | "educator";
  licensing: LicensingMetadata;
}

/** The kind of companion item a `BookResource` record represents. */
export type BookResourceKind =
  | "activity_book"
  | "spanish_edition"
  | "classroom_order_form"
  | "titles_topics_pdf"
  | "official_video_channel"
  | "newsletter";

/** Whether this item's existence was actually confirmed, vs. just suspected. */
export type ResourceExistenceStatus = "verified" | "unverified";

export type ResourceAccessType =
  /** Must be purchased from the publisher; this app only links out, never sells or hosts it. */
  | "purchase_required"
  /** Freely viewable at the linked URL without payment. */
  | "free_link"
  /** Requires a (possibly paid) subscription, e.g. a newsletter tier. */
  | "subscription";

/**
 * A companion resource related to one or more books (an activity book, a
 * Spanish edition, the publisher's official video channel, etc.) — distinct
 * from `Resource` in `src/types.ts`, which models this app's own in-house
 * demo content. `BookResource` never bundles any actual file; it only links
 * out to the verified, publicly-listed location of the real item.
 */
export interface BookResource {
  id: string;
  /** Books this resource is associated with. Omit/empty for a brand-level resource not tied to a specific title (e.g. the official YouTube channel). */
  bookIds: string[];
  kind: BookResourceKind;
  title: string;
  titleZh?: string;
  existenceStatus: ResourceExistenceStatus;
  accessType: ResourceAccessType;
  /** Always false in this catalog: no companion resource here has confirmed Mainland-China availability or rights. */
  availableInChinaApp: false;
  sourceUrl: string;
  /** Plain-language note on what was actually confirmed and what wasn't. */
  note: string;
  noteZh?: string;
  licensing: LicensingMetadata;
}

import { ArrowLeft, Bookmark, Info, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";
import { useAgeGroup } from "../context/AgeGroupContext";
import { ageGroups } from "../data/ageGroups";
import { locales, localeLabels, useLocale } from "../i18n";

const items = [
  { icon: Info, key: "about" as const },
  { icon: Mail, key: "contact" as const },
  { icon: ShieldCheck, key: "privacy" as const },
];

export function Profile() {
  const navigate = useNavigate();
  const { locale, setLocale, t } = useLocale();
  const { ageGroup, setAgeGroup } = useAgeGroup();

  return (
    <AppLayout>
      <Header
        left={
          <button type="button" aria-label={t("common.back")} onClick={() => navigate(-1)} className="text-navy">
            <ArrowLeft size={24} />
          </button>
        }
        center={<h1 className="font-serif text-xl font-bold text-navy">{t("profile.title")}</h1>}
      />

      <div className="px-5 pt-2 pb-6">
        <section className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("common.language")}</p>
          <div className="mt-2 flex gap-2">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                className={`min-h-11 flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
                  locale === l ? "bg-turquoise text-white" : "bg-light-turquoise text-navy"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("common.ageGroup")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ageGroups.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setAgeGroup(group)}
                className={`min-h-11 rounded-full px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  ageGroup === group ? "bg-turquoise text-white" : "bg-light-turquoise text-navy"
                }`}
              >
                {t(`ageGroups.${group}`)}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => navigate("/saved")}
          className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-light-turquoise text-turquoise">
            <Bookmark size={18} />
          </span>
          <p className="text-sm font-medium text-navy">{t("nav.saved")}</p>
        </button>

        <div className="mt-3 flex flex-col gap-3">
          {items.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-light-turquoise text-turquoise">
                <Icon size={18} />
              </span>
              <p className="text-sm font-medium text-navy">{t(`profile.${key}`)}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-muted">{t("profile.brandingNotice")}</p>
      </div>
    </AppLayout>
  );
}

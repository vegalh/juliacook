import { CircleUserRound, Info, Mail, ShieldCheck } from "lucide-react";
import { AppLayout } from "../components/AppLayout";
import { Header } from "../components/Header";

const items = [
  { icon: Info, label: "About Cookie Bytes by Julia" },
  { icon: Mail, label: "Contact Support" },
  { icon: ShieldCheck, label: "Privacy Policy" },
];

export function MorePage() {
  return (
    <AppLayout showNav>
      <Header
        center={<h1 className="font-serif text-xl font-bold text-navy">More</h1>}
        right={
          <button type="button" aria-label="Profile" className="text-navy">
            <CircleUserRound size={24} />
          </button>
        }
      />

      <div className="px-5 pt-2 pb-6">
        <div className="flex flex-col gap-3">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(23,43,77,0.06)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-light-turquoise text-turquoise">
                <Icon size={18} />
              </span>
              <p className="text-sm font-medium text-navy">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

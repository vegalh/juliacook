import { useState } from "react";

interface LogoProps {
  size?: number;
}

const LOGO_SRC = "/assets/julia-cook-logo.jpg";

/** Official Julia Cook logo, with a text fallback if the asset is missing. */
export function Logo({ size = 40 }: LogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-blue font-serif font-bold text-white"
        style={{ width: size, height: size, fontSize: size * 0.38 }}
        aria-label="Julia Cook"
        role="img"
      >
        JC
      </div>
    );
  }

  return (
    <img
      src={LOGO_SRC}
      alt="Julia Cook"
      style={{ height: size, width: "auto" }}
      className="object-contain"
      onError={() => setFailed(true)}
    />
  );
}

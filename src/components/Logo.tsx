import { useState } from "react";
import { isOfficiallyAuthorized } from "../branding/config";

interface LogoProps {
  size?: number;
}

const LOGO_SRC = `${import.meta.env.BASE_URL}assets/julia-cook-logo.jpg`;

/**
 * App mark. The bundled image's provenance/rights are undocumented, so unless
 * an authorized brand agreement is configured (see src/branding/config.ts),
 * this renders a neutral generated placeholder rather than implying any
 * official Julia Cook endorsement.
 */
export function Logo({ size = 40 }: LogoProps) {
  const [failed, setFailed] = useState(false);
  const showImage = isOfficiallyAuthorized() && !failed;

  if (!showImage) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-blue font-serif font-bold text-white"
        style={{ width: size, height: size, fontSize: size * 0.38 }}
        aria-label="Cookie Bytes by Julia"
        role="img"
      >
        CB
      </div>
    );
  }

  return (
    <img
      src={LOGO_SRC}
      alt="Cookie Bytes by Julia"
      style={{ height: size, width: "auto" }}
      className="object-contain"
      onError={() => setFailed(true)}
    />
  );
}

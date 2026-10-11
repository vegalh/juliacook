interface LogoProps {
  size?: number;
}

/** Temporary placeholder for the Cookie Bytes by Julia logo. */
export function Logo({ size = 40 }: LogoProps) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-orange font-serif font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-label="Cookie Bytes by Julia"
      role="img"
    >
      CB
    </div>
  );
}

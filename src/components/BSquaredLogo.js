import Image from "next/image";

export default function BSquaredLogo() {
  return (
    <Image
      fill
      src="/logo/ben2_logo_white.png"
      sizes="(max-width:50px)"
      alt="B Squared logo"
      className="hue-rotate-90"
    />
  );
}

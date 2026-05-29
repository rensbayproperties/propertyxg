import siteData from "@/constant/site";

type LogoVariant = {
  variant?: "white" | "default";
};

export default function PropXgLogo({ variant = "default" }: LogoVariant) {
  if (variant === "white") {
    return (
      <div className="flex items-center text-xl gap-1.5">
        <i className="bi-search-heart text-white"></i>
        <div className="text-white flex">{siteData.marketplace}</div>
      </div>
    );
  }
  return (
    <div className="flex items-center text-xl gap-1.5">
      <i className="bi-search-heart"></i>
      <div className="flex font-extrabold">{siteData.marketplace}</div>
    </div>
  );
}

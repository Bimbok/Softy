import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { socialLinks } from "@/lib/constants";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex gap-4 items-center absolute bottom-6 right-8 z-50">
      <Link target="_blank" className={buttonVariants({ size: "icon", variant: "ghost" })} href={socialLinks.instagram} title="Instagram">
        <InstagramLogoIcon className="size-5 text-white/50 hover:text-white transition-colors" />
      </Link>
      <Link target="_blank" className={buttonVariants({ size: "icon", variant: "ghost" })} href={socialLinks.linkedin} title="LinkedIn">
        <LinkedInLogoIcon className="size-5 text-white/50 hover:text-white transition-colors" />
      </Link>
      <Link target="_blank" className={buttonVariants({ size: "icon", variant: "ghost" })} href={socialLinks.github} title="GitHub">
        <GitHubLogoIcon className="size-5 text-white/50 hover:text-white transition-colors" />
      </Link>
    </div>
  );
};

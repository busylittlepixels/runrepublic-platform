import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

export const Logo = ({ href, className }: { href?: string; className?: string }) => {
  return (
    <Link href={href ?? "/"} className={cn("flex font-display text-2xl", className)}>
      Run Republic
    </Link>
  );
};

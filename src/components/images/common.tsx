import { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

export type PreviewProps = {
  title: string;
  subtitle: string;
  template: string;
};

export function PreviewContainer({
  containerClassName,
  className,
  children,
}: {
  children: ReactNode;
  containerClassName?: string;
  className?: string;
}) {
  return (
    <ScrollArea
      className={cn(
        "w-full max-w-[1200px] h-[627px] bg-accent",
        containerClassName,
      )}
    >
      <div
        id="preview"
        className={cn(
          "overflow-hidden w-[1200px] h-[627px] p-16 pt-24 flex flex-col items-center border-b-8 border-b-[#daebfc]",
          className,
        )}
      >
        {children}
      </div>
    </ScrollArea>
  );
}

export function PreviewAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "size-28 relative overflow-hidden z-10 rounded-full border-4 border-white box-border bg-blue",
        className,
      )}
    >
      <img
        className="absolute -top-[40px] -left-[225px] w-[240px] min-w-[500px] h-[500px]"
        src="/pfp.png"
      />
    </div>
  );
}

export function PreviewAuthor({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute bottom-0 right-0 p-2 py-4 font-mono text-xl text-yellow",
        className,
      )}
    >
      by ambi.moe
    </div>
  );
}

export function PreviewTitle({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <div
      className={cn(
        "text-7xl font-bold max-w-[700px] text-yellow text-center z-10 mt-4",
        className,
      )}
    >
      {title}
    </div>
  );
}

export function PreviewSubtitle({
  className,
  subtitle,
}: {
  className?: string;
  subtitle?: string;
}) {
  if (!subtitle) {
    return null;
  }

  return (
    <div
      className={cn(
        "text-foreground font-medium text-4xl max-w-[600px] z-10 text-center mt-10",
        className,
      )}
    >
      {subtitle}
    </div>
  );
}

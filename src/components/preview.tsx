import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { useNoise } from "@/lib/hooks";
import { FunctionComponent, ReactNode } from "react";

export type TemplateKey = "Default" | "TextOnly" | "StripesA";

type MetaTemplate = Record<TemplateKey, FunctionComponent<PreviewProps>>;

const TEMPLATES: MetaTemplate = {
  Default: ({ title, subtitle }) => {
    const canvasRef = useNoise({
      patternSize: 250,
      patternScaleX: 1,
      patternScaleY: 1,
      patternRefreshInterval: 0,
      patternAlpha: 15,
    });

    return (
      <PreviewContainer className="bg-gradient-to-b from-[--bg-gradient-top-color] to-[--bg-gradient-bottom-color] default-template">
        <canvas
          className={cn("absolute left-0 top-0 w-[1200px] h-[627px] z-0")}
          ref={canvasRef}
        />
        <PreviewAvatar />
        <PreviewTitle title={title} />
        <PreviewSubtitle subtitle={subtitle} />
      </PreviewContainer>
    );
  },
  TextOnly: ({ title }) => {
    return (
      <PreviewContainer
        containerClassName="h-20"
        className="bg-gradient-to-b from-[--bg-gradient-top-color] to-[--bg-gradient-bottom-color] textonly-template border-0 h-20 p-0 justify-center"
      >
        <PreviewTitle
          title={title}
          className="text-sm font-extralight mt-0 font-mono"
        />
      </PreviewContainer>
    );
  },
  StripesA: ({ title }) => {
    return (
      <PreviewContainer className="bg-gradient-to-b from-[--bg-gradient-top-color] to-[--bg-gradient-bottom-color] stripesA-template flex justify-center items-center p-16">
        <PreviewTitle
          title={title}
          className="bg-white w-full h-84 rounded-lg flex justify-center items-center p-8 text-gray-800 uppercase mt-0"
        />
        <PreviewAvatar className="absolute top-20" />
      </PreviewContainer>
    );
  },
};

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
  subtitle: string;
}) {
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

export function Preview({ title, subtitle, template }: PreviewProps) {
  const TemplateComponent = TEMPLATES[template as TemplateKey];
  return (
    <TemplateComponent title={title} subtitle={subtitle} template={template} />
  );
}

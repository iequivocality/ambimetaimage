import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { useNoise } from "@/lib/hooks";

export type PreviewProps = {
  title: string,
  subtitle: string,
  smallText: boolean,
  titleOnly: boolean
}

export function Preview({ title, subtitle, smallText, titleOnly }: PreviewProps) {
  const canvasRef = useNoise({
    patternSize: 250,
    patternScaleX: 1,
    patternScaleY: 1,
    patternRefreshInterval: 0,
    patternAlpha: 15,
  });

  return (
    <ScrollArea
      className={cn("w-full max-w-[1200px] h-[627px] bg-accent", {
        "h-15": smallText,
      })}
    >
      <div
        id="preview"
        className={cn(
          "overflow-hidden w-[1200px] h-[627px] p-16 pt-24 flex flex-col items-center border-b-8 border-b-[#daebfc] bg-gradient-to-b from-[--bg-gradient-top-color] to-[--bg-gradient-bottom-color]",
          {
            "border-0 h-20 p-0 justify-center": smallText,
            "justify-center": titleOnly,
          },
        )}
      >
        <canvas
          className={cn(
            "absolute left-0 top-0 w-[1200px] h-[627px] z-0",
            { "h-15 hidden": smallText },
          )}
          ref={canvasRef}
        />
        <div
          className={cn(
            "size-28 relative overflow-hidden z-10 rounded-full border-4 border-white box-border bg-blue",
          )}
          style={{
            display: titleOnly ? "none" : "block",
          }}
        >
          <img
            className="absolute -top-[40px] -left-[225px] w-[240px] min-w-[500px] h-[500px]"
            src="/pfp.png"
          />
        </div>
        <div
          className={cn(
            "text-7xl font-bold max-w-[700px] text-yellow text-center z-10 mt-4",
            {
              "text-sm font-extralight mt-0 font-mono": smallText,
            },
          )}
        >
          {title}
        </div>
        <div
          className="text-foreground font-medium text-4xl max-w-[600px] z-10 text-center mt-10"
          style={{
            display: titleOnly ? "none" : "block",
          }}
        >
          {subtitle}
        </div>
      </div>
    </ScrollArea>
  );
}
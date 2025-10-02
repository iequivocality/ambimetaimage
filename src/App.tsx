import { toJpeg } from "html-to-image";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import { DownloadIcon, TrashIcon } from "lucide-react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { useLocalStorage } from "usehooks-ts";
import { useNoise } from "./lib/hooks";

function App() {
  const [title, setTitle, removeTitle] = useLocalStorage("title", "");
  const [subtitle, setSubtitle, removeSubtitle] = useLocalStorage(
    "subtitle",
    "",
  );
  const [filename, setFilename, removeFilename] = useLocalStorage(
    "filename",
    "",
  );

  const download = () => {
    const previewNode = document.getElementById("preview")!;

    void toJpeg(previewNode).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${filename ? filename.toLowerCase() : "meta-image"}.jpeg`;
      link.href = dataUrl;
      link.click();
    });
  };

  const canvasRef = useNoise({
    patternSize: 250,
    patternScaleX: 1,
    patternScaleY: 1,
    patternRefreshInterval: 0,
    patternAlpha: 15,
  });

  return (
    <main className="flex p-16 items-center font-sans min-w-screen dark min-h-screen">
      <section className="grid w-full gap-y-8">
        <div className="flex flex-col gap-8 col-span-1 w-full">
          <h1 className="text-2xl font-bold">Meta Image Generator</h1>
          <div className="flex gap-x-8 w-full">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title" className="font-semibold">
                Title
              </Label>
              <Input
                className="w-full"
                type="text"
                id="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="subtitle" className="font-semibold">
                Subtitle
              </Label>
              <Input
                className="w-full"
                type="text"
                id="subtitle"
                placeholder="Subtitle"
                onChange={(e) => setSubtitle(e.target.value)}
                value={subtitle}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <Label htmlFor="subtitle" className="font-semibold">
              Filename
            </Label>
            <Input
              className="w-full"
              type="text"
              id="filename"
              placeholder="Filename"
              onChange={(e) => setFilename(e.target.value)}
              value={filename}
            />
          </div>
          <div className="flex items-center w-full gap-x-2">
            <Button
              variant="default"
              className="text-yellow bg-blue border-yellow border"
              onClick={() => {
                removeTitle();
                removeSubtitle();
                removeFilename();
              }}
            >
              <TrashIcon />
              Delete
            </Button>
            <Button
              variant="default"
              className="text-yellow bg-blue border-yellow border"
              onClick={download}
            >
              <DownloadIcon />
              Download
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 lg:col-span-4 justify-center">
          <ScrollArea className="w-full max-w-[1200px] h-[627px] bg-accent">
            <div
              id="preview"
              className="w-[1200px] h-[627px] p-16 pt-24 flex flex-col items-center border-b-8 border-b-[#daebfc] bg-gradient-to-b from-[--bg-gradient-top-color] to-[--bg-gradient-bottom-color]"
            >
              <canvas
                className="absolute left-0 top-0 w-[1200px] h-[627px] z-0"
                ref={canvasRef}
              />
              <div className="size-28 relative overflow-hidden z-10 rounded-full border-4 border-white box-border bg-blue">
                <img
                  className="absolute -top-[40px] -left-[225px] w-[240px] min-w-[500px] h-[500px]"
                  src="/pfp.png"
                />
              </div>
              <div className="text-7xl font-bold max-w-[700px] text-yellow text-center z-10 mt-4">
                {title}
              </div>
              <div className="text-foreground font-medium text-4xl max-w-[600px] z-10 text-center mt-10">
                {subtitle}
              </div>
            </div>
          </ScrollArea>
        </div>
      </section>
    </main>
  );
}

export default App;

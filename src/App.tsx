import { toJpeg } from "html-to-image";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import { DownloadIcon, TrashIcon } from "lucide-react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { useLocalStorage } from "usehooks-ts";
import { useNoise } from "./lib/hooks";
import { Checkbox } from "./components/ui/checkbox";
import { cn } from "./lib/utils";
import { Preview } from "./components/preview";

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
  const [titleOnly, setTitleOnly] = useLocalStorage("titleOnly", false, {
    deserializer: (s) => s === "true",
  });
  const [smallText, setSmallText] = useLocalStorage("smallText", false, {
    deserializer: (s) => s === "true",
  });

  const download = () => {
    const previewNode = document.getElementById("preview")!;

    void toJpeg(previewNode).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${filename ? filename.toLowerCase() : "meta-image"}.jpeg`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <main className="flex p-16 items-center font-sans min-w-screen dark min-h-screen">
      <section className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-8 col-span-1 w-full">
          <h1 className="text-2xl font-bold">Meta Image Generator</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
            <div className="flex flex-col gap-8">
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
              <div className="flex w-full gap-1.5">
                <Label htmlFor="titleOnly" className="font-semibold">
                  Title Only
                </Label>
                <Checkbox
                  id="titleOnly"
                  onCheckedChange={(checked) =>
                    setTitleOnly(checked === "indeterminate" ? false : checked)
                  }
                  value={titleOnly ? "checked" : ""}
                />
              </div>
              <div className="flex w-full gap-1.5">
                <Label htmlFor="smallText" className="font-semibold">
                  SmallText
                </Label>
                <Checkbox
                  id="smallText"
                  onCheckedChange={(checked) =>
                    setSmallText(checked === "indeterminate" ? false : checked)
                  }
                  value={smallText ? "checked" : ""}
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
          </div>
        </div>
        <div className="flex flex-col gap-y-4 lg:col-span-4 justify-center">
          <Preview title={title} subtitle={subtitle} smallText={smallText} titleOnly={titleOnly} />
        </div>
      </section>
    </main>
  );
}

export default App;

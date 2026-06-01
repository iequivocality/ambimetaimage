import { toJpeg } from "html-to-image";
import { Button } from "./components/ui/button";
import { DownloadIcon, ImageIcon, TrashIcon } from "lucide-react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { useLocalStorage } from "usehooks-ts";
import { Preview, TEMPLATES } from "./components/preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useRef, useState } from "react";

function App() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [title, setTitle, removeTitle] = useLocalStorage("title", "");
  const [subtitle, setSubtitle, removeSubtitle] = useLocalStorage(
    "subtitle",
    "",
  );
  const [filename, setFilename, removeFilename] = useLocalStorage(
    "filename",
    "",
  );

  const [template, setTemplate] = useLocalStorage<string>(
    "template",
    "StripesA",
  );

  const [imageUrl, setImageUrl] = useState<string>("");

  const download = () => {
    const previewNode = document.getElementById("preview")!;

    void toJpeg(previewNode).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${filename ? filename.toLowerCase() : "meta-image"}.jpeg`;
      link.href = dataUrl;
      link.click();
    });
  };

  const onChange = (_: React.ChangeEvent) => {
    if (!fileInput?.current) {
      return;
    }

    const f = fileInput.current;
    if (f.files && f.files.length === 1) {
      const imageFile = f.files[0];
      const toBase64 = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      toBase64.then((url) => {
        const image = new Image();
        image.onload = () => {
          // add url here
          setImageUrl(url);
        };
        image.src = url;
      });
    }
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
              <div className="flex items-center w-full gap-4">
                <Label htmlFor="subtitle" className="font-semibold">
                  Template
                </Label>
                <Select value={template} onValueChange={(v) => setTemplate(v)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Object.keys(TEMPLATES).map((template) => <SelectItem key={template} value={template}>{template}</SelectItem>)
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center w-full gap-x-2">
                {
                  template === "ImageWithText" && (
                  <>
                    <Button
                      variant="default"
                      className="text-yellow bg-blue border-yellow border"
                      onClick={() => {
                        fileInput?.current?.click();
                      }}
                    >
                      <ImageIcon />
                      Add image
                    </Button>
                    <input
                      className="hidden"
                      type="file"
                      accept="image/png, image/jpeg"
                      ref={fileInput}
                      onChange={onChange}
                    />
                  </>)
                }
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
                  Clear contents
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
          <Preview title={title} subtitle={subtitle} template={template} imageUrl={imageUrl} />
        </div>
      </section>
    </main>
  );
}

export default App;

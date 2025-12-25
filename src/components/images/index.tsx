import { useNoise } from "@/lib/hooks";
import {
  PreviewAuthor,
  PreviewAvatar,
  PreviewContainer,
  PreviewProps,
  PreviewSubtitle,
  PreviewTitle,
} from "./common";
import { cn } from "@/lib/utils";

export const Default = ({ title, subtitle }: PreviewProps) => {
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
      <PreviewAuthor />
    </PreviewContainer>
  );
};

export const TextOnly = ({ title }: PreviewProps) => {
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
};

export const StripesA = ({ title }: PreviewProps) => {
  return (
    <PreviewContainer className="stripesA-template flex justify-center items-center p-16">
      <PreviewTitle
        title={title}
        className="bg-white w-full h-84 rounded-lg flex justify-center items-center p-8 text-gray-800 uppercase mt-0"
      />
      <PreviewAvatar className="absolute top-20" />
      <PreviewAuthor className="absolute bottom-12 right-1/2 translate-x-1/2 font-sans px-4 py-2 bg-white text-gray-800 rounded-lg text-xl font-bold" />
    </PreviewContainer>
  );
};

export const StripesB = ({ title }: PreviewProps) => {
  return (
    <PreviewContainer className="stripesB-template flex justify-center items-center p-16">
      <PreviewTitle
        title={title}
        className="bg-white w-full h-84 rounded-lg flex justify-center items-center p-8 text-gray-800 uppercase mt-0"
      />
      <PreviewAvatar className="absolute top-20" />
      <PreviewAuthor className="absolute bottom-12 right-1/2 translate-x-1/2 font-sans px-4 py-2 bg-[#E64951] text-white rounded-lg text-xl font-bold" />
    </PreviewContainer>
  );
};

export const PinkBlue = ({ title }: PreviewProps) => {
  return (
    <PreviewContainer className="pink-blue-template flex justify-center items-center p-16">
      <PreviewTitle
        title={title}
        className="bg-white w-full h-84 rounded-lg flex justify-center items-center p-8 text-gray-800 uppercase mt-0"
      />
      <PreviewAvatar className="absolute top-20" />
      <PreviewAuthor className="absolute bottom-12 right-1/2 translate-x-1/2 font-sans px-4 py-2 bg-white text-gray-800 rounded-lg text-xl font-bold" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 68.75 93.75"
        className="absolute bottom-1 left-4 h-60 fill-white opacity-15"
      >
        <path
          d="M51.88,102.19h6.24v4.69H51.88Z"
          transform="translate(-20.63 -13.13)"
        />
        <path
          d="M51.88,77.19h6.24v3.12H51.88Z"
          transform="translate(-20.63 -13.13)"
        />
        <path
          d="M51.88,50.63h6.24v3.12H51.88Z"
          transform="translate(-20.63 -13.13)"
        />
        <path
          d="M28.8,44.38H42.5v9.37h6.25V47.5h12.5v6.25H67.5V44.38H81.2a1.93,1.93,0,0,0,1.92-1.93h0a1.91,1.91,0,0,0-1.07-1.73c-3.27-1.57-16.11-4.15-25.49-12V14.69a1.56,1.56,0,0,0-3.12,0V28.75c-9.38,7.81-22.22,10.39-25.49,12a1.91,1.91,0,0,0-1.07,1.73h0a1.92,1.92,0,0,0,1.92,1.93Z"
          transform="translate(-20.63 -13.13)"
        />
        <path
          d="M25.67,70.94H39.38v9.37h9.37V74.06h12.5v6.25h9.37V70.94H84.33a2,2,0,0,0,1.36-.56A1.94,1.94,0,0,0,86.25,69v0a1.9,1.9,0,0,0-1.08-1.72c-3.26-1.57-10.79-3.52-17.67-10.4h-25c-6.88,6.88-14.41,8.83-17.67,10.4A1.9,1.9,0,0,0,23.75,69v0a1.94,1.94,0,0,0,.56,1.36,2,2,0,0,0,1.36.56Z"
          transform="translate(-20.63 -13.13)"
        />
        <path
          d="M88.3,92.28a65.8,65.8,0,0,1-14.24-8.84H35.94A65.8,65.8,0,0,1,21.7,92.28,1.89,1.89,0,0,0,20.63,94v0a1.9,1.9,0,0,0,.56,1.35,1.93,1.93,0,0,0,1.36.57h13.7v10.94h12.5V99.06h12.5v7.82h12.5V95.94h13.7a1.93,1.93,0,0,0,1.36-.57A1.91,1.91,0,0,0,89.38,94v0a1.92,1.92,0,0,0-1.08-1.72Z"
          transform="translate(-20.63 -13.13)"
        />
      </svg>
    </PreviewContainer>
  );
};
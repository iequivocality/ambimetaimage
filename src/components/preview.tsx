import { Checkerboard, Default, ImageWithText, PinkBlue, StripesA, StripesB, TextOnly } from "./images";

export const TEMPLATES = {
  Default: Default,
  TextOnly: TextOnly,
  StripesA: StripesA,
  StripesB: StripesB,
  PinkBlue: PinkBlue,
  Checkerboard: Checkerboard,
  ImageWithText: ImageWithText
};

type TemplateKey = keyof typeof TEMPLATES;

export type PreviewProps = {
  title: string;
  subtitle: string;
  template: string;
  imageUrl: string;
};

export function Preview({ title, subtitle, template, imageUrl }: PreviewProps) {
  const TemplateComponent = TEMPLATES[template as TemplateKey];
  return (
    <TemplateComponent title={title} subtitle={subtitle} template={template} imageUrl={imageUrl} />
  );
}

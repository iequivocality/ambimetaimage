import { Default, PinkBlue, StripesA, StripesB, TextOnly } from "./images";

export const TEMPLATES = {
  Default: Default,
  TextOnly: TextOnly,
  StripesA: StripesA,
  StripesB: StripesB,
  PinkBlue: PinkBlue
};

type TemplateKey = keyof typeof TEMPLATES;

export type PreviewProps = {
  title: string;
  subtitle: string;
  template: string;
};

export function Preview({ title, subtitle, template }: PreviewProps) {
  const TemplateComponent = TEMPLATES[template as TemplateKey];
  return (
    <TemplateComponent title={title} subtitle={subtitle} template={template} />
  );
}

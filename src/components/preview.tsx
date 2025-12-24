import { FunctionComponent } from "react";
import { Default, PinkBlue, StripesA, StripesB, TextOnly } from "./images";

export type TemplateKey =
  | "Default"
  | "TextOnly"
  | "StripesA"
  | "StripesB"
  | "PinkBlue";

type MetaTemplate = Record<TemplateKey, FunctionComponent<PreviewProps>>;

const TEMPLATES: MetaTemplate = {
  Default: Default,
  TextOnly: TextOnly,
  StripesA: StripesA,
  StripesB: StripesB,
  PinkBlue: PinkBlue
};

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

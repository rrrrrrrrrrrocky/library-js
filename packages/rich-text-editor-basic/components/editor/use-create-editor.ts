"use client";

import { withProps } from "@udecode/cn";
import {
  ParagraphPlugin,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from "@udecode/plate/react";
import { AlignPlugin } from "@udecode/plate-alignment/react";
import { BasicElementsPlugin } from "@udecode/plate-basic-elements/react";
import {
  BasicMarksPlugin,
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { useMemo } from "react";

export const useCreateEditor = ({
  defaultValue,
}: {
  defaultValue: Array<any>;
}) => {
  const componentsStyle = useMemo(
    () => ({
      [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
      [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
      [ParagraphPlugin.key]: withProps(PlateElement, {
        as: "p",
        className: "mb-4",
      }),
      [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
      [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
      blockquote: withProps(PlateElement, {
        as: "blockquote",
        className: "mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]",
      }),
      h1: withProps(PlateElement, {
        as: "h1",
        className:
          "mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl",
      }),
      h2: withProps(PlateElement, {
        as: "h2",
        className: "mb-4 mt-6 text-2xl font-semibold tracking-tight",
      }),
      h3: withProps(PlateElement, {
        as: "h3",
        className: "mb-4 mt-6 text-xl font-semibold tracking-tight",
      }),
    }),
    []
  );

  // const default
  return usePlateEditor({
    override: {
      components: componentsStyle,
    },
    plugins: [
      BasicElementsPlugin,
      BasicMarksPlugin,

      HeadingPlugin,
      AlignPlugin.configure({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            // HeadingPlugin.key,
          ],
        },
      }),
    ],
    value: defaultValue,
  });
};

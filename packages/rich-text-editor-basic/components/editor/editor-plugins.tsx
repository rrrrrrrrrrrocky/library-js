"use client";

// import emojiMartData from "@emoji-mart/data";
// import { CalloutPlugin } from "@udecode/plate-callout/react";
// import { DatePlugin } from "@udecode/plate-date/react";
// import { DocxPlugin } from "@udecode/plate-docx";
// import { EmojiPlugin } from "@udecode/plate-emoji/react";
// import {
//   FontBackgroundColorPlugin,
//   FontColorPlugin,
//   FontSizePlugin,
// } from "@udecode/plate-font/react";
// import { HighlightPlugin } from "@udecode/plate-highlight/react";
// import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
// import { JuicePlugin } from "@udecode/plate-juice";
// import { KbdPlugin } from "@udecode/plate-kbd/react";
import { ColumnPlugin } from "@udecode/plate-layout/react";
// import { MarkdownPlugin } from "@udecode/plate-markdown";
// import { SlashPlugin } from "@udecode/plate-slash-command/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";

// import { TrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { alignPlugin } from "./plugins/align-plugin";
import { autoformatPlugin } from "./plugins/autoformat-plugin";
import { dndPlugins } from "./plugins/dnd-plugins";
// import { FixedToolbarPlugin } from "@/components/editor/plugins/fixed-toolbar-plugin";
// import { FloatingToolbarPlugin } from "@/components/editor/plugins/floating-toolbar-plugin";

export const viewPlugins = [
  // ...basicNodesPlugins,
  // HorizontalRulePlugin,
  // linkPlugin,
  // DatePlugin,
  // mentionPlugin,
  // tablePlugin,
  TogglePlugin,
  // tocPlugin,
  // ...mediaPlugins,
  // ...equationPlugins,
  // CalloutPlugin,
  ColumnPlugin,

  // Marks
  // FontColorPlugin,
  // FontBackgroundColorPlugin,
  // FontSizePlugin,
  // HighlightPlugin,
  // KbdPlugin,

  // Block Style
  alignPlugin,
  // ...indentListPlugins,
  // lineHeightPlugin,

  // // Collaboration
  // commentsPlugin,
] as const;

export const editorPlugins = [
  // AI
  // ...aiPlugins,

  // Nodes
  ...viewPlugins,

  // Functionality
  // SlashPlugin,
  // autoformatPlugin,
  // cursorOverlayPlugin,
  // ...blockMenuPlugins,
  ...dndPlugins,
  // EmojiPlugin.configure({ options: { data: emojiMartData as any } }),
  // exitBreakPlugin,
  // resetBlockTypePlugin,
  // ...deletePlugins,
  // softBreakPlugin,
  // TrailingBlockPlugin,

  // Deserialization
  // DocxPlugin,
  // MarkdownPlugin.configure({ options: { indentList: true } }),
  // JuicePlugin,

  // UI
  // FixedToolbarPlugin,
  // FloatingToolbarPlugin,
];

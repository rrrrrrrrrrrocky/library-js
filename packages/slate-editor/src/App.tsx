import "./App.css";

import { useCallback, useMemo, useState } from "react";
// Import React dependencies.
// Import the Slate editor factory.
// TypeScript users only add this code
import {
  BaseEditor,
  createEditor,
  Descendant,
  Editor,
  Element,
  Node,
  Transforms,
} from "slate";
// Import the Slate components and React plugin.
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

type CustomText = { text: string; bold?: boolean };
type CustomElement = { type: "paragraph" | "code"; children: CustomText[] };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Define a serializing function that takes a value and returns a string.
const serialize = (value: Descendant[]) => {
  console.log("🚀 ~ serialize ~ value:", value);

  const result = value
    // Return the string content of each paragraph in the value's children.
    .map((n) => Node.string(n))
    // Join them all with line breaks denoting paragraphs.
    .join("\n");
  console.log(
    "🚀 ~ serialize ~ result:",
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.descendant(n, [0]))
  );
  return result;
};

// Define a deserializing function that takes a string and returns a value.
const deserialize = (string: string): Descendant[] => {
  return string.split("\n").map((line) => ({
    type: "paragraph" as const,
    children: [{ text: line }],
  }));
};

const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
};

// const initialValue: Descendant[] = [
//   {
//     type: "paragraph",
//     children: [{ text: "A line of text in a paragraph." }],
//   },
// ];

const App = () => {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));
  // console.log("🚀 ~ App ~ editor:", editor);

  const initialValue = useMemo(
    () => deserialize(localStorage.getItem("content") || ""),
    []
  );
  // console.log("🚀 ~ App ~ initialValue:", initialValue);
  // console.log("🚀 ~ App ~ editor:", editor);

  const renderElement = useCallback((props: RenderElementProps) => {
    // console.log("🚀 ~ renderElement ~ props:", props);

    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        console.log("🚀 ~ App ~ editor.operations:", editor.operations);
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // Serialize the value and save the string value to Local Storage.
          localStorage.setItem("content", serialize(value));
        }
      }}>
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}>
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}>
          Code Block
        </button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        style={{
          border: "1px solid red",
          padding: "16px",
        }}
        onKeyDown={(event) => {
          if (!event.metaKey) return;

          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export default App;

// Define a React component renderer for our code blocks.
const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}>
      {props.children}
    </span>
  );
};

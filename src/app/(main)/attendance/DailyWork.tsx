"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./style.css";

import { EditorContent } from "@tiptap/react";
import LodingButton from "@/components/LodingButton";
import { useSubmitPost } from "./submitpost";

export default function DailyWork() {
  const useSubmitPostmuation = useSubmitPost();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Write a work of today ?",
      }),
    ],
  });

  const inputPost =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = async () => {
    useSubmitPostmuation.mutate(
      { content: inputPost },
      {
        onSuccess: () => {
          editor?.commands.clearContent(); // Clear editor on success
        },
      },
    );
  };
  return (
    <div className="space-y-6">
      <EditorContent
        editor={editor}
        className="max-h-[25rem] w-full overflow-y-auto rounded-md border bg-background px-5 py-3"
      />

      <LodingButton
        onClick={onSubmit}
        loding={useSubmitPostmuation.isPending}
        disabled={!inputPost.trim()}
        className="min-w-20"
      >
        Post
      </LodingButton>
    </div>
  );
}

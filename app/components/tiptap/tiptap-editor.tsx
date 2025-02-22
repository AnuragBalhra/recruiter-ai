'use client'
import React from "react";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import classnames from 'clsx';

type TiptapProps = Omit<React.ComponentPropsWithoutRef<typeof EditorContent>, "editor"> & {
  initialValue: any,
  onChangeValue: any,
};

let Tiptap = React.forwardRef<
  React.ElementRef<typeof EditorContent>,
  TiptapProps
>(({initialValue, onChangeValue, className, ...props}, ref) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: initialValue,
    immediatelyRender: false,
    editorProps: {
        attributes: {
            class: classnames(`h-64 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto py-4 px-2`, className),
        },
    },
    onUpdate({ editor }) {
        onChangeValue(editor.getHTML());
    },
  })

  return <EditorContent ref={ref} {...props} editor={editor} />
})
Tiptap.displayName = 'Tiptap'

export default Tiptap

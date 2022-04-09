import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faStrikethrough, faCode, faHighlighter } from '@fortawesome/fontawesome-free-solid'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      Highlight,
    ],
    content: 'Let&apos;s get writing!',
  })

  if (!editor) {
    return null
  }

  return (
    <>
        <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
            <FontAwesomeIcon icon="bold"></FontAwesomeIcon> bold
        </button>

        <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}>
            <FontAwesomeIcon icon="italic"></FontAwesomeIcon>
        </button>

        <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}>
            <FontAwesomeIcon icon="underline"></FontAwesomeIcon>
        </button>

        <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}>
            <FontAwesomeIcon icon="strikethrough"></FontAwesomeIcon>
        </button>

        <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}>
            <FontAwesomeIcon icon="code"></FontAwesomeIcon>
        </button>

        <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive('highlight') ? 'is-active' : ''}>
            <FontAwesomeIcon icon="highlighter"></FontAwesomeIcon>
        </button>

        <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap;
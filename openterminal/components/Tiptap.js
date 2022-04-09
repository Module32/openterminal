import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faStrikethrough, faCode, faMarker } from '@fortawesome/fontawesome-free-solid'

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
        <div style={{padding: '7px', border: '4px solid white', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', borderBottomLeftRadius: '1px', borderBottomRightRadius: '1px', marginTop: '2px'}}>
            <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="bold"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="italic"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="underline"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="strikethrough"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="code"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="marker"></FontAwesomeIcon>
            </button>
        </div>

        <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap;
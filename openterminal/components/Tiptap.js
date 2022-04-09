import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Blockquote from "@tiptap/extension-blockquote";
import Codeblock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Heading from "@tiptap/extension-heading";
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faStrikethrough, faCode, faPen, faQuoteLeft, faFileCode, faGripLines, faTable, faSquare, faBorderAll, faTableHeader } from '@fortawesome/fontawesome-free-solid'

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
      Blockquote,
      Codeblock,
      HorizontalRule,
      Heading.configure({
          levels: [1, 2, 3]
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: 'Let&apos;s get writing!',
  })

  if (!editor) {
    return null
  }

  return (
    <>
        <div style={{padding: '7px', backgroundColor: 'rgb(255, 255, 255)', border: '2px solid white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', marginTop: '2px'}}>
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
                <FontAwesomeIcon icon="pen"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="quoteleft"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleCodeblock().run()}
            className={editor.isActive('codeblock') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="filecode"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleHorizontalRule().run()}
            className={editor.isActive('horizontalrule') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="griplines"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'thin-active' : 'thin'}>
                H₁
            </button>

            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'thin-active' : 'thin'}>
                H₂
            </button>

            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'thin-active' : 'thin'}>
                H₃
            </button>

            <button
            onClick={() => editor.chain().focus().toggleTable().run()}
            className={editor.isActive('table') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="table"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleTableRow().run()}
            className={editor.isActive('tablerow') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="square"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleTableHeader().run()}
            className={editor.isActive('tableheader') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="borderall"></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleTableCell().run()}
            className={editor.isActive('tablecell') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon="header"></FontAwesomeIcon>
            </button>
        </div>

        <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap;
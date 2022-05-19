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
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faHighlighter, faStrikethrough, faCode, faQuoteLeft, faFileCode, faGripLines, faTable, faSquare, faBorderAll, faHeader, faAlignLeft, faAlignCenter, faAlignRight, faGripLinesVertical, faAngleUp, faAngleDown, faCheck, faEye } from '@fortawesome/free-solid-svg-icons'

const db_save_status = <p className="grey" style={{margin: '0', padding: '0'}}>Start editing to save to the DB!</p>;

// thanks to @csharptest.net for this function
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const Tiptap = ({content, readonly}) => {
  if (!readonly) readonly = false;
  const editor = useEditor({
    readonly,
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
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography
    ],
    content: content,
    onUpdate: ({ editor }) => {
        db_save_status = <p style={{margin: '0', padding: '0'}}><span className="grey"><FontAwesomeIcon icon={faCheck} /> Saved edit</span> {makeid(7)}</p>;
    },    
  })

  if (!editor) {
    return null
  }

  return (
    <>
        {readonly === false ? <>
            <div style={{padding: '4px', backgroundColor: 'rgb(255, 255, 255)', border: '2px solid white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', marginTop: '2px'}}>
            <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faBold}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faItalic}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faUnderline}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faStrikethrough}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faHighlighter}></FontAwesomeIcon>
            </button>

            <span className="mini-divider">|</span>

            <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().toggleCodeblock().run()}
            className={editor.isActive('codeblock') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faFileCode}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={editor.isActive('horizontalrule') ? 'thin-active' : 'thin'}>
                ━
            </button>

            <span className="mini-divider">|</span>

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

            <span className="mini-divider">|</span>

            <button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className={editor.isActive('table') ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().addRowBefore().run()}
            className={'thin'}>
                R<FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().addRowAfter().run()}
            className={'thin'}>
                R<FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            className={'thin'}>
                C<FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            className={'thin'}>
                C<FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
            </button>

            <span className="mini-divider">|</span>

            <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({textAlign: 'left'}) ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faAlignLeft}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({textAlign: 'center'}) ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon>
            </button>

            <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({textAlign: 'right'}) ? 'thin-active' : 'thin'}>
                <FontAwesomeIcon icon={faAlignRight}></FontAwesomeIcon>
            </button>

        </div>
        </> : <p><FontAwesomeIcon icon={eye} /> Marked as <strong>read only</strong></p>}

        <EditorContent editor={editor}></EditorContent>

        <div style={{padding: '7px 10px', border: '2px solid white', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', marginTop: '-2px'}}>
            {db_save_status}
        </div>
    </>
  )
}

export default Tiptap;
import { BubbleMenu, useEditor, EditorContent, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Heading from "@tiptap/extension-heading";
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import CodeBlock from '@tiptap/extension-code-block'
import CharacterCount from '@tiptap/extension-character-count'
import Tippy from '@tippyjs/react';
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faHighlighter, faStrikethrough, faCode, faQuoteLeft, faFileCode, faGripLines, faTable, faSquare, faBorderAll, faHeader, faAlignLeft, faAlignCenter, faAlignRight, faGripLinesVertical, faAngleUp, faAngleDown, faCheck, faEye, faEllipsisVertical, faBoltLightning, faRotateLeft, faRotateRight, faCaretDown, faParagraph, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

export const html = null;
export let chars = null;
export let words = null;
export let userSession = null;

const Tiptap = ({content, readonly, formattingClass, propsClass, user}) => {
  const [ alignIcon, setAlignIcon ] = useState(faAlignLeft);
  const [ sizeIcon, setSizeIcon ] = useState(faParagraph);
  const [ bgColor, setBgColor ] = useState('bg-white');

  if (!readonly) readonly = false;
  const editor = useEditor({
    readonly,
    extensions: [
      TableOfContents,
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      Highlight,
      Blockquote,
      CodeBlock.configure({
        exitOnArrowDown: true,
      }),
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
      TaskList.configure({
        HTMLAttributes: {
          class: 'not-prose list-none p-0',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex',
        },
      }),
      Typography,
      CharacterCount,
      History,
      Text,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'px-1 py-[2px] rounded',
        },
        multicolor: true
      })
    ],
    editorProps: {
      attributes: {
        class: `prose prose-headings:font-bold prose-table:border-collapse prose-th:border max-w-none font-normal focus:outline-none flex-1 ${propsClass}`,
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      html = editor.getHTML()
    },
  })

  if (!editor) {
    return null
  }

  if (readonly === true) {
    editor.setEditable(false)
  }

  const handleSizeChangeIcon = () => {
    if (!editor.isActive('heading')) {
      setSizeIcon(faParagraph)
    } else if (editor.isActive('heading', { level: 1 })) {
      setSizeIcon('H₁')
    } else if (editor.isActive('heading', { level: 2 })) {
      setSizeIcon('H₂')
    } else if (editor.isActive('heading', { level: 3 })) {  
      setSizeIcon('H₃')
    }
  }
   
  let activeFormat = 'p-1 px-2 mx-[3px] text-black bg-slate-200 hover:bg-slate-300 py-2 border-none';
  let inactiveFormat = 'p-1 px-2 mx-[3px] bg-transparent text-black hover:bg-slate-200 py-2 border-none'
  chars = editor.storage.characterCount.characters()
  words = editor.storage.characterCount.words()

  return (
    <>
        {editor && readonly === false && <>
        <BubbleMenu editor={editor} tippyOptions={{ duration: 75 }}>
          <div className='border border-slate-300 bg-white rounded-lg'>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${editor.isActive('bold') ? activeFormat : inactiveFormat} ml-1`}>
              <FontAwesomeIcon icon={faBold}></FontAwesomeIcon>
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? activeFormat : inactiveFormat}>
              <FontAwesomeIcon icon={faItalic}></FontAwesomeIcon>
            </button>

            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? activeFormat : inactiveFormat}>
              <FontAwesomeIcon icon={faUnderline}></FontAwesomeIcon>
            </button>
            
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? activeFormat : inactiveFormat}>
              <FontAwesomeIcon icon={faStrikethrough}></FontAwesomeIcon>
            </button>

            <span className='text-gray px-1'>|</span>

            <Tippy content={
              <>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run() && handleSizeChangeIcon()}
                  className={editor.isActive('heading', { level: 1 }) ? activeFormat : inactiveFormat}>
                      H₁
                  </button>

                  <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run() && handleSizeChangeIcon()}
                  className={editor.isActive('heading', { level: 2 }) ? activeFormat : inactiveFormat}>
                      H₂
                  </button>

                  <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run() && handleSizeChangeIcon()}
                  className={editor.isActive('heading', { level: 3 }) ? activeFormat : inactiveFormat}>
                      H₃
                </button>
              </>
            } className='bg-white px-2 border border-slate-400/50 rounded-lg' 
              placement='bottom'
              interactive='true'>
              <button className='px-2 mx-[3px] bg-transparent text-black hover:bg-slate-200 py-2 border-solid border'>{sizeIcon === faParagraph ? <FontAwesomeIcon icon={faParagraph} /> : sizeIcon }</button>
            </Tippy>


            <Tippy content={
              <>
                <button
                onClick={() => editor.chain().focus().setTextAlign('left').run() && setAlignIcon(faAlignLeft)}
                className={editor.isActive({textAlign: 'left'}) ? activeFormat : inactiveFormat}>
                    <FontAwesomeIcon icon={faAlignLeft}></FontAwesomeIcon>
                </button>
    
                <button
                onClick={() => editor.chain().focus().setTextAlign('center').run() && setAlignIcon(faAlignCenter)}
                className={editor.isActive({textAlign: 'center'}) ? activeFormat : inactiveFormat}>
                    <FontAwesomeIcon icon={faAlignCenter}></FontAwesomeIcon>
                </button>

                <button
                  onClick={() => editor.chain().focus().setTextAlign('right').run() && setAlignIcon(faAlignRight)}
                  className={editor.isActive({textAlign: 'right'}) ? activeFormat : inactiveFormat}>
                      <FontAwesomeIcon icon={faAlignRight}></FontAwesomeIcon>
                </button>
              </>
            } className='bg-white px-2 border border-slate-400/50 rounded-lg' placement='bottom'
              interactive='true'>
              <button className='px-2 mx-[3px] bg-transparent text-black hover:bg-slate-200 py-2 border-solid border'><FontAwesomeIcon icon={alignIcon} /></button>
            </Tippy>

            <Tippy content={
              <>
                <button
                onClick={() => editor.chain().focus().setColor('#ef4444').run()}
                className={editor.isActive('textStyle', { color: '#ef4444' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-red-500 rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().setColor('#f97316').run()}
                className={editor.isActive('textStyle', { color: '#f97316' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-orange rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().setColor('#eab308').run()}
                className={editor.isActive('textStyle', { color: '#eab308' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-yellow rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().setColor('#22c55e').run()}
                className={editor.isActive('textStyle', { color: '#22c55e' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-green rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().setColor('#06b6d4').run()}
                className={editor.isActive('textStyle', { color: '#06b6d4' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-blue rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().setColor('#6366f1').run()}
                className={editor.isActive('textStyle', { color: '#6366f1' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-indigo-500 rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().setColor('#a855f7').run()}
                className={editor.isActive('textStyle', { color: '#a855f7' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-purple rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().setColor('#ffffff').run()}
                className={editor.isActive('textStyle', { color: '#ffffff' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-white rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().unsetColor().run()}
                className='p-1 px-2 mx-[3px] bg-transparent text-black hover:bg-slate-200 py-2 border-none'>
                    <div className='p-2 bg-black/90 rounded-full border border-black/50'></div>
                </button>

              </>
            } className='bg-white p-[2px] border border-slate-400/50 rounded-lg' placement='bottom'
              interactive='true'>
              <button className='px-2 mx-[3px] bg-transparent text-black hover:bg-slate-200 py-2 border-solid border'><span className='text-primary'>R</span></button>
            </Tippy>

            <Tippy content={
              <>
                <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#ef4444' }).run()}
                className={editor.isActive('highlight', { color: '#ef4444' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-red-500 rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#f97316' }).run()}
                className={editor.isActive('highlight', { color: '#f97316' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-orange rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#eab308' }).run()}
                className={editor.isActive('highlight', { color: '#eab308' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-yellow rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#22c55e'}).run()}
                className={editor.isActive('highlight', { color: '#22c55e' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-green rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#06b6d4'}).run()}
                className={editor.isActive('highlight', { color: '#06b6d4' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-blue rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#6366f1' }).run()}
                className={editor.isActive('highlight', { color: '#6366f1' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-indigo-500 rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#a855f7' }).run()}
                className={editor.isActive('highlight', { color: '#a855f7' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-purple rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffffff' }).run()}
                className={editor.isActive('highlight', { color: '#ffffff' }) ? activeFormat : inactiveFormat}>
                    <div className='p-2 bg-white rounded-full border border-black/50'></div>
                </button>

                <button
                onClick={() => editor.chain().focus().unsetHighlight().run()}
                disabled={!editor.isActive('highlight')}
                className='p-1 px-2 mx-[3px] bg-transparent text-black hover:bg-slate-200 py-2 border-none'>
                    <div className='p-2 bg-black/90 rounded-full border border-black/50'></div>
                </button>

                <p className='text-gray text-xs px-3 pb-2'><FontAwesomeIcon icon={faBoltLightning} /> <span className='font-bold'>==<span className='text-slate-400/75'>text</span>==</span> to highlight</p>

              </>
            } className='bg-white p-[2px] border border-slate-400/50 rounded-lg'
              interactive='true'
              placement='bottom-end'>
              <button className='px-2 mx-[3px] bg-transparent text-black hover:bg-slate-200 py-2 border-solid border'><FontAwesomeIcon icon={faHighlighter} className='text-primary' /></button>
            </Tippy>

          </div>
        </BubbleMenu>
        <FloatingMenu editor={editor} tippyOptions={{ duration: 75 }}>
          <div className='flex'>
            <div className='rounded-l-lg bg-amber-500/20 border border-amber-500 flex items-center animate-pulse'><FontAwesomeIcon icon={faBoltLightning} className='mx-2 text-amber-400' /></div>
            <div className='bg-white rounded-r-lg py-0 text-sm border border-slate-300'>
              <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? activeFormat : inactiveFormat}>
                  H₁
              </button>

              <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? activeFormat : inactiveFormat}>
                  H₂
              </button>

              <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? activeFormat : inactiveFormat}>
                  H₃
              </button>

              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()} className={inactiveFormat}>
                <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>
              </button>

              <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()} className={inactiveFormat}>
                <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>
              </button>

              <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={inactiveFormat}>
                <FontAwesomeIcon icon={faGripLines}></FontAwesomeIcon>
              </button>

              <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={inactiveFormat}>
                <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>
              </button>

              <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={editor.isActive('taskList') ? activeFormat : inactiveFormat}>
                <FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon>
              </button>

            </div>
          </div>
        </FloatingMenu>
        </>
        }
        
        <div className='flex flex-col'>
        <EditorContent editor={editor} className={`rounded-t-xl py-2 px-3 border-b-2 border-transparent ${formattingClass} ${bgColor}`} />
        <Tippy content={<>
            <div className='flex flex-col'>
              <button className='bg-white border border-slate-200 p-2.5 hover:bg-transparent rounded-full m-1 border-solid' onClick={() => setBgColor('bg-white')}></button>
              <button className='bg-red-500 border border-slate-200 p-2.5 hover:bg-red-500 rounded-full m-1 border-solid' onClick={() => setBgColor('bg-red-500')}></button>
              <button className='bg-orange border border-slate-200 p-2.5 hover:bg-orange rounded-full m-1 border-solid' onClick={() => setBgColor('bg-orange')}></button>
              <button className='bg-yellow border border-slate-200 p-2.5 hover:bg-yellow rounded-full m-1 border-solid' onClick={() => setBgColor('bg-yellow')}></button>
              <button className='bg-green border border-slate-200 p-2.5 hover:bg-green rounded-full m-1 border-solid' onClick={() => setBgColor('bg-green')}></button>
              <button className='bg-blue border border-slate-200 p-2.5 hover:bg-blue rounded-full m-1 border-solid' onClick={() => setBgColor('bg-blue')}></button>
              <button className='bg-indigo-500 border border-slate-200 p-2.5 hover:bg-indigo-500 rounded-full m-1 border-solid' onClick={() => setBgColor('bg-indigo-500')}></button>
              <button className='bg-purple border border-slate-200 p-2.5 hover:bg-purple rounded-full m-1 border-solid' onClick={() => setBgColor('bg-purple')}></button>
              <button className='bg-black border border-slate-200 p-2.5 hover:bg-black rounded-full m-1 border-solid' onClick={() => setBgColor('bg-black')}></button>
            </div>
          </>}
            className='bg-white p-[0.5px] shadow-md border border-slate-300 rounded-full'
            trigger='click'
            interactive='true'>
            <div className='bg-white border border-slate-300 p-[0.5px] rounded-full hover:cursor-pointer fixed bottom-0 -translate-y-12 right-0 -translate-x-1 m-2 shadow-md'>
              <div className={`${bgColor} border border-slate-200 p-2.5 rounded-full m-1`}></div>
            </div>
          </Tippy>
        </div>
        
        <div className='bg-slate-200/75 fixed bottom-0 w-full py-2 px-5 text-gray flex items-center'>
          <span><span className='font-semibold'>{user || 'nobody'}</span></span>
          <div className='ml-auto flex'>
            <button onClick={() => editor.chain().focus().undo().run()} className='p-0 border-none bg-transparent hover:bg-transparent text-gray hover:text-slate-400' disabled={!editor.can().undo()}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </button>
            <button onClick={() => editor.chain().focus().redo().run()} className='p-0 border-none bg-transparent hover:bg-transparent text-gray hover:text-slate-400' disabled={!editor.can().redo()}>
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
            <span className='ml-2 mt-[2px]'>{editor.storage.characterCount.characters()} chars <span className='text-slate-400/50 font-semibold'>|</span> {editor.storage.characterCount.words()} words</span>
          </div>
        </div>
    </>
  )
}

export default Tiptap;
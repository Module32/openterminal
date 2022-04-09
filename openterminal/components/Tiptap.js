import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '###### Let&apos;s get writing!',
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default Tiptap;
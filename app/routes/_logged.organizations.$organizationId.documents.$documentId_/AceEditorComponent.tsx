import { useEffect, useRef } from 'react'
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/mode-text'
// Import other ace modes/themes you need

export default function AceEditorComponent() {
  const editorRef = useRef(null)

  useEffect(() => {
    const editor = ace.edit(editorRef.current)
    editor.setTheme('ace/theme/monokai')
    editor.session.setMode('ace/mode/text')

    return () => {
      editor.destroy()
    }
  }, [])

  return <div ref={editorRef} style={{ width: '100%', height: '500px' }} />
}

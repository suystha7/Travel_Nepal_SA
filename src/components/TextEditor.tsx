import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link,
  ChevronDown,
  Redo,
  Undo,
  Image as ImageIcon,
  Type,
  WholeWord,
} from 'lucide-react';

interface TextEditorProps {
  name: string;
  label?: string;
  required?: boolean;
  minHeight?: string;
  limit?: number;
  readonly?: boolean;
  value?: string;
}

const MenuBar = React.memo(function MenuBar({
  editor,
  readonly,
}: {
  editor: Editor | null;
  readonly?: boolean;
}) {
  const [openHeadings, setOpenHeadings] = useState(false);

  if (!editor || readonly) return null;

  const map: Record<'H1' | 'H2' | 'H3', 1 | 2 | 3> = { H1: 1, H2: 2, H3: 3 };

  return (
    <div className="bg-gray-50 px-4 py-2 border-b">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 hover:bg-gray-200 disabled:opacity-40 rounded"
        >
          <Undo size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 hover:bg-gray-200 disabled:opacity-40 rounded"
        >
          <Redo size={16} />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenHeadings(v => !v)}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200"
          >
            <span className="text-sm font-medium">
              {editor.isActive('heading', { level: 1 })
                ? 'H1'
                : editor.isActive('heading', { level: 2 })
                  ? 'H2'
                  : editor.isActive('heading', { level: 3 })
                    ? 'H3'
                    : 'Normal'}
            </span>
            <ChevronDown size={14} />
          </button>

          {openHeadings && (
            <ul className="absolute bg-white shadow border rounded mt-1 w-24 z-20">
              {['Normal', 'H1', 'H2', 'H3'].map(item => (
                <li
                  key={item}
                  onClick={() => {
                    if (item === 'Normal') {
                      editor.chain().focus().setParagraph().run();
                    } else {
                      const headingItem = item as 'H1' | 'H2' | 'H3';
                      editor.chain().focus().setHeading({ level: map[headingItem] }).run();
                    }
                    setOpenHeadings(false);
                  }}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive('bold') ? 'bg-green-100 text-green-600' : 'hover:bg-gray-200'
          }`}
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive('italic') ? 'bg-green-100 text-green-600' : 'hover:bg-gray-200'
          }`}
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${
            editor.isActive('underline') ? 'bg-green-100 text-green-600' : 'hover:bg-gray-200'
          }`}
        >
          <UnderlineIcon size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${
            editor.isActive('strike') ? 'bg-green-100 text-green-600' : 'hover:bg-gray-200'
          }`}
        >
          <Strikethrough size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive('bulletList') ? 'bg-green-100 text-green-600' : 'hover:bg-gray-200'
          }`}
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive('orderedList') ? 'bg-green-100 text-green-600' : 'hover:bg-gray-200'
          }`}
        >
          <ListOrdered size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            editor.isActive('blockquote') ? 'bg-green-100 text-green-600' : 'hover:bg-gray-200'
          }`}
        >
          <Quote size={16} />
        </button>

        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (!url) return;
            editor.chain().focus().setLink({ href: url }).run();
          }}
          className="p-2 rounded hover:bg-gray-200"
        >
          <Link size={16} />
        </button>

        <label className="p-2 rounded hover:bg-gray-200 cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                editor
                  .chain()
                  .focus()
                  .setImage({ src: reader.result as string })
                  .run();
              };
              reader.readAsDataURL(file);
            }}
          />
          <ImageIcon size={16} />
        </label>
      </div>
    </div>
  );
});

const TextEditor: React.FC<TextEditorProps> = ({
  name,
  label,
  required = false,
  minHeight = '150px',
  limit,
  readonly = false,
  value,
}) => {
  const [field, meta, helpers] = useField(name);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Image,
      CharacterCount.configure({
        limit,
      }),
    ],
    editable: !readonly,
    content: value ?? field.value ?? '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm p-4 focus:outline-none overflow-y-auto',
        style: `min-height:${minHeight}; max-height:${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      if (!readonly) helpers.setValue(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && (value ?? field.value) !== editor.getHTML()) {
      editor.commands.setContent(value ?? field.value ?? '');
    }
  }, [value, field.value, editor]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="border rounded-md overflow-hidden border-gray-100 bg-white">
        <MenuBar editor={editor} readonly={readonly} />
        <EditorContent editor={editor} />

        {editor && (
          <div className="flex items-center justify-end gap-4 px-4 py-1.5 bg-gray-50 border-t text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-1">
              <WholeWord size={14} className="text-gray-400" />
              <span>{editor.storage.characterCount.words()} words</span>
            </div>
            <div className="flex items-center gap-1">
              <Type size={14} className="text-gray-400" />
              <span>
                {editor.storage.characterCount.characters()}
                {limit ? ` / ${limit}` : ''} characters
              </span>
            </div>
          </div>
        )}
      </div>

      {meta.touched && meta.error && <p className="text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default TextEditor;

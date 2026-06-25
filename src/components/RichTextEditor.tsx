import React, { useRef, useState, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline,
  Heading2,
  Heading3,
  List, 
  ListOrdered, 
  Quote,
  Link as LinkIcon,
  X
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write description here...", 
  label
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  // Formatting state tracker
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    h2: false,
    h3: false,
    bulletList: false,
    orderedList: false,
    blockquote: false
  });

  // Sync value from parent ONLY if it actually differs from what is currently inside the editor div
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  // Read current active styles based on cursor position/selection
  const updateActiveStyles = () => {
    if (typeof document === 'undefined') return;
    
    let isH2 = false;
    let isH3 = false;
    let isBlockquote = false;
    
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let parent = selection.getRangeAt(0).startContainer.parentElement;
      while (parent && parent !== editorRef.current) {
        const tagName = parent.tagName.toUpperCase();
        if (tagName === 'H2') isH2 = true;
        if (tagName === 'H3') isH3 = true;
        if (tagName === 'BLOCKQUOTE') isBlockquote = true;
        parent = parent.parentElement;
      }
    }

    setActiveStyles({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      h2: isH2,
      h3: isH3,
      bulletList: document.queryCommandState('insertUnorderedList'),
      orderedList: document.queryCommandState('insertOrderedList'),
      blockquote: isBlockquote
    });
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    updateActiveStyles();
  };

  const executeCommand = (command: string, value: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    handleInput();
  };

  // Toggle heading or quote elements cleanly
  const toggleBlockElement = (tag: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    let isCurrentlyActive = false;
    if (tag.toLowerCase() === 'h2') isCurrentlyActive = activeStyles.h2;
    if (tag.toLowerCase() === 'h3') isCurrentlyActive = activeStyles.h3;
    if (tag.toLowerCase() === 'blockquote') isCurrentlyActive = activeStyles.blockquote;

    if (isCurrentlyActive) {
      // Revert to normal paragraph block
      document.execCommand('formatBlock', false, '<p>');
    } else {
      document.execCommand('formatBlock', false, `<${tag}>`);
    }

    handleInput();
  };

  // Keep track of text selections when moving focus to link input modal overlay
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    if (savedSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection);
      }
    }
  };

  const openLinkModal = () => {
    saveSelection();
    setLinkUrl('');
    setShowLinkModal(true);
  };

  const insertLink = () => {
    restoreSelection();
    if (editorRef.current) {
      editorRef.current.focus();
    }

    let url = linkUrl.trim();
    if (url) {
      if (!/^https?:\/\//i.test(url) && !/^\//.test(url)) {
        url = 'https://' + url;
      }

      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        document.execCommand('createLink', false, url);
        
        // Apply styling to the newly created links retrospectively
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        const parentElem = container.nodeType === Node.ELEMENT_NODE ? container as HTMLElement : container.parentElement;
        if (parentElem) {
          const links = parentElem.querySelectorAll('a');
          links.forEach(l => {
            l.className = "text-sky-600 hover:text-sky-850 underline font-black";
          });
        }
      } else {
        // Create an active text string link anchor in editor caret path
        const anchorHtml = `<a href="${url}" class="text-sky-600 hover:text-sky-850 underline font-black" target="_blank" rel="noopener noreferrer">${url}</a>`;
        document.execCommand('insertHTML', false, anchorHtml);
      }
    }
    
    setShowLinkModal(false);
    setSavedSelection(null);
    handleInput();
  };

  return (
    <div className="border border-black bg-white transition-all w-full flex flex-col text-left rounded-none">
      {/* Editor Title Banner */}
      <div className="bg-black text-white px-3.5 py-2.5 border-b border-black flex items-center justify-between">
        {label ? (
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#1B49B8]">// {label}</span>
        ) : (
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-gray-500">// BOLD & INDUSTRIAL WYSIWYG CREATIVE ENGINE</span>
        )}
        <span className="font-mono text-[8px] tracking-widest text-zinc-500 uppercase">STATE RESOLVED</span>
      </div>

      {/* Constraints Toolbar Buttons */}
      <div className="flex flex-wrap items-center bg-white border-b border-black divide-x divide-black">
        {/* Bold */}
        <button
          type="button"
          title="Toggle Bold style selection"
          onClick={() => executeCommand('bold')}
          className={`p-2.5 transition-none cursor-pointer flex items-center justify-center h-10 w-11 border-none rounded-none outline-none ${
            activeStyles.bold 
              ? 'bg-black text-white' 
              : 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200'
          }`}
        >
          <Bold className="h-4 w-4" />
        </button>
        
        {/* Italic */}
        <button
          type="button"
          title="Toggle Italic style selection"
          onClick={() => executeCommand('italic')}
          className={`p-2.5 transition-none cursor-pointer flex items-center justify-center h-10 w-11 border-none rounded-none outline-none ${
            activeStyles.italic 
              ? 'bg-black text-white' 
              : 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200'
          }`}
        >
          <Italic className="h-4 w-4" />
        </button>

        {/* Underline */}
        <button
          type="button"
          title="Toggle Underline style selection"
          onClick={() => executeCommand('underline')}
          className={`p-2.5 transition-none cursor-pointer flex items-center justify-center h-10 w-11 border-none rounded-none outline-none ${
            activeStyles.underline 
              ? 'bg-black text-white' 
              : 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200'
          }`}
        >
          <Underline className="h-4 w-4" />
        </button>

        {/* Heading 2 subtitle */}
        <button
          type="button"
          title="Set Subsection Subtitle Block (H2)"
          onClick={() => toggleBlockElement('h2')}
          className={`p-2.5 transition-none cursor-pointer flex items-center justify-center h-10 w-14 border-none rounded-none outline-none font-mono text-[9px] font-black ${
            activeStyles.h2 
              ? 'bg-black text-white' 
              : 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200'
          }`}
        >
          <Heading2 className="h-3.5 w-3.5 mr-0.5" /> H2
        </button>

        {/* Heading 3 subgroup */}
        <button
          type="button"
          title="Set Subsection Paragraph Layer (H3)"
          onClick={() => toggleBlockElement('h3')}
          className={`p-2.5 transition-none cursor-pointer flex items-center justify-center h-10 w-14 border-none rounded-none outline-none font-mono text-[9px] font-black ${
            activeStyles.h3 
              ? 'bg-black text-white' 
              : 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200'
          }`}
        >
          <Heading3 className="h-3.5 w-3.5 mr-0.5" /> H3
        </button>

        {/* Unordered Bullet List */}
        <button
          type="button"
          title="Format Point Unordered list formatting"
          onClick={() => executeCommand('insertUnorderedList')}
          className={`p-2.5 transition-none cursor-pointer flex items-center justify-center h-10 w-11 border-none rounded-none outline-none ${
            activeStyles.bulletList 
              ? 'bg-black text-white' 
              : 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200'
          }`}
        >
          <List className="h-4 w-4" />
        </button>

        {/* Ordered Sequential List */}
        <button
          type="button"
          title="Format Numbered ordered progression list"
          onClick={() => executeCommand('insertOrderedList')}
          className={`p-2.5 transition-none cursor-pointer flex items-center justify-center h-10 w-11 border-none rounded-none outline-none ${
            activeStyles.orderedList 
              ? 'bg-black text-white' 
              : 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200'
          }`}
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        {/* Blockquote section formatting wrapper */}
        <button
          type="button"
          title="Toggle Industrial Offset Quote boundary block"
          onClick={() => toggleBlockElement('blockquote')}
          className={`p-2.5 transition-none cursor-pointer flex items-center justify-center h-10 w-11 border-none rounded-none outline-none ${
            activeStyles.blockquote 
              ? 'bg-black text-white' 
              : 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200'
          }`}
        >
          <Quote className="h-4 w-4" />
        </button>

        {/* Hyperlink inserting and binding overlay */}
        <button
          type="button"
          title="Insert secure reference link anchor"
          onClick={openLinkModal}
          className="p-2.5 bg-white text-black hover:bg-zinc-100 active:bg-zinc-200 transition-none cursor-pointer flex items-center justify-center h-10 w-11 border-none rounded-none outline-none"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        {/* Drafting line design block grid aesthetic element fill */}
        <div className="flex-grow bg-white h-10 pointer-events-none" />
      </div>

      {/* Target Link Bind Overlay Modal Panel */}
      {showLinkModal && (
        <div className="bg-black text-white px-3.5 py-3 border-b border-black flex items-center justify-between gap-3.5 z-20">
          <div className="flex items-center gap-3.5 flex-grow">
            <span className="font-mono text-[9px] uppercase font-black text-industrial-red shrink-0">// DISPATCH LINK REF:</span>
            <input
              type="text"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-white text-xs px-3 py-1.5 focus:outline-none focus:border-white font-mono flex-grow rounded-none h-8"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  insertLink();
                }
              }}
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={insertLink}
              className="px-3 py-1.5 bg-white text-black font-mono font-black text-[10px] uppercase border border-white hover:bg-zinc-100 cursor-pointer h-8 flex items-center justify-center rounded-none"
            >
              Bind Reference Link
            </button>
            <button
              type="button"
              onClick={() => {
                setShowLinkModal(false);
                setSavedSelection(null);
              }}
              className="p-1.5 text-zinc-400 hover:text-white cursor-pointer h-8 w-8 flex items-center justify-center"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      )}

      {/* Structured Writing Area - Real Rich HTML Surface */}
      <div className="w-full flex bg-white min-h-[250px] relative">
        <div
          ref={editorRef}
          contentEditable={true}
          onInput={handleInput}
          onKeyUp={updateActiveStyles}
          onMouseUp={updateActiveStyles}
          onFocus={updateActiveStyles}
          placeholder={placeholder}
          id="wysiwyg-editor-canvas"
          className="w-full min-h-[250px] p-4 font-sans text-xs text-black border-none focus:outline-none focus:ring-0 leading-relaxed bg-white prose prose-sm max-w-none prose-headings:font-display prose-headings:font-black prose-p:font-sans prose-p:text-sm 
          [&_blockquote]:border-l-3 [&_blockquote]:border-industrial-red [&_blockquote]:pl-4 [&_blockquote]:my-3 [&_blockquote]:py-1 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_blockquote]:bg-gray-50/50 
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 
          [&_a]:text-sky-600 [&_a]:underline hover:[&_a]:text-sky-850 
          [&_h2]:font-display [&_h2]:font-black [&_h2]:text-black [&_h2]:text-lg [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:mb-2 [&_h2]:mt-4
          [&_h3]:font-display [&_h3]:font-extrabold [&_h3]:text-[#111111] [&_h3]:text-base [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:mb-2 [&_h3]:mt-4"
        />
        
        {/* Placeholder handler */}
        {(!value || value === '<p></p>' || value === '<br>') && (
          <div className="absolute top-4 left-4 font-mono text-zinc-400 text-xs pointer-events-none uppercase italic">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}

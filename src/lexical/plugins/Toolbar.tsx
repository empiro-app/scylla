import { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  RangeSelection,
} from 'lexical';
import { TOGGLE_LINK_COMMAND, $isLinkNode } from '@lexical/link';
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
} from '@fortawesome/free-solid-svg-icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { importDocx } from '../../controls/mammoth';
interface Props {
  editor?: {
    container?: {
      styles?: string;
    };
    docsImporter?: {
      enabled: boolean;
      onImport?: (doc: any) => void;
    };
    textArea?: {
      placeholder?: string;
      onChange?: (value: string) => void;
      styles?: string;
    };
    toolbarContainer?: {
      styles: string;
    };
    bold?: {
      icon?: any;
      enabled: boolean;
      onActiveStyles?: string;
      onInactiveStyles?: string;
      onHoverStyles?: string;
    };
    italic?: {
      icon?: any;
      enabled: boolean;
      onActiveStyles?: string;
      onInactiveStyles?: string;
      onHoverStyles?: string;
    };
    underline?: {
      icon?: any;
      enabled: boolean;
      onActiveStyles?: string;
      onInactiveStyles?: string;
      onHoverStyles?: string;
    };
    strikethrough?: {
      icon?: any;
      enabled: boolean;
      onActiveStyles?: string;
      onInactiveStyles?: string;
      onHoverStyles?: string;
    };
    link?: {
      icon?: any;
      enabled: boolean;
      onActiveStyles?: string;
      onInactiveStyles?: string;
      onHoverStyles?: string;
    };
  };
}
const Toolbar = (props: Props) => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikeThrough, setIsStrikeThrough] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikeThrough(selection.hasFormat('strikethrough'));
      const node = getSelectedNode(selection) as any;
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);
  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }: any) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [updateToolbar, editor]);

  return (
    <div className='absolute z-20 bottom-0 left-1/2 transform -translate-x-1/2 min-w-52 h-10 px-2 py-2 bg-[#1b2733] mb-4 space-x-2 flex items-center'>
      {props.editor?.bold?.enabled && (
        <button
          className={'toolbar-item spaced' + (isBold ? ' active' : '')}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          aria-label='Format Bold'
        >
          {props.editor?.bold?.icon || <FontAwesomeIcon icon={faBold} />}
        </button>
      )}
      {props.editor?.italic?.enabled && (
        <button
          className={'toolbar-item spaced' + (isItalic ? ' active' : '')}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          }}
          aria-label='Format Italic'
        >
          {props.editor.italic?.icon || <FontAwesomeIcon icon={faItalic} />}
        </button>
      )}
      {props.editor?.underline?.enabled && (
        <button
          className={'toolbar-item spaced' + (isUnderline ? ' active' : '')}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          }}
          aria-label='Format Underline'
        >
          {props.editor?.underline?.icon || (
            <FontAwesomeIcon icon={faUnderline} />
          )}
        </button>
      )}
      {props.editor?.strikethrough?.enabled && (
        <button
          className={'toolbar-item spaced' + (isStrikeThrough ? ' active' : '')}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          }}
          aria-label='Format Underline'
        >
          {props.editor?.strikethrough?.icon || (
            <FontAwesomeIcon icon={faStrikethrough} />
          )}
        </button>
      )}
      {props.editor?.link?.enabled && (
        <button
          className={'toolbar-item spaced' + (isLink ? ' active' : '')}
          onClick={insertLink}
          aria-label='Format Underline'
        >
          {props.editor?.link?.icon || (
            <FontAwesomeIcon icon={faStrikethrough} />
          )}
        </button>
      )}
      {props.editor?.docsImporter?.enabled && (
        <input
          type='file'
          name='docx'
          onChange={async (e) => {
            if (e.target.files && e.target.files?.length > 0) {
              const file: File = e.target.files[0];
              file.arrayBuffer().then(async (buffer) => {
                let x = Buffer.from(buffer);
              });
            }
          }}
        />
      )}
    </div>
  );
};

export default Toolbar;
function getSelectedNode(selection: RangeSelection) {
  throw new Error('Function not implemented.');
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mergeRegister } from '@lexical/utils';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import React from 'react';
import { faBold } from '@fortawesome/free-solid-svg-icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
interface Props {
  bold?: {
    icon: any;
    enabled: boolean;
  };
  italic?: {
    icon: any;
    enabled: boolean;
  };
  underline?: {
    icon: any;
    enabled: boolean;
  };
}
const Toolbar = (props: Props) => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
    }
  }, [editor]);
  React.useEffect(() => {
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
      {props.bold?.enabled && (
        <button
          className={'toolbar-item spaced' + (isBold ? ' active' : '')}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          aria-label='Format Bold'
        >
          {props.bold?.icon || <FontAwesomeIcon icon={faBold} />}
        </button>
      )}
    </div>
  );
};

export default Toolbar;

import { $getRoot, $getSelection } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import Toolbar from '../../lexical/plugins/Toolbar';
import ScyllaTheme from '../../lexical/theme';
import './index.css';
interface Props {
  proMode: boolean;
  accentColor?: string;
  editor?: {
    container?: {
      styles?: string;
    };
    textArea?: {
      placeholder?: string;
      onChange?: (value: string) => void;
    };
    docsImporter?: {
      enabled: boolean;
      onImport?: (doc: any) => void;
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
  };
}

const onError = (error: any) => {
  console.log(error);
};
function onChange(state: any) {
  state.read(() => {
    const root = $getRoot();
    const selection = $getSelection();
  });
}
const LexicalEditor = (props: Props) => {
  const initialConfig = {
    namespace: 'scylla',
    theme: ScyllaTheme,
    onError,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className='editor-container'>
        <Toolbar editor={props.editor} />
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={
              <div className='editor-placeholder'>
                {props.editor?.textArea?.placeholder ||
                  "Whoo!! I'm using the Scylla editor"}
              </div>
            }
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};
const Editor = (props: Props) => {
  //If proMode is true, then the editor should be a moustache-renderer editor
  if (props.proMode) return <div>Mustache Editor mode on</div>;
  return <LexicalEditor {...props} />;
};

export default Editor;

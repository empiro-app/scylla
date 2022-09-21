import { $getRoot, $getSelection } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import Toolbar from '../../lexical/plugins/Toolbar';
import './index.css';
interface Props {
  proMode: boolean;
  accentColor?: string;
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
const theme = {
  paragraph: 'mb-1',
};
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
    theme,
    onError,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className='editor-container'>
        <Toolbar />
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={
              <div className='editor-placeholder'>
                Now write something brilliant...
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

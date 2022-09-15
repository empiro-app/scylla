import Mustache from 'mustache';
import { jsPDF } from 'jspdf';
import './index.css';
/* Defining the props that the component will take. */
interface Props {
  exportButton?: boolean;
  exportButtonLabel?: string;
  exportButtonIcon?: any;
  html: string;
  data: any;
  preview?: boolean;
  previewLabel?: string;
  font?: string;
  pdfName: string;
}
const Scylla = (props: Props) => {
  const output = Mustache.render(props.html, props.data);
  const doc = new jsPDF();
  doc.html(output);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: output }} />
      {props.exportButton && (
        <div>
          {props.exportButtonIcon}
          <button
            onClick={() => {
              doc.save(`${props.pdfName}.pdf`);
            }}
          >
            {props.exportButtonLabel || 'Export your pdf'}
          </button>
          {props.preview && (
            <strong>{props.exportButtonLabel || 'Preview'}</strong>
          )}
        </div>
      )}
    </div>
  );
};

export default Scylla;

import Mustache from 'mustache';
import { jsPDF } from 'jspdf';
import './index.css';
import { useEffect } from 'react';
/* Defining the props that the component will take. */
interface Props {
  exportButton?: boolean;
  exportButtonLabel?: string;
  exportButtonIcon?: any;
  exportButtonIconStyles?: ScyllaStyles;
  exportButtonStyles?: ScyllaStyles;
  html: string;
  data: any;
  preview?: boolean;
  previewLabel?: string;
  previewIcon?: any;
  previewIconStyles?: ScyllaStyles;
  previewStyles?: ScyllaStyles;
  font?: string;
  pdfName: string;
  getEmbededHtml?: (html: string) => string;
  triggerDownloadCallback?: () => void;
  triggerPreviewCallback?: () => void;
  triggerDownload?: boolean;
  triggerPreview?: boolean;
}
type ScyllaStyles = {
  backgroundColor?: string;
  color?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  cursor?: string;
  boxShadow?: string;
  fontSize?: string;
  fontWeight?: string;
};
const ScyllaViewer = (props: Props) => {
  const output = Mustache.render(props.html, props.data);
  const doc = new jsPDF();
  doc.html(output);
  if (props.getEmbededHtml) {
    props.getEmbededHtml(output);
  }
  useEffect(() => {
    (async () => {
      if (props.triggerDownload && props.triggerDownloadCallback) {
        let pdf = new jsPDF();
        await pdf.html(output);
        pdf.save(`${props.pdfName}.pdf`);
        props.triggerDownloadCallback();
      }
      if (props.triggerPreview && props.triggerPreviewCallback) {
        let pdf = new jsPDF();
        await pdf.html(output);
        let win = document.createElement('a');
        win.target = '_blank';
        win.href = pdf.output('datauristring');
        win.click();
        props.triggerPreviewCallback();
      }
    })();
  }, [props.triggerDownload, props.triggerPreview]);

  return (
    <div className='scylla-container'>
      <div
        className='embed-html'
        dangerouslySetInnerHTML={{ __html: output }}
      />
      {props.exportButton && (
        <div className='export-info'>
          <div
            style={props.exportButtonStyles}
            onClick={() => {
              doc.save(`${props.pdfName}.pdf`);
            }}
            className='export-button-container'
          >
            <div
              style={props.exportButtonIconStyles}
              className='export-button-icon'
            >
              {props.exportButtonIcon}
            </div>
            <button className='export-button'>
              {props.exportButtonLabel || 'Export your pdf'}
            </button>
          </div>
          {props.preview && (
            <div className='preview-container'>
              <div style={props.previewIconStyles} className='preview-icon'>
                {props.previewIcon}
              </div>
              <div
                style={props.previewStyles}
                className='preview'
                onClick={() => {
                  let win = document.createElement('a');
                  win.target = '_blank';
                  win.href = doc.output('datauristring');
                  win.click();
                }}
              >
                {props.previewLabel || 'Preview'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScyllaViewer;

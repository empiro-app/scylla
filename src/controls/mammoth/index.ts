import * as mammoth from 'mammoth';

//TODO: Set up properly options

const importDocx = async (docx: ArrayBuffer) => {
  const res = await mammoth.convertToHtml({ arrayBuffer: docx });
  return {
    html: res.value,
    messages: res.messages,
  };
};

export { importDocx };

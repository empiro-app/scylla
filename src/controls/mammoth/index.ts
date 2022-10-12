import * as mammoth from 'mammoth';

//TODO: Set up properly options

const importDocx = async (docx: Buffer) => {
  const res = await mammoth.convertToHtml({ buffer: docx });
  return {
    html: res.value,
    messages: res.messages,
  };
};

export { importDocx };

const docx = require("docx");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  SymbolRun,
  UnderlineType,
} = docx;
var now = new Date();

function TITULO(text, spacing) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        alignment: AlignmentType.CENTER,
        bold: true,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: {
      after: spacing,
    },
  });
}

function SUBTITULO_IZQ_FECHA(now) {
  return new Paragraph({
    children: [
      new TextRun({
        text:
          "" + now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear(),
        alignment: AlignmentType.CENTER,
        bold: true,
      }),
    ],
    spacing: {
      after: 200,
    },
  });
}
function SUBTITULO_DER_FECHA(text, spacing) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        alignment: AlignmentType.RIGHT,
        bold: true,
      }),
    ],
    spacing: {
      after: spacing,
    },
  });
}

function SUBTITULO_IZQ_STRONG(text, spacing) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        alignment: AlignmentType.CENTER,
        bold: true,
      }),
    ],
    spacing: {
      after: spacing,
    },
  });
}

function ITEM_RESALTADO(item, text, spacing) {
  return new Paragraph({
    children: [
      new TextRun({
        text: item,
        alignment: AlignmentType.CENTER,
        bold: true,
      }),
      new TextRun({
        text,
        alignment: AlignmentType.CENTER,
      }),
    ],
    spacing: {
      after: spacing,
    },
  });
}

function TEXTO_RESALTADO(text) {
  return new TextRun({ text, alignment: AlignmentType.CENTER, bold: true });
}

function PARAGRAFO(text) {
  return new TextRun({
    text,
    alignment: AlignmentType.JUSTIFIED,
  });
}

function PARAGRAFO_ONLY(text, spacing) {
  return new Paragraph({
    text,
    alignment: AlignmentType.JUSTIFIED,
    spacing: {
      after: spacing,
    },
  });
}

module.exports = {
  TITULO,
  SUBTITULO_IZQ_FECHA,
  SUBTITULO_IZQ_STRONG,
  ITEM_RESALTADO,
  PARAGRAFO,
  PARAGRAFO_ONLY,
  SUBTITULO_DER_FECHA,
  TEXTO_RESALTADO,
};

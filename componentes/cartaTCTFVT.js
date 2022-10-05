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
const paragraph = require("../componentes/paragraph");

async function cartaTCTFVT(req, res) {
  const doc = new Document();
  var now = new Date();
  const {
    remitterCity,
    date,
    employee,
    position,
    area,
    recipientCity,
    expirationDate,
    signatureCompany,
    nameCompany,
    tipeId,
    id,
    phone,
    address,
  } = req;

  doc.addSection({
    properties: {},
    children: [
      paragraph.TITULO(
        "Carta de terminación del contrato a término fijo por vencimiento de términos",
        300
      ),
      paragraph.SUBTITULO_DER_FECHA(remitterCity, 0),
      paragraph.SUBTITULO_DER_FECHA(date, 300),
      paragraph.SUBTITULO_IZQ_STRONG("Señor(a)", 0),
      paragraph.SUBTITULO_IZQ_STRONG(employee, 0),
      paragraph.SUBTITULO_IZQ_STRONG(position, 0),
      paragraph.SUBTITULO_IZQ_STRONG(area, 0),
      paragraph.SUBTITULO_IZQ_STRONG(recipientCity, 300),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO(
            "Asunto: terminación del contrato de trabajo por vencimiento de términos."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO(
            "Me permito comunicarle que, en virtud de que el término de vigencia pactado en el contrato individual de trabajo suscrito con usted está próximo a vencerse, esta empresa ha decidido no darlo por prorrogado. Por lo anterior, le comunico que la empresa ha decidido dar por terminado su contrato de trabajo, de conformidad con el literal c) del artículo 61 del Código Sustantivo del Trabajo, siendo este documento válido como notificación y preaviso de la terminación del contrato, conforme a lo expuesto en el numeral 1 del artículo 46 del Código Sustantivo del Trabajo"
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO("Dicha decisión será efectiva a partir del día "),
          paragraph.PARAGRAFO(expirationDate),
          paragraph.PARAGRAFO(
            ". Por lo tanto, terminada la jornada podrá solicitar su liquidación de prestaciones sociales y salarios adeudados conforme a lo enunciado en el Código Sustantivo del Trabajo."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO(
            "Es oportuno manifestarle nuestro agradecimiento por su labor prestada en la empresa durante todo este tiempo, por lo que resaltamos y reconocemos su valioso desempeño y le deseamos éxitos en los proyectos venideros."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [paragraph.PARAGRAFO("Cordialmente,")],
        spacing: {
          after: 300,
        },
      }),

      paragraph.SUBTITULO_IZQ_STRONG("______________________", 100),
      paragraph.SUBTITULO_IZQ_STRONG(nameCompany, 0),
      paragraph.SUBTITULO_IZQ_STRONG(tipeId, 0),
      paragraph.SUBTITULO_IZQ_STRONG(id, 0),
      paragraph.SUBTITULO_IZQ_STRONG(phone, 0),
      paragraph.SUBTITULO_IZQ_STRONG(address, 0),
    ],
  });

  const b64string = await Packer.toBase64String(doc);

  res.setHeader("Content-Disposition", "attachment; filename=My Document.docx");
  res.send(Buffer.from(b64string, "base64"));
}

module.exports = { cartaTCTFVT };

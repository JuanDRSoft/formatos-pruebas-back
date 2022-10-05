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

async function tutela(req, res) {
  const doc = new Document();
  var now = new Date();
  const { name, numID, adress, factory, city, phone, email } = req;

  doc.addSection({
    properties: {},
    children: [
      paragraph.TITULO("FORMATO ACCION DE TUTELA", 200),
      paragraph.SUBTITULO_IZQ_FECHA(),
      paragraph.SUBTITULO_IZQ_STRONG("Señor", 0),
      paragraph.SUBTITULO_IZQ_STRONG("JUEZ (REPARTO)", 0),
      paragraph.SUBTITULO_IZQ_STRONG("E. S. D.", 300),
      paragraph.ITEM_RESALTADO("Referencia: ", "Acción de Tutela", 0),
      paragraph.ITEM_RESALTADO("Accionante: ", name, 0),
      paragraph.ITEM_RESALTADO("Accionada: ", factory, 300),
      new Paragraph({
        children: [
          paragraph.PARAGRAFO(name),
          paragraph.PARAGRAFO(
            ", mayor de edad, identificada como aparece al pie de mi firma domiciliada en la ciudad de "
          ),
          paragraph.PARAGRAFO(city),
          paragraph.PARAGRAFO(
            ", en ejercicio del artículo 86 de la Constitución Política, y de conformidad con los Decretos 2591 de 1991, 306 de 1992 y 1382 de 2000, interpongo ante su despacho la presente Acción de Tutela, con el fin de que se me protejan mis derechos fundamentales de Petición (consultar que otros derechos le están vulnerando) por entidad o persona que vulnera sus derechos, para fundamentar esta Acción Constitucional me permito relacionar los siguientes:"
          ),
        ],
        spacing: {
          after: 300,
        },
      }),
      paragraph.TITULO("FUNDAMENTOS DE DERECHO", 200),
      paragraph.PARAGRAFO_ONLY(
        "Artículo 86 de la Constitución Política, los Decretos 2591 de 1991, 306 de 1992 y 1382 de 2000.",
        300
      ),
      paragraph.TITULO("PETICIÓN", 200),
      paragraph.PARAGRAFO_ONLY(
        "Con fundamento en lo anteriormente expuesto le solicito señor juez que se tutelen mis derechos fundamentales invocados como amenazados, violados y/o vulnerados derecho de petición",
        200
      ),
      paragraph.TITULO("JURAMENTO", 200),
      paragraph.PARAGRAFO_ONLY(
        "Bajo la gravedad del juramento me permito manifestarle que por los mismos hechos y derechos no he presentado acción de tutela ante ningún otro despacho judicial.",
        200
      ),
      paragraph.TITULO("NOTIFICACIÓN", 200),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO(
            "LUGAR DONDE LE PUEDEN COMUNICAR LA DECISIÓN O SOLICITAR ALGUN DOCUMENTO Dirección: "
          ),
          paragraph.PARAGRAFO(adress),
          paragraph.PARAGRAFO(", de la ciudad de "),
          paragraph.PARAGRAFO(city),
          paragraph.PARAGRAFO(", Teléfono: "),
          paragraph.PARAGRAFO(phone),
          paragraph.PARAGRAFO(", Correo Eléctronico: "),
          paragraph.PARAGRAFO(email),
        ],
        spacing: {
          after: 200,
        },
      }),
      new Paragraph({
        text: "Del Señor juez",
        alignment: AlignmentType.LEFT,
        bold: true,
        spacing: {
          after: 200,
        },
      }),
      new Paragraph({
        text: "Atentamente:",
        alignment: AlignmentType.LEFT,
        bold: true,
        spacing: {
          after: 1700,
        },
      }),
      new Paragraph({
        text: "Firma del accionante",
        alignment: AlignmentType.LEFT,
        underline: {
          type: UnderlineType.DOUBLE,
          color: "00000",
        },
        border: {
          top: {
            color: "auto",
            space: 1,
            value: "single",
            size: 1,
          },
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Nombre del accionante: ",
            alignment: AlignmentType.CENTER,
            bold: true,
          }),
          new TextRun({
            text: "" + name,
            alignment: AlignmentType.CENTER,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Cedula: ",
            alignment: AlignmentType.CENTER,
            bold: true,
          }),
          new TextRun({
            text: "" + numID,
            alignment: AlignmentType.CENTER,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "De: ",
            alignment: AlignmentType.CENTER,
            bold: true,
          }),
          new TextRun({
            text: "" + city,
            alignment: AlignmentType.CENTER,
          }),
        ],
      }),
    ],
  });

  const b64string = await Packer.toBase64String(doc);

  res.setHeader("Content-Disposition", "attachment; filename=My Document.docx");
  res.send(Buffer.from(b64string, "base64"));
}
module.exports = { tutela };

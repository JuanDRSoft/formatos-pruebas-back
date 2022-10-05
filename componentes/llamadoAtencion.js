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

async function llamadoAtencion(req, res) {
  const doc = new Document();
  const now = new Date(Date.now());

  const {
    city,
    employee,
    work,
    company,
    eventDate,
    eventDescription,
    diligenceDate,
    justification,
    recommendation,
    boss,
    bossId,
    bossPhone,
    bossAddress,
  } = req;

  const date = new Date(diligenceDate);
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();

  doc.addSection({
    properties: {},
    children: [
      paragraph.TITULO("LLAMADO DE ATENCIÓN", 200),
      paragraph.SUBTITULO_IZQ_STRONG(city, 0),
      paragraph.SUBTITULO_IZQ_FECHA(now),
      paragraph.SUBTITULO_IZQ_STRONG("Señor", 0),
      paragraph.SUBTITULO_IZQ_STRONG(employee, 0),
      paragraph.SUBTITULO_IZQ_STRONG(work, 0),
      paragraph.SUBTITULO_IZQ_STRONG(company, 300),

      paragraph.ITEM_RESALTADO("Asunto: ", "llamado de atención", 300),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO("El pasado "),
          paragraph.PARAGRAFO(eventDate),
          paragraph.PARAGRAFO(" sucedieron los siguientes hechos: "),
          paragraph.PARAGRAFO(eventDescription),
          paragraph.PARAGRAFO(
            ". De acuerdo con la diligencia de descargos adelantada el día "
          ),
          paragraph.PARAGRAFO(dia),
          paragraph.PARAGRAFO(" del mes "),
          paragraph.PARAGRAFO(mes),
          paragraph.PARAGRAFO(" de "),
          paragraph.PARAGRAFO(año),
          paragraph.PARAGRAFO(", se pudo verificar que "),
          paragraph.PARAGRAFO(justification),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO(
            "Por lo anterior, me permito hacerle un llamado de atención para que "
          ),
          paragraph.PARAGRAFO(recommendation),
          paragraph.PARAGRAFO(
            ", debiendo tomar las medidas necesarias para que los riesgos disminuyan y los resultados sean cada vez mejores."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      paragraph.PARAGRAFO_ONLY("Atentamente,", 300),

      paragraph.SUBTITULO_IZQ_STRONG("_________________________________", 100),
      paragraph.SUBTITULO_IZQ_STRONG(boss, 0),
      paragraph.ITEM_RESALTADO("C.C.", bossId, 0),
      paragraph.SUBTITULO_IZQ_STRONG(bossPhone, 0),
      paragraph.SUBTITULO_IZQ_STRONG(bossAddress, 0),
    ],
  });

  const b64string = await Packer.toBase64String(doc);

  res.setHeader("Content-Disposition", "attachment; filename=My Document.docx");
  res.send(Buffer.from(b64string, "base64"));
}

module.exports = { llamadoAtencion };

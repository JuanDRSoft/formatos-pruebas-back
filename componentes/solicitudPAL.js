const docx = require("docx");
const { Document, Packer, Paragraph } = docx;
const paragraph = require("../componentes/paragraph");

async function solicitudPAL(req, res) {
  const doc = new Document();
  const now = new Date(Date.now());
  const {
    remitentCity,
    company,
    recipientCity,
    employee,
    debtYears,
    service,
    otherClaims,
    employeeId,
    expeditionPlace,
  } = req;

  doc.addSection({
    properties: {},
    children: [
      paragraph.TITULO("SOLICITUD DE PAGO DE ACREENCIAS LABORALES", 200),
      paragraph.SUBTITULO_DER_FECHA(remitentCity, now),
      paragraph.SUBTITULO_IZQ_STRONG("Señor", 0),
      paragraph.SUBTITULO_IZQ_STRONG(company, 0),
      paragraph.SUBTITULO_IZQ_STRONG(recipientCity, 300),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO(employee),
          paragraph.PARAGRAFO(
            ", mayor de edad, identificado como aparece al pie de mi firma, comedidamente solicito el reconocimiento y pago de las acreencias laborales que la sociedad por usted representada me adeuda, como son:"
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("1. "),
          paragraph.PARAGRAFO("Cesantias correspondientes a"),
          paragraph.PARAGRAFO(debtYears),
        ],
        spacing: {
          after: 200,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("2. "),
          paragraph.PARAGRAFO("Primas de servicio de"),
          paragraph.PARAGRAFO(service),
        ],
        spacing: {
          after: 200,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("3. "),
          paragraph.PARAGRAFO("Sanción moratoria por el pago retardado."),
        ],
        spacing: {
          after: 200,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("3. "),
          paragraph.PARAGRAFO("Sanción moratoria por el pago retardado."),
        ],
        spacing: {
          after: 200,
        },
      }),

      paragraph.PARAGRAFO_ONLY(otherClaims, 200),

      paragraph.PARAGRAFO_ONLY(
        "Los anteriores valores deben ser indexados a la fecha de pago.",
        300
      ),

      paragraph.PARAGRAFO_ONLY("Atentamente,", 200),

      paragraph.SUBTITULO_IZQ_STRONG("__________________________________", 200),
      paragraph.SUBTITULO_IZQ_STRONG(employee, 0),
      paragraph.ITEM_RESALTADO("C.C.", employeeId, 0),
      paragraph.SUBTITULO_IZQ_STRONG(expeditionPlace, 0),
    ],
  });
  const b64string = await Packer.toBase64String(doc);

  res.setHeader("Content-Disposition", "attachment; filename=My Document.docx");
  res.send(Buffer.from(b64string, "base64"));
}

module.exports = { solicitudPAL };

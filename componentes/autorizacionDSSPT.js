const docx = require("docx");
const { Document, Packer, Paragraph } = docx;
const paragraph = require("../componentes/paragraph");

async function autorizacionDSSPT(req, res) {
  const doc = new Document();
  const {
    loan,
    employee,
    company,
    interests,
    dues,
    duesType,
    employeeId,
    loanDelivery,
    deliveryNumber,
  } = req;

  doc.addSection({
    properties: {},
    children: [
      paragraph.TITULO(
        "Autorización de descuentos sobre salarios por préstamos al trabajador",
        300
      ),
      paragraph.ITEM_RESALTADO("Valor del préstamo: ", loan, 0),
      paragraph.ITEM_RESALTADO(
        "Nombres y apellidos completos del trabajador: ",
        employee,
        300
      ),

      paragraph.TITULO("Constancia de recibo y autorización", 200),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO("Recibí de la sociedad "),
          paragraph.PARAGRAFO(company),
          paragraph.PARAGRAFO(
            " la suma mencionada en líneas anteriores, en calidad de préstamo "
          ),
          paragraph.PARAGRAFO(interests.value),
          paragraph.PARAGRAFO(" sobre mis salarios."),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO(
            "Por lo anterior, autorizo expresamente al pagador de la empresa para que dicha suma se descuente de mis salarios, de la siguiente forma:"
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("a) "),
          paragraph.PARAGRAFO("Cuotas por valor de "),
          paragraph.PARAGRAFO(dues),
          paragraph.PARAGRAFO(" que serán descontadas en cada pago "),
          paragraph.PARAGRAFO(duesType.value),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("b) "),
          paragraph.PARAGRAFO(
            "De la prima de servicios de junio y diciembre se descontará igual valor al de la cuota fijada en el punto anterior."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO(
            "Asimismo, autorizo expresamente al empleador para que retenga y cobre de mi liquidación final de prestaciones sociales, salarios e indemnizaciones los saldos que esté adeudando, si llegase a finalizar mi contrato de trabajo antes de completar el pago total de este préstamo."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      paragraph.PARAGRAFO_ONLY("Recibí conforme.", 200),
      paragraph.SUBTITULO_IZQ_STRONG("___________________________", 100),
      paragraph.SUBTITULO_IZQ_STRONG(employee, 0),
      paragraph.SUBTITULO_IZQ_STRONG(employeeId, 200),
      paragraph.SUBTITULO_IZQ_STRONG(
        "Aprobado por ______________________________",
        300
      ),
      paragraph.SUBTITULO_IZQ_STRONG(
        "Encargado de nomina _______________________",
        300
      ),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO("Entrega del préstamo a través del "),
          paragraph.PARAGRAFO(loanDelivery.value, 300),
          paragraph.PARAGRAFO(" n° "),
          paragraph.PARAGRAFO(deliveryNumber),
        ],
        spacing: {
          after: 300,
        },
      }),
    ],
  });

  const b64string = await Packer.toBase64String(doc);

  res.setHeader("Content-Disposition", "attachment; filename=My Document.docx");
  res.send(Buffer.from(b64string, "base64"));
}

module.exports = { autorizacionDSSPT };

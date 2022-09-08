const Documento = require("../models/Documento");
const helpers = require("./helpers");
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
const validParams = [
  "name",
  "numID",
  "adress",
  "factory",
  "city",
  "phone",
  "email",
];
const paragraph = require("../componentes/paragraph");

function find(req, res, next) {
  Documento.findById(req.params.id)
    .then((administrador) => {
      req.administrador = administrador;
      next();
    })
    .catch((err) => {
      next(err);
    });
}
function index(req, res) {
  Documento.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}
function show(req, res) {
  res.json(req.administrador);
}
async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);
  Documento.create(params)
    .then((administrador) => {
      res.json(administrador);
      req.administrador = administrador;
      //next();
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error,
      });
    });
}
function update(req, res) {
  req.administrador = Object.assign(req.administrador, req.body);
  req.administrador
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}
function destroy(req, res) {
  req.administrador
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

async function generateDoc(req, res) {
  let params = helpers.buildParams(validParams, req.body);

  const doc = new Document();
  var now = new Date();
  const { name, numID, adress, factory, city, phone, email } = params;

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

async function generateCartaTCTFVT(req, res) {
  let params = req.body;

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
  } = req.body;

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

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  find,
  generateDoc,
  generateCartaTCTFVT,
};

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
  "user",
];
const paragraph = require("../componentes/paragraph");
const { tutela } = require("../componentes/tutela");

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

function findByUser(req, res, next) {
  Documento.find({ user: req.params.id })
    .sort([["creado", -1]])
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

  tutela(params, res);

  // const doc = new Document();
  // var now = new Date();
  // const { name, numID, adress, factory, city, phone, email } = params;

  // doc.addSection({
  //   properties: {},
  //   children: [
  //     paragraph.TITULO("FORMATO ACCION DE TUTELA", 200),
  //     paragraph.SUBTITULO_IZQ_FECHA(),
  //     paragraph.SUBTITULO_IZQ_STRONG("Señor", 0),
  //     paragraph.SUBTITULO_IZQ_STRONG("JUEZ (REPARTO)", 0),
  //     paragraph.SUBTITULO_IZQ_STRONG("E. S. D.", 300),
  //     paragraph.ITEM_RESALTADO("Referencia: ", "Acción de Tutela", 0),
  //     paragraph.ITEM_RESALTADO("Accionante: ", name, 0),
  //     paragraph.ITEM_RESALTADO("Accionada: ", factory, 300),
  //     new Paragraph({
  //       children: [
  //         paragraph.PARAGRAFO(name),
  //         paragraph.PARAGRAFO(
  //           ", mayor de edad, identificada como aparece al pie de mi firma domiciliada en la ciudad de "
  //         ),
  //         paragraph.PARAGRAFO(city),
  //         paragraph.PARAGRAFO(
  //           ", en ejercicio del artículo 86 de la Constitución Política, y de conformidad con los Decretos 2591 de 1991, 306 de 1992 y 1382 de 2000, interpongo ante su despacho la presente Acción de Tutela, con el fin de que se me protejan mis derechos fundamentales de Petición (consultar que otros derechos le están vulnerando) por entidad o persona que vulnera sus derechos, para fundamentar esta Acción Constitucional me permito relacionar los siguientes:"
  //         ),
  //       ],
  //       spacing: {
  //         after: 300,
  //       },
  //     }),
  //     paragraph.TITULO("FUNDAMENTOS DE DERECHO", 200),
  //     paragraph.PARAGRAFO_ONLY(
  //       "Artículo 86 de la Constitución Política, los Decretos 2591 de 1991, 306 de 1992 y 1382 de 2000.",
  //       300
  //     ),
  //     paragraph.TITULO("PETICIÓN", 200),
  //     paragraph.PARAGRAFO_ONLY(
  //       "Con fundamento en lo anteriormente expuesto le solicito señor juez que se tutelen mis derechos fundamentales invocados como amenazados, violados y/o vulnerados derecho de petición",
  //       200
  //     ),
  //     paragraph.TITULO("JURAMENTO", 200),
  //     paragraph.PARAGRAFO_ONLY(
  //       "Bajo la gravedad del juramento me permito manifestarle que por los mismos hechos y derechos no he presentado acción de tutela ante ningún otro despacho judicial.",
  //       200
  //     ),
  //     paragraph.TITULO("NOTIFICACIÓN", 200),

  //     new Paragraph({
  //       children: [
  //         paragraph.PARAGRAFO(
  //           "LUGAR DONDE LE PUEDEN COMUNICAR LA DECISIÓN O SOLICITAR ALGUN DOCUMENTO Dirección: "
  //         ),
  //         paragraph.PARAGRAFO(adress),
  //         paragraph.PARAGRAFO(", de la ciudad de "),
  //         paragraph.PARAGRAFO(city),
  //         paragraph.PARAGRAFO(", Teléfono: "),
  //         paragraph.PARAGRAFO(phone),
  //         paragraph.PARAGRAFO(", Correo Eléctronico: "),
  //         paragraph.PARAGRAFO(email),
  //       ],
  //       spacing: {
  //         after: 200,
  //       },
  //     }),
  //     new Paragraph({
  //       text: "Del Señor juez",
  //       alignment: AlignmentType.LEFT,
  //       bold: true,
  //       spacing: {
  //         after: 200,
  //       },
  //     }),
  //     new Paragraph({
  //       text: "Atentamente:",
  //       alignment: AlignmentType.LEFT,
  //       bold: true,
  //       spacing: {
  //         after: 1700,
  //       },
  //     }),
  //     new Paragraph({
  //       text: "Firma del accionante",
  //       alignment: AlignmentType.LEFT,
  //       underline: {
  //         type: UnderlineType.DOUBLE,
  //         color: "00000",
  //       },
  //       border: {
  //         top: {
  //           color: "auto",
  //           space: 1,
  //           value: "single",
  //           size: 1,
  //         },
  //       },
  //     }),
  //     new Paragraph({
  //       children: [
  //         new TextRun({
  //           text: "Nombre del accionante: ",
  //           alignment: AlignmentType.CENTER,
  //           bold: true,
  //         }),
  //         new TextRun({
  //           text: "" + name,
  //           alignment: AlignmentType.CENTER,
  //         }),
  //       ],
  //     }),
  //     new Paragraph({
  //       children: [
  //         new TextRun({
  //           text: "Cedula: ",
  //           alignment: AlignmentType.CENTER,
  //           bold: true,
  //         }),
  //         new TextRun({
  //           text: "" + numID,
  //           alignment: AlignmentType.CENTER,
  //         }),
  //       ],
  //     }),
  //     new Paragraph({
  //       children: [
  //         new TextRun({
  //           text: "De: ",
  //           alignment: AlignmentType.CENTER,
  //           bold: true,
  //         }),
  //         new TextRun({
  //           text: "" + city,
  //           alignment: AlignmentType.CENTER,
  //         }),
  //       ],
  //     }),
  //   ],
  // });

  // const b64string = await Packer.toBase64String(doc);

  // res.setHeader("Content-Disposition", "attachment; filename=My Document.docx");
  // res.send(Buffer.from(b64string, "base64"));
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

async function generateContratoTTI(req, res) {
  let params = req.body;

  const doc = new Document();
  const now = new Date(Date.now());
  const dia = now.getDate();
  const mes = now.getMonth() + 1;
  const año = now.getFullYear();
  const {
    nameCompany,
    companyId,
    companyCity,
    companyAddress,
    companyPhone,
    employee,
    typeId,
    id,
    employeeCity,
    employeeAddress,
    employeePhone,
    bornDate,
    bornSite,
    work,
    salary,
    typeSalary,
    paymentMethod,
    workDate,
    workCity,
    dailyHours,
    weekHours,
    workDays,
    schedule,
  } = req.body;

  doc.addSection({
    properties: {},
    children: [
      paragraph.TITULO("Contrato de trabajo a término indefinido", 300),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO(
            "Entre el (la) empleador(a) y el (la) trabajador(a) ambos mayores de edad, identificados como ya se anotó, se suscribe el "
          ),

          paragraph.TEXTO_RESALTADO("contrato de trabajo a término indefinido"),

          paragraph.PARAGRAFO(", regido por las siguientes cláusulas:"),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Primera. Objeto. "),

          paragraph.PARAGRAFO("El (La) empleador(a) "),

          paragraph.PARAGRAFO(nameCompany),

          paragraph.PARAGRAFO(", con domicilio comercial en la ciudad de "),

          paragraph.PARAGRAFO(companyCity),

          paragraph.PARAGRAFO(", identificado(a) con "),

          paragraph.PARAGRAFO(companyId),

          paragraph.PARAGRAFO(", contrata los servicios personales de "),

          paragraph.PARAGRAFO(employee),

          paragraph.PARAGRAFO(" identificado(a) con "),

          paragraph.PARAGRAFO(typeId),

          paragraph.PARAGRAFO(" "),

          paragraph.PARAGRAFO(id),

          paragraph.PARAGRAFO(", para que desempeñe el cargo de "),

          paragraph.PARAGRAFO(work),

          paragraph.PARAGRAFO(", obligándose a:"),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("a) "),

          paragraph.PARAGRAFO(
            "Poner al servicio del (de la) empleador(a) toda su capacidad normal de trabajo, en forma exclusiva en el desempeño de las funciones propias del oficio mencionado y en las labores anexas y complementadas del mismo, de conformidad con las órdenes e instrucciones que le imparta el (la) empleador(a) directamente o a través de sus representantes. "
          ),

          paragraph.TEXTO_RESALTADO("b) "),

          paragraph.PARAGRAFO(
            "Guardar absoluta reserva sobre los hechos, documentos, informaciones y en general, sobre todos los asuntos y materias que lleguen a su conocimiento por causa o con ocasión de su contrato de trabajo."
          ),

          paragraph.TEXTO_RESALTADO(" Parágrafo primero: "),

          paragraph.PARAGRAFO(
            "hacen parte integral del presente contrato las funciones detalladas en el manual de competencias del cargo, el cual será anexado al presente contrato o puesto a disposición del (de la) trabajador(a) para su consulta."
          ),

          paragraph.TEXTO_RESALTADO(" Parágrafo segundo: "),

          paragraph.PARAGRAFO(
            "la descripción anterior es general y no excluye ni limita para ejecutar labores conexas complementarias, asesorías o similares y en general aquellas que sean necesarias para un mejor resultado en la ejecución de la causa que dio origen al contrato."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Segunda. Remuneración. "),

          paragraph.PARAGRAFO(
            "El (la) empleador(a) pagará al (a la) trabajador(a) un salario mensual de "
          ),

          paragraph.PARAGRAFO(salary),

          paragraph.PARAGRAFO(" por su labor, pagadero "),

          paragraph.PARAGRAFO(paymentMethod),

          paragraph.PARAGRAFO(
            ". Dentro de este pago se encuentra incluida la remuneración de los descansos dominicales y festivos de que tratan los capítulos I y II del título VII del Código Sustantivo del Trabajo. "
          ),

          paragraph.TEXTO_RESALTADO("Parágrafo: "),

          paragraph.PARAGRAFO(
            "el (la) trabajador(a) autoriza al (a la) empleador(a) para que la retribución, así como cualquier otro beneficio originado en la existencia y/o terminación del contrato, sea consignada o trasladada a la cuenta abierta a su nombre en una entidad bancaria, que desde ya el (la) trabajador(a) notifica al (a la) empleador(a)."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO(
            "Tercera. Trabajo nocturno, suplementario, dominical y/o festivo. "
          ),

          paragraph.PARAGRAFO(
            "Para el reconocimiento y pago del trabajo suplementario, nocturno, dominical y/o festivo, el (la) empleador(a) o sus representantes deberán haberlo autorizado previamente por escrito y serán remunerados conforme al Código Sustantivo del Trabajo. Cuando la necesidad de dicho trabajo se presente de manera imprevista o inaplazable, deberá ejecutarse y darse cuenta de este por escrito, a la mayor brevedad, al (a la) empleador(a) o a sus representantes para su aprobación. El (La) empleador(a), en consecuencia, no reconocerá ningún trabajo suplementario, o trabajo nocturno o en días de descanso legalmente obligatorios que no hayan sido autorizados previamente o que, habiendo sido avisados inmediatamente, no hayan sido aprobados. "
          ),

          paragraph.TEXTO_RESALTADO("Parágrafo: "),

          paragraph.PARAGRAFO(
            "tratándose de trabajadores de dirección, confianza y manejo, no habrá pago a horas extras. El (La) empleador(a) fijará las jornadas laborales de acuerdo con las necesidades del servicio y podrá variarlas durante la ejecución del presente contrato. "
          ),
        ],
        spacing: { after: 300 },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO(
            "Cuarta. Jornada de trabajo. El (La) trabajador(a) "
          ),

          paragraph.PARAGRAFO("se obliga a laborar una jornada diaria de "),

          paragraph.PARAGRAFO(dailyHours),

          paragraph.PARAGRAFO(" horas, equivalente a "),

          paragraph.PARAGRAFO(weekHours),

          paragraph.PARAGRAFO(" horas semanales laboradas, de "),

          paragraph.PARAGRAFO(workDays),

          paragraph.PARAGRAFO(" dias a la semana, en el horario "),

          paragraph.PARAGRAFO(schedule),

          paragraph.PARAGRAFO(
            "; lo anterior salvo estipulación expresa y escrita en contrario, en los turnos y dentro de las horas señaladas por "
          ),

          paragraph.TEXTO_RESALTADO("el empleador(a), "),

          paragraph.PARAGRAFO(
            "pudiendo hacer este los ajustes o cambios de horario cuando lo estime conveniente. Por el acuerdo expreso o tácito de las partes, podrán repartirse las horas de la jornada ordinaria en la forma prevista en la ley, teniendo en cuenta que los tiempos de descanso entre las secciones de la jornada no se computan dentro de la misma. "
          ),

          paragraph.TEXTO_RESALTADO("Parágrafo: "),

          paragraph.PARAGRAFO(
            "en desarrollo del objeto social del (de la) empleador(a), este podrá designar al (a la) trabajador(a) para que realice las funciones en las oficinas de los clientes."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Quinta. Período de prueba. "),
          paragraph.PARAGRAFO("Los primeros "),
          paragraph.TEXTO_RESALTADO("dos (2) meses "),
          paragraph.PARAGRAFO(
            "del presente contrato se consideran como período de prueba y, por consiguiente, cualquiera de las partes podrá terminar el contrato unilateralmente, en cualquier momento, durante dicho período, sin que se cause el pago de indemnización alguna. "
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Sexta. Duración del contrato. "),
          paragraph.PARAGRAFO(
            "La duración del contrato será indefinida mientras subsistan las causas que le dieron origen y la materia del trabajo."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO(
            "Séptima. Afiliación y pago a seguridad social. "
          ),
          paragraph.PARAGRAFO(
            "Es obligación del (de la) empleador(a) afiliar al (a la) trabajador(a) a la seguridad social, como es salud, pensión, riesgos laborales y caja de compensación; por lo tanto, el (la) trabajador(a) autoriza el descuento de los valores que le corresponda aportar en la proporción establecida por la ley."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO(
            "Octava. Obligaciones del (de la) empleador(a). "
          ),
          paragraph.PARAGRAFO(
            "Hace parte de las obligaciones especiales, la de suministrar por parte del (de la) empleador(a) los elementos necesarios para el normal desempeño de las funciones del (de la) trabajador(a) y demás descritas en el artículo 57 del Código Sustantivo del Trabajo. "
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO(
            "Novena. Obligaciones del (de la) trabajador(a). a) "
          ),
          paragraph.PARAGRAFO(
            "Las establecidas en el artículo 58 del Código Sustantivo del Trabajo, las indicadas en el reglamento interno de trabajo y las instrucciones emitidas por el (la) empleador(a) en el transcurso del contrato laboral. "
          ),
          paragraph.TEXTO_RESALTADO("b) "),
          paragraph.PARAGRAFO(
            "Cumplir el acuerdo de confidencialidad determinado por el (la) empleador(a). "
          ),
          paragraph.TEXTO_RESALTADO("c) "),
          paragraph.PARAGRAFO(
            "No ejercer actos de competencia desleal frente al (a la) empleador(a). "
          ),
          paragraph.TEXTO_RESALTADO("d) "),
          paragraph.PARAGRAFO(
            "Respetar los sitios de trabajo asignados por el (la) empleador(a), cumpliendo con las directrices de la empresa. "
          ),
          paragraph.TEXTO_RESALTADO("e) "),
          paragraph.PARAGRAFO(
            "Cumplir con los horarios estipulados por el (la) empleador(a) para desarrollar las funciones. "
          ),
          paragraph.TEXTO_RESALTADO("f) "),
          paragraph.PARAGRAFO(
            "Demás obligaciones inherentes al presente contrato laboral. "
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Décima. Terminación unilateral. "),
          paragraph.PARAGRAFO(
            "Son justas causas para dar por terminado unilateralmente este contrato, por cualquiera de las partes, las que establece la ley el reglamento interno, el presente contrato y/o las circulares que a lo largo de la ejecución de este establezcan conductas no previstas en virtud de hechos o tecnologías o cambios de actividad en relación con las consideradas en el presente contrato. Se trata de reglamentaciones, órdenes, instrucciones de carácter general o particular que surjan con posterioridad al presente acuerdo, cuya violación sea calificada como grave. Expresamente se califican en este acto como "
          ),
          paragraph.TEXTO_RESALTADO("faltas graves "),
          paragraph.PARAGRAFO(
            "la violación a las obligaciones y prohibiciones descritas y además las siguientes:"
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("a) "),
          paragraph.PARAGRAFO(
            "El incumplimiento de las normas y políticas que tenga la compañía para el uso de los sistemas, informática, software, claves de seguridad, materiales, computadores, útiles de oficina, etc., que la empresa entrega al (a la) trabajador(a) para la mejor ejecución de sus funciones."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("b) "),
          paragraph.PARAGRAFO(
            "La violación o el incumplimiento a lo contenido en las normas de seguridad y salud en el trabajo."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("c) "),
          paragraph.PARAGRAFO(
            "La utilización para fines distintos a los considerados por el (la) empleador(a) para el cumplimiento de su objeto social de las bases de datos de su propiedad. "
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("d) "),
          paragraph.PARAGRAFO(
            "Desatender las actividades de capacitación programadas por el (la) empleador(a)."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("e) "),
          paragraph.PARAGRAFO(
            "La mala atención y el desinterés para con los clientes, proveedores, superiores y compañeros de trabajo."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("f) "),
          paragraph.PARAGRAFO(
            "En caso de laborar en turnos, efectuar cambios sin la debida autorización del jefe inmediato. "
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("g) "),
          paragraph.PARAGRAFO("Llegar tarde al sitio de trabajo."),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("h) "),
          paragraph.PARAGRAFO(
            "Negarse a cumplir con los protocolos y procesos para la prestación de servicios encomendados, y demás establecidos por la empresa en desarrollo de su objeto social. "
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("i) "),
          paragraph.PARAGRAFO(
            "Violar el acuerdo de confidencialidad determinado por la empresa."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Décima primera. Invenciones. "),
          paragraph.PARAGRAFO("Las invenciones realizadas por "),
          paragraph.TEXTO_RESALTADO("el (la) trabajador(a) "),
          paragraph.PARAGRAFO(
            "le pertenecen a la empresa siempre y cuando estas sean realizadas con ocasión y dentro de la ejecución del contrato de trabajo, y como parte del cumplimiento de las obligaciones del cargo. También lo son aquellas que se obtienen mediante los datos y medios conocidos o utilizados en la labor desempeñada."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Décima segunda. Derechos de autor. "),
          paragraph.PARAGRAFO(
            "Los derechos patrimoniales sobre las obras, diseños, invenciones, investigaciones, etc., creadas por el (la) "
          ),
          paragraph.TEXTO_RESALTADO("trabajador(a) "),
          paragraph.PARAGRAFO(
            "en ejercicio de sus funciones o con ocasión de estas pertenecen al (a la) empleador(a). "
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Décima tercera. Traslados. "),
          paragraph.PARAGRAFO(
            "El (la) trabajador(a) acepta que el (la) empleador(a) podrá trasladarlo de lugar y/o sitio de trabajo, de acuerdo con las necesidades del servicio, siempre y cuando no se menoscabe el honor y la dignidad o se produzca una desmejora sustancial o grave perjuicio con ocasión a la citada orden. El (La) empleador(a) está obligado a asumir los gastos originados en el traslado, siempre que sea una decisión unilateral de la empresa. "
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Décima cuarta. Beneficios extralegales. "),
          paragraph.PARAGRAFO(
            "El (La) empleador(a) podrá reconocer beneficios, primas y prestaciones de naturaleza extralegal, lo que se hace a título de mera liberalidad y estos subsistirán hasta que el (la) empleador(a) decida su modificación o supresión, sin que tengan carácter salarial, y por lo tanto no tienen efecto prestacional o incidencia en la base de aportes en la seguridad social o parafiscal. En especial, este acuerdo se refiere a auxilios en dinero o en especie, primas periódicas o de antigüedad, o en general beneficios de esa naturaleza, los cuales podrán ser modificados o suprimidos por el (la) empleador(a) de acuerdo con su determinación unilateral, tal como fue otorgado."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO(
            "Décima quinta. Protección de datos personales. "
          ),
          paragraph.PARAGRAFO(
            "En cumplimiento de estas políticas y de la normatividad legal vigente: Ley 1581 de octubre 17 de 2012 y decretos reglamentarios 1377 de 2013 y 1081 de 2015, el (la) empleador(a) guardará estricta reserva y confidencialidad sobre la información del (de la) trabajador(a), por lo tanto, queda autorizado el (la) empleador(a) de manera expresa e inequívoca para mantener y manejar dicha información."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Décima séptima. Modificaciones. "),
          paragraph.PARAGRAFO(
            "Cualquier modificación al presente contrato debe efectuarse por escrito y anexarse a este documento"
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("Décima octava. Efectos. "),
          paragraph.PARAGRAFO(
            "El presente contrato reemplaza en su integridad y deja sin efecto cualquier otro contrato, verbal o escrito, celebrado entre las partes con anterioridad, pudiendo las partes convenir por escrito modificaciones al mismo, las que formarán parte integrante de este."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO("Se firma por las partes en la ciudad de "),
          paragraph.PARAGRAFO(workCity),
          paragraph.PARAGRAFO(" en la fecha de "),
          paragraph.PARAGRAFO(dia),
          paragraph.PARAGRAFO("/"),
          paragraph.PARAGRAFO(mes),
          paragraph.PARAGRAFO("/"),
          paragraph.PARAGRAFO(año),
        ],
        spacing: {
          after: 300,
        },
      }),

      paragraph.SUBTITULO_IZQ_STRONG("______________________", 100),
      paragraph.SUBTITULO_IZQ_STRONG("El (La) empleador(a) ", 0),
      paragraph.SUBTITULO_IZQ_STRONG(nameCompany, 0),
      paragraph.SUBTITULO_IZQ_STRONG(companyId, 0),
      paragraph.SUBTITULO_IZQ_STRONG(companyAddress, 0),
      paragraph.SUBTITULO_IZQ_STRONG(companyPhone, 300),

      paragraph.SUBTITULO_IZQ_STRONG("______________________", 100),
      paragraph.SUBTITULO_IZQ_STRONG("El (La) Trabajador(a) ", 0),
      paragraph.SUBTITULO_IZQ_STRONG(employee, 0),
      paragraph.SUBTITULO_IZQ_STRONG(typeId, 0),
      paragraph.SUBTITULO_IZQ_STRONG(id, 0),
      paragraph.SUBTITULO_IZQ_STRONG(employeeAddress, 0),
      paragraph.SUBTITULO_IZQ_STRONG(employeePhone, 0),
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
  generateContratoTTI,
  findByUser,
};

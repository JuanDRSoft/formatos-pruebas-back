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

async function contratoObra(req, res) {
  const doc = new Document();
  const now = new Date(Date.now());
  const dia = now.getDate();
  const mes = now.getMonth() + 1;
  const año = now.getFullYear();
  const {
    nameCompany,
    representative,
    employee,
    employeeId,
    employeeAddress,
    employeePhone,
    work,
    salary,
    buildName,
    buildAddress,
    workDescription,
    testDays,
    salaryDay,
    city,
    companyId,
  } = req;

  doc.addSection({
    properties: {},
    children: [
      paragraph.TITULO("CONTRATO DE OBRA PARA CONSTRUCCIÓN", 200),

      paragraph.ITEM_RESALTADO(
        "Nombre de la empresa constructora:  ",
        nameCompany,
        100
      ),
      paragraph.ITEM_RESALTADO("Representante legal:  ", representative, 100),
      paragraph.ITEM_RESALTADO("Nombre del obrero(a):  ", employee, 100),
      paragraph.ITEM_RESALTADO(
        "Identificado(a) con cédula No.:  ",
        employeeId,
        100
      ),
      paragraph.ITEM_RESALTADO("Lugar de residencia:  ", employeeAddress, 100),
      paragraph.ITEM_RESALTADO("Teléfonos No:  ", employeePhone, 100),
      paragraph.ITEM_RESALTADO("Cargo a desempeñar:  ", work, 100),
      paragraph.ITEM_RESALTADO(
        "Salario (o valor total por la obra):  ",
        salary,
        300
      ),

      paragraph.PARAGRAFO_ONLY(
        "Entre la empresa constructora y el obrero(a), identificados como ya se anotó, se suscribe el presente CONTRATO DE OBRA PARA CONSTRUCCIÓN, regido por las siguientes cláusulas:",
        300
      ),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("PRIMERA: Lugar. "),
          paragraph.PARAGRAFO(
            "El obrero(a) desarrollará sus funciones en la obra denominada "
          ),
          paragraph.PARAGRAFO(buildName),
          paragraph.PARAGRAFO(" ubicada en "),
          paragraph.PARAGRAFO(buildAddress),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("SEGUNDA: Funciones. "),
          paragraph.PARAGRAFO(
            "La empresa constructora contrata al obrero(a) para desempeñarse como "
          ),
          paragraph.PARAGRAFO(work),
          paragraph.PARAGRAFO(" ejecutando labores como: "),
          paragraph.PARAGRAFO(workDescription),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("TERCERA: Elementos de trabajo. "),
          paragraph.PARAGRAFO(
            "Corresponde a la empresa constructora suministrar los elementos necesarios para el normal desempeño de las funciones del obrero contratado. "
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("CUARTA: Obligaciones del contratado. "),
          paragraph.PARAGRAFO(
            "El obrero(a), por su parte, prestará su fuerza laboral cumpliendo debidamente el (reglamento interno de trabajo, higiene y de seguridad), cumpliendo las órdenes e instrucciones que le imparta la empresa constructora o sus representantes, al igual que no laborar por cuenta propia o a otro empleador en el mismo oficio mientras esté vigente este contrato."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("QUINTA: Término del contrato. "),
          paragraph.PARAGRAFO(
            "El presente contrato durará hasta cuando finalice la obra de "
          ),
          paragraph.PARAGRAFO(buildName),
          paragraph.PARAGRAFO(
            ", pero podrá darse por terminado por cualquiera de las partes cumpliendo con las exigencias legales al respecto."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("SEXTA: Período de prueba. "),
          paragraph.PARAGRAFO(
            "Acuerdan las partes fijar como período de prueba los primeros "
          ),
          paragraph.PARAGRAFO(testDays),
          paragraph.PARAGRAFO(" días de labores."),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("SÉPTIMA: Justas causas para despedir. "),
          paragraph.PARAGRAFO(
            "Son justas causas para dar por terminado unilateralmente el presente contrato por cualquiera de las partes el incumplimiento a las obligaciones y prohibiciones que se expresan en los artículos 57 y siguientes del Código Sustantivo del Trabajo. Además del incumplimiento o violación a las normas establecidas en el (reglamento interno de trabajo, higiene y de seguridad) y las previamente establecidas por la empresa constructora o sus representantes."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("OCTAVA: Salario. "),
          paragraph.PARAGRAFO(
            "La empresa constructora cancelará al obrero(a) un salario mensual de "
          ),
          paragraph.PARAGRAFO(salary),
          paragraph.PARAGRAFO(", pagaderos en el lugar de trabajo, el día "),
          paragraph.PARAGRAFO(salaryDay),
          paragraph.PARAGRAFO(
            " de cada mes. Dentro de este pago se encuentra incluida la remuneración de los descansos dominicales y festivos de que tratan los capítulos I y II del título VII del Código Sustantivo del Trabajo."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO(
            "NOVENA: Trabajo extra, en dominicales y festivos. "
          ),
          paragraph.PARAGRAFO(
            "El trabajo suplementario o en horas extras, así como el trabajo en domingo o festivo que correspondan a descanso, al igual que los nocturnos, será remunerado conforme al Código Sustantivo del Trabajo. Es de advertir que dicho trabajo debe ser autorizado u ordenado por la empresa constructora para efectos de su reconocimiento. Cuando se presenten situaciones urgentes o inesperadas que requieran de este trabajo suplementario se deberá ejecutar la labor y se dará cuenta de ello por escrito, en el menor tiempo posible, al jefe inmediato; de lo contrario, las horas laboradas de manera suplementaria que no se autorizaron o no se notificaron no serán reconocidas."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("DÉCIMA: Horario. "),
          paragraph.PARAGRAFO(
            "El obrero se obliga a laborar la jornada ordinaria en los turnos y dentro de las horas señaladas por la empresa constructora, pudiendo hacer ésta ajustes o cambios cuando lo estime conveniente. Por el acuerdo expreso o tácito de las partes, podrán repartirse las horas de jornada ordinaria de la forma prevista en el artículo 164 del Código Sustantivo del Trabajo, modificado por el artículo 23 de la Ley 50 de 1990, teniendo en cuenta que los tiempos de descanso entre las secciones de la jornada no se computan dentro de la misma, según el artículo 167 ibídem."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO(
            "DÉCIMA PRIMERA: Afiliación y pago a seguridad social. "
          ),
          paragraph.PARAGRAFO(
            "Es obligación de la empresa constructora afiliar al obrero(a) a la seguridad social en salud, pensión y riesgos laborales. A su vez, el obrero debe autorizar el descuento en su salario de los valores que le corresponda aportar, en la proporción establecida por la ley."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO(
            "DÉCIMA SEGUNDA: Nueva obra o cambio del término del contrato. "
          ),
          paragraph.PARAGRAFO(
            "Si al finalizar la obra contratada la empresa constructora desea continuar con el obrero en otra obra distinta a la aquí contratada o vincularlo mediante un período fijo o término indefinido, se deberá hacer un nuevo contrato de trabajo y no se entenderá como prorroga por desaparecer las causas contractuales que dieron origen a este contrato."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("DÉCIMA TERCERA: Modificaciones. "),
          paragraph.PARAGRAFO(
            "Cualquier modificación al presente contrato debe efectuarse por escrito y anexarse a este documento."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.TEXTO_RESALTADO("DÉCIMA CUARTA: Efectos. "),
          paragraph.PARAGRAFO(
            "El presente contrato reemplaza y deja sin efecto cualquier otro contrato verbal o escrito que se hubiera celebrado entre las partes con anterioridad."
          ),
        ],
        spacing: {
          after: 300,
        },
      }),

      new Paragraph({
        children: [
          paragraph.PARAGRAFO("Se firma por las partes, en la ciudad de "),
          paragraph.PARAGRAFO(city),
          paragraph.PARAGRAFO(" el día "),
          paragraph.PARAGRAFO(dia),
          paragraph.PARAGRAFO(" del mes "),
          paragraph.PARAGRAFO(mes),
          paragraph.PARAGRAFO(" de "),
          paragraph.PARAGRAFO(año),
        ],
        spacing: {
          after: 500,
        },
      }),

      paragraph.SUBTITULO_IZQ_STRONG("________________________________", 0),
      paragraph.SUBTITULO_IZQ_STRONG("LA EMPRESA CONSTRUCTORA", 100),
      paragraph.ITEM_RESALTADO("NIT. ", companyId, 300),

      paragraph.SUBTITULO_IZQ_STRONG("________________________________", 0),
      paragraph.SUBTITULO_IZQ_STRONG("OBRERO(A)", 100),
      paragraph.ITEM_RESALTADO("C.C. ", employeeId, 0),
    ],
  });

  const b64string = await Packer.toBase64String(doc);

  res.setHeader("Content-Disposition", "attachment; filename=My Document.docx");
  res.send(Buffer.from(b64string, "base64"));
}

module.exports = { contratoObra };

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const CALENDARIO_2026 = {
  1: {
    "1": "FERIADO",
    "2": "RECESSO ESCOLAR",
    ...Object.fromEntries(Array.from({length: 27}, (_, i) => [String(i + 5), "FÉRIAS ESCOLARES"]))
  },
  2: {
    "1": "FÉRIAS ESCOLARES",
    "2": "FÉRIAS ESCOLARES",
    "3": "FÉRIAS ESCOLARES",
    "4": "JORNADA PEDAGÓGICA",
    "5": "JORNADA PEDAGÓGICA",
    "6": "JORNADA PEDAGÓGICA",
    "16": "RECESSO ESCOLAR",
    "17": "FERIADO",
    "18": "RECESSO ESCOLAR"
  },
  3: {},
  4: {
    "2": "RECESSO ESCOLAR",
    "3": "FERIADO",
    "13": "FERIADO",
    "20": "RECESSO ESCOLAR",
    "21": "FERIADO"
  },
  5: {
    "1": "FERIADO",
    "15": "CONSELHO DE CLASSE"
  },
  6: {
    "4": "FERIADO",
    "5": "RECESSO ESCOLAR",
    "12": "FERIADO"
  },
  7: Object.fromEntries(Array.from({length: 5}, (_, i) => [String(i + 13), "RECESSO ESCOLAR"])),
  8: {
    "22": "FERIADO",
    "31": "CONSELHO DE CLASSE"
  },
  9: {
    "7": "FERIADO"
  },
  10: {
    "12": "FERIADO",
    "15": "FERIADO"
  },
  11: {
    "2": "FERIADO",
    "15": "FERIADO",
    "20": "FERIADO"
  },
  12: {
    "18": "CONSELHO DE CLASSE",
    "21": "RECUPERAÇÃO FINAL",
    "22": "RECUPERAÇÃO FINAL",
    "23": "CONSELHO CLASSE FINAL",
    "24": "RECESSO ESCOLAR",
    "25": "FERIADO",
    ...Object.fromEntries(Array.from({length: 4}, (_, i) => [String(i + 28), "RECESSO ESCOLAR"]))
  }
};

const ESTAGIARIOS_DB = {
  "CARINA LIEVORE NATALLI": {
    ies: "UNIUBE",
    horario: "06:40 ÀS 11:40",
    unidade: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
    obs: "No período de 13/07 a 17/07, conforme orientação da Secretaria Municipal de Educação, os ESTAGIÁRIOS usufruirão de Recesso Escolar.",
    blockStart: "",
    blockEnd: ""
  },
  "SUIANY HERBST DE SOUZA": {
    ies: "MULTIVIX",
    horario: "12:00 ÀS 18:00",
    unidade: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
    obs: "No período de 13/07 a 17/07, conforme orientação da Secretaria Municipal de Educação, os ESTAGIÁRIOS usufruirão de Recesso Escolar.",
    blockStart: "",
    blockEnd: ""
  },
  "RAYKA VIEIRA BARBOSA": {
    ies: "UNESC",
    horario: "06:30 ÀS 12:30",
    unidade: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
    obs: "No período de 13/07 a 17/07, conforme orientação da Secretaria Municipal de Educação, os ESTAGIÁRIOS usufruirão de Recesso Escolar.",
    blockStart: "",
    blockEnd: ""
  },
  "UELTON DA SILVA LUZ": {
    ies: "CASTELO BRANCO",
    horario: "12:00 ÀS 18:00",
    unidade: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
    obs: "No período de 13/07 a 17/07, conforme orientação da Secretaria Municipal de Educação, os ESTAGIÁRIOS usufruirão de Recesso Escolar.",
    blockStart: "",
    blockEnd: ""
  },
  "VANDERLENI CHAGA": {
    ies: "UNINTER",
    horario: "06:30 ÀS 12:30",
    unidade: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
    obs: "No período de 13/07 a 17/07, conforme orientação da Secretaria Municipal de Educação, os ESTAGIÁRIOS usufruirão de Recesso Escolar.",
    blockStart: "",
    blockEnd: ""
  },
  "ENIELY DE OLIVEIRA MARTINS CALZI": {
    ies: "IGUAÇU MG",
    horario: "06:30 ÀS 12:30",
    unidade: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
    obs: "No período de 13/07 a 17/07, conforme orientação da Secretaria Municipal de Educação, os ESTAGIÁRIOS usufruirão de Recesso Escolar.",
    blockStart: "",
    blockEnd: ""
  },
  "LORENA DE MOURA DA MATA": {
    ies: "BOOK PLAY",
    horario: "12:00 ÀS 18:00",
    unidade: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
    obs: "No período de 13/07 a 17/07, conforme orientação da Secretaria Municipal de Educação, os ESTAGIÁRIOS usufruirão de Recesso Escolar.",
    blockStart: "",
    blockEnd: ""
  },
  "MATHEUS SCHUTLTZ CREMASCO": {
    ies: "UNESC",
    horario: "13:00 ÀS 18:00",
    unidade: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
    obs: "No período de 13/07 a 17/07, conforme orientação da Secretaria Municipal de Educação, os ESTAGIÁRIOS usufruirão de Recesso Escolar. O estagiário iniciou na Unidade Escolar em 20/07/2026.",
    blockStart: "1",
    blockEnd: "19"
  },
  "LUCIANA BERNARDO LOPES": {
    ies: "UNINTER",
    horario: "06:30 ÀS 12:30",
    unidade: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
    obs: "No período de 13/07 a 17/07, conforme orientação da Secretaria Municipal de Educação, os ESTAGIÁRIOS usufruirão de Recesso Escolar. A estagiária iniciou na Unidade Escolar em 27/07/2026.",
    blockStart: "1",
    blockEnd: "26"
  }
};

// Estado da Aplicação
const state = {
  nome: "",
  matricula: "",
  funcao: "",
  horario: "",
  instituicao: "",
  unidadeEscolar: "EMEIEF “PROFª MATILDE GUERRA COMÉRIO”",
  hasAlmoco: true,
  isEstagiario: false,
  mes: 2, // Fevereiro padrão
  ano: 2026,
  especiais: {}, // mapeia dia (string) -> tipo ("FERIADO" ou "RECESSO")
  blockStart: null,
  blockEnd: null,
  obs: "",
  // Cache de imagens em base64 para o PDF
  logoLeftBase64: null,
  logoRightBase64: null
};

// Inicialização do APP
document.addEventListener("DOMContentLoaded", () => {
  initDOM();
  updateDefaultSpecialDays();
  initEvents();
  preloadLogos();
  renderPreview();
});

function updateDefaultSpecialDays() {
  if (state.ano === 2026 && CALENDARIO_2026[state.mes]) {
    state.especiais = { ...CALENDARIO_2026[state.mes] };
  } else {
    state.especiais = {};
  }
  renderFeriadosBadges();
}

// Pré-carrega as imagens do cabeçalho em base64 para evitar problemas assíncronos no PDF
async function preloadLogos() {
  try {
    state.logoLeftBase64 = await getBase64Image("assets/image1_1.jpeg");
  } catch (e) {
    console.warn("Logo esquerda não encontrada, gerando sem imagem no PDF.");
  }
  
  try {
    state.logoRightBase64 = await getBase64Image("assets/logo_matilde.png");
  } catch (e) {
    console.warn("Logo direita não encontrada, gerando sem imagem no PDF.");
  }
}

// Utilitário para converter imagem em Base64 usando Canvas
function getBase64Image(imgUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
    img.onerror = (e) => reject(e);
  });
}

// Vincula elementos do DOM ao estado inicial
function initDOM() {
  document.getElementById("input-unidade").value = state.unidadeEscolar;
  document.getElementById("input-nome").value = state.nome;
  document.getElementById("input-matricula").value = state.matricula;
  document.getElementById("input-funcao").value = state.funcao;
  document.getElementById("input-instituicao").value = state.instituicao;
  document.getElementById("input-horario").value = state.horario;
  document.getElementById("checkbox-almoco").checked = state.hasAlmoco;
  document.getElementById("checkbox-estagiario").checked = state.isEstagiario;
  document.getElementById("select-mes").value = state.mes;
  document.getElementById("input-ano").value = state.ano;
  document.getElementById("input-blk-start").value = "";
  document.getElementById("input-blk-end").value = "";
  document.getElementById("input-obs").value = state.obs;
}

// Configura os escutadores de eventos do formulário
function initEvents() {
  // Mobile Nav Buttons Toggle
  const btnShowForm = document.getElementById("btn-show-form");
  const btnShowPreview = document.getElementById("btn-show-preview");
  const controlPanel = document.getElementById("control-panel");
  const previewPanel = document.querySelector(".preview-panel");

  if (btnShowForm && btnShowPreview) {
    btnShowForm.addEventListener("click", () => {
      btnShowForm.classList.add("active");
      btnShowPreview.classList.remove("active");
      controlPanel.classList.remove("hidden");
      previewPanel.classList.remove("active");
    });

    btnShowPreview.addEventListener("click", () => {
      btnShowPreview.classList.add("active");
      btnShowForm.classList.remove("active");
      controlPanel.classList.add("hidden");
      previewPanel.classList.add("active");
      // Atualiza a escala da folha agora que o painel está visível
      setTimeout(updateSheetScale, 50);
    });
  }

  // Inputs de texto simples
  document.getElementById("input-unidade").addEventListener("input", (e) => {
    state.unidadeEscolar = e.target.value;
    renderPreview();
  });
  document.getElementById("input-nome").addEventListener("input", (e) => {
    const val = e.target.value.trim().toUpperCase();
    state.nome = e.target.value;
    
    if (val in ESTAGIARIOS_DB) {
      const data = ESTAGIARIOS_DB[val];
      
      const checkEst = document.getElementById("checkbox-estagiario");
      if (checkEst && !checkEst.checked) {
        checkEst.checked = true;
        checkEst.dispatchEvent(new Event('change'));
      }
      
      state.instituicao = data.ies;
      state.horario = data.horario;
      state.unidadeEscolar = data.unidade;
      state.obs = data.obs;
      state.blockStart = data.blockStart ? parseInt(data.blockStart) : null;
      state.blockEnd = data.blockEnd ? parseInt(data.blockEnd) : null;
      
      document.getElementById("input-instituicao").value = data.ies;
      document.getElementById("input-horario").value = data.horario;
      document.getElementById("input-unidade").value = data.unidade;
      document.getElementById("input-obs").value = data.obs;
      document.getElementById("input-blk-start").value = data.blockStart || "";
      document.getElementById("input-blk-end").value = data.blockEnd || "";
    }
    renderPreview();
  });
  document.getElementById("input-matricula").addEventListener("input", (e) => {
    state.matricula = e.target.value;
    renderPreview();
  });
  document.getElementById("input-funcao").addEventListener("input", (e) => {
    state.funcao = e.target.value;
    renderPreview();
  });
  document.getElementById("input-instituicao").addEventListener("input", (e) => {
    state.instituicao = e.target.value;
    renderPreview();
  });
  document.getElementById("input-horario").addEventListener("input", (e) => {
    state.horario = e.target.value;
    renderPreview();
  });

  // Toggles de checkbox
  document.getElementById("checkbox-almoco").addEventListener("change", (e) => {
    state.hasAlmoco = e.target.checked;
    renderPreview();
  });

  document.getElementById("checkbox-estagiario").addEventListener("change", (e) => {
    state.isEstagiario = e.target.checked;
    
    // Altera visibilidade dos campos específicos
    const groupAlmoco = document.getElementById("group-almoco");
    const groupFuncao = document.getElementById("group-funcao");
    const groupInstituicao = document.getElementById("group-instituicao");
    const paperSheet = document.getElementById("paper-sheet");

    if (state.isEstagiario) {
      groupAlmoco.style.display = "none";
      groupFuncao.style.display = "none";
      groupInstituicao.style.display = "flex";
      paperSheet.className = "paper-sheet portrait";
    } else {
      groupAlmoco.style.display = "block";
      groupFuncao.style.display = "flex";
      groupInstituicao.style.display = "none";
      paperSheet.className = "paper-sheet landscape";
    }
    
    renderPreview();
    updateSheetScale();
  });

  // Período
  document.getElementById("select-mes").addEventListener("change", (e) => {
    state.mes = parseInt(e.target.value);
    updateDefaultSpecialDays();
    renderPreview();
  });
  document.getElementById("input-ano").addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      state.ano = val;
      updateDefaultSpecialDays();
      renderPreview();
    }
  });

  // Abas de Configuração
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
      
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // Feriados/Recessos
  document.getElementById("btn-add-feriado").addEventListener("click", () => {
    const diaInput = document.getElementById("input-dia-feriado");
    const tipoInput = document.getElementById("input-tipo-feriado");
    const checkTracos = document.getElementById("checkbox-feriado-tracos");
    const dia = diaInput.value.trim();
    let tipo = (tipoInput.value.trim() || "FERIADO").toUpperCase();
    
    const numDays = new Date(state.ano, state.mes, 0).getDate();
    const diaInt = parseInt(dia);

    if (!dia || isNaN(diaInt) || diaInt < 1 || diaInt > numDays) {
      alert(`Insira um dia válido para este mês (1 a ${numDays}).`);
      return;
    }

    if (checkTracos && checkTracos.checked) {
      tipo = tipo + "|DASH";
    }

    state.especiais[dia] = tipo;
    diaInput.value = "";
    tipoInput.value = "";
    if (checkTracos) checkTracos.checked = false;
    
    renderFeriadosBadges();
    renderPreview();
  });

  document.getElementById("btn-clear-feriados").addEventListener("click", () => {
    state.especiais = {};
    renderFeriadosBadges();
    renderPreview();
  });

  // Bloqueio de datas
  document.getElementById("input-blk-start").addEventListener("input", (e) => {
    const val = parseInt(e.target.value.trim());
    state.blockStart = isNaN(val) ? null : val;
    renderPreview();
  });

  document.getElementById("input-blk-end").addEventListener("input", (e) => {
    const val = parseInt(e.target.value.trim());
    state.blockEnd = isNaN(val) ? null : val;
    renderPreview();
  });

  // Observações
  document.getElementById("input-obs").addEventListener("input", (e) => {
    state.obs = e.target.value;
    renderPreview();
  });

  // Botão de PDF
  document.getElementById("btn-gerar-pdf").addEventListener("click", generatePDF);

  // Escuta o redimensionamento da janela para ajustar o zoom do preview
  window.addEventListener("resize", updateSheetScale);
}

// Desenha a lista de feriados na aba de controle
function renderFeriadosBadges() {
  const container = document.getElementById("feriados-list");
  container.innerHTML = "";

  const sortedDays = Object.keys(state.especiais).sort((a, b) => parseInt(a) - parseInt(b));
  
  sortedDays.forEach(dia => {
    const tipo = state.especiais[dia];
    const displayTipo = tipo.replace("|DASH", " (com traços)");
    
    const li = document.createElement("li");
    li.className = "badge";
    li.innerHTML = `Dia ${dia} (${displayTipo}) <button type="button" class="remove-btn" onclick="removeFeriado('${dia}')">&times;</button>`;
    container.appendChild(li);
  });
}

// Função global para remover feriado ao clicar no badge
window.removeFeriado = function(dia) {
  delete state.especiais[dia];
  renderFeriadosBadges();
  renderPreview();
};

// Calcula a escala da folha de ponto no preview lateral
function updateSheetScale() {
  const viewport = document.getElementById("paper-viewport");
  const scaler = document.getElementById("sheet-scaler");
  const sheet = document.getElementById("paper-sheet");
  if (!viewport || !scaler || !sheet) return;

  sheet.style.transform = "none";
  
  const isPortrait = sheet.classList.contains("portrait");
  // Dimensões A4 em pixels (A4 a 96dpi)
  const sheetW = isPortrait ? 794 : 1123;
  const sheetH = isPortrait ? 1123 : 794;
  const padding = 20; // Margem interna do painel (combina com CSS)
  const availableW = viewport.clientWidth - padding;
  
  const scale = Math.min(1, availableW / sheetW);
  
  // Define o tamanho exato do scaler com base na escala
  scaler.style.width = `${sheetW * scale}px`;
  scaler.style.height = `${sheetH * scale}px`;

  // Escala a folha real a partir do canto superior esquerdo (top left)
  sheet.style.transform = `scale(${scale})`;
  sheet.style.transformOrigin = "top left";
  
  // Após redimensionar/escalar, as posições dos elementos mudaram, então redesenha a linha de bloqueio
  setTimeout(drawBlockoutLine, 100);
}

// Desenha a linha de bloqueio tracejada na visualização HTML
function drawBlockoutLine() {
  const existingSvg = document.getElementById("blockout-svg-preview");
  if (existingSvg) existingSvg.remove();

  if (!state.blockStart || !state.blockEnd) return;

  const numDays = new Date(state.ano, state.mes, 0).getDate();
  if (state.blockStart < 1 || state.blockEnd > numDays || state.blockStart > state.blockEnd) return;

  const table = document.getElementById("sheet-table");
  const scaler = document.getElementById("sheet-scaler");
  if (!table || !scaler) return;

  const startRowIndex = state.isEstagiario ? state.blockStart + 1 : state.blockStart;
  const endRowIndex = state.isEstagiario ? state.blockEnd + 1 : state.blockEnd;

  const startRow = table.rows[startRowIndex];
  const endRow = table.rows[endRowIndex];
  if (!startRow || !endRow) return;

  // No servidor comum, bloqueamos das colunas de horário até a última assinatura (colunas 1 a 8)
  // No estagiário, bloqueamos das colunas de horário até a assinatura (colunas 1 a 3)
  const startColIndex = 1;
  const endColIndex = state.isEstagiario ? 3 : 8;

  const startCell = startRow.cells[startColIndex];
  const endCell = endRow.cells[endColIndex];
  if (!startCell || !endCell) return;

  const scalerRect = scaler.getBoundingClientRect();
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  // Calcula coordenadas relativas ao Scaler (que não sofre transform: scale)
  const x1 = startRect.left - scalerRect.left;
  const y1 = startRect.top - scalerRect.top;
  const x2 = endRect.right - scalerRect.left;
  const y2 = endRect.bottom - scalerRect.top;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = "blockout-svg-preview";
  svg.setAttribute("class", "blockout-svg");
  svg.innerHTML = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="blockout-line" />`;
  
  scaler.appendChild(svg);
}

function parseInternSchedule(horarioStr) {
  if (!horarioStr) return ["", ""];
  const s = horarioStr.trim().toLowerCase();
  const regex = /(\d{1,2})(?:[h:](\d{2})?|h)?/g;
  const times = [];
  let match;
  while ((match = regex.exec(s)) !== null) {
    const h = parseInt(match[1]);
    const m = match[2] ? parseInt(match[2]) : 0;
    if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
      times.push(`${h}:${String(m).padStart(2, '0')}`);
    }
  }
  if (times.length >= 2) {
    return [times[0], times[1]];
  }
  return ["", ""];
}

// Renderiza a folha de ponto interativa no preview (HTML)
function renderPreview() {
  const numDays = new Date(state.ano, state.mes, 0).getDate();
  const mesNome = MESES[state.mes - 1];

  // 1. Atualizar Título e Subtítulos
  const titleMain = document.getElementById("sheet-title-main");
  const subtitle = document.getElementById("sheet-subtitle");
  
  if (state.isEstagiario) {
    titleMain.innerHTML = `<b>ESTADO DO ESPÍRITO SANTO</b><br>PREFEITURA MUNICIPAL DE COLATINA<br><b>Secretaria Municipal de Educação</b><br><small style="font-size:7pt; font-family: var(--font-sheet); font-weight: normal;">Rua Melvin Jones, 50 – Esplanada – Colatina – ES – 29.702.110  - Tel: 3177-7064</small>`;
    subtitle.innerHTML = `
      <div style="font-size: 14pt; font-weight: bold; font-family: var(--font-sheet); text-decoration: none; line-height: 1.3;">ESTÁGIO DE COMPLEMENTAÇÃO EDUCACIONAL</div>
      <div style="font-size: 14pt; font-weight: bold; font-family: var(--font-sheet); text-decoration: none; line-height: 1.3;">CONTROLE DE FREQUÊNCIA – Mês: ${mesNome.toUpperCase()} / ${state.ano}</div>
    `;
    
    document.querySelector(".logo-right").style.visibility = "hidden";
    
    const subEscola = document.getElementById("sheet-sub-escola");
    if (subEscola) subEscola.remove();
  } else {
    titleMain.innerHTML = state.unidadeEscolar.toUpperCase() || "EMEIEF PROFESSORA MATILDE GUERRA COMÉRIO";
    subtitle.innerHTML = `FICHA DE PONTO DIÁRIO`;
    
    document.querySelector(".logo-right").style.visibility = "visible";
    
    const subEscola = document.getElementById("sheet-sub-escola");
    if (subEscola) subEscola.remove();
  }

  // 2. Desenhar Info Box
  const infoBox = document.getElementById("sheet-info-box");
  infoBox.innerHTML = "";

  const nomeUpper = state.nome.toUpperCase();
  const mesAnoFormatted = `${mesNome} de ${state.ano}`;

  if (state.isEstagiario) {
    // Estagiário Layout (sem bordas, alinhamento conforme docx)
    infoBox.style.border = "none";
    infoBox.innerHTML = `
      <div style="padding: 4px 0; font-size: 14pt; text-align: center; font-weight: bold; font-family: var(--font-sheet);">
        Unidade Escolar: ${state.unidadeEscolar.toUpperCase() || "&nbsp;"}
      </div>
      <div style="padding: 4px 0; font-size: 16pt; text-align: center; font-weight: bold; font-family: var(--font-sheet);">
        Estagiário: ${nomeUpper || "&nbsp;"}
      </div>
      <div style="padding: 4px 0; font-size: 16pt; text-align: center; font-weight: bold; font-family: var(--font-sheet);">
        Instituição de Ensino Superior: ${state.instituicao.toUpperCase() || "&nbsp;"}
      </div>
    `;
  } else {
    // Standard Servidora Layout
    infoBox.style.border = "0.8pt solid #000";
    infoBox.innerHTML = `
      <div class="info-row">
        <div class="info-col info-col-48"><strong>Servidora:</strong> ${nomeUpper || "&nbsp;"}</div>
        <div class="info-col info-col-20"><strong>Matrícula:</strong> ${state.matricula || "&nbsp;"}</div>
        <div class="info-col info-col-32"><strong>Função:</strong> ${state.funcao.toUpperCase() || "&nbsp;"}</div>
      </div>
      <div class="info-row">
        <div class="info-col info-col-full"><strong>Horário de Trabalho:</strong> ${state.horario || "&nbsp;"}</div>
      </div>
      <div class="info-row">
        <div class="info-col info-col-full">Mês de <strong>${mesAnoFormatted}</strong></div>
      </div>
    `;
  }

  // 3. Desenhar a Tabela de Ponto
  const table = document.getElementById("sheet-table");
  table.innerHTML = "";

  const dashLine = "---------------";

  if (state.isEstagiario) {
    // Tabela Estagiário
    // Headers (1 linha)
    const trHead = document.createElement("tr");
    trHead.innerHTML = `
      <th class="col-est-dia">Dia</th>
      <th class="col-est-hora-ent">Entrada</th>
      <th class="col-est-hora-sai">Saída</th>
      <th class="col-est-assn">Assinatura</th>
    `;
    table.appendChild(trHead);

    const [entTime, saiTime] = parseInternSchedule(state.horario);

    // Linhas dos dias
    for (let day = 1; day <= numDays; day++) {
      const date = new Date(state.ano, state.mes - 1, day);
      const weekday = date.getDay(); // 0 = Domingo, 6 = Sábado
      const dayStr = String(day).padStart(2, "0");
      const tr = document.createElement("tr");
      
      let colEntrada = entTime || "";
      let colSaida = saiTime || "";
      let colAssinatura = "";

      if (String(day) in state.especiais) {
        const val = state.especiais[String(day)].toUpperCase();
        if (val.includes("|DASH")) {
          colEntrada = "-----";
          colSaida = "-----";
          colAssinatura = val.split("|")[0];
        } else {
          colAssinatura = val;
        }
      } else if (weekday === 6) {
        colEntrada = "SÁBADO";
        colSaida = "SÁBADO";
        colAssinatura = "SÁBADO";
      } else if (weekday === 0) {
        colEntrada = "DOMINGO";
        colSaida = "DOMINGO";
        colAssinatura = "DOMINGO";
      }

      tr.innerHTML = `
        <td style="font-weight: bold;">${dayStr}</td>
        <td style="font-weight: bold;">${colEntrada}</td>
        <td style="font-weight: bold;">${colSaida}</td>
        <td style="text-align: center; font-weight: bold;">${colAssinatura}</td>
      `;
      table.appendChild(tr);
    }
  } else {
    // Tabela Servidora Comum (Landscape)
    const trHead = document.createElement("tr");
    trHead.innerHTML = `
      <th class="col-dia">DIA</th>
      <th class="col-hora">HORA de<br>Entrada</th>
      <th class="col-assn">ASSINATURA</th>
      <th class="col-hora">HORA saída<br>almoço</th>
      <th class="col-assn">ASSINATURA</th>
      <th class="col-hora">HORA retorno<br>almoço</th>
      <th class="col-assn">ASSINATURA</th>
      <th class="col-hora">HORA de<br>Saída</th>
      <th class="col-assn">ASSINATURA</th>
    `;
    table.appendChild(trHead);

    for (let day = 1; day <= numDays; day++) {
      const date = new Date(state.ano, state.mes - 1, day);
      const weekday = date.getDay();
      const dayStr = String(day);
      const tr = document.createElement("tr");

      let c1 = "", c2 = "", c3 = "", c4 = "", c5 = "", c6 = "", c7 = "", c8 = "";

      if (String(day) in state.especiais) {
        const desc = state.especiais[String(day)].toUpperCase();
        c1 = dashLine; c2 = desc; c3 = dashLine; c4 = desc; c5 = dashLine; c6 = desc; c7 = dashLine; c8 = desc;
      } else if (weekday === 6) {
        c1 = dashLine; c2 = "SÁBADO"; c3 = dashLine; c4 = "SÁBADO"; c5 = dashLine; c6 = "SÁBADO"; c7 = dashLine; c8 = "SÁBADO";
      } else if (weekday === 0) {
        c1 = dashLine; c2 = "DOMINGO"; c3 = dashLine; c4 = "DOMINGO"; c5 = dashLine; c6 = "DOMINGO"; c7 = dashLine; c8 = "DOMINGO";
      } else if (!state.hasAlmoco) {
        // Sem horário de almoço
        c3 = dashLine; c4 = dashLine; c5 = dashLine; c6 = dashLine;
      }

      tr.innerHTML = `
        <td style="font-weight: bold;">${dayStr}</td>
        <td>${c1}</td>
        <td>${c2}</td>
        <td>${c3}</td>
        <td>${c4}</td>
        <td>${c5}</td>
        <td>${c6}</td>
        <td>${c7}</td>
        <td>${c8}</td>
      `;
      table.appendChild(tr);
    }
  }

  // 4. Linha de Observação
  const obsContainer = document.getElementById("sheet-obs-container");
  if (state.isEstagiario) {
    if (obsContainer) {
      obsContainer.innerHTML = `<span style="font-family: Calibri, Arial, sans-serif; font-size: 9pt; font-weight: bold;">OBS:</span> <span style="font-family: Calibri, Arial, sans-serif; font-size: 10pt; font-weight: normal; margin-left: 4px;">${state.obs}</span>`;
    }
  } else {
    if (obsContainer) {
      obsContainer.innerHTML = "";
    }
    const trObs = document.createElement("tr");
    trObs.innerHTML = `
      <td colspan="9" class="obs-cell">
        <strong>Obs.:</strong> ${state.obs}
      </td>
    `;
    table.appendChild(trObs);
  }

  // Re-ajusta a escala do preview
  updateSheetScale();
}

// Função para gerar o arquivo PDF final utilizando jsPDF e jsPDF-AutoTable
function generatePDF() {
  // Validações
  if (!state.nome) {
    alert("Por favor, preencha o Nome do Servidor.");
    return;
  }
  if (!state.horario) {
    alert("Por favor, preencha o Horário de Trabalho.");
    return;
  }
  if (!state.isEstagiario && !state.funcao) {
    alert("Por favor, preencha a Função da servidora.");
    return;
  }

  const { jsPDF } = window.jspdf;
  
  // Orientação da Página
  const orientation = state.isEstagiario ? "p" : "l";
  const doc = new jsPDF({
    orientation: orientation,
    unit: "pt",
    format: "a4"
  });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  // Margens (1cm = 28.35pt, 0.5cm = 14.17pt, 1.5cm = 42.52pt)
  const leftMargin = state.isEstagiario ? 42.52 : 14.17;
  const rightMargin = state.isEstagiario ? 42.52 : 14.17;
  const topMargin = state.isEstagiario ? 28.35 : 11.34;
  const bottomMargin = state.isEstagiario ? 28.35 : 11.34;

  const usableW = pageW - leftMargin - rightMargin;
  
  // --- 1. CABEÇALHO (Logos e Título) ---
  const logoW = state.isEstagiario ? 56.7 : 45.35; // 2.0cm vs 1.6cm em pt
  const logoH = state.isEstagiario ? 62.36 : 51.02; // 2.2cm vs 1.8cm em pt
  const centerY = topMargin + (logoH / 2);

  // Adiciona logo esquerda se existir no cache
  if (state.logoLeftBase64) {
    doc.addImage(state.logoLeftBase64, "JPEG", leftMargin, topMargin, logoW, logoH);
  }

  // Adiciona logo direita se existir no cache (somente se não for estagiário)
  if (state.logoRightBase64 && !state.isEstagiario) {
    doc.addImage(state.logoRightBase64, "JPEG", pageW - rightMargin - logoW, topMargin, logoW, logoH);
  }

  // Adiciona textos do cabeçalho
  doc.setFont("times", "bold");
  
  if (state.isEstagiario) {
    // Estagiário Header
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    const addressStr = "Rua Melvin Jones, 50 – Esplanada – Colatina – ES – 29.702.110  - Tel: 3177-7064";
    const headerLines = [
      "ESTADO DO ESPÍRITO SANTO",
      "PREFEITURA MUNICIPAL DE COLATINA",
      "Secretaria Municipal de Educação",
      addressStr
    ];
    let currentY = topMargin + 8;
    headerLines.forEach((line, idx) => {
      if (idx === 0 || idx === 2) {
        doc.setFont("times", "bold");
        doc.setFontSize(9);
      } else if (idx === 1) {
        doc.setFont("times", "normal");
        doc.setFontSize(9);
      } else if (idx === 3) {
        doc.setFont("times", "normal");
        doc.setFontSize(7);
      }
      doc.text(line, pageW / 2, currentY, { align: "center" });
      currentY += 11;
    });

    // Subtítulos
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("ESTÁGIO DE COMPLEMENTAÇÃO EDUCACIONAL", pageW / 2, topMargin + 72, { align: "center" });
    doc.text(`CONTROLE DE FREQUÊNCIA – Mês: ${MESES[state.mes - 1].toUpperCase()} / ${state.ano}`, pageW / 2, topMargin + 88, { align: "center" });
  } else {
    // Servidora Landscape Header
    doc.setFontSize(10);
    const schoolName = state.unidadeEscolar || "EMEIEF PROFESSORA MATILDE GUERRA COMÉRIO";
    doc.text(schoolName.toUpperCase(), pageW / 2, centerY - 8, { align: "center" });
    
    doc.setFontSize(10);
    doc.text("FICHA DE PONTO DI\u00c1RIO", pageW / 2, centerY + 12, { align: "center" });
    
    // Linha de sublinhado do subtítulo
    const subWidth = doc.getTextWidth("FICHA DE PONTO DI\u00c1RIO");
    doc.setLineWidth(0.8);
    doc.line((pageW / 2) - (subWidth / 2), centerY + 14, (pageW / 2) + (subWidth / 2), centerY + 14);
  }

  // --- 2. DADOS DO SERVIDOR (Info Box) ---
  const infoBoxY = state.isEstagiario ? topMargin + 105 : topMargin + 65;
  const infoBoxH = state.isEstagiario ? 54 : 34;

  if (!state.isEstagiario) {
    doc.setLineWidth(0.8);
    doc.rect(leftMargin, infoBoxY, usableW, infoBoxH);
  }

  doc.setFont("times", "normal");
  doc.setFontSize(8.5);

  const mesNome = MESES[state.mes - 1];
  const mesAnoFormatted = `${mesNome} de ${state.ano}`;
  const nomeUpper = state.nome.toUpperCase();

  if (state.isEstagiario) {
    const textUnidade = `Unidade Escolar: ${state.unidadeEscolar.toUpperCase() || ""}`;
    const textNome = `Estagiário: ${nomeUpper || ""}`;
    const textIES = `Instituição de Ensino Superior: ${state.instituicao.toUpperCase() || ""}`;
    
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text(textUnidade, pageW / 2, infoBoxY + 12, { align: "center" });
    
    doc.setFontSize(16);
    doc.text(textNome, pageW / 2, infoBoxY + 30, { align: "center" });
    doc.text(textIES, pageW / 2, infoBoxY + 48, { align: "center" });
  } else {
    // Linha 1: Servidora, Matrícula, Função
    const col1W = usableW * 0.48;
    const col2W = usableW * 0.20;
    
    doc.text(`Servidora: ${nomeUpper}`, leftMargin + 6, infoBoxY + 10);
    doc.text(`Matr\u00edcula: ${state.matricula}`, leftMargin + col1W + (col2W / 2), infoBoxY + 10, { align: "center" });
    doc.text(`Fun\u00e7\u00e3o: ${state.funcao.toUpperCase()}`, leftMargin + col1W + col2W + 6, infoBoxY + 10);
    
    // Divisões verticais na linha 1
    doc.line(leftMargin + col1W, infoBoxY, leftMargin + col1W, infoBoxY + 14);
    doc.line(leftMargin + col1W + col2W, infoBoxY, leftMargin + col1W + col2W, infoBoxY + 14);

    // Linha 2: Horário de Trabalho
    doc.line(leftMargin, infoBoxY + 14, pageW - rightMargin, infoBoxY + 14);
    doc.text(`Hor\u00e1rio de Trabalho: ${state.horario}`, leftMargin + 6, infoBoxY + 23);

    // Linha 3: Mês de referência
    doc.line(leftMargin, infoBoxY + 24, pageW - rightMargin, infoBoxY + 24);
    doc.text(`Mês de ${mesAnoFormatted}`, pageW / 2, infoBoxY + 31, { align: "center" });
  }

  // --- 3. TABELA DE FREQUÊNCIA ---
  const numDays = new Date(state.ano, state.mes, 0).getDate();
  const tableData = [];
  
  const dash = "---------------";
  const dashEst = "-----";

  if (state.isEstagiario) {
    const [entTime, saiTime] = parseInternSchedule(state.horario);
    for (let day = 1; day <= numDays; day++) {
      const date = new Date(state.ano, state.mes - 1, day);
      const weekday = date.getDay();
      const dayStr = String(day).padStart(2, "0");
      
      let colEntrada = entTime || "";
      let colSaida = saiTime || "";
      let colAssinatura = "";

      if (String(day) in state.especiais) {
        const val = state.especiais[String(day)].toUpperCase();
        if (val.includes("|DASH")) {
          colEntrada = "-----";
          colSaida = "-----";
          colAssinatura = val.split("|")[0];
        } else {
          colAssinatura = val;
        }
      } else if (weekday === 6) {
        colEntrada = "SÁBADO";
        colSaida = "SÁBADO";
        colAssinatura = "SÁBADO";
      } else if (weekday === 0) {
        colEntrada = "DOMINGO";
        colSaida = "DOMINGO";
        colAssinatura = "DOMINGO";
      }

      tableData.push([dayStr, colEntrada, colSaida, colAssinatura]);
    }
  } else {
    for (let day = 1; day <= numDays; day++) {
      const date = new Date(state.ano, state.mes - 1, day);
      const weekday = date.getDay();
      const dayStr = String(day);
      
      let c1 = "", c2 = "", c3 = "", c4 = "", c5 = "", c6 = "", c7 = "", c8 = "";

      if (String(day) in state.especiais) {
        const desc = state.especiais[String(day)].toUpperCase();
        c1 = dash; c2 = desc; c3 = dash; c4 = desc; c5 = dash; c6 = desc; c7 = dash; c8 = desc;
      } else if (weekday === 6) {
        c1 = dash; c2 = "SÁBADO"; c3 = dash; c4 = "SÁBADO"; c5 = dash; c6 = "SÁBADO"; c7 = dash; c8 = "SÁBADO";
      } else if (weekday === 0) {
        c1 = dash; c2 = "DOMINGO"; c3 = dash; c4 = "DOMINGO"; c5 = dash; c6 = "DOMINGO"; c7 = dash; c8 = "DOMINGO";
      } else if (!state.hasAlmoco) {
        c3 = dash; c4 = dash; c5 = dash; c6 = dash;
      }

      tableData.push([dayStr, c1, c2, c3, c4, c5, c6, c7, c8]);
    }
  }

  // Linha de Observações (apenas para landscape)
  if (!state.isEstagiario) {
    const obsRowData = [`Obs.: ${state.obs}`, "", "", "", "", "", "", "", ""];
    tableData.push(obsRowData);
  }

  const gridStartY = state.isEstagiario ? infoBoxY + infoBoxH + 10 : infoBoxY + infoBoxH + 6;
  const availH = state.isEstagiario ? 520 : 435;
  const headerRowsCount = 1;
  const headerHeight = 20 * headerRowsCount;
  const obsHeight = 20;
  const dayRowHeight = (availH - headerHeight - obsHeight) / numDays;

  let blockStartX = 0, blockStartY = 0, blockEndX = 0, blockEndY = 0;

  doc.autoTable({
    startY: gridStartY,
    margin: { left: leftMargin, right: rightMargin },
    theme: "plain",
    tableWidth: usableW,
    styles: {
      font: "times",
      fontStyle: state.isEstagiario ? "bold" : "normal",
      fontSize: state.isEstagiario ? 12 : 7,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
      halign: "center",
      valign: "middle",
      cellPadding: 1
    },
    headStyles: {
      fontStyle: "bold",
      fontSize: state.isEstagiario ? 16 : 6,
      lineWidth: 0.8,
      lineColor: [0, 0, 0]
    },
    columnStyles: state.isEstagiario ? {
      0: { cellWidth: usableW * 0.12, fontStyle: "bold" },
      1: { cellWidth: usableW * 0.18 },
      2: { cellWidth: usableW * 0.18 },
      3: { cellWidth: usableW * 0.52 }
    } : {
      0: { cellWidth: usableW * 0.03297, fontStyle: "bold" },
      1: { cellWidth: usableW * 0.08791 },
      2: { cellWidth: usableW * 0.15385 },
      3: { cellWidth: usableW * 0.08791 },
      4: { cellWidth: usableW * 0.15385 },
      5: { cellWidth: usableW * 0.08791 },
      6: { cellWidth: usableW * 0.15385 },
      7: { cellWidth: usableW * 0.08791 },
      8: { cellWidth: usableW * 0.15385 }
    },
    head: state.isEstagiario ? [
      ["Dia", "Entrada", "Saída", "Assinatura"]
    ] : [
      [
        "DIA", "HORA de\nEntrada", "ASSINATURA", 
        "HORA saída\nalmoço", "ASSINATURA", 
        "HORA retorno\nalmoço", "ASSINATURA", 
        "HORA de\nSaída", "ASSINATURA"
      ]
    ],
    body: tableData,
    didParseCell: function(data) {
      if (data.row.index < headerRowsCount) {
        data.row.height = 20;
      } else if (!state.isEstagiario && data.row.index === numDays + headerRowsCount) {
        data.row.height = 20;
        if (data.column.index === 0) {
          data.cell.styles.halign = "left";
          data.cell.styles.valign = "top";
          data.cell.styles.cellPadding = { top: 2, left: 6 };
          data.cell.colSpan = 9;
        }
      } else {
        data.row.height = dayRowHeight;
      }
    },
    willDrawCell: function(data) {
      const dayIndex = data.row.index - headerRowsCount + 1;
      
      if (state.blockStart && state.blockEnd && dayIndex >= state.blockStart && dayIndex <= state.blockEnd) {
        const startColIndex = 1;
        const endColIndex = state.isEstagiario ? 3 : 8;

        if (dayIndex === state.blockStart && data.column.index === startColIndex) {
          blockStartX = data.cell.x;
          blockStartY = data.cell.y;
        }
        if (dayIndex === state.blockEnd && data.column.index === endColIndex) {
          blockEndX = data.cell.x + data.cell.width;
          blockEndY = data.cell.y + data.cell.height;
        }
      }
    },
    didDrawPage: function(data) {
      if (state.blockStart && state.blockEnd && blockStartX && blockStartY && blockEndX && blockEndY) {
        doc.saveState();
        doc.setLineDashPattern([4, 4], 0);
        doc.setLineWidth(0.8);
        doc.setDrawColor(0, 0, 0);
        doc.line(blockStartX, blockStartY, blockEndX, blockEndY);
        doc.restoreState();
      }
    }
  });
  
  if (state.isEstagiario) {
    const finalY = doc.lastAutoTable.finalY;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("OBS:", leftMargin, finalY + 15);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(state.obs, leftMargin + 26, finalY + 15);
  }

  const mesString = MESES[state.mes - 1].toLowerCase();
  const nomeSanitizado = state.nome.toLowerCase().replace(/\s+/g, "_");
  const fileName = `livro_ponto_${nomeSanitizado}_${mesString}.pdf`;
  doc.save(fileName);
}

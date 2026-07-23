// Constantes e Configurações
const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Estado da Aplicação
const state = {
  nome: "",
  matricula: "",
  funcao: "",
  horario: "",
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
  initEvents();
  preloadLogos();
  renderPreview();
});

// Pré-carrega as imagens do cabeçalho em base64 para evitar problemas assíncronos no PDF
async function preloadLogos() {
  try {
    state.logoLeftBase64 = await getBase64Image("assets/image1_1.jpeg");
  } catch (e) {
    console.warn("Logo esquerda não encontrada, gerando sem imagem no PDF.");
  }
  
  try {
    state.logoRightBase64 = await getBase64Image("assets/image1_2.jpeg");
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
  document.getElementById("input-nome").value = state.nome;
  document.getElementById("input-matricula").value = state.matricula;
  document.getElementById("input-funcao").value = state.funcao;
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
  // Inputs de texto simples
  document.getElementById("input-nome").addEventListener("input", (e) => {
    state.nome = e.target.value;
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
    const paperSheet = document.getElementById("paper-sheet");

    if (state.isEstagiario) {
      groupAlmoco.style.display = "none";
      groupFuncao.style.display = "none";
      paperSheet.className = "paper-sheet portrait";
    } else {
      groupAlmoco.style.display = "block";
      groupFuncao.style.display = "block";
      paperSheet.className = "paper-sheet landscape";
    }
    
    renderPreview();
    updateSheetScale();
  });

  // Período
  document.getElementById("select-mes").addEventListener("change", (e) => {
    state.mes = parseInt(e.target.value);
    renderPreview();
  });
  document.getElementById("input-ano").addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      state.ano = val;
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
    const tipoSelect = document.getElementById("select-tipo-feriado");
    const dia = diaInput.value.trim();
    const tipo = tipoSelect.value;
    
    const numDays = new Date(state.ano, state.mes, 0).getDate();
    const diaInt = parseInt(dia);

    if (!dia || isNaN(diaInt) || diaInt < 1 || diaInt > numDays) {
      alert(`Insira um dia válido para este mês (1 a ${numDays}).`);
      return;
    }

    state.especiais[dia] = tipo;
    diaInput.value = "";
    
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
    
    const li = document.createElement("li");
    li.className = "badge";
    li.innerHTML = `Dia ${dia} (${tipo}) <button type="button" class="remove-btn" onclick="removeFeriado('${dia}')">&times;</button>`;
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
  const sheet = document.getElementById("paper-sheet");
  if (!viewport || !sheet) return;

  sheet.style.transform = "none";
  
  const isPortrait = sheet.classList.contains("portrait");
  // Dimensões A4 aproximadas em pixels
  const sheetW = isPortrait ? 794 : 1123;
  const padding = 60; // Margem interna do painel de visualização
  const availableW = viewport.clientWidth - padding;
  
  const scale = Math.min(1, availableW / sheetW);
  sheet.style.transform = `scale(${scale})`;
  sheet.style.transformOrigin = "top center";

  // Mantém a altura correta do scroll
  const sheetH = isPortrait ? 1123 : 794;
  viewport.style.minHeight = `${(sheetH * scale) + padding}px`;
  
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
  const wrapper = document.getElementById("sheet-table-wrapper");
  if (!table || !wrapper) return;

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

  const wrapperRect = wrapper.getBoundingClientRect();
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const x1 = startRect.left - wrapperRect.left;
  const y1 = startRect.top - wrapperRect.top;
  const x2 = endRect.right - wrapperRect.left;
  const y2 = endRect.bottom - wrapperRect.top;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = "blockout-svg-preview";
  svg.setAttribute("class", "blockout-svg");
  svg.innerHTML = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="blockout-line" />`;
  
  wrapper.appendChild(svg);
}

// Renderiza a folha de ponto interativa no preview (HTML)
function renderPreview() {
  const numDays = new Date(state.ano, state.mes, 0).getDate();
  const mesNome = MESES[state.mes - 1];

  // 1. Atualizar Título e Subtítulos
  const titleMain = document.getElementById("sheet-title-main");
  const subtitle = document.getElementById("sheet-subtitle");
  
  if (state.isEstagiario) {
    titleMain.innerHTML = `ESTADO DO ESPÍRITO SANTO<br>PREFEITURA MUNICIPAL DE COLATINA<br>Secretaria Municipal de Educação<br><i>EMEF "Dr. Octávio Manhães de Andrade"</i><br><small style="font-size:9pt; font-style:italic">Colatina - ES</small>`;
    subtitle.innerHTML = `CONTROLE DE FREQUÊNCIA`;
    
    // Adiciona o subtítulo da escola se não houver
    let subEscola = document.getElementById("sheet-sub-escola");
    if (!subEscola) {
      subEscola = document.createElement("p");
      subEscola.id = "sheet-sub-escola";
      subEscola.className = "school-sub";
      subEscola.innerText = `Escola Municipal de Ensino Fundamental “Dr. Octávio Manhães de Andrade”`;
      subtitle.parentNode.appendChild(subEscola);
    }
  } else {
    titleMain.innerHTML = `ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL "EMEEF Dr. Octávio Manhães de Andrade"`;
    subtitle.innerHTML = `FICHA DE PONTO DIÁRIO`;
    const subEscola = document.getElementById("sheet-sub-escola");
    if (subEscola) subEscola.remove();
  }

  // 2. Desenhar Info Box
  const infoBox = document.getElementById("sheet-info-box");
  infoBox.innerHTML = "";

  const nomeUpper = state.nome.toUpperCase();
  const mesAnoFormatted = `${mesNome} de ${state.ano}`;

  if (state.isEstagiario) {
    // Estagiário Layout
    infoBox.innerHTML = `
      <div class="info-col-full" style="padding: 6px; font-size: 11.5pt; text-align: center; border-bottom: none;">
        <strong>Servidor Estagiário:</strong> ${nomeUpper || "&nbsp;"}
      </div>
      <div class="info-col-full" style="padding: 6px; font-size: 11.5pt; text-align: center; border-top: 0.8pt solid #000; border-bottom: none;">
        <strong>Número Matrícula:</strong> ${state.matricula || "&nbsp;"} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Horário:</strong> ${state.horario || "&nbsp;"}
      </div>
      <div class="info-col-full" style="padding: 6px; font-size: 11.5pt; text-align: center; border-top: 0.8pt solid #000;">
        <strong>Ponto referente ao mês de ${mesAnoFormatted.toUpperCase()}</strong>
      </div>
    `;
  } else {
    // Standard Servidora Layout
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
  const dashLineEst = "-----";

  if (state.isEstagiario) {
    // Tabela Estagiário
    // Headers (2 linhas)
    const tr1 = document.createElement("tr");
    tr1.innerHTML = `
      <th rowspan="2" class="col-est-dia">Dias</th>
      <th colspan="2">Horário</th>
      <th rowspan="2" class="col-est-assn">Assinatura</th>
    `;
    const tr2 = document.createElement("tr");
    tr2.innerHTML = `
      <th class="col-est-hora-ent">Entrada</th>
      <th class="col-est-hora-sai">Saída</th>
    `;
    table.appendChild(tr1);
    table.appendChild(tr2);

    // Linhas dos dias
    for (let day = 1; day <= numDays; day++) {
      const date = new Date(state.ano, state.mes - 1, day);
      const weekday = date.getDay(); // 0 = Domingo, 6 = Sábado
      const dayStr = String(day).padStart(2, "0");
      const tr = document.createElement("tr");
      
      let colEntrada = "";
      let colSaida = "";
      let colAssinatura = "";
      let boldDia = true;

      if (String(day) in state.especiais) {
        const desc = state.especiais[String(day)];
        colEntrada = dashLineEst;
        colSaida = dashLineEst;
        colAssinatura = desc.charAt(0).toUpperCase() + desc.slice(1).toLowerCase();
      } else if (weekday === 6) {
        colEntrada = dashLineEst;
        colSaida = dashLineEst;
        colAssinatura = "Sábado";
      } else if (weekday === 0) {
        colEntrada = dashLineEst;
        colSaida = dashLineEst;
        colAssinatura = "Domingo";
      }

      tr.innerHTML = `
        <td style="${boldDia ? 'font-weight: bold;' : ''}">${dayStr}</td>
        <td>${colEntrada}</td>
        <td>${colSaida}</td>
        <td style="text-align: center;">${colAssinatura}</td>
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

  // 4. Linha de Observação no rodapé
  const trObs = document.createElement("tr");
  const totalCols = state.isEstagiario ? 4 : 9;
  trObs.innerHTML = `
    <td colspan="${totalCols}" class="obs-cell">
      <strong>Obs.:</strong> ${state.obs}
    </td>
  `;
  table.appendChild(trObs);

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

  // Adiciona logo direita se existir no cache
  if (state.logoRightBase64) {
    doc.addImage(state.logoRightBase64, "JPEG", pageW - rightMargin - logoW, topMargin, logoW, logoH);
  }

  // Adiciona textos do cabeçalho
  doc.setFont("times", "bold");
  
  if (state.isEstagiario) {
    // Estagiário Header
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    const headerLines = [
      "ESTADO DO ESPÍRITO SANTO",
      "PREFEITURA MUNICIPAL DE COLATINA",
      "Secretaria Municipal de Educação",
      "EMEF ” Dr. Octávio Manhães de Andrade”",
      "Colatina - ES"
    ];
    let currentY = topMargin + 8;
    headerLines.forEach((line, idx) => {
      if (idx === 3) doc.setFont("times", "italic");
      else if (idx === 4) {
        doc.setFont("times", "italic");
        doc.setFontSize(9);
      } else {
        doc.setFont("times", "normal");
        doc.setFontSize(10);
      }
      doc.text(line, pageW / 2, currentY, { align: "center" });
      currentY += 12;
    });

    // Subtítulo CONTROLE DE FREQUÊNCIA
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.text("CONTROLE DE FREQUÊNCIA", pageW / 2, topMargin + 80, { align: "center" });
    
    doc.setFontSize(13);
    doc.text("Escola Municipal de Ensino Fundamental “Dr. Octávio Manhães de Andrade”", pageW / 2, topMargin + 98, { align: "center" });
  } else {
    // Servidora Landscape Header
    doc.setFontSize(10);
    doc.text("ESCOLA MUNICIPAL DE ENSINO FUNDAMENTAL \u201cEMEEF  Dr. Oct\u00e1vio Manh\u00e3es de Andrade\u201d", pageW / 2, centerY - 8, { align: "center" });
    
    doc.setFontSize(10);
    doc.text("FICHA DE PONTO DI\u00c1RIO", pageW / 2, centerY + 12, { align: "center" });
    
    // Linha de sublinhado do subtítulo
    const subWidth = doc.getTextWidth("FICHA DE PONTO DI\u00c1RIO");
    doc.setLineWidth(0.8);
    doc.line((pageW / 2) - (subWidth / 2), centerY + 14, (pageW / 2) + (subWidth / 2), centerY + 14);
  }

  // --- 2. DADOS DO SERVIDOR (Info Box) ---
  const infoBoxY = state.isEstagiario ? topMargin + 120 : topMargin + 65;
  const infoBoxH = state.isEstagiario ? 54 : 34; // 3 linhas em paisagem vs 3 linhas em retrato

  doc.setLineWidth(0.8);
  doc.rect(leftMargin, infoBoxY, usableW, infoBoxH);

  doc.setFont("times", "normal");
  doc.setFontSize(8.5);

  const mesNome = MESES[state.mes - 1];
  const mesAnoFormatted = `${mesNome} de ${state.ano}`;
  const nomeUpper = state.nome.toUpperCase();

  if (state.isEstagiario) {
    // Linha 1: Servidor Estagiário: [Nome]
    doc.setFontSize(12);
    doc.text(`Servidor Estagiário: ${nomeUpper}`, pageW / 2, infoBoxY + 16, { align: "center" });
    
    // Linha 2: Matrícula e Horário
    doc.line(leftMargin, infoBoxY + 24, pageW - rightMargin, infoBoxY + 24);
    doc.text(`Número Matrícula: ${state.matricula}                Horário: ${state.horario}`, pageW / 2, infoBoxY + 36, { align: "center" });
    
    // Linha 3: Mês de Referência
    doc.line(leftMargin, infoBoxY + 42, pageW - rightMargin, infoBoxY + 42);
    doc.setFont("times", "bold");
    doc.text(`Ponto referente ao mês de ${mesAnoFormatted.toUpperCase()}`, pageW / 2, infoBoxY + 50, { align: "center" });
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
  const numDays = new Date(state.ano, state.mes - 1, 0).getDate();
  const tableData = [];
  
  const dash = "---------------";
  const dashEst = "-----";

  if (state.isEstagiario) {
    // Dados Estagiário
    for (let day = 1; day <= numDays; day++) {
      const date = new Date(state.ano, state.mes - 1, day);
      const weekday = date.getDay();
      const dayStr = String(day).padStart(2, "0");
      
      let colEntrada = "";
      let colSaida = "";
      let colAssinatura = "";

      if (String(day) in state.especiais) {
        const desc = state.especiais[String(day)];
        colEntrada = dashEst;
        colSaida = dashEst;
        colAssinatura = desc.charAt(0).toUpperCase() + desc.slice(1).toLowerCase();
      } else if (weekday === 6) {
        colEntrada = dashEst;
        colSaida = dashEst;
        colAssinatura = "Sábado";
      } else if (weekday === 0) {
        colEntrada = dashEst;
        colSaida = dashEst;
        colAssinatura = "Domingo";
      }

      tableData.push([dayStr, colEntrada, colSaida, colAssinatura]);
    }
  } else {
    // Dados Servidora Comum (Landscape)
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

  // Linha de Observações extra
  const obsRowData = state.isEstagiario 
    ? [`Obs.: ${state.obs}`, "", "", ""] 
    : [`Obs.: ${state.obs}`, "", "", "", "", "", "", "", ""];
  tableData.push(obsRowData);

  // Configurações de altura da tabela (para caber perfeitamente na página)
  const gridStartY = state.isEstagiario ? infoBoxY + infoBoxH + 15 : infoBoxY + infoBoxH + 6;
  const availH = state.isEstagiario ? 520 : 435;
  const headerRowsCount = state.isEstagiario ? 2 : 1;
  const headerHeight = 20 * headerRowsCount;
  const obsHeight = 20;
  const dayRowHeight = (availH - headerHeight - obsHeight) / numDays;

  // Variáveis para rastrear coordenadas da linha diagonal de bloqueio no PDF
  let blockStartX = 0, blockStartY = 0, blockEndX = 0, blockEndY = 0;

  // Renderiza a tabela usando jsPDF-AutoTable
  doc.autoTable({
    startY: gridStartY,
    margin: { left: leftMargin, right: rightMargin },
    theme: "plain",
    tableWidth: usableW,
    styles: {
      font: "times",
      fontSize: state.isEstagiario ? 10 : 7,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
      halign: "center",
      valign: "middle",
      cellPadding: 1
    },
    headStyles: {
      fontStyle: "bold",
      fontSize: state.isEstagiario ? 10 : 6,
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
    // Monta o cabeçalho correto
    head: state.isEstagiario ? [
      [
        { content: "Dias", rowSpan: 2 },
        { content: "Horário", colSpan: 2 },
        { content: "Assinatura", rowSpan: 2 }
      ],
      ["Entrada", "Saída"]
    ] : [
      [
        "DIA", "HORA de\nEntrada", "ASSINATURA", 
        "HORA saída\nalmoço", "ASSINATURA", 
        "HORA retorno\nalmoço", "ASSINATURA", 
        "HORA de\nSaída", "ASSINATURA"
      ]
    ],
    body: tableData,
    // Callback para definir as alturas de linhas exatas e fazer merge da linha de observação
    didParseCell: function(data) {
      if (data.row.index < headerRowsCount) {
        data.row.height = 20;
      } else if (data.row.index === numDays + headerRowsCount) {
        // Linha de Observações (Última linha)
        data.row.height = 20;
        if (data.column.index === 0) {
          data.cell.styles.halign = "left";
          data.cell.styles.valign = "top";
          data.cell.styles.cellPadding = { top: 2, left: 6 };
          data.cell.colSpan = state.isEstagiario ? 4 : 9;
        }
      } else {
        data.row.height = dayRowHeight;
      }
    },
    // Callback para desenhar bordas customizadas e rastrear coordenadas de bloqueio
    willDrawCell: function(data) {
      const dayIndex = data.row.index - headerRowsCount + 1; // 1-indexed day of month
      
      // Captura as coordenadas do início e fim do bloco para desenhar a linha diagonal
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
    // Callback após desenhar a tabela, para desenhar a linha tracejada sobre ela
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

  // Salva o PDF com o nome adequado
  const mesString = MESES[state.mes - 1].toLowerCase();
  const nomeSanitizado = state.nome.toLowerCase().replace(/\s+/g, "_");
  const fileName = `livro_ponto_${nomeSanitizado}_${mesString}.pdf`;
  doc.save(fileName);
}

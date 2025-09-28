import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import logo from './assets/logo.png';
import dogOutline from './assets/dog-outline.png';
import './App.css';

interface FormData {
  data: string;
  periodo: string;
  veterinarioResponsavel: string;
  veterinarioResponsavelInternacao: string;
  paciente: string;
  sexo: string;
  especie: string;
  tutor: string;
  diagnostico: string;
  estadoGeral: string;
  parametros: string;
  defecou: string;
  defecouDetalhes: string;
  urinou: string;
  urinouDetalhes: string;
  vomitou: string;
  vomitouDetalhes: string;
  comeu: string;
  tipoAlimentacao: string[];
  intercorrencias: string;
  informacoesComplementares: string;
}

function App() {
  const targetRef = useRef(null);
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      data: '',
      periodo: '',
      veterinarioResponsavel: '',
      veterinarioResponsavelInternacao: '',
      paciente: '',
      sexo: '',
      especie: '',
      tutor: '',
      diagnostico: '',
      estadoGeral: '',
      parametros: '',
      defecou: '',
      defecouDetalhes: '',
      urinou: '',
      urinouDetalhes: '',
      vomitou: '',
      vomitouDetalhes: '',
      comeu: '',
      tipoAlimentacao: [],
      intercorrencias: '',
      informacoesComplementares: '',
    }
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setFormData(data);
    setFormSubmitted(true);
  };
  
  const handleDownloadPDF = () => {
    if (formData && targetRef.current) {
      // Captura o elemento do DOM que contém o preview do PDF
      html2canvas(targetRef.current, {
        scale: 2, // Aumenta a qualidade da captura
        useCORS: true, // Permite carregar imagens de outros domínios
        logging: false,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        // Cria um novo documento PDF no tamanho A4
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Calcula a proporção para manter a relação de aspecto
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
        
        // Calcula as dimensões para centralizar na página
        const imgWidth = canvasWidth * ratio;
        const imgHeight = canvasHeight * ratio;
        const x = (pdfWidth - imgWidth) / 2;
        const y = 0;
        
        // Adiciona a imagem capturada ao PDF
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        
        // Salva o PDF
        pdf.save('passagem-plantao.pdf');
      });
    }
  };

  const handleNewForm = () => {
    reset();
    setFormSubmitted(false);
  };

  return (
    <div className="app-container">
      {!formSubmitted ? (
        <div className="form-container">
          <div className="header">
            <h1>Boletim Informativo da Internação</h1>
            <img src={logo} alt="Logo AuQmia" className="logo" />
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="data">Data:</label>
                <input 
                  type="date" 
                  id="data" 
                  {...register('data', { required: true })} 
                  className={errors.data ? 'error' : ''}
                />
                {errors.data && <span className="error-message">Campo obrigatório</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="periodo">Período:</label>
                <select 
                  id="periodo" 
                  {...register('periodo', { required: true })}
                  className={errors.periodo ? 'error' : ''}
                >
                  <option value="">Selecione</option>
                  <option value="Diurno">Diurno</option>
                  <option value="Noturno">Noturno</option>
                </select>
                {errors.periodo && <span className="error-message">Campo obrigatório</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="veterinarioResponsavel">Veterinário Responsável:</label>
              <input 
                type="text" 
                id="veterinarioResponsavel" 
                {...register('veterinarioResponsavel', { required: true })}
                className={errors.veterinarioResponsavel ? 'error' : ''}
              />
              {errors.veterinarioResponsavel && <span className="error-message">Campo obrigatório</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="veterinarioResponsavelInternacao">Veterinário Responsável da Internação no Período:</label>
              <input 
                type="text" 
                id="veterinarioResponsavelInternacao" 
                {...register('veterinarioResponsavelInternacao', { required: true })}
                className={errors.veterinarioResponsavelInternacao ? 'error' : ''}
              />
              {errors.veterinarioResponsavelInternacao && <span className="error-message">Campo obrigatório</span>}
            </div>
            
            <div className="form-section">
              <h2>Informações do Paciente</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="paciente">Paciente:</label>
                  <input 
                    type="text" 
                    id="paciente" 
                    {...register('paciente', { required: true })}
                    className={errors.paciente ? 'error' : ''}
                  />
                  {errors.paciente && <span className="error-message">Campo obrigatório</span>}
                </div>
                
                <div className="form-group radio-group">
                  <label>Sexo:</label>
                  <div className="radio-options">
                    <label>
                      <input 
                        type="radio" 
                        value="Macho" 
                        {...register('sexo', { required: true })} 
                      /> Macho
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        value="Fêmea" 
                        {...register('sexo', { required: true })} 
                      /> Fêmea
                    </label>
                  </div>
                  {errors.sexo && <span className="error-message">Campo obrigatório</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="especie">Espécie:</label>
                  <input 
                    type="text" 
                    id="especie" 
                    {...register('especie', { required: true })}
                    className={errors.especie ? 'error' : ''}
                  />
                  {errors.especie && <span className="error-message">Campo obrigatório</span>}
                </div>
                
              
              </div>
              
              <div className="form-group">
                <label htmlFor="tutor">Tutor:</label>
                <input 
                  type="text" 
                  id="tutor" 
                  {...register('tutor', { required: true })}
                  className={errors.tutor ? 'error' : ''}
                />
                {errors.tutor && <span className="error-message">Campo obrigatório</span>}
              </div>
            </div>
            
            <div className="form-section">
              <h2>Informações Clínicas</h2>
              
              <div className="form-group">
                <label htmlFor="diagnostico">Diagnóstico:</label>
                <input 
                  type="text" 
                  id="diagnostico" 
                  {...register('diagnostico', { required: true })}
                  className={errors.diagnostico ? 'error' : ''}
                />
                {errors.diagnostico && <span className="error-message">Campo obrigatório</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="estadoGeral">Estado Geral do Paciente no Período:</label>
                <input 
                  type="text" 
                  id="estadoGeral" 
                  {...register('estadoGeral', { required: true })}
                  className={errors.estadoGeral ? 'error' : ''}
                />
                {errors.estadoGeral && <span className="error-message">Campo obrigatório</span>}
              </div>
              
              <div className="form-group radio-group">
                <label>Parâmetros:</label>
                <div className="radio-options">
                  <label>
                    <input 
                      type="radio" 
                      value="Normal" 
                      {...register('parametros', { required: true })} 
                    /> Normal
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      value="Alterado" 
                      {...register('parametros', { required: true })} 
                    /> Alterado
                  </label>
                </div>
                {errors.parametros && <span className="error-message">Campo obrigatório</span>}
              </div>
            </div>
            
            <div className="form-section">
              <h2>Funções Fisiológicas</h2>
              
              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Defecou:</label>
                  <div className="radio-options">
                    <label>
                      <input 
                        type="radio" 
                        value="Sim" 
                        {...register('defecou', { required: true })} 
                      /> Sim
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        value="Não" 
                        {...register('defecou', { required: true })} 
                      /> Não
                    </label>
                  </div>
                  {errors.defecou && <span className="error-message">Campo obrigatório</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="defecouDetalhes">Detalhes:</label>
                  <input 
                    type="text" 
                    id="defecouDetalhes" 
                    {...register('defecouDetalhes')}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Urinou:</label>
                  <div className="radio-options">
                    <label>
                      <input 
                        type="radio" 
                        value="Sim" 
                        {...register('urinou', { required: true })} 
                      /> Sim
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        value="Não" 
                        {...register('urinou', { required: true })} 
                      /> Não
                    </label>
                  </div>
                  {errors.urinou && <span className="error-message">Campo obrigatório</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="urinouDetalhes">Detalhes:</label>
                  <input 
                    type="text" 
                    id="urinouDetalhes" 
                    {...register('urinouDetalhes')}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Vomitou:</label>
                  <div className="radio-options">
                    <label><input type="radio" value="Sim" {...register('vomitou', { required: true })} /> Sim</label>
                    <label><input type="radio" value="Não" {...register('vomitou', { required: true })} /> Não</label>
                  </div>
                  {errors.vomitou && <span className="error-message">Campo obrigatório</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="vomitouDetalhes">Detalhes:</label>
                  <input type="text" id="vomitouDetalhes" {...register('vomitouDetalhes')} />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group radio-group">
                  <label>Comeu:</label>
                  <div className="radio-options">
                    <label>
                      <input 
                        type="radio" 
                        value="Sim" 
                        {...register('comeu', { required: true })} 
                      /> Sim
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        value="Não" 
                        {...register('comeu', { required: true })} 
                      /> Não
                    </label>
                  </div>
                  {errors.comeu && <span className="error-message">Campo obrigatório</span>}
                </div>
              </div>
              
              <div className="form-group checkbox-group">
                <label>Tipo de Alimentação:</label>
                <div className="checkbox-options">
                  <label>
                    <input 
                      type="checkbox" 
                      value="Sonda" 
                      {...register('tipoAlimentacao')} 
                    /> Sonda
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      value="Pastosa" 
                      {...register('tipoAlimentacao')} 
                    /> Pastosa
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      value="Seca" 
                      {...register('tipoAlimentacao')} 
                    /> Seca
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      value="Própria" 
                      {...register('tipoAlimentacao')} 
                    /> Própria
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h2>Observações</h2>
              
              <div className="form-group">
                <label htmlFor="intercorrencias">Intercorrências:</label>
                <textarea 
                  id="intercorrencias" 
                  {...register('intercorrencias')}
                  rows={3}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="informacoesComplementares">Informações complementares:</label>
                <textarea 
                  id="informacoesComplementares" 
                  {...register('informacoesComplementares')}
                  rows={3}
                ></textarea>
              </div>
            </div>
            
            <div className="form-footer">
              <button type="submit" className="submit-button">Gerar PDF</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="pdf-preview-container">
          <div className="pdf-actions">
            <button className="download-button" onClick={handleDownloadPDF}>Baixar PDF</button>
            <button className="new-form-button" onClick={handleNewForm}>Novo Formulário</button>
          </div>
          
          <div className="pdf-preview" ref={targetRef}>
            <div className="pdf-content">
              <div className="pdf-header">
                <h1>Boletim Informativo da Internação</h1>
                <img src={logo} alt="Logo AuQmia" className="pdf-logo" />
              </div>
              
              <div className="watermark">
                <img src={dogOutline} alt="" />
              </div>
              
              <div className="pdf-body">
                <div className="pdf-row">
                  <div className="pdf-field">
                    <span className="pdf-label">Data:</span>
                    <span className="pdf-value">{formData?.data}</span>
                  </div>
                  
                  <div className="pdf-field">
                    <span className="pdf-label">Período:</span>
                    <span className="pdf-value">{formData?.periodo}</span>
                  </div>
                </div>
                
                <div className="pdf-field">
                  <span className="pdf-label">Veterinário Responsável:</span>
                  <span className="pdf-value">{formData?.veterinarioResponsavel}</span>
                </div>
                
                <div className="pdf-field">
                  <span className="pdf-label">Veterinário Responsável da Internação no Período:</span>
                  <span className="pdf-value">{formData?.veterinarioResponsavelInternacao}</span>
                </div>
                
                <div className="pdf-section">
                  <h2>Informações do Paciente</h2>
                  
                  <div className="pdf-row">
                    <div className="pdf-field">
                      <span className="pdf-label">Paciente:</span>
                      <span className="pdf-value">{formData?.paciente}</span>
                    </div>
                    
                    <div className="pdf-field">
                      <span className="pdf-label">Sexo:</span>
                      <span className="pdf-value">{formData?.sexo}</span>
                    </div>
                  </div>
                  
                  <div className="pdf-row">
                    <div className="pdf-field">
                      <span className="pdf-label">Espécie:</span>
                      <span className="pdf-value">{formData?.especie}</span>
                    </div>
                    
                  </div>
                  
                  <div className="pdf-field">
                    <span className="pdf-label">Tutor:</span>
                    <span className="pdf-value">{formData?.tutor}</span>
                  </div>
                </div>
                
                <div className="pdf-section">
                  <h2>Informações Clínicas</h2>
                  
                  <div className="pdf-field">
                    <span className="pdf-label">Diagnóstico:</span>
                    <span className="pdf-value">{formData?.diagnostico}</span>
                  </div>
                  
                  <div className="pdf-field">
                    <span className="pdf-label">Estado Geral do Paciente no Período:</span>
                    <span className="pdf-value">{formData?.estadoGeral || 'Não informado'}</span>
                  </div>
                  
                  <div className="pdf-field">
                    <span className="pdf-label">Parâmetros:</span>
                    <span className="pdf-value">{formData?.parametros}</span>
                  </div>
                </div>
                
                <div className="pdf-section">
                  <h2>Funções Fisiológicas</h2>
                  
                  <div className="pdf-row">
                    <div className="pdf-field">
                      <span className="pdf-label">Defecou:</span>
                      <span className="pdf-value">{formData?.defecou}</span>
                    </div>
                    
                    <div className="pdf-field">
                      <span className="pdf-label">Detalhes:</span>
                      <span className="pdf-value">{formData?.defecouDetalhes}</span>
                    </div>
                  </div>
                  
                  <div className="pdf-row">
                    <div className="pdf-field">
                      <span className="pdf-label">Urinou:</span>
                      <span className="pdf-value">{formData?.urinou}</span>
                    </div>
                    
                    <div className="pdf-field">
                      <span className="pdf-label">Detalhes:</span>
                      <span className="pdf-value">{formData?.urinouDetalhes}</span>
                    </div>
                  </div>
                  
                  <div className="pdf-row">
                    <div className="pdf-field">
                      <span className="pdf-label">Comeu:</span>
                      <span className="pdf-value">{formData?.comeu}</span>
                    </div>
                    
                    <div className="pdf-field">
                      <span className="pdf-label">Tipo de Alimentação:</span>
                      <span className="pdf-value">
                        {formData?.tipoAlimentacao?.join(', ')}
                      </span>
                    </div>
                  </div>

                   <div className="pdf-row">
                  <div className="pdf-field"><span className="pdf-label">Vomitou:</span> <span className="pdf-value">{formData?.vomitou}</span></div>
                  <div className="pdf-field"><span className="pdf-label">Detalhes:</span> <span className="pdf-value">{formData?.vomitouDetalhes || 'N/A'}</span></div>
                </div>
              
                </div>
                
                <div className="pdf-section">
                  <h2>Observações</h2>
                  
                  <div className="pdf-field">
                    <span className="pdf-label">Intercorrências:</span>
                    <span className="pdf-value">{formData?.intercorrencias}</span>
                  </div>
                  
                  <div className="pdf-field">
                    <span className="pdf-label">Informações complementares:</span>
                    <span className="pdf-value">{formData?.informacoesComplementares}</span>
                  </div>
                </div>
              </div>
              
              <div className="pdf-footer">
                <p>Exames e ficha de internação, acesse o site: <a href="https://clinicavetauqmia.simples.vet.br">https://clinicavetauqmia.simples.vet.br</a></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

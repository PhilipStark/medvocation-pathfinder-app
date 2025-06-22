
interface SpecialtyDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  salary_range: string;
  demand_level: 'Baixa' | 'Média' | 'Alta' | 'Muito Alta';
  formation_years: number;
  work_locations: string[];
  daily_activities: string[];
  required_skills: string[];
  career_prospects: string;
}

export const specialtyDetails: Record<string, SpecialtyDetail> = {
  'cardiologia': {
    id: 'cardiologia',
    name: 'Cardiologia',
    category: 'Clínica Médica',
    description: 'Especialidade focada no diagnóstico e tratamento de doenças do coração e sistema cardiovascular.',
    salary_range: 'R$ 15.000 - R$ 35.000',
    demand_level: 'Muito Alta',
    formation_years: 8,
    work_locations: ['Hospitais', 'Clínicas', 'Consultórios'],
    daily_activities: ['Consultas', 'Exames cardiológicos', 'Procedimentos invasivos'],
    required_skills: ['Precisão técnica', 'Tomada de decisão rápida', 'Trabalho sob pressão'],
    career_prospects: 'Excelente demanda devido ao envelhecimento populacional e aumento de doenças cardiovasculares.'
  },
  'dermatologia': {
    id: 'dermatologia',
    name: 'Dermatologia',
    category: 'Especialidade Clínica',
    description: 'Especialidade médica dedicada ao diagnóstico e tratamento de doenças da pele, cabelos e unhas.',
    salary_range: 'R$ 18.000 - R$ 45.000',
    demand_level: 'Alta',
    formation_years: 7,
    work_locations: ['Consultórios', 'Clínicas estéticas', 'Hospitais'],
    daily_activities: ['Consultas dermatológicas', 'Procedimentos estéticos', 'Cirurgias menores'],
    required_skills: ['Atenção aos detalhes', 'Habilidades estéticas', 'Comunicação com pacientes'],
    career_prospects: 'Crescimento constante com a valorização da estética e cuidados com a pele.'
  },
  'neurologia': {
    id: 'neurologia',
    name: 'Neurologia',
    category: 'Especialidade Clínica',
    description: 'Especialidade que trata distúrbios do sistema nervoso central e periférico.',
    salary_range: 'R$ 16.000 - R$ 40.000',
    demand_level: 'Muito Alta',
    formation_years: 8,
    work_locations: ['Hospitais', 'Clínicas neurológicas', 'Centros de reabilitação'],
    daily_activities: ['Consultas neurológicas', 'Interpretação de exames', 'Acompanhamento de casos complexos'],
    required_skills: ['Raciocínio analítico', 'Paciência', 'Conhecimento técnico profundo'],
    career_prospects: 'Alta demanda devido ao envelhecimento populacional e aumento de doenças neurológicas.'
  },
  'cirurgia-geral': {
    id: 'cirurgia-geral',
    name: 'Cirurgia Geral',
    category: 'Cirúrgica',
    description: 'Especialidade cirúrgica que abrange procedimentos em diversas partes do corpo.',
    salary_range: 'R$ 20.000 - R$ 50.000',
    demand_level: 'Muito Alta',
    formation_years: 8,
    work_locations: ['Hospitais', 'Centros cirúrgicos', 'Pronto-socorro'],
    daily_activities: ['Cirurgias', 'Atendimento de emergência', 'Acompanhamento pós-operatório'],
    required_skills: ['Destreza manual', 'Resistência física', 'Tomada de decisão rápida'],
    career_prospects: 'Sempre em alta demanda, especialmente em emergências e trauma.'
  },
  'pediatria': {
    id: 'pediatria',
    name: 'Pediatria',
    category: 'Clínica Médica',
    description: 'Especialidade dedicada aos cuidados médicos de bebês, crianças e adolescentes.',
    salary_range: 'R$ 12.000 - R$ 30.000',
    demand_level: 'Alta',
    formation_years: 7,
    work_locations: ['Hospitais infantis', 'Clínicas', 'Consultórios'],
    daily_activities: ['Consultas pediátricas', 'Vacinação', 'Acompanhamento do desenvolvimento'],
    required_skills: ['Empatia com crianças', 'Comunicação com famílias', 'Paciência'],
    career_prospects: 'Demanda estável com foco na medicina preventiva infantil.'
  },
  'ginecologia': {
    id: 'ginecologia',
    name: 'Ginecologia e Obstetrícia',
    category: 'Especialidade Clínica',
    description: 'Especialidade focada na saúde reprodutiva da mulher e acompanhamento da gravidez.',
    salary_range: 'R$ 15.000 - R$ 35.000',
    demand_level: 'Alta',
    formation_years: 7,
    work_locations: ['Hospitais', 'Maternidades', 'Consultórios'],
    daily_activities: ['Consultas ginecológicas', 'Partos', 'Cirurgias ginecológicas'],
    required_skills: ['Empatia', 'Disponibilidade', 'Habilidades cirúrgicas'],
    career_prospects: 'Demanda constante com crescimento na área de reprodução assistida.'
  },
  'ortopedia': {
    id: 'ortopedia',
    name: 'Ortopedia e Traumatologia',
    category: 'Cirúrgica',
    description: 'Especialidade que trata lesões e doenças do sistema musculoesquelético.',
    salary_range: 'R$ 18.000 - R$ 45.000',
    demand_level: 'Muito Alta',
    formation_years: 8,
    work_locations: ['Hospitais', 'Clínicas', 'Centros esportivos'],
    daily_activities: ['Cirurgias ortopédicas', 'Consultórios', 'Atendimento de trauma'],
    required_skills: ['Força física', 'Precisão cirúrgica', 'Trabalho em equipe'],
    career_prospects: 'Alta demanda devido ao envelhecimento e aumento de atividades esportivas.'
  },
  'psiquiatria': {
    id: 'psiquiatria',
    name: 'Psiquiatria',
    category: 'Especialidade Clínica',
    description: 'Especialidade médica que trata transtornos mentais e comportamentais.',
    salary_range: 'R$ 14.000 - R$ 32.000',
    demand_level: 'Muito Alta',
    formation_years: 7,
    work_locations: ['Hospitais psiquiátricos', 'Consultórios', 'CAPS'],
    daily_activities: ['Consultas psiquiátricas', 'Psicoterapia', 'Prescrição de medicamentos'],
    required_skills: ['Escuta ativa', 'Empatia', 'Estabilidade emocional'],
    career_prospects: 'Crescimento exponencial devido ao aumento de transtornos mentais.'
  },
  'anestesiologia': {
    id: 'anestesiologia',
    name: 'Anestesiologia',
    category: 'Área de Apoio',
    description: 'Especialidade responsável pela anestesia e cuidados perioperatórios.',
    salary_range: 'R$ 16.000 - R$ 38.000',
    demand_level: 'Muito Alta',
    formation_years: 7,
    work_locations: ['Centros cirúrgicos', 'UTIs', 'Clínicas de dor'],
    daily_activities: ['Anestesias', 'Monitorização', 'Cuidados intensivos'],
    required_skills: ['Precisão técnica', 'Calma sob pressão', 'Atenção aos detalhes'],
    career_prospects: 'Demanda muito alta com déficit de profissionais no mercado.'
  },
  'radiologia': {
    id: 'radiologia',
    name: 'Radiologia e Diagnóstico por Imagem',
    category: 'Diagnóstica',
    description: 'Especialidade focada em exames de imagem para diagnóstico médico.',
    salary_range: 'R$ 15.000 - R$ 35.000',
    demand_level: 'Alta',
    formation_years: 6,
    work_locations: ['Clínicas de imagem', 'Hospitais', 'Centros diagnósticos'],
    daily_activities: ['Interpretação de exames', 'Laudos médicos', 'Procedimentos guiados'],
    required_skills: ['Atenção aos detalhes', 'Conhecimento técnico', 'Concentração'],
    career_prospects: 'Crescimento com avanços tecnológicos e envelhecimento populacional.'
  },
  'medicina-familia': {
    id: 'medicina-familia',
    name: 'Medicina de Família e Comunidade',
    category: 'Atenção Primária',
    description: 'Especialidade focada no cuidado integral e continuado de indivíduos e famílias.',
    salary_range: 'R$ 10.000 - R$ 25.000',
    demand_level: 'Muito Alta',
    formation_years: 6,
    work_locations: ['UBS', 'ESF', 'Consultórios'],
    daily_activities: ['Consultas gerais', 'Prevenção', 'Promoção da saúde'],
    required_skills: ['Visão holística', 'Comunicação', 'Trabalho em equipe'],
    career_prospects: 'Grande demanda no SUS e crescimento na medicina preventiva.'
  },
  'patologia': {
    id: 'patologia',
    name: 'Patologia',
    category: 'Diagnóstica',
    description: 'Especialidade que estuda doenças através de análises laboratoriais e anatomopatológicas.',
    salary_range: 'R$ 12.000 - R$ 30.000',
    demand_level: 'Média',
    formation_years: 7,
    work_locations: ['Laboratórios', 'Hospitais', 'Institutos de pesquisa'],
    daily_activities: ['Análise de biópsias', 'Laudos histopatológicos', 'Pesquisa'],
    required_skills: ['Atenção aos detalhes', 'Concentração', 'Conhecimento técnico'],
    career_prospects: 'Demanda estável com crescimento na medicina personalizada.'
  },
  'medicina-intensiva': {
    id: 'medicina-intensiva',
    name: 'Medicina Intensiva',
    category: 'Cuidados Críticos',
    description: 'Especialidade focada no atendimento de pacientes em estado crítico.',
    salary_range: 'R$ 18.000 - R$ 40.000',
    demand_level: 'Muito Alta',
    formation_years: 6,
    work_locations: ['UTIs', 'Pronto-socorro', 'Hospitais'],
    daily_activities: ['Cuidados intensivos', 'Emergências', 'Procedimentos críticos'],
    required_skills: ['Resistência ao estresse', 'Tomada de decisão rápida', 'Trabalho em equipe'],
    career_prospects: 'Alta demanda com déficit de intensivistas no país.'
  },
  'medicina-legal': {
    id: 'medicina-legal',
    name: 'Medicina Legal e Perícia Médica',
    category: 'Área Técnica',
    description: 'Especialidade que aplica conhecimentos médicos em questões legais e periciais.',
    salary_range: 'R$ 12.000 - R$ 28.000',
    demand_level: 'Média',
    formation_years: 6,
    work_locations: ['IML', 'Órgãos públicos', 'Consultorias'],
    daily_activities: ['Perícias médicas', 'Laudos técnicos', 'Necrópsias'],
    required_skills: ['Objetividade', 'Conhecimento legal', 'Resistência emocional'],
    career_prospects: 'Demanda estável com oportunidades no setor público.'
  }
};

export const getSpecialtyDetail = (specialtyId: string): SpecialtyDetail | null => {
  return specialtyDetails[specialtyId] || null;
};

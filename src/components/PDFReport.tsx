
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import { TestResponses } from '@/types/test';
import { getDetailedAnalysis, getTopSpecialties } from '@/utils/testCalculations';

// Register fonts for better styling
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
});

interface PDFReportProps {
  responses: TestResponses;
  scores: Record<string, number>;
  userName?: string;
  testDate?: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Inter'
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
    borderBottom: '2pt solid #1e40af',
    paddingBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5
  },
  section: {
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 15,
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 5
  },
  specialtyItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 5
  },
  specialtyRank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 5
  },
  specialtyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  specialtyScore: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 5
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 8,
    color: '#374151'
  },
  bulletPoint: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 15,
    color: '#374151'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#64748b',
    borderTop: '1pt solid #e2e8f0',
    paddingTop: 10
  }
});

const PDFReport: React.FC<PDFReportProps> = ({ 
  responses, 
  scores, 
  userName = "Usuário", 
  testDate = new Date().toLocaleDateString('pt-BR') 
}) => {
  const topSpecialties = getTopSpecialties(scores, 5);
  const analysis = getDetailedAnalysis(responses, topSpecialties);

  return (
    <Document>
      {/* Page 1: Cover and Summary */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Relatório Vocacional Completo</Text>
          <Text style={styles.subtitle}>MedVocation - Sua Jornada na Medicina</Text>
          <Text style={styles.subtitle}>Nome: {userName}</Text>
          <Text style={styles.subtitle}>Data do teste: {testDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo Executivo</Text>
          <Text style={styles.text}>
            Este relatório apresenta uma análise detalhada da sua compatibilidade com diferentes especialidades médicas, 
            baseada em 90 perguntas sobre personalidade, interesses, estilo de vida e valores pessoais.
          </Text>
          <Text style={styles.text}>
            A metodologia utiliza um algoritmo proprietário que pondera suas respostas de acordo com perfis reais 
            de profissionais das diferentes especialidades médicas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suas Top 5 Especialidades</Text>
          {topSpecialties.slice(0, 5).map((item, index) => (
            <View key={item.specialty.id} style={styles.specialtyItem}>
              <Text style={styles.specialtyRank}>#{index + 1}</Text>
              <Text style={styles.specialtyName}>{item.specialty.name}</Text>
              <Text style={styles.specialtyScore}>Compatibilidade: {item.score}%</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          MedVocation | Relatório gerado em {new Date().toLocaleDateString('pt-BR')} | Página 1 de 3
        </Text>
      </Page>

      {/* Page 2: Detailed Analysis */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Análise do Perfil de Personalidade</Text>
          {analysis.personalityInsights.map((insight, index) => (
            <Text key={index} style={styles.bulletPoint}>• {insight}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendações de Carreira</Text>
          {analysis.careerRecommendations.map((recommendation, index) => (
            <Text key={index} style={styles.bulletPoint}>• {recommendation}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Análise Detalhada das Especialidades</Text>
          <Text style={styles.text}>
            Com base nas suas respostas, identificamos padrões que indicam maior afinidade com determinadas áreas médicas:
          </Text>
          
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Especialidade Principal: {topSpecialties[0]?.specialty.name}</Text>
          </Text>
          <Text style={styles.text}>
            Sua maior compatibilidade é com {topSpecialties[0]?.specialty.name} ({topSpecialties[0]?.score}% de match). 
            Esta especialidade alinha-se com seu perfil de personalidade e suas preferências profissionais.
          </Text>

          {topSpecialties.slice(1, 3).map((item, index) => (
            <View key={item.specialty.id}>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>{item.specialty.name} ({item.score}%)</Text>
              </Text>
              <Text style={styles.text}>
                Também apresenta alta compatibilidade com suas características pessoais e objetivos de carreira.
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          MedVocation | Relatório gerado em {new Date().toLocaleDateString('pt-BR')} | Página 2 de 3
        </Text>
      </Page>

      {/* Page 3: Action Plan */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plano de Ação Personalizado</Text>
          <Text style={styles.text}>
            Com base na análise das suas respostas, desenvolvemos um roteiro prático para orientar 
            sua jornada na medicina:
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos Passos</Text>
          {analysis.nextSteps.map((step, index) => (
            <Text key={index} style={styles.bulletPoint}>{index + 1}. {step}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline Sugerido</Text>
          <Text style={styles.bulletPoint}>• Próximos 3 meses: Pesquise sobre as especialidades indicadas</Text>
          <Text style={styles.bulletPoint}>• 6 meses: Procure oportunidades de observação/estágio</Text>
          <Text style={styles.bulletPoint}>• 1 ano: Conecte-se com profissionais da área</Text>
          <Text style={styles.bulletPoint}>• Durante a graduação: Foque em disciplinas relevantes</Text>
          <Text style={styles.bulletPoint}>• Pré-residência: Prepare-se para provas específicas</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ranking Completo das Especialidades</Text>
          {topSpecialties.map((item, index) => (
            <Text key={item.specialty.id} style={styles.text}>
              {index + 1}. {item.specialty.name} - {item.score}%
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Considerações Finais</Text>
          <Text style={styles.text}>
            Este relatório é uma ferramenta de orientação baseada em suas respostas atuais. 
            Lembre-se de que suas preferências podem evoluir ao longo da formação médica.
          </Text>
          <Text style={styles.text}>
            Recomendamos refazer este teste periodicamente e sempre buscar experiências práticas 
            nas áreas de maior interesse.
          </Text>
        </View>

        <Text style={styles.footer}>
          MedVocation | Relatório gerado em {new Date().toLocaleDateString('pt-BR')} | Página 3 de 3
        </Text>
      </Page>
    </Document>
  );
};

export default PDFReport;

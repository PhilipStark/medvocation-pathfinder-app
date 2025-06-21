
import { 
  Brain, 
  Heart, 
  Clock,
  Target
} from 'lucide-react';
import { TestModule } from '@/types/test';

export const testModules: Record<string, TestModule> = {
  personality: {
    title: "Perfil de Personalidade",
    icon: Brain,
    description: "Descubra como sua personalidade se alinha com diferentes especialidades",
    questions: [
      {
        id: 1,
        text: "Prefiro trabalhar em situações de alta pressão e emergência",
        weights: {
          "emergency": 0.9,
          "surgery": 0.8,
          "cardiology": 0.7,
          "anesthesiology": 0.8,
          "psychiatry": 0.2,
          "dermatology": 0.1,
          "radiology": 0.3
        }
      },
      {
        id: 2,
        text: "Gosto de trabalhar com detalhes precisos e análise cuidadosa",
        weights: {
          "radiology": 0.9,
          "pathology": 0.9,
          "dermatology": 0.8,
          "psychiatry": 0.7,
          "emergency": 0.2,
          "surgery": 0.6,
          "pediatrics": 0.5
        }
      },
      {
        id: 3,
        text: "Prefiro interação constante com pacientes e suas famílias",
        weights: {
          "pediatrics": 0.9,
          "psychiatry": 0.9,
          "family_medicine": 0.9,
          "internal_medicine": 0.8,
          "radiology": 0.1,
          "pathology": 0.1,
          "anesthesiology": 0.3
        }
      },
      {
        id: 4,
        text: "Sou confortável tomando decisões rápidas sob pressão",
        weights: {
          "emergency": 0.9,
          "surgery": 0.8,
          "cardiology": 0.7,
          "anesthesiology": 0.8,
          "psychiatry": 0.3,
          "dermatology": 0.2,
          "radiology": 0.4
        }
      },
      {
        id: 5,
        text: "Prefiro trabalhar de forma independente com mínima supervisão",
        weights: {
          "radiology": 0.8,
          "pathology": 0.9,
          "dermatology": 0.7,
          "psychiatry": 0.6,
          "surgery": 0.3,
          "pediatrics": 0.2,
          "emergency": 0.3
        }
      },
      {
        id: 6,
        text: "Tenho facilidade para lidar com situações emocionalmente intensas",
        weights: {
          "psychiatry": 0.9,
          "emergency": 0.8,
          "pediatrics": 0.7,
          "oncology": 0.8,
          "dermatology": 0.2,
          "radiology": 0.3,
          "pathology": 0.2
        }
      },
      {
        id: 7,
        text: "Prefiro trabalhar em equipe e colaborar constantemente",
        weights: {
          "surgery": 0.8,
          "emergency": 0.9,
          "pediatrics": 0.8,
          "cardiology": 0.7,
          "radiology": 0.2,
          "pathology": 0.1,
          "dermatology": 0.4
        }
      },
      {
        id: 8,
        text: "Sou meticuloso e perfeccionista no meu trabalho",
        weights: {
          "surgery": 0.9,
          "pathology": 0.9,
          "radiology": 0.8,
          "dermatology": 0.8,
          "emergency": 0.3,
          "family_medicine": 0.5,
          "psychiatry": 0.6
        }
      },
      {
        id: 9,
        text: "Prefiro rotinas previsíveis e estruturadas",
        weights: {
          "dermatology": 0.8,
          "radiology": 0.8,
          "pathology": 0.9,
          "psychiatry": 0.6,
          "emergency": 0.1,
          "surgery": 0.2,
          "cardiology": 0.3
        }
      },
      {
        id: 10,
        text: "Tenho facilidade para comunicar informações complexas de forma simples",
        weights: {
          "family_medicine": 0.9,
          "pediatrics": 0.8,
          "psychiatry": 0.8,
          "internal_medicine": 0.7,
          "pathology": 0.3,
          "radiology": 0.4,
          "anesthesiology": 0.3
        }
      },
      {
        id: 11,
        text: "Prefiro resolver problemas complexos que exigem investigação profunda",
        weights: {
          "internal_medicine": 0.9,
          "pathology": 0.8,
          "radiology": 0.7,
          "psychiatry": 0.7,
          "emergency": 0.4,
          "dermatology": 0.5,
          "family_medicine": 0.6
        }
      },
      {
        id: 12,
        text: "Sou confortável com tecnologia e equipamentos complexos",
        weights: {
          "radiology": 0.9,
          "cardiology": 0.8,
          "anesthesiology": 0.7,
          "surgery": 0.6,
          "psychiatry": 0.2,
          "family_medicine": 0.3,
          "pediatrics": 0.3
        }
      },
      {
        id: 13,
        text: "Prefiro trabalhar com casos variados e imprevisíveis",
        weights: {
          "emergency": 0.9,
          "family_medicine": 0.8,
          "internal_medicine": 0.7,
          "pediatrics": 0.6,
          "dermatology": 0.2,
          "radiology": 0.3,
          "pathology": 0.2
        }
      },
      {
        id: 14,
        text: "Tenho paciência para acompanhar tratamentos de longo prazo",
        weights: {
          "psychiatry": 0.9,
          "oncology": 0.8,
          "internal_medicine": 0.7,
          "family_medicine": 0.7,
          "emergency": 0.1,
          "surgery": 0.3,
          "radiology": 0.4
        }
      },
      {
        id: 15,
        text: "Prefiro trabalhar com evidências visuais e imagens",
        weights: {
          "radiology": 0.9,
          "dermatology": 0.8,
          "pathology": 0.7,
          "surgery": 0.6,
          "psychiatry": 0.2,
          "family_medicine": 0.3,
          "emergency": 0.3
        }
      },
      {
        id: 16,
        text: "Sou bom em manter a calma em situações caóticas",
        weights: {
          "emergency": 0.9,
          "surgery": 0.8,
          "anesthesiology": 0.8,
          "cardiology": 0.7,
          "dermatology": 0.2,
          "psychiatry": 0.5,
          "radiology": 0.3
        }
      },
      {
        id: 17,
        text: "Prefiro trabalhar com pessoas de todas as idades",
        weights: {
          "family_medicine": 0.9,
          "emergency": 0.8,
          "internal_medicine": 0.7,
          "psychiatry": 0.6,
          "pediatrics": 0.4,
          "radiology": 0.3,
          "pathology": 0.2
        }
      },
      {
        id: 18,
        text: "Tenho interesse em aspectos psicológicos da medicina",
        weights: {
          "psychiatry": 0.9,
          "family_medicine": 0.6,
          "pediatrics": 0.5,
          "internal_medicine": 0.4,
          "surgery": 0.2,
          "radiology": 0.2,
          "pathology": 0.1
        }
      },
      {
        id: 19,
        text: "Prefiro resultados imediatos e tangíveis no meu trabalho",
        weights: {
          "surgery": 0.9,
          "emergency": 0.8,
          "dermatology": 0.7,
          "anesthesiology": 0.6,
          "psychiatry": 0.2,
          "internal_medicine": 0.4,
          "pathology": 0.3
        }
      },
      {
        id: 20,
        text: "Sou confortável trabalhando com tecnologia de ponta",
        weights: {
          "radiology": 0.9,
          "cardiology": 0.8,
          "surgery": 0.7,
          "anesthesiology": 0.6,
          "family_medicine": 0.3,
          "psychiatry": 0.2,
          "dermatology": 0.4
        }
      },
      {
        id: 21,
        text: "Prefiro trabalhar de forma sistemática e organizada",
        weights: {
          "pathology": 0.9,
          "radiology": 0.8,
          "internal_medicine": 0.7,
          "dermatology": 0.7,
          "emergency": 0.2,
          "surgery": 0.5,
          "psychiatry": 0.6
        }
      },
      {
        id: 22,
        text: "Tenho facilidade para trabalhar sob protocolos rígidos",
        weights: {
          "anesthesiology": 0.9,
          "radiology": 0.8,
          "pathology": 0.8,
          "surgery": 0.7,
          "family_medicine": 0.4,
          "psychiatry": 0.3,
          "emergency": 0.5
        }
      }
    ]
  },
  interests: {
    title: "Interesses Profissionais",
    icon: Heart,
    description: "Identifique suas áreas de interesse na medicina",
    questions: [
      {
        id: 23,
        text: "Tenho interesse em procedimentos cirúrgicos e técnicas manuais",
        weights: {
          "surgery": 0.9,
          "orthopedics": 0.9,
          "cardiology": 0.6,
          "dermatology": 0.7,
          "psychiatry": 0.1,
          "radiology": 0.2,
          "pathology": 0.1
        }
      },
      {
        id: 24,
        text: "Prefiro focar na prevenção de doenças",
        weights: {
          "family_medicine": 0.9,
          "pediatrics": 0.8,
          "internal_medicine": 0.7,
          "psychiatry": 0.6,
          "surgery": 0.2,
          "emergency": 0.3,
          "pathology": 0.1
        }
      },
      {
        id: 25,
        text: "Gosto de trabalhar com tecnologia avançada e equipamentos",
        weights: {
          "radiology": 0.9,
          "cardiology": 0.8,
          "anesthesiology": 0.7,
          "surgery": 0.6,
          "psychiatry": 0.2,
          "family_medicine": 0.3,
          "pediatrics": 0.3
        }
      },
      {
        id: 26,
        text: "Tenho interesse em saúde mental e comportamento humano",
        weights: {
          "psychiatry": 0.9,
          "pediatrics": 0.6,
          "family_medicine": 0.5,
          "internal_medicine": 0.4,
          "surgery": 0.1,
          "radiology": 0.1,
          "pathology": 0.1
        }
      },
      {
        id: 27,
        text: "Prefiro trabalhar com crianças e adolescentes",
        weights: {
          "pediatrics": 0.9,
          "psychiatry": 0.5,
          "surgery": 0.3,
          "family_medicine": 0.6,
          "internal_medicine": 0.2,
          "radiology": 0.3,
          "pathology": 0.1
        }
      },
      {
        id: 28,
        text: "Tenho interesse em doenças raras e casos complexos",
        weights: {
          "internal_medicine": 0.9,
          "pathology": 0.8,
          "radiology": 0.7,
          "oncology": 0.8,
          "family_medicine": 0.3,
          "dermatology": 0.4,
          "emergency": 0.4
        }
      },
      {
        id: 29,
        text: "Prefiro trabalhar com aspectos estéticos da medicina",
        weights: {
          "dermatology": 0.9,
          "surgery": 0.6,
          "psychiatry": 0.2,
          "radiology": 0.2,
          "pathology": 0.1,
          "emergency": 0.1,
          "family_medicine": 0.2
        }
      },
      {
        id: 30,
        text: "Tenho interesse em medicina de emergência e trauma",
        weights: {
          "emergency": 0.9,
          "surgery": 0.8,
          "anesthesiology": 0.6,
          "cardiology": 0.5,
          "dermatology": 0.1,
          "psychiatry": 0.2,
          "pathology": 0.1
        }
      },
      {
        id: 31,
        text: "Prefiro trabalhar com exames diagnósticos e interpretação",
        weights: {
          "radiology": 0.9,
          "pathology": 0.8,
          "cardiology": 0.6,
          "internal_medicine": 0.6,
          "emergency": 0.3,
          "psychiatry": 0.3,
          "dermatology": 0.5
        }
      },
      {
        id: 32,
        text: "Tenho interesse em cardiologia e sistema cardiovascular",
        weights: {
          "cardiology": 0.9,
          "surgery": 0.6,
          "internal_medicine": 0.7,
          "emergency": 0.5,
          "psychiatry": 0.1,
          "dermatology": 0.2,
          "radiology": 0.4
        }
      },
      {
        id: 33,
        text: "Prefiro trabalhar com cuidados paliativos e fim de vida",
        weights: {
          "oncology": 0.9,
          "internal_medicine": 0.7,
          "family_medicine": 0.6,
          "psychiatry": 0.6,
          "surgery": 0.2,
          "dermatology": 0.1,
          "emergency": 0.2
        }
      },
      {
        id: 34,
        text: "Tenho interesse em neurologia e sistema nervoso",
        weights: {
          "neurology": 0.9,
          "psychiatry": 0.6,
          "internal_medicine": 0.6,
          "radiology": 0.5,
          "surgery": 0.4,
          "emergency": 0.3,
          "pathology": 0.4
        }
      },
      {
        id: 35,
        text: "Prefiro trabalhar com medicina laboratorial",
        weights: {
          "pathology": 0.9,
          "internal_medicine": 0.5,
          "radiology": 0.4,
          "family_medicine": 0.3,
          "psychiatry": 0.2,
          "surgery": 0.2,
          "emergency": 0.2
        }
      },
      {
        id: 36,
        text: "Tenho interesse em genética e medicina molecular",
        weights: {
          "pathology": 0.8,
          "internal_medicine": 0.6,
          "pediatrics": 0.5,
          "oncology": 0.7,
          "surgery": 0.3,
          "psychiatry": 0.2,
          "emergency": 0.1
        }
      },
      {
        id: 37,
        text: "Prefiro trabalhar com reabilitação e fisioterapia",
        weights: {
          "orthopedics": 0.8,
          "neurology": 0.7,
          "family_medicine": 0.5,
          "internal_medicine": 0.4,
          "surgery": 0.6,
          "emergency": 0.2,
          "psychiatry": 0.3
        }
      },
      {
        id: 38,
        text: "Tenho interesse em medicina esportiva",
        weights: {
          "orthopedics": 0.9,
          "family_medicine": 0.6,
          "emergency": 0.5,
          "cardiology": 0.4,
          "psychiatry": 0.2,
          "pathology": 0.1,
          "dermatology": 0.2
        }
      },
      {
        id: 39,
        text: "Prefiro trabalhar com idosos e geriatria",
        weights: {
          "internal_medicine": 0.8,
          "family_medicine": 0.8,
          "cardiology": 0.6,
          "neurology": 0.6,
          "pediatrics": 0.1,
          "surgery": 0.3,
          "psychiatry": 0.5
        }
      },
      {
        id: 40,
        text: "Tenho interesse em medicina tropical e infectologia",
        weights: {
          "internal_medicine": 0.8,
          "family_medicine": 0.6,
          "emergency": 0.5,
          "pediatrics": 0.5,
          "pathology": 0.4,
          "surgery": 0.2,
          "psychiatry": 0.1
        }
      },
      {
        id: 41,
        text: "Prefiro trabalhar com medicina de família e comunidade",
        weights: {
          "family_medicine": 0.9,
          "pediatrics": 0.6,
          "internal_medicine": 0.5,
          "psychiatry": 0.4,
          "surgery": 0.2,
          "radiology": 0.1,
          "pathology": 0.1
        }
      },
      {
        id: 42,
        text: "Tenho interesse em pesquisa e desenvolvimento científico",
        weights: {
          "pathology": 0.8,
          "internal_medicine": 0.7,
          "radiology": 0.6,
          "oncology": 0.7,
          "family_medicine": 0.3,
          "emergency": 0.2,
          "dermatology": 0.4
        }
      },
      {
        id: 43,
        text: "Prefiro trabalhar com medicina alternativa e integrativa",
        weights: {
          "family_medicine": 0.7,
          "psychiatry": 0.6,
          "internal_medicine": 0.4,
          "pediatrics": 0.4,
          "surgery": 0.1,
          "emergency": 0.1,
          "radiology": 0.2
        }
      },
      {
        id: 44,
        text: "Tenho interesse em anestesiologia e controle da dor",
        weights: {
          "anesthesiology": 0.9,
          "surgery": 0.6,
          "emergency": 0.4,
          "internal_medicine": 0.3,
          "psychiatry": 0.3,
          "family_medicine": 0.2,
          "radiology": 0.2
        }
      }
    ]
  },
  lifestyle: {
    title: "Estilo de Vida",
    icon: Clock,
    description: "Avalie como diferentes especialidades se encaixam no seu estilo de vida",
    questions: [
      {
        id: 45,
        text: "Estou disposto(a) a trabalhar plantões noturnos regularmente",
        weights: {
          "emergency": 0.9,
          "surgery": 0.7,
          "anesthesiology": 0.8,
          "cardiology": 0.6,
          "dermatology": 0.1,
          "psychiatry": 0.2,
          "family_medicine": 0.3
        }
      },
      {
        id: 46,
        text: "Prefiro um horário de trabalho mais previsível (9h-17h)",
        weights: {
          "dermatology": 0.9,
          "psychiatry": 0.8,
          "radiology": 0.8,
          "pathology": 0.9,
          "emergency": 0.1,
          "surgery": 0.2,
          "cardiology": 0.3
        }
      },
      {
        id: 47,
        text: "O equilíbrio trabalho-vida pessoal é muito importante para mim",
        weights: {
          "dermatology": 0.9,
          "psychiatry": 0.7,
          "family_medicine": 0.6,
          "radiology": 0.8,
          "emergency": 0.2,
          "surgery": 0.3,
          "cardiology": 0.4
        }
      },
      {
        id: 48,
        text: "Estou disposto(a) a dedicar muitos anos de especialização",
        weights: {
          "surgery": 0.9,
          "cardiology": 0.8,
          "internal_medicine": 0.7,
          "radiology": 0.7,
          "family_medicine": 0.4,
          "emergency": 0.5,
          "psychiatry": 0.6
        }
      },
      {
        id: 49,
        text: "A remuneração é um fator muito importante na minha escolha",
        weights: {
          "surgery": 0.8,
          "dermatology": 0.9,
          "cardiology": 0.8,
          "radiology": 0.7,
          "family_medicine": 0.3,
          "pediatrics": 0.4,
          "psychiatry": 0.5
        }
      },
      {
        id: 50,
        text: "Prefiro trabalhar em consultório próprio",
        weights: {
          "dermatology": 0.9,
          "psychiatry": 0.8,
          "family_medicine": 0.7,
          "cardiology": 0.6,
          "emergency": 0.1,
          "surgery": 0.3,
          "radiology": 0.4
        }
      },
      {
        id: 51,
        text: "Estou confortável trabalhando em hospitais grandes",
        weights: {
          "surgery": 0.8,
          "emergency": 0.9,
          "cardiology": 0.7,
          "internal_medicine": 0.7,
          "dermatology": 0.2,
          "family_medicine": 0.3,
          "psychiatry": 0.4
        }
      },
      {
        id: 52,
        text: "Prefiro trabalhar com agendamento flexível",
        weights: {
          "psychiatry": 0.8,
          "dermatology": 0.7,
          "family_medicine": 0.6,
          "radiology": 0.5,
          "emergency": 0.2,
          "surgery": 0.2,
          "anesthesiology": 0.3
        }
      },
      {
        id: 53,
        text: "Estou disposto(a) a viajar frequentemente para congressos",
        weights: {
          "surgery": 0.7,
          "cardiology": 0.7,
          "internal_medicine": 0.6,
          "radiology": 0.6,
          "family_medicine": 0.3,
          "psychiatry": 0.4,
          "emergency": 0.4
        }
      },
      {
        id: 54,
        text: "Prefiro um ambiente de trabalho calmo e silencioso",
        weights: {
          "radiology": 0.9,
          "pathology": 0.9,
          "psychiatry": 0.7,
          "dermatology": 0.6,
          "emergency": 0.1,
          "surgery": 0.2,
          "pediatrics": 0.2
        }
      },
      {
        id: 55,
        text: "Estou confortável com a responsabilidade de decisões vitais",
        weights: {
          "surgery": 0.9,
          "emergency": 0.9,
          "cardiology": 0.8,
          "anesthesiology": 0.8,
          "dermatology": 0.3,
          "psychiatry": 0.5,
          "radiology": 0.4
        }
      },
      {
        id: 56,
        text: "Prefiro trabalhar com protocolos bem estabelecidos",
        weights: {
          "anesthesiology": 0.8,
          "radiology": 0.7,
          "pathology": 0.8,
          "emergency": 0.6,
          "psychiatry": 0.4,
          "family_medicine": 0.5,
          "surgery": 0.6
        }
      },
      {
        id: 57,
        text: "Estou disposto(a) a trabalhar fins de semana regularmente",
        weights: {
          "emergency": 0.9,
          "surgery": 0.7,
          "cardiology": 0.6,
          "internal_medicine": 0.5,
          "dermatology": 0.2,
          "psychiatry": 0.3,
          "family_medicine": 0.4
        }
      },
      {
        id: 58,
        text: "Prefiro um trabalho com baixo nível de estresse",
        weights: {
          "dermatology": 0.8,
          "pathology": 0.8,
          "radiology": 0.7,
          "psychiatry": 0.6,
          "emergency": 0.1,
          "surgery": 0.2,
          "cardiology": 0.3
        }
      },
      {
        id: 59,
        text: "Estou confortável com educação médica continuada intensiva",
        weights: {
          "surgery": 0.8,
          "cardiology": 0.8,
          "internal_medicine": 0.7,
          "radiology": 0.7,
          "pathology": 0.6,
          "family_medicine": 0.5,
          "emergency": 0.6
        }
      },
      {
        id: 60,
        text: "Prefiro trabalhar com tecnologia em constante evolução",
        weights: {
          "radiology": 0.9,
          "cardiology": 0.8,
          "surgery": 0.7,
          "anesthesiology": 0.6,
          "family_medicine": 0.3,
          "psychiatry": 0.3,
          "pathology": 0.4
        }
      },
      {
        id: 61,
        text: "Estou disposto(a) a assumir riscos calculados no trabalho",
        weights: {
          "surgery": 0.9,
          "emergency": 0.8,
          "cardiology": 0.7,
          "anesthesiology": 0.6,
          "dermatology": 0.2,
          "psychiatry": 0.3,
          "radiology": 0.3
        }
      },
      {
        id: 62,
        text: "Prefiro um ambiente de trabalho colaborativo",
        weights: {
          "surgery": 0.8,
          "emergency": 0.8,
          "pediatrics": 0.7,
          "cardiology": 0.6,
          "radiology": 0.3,
          "pathology": 0.2,
          "psychiatry": 0.5
        }
      },
      {
        id: 63,
        text: "Estou confortável trabalhando com prazos apertados",
        weights: {
          "emergency": 0.9,
          "surgery": 0.8,
          "cardiology": 0.6,
          "radiology": 0.5,
          "dermatology": 0.3,
          "psychiatry": 0.3,
          "family_medicine": 0.4
        }
      },
      {
        id: 64,
        text: "Prefiro estabilidade profissional e financeira",
        weights: {
          "dermatology": 0.8,
          "radiology": 0.7,
          "pathology": 0.7,
          "anesthesiology": 0.6,
          "emergency": 0.4,
          "surgery": 0.5,
          "family_medicine": 0.6
        }
      },
      {
        id: 65,
        text: "Estou disposto(a) a trabalhar em múltiplos locais",
        weights: {
          "anesthesiology": 0.8,
          "emergency": 0.7,
          "radiology": 0.6,
          "family_medicine": 0.5,
          "dermatology": 0.3,
          "pathology": 0.2,
          "psychiatry": 0.4
        }
      },
      {
        id: 66,
        text: "Prefiro um trabalho com resultados mensuráveis",
        weights: {
          "surgery": 0.8,
          "cardiology": 0.7,
          "dermatology": 0.7,
          "radiology": 0.6,
          "psychiatry": 0.3,
          "family_medicine": 0.4,
          "pathology": 0.5
        }
      }
    ]
  },
  values: {
    title: "Valores e Motivações",
    icon: Target,
    description: "Descubra suas motivações profissionais e valores pessoais",
    questions: [
      {
        id: 67,
        text: "Valorizo mais ajudar pessoas em situações críticas",
        weights: {
          "emergency": 0.9,
          "surgery": 0.8,
          "cardiology": 0.7,
          "oncology": 0.8,
          "dermatology": 0.2,
          "psychiatry": 0.6,
          "radiology": 0.3
        }
      },
      {
        id: 68,
        text: "Prefiro contribuir para o avanço científico da medicina",
        weights: {
          "pathology": 0.9,
          "internal_medicine": 0.8,
          "radiology": 0.7,
          "oncology": 0.8,
          "family_medicine": 0.4,
          "emergency": 0.3,
          "dermatology": 0.5
        }
      },
      {
        id: 69,
        text: "Valorizo o contato humano e relacionamentos duradouros",
        weights: {
          "family_medicine": 0.9,
          "psychiatry": 0.9,
          "pediatrics": 0.8,
          "internal_medicine": 0.6,
          "radiology": 0.2,
          "pathology": 0.1,
          "anesthesiology": 0.3
        }
      },
      {
        id: 70,
        text: "Prefiro trabalhar com precisão técnica e expertise",
        weights: {
          "surgery": 0.9,
          "radiology": 0.8,
          "pathology": 0.8,
          "anesthesiology": 0.7,
          "family_medicine": 0.4,
          "psychiatry": 0.4,
          "emergency": 0.5
        }
      },
      {
        id: 71,
        text: "Valorizo a autonomia e independência profissional",
        weights: {
          "dermatology": 0.8,
          "psychiatry": 0.8,
          "radiology": 0.7,
          "pathology": 0.7,
          "family_medicine": 0.6,
          "emergency": 0.2,
          "surgery": 0.4
        }
      },
      {
        id: 72,
        text: "Prefiro trabalhar em equipe multidisciplinar",
        weights: {
          "surgery": 0.8,
          "emergency": 0.8,
          "cardiology": 0.7,
          "oncology": 0.7,
          "radiology": 0.4,
          "pathology": 0.3,
          "dermatology": 0.4
        }
      },
      {
        id: 73,
        text: "Valorizo o reconhecimento profissional e prestígio",
        weights: {
          "surgery": 0.8,
          "cardiology": 0.8,
          "dermatology": 0.7,
          "radiology": 0.6,
          "family_medicine": 0.3,
          "psychiatry": 0.4,
          "pathology": 0.4
        }
      },
      {
        id: 74,
        text: "Prefiro fazer a diferença na comunidade local",
        weights: {
          "family_medicine": 0.9,
          "pediatrics": 0.7,
          "emergency": 0.6,
          "psychiatry": 0.6,
          "surgery": 0.4,
          "radiology": 0.2,
          "pathology": 0.2
        }
      },
      {
        id: 75,
        text: "Valorizo a inovação e uso de novas tecnologias",
        weights: {
          "radiology": 0.9,
          "surgery": 0.8,
          "cardiology": 0.8,
          "anesthesiology": 0.6,
          "family_medicine": 0.3,
          "psychiatry": 0.3,
          "pathology": 0.5
        }
      },
      {
        id: 76,
        text: "Prefiro ensinar e mentorear outros profissionais",
        weights: {
          "internal_medicine": 0.8,
          "surgery": 0.7,
          "family_medicine": 0.7,
          "pathology": 0.6,
          "emergency": 0.5,
          "dermatology": 0.4,
          "psychiatry": 0.6
        }
      },
      {
        id: 77,
        text: "Valorizo a capacidade de salvar vidas imediatamente",
        weights: {
          "emergency": 0.9,
          "surgery": 0.8,
          "cardiology": 0.8,
          "anesthesiology": 0.7,
          "dermatology": 0.1,
          "psychiatry": 0.3,
          "radiology": 0.2
        }
      },
      {
        id: 78,
        text: "Prefiro trabalhar com prevenção de doenças",
        weights: {
          "family_medicine": 0.9,
          "pediatrics": 0.8,
          "internal_medicine": 0.7,
          "psychiatry": 0.6,
          "surgery": 0.2,
          "emergency": 0.2,
          "radiology": 0.3
        }
      },
      {
        id: 79,
        text: "Valorizo a possibilidade de trabalho internacional",
        weights: {
          "surgery": 0.7,
          "emergency": 0.6,
          "radiology": 0.6,
          "pathology": 0.5,
          "family_medicine": 0.4,
          "psychiatry": 0.3,
          "dermatology": 0.4
        }
      },
      {
        id: 80,
        text: "Prefiro resolver problemas complexos e desafiadores",
        weights: {
          "internal_medicine": 0.9,
          "pathology": 0.8,
          "surgery": 0.7,
          "radiology": 0.7,
          "family_medicine": 0.5,
          "emergency": 0.6,
          "psychiatry": 0.7
        }
      },
      {
        id: 81,
        text: "Valorizo a estabilidade emocional no trabalho",
        weights: {
          "dermatology": 0.8,
          "radiology": 0.8,
          "pathology": 0.7,
          "family_medicine": 0.6,
          "emergency": 0.2,
          "surgery": 0.3,
          "psychiatry": 0.4
        }
      },
      {
        id: 82,
        text: "Prefiro trabalhar com casos únicos e raros",
        weights: {
          "pathology": 0.9,
          "internal_medicine": 0.8,
          "radiology": 0.7,
          "surgery": 0.6,
          "family_medicine": 0.3,
          "emergency": 0.4,
          "dermatology": 0.5
        }
      },
      {
        id: 83,
        text: "Valorizo o impacto social do meu trabalho",
        weights: {
          "family_medicine": 0.9,
          "psychiatry": 0.8,
          "pediatrics": 0.8,
          "emergency": 0.6,
          "surgery": 0.4,
          "radiology": 0.3,
          "pathology": 0.2
        }
      },
      {
        id: 84,
        text: "Prefiro trabalhar com evidências científicas sólidas",
        weights: {
          "pathology": 0.9,
          "radiology": 0.8,
          "internal_medicine": 0.8,
          "cardiology": 0.7,
          "surgery": 0.6,
          "family_medicine": 0.5,
          "psychiatry": 0.4
        }
      },
      {
        id: 85,
        text: "Valorizo a possibilidade de empreender na medicina",
        weights: {
          "dermatology": 0.9,
          "psychiatry": 0.7,
          "family_medicine": 0.6,
          "radiology": 0.5,
          "surgery": 0.4,
          "emergency": 0.2,
          "pathology": 0.3
        }
      },
      {
        id: 86,
        text: "Prefiro trabalhar com resultados de longo prazo",
        weights: {
          "psychiatry": 0.9,
          "internal_medicine": 0.8,
          "family_medicine": 0.7,
          "oncology": 0.7,
          "emergency": 0.2,
          "surgery": 0.4,
          "radiology": 0.4
        }
      },
      {
        id: 87,
        text: "Valorizo a qualidade de vida dos pacientes",
        weights: {
          "family_medicine": 0.9,
          "psychiatry": 0.8,
          "oncology": 0.8,
          "internal_medicine": 0.7,
          "dermatology": 0.6,
          "surgery": 0.5,
          "emergency": 0.4
        }
      },
      {
        id: 88,
        text: "Prefiro trabalhar com alta tecnologia diagnóstica",
        weights: {
          "radiology": 0.9,
          "cardiology": 0.8,
          "pathology": 0.6,
          "surgery": 0.5,
          "family_medicine": 0.3,
          "psychiatry": 0.2,
          "emergency": 0.4
        }
      },
      {
        id: 89,
        text: "Valorizo a possibilidade de pesquisa clínica",
        weights: {
          "oncology": 0.9,
          "internal_medicine": 0.8,
          "pathology": 0.8,
          "cardiology": 0.7,
          "family_medicine": 0.4,
          "emergency": 0.3,
          "psychiatry": 0.5
        }
      },
      {
        id: 90,
        text: "Prefiro trabalhar salvando vidas de forma direta",
        weights: {
          "emergency": 0.9,
          "surgery": 0.9,
          "cardiology": 0.8,
          "anesthesiology": 0.7,
          "dermatology": 0.2,
          "psychiatry": 0.4,
          "radiology": 0.3
        }
      }
    ]
  }
};

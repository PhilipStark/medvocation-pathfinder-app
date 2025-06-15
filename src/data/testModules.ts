
import { 
  Brain, 
  Heart, 
  Clock
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
      }
    ]
  },
  interests: {
    title: "Interesses Profissionais",
    icon: Heart,
    description: "Identifique suas áreas de interesse na medicina",
    questions: [
      {
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
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
      }
    ]
  },
  lifestyle: {
    title: "Estilo de Vida",
    icon: Clock,
    description: "Avalie como diferentes especialidades se encaixam no seu estilo de vida",
    questions: [
      {
        id: 11,
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
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
      }
    ]
  }
};

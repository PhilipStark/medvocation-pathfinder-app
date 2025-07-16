import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get test results from database
    const { data: testResult, error } = await supabase
      .from('test_results')
      .select('responses, scores')
      .eq('id', sessionId)
      .single();

    if (error || !testResult) {
      throw new Error('Resultado do teste não encontrado');
    }

    const { responses, scores } = testResult;

    // Prepare data for OpenAI analysis
    const analysisPrompt = `
Você é um especialista em orientação vocacional médica. Analise os seguintes resultados de um teste vocacional para medicina:

PONTUAÇÕES POR ESPECIALIDADE:
${Object.entries(scores).map(([specialty, score]) => 
  `${specialty}: ${score} pontos`
).join('\n')}

PERFIL DE RESPOSTAS:
${Object.entries(responses).slice(0, 10).map(([questionId, answer]) => 
  `Questão ${questionId}: ${answer}/5`
).join('\n')}

Por favor, forneça uma análise detalhada incluindo:

1. **Especialidades Recomendadas** (top 3):
   - Explique por que essas especialidades se alinham com o perfil
   - Destaque pontos fortes específicos

2. **Características do Perfil Profissional**:
   - Habilidades e interesses identificados
   - Estilo de trabalho preferido
   - Ambiente de trabalho ideal

3. **Considerações Importantes**:
   - Aspectos a desenvolver
   - Desafios potenciais
   - Sugestões de experiências práticas

4. **Próximos Passos**:
   - Ações concretas para explorar as especialidades
   - Recursos de aprendizado recomendados

Mantenha a análise profissional, encorajadora e prática. Limite a resposta a aproximadamente 800 palavras.
`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um especialista em orientação vocacional médica com mais de 15 anos de experiência. Suas análises são precisas, empáticas e orientadas para ação.' 
          },
          { role: 'user', content: analysisPrompt }
        ],
        max_tokens: 1200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Save analysis back to database
    await supabase
      .from('test_results')
      .update({ 
        ai_analysis: analysis,
        analysis_generated_at: new Date().toISOString()
      })
      .eq('id', sessionId);

    return new Response(JSON.stringify({ 
      success: true,
      analysis: analysis 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-results function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
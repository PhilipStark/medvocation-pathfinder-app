
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PurchaseConfirmationRequest {
  email: string;
  name: string;
  sessionId: string;
  amount: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, sessionId, amount }: PurchaseConfirmationRequest = await req.json();

    const formattedAmount = (amount / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const resultsUrl = `${Deno.env.get("SITE_URL") || "https://medvocation.com"}/results/${sessionId}`;

    const emailResponse = await resend.emails.send({
      from: "MedVocation <noreply@medvocation.com>",
      to: [email],
      subject: "🎉 Pagamento confirmado! Seu relatório está disponível",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; margin-bottom: 10px;">Pagamento Confirmado! 🎉</h1>
            <p style="color: #64748b; font-size: 16px;">Seu Relatório Vocacional Completo está pronto</p>
          </div>
          
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #065f46; margin-top: 0;">Olá, ${name}! ✅</h2>
            <p style="color: #374151; line-height: 1.6;">
              Recebemos o pagamento de <strong>${formattedAmount}</strong> com sucesso!
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Seu Relatório Vocacional Completo já foi desbloqueado e está disponível para acesso.
            </p>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #1e40af;">Seu relatório inclui:</h3>
            <ul style="color: #374151; line-height: 1.8;">
              <li>🎯 Análise completa das suas Top 5 especialidades</li>
              <li>👤 Perfil detalhado de personalidade</li>
              <li>📈 Gráficos e visualizações dos seus resultados</li>
              <li>🗺️ Plano de carreira personalizado</li>
              <li>📄 Download em PDF para guardar</li>
            </ul>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${resultsUrl}" 
               style="background: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Acessar Meu Relatório Completo
            </a>
          </div>

          <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="color: #374151; font-size: 14px; margin: 0;">
              💡 <strong>Dica:</strong> Salve este email! O link acima permite acesso permanente ao seu relatório.
            </p>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; color: #64748b; font-size: 14px;">
            <p>Alguma dúvida sobre seu relatório? Responda este email que nossa equipe te ajudará.</p>
            <p style="margin-bottom: 0;">
              Obrigado por escolher o MedVocation!<br>
              <strong>Equipe MedVocation</strong>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Purchase confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending purchase confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

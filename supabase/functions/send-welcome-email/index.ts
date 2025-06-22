
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name }: WelcomeEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "MedVocation <noreply@medvocation.com>",
      to: [email],
      subject: "Bem-vindo(a) ao MedVocation! 🩺",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e40af; margin-bottom: 10px;">Bem-vindo(a) ao MedVocation!</h1>
            <p style="color: #64748b; font-size: 16px;">Sua jornada vocacional na medicina começa aqui</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin-top: 0;">Olá, ${name}! 👋</h2>
            <p style="color: #374151; line-height: 1.6;">
              É um prazer tê-lo(a) conosco! Você acabou de dar um passo importante na sua carreira médica.
            </p>
            <p style="color: #374151; line-height: 1.6;">
              O MedVocation foi criado para ajudar estudantes e profissionais de medicina a descobrirem 
              sua especialidade ideal através de um teste vocacional científico e personalizado.
            </p>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #1e40af;">O que você pode fazer agora:</h3>
            <ul style="color: #374151; line-height: 1.8;">
              <li>✅ Fazer seu teste vocacional completo (90 perguntas)</li>
              <li>🎯 Descobrir suas especialidades com maior compatibilidade</li>
              <li>📋 Obter um relatório detalhado do seu perfil</li>
              <li>📚 Explorar informações sobre todas as especialidades médicas</li>
            </ul>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${Deno.env.get("SITE_URL") || "https://medvocation.com"}/test" 
               style="background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Fazer Meu Teste Vocacional
            </a>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; color: #64748b; font-size: 14px;">
            <p>Precisa de ajuda? Responda este email que retornaremos em breve.</p>
            <p style="margin-bottom: 0;">
              Atenciosamente,<br>
              <strong>Equipe MedVocation</strong>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
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

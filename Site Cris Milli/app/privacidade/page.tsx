import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | Cris Milli 30.180",
  description: "Saiba como os dados pessoais são tratados nos canais digitais da campanha de Cris Milli.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <Link className="brand-logo" href="/">
          <img src="/logo-cris-milli-horizontal.png" alt="Cris Milli 30.180 — Deputada Estadual pelo Partido Novo" />
        </Link>
        <Link href="/">Voltar ao site</Link>
      </header>
      <article className="privacy-content">
        <p className="eyebrow">Transparência e respeito</p>
        <h1>Política de Privacidade</h1>
        <p>Esta política explica, em linguagem clara, como os dados pessoais informados nos canais digitais da campanha de Cris Milli podem ser coletados, utilizados, armazenados e protegidos.</p>

        <div className="privacy-alert"><strong>Documento em preparação.</strong><br />Antes da publicação oficial, a equipe deverá preencher o controlador dos dados, o canal de privacidade, os operadores utilizados e a data de vigência.</div>

        <h2>1. Quais dados podem ser coletados</h2>
        <p>Os formulários do site podem solicitar nome, número de WhatsApp, cidade, bairro, interesse em voluntariado, disponibilidade e informações sobre como a pessoa deseja ajudar. Quando tecnicamente configurado, também poderão ser registrados data, hora, origem do cadastro e versão do consentimento.</p>

        <h2>2. Para que os dados são utilizados</h2>
        <p>Os dados poderão ser utilizados para enviar informações, conteúdos, agenda, propostas, materiais e comunicações relacionadas à campanha; organizar apoiadores e voluntários; responder solicitações; e cumprir obrigações legais aplicáveis.</p>

        <h2>3. Base legal e consentimento</h2>
        <p>O envio de comunicações dependerá do consentimento livre e informado do titular, que não estará previamente marcado. Outras bases legais poderão ser utilizadas quando necessárias para o cumprimento de obrigação legal ou regulatória e para o exercício regular de direitos.</p>

        <h2>4. Compartilhamento e operadores</h2>
        <p>Os dados poderão ser tratados por fornecedores de tecnologia indispensáveis ao funcionamento dos formulários, armazenamento, comunicação e segurança. A lista de operadores será incluída após a definição das ferramentas oficiais da campanha. Os dados não serão vendidos.</p>

        <h2>5. Armazenamento e retenção</h2>
        <p>Os dados serão mantidos pelo período necessário para as finalidades informadas e para o cumprimento das obrigações legais aplicáveis, com medidas técnicas e administrativas razoáveis de proteção.</p>

        <h2>6. Direitos do titular</h2>
        <p>Nos termos da LGPD, o titular poderá solicitar confirmação do tratamento, acesso, correção, informação sobre compartilhamento, portabilidade quando aplicável, anonimização, bloqueio, eliminação, revogação do consentimento e descadastro das comunicações.</p>

        <h2>7. Cookies e medição</h2>
        <p>O site não deve ativar cookies não essenciais, pixels de publicidade ou ferramentas de medição que dependam de consentimento antes de oferecer uma escolha real ao visitante. Quando essas ferramentas forem configuradas, esta política será atualizada e o controle adequado será disponibilizado.</p>

        <h2>8. Canal de contato</h2>
        <p><strong>Controlador dos dados:</strong> [PREENCHER COM DADO OFICIAL]</p>
        <p><strong>E-mail de privacidade:</strong> [PREENCHER COM E-MAIL OFICIAL]</p>
        <p><strong>Endereço, se necessário:</strong> [PREENCHER COM DADO OFICIAL]</p>

        <h2>9. Atualizações</h2>
        <p>Esta política poderá ser atualizada para refletir mudanças nos canais, ferramentas, práticas de tratamento ou obrigações legais. A data de vigência será informada após a validação final pela campanha.</p>
      </article>
    </main>
  );
}

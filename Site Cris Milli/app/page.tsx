"use client";

import { FormEvent, useEffect, useState, type CSSProperties } from "react";
import { ArchGallery } from "@/components/ui/arch-gallery";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/BBymRl0ZjVd5NJypAYS4I0?s=sw&p=i&mlu=4";

const links = [
  ["Início", "#inicio"],
  ["Conheça a Cris", "#historia"],
  ["Bandeiras", "#bandeiras"],
  ["Propostas", "#propostas"],
  ["Participe", "#participe"],
  ["Doação", "#doacao"],
] as const;

const timeline = [
  ["Infância no Paraná", "Primeiras experiências com vendas, dislexia e bullying.", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80"],
  ["Trabalho e empreendedorismo", "Cabeleireira, hotelaria, telebanco, fábrica, vendas e diferentes trabalhos.", "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"],
  ["Japão", "Vida, trabalho, ministério e empreendedorismo com uma loja de cosméticos.", "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=80"],
  ["Maternidade e recomeços", "Criação dos três filhos e reconstrução da vida.", "/cris-milli-trajetoria.webp"],
  ["São Francisco do Sul", "Chegada há 9 anos e abertura do salão.", "/sao-francisco-do-sul.webp"],
  ["Encontro das Estrelas", "Criação do movimento de fortalecimento feminino.", "/cris-por-perto-01.webp"],
  ["Método ESTRELA", "Mentoria, comunicação e acompanhamento de mulheres.", "/cris-por-perto-02.webp"],
  ["150 mulheres impactadas", "Uma rede construída antes da candidatura.", "/cris-por-perto-03.webp"],
  ["Política", "Partido Novo e presidência das Mulheres pelo Novo em São Francisco do Sul.", "/cris-por-perto-04.webp"],
  ["2026", "Candidatura a Deputada Estadual por Santa Catarina — 30.180.", "/cris-por-perto-05.webp"],
] as const;

const flags = [
  { number: "01", title: "Mulher e família", headline: "Uma mulher fortalecida transforma tudo ao redor.", text: "Saúde mental feminina, segurança da mulher, proteção eficaz e fortalecimento da estrutura familiar.", quote: "Quando você reconstrói uma mulher, você reconstrói uma família." },
  { number: "02", title: "Empreendedorismo e juventude", headline: "Quem quer trabalhar precisa encontrar caminhos, não barreiras.", text: "Crédito mais justo, incentivo a quem empreende e oportunidades para os jovens estudarem e trabalharem perto de casa.", quote: "" },
  { number: "03", title: "Mobilidade e infraestrutura", headline: "Desenvolvimento também é conseguir chegar e voltar para casa.", text: "Transporte mais funcional, educação mais próxima e infraestrutura que acompanhe o crescimento da região.", quote: "" },
] as const;

const proposals = [
  ["Mulher protegida e acolhida", "Fortalecer a rede estadual de proteção às mulheres e defender atendimento efetivo às vítimas de violência, com atenção a uma Delegacia da Mulher eficaz para São Francisco do Sul e região."],
  ["Saúde mental feminina", "Defender políticas estaduais que ampliem prevenção, acolhimento e acesso a cuidados de saúde mental para mulheres em situações de vulnerabilidade, violência e sobrecarga."],
  ["Mulher que empreende", "Ampliar acesso a capacitação, ambiente de negócios e crédito justo para mulheres que empreendem ou buscam autonomia financeira."],
  ["Oportunidade para a juventude", "Defender formação, qualificação e oportunidades para os jovens estudarem, trabalharem e construírem sua vida na própria região."],
  ["Educação mais perto", "Representar a demanda por acesso ao ensino médio próximo às comunidades, articulando Governo do Estado e órgãos responsáveis."],
  ["Mobilidade que funciona", "Cobrar e articular soluções entre Estado, municípios e órgãos responsáveis para quem precisa se deslocar todos os dias."],
  ["Desenvolvimento regional", "Defender um ambiente estadual favorável a quem trabalha, produz, gera emprego e empreende, com menos obstáculos desnecessários."],
] as const;

const campaignGalleryItems = [
  { image: { src: "/cris-por-perto-01.webp", alt: "Cris Milli ao lado de um morador durante visita à comunidade" } },
  { image: { src: "/cris-por-perto-02.webp", alt: "Cris Milli conversando com uma moradora" } },
  { image: { src: "/cris-por-perto-03.webp", alt: "Cris Milli sorrindo ao lado de moradores e uma bicicleta" } },
  { image: { src: "/cris-por-perto-04.webp", alt: "Cris Milli em encontro com um trabalhador local" } },
  { image: { src: "/cris-por-perto-05.webp", alt: "Cris Milli abraçada com um morador da comunidade" } },
  { image: { src: "/cris-por-perto-06.webp", alt: "Cris Milli durante visita de porta em porta" } },
  { image: { src: "/cris-por-perto-07.webp", alt: "Cris Milli ouvindo atentamente um morador" } },
];

function LeadForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");

    try {
      const response = await fetch("/api/participar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: String(formData.get("nome") ?? "").trim(),
          whatsapp: String(formData.get("whatsapp") ?? "").trim(),
          cidade: String(formData.get("cidade") ?? "").trim(),
          bairro: String(formData.get("bairro") ?? "").trim(),
          consentimento: formData.get("consentimento") === "on",
        }),
      });

      if (!response.ok) throw new Error("Não foi possível registrar o cadastro.");

      setStatus("sent");
      window.dispatchEvent(new CustomEvent(compact ? "form_submit_final" : "form_submit_topo"));
      window.location.assign(WHATSAPP_GROUP_URL);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="success-mark">✓</span>
        <h3>Cadastro enviado com sucesso!</h3>
        <p>Seus dados foram registrados. Agora, acesse o grupo oficial da Cris no WhatsApp.</p>
        <a className="button button-dark" href={WHATSAPP_GROUP_URL}>Acessar grupo do WhatsApp</a>
      </div>
    );
  }

  return (
    <form className={compact ? "lead-form compact" : "lead-form"} onSubmit={submit}>
      <label><span>Nome</span><input name="nome" autoComplete="name" placeholder="Seu nome" required /></label>
      <label><span>WhatsApp</span><input name="whatsapp" type="tel" inputMode="numeric" autoComplete="tel" placeholder="(47) 99999-9999" required /></label>
      <label><span>Cidade</span><input name="cidade" autoComplete="address-level2" placeholder="Sua cidade" required /></label>
      <label><span>Bairro</span><input name="bairro" autoComplete="address-level3" placeholder="Seu bairro" required /></label>
      <label className="consent">
        <input name="consentimento" type="checkbox" required />
        <span>Autorizo o tratamento dos meus dados para receber comunicações da campanha, de acordo com a <a href="/privacidade">Política de Privacidade</a>.</span>
      </label>
      {status === "error" && <p className="form-error" role="alert">Não foi possível enviar agora. Confira os dados e tente novamente.</p>}
      <button className="button button-dark" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Enviando..." : "Enviar e acessar o grupo"} <span aria-hidden="true">→</span></button>
      <small>Seus dados serão tratados com respeito e responsabilidade.</small>
    </form>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>([
      ".join-copy",
      ".lead-form",
      ".story-photo",
      ".story-copy",
      ".section-intro",
      ".calling-content",
      ".role-card",
      ".proximity-copy",
      ".campaign-gallery",
      ".gallery-note",
      ".roots-photo",
      ".roots-copy",
      ".donation-section > *",
      ".social-section > *",
      ".final-copy",
    ].join(",")));

    const cardGroups = [
      ".timeline article",
      ".flag-card",
      ".proposal-list details",
      ".stats-grid article",
      ".participation-grid > article",
    ];
    const cardTargets: HTMLElement[] = [];

    cardGroups.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add("reveal-card");
        element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
        cardTargets.push(element);
      });
    });

    revealTargets.forEach((element) => element.classList.add("scroll-reveal"));
    const targets = [...revealTargets, ...cardTargets];
    document.body.classList.add("motion-ready");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    targets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.body.classList.remove("motion-ready");
    };
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand-logo" href="#inicio" aria-label="Cris Milli, início">
          <img src="/logo-cris-milli-horizontal.png" alt="Cris Milli 30.180 — Deputada Estadual pelo Partido Novo" />
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="button button-small" href="#participe" onClick={() => setMenuOpen(false)}>Acessar grupo do WhatsApp</a>
        </nav>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Uma candidatura por Santa Catarina</p>
          <h1 className="hero-statement">Eu não vim buscar a política.<br />A política veio até mim.</h1>
          <p className="hero-text">Uma mulher que recomeçou mais de uma vez, criou três filhos, empreendeu, trabalhou no Brasil e no Japão e há anos escuta e fortalece mulheres. Agora, Cris Milli quer levar essa mesma coragem, verdade e capacidade de servir para a Assembleia Legislativa de Santa Catarina.</p>
          <div className="hero-actions"><a className="button" href="#participe">Acessar grupo do WhatsApp</a><a className="text-link" href="#propostas">Conheça as propostas <span>↓</span></a></div>
          <p className="party-line">CRIS MILLI 30.180 · PARTIDO NOVO</p>
        </div>
        <div className="hero-portrait">
          <img className="hero-photo" src="/cris-milli-home.webp" alt="Retrato oficial de Cris Milli" />
          <div className="voice-badge">A voz feminina<br />que não vai se calar.</div>
        </div>
      </section>

      <section className="join-strip" id="participe">
        <div className="join-copy">
          <p className="eyebrow dark">Faça parte</p>
          <h2>Vem construir essa história com a gente.</h2>
          <p>Uma campanha cresce quando pessoas que acreditam nas mesmas ideias decidem caminhar juntas. Deixe seu contato, diga de onde você é e venha para a comunidade da Cris.</p>
          <div className="join-proof"><span><b>150</b> mulheres já impactadas</span><span><b>9</b> anos em São Francisco do Sul</span></div>
        </div>
        <LeadForm />
      </section>

      <section className="story-section" id="historia">
        <div className="story-photo">
          <img src="/cris-milli-trajetoria.webp" alt="Cris Milli sorrindo em um registro de sua trajetória" />
        </div>
        <div className="story-copy">
          <p className="eyebrow">Conheça a Cris</p>
          <h2>Antes de ser candidata, Cris já tinha uma história de luta.</h2>
          <p>Cris Milli nasceu em Capitão Leônidas Marques, no Paraná. Desde criança demonstrava uma característica que atravessaria toda a sua trajetória: vontade de trabalhar e encontrar caminhos. Vendia roupinhas de boneca, catálogos de cosméticos e produtos para ajudar e empreender.</p>
          <p>Na infância, enfrentou a dislexia e também episódios de bullying. Ao longo da vida, foi cabeleireira, recepcionista e coordenadora de eventos em hotéis, trabalhou com telebanco, em fábrica, vendeu pão e coxinha quando foi necessário, atuou como pastora e viveu e trabalhou no Japão, onde também empreendeu.</p>
          <p>Passou por um divórcio difícil e criou os três filhos — Mariáh, Hadassa e Kawa — praticamente sozinha. Há 9 anos, chegou a São Francisco do Sul buscando recomeço, proximidade com a família e qualidade de vida para os filhos. Na cidade, abriu seu salão e reconstruiu mais uma vez sua vida e seu trabalho.</p>
          <blockquote>Recomeçar não é uma frase de campanha para Cris Milli. É algo que ela viveu.</blockquote>
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-intro"><p className="eyebrow">Uma vida em movimento</p><h2>Trabalho, coragem e recomeços.</h2></div>
        <div className="timeline">
          {timeline.map(([title, text, image], index) => <article key={title} style={{ "--timeline-image": `url("${image}")` } as CSSProperties}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="calling-section">
        <div className="calling-content">
          <p className="eyebrow">Por que a política?</p>
          <h2>E então, a política veio até ela.</h2>
          <p>Durante anos, Cris ouviu mulheres dentro do salão, em encontros, mentorias, palestras e conversas. Ouviu histórias de medo, insegurança, falta de oportunidades, famílias em dificuldade, empreendedoras tentando sobreviver e jovens sem enxergar perspectiva perto de casa.</p>
          <p>Foi nesse contato cotidiano que percebeu que muitas dessas dores também dependiam de decisões públicas. A decisão nasceu da convicção de que uma voz acostumada a ouvir pessoas também precisava chegar aos lugares onde as decisões são tomadas.</p>
          <blockquote>“Não vim por ambição. Vim por chamado.”</blockquote>
          <div className="service-words"><span>Servir.</span><span>Ouvir.</span><span>Representar.</span><span>Fiscalizar.</span><span>Trabalhar.</span></div>
        </div>
        <aside className="role-card">
          <p className="eyebrow">Entenda o mandato</p>
          <h3>O que uma Deputada Estadual pode fazer por Santa Catarina?</h3>
          <p>Na Assembleia Legislativa, uma deputada estadual pode propor e votar leis estaduais, fiscalizar o Governo de Santa Catarina, acompanhar a aplicação do dinheiro público, participar da discussão do orçamento, apresentar demandas, buscar recursos e representar as necessidades das regiões catarinenses.</p>
          <p className="role-note">Defender • articular • fiscalizar • cobrar • propor • representar</p>
        </aside>
      </section>

      <section className="flags-section" id="bandeiras">
        <div className="section-intro wide"><p className="eyebrow">O que a Cris defende</p><h2>Três bandeiras. Uma mesma ideia: melhorar a vida real das pessoas.</h2></div>
        <div className="flag-grid">
          {flags.map((flag) => <article key={flag.number} className="flag-card"><span className="card-number">{flag.number}</span><p className="card-kicker">{flag.title}</p><h3>{flag.headline}</h3><p>{flag.text}</p>{flag.quote && <blockquote>“{flag.quote}”</blockquote>}</article>)}
        </div>
        <a className="button" href="#propostas">Conheça nossas prioridades</a>
      </section>

      <section className="proposals-section" id="propostas">
        <div className="section-intro"><p className="eyebrow">Propostas e compromissos</p><h2>Prioridades para uma atuação firme e responsável.</h2><p>Cris sabe o que cabe a uma Deputada Estadual: representar, propor, fiscalizar, cobrar e articular soluções junto aos órgãos responsáveis.</p></div>
        <div className="proposal-list">
          {proposals.map(([title, text], index) => <details key={title} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{title}<b>+</b></summary><p>{text}</p></details>)}
        </div>
      </section>

      <section className="proximity-section">
        <div className="proximity-copy">
          <p className="eyebrow">Uma candidata que conhece a vida real</p>
          <h2>Política se faz ouvindo.</h2>
          <p>Antes de pedir que alguém ouvisse sua voz, Cris passou anos ouvindo a voz das pessoas. O Encontro das Estrelas nasceu antes da candidatura e já alcançou 150 mulheres. Essa história mostra uma característica que Cris quer preservar na vida pública: proximidade.</p>
        </div>
        <div className="stats-grid"><article><b>150</b><span>mulheres impactadas</span></article><article><b>9</b><span>anos em São Francisco do Sul</span></article><article><b>3</b><span>filhos</span></article><article><b>30.180</b><span>Deputada Estadual</span></article></div>
      </section>

      <section className="gallery-section" aria-labelledby="gallery-title">
        <div className="section-intro wide">
          <p className="eyebrow">Cris por perto</p>
          <h2 id="gallery-title">Uma campanha feita de encontros reais.</h2>
          <p>Registros reais da Cris ouvindo, conversando e construindo essa caminhada ao lado das pessoas.</p>
        </div>
        <ArchGallery items={campaignGalleryItems} cardWidth={230} cardHeight={310} cornerRadius={18} className="campaign-gallery" />
        <p className="gallery-note">Gente de verdade. Conversas de verdade. Uma campanha feita por perto.</p>
      </section>

      <section className="roots-section">
        <div className="roots-photo">
          <img src="/sao-francisco-do-sul.webp" alt="Vista aérea do centro histórico de São Francisco do Sul, com o mar em primeiro plano" />
        </div>
        <div className="roots-copy"><p className="eyebrow">De onde vem essa voz</p><h2>Raízes em São Francisco do Sul. Compromisso com Santa Catarina.</h2><p>Foi em São Francisco do Sul que Cris reconstruiu sua vida, criou raízes, consolidou seu trabalho e encontrou uma comunidade que passou a fazer parte da sua história.</p><p>É da Praia do Ervino que nasce uma candidatura que quer representar famílias, mulheres, jovens, trabalhadores e empreendedores de todo o estado.</p><p>Cris conhece de perto as demandas do Litoral Norte e quer ser uma ponte entre as necessidades da região e a Assembleia Legislativa. Seu compromisso como Deputada Estadual é com toda Santa Catarina.</p></div>
      </section>

      <section className="participation-section">
        <div className="section-intro wide"><p className="eyebrow">Como participar</p><h2>Essa campanha não é feita sozinha.</h2><p>Você não precisa trabalhar com política para fazer diferença. Se acredita nessa história, existem várias formas de caminhar com a Cris.</p></div>
        <div className="participation-grid">
          <article><span>01</span><h3>Entrar para a comunidade</h3><p>Receba informações da campanha, agenda, propostas e materiais para compartilhar.</p><a className="text-button" href="#participe">Acessar grupo do WhatsApp</a></article>
          <article><span>02</span><h3>Ser voluntário</h3><p>Ajude presencialmente ou de forma digital, de acordo com sua disponibilidade e cidade.</p><details className="volunteer"><summary>Quero ser voluntário</summary><form onSubmit={(event) => { event.preventDefault(); alert("Interesse registrado nesta demonstração."); }}><input aria-label="Nome" placeholder="Nome" required/><input aria-label="WhatsApp" type="tel" inputMode="numeric" placeholder="WhatsApp" required/><input aria-label="Cidade" placeholder="Cidade" required/><textarea aria-label="Como gostaria de ajudar" placeholder="Como gostaria de ajudar?" required/><label><input type="checkbox" required/> Autorizo o tratamento dos meus dados.</label><button className="button button-dark" type="submit">Enviar interesse</button></form></details></article>
          <article><span>03</span><h3>Compartilhar a campanha</h3><p>Uma conversa, um Story ou uma mensagem pode apresentar a Cris para quem ainda não conhece sua história.</p><button className="text-button" disabled>Kit em configuração</button></article>
          <article><span>04</span><h3>Apresentar a Cris</h3><p>Quer ajudar a campanha a chegar a mais pessoas da sua cidade ou comunidade?</p><button className="text-button" disabled>Contato em configuração</button></article>
        </div>
      </section>

      <section className="donation-section" id="doacao">
        <div><p className="eyebrow">Doação eleitoral</p><h2>Quer ajudar a campanha a chegar mais longe?</h2><p>Campanha também é estrutura: deslocamentos, materiais, comunicação e organização. Quem acredita no projeto poderá contribuir exclusivamente pelo canal oficial da campanha.</p><button className="button button-light" type="button" disabled>Canal oficial em atualização</button></div>
        <p className="legal-note">As doações eleitorais devem seguir as regras da legislação eleitoral vigente. Utilize somente o canal oficial disponibilizado pela campanha.</p>
      </section>

      <section className="social-section"><p className="eyebrow">Redes sociais</p><h2>Acompanhe a Cris todos os dias.</h2><p>Os canais oficiais serão exibidos aqui assim que forem confirmados pela equipe.</p><div><button disabled>Instagram em configuração</button><button disabled>WhatsApp em configuração</button></div></section>

      <section className="final-cta">
        <div className="final-copy"><p>A política veio até mim.</p><h2>Agora, essa caminhada também pode contar com você.</h2><p>Se você acredita em uma política feita com verdade, trabalho, coragem e proximidade, venha conhecer mais de perto essa campanha.</p></div>
        <LeadForm compact />
      </section>

      <footer className="footer">
        <div><p>Deputada Estadual • Partido Novo • Santa Catarina</p></div>
        <nav aria-label="Links do rodapé"><a href="#historia">Conheça a Cris</a><a href="#propostas">Propostas</a><a href="#participe">Participe</a><a href="#doacao">Doação</a><a href="/privacidade">Política de Privacidade</a></nav>
        <p className="electoral-placeholder">Identificação eleitoral obrigatória: aguardando dados oficiais da campanha.</p>
      </footer>

      <a className="mobile-float" href="#participe">Acessar grupo do WhatsApp</a>
    </main>
  );
}

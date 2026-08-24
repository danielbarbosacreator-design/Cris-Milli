const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyqNymJNDvwxPiQ_MmkyRZd9IzyMIa6etnr-KZPXjOeokmJJYU_dmfxvahBwsT9iHCZEQ/exec";

type LeadPayload = {
  nome?: unknown;
  whatsapp?: unknown;
  cidade?: unknown;
  consentimento?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as LeadPayload;
    const payload = {
      nome: clean(body.nome, 100),
      whatsapp: clean(body.whatsapp, 30),
      cidade: clean(body.cidade, 100),
      consentimento: body.consentimento === true,
    };

    if (!payload.nome || !payload.whatsapp || !payload.cidade || !payload.consentimento) {
      return Response.json({ sucesso: false, mensagem: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }

    const sheetResponse = await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const responseText = await sheetResponse.text();
    let result: { sucesso?: boolean } = {};

    try {
      result = JSON.parse(responseText) as { sucesso?: boolean };
    } catch {
      result = {};
    }

    if (!sheetResponse.ok || result.sucesso !== true) {
      return Response.json({ sucesso: false, mensagem: "A planilha não confirmou o cadastro." }, { status: 502 });
    }

    return Response.json({ sucesso: true });
  } catch {
    return Response.json({ sucesso: false, mensagem: "Não foi possível processar o cadastro." }, { status: 500 });
  }
}

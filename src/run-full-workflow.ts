import { GroqProvider } from "./lib/ai/groq";

import { ContextAgent } from "../agents/context-agent/context-agent";

import { DiscoveryAgent } from "../agents/discovery-agent/discovery-agent";

import { ProductSpecAgent } from "../agents/product-spec-agent/product-spec-agent";

import { SddAgent } from "../agents/sdd-agent/sdd-agent";

import { ContextDocGenerator } from "./generators/context-doc-generator";

import { DiscoveryDocGenerator } from "./generators/discovery-doc-generator";

import { PrdDocGenerator } from "./generators/prd-doc-generator";

import { SddDocGenerator } from "./generators/sdd-doc-generator";

async function main() {
  try {
    const provider =
      new GroqProvider();

    const contextAgent =
      new ContextAgent(provider);

    const discoveryAgent =
      new DiscoveryAgent(provider);

    const productSpecAgent =
      new ProductSpecAgent(provider);

    const sddAgent =
      new SddAgent(provider);

    const contextDocGenerator =
      new ContextDocGenerator();

    const discoveryDocGenerator =
      new DiscoveryDocGenerator();

    const prdDocGenerator =
      new PrdDocGenerator();

    const sddDocGenerator =
      new SddDocGenerator();

    const rawInput = `
Estamos construindo uma funcionalidade de agendamento automatizado via WhatsApp para um consultório médico.

A plataforma deve:

permitir que pacientes realizem agendamentos diretamente pelo WhatsApp sem interação humana
identificar automaticamente o paciente pelo número de telefone
consultar disponibilidade de médicos e horários em tempo real
permitir seleção de especialidade, profissional, unidade e horário
confirmar consultas automaticamente pelo chat
enviar lembretes automáticos antes da consulta
permitir reagendamento e cancelamento via WhatsApp
responder dúvidas frequentes relacionadas a consultas, convênios, localização e horários de atendimento
integrar com o sistema atual de agenda/ERP/EMR do consultório
transferir o atendimento para um humano quando necessário
registrar histórico completo das conversas e agendamentos
suportar envio de documentos, exames e confirmações pelo WhatsApp
validar dados cadastrais do paciente durante o fluxo
oferecer experiência conversacional natural utilizando IA

Usuários principais:

pacientes
recepcionistas do consultório
médicos
equipe administrativa

Objetivos de negócio:

reduzir volume de atendimento manual da recepção
diminuir tempo de espera para agendamentos
aumentar taxa de conversão de consultas
reduzir faltas através de lembretes automáticos
disponibilizar atendimento 24/7
melhorar experiência do paciente
aumentar eficiência operacional da clínica
reduzir custos operacionais de atendimento
centralizar comunicação com pacientes no WhatsApp

Stakeholders:

equipe de Produto
equipe de Engenharia
equipe de Atendimento/Recepção
coordenação médica
equipe administrativa/financeira
equipe de Customer Success
diretoria da clínica

Funcionalidades principais:

fluxo guiado de agendamento conversacional
identificação automática do contexto do paciente
busca inteligente de horários disponíveis
confirmação automática de consultas
envio de protocolo e detalhes da consulta
lembretes automáticos configuráveis
reagendamento automático
cancelamento automático
fila de espera para encaixes
handoff para atendente humano
integração com calendário médico
suporte a múltiplas especialidades
suporte a múltiplas unidades/clínicas
suporte a convênios e particular
coleta de feedback pós-consulta

Fluxos esperados:

novo agendamento
reagendamento
cancelamento
confirmação de consulta
consulta de horários disponíveis
dúvidas frequentes
atualização cadastral
transferência para humano
recuperação de agendamento existente

Requisitos técnicos:

integração com API oficial do WhatsApp Business
integração com sistema de agenda da clínica
sincronização em tempo real de disponibilidade
motor conversacional baseado em IA/NLP
armazenamento de histórico de conversas
arquitetura escalável para múltiplos atendimentos simultâneos
processamento assíncrono de mensagens
suporte multiusuário e multiunidade
painel administrativo para monitoramento
logs completos de atendimento
integração com CRM e prontuário eletrônico
suporte a notificações automáticas
fallback para atendimento humano

Requisitos de IA:

compreensão de linguagem natural em português
identificação de intenção do paciente
extração automática de informações relevantes
detecção de contexto da conversa
tratamento de ambiguidades
respostas humanizadas e objetivas
capacidade de retomada de contexto
aprendizado contínuo baseado nas interações

Dados necessários:

cadastro de pacientes
agenda de médicos
especialidades disponíveis
horários disponíveis
regras de convênio
duração das consultas
políticas de cancelamento
unidades e endereços
templates de mensagens

Métricas de sucesso:

taxa de agendamentos automatizados
redução de chamadas telefônicas
redução de tempo médio de atendimento
taxa de conclusão do fluxo
taxa de transferência para humano
taxa de faltas/no-show
satisfação do paciente
tempo médio para confirmação de consulta
volume de atendimentos simultâneos suportados

Restrições:

conformidade com LGPD
uso da API oficial do WhatsApp
proteção de dados sensíveis de saúde
alta disponibilidade do sistema
baixa latência nas respostas
confiabilidade na sincronização de agendas
rastreabilidade de alterações
autenticação segura de usuários
limite de envio de mensagens do WhatsApp
compatibilidade com sistemas legados da clínica

Riscos:

inconsistência de agenda entre sistemas
falhas na integração com WhatsApp
erros de interpretação da IA
conflitos de horários
resistência da equipe operacional
dependência de sistemas terceiros
indisponibilidade de APIs externas
vazamento de dados sensíveis

Possíveis integrações:

WhatsApp Business API
sistemas de prontuário eletrônico (EMR/EHR)
Google Calendar
plataformas de pagamento
CRM da clínica
ferramentas de BI e analytics
sistemas de convênio
plataformas de telemedicina

Experiência desejada:

fluxo rápido e intuitivo
linguagem natural e acolhedora
poucas etapas para concluir o agendamento
respostas rápidas
autonomia total do paciente
possibilidade de intervenção humana quando necessário
experiência semelhante a conversar com uma recepcionista real
`;

    console.log(
      "\n=== GENERATING CONTEXT ===\n"
    );

    const context =
      await contextAgent.execute(
        rawInput
      );

    contextDocGenerator.generate(
      context
    );

    console.log(
      "\n=== GENERATING DISCOVERY ===\n"
    );

    const discovery =
      await discoveryAgent.execute(
        context
      );

    discoveryDocGenerator.generate(
      discovery
    );

    console.log(
      "\n=== GENERATING PRODUCT SPEC ===\n"
    );

    const productSpec =
      await productSpecAgent.execute({
        context,
        discovery,
      });

    prdDocGenerator.generate(
      productSpec
    );

    console.log(
      "\n=== GENERATING SDD ===\n"
    );

    const sdd =
      await sddAgent.execute({
        context,
        discovery,
        productSpec,
      });

    sddDocGenerator.generate(
      sdd
    );

    console.log(
      "\n=== WORKFLOW COMPLETED ===\n"
    );
  } catch (error) {
    console.error(
      "\n=== WORKFLOW FAILED ===\n"
    );

    console.error(error);
  }
}

main();
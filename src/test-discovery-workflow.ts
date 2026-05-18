import { GroqProvider } from "./lib/ai/groq";

import { ContextAgent } from "../agents/context-agent/context-agent";

import { DiscoveryAgent } from "../agents/discovery-agent/discovery-agent";

async function main() {
  try {
    const provider =
      new GroqProvider();

    const contextAgent =
      new ContextAgent(provider);

    const discoveryAgent =
      new DiscoveryAgent(provider);

    console.log(
      "\n=== GENERATING CONTEXT ===\n"
    );

    const context =
      await contextAgent.execute(`
We are building a subscription feature for an ecommerce platform.

Users should be able to subscribe to monthly deliveries.

The business goal is increasing recurring revenue and retention.

The checkout team and payments team are stakeholders.

The system must support recurring billing.

Users should be able to pause and cancel subscriptions.
`);

    console.log(
      "\n=== CONTEXT OUTPUT ===\n"
    );

    console.log(
      JSON.stringify(context, null, 2)
    );

    console.log(
      "\n=== GENERATING DISCOVERY ===\n"
    );

    const discovery =
      await discoveryAgent.execute(
        context
      );

    console.log(
      "\n=== DISCOVERY OUTPUT ===\n"
    );

    console.log(
      JSON.stringify(
        discovery,
        null,
        2
      )
    );
  } catch (error) {
    console.error(
      "\n=== WORKFLOW FAILED ===\n"
    );

    console.error(error);
  }
}

main();
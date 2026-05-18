import { ContextAgent } from "../agents/context-agent/context-agent";

import { GroqProvider } from "./lib/ai/groq";

async function main() {
  try {
    const provider =
      new GroqProvider();

    const agent =
      new ContextAgent(provider);

    const result =
      await agent.execute(`
We are building a subscription feature for an ecommerce platform.

Users should be able to subscribe to monthly deliveries.

The business goal is increasing recurring revenue and retention.

The checkout team and payments team are stakeholders.

The system must support recurring billing.
`);

    console.log(
      "\n=== FINAL OUTPUT ===\n"
    );

    console.log(
      JSON.stringify(result, null, 2)
    );
  } catch (error) {
    console.error(
      "\n=== TEST FAILED ===\n"
    );

    console.error(error);
  }
}

main();
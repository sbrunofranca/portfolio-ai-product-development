import fs from "fs";

export class MarkdownGenerator {
  generateDocument(
    title: string,
    content: string,
    outputPath: string
  ) {
    const markdown = `# ${title}

${content}
`;

    fs.writeFileSync(
      outputPath,
      markdown
    );

    console.log(
      `[MarkdownGenerator] Document generated at ${outputPath}`
    );
  }

  generateList(
    title: string,
    items: string[]
  ): string {
    return `
## ${title}

${items
  .map((item) => `- ${item}`)
  .join("\n")}
`;
  }
}
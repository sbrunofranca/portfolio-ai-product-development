export interface AIProvider {
  generate(prompt: string, system?: string): Promise<string>;
}
export interface Workflow {
  id: number;
  name: string;
  processor: string;
  inputPath: string;
  outputPath: string;
  frequency: number;
}

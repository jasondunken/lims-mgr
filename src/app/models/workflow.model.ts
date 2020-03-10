export interface Workflow {
  id: string;
  name: string;
  processor_name: string;
  input_path: string;
  output_path: string;
  interval: number;
}

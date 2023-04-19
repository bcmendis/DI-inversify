export interface ApiManagerInterface {
  fetchData(): Promise<string | null>;
}

export interface OracleResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

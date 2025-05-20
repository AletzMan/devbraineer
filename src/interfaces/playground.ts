export interface IOutputRunCode {
    language: string;
    version: string;
    run: IOutputRun;
}

export interface IResponseOutputRunCode {
    error: boolean;
    response: IOutputRunCode | null;
}

export interface IOutputRun {
    stdout: string;
    stderr: string;
    code: number;
    signal: unknown;
    output: string;
}

import { IResponseOutputRunCode } from "@/interfaces/playground"

const URL_API = process.env.NEXT_PUBLIC_URL_API
export const RunCode = async (language: string, sourceCode: string, version: string, stdin: string): Promise<IResponseOutputRunCode> => {
    try {
        const response = await fetch(`${URL_API}/api/runcode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language,
                sourceCode,
                version,
                stdin
            })
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        }

        if (response.status === 400) {
            return {
                error: true,
                response: {
                    language: "",
                    version: "",
                    run: {
                        stdout: data.message,
                        stderr: "",
                        code: 0,
                        signal: null,
                        output: data.message
                    }
                }
            };
        }

        return data;

    } catch (error) {
        return {
            error: true,
            response: null
        };
    }
};

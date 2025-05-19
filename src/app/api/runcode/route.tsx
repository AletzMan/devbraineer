import { BadRequestError, ServerError } from "../_services/errors"
import { SuccessResponse } from "../_services/successfulResponses"

const URL_API_PISTON = "https://emkc.org/api/v2/piston/execute"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { language, sourceCode, version, stdin } = body;

        console.log(language, sourceCode, version, stdin);

        const response = await fetch(`${URL_API_PISTON}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language,
                version,
                files: [
                    {
                        content: sourceCode,
                    },
                ],
                stdin,
                compile_timeout: 10000,
                run_timeout: 3000,
            }),
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 400) {
            return BadRequestError(data.message);
        }

        return SuccessResponse(data);
    } catch (error) {
        console.log(error);
        return ServerError();
    }
}

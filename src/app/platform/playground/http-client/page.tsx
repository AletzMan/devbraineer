export default function HttpClientPage() {
    return (
        <div className="p-6 space-y-6">
            <header className="text-center">
                <h1 className="text-3xl font-bold">HTTP Client</h1>
                <p className="text-gray-500">
                    Haz peticiones HTTP como en Postman o Thunder Client
                </p>
            </header>

            <section className="bg-base-100 shadow-md rounded-xl p-4 space-y-4">
                {/* Inputs de la solicitud */}
            </section>

            <section className="bg-base-100 shadow-md rounded-xl p-4">
                {/* Respuesta de la solicitud */}
            </section>
        </div>
    );
}

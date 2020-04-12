exports.getList = (id) => {
    return {
        id: 1,
        name: "Prueba",
        createAt: Date.now(),
        countries: [
            {
                id: 1,
                name: "Argentina",
                iso2: "AR",
                iso3: "ARG",
                latitude: -34,
                longitude: -64,
                results: []
            },
            {
                id: 2,
                name: "Brazil",
                iso2: "BR",
                iso3: "BRA",
                latitude: -10,
                longitude: -55,
                results: []
            }
        ]
    };
}
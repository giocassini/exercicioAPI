const express = require("express");
const path = require("path");
const fauna = require("./fauna.json");

const app = express();
const PORT = 3000;

// Deixa as fotos acessíveis pelo navegador.
app.use(
    "/fotos",
    express.static(path.join(__dirname, "data", "fotos"))
);

// Entrega uma foto sorteada entre todas as categorias.
app.get("/api/fauna/aleatorio", (req, res) => {
    const categorias = Object.keys(fauna);

    const categoria =
        categorias[Math.floor(Math.random() * categorias.length)];

    const fotos = fauna[categoria];

    const foto =
        fotos[Math.floor(Math.random() * fotos.length)];

    res.json({
        categoria,
        foto: `/fotos/${categoria}/${foto}`
    });
});

// Entrega as fotos de uma categoria escolhida.
app.get("/api/fauna/:categoria", (req, res) => {
    const categoria = req.params.categoria.toLowerCase();

    // Avisa quando o usuário pesquisa uma categoria inexistente.
    if (!fauna[categoria]) {
        return res.status(404).json({
            erro: `A categoria "${categoria}" não foi encontrada. Tente onca, arara, tamandua ou capivara.`
        });
    }

    res.json({
        categoria,
        fotos: fauna[categoria].map(
            foto => `/fotos/${categoria}/${foto}`
        )
    });
});

// Permite abrir o front-end pelo mesmo servidor.
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`🌿 Fauna Explorer em http://localhost:${PORT}`);
});
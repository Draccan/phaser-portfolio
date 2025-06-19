import { defineConfig } from "vite";

// Configurazione base per un progetto Phaser con Vite
export default defineConfig({
    server: {
        open: true, // apre il browser all'avvio del dev server
    },
    build: {
        target: "esnext", // Phaser richiede ESNext per le sue dipendenze moderne
    },
});

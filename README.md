# Studio

Ripassi interattivi per il liceo, installabili come app sull'iPad (Condividi → Aggiungi alla schermata Home).

- `index.html`: app della studentessa, link pubblico, nessun account. Salva sul dispositivo e invia le risposte al database (solo scrittura).
- `papa.html`: vista del genitore, con login. Legge le risposte in tempo reale, registra l'interrogazione, azzera.
- `moduli/`: un file per ripasso, più `indice.js` con l'elenco.
- `supabase/schema.sql`: tabelle e regole di accesso (Row Level Security).

Per aggiungere un ripasso: creare `moduli/<id>.js` e aggiungerlo in `moduli/indice.js`; poi incrementare `CACHE` in `sw.js`.

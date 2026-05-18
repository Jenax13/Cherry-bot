js_code = """
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = 'AIzaSyAtX1VdqMZnq3Z_5k1T0PVUCn8T8hu3SG8';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const gemini_model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-8b',
    systemInstruction: 'Eres Cherry, una IA amigable, coqueta y algo bromista. Tu personalidad es dulce pero audaz. Siempre tratas al usuario de forma cariñosa como humano bonito.'
});

async function startCherryBot() {
    const { state, saveCreds } = await useMultiFileAuthState('cherry_auth');
    const { version } = await fetchLatestBaileysVersion();

    const client = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        browser: ['Cherry Bot', 'Chrome', '1.0.0']
    });

    client.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) qrcode.generate(qr, { small: true });
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startCherryBot();
        }
    });

    client.ev.on('creds.update', saveCreds);

    client.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.remoteJid === 'status@broadcast') return;

        const from = msg.key.remoteJid;
        const body = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').trim();
        const pushname = msg.pushName || 'humano bonito';

        if (['#menu', '#menú'].includes(body.toLowerCase())) {
            const menuText = `🍒 *¡Bienvenido al Jardín de Cherry Bot!* 🍒\\n👤 *${pushname}*\\n\\nUsa *#cherry* seguido de tu pregunta para hablar conmigo.`;
            await client.sendMessage(from, { text: menuText });
        } else if (body.toLowerCase().startsWith('#cherry')) {
            const query = body.replace(/#cherry/i, '').trim() || 'Hola';
            const result = await gemini_model.generateContent(query);
            await client.sendMessage(from, { text: '🍒 ' + result.response.text() });
        }
    });
}

startCherryBot();
"""

with open('index.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("✅ Archivo index.js guardado correctamente en el entorno.")

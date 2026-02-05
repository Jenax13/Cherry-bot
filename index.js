const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el QR para iniciar Cherry bot 🍒');
});

client.on('ready', () => {
    console.log('🍒 Cherry bot está listo 🍒');
});

client.on('message', message => {
    const msg = message.body.toLowerCase();

    if (msg === 'hola') {
        message.reply('Hola~ 🍒 Soy Cherry bot, tu bot favorito de cerezas');
    } 
    else if (msg.includes('cereza')) {
        message.reply('🍒 Las cerezas son lindas, dulces y peligrosamente adictivas~');
    }
    else if (msg === '!menu') {
        message.reply(
`🍒 *Cherry bot menú* 🍒
- hola
- cereza
- !menu`
        );
    }
});

client.initialize();

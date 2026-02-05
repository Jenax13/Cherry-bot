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
    console.log('🍒 Cherry bot está lista 🍒');
});

client.on('message', message => {
    const msg = message.body.toLowerCase();

    if (msg === 'hola') {
        message.reply('Hola~ 🍒 Soy Cherry bot, tu bot favorita');
    } 
    else if (msg.includes('cereza')) {
        message.reply('🍒 Las cerezas son lindas, dulces y peligrosamente adictivas~');
    }
    else if (msg === '!menu') {
        message.reply(
`🍒 *𔓕꯭  ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝑀𝑒𝓃ú 𝒹𝑒 𝒞𝒽𝑒𝓇𝓇𝓎  ℬ𝑜𝓉 ⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭𔓕
¡𝓗𝓸𝓵𝓪! 𝓒ó𝓶𝓸 𝓔𝓼𝓽á𝓼 𝓮𝓵 𝓓í𝓪 𝓭𝓮 𝓗𝓸𝔂, 𝓢𝓸𝔂 *𝓒𝓱𝓮𝓻𝓻𝔂 𝓑𝓸𝓽* 𝗅𝖾𝗋𝗈𝗋𝖾𝗋𝗈🍒.

🌸 !hola
🌸 !cereza
🌸 !menu`
        );
    }
});

client.initialize();

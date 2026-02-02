const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP() {
    const publicDir = path.join(__dirname, 'public');
    const images = ['logo192.png', 'logo512.png', 'logo.png'];

    for (const image of images) {
        const inputPath = path.join(publicDir, image);
        const outputPath = path.join(publicDir, image.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            try {
                await sharp(inputPath)
                    .webp({ quality: 85, effort: 6 })
                    .toFile(outputPath);

                const inputSize = fs.statSync(inputPath).size;
                const outputSize = fs.statSync(outputPath).size;
                const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

                console.log(`✅ ${image} → ${image.replace('.png', '.webp')}`);
                console.log(`   ${(inputSize / 1024).toFixed(1)}KB → ${(outputSize / 1024).toFixed(1)}KB (-${savings}%)`);
            } catch (error) {
                console.error(`❌ Error converting ${image}:`, error.message);
            }
        } else {
            console.log(`⚠️  ${image} not found`);
        }
    }
}

convertToWebP().catch(console.error);

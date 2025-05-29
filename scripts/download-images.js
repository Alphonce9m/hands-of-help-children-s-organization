const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    filename: 'program-2.jpg',
    directory: 'public/images/programs'
  },
  {
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
    filename: 'program-3.jpg',
    directory: 'public/images/programs'
  }
];

// Create directories if they don't exist
images.forEach(image => {
  const dir = path.join(process.cwd(), image.directory);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Download images
images.forEach(image => {
  const filePath = path.join(process.cwd(), image.directory, image.filename);
  const file = fs.createWriteStream(filePath);

  https.get(image.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${image.filename}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${image.filename}:`, err.message);
  });
}); 
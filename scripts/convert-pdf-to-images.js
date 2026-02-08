const fs = require('fs');
const path = require('path');

// Simple script to create placeholder images for PDF slideshow
// This creates a basic structure that can be enhanced with actual PDF conversion

const pdfFiles = [
  'ECE148_Autonomous_Turret_Final.pdf',
  'Apollo_X_Prototype_Development.pdf',
  'SoundImaging_MRI_Headphones_PDR.pdf'
];

const outputDir = path.join(__dirname, '../public/images/pdf-pages');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create placeholder images for each PDF
pdfFiles.forEach(pdfFile => {
  const baseName = path.basename(pdfFile, '.pdf');
  const pdfDir = path.join(outputDir, baseName);
  
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  
  // Create a simple placeholder HTML file that can be used to display PDF pages
  const placeholderHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>${baseName} - Page Viewer</title>
  <style>
    body { margin: 0; padding: 20px; background: #f5f5f5; }
    .pdf-container { max-width: 800px; margin: 0 auto; }
    .pdf-page { 
      background: white; 
      border-radius: 8px; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 20px;
      overflow: hidden;
    }
    .pdf-page iframe { 
      width: 100%; 
      height: 600px; 
      border: none; 
    }
    .controls {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      padding: 10px 20px;
      border-radius: 25px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .btn {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn:hover {
      background: #f0f0f0;
    }
    .btn.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
  </style>
</head>
<body>
  <div class="pdf-container">
    <h1>${baseName}</h1>
    <div id="pdf-viewer">
      <!-- PDF pages will be loaded here -->
    </div>
  </div>
  
  <div class="controls">
    <button class="btn" onclick="prevPage()">← Previous</button>
    <span id="page-info">Page 1 of 1</span>
    <button class="btn" onclick="nextPage()">Next →</button>
    <button class="btn" onclick="toggleAutoPlay()" id="play-btn">▶ Play</button>
    <button class="btn" onclick="downloadPDF()">📥 Download</button>
  </div>

  <script>
    let currentPage = 1;
    let totalPages = 1;
    let isAutoPlaying = false;
    let autoPlayInterval;

    function loadPage(pageNum) {
      const viewer = document.getElementById('pdf-viewer');
      viewer.innerHTML = \`
        <div class="pdf-page">
          <iframe src="/files/${pdfFile}#page=\${pageNum}&toolbar=0&navpanes=0&scrollbar=0&view=FitH"></iframe>
        </div>
      \`;
      document.getElementById('page-info').textContent = \`Page \${pageNum} of \${totalPages}\`;
    }

    function prevPage() {
      if (currentPage > 1) {
        currentPage--;
        loadPage(currentPage);
      }
    }

    function nextPage() {
      if (currentPage < totalPages) {
        currentPage++;
        loadPage(currentPage);
      }
    }

    function toggleAutoPlay() {
      const btn = document.getElementById('play-btn');
      if (isAutoPlaying) {
        clearInterval(autoPlayInterval);
        btn.textContent = '▶ Play';
        isAutoPlaying = false;
      } else {
        autoPlayInterval = setInterval(() => {
          if (currentPage < totalPages) {
            currentPage++;
            loadPage(currentPage);
          } else {
            toggleAutoPlay(); // Stop at end
          }
        }, 3000);
        btn.textContent = '⏸ Pause';
        isAutoPlaying = true;
      }
    }

    function downloadPDF() {
      const link = document.createElement('a');
      link.href = '/files/${pdfFile}';
      link.download = '${pdfFile}';
      link.click();
    }

    // Initialize
    loadPage(1);
  </script>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(pdfDir, 'index.html'), placeholderHtml);
  console.log(`Created placeholder for ${pdfFile}`);
});

console.log('PDF conversion setup complete!');
console.log('Note: This creates a basic structure. For production, you would use a proper PDF-to-image conversion library.');

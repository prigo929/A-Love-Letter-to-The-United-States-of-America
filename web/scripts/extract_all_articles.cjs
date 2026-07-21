const fs = require('fs');
const path = require('path');

// Target directory for output articles
const ARTICLES_BASE_DIR = path.resolve(__dirname, '../ASSETS/Articles');

// Source paths of compiled JS files
const COMPILED_DIR = path.resolve(__dirname, 'temp_compiled');
const PATH_HISTORY_ERAS = path.join(COMPILED_DIR, 'history-eras-data.cjs');
const PATH_HISTORY_THEMATIC = path.join(COMPILED_DIR, 'history-thematic-data.cjs');
const PATH_VERTICALS = path.join(COMPILED_DIR, 'verticals-thematic-data.cjs');

// Category to Subfolder mappings
const VERTICAL_DIR_MAPPING = {
  'nature': 'Nature',
  'constitution': 'Constitution & Government',
  'economy': 'Economy',
  'quality-of-life': 'Quality of Life',
  'military': 'Military',
  'global-leadership': 'Global Leadership',
  'demographics': 'Demographics',
  'culture': 'Culture',
  'innovation': 'Innovation'
};

const THEMATIC_HISTORY_DIR_MAPPING = {
  'founding-principles': 'History Thematic/Founding Principles',
  'american-exceptionalism': 'History Thematic/American Exceptionalism',
  'frontier-and-expansion': 'History Thematic/Frontier & Expansion',
  'union-and-liberty': 'History Thematic/Union & Liberty',
  'industrial-rise': 'History Thematic/Industrial Rise',
  'arsenal-of-democracy': 'History Thematic/Arsenal of Democracy',
  'cold-war': 'History Thematic/Cold War',
  'american-dream': 'History Thematic/American Dream',
  'reagan-revolution': 'History Thematic/Reagan Revolution',
  'faith-and-reform': 'History Thematic/Faith & Reform',
  'free-markets': 'History Thematic/Free Markets',
  'crisis-and-resilience': 'History Thematic/Crisis & Resilience',
  'reform-and-rights': 'History Thematic/Reform & Rights',
  'post-9-11-america': 'History Thematic/Post-9-11 America',
  'populism-and-labor': 'History Thematic/Populism & Labor',
  'wwii': 'History Thematic/World War II'
};


// Helper: Ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper: Clean filename of invalid characters
function getSafeFilename(title) {
  return title
    .replace(/\//g, '-')
    .replace(/:/g, ' -')
    .replace(/[\\*?"<>|]/g, '')
    .trim();
}

// Helper: Format article object into a clean plain text / markdown structure
function formatArticle(article) {
  let out = `# ${article.title.en}\n\n`;
  
  if (article.sections && Array.isArray(article.sections)) {
    article.sections.forEach(section => {
      const headingText = section.heading && section.heading.en ? section.heading.en.trim() : '';
      if (headingText) {
        out += `## ${headingText}\n\n`;
      }
      
      if (section.subsections && Array.isArray(section.subsections)) {
        section.subsections.forEach(sub => {
          const subHeadingText = sub.heading && sub.heading.en ? sub.heading.en.trim() : '';
          if (subHeadingText) {
            out += `### ${subHeadingText}\n\n`;
          }
          
          if (sub.paragraphs && Array.isArray(sub.paragraphs)) {
            sub.paragraphs.forEach(p => {
              let text = '';
              if (typeof p === 'string') {
                text = p;
              } else if (p && p.en) {
                text = p.en;
              }
              
              if (text) {
                // Clean up citation brackets (e.g. [1], [12], [citation needed])
                text = text.replace(/\[\d+\]/g, '');
                text = text.replace(/\[citation needed\]/gi, '');
                text = text.replace(/\s+/g, ' ').trim();
                out += `${text}\n\n`;
              }
              
              // Handle image references
              if (p && p.image) {
                const imgPath = p.image;
                const caption = p.imageCaption ? p.imageCaption : (p.imageAlt ? p.imageAlt : '');
                out += `[Image: ${imgPath}${caption ? ' - ' + caption : ''}]\n\n`;
              }
            });
          }
        });
      }
    });
  }
  
  return out.trim() + '\n';
}

function run() {
  console.log('--- Starting Article Extraction ---');
  ensureDir(ARTICLES_BASE_DIR);
  
  let totalArticles = 0;

  // 1. Process History Eras
  console.log('Processing History Eras...');
  if (fs.existsSync(PATH_HISTORY_ERAS)) {
    const { HISTORY_ERAS } = require(PATH_HISTORY_ERAS);
    const destDir = path.join(ARTICLES_BASE_DIR, 'History Eras');
    ensureDir(destDir);
    
    HISTORY_ERAS.forEach(article => {
      const filename = `${getSafeFilename(article.title.en)}.txt`;
      const content = formatArticle(article);
      fs.writeFileSync(path.join(destDir, filename), content, 'utf8');
      totalArticles++;
    });
    console.log(`Saved ${HISTORY_ERAS.length} History Eras articles.`);
  } else {
    console.warn(`Warning: Compiled history-eras-data.cjs not found at ${PATH_HISTORY_ERAS}`);
  }

  // 2. Process Thematic History
  console.log('Processing Thematic History...');
  if (fs.existsSync(PATH_HISTORY_THEMATIC)) {
    const { THEMATIC_HISTORY_DATA } = require(PATH_HISTORY_THEMATIC);
    let thematicHistoryCount = 0;
    
    Object.keys(THEMATIC_HISTORY_DATA).forEach(categoryKey => {
      const subfolderName = THEMATIC_HISTORY_DIR_MAPPING[categoryKey] || categoryKey;
      const destDir = path.join(ARTICLES_BASE_DIR, subfolderName);
      ensureDir(destDir);
      
      const articles = THEMATIC_HISTORY_DATA[categoryKey];
      articles.forEach(article => {
        const filename = `${getSafeFilename(article.title.en)}.txt`;
        const content = formatArticle(article);
        fs.writeFileSync(path.join(destDir, filename), content, 'utf8');
        thematicHistoryCount++;
        totalArticles++;
      });
    });
    console.log(`Saved ${thematicHistoryCount} Thematic History articles.`);
  } else {
    console.warn(`Warning: Compiled history-thematic-data.cjs not found at ${PATH_HISTORY_THEMATIC}`);
  }

  // 3. Process Verticals Thematic Data
  console.log('Processing Verticals...');
  if (fs.existsSync(PATH_VERTICALS)) {
    const { VERTICALS_THEMATIC_DATA } = require(PATH_VERTICALS);
    let verticalsCount = 0;
    
    Object.keys(VERTICALS_THEMATIC_DATA).forEach(verticalKey => {
      const subfolderName = VERTICAL_DIR_MAPPING[verticalKey] || verticalKey;
      const destDir = path.join(ARTICLES_BASE_DIR, subfolderName);
      ensureDir(destDir);
      
      const articles = VERTICALS_THEMATIC_DATA[verticalKey];
      articles.forEach(article => {
        const filename = `${getSafeFilename(article.title.en)}.txt`;
        const content = formatArticle(article);
        fs.writeFileSync(path.join(destDir, filename), content, 'utf8');
        verticalsCount++;
        totalArticles++;
      });
    });
    console.log(`Saved ${verticalsCount} Verticals articles.`);
  } else {
    console.warn(`Warning: Compiled verticals-thematic-data.cjs not found at ${PATH_VERTICALS}`);
  }

  console.log(`--- Finished Article Extraction. Total articles saved: ${totalArticles} ---`);
}

run();

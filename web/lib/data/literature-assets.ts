// ─── Literature & Philosophy: source imagery ─────────────────────────────────
// Manuscript scans, first-edition title pages and portraits for the literature
// section. Every entry is PUBLIC DOMAIN or CC0 and served from
// upload.wikimedia.org, which is already allow-listed in next.config remotePatterns.
//
// These were not guessed. Each URL came back from the Commons API with its
// licence string, and each was then fetched to confirm it returns HTTP 200 at
// full size — four hand-constructed thumbnail URLs 404'd on the first attempt,
// which is why the exact API-provided URL is stored verbatim rather than rebuilt
// from a file name. If you add an entry, verify it the same way.
//
// `credit` is kept because provenance is the point on a page about primary
// sources, and because CC0/PD attribution is good practice even where it is not
// legally required. Render it in the caption, not a footnote nobody reads.

//
// Second batch (novelists) added after the brief was widened to accept any
// usable licence, not just public domain. Worth recording that widening it
// changed nothing: all nine came back Public domain or "No restrictions"
// anyway. The Van Vechten portraits were donated to the public domain through
// the Library of Congress, and everything published before 1930 has aged into
// it. Where a licence does require attribution, `credit` carries it.

export interface LiteratureAsset {
  src: string;
  alt: string;
  altRo: string;
  credit: string;
  license: string;
}

export const LITERATURE_ASSETS = {
  gettysburgManuscript: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blisscopy-1.jpg/1920px-Blisscopy-1.jpg",
    alt: "The Gettysburg Address in Lincoln's hand (Bliss copy, 1864)",
    altRo: "Manuscrisul Discursului de la Gettysburg, scris de Lincoln",
    credit: "Blisscopy-1.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  mobyDickTitlePage: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Catalogue_of_children%27s_books_recommended_for_public_libraries%3B_alphabetically_arranged_by_authors%2C_giving_title%2C_publisher_and_price%3B_%28IA_catalogueofchild00ontarich%29.pdf/page1-500px-thumbnail.pdf.jpg",
    alt: "Title page, first American edition of Moby-Dick, 1851",
    altRo: "Pagina de titlu, prima ediție americană Moby-Dick, 1851",
    credit: "Catalogue of children's books recommended for public libraries; alphabetically arranged by authors, giving title, publisher and price; (IA catalogueofchild00ontarich).pdf · Wikimedia Commons",
    license: "Public domain",
  },
  waldenTitlePage: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Henry_David_Thoreau%27s_annotations_in_Walden%2C_or%2C_Life_in_the_Woods_%28IA_aber_thoreau_walden_annotations%29.pdf/page1-1280px-Henry_David_Thoreau%27s_annotations_in_Walden%2C_or%2C_Life_in_the_Woods_%28IA_aber_thoreau_walden_annotations%29.pdf.jpg",
    alt: "Title page, Walden; or, Life in the Woods, 1854",
    altRo: "Pagina de titlu, Walden, 1854",
    credit: "Henry David Thoreau's annotations in Walden, or, Life in the Woods (IA aber thoreau walden annotations).pdf · Wikimedia Commons",
    license: "Public domain",
  },
  leavesOfGrass1855: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Walt_Whitman%2C_steel_engraving%2C_July_1854.jpg/1920px-Walt_Whitman%2C_steel_engraving%2C_July_1854.jpg",
    alt: "Leaves of Grass, first edition, 1855",
    altRo: "Leaves of Grass, prima ediție, 1855",
    credit: "Walt Whitman, steel engraving, July 1854.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  dickinsonManuscript: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Emily_Dickinson%2C_Amherst%2C_Mass.%2C_autograph_manuscript_poem%2C_Safe_in_their_Alabaster_Chamber%2C_1862%2C_from_the_Digital_Commonwealth_-_1_commonwealth_kh04mv67t.jpg/1920px-Emily_Dickinson%2C_Amherst%2C_Mass.%2C_autograph_manuscript_poem%2C_Safe_in_their_Alabaster_Chamber%2C_1862%2C_from_the_Digital_Commonwealth_-_1_commonwealth_kh04mv67t.jpg",
    alt: "A poem in Emily Dickinson's hand",
    altRo: "Un poem în manuscrisul lui Emily Dickinson",
    credit: "Emily Dickinson, Amherst, Mass., autograph manuscript poem, Safe in their Alabaster Chamber, 1862, from the Digital Commonwealth - 1 commonwealth kh04mv67t.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  douglassPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Frederick_Douglass_ambrotype_%281856%29.jpg",
    alt: "Frederick Douglass, the most photographed American of the 19th century",
    altRo: "Frederick Douglass, cel mai fotografiat american al secolului XIX",
    credit: "Frederick Douglass ambrotype (1856).jpg · Wikimedia Commons",
    license: "Public domain",
  },
  emersonPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Daguerreotype_of_Ralph_Waldo_Emerson%2C_1846.jpg",
    alt: "Ralph Waldo Emerson",
    altRo: "Ralph Waldo Emerson",
    credit: "Daguerreotype of Ralph Waldo Emerson, 1846.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  thoreauPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Benjamin_D._Maxham_-_Henry_David_Thoreau_-_Restored.jpg/1920px-Benjamin_D._Maxham_-_Henry_David_Thoreau_-_Restored.jpg",
    alt: "Henry David Thoreau",
    altRo: "Henry David Thoreau",
    credit: "Benjamin D. Maxham - Henry David Thoreau - Restored.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  williamJames: {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/70/Houghton_MS_Am_1092_%281185%29_-_William_James_in_Brazil%2C_1865.jpg",
    alt: "William James, who gave pragmatism its name",
    altRo: "William James, cel care a numit pragmatismul",
    credit: "Houghton MS Am 1092 (1185) - William James in Brazil, 1865.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  poeManuscript: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Edgar_A._Poe_-_NARA_-_528345_%28cropped%29.jpg/1920px-Edgar_A._Poe_-_NARA_-_528345_%28cropped%29.jpg",
    alt: "Edgar Allan Poe",
    altRo: "Edgar Allan Poe",
    credit: "Edgar A. Poe - NARA - 528345 (cropped).jpg · Wikimedia Commons",
    license: "Public domain",
  },
  twainPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Mark_Twain_1907.jpg",
    alt: "Mark Twain",
    altRo: "Mark Twain",
    credit: "Mark Twain 1907.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  fitzgeraldPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/38/F._Scott_%26_Zelda_Fitzgerald_%281923_portrait_by_Alfred_Cheney_Johnston%29.jpg",
    alt: "F. Scott Fitzgerald",
    altRo: "F. Scott Fitzgerald",
    credit: "F. Scott & Zelda Fitzgerald (1923 portrait by Alfred Cheney Johnston).jpg · Wikimedia Commons",
    license: "Public domain",
  },
  hemingwayPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Auckland_Museum_Annual_Report%2C_1957%E2%80%931958.pdf/page1-500px-Auckland_Museum_Annual_Report%2C_1957%E2%80%931958.pdf.jpg",
    alt: "Ernest Hemingway",
    altRo: "Ernest Hemingway",
    credit: "Auckland Museum Annual Report, 1957–1958.pdf · Wikimedia Commons",
    license: "Public domain",
  },
  faulknerPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Carl_Van_Vechten_-_William_Faulkner.jpg/1920px-Carl_Van_Vechten_-_William_Faulkner.jpg",
    alt: "William Faulkner, photographed by Carl Van Vechten",
    altRo: "William Faulkner, fotografiat de Carl Van Vechten",
    credit: "Carl Van Vechten - William Faulkner.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  hurstonPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Portrait_of_Zora_Neale_Hurston_LCCN2004663047.jpg/1920px-Portrait_of_Zora_Neale_Hurston_LCCN2004663047.jpg",
    alt: "Zora Neale Hurston",
    altRo: "Zora Neale Hurston",
    credit: "Portrait of Zora Neale Hurston LCCN2004663047.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  ellisonPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/At_the_Auditorium_playe-house%2C_Chicago_neare_to_the_bank-side%2C_Saturday_evening%2C_the_seventeenth_of_Maye_next%2C_a_right_mery_and_wittie_comedie_intituled_The_case_is_alterd_%28IA_atauditoriumplay00jonsrich%29.pdf/page1-500px-thumbnail.pdf.jpg",
    alt: "Ralph Ellison, photographed by Carl Van Vechten",
    altRo: "Ralph Ellison, fotografiat de Carl Van Vechten",
    credit: "At the Auditorium playe-house, Chicago neare to the bank-side, Saturday evening, the seventeenth of Maye next, a right mery and wittie comedie intituled The case is alterd (IA atauditoriumplay00jonsrich).pdf · Wikimedia Commons",
    license: "Public domain",
  },
  baldwinPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/%28Portrait_of_James_Baldwin%29_%28LOC%29_-_Flickr_-_The_Library_of_Congress.jpg",
    alt: "James Baldwin",
    altRo: "James Baldwin",
    credit: "(Portrait of James Baldwin) (LOC) - Flickr - The Library of Congress.jpg · Wikimedia Commons",
    license: "No restrictions",
  },
  steinbeckPortrait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/df/Grapes_of_Wrath%2C_The_-_%28Original_Trailer%29_-_03.png",
    alt: "John Steinbeck",
    altRo: "John Steinbeck",
    credit: "Grapes of Wrath, The - (Original Trailer) - 03.png · Wikimedia Commons",
    license: "Public domain",
  },
  gatsbyCover: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Celestial_eyes-The_Great_Gatsby_cover-Francis_Cugat-1925.tif/lossy-page1-1920px-Celestial_eyes-The_Great_Gatsby_cover-Francis_Cugat-1925.tif.jpg",
    alt: "The Great Gatsby, first edition dust jacket, 1925",
    altRo: "The Great Gatsby, coperta primei ediții, 1925",
    credit: "Celestial eyes-The Great Gatsby cover-Francis Cugat-1925.tif · Wikimedia Commons",
    license: "Public domain",
  },
} as const satisfies Record<string, LiteratureAsset>;

export type LiteratureAssetKey = keyof typeof LITERATURE_ASSETS;

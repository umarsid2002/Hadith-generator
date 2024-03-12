let books = [
  "eng-bukhari",
  "eng-dehlawi",
  "eng-ibnmajah",
  "eng-abudawud",
  "eng-malik",
  "eng-muslim",
  "eng-nasai",
  "eng-tirmidhi",
  "eng-nawawi",
  "eng-qudsi",
];

let totalBooks = books.length;
let random = Math.random();
let randomBook = Math.floor(random * totalBooks);

const hadithGenerator = () => {
  let random = Math.random();
  let randomBook = Math.floor(random * totalBooks);
  let hadithData = fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${books[randomBook]}.json`
  );

  hadithData
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let hadiths = response["hadiths"];

      // Hadith Metadata
      let hadithMeta = response["metadata"].sections;
      let metaName = response["metadata"].name;

      // Hadith Text With Reference
      let totalHadiths = hadiths.length;
      let randomHadith = Math.floor(random * totalHadiths);
      let hadith = hadiths[randomHadith];
      let reference = hadiths[randomHadith]["reference"];

      // hadith Chapter
      let chapter = hadithMeta[reference.book];
      let hadithNum = reference["hadith"];

      // Populating Hadith in the DOM
      let hadithBox = document.querySelector(".hadith-box");
      let hadithTxt;
      let hadithRef;

      // Checking If 'hadith-text' class exists!
      if (hadithBox.children[0].className == "hadith-text") {
        hadithTxt = document.querySelector(".hadith-text");
        hadithRef = document.querySelector(".hadith-ref");
      } else {
        // If class is not available then add this html
        hadithBox.innerHTML = `<div class="hadith-text">
                        
        </div>
        <hr>
        <div class="hadith-ref">
            
        </div>
        <button class="btn btn-success my-4 fw-semibold" onclick="hadithGenerator()">Read Another Hadith</button>
        <button class="btn btn-success my-4 my-sm-3 mx-lg-2 mx-sm-0 fw-semibold" onclick="showSearch()">Search Hadith By Book</button>`;
        hadithTxt = document.querySelector(".hadith-text");
        hadithRef = document.querySelector(".hadith-ref");
      }

      hadithTxt.innerText = hadith.text;
      hadithRef.innerHTML = `
        Hadith Book: ${metaName}<br>
        Hadith Number: ${hadith["hadithnumber"]}<br>
        Chapter: ${chapter}<br>
        Hadith Number: ${hadithNum}
        `;
      console.log(hadith);
    });
};

hadithGenerator();

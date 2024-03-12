let hadithCont = document.querySelector(".hadith-box");
const showSearch = () => {
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
  let optList = "";
  for (let book of books) {
    optList += `<option value="${book}">${book}</option>`;
  }
  console.log(optList);

  // Populating in the DOM
  hadithCont.innerHTML = `<div class="row">
    <h4 class="pb-3">Search Hadith By Book</h4>
    <div class="col-6">
      <select id='hadithBook' class="book-select form-select border-0 shadow-none" placeholder="enter book name">
      ${optList}
      </select>
    </div>
    <div class="col-6">
      <input id='hadithNum' type="number" class="form-control border-0 shadow-none" placeholder="Enter Hadith Number">
    </div>
  </div>
  <div class="row mx-1">
  <button class="btn btn-success mt-4 fw-semibold" onclick="search()">Search Hadith</button>
  <button class="btn btn-danger my-3 fw-semibold" onclick="hadithGenerator()">Go Back To Random Hadith</button>
  </div>
  <div class='results'></div>
  `;
};

const search = () => {
  // Getting Values From Input
  let hadithVal = document.querySelector("#hadithBook").value;
  let hadithNum = document.querySelector("#hadithNum").value;

  let hadithData = fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${hadithVal}/${hadithNum}.json`
  );
  hadithData
    .then((response) => {
      if (response.status == "403") {
        let results = document.querySelector(".results");
        results.classList.add("text-danger");
        results.innerHTML = `Please Enter The Correct Hadith Number In Order To Find It`;
      }
      return response.json();
    })
    .then((response) => {
      let BookName = response["metadata"].name;
      let ChapterNum = response["hadiths"][0]["reference"].book;
      let cHadithNum = response["hadiths"][0]["reference"].hadith;
      let ChapterName = response["metadata"].section[ChapterNum];

      let hadith = response["hadiths"][0].text;
      let results = document.createElement("div");
      let hadithTxt = document.createElement("div");
      let hadithRef = document.createElement("div");
      results.classList.add("results");
      hadithTxt.classList.add("hadith-text");
      hadithRef.classList.add("hadith-ref");

      // Populating Hadith in the Dom
      hadithTxt.innerText = hadith;
      hadithRef.innerHTML = `<hr>
        Hadith Book: ${BookName}<br>
        Hadith Number: ${hadithNum}<br>
        Chapter: ${ChapterName}<br>
        Hadith Number: ${cHadithNum}
        `;
      hadithCont.appendChild(results);
      results.appendChild(hadithTxt);
      results.appendChild(hadithRef);

      // if results is more than 1
      let resultList = document.querySelectorAll(".results");
      if (resultList.length == 2) {
        // Remove the below Result
        hadithCont.removeChild(hadithCont.children[2]);
      }
    });
};

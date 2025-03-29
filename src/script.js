document.addEventListener("DOMContentLoaded", () => {
  const jobSearch = document.getElementById("jobSearch");
  const searchChips = document.getElementById("searchChips");
  const jobListings = document.getElementById("jobListings");
  const clearSearch = document.getElementById("clearSearch");

  let searchTerms = [];

  function renderJobs() {
    const filteredJobs = jobs.filter((job) => {
      return searchTerms.every((term) => {
        const searchText = term.toLowerCase();
        return (
          job.company.toLowerCase().includes(searchText) ||
          job.position.toLowerCase().includes(searchText) ||
          job.role.toLowerCase().includes(searchText) ||
          job.level.toLowerCase().includes(searchText) ||
          job.languages.some((lang) =>
            lang.toLowerCase().includes(searchText)
          ) ||
          job.tools.some((tool) => tool.toLowerCase().includes(searchText))
        );
      });
    });

    jobListings.innerHTML = "";
    filteredJobs.forEach((job) => {
      const jobDiv = document.createElement("div");
      jobDiv.className =
        "flex w-full shadow-lg shadow-teal-700/10 rounded-[10px] mb-[20px] bg-white";
      jobDiv.innerHTML = `
                <div class="bg-teal-600 w-[2%] rounded-tl-[10px] rounded-bl-[10px] lg:w-[0.5%]"></div>
                <div class="px-[20px] w-[88%] space-y-[10px] mb-[20px] lg:flex lg:justify-between lg:w-full bg-white">
                <div class="lg:flex lg:gap-[30px]">
                    <img class="w-[40px] mt-[-20px] lg:w-[100px] lg:mt-[15px]" src="${
                      job.logo
                    }" alt="${job.company}">
                    <div class="space-y-[10px]">
                    <div class="flex mt-[20px] w-full justify-between lg:gap-[20px]">
                        <div class="text-teal-600 font-[500]">${job.company}</div>
                        ${
                          job.new
                            ? '<div class="bg-teal-600 text-white h-[20px] text-[12px]  px-2 py-[2.5px] rounded-full">NEW!</div>'
                            : ""
                        }
                        ${
                          job.featured
                            ? '<div class="bg-gray-800 text-white h-[20px] text-[12px]  px-2 py-[2.5px] rounded-full">FEATURED</div>'
                            : ""
                        }
                    </div>
                    <p class="text-[15px]text-gray-800 font-[700]">${job.position}</p>
                    <div class="flex justify-between text-gray-400 font-[400]">
                        <p>${job.postedAt}</p>
                        <p>${job.contract}</p>
                        <p>${job.location}</p>
                    </div>
                    </div>

                    </div>
                    <div class="bg-black w-full h-[2px] rounded-[5px] lg:hidden"></div>
                    <div class="flex gap-[10px] flex-wrap lg:h-[30%] text-teal-600 font-[700] lg:pt-[4%]">
    <div class="bg-teal-50 px-2 py-1 text-sm font-[500] rounded hover:bg-teal-500 hover:text-white">${job.role}</div>
    <div class="bg-teal-50 px-2 py-1 text-sm font-[500] rounded hover:bg-teal-500 hover:text-white">${job.level}</div>
    ${job.languages
      .map((lang) => `<div class="bg-teal-50 px-2 py-1 text-sm font-[500] rounded hover:bg-teal-500 hover:text-white">${lang}</div>`)
      .join("")}
    ${job.tools
      .map((tool) => `<div class="bg-teal-50 px-2 py-1 text-sm font-[500] rounded hover:bg-teal-500 hover:text-white">${tool}</div>`)
      .join("")}
</div>
                </div>
            `;
      jobListings.appendChild(jobDiv);
    });
  }

  function renderSearchChips() {
    searchChips.innerHTML = "";

    searchTerms.forEach((term, index) => {
      const chip = document.createElement("div");
      chip.className =
        "flex items-center bg-teal-100 px-3 py-1 rounded-md gap-2";
      chip.innerHTML = `
                <span class="text-teal-600 font-semibold">${term}</span>
                <button onclick="removeSearchTerm(${index})" class="bg-teal-600 text-white px-2 py-1 rounded-md">✖</button>
            `;
      searchChips.appendChild(chip);
    });

    clearSearch.style.display =
      searchTerms.length > 0 ? "inline-block" : "none";
  }

  // Function to add a search term
  function addSearchTerm(term) {
    if (term && !searchTerms.includes(term)) {
      searchTerms.push(term);
      renderSearchChips();
      renderJobs();
    }
  }

  // Function to remove a search term
  window.removeSearchTerm = function (index) {
    searchTerms.splice(index, 1);
    renderSearchChips();
    renderJobs();
  };

  // Event listener for "Enter" key
  jobSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const term = jobSearch.value.trim();
      if (term) {
        addSearchTerm(term);
        jobSearch.value = ""; // Clear input field after adding the term
      }
    }
  });

  // Event listener for "Clear" button
  clearSearch.addEventListener("click", () => {
    searchTerms = [];
    renderSearchChips();
    renderJobs();
  });

  // Initial render of all jobs
  renderJobs();
});

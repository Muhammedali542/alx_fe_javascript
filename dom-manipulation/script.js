let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    category: "Reflection",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];

// Populate the categories dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const uniqueCategories = [...new Set(quotes.map((quote) => quote.category))]; // Get unique categories

  // Clear existing options except "All Categories"
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Add categories to the dropdown
  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Load last selected filter from localStorage
  const lastSelectedCategory =
    localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = lastSelectedCategory;
  filterQuotes(); // Apply the filter when page is loaded
}

// Show a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Display the random quote
  quoteDisplay.innerHTML = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Save the selected category in localStorage
  localStorage.setItem("selectedCategory", selectedCategory);

  // Filter quotes
  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);

  // Clear current displayed quotes
  quoteDisplay.innerHTML = "";

  // Display filtered quotes or a message if none found
  if (filteredQuotes.length > 0) {
    filteredQuotes.forEach((quote) => {
      const quoteElement = document.createElement("p");
      quoteElement.textContent = `"${quote.text}" - Category: ${quote.category}`;
      quoteDisplay.appendChild(quoteElement);
    });
  } else {
    quoteDisplay.textContent = "No quotes available in this category.";
  }
}

// Add a new quote and update the categories if needed
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory,
  };

  quotes.push(newQuote);
  saveQuotes();

  // Update the categories dropdown in case a new category is added
  populateCategories();

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Show a random quote after adding a new one
  showRandomQuote();
}

// Save the updated quotes array to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Load the quotes and populate categories on page load
populateCategories();
showRandomQuote(); // Show an initial random quote

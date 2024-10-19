let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Mock server URL
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch quotes from the server
async function fetchQuotesFromServer() {
  const response = await fetch(SERVER_URL);
  const data = await response.json();
  return data.map((quote) => ({
    text: quote.title, // or any other property
    category: "General", // Set a default category or adjust as necessary
  }));
}

// Post a new quote to the server
async function postQuoteToServer(quote) {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: quote.text,
      body: "Quote body can include additional info", // Adjust as necessary
      category: quote.category,
    }),
  });
  return response.json(); // Return the posted quote data if needed
}

// Sync local quotes with server quotes
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  // Conflict resolution: Update local quotes with server data if they differ
  serverQuotes.forEach((serverQuote) => {
    const existingQuoteIndex = quotes.findIndex(
      (q) => q.text === serverQuote.text
    );
    if (existingQuoteIndex === -1) {
      // If the quote doesn't exist locally, add it
      quotes.push(serverQuote);
    } else {
      // If it exists, notify the user
      console.log(
        `Conflict detected for: "${serverQuote.text}". Existing quote preserved.`
      );
    }
  });

  saveQuotes();
  populateCategories();
  filterQuotes(); // Refresh displayed quotes

  // Success message after syncing
  alert("Quotes synced with server!");
}

// Populate the categories dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const uniqueCategories = [...new Set(quotes.map((quote) => quote.category))];

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
async function addQuote() {
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

  // Post the new quote to the server
  await postQuoteToServer(newQuote);

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

// Set up periodic syncing (every 10 seconds for demo purposes)
setInterval(syncQuotes, 10000); // Adjust interval as necessary

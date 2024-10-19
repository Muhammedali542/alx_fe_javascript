// Array to store quotes
let quotes = [
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

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length > 0) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the random quote
    quoteDisplay.textContent = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
  } else {
    quoteDisplay.textContent = "No quotes available. Add some quotes!";
  }
}

// Add event listener to "Show New Quote" button
newQuoteButton.addEventListener("click", showRandomQuote);

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

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  quoteDisplay.innerHTML = `${newQuote.text} - Category: ${newQuote.category}`;
}

showRandomQuote();

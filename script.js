document.addEventListener("DOMContentLoaded", function() {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const quotes = data;
        const currentDate = new Date();
        const randomIndex = currentDate.getDate() % quotes.length;
        const quoteContainer = document.getElementById("quote-container");
        const quoteText = document.getElementById("quote-text");
    
        quoteText.textContent = quotes[randomIndex].text;
        quoteContainer.style.display = "block";
      })
      .catch(error => console.error("Error fetching quotes:", error));
    });
  
// URL for the API
const apiUrl = '/api/contests';

// Fetch contest data from the API
async function fetchContests() {
    try {
        // Fetching contest data from API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Handle if no contests are available
        if (data.contests && data.contests.length > 0) {
            displayContests(data.contests);
        } else {
            showError("No contests available at the moment.");
        }
    } catch (error) {
        console.error("Error fetching contests:", error);
        showError("Failed to load contests. Please try again later.");
    } finally {
        // Hide loading message once the data is processed
        document.getElementById('loadingMessage').style.display = 'none';
    }
}

// Display contests on the page
function displayContests(contests) {
    const contestList = document.getElementById('contestList');
    contestList.innerHTML = ''; // Clear previous contests

    contests.forEach(contest => {
        const contestItem = document.createElement('div');
        contestItem.classList.add('contest-item');

        // Format the start time to "28 Dec 2024"
        const formattedDate = new Date(contest.startTime).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // background Image
        const platformImage = `static/assets/${contest.platform}.png`;

        // const platformImage = `static/assets/${contest.platform}.png`;
        contestItem.style.backgroundImage = `url('${platformImage}')`;
        contestItem.style.backgroundSize = "0px";  // Width is auto, height is 80%

        contestItem.innerHTML = `
            <h3><a href="${contest.contestLink}" target="_blank">${contest.contestName}</a></h3>
            <p><strong>Platform:</strong> ${contest.platform}</p>
            <p><strong>Start Time:</strong> ${formattedDate} </p>
            <p><strong>Duration:</strong> ${contest.contestDuration}</p>
            
        `;

        contestList.appendChild(contestItem);
    });
}

// Show error message
function showError(message) {
    document.getElementById('errorMessage').innerText = message;
    document.getElementById('errorMessage').style.display = 'block';
}

// Call the function to fetch contests
fetchContests();
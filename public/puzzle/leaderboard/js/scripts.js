// Function to update the leaderboard UI
function updateLeaderboardUI(data) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // Clear existing content
    
    data.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

// Function to fetch and update leaderboard data
async function fetchLeaderboardData() {
    try {
        const response = await fetch('/leaderboard-api/topten');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        updateLeaderboardUI(data);
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        
        // Show error message on the page
        const leaderboardBody = document.getElementById('leaderboard-body');
        leaderboardBody.innerHTML = `
            <tr>
                <td colspan="3">عذراً، حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى لاحقاً.</td>
            </tr>
        `;
    }
}

// Initial load when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchLeaderboardData();
});

// Refresh data every 30 seconds
setInterval(fetchLeaderboardData, 30000);
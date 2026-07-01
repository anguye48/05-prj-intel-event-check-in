// Attendance goal
const attendanceGoal = 50;

// Counters
let totalAttendees = 0;
let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;

// Get HTML elements
const form = document.getElementById("checkInForm");
const greeting = document.getElementById("greeting");

const attendeeCounter = document.getElementById("attendeeCount");

const waterDisplay = document.getElementById("waterCount");
const zeroDisplay = document.getElementById("zeroCount");
const powerDisplay = document.getElementById("powerCount");

const progressBar = document.getElementById("progressBar");

// Listen for form submission
form.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Get input values
    const attendeeName = document.getElementById("attendeeName").value.trim();
    const selectedTeam = document.getElementById("teamSelect").value;

    // Increase total attendance
    totalAttendees++;

    // Update total attendance on page
    attendeeCounter.textContent = totalAttendees;

    // Calculate progress percentage
    const progress = (totalAttendees / attendanceGoal) * 100;

    // Update progress bar
    progressBar.style.width = progress + "%";

    // Team counter logic
    let teamName = "";

    if (selectedTeam === "water") {
        waterCount++;
        waterDisplay.textContent = waterCount;
        teamName = "Team Water Wise";
    }

    else if (selectedTeam === "zero") {
        zeroCount++;
        zeroDisplay.textContent = zeroCount;
        teamName = "Team Net Zero";
    }

    else if (selectedTeam === "power") {
        powerCount++;
        powerDisplay.textContent = powerCount;
        teamName = "Team Renewables";
    }

    // Personalized greeting
    greeting.textContent =
        "✅ Welcome " +
        attendeeName +
        "! You have checked in to " +
        teamName +
        ".";

    // Celebration when goal reached
    if (totalAttendees >= attendanceGoal) {

        let winningTeam = "";

        if (waterCount >= zeroCount && waterCount >= powerCount) {
            winningTeam = "Team Water Wise";
        }
        else if (zeroCount >= waterCount && zeroCount >= powerCount) {
            winningTeam = "Team Net Zero";
        }
        else {
            winningTeam = "Team Renewables";
        }

        alert(
            "🎉 Attendance goal reached!\n\nWinning Team: " +
            winningTeam
        );
    }

    // Reset form
    form.reset();

});
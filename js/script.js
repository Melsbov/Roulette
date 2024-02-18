const wheel = [
    "00", "0", "r1", "b2", "r3", "b4", "r5", "b6", "r7", "b8", "r9", "b10",
    "b11", "r12", "b13", "r14", "b15", "r16", "b17", "r18", "r19", "b20", "r21",
    "b22", "r23", "b24", "r25", "b26", "r27", "b28", "b29", "r30", "b31", "r32",
    "b33", "r34", "b35", "r36"];

    var button = document.getElementById("spinButton");
    var balanceElement = document.getElementById("balance");
    var betElement = document.getElementById("currentBet");
    var balTotal = document.getElementById("total");
    var spinCounterElement = document.getElementById("spinCounter"); // Element to display spin counter
    var lastResultStartedWithR = false;

    var betAmount = 1
    
    // Extracting the initial balance from the text content
    var balanceText = balanceElement.textContent;
    var balance = parseInt(balanceText.split(": ")[1]); // Extracting the numeric part
    var currentBet = betAmount; // Initial bet
    var spinCounter = 0; // Initial spin counter
    
    var chartData = {
        labels: [],
        balanceData: [],
    };
    
    Window.onload = balancingCorrect();
    
    function balancingCorrect() {
        balance -= currentBet;
        balanceElement.textContent = "Balance: " + balance; // Update the displayed balance
    }
    
    button.addEventListener("click", spinner);
    
    function spinner() {
        console.log("Starting spin...");
        spinCounter++; // Increment the spin counter
        spinCounterElement.textContent = "Spins: " + spinCounter; // Update the displayed spin counter
    
        const resultElement = document.getElementById("result");
        const randomIndex = Math.floor(Math.random() * wheel.length);
        const randomResult = wheel[randomIndex];
        console.log("Random result:", randomResult);
        resultElement.textContent = "Result: " + randomResult;
    
        if (randomResult.charAt(0) === "r") {
            console.log("Balance:", balance);
            console.log("Result starts with 'r'. Doubling balance...");
            resultElement.textContent += " - Starts with 'r'";
            balance += currentBet * 2; // Add double the current bet to the balance
            console.log("Balance doubled to:", balance);
            currentBet = betAmount; // Reset the current bet to 10 for the next round
            lastResultStartedWithR = true;
        } else {
            console.log("Balance:", balance);
            console.log("Result doesn't start with 'r'. Doubling bet...");
            resultElement.textContent += " - Doesn't start with 'r'";
            currentBet *= 2; // Double the current bet for the next round
            console.log("Current bet doubled to:", currentBet);
            lastResultStartedWithR = false;
        }
    
        // Check if balance is zero or negative
        if (balance <= 0) {
            console.log("Balance is zero or negative. Disabling spin button.");
            button.disabled = true; // Disable the spin button
        } else {
            // Update chart data
            chartData.labels.push("Spin " + spinCounter);
            chartData.balanceData.push(balance);
    
            // Draw the line chart
            drawChart();
            setTimeout(spinner, 1); // Adjust the delay as needed
        }
    
        // Subtract the current bet from the balance
        balance -= currentBet;
        console.log("Balance after bet deduction:", balance);
        var sum = balance + currentBet;
        balTotal.textContent = "Total: " + sum;
        balanceElement.textContent = "Balance: " + balance; // Update the displayed balance
        betElement.textContent = "Current Bet: " + currentBet; // Display the current bet
        console.log("End of spin.");
    };

function drawChart() {
    var ctx = document.getElementById('chart').getContext('2d');

    // Check if there's an existing chart instance
    if (window.myChart instanceof Chart) {
        window.myChart.destroy(); // Destroy the existing chart instance
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Balance Over Time',
                data: chartData.balanceData,
                fill: false,
                borderColor: 'rgb(0, 0, 0)',
                tension: 0.1
            }]
        },
        options: {
            animation: false, // Disable animation
            scales: {
                x: {
                    ticks: {
                        color: 'black' // Change the color of the x-axis labels to blue
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black' // Change the color of the y-axis labels to red
                    }
                }
            }
        }
    })};
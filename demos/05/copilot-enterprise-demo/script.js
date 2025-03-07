document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Knowledge Base form handling
    const kbForm = document.querySelector('.kb-form');
    if (kbForm) {
        kbForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const kbName = document.getElementById('kb-name').value;
            const kbDescription = document.getElementById('kb-description').value;
            
            if (!kbName) {
                alert('Please enter a Knowledge Base name');
                return;
            }
            
            // Simulate creation success
            alert(`Knowledge Base "${kbName}" created successfully!`);
            
            // Reset form
            kbForm.reset();
        });
        
        // Add submit event to the button
        const createKbButton = kbForm.querySelector('.primary-button');
        createKbButton.addEventListener('click', function(e) {
            e.preventDefault();
            kbForm.dispatchEvent(new Event('submit'));
        });
    }
    
    // Custom Model Training Simulator
    const trainingSteps = document.querySelectorAll('.training-step');
    const nextButtons = document.querySelectorAll('.next-step-button');
    const restartButton = document.querySelector('.restart-button');
    
    if (nextButtons.length > 0) {
        nextButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // If this is a step with progress bar, simulate progress
                const progressBar = trainingSteps[index].querySelector('.progress-bar');
                if (progressBar) {
                    simulateProgress(progressBar, () => {
                        moveToNextStep(index);
                    });
                } else {
                    moveToNextStep(index);
                }
            });
        });
    }
    
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            trainingSteps.forEach((step, index) => {
                step.classList.remove('active');
                
                // Reset progress bars
                const progressBar = step.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
                
                // Activate only the first step
                if (index === 0) {
                    step.classList.add('active');
                }
            });
        });
    }
    
    function moveToNextStep(currentIndex) {
        if (currentIndex < trainingSteps.length - 1) {
            trainingSteps[currentIndex].classList.remove('active');
            trainingSteps[currentIndex + 1].classList.add('active');
        }
    }
    
    function simulateProgress(progressBar, callback) {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                if (callback) callback();
            } else {
                width += 5;
                progressBar.style.width = width + '%';
            }
        }, 100);
    }
    
    // ROI Calculator
    const calculateButton = document.getElementById('calculate-roi');
    if (calculateButton) {
        // Update slider values in real-time
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(slider => {
            const valueDisplay = slider.nextElementSibling;
            slider.addEventListener('input', () => {
                valueDisplay.textContent = slider.value + '%';
            });
        });
        
        calculateButton.addEventListener('click', calculateROI);
        
        // Initial calculation
        calculateROI();
    }
    
    function calculateROI() {
        // Get input values
        const numDevelopers = parseInt(document.getElementById('num-developers').value) || 100;
        const avgSalary = parseInt(document.getElementById('avg-salary').value) || 120000;
        const codingTime = parseInt(document.getElementById('coding-time').value) || 60;
        const newHires = parseInt(document.getElementById('new-hires').value) || 20;
        const onboardingTime = parseFloat(document.getElementById('onboarding-time').value) || 3;
        
        // Get impact factors
        const codeCompletionFactor = parseInt(document.getElementById('code-completion').value) / 100;
        const bugReductionFactor = parseInt(document.getElementById('bug-reduction').value) / 100;
        const onboardingAccelerationFactor = parseInt(document.getElementById('onboarding-acceleration').value) / 100;
        const timeToMarketFactor = parseInt(document.getElementById('time-to-market').value) / 100;
        
        // Calculate savings
        const hourlyRate = avgSalary / 2080; // 2080 = 40 hours * 52 weeks
        const codingHoursPerYear = 2080 * (codingTime / 100);
        
        // Developer time savings
        const timeSavings = numDevelopers * hourlyRate * codingHoursPerYear * codeCompletionFactor;
        
        // Onboarding savings
        const onboardingSavings = newHires * (avgSalary / 12) * onboardingTime * onboardingAccelerationFactor;
        
        // Total benefits (simplified for demo)
        const totalBenefits = timeSavings + onboardingSavings;
        
        // Estimated investment (simplified formula based on number of developers)
        const estimatedInvestment = numDevelopers * 2500; // $2,500 per developer per year (example)
        
        // ROI calculation
        const roi = ((totalBenefits - estimatedInvestment) / estimatedInvestment) * 100;
        
        // Payback period in months
        const paybackPeriod = (estimatedInvestment / totalBenefits) * 12;
        
        // Update results
        document.getElementById('time-savings').textContent = '$' + formatNumber(timeSavings);
        document.getElementById('onboarding-savings').textContent = '$' + formatNumber(onboardingSavings);
        document.getElementById('total-benefits').textContent = '$' + formatNumber(totalBenefits);
        document.getElementById('total-investment').textContent = '$' + formatNumber(estimatedInvestment);
        document.getElementById('roi-percentage').textContent = Math.round(roi) + '%';
        document.getElementById('payback-period').textContent = paybackPeriod.toFixed(1) + ' months';
        
        // Update chart
        updateROIChart(totalBenefits, estimatedInvestment);
    }
    
    function formatNumber(num) {
        return Math.round(num).toLocaleString('en-US');
    }
    
    // ROI Chart
    let roiChart;
    
    function updateROIChart(benefits, investment) {
        const ctx = document.getElementById('roi-chart');
        
        // Destroy existing chart if it exists
        if (roiChart) {
            roiChart.destroy();
        }
        
        // Create new chart
        roiChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Investment', 'Benefits'],
                datasets: [{
                    label: 'ROI Comparison',
                    data: [investment, benefits],
                    backgroundColor: [
                        '#6a737d',
                        '#2188ff'
                    ],
                    borderColor: [
                        '#24292e',
                        '#0366d6'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}); 
(function() {
    window.addEventListener('load', function() {
        const performanceData = window.performance.getEntriesByType("navigation")[0];
    
        const loadTime = performanceData.domComplete;
    
        const statsText = `
            Время полной загрузки: ${loadTime.toFixed(2)} ms <br>
        `;
    
        const statsElement = document.createElement('div');
        statsElement.innerHTML = statsText;
        statsElement.style.padding = '10px';
        statsElement.style.fontSize = '12px';
        statsElement.style.backgroundColor = '#C4DBEA';
    
        const footer = document.querySelector('footer');
        if (footer) {
            footer.appendChild(statsElement);
        }
    });
})();

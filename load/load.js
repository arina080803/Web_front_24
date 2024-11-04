(function() {
    window.addEventListener('load', function() {
        const performanceData = performance.getEntriesByType("navigation")[0];

        const loadTime = performanceData.loadEventEnd - performanceData.loadEventStart;
        const domContentLoaded = performanceData.domContentLoadedEventEnd - performanceData.domContentLoadedEventStart;
        const totalPageLoad = performanceData.duration;

        const statsText = `
            Время полной загрузки: ${loadTime.toFixed(2)} ms <br>
            DOMContentLoaded: ${domContentLoaded.toFixed(2)} ms <br>
            Общее время загрузки страницы: ${totalPageLoad.toFixed(2)} ms
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

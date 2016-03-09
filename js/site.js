$(document).ready(function() {
    $('#fullpage').fullpage({
        // Navigation
        menu: '#menu',
        anchors: ['home', 'about', 'languages', 'volunteering'],
        navigation: true,
        navigationPosition: 'right',
        showActiveTooltip: false,
        
        // Design
        controlArrows: true,
        verticalCentered: true,
        resize : false,
        sectionsColor : ['#FFF', '#FFF', '#1589A9'],
        paddingTop: '3em',
        paddingBottom: '10px',
        
        // Scrolling
        scrollOverflow: true
    });
})
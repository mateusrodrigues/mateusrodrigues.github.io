$(document).ready(function() {
    $('#fullpage').fullpage({
        // Navigation
        menu: '#menu',
        anchors: ['home', 'about', 'languages', 'volunteering'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Home', 'About', 'Languages', 'Volunteering'],
        showActiveTooltip: false,
        
        // Design
        controlArrows: true,
        verticalCentered: true,
        resize : false,
        sectionsColor : ['#FFF', '#FFF', '#33C3F0'],
        paddingTop: '3em',
        paddingBottom: '10px',
        
        // Scrolling
        scrollOverflow: true
    });
})
$(document).ready(function() {
    $('#fullpage').fullpage({
        // Navigation
        menu: '#menu',
        anchors: ['home', 'about', 'languages'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Home', 'About', 'Languages'],
        showActiveTooltip: false,
        
        // Design
        controlArrows: true,
        verticalCentered: true,
        resize : false,
        sectionsColor : ['#FFF', '#33C3F0'],
        paddingTop: '3em',
        paddingBottom: '10px',
        fixedElements: '#menu, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,
    });
})
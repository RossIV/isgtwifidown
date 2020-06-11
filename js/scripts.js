$( document ).ready(function() {
    var quips_operational_title = [
        "Nope, it's just you.",
        "Looks good to me!",
        "Full steam ahead, Captain!",
        "All good here!"
    ];
    var quips_inop_title = [
        "Looks like something's wrong.",
        "What'd you do this time?",
        "Great, you broke the internet!",
        "Welp, there goes our uptime.",
        "#justgtwifithings"
    ];
    var quips_operational_content = [
        "Have you tried the troubleshooting steps on the <a href='http://lawn.gatech.edu'>LAWN website</a>?",
        "Live on campus? Stop by the <a href='https://techsupport.gatech.edu/about-us#offices'>Wreck Techs service hubs</a> for help!",
        "Want help? Stop by the <a href='http://techsupport.gatech.edu'>OITESDPBWTFKATSC (OIT Enterprise Service Desk powered by Wreck Techs formerly known as Technology Support Center)</a> in Clough next to Starbucks.",
        "Be a good network citizen! Refrain from using mobile hotspots on campus unless absolutely necessary."
    ];
    var quips_inop_content = [
        "While you're waiting, why not check out <a href='http://robojackets.org'>RoboJackets</a>?",
        "Go get a cup of coffee (or apple juice) and it might be back up by then.",
        "Don't you have homework to do? Oh wait...",
        '<iframe width="320" height="240" src="https://www.youtube.com/embed/Vywf48Dhyns?start=164&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '<iframe width="320" height="240" src="https://www.youtube.com/embed/ILVfzx5Pe-A?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        '<iframe width="320" height="240" src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    ];

    var quips_inop_append = "<br/>Full details can be found on the <a href='http://status.gatech.edu'>GT OIT Status Page</a>.";

    $.getJSON("https://2589849383268831.hostedstatus.com/1.0/status/5be9af0e5638b904c2030699")
        .done(function (data) {
            var override = getParameterByName('override');
            var all_statuses = data.result.status;
            var network_status = all_statuses.find(element => element.name === "Network");
            var network_containers = network_status.containers;
            var lawn_container = network_containers.find(element => element.name === "LAWN");
            var campusnet_container = network_containers.find(element => element.name === "Campus Network");

            if (lawn_container.status == "Degraded Performance" || override == "degraded") {
                var rand_title = Math.floor(Math.random() * quips_inop_title.length);
                var rand_content = Math.floor(Math.random() * quips_inop_content.length);
                $('#title').text(quips_inop_title[rand_title]);
                $('#status').text("LAWN is currently in a degraded state.");
                $('#content').html(quips_inop_content[rand_content] + quips_inop_append);
                $('body').css("background-color", "goldenrod");
            } else if (lawn_container.status == "Partial Service Disruption" || override == "partial") {
                var rand_title = Math.floor(Math.random() * quips_inop_title.length);
                var rand_content = Math.floor(Math.random() * quips_inop_content.length);
                $('#title').text(quips_inop_title[rand_title]);
                $('#status').text("There is a partial LAWN outage.");
                $('#content').html(quips_inop_content[rand_content]+ quips_inop_append)
                $('body').css("background-color", "orange");
            } else if (lawn_container.status == "Service Disruption" || override == "major") {
                var rand_title = Math.floor(Math.random() * quips_inop_title.length);
                var rand_content = Math.floor(Math.random() * quips_inop_content.length);
                $('#title').text(quips_inop_title[rand_title]);
                $('#status').text("There is a major LAWN outage.");
                $('#content').html(quips_inop_content[rand_content]+ quips_inop_append)
                $('body').css("background-color", "red");
            } else if (lawn_container.status == "Operational" && override == null) {
                var rand_title = Math.floor(Math.random() * quips_operational_title.length);
                var rand_content = Math.floor(Math.random() * quips_operational_content.length);
                $('#title').text(quips_operational_title[rand_title]);
                $('#status').text("No issues currently reported for LAWN.");
                $('#content').html(quips_operational_content[rand_content]);
                $('body').css("background-color", "green");
            } else {
                $('#title').text("I'm not quite sure.");
                $('#status').text("Something went wrong while checking the status.");
                $('#content').html(quips_inop_append);
                $('body').css("background-color", "#333");
            }
        })
        .fail(function (error) {
            $('#title').text("I'm not quite sure.");
            $('#status').html("Unable to reach <a href='http://status.gatech.edu'>status.gatech.edu</a>.");
            $('body').css("background-color", "#333");
        })

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});
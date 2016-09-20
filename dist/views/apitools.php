<?php include "header.htm";?>
<div class="container" style="padding-top:50px">
    <div class="row">
        <div class="col-md-9">
            <h2>Domain Management</h2>
            <p>Create new domains, or delete or update existing domains</p>
            <script>
                $(window).load(function() {
                    $.ajax({
                        url: "/api/populate.php",
                        global: false,
                        type: "POST",
                        cache: false,
                        dataType: "json",
                        data: {
                            'cmd': 'unique_group'
                        },
                        success: function(response) {
                            for (var k in response) {
                                $('.table').find('tbody').append('<tr id ="' + response[k]["api_group"] + '"><td>' + response[k]["api_group"] + '</td><td><div class="dropdown"><button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">View API(s)<span class="caret"></span></button><ul class="dropdown-menu">');
                            }
                        }
                    });
                    $.ajax({
                        url: "/api/populate.php",
                        global: false,
                        type: "POST",
                        dataType: "json",
                        data: {
                            'cmd': 'group',
                        },
                        success: function(data) {
                                for (var n in data) {
                                    $('#' + data[n]["api_group"]).find(".dropdown-menu").append('<li><a href="#">' + data[n]["name"] + '</a></li>');
                                }
                            }
                    });
                });
            </script>
            <table class="table table-condensed table-hover" id='group'>
                <thead>
                    <tr>
                        <th>Domain Name</th>
                        <th>Expand</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
<?php include "footer.htm";?>

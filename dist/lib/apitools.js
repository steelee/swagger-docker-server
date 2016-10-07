var DomainTools = function() {

        return {
            populate_window: function() {
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
                            if (response[k]["api_group"] == "No_Group") {
                                var del_button = "<td></td>";
                                var editable = "not_editable"
                            } else {
                                var del_button = '<td><button type="button" id = "' + response[k]['api_group'] + '" class="btn btn-danger">Delete!</button></td>'
                                var editable = "editable"
                            }
                            $('#group').find('tbody').append('<tr id ="' + response[k]["api_group"] + '"><td><a href="#" data-type="text" data-url="/api/update.php" data-name="update_group_name" data-pk="' + response[k]['api_group'] + '" data-title="Edit Domain Name"  id="' + response[k]["api_group"] + '_' + editable + '" >' + response[k]["api_group"] + '</td><td><div class="dropdown"><button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">View API(s)<span class="caret"></span></button><ul class="dropdown-menu"></td>' + del_button);
                            $('#' + response[k]["api_group"] + "_editable").editable();
                            $('#fuzzOptionsTarget').append('<option value="' + response[k]["api_group"] + '" > ' + response[k]["api_group"] + '</option>');
                        }
                        $('.btn-danger').on("click", function() {
                            $.ajax({
                                url: "/api/update.php",
                                global: false,
                                type: "POST",
                                dataType: "json",
                                data: {
                                    'name': 'delete_group',
                                    'group': $(this).attr('id')
                                },
                                success: function(result) {
                                    $("#supplement").empty();
                                    $('#' + result).remove();
                                    $("#supplement").append('<div class="alert alert-warning"><strong>Complete! </strong> Group ' + result + ' deleted!</div>');
                                }
                            });
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
                                    $('#fuzzOptionsList').append('<option value="' + data[n]["name"] + '" > ' + data[n]["name"] + ' (' + data[n]["api_group"] + ') </option>');
                                }
                                $('#fuzzOptionsList').fuzzyDropdown({
                                    mainContainer: '#fuzzSearch',
                                    arrowUpClass: 'fuzzArrowUp',
                                    selectedClass: 'selected',
                                    enableBrowserDefaultScroll: true
                                });
                                $('#fuzzOptionsTarget').fuzzyDropdown({
                                    mainContainer: '#fuzzSearchTarget',
                                    arrowUpClass: 'fuzzArrowUp',
                                    selectedClass: 'selected',
                                    enableBrowserDefaultScroll: true
                                });
                            }
                        });
                    }
                });
            },

            dropdown: function() {
                $("#change").on("click", function() {
                    var api = $("#fuzzOptionsList").val();
                    if ($("#new_group_entry").val() != undefined) {
                        var group = $("#new_group_entry").val();
                    } else if ($("#fuzzOptionsTarget").val() == undefined) {
                        $("#supplement").empty();
                        $("#supplement").append('<div class="alert alert-warning"><strong>Complete!</strong></div>');
                        return;
                    } else {
                        var group = $("#fuzzOptionsTarget").val();
                    }
                    $.ajax({
                        url: "/api/update.php",
                        global: false,
                        type: "POST",
                        dataType: "json",
                        data: {
                            'name': 'update_group_member',
                            'api': api,
                            'group': group
                        },
                        success: function(values) {
                            $("#supplement").empty();
                            $("#supplement").append('<div class="alert alert-warning"><strong>Complete! </strong> API ' + values + '</div>');

                        }
                    });

                });

                $("#new_group_button").on("click", function() {
                    $('#new_target').slideUp();
                    $('#new_entry').append('<input type="text" id="new_group_entry" class="fuzzMagicBox" placeholder="New Domain Name" />');
                });
            }
        };
};

QUnit.config.reorder = false;
QUnit.module("Remote URL Swagger file operations", function() {
    QUnit.test('File upload via remote url', function(assert) {
        var done_fetch = assert.async();
        $.ajax({
            data: {
                'url': 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/petstore-with-external-docs.json',
                'new_group': 'testing-qunit',
                'new_owner_name': 'test_user',
                'new_owner_email': 'testing@test.test'
            },
            url: "/api/add.php",
            global: false,
            type: "POST",
            cache: false,
            success: function(response) {
                assert.ok(true, "File uploaded");
                done_fetch();
            }
        });
    });

    QUnit.test('File link in database', function(assert) {
        var done_check = assert.async();
        $.ajax({
            data: {
                'cmd': 'group_members',
                'name': 'testing-qunit'
            },
            url: "/api/populate.php",
            global: false,
            type: "POST",
            cache: false,
            dataType: 'json',
            success: function(result) {
                assert.equal("petstore-with-external-docs", result[0]["name"], "File exists in database");
                done_check();
            }
        });
    });

    QUnit.test('Delete entry from database', function(assert) {
        var done_delete = assert.async();
        $.ajax({
            data: {
                'cmd': 'del_by_group',
                'api_group': 'testing-qunit'
            },
            url: "/api/delete.php",
            global: false,
            type: "POST",
            cache: false,
            dataType: 'json',
            success: function(result) {
                assert.ok("true", "File deleted from database");
                done_delete();
            }
        });
    });

    QUnit.test('Confirm file deleted', function(assert) {
        var done_delete_check = assert.async();
        $.ajax({
            data: {
                'cmd': 'group_members',
                'name': 'testing-qunit'
            },
            url: "/api/populate.php",
            global: false,
            type: "POST",
            cache: false,
            success: function(result) {
                assert.equal("[]", result, "File deleted");
                done_delete_check();
            }
        });
    });
});

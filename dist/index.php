<?php include 'header.htm';?>
		<div id="swagger-ui-container" class="swagger-ui-wrap"></div>
    <div id="add_api_form" class="hidden">
        <form id='api_selector' method="post" name="api_selector" class="form-inline">
            <div class='form-group'>
                <label for="api">API URL:</label>
                <input id="api" placeholder="http://example.com/api" type=
                "text">
            </div><input type="submit" value="Add API">
        <div class="clearfix"></div>
        </form>
        <div id="local_selector">
            <form action="api/upload.php" enctype="multipart/form-data" id=
            "local_selector" method="post" name="local_selector">
                <div class='input'>
                    <input id="upfile" name="upfile" type="file">
                </div><input type="submit" value="Add API">
            </form>
        </div>
    </div>

        </div>
      </div>
    </div>
<?php include 'footer.htm';?>

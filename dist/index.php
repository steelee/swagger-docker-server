<?php session_start(); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Swagger UI</title>
    <link rel="icon" type="image/png" href="images/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="images/favicon-16x16.png" sizes="16x16" />
    <link href='css/typography.css' media='screen' rel='stylesheet' type='text/css' />
    <link href='css/reset.css' media='screen' rel='stylesheet' type='text/css' />
    <link href='css/screen.css' media='screen' rel='stylesheet' type='text/css' />
    <link href='css/reset.css' media='print' rel='stylesheet' type='text/css' />
    <link href='css/print.css' media='print' rel='stylesheet' type='text/css' />

    <script src='lib/object-assign-pollyfill.js' type='text/javascript'></script>
    <script src='lib/jquery-1.8.0.min.js' type='text/javascript'></script>
    <script src='lib/jquery.slideto.min.js' type='text/javascript'></script>
    <script src='lib/jquery.wiggle.min.js' type='text/javascript'></script>
    <script src='lib/jquery.ba-bbq.min.js' type='text/javascript'></script>
    <script src='lib/handlebars-2.0.0.js' type='text/javascript'></script>
    <script src='lib/js-yaml.min.js' type='text/javascript'></script>
    <script src='lib/lodash.min.js' type='text/javascript'></script>
    <script src='lib/backbone-min.js' type='text/javascript'></script>
    <script src='gen-swagger.js' type='text/javascript'></script>
    <script src='swagger-ui.js' type='text/javascript'></script>
    <script src='lib/highlight.9.1.0.pack.js' type='text/javascript'></script>
    <script src='lib/highlight.9.1.0.pack_extended.js' type='text/javascript'></script>
    <script src='lib/jsoneditor.min.js' type='text/javascript'></script>
    <script src='lib/marked.js' type='text/javascript'></script>
    <script src='lib/swagger-oauth.js' type='text/javascript'></script>
</head>
<body class="swagger-section">
    <div id='header'>
        <div class="swagger-ui-wrap">
            <button type="Button" style="float:right" id="local">Use Local File</button>
            <button type="Button" style="float:right; display:none;" id="remote">Use Remote Link</button>
            <a id="logo" href="/"><img class="logo__img" alt="swagger" height="30" width="30" src="images/logo_small.png" /><span class="logo__title"></span></a>
            <form id='api_selector' method="POST">
                <div class='input'><input placeholder="http://example.com/api" type="text" id="api" /></div>
                <input type="submit" value="Add API">
            </form>
            <div style="display:none" id="local_selector">
                <form method="post" enctype="multipart/form-data" action="api/upload.php" id="local_selector">
                    <div class='input'><input type="file" name="upfile" id="upfile" /></div>
                    <input type="submit" value="Add API">
                </form>
            </div>
        </div>
    </div>
    <div id="menu-bar" </div>
<?php
echo $_SESSION['hello'];
?>
        <div id="message-bar" class="swagger-ui-wrap" data-sw-translate>&nbsp;</div>
        <div id="swagger-ui-container" class="swagger-ui-wrap"></div>
</body>
</html>

    <script src='/lib/apitools.js' type='text/javascript'>
    </script>
    <script>
    $("#management").load("/views/domain.htm", function() {
    var domain = DomainTools();
    domain.populate_window();
    domain.dropdown();
    });
    </script>
    <div id ="management"></div>

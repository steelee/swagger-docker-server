<?php include 'views/header.htm';?>
<div class="col-sm-3 col-md-2 sidebar" id="menu_bar">
   <input type="search" value="" placeholder="  Search" class="form-control list-group" id="search"/>
   <h3>Inventory</h3>
   <ul class="nav nav-pills nav-stacked sidebar-text" id="listprime">
   </ul>
</div>
<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2" id="owner-info">
</div>
<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main swagger-ui-wrap">
<?php
   if(isset($_SESSION['status'])){
           echo '<div class="alert alert-info"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' . $_SESSION['status'] . '</div>';
           $_SESSION['status'] = null;
   }
   ?>
<div id="owners-box">
</div>
<div id="dialog">
</div>
<div id="swagger-ui-container" class="swagger-ui-wrap"></div>
<div id="add_api_form" class="hidden">
   <script>
      $('#swagger-ui-container').prepend($('<img>',{id:'loading',src:'images/load.gif'}))
   </script>
</div>
<?php include 'views/footer.htm';?>

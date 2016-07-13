<?php include 'header.htm';?>
 <div class="col-sm-3 col-md-2 sidebar" id="menu_bar">
	  <input type="search" value="" placeholder="Search" class="form-control" id="search"/>
          <ul class="nav nav-sidebar" id="listprime">
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main swagger-ui-wrap">
        <?php
        if(isset($_SESSION['status'])){
                echo '<div class="alert alert-info"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' . $_SESSION['status'] . '</div>';
                $_SESSION['status'] = null;
        }
        ?>
<div id="swagger-ui-container" class="swagger-ui-wrap"></div>
<div id="add_api_form" class="hidden">
    <h4>Add an API through a remote link or upload a file from your computer</h4>
     <form id='api_selector' method="post" name="api_selector">
     <div class="form-group ">
      <label class="control-label requiredField">
       URL
      </label>
      <input class="form-control" id="url" name="url" placeholder="http://example.com/file.yaml" type="text"/>
     </div>
     <div class="form-group">
      <div>
       <button class="btn btn-primary " name="submit" type="submit">
        Submit Link
       </button>
      </div>
     </div>
    </form>
     <form action="api/upload.php" enctype="multipart/form-data" id= "local_selector" method="post" name="local_selector"><div class="form-group">
      <label class="control-label requiredField">
       File 
      </label>
      <input id="upfile" name="upfile" type="file">
     </div>
     <div class="form-group">
      <div>
       <button class="btn btn-primary " name="submit" type="submit">
        Submit File
       </button>
      </div>
     </div>
    </form>
</div>
<?php include 'footer.htm';?>

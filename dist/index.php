<?php include 'views/header.htm';?>
<div class="col-sm-3 col-md-2 sidebar" id="menu_bar">
   <input type="search" value="" placeholder="  Search" class="form-control list-group" id="search"/>
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
<div id="swagger-ui-container" class="swagger-ui-wrap"></div>
<div id="add_api_form" class="hidden">
   <script>
      $(document).ready(function(){
            $.ajax({
            url: "/api/populate.php",
            global: false,
            type: "POST",
            cache: false,
            dataType: "json",
            data: {'cmd':'unique_group'},
            success: function(response){
            for(var k in response){
      $('#dropdown_url')
      .append($("<option></option>")
                .attr("value",response[k]["api_group"])
                .text(response[k]["api_group"])); 
      $('#dropdown_file')
      .append($("<option></option>")
                .attr("value",response[k]["api_group"])
                .text(response[k]["api_group"])); 
            }
      }  
      });
        $.ajax({
            url: "/api/populate.php",
            global: false,
            type: "POST",
            cache: false,
            dataType: "json",
            data: {'cmd':'owners'},
            success: function(response){
            for(var k in response){
      $('#dropdown_owner')
      .append($("<option></option>")
                .attr("value",response[k]["contact"]+":"+response[k]["owner"])
                .text(response[k]["owner"]+ " (" +response[k]["contact"]+")")); 
      $('#dropdown_owner_file')
      .append($("<option></option>")
                .attr("value",response[k]["contact"]+":"+response[k]["owner"])
                .text(response[k]["owner"]+ " (" +response[k]["contact"]+")")); 
		}
	}
	});
      });
   </script>
   <h4>Add an API through a remote link or upload a file from your computer</h4>
   <form id='api_selector' method="post" name="api_selector" action="api/add.php">
      <div class="form-group ">
         <label class="control-label requiredField">
         URL
         </label>
         <input class="form-control" required id="url" name="url" placeholder="http://example.com/file.yaml" type="text"/>
      </div>
      <div class="form-group">
         <label class="control-label requiredField">
         Group 
         </label>
         <select id="dropdown_url" name="dropdown">
            <option value="none">No Group</option> 
         </select>
	<a href="#" id="create_group_url"<b>+</b> Create New Group</a>
      </div>   
      <div class="form-group hidden" id="add_group_url">
         <label class="control-label">
         New Group Name 
         </label>
         <input class="form-control" id="new_group" name="new_group" placeholder="Group" type="text"/>
	</div>
      <div class="form-group">
         <label class="control-label requiredField">
         Owner 
         </label>
         <select id="dropdown_owner" name="dropdown_owner" required>
            <option value="">Owner Required</option> 
         </select>
	<a href="#" id="create_group_url_owner"<b>+</b> Create New Owner</a>
      </div>   
      <div class="form-group hidden" id="add_group_url_owner">
         <label class="control-label">
         New Owner Name 
         </label>
         <input class="form-control" id="new_owner_name" name="new_owner_name" placeholder="Owner name" type="text"/>
         <label class="control-label">
         New Owner Email 
         </label>
         <input class="form-control" id="new_owner_email" name="new_owner_email" placeholder="Owner email" type="email"/>
	</div>
      <div class="form-group">
         <div>
            <button class="btn btn-primary " name="submit" type="submit">
            Submit Link
            </button>
         </div>
      </div>
   </form>
   <form action="api/upload.php" enctype="multipart/form-data" id= "local_selector" method="post" name="local_selector">
      <div class="form-group">
         <label class="control-label requiredField">
         File 
         </label>
         <input id="upfile" name="upfile" required type="file">
      </div>
      <div class="form-group">
         <label class="control-label requiredField">
         Group 
         </label>
         <select id="dropdown_file" name="dropdown">
            <option value="none">No Group</option> 
         </select>
	<a href="#" id="create_group_file"<b>+</b> Create New Group</a>
      </div>   
      <div class="form-group hidden" id="add_group_file">
         <label class="control-label">
         New Group Name 
         </label>
         <input class="form-control" id="new_group" name="new_group" placeholder="Group" type="text"/>
	</div>
      <div class="form-group">
         <label class="control-label requiredField">
         Owner 
         </label>
         <select id="dropdown_owner_file" name="dropdown_owner" required>
            <option value="">Owner Required</option> 
         </select>
	<a href="#" id="create_group_file_owner"<b>+</b> Create New Owner</a>
      </div>   
      <div class="form-group hidden" id="add_group_file_owner">
         <label class="control-label">
         New Owner Name 
         </label>
         <input class="form-control" id="new_owner_name" name="new_owner_name" placeholder="Owner name" type="text"/>
         <label class="control-label">
         New Owner Email 
         </label>
         <input class="form-control" id="new_owner_email" name="new_owner_email" placeholder="Owner email" type="email"/>
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
<?php include 'views/footer.htm';?>

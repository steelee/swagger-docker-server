<?php include "header.htm";?>
<script src='/lib/apitools.js' type='text/javascript'></script>
<script>
$(window).load(function() {
var domain = DomainTools();
domain.populate_window();
domain.dropdown();
});
</script>
<div class="container" style="padding-top:50px">
    <div class="row">
        <div class="col-md-9">
            <h2>Domain Management</h2>
            <p>Create new domains, or delete or update existing domains</p>
	    <p>Click a domain name to edit it</p>
            <table class="table table-condensed table-hover" id='group'>
                <thead>
                    <tr>
                        <th>Domain Name</th>
                        <th>Expand</th>
			<th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
<h3> Reassign </h3>

<div id="reassign">
<select id="fuzzOptionsList">
</select>
<div id="fuzzSearch">
  <div id="fuzzNameContainer">
    <span class="fuzzName"></span>
  </div>
  <div id="fuzzDropdownContainer">
    <input type="text" value="" class="fuzzMagicBox" placeholder="search.." />
    <span class="fuzzSearchIcon"></span>
    <ul id="fuzzResults">
    </ul>
  </div>
<h3>To group:</h3>
<div id = "new_target">
<select id="fuzzOptionsTarget">
</select>
<div id="fuzzSearchTarget">
  <div id="fuzzNameContainer">
    <span class="fuzzName"></span>
  </div>
  <div id="fuzzDropdownContainer">
    <input type="text" value="" class="fuzzMagicBox" placeholder="search.." />
    <span class="fuzzSearchIcon"></span>
    <ul id="fuzzResults">
    </ul>
<button type="button" class="btn btn-info" id="new_group_button" >Create New Group</button>
  </div>
</div>
</div>
<div id="new_entry">
</div>
<br>
<button type="button" class="btn btn-success" id="change">Confirm</button>
<?php include "footer.htm";?>

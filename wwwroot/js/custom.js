
/*var js = jQuery.noConflict(true);*/

/*jQuery.noConflict();*/
//jQuery(document).ready(function () {
$(document).ready(function () {
    //js('#myTable').DataTable({

    //})

    ShowData();
});

//function LoadListing() {
//    var object = [];
//    $.ajax({
//        url: '/Ajax/CategoryList',
//        type: 'Get',
//        async: false,
//        success: function (result) {
//            console.log(result);
//            $.each(result, function (index, item) {
//                object.push([item.name])
//            });
//        },
//        error: function () {
//            alert("Data can't get");
//        }
//    });
    

//}

function ShowData() {
    var object = '';
    $.ajax({
        url: '/Ajax/CategoryList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8;',
        success: function (result, statu, xhr) {
            
            console.log(result);
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.name + '</td>';
                object += '<td> <a href="#" class="btn btn-primary" onclick="EditCategory(' + item.categoryId + ')" >Edit</a> || <a href="#" class="btn btn-danger" onclick="DeleteCategory(' + item.categoryId + ')">Delete</a> </td>';
                object += '</tr>';
            });

            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }
    })

    //$("#myTable").DataTable({
    //    "responsive": true, "lengthChange": false, "autoWidth": false,
    //    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    //}).buttons().container().appendTo('#myTable_wrapper .col-md-6:eq(0)');

}



$('#AddCategory').click(function () {
    //jQuery('#CategoryModal').modal('show');
    $('#CategoryModal').modal('show');
});



////////////////////////////////////////////////////////////////////////



//$('#AddCategoryButtun').click(function () {
//    if ($('#form_submit').valid()) {
//        $('#form_submit').submit();
//    }
//    else {
//        return false;
//    }
//});





$("#form_submit").on("submit", function (event) {
    event.preventDefault();
    var objData = {
        Name: $("#Name").val()
    }
    //var fd = new FormData();
    //fd.append('Name', $("#Name").val());
    $.ajax({
        url: '/Ajax/AddCategory',
        type: 'Post',
        data: objData,
        dataType: 'json',
        async: false, 
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        success: function (data) {
            if (data.result == true) {
                HideModalPopUp();
                
                //$("#name_msg").html(data.message);
                ClearTextBox();
                ShowData()
                alert(data.message);
            }
            else {
                $("#name_msg").html(data.message);
            }
            
        },
        error: function () {
            alert("Data can't Saved");
        }
    });

});


////////////////////////////////////////




//function AddCategory() {
//    var objData = {
//        Name: $("#Name").val()
//    }

//    if (objData.Name != '' && objData.Name != null) {
//        $("#Name").css('border-color', '#ccc');


//        //var fd = new FormData();
//        //fd.append('Name', $("#Name").val());
//        $.ajax({
//            url: '/Ajax/AddCategory',
//            type: 'Post',
//            data: objData,
//            dataType: 'json',
//            contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
//            success: function () {
//                alert("Data is saved");
//                ClearTextBox();
//                ShowData()
//                HideModalPopUp();
//            },
//            error: function () {
//                alert("Data can't Saved");
//            }
//        });
//    }


//    else {
//        $("#Name").css('border-color', 'red');
//        $("#errmsg").html("Please Enter Category name");
        
//    }
    
//}



function HideModalPopUp() {
    $('#CategoryModal').modal('hide');
}


function ClearTextBox() {
    $('#Name').val('');
}

////////////////////////////////////////////////////////                    Delete                  /////////////////////////////////////////////////




function DeleteCategory(id) {
    var objData = {
        Name: $("#Name").val()
    }

    if (confirm('Are you sure you want to delete this? ')) {
        $.ajax({
            url: '/Ajax/DeleteCategory?id=' + id,
            success: function () {
                ShowData()
            },
            error: function () {
                alert("Data can't be Deleted");
            }
        });
    }
    else {
        ShowData()
    }


        
}



////////////////////////////////////////////////////////                    Edit                  /////////////////////////////////////////////////


function EditCategory(id) {
    
    $.ajax({
        url: '/Ajax/EditCategory?id=' + id,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',

        success: function (response) {
            $("#CategoryId").val(id);
            $('#CategoryModal').modal('show');
            /*alert("Data is Edited");*/
            $('#Name').val(response.name);

            $('#AddCategoryButtun').hide();
            $('#AddCategoryButtun').css('display', 'none');
            $('#btnUpdate').show();
            ShowData();
        },
        error: function () {
            alert("Data can't be edited");
        }
    });
}


function UpdateCategory() {
    var objData = {
        Name: $("#Name").val(),
        CategoryId: $("#CategoryId").val()
    }


    $.ajax({
        url: '/Ajax/UpdateCategory',
        type: 'Post',
        data: objData,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        success: function () {
            alert("Data is edited");
            ClearTextBox();
            ShowData()
            HideModalPopUp();
            $("#CategoryId").val(0);
        },
        error: function () {
            alert("Data can't edited");
        }
    });

}
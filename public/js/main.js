$(document).ready(function () {
// delete
    $("#clearBtn").on("click", () => {
        $.ajax({
            method: "DELETE",
            url: "/clear"
        })
            .then(function (data) {
                window.location.reload();
            });
    });

// scrape
    $("#scrapeBtn").on("click", () => {
        $.ajax({
            method: "POST",
            url: "/scrape"
        })
            .then(function (data) {
                window.location.reload();
            });
    });

  //save
    $(document).on("click", ".saveBtn", function () {
        let thisId = $(this).attr("data-ObjectId");
        let thisTitle = $(this).attr("data-Title");

        $.ajax({
            method: "PUT",
            url: "/save/" + thisId,
            data: thisTitle
        })
            .then(function (data) {
                window.location.reload();
            });
    });

 //delete
    $(document).on("click", ".unSaveBtn", function () {
        let thisId = $(this).attr("data-ObjectId");

        $.ajax({
            method: "PUT",
            url: "/unsave/" + thisId
        })
            .then(function (data) {
                window.location.reload();
            });
    });

   
});

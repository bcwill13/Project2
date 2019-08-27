// Get references to page elements
var $journalTitle = $("#journal-title");
var $journalDescription = $("#journal-description");
var $submitBtn = $("#submit");
var $journalList = $("#journal-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveJournal: function(journal) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "apix/journals",
      data: JSON.stringify(journal)
    });
  },
  getJournals: function() {
    return $.ajax({
      url: "api/journals",
      type: "GET"
    });
  },
  deleteJournal: function(id) {
    return $.ajax({
      url: "api/journals/" + id,
      type: "DELETE"
    });
  }
};

// refreshJournals gets new journals from the db and repopulates the list
var refreshJournals = function() {
  API.getJournals().then(function(data) {
    var $journals = data.map(function(journal) {
      var $a = $("<a>")
        .text(journal.title)
        .attr("href", "/journal/" + journal.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": journal.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $journalList.empty();
    $journalList.append($journals);
  });
};

// handleFormSubmit is called whenever we submit a new journal
// Save the new journal to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("handleFormSubmit called"); // not seeing this in any console!
  var tagsArray = [];
  // fetching tags from gui...
  $("chip").each(function() {
    tagsArray.push(
      $(this)
        .val()
        .trim()
    );
  });
  console.log("tagsArray:" + JSON.stringify(tagsArray));

  // var journal = {
  //   title: $journalTitle.val().trim(),
  //   description: $journalDescription.val().trim(),
  //   tags: ["Hey", "I am", "an Initial Tag"]
  // };
  // above is real, below makes debugging easier
  // var journal = {
  //   // debugging/temp
  //   title: "journalTitle",
  //   description: "journalDescription",
  //   tags: ["Hey", "I am", "an Initial Tag"]
  // };

  // validity checks
  // *** V1 - check that both desc and title are filled in
  // if (!(journal.title && journal.description)) {
  //   alert("You must enter an journal title and description!");
  //   return;
  // }
  // *** V2 - check only that desc is filled in
  // if (!journal.description) {
  //   alert("You must enter a dream description");
  //   return;
  // }

  // API.saveJournal(journal).then(function() {
  //   refreshJournals();
  // });

  $journalTitle.val("");
  $journalDescription.val("");
};

// handleDeleteBtnClick is called when an journal's delete button is clicked
// Remove the journal from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteJournal(idToDelete).then(function() {
    refreshJournals();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$journalList.on("click", ".delete", handleDeleteBtnClick);

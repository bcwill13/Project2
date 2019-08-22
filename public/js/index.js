// Get references to page elements
var $journalText = $("#journal-text");
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
      url: "api/journals",
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
        .text(journal.text)
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

  var journal = {
    text: $journalText.val().trim(),
    description: $journalDescription.val().trim()
  };

  if (!(journal.text && journal.description)) {
    alert("You must enter an journal text and description!");
    return;
  }

  API.saveJournal(journal).then(function() {
    refreshJournals();
  });

  $journalText.val("");
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

// Add event listeners to the submit and delete buttons ...and make them nice
$submitBtn.on("click", handleFormSubmit);
$journalList.on("click", ".delete", handleDeleteBtnClick);

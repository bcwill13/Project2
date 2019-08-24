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

  var journal = {
    title: $journalTitle.val().trim(),
    description: $journalDescription.val().trim()
  };

  // if (!(journal.title && journal.description)) {
  //   alert("You must enter an journal title and description!");
  //   return;
  // }
  if (!journal.description) {
    alert("You must enter a dream description");
    return;
  }

  API.saveJournal(journal).then(function() {
    refreshJournals();
  });

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

// Add event listeners to the submit and delete buttons ...and make them nice
$submitBtn.on("click", handleFormSubmit);
$journalList.on("click", ".delete", handleDeleteBtnClick);

//
//creation of laurent gremet  laurent.gremet@gmail.com
//
//
// INITIALIZATION OF CHIPS COLLECTION
var vChipsList = [
  {
    tag: "HeyMe"
  },
  {
    tag: "Iam"
  },
  {
    tag: "anInitialTag"
  }
];

// INITIALIZATION OF AUTOCOMPLETE LIST
var vTagList = {
  alpha: null,
  Beta: null,
  avion: null,
  maman: null,
  paPa: null,
  aVec: null,
  instinct: null,
  Surf: null,
  blurp: null,
  doublon: null
};

function fDisplayChips() {
  // FILLS THE CHIPS ZONE FROM THE LIST
  $("#lg-Chips").material_chip({
    data: vChipsList
  });
}

// ADDING A NEW CHIP
function fChipAdd(lChipName) {
  lChipName = lChipName.toLowerCase();
  // test1 : minimum word size
  if (!(lChipName.length > 2)) {
    return 0;
  }
  // test2 :  no duplicates
  for (i = 0; i < vChipsList.length; i++) {
    if (lChipName === vChipsList[i].tag) {
      return 0;
    }
  }
  // tests Okay => add the chip and refresh the view
  vChipsList.push({ tag: lChipName });
  fDisplayChips();
  return 1;
}

$(function() {
  // delete chip command
  $("#lg-Chips").on("chip.delete", function(e, chip) {
    vChipsList = $("#lg-Chips").material_chip("data");
  });

  $("#lg-Chips").focusin(function() {
    $("#lg-input").focus();
  });

  fDisplayChips();

  // NEW CHIP COMMAND
  $("#cmd-ChipsAjout").click(function() {
    fChipAdd($("#lg-input").val());
    $("#lg-input").val("");
  });

  $("#lg-input").autocomplete({
    data: vTagList
  });
});

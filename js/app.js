$(function () {
    //CRUD Application

    var form = $(".form");
    var inputTitle = $("#movieTitle");
    var inputDescription = $("#movieDescription");
    var inputAddress = $("#movieAddress");
    var list = $(".movie-list");
    var url = "http://localhost:3000";

    function loadMovies() {

        $.ajax({
            method: "GET",
            url: url + "/movies",
            dataType: "json"
        }).done(function (response) {
            list.empty();
            insertMovies(response);

        })
            .fail(function (error) {
                console.log(error);
            })
    }

    loadMovies();


    function insertMovies(movies) {
        movies.forEach(function (e) {
            var li = $(`<li class="movie">
        <div class="movie-content">
                <h3 class="movie-title">${e.name}</h3>
                <p class="movie-description">${e.emailAddress}</p>
                <p class="movie-address">${e.address}</p>
            </div>
            <button class="btn-edit" data-id="${e.id}">Szerkesztés</button>
            <button class="btn-delete" data-id="${e.id}">Törlés</button>
        </li>`);
            list.append(li);
        })
    }


    function addMovie(name, emailAddress, address) {
        var film = {
            "title": name,
            "description": emailAddress,
            "address": address
        };
        $.ajax({
            method: "POST",
            url: url + "/movies",
            dataType: "json",
            data: film
        }).done(function (response) {
            loadMovies();
        })
            .fail(function (error) {
                console.log(error);
            })


    }


    form.on("submit", function (e) {
        e.preventDefault();
        addMovie(inputTitle.val(), inputDescription.val(), inputAddress.val());
        inputTitle.val("");
        inputDescription.val("");
        inputAddress.val("");
    });





    function removeMovie(id) {
        $.ajax({
            method: "DELETE",
            url: url + "/movies/" + id,
            dataType: "json",
        }).done(function (response) {
            loadMovies();
        })
            .fail(function (error) {
                console.log(error);
            })

    }

    list.on("click", ".btn-delete", function () {
        var id = $(this).data("id");
        removeMovie(id);

    });




    function updateMovie(id, name, emailAddress, address) {

        var film = {
            "name": name,
            "emailAddress": emailAddress,
            "address": address
        };
        $.ajax({
            method: "PATCH",
            url: url + "/movies/" + id,
            dataType: "json",
            data: film
        }).done(function (response) {
            loadMovies()

        })
            .fail(function (error) {
                console.log(error);
            });

    }
    list.on("click", ".btn-edit", function (e) {
        e.preventDefault();


        var titleToEdit = $(this).parent().find(".movie-title");
        var descriptionToEdit = $(this).parent().find(".movie-description");
        var addressToEdit = $(this).parent().find(".movie-address");

        $(this).toggleClass("editable");

        if ($(this).hasClass("editable")) {
            var titleToEditText = titleToEdit.text();
            var descriptionToEditText = descriptionToEdit.text();
            var addressToEditText = addressToEdit.text();


            titleToEdit.replaceWith(`<input type="text" class="movie-title" value="${titleToEditText}" />`);

            descriptionToEdit.replaceWith(`<input type="text" class="movie-description" value="${descriptionToEditText}" />`);

            addressToEdit.replaceWith(`<input type="text" class="movie-address" value="${addressToEditText}" />`);

            $(this).text("Mentés");

        }
        else{
            var modId = $(this).data("id");
            var thisTitle = titleToEdit.val();
            var thisDesc= descriptionToEdit.val();
            var thisAddress= addressToEdit.val();

            titleToEdit.replaceWith(` <h3 class="movie-title">${thisTitle}</h3>`);
            descriptionToEdit.replaceWith(`<p class="movie-description">${thisDesc}</p>`);
            addressToEdit.replaceWith(`<p class="movie-address">${thisAddress}</p>`);

            updateMovie(modId, thisTitle, thisDesc, thisAddress);
            $(this).text("Kesz");

        }

    });



});


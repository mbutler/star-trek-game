import * as _ from "lodash"
import { episode_list } from "./episodes"
import autocomplete from "autocompleter"

const day = 1

let currentImage = window.localStorage.getItem("currentImage")
if (currentImage == undefined) {
    currentImage = 1
    window.localStorage.setItem("currentImage", currentImage)
}

const imgpath = `http://iws.mx/picardle/img/${day}/${currentImage}.jpeg`
$("#screencap").attr("src", imgpath)

$(".form-control").focus(function () {
    const elementId = $(this).attr("id")
    const element = document.getElementById(elementId)

    autocomplete({
        input: element,
        fetch: function (text, update) {
            text = text.toLowerCase()
            var suggestions = episode_list.filter((n) =>
                n.label.toLowerCase().includes(text)
            )
            update(suggestions)
        },
        onSelect: function (item) {
            element.value = item.label
        },
    })
})

$(".btn-success").click(function (e) {
    currentImage++
    window.localStorage.setItem("currentImage", currentImage)
    if (currentImage > 0 && currentImage < 6) {
        const imgpath = `http://iws.mx/picardle/img/${day}/${currentImage}.jpeg`
        $("#screencap").attr("src", imgpath)
    }
    const guess = $(this).siblings(".form-control").val()
    $(this).siblings(".form-control").val("")
    $.ajax({
        url: "http://iws.mx/picardle/submit.php",
        type: "post",
        data: guess,
        success: function (response) {
            if (response === "wrong") {
                $("#guess-group").append(
                    `<div class="alert alert-danger" role="alert"><img class="mark" src="http://iws.mx/picardle/img/x.png">${guess}</div>`
                )
            }
            if (response === "correct") {
                $("#guess-group").append(
                    `<div class="alert alert-success" role="alert"><img class="mark" src="http://iws.mx/picardle/img/checkmark.png">${guess}</div>`
                )
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown)
        },
    })
})

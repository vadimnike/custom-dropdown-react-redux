var $beersContainer=$("#beers-container"),$dropItem=$(".drop-down .drop-down-list li"),$body=$("body"),$popupBackdrop=$(".popup-backdrop"),$popupWrapper=$("#popup-wrapper");function handlerBarService(e,r){var t=document.getElementById(e).innerHTML;return Handlebars.compile(t)(r)}function initializeEvent(){$(document).ajaxStart(function(){$(".loader-wrap").show()}),$(document).ajaxComplete(function(){$(".loader-wrap").hide()}),$("#find-beer").click(function(){$beersContainer.html("");var e=$(".search-by-beer").val(),r=beerService.filterByName(beerService.beersList,e),t=handlerBarService("blocks",beerService.currentBeersList=r);$(".search-by-beer").val(""),$(".sort-by").val(""),$(".sort-by").attr("data-sort-field","all"),$(".sort-by").attr("data-sort-type","all"),$dropItem.removeClass("active"),$beersContainer.append(t)}),$(document).on("click",".beer",function(){var e=handlerBarService("popup",beerService.getBeerById(beerService.currentBeersList,$(this).attr("data-popup-id")));$body.addClass("overlay"),$popupBackdrop.toggleClass("hide"),$popupWrapper.append(e)}),$(document).on("click",".popup .close",function(){$body.removeClass("overlay"),$popupBackdrop.toggleClass("hide"),$popupWrapper.html("")}),$(document).on("click touch",".drop-down",function(){$(this).toggleClass("active")}),$dropItem.on("click touch",function(e){$beersContainer.html("");var r=$(this).closest(".drop-down").find("input"),t=$(e.target);$(this).closest(".drop-down").find(".drop-down-list li").removeClass("active"),t.addClass("active"),r.val(t.text()),r.attr("data-sort-field",t.attr("data-sort-field")),r.attr("data-sort-type",t.attr("data-sort-type"));var a=r.attr("data-sort-field"),n=r.attr("data-sort-type"),o=beerService.sortByName(beerService.currentBeersList,a,n),i=handlerBarService("blocks",beerService.currentBeersList=o);$beersContainer.append(i)}),$(document).click(function(e){var r=$(".drop-down");r.is(e.target)||0!==r.has(e.target).length||$(".drop-down").removeClass("active")})}var app={init:function(){initializeEvent(),beerService.getList().then(function(e){beerService.currentBeersList=e;var r=handlerBarService("blocks",beerService.beersList=e);$beersContainer.append(r)})}};$(document).ready(function(){app.init()});var beerService={endpoint:"http://api.punkapi.com/v2/beers",currentBeersList:[],beersList:[],getList:function(){return $.ajax({url:this.endpoint})},filterByName:function(e,r){return e.filter(function(e){return-1<e.name.toLowerCase().indexOf(r)})},sortByName:function(e,t,a){return e.sort(function(e,r){return e[t]>r[t]?"asc"==a?1:-1:e[t]<r[t]?"asc"==a?-1:1:0}),e},getBeerById:function(e,r){return e.filter(function(e){return e.id==r})}};
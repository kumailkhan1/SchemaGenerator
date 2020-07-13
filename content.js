chrome.runtime.sendMessage({ todo: "showPageAction" });

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch (message.type) {
            case "getData":
                var skipTagsTop = message.data.skipTagsTop;
                var skipTagsBottom = message.data.skipTagsBottom;

                var arr = Array();
                var products = Array();

                $("h3").each(function(index) {
                    arr[index] = $(this).text();
                });

                //Slicing array to skip some h3 tags

                arr = arr.slice(skipTagsTop,arr.length-skipTagsBottom);
                $('h3 span[class="ez-toc-section"]').each(function(index) {
                    products[index] = $(this).attr("id");
                });

                products = products.slice(skipTagsTop,products.length);
                var length = arr.length;
                var title = $("title").text();
                var description = $('meta[name = "description"]').attr("content");
                var url = $(location).attr("href");

                sendResponse({
                    status: true,
                    length: length,
                    tags: arr,
                    title: title,
                    description: description,
                    url: url,
                    products: products
                });
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
        return true;
    });
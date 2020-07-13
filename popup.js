chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    $("#generateBtn").click(function(){
        var skipTagsTop = $("#skipTagsTop").val();
        var skipTagsBottom = $("#skipTagsBottom").val();

        chrome.tabs.sendMessage(tabs[0].id, { type: "getData",data:{skipTagsTop:skipTagsTop,skipTagsBottom:skipTagsBottom }}, function(response) {
            console.log(response.products);
            console.log(response.tags);


            var length = response.length;
    
            var itemListElement = Array();
    
            var scriptStart = '<script type="application/ld+json">';
            var scriptEnd = '</script>';
    
            var schemaListObj = {
                "@context": "http://schema.org",
                "@type": "ItemList",
                "name": response.title,
                "description": response.description
            };
    
    
            for (var i = 0; i < length; i++) {
                itemListElement[i] = {
                    "@type": "ListItem",
                    "position": i + 1,
                    "item": {
                        "@type": "ListItem",
                        "url": response.url + "#" + response.products[i],
                        "name": response.tags[i]
    
                    }
                }
                schemaListObj.itemListElement = itemListElement;
            }
    
            var schemaList = scriptStart + JSON.stringify(schemaListObj) + scriptEnd;
    
            $("#schemaFields").val(schemaList);
    
    
        });
        
    });

});
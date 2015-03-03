var news = 
    {

        "Entity": {
        "E": "NewsArticles",
        "W":        {
            "HeadlineLang": "L:en",
            //"Filter": "shares",
            "LastStoryDate": "0001-01-01T01:00:00",
            "Order": "ToBegin",
            "Repository": "reuters",
            "HeadlinesOnly": false,
            "StartTime": "2011-01-01T03:21:33", //BEGINDATE
            "EndTime": "2012-06-22T03:21:50", //ENDDATE
            "BrokerResearch": false
                    }
                }
    }
    
    $(document).ready(function() {
        $.ajax({
            async: false,
            url: 'https://amers1.proxy.cp.reutest.com/msf/auth/login',
            type: 'POST',
            headers: { 'Authorization': "Basic "+btoa("eikonstudent12@thomsonreuters.com:Secret123")},
            success: handleSuccess,
            error: handleError,
            complete: handleComplete
        });
    });
    function handleSuccess(data, textStatus, jqXHR) 
    {
        //console.log(data, textStatus, jqXHR);
    }

    function handleError(jqXHR, textStatus, err) 
    {
       // console.log(jqXHR, textStatus, err);
    }
    function handleComplete() 
    {
        $.ajax({
            async: false,
            url: 'https://amers1.proxy.cp.reutest.com/msf',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(news),
            dataType: 'json',
            success: handleSuccessData,
            error: handleError

        });
    }
    
    function handleSuccessData (data) 
    {
        console.log(data);
        OB = [];
      suid = [];
       for (i = 0; i < 5; i++) 
       {
       suid[i] = data.Headlines[i].UniqueIdentifier.split("_",1);
       OB[i] = {head:data.Headlines[i].HeadlineText, date:data.Headlines[i].LastUpdateDateTime.split("T",1), uid:suid[i]};
       document.getElementById("head"+i).innerHTML = OB[i].head;
       document.getElementById("date"+i).innerHTML = OB[i].date;
        }
    getstory(suid);
    }


function getstory(suid) {   
{
    var id = [];
    for(i = 0; i <=4; i++)   
    {id[i] = new String(suid[i]);}
    console.log(id);
        var story = { "Entity": { "Id": "NAD", "E": "NewsArticlesDetails", "W": { "Stories": [ { "Id":id[0]}, { "Id": id[1]}, { "Id": id[2]}, { "Id": id[3]}, { "Id": id[4]}] } } }
        $(document).ready(function() {
        $.ajax({
            async: false,
            url: 'https://amers1.proxy.cp.reutest.com/msf/auth/login',
            type: 'POST',
            headers: {
                'Authorization': "Basic "+btoa("eikonstudent13@thomsonreuters.com:Secret123")
            },
            success: handleSuccess,
            error: handleError,
            complete: handleComplete
            });
            });
    }

            function handleSuccess(data, textStatus, jqXHR) {
            //console.log(data, textStatus, jqXHR);
            }

            function handleError(jqXHR, textStatus, err) {
             // console.log(jqXHR, textStatus, err);
            }

            function handleComplete() {
            $.ajax({
            async: false,
            url: 'https://amers1.proxy.cp.reutest.com/msf',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(story),
            dataType: 'json',
            error: handleError,
            success: handleSuccessData
            
                });
            }

            function handleSuccessData (data) {
            console.log(data);
            for (i = 0; i < 5; i++) 
            {
              document.getElementById("story"+i).innerHTML = data.NAD.Articles[i].StoryText;
            }}
    }

const http = require('http')
const url = require('url')
const app = http.createServer((request, response) => {
    var query;
    if (request.method == 'POST') {
        var body = ''
        request.on('data', function(data) {
        body += data
        })
        var resultBody = {"response":[]}
        request.on('end', function() {
            try{
                inputJSON = JSON.parse(body);
                inputJSON.payload.forEach(function(element){
                    if (element.drm == true && element.episodeCount > 0){
                        var outputBody = {"image": element.image.showImage,"slug": element.slug,"title": element.title}
                        resultBody.response.push(outputBody); 
                    }   
                });
                result = JSON.stringify(resultBody);
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(result);
                response.end();
            }
            catch(e){
                var err = {"error":"Could not decode request: JSON parsing failed"};
                error = JSON.stringify(err);
                response.writeHead(400, {"Code": "Bad Request"});
                response.write(error);
                response.end();
            }
        })
    }
});
app.listen(3000);

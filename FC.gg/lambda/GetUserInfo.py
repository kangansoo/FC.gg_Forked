import json
import urllib.request
import urllib.parse


def info_handler(event, context):
    try:
        # Parameters
        api_key = "test_f15f9ee815ab4be133e13c2028780bfc1375fec5c24fbe5b2436a1070879273300ad5d0d0126614ece0a1c1c2d180b62"
        ouid = event["queryStringParameters"]["ouid"]

        
        # Request URL
        baseUrl = "https://open.api.nexon.com/fconline/v1/user/basic"
        queryParams = {
            "ouid": ouid
        }
        url = baseUrl + "?" + urllib.parse.urlencode(queryParams)

        baseUrl1 = "https://open.api.nexon.com/fconline/v1/user/maxdivision"
        
        url1 = baseUrl1 + "?" + urllib.parse.urlencode(queryParams)

        req = urllib.request.Request(url, headers={
            "accept": "application/json",
            "x-nxopen-api-key": api_key
        })
        with urllib.request.urlopen(req) as response:
            
            response_data = response.read().decode("utf-8")

        req1 = urllib.request.Request(url1, headers={
            "accept": "application/json",
            "x-nxopen-api-key": api_key
        })
        with urllib.request.urlopen(req1) as response1:

            
            response_data1 = response1.read().decode("utf-8")
        
        data = json.loads(response_data)
        level = data["level"]

        data1 = json.loads(response_data1)
        division = [item["division"] for item in data1]
        # print(level, division[0])
        return level, division[0]
        

    except Exception as e:
        print(e)
        return f"Error occurred: {str(e)}"
    

# info_handler('9fa3cdef6848f132aa27a3c0a55aea6e')
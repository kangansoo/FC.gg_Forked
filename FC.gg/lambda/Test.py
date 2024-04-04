import json
import urllib.request
import urllib.parse


def info_handler(event):
    try:
        # Parameters
        api_key = "test_f15f9ee815ab4be133e13c2028780bfc1375fec5c24fbe5b2436a1070879273300ad5d0d0126614ece0a1c1c2d180b62"
        # ouid = event["queryStringParameters"]["ouid"]
        ouid = event
        
        # Request URL
        baseUrl = "https://open.api.nexon.com/fconline/v1/user/maxdivision"
        queryParams = {
            "ouid": ouid
        }
        url = baseUrl + "?" + urllib.parse.urlencode(queryParams)

        
        req = urllib.request.Request(url, headers={
            "accept": "application/json",
            "x-nxopen-api-key": api_key
        })
        with urllib.request.urlopen(req) as response:
            
            response_data = response.read().decode("utf-8")

        data = json.loads(response_data)

# division 값만 추출하여 리스트 생성
        divisions = [item["division"] for item in data]
        print(divisions)
        return divisions
        

    except Exception as e:
        print(e)
        return f"Error occurred: {str(e)}"
    

info_handler('9fa3cdef6848f132aa27a3c0a55aea6e')
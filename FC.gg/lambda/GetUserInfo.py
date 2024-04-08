import json
import urllib.request
import urllib.parse


def GetUserInfo(event, context):

    rank_image = ['https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcA7fvV%2FbtsGqJjAVq9%2FZuivsLnpn8EyXNKhpCZwk1%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkIKwL%2FbtsGqMUL1if%2FE4pVAbBGcBWzmhR17nJhQK%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fd0WZdZ%2FbtsGqyP3VgI%2FVt7EiXkKtU7k027uKKL2xk%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDWxRQ%2FbtsGqVYmh1Y%2Fk6KBmKWY6ov71GOJtjRduk%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdqrnM2%2FbtsGqs3s4Wo%2FefKedvukbjwWv49DkfQDU0%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLOonG%2FbtsGsW9QeWR%2F66B4eykGA55KZ2ChgXwKG1%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3VpVc%2FbtsGrb7IlAy%2FtkQwG3eKgpXK1brKLw38Y0%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbsfdZV%2FbtsGrTlslIX%2F7HFaJ7kvRNQCU96rryxik0%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdJenyh%2FbtsGq3aVsOU%2FhmWAEdt0E3HmAwLKJV6faK%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcauGK7%2FbtsGqQJH152%2F7cI3c9T5zggLISSgurdprk%2Fimg.png',
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEaIlU%2FbtsGq99RWuK%2F1kF3tvriIlJdua8Lv15SKK%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZGouT%2FbtsGssVnXkB%2FFvY2qCLtKGe60aXHvwEiNK%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc6eqWL%2FbtsGqiGGKlM%2F2ZPzaeWM25b9Ii1gPE73Bk%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgrX8i%2FbtsGqMN2chq%2Fc58gZrFYNjHLcVq6VfFG10%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPgCxB%2FbtsGqV5akiL%2FuxHIu35TZ1SJLeld8NNW3k%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCilq5%2FbtsGsgAJQCB%2FNDu9wDth1rYRWDRCihZFNK%2Fimg.png', 
     'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGzEDa%2FbtsGsV38B0U%2Fvi0knL9g7wKSEkWx2i1Az1%2Fimg.png', 
     "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc4m7it%2FbtsGrUdBG11%2FUKigItyzZz0F123UT1NwCk%2Fimg.png"]
    
    
    rank_text = {'슈퍼챔피언스' : rank_image[17], '챔피언스' : rank_image[16],
                 '슈퍼챌린지' : rank_image[15], '챌린지1' : rank_image[14],
                 '챌린지2' : rank_image[13], '챌린지3' : rank_image[12],
                 '월드클래스1' : rank_image[11], '월드클래스2' : rank_image[10],
                 '월드클래스3' : rank_image[9], '프로1' : rank_image[8],
                 '프로2' : rank_image[7], '프로3' : rank_image[6],
                 '세미프로1' : rank_image[5], '세미프로2' : rank_image[4],
                 '세미프로3' : rank_image[3], '유망주1' : rank_image[2],
                 '유망주2' : rank_image[0], '유망주3' : rank_image[1],
                 }
    rank_key = list(rank_text.keys())
    rank_icon = list(rank_text.values())

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

        if division[0] == 800 :
            key = rank_key[0]
        if division[0] == 900 :
            key = rank_key[1]
        if division[0] == 1000 :
            key = rank_key[2]
        if division[0] == 1100 :
            key = rank_key[3]
        if division[0] == 1200 :
            key = rank_key[4]
        if division[0] == 1300 :
            key = rank_key[5]     
        if division[0] == 2000 :
            key = rank_key[6]
        if division[0] == 2100 :
            key = rank_key[7]
        if division[0] == 2200 :
            key = rank_key[8]
        if division[0] == 2300 :
            key = rank_key[9]
        if division[0] == 2400 :
            key = rank_key[10]
        if division[0] == 2500 :
            key = rank_key[11]
        if division[0] == 2600 :
            key = rank_key[12]
        if division[0] == 2700 :
            key = rank_key[13]
        if division[0] == 2800 :
            key = rank_key[14]
        if division[0] == 2900 :
            key = rank_key[15]
        if division[0] == 3000 :
            key = rank_key[16]
        if division[0] == 3100 :
            key = rank_key[17]
        else :
            return level, '공식 경기 미진행'
        
        image = rank_text[key]
        # print(level, division[0])
        return level, key, image
        

    except Exception as e:
        print(e)
        return f"Error occurred: {str(e)}"
    

import json
import urllib.request
import urllib.parse


def info_handler(event, context):

    rank_image = ['https://drive.google.com/file/d/1DP7WYw6S03K1jKaKwrLUgOdIAKm64xkg/view?usp=drive_link', 
     'https://drive.google.com/file/d/1rXDUHQOoztD2RNnaVN5ypQszT-vrW2a-/view?usp=drive_link', 
     'https://drive.google.com/file/d/1P6dkggXNPMnuEIuJaLNFXMTQjZtuOeMP/view?usp=drive_link', 
     'https://drive.google.com/file/d/18PDcfFnd1ZLUZlHj9xTKLSZYybAHVpGW/view?usp=drive_link', 
     'https://drive.google.com/file/d/1xkCQyFUWP6b-eJYnrkazCzHJYW36PgEZ/view?usp=drive_link', 
     'https://drive.google.com/file/d/1N1dvXOQOvtCanQLhVnsguHTp6ct22kgw/view?usp=drive_link', 
     'https://drive.google.com/file/d/1gWKR163TKNB-RgFm9qVUHIvLd18tkCVc/view?usp=drive_link', 
     'https://drive.google.com/file/d/1t2n9g0p6jx_HMWmI47RvU3wChMMfOnG0/view?usp=drive_link', 
     'https://drive.google.com/file/d/1gGAFroM0DEkCpt7m39qGjdkuXxuoyogy/view?usp=drive_link', 
     'https://drive.google.com/file/d/1QGyPNYtJffxRk61IuEgYd8qc11XCXqTu/view?usp=drive_link',
     'https://drive.google.com/file/d/1gn0YszTtwzAuSYNwUr362XxcAAGYnSrv/view?usp=drive_link', 
     'https://drive.google.com/file/d/1d0PvwwJyYwAZ71I6msxKNsYXFSJkCsA-/view?usp=drive_link', 
     'https://drive.google.com/file/d/11a-hGOQPVqPIElrdDIy42RfUfrCbdcbm/view?usp=drive_link', 
     'https://drive.google.com/file/d/1DjsXAbVmzuAuH-xe5lUH9I6ZDdW6NBBq/view?usp=drive_link', 
     'https://drive.google.com/file/d/1oNNEVF8XmZQ4EQEqJycPUm6AYhoH9CNQ/view?usp=drive_link', 
     'https://drive.google.com/file/d/1rqHGYFsP2mTQZNaW-m8QjpxU3aAt3Ahx/view?usp=drive_link', 
     'https://drive.google.com/file/d/1j4nayLSuVApwulTSUPyv4Kw2Vrau3q18/view?usp=drive_link', 
     'https://drive.google.com/file/d/1KjTUWJRLyBOQHIRb6Bzpm7Gq__YxxLwr/view?usp=drive_link']
    
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
    

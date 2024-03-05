import json
import urllib.request
import urllib.parse

def get_match_detail(api_key, match_id):
    try:
        # 요청 URL 설정
        base_url = "https://open.api.nexon.com/fconline/v1/match-detail"
        url = f"{base_url}?matchid={match_id}"

        # 요청 헤더 설정
        headers = {
            "x-nxopen-api-key": api_key
        }

        # GET 요청 보내기
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            response_data = response.read().decode()

        # 응답 반환
        return response_data

    except Exception as e:
        print(e)
        return f"Error occurred: {str(e)}"


def match_handler(event, context):
    api_key = "test_f15f9ee815ab4be133e13c2028780bfc1375fec5c24fbe5b2436a1070879273300ad5d0d0126614ece0a1c1c2d180b62"
    match_id = event["matchid"]

    return get_match_detail(api_key, match_id)
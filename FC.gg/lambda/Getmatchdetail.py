import json
import urllib.request
import urllib.parse
import boto3

def Getmatchdetail(event, context):
    try:
        api_key = "live_f15f9ee815ab4be133e13c2028780bfcd5bc103307d3c99fde3f5fad2dad4971c39c09e62f505a27384865aadbc8ebb7"
        match_id = event["queryStringParameters"]["matchid"]
        nickname = event["queryStringParameters"]["nickname"]
        base_url = "https://open.api.nexon.com/fconline/v1/match-detail"
        query_params = {'matchid': match_id}
        url = base_url + "?" + urllib.parse.urlencode(query_params)
        # GET 요청 보내기
        req = urllib.request.Request(url, headers={
            "accept": "application/json",
            "x-nxopen-api-key": api_key
        })
        with urllib.request.urlopen(req) as response:
            response_data = response.read().decode("utf-8")
        print("url 요청 보내기는 성공")
        # 내 선수 조회
        #spRating = 0.0 인 경우에는 교체 선수들임
        data_dict = json.loads(response_data)
        data = data_dict['matchInfo']
            #내 정보 찾기, #추후에 입력한 닉네임 값을 받아와야 함.
        if data_dict['matchInfo'][0]['nickname'] == nickname :
            my_player = data_dict['matchInfo'][0]['player']
            my_status = data_dict['matchInfo'][0]['matchDetail']['matchResult']
            my_score = data_dict['matchInfo'][0]['shoot']['goalTotal']
            my_total_shoot = data_dict['matchInfo'][0]['shoot']['shootTotal']
            my_effective_shoot = data_dict['matchInfo'][0]['shoot']['effectiveShootTotal']
            my_rating = data_dict['matchInfo'][0]['matchDetail']['averageRating']
            my_yellow = data_dict['matchInfo'][0]['matchDetail']['yellowCards']
            my_red = data_dict['matchInfo'][0]['matchDetail']['redCards']
            my_controller = data_dict['matchInfo'][0]['matchDetail']['controller']
            my_possession = data_dict['matchInfo'][0]['matchDetail']['possession']
            my_dribble = data_dict['matchInfo'][0]['matchDetail']['dribble']
            my_offside = data_dict['matchInfo'][0]['matchDetail']['offsideCount']
            my_passtry = data[0]['pass']['passTry']
            my_passsuc = data[0]['pass']['passSuccess']

            other_player = data_dict['matchInfo'][1]['player']
            other_status = data_dict['matchInfo'][1]['matchDetail']['matchResult']
            other_score = data_dict['matchInfo'][1]['shoot']['goalTotal']
            other_nick = data_dict["matchInfo"][1]['nickname']
            other_total_shoot = data_dict['matchInfo'][1]['shoot']['shootTotal']
            other_rating = data_dict['matchInfo'][1]['matchDetail']['averageRating']
            other_effective_shoot = data_dict['matchInfo'][1]['shoot']['effectiveShootTotal']
            other_yellow = data_dict['matchInfo'][1]['matchDetail']['yellowCards']
            other_red = data_dict['matchInfo'][1]['matchDetail']['redCards']
            other_controller = data_dict['matchInfo'][1]['matchDetail']['controller']
            other_possession = data_dict['matchInfo'][1]['matchDetail']['possession']
            other_dribble = data_dict['matchInfo'][1]['matchDetail']['dribble']
            other_offside = data_dict['matchInfo'][1]['matchDetail']['offsideCount']
            other_passtry = data[1]['pass']['passTry']
            other_passsuc = data[1]['pass']['passSuccess']

        else :
            my_player = data_dict['matchInfo'][1]['player']
            my_status = data_dict['matchInfo'][1]['matchDetail']['matchResult']
            my_score = data_dict['matchInfo'][1]['shoot']['goalTotal']
            my_total_shoot = data_dict['matchInfo'][1]['shoot']['shootTotal']
            my_effective_shoot = data_dict['matchInfo'][1]['shoot']['effectiveShootTotal']
            my_rating = data_dict['matchInfo'][1]['matchDetail']['averageRating']
            my_yellow = data_dict['matchInfo'][1]['matchDetail']['yellowCards']
            my_red = data_dict['matchInfo'][1]['matchDetail']['redCards']
            my_controller = data_dict['matchInfo'][1]['matchDetail']['controller']
            my_possession = data_dict['matchInfo'][1]['matchDetail']['possession']
            my_dribble = data_dict['matchInfo'][1]['matchDetail']['dribble']
            my_offside = data_dict['matchInfo'][1]['matchDetail']['offsideCount']
            my_passtry = data[1]['pass']['passTry']
            my_passsuc = data[1]['pass']['passSuccess']



            other_player = data_dict['matchInfo'][0]['player']
            other_status = data_dict['matchInfo'][0]['matchDetail']['matchResult']
            other_score = data_dict['matchInfo'][0]['shoot']['goalTotal']
            other_nick = data_dict["matchInfo"][0]['nickname']
            other_total_shoot = data_dict['matchInfo'][0]['shoot']['shootTotal']
            other_rating = data_dict['matchInfo'][0]['matchDetail']['averageRating']
            other_effective_shoot = data_dict['matchInfo'][0]['shoot']['effectiveShootTotal']
            other_yellow = data_dict['matchInfo'][0]['matchDetail']['yellowCards']
            other_red = data_dict['matchInfo'][0]['matchDetail']['redCards']
            other_controller = data_dict['matchInfo'][0]['matchDetail']['controller']
            other_possession = data_dict['matchInfo'][0]['matchDetail']['possession']
            other_dribble = data_dict['matchInfo'][0]['matchDetail']['dribble']
            other_offside = data_dict['matchInfo'][0]['matchDetail']['offsideCount']
            other_passtry = data[0]['pass']['passTry']
            other_passsuc = data[0]['pass']['passSuccess']


        position_mapping = {
        0: "GK", 1: "SW", 2: "RWB", 3: "RB", 4: "RCB", 5: "CB",
        6: "LCB", 7: "LB", 8: "LWB", 9: "RDM", 10: "CDM", 11: "LDM",
        12: "RM", 13: "RCM", 14: "CM", 15: "LCM", 16: "LM", 17: "RAM", 18: "CAM", 19: "LAM",
        20: "RF", 21: "CF", 22: "LF", 23: "RW", 24: "RS", 25: "ST", 26: "LS", 27: "LW", 28: "SUB"
        }
        my_player_data = []
        for item in my_player:
            if item.get('spPosition') != 28 :
                    extracted_item = {
                        'spId': item['spId'],
                        'spPosition': position_mapping.get(item['spPosition'], 'Unknown'),
                        'position' : item['spPosition'],
                        'spGrade': item['spGrade'],
                        'status' : item['status']['spRating'],
                        'goal' : item['status']['goal']
                    }
                    my_player_data.append(extracted_item)

            
        other_player_data = []
        for item in other_player:
            if item.get('spPosition') != 28 :
                    extracted_item = {
                        'spId': item['spId'],
                        'spPosition': position_mapping.get(item['spPosition'], 'Unknown'),
                        'position' : item['spPosition'],
                        'spGrade': item['spGrade'],
                        'status' : item['status']['spRating'],
                        'goal' : item['status']['goal']
                    }
                    other_player_data.append(extracted_item)
        my_player_data = sorted(my_player_data, key=lambda x: x['position'])
        other_player_data = sorted(other_player_data, key=lambda x: x['position'])
        print("data 설정 완료")            
        my_ids = [item['spId'] for item in my_player_data]
        other_ids = [item['spId'] for item in other_player_data]
        #db 접속
        table_name = 'FC.GG-playerinfo'

        # AWS SDK를 사용하여 DynamoDB에 접속
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(table_name)
        print("db 접속 완료")
        my_data = []
        other_data = []
        
        for spId in my_ids:
            response = table.get_item(Key={'id': spId})
            if 'Item' in response:
                my_data.append(response['Item'])
        
        for spId in other_ids:
            response = table.get_item(Key={'id': spId})
            if 'Item' in response:
                other_data.append(response['Item'])        
        
        if my_status == '오류' :
            my_player = 0
            my_status = 0
            my_score = 0
            my_total_shoot = 0
            my_effective_shoot = 0
            my_rating = 0
            my_yellow = 0
            my_red = 0
            my_controller = 0
            my_possession = 0
            my_dribble = 0
            my_offside = 0
            my_passtry = 0
            my_passsuc = 0
            
        print("db 조회 완료")
        return_data = {
            'match_date' : data_dict['matchDate'].replace('T', ' '),
            'my_player_data': my_player_data,
            'my_status': my_status,
            'my_score': my_score,
            'my_nick': nickname,
            'my_data': my_data,
            'my_total_shoot': my_total_shoot ,
            'my_effective_shoot' : my_effective_shoot, 
            'my_rating' : my_rating ,
            'my_yellow' : my_yellow ,
            'my_red' : my_red,
            'my_controller' : my_controller,
            'my_possession' : my_possession,
            'my_dribble' : my_dribble,
            'my_offside' : my_offside,
            'my_passtry' : my_passtry,
            'my_passsuc' : my_passsuc,

            'other_player_data': other_player_data,
            'other_status': other_status,
            'other_score': other_score,
            'other_data': other_data,
            'other_nick': other_nick,
            'other_total_shoot': other_total_shoot,
            'other_effective_shoot' : other_effective_shoot, 
            'other_rating' : other_rating ,
            'other_yellow' : other_yellow ,
            'other_red' : other_red,
            'other_controller' : other_controller,
            'other_possession' : other_possession,
            'other_dribble' : other_dribble,
            'other_offside' : other_offside,
            'other_passtry' : other_passtry,
            'other_passsuc' : other_passsuc 
        }

        return return_data
    except Exception as e:
        print(e)
        return f"Error occurred: {str(e)}"
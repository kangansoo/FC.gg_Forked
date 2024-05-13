import pandas as pd
import json
def csv_to_json():
    # CSV 파일을 pandas 데이터프레임으로 읽어오기
    df = pd.read_csv('C:/Users/PC/OneDrive/바탕 화면/my-project/FC.GG_Forked/FC.gg/lambda/Data/merged.csv')
    
    # 데이터프레임을 JSON 형식으로 변환
    json_data = df.to_json(orient='records')
    
    return json_data

# 예시로 사용할 CSV 파일 내용


# CSV를 JSON으로 변환
json_data = csv_to_json()
def save_json_to_file(json_data, file_path):
    # JSON 데이터를 파일로 저장
    with open(file_path, 'w') as json_file:
        json.dump(json_data, json_file)

save_json_to_file(json_data, './output.json')